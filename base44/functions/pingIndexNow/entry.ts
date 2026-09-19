import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const SITE_URL = "https://bradleybrowninc.com";
const INDEXNOW_KEY = process.env.INDEXNOW_KEY;
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));

    let urls: string[] = [];
    let submitSitemap = false;

    // Mode 1: Entity automation payload (JobCheckin published)
    if (body.event?.entity_name === "JobCheckin" && body.data?.status === "published") {
      if (body.old_data?.status !== "published" && body.data.slug) {
        urls.push(`${SITE_URL}/jobsites/${body.data.slug}`);
        submitSitemap = true;
      }
    } else if (body.event?.entity_name === "BlogPost" && body.data?.published === true) {
      if (body.old_data?.published !== true && body.data.slug) {
        urls.push(`${SITE_URL}/protips/${body.data.slug}`);
        submitSitemap = true;
      }
    } else if (body.urls && Array.isArray(body.urls)) {
      // Mode 2: Direct call with explicit URLs — require admin
      const user = await base44.auth.me();
      if (!user || user.role !== "admin") {
        return Response.json({ error: "Forbidden" }, { status: 403 });
      }
      urls = body.urls.map((u: string) => u.startsWith("http") ? u : `${SITE_URL}${u}`);
      submitSitemap = body.submitSitemap ?? false;
    } else {
      return Response.json({ error: "No valid payload — provide event data or urls array" }, { status: 400 });
    }

    if (urls.length === 0) {
      return Response.json({ success: true, message: "No URLs to ping (entity did not transition to published)" });
    }

    // Ping IndexNow (Bing, Yandex, Copilot/AI crawlers)
    let indexNowStatus: number | null = null;
    let indexNowError: string | null = null;
    try {
      const res = await fetch("https://api.indexnow.org/IndexNow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          host: "bradleybrowninc.com",
          key: INDEXNOW_KEY,
          keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
          urlList: urls,
        }),
      });
      indexNowStatus = res.status;
      if (!res.ok && res.status !== 200 && res.status !== 202) {
        indexNowError = await res.text().catch(() => null);
      }
    } catch (e) {
      indexNowError = e.message;
    }

    // Optionally submit sitemap to Google Search Console
    let gscStatus: number | null = null;
    let gscError: string | null = null;
    if (submitSitemap) {
      try {
        const { accessToken } = await base44.asServiceRole.connectors.getConnection("google_search_console");
        const scApiBase = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}`;
        const res = await fetch(`${scApiBase}/sitemaps/${encodeURIComponent(SITEMAP_URL)}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        gscStatus = res.status;
        if (!res.ok && res.status !== 204) {
          gscError = await res.text().catch(() => null);
        }
      } catch (e) {
        gscError = e.message;
      }
    }

    // Log to IndexingLog
    await base44.asServiceRole.entities.IndexingLog.create({
      action: "pingIndexNow",
      success: indexNowStatus === 200 || indexNowStatus === 202,
      sitemap_submitted: gscStatus === 200 || gscStatus === 204,
      total_pages: urls.length,
      error_message: indexNowError || gscError || null,
      http_status: indexNowStatus ?? undefined,
      triggered_by: body.event ? "automation" : "manual",
    }).catch(() => {});

    return Response.json({
      success: indexNowStatus === 200 || indexNowStatus === 202,
      pingedUrls: urls,
      indexNowStatus,
      gscStatus,
      error: indexNowError || gscError || null,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});