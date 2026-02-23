import React from "react";
import { Home, Wrench, Plus, Leaf, HelpCircle } from "lucide-react";

const types = [
  { value: "custom_home", label: "Custom Home", description: "Build new from the ground up", icon: Home },
  { value: "renovation", label: "Renovation", description: "Remodel existing spaces", icon: Wrench },
  { value: "addition", label: "Room Addition", description: "Add square footage", icon: Plus },
  { value: "outdoor", label: "Outdoor Living", description: "Patio, deck, or outdoor kitchen", icon: Leaf },
  { value: "other", label: "Other / Unsure", description: "Tell us more & we'll advise", icon: HelpCircle },
];

export default function ProjectTypeStep({ value, onChange }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-[#1E2D3D] mb-1">What type of project are you planning?</h2>
      <p className="text-slate-500 text-sm mb-6">Select the option that best describes your project.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {types.map(({ value: v, label, description, icon: Icon }) => (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
              value === v ? "border-[#C4922A] bg-amber-50" : "border-[#E2D9CC] hover:border-[#C4922A]/50 bg-white"
            }`}
          >
            <div className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${value === v ? "bg-[#C4922A]" : "bg-gray-100"}`}>
              <Icon className={`w-5 h-5 ${value === v ? "text-white" : "text-gray-500"}`} />
            </div>
            <div>
              <p className="font-semibold text-[#1E2D3D]">{label}</p>
              <p className="text-slate-500 text-xs">{description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}