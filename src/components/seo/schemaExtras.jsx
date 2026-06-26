/**
 * Additional JSON-LD schema generators.
 * Companion to seoSchemas.js — keeps that file focused on the originals
 * (Organization, WebPage, Article, Product, Breadcrumb, FAQ) and adds:
 * WebSite (with SearchAction), auto-breadcrumbs from path, LocalBusiness,
 * HowTo, and a multi-schema injector helper.
 */

import { SITE_URL, SITE_NAME, absoluteUrl, DEFAULT_OG_IMAGE } from "./seoSchemas";

/**
 * WebSite schema with optional sitelinks SearchAction.
 * Use on the homepage. `searchUrlTemplate` should include {search_term_string},
 * e.g. "https://bradleybrowninc.com/search?q={search_term_string}".
 */
export const webSiteSchema = ({
  name = SITE_NAME,
  url = SITE_URL,
  searchUrlTemplate,
} = {}) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name,
  url,
  ...(searchUrlTemplate && {
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: searchUrlTemplate,
      },
      "query-input": "required name=search_term_string",
    },
  }),
});

/**
 * Auto-generate a BreadcrumbList from a URL path.
 * "/Services/Custom-Homes" → Home › Services › Custom Homes
 * Pass a `labels` map to override segment labels:
 *   breadcrumbFromPath("/Services/Custom-Homes", { "custom-homes": "Custom Homes" })
 */
export const breadcrumbFromPath = (path = "/", labels = {}) => {
  const segments = path.split("?")[0].split("/").filter(Boolean);
  const items = [{ name: "Home", url: "/" }];
  let acc = "";
  segments.forEach((seg) => {
    acc += `/${seg}`;
    const key = seg.toLowerCase();
    const label =
      labels[key] ||
      seg
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
    items.push({ name: label, url: acc });
  });
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

/**
 * LocalBusiness schema (use on Contact / About / location landing pages).
 * openingHours format: ["Mo-Fr 08:00-17:00", "Sa 09:00-13:00"]
 */
export const localBusinessSchema = ({
  name = SITE_NAME,
  url = SITE_URL,
  telephone,
  email,
  image = DEFAULT_OG_IMAGE,
  priceRange = "$$-$$$$",
  address, // { streetAddress, addressLocality, addressRegion, postalCode, addressCountry }
  geo,     // { latitude, longitude }
  openingHours = [],
  sameAs = [],
  type = "GeneralContractor", // any LocalBusiness subtype
  areaServed,
} = {}) => ({
  "@context": "https://schema.org",
  "@type": type,
  name,
  url,
  ...(telephone && { telephone }),
  ...(email && { email }),
  ...(image && { image }),
  ...(priceRange && { priceRange }),
  ...(address && {
    address: { "@type": "PostalAddress", ...address },
  }),
  ...(geo && {
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
  }),
  ...(openingHours.length && { openingHoursSpecification: openingHours }),
  ...(sameAs.length && { sameAs }),
  ...(areaServed && { areaServed }),
});

/**
 * HowTo schema for tutorial/guide content.
 * steps: [{ name, text, image?, url? }]
 * totalTime: ISO 8601 duration ("PT2H30M")
 * tools / supplies: array of strings
 */
export const howToSchema = ({
  name,
  description,
  image,
  totalTime,
  estimatedCost,
  steps = [],
  tools = [],
  supplies = [],
}) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name,
  ...(description && { description }),
  ...(image && { image }),
  ...(totalTime && { totalTime }),
  ...(estimatedCost && {
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: String(estimatedCost),
    },
  }),
  ...(tools.length && {
    tool: tools.map((t) => ({ "@type": "HowToTool", name: t })),
  }),
  ...(supplies.length && {
    supply: supplies.map((s) => ({ "@type": "HowToSupply", name: s })),
  }),
  step: steps.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.name,
    text: s.text,
    ...(s.image && { image: s.image }),
    ...(s.url && { url: absoluteUrl(s.url) }),
  })),
});

/**
 * Combine multiple schema objects into a single @graph document so a page
 * can inject one <script type="application/ld+json"> tag covering everything.
 * Pass the result to SEOHead's `structuredData` prop.
 */
export const combineSchemas = (...schemas) => {
  const flat = schemas.flat().filter(Boolean);
  if (flat.length === 0) return null;
  if (flat.length === 1) return flat[0];
  return {
    "@context": "https://schema.org",
    "@graph": flat.map(({ "@context": _ctx, ...rest }) => rest),
  };
};