import React from "react";
import { Phone, CheckCircle, ChevronRight, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import SEOHead from "@/components/SEOHead";
import StickyCallButton from "@/components/StickyCallButton";
import LandingFAQ from "@/components/landing/LandingFAQ";
import { base44 } from "@/api/base44Client";

const PHONE = "(844) 351-4154";
const PHONE_HREF = "tel:+18443514154";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "How much does a barndominium cost in Mississippi?", "acceptedAnswer": { "@type": "Answer", "text": "Barndominium costs in Mississippi range from $75–$150+ per square foot. A basic shell with rough-in runs $75–$100/sq ft, a full turnkey barndo averages $100–$150/sq ft, and luxury finishes can exceed $150/sq ft. A 2,000 sq ft turnkey barndominium typically costs $200,000–$300,000." } },
        { "@type": "Question", "name": "What factors affect barndominium cost in Mississippi?", "acceptedAnswer": { "@type": "Answer", "text": "The main cost factors are: size (square footage), site prep (clearing, grading, driveway), concrete slab thickness, insulation type (closed-cell spray foam vs. batt), interior finishes (cabinets, countertops, flooring), and custom features like porches, lofts, or oversized garage bays." } },
        { "@type": "Question", "name": "Is a barndominium cheaper than a traditional home in Mississippi?", "acceptedAnswer": { "@type": "Answer", "text": "Generally yes — barndominiums cost $75–$150/sq ft vs. $150–$250/sq ft for a traditional custom home. The steel shell goes up faster and requires less labor. However, luxury interior finishes can close the gap. You typically save 20–40% on comparable square footage." } },
        { "@type": "Question", "name": "Does insurance cost more for a barndominium in Mississippi?", "acceptedAnswer": { "@type": "Answer", "text": "Not necessarily. Steel-frame construction is fire-resistant and durable, which can actually lower insurance premiums in some cases. Check with your Mississippi insurance agent — many carriers now offer standard homeowners policies for barndominiums." } },
        { "@type": "Question", "name": "Can I finance a barndominium build in Mississippi?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Construction-to-permanent loans, USDA rural development loans (for qualifying areas), and conventional construction loans are all available. We can connect you with Mississippi lenders who understand barndominium financing." } }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bradleybrowninc.com" },
        { "@type": "ListItem", "position": 2, "name": "Barndominium Builder", "item": "https://bradleybrowninc.com/barndominium-builder" },
        { "@type": "ListItem", "position": 3, "name": "Barndominium Cost — Mississippi", "item": "https://bradleybrowninc.com/barndominium-cost-mississippi" }
      ]
    }
  ]
};

const faqs = [
  { question: "How much does a barndominium cost in Mississippi?", answer: "Barndominium costs in Mississippi range from $75–$150+ per square foot. A 2,000 sq ft turnkey barndo typically costs $200,000–$300,000. Basic shells with rough-in start at $75/sq ft, while luxury finishes can exceed $150/sq ft. Call (844) 351-4154 for a free custom estimate." },
  { question: "What factors affect barndominium cost the most?", answer: "The biggest cost drivers are: total square footage, site prep (clearing, grading, driveway), slab thickness and concrete volume, insulation type (closed-cell spray foam is premium but worth it), interior finishes (cabinets, flooring, countertops), and add-ons like porches, lofts, or oversized garage bays." },
  { question: "Is a barndominium cheaper than a traditional custom home?", answer: "Yes — typically 20–40% cheaper per square foot. Steel framing goes up faster, requires less labor, and the exterior envelope costs less. A comparable traditional custom home in Mississippi runs $150–$250/sq ft vs. $75–$150/sq ft for a barndominium." },
  { question: "How much is the concrete slab for a barndominium?", answer: "A standard barndominium slab in Mississippi runs $4–$8 per square foot, depending on thickness (4\" vs 6\"), reinforcement, and whether you need a thicker apron for heavy equipment. A 2,400 sq ft slab typically costs $10,000–$19,000." },
  { question: "Can I finance a barndominium in Mississippi?", answer: "Yes. Construction-to-permanent loans, USDA rural development loans (for qualifying areas), and conventional construction loans are available. We work with Mississippi lenders who understand barndominium financing and can help connect you." },
  { question: "Does a barndominium hold its value in Mississippi?", answer: "Barndominiums have strong resale value in Mississippi, especially on acreage. Steel construction is durable and low-maintenance, and the combined living+shop layout is increasingly popular. Appraisals are improving as more comps become available." },
];

const costTiers = [
  {
    name: "Basic Shell + Rough-In",
    perSqFt: "$75 – $100",
    includes: ["Engineered steel building package", "Concrete slab (4\" reinforced)", "Framed & roughed-in plumbing/electrical", "Insulation (batt or blown)", "Exterior metal roof & walls", "Windows and exterior doors"],
    note: "You finish the interior yourself or hire us for the buildout.",
  },
  {
    name: "Full Turnkey Barndominium",
    perSqFt: "$100 – $150",
    includes: ["Everything in Basic, plus:", "Drywall, paint, and trim", "Kitchen cabinets & countertops", "Bathroom fixtures & tile", "Flooring (LVP, tile, or stained concrete)", "Lighting, ceiling fans, outlets", "Final walk-through & punch list"],
    note: "Move-in ready. The most popular option for Mississippi homeowners.",
    featured: true,
  },
  {
    name: "Luxury Finishes & Custom",
    perSqFt: "$150+",
    includes: ["Everything in Turnkey, plus:", "Closed-cell spray foam insulation", "Custom cabinetry & granite/quartz", "Hardwood or premium flooring", "Custom staircases & lofts", "Oversized porches & outdoor living", "Upgraded lighting & smart home"],
    note: "For homeowners who want a barndo that feels like a luxury custom home.",
  },
];

const trackCall = () => {
  base44.analytics.track({ eventName: "phone_click", properties: { source: "barndominium_cost_page" } });
  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", { send_to: "AW-17864041271/21TJCO2Bj5ccELfGnsZC", value: 30, currency: "USD" });
  }
};

export default function BarndominiumCost() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-16 md:pt-20">
      <SEOHead
        title="Barndominium Cost in Mississippi | Price Per Sq Ft — 2026 Guide"
        description="How much does a barndominium cost in Mississippi? Full cost breakdown per square foot: basic shell, turnkey, and luxury builds. Free estimates — call (844) 351-4154."
        schema={schema}
        canonical="https://bradleybrowninc.com/barndominium-cost-mississippi"
      />
      <StickyCallButton />

      <div className="sticky top-16 md:top-20 z-40 bg-green-600 text-white py-2.5 px-4 text-center text-sm font-semibold shadow">
        <a href={PHONE_HREF} onClick={trackCall} className="flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" /> Free Barndominium Cost Estimate: {PHONE}
        </a>
      </div>

      {/* HERO */}
      <section className="bg-[#1E2D3D] py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-green-400 text-xs font-semibold uppercase tracking-wider mb-2">Barndominium Cost Guide · Mississippi</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Barndominium Cost in Mississippi
          </h1>
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-base md:text-lg">
            Real cost ranges per square foot for Mississippi barndominium builds — from basic shell to luxury turnkey. No fluff, no bait pricing. Just what it costs to build on your land.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href={PHONE_HREF} onClick={trackCall} className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg">
              <Phone className="w-5 h-5" /> {PHONE}
            </a>
            <Link to={createPageUrl("QuoteAssistant")} className="flex items-center justify-center gap-2 bg-[#C4922A] hover:bg-[#A37820] text-white px-8 py-4 rounded-full font-bold text-lg transition-colors">
              <Calculator className="w-5 h-5" /> Get a Custom Estimate
            </Link>
          </div>
        </div>
      </section>

      {/* COST TIERS */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E2D3D]">Cost Per Square Foot — 3 Tiers</h2>
          <p className="text-slate-500 mt-2">Central Mississippi pricing for 2026 builds.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {costTiers.map((tier) => (
            <div key={tier.name} className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${tier.featured ? "border-green-400 ring-2 ring-green-400 md:scale-105" : "border-gray-100"}`}>
              {tier.featured && (
                <div className="bg-green-500 text-white text-center text-xs font-bold uppercase tracking-wider py-1.5">Most Popular</div>
              )}
              <div className="p-6">
                <h3 className="font-bold text-[#1E2D3D] text-lg">{tier.name}</h3>
                <p className="text-3xl font-black text-green-600 mt-2">{tier.perSqFt}<span className="text-sm font-medium text-slate-400"> /sq ft</span></p>
                <ul className="mt-5 space-y-2">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-slate-400 mt-4 italic">{tier.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COST FACTORS */}
      <section className="bg-slate-50 border-y border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
          <h2 className="text-2xl font-bold text-[#1E2D3D] mb-6">What Drives Barndominium Cost in Mississippi?</h2>
          <div className="space-y-5">
            {[
              { factor: "Size (Square Footage)", cost: "Linear — more sq ft = lower cost per sq ft", detail: "A 1,200 sq ft barndo costs more per sq ft than a 2,400 sq ft build because fixed costs (permits, mobilization, slab setup) spread across fewer feet." },
              { factor: "Site Prep & Access", cost: "$2,000 – $15,000+", detail: "Clearing, grading, driveway installation, and utility access. Rural acreage with existing road access is cheapest; raw land needs more prep." },
              { factor: "Concrete Slab", cost: "$4 – $8 / sq ft", detail: "4\" reinforced for living areas; 6\" for garage/workshop bays. Thicker slabs for heavy equipment add cost." },
              { factor: "Insulation", cost: "Batt: $1–$2/sq ft · Spray Foam: $3–$5/sq ft", detail: "Closed-cell spray foam is the premium choice for steel buildings — superior R-value and moisture barrier. Worth the investment in Mississippi's humidity." },
              { factor: "Interior Finishes", cost: "Varies widely", detail: "Cabinets, countertops, flooring, light fixtures, and bathroom tile are where you control the budget. We source at wholesale pricing to keep costs down." },
              { factor: "Porches & Add-Ons", cost: "$25 – $60 / sq ft", detail: "Covered porches, patios, and carports add per-square-foot cost but dramatically increase livability and resale value." },
            ].map((row) => (
              <div key={row.factor} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-[#1E2D3D] text-sm">{row.factor}</h3>
                  <span className="text-green-600 font-bold text-sm text-right">{row.cost}</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">{row.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXAMPLE BUILDS */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <h2 className="text-2xl font-bold text-[#1E2D3D] text-center mb-2">Example Barndominium Build Costs</h2>
        <p className="text-slate-500 text-center text-sm mb-8">Estimates based on Central Mississippi turnkey builds, 2026.</p>
        <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100">
          {[
            { size: "1,200 sq ft — Small Barndo (Living + 1-Car Shop)", low: "$120,000", high: "$180,000" },
            { size: "2,000 sq ft — Standard Barndo (3BR/2BA + Garage)", low: "$200,000", high: "$300,000" },
            { size: "2,400 sq ft — Large Barndo (Living + Workshop + RV Bay)", low: "$240,000", high: "$360,000" },
            { size: "3,200 sq ft — Luxury Barndo (Custom Layout + Porches)", low: "$320,000", high: "$480,000+" },
          ].map((row, i) => (
            <div key={row.size} className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 gap-2 ${i < 3 ? "border-b border-gray-100" : ""}`}>
              <span className="text-sm text-[#1E2D3D] font-semibold">{row.size}</span>
              <span className="text-green-600 font-black text-sm md:text-base">{row.low} – {row.high}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 border-y border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E2D3D]">Barndominium Cost FAQs</h2>
          </div>
          <LandingFAQ faqs={faqs} />
          <div className="mt-8 text-center">
            <Link to="/barndominium-builder" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold text-sm transition-colors">
              <ChevronRight className="w-4 h-4" /> Back to Barndominium Builder Page
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-br from-green-600 to-green-700 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
            Want a Custom Cost Estimate for Your Land?
          </h2>
          <p className="text-green-50 mt-3 text-base md:text-lg max-w-xl mx-auto">
            Tell us your acreage, desired size, and finish level — we'll give you a fixed written price. Free, no obligation.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href={PHONE_HREF} onClick={trackCall} className="flex items-center justify-center gap-2 bg-white text-green-700 px-8 py-4 rounded-full font-black text-base md:text-lg shadow-xl hover:bg-slate-100 transition-colors">
              <Phone className="w-5 h-5" /> Call {PHONE}
            </a>
            <Link to={createPageUrl("QuoteAssistant")} className="flex items-center justify-center gap-2 bg-[#C4922A] hover:bg-[#A37820] text-white px-8 py-4 rounded-full font-black text-base md:text-lg shadow-xl transition-colors">
              <Calculator className="w-5 h-5" /> Get My Estimate
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}