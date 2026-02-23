import React from "react";
import MobileSelectDrawer from "@/components/quote/MobileSelectDrawer";

const budgetOptions = [
  { value: "under_250k", label: "Under $250,000" },
  { value: "250k_500k", label: "$250,000 – $500,000" },
  { value: "500k_1m", label: "$500,000 – $1,000,000" },
  { value: "over_1m", label: "$1,000,000+" },
  { value: "unknown", label: "I'm not sure yet" },
];

const timelineOptions = [
  { value: "asap", label: "As soon as possible" },
  { value: "3_months", label: "Within 3 months" },
  { value: "6_months", label: "Within 6 months" },
  { value: "1_year", label: "Within a year" },
  { value: "exploring", label: "Just exploring options" },
];

const inputClass = "w-full border border-[#E2D9CC] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C4922A]/30 focus:border-[#C4922A] bg-white";

export default function ProjectDetailsStep({ data, onChange }) {
  const update = (field, val) => onChange({ ...data, [field]: val });

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1E2D3D] mb-1">Tell us about your project</h2>
      <p className="text-slate-500 text-sm mb-6">The more detail, the more accurate your estimate will be.</p>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1E2D3D] mb-1">City / Location *</label>
            <input type="text" placeholder="e.g. Madison, MS" value={data.location || ""} onChange={e => update("location", e.target.value)}
              className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1E2D3D] mb-1">Approx. Square Footage</label>
            <input type="number" placeholder="e.g. 2500" value={data.square_footage_estimate || ""} onChange={e => update("square_footage_estimate", Number(e.target.value))}
              className={inputClass} min={0} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1E2D3D] mb-1">Budget Range</label>
          <MobileSelectDrawer
            placeholder="Select a budget range"
            value={data.budget_range || ""}
            onChange={val => update("budget_range", val)}
            options={budgetOptions}
            label="Budget Range"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1E2D3D] mb-1">Desired Timeline</label>
          <MobileSelectDrawer
            placeholder="When do you want to start?"
            value={data.timeline || ""}
            onChange={val => update("timeline", val)}
            options={timelineOptions}
            label="Desired Timeline"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1E2D3D] mb-1">Project Description *</label>
          <textarea
            rows={4}
            placeholder="Describe your project in detail — style preferences, special features, must-haves, inspiration, etc."
            value={data.description || ""}
            onChange={e => update("description", e.target.value)}
            className={`${inputClass} resize-none`}
            required
          />
        </div>
      </div>
    </div>
  );
}