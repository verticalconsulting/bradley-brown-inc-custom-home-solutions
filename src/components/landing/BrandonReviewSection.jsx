import React from "react";
import { Link } from "react-router-dom";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";

function StarRow() {
  return (
    <div className="flex gap-0.5 mb-3" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2l2.39 7.36H22l-6.18 4.49L18.21 21 12 16.51 5.79 21l2.39-7.15L2 9.36h7.61z" />
        </svg>
      ))}
    </div>
  );
}

export default function BrandonReviewSection() {
  const { reviews: googleReviews, rating, count, loading } = useGoogleReviews();

  if (loading || googleReviews.length === 0) return null;

  const displayReviews = googleReviews.slice(0, 4).map((r) => ({
    name: r.author_name,
    city: "Google Review",
    quote: r.text,
  }));

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1E2D3D] mb-2">What Brandon, MS Homeowners Say About Us</h2>
      <div className="flex items-center gap-2 mb-6">
        <div className="flex gap-0.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2l2.39 7.36H22l-6.18 4.49L18.21 21 12 16.51 5.79 21l2.39-7.15L2 9.36h7.61z" />
            </svg>
          ))}
        </div>
        <span className="text-sm font-semibold text-slate-600">{rating} · {count} Google reviews</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayReviews.map((r, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <StarRow />
            <p className="text-slate-600 text-sm leading-relaxed mb-4">"{r.quote}"</p>
            <p className="text-sm font-semibold text-[#1E2D3D]">{r.name}</p>
            <p className="text-xs text-slate-400">{r.city}</p>
          </div>
        ))}
      </div>
      <Link to="/reviews" className="inline-flex mt-5 text-sm font-semibold text-sky-700 hover:text-sky-600">
        See all available Google reviews →
      </Link>
    </div>
  );
}