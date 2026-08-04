const SITE_URL = "https://bradleybrowninc.com";

Deno.serve(async (_req) => {
  const content = `User-agent: *
Allow: /

# Disallow admin / internal pages only
Disallow: /seodashboard
Disallow: /blogadmin
Disallow: /leads
Disallow: /crm
Disallow: /jobsite-checkin
Disallow: /accountsettings
Disallow: /agentchat
Disallow: /tiktoksync
Disallow: /thank-you
Disallow: /error
Disallow: /siteimages
Disallow: /conversiondashboard
Disallow: /funnelanalysis

# Block dotfile / config probes
Disallow: /*.env
Disallow: /*.git
Disallow: /*.htaccess
Disallow: /*.htpasswd
Disallow: /*.DS_Store

# Block API / function routes
Disallow: /api/
Disallow: /_functions/

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