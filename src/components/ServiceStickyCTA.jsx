import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Phone, Sparkles, X } from "lucide-react";
import { base44 } from "@/api/base44Client";

/**
 * Sticky mobile + desktop CTA bar for service-specific landing pages.
 * Appears after the user scrolls past the hero so they always have a
 * one-tap path to a quote or a call — the same pattern across every
 * service page reduces friction and drop-off.
 */
export default function ServiceStickyCTA({ source = "service_page", label = "Get a Free Quote" }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleCall = () => {
    base44.analytics.track({ eventName: "phone_click", properties: { source } });
    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: "AW-17864041271/21TJCO2Bj5ccELfGnsZC",
        value: 30,
        currency: "USD",
      });
    }
  };

  const handleQuote = () => {
    base44.analytics.track({ eventName: "sticky_quote_click", properties: { source } });
  };

  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 pb-[env(safe-area-inset-bottom)] md:pb-2 md:bottom-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:max-w-2xl md:w-[calc(100%-2rem)]">
      <div className="bg-white border-t border-gray-200 shadow-2xl md:border md:rounded-2xl px-3 py-2.5 md:px-4 md:py-3 flex items-center gap-2">
        <a
          href="tel:+18443514154"
          onClick={handleCall}
          className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 text-white font-bold text-sm px-4 py-3.5 min-h-[44px] rounded-lg transition-colors"
        >
          <Phone className="w-4 h-4" /> Call Now
        </a>
        <Link
          to="/estimate"
          onClick={handleQuote}
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#C4922A] hover:bg-[#A37820] text-white font-bold text-sm px-4 py-3.5 min-h-[44px] rounded-lg transition-colors"
        >
          <Sparkles className="w-4 h-4" /> {label}
        </Link>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="p-2 text-slate-400 hover:text-slate-600 transition-colors hidden md:inline-flex"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}