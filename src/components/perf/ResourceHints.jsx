import React from "react";
import { Helmet } from "react-helmet-async";

/**
 * Inject resource hints into <head>:
 *   - preconnect:  warm up TCP/TLS to critical 3rd-party origins
 *   - dnsPrefetch: cheap DNS-only hint for less critical origins
 *   - preload:     critical assets needed for first paint (fonts, hero image)
 *   - prefetch:    likely next navigation
 *
 * Usage:
 *   <ResourceHints
 *     preconnect={["https://fonts.gstatic.com"]}
 *     preloadFonts={[{ href: "/fonts/inter-var.woff2", type: "font/woff2" }]}
 *     preloadImages={[{ href: heroJpg, imagesrcset: "...", imagesizes: "100vw" }]}
 *     prefetch={["/Services", "/Portfolio"]}
 *   />
 */
export default function ResourceHints({
  preconnect = [],
  dnsPrefetch = [],
  preloadFonts = [],
  preloadImages = [],
  preloadScripts = [],
  prefetch = [],
}) {
  return (
    <Helmet>
      {preconnect.map((href) => (
        <link key={`pc-${href}`} rel="preconnect" href={href} crossOrigin="anonymous" />
      ))}
      {dnsPrefetch.map((href) => (
        <link key={`dns-${href}`} rel="dns-prefetch" href={href} />
      ))}
      {preloadFonts.map((f) => (
        <link
          key={`pf-${f.href}`}
          rel="preload"
          as="font"
          href={f.href}
          type={f.type || "font/woff2"}
          crossOrigin="anonymous"
        />
      ))}
      {preloadImages.map((img) => (
        <link
          key={`pi-${img.href}`}
          rel="preload"
          as="image"
          href={img.href}
          imagesrcset={img.imagesrcset}
          imagesizes={img.imagesizes}
          fetchpriority="high"
        />
      ))}
      {preloadScripts.map((s) => (
        <link key={`ps-${s.href}`} rel="preload" as="script" href={s.href} />
      ))}
      {prefetch.map((href) => (
        <link key={`pr-${href}`} rel="prefetch" href={href} />
      ))}
    </Helmet>
  );
}