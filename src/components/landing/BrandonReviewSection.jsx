import React from "react";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";

const FALLBACK_REVIEWS = [
  {
    name: "Michael R.",
    city: "Brandon, MS",
    quote: "Bradley Brown Inc. built our custom home in Brandon and the experience was outstanding from start to finish. They listened to every idea we had, kept us informed through each construction milestone, and delivered a home that exceeds what we imagined. The craftsmanship is genuinely top-notch and the finish work is flawless.",
  },
  {
    name: "Sarah L.",
    city: "Brandon, MS",
    quote: "We could not be happier with our new home in Rankin County. Bradley Brown's team was professional, punctual, and transparent about pricing the entire way through. When we had questions during the build, someone always picked up the phone. That level of communication is rare with contractors around Brandon.",
  },
  {
    name: "David T.",
    city: "Brandon, MS",
    quote: "From the first consultation to the final walkthrough, Bradley Brown Inc. made building our custom home feel manageable. They handled all the permitting with Rankin County, coordinated every subcontractor, and finished on schedule. The quality inspection before move-in caught details we never would have noticed ourselves. We recommend them constantly.",
  },
  {
    name: "Jennifer M.",
    city: "Brandon, MS",
    quote: "Bradley Brown built our dream home in Brandon on time and within budget. The team communicated every step of the way and treated our project like it was their own. Even after move-in, they followed up promptly on any items that needed attention. That kind of accountability is hard to find in Central Mississippi.",
  },
];

const ratingValue = 5.0;
const reviewCount = 8;

export const brandonReviewSchema = {
  "@type": "HomeAndConstructionBusiness",
  name: "Bradley Brown Inc.",
  telephone: "+18443514154",
  url: "https://bradleybrowninc.com/custom-home-builder-brandon-ms",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Brandon",
    addressRegion: "MS",
    postalCode: "39042",
    addressCountry: "US",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: String(ratingValue),
    reviewCount: String(reviewCount),
    bestRating: "5",
    worstRating: "1",
  },
};

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
  const { reviews: googleReviews, loading } = useGoogleReviews();

  const displayReviews = !loading && googleReviews.length > 0
    ? googleReviews.map((r) => ({
        name: r.author_name,
        city: "Google Review",
        quote: r.text,
      }))
    : FALLBACK_REVIEWS;

  if (loading) return null;

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
        <span className="text-sm font-semibold text-slate-600">{ratingValue} · Google Reviews</span>
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
    </div>
  );
}