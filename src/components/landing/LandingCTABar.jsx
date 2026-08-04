import React from "react";
import { Phone, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";

export default function LandingCTABar({ headline = "Ready to Get Started?" }) {
  const handleCall = () => {
    base44.analytics.track({ eventName: "phone_click", properties: { source: "landing_cta_bar" } });
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        send_to: 'AW-17864041271/21TJCO2Bj5ccELfGnsZC',
        value: 30,
        currency: 'USD'
      });
    }
  };

  return (
    <div className="bg-[#1E2D3D] py-5 px-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
      <p className="text-white font-semibold text-base">{headline}</p>
      <a
        href="tel:+18443514154"
        onClick={handleCall}
        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold text-base transition-colors shadow-md"
      >
        <Phone className="w-5 h-5" /> (844) 351-4154
      </a>
      <Link
        to="/estimate"
        className="flex items-center gap-1.5 bg-sky-400 hover:bg-sky-500 text-white px-5 py-3 rounded-full font-semibold text-sm transition-colors"
      >
        Free Estimate <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}