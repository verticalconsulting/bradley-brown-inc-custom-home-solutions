import React from "react";

const PHONE = "(844) 351-4154";

const comparisonRows = [
  { factor: "Average cost per sq ft", barndo: "$30–$55 / sq ft", traditional: "$100–$155 / sq ft in MS" },
  { factor: "Build time", barndo: "4–8 months", traditional: "9–18 months" },
  { factor: "Maintenance", barndo: "Steel frame requires less upkeep", traditional: "Wood frame susceptible to rot / termites" },
  { factor: "Customization", barndo: "Open-span design, integrated shop / garage", traditional: "Load-bearing walls limit spans" },
  { factor: "Financing", barndo: "Construction-to-perm loans available", traditional: "Standard mortgage products" },
];

export default function BarndominiumComparison() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
      <div className="text-center mb-8">
        <p className="text-sky-600 font-bold text-sm uppercase tracking-wider mb-2">Side-by-Side</p>
        <h2 className="text-2xl md:text-4xl font-bold text-[#1E2D3D]">Barndominium vs. Traditional Home: Which Is Right for You?</h2>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-white">
        <table className="w-full text-sm md:text-base">
          <thead>
            <tr className="bg-[#1E2D3D] text-white">
              <th className="text-left p-4 font-semibold">Factor</th>
              <th className="text-left p-4 font-semibold">Barndominium</th>
              <th className="text-left p-4 font-semibold">Traditional Home</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row, i) => (
              <tr key={row.factor} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                <td className="p-4 font-semibold text-[#1E2D3D]">{row.factor}</td>
                <td className="p-4 text-slate-600">{row.barndo}</td>
                <td className="p-4 text-slate-600">{row.traditional}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 space-y-4 text-slate-600 leading-relaxed max-w-3xl mx-auto">
        <p>
          For Mississippi rural landowners — especially across Rankin, Hinds, and Simpson counties — the choice increasingly comes down to dollars and flexibility. A barndominium's steel shell goes up faster and uses fewer materials than a stick-built home, cutting cost per square foot roughly in half. That same open-span frame lets you tuck a workshop, equipment bay, or extra garage under one roof without the structural gymnastics a traditional build demands.
        </p>
        <p>
          The trade-off is worth understanding before you break ground. Traditional homes offer conventional floor plans, established financing, and appraisal comps that lenders know cold — but you pay for it in both time and timber. A wood-frame build in Central Mississippi typically runs nine to eighteen months and carries ongoing maintenance: termite treatments, moisture checks, and eventual siding or roof replacement. A barndominium's steel framing sidesteps most of that, which is why acreage owners keep choosing them.
        </p>
        <p>
          Customization is where the two paths really diverge. Load-bearing walls in a traditional home cap how wide you can span a living room or shop without engineered beams — every open feel costs more. A barndominium's clear-span trusses give you wide-open interiors from day one, so the living quarters, garage, and workshop layout can shift as your needs do. Financing has caught up too: construction-to-permanent loans are now common for barndo builds across the state.
        </p>
        <p>
          Bradley Brown Inc. has completed renovations and many custom homes since 2005 — both barndominium and traditional — so we don't push one path over the other. Tell us about your land, your budget, and how you'll use the space, and we'll tell you straight which makes sense. Call {PHONE} and let's figure it out together.
        </p>
      </div>
    </section>
  );
}