import React from "react";

export default function SEOQueryTable({ data }) {
  if (!data) return null;
  if (data.error) return <p className="p-5 text-red-500 text-sm">{data.error}</p>;
  if (!data.rows?.length) return <p className="p-5 text-slate-400 text-sm">No query data found.</p>;

  return (
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
          {data.rows.map((row, i) => (
            <tr key={i} className="hover:bg-sky-50/40 transition-colors">
              <td className="px-5 py-3 text-slate-400">{i + 1}</td>
              <td className="px-5 py-3 font-medium text-[#1E2D3D]">{row.keys[0]}</td>
              <td className="px-5 py-3 text-right font-semibold text-sky-600">{row.clicks}</td>
              <td className="px-5 py-3 text-right text-slate-500">{row.impressions?.toLocaleString()}</td>
              <td className="px-5 py-3 text-right text-slate-500">{(row.ctr * 100).toFixed(1)}%</td>
              <td className="px-5 py-3 text-right">
                <span className={`font-semibold ${row.position <= 3 ? "text-green-600" : row.position <= 10 ? "text-amber-500" : "text-slate-400"}`}>
                  #{row.position.toFixed(1)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}