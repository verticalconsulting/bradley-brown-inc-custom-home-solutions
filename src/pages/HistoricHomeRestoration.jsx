import React from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { Phone, ChevronRight, CheckCircle, Home, Clock, DollarSign, MapPin, Star } from "lucide-react";
import ServiceStickyCTA from "@/components/ServiceStickyCTA";
import { base44 } from "@/api/base44Client";

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Historic Home Restoration in Brandon, MS — Bradley Brown Inc.",
  "description": "See how Bradley Brown Inc. restored a historic Mississippi home, preserving original character while modernizing systems and finishes.",
  "author": { "@type": "Organization", "name": "Bradley Brown Inc." },
  "publisher": {
    "@type": "Organization",
    "name": "Bradley Brown Inc.",
    "logo": { "@type": "ImageObject", "url": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c758479c46f0580553750/0990d7b76_bradleybrowninc-logo2.png" }
  },
  "mainEntityOfPage": "https://bradleybrowninc.com/projects/historic-home-restoration"
  };

  const highlights = [
  "Restored original heart pine hardwood floors to like-new condition",
  "Rebuilt wraparound front porch with period-accurate millwork",
  "Updated electrical, plumbing & HVAC while preserving wall integrity",
  "Restored original window frames with energy-efficient glazing inserts",
  "Refinished original brick fireplace surround and mantel",
  "Sourced period-matching trim, moldings, and hardware throughout",
];

const stats = [
  { icon: Home, label: "Home Size", value: "2,800 sq ft" },
  { icon: Clock, label: "Duration", value: "7 months" },
  { icon: MapPin, label: "Location", value: "Brandon, MS" },
  { icon: DollarSign, label: "Investment", value: "$380,000–$420,000" },
];

const phases = [
  {
    phase: "Phase 1",
    title: "Assessment & Planning",
    description: "We conducted a thorough structural and historical assessment, working with the homeowner to identify original materials, document existing conditions, and develop a restoration plan that honored the home's 1920s heritage.",
  },
  {
    phase: "Phase 2",
    title: "Structural Stabilization",
    description: "Foundation piers were reinforced, load-bearing walls evaluated, and any compromised structural members were sistered or replaced using matching-era lumber. The roof decking and rafters were inspected and selectively replaced.",
  },
  {
    phase: "Phase 3",
    title: "Systems Modernization",
    description: "All mechanical systems—electrical panel, plumbing supply and drain lines, and HVAC—were brought to current code. We used a mini-split system to avoid damaging original plaster walls with ductwork.",
  },
  {
    phase: "Phase 4",
    title: "Interior Restoration",
    description: "Original heart pine floors were sanded and refinished. Damaged plaster was repaired with matching texture. Period-accurate trim, baseboard, and crown molding were sourced and installed throughout.",
  },
  {
    phase: "Phase 5",
    title: "Exterior & Curb Appeal",
    description: "The wraparound porch was fully rebuilt with pressure-treated framing and clear-heart cedar decking, matching the original profile. Exterior siding was repaired, primed, and painted in historically appropriate colors.",
  },
];

export default function HistoricHomeRestoration() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      <SEOHead
        title="Historic Home Restoration Project — Bradley Brown Inc. | Brandon, MS"
        description="Bradley Brown Inc. restored a 1920s historic home in Brandon, MS — preserving original hardwood floors, millwork, and character while fully modernizing all systems. See the full project breakdown."
        canonical="https://bradleybrowninc.com/portfolio"
        robots="noindex, nofollow"
        schema={schema}
      />

      {/* Hero */}
      <div
        className="relative bg-[#1E2D3D] py-20 md:py-28 overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#1E2D3D]/80" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#C4922A]/20 border border-[#C4922A]/40 rounded-full px-3 py-1 mb-4">
            <Star className="w-3.5 h-3.5 text-[#C4922A]" />
            <span className="text-[#F5D78E] text-xs font-medium">Featured Project</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Historic Home Restoration
          </h1>
          <p className="text-slate-300 mt-4 text-base md:text-lg max-w-2xl mx-auto">
            Preserving a century of Mississippi history while creating a fully modern, comfortable family home in Brandon, MS.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <a
              href="tel:+18443514154"
              onClick={() => {
                if (typeof window.gtag === "function") {
                  window.gtag("event", "conversion", { send_to: "AW-17864041271/21TJCO2Bj5ccELfGnsZC", value: 30, currency: "USD" });
                }
              }}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-colors"
            >
              <Phone className="w-4 h-4" /> (844) 351-4154
            </a>
            <Link
              to="/contactform"
              className="inline-flex items-center gap-2 bg-sky-400 hover:bg-sky-500 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-colors"
            >
              Get a Free Estimate <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="text-center">
              <Icon className="w-5 h-5 text-[#C4922A] mx-auto mb-1" />
              <p className="text-sm font-bold text-[#1E2D3D]">{value}</p>
              <p className="text-xs text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* Overview */}
        <section>
          <h2 className="text-2xl font-bold text-[#1E2D3D] mb-4">Project Overview</h2>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
            <p>
              When the owners of this 1920s craftsman-style home in Brandon, Mississippi contacted Bradley Brown Inc., the house had sat largely untouched for decades. While structurally sound, the home needed every mechanical system replaced, extensive wood rot repairs, and careful cosmetic restoration to return it to its original splendor.
            </p>
            <p>
              Our challenge—and our mission—was to treat this home as the piece of Mississippi history it is. That meant sourcing matching heart pine flooring boards, hand-milling replacement trim profiles to match originals, and partnering with a local millwork shop to recreate porch columns and balustrades that had deteriorated beyond repair.
            </p>
            <p>
              The result is a home that feels authentically historic yet performs like a new build: energy-efficient windows, a modern HVAC system, updated plumbing and 200-amp electrical service—all hidden behind walls that look exactly as they did when the house was first built.
            </p>
          </div>
        </section>

        {/* Gallery placeholder */}
        <section>
          <h2 className="text-2xl font-bold text-[#1E2D3D] mb-4">Project Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
              "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
              "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80",
              "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80",
              "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
              "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
            ].map((src, i) => (
              <div key={i} className="rounded-xl overflow-hidden aspect-square bg-slate-100">
                <img src={src} alt={`Historic home restoration photo ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </section>

        {/* Project Highlights */}
        <section>
          <h2 className="text-2xl font-bold text-[#1E2D3D] mb-4">Project Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {highlights.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-4">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Restoration Phases */}
        <section>
          <h2 className="text-2xl font-bold text-[#1E2D3D] mb-6">Our Restoration Process</h2>
          <div className="space-y-4">
            {phases.map((p, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl p-5 flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1E2D3D] text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#C4922A] uppercase tracking-wider">{p.phase}</p>
                  <h3 className="font-bold text-[#1E2D3D] mt-0.5">{p.title}</h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#1E2D3D] rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Have a Historic Home That Needs Care?</h2>
          <p className="text-slate-300 text-sm mb-6 max-w-md mx-auto">
            Bradley Brown Inc. has the experience and craftsmanship to honor your home's history while making it ready for the next hundred years.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+18443514154"
              onClick={() => {
                if (typeof window.gtag === "function") {
                  window.gtag("event", "conversion", { send_to: "AW-17864041271/21TJCO2Bj5ccELfGnsZC", value: 30, currency: "USD" });
                }
              }}
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Phone className="w-4 h-4" /> Call (844) 351-4154
            </a>
            <Link
              to="/contactform"
              className="inline-flex items-center justify-center gap-2 bg-sky-400 hover:bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Get a Free Estimate <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Related */}
        <section>
          <h2 className="text-xl font-bold text-[#1E2D3D] mb-4">Related Projects & Resources</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Renovation Services", to: "/Services" },
              { label: "Portfolio", to: "/Portfolio" },
              { label: "Home Addition Ideas", to: "/HomeAdditionIdeas" },
              { label: "Renovation Loans", to: "/RenovationLoans" },
            ].map(item => (
              <Link
                key={item.to}
                to={item.to}
                className="bg-white border border-gray-100 rounded-xl p-4 text-center text-sm font-medium text-[#1E2D3D] hover:border-sky-300 hover:text-sky-600 transition-colors"
              >
                {item.label} <ChevronRight className="w-3 h-3 inline" />
              </Link>
            ))}
          </div>
        </section>

      </div>
      <ServiceStickyCTA source="historic_restoration_page" label="Get a Free Quote" />
    </div>
  );
}