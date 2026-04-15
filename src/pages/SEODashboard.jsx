import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { ShieldCheck } from "lucide-react";
import SEOQueryTable from "@/components/seo/SEOQueryTable";
import SEOIndexStatus from "@/components/seo/SEOIndexStatus";
import SEOPageKeywords from "@/components/seo/SEOPageKeywords";
import SEOCustomHomeAnalysis from "@/components/seo/SEOCustomHomeAnalysis";
import SEOIndexingLog from "@/components/seo/SEOIndexingLog";
import SEOCrawlErrors from "@/components/seo/SEOCrawlErrors";
import { Search, Globe, Map, RefreshCw, Loader2, Home, Send, Zap } from "lucide-react";

export default function SEODashboard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState({});
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    base44.auth.me().then(u => { setUser(u); setAuthChecked(true); }).catch(() => setAuthChecked(true));
  }, []);

  if (!authChecked) return null;
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#FAFAF8] pt-20 flex items-center justify-center">
        <div className="text-center">
          <ShieldCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-[#1E2D3D]">Admin Access Required</h2>
          <p className="text-slate-500 text-sm mt-1">This page is restricted to administrators.</p>
        </div>
      </div>
    );
  }

  const call = async (action, extraBody = {}) => {
    setLoading(l => ({ ...l, [action]: true }));
    try {
      const res = await base44.functions.invoke("searchConsoleDashboard", { action, ...extraBody });
      setData(d => ({ ...d, [action]: res.data }));
    } catch (e) {
      setData(d => ({ ...d, [action]: { error: e.message } }));
    }
    setLoading(l => ({ ...l, [action]: false }));
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20 pb-16">
      <div className="bg-[#1E2D3D] py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">SEO Dashboard</h1>
          <p className="text-slate-400 mt-1 text-sm">Google Search Console — queries, custom home traffic, page-level keywords & indexing</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* ── Crawl Error Analysis ── */}
        <SEOCrawlErrors
          data={data.getCrawlErrors}
          loading={loading.getCrawlErrors}
          onLoad={() => call("getCrawlErrors")}
        />

        {/* ── Custom Home Traffic Analysis ── */}
        <SEOCustomHomeAnalysis
          data={data.getCustomHomeQueries}
          loading={loading.getCustomHomeQueries}
          onLoad={() => call("getCustomHomeQueries")}
        />

        {/* ── Page-Level Keyword Monitor ── */}
        <SEOPageKeywords
          data={data.getPageKeywords}
          loading={loading.getPageKeywords}
          onLoad={() => call("getPageKeywords")}
          onFilterPage={(page) => call("getPageKeywords", { page })}
        />

        {/* ── All Queries ── */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-sky-500" />
              <h2 className="font-bold text-[#1E2D3D]">Top Search Queries (last 90 days)</h2>
            </div>
            <button
              onClick={() => call("getQueries")}
              disabled={loading.getQueries}
              className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-60 transition-colors"
            >
              {loading.getQueries ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              {data.getQueries ? "Refresh" : "Load"}
            </button>
          </div>
          <SEOQueryTable data={data.getQueries} />
        </section>

        {/* ── Resubmit All Pages ── */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-sky-500" />
              <div>
                <h2 className="font-bold text-[#1E2D3D]">Resubmit Indexing — All Pages</h2>
                <p className="text-xs text-slate-400 mt-0.5">Resubmits sitemap + inspects index status for every page on the site</p>
              </div>
            </div>
            <button
              onClick={() => call("resubmitAllPages")}
              disabled={loading.resubmitAllPages}
              className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-60 transition-colors"
            >
              {loading.resubmitAllPages ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
              {loading.resubmitAllPages ? "Submitting..." : "Resubmit All"}
            </button>
          </div>
          <SEOIndexStatus data={data.resubmitAllPages} mode="resubmit" />
        </section>

        {/* ── Index Status Check ── */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-sky-500" />
              <h2 className="font-bold text-[#1E2D3D]">Index Status — All Pages</h2>
            </div>
            <button
              onClick={() => call("getIndexStatus")}
              disabled={loading.getIndexStatus}
              className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-60 transition-colors"
            >
              {loading.getIndexStatus ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              {data.getIndexStatus ? "Refresh" : "Check Status"}
            </button>
          </div>
          <SEOIndexStatus data={data.getIndexStatus} mode="check" />
        </section>

        {/* ── Submit Sitemap ── */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Map className="w-5 h-5 text-sky-500" />
              <div>
                <h2 className="font-bold text-[#1E2D3D]">Submit Sitemap</h2>
                <p className="text-xs text-slate-400 mt-0.5">Submits your sitemap to Google Search Console</p>
              </div>
            </div>
            <button
              onClick={() => call("submitSitemap")}
              disabled={loading.submitSitemap}
              className="flex items-center gap-2 bg-[#C4922A] hover:bg-[#A37820] text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-60 transition-colors"
            >
              {loading.submitSitemap ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Submit Sitemap
            </button>
          </div>
          <div className="p-5 text-sm">
            {!data.submitSitemap && <p className="text-slate-400">Click to notify Google of your latest pages.</p>}
            {data.submitSitemap?.success && (
              <p className="text-green-600 font-semibold">✓ Sitemap submitted: {data.submitSitemap.sitemapUrl}</p>
            )}
            {data.submitSitemap?.success === false && (
              <p className="text-red-500">{JSON.stringify(data.submitSitemap.error?.error?.message || data.submitSitemap.error)}</p>
            )}
            {data.submitSitemap?.error && !data.submitSitemap?.success === undefined && (
              <p className="text-red-500">{data.submitSitemap.error}</p>
            )}
          </div>
        </section>

        {/* ── Indexing Activity Log ── */}
        <SEOIndexingLog />

      </div>
    </div>
  );
}