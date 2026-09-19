import { useEffect } from "react";

/**
 * Core Web Vitals reporter.
 *
 * Uses the native PerformanceObserver API (no deps) to measure LCP, INP, CLS,
 * FCP, and TTFB, then reports each metric exactly ONCE per page load — at the
 * first time the page becomes hidden (the same reporting model as Google's
 * web-vitals library).
 *
 * Sends events to:
 *   - window.gtag (if present) as Google Analytics events
 *   - console.info in development
 *   - optional `onMetric` callback for custom backends
 *
 * Metric model:
 *   LCP — latest largest-contentful-paint entry, reported once at first hide
 *   CLS — sum of unexpected layout shifts, reported once at first hide
 *   INP — worst interaction duration (interactionId-based, the standard
 *         approximation of the real INP metric), reported once at first hide
 *   FCP / TTFB — single-entry metrics reported immediately
 *
 * Mount once near the app root:
 *   <WebVitalsReporter />
 */
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  INP: { good: 200, poor: 500 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
};

const rating = (name, value) => {
  const t = THRESHOLDS[name];
  if (!t) return "unknown";
  if (value <= t.good) return "good";
  if (value <= t.poor) return "needs-improvement";
  return "poor";
};

export default function WebVitalsReporter({ onMetric }) {
  useEffect(() => {
    if (typeof window === "undefined" || !("PerformanceObserver" in window)) return;

    const report = (name, value) => {
      const r = rating(name, value);
      const payload = { name, value: Math.round(value * 1000) / 1000, rating: r };

      if (import.meta?.env?.DEV) {
        // eslint-disable-next-line no-console
        console.info(`[Web Vitals] ${name}: ${payload.value} (${r})`);
      }
      if (r === "poor") {
        // eslint-disable-next-line no-console
        console.warn(`[Web Vitals] ${name} is POOR (${payload.value}). Investigate.`);
      }
      if (typeof window.gtag === "function") {
        window.gtag("event", "web_vitals", {
          metric_name: name,
          metric_value: payload.value,
          metric_rating: r,
          non_interaction: true,
        });
      }
      if (typeof onMetric === "function") onMetric(payload);
    };

    const observers = [];
    let lcp = 0;
    let lcpSeen = false;
    let cls = 0;
    let reported = false;
    const interactions = new Map();

    // LCP — track the latest entry; report the final value once
    try {
      const lcpObs = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1];
        if (last) {
          lcp = last.renderTime || last.loadTime || last.startTime;
          lcpSeen = true;
        }
      });
      lcpObs.observe({ type: "largest-contentful-paint", buffered: true });
      observers.push(lcpObs);
    } catch (_e) {}

    // CLS — accumulate unexpected layout shifts; report the sum once
    try {
      const clsObs = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (!entry.hadRecentInput) cls += entry.value;
        });
      });
      clsObs.observe({ type: "layout-shift", buffered: true });
      observers.push(clsObs);
    } catch (_e) {}

    // INP — standard interaction-based model: keep the worst duration per
    // interaction, then report the maximum across all interactions once.
    try {
      const inpObs = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (!entry.interactionId) return;
          const prev = interactions.get(entry.interactionId) || 0;
          if (entry.duration > prev) {
            interactions.set(entry.interactionId, entry.duration);
          }
        });
      });
      inpObs.observe({ type: "event", buffered: true, durationThreshold: 40 });
      observers.push(inpObs);
    } catch (_e) {}

    // FCP — single paint entry, reported immediately
    try {
      const fcpObs = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.name === "first-contentful-paint") report("FCP", entry.startTime);
        });
      });
      fcpObs.observe({ type: "paint", buffered: true });
      observers.push(fcpObs);
    } catch (_e) {}

    // TTFB — single navigation entry, reported immediately
    try {
      const nav = performance.getEntriesByType("navigation")[0];
      if (nav) report("TTFB", nav.responseStart);
    } catch (_e) {}

    // Report LCP / CLS / INP exactly once, at the first time the page is hidden
    const flush = () => {
      if (reported) return;
      reported = true;
      if (lcpSeen) report("LCP", lcp);
      report("CLS", cls);
      if (interactions.size > 0) {
        report("INP", Math.max(...interactions.values()));
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") flush();
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", flush);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", flush);
      observers.forEach((o) => o.disconnect());
    };
  }, [onMetric]);

  return null;
}