import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

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

  // Fetch published jobsite check-ins
  let jobsites = [];
  try {
    jobsites = await base44.asServiceRole.entities.JobCheckin.filter({ status: "published" });
  } catch (_) {
    // Continue
  }

  // Fetch published blog posts
  let blogPosts = [];
  try {
    blogPosts = await base44.asServiceRole.entities.BlogPost.filter({ published: true });
  } catch (_) {
    // Continue
  }

  // Fetch active services
  let services = [];
  try {
    services = await base44.asServiceRole.entities.Service.filter({ active: true });
  } catch (_) {
    // Continue
  }

  const today = new Date().toISOString().split("T")[0];

  // Static pages — loc, lastmod (today), changefreq, priority
  const staticPages = [
    { url: "/", priority: "1.0", changefreq: "weekly" },
    { url: "/Home", priority: "1.0", changefreq: "weekly" },
    { url: "/Services", priority: "0.9", changefreq: "monthly" },
    { url: "/Portfolio", priority: "0.8", changefreq: "weekly" },
    { url: "/About", priority: "0.7", changefreq: "monthly" },
    { url: "/Contact", priority: "0.8", changefreq: "monthly" },
    { url: "/ContactForm", priority: "0.8", changefreq: "monthly" },
    { url: "/QuoteAssistant", priority: "0.9", changefreq: "monthly" },
    { url: "/ProTips", priority: "0.8", changefreq: "weekly" },
    { url: "/ScheduleVisit", priority: "0.8", changefreq: "monthly" },
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
    { url: "/Legal", priority: "0.3", changefreq: "yearly" },
    { url: "/jobsites", priority: "0.8", changefreq: "weekly" },
    { url: "/projects/historic-home-restoration", priority: "0.8", changefreq: "monthly" },

    // Alternate / canonical URL variants
    { url: "/custom-home-builder-brandon-ms", priority: "0.9", changefreq: "monthly" },
    { url: "/barndominium-builder", priority: "0.9", changefreq: "monthly" },
    { url: "/barndominiums-ms", priority: "0.8", changefreq: "monthly" },
    { url: "/remodeling-ms", priority: "0.8", changefreq: "monthly" },
    { url: "/quote", priority: "0.8", changefreq: "monthly" },
    { url: "/customertestimonials", priority: "0.7", changefreq: "monthly" },
    { url: "/home-remodeling-cost", priority: "0.8", changefreq: "monthly" },
    { url: "/finish-package-studio", priority: "0.7", changefreq: "monthly" },
  ];

  // Paths that should NEVER appear in the sitemap (noindex / internal / admin)
  const NOINDEX_PATHS = [
    "/AgentChat",
    "/ThankYou",
    "/thank-you",
    "/AccountSettings",
    "/Leads",
    "/CRM",
    "/SEODashboard",
    "/FunnelAnalysis",
    "/BlogAdmin",
    "/SiteImages",
    "/ConversionDashboard",
    "/TikTokSync",
    "/jobsite-checkin",
    "/sms-optin",
  ];

  // De-duplicate static pages and drop noindex paths
  const seen = new Set();
  const filteredStaticPages = staticPages.filter(p => {
    if (NOINDEX_PATHS.includes(p.url)) return false;
    if (seen.has(p.url)) return false;
    seen.add(p.url);
    return true;
  });

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
  </url>`),
    ...jobsites.filter(j => j.slug).map(j => `
  <url>
    <loc>${SITE_URL}/jobsites/${j.slug}</loc>
    <lastmod>${(j.updated_date || j.published_date || j.created_date || today).split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`),
    ...blogPosts.filter(b => b.slug).map(b => `
  <url>
    <loc>${SITE_URL}/protips/${b.slug}</loc>
    <lastmod>${(b.updated_date || b.created_date || today).split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`),
    ...services.filter(s => s.slug).map(s => `
  <url>
    <loc>${SITE_URL}/Services#${s.slug}</loc>
    <lastmod>${(s.updated_date || s.created_date || today).split("T")[0]}</lastmod>
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