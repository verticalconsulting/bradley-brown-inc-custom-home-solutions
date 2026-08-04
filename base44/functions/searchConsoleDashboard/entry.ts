import { createClientFromRequest } from "npm:@base44/sdk@0.8.23";
import {
  SITE_URL,
  GSC_PROPERTY,
  SITEMAP_INDEX_URL,
  FUNCTIONS_SITEMAP_URL,
  getAllCanonicalPaths,
  getRedirectedUrls,
  normalizeToCanonical,
  sortByPriority,
} from "../../shared/canonicalUrls.ts";

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
    if (!user || user.role !== "admin") {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    const { accessToken } = await base44.asServiceRole.connectors.getConnection("google_search_console");
    const body = await req.json().catch(() => ({}));
    const action = body.action || "getQueries";

    // GSC API base — uses GSC_PROPERTY (with trailing slash) to match the registered property exactly.
    // A property-string mismatch (e.g. missing trailing slash) returns empty data silently.
    const scApiBase = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_PROPERTY)}`;

    async function searchAnalytics(payload) {
      const res = await fetch(`${scApiBase}/searchAnalytics/query`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return res.json();
    }

    // ── 1. Top queries (90 days) ───────────────────────────────────────────
    if (action === "getQueries") {
      const endDate = new Date().toISOString().split("T")[0];
      const startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      const data = await searchAnalytics({
        startDate, endDate,
        dimensions: ["query"],
        rowLimit: 50,
        orderBy: [{ fieldName: "clicks", sortOrder: "DESCENDING" }],
      });
      return Response.json({ action, rows: data.rows || [], startDate, endDate, property: GSC_PROPERTY });
    }

    // ── 2. Custom home construction traffic ────────────────────────────────
    // Filters by PAGE URL for /services/custom-home-building and /custom-home-builder-brandon-ms
    // (the combined kitchen-bathroom URL is retired).
    if (action === "getCustomHomeQueries") {
      const endDate = new Date().toISOString().split("T")[0];
      const startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      const targetPages = [
        `${SITE_URL}/services/custom-home-building`,
        `${SITE_URL}/custom-home-builder-brandon-ms`,
      ];
      const data = await searchAnalytics({
        startDate, endDate,
        dimensions: ["query"],
        dimensionFilterGroups: [{
          groupType: "OR",
          filters: targetPages.map((page) => ({ dimension: "page", operator: "equals", expression: page })),
        }],
        rowLimit: 500,
        orderBy: [{ fieldName: "impressions", sortOrder: "DESCENDING" }],
      });
      const rows = data.rows || [];
      const totalClicks = rows.reduce((s, r) => s + r.clicks, 0);
      const totalImpressions = rows.reduce((s, r) => s + r.impressions, 0);
      const avgPosition = rows.length ? rows.reduce((s, r) => s + r.position, 0) / rows.length : 0;
      return Response.json({ action, rows: rows.slice(0, 50), totalClicks, totalImpressions, avgPosition, startDate, endDate, targetPages });
    }

    // ── 3. Per-page keyword breakdown with URL normalization ──────────────
    // Old URLs' metrics roll up into their canonical destination via the redirect map.
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

      // URL normalization: roll up old URLs into canonical
      const pageMap = {};
      for (const row of rows) {
        const [pageUrl, query] = row.keys;
        const canonicalPath = normalizeToCanonical(pageUrl);
        if (!pageMap[canonicalPath]) {
          pageMap[canonicalPath] = { path: canonicalPath, queries: {}, clicks: 0, impressions: 0 };
        }
        const qKey = query;
        if (!pageMap[canonicalPath].queries[qKey]) {
          pageMap[canonicalPath].queries[qKey] = { query, clicks: 0, impressions: 0, positionSum: 0, ctrSum: 0 };
        }
        const q = pageMap[canonicalPath].queries[qKey];
        q.clicks += row.clicks;
        q.impressions += row.impressions;
        q.positionSum += row.position * row.impressions;
        q.ctrSum += row.ctr * row.clicks;
        pageMap[canonicalPath].clicks += row.clicks;
        pageMap[canonicalPath].impressions += row.impressions;
      }

      const pages = Object.values(pageMap)
        .sort((a, b) => b.impressions - a.impressions)
        .map((p) => ({
          path: p.path,
          clicks: p.clicks,
          impressions: p.impressions,
          queries: Object.values(p.queries)
            .map((q) => ({
              query: q.query,
              clicks: q.clicks,
              impressions: q.impressions,
              position: q.impressions ? q.positionSum / q.impressions : 0,
              ctr: q.clicks ? q.ctrSum / q.clicks : 0,
            }))
            .sort((a, b) => b.impressions - a.impressions)
            .slice(0, 15),
        }));

      return Response.json({ action, pages, startDate, endDate });
    }

    // ── 4. Index status check ─────────────────────────────────────────────
    // Inspects canonical URLs + old redirected URLs (expected: "Page with redirect").
    if (action === "getIndexStatus") {
      const allPaths = await getAllCanonicalPaths(base44);

      const results = await Promise.all(
        allPaths.map(async (path) => {
          const fullUrl = `${SITE_URL}${path}`;
          const res = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
            method: "POST",
            headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
            body: JSON.stringify({ inspectionUrl: fullUrl, siteUrl: GSC_PROPERTY }),
          });
          const d = await res.json();
          const idx = d.inspectionResult?.indexStatusResult || {};
          return {
            url: fullUrl, path,
            verdict: idx.verdict || "UNKNOWN",
            lastCrawlTime: idx.lastCrawlTime || null,
            coverageState: idx.coverageState || "Unknown",
            googleCanonical: idx.googleCanonical || null,
            userCanonical: idx.userCanonical || null,
            sitemap: idx.sitemap || null,
            crawledAs: idx.crawledAs || null,
            robotsTxtState: idx.robotsTxtState || null,
          };
        })
      );

      // Also inspect OLD redirected URLs — expect "Page with redirect" (✅ EXPECTED)
      const redirects = getRedirectedUrls();
      const redirectResults = await Promise.all(
        redirects.map(async ({ from, to }) => {
          const fullUrl = `${SITE_URL}${from}`;
          const res = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
            method: "POST",
            headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
            body: JSON.stringify({ inspectionUrl: fullUrl, siteUrl: GSC_PROPERTY }),
          });
          const d = await res.json();
          const idx = d.inspectionResult?.indexStatusResult || {};
          return {
            url: fullUrl, path: from, redirectTo: to,
            verdict: idx.verdict || "UNKNOWN",
            coverageState: idx.coverageState || "Unknown",
            lastCrawlTime: idx.lastCrawlTime || null,
            googleCanonical: idx.googleCanonical || null,
          };
        })
      );

      const indexedCount = results.filter((r) => r.verdict === "PASS").length;
      const unknownCount = results.filter((r) => r.verdict === "UNKNOWN").length;

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

      return Response.json({ action, results, redirectResults });
    }

    // ── 5. Submit sitemap ─────────────────────────────────────────────────
    // Submits the Hado-served sitemap INDEX (https://bradleybrowninc.com/sitemap.xml)
    // and returns GSC response details for both the index and its child /functions/sitemap.
    if (action === "submitSitemap") {
      const submitRes = await fetch(`${scApiBase}/sitemaps/${encodeURIComponent(SITEMAP_INDEX_URL)}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const submitOk = submitRes.status === 200 || submitRes.status === 204;

      let indexDetails = null;
      let childDetails = null;

      if (submitOk) {
        // Fetch sitemap index details (status, lastDownloaded, discovered URLs)
        const indexRes = await fetch(`${scApiBase}/sitemaps/${encodeURIComponent(SITEMAP_INDEX_URL)}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (indexRes.status === 200) {
          const indexData = await indexRes.json();
          indexDetails = {
            path: indexData.path,
            lastSubmitted: indexData.lastSubmitted,
            lastDownloaded: indexData.lastDownloaded,
            isSitemapsIndex: indexData.isSitemapsIndex,
            isPending: indexData.isPending,
            errors: indexData.errors,
            warnings: indexData.warnings,
            contents: indexData.contents,
          };
        }

        // Fetch child /functions/sitemap details
        const childRes = await fetch(`${scApiBase}/sitemaps/${encodeURIComponent(FUNCTIONS_SITEMAP_URL)}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (childRes.status === 200) {
          const childData = await childRes.json();
          childDetails = {
            path: childData.path,
            lastSubmitted: childData.lastSubmitted,
            lastDownloaded: childData.lastDownloaded,
            isPending: childData.isPending,
            errors: childData.errors,
            warnings: childData.warnings,
          };
        }
      }

      const err = submitOk ? null : await submitRes.json().catch(() => ({}));

      await base44.asServiceRole.entities.IndexingLog.create({
        action: "submitSitemap",
        success: submitOk,
        sitemap_submitted: submitOk,
        http_status: submitRes.status,
        error_message: submitOk ? null : JSON.stringify(err?.error?.message || err),
        triggered_by: user.email,
      });

      if (submitOk) {
        return Response.json({ action, success: true, sitemapUrl: SITEMAP_INDEX_URL, indexDetails, childDetails });
      }
      return Response.json({ action, success: false, error: err, httpStatus: submitRes.status });
    }

    // ── 6. Resubmit all pages ─────────────────────────────────────────────
    // NOTE: The Google Indexing API (indexing/v3/urlNotifications:publish) officially supports
    // only JobPosting and BroadcastEvent pages and may be ignored for regular pages.
    // The URL Inspection API's requestIndexing is only available through the GSC web UI,
    // not the public API. This action submits the sitemap (the primary indexing signal)
    // and inspects each URL in priority order to surface current index status.
    //
    // IMPORTANT: Before running this, refresh the Hado cache in the dashboard — Google
    // will index the cached prerender. The frontend shows a blocking confirmation.
    if (action === "resubmitAllPages") {
      const allPaths = await getAllCanonicalPaths(base44);
      const prioritizedPaths = sortByPriority(allPaths);

      // Submit sitemap first
      const sitemapRes = await fetch(`${scApiBase}/sitemaps/${encodeURIComponent(SITEMAP_INDEX_URL)}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const sitemapOk = sitemapRes.status === 200 || sitemapRes.status === 204;

      // Inspect each URL in priority order
      const results = await Promise.all(
        prioritizedPaths.map(async (path) => {
          const url = `${SITE_URL}${path}`;
          const res = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
            method: "POST",
            headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
            body: JSON.stringify({ inspectionUrl: url, siteUrl: GSC_PROPERTY }),
          });
          if (res.status === 403) return { url, path, verdict: "SUBMITTED", coverageState: "Submitted via Sitemap", status: 403 };
          const d = await res.json();
          const idx = d.inspectionResult?.indexStatusResult || {};
          return {
            url, path,
            verdict: idx.verdict || "UNKNOWN",
            coverageState: idx.coverageState || "Unknown",
            lastCrawlTime: idx.lastCrawlTime || null,
            status: res.status,
          };
        })
      );

      const indexedCount = results.filter((r) => r.verdict === "PASS").length;
      const unknownCount = results.filter((r) => r.verdict === "UNKNOWN").length;
      const errorCount = results.filter((r) => r.verdict === "FAIL" || (r.status && r.status >= 400 && r.status !== 403)).length;

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

      return Response.json({
        action, results, sitemapResubmitted: sitemapOk,
        note: "Google Indexing API only supports JobPosting/BroadcastEvent pages. Sitemap submission + URL inspection used instead. Request indexing manually in GSC UI for high-priority pages.",
      });
    }

    // ── 7. Crawl error analysis ───────────────────────────────────────────
    // Uses canonical URLs from /functions/sitemap (no old/redirected URLs).
    // Includes NotFoundLog data for Visitor 404s (human traffic only — bots see Hado's prerender).
    if (action === "getCrawlErrors") {
      const allPaths = await getAllCanonicalPaths(base44);

      const inspections = await Promise.all(
        allPaths.map(async (path) => {
          const fullUrl = `${SITE_URL}${path}`;
          const res = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
            method: "POST",
            headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
            body: JSON.stringify({ inspectionUrl: fullUrl, siteUrl: GSC_PROPERTY }),
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
            googleCanonical: indexStatus.googleCanonical || null,
            userCanonical: indexStatus.userCanonical || null,
            mobileVerdict: mobileUsability.verdict || "UNKNOWN",
            mobileIssues: (mobileUsability.issues || []).map((i) => i.issueMessage),
            richResultsVerdict: richResults.verdict || null,
            httpStatus: result.httpStatusCode || null,
          };
        })
      );

      const indexed = inspections.filter((r) => r.verdict === "PASS");
      const errors = inspections.filter((r) => r.verdict === "FAIL");
      const warnings = inspections.filter((r) => r.verdict === "NEUTRAL" || r.verdict === "UNKNOWN");
      const mobileIssues = inspections.filter((r) => r.mobileVerdict === "FAIL" || r.mobileIssues?.length > 0);

      // Visitor 404s from NotFoundLog (human traffic only — bots see Hado's prerender)
      let visitor404s = [];
      try {
        visitor404s = await base44.asServiceRole.entities.NotFoundLog.filter({ resolved: false }, "-last_seen", 20);
      } catch (_) {}

      // Search performance data (with URL normalization)
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
        const canonicalPath = normalizeToCanonical(row.keys[0]);
        if (!perfMap[canonicalPath]) {
          perfMap[canonicalPath] = { clicks: 0, impressions: 0, positionSum: 0, ctrSum: 0 };
        }
        perfMap[canonicalPath].clicks += row.clicks;
        perfMap[canonicalPath].impressions += row.impressions;
        perfMap[canonicalPath].positionSum += row.position * row.impressions;
        perfMap[canonicalPath].ctrSum += row.ctr * row.clicks;
      }
      for (const path in perfMap) {
        const p = perfMap[path];
        p.position = p.impressions ? p.positionSum / p.impressions : 0;
        p.ctr = p.clicks ? p.ctrSum / p.clicks : 0;
      }

      const enriched = inspections.map((r) => ({
        ...r,
        perf: perfMap[r.path] || null,
      }));

      // AI analysis
      const errorSummary = errors.map((e) => `${e.path}: ${e.coverageState}, mobile: ${e.mobileVerdict}`).join("\n");
      const warningSummary = warnings.map((w) => `${w.path}: ${w.coverageState}`).join("\n");

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
${mobileIssues.map((p) => `${p.path}: ${p.mobileIssues.join(", ")}`).join("\n") || "None"}

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
        visitor404s,
        summary: {
          total: inspections.length, indexed: indexed.length,
          errors: errors.length, warnings: warnings.length,
          mobileIssues: mobileIssues.length, visitor404s: visitor404s.length,
        },
        aiInsights: aiRes,
        dateRange: { startDate, endDate },
        hadoDashboardUrl: "https://hadoseo.com/dashboard",
      });
    }

    // ── 8. Visitor 404s (NotFoundLog) ─────────────────────────────────────
    if (action === "getVisitor404s") {
      let logs = [];
      try {
        logs = await base44.asServiceRole.entities.NotFoundLog.filter({ resolved: false }, "-last_seen", 50);
      } catch (_) {}
      return Response.json({ action, logs });
    }

    // ── Legacy requestIndexing alias ──────────────────────────────────────
    if (action === "requestIndexing") {
      const allPaths = await getAllCanonicalPaths(base44);
      const urlsToIndex = (body.urls || allPaths).map((p) => (p.startsWith("http") ? p : `${SITE_URL}${p}`));
      const sitemapRes = await fetch(`${scApiBase}/sitemaps/${encodeURIComponent(SITEMAP_INDEX_URL)}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const sitemapOk = sitemapRes.status === 200 || sitemapRes.status === 204;
      const results = await Promise.all(
        urlsToIndex.map(async (url) => {
          const res = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
            method: "POST",
            headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
            body: JSON.stringify({ inspectionUrl: url, siteUrl: GSC_PROPERTY }),
          });
          if (res.status === 403) return { url, verdict: "SUBMITTED", coverageState: "Submitted via Sitemap", status: 403 };
          const d = await res.json();
          return {
            url,
            verdict: d.inspectionResult?.indexStatusResult?.verdict || "UNKNOWN",
            coverageState: d.inspectionResult?.indexStatusResult?.coverageState || "Unknown",
            status: res.status,
          };
        })
      );
      return Response.json({ action, results, sitemapResubmitted: sitemapOk });
    }

    return Response.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});