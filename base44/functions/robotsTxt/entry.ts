const SITE_URL = "https://bradleybrowninc.com";

Deno.serve(async (_req) => {
  const content = `User-agent: *
Allow: /

# Important pages
Allow: /services
Allow: /portfolio
Allow: /contact
Allow: /about
Allow: /quoteassistant
Allow: /schedulevisit
Allow: /contactform
Allow: /protips
Allow: /landingcoreservices
Allow: /landingemergencyrepair
Allow: /landingbrandonremodelers
Allow: /landingpricing
Allow: /landingtrust
Allow: /smallbathroomideas
Allow: /luxuryhomerenovations
Allow: /renovationloans
Allow: /homeadditionideas
Allow: /energyefficientupgrades
Allow: /jobsites
Allow: /barndominium-builder
Allow: /remodeling-ms
Allow: /quote
Allow: /customertestimonials
Allow: /home-remodeling-cost
Allow: /finish-package-studio
Allow: /custom-home-builder-brandon-ms

# Block admin/internal pages
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