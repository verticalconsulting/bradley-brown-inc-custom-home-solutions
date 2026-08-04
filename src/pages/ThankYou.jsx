import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, ChevronRight, Phone, Home } from "lucide-react";
import SEOHead from "@/components/SEOHead";

/**
 * Thank-you page — reachable ONLY via form submission.
 * Direct visits (no ?from=submit param) show a generic message with a link home
 * and do NOT fire conversion events (conversions fire on the submit action,
 * not on pageview, to prevent inflated counts from bookmarks).
 */
export default function ThankYou() {
  const [searchParams] = useSearchParams();
  const fromForm = searchParams.get("from") === "submit";

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      <SEOHead
        title="Thank You — Bradley Brown Inc."
        description="Thank you for contacting Bradley Brown Inc. We'll get back to you within 24 hours."
        noindex
      />

      <div className="max-w-xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
        <div className="bg-white rounded-2xl shadow-md border border-[#E2D9CC] p-8 md:p-12">
          {fromForm ? (
            <>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 rounded-full mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-[#1E2D3D] mb-3">
                Thanks for reaching out!
              </h1>
              <p className="text-slate-600 mb-2 text-base">
                We've received your project details and will contact you within <strong>24 hours</strong>.
              </p>
              <p className="text-slate-500 text-sm mb-8">
                In the meantime, feel free to call us directly or explore our recent work.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="tel:+18443514154"
                  className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <Phone className="w-4 h-4" /> Call (844) 351-4154
                </a>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <Home className="w-4 h-4" /> Back to Home
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-slate-400 text-xs mb-3">Explore more</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Link to="/portfolio" className="text-sky-600 hover:text-sky-700 text-sm font-medium flex items-center gap-1">
                    View Our Work <ChevronRight className="w-3 h-3" />
                  </Link>
                  <span className="text-slate-300">•</span>
                  <Link to="/estimate" className="text-sky-600 hover:text-sky-700 text-sm font-medium flex items-center gap-1">
                    Try AI Estimator <ChevronRight className="w-3 h-3" />
                  </Link>
                  <span className="text-slate-300">•</span>
                  <Link to="/protips" className="text-sky-600 hover:text-sky-700 text-sm font-medium flex items-center gap-1">
                    Pro Tips <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </>
          ) : (
            // Generic message for direct visits (bookmarks, etc.)
            // No conversion events fire here
            <>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-sky-50 rounded-full mb-6">
                <Home className="w-10 h-10 text-sky-500" />
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-[#1E2D3D] mb-3">
                Thanks for your interest!
              </h1>
              <p className="text-slate-600 mb-8 text-base">
                Ready to start your project? Get a free AI-powered cost estimate or explore our recent work.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/estimate"
                  className="inline-flex items-center justify-center gap-2 bg-[#C4922A] hover:bg-[#A37820] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Get My Free Estimate
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <Home className="w-4 h-4" /> Back to Home
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}