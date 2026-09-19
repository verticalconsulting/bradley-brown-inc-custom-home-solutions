import React from "react";
import { Link } from "react-router-dom";
import { Phone, ChevronRight, Sparkles } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function CTABanner() {
  const trackEstimateClick = () => {
    base44.analytics.track({
      eventName: "homepage_estimate_clicked",
      properties: { placement: "closing_banner", destination: "/estimate" },
    });
  };

  const trackPhoneClick = () => {
    base44.analytics.track({
      eventName: "homepage_phone_clicked",
      properties: {
        placement: "closing_banner",
        destination: "tel:+18443514154",
      },
    });

    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: "AW-17864041271/21TJCO2Bj5ccELfGnsZC",
        value: 30,
        currency: "USD",
      });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
          <span className="text-primary-foreground/80 text-sm font-medium">
            Free Project Estimate
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Talk About Your Home Project?
        </h2>
        <p className="text-primary-foreground/80 mb-10 mx-auto text-lg max-w-xl">
          Tell us what you want to build or improve and receive a personalized
          preliminary estimate. Free, with no obligation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/estimate"
            onClick={trackEstimateClick}
            className="bg-background text-primary px-8 py-5 min-h-[52px] text-lg font-bold rounded-3xl inline-flex items-center justify-center gap-2 hover:bg-accent transition-colors shadow-lg"
          >
            Get My Free Estimate <Sparkles className="w-5 h-5" />
            <ChevronRight className="w-5 h-5" />
          </Link>
          <a
            href="tel:+18443514154"
            onClick={trackPhoneClick}
            className="text-white px-8 py-5 min-h-[52px] text-lg font-bold rounded-2xl inline-flex items-center justify-center gap-2 border-2 border-white hover:bg-white/10 transition-colors"
          >
            <Phone className="w-5 h-5" /> Call (844) 351-4154
          </a>
        </div>
      </div>
    </section>
  );
}
