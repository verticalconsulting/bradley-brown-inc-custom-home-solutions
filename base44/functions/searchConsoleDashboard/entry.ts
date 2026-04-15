import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

const SITE_URL = "https://bradleybrowninc.com";
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

const ALL_PAGES = [
  "/",
  "/Services",
  "/Portfolio",
  "/Contact",
  "/About",
  "/QuoteAssistant",
  "/ScheduleVisit",
  "/LandingCoreServices",
  "/LandingEmergencyRepair",
  "/LandingBrandonRemodelers",
  "/SmallBathroomIdeas",
  "/LuxuryHomeRenovations",
  "/LandingPricing",
  "/LandingTrust",
  "/RenovationLoans",
  "/HomeAdditionIdeas",
  "/EnergyEfficientUpgrades",
];

const CUSTOM_HOME_KEYWORDS = [
  "custom home", "custom homes", "home builder", "home builders",
  "build a home", "build a house", "new home construction", "new construction",
  "home construction", "general contractor", "custom house", "luxury home",
  "home building", "house builder", "build custom home", "construction company",
  "brandon ms builder", "mississippi home builder", "central mississippi",
];

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { accessToken } = await base44.asServiceRole.connectors.getConnection("google_search_console");
    const body = await req.json().catch(() => ({}));
    const action = body.action || "getQueries";

    const scApiBase = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}`;

    async function searchAnalytics(payload) {
      const res = await fetch(`${scApiBase}/searchAnalytics/query`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return res.json();
    }

    // ── 1. All top queries ──────────────────────────────────────────────────
    if (action === "getQueries") {
      const endDate = new Date().toISOString().split("T")[0];
      const startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      const data = await searchAnalytics({
        startDate, endDate,
        dimensions: ["query"],
        rowLimit: 50,
        orderBy: [{ fieldName: "clicks", sortOrder: "DESCENDING" }],
      });
      return Response.json({ action, rows: data.rows || [], startDate, endDate });
    }

    // ── 2. Custom home construction traffic ─────────────────────────────────
    if (action === "getCustomHomeQueries") {
      const endDate = new Date().toISOString().split("T")[0];
      const startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      const data = await searchAnalytics({
        startDate, endDate,
        dimensions: ["query"],
        rowLimit: 500,
        orderBy: [{ fieldName: "impressions", sortOrder: "DESCENDING" }],
      });
      const rows = data.rows || [];
      const filtered = rows.filter(r => {
        const q = (r.keys[0] || "").toLowerCase();
        return CUSTOM_HOME_KEYWORDS.some(kw => q.includes(kw));
      });
      const totalClicks = filtered.reduce((s, r) => s + r.clicks, 0);
      const totalImpressions = filtered.reduce((s, r) => s + r.impressions, 0);
      const avgPosition = filtered.length ? filtered.reduce((s, r) => s + r.position, 0) / filtered.length : 0;
      return Response.json({ action, rows: filtered.slice(0, 50), totalClicks, totalImpressions, avgPosition, startDate, endDate, allQueriesCount: rows.length });
    }

    // ── 3. Per-page keyword breakdown ───────────────────────────────────────
    if (action === "getPageKeywords") {
      const endDate = new Date().toISOString().split("T")[0];
      const startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      const payload = {
        startDate, endDate,
        dimensions: ["page", "query"],
        rowLimit: 500,
        orderBy: [{ fieldName: "impressions", sortOrder: "DESCENDING" }],
      };
      if (body.page) {
        payload.dimensionFilterGroups = [{ filters: [{ dimension: "page", operator: "contains", expression: body.page }] }];
      }
      const data = await searchAnalytics(payload);
      const rows = data.rows || [];
      const pageMap = {};
      for (const row of rows) {
        const [page, query] = row.keys;
        const path = page.replace(SITE_URL, "") || "/";
        if (!pageMap[path]) pageMap[path] = { path, queries: [], clicks: 0, impressions: 0 };
        pageMap[path].queries.push({ query, clicks: row.clicks, impressions: row.impressions, position: row.position, ctr: row.ctr });
        pageMap[path].clicks += row.clicks;
        pageMap[path].impressions += row.impressions;
      }
      const pages = Object.values(pageMap)
        .sort((a, b) => b.impressions - a.impressions)
        .map(p => ({ ...p, queries: p.queries.sort((a, b) => b.impressions - a.impressions).slice(0, 15) }));
      return Response.json({ action, pages, startDate, endDate });
    }

    // ── 4. Index status check ───────────────────────────────────────────────
    if (action === "getIndexStatus") {
      const results = await Promise.all(
        ALL_PAGES.map(async (path) => {
          const fullUrl = `${SITE_URL}${path}`;
          const res = await fetch(`https://searchconsole.googleapis.com/v1/urlInspection/index:inspect`, {
            method: "POST",
            headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
            body: JSON.stringify({ inspectionUrl: fullUrl, siteUrl: SITE_URL }),
          });
          const d = await res.json();
          return {
            url: fullUrl, path,
            verdict: d.inspectionResult?.indexStatusResult?.verdict || "UNKNOWN",
            lastCrawlTime: d.inspectionResult?.indexStatusResult?.lastCrawlTime || null,
            coverageState: d.inspectionResult?.indexStatusResult?.coverageState || "Unknown",
          };
        })
      );
      const indexedCount = results.filter(r => r.verdict === "PASS" || r.verdict === "INDEXED").length;
      const unknownCount = results.filter(r => r.verdict === "UNKNOWN").length;

      await base44.asServiceRole.entities.IndexingLog.create({
        action: "getIndexStatus",
        success: true,
        total_pages: results.length,
        indexed_count: indexedCount,
        unknown_count: unknownCount,
        error_count: 0,
        page_results: results,
        triggered_by: user.email,
      });

      return Response.json({ action, results });
    }

    // ── 5. Submit sitemap only ──────────────────────────────────────────────
    if (action === "submitSitemap") {
      const res = await fetch(`${scApiBase}/sitemaps/${encodeURIComponent(SITEMAP_URL)}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const success = res.status === 200 || res.status === 204;
      const err = success ? null : await res.json().catch(() => ({}));
      await base44.asServiceRole.entities.IndexingLog.create({
        action: "submitSitemap",
        success,
        http_status: res.status,
        error_message: success ? null : JSON.stringify(err?.error?.message || err),
        triggered_by: user.email,
      });
      if (success) return Response.json({ action, success: true, sitemapUrl: SITEMAP_URL });
      return Response.json({ action, success: false, error: err }, { status: res.status });
    }

    // ── 6. Resubmit all pages ───────────────────────────────────────────────
    if (action === "resubmitAllPages") {
      const sitemapRes = await fetch(`${scApiBase}/sitemaps/${encodeURIComponent(SITEMAP_URL)}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const sitemapOk = sitemapRes.status === 200 || sitemapRes.status === 204;

      const results = await Promise.all(
        ALL_PAGES.map(async (path) => {
          const url = `${SITE_URL}${path}`;
          const res = await fetch(`https://searchconsole.googleapis.com/v1/urlInspection/index:inspect`, {
            method: "POST",
            headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
            body: JSON.stringify({ inspectionUrl: url, siteUrl: SITE_URL }),
          });
          if (res.status === 403) return { url, path, verdict: "SUBMITTED", coverageState: "Submitted via Sitemap", status: 403 };
          const d = await res.json();
          return {
            url, path,
            verdict: d.inspectionResult?.indexStatusResult?.verdict || "UNKNOWN",
            coverageState: d.inspectionResult?.indexStatusResult?.coverageState || "Unknown",
            lastCrawlTime: d.inspectionResult?.indexStatusResult?.lastCrawlTime || null,
            status: res.status,
          };
        })
      );

      const indexedCount = results.filter(r => r.verdict === "PASS" || r.verdict === "INDEXED").length;
      const unknownCount = results.filter(r => r.verdict === "UNKNOWN").length;
      const errorCount = results.filter(r => r.verdict === "FAIL" || (r.status && r.status >= 400 && r.status !== 403)).length;

      await base44.asServiceRole.entities.IndexingLog.create({
        action: "resubmitAllPages",
        success: sitemapOk,
        sitemap_submitted: sitemapOk,
        total_pages: results.length,
        indexed_count: indexedCount,
        unknown_count: unknownCount,
        error_count: errorCount,
        page_results: results,
        triggered_by: user.email,
      });

      return Response.json({ action, results, sitemapResubmitted: sitemapOk });
    }

    // ── 7. Crawl error analysis for landing pages ───────────────────────────
    if (action === "getCrawlErrors") {
      const LANDING_PAGES = [
        "/",
        "/Services",
        "/Portfolio",
        "/Contact",
        "/About",
        "/QuoteAssistant",
        "/ScheduleVisit",
        "/LandingCoreServices",
        "/LandingEmergencyRepair",
        "/LandingBrandonRemodelers",
        "/SmallBathroomIdeas",
        "/LuxuryHomeRenovations",
        "/LandingPricing",
        "/LandingTrust",
        "/RenovationLoans",
        "/HomeAdditionIdeas",
        "/EnergyEfficientUpgrades",
        "/ProTips",
        "/ContactForm",
      ];

      // Inspect all pages in parallel
      const inspections = await Promise.all(
        LANDING_PAGES.map(async (path) => {
          const fullUrl = `${SITE_URL}${path}`;
          const res = await fetch(`https://searchconsole.googleapis.com/v1/urlInspection/index:inspect`, {
            method: "POST",
            headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
            body: JSON.stringify({ inspectionUrl: fullUrl, siteUrl: SITE_URL }),
          });
          const d = await res.json();
          const result = d.inspectionResult || {};
          const indexStatus = result.indexStatusResult || {};
          const mobileUsability = result.mobileUsabilityResult || {};
          const richResults = result.richResultsResult || {};

          return {
            url: fullUrl,
            path,
            verdict: indexStatus.verdict || "UNKNOWN",
            coverageState: indexStatus.coverageState || "Unknown",
            lastCrawlTime: indexStatus.lastCrawlTime || null,
            crawledAs: indexStatus.crawledAs || null,
            robotsTxtState: indexStatus.robotsTxtState || null,
            indexingState: indexStatus.indexingState || null,
            mobileVerdict: mobileUsability.verdict || "UNKNOWN",
            mobileIssues: (mobileUsability.issues || []).map(i => i.issueMessage),
            richResultsVerdict: richResults.verdict || null,
            httpStatus: result.httpStatusCode || null,
          };
        })
      );

      const indexed = inspections.filter(r => r.verdict === "PASS");
      const errors = inspections.filter(r => r.verdict === "FAIL");
      const warnings = inspections.filter(r => r.verdict === "NEUTRAL" || r.verdict === "UNKNOWN");
      const mobileIssues = inspections.filter(r => r.mobileVerdict === "FAIL" || r.mobileIssues?.length > 0);

      // Get search performance for these pages
      const endDate = new Date().toISOString().split("T")[0];
      const startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      const perfData = await searchAnalytics({
        startDate, endDate,
        dimensions: ["page"],
        rowLimit: 500,
        orderBy: [{ fieldName: "impressions", sortOrder: "DESCENDING" }],
      });
      const perfMap = {};
      for (const row of (perfData.rows || [])) {
        const path = row.keys[0].replace(SITE_URL, "") || "/";
        perfMap[path] = { clicks: row.clicks, impressions: row.impressions, position: row.position, ctr: row.ctr };
      }

      // Merge perf data
      const enriched = inspections.map(r => ({
        ...r,
        perf: perfMap[r.path] || null,
      }));

      // AI analysis
      const errorSummary = errors.map(e => `${e.path}: ${e.coverageState}, mobile: ${e.mobileVerdict}`).join("\n");
      const warningSummary = warnings.map(w => `${w.path}: ${w.coverageState}`).join("\n");

      const aiRes = await base44.asServiceRole.integrations.Core.InvokeLLM({
        prompt: `You are an SEO expert analyzing crawl errors for a home remodeling contractor website (bradleybrowninc.com).

Index Status Summary:
- Indexed: ${indexed.length} pages
- Errors (FAIL): ${errors.length} pages
- Warnings/Unknown: ${warnings.length} pages
- Mobile Issues: ${mobileIssues.length} pages

Error Pages:
${errorSummary || "None"}

Warning Pages:
${warningSummary || "None"}

Mobile Issue Pages:
${mobileIssues.map(p => `${p.path}: ${p.mobileIssues.join(", ")}`).join("\n") || "None"}

Provide 3-5 specific, actionable recommendations to fix crawl errors and improve indexing for this home remodeling contractor site. Focus on the most impactful issues first.

Return JSON: { "summary": "2-3 sentence overview", "recommendations": [{ "title": "short title", "detail": "actionable step", "priority": "high|medium|low", "affectedPages": ["path1"] }] }`,
        response_json_schema: {
          type: "object",
          properties: {
            summary: { type: "string" },
            recommendations: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  detail: { type: "string" },
                  priority: { type: "string" },
                  affectedPages: { type: "array", items: { type: "string" } },
                },
              },
            },
          },
        },
      });

      return Response.json({
        action,
        pages: enriched,
        summary: { total: inspections.length, indexed: indexed.length, errors: errors.length, warnings: warnings.length, mobileIssues: mobileIssues.length },
        aiInsights: aiRes,
        dateRange: { startDate, endDate },
      });
    }

    // ── Legacy requestIndexing alias ────────────────────────────────────────
    if (action === "requestIndexing") {
      const urlsToIndex = (body.urls || ALL_PAGES).map(p => p.startsWith("http") ? p : `${SITE_URL}${p}`);
      const sitemapRes = await fetch(`${scApiBase}/sitemaps/${encodeURIComponent(SITEMAP_URL)}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const sitemapOk = sitemapRes.status === 200 || sitemapRes.status === 204;
      const results = await Promise.all(
        urlsToIndex.map(async (url) => {
          const res = await fetch(`https://searchconsole.googleapis.com/v1/urlInspection/index:inspect`, {
            method: "POST",
            headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
            body: JSON.stringify({ inspectionUrl: url, siteUrl: SITE_URL }),
          });
          if (res.status === 403) return { url, verdict: "SUBMITTED", coverageState: "Submitted via Sitemap", status: 403 };
          const d = await res.json();
          return { url, verdict: d.inspectionResult?.indexStatusResult?.verdict || "UNKNOWN", coverageState: d.inspectionResult?.indexStatusResult?.coverageState || "Unknown", status: res.status };
        })
      );
      return Response.json({ action, results, sitemapResubmitted: sitemapOk });
    }

    return Response.json({ error: "Unknown action" }, { status: 400 });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});