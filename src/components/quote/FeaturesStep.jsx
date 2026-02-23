import React from "react";
import { Check } from "lucide-react";

const featureGroups = {
  custom_home: [
    { label: "Open floor plan", value: "open_floor_plan" },
    { label: "Gourmet kitchen", value: "gourmet_kitchen" },
    { label: "Master suite w/ spa bath", value: "master_spa_bath" },
    { label: "Home office / study", value: "home_office" },
    { label: "Bonus / media room", value: "bonus_room" },
    { label: "3-car garage", value: "three_car_garage" },
    { label: "Covered porch / patio", value: "covered_porch" },
    { label: "Smart home wiring", value: "smart_home" },
    { label: "High-end finishes", value: "premium_finishes" },
    { label: "Energy Star certified", value: "energy_star" },
    { label: "In-ground pool", value: "pool" },
    { label: "Outdoor kitchen", value: "outdoor_kitchen" },
  ],
  renovation: [
    { label: "Kitchen remodel", value: "kitchen" },
    { label: "Master bath remodel", value: "master_bath" },
    { label: "Guest bath remodel", value: "guest_bath" },
    { label: "Basement finishing", value: "basement" },
    { label: "New flooring throughout", value: "flooring" },
    { label: "Custom cabinetry", value: "custom_cabinets" },
    { label: "Countertop replacement", value: "countertops" },
    { label: "Painting & trim", value: "painting" },
    { label: "Window replacement", value: "windows" },
    { label: "HVAC upgrade", value: "hvac" },
  ],
  addition: [
    { label: "Master suite addition", value: "master_suite" },
    { label: "Family room extension", value: "family_room" },
    { label: "Sunroom / 3-season room", value: "sunroom" },
    { label: "Garage addition", value: "garage" },
    { label: "In-law suite", value: "in_law_suite" },
    { label: "Second story addition", value: "second_story" },
    { label: "Mudroom / laundry room", value: "mudroom" },
  ],
  outdoor: [
    { label: "Covered patio / pergola", value: "covered_patio" },
    { label: "Outdoor kitchen", value: "outdoor_kitchen" },
    { label: "Pool deck / surround", value: "pool_deck" },
    { label: "Fire pit", value: "fire_pit" },
    { label: "Landscaping integration", value: "landscaping" },
    { label: "Outdoor lighting", value: "lighting" },
    { label: "Privacy fence / wall", value: "privacy" },
    { label: "Extended driveway", value: "driveway" },
  ],
  other: [
    { label: "Full gut renovation", value: "full_gut" },
    { label: "Multi-phase project", value: "multi_phase" },
    { label: "Historic restoration", value: "historic" },
    { label: "Commercial space", value: "commercial" },
  ],
};

export default function FeaturesStep({ projectType, selected, onChange }) {
  const features = featureGroups[projectType] || featureGroups.other;

  const toggle = (value) => {
    const next = selected.includes(value) ? selected.filter(v => v !== value) : [...selected, value];
    onChange(next);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1E2D3D] mb-1">Which features are you interested in?</h2>
      <p className="text-slate-500 text-sm mb-6">Select all that apply — this helps us fine-tune your estimate.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {features.map(({ label, value }) => {
          const active = selected.includes(value);
          return (
            <button
              key={value}
              type="button"
              onClick={() => toggle(value)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-sm font-medium transition-all text-left ${
                active ? "border-[#C4922A] bg-amber-50 text-[#1E2D3D]" : "border-[#E2D9CC] bg-white text-slate-600 hover:border-[#C4922A]/50"
              }`}
            >
              <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border transition-colors ${active ? "bg-[#C4922A] border-[#C4922A]" : "border-gray-300"}`}>
                {active && <Check className="w-3 h-3 text-white" />}
              </div>
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}