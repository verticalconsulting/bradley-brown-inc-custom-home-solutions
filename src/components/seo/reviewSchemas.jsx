/**
 * Review / Rating JSON-LD schema helpers.
 *
 * Spec: https://developers.google.com/search/docs/appearance/structured-data/review-snippet
 *
 * Google's rich-result requirements for reviews/ratings:
 *   - Each Review needs author, reviewRating, and itemReviewed.
 *   - reviewRating.ratingValue is required; bestRating/worstRating default to 5/1.
 *   - AggregateRating needs ratingValue, ratingCount (or reviewCount), and itemReviewed.
 *   - Reviews/ratings must be about a specific item — not "the company in general"
 *     unless they're embedded on the Organization/LocalBusiness page.
 */

import { SITE_NAME, SITE_URL, absoluteUrl } from "./seoSchemas";

/**
 * Build the `itemReviewed` node. Sensible defaults point to the Organization
 * itself (i.e. testimonials about Bradley Brown Inc.).
 */
export const defaultItemReviewed = ({
  type = "LocalBusiness",
  name = SITE_NAME,
  url = SITE_URL,
  image,
} = {}) => ({
  "@type": type,
  name,
  url,
  ...(image && { image }),
});

/**
 * Single Rating node — used inside Review.reviewRating.
 */
export const ratingSchema = ({
  ratingValue,
  bestRating = 5,
  worstRating = 1,
} = {}) => ({
  "@type": "Rating",
  ratingValue: String(ratingValue),
  bestRating: String(bestRating),
  worstRating: String(worstRating),
});

/**
 * AggregateRating node.
 *
 * @param {object}  opts
 * @param {number}  opts.ratingValue   - average (e.g. 4.9)
 * @param {number}  opts.ratingCount   - total ratings counted
 * @param {number} [opts.reviewCount]  - total written reviews (defaults to ratingCount)
 * @param {number} [opts.bestRating=5]
 * @param {number} [opts.worstRating=1]
 * @param {object} [opts.itemReviewed] - if standalone (not nested in itemReviewed)
 */
export const aggregateRatingSchema = ({
  ratingValue,
  ratingCount,
  reviewCount,
  bestRating = 5,
  worstRating = 1,
  itemReviewed,
} = {}) => {
  if (!ratingValue || !ratingCount) return null;
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    ratingValue: Number(ratingValue).toFixed(1),
    ratingCount: Number(ratingCount),
    reviewCount: Number(reviewCount ?? ratingCount),
    bestRating: String(bestRating),
    worstRating: String(worstRating),
    ...(itemReviewed && { itemReviewed }),
  };
};

/**
 * Single Review node.
 *
 * @param {object} opts
 * @param {string} opts.author          - reviewer name (required)
 * @param {string} opts.reviewBody      - review text (required)
 * @param {number} opts.ratingValue     - star value 1–5 (required)
 * @param {string} [opts.datePublished] - ISO date
 * @param {object} [opts.itemReviewed]  - defaults to Organization
 */
export const reviewSchema = ({
  author,
  reviewBody,
  ratingValue,
  datePublished,
  bestRating = 5,
  worstRating = 1,
  itemReviewed,
} = {}) => ({
  "@context": "https://schema.org",
  "@type": "Review",
  author: { "@type": "Person", name: author },
  reviewBody,
  reviewRating: ratingSchema({ ratingValue, bestRating, worstRating }),
  ...(datePublished && { datePublished }),
  itemReviewed: itemReviewed || defaultItemReviewed(),
});

/**
 * Build a combined LocalBusiness/Organization node that *contains* the
 * aggregateRating and its reviews — this is the pattern Google prefers for
 * organization-level testimonials (vs. emitting bare Reviews).
 */
export const businessWithReviewsSchema = ({
  reviews = [],
  ratingValue,
  ratingCount,
  reviewCount,
  type = "LocalBusiness",
  name = SITE_NAME,
  url = SITE_URL,
  image,
} = {}) => {
  if (!reviews.length && !ratingCount) return null;
  const node = {
    "@context": "https://schema.org",
    "@type": type,
    name,
    url: absoluteUrl(url),
    ...(image && { image }),
  };
  if (ratingValue && ratingCount) {
    node.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: Number(ratingValue).toFixed(1),
      ratingCount: Number(ratingCount),
      reviewCount: Number(reviewCount ?? ratingCount),
      bestRating: "5",
      worstRating: "1",
    };
  }
  if (reviews.length) {
    node.review = reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewBody: r.reviewBody,
      reviewRating: ratingSchema({ ratingValue: r.ratingValue }),
      ...(r.datePublished && { datePublished: r.datePublished }),
    }));
  }
  return node;
};

/**
 * Compute aggregate rating numbers from a list of review-like records.
 * Skips records without a numeric rating.
 *
 *   computeAggregate([{rating: 5}, {rating: 4}]) → { ratingValue: 4.5, ratingCount: 2, reviewCount: 2 }
 */
export const computeAggregate = (records = [], ratingKey = "rating") => {
  const rated = records.filter((r) => typeof r[ratingKey] === "number" && r[ratingKey] > 0);
  if (!rated.length) return null;
  const sum = rated.reduce((acc, r) => acc + r[ratingKey], 0);
  return {
    ratingValue: Number((sum / rated.length).toFixed(2)),
    ratingCount: rated.length,
    reviewCount: rated.length,
  };
};