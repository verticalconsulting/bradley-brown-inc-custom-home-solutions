import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Search, Globe, Map, RefreshCw, CheckCircle, XCircle, AlertCircle, Loader2, Send } from "lucide-react";

const VERDICT_CONFIG = {
  PASS: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50", label: "Indexed" },
  FAIL: { icon: XCircle, color: "text-red-500", bg: "bg-red-50", label: "Not Indexed" },
  NEUTRAL: { icon: AlertCircle, color: "text-yellow-500", bg: "bg-yellow-50", label: "Neutral" },
  UNKNOWN: { icon: AlertCircle, color: "text-slate-400", bg: "bg-slate-50", label: "Unknown" },
};

export default function SEODashboard() {
  const [queries, setQueries] = useState(null);
  const [indexStatus, setIndexStatus] = useState(null);
  const [sitemapResult, setSitemapResult] = useState(null);
  const [loading, setLoading] = useState({});

  const call = async (action, setter) => {
    setLoading(l => ({ ...l, [action]: true }));
    try {
      const res = await base44.functions.invoke("searchConsoleDashboard", { action });
      setter(res.data);
    } catch (e) {
      setter({ error: e.message });
    }
    setLoading(l => ({ ...l, [action]: false }));
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20 pb-16">
      <div className="bg-[#1E2D3D] py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">SEO Dashboard</h1>
          <p className="text-slate-400 mt-1 text-sm">Google Search Console — queries, index status & sitemap</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* ── Top Queries ── */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-sky-500" />
              <h2 className="font-bold text-[#1E2D3D]">Top Search Queries (last 90 days)</h2>
            </div>
            <button
              onClick={() => call("getQueries", setQueries)}
              disabled={loading.getQueries}
              className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-60 transition-colors"
            >
              {loading.getQueries ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              {queries ? "Refresh" : "Load"}
            </button>
          </div>

          {queries?.error && (
            <p className="p-5 text-red-500 text-sm">{queries.error}</p>
          )}

          {queries?.rows?.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3 text-left">#</th>
                    <th className="px-5 py-3 text-left">Query</th>
                    <th className="px-5 py-3 text-right">Clicks</th>
                    <th className="px-5 py-3 text-right">Impressions</th>
                    <th className="px-5 py-3 text-right">CTR</th>
                    <th className="px-5 py-3 text-right">Avg Position</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {queries.rows.map((row, i) => (
                    <tr key={i} className="hover:bg-sky-50/40 transition-colors">
                      <td className="px-5 py-3 text-slate-400">{i + 1}</td>
                      <td className="px-5 py-3 font-medium text-[#1E2D3D]">{row.keys[0]}</td>
                      <td className="px-5 py-3 text-right font-semibold text-sky-600">{row.clicks}</td>
                      <td className="px-5 py-3 text-right text-slate-500">{row.impressions}</td>
                      <td className="px-5 py-3 text-right text-slate-500">{(row.ctr * 100).toFixed(1)}%</td>
                      <td className="px-5 py-3 text-right text-slate-500">{row.position.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {queries?.rows?.length === 0 && (
            <p className="p-5 text-slate-400 text-sm">No query data found for this property.</p>
          )}
        </section>

        {/* ── Index Status ── */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-sky-500" />
              <h2 className="font-bold text-[#1E2D3D]">Index Status — Key Pages</h2>
            </div>
            <button
              onClick={() => call("getIndexStatus", setIndexStatus)}
              disabled={loading.getIndexStatus}
              className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-60 transition-colors"
            >
              {loading.getIndexStatus ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              {indexStatus ? "Refresh" : "Check"}
            </button>
          </div>

          {indexStatus?.error && (
            <p className="p-5 text-red-500 text-sm">{indexStatus.error}</p>
          )}

          {indexStatus?.results && (
            <div className="divide-y divide-gray-50">
              {indexStatus.results.map((item, i) => {
                const cfg = VERDICT_CONFIG[item.verdict] || VERDICT_CONFIG.UNKNOWN;
                const Icon = cfg.icon;
                return (
                  <div key={i} className={`flex items-center justify-between px-5 py-3.5 ${cfg.bg}`}>
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 flex-shrink-0 ${cfg.color}`} />
                      <span className="text-sm font-medium text-[#1E2D3D]">{item.path}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      {item.lastCrawlTime && (
                        <span>Last crawled: {new Date(item.lastCrawlTime).toLocaleDateString()}</span>
                      )}
                      <span className={`font-semibold ${cfg.color}`}>{cfg.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ── Submit Sitemap ── */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Map className="w-5 h-5 text-sky-500" />
              <div>
                <h2 className="font-bold text-[#1E2D3D]">Submit Sitemap</h2>
                <p className="text-xs text-slate-400 mt-0.5">Submits your sitemap function URL to Google Search Console</p>
              </div>
            </div>
            <button
              onClick={() => call("submitSitemap", setSitemapResult)}
              disabled={loading.submitSitemap}
              className="flex items-center gap-2 bg-[#C4922A] hover:bg-[#A37820] text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-60 transition-colors"
            >
              {loading.submitSitemap ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Submit Sitemap
            </button>
          </div>

          <div className="p-5">
            {!sitemapResult && (
              <p className="text-sm text-slate-400">Click "Submit Sitemap" to notify Google of your latest pages.</p>
            )}
            {sitemapResult?.success && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold text-sm">Sitemap submitted successfully!</span>
                <span className="text-xs text-slate-400 ml-1">{sitemapResult.sitemapUrl}</span>
              </div>
            )}
            {sitemapResult?.success === false && (
              <div className="flex items-center gap-2 text-red-500">
                <XCircle className="w-5 h-5" />
                <span className="text-sm">{JSON.stringify(sitemapResult.error)}</span>
              </div>
            )}
            {sitemapResult?.error && (
              <p className="text-red-500 text-sm">{sitemapResult.error}</p>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}