import React from "react";
import { Link } from "react-router-dom";

const rows = [
  { category: "Paint Colors", premium: "Benjamin Moore Aura", mid: "Sherwin-Williams Emerald", budget: "Sherwin-Williams SuperPaint" },
  { category: "Cabinet Finish", premium: "Custom shaker inset, soft-close", mid: "Semi-custom shaker, soft-close", budget: "Stock shaker, standard hinges" },
  { category: "Countertop Material", premium: "Natural stone (quartzite / marble)", mid: "Quartz (name-brand slab)", budget: "Laminate, quartz-look finish" },
  { category: "Flooring", premium: "White oak hardwood, wide plank", mid: "Engineered hardwood", budget: "Luxury vinyl plank (LVP)" },
  { category: "Hardware / Fixtures", premium: "Solid brass, matte black", mid: "Brushed nickel", budget: "Chrome, builder-grade" },
  { category: "Budget Alternative", premium: "Swap natural stone for quartz slab", mid: "Swap quartz for laminate quartz-look", budget: "Swap hardwood for LVP" },
];

export default function WhatsInsidePackage() {
  return (
    <section className="mt-16 pt-12 border-t border-gray-200">
      <h2 className="text-2xl md:text-3xl font-bold text-[#1E2D3D] mb-3">What's Inside Each Finish Package</h2>
      <p className="text-slate-600 text-sm leading-relaxed mb-2 max-w-3xl">
        Each AI-generated finish package includes specific material categories so you can shop, compare, or request quotes with confidence — not just vague mood-board descriptions.
      </p>
      <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-3xl">
        Here's a representative example of what you'll find across the three budget tiers in a typical kitchen package:
      </p>

      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-[#1E2D3D] text-white">
            <tr>
              <th className="text-left p-3 font-semibold whitespace-nowrap">Material Category</th>
              <th className="text-left p-3 font-semibold">Premium Tier</th>
              <th className="text-left p-3 font-semibold">Mid-Range Tier</th>
              <th className="text-left p-3 font-semibold">Budget-Friendly Tier</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.category} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="p-3 font-medium text-slate-800 whitespace-nowrap">{row.category}</td>
                <td className="p-3 text-slate-600">{row.premium}</td>
                <td className="p-3 text-slate-600">{row.mid}</td>
                <td className="p-3 text-slate-600">{row.budget}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-400 mt-3 italic">Exact selections vary by room type and uploaded inspiration photo.</p>
      <p className="text-sm text-slate-600 mt-4">
        Want to see these material combinations in real homes?{" "}
        <Link to="/portfolio" className="text-sky-600 font-semibold hover:underline">
          Browse our portfolio
        </Link>{" "}
        for completed kitchen, bath, and addition projects across Brandon and Rankin County, MS.
      </p>
    </section>
  );
}