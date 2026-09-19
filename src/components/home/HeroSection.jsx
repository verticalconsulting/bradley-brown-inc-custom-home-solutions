import React from "react";
import { Link } from "react-router-dom";
import { Phone, Sparkles } from "lucide-react";
import { base44 } from "@/api/base44Client";

// Cloudflare Images flexible variants — serve a device-appropriate, compressed size
// (full "herocover" variant is 314 KiB; w=800,q=75 is ~51 KiB)
const HERO_BASE =
  "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/932d74d8-4f05-4b52-fa85-6903e1e42b00";
// f=auto → Cloudflare negotiates AVIF/WebP from the browser's Accept header,
// re-encoded from the stored original (w=1200 AVIF ≈ 79 KiB vs 103 KiB JPEG).
const HERO_IMAGE = `${HERO_BASE}/w=1200,q=75,f=auto`;
const HERO_SRCSET = [
  `${HERO_BASE}/w=800,q=75,f=auto 800w`,
  `${HERO_BASE}/w=1200,q=75,f=auto 1200w`,
  `${HERO_BASE}/w=1920,q=75,f=auto 1920w`,
].join(", ");

export default function HeroSection() {
  const trackEstimateClick = () => {
    base44.analytics.track({
      eventName: "homepage_estimate_clicked",
      properties: { placement: "hero", destination: "/estimate" },
    });
  };

  const trackPhoneClick = () => {
    base44.analytics.track({
      eventName: "homepage_phone_clicked",
      properties: { placement: "hero", destination: "tel:+18443514154" },
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
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <img
        src={HERO_IMAGE}
        srcSet={HERO_SRCSET}
        sizes="100vw"
        alt="Custom home kitchen built by Bradley Brown Inc. in Brandon, Mississippi"
        width="1920"
        height="1080"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-foreground/75 via-foreground/55 to-foreground/85" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
        <div className="mb-6 px-4 py-1.5 rounded-full inline-flex items-center gap-2 border border-primary/40 bg-[hsl(var(--sidebar-accent))]">
          <span className="bg-primary rounded-full w-2 h-2" />
          <span className="text-primary text-sm font-medium">
            Custom Homes &amp; Remodeling in Brandon, Mississippi
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          Brandon, MS Home Remodeling &amp;
          <span className="block text-[hsl(var(--sidebar-ring))]">
            Custom Home Builder
          </span>
        </h1>

        <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-[hsl(var(--sidebar-background))]">
          Custom homes, renovations, additions, and outdoor living spaces
          managed with local experience, integrity, and attention to detail.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full max-w-xs sm:max-w-none mx-auto">
          <Link
            to="/estimate"
            onClick={trackEstimateClick}
            className="hover:opacity-90 text-white px-6 sm:px-8 py-5 min-h-[52px] text-base sm:text-lg font-bold rounded-xl inline-flex items-center justify-center gap-2 transition-all sm:hover:scale-105 shadow-lg bg-primary"
          >
            <Sparkles className="w-5 h-5" /> Get My Free Estimate
          </Link>
          <a
            href="tel:+18443514154"
            onClick={trackPhoneClick}
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/50 text-white px-6 sm:px-8 py-5 min-h-[52px] rounded-xl font-semibold text-base sm:text-lg transition-all"
          >
            <Phone className="w-5 h-5" /> Call (844) 351-4154
          </a>
        </div>
      </div>
    </section>
  );
}