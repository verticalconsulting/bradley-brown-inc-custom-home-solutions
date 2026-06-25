/**
 * JSON-LD schema generators for common page types.
 * All absolute URLs use SITE_URL as the canonical domain.
 */

export const SITE_URL = "https://bradleybrowninc.com";
export const SITE_NAME = "Bradley Brown Inc.";
export const DEFAULT_OG_IMAGE = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c758479c46f0580553750/0990d7b76_bradleybrowninc-logo2.png";
export const DEFAULT_DESCRIPTION =
  "Bradley Brown Inc. — licensed custom home builder and remodeler serving Brandon and Central Mississippi. Custom homes, renovations, additions, outdoor living.";

/** Resolve a (possibly relative) URL against the canonical site domain. */
export const absoluteUrl = (path = "/") => {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean}`;
};

/** Organization schema — use on homepage. */
export const organizationSchema = ({
  name = SITE_NAME,
  url = SITE_URL,
  logo = DEFAULT_OG_IMAGE,
  sameAs = [],
  telephone,
  address,
} = {}) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name,
  url,
  logo,
  ...(telephone && { telephone }),
  ...(address && { address }),
  ...(sameAs.length && { sameAs }),
});

/** Generic WebPage schema. */
export const webPageSchema = ({ title, description, url }) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: title,
  description,
  url: absoluteUrl(url),
});

/** Article / BlogPosting schema for blog posts. */
export const articleSchema = ({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName = SITE_NAME,
  type = "Article",
}) => ({
  "@context": "https://schema.org",
  "@type": type, // "Article" or "BlogPosting"
  headline: title,
  description,
  image: image ? [image] : undefined,
  datePublished,
  dateModified: dateModified || datePublished,
  author: { "@type": "Organization", name: authorName },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    logo: { "@type": "ImageObject", url: DEFAULT_OG_IMAGE },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(url) },
});

/** Product schema. */
export const productSchema = ({
  name,
  description,
  image,
  sku,
  brand = SITE_NAME,
  price,
  priceCurrency = "USD",
  availability = "https://schema.org/InStock",
  url,
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name,
  description,
  ...(image && { image }),
  ...(sku && { sku }),
  brand: { "@type": "Brand", name: brand },
  ...(price && {
    offers: {
      "@type": "Offer",
      price: String(price),
      priceCurrency,
      availability,
      url: absoluteUrl(url),
    },
  }),
});

/**
 * BreadcrumbList schema.
 * items: [{ name: "Home", url: "/" }, { name: "Services", url: "/Services" }]
 */
export const breadcrumbSchema = (items = []) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: item.name,
    item: absoluteUrl(item.url),
  })),
});

/**
 * FAQPage schema.
 * faqs: [{ question: "...", answer: "..." }]
 */
export const faqSchema = (faqs = []) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
});