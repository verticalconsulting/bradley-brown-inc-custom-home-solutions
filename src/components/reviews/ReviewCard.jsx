import React from "react";
import StarRating from "./StarRating";

const PROJECT_LABELS = {
  custom_home: "Custom Home",
  renovation: "Renovation",
  addition: "Room Addition",
  outdoor: "Outdoor Living",
};

/**
 * Single review card with schema.org microdata.
 *
 * Wraps content in itemScope/itemType="Review" so that — even without
 * JSON-LD — the review is machine-readable on the page.
 *
 * Props:
 *   review: {
 *     client_name, text, rating, location, project_type, photo_url, created_date
 *   }
 */
export default function ReviewCard({ review, className = "" }) {
  if (!review) return null;
  const date = review.created_date ? new Date(review.created_date).toISOString() : null;

  return (
    <article
      itemScope
      itemType="https://schema.org/Review"
      className={`bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex flex-col ${className}`}
    >
      <StarRating value={review.rating || 5} schema reviewCount={undefined} />

      <blockquote
        itemProp="reviewBody"
        className="text-slate-600 text-sm leading-relaxed italic flex-1 my-3"
      >
        "{review.text}"
      </blockquote>

      <footer className="flex items-center gap-3 mt-auto">
        {review.photo_url ? (
          <img
            src={review.photo_url}
            alt={review.client_name}
            width="36"
            height="36"
            loading="lazy"
            className="w-9 h-9 rounded-full object-cover border-2 border-sky-100"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold text-sm flex-shrink-0">
            {review.client_name?.charAt(0) || "?"}
          </div>
        )}
        <div className="min-w-0">
          <p
            itemProp="author"
            itemScope
            itemType="https://schema.org/Person"
            className="text-xs font-semibold text-slate-800 truncate"
          >
            <span itemProp="name">{review.client_name}</span>
          </p>
          <p className="text-xs text-slate-400 truncate">
            {review.location}
            {review.project_type
              ? ` · ${PROJECT_LABELS[review.project_type] || review.project_type}`
              : ""}
          </p>
        </div>
        {date && <meta itemProp="datePublished" content={date.slice(0, 10)} />}
      </footer>
    </article>
  );
}