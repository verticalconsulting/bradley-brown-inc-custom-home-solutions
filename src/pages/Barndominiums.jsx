import React from "react";
import { Phone, CheckCircle, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import SEOHead from "@/components/SEOHead";
import LandingCTABar from "@/components/landing/LandingCTABar";
import LocalProofPoints from "@/components/landing/LocalProofPoints";
import LandingFAQ from "@/components/landing/LandingFAQ";
import StickyCallButton from "@/components/StickyCallButton";
import { base44 } from "@/api/base44Client";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HomeAndConstructionBusiness",
      "name": "Bradley Brown Inc.",
      "telephone": "+18443514154",
      "email": "bradleybrowninc@gmail.com",
      "url": "https://bradleybrowninc.com",
      "address": { "@type": "PostalAddress", "streetAddress": "104 Tiffany Drive", "addressLocality": "Brandon", "addressRegion": "MS", "postalCode": "39042", "addressCountry": "US" },
      "geo": { "@type": "GeoCoordinates", "latitude": 32.2729, "longitude": -89.9923 },
      "foundingDate": "1995",
      "priceRange": "$$$",
      "sameAs": ["https://www.facebook.com/BradleyBrownInc", "https://www.tiktok.com/@bb859876", "https://www.bbb.org"],
      "areaServed": [{ "@type": "City", "name": "Brandon, Mississippi" }, { "@type": "AdministrativeArea", "name": "Rankin County, Mississippi" }]
    },
    {
      "@type": "Service",
      "name": "Barndominium Construction",
      "provider": { "@type": "HomeAndConstructionBusiness", "name": "Bradley Brown Inc." },
      "areaServed": "Brandon, MS and surrounding 50-mile radius",
      "description": "Custom barndominium builds in the Brandon and Rankin County area — steel frame, open-concept living, and workshop space combined in one beautiful structure."
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bradleybrowninc.com" },
        { "@type": "ListItem", "position": 2, "name": "Barndominiums", "item": "https://bradleybrowninc.com/barndominiums-ms" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "How much does a barndominium cost in Mississippi?", "acceptedAnswer": { "@type": "Answer", "text": "Barndominium builds in the Brandon and Rankin County area typically range from $75–$150 per sq ft depending on finishes, size, and site conditions. Call us for a free estimate." } },
        { "@type": "Question", "name": "How long does it take to build a barndominium?", "acceptedAnswer": { "@type": "Answer", "text": "Most barndominiums take 4–8 months from permit to completion. The steel shell goes up quickly; interior finish work takes the most time." } }
      ]
    }
  ]
};

const faqs = [
  { question: "How much does a barndominium cost in Mississippi?", answer: "Barndominium builds in the Brandon and Rankin County area typically range from $75–$150 per sq ft depending on finishes, size, and site conditions. Call us at (844) 351-4154 for a free estimate tailored to your land and goals." },
  { question: "How long does it take to build a barndominium?", answer: "Most barndominiums take 4–8 months from permit to move-in. The steel frame shell goes up fast; interior finishes take the most time." },
  { question: "Can I combine living space and a workshop?", answer: "Absolutely — that's the beauty of a barndominium. We design custom layouts with living quarters, garages, workshops, and more all under one roof." },
  { question: "Do you handle permits for barndominiums in MS?", answer: "Yes. We pull all required permits and manage inspections from start to finish so you don't have to." },
  { question: "Do you offer free estimates?", answer: "Yes. Call (844) 351-4154 or use our online Quote Assistant for a free, no-obligation estimate." },
];

const features = [
  { title: "Steel Frame Construction", desc: "Durable, low-maintenance metal building shells that stand up to Mississippi weather for decades." },
  { title: "Open-Concept Living", desc: "Soaring ceilings and wide-open floor plans that can be customized exactly to your lifestyle." },
  { title: "Combined Living & Workshop", desc: "Seamlessly blend residential living space with garages, shops, or hobby rooms under one roof." },
  { title: "Custom Interior Finishes", desc: "From rustic to modern — we finish the interior with the same craftsmanship as any custom home." },
  { title: "Energy Efficiency", desc: "Spray foam insulation, energy-efficient windows, and HVAC options tailored to the open layout." },
  { title: "Acreage & Rural Builds", desc: "We specialize in rural properties across Rankin, Hinds, Simpson, and surrounding MS counties." },
];

export default function Barndominiums() {
  const handleCall = () => base44.analytics.track({ eventName: "phone_click", properties: { source: "barndominiums_landing" } });

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-16 md:pt-20">
      <SEOHead
        title="Barndominium Builder in Brandon, MS — Bradley Brown Inc."
        description="Custom barndominium construction in the Brandon and Rankin County area. Steel frame, open-concept living & workshop combos. Licensed & insured since 1995. Free estimates — call (844) 351-4154."
        schema={schema}
        canonical="https://bradleybrowninc.com/barndominiums-ms"
      />
      <StickyCallButton />

      {/* Top sticky call bar */}
      <div className="sticky top-16 md:top-20 z-40 bg-green-500 text-white py-2 px-4 text-center text-sm font-semibold">
        <a href="tel:+18443514154" onClick={handleCall} className="flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" /> Call Now: (844) 351-4154 — Free Barndominium Estimates
        </a>
      </div>

      {/* Hero */}
      <div className="bg-[#1E2D3D] py-14 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80')" }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sky-400 text-xs font-semibold uppercase tracking-wider mb-2">Brandon, MS & Rankin County Area</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Custom Barndominium Builder<br className="hidden md:block" /> in Mississippi
          </h1>
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-base md:text-lg">
            Steel-frame barndominiums combining living space, garages, and workshops — built to last by Mississippi's trusted contractor since 1995.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+18443514154" onClick={handleCall} className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg">
              <Phone className="w-5 h-5" /> (844) 351-4154
            </a>
            <Link to={"/estimate"} className="flex items-center justify-center gap-2 bg-sky-400 hover:bg-sky-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors">
              Free Estimate <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        <img
          src="https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/7b34280a-4da6-4735-a990-074941b06e00/large"
          alt="Custom barndominium built by Bradley Brown Inc. in Mississippi"
          className="w-full rounded-2xl shadow-lg object-cover max-h-[480px]"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-14">

        {/* Local proof */}
        <LocalProofPoints />

        {/* Features */}
        <div>
          <h2 className="text-2xl font-bold text-[#1E2D3D] mb-6">What We Build</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-[#1E2D3D] text-sm">{f.title}</h3>
                  <p className="text-slate-500 text-xs mt-1 leading-snug">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#1E2D3D] mb-2">Barndominium Pricing in Mississippi</h2>
          <p className="text-slate-500 text-sm mb-4">Typical ranges for the Brandon and Rankin County area. Actual cost depends on size, finishes, and site.</p>
          <div className="space-y-2">
            {[
              { label: "Basic Shell + Rough-In", range: "$75–$100 / sq ft" },
              { label: "Full Turnkey Barndominium", range: "$100–$150 / sq ft" },
              { label: "Luxury Finishes", range: "$150+ / sq ft" },
            ].map((row) => (
              <div key={row.label} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <span className="text-sm text-slate-700 font-medium">{row.label}</span>
                <span className="text-sky-600 font-bold text-sm">{row.range}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-3">* Estimates only. Call for a free, detailed quote specific to your land and project.</p>
        </div>

        {/* Body copy */}
        <div className="prose prose-slate max-w-none">
          <h2 className="text-xl font-bold text-[#1E2D3D]">Why Choose Bradley Brown Inc. for Your Barndominium?</h2>
          <p className="text-slate-600 leading-relaxed">Bradley Brown Inc. has been building across the Brandon and Rankin County area since 1995. We bring that same craftsmanship and accountability to every barndominium project — from the concrete slab and steel erection to the custom kitchen and bathroom finishes inside.</p>
          <p className="text-slate-600 leading-relaxed">We serve Brandon, Flowood, Richland, Florence, Pelahatchie, Forest, Morton, and all of Rankin, Smith, Simpson, and Scott counties. If you have land, we can build on it. Call <a href="tel:+18443514154" onClick={handleCall} className="text-sky-600 font-semibold">(844) 351-4154</a> to schedule your free site consultation.</p>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-xl font-bold text-[#1E2D3D] mb-6 text-center">Barndominium FAQs</h2>
          <LandingFAQ faqs={faqs} />
        </div>

        {/* Related links */}
        <div className="bg-slate-50 border border-gray-200 rounded-xl p-5">
          <h3 className="font-bold text-[#1E2D3D] text-sm mb-3">Related Pages</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "View All Services", page: "Services" },
              { label: "Our Portfolio", page: "Portfolio" },
              { label: "Get an Estimate", page: "QuoteAssistant" },
              { label: "Schedule a Site Visit", page: "ScheduleVisit" },
              { label: "Pricing Guide", page: "LandingPricing" },
              { label: "Contact Us", page: "Contact" },
            ].map((link) => (
              <Link key={link.page} to={createPageUrl(link.page)} className="inline-flex items-center gap-1 bg-white border border-gray-200 text-sky-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-sky-50 transition-colors">
                <ChevronRight className="w-3 h-3" /> {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <LandingCTABar headline="Ready to build your barndominium? Let's talk." />
    </div>
  );
}