import React, { useState } from "react";
import { Check, DollarSign, Palette, Sparkles } from "lucide-react";

/**
 * Single themed finish-package card.
 *
 * Props:
 *   pkg: {
 *     theme_name, vibe, color_palette[], materials[], fixtures[],
 *     estimated_price_range, signature_highlight,
 *     budget_alternative: { name, swaps[], estimated_price_range }
 *   }
 *   isSelected
 *   tier: 'signature' | 'budget'   (which tier is currently active)
 *   onSelectTier(tier)
 *   onSave()
 *   saving
 */
export default function FinishPackageCard({ pkg, isSelected, tier, onSelectTier, onSave, saving }) {
  const [showBudget, setShowBudget] = useState(tier === "budget");

  const handleTier = (t) => {
    setShowBudget(t === "budget");
    onSelectTier(t);
  };

  return (
    <article
      className={`rounded-2xl border-2 transition-all bg-white flex flex-col ${
        isSelected ? "border-sky-500 shadow-lg" : "border-gray-200 hover:border-sky-300"
      }`}
    >
      <header className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-9 h-9 rounded-full bg-sky-50 flex items-center justify-center">
            <Palette className="w-4 h-4 text-sky-500" />
          </div>
          <div>
            <h3 className="font-bold text-[#1E2D3D] leading-tight">{pkg.theme_name}</h3>
            <p className="text-xs text-slate-500">{pkg.vibe}</p>
          </div>
        </div>

        {pkg.color_palette?.length > 0 && (
          <div className="flex items-center gap-1.5 mt-3" aria-label="Color palette">
            {pkg.color_palette.map((c, i) => (
              <span
                key={i}
                title={c.name || c.hex}
                className="w-7 h-7 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: c.hex || c }}
              />
            ))}
          </div>
        )}
      </header>

      <div className="p-5 flex-1 flex flex-col gap-4">
        {/* Tier toggle */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-gray-100 rounded-lg">
          <button
            type="button"
            onClick={() => handleTier("signature")}
            className={`text-xs font-semibold py-1.5 rounded-md transition-colors flex items-center justify-center gap-1 ${
              !showBudget ? "bg-white text-sky-600 shadow-sm" : "text-slate-500"
            }`}
          >
            <Sparkles className="w-3 h-3" /> Signature
          </button>
          <button
            type="button"
            onClick={() => handleTier("budget")}
            className={`text-xs font-semibold py-1.5 rounded-md transition-colors flex items-center justify-center gap-1 ${
              showBudget ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500"
            }`}
          >
            <DollarSign className="w-3 h-3" /> Budget Alt
          </button>
        </div>

        {!showBudget ? (
          <>
            <Section label="Materials" items={pkg.materials} />
            <Section label="Fixtures" items={pkg.fixtures} />
            {pkg.signature_highlight && (
              <p className="text-xs text-sky-700 bg-sky-50 rounded-lg p-2.5 leading-relaxed">
                <strong>Signature touch:</strong> {pkg.signature_highlight}
              </p>
            )}
            <PriceTag label="Estimated range" value={pkg.estimated_price_range} accent="sky" />
          </>
        ) : (
          <>
            <p className="text-sm font-semibold text-emerald-700">{pkg.budget_alternative?.name}</p>
            <Section label="Smart swaps" items={pkg.budget_alternative?.swaps} />
            <PriceTag
              label="Budget range"
              value={pkg.budget_alternative?.estimated_price_range}
              accent="emerald"
            />
          </>
        )}
      </div>

      <footer className="p-5 pt-0">
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
            isSelected
              ? "bg-emerald-500 text-white hover:bg-emerald-600"
              : "bg-[#1E2D3D] text-white hover:bg-sky-600"
          } disabled:opacity-50`}
        >
          {isSelected ? (
            <>
              <Check className="w-4 h-4" /> Saved
            </>
          ) : saving ? (
            "Saving..."
          ) : (
            "Save this package"
          )}
        </button>
      </footer>
    </article>
  );
}

function Section({ label, items }) {
  if (!items?.length) return null;
  return (
    <div>
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">{label}</p>
      <ul className="space-y-1">
        {items.slice(0, 5).map((it, i) => (
          <li key={i} className="text-sm text-slate-700 flex gap-2">
            <Check className="w-3.5 h-3.5 text-sky-500 mt-0.5 flex-shrink-0" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PriceTag({ label, value, accent = "sky" }) {
  if (!value) return null;
  const color = accent === "emerald" ? "text-emerald-700 bg-emerald-50" : "text-sky-700 bg-sky-50";
  return (
    <div className={`rounded-lg px-3 py-2 text-sm ${color}`}>
      <span className="text-xs font-semibold opacity-80">{label}: </span>
      <span className="font-bold">{value}</span>
    </div>
  );
}