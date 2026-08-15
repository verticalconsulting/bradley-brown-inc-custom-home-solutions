import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Sparkles, ChevronRight } from "lucide-react";
import { base44 } from "@/api/base44Client";

const STORAGE_KEY = "bb_exit_intent_shown_session";

/**
 * Exit-intent modal that offers the free AI-powered estimate.
 * Single CTA button → /estimate. No email capture in the popup itself.
 * Frequency-capped: once per session. Suppressed on /estimate and /thank-you.
 */
export default function ExitIntentPopup({ source = "home" }) {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Suppress on /estimate and /thank-you
    if (typeof window === "undefined") return;
    const path = window.location.pathname;
    if (path === "/estimate" || path === "/thank-you") return;

    // Only trigger once per session
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    let armed = false;
    // Arm the trigger after 8s so it doesn't fire the instant they land
    const armTimer = setTimeout(() => { armed = true; }, 8000);

    const handleMouseLeave = (e) => {
      if (!armed) return;
      if (e.clientY <= 0) {
        setVisible(true);
        sessionStorage.setItem(STORAGE_KEY, "1");
        document.removeEventListener("mouseleave", handleMouseLeave);
        base44.analytics.track({
          eventName: "exit_intent_shown",
          properties: { source: window.location.pathname },
        });
      }
    };

    // Mobile fallback — show after 45s of scrolling (delayed to reduce intrusiveness)
    const mobileTimer = setTimeout(() => {
      if (armed && !sessionStorage.getItem(STORAGE_KEY) && window.innerWidth < 768) {
        setVisible(true);
        sessionStorage.setItem(STORAGE_KEY, "1");
        base44.analytics.track({
          eventName: "exit_intent_shown",
          properties: { source: window.location.pathname, trigger: "mobile_timer" },
        });
      }
    }, 45000);

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(armTimer);
      clearTimeout(mobileTimer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Re-check suppression on route change
  useEffect(() => {
    if (location.pathname === "/estimate" || location.pathname === "/thank-you") {
      setVisible(false);
    }
  }, [location.pathname]);

  const handleClose = () => {
    setVisible(false);
    base44.analytics.track({
      eventName: "exit_intent_dismissed",
      properties: { source: window.location.pathname },
    });
  };

  const handleCTAClick = () => {
    base44.analytics.track({
      eventName: "exit_intent_clicked",
      properties: { source: window.location.pathname },
    });
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:px-4 bg-black/60 sm:backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 w-11 h-11 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header banner */}
        <div className="bg-gradient-to-br from-[#1E2D3D] to-[#2a3f56] p-8 text-center">
          <div className="inline-flex items-center gap-1.5 bg-[#C4922A]/20 border border-[#C4922A]/40 rounded-full px-3 py-1 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#F5D78E]" />
            <span className="text-[#F5D78E] text-xs font-semibold uppercase tracking-wider">Free · AI-Powered</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
            Get Your Free AI Cost Estimate
          </h3>
          <p className="text-slate-300 text-sm mt-2">
            Answer a few questions and our AI will generate a personalized remodeling cost estimate in seconds.
          </p>
        </div>

        <div className="p-6">
          <ul className="space-y-2 mb-6">
            {[
              "Instant cost range based on your project details",
              "No obligation — no phone call required",
              "Licensed & insured contractor since 2005",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <Link
            to="/estimate"
            onClick={handleCTAClick}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#C4922A] hover:bg-[#A37820] text-white py-3.5 rounded-lg font-bold text-sm transition-colors"
          >
            Get My Free Estimate <ChevronRight className="w-4 h-4" />
          </Link>

          <button
            onClick={handleClose}
            className="block mx-auto mt-3 text-slate-600 text-sm hover:text-slate-800 transition-colors"
          >
            No thanks, I'll keep looking
          </button>
        </div>
      </div>
    </div>
  );
}