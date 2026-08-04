import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const SITE_URL = "https://bradleybrowninc.com";

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  // Fetch published blog posts (for /protips/:slug dynamic URLs)
  let blogPosts = [];
  try {
    blogPosts = await base44.asServiceRole.entities.BlogPost.filter({ published: true });
  } catch (_) {}

  // Fetch published jobsite check-ins (for /jobsites/:slug dynamic URLs)
  let jobsites = [];
  try {
    jobsites = await base44.asServiceRole.entities.JobCheckin.filter({ status: "published" });
  } catch (_) {}

  const today = new Date().toISOString().split("T")[0];

  // ── Canonical static pages — only URLs that return HTTP 200 (no redirects) ──
  const staticPages = [
    { url: "/", priority: "1.0", changefreq: "weekly" },
    { url: "/services", priority: "0.9", changefreq: "monthly" },
    { url: "/services/custom-home-building", priority: "0.8", changefreq: "monthly" },
    { url: "/services/kitchen-bathroom-remodeling", priority: "0.8", changefreq: "monthly" },
    { url: "/services/room-additions", priority: "0.8", changefreq: "monthly" },
    { url: "/services/outdoor-living", priority: "0.8", changefreq: "monthly" },
    { url: "/services/barndominiums", priority: "0.8", changefreq: "monthly" },
    { url: "/services/emergency-repairs", priority: "0.8", changefreq: "monthly" },
    { url: "/portfolio", priority: "0.8", changefreq: "weekly" },
    { url: "/about", priority: "0.7", changefreq: "monthly" },
    { url: "/contact", priority: "0.8", changefreq: "monthly" },
    { url: "/pricing", priority: "0.8", changefreq: "monthly" },
    { url: "/remodeling-brandon-ms", priority: "0.9", changefreq: "monthly" },
    { url: "/remodeling-ms", priority: "0.8", changefreq: "monthly" },
    { url: "/custom-home-builder-brandon-ms", priority: "0.9", changefreq: "monthly" },
    { url: "/bathroom-remodeling-brandon-ms", priority: "0.8", changefreq: "monthly" },
    { url: "/madison-ms-home-remodeling", priority: "0.8", changefreq: "monthly" },
    { url: "/protips", priority: "0.8", changefreq: "weekly" },
    { url: "/estimate", priority: "0.9", changefreq: "monthly" },
    { url: "/legal", priority: "0.3", changefreq: "yearly" },
  ];

  const urlEntries = [
    ...staticPages.map(page => `
  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`),
    ...blogPosts.filter(b => b.slug).map(b => `
  <url>
    <loc>${SITE_URL}/protips/${b.slug}</loc>
    <lastmod>${(b.updated_date || b.created_date || today).split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`),
    ...jobsites.filter(j => j.slug).map(j => `
  <url>
    <loc>${SITE_URL}/jobsites/${j.slug}</loc>
    <lastmod>${(j.updated_date || j.published_date || j.created_date || today).split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`)
  ].join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=UTF-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
});