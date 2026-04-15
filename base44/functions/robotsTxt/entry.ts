const SITE_URL = "https://bradleybrowninc.com";

Deno.serve(async (_req) => {
  const content = `User-agent: *
Allow: /

# Important pages
Allow: /Services
Allow: /Portfolio
Allow: /Contact
Allow: /About
Allow: /QuoteAssistant
Allow: /ScheduleVisit
Allow: /ContactForm
Allow: /ProTips
Allow: /LandingCoreServices
Allow: /LandingEmergencyRepair
Allow: /LandingBrandonRemodelers
Allow: /LandingPricing
Allow: /LandingTrust
Allow: /SmallBathroomIdeas
Allow: /LuxuryHomeRenovations
Allow: /RenovationLoans
Allow: /HomeAdditionIdeas
Allow: /EnergyEfficientUpgrades

# Block admin/internal pages
Disallow: /SEODashboard
Disallow: /BlogAdmin
Disallow: /SiteImages
Disallow: /ConversionDashboard
Disallow: /Leads
Disallow: /FunnelAnalysis
Disallow: /CRM
Disallow: /TikTokSync
Disallow: /AccountSettings

Sitemap: ${SITE_URL}/sitemap.xml
`;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=UTF-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
});