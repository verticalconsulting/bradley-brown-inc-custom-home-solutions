import { useEffect } from "react";

/**
 * Core Web Vitals reporter.
 *
 * Uses the native PerformanceObserver API (no deps) to log LCP, INP, CLS,
 * FCP, and TTFB. Sends events to:
 *   - window.gtag (if present) as Google Analytics events
 *   - console.info in development
 *   - optional `onMetric` callback for custom backends
 *
 * Thresholds (Google "good" cutoffs):
 *   LCP   <= 2500ms
 *   INP   <= 200ms
 *   CLS   <= 0.1
 *
 * Regression alerts: any metric exceeding the "poor" threshold logs a
 * console.warn so the team can see it during testing.
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

    // LCP
    try {
      const lcpObs = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1];
        if (last) report("LCP", last.renderTime || last.loadTime || last.startTime);
      });
      lcpObs.observe({ type: "largest-contentful-paint", buffered: true });
      observers.push(lcpObs);
    } catch (_e) {}

    // CLS (sum of unexpected layout shifts)
    try {
      let cls = 0;
      const clsObs = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (!entry.hadRecentInput) cls += entry.value;
        });
        report("CLS", cls);
      });
      clsObs.observe({ type: "layout-shift", buffered: true });
      observers.push(clsObs);
    } catch (_e) {}

    // INP (closest available: longest event duration so far)
    try {
      let worst = 0;
      const inpObs = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > worst) {
            worst = entry.duration;
            report("INP", worst);
          }
        });
      });
      inpObs.observe({ type: "event", buffered: true, durationThreshold: 40 });
      observers.push(inpObs);
    } catch (_e) {}

    // FCP
    try {
      const fcpObs = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.name === "first-contentful-paint") report("FCP", entry.startTime);
        });
      });
      fcpObs.observe({ type: "paint", buffered: true });
      observers.push(fcpObs);
    } catch (_e) {}

    // TTFB
    try {
      const nav = performance.getEntriesByType("navigation")[0];
      if (nav) report("TTFB", nav.responseStart);
    } catch (_e) {}

    return () => observers.forEach((o) => o.disconnect());
  }, [onMetric]);

  return null;
}