import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { accessToken } = await base44.asServiceRole.connectors.getConnection("google_analytics");
    const body = await req.json().catch(() => ({}));
    const action = body.action || "listProperties";

    // ── 1. List GA4 properties ─────────────────────────────────────────────
    if (action === "listProperties") {
      // First, get all accounts
      const accountsRes = await fetch(
        "https://analyticsadmin.googleapis.com/v1beta/accounts",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const accountsData = await accountsRes.json();
      console.log("Accounts response:", JSON.stringify(accountsData));

      const accounts = accountsData.accounts || [];
      let allProperties = [];

      // For each account, list properties
      for (const account of accounts) {
        const accountId = account.name.split("/")[1];
        const propsRes = await fetch(
          `https://analyticsadmin.googleapis.com/v1beta/properties?filter=parent:${account.name}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const propsData = await propsRes.json();
        console.log(`Properties for ${account.name}:`, JSON.stringify(propsData));
        const props = (propsData.properties || []).map(p => ({
          name: p.name,
          displayName: p.displayName,
          propertyId: p.name.split("/")[1],
          accountId,
        }));
        allProperties = allProperties.concat(props);
      }

      // Fallback: try listing without account filter if nothing found
      if (allProperties.length === 0) {
        const fallbackRes = await fetch(
          "https://analyticsadmin.googleapis.com/v1beta/properties?filter=parent:accounts/~all",
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const fallbackData = await fallbackRes.json();
        console.log("Fallback properties:", JSON.stringify(fallbackData));
        allProperties = (fallbackData.properties || []).map(p => ({
          name: p.name,
          displayName: p.displayName,
          propertyId: p.name.split("/")[1],
        }));
      }

      return Response.json({ action, properties: allProperties });
    }

    // ── 2. Analyze funnel ──────────────────────────────────────────────────
    if (action === "analyzeFunnel") {
      const { propertyId } = body;
      if (!propertyId) return Response.json({ error: "propertyId required" }, { status: 400 });

      const endDate = "today";
      const startDate = "90daysAgo";

      // Run all queries in parallel
      const [pageViewsRes, eventsRes, stepExitsRes] = await Promise.all([
        // Page views per step path
        fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
          method: "POST",
          headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            dateRanges: [{ startDate, endDate }],
            dimensions: [{ name: "pagePath" }],
            metrics: [
              { name: "screenPageViews" },
              { name: "sessions" },
              { name: "bounceRate" },
              { name: "averageSessionDuration" },
            ],
            dimensionFilter: {
              filter: {
                fieldName: "pagePath",
                stringFilter: { matchType: "BEGINS_WITH", value: "/QuoteAssistant" },
              },
            },
          }),
        }),

        // Custom events tracked in the app
        fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
          method: "POST",
          headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            dateRanges: [{ startDate, endDate }],
            dimensions: [{ name: "eventName" }],
            metrics: [{ name: "eventCount" }, { name: "totalUsers" }],
            dimensionFilter: {
              filter: {
                fieldName: "eventName",
                inListFilter: {
                  values: [
                    "quote_request_submitted",
                    "contact_form_submitted",
                    "nav_phone_clicked",
                    "contact_phone_clicked",
                    "contact_email_clicked",
                  ],
                },
              },
            },
          }),
        }),

        // Page views for all consultation-related pages (to build funnel)
        fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
          method: "POST",
          headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            dateRanges: [{ startDate, endDate }],
            dimensions: [{ name: "pagePath" }],
            metrics: [{ name: "sessions" }, { name: "screenPageViews" }],
            dimensionFilter: {
              filter: {
                fieldName: "pagePath",
                inListFilter: {
                  values: [
                    "/",
                    "/Services",
                    "/QuoteAssistant",
                    "/Contact",
                    "/ScheduleVisit",
                  ],
                },
              },
            },
            orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
          }),
        }),
      ]);

      const [pageViewsData, eventsData, stepExitsData] = await Promise.all([
        pageViewsRes.json(),
        eventsRes.json(),
        stepExitsRes.json(),
      ]);

      // Parse page views for /QuoteAssistant
      const quotePageStats = (pageViewsData.rows || []).map(row => ({
        path: row.dimensionValues[0].value,
        views: parseInt(row.metricValues[0].value),
        sessions: parseInt(row.metricValues[1].value),
        bounceRate: parseFloat(row.metricValues[2].value),
        avgSessionDuration: parseFloat(row.metricValues[3].value),
      }));

      // Parse custom events
      const events = (eventsData.rows || []).map(row => ({
        event: row.dimensionValues[0].value,
        count: parseInt(row.metricValues[0].value),
        users: parseInt(row.metricValues[1].value),
      }));

      // Parse funnel steps
      const funnelSteps = (stepExitsData.rows || []).map(row => ({
        path: row.dimensionValues[0].value,
        sessions: parseInt(row.metricValues[0].value),
        views: parseInt(row.metricValues[1].value),
      }));

      // Build ordered funnel with drop-off calculation
      const funnelOrder = ["/", "/Services", "/QuoteAssistant", "/Contact", "/ScheduleVisit"];
      const funnelLabels = {
        "/": "Home",
        "/Services": "Services",
        "/QuoteAssistant": "Quote Assistant",
        "/Contact": "Contact",
        "/ScheduleVisit": "Schedule Visit",
      };
      const stepMap = {};
      funnelSteps.forEach(s => { stepMap[s.path] = s; });

      const quoteSubmitted = events.find(e => e.event === "quote_request_submitted")?.count || 0;

      const orderedFunnel = funnelOrder.map(path => ({
        path,
        label: funnelLabels[path],
        sessions: stepMap[path]?.sessions || 0,
        views: stepMap[path]?.views || 0,
      }));

      // Add quote submitted as last step
      orderedFunnel.push({ path: "submitted", label: "Quote Submitted", sessions: quoteSubmitted, views: quoteSubmitted });

      // Calculate drop-off
      const funnelWithDropOff = orderedFunnel.map((step, i) => {
        const prev = i > 0 ? orderedFunnel[i - 1].sessions : step.sessions;
        const dropOff = prev > 0 ? Math.round((1 - step.sessions / prev) * 100) : 0;
        const conversionRate = orderedFunnel[0].sessions > 0
          ? Math.round((step.sessions / orderedFunnel[0].sessions) * 100)
          : 0;
        return { ...step, dropOff: i === 0 ? 0 : dropOff, conversionRate };
      });

      // ── 3. Device / platform breakdown ──────────────────────────────────
      const deviceRes = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          dateRanges: [{ startDate, endDate }],
          dimensions: [{ name: "deviceCategory" }],
          metrics: [{ name: "sessions" }, { name: "bounceRate" }],
        }),
      });
      const deviceData = await deviceRes.json();
      const devices = (deviceData.rows || []).map(row => ({
        device: row.dimensionValues[0].value,
        sessions: parseInt(row.metricValues[0].value),
        bounceRate: parseFloat(row.metricValues[1].value),
      }));

      // ── 4. Top entry pages ───────────────────────────────────────────────
      const entryRes = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          dateRanges: [{ startDate, endDate }],
          dimensions: [{ name: "landingPage" }],
          metrics: [{ name: "sessions" }, { name: "bounceRate" }, { name: "conversions" }],
          orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
          limit: 10,
        }),
      });
      const entryData = await entryRes.json();
      const topLandingPages = (entryData.rows || []).map(row => ({
        page: row.dimensionValues[0].value,
        sessions: parseInt(row.metricValues[0].value),
        bounceRate: parseFloat(row.metricValues[1].value),
        conversions: parseInt(row.metricValues[2].value),
      }));

      // ── 5. AI Insights ───────────────────────────────────────────────────
      const worstDropOff = funnelWithDropOff.slice(1).sort((a, b) => b.dropOff - a.dropOff)[0];
      const overallConversionRate = funnelWithDropOff[funnelWithDropOff.length - 1].conversionRate;
      const mobileSessions = devices.find(d => d.device === "mobile")?.sessions || 0;
      const totalSessions = devices.reduce((s, d) => s + d.sessions, 0);
      const mobileShare = totalSessions > 0 ? Math.round((mobileSessions / totalSessions) * 100) : 0;

      const aiPrompt = `You are a conversion rate optimization expert for a home remodeling contractor website (Bradley Brown Inc, Brandon MS).
      
Analyze this funnel data and provide 4-5 specific, actionable recommendations to improve conversions:

Funnel Steps:
${funnelWithDropOff.map(s => `- ${s.label}: ${s.sessions} sessions, ${s.dropOff}% drop-off, ${s.conversionRate}% of total`).join('\n')}

Key Events:
${events.map(e => `- ${e.event}: ${e.count} times`).join('\n')}

Device Breakdown:
${devices.map(d => `- ${d.device}: ${d.sessions} sessions, ${(d.bounceRate * 100).toFixed(1)}% bounce rate`).join('\n')}

Mobile traffic share: ${mobileShare}%
Overall funnel conversion (Home → Quote Submitted): ${overallConversionRate}%
Biggest drop-off point: ${worstDropOff?.label} (${worstDropOff?.dropOff}% drop)

Provide JSON with this structure: { "summary": "2-3 sentence overview", "insights": [{ "title": "short title", "detail": "specific actionable recommendation", "priority": "high|medium|low" }] }`;

      const aiRes = await base44.asServiceRole.integrations.Core.InvokeLLM({
        prompt: aiPrompt,
        response_json_schema: {
          type: "object",
          properties: {
            summary: { type: "string" },
            insights: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  detail: { type: "string" },
                  priority: { type: "string" },
                },
              },
            },
          },
        },
      });

      return Response.json({
        action,
        funnel: funnelWithDropOff,
        events,
        quotePageStats,
        devices,
        topLandingPages,
        aiInsights: aiRes,
        dateRange: { startDate: "90 days ago", endDate: "today" },
      });
    }

    return Response.json({ error: "Unknown action" }, { status: 400 });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});