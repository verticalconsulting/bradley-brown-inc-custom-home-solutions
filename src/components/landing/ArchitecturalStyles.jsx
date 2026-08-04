import React from "react";

const styles = [
  {
    name: "Modern Farmhouse",
    body: "Board-and-batten siding, metal roof accents, and large covered porches define the modern farmhouse look. This style fits Brandon's rolling lots and rural-adjacent neighborhoods, where families want a home that feels grounded but still clean and current.",
  },
  {
    name: "Traditional Southern",
    body: "Full brick exteriors, symmetrical facades, and wide front porches make traditional Southern homes timeless in Rankin County. Tall ceilings and transom windows handle Mississippi's heat and humidity while delivering the curb appeal buyers expect in established Brandon subdivisions.",
  },
  {
    name: "Craftsman",
    body: "Tapered columns, exposed rafter tails, and stone skirting give craftsman homes their signature warmth. The style suits Brandon's wooded lots in neighborhoods like Crossgates and Lake Serene, where natural materials blend with mature trees and shade.",
  },
  {
    name: "Contemporary",
    body: "Flat or low-slope rooflines, large expanses of glass, and clean stucco or siding mixes define contemporary homes. This style appeals to buyers seeking a custom home in Brandon that stands apart from traditional neighborhood stock and maximizes natural light.",
  },
  {
    name: "Ranch",
    body: "Single-story layouts with attached garages and open-concept interiors make ranch homes ideal for Brandon's wider lots and retirement-friendly communities. The low profile handles Mississippi storms well and keeps maintenance simple for growing families.",
  },
];

export default function ArchitecturalStyles() {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-[#1E2D3D] mb-3">Architectural Styles We Build in Brandon</h3>
      <p className="text-slate-600 leading-relaxed text-sm mb-5">
        Beyond standard floor plans, Bradley Brown Inc. designs and builds in the architectural styles most requested by Brandon and Rankin County homebuyers:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {styles.map((s) => (
          <div key={s.name} className="bg-sky-50/50 border border-sky-100 rounded-xl p-4">
            <h4 className="text-base font-bold text-[#1E2D3D] mb-1.5">{s.name}</h4>
            <p className="text-slate-600 text-sm leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}