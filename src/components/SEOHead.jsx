import { useEffect } from "react";

/**
 * SEOHead - Dynamically sets page title, meta description, and JSON-LD structured data.
 * Usage: <SEOHead title="..." description="..." schema={...} />
 */
export default function SEOHead({ title, description, schema, canonical }) {
  useEffect(() => {
    // Title
    document.title = title || "Bradley Brown Inc. – Custom Home Builder in Central Mississippi";

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description || "");

    // Open Graph
    const setOG = (prop, content) => {
      let tag = document.querySelector(`meta[property="${prop}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", prop);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content || "");
    };
    setOG("og:title", title);
    setOG("og:description", description || "");
    setOG("og:type", "website");

    // Canonical URL
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      if (!canonicalTag) {
        canonicalTag = document.createElement("link");
        canonicalTag.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute("href", canonical);
    }

    // JSON-LD structured data
    const existingScript = document.getElementById("__json-ld__");
    if (existingScript) existingScript.remove();

    if (schema) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "__json-ld__";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      const script = document.getElementById("__json-ld__");
      if (script) script.remove();
    };
  }, [title, description, JSON.stringify(schema)]);

  return null;
}