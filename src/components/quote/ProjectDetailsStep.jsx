import React from "react";

const budgetOptions = [
  { value: "under_250k", label: "Under $250K" },
  { value: "250k_500k", label: "$250K–$500K" },
  { value: "500k_1m", label: "$500K–$1M" },
  { value: "over_1m", label: "$1M+" },
  { value: "unknown", label: "Not sure yet" },
];

const timelineOptions = [
  { value: "asap", label: "ASAP" },
  { value: "3_months", label: "3 months" },
  { value: "6_months", label: "6 months" },
  { value: "1_year", label: "~1 year" },
  { value: "exploring", label: "Just exploring" },
];

const inputClass = "w-full border border-[#E2D9CC] rounded-lg px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-[#C4922A]/30 focus:border-[#C4922A] bg-white";

export default function ProjectDetailsStep({ data, onChange }) {
  const update = (field, val) => onChange({ ...data, [field]: val });

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1E2D3D] mb-1">Tell us about your project</h2>
      <p className="text-slate-500 text-sm mb-6">Just a few details — we'll fill in the rest with our AI.</p>
      <div className="space-y-5">

        <div>
          <label className="block text-sm font-semibold text-[#1E2D3D] mb-1">
            City / Location <span className="text-[#C4922A]">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Brandon, MS"
            value={data.location || ""}
            onChange={e => update("location", e.target.value)}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1E2D3D] mb-1">
            Describe your project <span className="text-[#C4922A]">*</span>
          </label>
          <textarea
            rows={3}
            placeholder="e.g. Kitchen remodel with new cabinets, island, and quartz countertops — about 300 sq ft."
            value={data.description || ""}
            onChange={e => update("description", e.target.value)}
            className={`${inputClass} resize-none`}
            required
          />
          <p className="text-xs text-slate-400 mt-1">The more you share, the more accurate your estimate will be.</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1E2D3D] mb-2">Budget range <span className="text-slate-400 font-normal">(optional)</span></label>
          <div className="flex flex-wrap gap-2">
            {budgetOptions.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => update("budget_range", data.budget_range === opt.value ? "" : opt.value)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  data.budget_range === opt.value
                    ? "bg-[#C4922A] text-white border-[#C4922A]"
                    : "bg-white text-slate-600 border-[#E2D9CC] hover:border-[#C4922A]/50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1E2D3D] mb-2">Timeline <span className="text-slate-400 font-normal">(optional)</span></label>
          <div className="flex flex-wrap gap-2">
            {timelineOptions.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => update("timeline", data.timeline === opt.value ? "" : opt.value)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  data.timeline === opt.value
                    ? "bg-[#C4922A] text-white border-[#C4922A]"
                    : "bg-white text-slate-600 border-[#E2D9CC] hover:border-[#C4922A]/50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}