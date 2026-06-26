// Canonical URL helpers
// Centralized rules for building clean, consistent canonical URLs across the site.
//
// Normalization policy:
//   - Protocol: always https
//   - Host: non-www (bradleybrowninc.com)
//   - Case: lowercase pathname
//   - Trailing slash: removed (except for root "/")
//   - Tracking params stripped: utm_*, ref, fbclid, gclid, msclkid, mc_cid, mc_eid, _ga, yclid, igshid
//   - Other query params (e.g. ?page=2) are preserved, sorted alphabetically for determinism

const CANONICAL_HOST = "bradleybrowninc.com";
const CANONICAL_ORIGIN = `https://${CANONICAL_HOST}`;

const TRACKING_PARAM_PREFIXES = ["utm_"];
const TRACKING_PARAM_EXACT = new Set([
  "ref",
  "fbclid",
  "gclid",
  "msclkid",
  "mc_cid",
  "mc_eid",
  "_ga",
  "yclid",
  "igshid",
]);

const isTrackingParam = (key) => {
  const k = key.toLowerCase();
  if (TRACKING_PARAM_EXACT.has(k)) return true;
  return TRACKING_PARAM_PREFIXES.some((p) => k.startsWith(p));
};

const normalizePath = (rawPath) => {
  let path = rawPath || "/";
  // Strip any accidental origin / protocol
  path = path.replace(/^https?:\/\/[^/]+/i, "");
  if (!path.startsWith("/")) path = `/${path}`;
  // Lowercase
  path = path.toLowerCase();
  // Collapse duplicate slashes
  path = path.replace(/\/{2,}/g, "/");
  // Remove trailing slash (except root)
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  return path;
};

/**
 * Build a clean canonical URL.
 *
 * @param {string} path - Path or full URL (e.g. "/Services?utm_source=fb").
 * @param {object} [params] - Optional query params to include (e.g. { page: 2 }).
 *                            Tracking params are always dropped even if passed here.
 * @returns {string} Canonical URL, e.g. "https://bradleybrowninc.com/services?page=2"
 */
export function getCanonicalUrl(path = "/", params = {}) {
  const pathname = normalizePath((path || "/").split("?")[0]);

  // Collect query params: those already in `path`, plus any explicit overrides.
  const search = new URLSearchParams();

  const existing = (path || "").split("?")[1];
  if (existing) {
    new URLSearchParams(existing).forEach((value, key) => {
      if (!isTrackingParam(key)) search.set(key.toLowerCase(), value);
    });
  }

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    if (isTrackingParam(key)) return;
    search.set(key.toLowerCase(), String(value));
  });

  // Drop ?page=1 (page 1 canonicalizes to the base URL)
  if (search.get("page") === "1") search.delete("page");

  // Sort for determinism
  const sorted = new URLSearchParams([...search.entries()].sort(([a], [b]) => a.localeCompare(b)));
  const qs = sorted.toString();

  return qs ? `${CANONICAL_ORIGIN}${pathname}?${qs}` : `${CANONICAL_ORIGIN}${pathname}`;
}

/**
 * Returns the canonical URL for the current browser location.
 * Server-side / pre-render fallback: returns the site origin.
 */
export function getCurrentCanonicalUrl(extraParams = {}) {
  if (typeof window === "undefined") return CANONICAL_ORIGIN;
  return getCanonicalUrl(window.location.pathname + window.location.search, extraParams);
}

/**
 * Build rel=prev / rel=next URLs for paginated content.
 * Returns { prev, next } where each may be null if not applicable.
 */
export function getPaginationLinks(path, page, totalPages) {
  const p = Number(page) || 1;
  const total = Number(totalPages) || 1;
  return {
    prev: p > 1 ? getCanonicalUrl(path, { page: p - 1 }) : null,
    next: p < total ? getCanonicalUrl(path, { page: p + 1 }) : null,
  };
}

export { CANONICAL_ORIGIN, CANONICAL_HOST };