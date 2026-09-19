import React from "react";
import { CheckCircle } from "lucide-react";

const tiers = [
  { label: "Essential (Budget)", accent: "border-green-200 bg-green-50/50" },
  { label: "Mid-Range", accent: "border-sky-200 bg-sky-50/50" },
  { label: "Premium", accent: "border-amber-200 bg-amber-50/50" },
];

const services = [
  {
    name: "Kitchen Remodel",
    columns: [
      {
        range: "$15,000–$30,000",
        items: ["Stock cabinets", "Laminate countertops", "Standard fixtures & appliances"],
      },
      {
        range: "$30,000–$60,000",
        items: ["Semi-custom cabinets", "Quartz countertops", "Tile backsplash & upgraded appliances"],
      },
      {
        range: "$60,000–$100,000+",
        items: ["Custom cabinetry", "Natural stone counters", "High-end appliances & full layout redesign"],
      },
    ],
  },
  {
    name: "Bathroom Remodel",
    columns: [
      {
        range: "$8,000–$15,000",
        items: ["Basic vanity & sink", "Fiberglass shower surround", "Standard fixtures"],
      },
      {
        range: "$15,000–$30,000",
        items: ["Tile shower with glass door", "Vanity with quartz top", "Upgraded fixtures & lighting"],
      },
      {
        range: "$30,000–$50,000+",
        items: ["Custom tile work & heated floors", "Freestanding tub", "Luxury fixtures & smart mirrors"],
      },
    ],
  },
  {
    name: "Room Addition",
    columns: [
      {
        range: "$80–$120 / sq ft",
        items: ["Standard finishes & trim", "Basic electrical", "No added plumbing"],
      },
      {
        range: "$120–$160 / sq ft",
        items: ["Upgraded finishes & custom trim", "Optional added bathroom", "Designer windows & doors"],
      },
      {
        range: "$160–$200+ / sq ft",
        items: ["High-end finishes & vaulted ceilings", "Custom windows & built-ins", "Integrated smart-home features"],
      },
    ],
  },
];

export default function TierPricing() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1E2D3D] mb-2">What's Included at Each Budget Level</h2>
      <p className="text-slate-500 text-sm mb-8">
        Every remodel can be tailored to your budget. Here's what you can typically expect at three price points for the most common projects in Brandon and Rankin County, MS.
      </p>

      <div className="space-y-10">
        {services.map((svc) => (
          <div key={svc.name}>
            <h3 className="text-lg font-bold text-[#1E2D3D] mb-4">{svc.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {svc.columns.map((col, i) => (
                <div key={i} className={`rounded-xl border p-5 ${tiers[i].accent}`}>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">{tiers[i].label}</p>
                  <p className="text-lg font-bold text-[#1E2D3D] mb-3">{col.range}</p>
                  <ul className="space-y-2">
                    {col.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-slate-500 mt-8 italic">
        Labor and material costs in Brandon, MS follow Central Mississippi regional rates — we provide a written line-item quote so you see exactly where every dollar goes.
      </p>
    </div>
  );
}