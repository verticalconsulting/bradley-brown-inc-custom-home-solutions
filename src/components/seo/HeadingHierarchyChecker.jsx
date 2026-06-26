import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Dev-only heading hierarchy auditor.
 *
 * Mount once near the root of the app. On every route change it inspects
 * the rendered DOM and logs a console.warn if:
 *   - There is no <h1>
 *   - There is more than one <h1>
 *   - A heading skips a level (e.g. h1 → h3)
 *
 * Silent in production. Renders nothing.
 *
 * Mount in App.jsx:
 *   <HeadingHierarchyChecker />
 */
export default function HeadingHierarchyChecker() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (import.meta?.env?.PROD) return;

    // Wait a tick for the page to paint
    const t = setTimeout(() => auditHeadings(location.pathname), 400);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return null;
}

function auditHeadings(pathname) {
  const headings = Array.from(
    document.querySelectorAll("main h1, main h2, main h3, main h4, main h5, main h6")
  );

  if (headings.length === 0) return;

  const levels = headings.map((h) => Number(h.tagName[1]));
  const h1Count = levels.filter((l) => l === 1).length;
  const warnings = [];

  if (h1Count === 0) warnings.push("No <h1> found on this page.");
  if (h1Count > 1) warnings.push(`Multiple <h1> tags found (${h1Count}). There should be exactly one.`);

  // Skipped-level check: each heading's level should be at most prev + 1.
  let prev = 0;
  headings.forEach((h, i) => {
    const level = Number(h.tagName[1]);
    if (prev > 0 && level > prev + 1) {
      const text = (h.textContent || "").trim().slice(0, 60);
      warnings.push(
        `Skipped heading level at index ${i}: <h${prev}> → <h${level}> ("${text}")`
      );
    }
    prev = level;
  });

  if (warnings.length) {
    /* eslint-disable no-console */
    console.groupCollapsed(
      `%c[SEO] Heading hierarchy issues on ${pathname}`,
      "color:#d97706;font-weight:bold;"
    );
    warnings.forEach((w) => console.warn(w));
    console.info(
      "Outline:",
      headings.map((h) => `${h.tagName} — ${(h.textContent || "").trim().slice(0, 50)}`)
    );
    console.groupEnd();
    /* eslint-enable no-console */
  }
}