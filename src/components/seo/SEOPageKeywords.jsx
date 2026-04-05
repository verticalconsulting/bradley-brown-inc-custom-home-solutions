import React, { useState } from "react";
import { BarChart2, Loader2, RefreshCw, ChevronDown, ChevronRight } from "lucide-react";

const ALL_PAGES = [
  "/", "/Services", "/Portfolio", "/Contact", "/QuoteAssistant",
  "/LandingCoreServices", "/LandingEmergencyRepair", "/LandingBrandonRemodelers",
  "/SmallBathroomIdeas", "/LuxuryHomeRenovations", "/LandingPricing",
  "/LandingTrust", "/RenovationLoans", "/HomeAdditionIdeas", "/EnergyEfficientUpgrades",
];

export default function SEOPageKeywords({ data, loading, onLoad, onFilterPage }) {
  const [expanded, setExpanded] = useState(null);
  const [selectedPage, setSelectedPage] = useState("");

  const handleLoad = () => {
    if (selectedPage) onFilterPage(selectedPage);
    else onLoad();
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-sky-500" />
          <div>
            <h2 className="font-bold text-[#1E2D3D]">Keywords Driving Each Page</h2>
            <p className="text-xs text-slate-400 mt-0.5">Monitor which queries are sending traffic to specific pages</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedPage}
            onChange={e => setSelectedPage(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-sky-300"
          >
            <option value="">All Pages</option>
            {ALL_PAGES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <button
            onClick={handleLoad}
            disabled={loading}
            className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-60 transition-colors"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            {data ? "Refresh" : "Load"}
          </button>
        </div>
      </div>

      {!data && !loading && (
        <p className="p-5 text-sm text-slate-400">Click "Load" to see which keywords are driving traffic to each page.</p>
      )}

      {data?.error && <p className="p-5 text-red-500 text-sm">{data.error}</p>}

      {data?.pages && (
        <div>
          {data.pages.length === 0 ? (
            <p className="p-5 text-slate-400 text-sm">No page-level keyword data found for this period.</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {data.pages.map((page, i) => (
                <div key={i}>
                  <button
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      {expanded === i
                        ? <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        : <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                      <span className="font-semibold text-sm text-[#1E2D3D]">{page.path}</span>
                      <span className="text-xs text-slate-400">{page.queries.length} keywords</span>
                    </div>
                    <div className="flex items-center gap-5 text-xs">
                      <span className="text-sky-600 font-semibold">{page.clicks} clicks</span>
                      <span className="text-slate-400">{page.impressions?.toLocaleString()} impr.</span>
                    </div>
                  </button>

                  {expanded === i && (
                    <div className="bg-slate-50 border-t border-gray-100 overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead className="text-slate-400 uppercase tracking-wider">
                          <tr>
                            <th className="px-5 py-2 text-left">Keyword</th>
                            <th className="px-5 py-2 text-right">Clicks</th>
                            <th className="px-5 py-2 text-right">Impressions</th>
                            <th className="px-5 py-2 text-right">CTR</th>
                            <th className="px-5 py-2 text-right">Position</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {page.queries.map((q, j) => (
                            <tr key={j} className="hover:bg-white transition-colors">
                              <td className="px-5 py-2 font-medium text-[#1E2D3D]">{q.query}</td>
                              <td className="px-5 py-2 text-right text-sky-600 font-semibold">{q.clicks}</td>
                              <td className="px-5 py-2 text-right text-slate-500">{q.impressions?.toLocaleString()}</td>
                              <td className="px-5 py-2 text-right text-slate-500">{(q.ctr * 100).toFixed(1)}%</td>
                              <td className="px-5 py-2 text-right">
                                <span className={`font-semibold ${q.position <= 3 ? "text-green-600" : q.position <= 10 ? "text-amber-500" : "text-red-400"}`}>
                                  #{q.position.toFixed(1)}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          <div className="px-5 py-3 bg-slate-50 text-xs text-slate-400 border-t border-gray-100">
            {data.startDate} → {data.endDate} · {data.pages.length} pages with traffic
          </div>
        </div>
      )}
    </section>
  );
}