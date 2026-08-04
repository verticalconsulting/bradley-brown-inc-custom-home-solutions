import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { ShieldCheck } from "lucide-react";
import SEOQueryTable from "@/components/seo/SEOQueryTable";
import SEOIndexStatus from "@/components/seo/SEOIndexStatus";
import SEOPageKeywords from "@/components/seo/SEOPageKeywords";
import SEOCustomHomeAnalysis from "@/components/seo/SEOCustomHomeAnalysis";
import SEOIndexingLog from "@/components/seo/SEOIndexingLog";
import SEOCrawlErrors from "@/components/seo/SEOCrawlErrors";
import { Search, Globe, Map, RefreshCw, Loader2, Home, Send, Zap, AlertTriangle, ExternalLink, CheckCircle, XCircle } from "lucide-react";

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

  // Hado cache refresh confirmation before resubmitting
  const handleResubmit = () => {
    const confirmed = window.confirm(
      "⚠️ Before requesting indexing:\n\nRefresh the Hado cache in the dashboard first — Google will index the cached prerender. " +
      "Hado's cache refreshes on a 6-hour cycle; a manual refresh ensures Google fetches fresh HTML.\n\n" +
      "After refreshing, click OK to submit the sitemap and inspect all pages."
    );
    if (confirmed) call("resubmitAllPages");
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20 pb-16">
      <div className="bg-[#1E2D3D] py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">SEO Dashboard</h1>
          <p className="text-slate-400 mt-1 text-sm">Google Search Console — queries, custom home traffic, page-level keywords & indexing</p>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
            <span className="bg-slate-700/50 px-2 py-1 rounded">Property: https://bradleybrowninc.com/</span>
            <span className="bg-slate-700/50 px-2 py-1 rounded flex items-center gap-1">
              <ExternalLink className="w-3 h-3" /> Hado SEO proxy
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* ── Hado Notice ── */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-semibold mb-1">Hado SEO Prerender Active</p>
            <p className="text-amber-700">
              Bots receive Hado's cached prerendered HTML, not the live SPA. Fresh content is only visible to Google after Hado's cache refreshes (6-hour cycle or manual).
              Robots.txt and sitemap.xml are served from the Hado dashboard, not the Base44 functions. Client-side 404 logging (NotFoundLog) only captures human visitors, not bots.
            </p>
          </div>
        </div>

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
          {data.getQueries?.property && (
            <div className="px-5 py-2 bg-slate-50 text-xs text-slate-400 border-t border-gray-100">
              Property: {data.getQueries.property}
            </div>
          )}
        </section>

        {/* ── Resubmit All Pages ── */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-sky-500" />
              <div>
                <h2 className="font-bold text-[#1E2D3D]">Resubmit Indexing — All Pages</h2>
                <p className="text-xs text-slate-400 mt-0.5">Submits sitemap + inspects index status for every canonical page (sourced live from /functions/sitemap)</p>
              </div>
            </div>
            <button
              onClick={handleResubmit}
              disabled={loading.resubmitAllPages}
              className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-60 transition-colors"
            >
              {loading.resubmitAllPages ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
              {loading.resubmitAllPages ? "Submitting..." : "Resubmit All"}
            </button>
          </div>
          {data.resubmitAllPages?.note && (
            <div className="px-5 py-3 bg-amber-50 border-b border-amber-100 text-xs text-amber-700">
              ⚠️ {data.resubmitAllPages.note}
            </div>
          )}
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
                <p className="text-xs text-slate-400 mt-0.5">Submits the Hado-served sitemap index to Google Search Console</p>
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
            {!data.submitSitemap && <p className="text-slate-400">Click to submit <code className="text-slate-600">https://bradleybrowninc.com/sitemap.xml</code> (the Hado-served index) to Google.</p>}
            {data.submitSitemap?.success && (
              <div className="space-y-4">
                <p className="text-green-600 font-semibold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Sitemap submitted: {data.submitSitemap.sitemapUrl}
                </p>
                {data.submitSitemap.indexDetails && (
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                    <p className="font-semibold text-[#1E2D3D] mb-2 text-xs uppercase tracking-wide text-slate-500">Sitemap Index</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                      <div><span className="text-slate-400">Path:</span> <span className="font-mono">{data.submitSitemap.indexDetails.path || "—"}</span></div>
                      <div><span className="text-slate-400">Last Downloaded:</span> <span className="font-medium">{data.submitSitemap.indexDetails.lastDownloaded ? new Date(data.submitSitemap.indexDetails.lastDownloaded).toLocaleString() : "Never"}</span></div>
                      <div><span className="text-slate-400">Is Index:</span> <span className="font-medium">{data.submitSitemap.indexDetails.isSitemapsIndex ? "Yes" : "No"}</span></div>
                      <div><span className="text-slate-400">Pending:</span> <span className="font-medium">{data.submitSitemap.indexDetails.isPending ? "Yes" : "No"}</span></div>
                      <div><span className="text-slate-400">Errors:</span> <span className={`font-medium ${data.submitSitemap.indexDetails.errors ? "text-red-500" : "text-green-600"}`}>{data.submitSitemap.indexDetails.errors || 0}</span></div>
                      <div><span className="text-slate-400">Warnings:</span> <span className={`font-medium ${data.submitSitemap.indexDetails.warnings ? "text-amber-500" : "text-green-600"}`}>{data.submitSitemap.indexDetails.warnings || 0}</span></div>
                    </div>
                    {data.submitSitemap.indexDetails.contents?.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-200">
                        <p className="text-xs text-slate-400 mb-1">Discovered child sitemaps: {data.submitSitemap.indexDetails.contents.length}</p>
                        {data.submitSitemap.indexDetails.contents.map((c, i) => (
                          <div key={i} className="text-xs font-mono text-slate-600">{c.path || c.loc || JSON.stringify(c)}</div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {data.submitSitemap.childDetails && (
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                    <p className="font-semibold text-[#1E2D3D] mb-2 text-xs uppercase tracking-wide text-slate-500">Child Sitemap (/functions/sitemap)</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                      <div><span className="text-slate-400">Path:</span> <span className="font-mono">{data.submitSitemap.childDetails.path || "—"}</span></div>
                      <div><span className="text-slate-400">Last Downloaded:</span> <span className="font-medium">{data.submitSitemap.childDetails.lastDownloaded ? new Date(data.submitSitemap.childDetails.lastDownloaded).toLocaleString() : "Never"}</span></div>
                      <div><span className="text-slate-400">Pending:</span> <span className="font-medium">{data.submitSitemap.childDetails.isPending ? "Yes" : "No"}</span></div>
                      <div><span className="text-slate-400">Errors:</span> <span className={`font-medium ${data.submitSitemap.childDetails.errors ? "text-red-500" : "text-green-600"}`}>{data.submitSitemap.childDetails.errors || 0}</span></div>
                      <div><span className="text-slate-400">Warnings:</span> <span className={`font-medium ${data.submitSitemap.childDetails.warnings ? "text-amber-500" : "text-green-600"}`}>{data.submitSitemap.childDetails.warnings || 0}</span></div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {data.submitSitemap?.success === false && (
              <div className="space-y-2">
                <p className="text-red-500 font-semibold flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> Submission failed (HTTP {data.submitSitemap.httpStatus})
                </p>
                <pre className="text-xs text-red-500 bg-red-50 p-3 rounded-lg overflow-x-auto">{JSON.stringify(data.submitSitemap.error?.error?.message || data.submitSitemap.error, null, 2)}</pre>
              </div>
            )}
            {data.submitSitemap?.error && data.submitSitemap?.success === undefined && (
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