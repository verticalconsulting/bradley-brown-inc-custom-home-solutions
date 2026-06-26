import React, { useState } from "react";

/**
 * Performance-optimized <img> wrapper.
 *
 * Props:
 *   src, alt          - required
 *   width, height     - REQUIRED (in px or unitless). Prevents CLS by reserving space.
 *   priority          - true for LCP / above-the-fold images. Sets loading="eager"
 *                       and fetchpriority="high". Default lazy + low.
 *   sizes             - responsive sizes attribute (recommended)
 *   className         - styling
 *   blurDataURL       - tiny base64 placeholder shown while loading (optional)
 *   webpSrc           - explicit WebP version; otherwise pass via the <picture> sources prop
 *   sources           - extra <source> entries: [{ srcSet, type }]
 *
 * Notes:
 *   - Always supply width/height so the browser can reserve layout space.
 *   - For above-the-fold hero images, set priority + use a <link rel="preload">
 *     via <ResourceHints preloadImages={[...]} />.
 */
export default function Img({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes,
  className = "",
  style,
  blurDataURL,
  webpSrc,
  sources = [],
  decoding = "async",
  ...rest
}) {
  const [loaded, setLoaded] = useState(false);

  if (!alt && alt !== "") {
    // Treat decorative images by passing alt="" explicitly.
    // eslint-disable-next-line no-console
    if (import.meta?.env?.DEV) console.warn(`<Img> missing alt for src=${src}`);
  }

  const allSources = [
    ...(webpSrc ? [{ srcSet: webpSrc, type: "image/webp" }] : []),
    ...sources,
  ];

  const placeholderStyle = blurDataURL && !loaded
    ? {
        backgroundImage: `url(${blurDataURL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(8px)",
      }
    : undefined;

  const imgEl = (
    <img
      src={src}
      alt={alt || ""}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding={decoding}
      fetchpriority={priority ? "high" : "low"}
      sizes={sizes}
      onLoad={() => setLoaded(true)}
      className={className}
      style={{ ...placeholderStyle, ...style }}
      {...rest}
    />
  );

  if (allSources.length === 0) return imgEl;

  return (
    <picture>
      {allSources.map((s, i) => (
        <source key={i} srcSet={s.srcSet} type={s.type} sizes={sizes} />
      ))}
      {imgEl}
    </picture>
  );
}