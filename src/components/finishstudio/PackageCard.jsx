import React, { useState } from "react";
import { Crown, Wallet, Save, FileText, Check } from "lucide-react";

const CATEGORIES = [
  { key: "cabinetry", label: "Cabinetry" },
  { key: "countertops", label: "Countertops" },
  { key: "flooring", label: "Flooring" },
  { key: "fixtures", label: "Fixtures & Hardware" },
  { key: "paint", label: "Paint / Walls" },
  { key: "lighting", label: "Lighting" },
];

export default function PackageCard({ pkg, index, roomType, isSaved, onSave, onAttach }) {
  const [tier, setTier] = useState("signature");
  const details = tier === "signature" ? pkg.signature : pkg.budget;

  return (
    <div className="bg-white border border-[#E2D9CC] rounded-xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1E2D3D] to-[#2C3E50] p-5 text-white">
        <span className="text-xs text-[#C4922A] font-semibold uppercase tracking-wider">Theme {index + 1}</span>
        <h3 className="text-lg font-bold mt-1">{pkg.theme_name}</h3>
        <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">{pkg.theme_description}</p>
      </div>

      {/* Tier toggle */}
      <div className="flex border-b border-gray-100">
        <button
          onClick={() => setTier("signature")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-semibold transition-colors ${
            tier === "signature"
              ? "text-[#C4922A] border-b-2 border-[#C4922A] bg-[#C4922A]/5"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <Crown className="w-4 h-4" /> Signature
        </button>
        <button
          onClick={() => setTier("budget")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-semibold transition-colors ${
            tier === "budget"
              ? "text-green-600 border-b-2 border-green-600 bg-green-50"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <Wallet className="w-4 h-4" /> Budget
        </button>
      </div>

      {/* Details */}
      <div className="p-5 space-y-2.5 flex-1">
        {CATEGORIES.map((cat) => (
          <div key={cat.key}>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{cat.label}</p>
            <p className="text-sm text-slate-700">{details?.[cat.key] || "—"}</p>
          </div>
        ))}
        <div className="pt-3 mt-2 border-t border-gray-100">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Estimated Cost ({roomType})</p>
          <p className={`text-lg font-bold ${tier === "signature" ? "text-[#C4922A]" : "text-green-600"}`}>
            {details?.estimated_cost || "—"}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="p-5 pt-0 grid grid-cols-2 gap-2">
        <button
          onClick={() => onSave(pkg, tier)}
          disabled={isSaved}
          className="flex items-center justify-center gap-1.5 border border-[#1E2D3D] text-[#1E2D3D] px-3 py-2.5 min-h-[44px] rounded-lg font-semibold text-xs hover:bg-slate-50 transition-colors disabled:opacity-50"
        >
          {isSaved ? <><Check className="w-4 h-4" /> Saved</> : <><Save className="w-4 h-4" /> Save</>}
        </button>
        <button
          onClick={() => onAttach(pkg, tier)}
          className="flex items-center justify-center gap-1.5 bg-[#C4922A] text-white px-3 py-2.5 min-h-[44px] rounded-lg font-semibold text-xs hover:bg-[#A37820] transition-colors"
        >
          <FileText className="w-4 h-4" /> Attach to Quote
        </button>
      </div>
    </div>
  );
}