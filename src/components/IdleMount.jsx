import React, { useState, useEffect, Suspense } from "react";

/**
 * IdleMount — renders its children (usually lazy, below-the-fold sections)
 * once the browser's main thread is idle. Keeps first paint and the hero
 * free of main-thread competition; includes the Suspense boundary for the
 * lazy chunks it wraps.
 */
export default function IdleMount({ children, timeout = 2000 }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => setReady(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(start, 600);
    return () => clearTimeout(t);
  }, [timeout]);

  if (!ready) return null;
  return <Suspense fallback={null}>{children}</Suspense>;
}