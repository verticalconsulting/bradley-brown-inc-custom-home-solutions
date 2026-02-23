import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

const SITE_URL = "https://bradleybrownhomes.com"; // Update to your live domain

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  // Fetch published projects for dynamic URLs
  let projects = [];
  try {
    projects = await base44.asServiceRole.entities.Project.filter({ status: "published" });
  } catch (_) {
    // Continue with static pages only
  }

  const today = new Date().toISOString().split("T")[0];

  const staticPages = [
    { url: "/", priority: "1.0", changefreq: "weekly" },
    { url: "/services", priority: "0.9", changefreq: "monthly" },
    { url: "/portfolio", priority: "0.8", changefreq: "weekly" },
    { url: "/about", priority: "0.7", changefreq: "monthly" },
    { url: "/contact", priority: "0.8", changefreq: "monthly" },
    { url: "/quote-assistant", priority: "0.9", changefreq: "monthly" },
  ];

  const urlEntries = [
    ...staticPages.map(page => `
  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`),
    ...projects.map(p => `
  <url>
    <loc>${SITE_URL}/portfolio/${p.id}</loc>
    <lastmod>${p.updated_date ? p.updated_date.split("T")[0] : today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
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