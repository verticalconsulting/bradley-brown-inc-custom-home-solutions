import React from "react";
import { Phone } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function StickyCallButton() {
  const handleClick = () => {
    base44.analytics.track({ eventName: "phone_click", properties: { source: "sticky_button" } });
  };

  return (
    <a
      href="tel:+18443514154"
      onClick={handleClick}
      className="fixed bottom-20 right-4 z-50 md:hidden flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-xl font-bold text-sm transition-colors"
      aria-label="Call Bradley Brown Inc."
    >
      <Phone className="w-5 h-5" />
      Call Now
    </a>
  );
}