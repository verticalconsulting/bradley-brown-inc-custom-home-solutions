import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

/**
 * usePageImages — fetches SiteImage records for a given page key
 * and splits them by category so each page section gets the right image.
 *
 * Categories:
 *   hero / background → hero section background
 *   cta               → CTA section background
 *   all others        → gallery / "Our Work" grid
 *
 * @param {string} pageKey — matches SiteImage.location (e.g. "KitchenRemodeling")
 * @returns {{ hero, cta, gallery, all: [] }}
 */
export function usePageImages(pageKey) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!pageKey) return;
    base44.entities.SiteImage.filter({ location: pageKey, active: true })
      .then(setImages)
      .catch(() => setImages([]));
  }, [pageKey]);

  const hero = images.find((img) => img.category === "hero" || img.category === "background");
  const cta = images.find((img) => img.category === "cta");
  const gallery = images.filter(
    (img) => !["hero", "cta", "background"].includes(img.category)
  );

  return { hero, cta, gallery, all: images };
}