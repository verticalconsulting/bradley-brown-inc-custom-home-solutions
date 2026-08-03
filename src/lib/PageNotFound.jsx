import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Home, Search, Phone, Mail, ArrowRight } from "lucide-react";

const POPULAR_LINKS = [
  { label: "Custom Homes & Services", to: "/services", desc: "What we build" },
  { label: "Recent Projects Portfolio", to: "/portfolio", desc: "See our work" },
  { label: "Get a Free Quote", to: "/contactform", desc: "Start your project" },
  { label: "Pro Tips & Remodeling Guides", to: "/protips", desc: "Helpful advice" },
  { label: "About Bradley Brown Inc.", to: "/about", desc: "Who we are" },
];

export default function PageNotFound() {
  const location = useLocation();
  const path = location.pathname + location.search;

  const { data: authData, isFetched } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const user = await base44.auth.me();
        return { user, isAuthenticated: true };
      } catch (_e) {
        return { user: null, isAuthenticated: false };
      }
    },
  });

  // Log the 404 hit so admins can review and add a redirect.
  useEffect(() => {
    const log404 = async () => {
      try {
        const existing = await base44.entities.NotFoundLog.filter({ path: location.pathname }, "-last_seen", 1);
        if (existing && existing.length) {
          await base44.entities.NotFoundLog.update(existing[0].id, {
            hit_count: (existing[0].hit_count || 1) + 1,
            last_seen: new Date().toISOString(),
            referrer: document.referrer || existing[0].referrer || "",
          });
        } else {
          await base44.entities.NotFoundLog.create({
            path: location.pathname,
            search: location.search || "",
            referrer: document.referrer || "",
            user_agent: navigator.userAgent || "",
            hit_count: 1,
            last_seen: new Date().toISOString(),
          });
        }
      } catch (_e) {
        // Silently ignore — never break the 404 page itself.
      }
      if (typeof window.gtag === "function") {
        window.gtag("event", "page_not_found", { path: location.pathname });
      }
    };
    log404();
  }, [location.pathname, location.search]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Tell crawlers + prerenderers this is a real 404, not a soft one */}
      <Helmet>
        <title>Page Not Found (404) | Bradley Brown Inc.</title>
        <meta name="description" content="The page you requested could not be found. Browse our services, portfolio, or contact Bradley Brown Inc." />
        <meta name="robots" content="noindex, follow" />
        <meta name="prerender-status-code" content="404" />
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="text-center">
          <p className="text-7xl md:text-8xl font-light text-slate-300">404</p>
          <div className="h-0.5 w-16 bg-slate-200 mx-auto my-4" />
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-800">
            We couldn't find that page
          </h1>
          <p className="mt-3 text-slate-600 max-w-xl mx-auto">
            The page <span className="font-medium text-slate-700">"{path}"</span> may have moved or no longer exists.
            Try one of the popular destinations below, or get in touch.
          </p>

          {/* Search */}
          <form
          action="/portfolio"
          method="get"
            className="mt-8 max-w-md mx-auto flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm"
            role="search"
            aria-label="Site search"
          >
            <Search className="w-4 h-4 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              name="q"
              placeholder="Search projects, services…"
              className="flex-1 bg-transparent text-sm focus:outline-none"
              aria-label="Search Bradley Brown Inc."
            />
            <button
              type="submit"
              className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium px-3 py-1.5 rounded transition-colors"
            >
              Search
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-[#1E2D3D] hover:bg-slate-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              <Home className="w-4 h-4" aria-hidden="true" />
              Back to Home
            </Link>
            <a
              href="tel:+18443514154"
              className="inline-flex items-center gap-2 border border-slate-300 hover:border-sky-400 hover:text-sky-500 text-slate-700 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              (844) 351-4154
            </a>
          </div>
        </div>

        {/* Popular content */}
        <section aria-label="Popular pages" className="mt-14">
          <h2 className="text-xl font-semibold text-[#1E2D3D] mb-4 text-center">
            Popular pages
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {POPULAR_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="group block bg-white border border-slate-200 rounded-lg p-4 hover:border-sky-400 hover:shadow-md transition-all"
                >
                  <p className="font-medium text-[#1E2D3D] group-hover:text-sky-500 flex items-center justify-between">
                    <span>{l.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  </p>
                  <p className="text-sm text-slate-500 mt-1">{l.desc}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Admin hint */}
        {isFetched && authData?.isAuthenticated && authData.user?.role === "admin" && (
          <div className="mt-10 p-4 bg-white rounded-lg border border-slate-200 max-w-2xl mx-auto">
            <p className="text-sm font-medium text-slate-700 mb-1">Admin Note</p>
            <p className="text-sm text-slate-600">
              This 404 was logged. Review broken URLs at{" "}
              <Link to="/seodashboard" className="text-sky-500 hover:underline">SEO Dashboard</Link>{" "}
              and add a redirect in <code className="text-xs bg-slate-100 px-1 rounded">lib/redirectMap.js</code> if this URL should resolve elsewhere.
            </p>
          </div>
        )}

        {/* Contact fallback */}
        <p className="mt-12 text-center text-sm text-slate-500">
          Still can't find what you're looking for?{" "}
          <a href="mailto:bradleybrowninc@gmail.com" className="text-sky-500 hover:underline inline-flex items-center gap-1">
            <Mail className="w-3.5 h-3.5" aria-hidden="true" />
            bradleybrowninc@gmail.com
          </a>
        </p>
      </main>
    </div>
  );
}