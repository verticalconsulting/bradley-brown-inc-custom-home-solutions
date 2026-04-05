import React from "react";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

const VERDICT_CONFIG = {
  PASS: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50", label: "Indexed" },
  FAIL: { icon: XCircle, color: "text-red-500", bg: "bg-red-50", label: "Not Indexed" },
  NEUTRAL: { icon: AlertCircle, color: "text-yellow-500", bg: "bg-yellow-50", label: "Neutral" },
  UNKNOWN: { icon: AlertCircle, color: "text-slate-400", bg: "bg-slate-50", label: "Unknown" },
  SUBMITTED: { icon: CheckCircle, color: "text-sky-600", bg: "bg-sky-50", label: "Submitted via Sitemap" },
};

export default function SEOIndexStatus({ data, mode }) {
  if (!data) return (
    <div className="p-5 text-sm text-slate-400">
      {mode === "resubmit"
        ? "Click 'Resubmit All' to resubmit sitemap and check index status for all pages."
        : "Click 'Check Status' to inspect index coverage for all pages."}
    </div>
  );
  if (data.error) return <p className="p-5 text-red-500 text-sm">{data.error}</p>;

  const results = data.results || [];
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
      <div className="divide-y divide-gray-50">
        {results.map((item, i) => {
          const cfg = VERDICT_CONFIG[item.verdict] || VERDICT_CONFIG.UNKNOWN;
          const Icon = cfg.icon;
          const path = item.path || item.url?.replace("https://bradleybrowninc.com", "") || item.url;
          return (
            <div key={i} className={`flex items-center justify-between px-5 py-3 ${cfg.bg}`}>
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
          );
        })}
      </div>
    </div>
  );
}