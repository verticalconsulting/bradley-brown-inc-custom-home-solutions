import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, FunnelChart, Funnel, LabelList,
} from "recharts";
import { TrendingDown, Users, MousePointerClick, RefreshCw, Loader2, ChevronDown, ArrowRight } from "lucide-react";

const FUNNEL_COLORS = ["#0ea5e9", "#38bdf8", "#7dd3fc", "#bae6fd", "#e0f2fe", "#f0f9ff"];
const DROP_COLOR = (pct) => pct > 60 ? "#ef4444" : pct > 30 ? "#f59e0b" : "#22c55e";

export default function FunnelAnalysis() {
  const [properties, setProperties] = useState(null);
  const [selectedProp, setSelectedProp] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingProps, setLoadingProps] = useState(false);

  const loadProperties = async () => {
    setLoadingProps(true);
    const res = await base44.functions.invoke("analyzeConsultationFunnel", { action: "listProperties" });
    setProperties(res.data?.properties || []);
    if (res.data?.properties?.length === 1) setSelectedProp(res.data.properties[0].propertyId);
    setLoadingProps(false);
  };

  const analyze = async () => {
    if (!selectedProp) return;
    setLoading(true);
    const res = await base44.functions.invoke("analyzeConsultationFunnel", {
      action: "analyzeFunnel",
      propertyId: selectedProp,
    });
    setData(res.data);
    setLoading(false);
  };

  const topSession = data?.funnel?.[0]?.sessions || 1;

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20 pb-16">
      <div className="bg-[#1E2D3D] py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Consultation Funnel Analysis</h1>
          <p className="text-slate-400 mt-1 text-sm">Google Analytics — drop-off points in your project consultation flow (last 90 days)</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Property selector */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-wrap items-center gap-4">
          {!properties ? (
            <button
              onClick={loadProperties}
              disabled={loadingProps}
              className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-60 transition-colors"
            >
              {loadingProps ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              Load GA4 Properties
            </button>
          ) : (
            <>
              <div className="flex items-center gap-3 flex-1">
                <label className="text-sm font-medium text-slate-600 whitespace-nowrap">GA4 Property:</label>
                <select
                  value={selectedProp}
                  onChange={e => setSelectedProp(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                >
                  <option value="">Select a property…</option>
                  {properties.map(p => (
                    <option key={p.propertyId} value={p.propertyId}>
                      {p.displayName} ({p.propertyId})
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={analyze}
                disabled={loading || !selectedProp}
                className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-lg text-sm font-semibold disabled:opacity-60 transition-colors"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <TrendingDown className="w-4 h-4" />}
                Analyze Funnel
              </button>
            </>
          )}
          {data?.error && <p className="text-red-500 text-sm w-full">{data.error}</p>}
        </div>

        {data && !data.error && (
          <>
            {/* Funnel Steps */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h2 className="font-bold text-[#1E2D3D] flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-sky-500" /> Consultation Funnel Drop-off
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">{data.dateRange?.startDate} → {data.dateRange?.endDate}</p>
              </div>
              <div className="p-5 space-y-3">
                {data.funnel.map((step, i) => {
                  const barWidth = topSession > 0 ? Math.round((step.sessions / topSession) * 100) : 0;
                  return (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-600 text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                          <span className="text-sm font-medium text-[#1E2D3D]">{step.label}</span>
                          <span className="text-xs text-slate-400">{step.path !== "submitted" ? step.path : ""}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs">
                          <span className="font-semibold text-[#1E2D3D]">{step.sessions.toLocaleString()} sessions</span>
                          {i > 0 && step.dropOff > 0 && (
                            <span className="font-semibold" style={{ color: DROP_COLOR(step.dropOff) }}>
                              ↓ {step.dropOff}% drop-off
                            </span>
                          )}
                          <span className="text-slate-400">{step.conversionRate}% of total</span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-700"
                          style={{
                            width: `${barWidth}%`,
                            backgroundColor: FUNNEL_COLORS[Math.min(i, FUNNEL_COLORS.length - 1)],
                          }}
                        />
                      </div>
                      {i < data.funnel.length - 1 && (
                        <div className="flex justify-center my-1">
                          <ChevronDown className="w-4 h-4 text-slate-300" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Key Events */}
            {data.events?.length > 0 && (
              <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <h2 className="font-bold text-[#1E2D3D] flex items-center gap-2">
                    <MousePointerClick className="w-5 h-5 text-sky-500" /> Key Conversion Events
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                      <tr>
                        <th className="px-5 py-3 text-left">Event</th>
                        <th className="px-5 py-3 text-right">Count</th>
                        <th className="px-5 py-3 text-right">Unique Users</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {data.events.sort((a, b) => b.count - a.count).map((ev, i) => (
                        <tr key={i} className="hover:bg-sky-50/30">
                          <td className="px-5 py-3 font-mono text-xs text-[#1E2D3D]">{ev.event}</td>
                          <td className="px-5 py-3 text-right font-semibold text-sky-600">{ev.count.toLocaleString()}</td>
                          <td className="px-5 py-3 text-right text-slate-500">{ev.users.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Quote Assistant page stats */}
            {data.quotePageStats?.length > 0 && (
              <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <h2 className="font-bold text-[#1E2D3D] flex items-center gap-2">
                    <Users className="w-5 h-5 text-sky-500" /> Quote Assistant Page Stats
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                      <tr>
                        <th className="px-5 py-3 text-left">Page</th>
                        <th className="px-5 py-3 text-right">Views</th>
                        <th className="px-5 py-3 text-right">Sessions</th>
                        <th className="px-5 py-3 text-right">Bounce Rate</th>
                        <th className="px-5 py-3 text-right">Avg Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {data.quotePageStats.map((row, i) => (
                        <tr key={i} className="hover:bg-sky-50/30">
                          <td className="px-5 py-3 font-medium text-[#1E2D3D]">{row.path}</td>
                          <td className="px-5 py-3 text-right text-slate-500">{row.views.toLocaleString()}</td>
                          <td className="px-5 py-3 text-right font-semibold text-sky-600">{row.sessions.toLocaleString()}</td>
                          <td className="px-5 py-3 text-right" style={{ color: DROP_COLOR(row.bounceRate * 100) }}>
                            {(row.bounceRate * 100).toFixed(1)}%
                          </td>
                          <td className="px-5 py-3 text-right text-slate-500">
                            {Math.round(row.avgSessionDuration)}s
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}