import React from "react";
import SEOHead from "@/components/SEOHead";

const GOOGLE_REVIEWS_URL = "https://www.google.com/search?q=Bradley+Brown+Inc.+Brandon+MS";

const testimonials = [
  {
    name: "Sarah M.",
    city: "Brandon, MS",
    projectType: "Kitchen Renovation",
    quote:
      "Bradley Brown Inc. transformed our outdated kitchen into a space we actually enjoy cooking in. The crew was punctual, respectful of our home, and kept us informed every step of the way. We couldn't be happier with the craftsmanship.",
    rating: 5,
  },
  {
    name: "David R.",
    city: "Flowood, MS",
    projectType: "Custom Home",
    quote:
      "Building our forever home was a big decision, and Bradley's team made the process feel manageable from day one. They listened to what we wanted and delivered a home that exceeded our expectations. Truly a class act.",
    rating: 5,
  },
  {
    name: "Jennifer T.",
    city: "Pearl, MS",
    projectType: "Room Addition",
    quote:
      "We needed more space for our growing family and Bradley Brown Inc. added a beautiful bedroom and bath that match the existing house perfectly. The project stayed on budget and was completed on time. Highly recommend.",
    rating: 5,
  },
];

const aggregateRating = {
  ratingValue: 5,
  reviewCount: 3,
  bestRating: 5,
  worstRating: 1,
};

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`w-4 h-4 ${i < rating ? "text-amber-400" : "text-gray-300"}`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2l2.99 6.06L21.5 9l-5 4.87L17.5 21 12 17.27 6.5 21l1-7.13-5-4.87 6.51-.94L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function ContactTestimonials() {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://bradleybrowninc.com/#business",
        name: "Bradley Brown Inc.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Brandon",
          addressRegion: "MS",
          postalCode: "39042",
          addressCountry: "US",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: aggregateRating.ratingValue,
          reviewCount: aggregateRating.reviewCount,
          bestRating: aggregateRating.bestRating,
          worstRating: aggregateRating.worstRating,
        },
        review: testimonials.map((t) => ({
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: t.rating,
            bestRating: 5,
            worstRating: 1,
          },
          author: { "@type": "Person", name: t.name },
          reviewBody: t.quote,
        })),
      },
    ],
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14" id="what-our-customers-say">
      <SEOHead
        title="Trusted by Homeowners Across Central Mississippi"
        description="Read verified reviews from Bradley Brown Inc. customers across Brandon, Flowood, Pearl, and Central Mississippi."
        schema={reviewSchema}
      />
      <h2 className="text-2xl md:text-3xl font-bold text-[#1E2D3D] text-center mb-2">
        Trusted by Homeowners Across Central Mississippi
      </h2>
      <div className="flex items-center justify-center gap-2 mb-10">
        <Stars rating={5} />
        <span className="text-sm text-slate-500 font-medium">
          {aggregateRating.ratingValue}.0 · {aggregateRating.reviewCount}+ reviews
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <article
            key={t.name}
            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col"
          >
            <Stars rating={t.rating} />
            <p className="text-slate-600 leading-relaxed mt-3 mb-5 flex-1">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="border-t border-gray-100 pt-4">
              <p className="font-semibold text-[#1E2D3D] text-sm">{t.name}</p>
              <p className="text-slate-400 text-xs">{t.city}</p>
              <span className="inline-block mt-2 bg-amber-50 text-amber-700 text-xs font-medium px-2.5 py-1 rounded-full">
                {t.projectType}
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="text-center mt-8">
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors shadow-sm"
        >
          Read More Reviews
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
            <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2z" />
          </svg>
        </a>
      </div>
    </section>
  );
}