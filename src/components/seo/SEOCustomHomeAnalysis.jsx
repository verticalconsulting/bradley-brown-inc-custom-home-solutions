import React from "react";
import { Home, Loader2, RefreshCw, TrendingUp, MousePointer, Eye } from "lucide-react";

export default function SEOCustomHomeAnalysis({ data, loading, onLoad }) {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Home className="w-5 h-5 text-sky-500" />
          <div>
            <h2 className="font-bold text-[#1E2D3D]">Custom Home Construction Traffic</h2>
            <p className="text-xs text-slate-400 mt-0.5">Queries driving custom home / builder searches (last 90 days)</p>
          </div>
        </div>
        <button
          onClick={onLoad}
          disabled={loading}
          className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-60 transition-colors"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          {data ? "Refresh" : "Analyze"}
        </button>
      </div>

      {!data && !loading && (
        <p className="p-5 text-sm text-slate-400">Click "Analyze" to see which queries are driving custom home construction traffic.</p>
      )}

      {data?.error && <p className="p-5 text-red-500 text-sm">{data.error}</p>}

      {data?.rows && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 border-b border-gray-100">
            <StatCard icon={<MousePointer className="w-4 h-4 text-sky-500" />} label="Total Clicks" value={data.totalClicks?.toLocaleString() || "0"} />
            <StatCard icon={<Eye className="w-4 h-4 text-indigo-500" />} label="Impressions" value={data.totalImpressions?.toLocaleString() || "0"} />
            <StatCard icon={<TrendingUp className="w-4 h-4 text-green-500" />} label="Avg Position" value={`#${data.avgPosition?.toFixed(1) || "–"}`} />
            <StatCard icon={<Home className="w-4 h-4 text-amber-500" />} label="Matching Queries" value={data.rows?.length?.toString() || "0"} />
          </div>

          {data.rows.length === 0 ? (
            <p className="p-5 text-slate-400 text-sm">No custom home–related queries found in the last 90 days. This may indicate a content gap or that the site is new to ranking for these terms.</p>
          ) : (
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
                    <th className="px-5 py-3 text-left">Opportunity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {data.rows.map((row, i) => {
                    const pos = row.position;
                    const opportunity = pos > 10 ? "🔴 Low visibility" : pos > 4 ? "🟡 Page 1 potential" : "🟢 Strong";
                    return (
                      <tr key={i} className="hover:bg-sky-50/40 transition-colors">
                        <td className="px-5 py-3 text-slate-400">{i + 1}</td>
                        <td className="px-5 py-3 font-medium text-[#1E2D3D]">{row.keys[0]}</td>
                        <td className="px-5 py-3 text-right font-semibold text-sky-600">{row.clicks}</td>
                        <td className="px-5 py-3 text-right text-slate-500">{row.impressions?.toLocaleString()}</td>
                        <td className="px-5 py-3 text-right text-slate-500">{(row.ctr * 100).toFixed(1)}%</td>
                        <td className="px-5 py-3 text-right">
                          <span className={`font-semibold ${pos <= 3 ? "text-green-600" : pos <= 10 ? "text-amber-500" : "text-red-400"}`}>
                            #{pos.toFixed(1)}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-xs text-slate-600">{opportunity}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <div className="px-5 py-3 bg-slate-50 text-xs text-slate-400 border-t border-gray-100">
            Analyzed {data.allQueriesCount} total queries · {data.startDate} → {data.endDate}
          </div>
        </>
      )}
    </section>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-slate-50 rounded-xl p-4 flex flex-col gap-1">
      <div className="flex items-center gap-1.5 text-xs text-slate-500">{icon} {label}</div>
      <div className="text-xl font-bold text-[#1E2D3D]">{value}</div>
    </div>
  );
}