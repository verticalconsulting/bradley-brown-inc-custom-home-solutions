import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Star } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import StickyCallButton from "@/components/StickyCallButton";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Bradley Brown Inc. Customer Reviews",
  url: "https://bradleybrowninc.com/reviews",
  description: "Customer reviews returned by Bradley Brown Inc.'s connected Google review source.",
  isPartOf: { "@type": "WebSite", name: "Bradley Brown Inc.", url: "https://bradleybrowninc.com" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://bradleybrowninc.com" },
      { "@type": "ListItem", position: 2, name: "Reviews", item: "https://bradleybrowninc.com/reviews" },
    ],
  },
};

function Stars({ rating = 5 }) {
  const rounded = Math.round(Number(rating) || 5);
  return (
    <div className="flex gap-1" aria-label={`${rounded} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className={`w-5 h-5 ${star <= rounded ? "text-amber-400 fill-current" : "text-slate-200"}`} aria-hidden="true" />
      ))}
    </div>
  );
}

export default function Reviews() {
  const { reviews, rating, count, loading } = useGoogleReviews();

  return (
    <div className="min-h-screen bg-background pt-16 md:pt-20">
      <SEOHead
        title="Bradley Brown Inc. Reviews | Customer Feedback"
        description="Read customer feedback returned by Bradley Brown Inc.'s connected Google review source, then explore related projects and services."
        canonical="https://bradleybrowninc.com/reviews"
        schema={schema}
      />
      <StickyCallButton />

      <section className="bg-foreground py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white">Bradley Brown Inc. Customer Reviews</h1>
          <p className="text-slate-300 mt-5 max-w-2xl mx-auto text-lg leading-relaxed">
            This page displays customer feedback returned by Bradley Brown Inc.'s connected Google review source. Use the portfolio and service pages alongside these reviews when evaluating the company for your project.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 space-y-12">
        {loading && <p className="text-center text-slate-500">Loading available Google reviews…</p>}

        {!loading && reviews.length > 0 && (
          <>
            <section className="text-center">
              <div className="flex justify-center"><Stars rating={rating} /></div>
              <p className="mt-2 font-semibold text-foreground">{rating} from {count} Google reviews</p>
              <p className="text-sm text-slate-500 mt-1">Displayed from the connected review source; availability can change.</p>
            </section>

            <section className="grid md:grid-cols-2 gap-5">
              {reviews.map((review, index) => (
                <article key={`${review.author_name}-${index}`} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <Stars rating={review.rating} />
                  <blockquote className="text-slate-600 leading-relaxed mt-4">“{review.text}”</blockquote>
                  <p className="font-semibold text-foreground mt-5">{review.author_name}</p>
                  <p className="text-xs text-slate-400 mt-1">Google review</p>
                </article>
              ))}
            </section>
          </>
        )}

        {!loading && reviews.length === 0 && (
          <section className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-foreground">Reviews are temporarily unavailable</h2>
            <p className="text-slate-600 mt-2">The connected Google review source did not return review text. No substitute or unverified review content is shown.</p>
          </section>
        )}

        <section className="bg-sky-50 border border-sky-100 rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-foreground">Compare Feedback with Completed Work</h2>
          <p className="text-slate-600 mt-3 leading-relaxed">
            Reviews are most useful when considered alongside project examples, service scope, and a clear conversation about your own property and priorities.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <Link to="/portfolio" className="inline-flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-full font-semibold">View Portfolio <ChevronRight className="w-4 h-4" /></Link>
            <Link to="/services/custom-home-building" className="inline-flex items-center gap-2 bg-white border border-sky-200 text-sky-700 px-5 py-3 rounded-full font-semibold">Custom Home Building <ChevronRight className="w-4 h-4" /></Link>
            <Link to="/estimate" className="inline-flex items-center gap-2 bg-white border border-sky-200 text-sky-700 px-5 py-3 rounded-full font-semibold">Request an Estimate <ChevronRight className="w-4 h-4" /></Link>
          </div>
        </section>
      </div>
    </div>
  );
}
