import React, { useEffect, useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { base44 } from "@/api/base44Client";
import ReviewCard from "./ReviewCard";
import AggregateRatingBanner from "./AggregateRatingBanner";
import {
  businessWithReviewsSchema,
  computeAggregate,
} from "@/components/seo/reviewSchemas";

const FALLBACK_REVIEWS = [
  { client_name: "Michael & Sarah T.", location: "Ridgeland, MS", rating: 5, text: "Bradley Brown built our custom home from scratch and it was an incredible experience. They kept us informed at every stage, came in on budget, and the quality is outstanding.", project_type: "custom_home" },
  { client_name: "Jennifer L.", location: "Madison, MS", rating: 5, text: "We had our master bath and kitchen completely renovated. The team was professional, respectful of our home, and the results exceeded our expectations.", project_type: "renovation" },
  { client_name: "Robert & Karen H.", location: "Brandon, MS", rating: 5, text: "From the initial consultation to the final walkthrough, Bradley Brown was exceptional. They turned our outdated house into the home we always dreamed of.", project_type: "addition" },
  { client_name: "Lisa P.", location: "Flowood, MS", rating: 5, text: "Honest, transparent, and genuinely talented builders. Our room addition came in on budget and looks like it was always part of the house.", project_type: "addition" },
  { client_name: "David H.", location: "Pearl, MS", rating: 5, text: "I've used Bradley Brown twice now. First a bathroom remodel, then a full kitchen gut. Both times — perfect results.", project_type: "renovation" },
  { client_name: "Karen L.", location: "Madison, MS", rating: 5, text: "The most professional contractor we've ever worked with. They treated our home like it was their own. Zero regrets.", project_type: "renovation" },
];

/**
 * SEO-ready reviews section.
 *
 * - Loads Testimonial records (falls back to curated set if none).
 * - Renders ReviewCard grid with schema.org microdata.
 * - Computes aggregate rating dynamically.
 * - Emits a single LocalBusiness JSON-LD node containing both
 *   aggregateRating and the embedded reviews — Google's preferred shape
 *   for organization-level testimonials.
 *
 * Props:
 *   limit              - default 6
 *   featuredOnly       - default false
 *   title              - default "What Our Clients Say"
 *   subtitle           - default tagline
 *   emitSchema         - default true (set false if a parent already emits it)
 *   showAggregate      - default true
 */
export default function ReviewsSection({
  limit = 6,
  featuredOnly = false,
  title = "What Our Clients Say",
  subtitle = "Trusted by homeowners across Central Mississippi since 1995.",
  emitSchema = true,
  showAggregate = true,
}) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const filters = featuredOnly ? { featured: true } : {};
    base44.entities.Testimonial.filter(filters, "-created_date", limit)
      .then((data) => setReviews(data.length ? data : FALLBACK_REVIEWS.slice(0, limit)))
      .catch(() => setReviews(FALLBACK_REVIEWS.slice(0, limit)))
      .finally(() => setLoading(false));
  }, [limit, featuredOnly]);

  const aggregate = useMemo(() => computeAggregate(reviews, "rating"), [reviews]);

  const schemaJson = useMemo(() => {
    if (!emitSchema || !reviews.length) return null;
    return businessWithReviewsSchema({
      reviews: reviews.map((r) => ({
        author: r.client_name,
        reviewBody: r.text,
        ratingValue: r.rating || 5,
        datePublished: r.created_date ? new Date(r.created_date).toISOString().slice(0, 10) : undefined,
      })),
      ratingValue: aggregate?.ratingValue,
      ratingCount: aggregate?.ratingCount,
      reviewCount: aggregate?.reviewCount,
    });
  }, [emitSchema, reviews, aggregate]);

  if (loading) return null;

  return (
    <section className="py-12 md:py-16" aria-labelledby="reviews-heading">
      {schemaJson && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(schemaJson)}</script>
        </Helmet>
      )}

      <div className="text-center mb-8">
        <h2 id="reviews-heading" className="text-2xl md:text-3xl font-bold text-[#1E2D3D]">
          {title}
        </h2>
        {subtitle && (
          <p className="text-slate-500 mt-2 text-sm max-w-xl mx-auto">{subtitle}</p>
        )}
        {showAggregate && aggregate && (
          <div className="mt-5">
            <AggregateRatingBanner
              ratingValue={aggregate.ratingValue}
              ratingCount={aggregate.ratingCount}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.map((r, i) => (
          <ReviewCard key={r.id || i} review={r} />
        ))}
      </div>
    </section>
  );
}