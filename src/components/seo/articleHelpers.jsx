/**
 * Article-focused SEO helpers: reading-time estimation, author normalization,
 * Article JSON-LD schema with multiple-author support, and category breadcrumbs.
 */

import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  absoluteUrl,
} from "@/components/seo/seoSchemas";

const AVERAGE_WORDS_PER_MINUTE = 225;

/**
 * Estimate reading time in minutes from a content string or word count.
 * Returns at least 1 minute. Strips basic markdown/HTML for a cleaner count.
 */
export const estimateReadingTime = (
  content,
  wordsPerMinute = AVERAGE_WORDS_PER_MINUTE
) => {
  if (!content) return 1;
  if (typeof content === "number") {
    return Math.max(1, Math.ceil(content / wordsPerMinute));
  }
  const stripped = String(content)
    .replace(/<[^>]*>/g, " ")         // HTML tags
    .replace(/[#*_>`~\-]+/g, " ")     // common markdown markers
    .replace(/\s+/g, " ")
    .trim();
  if (!stripped) return 1;
  const wordCount = stripped.split(" ").length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};

/**
 * Normalize a single author (string or object) into { name, url? } shape.
 */
const normalizeAuthor = (author) => {
  if (!author) return null;
  if (typeof author === "string") return { name: author };
  if (typeof author === "object" && author.name) {
    return { name: author.name, ...(author.url && { url: author.url }) };
  }
  return null;
};

/**
 * Normalize `author` (string|object) or `authors` (array) into an array
 * of { name, url? } objects.
 */
export const normalizeAuthors = ({ author, authors } = {}) => {
  if (Array.isArray(authors) && authors.length) {
    return authors.map(normalizeAuthor).filter(Boolean);
  }
  const single = normalizeAuthor(author);
  return single ? [single] : [];
};

/**
 * Enhanced Article / BlogPosting JSON-LD schema with full publisher info
 * and support for multiple authors.
 */
export const enhancedArticleSchema = ({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author,
  authors,
  section,
  tags,
  type = "Article",
  wordCount,
  publisherName = SITE_NAME,
  publisherLogo = DEFAULT_OG_IMAGE,
  publisherUrl = SITE_URL,
}) => {
  const authorList = normalizeAuthors({ author, authors });
  const authorSchema =
    authorList.length === 0
      ? { "@type": "Organization", name: publisherName }
      : authorList.length === 1
      ? {
          "@type": "Person",
          name: authorList[0].name,
          ...(authorList[0].url && { url: authorList[0].url }),
        }
      : authorList.map((a) => ({
          "@type": "Person",
          name: a.name,
          ...(a.url && { url: a.url }),
        }));

  return {
    "@context": "https://schema.org",
    "@type": type, // "Article", "BlogPosting", or "NewsArticle"
    headline: title,
    description,
    ...(image && { image: Array.isArray(image) ? image : [image] }),
    ...(datePublished && { datePublished }),
    ...(dateModified || datePublished
      ? { dateModified: dateModified || datePublished }
      : {}),
    author: authorSchema,
    publisher: {
      "@type": "Organization",
      name: publisherName,
      url: publisherUrl,
      logo: { "@type": "ImageObject", url: publisherLogo },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(url) },
    ...(section && { articleSection: section }),
    ...(Array.isArray(tags) && tags.length && { keywords: tags.join(", ") }),
    ...(wordCount && { wordCount }),
  };
};

/**
 * Build a BreadcrumbList for an article's category hierarchy.
 *
 * Example:
 *   articleBreadcrumbSchema({
 *     categories: [{ name: "Blog", url: "/Blog" }, { name: "Renovations", url: "/Blog?cat=renovations" }],
 *     articleTitle: "Top 5 Kitchen Upgrades",
 *     articleUrl: "/Blog/top-5-kitchen-upgrades",
 *   })
 */
export const articleBreadcrumbSchema = ({
  categories = [],
  articleTitle,
  articleUrl,
  includeHome = true,
} = {}) => {
  const items = [];
  if (includeHome) items.push({ name: "Home", url: "/" });
  categories.forEach((c) => {
    if (c && c.name && c.url) items.push({ name: c.name, url: c.url });
  });
  if (articleTitle && articleUrl) {
    items.push({ name: articleTitle, url: articleUrl });
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
};