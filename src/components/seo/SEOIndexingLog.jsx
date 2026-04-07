import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { ClipboardList, RefreshCw, CheckCircle, XCircle, AlertCircle, ChevronDown, ChevronRight, Loader2 } from "lucide-react";
import { format } from "date-fns";

const verdictStyle = {
  PASS: "text-green-600 bg-green-50",
  INDEXED: "text-green-600 bg-green-50",
  SUBMITTED: "text-sky-600 bg-sky-50",
  UNKNOWN: "text-slate-500 bg-slate-50",
  FAIL: "text-red-500 bg-red-50",
};

export default function SEOIndexingLog() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  const fetchLogs = async () => {
    setLoading(true);
    const data = await base44.entities.IndexingLog.list("-created_date", 20);
    setLogs(data);
    setLoading(false);
  };

  useEffect(() => { fetchLogs(); }, []);

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-sky-500" />
          <h2 className="font-bold text-[#1E2D3D]">Indexing Activity Log</h2>
        </div>
        <button
          onClick={fetchLogs}
          disabled={loading}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 disabled:opacity-50 transition-colors"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          Refresh
        </button>
      </div>

      {loading && (
        <div className="p-8 text-center text-slate-400 text-sm">Loading logs...</div>
      )}

      {!loading && logs.length === 0 && (
        <div className="p-8 text-center text-slate-400 text-sm">
          No indexing actions logged yet. Submit the sitemap or run an index check to start logging.
        </div>
      )}

      {!loading && logs.length > 0 && (
        <div className="divide-y divide-gray-50">
          {logs.map((log) => {
            const isExpanded = expanded === log.id;
            const date = log.created_date ? format(new Date(log.created_date), "MMM d, yyyy h:mm a") : "—";
            const actionLabel = {
              submitSitemap: "Submit Sitemap",
              resubmitAllPages: "Resubmit All Pages",
              getIndexStatus: "Check Index Status",
            }[log.action] || log.action;

            return (
              <div key={log.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {log.success === false ? (
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    ) : log.success === true ? (
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <p className="font-semibold text-sm text-[#1E2D3D]">{actionLabel}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{date} · {log.triggered_by || "admin"}</p>
                      {log.error_message && (
                        <p className="text-xs text-red-500 mt-1">{log.error_message}</p>
                      )}
                      {log.total_pages > 0 && (
                        <div className="flex gap-3 mt-1.5 text-xs">
                          <span className="text-green-600 font-medium">{log.indexed_count} indexed</span>
                          <span className="text-slate-400">{log.unknown_count} unknown</span>
                          {log.error_count > 0 && <span className="text-red-500">{log.error_count} errors</span>}
                          <span className="text-slate-400">/ {log.total_pages} total</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {log.page_results?.length > 0 && (
                    <button
                      onClick={() => setExpanded(isExpanded ? null : log.id)}
                      className="flex items-center gap-1 text-xs text-sky-600 hover:text-sky-700 flex-shrink-0"
                    >
                      {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                      {isExpanded ? "Hide" : "Details"}
                    </button>
                  )}
                </div>

                {isExpanded && log.page_results?.length > 0 && (
                  <div className="mt-3 ml-7 rounded-lg border border-gray-100 overflow-hidden">
                    <table className="w-full text-xs">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left px-3 py-2 text-slate-500 font-semibold">Path</th>
                          <th className="text-left px-3 py-2 text-slate-500 font-semibold">Verdict</th>
                          <th className="text-left px-3 py-2 text-slate-500 font-semibold hidden sm:table-cell">Coverage</th>
                          <th className="text-left px-3 py-2 text-slate-500 font-semibold hidden md:table-cell">Last Crawled</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {log.page_results.map((r, i) => (
                          <tr key={i} className="hover:bg-gray-50">
                            <td className="px-3 py-1.5 font-mono text-slate-600">{r.path || r.url?.replace("https://bradleybrowninc.com", "")}</td>
                            <td className="px-3 py-1.5">
                              <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${verdictStyle[r.verdict] || verdictStyle.UNKNOWN}`}>
                                {r.verdict || "UNKNOWN"}
                              </span>
                            </td>
                            <td className="px-3 py-1.5 text-slate-500 hidden sm:table-cell">{r.coverageState || "—"}</td>
                            <td className="px-3 py-1.5 text-slate-400 hidden md:table-cell">
                              {r.lastCrawlTime ? format(new Date(r.lastCrawlTime), "MMM d, yyyy") : "Never"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}