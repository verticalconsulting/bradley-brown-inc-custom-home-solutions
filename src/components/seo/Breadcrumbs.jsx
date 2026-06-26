import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { breadcrumbFromPath } from "@/components/seo/schemaExtras";
import { breadcrumbSchema, absoluteUrl } from "@/components/seo/seoSchemas";

/**
 * Accessible breadcrumb nav + JSON-LD BreadcrumbList.
 *
 * Usage:
 *   <Breadcrumbs />                                   // auto from URL
 *   <Breadcrumbs items={[{name:"Home",url:"/"},...]} /> // custom
 *   <Breadcrumbs labels={{ "custom-homes": "Custom Homes" }} /> // override segment labels
 *
 * - <nav aria-label="Breadcrumb"> semantic wrapper
 * - Current page rendered as <span aria-current="page"> (not a link)
 * - JSON-LD emitted into <head> via react-helmet-async
 */
export default function Breadcrumbs({
  items,
  labels = {},
  className = "",
  showHome = true,
  showSchema = true,
}) {
  const location = useLocation();

  const list = items && items.length
    ? items
    : autoFromPath(location.pathname, labels, showHome);

  if (!list || list.length === 0) return null;

  const schema = showSchema ? breadcrumbSchema(list) : null;

  return (
    <>
      {schema && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
      )}
      <nav
        aria-label="Breadcrumb"
        className={`text-sm text-slate-500 ${className}`}
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          {list.map((item, idx) => {
            const isLast = idx === list.length - 1;
            return (
              <li key={item.url + idx} className="flex items-center gap-1.5">
                {idx > 0 && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                )}
                {isLast ? (
                  <span aria-current="page" className="text-slate-800 font-medium">
                    {idx === 0 && showHome ? (
                      <Home className="w-3.5 h-3.5 inline -mt-0.5" aria-hidden="true" />
                    ) : (
                      item.name
                    )}
                  </span>
                ) : (
                  <Link
                    to={item.url}
                    className="hover:text-sky-500 transition-colors inline-flex items-center gap-1"
                  >
                    {idx === 0 && showHome ? (
                      <>
                        <Home className="w-3.5 h-3.5" aria-hidden="true" />
                        <span className="sr-only">{item.name}</span>
                      </>
                    ) : (
                      item.name
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

function autoFromPath(pathname, labels, showHome) {
  // Reuse the JSON-LD generator's segment logic but return a plain item list.
  const schema = breadcrumbFromPath(pathname, labels);
  const items = schema.itemListElement.map((el) => ({
    name: el.name,
    url: el.item.replace(/^https?:\/\/[^/]+/i, "") || "/",
  }));
  if (!showHome) items.shift();
  // Don't render a lone "Home" crumb on the homepage
  if (items.length <= 1 && pathname === "/") return [];
  return items;
}

// Re-export for convenience
export { breadcrumbFromPath, absoluteUrl };