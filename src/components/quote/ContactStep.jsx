import React from "react";

const inputClass = "w-full border border-[#E2D9CC] rounded-lg px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-[#C4922A]/30 focus:border-[#C4922A] bg-white";

export default function ContactStep({ data, onChange }) {
  const update = (field, val) => onChange({ ...data, [field]: val });

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1E2D3D] mb-1">Where should we send your estimate?</h2>
      <p className="text-slate-500 text-sm mb-6">We'll generate your personalized AI estimate and email it to you.</p>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#1E2D3D] mb-1">Full Name *</label>
          <input required type="text" placeholder="John Smith" value={data.name || ""} onChange={e => update("name", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1E2D3D] mb-1">Email Address *</label>
          <input required type="email" placeholder="john@example.com" value={data.email || ""} onChange={e => update("email", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1E2D3D] mb-1">Phone Number</label>
          <input type="tel" placeholder="(601) 000-0000" value={data.phone || ""} onChange={e => update("phone", e.target.value)} className={inputClass} />
        </div>
        <div className="p-4 bg-amber-50 rounded-lg border border-[#C4922A]/20">
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-[#C4922A]">What happens next?</span> Our AI will analyze your project details and generate a personalized cost estimate. A member of our team will also follow up within 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
}