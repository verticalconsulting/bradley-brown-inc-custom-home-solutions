import React from "react";
import { CheckCircle } from "lucide-react";

const tiers = [
  {
    service: "Kitchen Remodel",
    levels: [
      {
        label: "Essential (Budget)",
        range: "$25,000–$40,000",
        includes: ["Stock cabinetry", "Laminate countertops", "Standard fixtures & appliances"]
      },
      {
        label: "Mid-Range",
        range: "$40,000–$70,000",
        includes: ["Semi-custom cabinets", "Quartz countertops", "Tile backsplash & upgraded appliances"]
      },
      {
        label: "Premium",
        range: "$70,000–$100,000+",
        includes: ["Custom cabinetry", "Natural stone counters", "High-end appliances & full layout redesign"]
      }
    ]
  },
  {
    service: "Bathroom Remodel",
    levels: [
      {
        label: "Essential (Budget)",
        range: "$10,000–$18,000",
        includes: ["Fiberglass shower/tub unit", "Stock vanity & basic mirror", "Standard tile & fixtures"]
      },
      {
        label: "Mid-Range",
        range: "$18,000–$35,000",
        includes: ["Walk-in tile shower", "Semi-custom vanity", "Upgraded fixtures & finishes"]
      },
      {
        label: "Premium",
        range: "$35,000–$50,000+",
        includes: ["Custom tile work & freestanding tub", "Dual vanities", "Luxury fixtures & custom cabinetry"]
      }
    ]
  },
  {
    service: "Room Addition",
    levels: [
      {
        label: "Essential (Budget)",
        range: "$100–$130 / sq ft",
        includes: ["Standard drywall & trim", "Basic electrical", "No added plumbing"]
      },
      {
        label: "Mid-Range",
        range: "$130–$170 / sq ft",
        includes: ["Upgraded finishes & custom trim", "Added plumbing or electrical", "Matching exterior materials"]
      },
      {
        label: "Premium",
        range: "$170–$200+ / sq ft",
        includes: ["Premium materials & vaulted ceilings", "Custom windows & doors", "Full custom design & layout"]
      }
    ]
  }
];

export default function BudgetTierBreakdown() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1E2D3D] mb-2">What's Included at Each Budget Level</h2>
      <p className="text-slate-500 text-sm mb-8">See exactly what your budget gets you for the three most common remodeling projects in Brandon and Rankin County, MS.</p>

      <div className="space-y-10">
        {tiers.map((tier) => (
          <div key={tier.service}>
            <h3 className="text-lg font-bold text-[#1E2D3D] mb-4">{tier.service}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tier.levels.map((level, i) => (
                <div
                  key={level.label}
                  className={`bg-white rounded-xl border p-5 shadow-sm ${i === 1 ? "border-sky-300 ring-1 ring-sky-200" : "border-gray-200"}`}
                >
                  <div className="mb-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">{level.label}</p>
                    <p className="text-lg font-bold text-sky-700">{level.range}</p>
                  </div>
                  <ul className="space-y-2">
                    {level.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-400 mt-6 italic">
        Labor and material costs in Brandon, MS follow Central Mississippi regional rates — we provide a written line-item quote so you see exactly where every dollar goes.
      </p>
    </div>
  );
}