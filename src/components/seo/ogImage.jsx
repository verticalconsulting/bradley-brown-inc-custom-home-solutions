// Helper for building dynamic Open Graph image URLs that point at the /functions/og endpoint.
// Used by SEOHead as a fallback when a page doesn't supply its own ogImage.

import { SITE_URL } from "@/components/seo/seoSchemas";

const OG_ENDPOINT = `${SITE_URL}/functions/og`;

/**
 * Build a dynamic OG image URL with the given parameters.
 *
 * @param {object} opts
 * @param {string} opts.title       — page/article/product title (required)
 * @param {string} [opts.description] — short subtitle
 * @param {string} [opts.type]      — "default" | "article" | "product" | "jobsite"
 * @param {string} [opts.image]     — featured/background image URL (https only)
 * @param {string} [opts.meta]      — small bottom-right line (e.g. "By Brad · Jan 2026", or "$1,200")
 */
export function buildOgImageUrl({ title, description, type, image, meta } = {}) {
  if (!title) return null;
  const qs = new URLSearchParams();
  qs.set("title", title);
  if (description) qs.set("description", description);
  if (type) qs.set("type", type);
  if (image) qs.set("image", image);
  if (meta) qs.set("meta", meta);
  return `${OG_ENDPOINT}?${qs.toString()}`;
}

/** Build OG params for a blog/article template (title + author + date). */
export function articleOgImageUrl({ title, description, author, publishedTime, image }) {
  const meta = [author, publishedTime ? new Date(publishedTime).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : null]
    .filter(Boolean)
    .join(" · ");
  return buildOgImageUrl({ title, description, type: "article", image, meta });
}

/** Build OG params for a product template (title + price + image). */
export function productOgImageUrl({ title, description, price, image }) {
  return buildOgImageUrl({ title, description, type: "product", image, meta: price });
}