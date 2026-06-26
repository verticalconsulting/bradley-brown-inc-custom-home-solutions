import React from "react";
import { Helmet } from "react-helmet-async";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  DEFAULT_DESCRIPTION,
  absoluteUrl,
} from "@/components/seo/seoSchemas";

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

const currentPath = () =>
  typeof window !== "undefined"
    ? window.location.pathname + window.location.search
    : "/";

/**
 * SEOHead — reusable SEO/meta/JSON-LD component built on react-helmet-async.
 *
 * Preferred props: title, description, keywords, canonicalUrl, ogImage, ogType, noindex, structuredData
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
}) {
  const finalTitle = buildTitle(title);
  const finalDescription = truncate(description, 160);
  const finalCanonical = canonicalUrl || canonical || absoluteUrl(currentPath());
  const finalImage = ogImage || DEFAULT_OG_IMAGE;
  const finalNoindex = noindex || noIndex || false;
  const finalStructuredData = structuredData || schema;
  const keywordsContent = Array.isArray(keywords) ? keywords.join(", ") : keywords;

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

      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={ogSiteName} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}

      {finalStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(finalStructuredData)}
        </script>
      )}
    </Helmet>
  );
}

// Re-export schema helpers so consumers can `import { articleSchema } from "@/components/SEOHead"`.
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