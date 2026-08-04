/**
 * Shared canonical URL configuration — imported by both the sitemap function
 * and the searchConsoleDashboard function so they stay in sync.
 */

export const SITE_URL = "https://bradleybrowninc.com";

// GSC property — must include trailing slash to match the registered property exactly.
// A property-string mismatch returns empty data silently.
export const GSC_PROPERTY = "https://bradleybrowninc.com/";

export const SITEMAP_INDEX_URL = `${SITE_URL}/sitemap.xml`;
export const FUNCTIONS_SITEMAP_URL = `${SITE_URL}/functions/sitemap`;

// Canonical static pages (same list as the sitemap function emits)
export const STATIC_PAGES = [
  { url: "/", priority: "1.0", changefreq: "weekly" },
  { url: "/services", priority: "0.9", changefreq: "monthly" },
  { url: "/services/custom-home-building", priority: "0.8", changefreq: "monthly" },
  { url: "/services/kitchen-remodeling", priority: "0.8", changefreq: "monthly" },
  { url: "/services/bathroom-remodeling", priority: "0.8", changefreq: "monthly" },
  { url: "/services/room-additions", priority: "0.8", changefreq: "monthly" },
  { url: "/services/outdoor-living", priority: "0.8", changefreq: "monthly" },
  { url: "/services/barndominiums", priority: "0.8", changefreq: "monthly" },
  { url: "/services/emergency-repairs", priority: "0.8", changefreq: "monthly" },
  { url: "/portfolio", priority: "0.8", changefreq: "weekly" },
  { url: "/projects/historic-home-restoration", priority: "0.7", changefreq: "monthly" },
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

// Redirect map — old URLs → canonical destinations.
// Sourced from App.jsx <Navigate> redirects + src/lib/redirectMap.js.
export const REDIRECT_MAP = {
  "/contactform": "/estimate",
  "/quote": "/estimate",
  "/customertestimonials": "/about",
  "/landingtrust": "/about",
  "/landingcoreservices": "/remodeling-brandon-ms",
  "/landingbrandonremodelers": "/remodeling-brandon-ms",
  "/home-remodeling-cost": "/pricing",
  "/landingpricing": "/pricing",
  "/services/kitchen-bathroom-remodeling": "/services/kitchen-remodeling",
  "/barndominium-builder": "/services/barndominiums",
  "/barndominiums-ms": "/services/barndominiums",
  "/barndominium-cost-mississippi": "/services/barndominiums",
  "/finish-package-studio": "/estimate",
  "/projects": "/portfolio",
  "/projects/custom-home-build": "/portfolio",
  "/projects/gourmet-kitchen-renovation": "/portfolio",
  "/projects/two-story-home-addition": "/portfolio",
  "/ai-quote": "/estimate",
  "/quoteassistant": "/estimate",
  "/schedulevisit": "/estimate",
  "/landingemergencyrepair": "/services/emergency-repairs",
  "/luxuryhomerenovations": "/services",
  "/homeadditionideas": "/protips/home-addition-ideas",
  "/smallbathroomideas": "/protips/small-bathroom-ideas",
  "/energyefficientupgrades": "/protips/energy-efficient-upgrades",
  "/renovationloans": "/protips/renovation-loans",
  "/historichomerestoration": "/projects/historic-home-restoration",
  "/jobsites": "/about",
  "/blog": "/protips",
  "/free-quote": "/estimate",
  "/barndominiums": "/services/barndominiums",
};

/**
 * Normalize a GSC page URL to its canonical path.
 * Strips the site origin, removes trailing slashes, and applies the redirect map.
 */
export function normalizeToCanonical(pathOrUrl) {
  let path = (pathOrUrl || "").replace(SITE_URL, "");
  if (path.startsWith("https://bradleybrowninc.com")) path = path.replace("https://bradleybrowninc.com", "");
  if (path.startsWith("http://bradleybrowninc.com")) path = path.replace("http://bradleybrowninc.com", "");
  if (path.startsWith("https://www.bradleybrowninc.com")) path = path.replace("https://www.bradleybrowninc.com", "");
  if (path.startsWith("http://www.bradleybrowninc.com")) path = path.replace("http://www.bradleybrowninc.com", "");
  path = path.replace(/\/+$/, "") || "/";
  return REDIRECT_MAP[path] || REDIRECT_MAP[path.toLowerCase()] || path;
}

/**
 * Get all canonical paths (static + dynamic blog/jobsite URLs).
 * Matches the sitemap function's output exactly.
 */
export async function getAllCanonicalPaths(base44) {
  const staticPaths = STATIC_PAGES.map((p) => p.url);

  let blogPosts = [];
  let jobsites = [];
  try {
    blogPosts = await base44.asServiceRole.entities.BlogPost.filter({ published: true });
  } catch (_) {}
  try {
    jobsites = await base44.asServiceRole.entities.JobCheckin.filter({ status: "published" });
  } catch (_) {}

  const blogPaths = blogPosts.filter((b) => b.slug).map((b) => `/protips/${b.slug}`);
  const jobsitePaths = jobsites.filter((j) => j.slug).map((j) => `/jobsites/${j.slug}`);

  return [...staticPaths, ...blogPaths, ...jobsitePaths];
}

/**
 * Get all old/redirected URLs for the "expected redirect" inspection tab.
 */
export function getRedirectedUrls() {
  return Object.entries(REDIRECT_MAP).map(([from, to]) => ({ from, to }));
}

/**
 * Sort paths by indexing priority:
 * /estimate first, then service pages, then local landing pages, then other pages, blog posts last.
 */
export function sortByPriority(paths) {
  const priority = (p) => {
    if (p === "/estimate") return 0;
    if (p.startsWith("/services/")) return 1;
    if (p.includes("-brandon-ms") || p.includes("-ms-") || p.startsWith("/remodeling")) return 2;
    if (p === "/") return 3;
    if (!p.startsWith("/protips/")) return 4;
    return 5;
  };
  return [...paths].sort((a, b) => priority(a) - priority(b));
}