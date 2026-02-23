import { useEffect } from "react";

/**
 * SEOHead - Dynamically sets page title, meta description, and JSON-LD structured data.
 * Usage: <SEOHead title="..." description="..." schema={...} />
 */
export default function SEOHead({ title, description, schema }) {
  useEffect(() => {
    // Title
    document.title = title ? `${title} | Bradley Brown Inc.` : "Bradley Brown Inc. – Custom Home Builder in Central Mississippi";

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