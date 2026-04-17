import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

const SITE_URL = "https://bradleybrowninc.com";

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
    { url: "/Services", priority: "0.9", changefreq: "monthly" },
    { url: "/Portfolio", priority: "0.8", changefreq: "weekly" },
    { url: "/About", priority: "0.7", changefreq: "monthly" },
    { url: "/Contact", priority: "0.8", changefreq: "monthly" },
    { url: "/QuoteAssistant", priority: "0.9", changefreq: "monthly" },
    { url: "/ProTips", priority: "0.8", changefreq: "weekly" },
    { url: "/ScheduleVisit", priority: "0.8", changefreq: "monthly" },
    { url: "/ContactForm", priority: "0.8", changefreq: "monthly" },
    { url: "/SmallBathroomIdeas", priority: "0.8", changefreq: "monthly" },
    { url: "/LuxuryHomeRenovations", priority: "0.8", changefreq: "monthly" },
    { url: "/LandingCoreServices", priority: "0.9", changefreq: "monthly" },
    { url: "/LandingEmergencyRepair", priority: "0.9", changefreq: "monthly" },
    { url: "/LandingBrandonRemodelers", priority: "0.9", changefreq: "monthly" },
    { url: "/LandingPricing", priority: "0.8", changefreq: "monthly" },
    { url: "/LandingTrust", priority: "0.8", changefreq: "monthly" },
    { url: "/RenovationLoans", priority: "0.7", changefreq: "monthly" },
    { url: "/HomeAdditionIdeas", priority: "0.7", changefreq: "monthly" },
    { url: "/EnergyEfficientUpgrades", priority: "0.7", changefreq: "monthly" },
    { url: "/projects/historic-home-restoration", priority: "0.8", changefreq: "monthly" },
    { url: "/barndominium-builder", priority: "0.9", changefreq: "monthly" },
  ];

  // Paths that should NEVER appear in the sitemap (noindex / internal / deprecated)
  const NOINDEX_PATHS = [
    "/barndominiums-ms",      // deprecated — replaced by /barndominium-builder
    "/Legal",
    "/sms-optin",
    "/thank-you",
    "/ThankYou",
    "/AccountSettings",
    "/Leads",
    "/CRM",
    "/SEODashboard",
    "/FunnelAnalysis",
    "/BlogAdmin",
    "/SiteImages",
    "/ConversionDashboard",
    "/AgentChat",
    "/TikTokSync",
  ];
  const filteredStaticPages = staticPages.filter(p => !NOINDEX_PATHS.includes(p.url));

  const urlEntries = [
    ...filteredStaticPages.map(page => `
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