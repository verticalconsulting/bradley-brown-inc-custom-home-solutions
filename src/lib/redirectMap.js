/**
 * Centralized redirect map for the Bradley Brown Inc. site.
 *
 * Add legacy URLs / renamed routes here in one place — no need to scatter
 * <Route element={<Navigate>}> across App.jsx for every redirect.
 *
 * Two forms:
 *   - exact:  { from: "/old-path", to: "/NewPath", type: 301 }
 *   - regex:  { pattern: /^\/blog\/(\d+)$/, to: (m) => `/blog/${m[1]}`, type: 301 }
 *
 * `type` (301 permanent vs 302 temporary) is rendered as a
 * `<meta name="prerender-status-code">` so server-side prerenderers
 * (Vercel, Netlify, prerender.io) can emit the correct HTTP status
 * to search engines. Client-side, both behave as router redirects.
 *
 * For www → non-www, http → https, and trailing-slash canonicalization,
 * configure those at the hosting layer (they cannot be done from JS
 * after the page has already loaded).
 */

export const REDIRECT_MAP = [
  // ---- Exact-match legacy paths ----
  { from: "/projects", to: "/portfolio", type: 301 },
  { from: "/projects/custom-home-build", to: "/portfolio", type: 301 },
  { from: "/projects/gourmet-kitchen-renovation", to: "/portfolio", type: 301 },
  { from: "/projects/two-story-home-addition", to: "/portfolio", type: 301 },
  { from: "/ai-quote", to: "/estimate", type: 301 },
  { from: "/blog", to: "/protips", type: 301 },
  { from: "/quoteassistant", to: "/estimate", type: 301 },
  { from: "/contactform", to: "/estimate", type: 301 },
  { from: "/quote", to: "/estimate", type: 301 },
  { from: "/finish-package-studio", to: "/estimate", type: 301 },
  { from: "/schedulevisit", to: "/estimate", type: 301 },
  { from: "/free-quote", to: "/estimate", type: 301 },
  { from: "/barndominiums", to: "/barndominium-builder", type: 301 },
  { from: "/barndominiums-ms", to: "/barndominium-builder", type: 301 },
  { from: "/historichomerestoration", to: "/portfolio", type: 301 },

  // ---- Regex patterns ----
  // e.g. /service/kitchen-remodel → /services
  { pattern: /^\/service\/[^/]+\/?$/i, to: () => "/services", type: 301 },
];

/**
 * Look up a redirect for a given pathname.
 * Returns { to, type } or null.
 */
export function findRedirect(pathname) {
  const path = (pathname || "/").replace(/\/+$/, "") || "/";

  // Exact matches (case-insensitive)
  const exact = REDIRECT_MAP.find(
    (r) => r.from && r.from.toLowerCase() === path.toLowerCase()
  );
  if (exact) return { to: exact.to, type: exact.type || 301 };

  // Regex patterns
  for (const r of REDIRECT_MAP) {
    if (!r.pattern) continue;
    const m = path.match(r.pattern);
    if (m) {
      const to = typeof r.to === "function" ? r.to(m) : r.to;
      return { to, type: r.type || 301 };
    }
  }
  return null;
}