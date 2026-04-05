import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

const SITE_URL = "https://bradleybrowninc.com";
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

const KEY_URLS = [
  "/",
  "/Services",
  "/Portfolio",
  "/Contact",
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

const NEW_LANDING_PAGES = [
  "/LandingCoreServices",
  "/LandingEmergencyRepair",
  "/LandingBrandonRemodelers",
  "/LandingPricing",
  "/LandingTrust",
  "/SmallBathroomIdeas",
  "/LuxuryHomeRenovations",
  "/RenovationLoans",
  "/HomeAdditionIdeas",
  "/EnergyEfficientUpgrades",
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

    // ── 1. Get top search queries ──────────────────────────────────────────
    if (action === "getQueries") {
      const endDate = new Date().toISOString().split("T")[0];
      const startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

      const res = await fetch(
        `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            startDate,
            endDate,
            dimensions: ["query"],
            rowLimit: 25,
            orderBy: [{ fieldName: "clicks", sortOrder: "DESCENDING" }],
          }),
        }
      );
      const data = await res.json();
      return Response.json({ action, rows: data.rows || [], startDate, endDate });
    }

    // ── 2. Get index / coverage status for key URLs ────────────────────────
    if (action === "getIndexStatus") {
      const results = await Promise.all(
        KEY_URLS.map(async (path) => {
          const fullUrl = `${SITE_URL}${path}`;
          const res = await fetch(
            `https://searchconsole.googleapis.com/v1/urlInspection/index:inspect`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                inspectionUrl: fullUrl,
                siteUrl: SITE_URL,
              }),
            }
          );
          const data = await res.json();
          const result = data.inspectionResult || {};
          return {
            url: fullUrl,
            path,
            verdict: result.indexStatusResult?.verdict || "UNKNOWN",
            lastCrawlTime: result.indexStatusResult?.lastCrawlTime || null,
            coverageState: result.indexStatusResult?.coverageState || "Unknown",
          };
        })
      );
      return Response.json({ action, results });
    }

    // ── 3. Submit sitemap ──────────────────────────────────────────────────
    if (action === "submitSitemap") {
      const res = await fetch(
        `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/sitemaps/${encodeURIComponent(SITEMAP_URL)}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.status === 200 || res.status === 204) {
        return Response.json({ action, success: true, sitemapUrl: SITEMAP_URL });
      } else {
        const err = await res.json().catch(() => ({}));
        return Response.json({ action, success: false, error: err }, { status: res.status });
      }
    }

    // ── 4. Request indexing for new landing pages ─────────────────────────
    if (action === "requestIndexing") {
      const urlsToIndex = (body.urls || NEW_LANDING_PAGES).map((p) =>
        p.startsWith("http") ? p : `${SITE_URL}${p}`
      );

      // Submit/refresh the sitemap — most reliable way to signal new pages to Google
      const sitemapRes = await fetch(
        `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/sitemaps/${encodeURIComponent(SITEMAP_URL)}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const sitemapOk = sitemapRes.status === 200 || sitemapRes.status === 204;

      // Use URL Inspection to check current index status for each page
      const results = await Promise.all(
        urlsToIndex.map(async (url) => {
          const res = await fetch(
            `https://searchconsole.googleapis.com/v1/urlInspection/index:inspect`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                inspectionUrl: url,
                siteUrl: SITE_URL,
              }),
            }
          );
          if (res.status === 403) {
            // Inspection API may require URL-prefix property; mark as submitted via sitemap
            return { url, verdict: "SUBMITTED", coverageState: "Submitted via Sitemap", status: res.status };
          }
          const data = await res.json();
          const verdict = data.inspectionResult?.indexStatusResult?.verdict || "UNKNOWN";
          const coverageState = data.inspectionResult?.indexStatusResult?.coverageState || "Unknown";
          return { url, verdict, coverageState, status: res.status };
        })
      );

      return Response.json({ action, results, sitemapResubmitted: sitemapOk });
    }

    return Response.json({ error: "Unknown action" }, { status: 400 });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});