import React, { useState, useEffect, useRef, Suspense } from "react";

/**
 * VisibleMount — renders below-the-fold children only once they scroll within
 * `margin` of the viewport. Keeps data-fetching sections (services, projects,
 * reviews) out of the initial page-load dependency chain: the browser doesn't
 * fire their API calls until the user actually approaches them.
 *
 * Until then a zero-height sentinel reserves the section's position in the
 * document flow, and the IntersectionObserver fires once (one-shot).
 */
export default function VisibleMount({ children, margin = 200 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true); // no observer support → don't block content
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: `${margin}px 0px` }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible, margin]);

  return visible ? (
    <Suspense fallback={null}>{children}</Suspense>
  ) : (
    <div ref={ref} aria-hidden="true" />
  );
}