import React from "react";
import StarRating from "./StarRating";

/**
 * Visual aggregate-rating banner. Pure presentation — JSON-LD is emitted
 * separately by the parent ReviewsSection (so it can sit in <head>).
 *
 * Props:
 *   ratingValue, ratingCount, max=5, className
 */
export default function AggregateRatingBanner({
  ratingValue,
  ratingCount,
  max = 5,
  className = "",
}) {
  if (!ratingValue || !ratingCount) return null;
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <span className="text-3xl font-bold text-[#1E2D3D]">
        {Number(ratingValue).toFixed(1)}
      </span>
      <div className="flex flex-col">
        <StarRating value={ratingValue} max={max} size="w-5 h-5" />
        <span className="text-xs text-slate-500 mt-0.5">
          Based on {ratingCount} review{ratingCount === 1 ? "" : "s"}
        </span>
      </div>
    </div>
  );
}