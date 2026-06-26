import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * Related content / "you might also like" block.
 *
 * Props:
 *   title?:    section heading (default: "Related guides")
 *   items:     [{ title, description, url, eyebrow? }]
 *              - title: descriptive anchor text (NEVER "click here")
 *              - description: 1-line summary
 *              - url: full internal path ("/Services", not "#")
 *              - eyebrow: optional small label (e.g. "Guide", "Service")
 *   className?
 *
 * Renders as <aside> with aria-label for semantic clarity.
 * Recommended count: 3–5 items.
 */
export default function RelatedContent({
  title = "Related guides",
  items = [],
  className = "",
}) {
  const filtered = items.filter((i) => i && i.title && i.url).slice(0, 5);
  if (filtered.length === 0) return null;

  return (
    <aside
      aria-label={title}
      className={`bg-slate-50 border-t border-slate-200 py-12 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-[#1E2D3D] mb-6">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <Link
              key={item.url}
              to={item.url}
              className="group bg-white border border-slate-200 rounded-lg p-5 hover:border-sky-400 hover:shadow-md transition-all"
            >
              {item.eyebrow && (
                <p className="text-xs uppercase tracking-wider text-sky-500 font-semibold mb-2">
                  {item.eyebrow}
                </p>
              )}
              <h3 className="font-semibold text-[#1E2D3D] group-hover:text-sky-500 transition-colors flex items-start gap-1.5">
                <span>{item.title}</span>
                <ArrowRight
                  className="w-4 h-4 mt-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
              </h3>
              {item.description && (
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}