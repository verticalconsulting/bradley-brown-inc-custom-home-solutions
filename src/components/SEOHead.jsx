import React from "react";
import { Helmet } from "react-helmet-async";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  DEFAULT_DESCRIPTION,
  absoluteUrl,
} from "@/components/seo/seoSchemas";
import {
  estimateReadingTime,
  normalizeAuthors,
  enhancedArticleSchema,
  articleBreadcrumbSchema,
} from "@/components/seo/articleHelpers";
import {
  getCanonicalUrl,
  getCurrentCanonicalUrl,
  getPaginationLinks,
} from "@/components/seo/canonicalUrl";

const TWITTER_HANDLE = "@bradleybrowninc";

const truncate = (str, max = 160) => {
  if (!str) return "";
  return str.length > max ? `${str.slice(0, max - 1).trimEnd()}…` : str;
};

const buildTitle = (title) => {
  if (!title) return SITE_NAME;
  if (title.includes(SITE_NAME)) return title;
  return `${title} | ${SITE_NAME}`;
};



/**
 * SEOHead — reusable SEO/meta/JSON-LD component built on react-helmet-async.
 *
 * Page props: title, description, keywords, canonicalUrl, ogImage, ogType, noindex, structuredData
 * Article props (when ogType="article"):
 *   article: {
 *     publishedTime, modifiedTime,
 *     author | authors: string | { name, url } | array,
 *     section,
 *     tags: string[],
 *     content: string (for reading-time estimation),
 *     wordCount: number (alternative to content),
 *     categories: [{ name, url }] (for breadcrumb hierarchy),
 *     type: "Article" | "BlogPosting" | "NewsArticle",
 *   }
 * Legacy aliases (so existing pages keep working): canonical, schema, noIndex
 */
export default function SEOHead({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords,
  canonicalUrl,
  canonical, // legacy alias
  ogImage,
  ogType = "website",
  ogSiteName = SITE_NAME,
  noindex = false,
  noIndex, // legacy alias
  structuredData,
  schema, // legacy alias
  twitterSite = TWITTER_HANDLE,
  article,
  page,
  totalPages,
}) {
  const finalTitle = buildTitle(title);
  const finalDescription = truncate(description, 160);
  // If caller passed an explicit canonical, normalize it. Otherwise build from current URL.
  const finalCanonical = canonicalUrl
    ? getCanonicalUrl(canonicalUrl, page && page > 1 ? { page } : {})
    : canonical
      ? getCanonicalUrl(canonical, page && page > 1 ? { page } : {})
      : getCurrentCanonicalUrl(page && page > 1 ? { page } : {});
  const pagination =
    page && totalPages
      ? getPaginationLinks(
          typeof window !== "undefined" ? window.location.pathname : "/",
          page,
          totalPages,
        )
      : { prev: null, next: null };
  const finalImage = ogImage || DEFAULT_OG_IMAGE;
  const finalNoindex = noindex || noIndex || false;
  const keywordsContent = Array.isArray(keywords) ? keywords.join(", ") : keywords;

  // ---------- Article-specific derived values ----------
  const isArticle = ogType === "article" && !!article;
  const authorList = isArticle ? normalizeAuthors(article) : [];
  const readingTime = isArticle
    ? estimateReadingTime(article.content || article.wordCount || 0)
    : null;

  // Auto-build article JSON-LD if caller didn't pass their own structuredData.
  const autoArticleSchema =
    isArticle && !structuredData && !schema
      ? enhancedArticleSchema({
          title,
          description: finalDescription,
          url: finalCanonical,
          image: finalImage,
          datePublished: article.publishedTime,
          dateModified: article.modifiedTime,
          author: article.author,
          authors: article.authors,
          section: article.section,
          tags: article.tags,
          type: article.type || "Article",
          wordCount:
            article.wordCount ||
            (article.content
              ? String(article.content).replace(/<[^>]*>/g, " ").trim().split(/\s+/).length
              : undefined),
        })
      : null;

  const autoBreadcrumbSchema =
    isArticle && Array.isArray(article.categories) && article.categories.length
      ? articleBreadcrumbSchema({
          categories: article.categories,
          articleTitle: title,
          articleUrl: finalCanonical,
        })
      : null;

  const finalStructuredData = structuredData || schema || autoArticleSchema;

  return (
    <Helmet prioritizeSeoTags>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      {keywordsContent && <meta name="keywords" content={keywordsContent} />}
      <meta
        name="robots"
        content={finalNoindex ? "noindex, nofollow" : "index, follow"}
      />

      <link rel="canonical" href={finalCanonical} />
      {pagination.prev && <link rel="prev" href={pagination.prev} />}
      {pagination.next && <link rel="next" href={pagination.next} />}

      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={ogSiteName} />

      {/* Article-specific Open Graph tags */}
      {isArticle && article.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {isArticle && article.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
      {isArticle &&
        authorList.map((a, i) => (
          <meta key={`article-author-${i}`} property="article:author" content={a.name} />
        ))}
      {isArticle && article.section && (
        <meta property="article:section" content={article.section} />
      )}
      {isArticle &&
        Array.isArray(article.tags) &&
        article.tags.map((tag, i) => (
          <meta key={`article-tag-${i}`} property="article:tag" content={tag} />
        ))}

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}

      {/* Reading time — useful for some readers/aggregators */}
      {isArticle && readingTime && (
        <>
          <meta name="twitter:label1" content="Reading time" />
          <meta name="twitter:data1" content={`${readingTime} min read`} />
          <meta name="reading-time" content={`${readingTime} min`} />
        </>
      )}

      {/* JSON-LD structured data */}
      {finalStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(finalStructuredData)}
        </script>
      )}
      {autoBreadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(autoBreadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
}

// Re-export schema + article helpers so consumers can import directly from SEOHead.
export {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  absoluteUrl,
  organizationSchema,
  webPageSchema,
  articleSchema,
  productSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/components/seo/seoSchemas";

export {
  webSiteSchema,
  breadcrumbFromPath,
  localBusinessSchema,
  howToSchema,
  combineSchemas,
} from "@/components/seo/schemaExtras";

export {
  estimateReadingTime,
  normalizeAuthors,
  enhancedArticleSchema,
  articleBreadcrumbSchema,
} from "@/components/seo/articleHelpers";