import React from "react";

const inputClass = "w-full border border-[#E2D9CC] rounded-lg px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-[#C4922A]/30 focus:border-[#C4922A] bg-white";

export default function ContactStep({ data, onChange }) {
  const update = (field, val) => onChange({ ...data, [field]: val });

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1E2D3D] mb-1">Almost there! Where should we send it?</h2>
      <p className="text-slate-500 text-sm mb-6">Your free AI estimate will appear instantly on the next screen.</p>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-[#1E2D3D] mb-1">Full Name <span className="text-[#C4922A]">*</span></label>
          <input required type="text" placeholder="John Smith" value={data.name || ""} onChange={e => update("name", e.target.value)} className={inputClass} autoComplete="name" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#1E2D3D] mb-1">Email Address <span className="text-[#C4922A]">*</span></label>
          <input required type="email" placeholder="john@example.com" value={data.email || ""} onChange={e => update("email", e.target.value)} className={inputClass} autoComplete="email" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#1E2D3D] mb-1">Phone <span className="text-slate-400 font-normal">(optional)</span></label>
          <input type="tel" placeholder="(601) 000-0000" value={data.phone || ""} onChange={e => update("phone", e.target.value)} className={inputClass} autoComplete="tel" />
        </div>
        <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-[#C4922A]/20">
          <span className="text-xl mt-0.5">🔒</span>
          <p className="text-sm text-slate-600 leading-relaxed">
            Your info is private and only used to prepare your estimate. Our team will follow up within 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
}