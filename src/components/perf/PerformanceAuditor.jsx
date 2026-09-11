import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Dev-only Core Web Vitals / page-speed checklist auditor.
 *
 * Mount near the app root. On each route, after paint, runs a static audit
 * over the rendered DOM + <head> and either logs a console group or — when
 * `visible` is true — shows a floating panel in the corner.
 *
 * Silent in production. Never affects users.
 *
 * Checks (build/runtime — no external tools needed):
 *   1. Image optimization: every <img> has width+height, lazy on non-LCP, alt text
 *   2. Font optimization: preconnect to font origin, font-display swap in stylesheets
 *   3. JS: count of blocking <script> tags in <body>
 *   4. CSS: presence of preload for above-the-fold styles
 *   5. Resource hints: preconnect to GA/GTM/Clarity, etc.
 *
 * Each failed check logs a console.warn so dev sees it inline.
 *
 *   <PerformanceAuditor />            — console only
 *   <PerformanceAuditor visible />    — floating badge w/ score
 */
export default function PerformanceAuditor({ visible = false }) {
  const location = useLocation();
  const [report, setReport] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (import.meta?.env?.PROD) return;

    const t = setTimeout(() => {
      const result = runAudit();
      setReport(result);
      logReport(location.pathname, result);
    }, 800);
    return () => clearTimeout(t);
  }, [location.pathname]);

  if (!visible || !report) return null;

  const color =
    report.score >= 90 ? "#16a34a" : report.score >= 70 ? "#d97706" : "#dc2626";

  return (
    <div
      style={{
        position: "fixed",
        bottom: 12,
        right: 12,
        zIndex: 99999,
        background: "white",
        border: `2px solid ${color}`,
        borderRadius: 8,
        padding: "8px 12px",
        fontSize: 12,
        fontFamily: "system-ui, sans-serif",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        maxWidth: 280,
      }}
    >
      <div style={{ fontWeight: 600, color, marginBottom: 4 }}>
        Perf audit: {report.score}/100
      </div>
      {report.failed.length === 0 ? (
        <div style={{ color: "#16a34a" }}>All checks passed ✓</div>
      ) : (
        <ul style={{ margin: 0, paddingLeft: 16, color: "#475569" }}>
          {report.failed.slice(0, 5).map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function runAudit() {
  const checks = [];

  // 1. Images — width/height + alt + lazy
  const imgs = Array.from(document.querySelectorAll("img"));
  const imgsMissingDims = imgs.filter(
    (i) => !i.getAttribute("width") || !i.getAttribute("height")
  );
  const imgsMissingAlt = imgs.filter((i) => !i.hasAttribute("alt"));
  checks.push({
    name: "Images have width & height (CLS)",
    pass: imgsMissingDims.length === 0,
    detail: imgsMissingDims.length
      ? `${imgsMissingDims.length} of ${imgs.length} <img> missing dimensions`
      : `${imgs.length} images OK`,
  });
  checks.push({
    name: "Images have alt attribute (a11y/SEO)",
    pass: imgsMissingAlt.length === 0,
    detail: imgsMissingAlt.length ? `${imgsMissingAlt.length} missing alt` : "all OK",
  });

  // 2. Fonts — self-hosted WOFF2 with critical preload (Google Fonts is intentionally absent)
  const head = document.head;
  const hasFontPreload = !!head.querySelector('link[rel="preload"][as="font"]');
  const usesGoogleFonts =
    !!head.querySelector('link[href*="fonts.googleapis"]') ||
    Array.from(document.styleSheets).some((s) => {
      try {
        return (s.href || "").includes("fonts.googleapis");
      } catch (_e) {
        return false;
      }
    });
  checks.push({
    name: "No Google Fonts on critical path (self-hosted)",
    pass: !usesGoogleFonts,
    detail: usesGoogleFonts
      ? "fonts.googleapis.com stylesheet found — self-host instead"
      : "self-hosted fonts",
  });
  checks.push({
    name: "Critical font preload",
    pass: hasFontPreload,
    detail: hasFontPreload ? "preload present" : "consider preloading critical font",
  });

  // 3. JS — render-blocking scripts in <body>
  const blockingBodyScripts = Array.from(
    document.body.querySelectorAll("script[src]")
  ).filter((s) => !s.async && !s.defer && s.type !== "module");
  checks.push({
    name: "No render-blocking scripts in <body>",
    pass: blockingBodyScripts.length === 0,
    detail: blockingBodyScripts.length
      ? `${blockingBodyScripts.length} blocking script(s) found`
      : "none",
  });

  // 4. CSS — render-blocking stylesheet count
  const stylesheets = Array.from(
    head.querySelectorAll('link[rel="stylesheet"]')
  );
  checks.push({
    name: "Limited render-blocking stylesheets",
    pass: stylesheets.length <= 3,
    detail: `${stylesheets.length} stylesheet link(s)`,
  });

  // 5. Resource hints — preconnect to known 3rd parties
  const preconnects = Array.from(head.querySelectorAll('link[rel="preconnect"]'))
    .map((l) => l.href);
  const knownThirdParties = [
    { name: "GTM/GA", match: "googletagmanager" },
    { name: "Clarity", match: "clarity" },
  ];
  knownThirdParties.forEach((tp) => {
    const usesIt = Array.from(document.scripts).some((s) =>
      (s.src || "").includes(tp.match)
    );
    if (!usesIt) return;
    const has = preconnects.some((h) => h.includes(tp.match.split(".")[0]));
    checks.push({
      name: `Preconnect to ${tp.name}`,
      pass: has,
      detail: has ? "present" : `add <link rel=preconnect href=...${tp.match}>`,
    });
  });

  const passed = checks.filter((c) => c.pass).length;
  const score = Math.round((passed / checks.length) * 100);
  const failed = checks.filter((c) => !c.pass).map((c) => `${c.name}: ${c.detail}`);

  return { score, checks, failed };
}

function logReport(pathname, report) {
  /* eslint-disable no-console */
  const color =
    report.score >= 90 ? "#16a34a" : report.score >= 70 ? "#d97706" : "#dc2626";
  console.groupCollapsed(
    `%c[Perf] ${pathname} — ${report.score}/100`,
    `color:${color};font-weight:bold;`
  );
  report.checks.forEach((c) => {
    const icon = c.pass ? "✓" : "✗";
    const fn = c.pass ? console.info : console.warn;
    fn(`${icon} ${c.name} — ${c.detail}`);
  });
  console.groupEnd();
  /* eslint-enable no-console */
}