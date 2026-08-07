import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

let cache = null;
let fetchPromise = null;

function fetchGoogleReviews() {
  if (cache) return Promise.resolve(cache);
  if (fetchPromise) return fetchPromise;

  fetchPromise = base44.functions
    .invoke("getGoogleReviews", {})
    .then((res) => {
      const data = res.data || res;
      if (data && data.reviews && data.reviews.length > 0) {
        cache = {
          reviews: data.reviews,
          rating: data.rating || 5,
          count: data.user_ratings_total || data.reviews.length,
        };
      }
      return cache;
    })
    .catch(() => null)
    .finally(() => {
      fetchPromise = null;
    });

  return fetchPromise;
}

export function useGoogleReviews() {
  const [state, setState] = useState(() =>
    cache || { reviews: [], rating: 5, count: 0, loading: true }
  );

  useEffect(() => {
    if (cache && !state.loading) return;
    fetchGoogleReviews().then((c) => {
      if (c) {
        setState({ ...c, loading: false });
      } else {
        setState({ reviews: [], rating: 5, count: 0, loading: false });
      }
    });
  }, []);

  return state;
}