/**
 * cfResponsive — builds responsive srcset candidates for Cloudflare Images URLs.
 *
 * Cloudflare flexible variants (w=…, q=…) are served per-viewport, and f=auto
 * negotiates AVIF/WebP from the browser's Accept header — re-encoded from the
 * stored original, never from the already-compressed JPEG, so quality settings
 * are preserved (~25% smaller at the same q).
 *
 * Non-Cloudflare URLs (e.g. Supabase) pass through untouched as { src } only.
 */
const CF_PATTERN = /^(https:\/\/imagedelivery\.net\/[^/]+\/[^/]+)\//;

export function cfResponsive(url, widths = [400, 800], quality = 75) {
  if (typeof url !== "string" || !url) return { src: "" };
  const match = url.match(CF_PATTERN);
  if (!match) return { src: url };
  const base = match[1];
  const variant = (w) => `${base}/w=${w},q=${quality},f=auto`;
  return {
    src: variant(widths[widths.length - 1]),
    srcSet: widths.map((w) => `${variant(w)} ${w}w`).join(", "),
  };
}