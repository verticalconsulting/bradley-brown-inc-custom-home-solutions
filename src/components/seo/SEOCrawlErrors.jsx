import React, { useState } from "react";
import { Loader2, RefreshCw, CheckCircle2, XCircle, AlertTriangle, Smartphone, Lightbulb, Info, ChevronDown, ChevronUp } from "lucide-react";

const VERDICT_CONFIG = {
  PASS: { label: "Indexed", color: "text-green-600", bg: "bg-green-50", icon: CheckCircle2 },
  FAIL: { label: "Error", color: "text-red-600", bg: "bg-red-50", icon: XCircle },
  NEUTRAL: { label: "Warning", color: "text-amber-600", bg: "bg-amber-50", icon: AlertTriangle },
  UNKNOWN: { label: "Unknown", color: "text-slate-500", bg: "bg-slate-50", icon: AlertTriangle },
};

function PageRow({ page }) {
  const [expanded, setExpanded] = useState(false);
  const config = VERDICT_CONFIG[page.verdict] || VERDICT_CONFIG.UNKNOWN;
  const Icon = config.icon;
  const hasMobileIssues = page.mobileIssues?.length > 0;

  return (
    <div className={`border rounded-xl overflow-hidden ${page.verdict === "FAIL" ? "border-red-200" : page.verdict === "NEUTRAL" ? "border-amber-200" : "border-gray-100"}`}>
      <div
        className={`flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-slate-50 ${config.bg}`}
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex items-center gap-3 min-w-0">
          <Icon className={`w-4 h-4 flex-shrink-0 ${config.color}`} />
          <span className="text-sm font-mono font-medium text-[#1E2D3D] truncate">{page.path}</span>
          {hasMobileIssues && (
            <span className="flex items-center gap-1 text-xs bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full flex-shrink-0">
              <Smartphone className="w-3 h-3" /> Mobile
            </span>
          )}
        </div>
        <div className="flex items-center gap-4 flex-shrink-0 ml-3">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${config.bg} ${config.color}`}>
            {config.label}
          </span>
          {page.perf && (
            <span className="text-xs text-slate-500 hidden sm:block">{page.perf.clicks} clicks</span>
          )}
          {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
      </div>

      {expanded && (
        <div className="px-4 py-3 bg-white border-t border-gray-100 space-y-2 text-xs text-slate-600">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <p className="text-slate-400 uppercase tracking-wide font-semibold mb-0.5">Coverage</p>
              <p className="font-medium">{page.coverageState}</p>
            </div>
            <div>
              <p className="text-slate-400 uppercase tracking-wide font-semibold mb-0.5">Last Crawled</p>
              <p className="font-medium">{page.lastCrawlTime ? new Date(page.lastCrawlTime).toLocaleDateString() : "Never"}</p>
            </div>
            <div>
              <p className="text-slate-400 uppercase tracking-wide font-semibold mb-0.5">Crawled As</p>
              <p className="font-medium">{page.crawledAs || "—"}</p>
            </div>
            <div>
              <p className="text-slate-400 uppercase tracking-wide font-semibold mb-0.5">Robots.txt</p>
              <p className="font-medium">{page.robotsTxtState || "—"}</p>
            </div>
          </div>
          {page.perf && (
            <div className="grid grid-cols-4 gap-3 pt-2 border-t border-gray-50">
              <div>
                <p className="text-slate-400 uppercase tracking-wide font-semibold mb-0.5">Clicks</p>
                <p className="font-semibold text-sky-600">{page.perf.clicks.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-slate-400 uppercase tracking-wide font-semibold mb-0.5">Impressions</p>
                <p className="font-medium">{page.perf.impressions.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-slate-400 uppercase tracking-wide font-semibold mb-0.5">CTR</p>
                <p className="font-medium">{(page.perf.ctr * 100).toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-slate-400 uppercase tracking-wide font-semibold mb-0.5">Position</p>
                <p className="font-medium">{page.perf.position.toFixed(1)}</p>
              </div>
            </div>
          )}
          {hasMobileIssues && (
            <div className="pt-2 border-t border-gray-50">
              <p className="text-orange-600 font-semibold mb-1">Mobile Issues:</p>
              <ul className="list-disc list-inside space-y-0.5">
                {page.mobileIssues.map((issue, i) => <li key={i}>{issue}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SEOCrawlErrors({ data, loading, onLoad }) {
  const [filter, setFilter] = useState("all");

  const filtered = data?.pages?.filter(p => {
    if (filter === "errors") return p.verdict === "FAIL";
    if (filter === "warnings") return p.verdict === "NEUTRAL" || p.verdict === "UNKNOWN";
    if (filter === "mobile") return p.mobileIssues?.length > 0;
    if (filter === "indexed") return p.verdict === "PASS";
    return true;
  }) || [];

  const s = data?.summary;

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <XCircle className="w-5 h-5 text-red-500" />
          <div>
            <h2 className="font-bold text-[#1E2D3D]">Crawl Error Analysis — Landing Pages</h2>
            {data?.dateRange && (
              <p className="text-xs text-slate-400 mt-0.5">{data.dateRange.startDate} → {data.dateRange.endDate}</p>
            )}
          </div>
        </div>
        <button
          onClick={onLoad}
          disabled={loading}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-60 transition-colors"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          {data ? "Refresh" : "Analyze Crawl Errors"}
        </button>
      </div>

      {loading && (
        <div className="p-10 text-center text-slate-400 text-sm">
          <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-sky-400" />
          Inspecting all landing pages via Search Console…
        </div>
      )}

      {data && !loading && (
        <div className="p-5 space-y-5">
          {/* Summary stats */}
          {s && (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { label: "Total Pages", value: s.total, color: "text-slate-700" },
                { label: "Indexed", value: s.indexed, color: "text-green-600" },
                { label: "Errors", value: s.errors, color: "text-red-600" },
                { label: "Warnings", value: s.warnings, color: "text-amber-600" },
                { label: "Mobile Issues", value: s.mobileIssues, color: "text-orange-600" },
              ].map(stat => (
                <div key={stat.label} className="bg-slate-50 rounded-xl p-3 text-center">
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* AI Insights */}
          {data.aiInsights && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <p className="text-sm font-bold text-[#1E2D3D]">AI Recommendations</p>
              </div>
              {data.aiInsights.summary && (
                <p className="text-sm text-slate-600 leading-relaxed">{data.aiInsights.summary}</p>
              )}
              <div className="space-y-2">
                {(data.aiInsights.recommendations || []).map((rec, i) => {
                  const priorityColor = rec.priority === "high" ? "border-red-400 bg-red-50" : rec.priority === "medium" ? "border-amber-400 bg-amber-50" : "border-green-400 bg-green-50";
                  const iconColor = rec.priority === "high" ? "text-red-500" : rec.priority === "medium" ? "text-amber-500" : "text-green-500";
                  const badge = rec.priority === "high" ? "bg-red-100 text-red-600" : rec.priority === "medium" ? "bg-amber-100 text-amber-600" : "bg-green-100 text-green-600";
                  return (
                    <div key={i} className={`border-l-4 rounded-r-lg p-3 ${priorityColor}`}>
                      <div className="flex items-start gap-2">
                        <Info className={`w-4 h-4 mt-0.5 flex-shrink-0 ${iconColor}`} />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-[#1E2D3D]">{rec.title}</p>
                          <p className="text-xs text-slate-600 mt-0.5">{rec.detail}</p>
                          {rec.affectedPages?.length > 0 && (
                            <p className="text-xs text-slate-400 mt-1 font-mono">{rec.affectedPages.join(", ")}</p>
                          )}
                        </div>
                        <span className={`text-xs font-medium uppercase px-2 py-0.5 rounded-full flex-shrink-0 ${badge}`}>{rec.priority}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { key: "all", label: `All (${data.pages?.length || 0})` },
              { key: "errors", label: `Errors (${s?.errors || 0})` },
              { key: "warnings", label: `Warnings (${s?.warnings || 0})` },
              { key: "indexed", label: `Indexed (${s?.indexed || 0})` },
              { key: "mobile", label: `Mobile Issues (${s?.mobileIssues || 0})` },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${filter === f.key ? "bg-[#1E2D3D] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Page list */}
          <div className="space-y-2">
            {filtered.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-4">No pages match this filter.</p>
            ) : (
              filtered.map(page => <PageRow key={page.path} page={page} />)
            )}
          </div>
        </div>
      )}

      {!data && !loading && (
        <div className="p-8 text-center text-slate-400 text-sm">
          Click "Analyze Crawl Errors" to inspect all landing pages for crawl issues, indexing problems, and mobile usability errors.
        </div>
      )}
    </section>
  );
}