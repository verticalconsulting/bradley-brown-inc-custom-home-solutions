import React from "react";
import { Award, MapPin, Star } from "lucide-react";

const defaultProof = [
  { icon: Award, text: "Licensed MS General Contractor since 1995 — 30+ years serving Brandon and the Rankin County area" },
  { icon: MapPin, text: "Locally owned & operated in Brandon, MS — serving a 50-mile radius including Jackson, Madison & Rankin County" },
  { icon: Star, text: "4.9★ rating across 87+ verified reviews — trusted by 500+ Mississippi families" },
];

export default function LocalProofPoints({ points = defaultProof }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {points.map(({ icon: Icon, text }, i) => (
        <div key={i} className="flex items-start gap-3 bg-sky-50 rounded-xl p-4 border border-sky-100">
          <Icon className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-slate-700 leading-snug">{text}</p>
        </div>
      ))}
    </div>
  );
}