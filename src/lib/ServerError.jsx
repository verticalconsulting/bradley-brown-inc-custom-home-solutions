import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AlertTriangle, RefreshCw, Phone, Mail, Home } from "lucide-react";

/**
 * Generic 5xx / unexpected-error page.
 *
 * Used as the fallback by ErrorBoundary, but also routable at /error
 * for testing or for the server to render directly.
 *
 * Sets a `prerender-status-code` of 500 so server-side prerenderers
 * can emit a true 5xx status to crawlers.
 *
 * Props:
 *   onRetry?: () => void   - if provided, shows a "Try again" button
 *   statusCode?: number    - override (e.g. 503 for maintenance)
 */
export default function ServerError({ onRetry, statusCode = 500 }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>Something Went Wrong | Bradley Brown Inc.</title>
        <meta
          name="description"
          content="We hit a temporary problem loading this page. Please try again, or contact Bradley Brown Inc. for help."
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="prerender-status-code" content={String(statusCode)} />
      </Helmet>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-6">
          <AlertTriangle className="w-8 h-8 text-amber-600" aria-hidden="true" />
        </div>
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
          Error {statusCode}
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-semibold text-slate-800">
          Something went wrong on our end
        </h1>
        <p className="mt-3 text-slate-600 leading-relaxed">
          We hit a temporary problem loading this page. Our team has been notified.
          Please try again in a moment — or reach out and we'll help you directly.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {onRetry ? (
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              Try again
            </button>
          ) : (
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              Reload page
            </button>
          )}
          <Link
            to="/"
            className="inline-flex items-center gap-2 border border-slate-300 hover:border-slate-400 text-slate-700 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            Back to Home
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500 mb-3">Need help right now?</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <a
              href="tel:+18443514154"
              className="inline-flex items-center gap-1.5 text-slate-700 hover:text-sky-500"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              (844) 351-4154
            </a>
            <a
              href="mailto:bradleybrowninc@gmail.com"
              className="inline-flex items-center gap-1.5 text-slate-700 hover:text-sky-500"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              bradleybrowninc@gmail.com
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}