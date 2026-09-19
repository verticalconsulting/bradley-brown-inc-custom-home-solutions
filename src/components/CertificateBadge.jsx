import React, { useState, useEffect, useCallback } from "react";
import { ShieldCheck, X } from "lucide-react";

const CERTIFICATE_URL = "https://media.base44.com/images/public/699c758479c46f0580553750/89acaab27_bradleybrowncontractor.png";

export default function CertificateBadge({ variant = "dark" }) {
  const [open, setOpen] = useState(false);

  const closeModal = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [open, closeModal]);

  const isDark = variant === "dark";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
          isDark ? "bg-white/5 hover:bg-white/10 border-slate-600" : "bg-white hover:opacity-80 border-gray-100 shadow-sm"
        }`}
        aria-label="View Mississippi Certified Residential Builder certificate"
      >
        <ShieldCheck className={`w-8 h-8 flex-shrink-0 ${isDark ? "text-sky-400" : "text-sky-600"}`} aria-hidden="true" />
        <div className="text-left">
          <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-[#1E2D3D]"}`}>
            Mississippi Certified Residential Builder
          </p>
          <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            License No. R08290 · Active · Click to view certificate
          </p>
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Mississippi Certified Residential Builder certificate"
        >
          <div
            className="relative max-w-3xl w-full max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close certificate"
              className="absolute top-3 right-3 z-10 w-10 h-10 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/90 hover:bg-gray-100 text-gray-700 shadow-md transition-colors"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
            <img
              src={CERTIFICATE_URL}
              alt="Mississippi Board of Contractors certificate — Bradley Brown Inc., Residential Builder License No. R08290, expires Jun. 28, 2027"
              className="w-full h-auto max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}