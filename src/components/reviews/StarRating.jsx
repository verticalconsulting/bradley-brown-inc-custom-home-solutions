import React from "react";
import { Star, StarHalf } from "lucide-react";

/**
 * Accessible star rating display.
 *
 * Props:
 *   value      - rating 0–max (supports halves)
 *   max        - default 5
 *   size       - tailwind w/h size, e.g. "w-4 h-4" (default)
 *   className  - extra classes on the wrapper
 *   color      - tailwind text+fill color class (default amber-400)
 *   showNumber - if true, renders "4.9 / 5" next to stars
 *   schema     - if true, emits schema.org Rating microdata attributes
 *   reviewCount - optional, included in screen-reader text
 *
 * Always renders a hidden `aria-label` like "Rated 4.9 out of 5 stars".
 */
export default function StarRating({
  value = 5,
  max = 5,
  size = "w-4 h-4",
  className = "",
  color = "text-amber-400 fill-amber-400",
  emptyColor = "text-slate-200 fill-slate-200",
  showNumber = false,
  schema = false,
  reviewCount,
}) {
  const v = Math.max(0, Math.min(max, Number(value) || 0));
  const fullStars = Math.floor(v);
  const hasHalf = v - fullStars >= 0.25 && v - fullStars < 0.75;
  const flooredOrHalf = hasHalf ? fullStars + 1 : fullStars;
  const emptyStars = Math.max(0, max - flooredOrHalf);

  const srText =
    `Rated ${v.toFixed(1)} out of ${max} stars` +
    (reviewCount ? ` based on ${reviewCount} review${reviewCount === 1 ? "" : "s"}` : "");

  const schemaProps = schema
    ? { itemProp: "reviewRating", itemScope: true, itemType: "https://schema.org/Rating" }
    : {};

  return (
    <span
      className={`inline-flex items-center gap-0.5 ${className}`}
      role="img"
      aria-label={srText}
      {...schemaProps}
    >
      {schema && (
        <>
          <meta itemProp="ratingValue" content={v.toFixed(1)} />
          <meta itemProp="bestRating" content={String(max)} />
          <meta itemProp="worstRating" content="1" />
        </>
      )}
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`f${i}`} className={`${size} ${color}`} aria-hidden="true" />
      ))}
      {hasHalf && <StarHalf className={`${size} ${color}`} aria-hidden="true" />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`e${i}`} className={`${size} ${emptyColor}`} aria-hidden="true" />
      ))}
      {showNumber && (
        <span className="ml-1.5 text-sm text-slate-600">
          {v.toFixed(1)} <span className="text-slate-400">/ {max}</span>
        </span>
      )}
    </span>
  );
}