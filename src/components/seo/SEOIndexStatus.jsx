import React, { useState } from "react";
import { CheckCircle, XCircle, AlertCircle, Globe, Link2, Calendar, FileText } from "lucide-react";

const VERDICT_CONFIG = {
  PASS: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50", label: "Indexed" },
  FAIL: { icon: XCircle, color: "text-red-500", bg: "bg-red-50", label: "Not Indexed" },
  NEUTRAL: { icon: AlertCircle, color: "text-yellow-500", bg: "bg-yellow-50", label: "Neutral" },
  UNKNOWN: { icon: AlertCircle, color: "text-slate-400", bg: "bg-slate-50", label: "Unknown" },
  SUBMITTED: { icon: CheckCircle, color: "text-sky-600", bg: "bg-sky-50", label: "Submitted via Sitemap" },
};

const EXPECTED_VERDICT_CONFIG = {
  PASS: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50", label: "✅ EXPECTED — Redirect working" },
  NEUTRAL: { icon: AlertCircle, color: "text-yellow-500", bg: "bg-yellow-50", label: "Pending — Not yet crawled" },
  UNKNOWN: { icon: AlertCircle, color: "text-slate-400", bg: "bg-slate-50", label: "Unknown — Not crawled yet" },
  FAIL: { icon: XCircle, color: "text-red-500", bg: "bg-red-50", label: "⚠️ Unexpected — Check redirect" },
};

function CanonicalRow({ item }) {
  const cfg = VERDICT_CONFIG[item.verdict] || VERDICT_CONFIG.UNKNOWN;
  const Icon = cfg.icon;
  const path = item.path || item.url?.replace("https://bradleybrowninc.com", "") || item.url;
  const canonicalMismatch = item.googleCanonical && item.userCanonical && item.googleCanonical !== item.userCanonical;

  return (
    <div className={`px-5 py-3 ${cfg.bg} border-b border-gray-50`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon className={`w-4 h-4 flex-shrink-0 ${cfg.color}`} />
          <span className="text-sm font-medium text-[#1E2D3D]">{path}</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          {item.lastCrawlTime && (
            <span>Crawled: {new Date(item.lastCrawlTime).toLocaleDateString()}</span>
          )}
          <span className={`font-semibold ${cfg.color}`}>{cfg.label}</span>
        </div>
      </div>
      {(canonicalMismatch || item.googleCanonical || item.sitemap) && (
        <div className="mt-2 ml-7 space-y-1 text-xs">
          {item.googleCanonical && (
            <div className="flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-slate-400" />
              <span className="text-slate-400">Google canonical:</span>
              <span className={`font-mono ${canonicalMismatch ? "text-red-500 font-semibold" : "text-slate-600"}`}>
                {item.googleCanonical.replace("https://bradleybrowninc.com", "") || "/"}
              </span>
            </div>
          )}
          {item.userCanonical && (
            <div className="flex items-center gap-1.5">
              <Link2 className="w-3 h-3 text-slate-400" />
              <span className="text-slate-400">Declared canonical:</span>
              <span className="font-mono text-slate-600">{item.userCanonical.replace("https://bradleybrowninc.com", "") || "/"}</span>
            </div>
          )}
          {canonicalMismatch && (
            <div className="text-red-500 font-semibold">⚠️ Canonical mismatch — Google selected a different URL than declared</div>
          )}
          {item.sitemap && (
            <div className="flex items-center gap-1.5">
              <FileText className="w-3 h-3 text-slate-400" />
              <span className="text-slate-400">Referring sitemap:</span>
              <span className="font-mono text-slate-600">{item.sitemap.replace("https://bradleybrowninc.com", "")}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function RedirectRow({ item }) {
  const isRedirect = item.coverageState === "Page with redirect" || item.verdict === "NEUTRAL";
  const cfg = isRedirect
    ? EXPECTED_VERDICT_CONFIG.PASS
    : EXPECTED_VERDICT_CONFIG[item.verdict] || EXPECTED_VERDICT_CONFIG.UNKNOWN;
  const Icon = cfg.icon;
  const path = item.path || item.url?.replace("https://bradleybrowninc.com", "") || item.url;

  return (
    <div className={`px-5 py-3 ${cfg.bg} border-b border-gray-50`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <Icon className={`w-4 h-4 flex-shrink-0 ${cfg.color}`} />
          <div className="min-w-0">
            <span className="text-sm font-medium text-[#1E2D3D]">{path}</span>
            {item.redirectTo && (
              <span className="text-xs text-slate-400 ml-2">→ {item.redirectTo}</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-500 flex-shrink-0">
          {item.lastCrawlTime && (
            <span>Crawled: {new Date(item.lastCrawlTime).toLocaleDateString()}</span>
          )}
          <span className={`font-semibold ${cfg.color}`}>{cfg.label}</span>
        </div>
      </div>
      {item.coverageState && item.coverageState !== "Page with redirect" && (
        <div className="mt-1 ml-7 text-xs text-slate-400">Coverage: {item.coverageState}</div>
      )}
    </div>
  );
}

export default function SEOIndexStatus({ data, mode }) {
  const [tab, setTab] = useState("canonical");

  if (!data) return (
    <div className="p-5 text-sm text-slate-400">
      {mode === "resubmit"
        ? "Click 'Resubmit All' to resubmit sitemap and check index status for all pages."
        : "Click 'Check Status' to inspect index coverage for all pages."}
    </div>
  );
  if (data.error) return <p className="p-5 text-red-500 text-sm">{data.error}</p>;

  const results = data.results || [];
  const redirectResults = data.redirectResults || [];
  const indexed = results.filter(r => r.verdict === "PASS").length;
  const notIndexed = results.filter(r => r.verdict === "FAIL").length;
  const submitted = results.filter(r => r.verdict === "SUBMITTED").length;

  return (
    <div>
      {mode === "resubmit" && (
        <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-4 flex-wrap text-sm">
          {data.sitemapResubmitted
            ? <span className="text-green-600 font-semibold">✓ Sitemap resubmitted</span>
            : <span className="text-amber-500">⚠ Sitemap submission failed (requires Search Console ownership)</span>}
          <span className="text-slate-400">|</span>
          <span className="text-green-600">{indexed} indexed</span>
          <span className="text-red-500">{notIndexed} not indexed</span>
          {submitted > 0 && <span className="text-sky-600">{submitted} submitted via sitemap</span>}
        </div>
      )}

      {/* Tab switcher — only show redirect tab when we have redirect data */}
      {redirectResults.length > 0 && mode === "check" && (
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setTab("canonical")}
            className={`px-5 py-2.5 text-sm font-medium transition-colors ${tab === "canonical" ? "text-sky-600 border-b-2 border-sky-500" : "text-slate-500 hover:text-slate-700"}`}
          >
            Canonical URLs ({results.length})
          </button>
          <button
            onClick={() => setTab("redirects")}
            className={`px-5 py-2.5 text-sm font-medium transition-colors ${tab === "redirects" ? "text-sky-600 border-b-2 border-sky-500" : "text-slate-500 hover:text-slate-700"}`}
          >
            Old Redirected URLs ({redirectResults.length})
          </button>
        </div>
      )}

      <div>
        {(tab === "canonical" || redirectResults.length === 0 || mode !== "check") && (
          <div className="divide-y divide-gray-50">
            {results.map((item, i) => (
              <CanonicalRow key={i} item={item} />
            ))}
          </div>
        )}
        {tab === "redirects" && redirectResults.length > 0 && mode === "check" && (
          <div>
            <div className="px-5 py-3 bg-green-50 border-b border-green-100 text-xs text-green-700">
              These old URLs should show "Page with redirect" — it means the URL migration is working correctly.
              Google will consolidate signals from old URLs into the new canonical destinations.
            </div>
            <div className="divide-y divide-gray-50">
              {redirectResults.map((item, i) => (
                <RedirectRow key={i} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}