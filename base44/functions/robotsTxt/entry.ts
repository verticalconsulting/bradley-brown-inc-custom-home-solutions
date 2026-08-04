const SITE_URL = "https://bradleybrowninc.com";

Deno.serve(async (_req) => {
  const content = `User-agent: *
Allow: /

# Canonical content pages
Allow: /services
Allow: /services/custom-home-building
Allow: /services/kitchen-bathroom-remodeling
Allow: /services/room-additions
Allow: /services/outdoor-living
Allow: /services/barndominiums
Allow: /services/emergency-repairs
Allow: /portfolio
Allow: /about
Allow: /contact
Allow: /pricing
Allow: /remodeling-brandon-ms
Allow: /remodeling-ms
Allow: /custom-home-builder-brandon-ms
Allow: /bathroom-remodeling-brandon-ms
Allow: /madison-ms-home-remodeling
Allow: /protips
Allow: /estimate
Allow: /legal

# Block admin / internal pages
Disallow: /projects/historic-home-restoration
Disallow: /seodashboard
Disallow: /blogadmin
Disallow: /siteimages
Disallow: /conversiondashboard
Disallow: /leads
Disallow: /funnelanalysis
Disallow: /crm
Disallow: /tiktoksync
Disallow: /accountsettings
Disallow: /agentchat
Disallow: /thank-you
Disallow: /error
Disallow: /jobsite-checkin
Disallow: /sms-optin

# Block dotfile / config probes
Disallow: /*.env
Disallow: /*.git
Disallow: /*.htaccess
Disallow: /*.htpasswd
Disallow: /*.DS_Store

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