import React from "react";
import { Phone, DollarSign, CheckCircle, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import SEOHead from "@/components/SEOHead";
import LandingCTABar from "@/components/landing/LandingCTABar";
import LocalProofPoints from "@/components/landing/LocalProofPoints";
import LandingFAQ from "@/components/landing/LandingFAQ";
import StickyCallButton from "@/components/StickyCallButton";
import BudgetTierBreakdown from "@/components/pricing/BudgetTierBreakdown";
import { base44 } from "@/api/base44Client";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HomeAndConstructionBusiness",
      "name": "Bradley Brown Inc.",
      "telephone": "+18443514154",
      "address": { "@type": "PostalAddress", "streetAddress": "104 Tiffany Drive", "addressLocality": "Brandon", "addressRegion": "MS", "postalCode": "39042", "addressCountry": "US" },
      "geo": { "@type": "GeoCoordinates", "latitude": 32.2729, "longitude": -89.9923 },
      "foundingDate": "1995",
      "priceRange": "$$$",
      "sameAs": ["https://www.facebook.com/BradleyBrownInc", "https://www.tiktok.com/@bb859876", "https://www.bbb.org"],
      "areaServed": [{ "@type": "City", "name": "Brandon, Mississippi" }, { "@type": "AdministrativeArea", "name": "Rankin County, Mississippi" }]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bradleybrowninc.com" },
        { "@type": "ListItem", "position": 2, "name": "Pricing", "item": "https://bradleybrowninc.com/home-remodeling-cost" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "How much does a home renovation cost in Mississippi?", "acceptedAnswer": { "@type": "Answer", "text": "Renovation costs in the Brandon and Rankin County area typically range from $50–$150 per sq ft depending on scope and materials. Kitchen remodels start around $25,000 and bathrooms from $10,000. Call us for a free, detailed estimate specific to your home." } },
        { "@type": "Question", "name": "Do you offer financing options?", "acceptedAnswer": { "@type": "Answer", "text": "We can discuss flexible payment schedules on larger projects. Call (844) 351-4154 to talk through options." } }
      ]
    }
  ]
};

const pricing = [
  { service: "Custom Home Building", range: "$150–$250 / sq ft", note: "Full design-build from foundation to finish" },
  { service: "Kitchen Remodel", range: "$25,000–$100,000+", note: "Cabinets, countertops, appliances, flooring" },
  { service: "Bathroom Remodel", range: "$10,000–$50,000", note: "Tile, vanities, fixtures, walk-in showers" },
  { service: "Room Addition", range: "$100–$200 / sq ft", note: "Seamless addition matching your home's style" },
  { service: "Whole-Home Renovation", range: "$50–$150 / sq ft", note: "Interior gut-and-rebuild or selective updates" },
  { service: "Outdoor Living / Deck", range: "$15,000–$80,000", note: "Patios, pergolas, outdoor kitchens" },
  { service: "Barndominium / Man Cave", range: "$75–$150 / sq ft", note: "Custom specialty builds" },
];

const faqs = [
  { question: "How much does a home renovation cost in Mississippi?", answer: "Renovation costs in the Brandon and Rankin County area typically range from $50–$150 per sq ft. Kitchen remodels start at $25,000 and bathrooms from $10,000. The best way to know is to call us at (844) 351-4154 — estimates are always free." },
  { question: "Why isn't your pricing more specific?", answer: "Every home is different. Costs depend on design choices, existing conditions, materials, and site access. We give transparent, itemized quotes — not ballpark guesses — after seeing your project in person." },
  { question: "How do you price a project?", answer: "We visit your home, review your goals, and build a detailed line-item estimate. You'll see exactly what you're paying for before any work begins." },
  { question: "Do you offer any warranties?", answer: "Yes. We stand behind our work. All projects include a workmanship warranty, and material warranties pass through directly from manufacturers." },
  { question: "Can I get a rough estimate online?", answer: "Yes — use our AI-powered Quote Assistant for a ballpark estimate, then call us to refine it with a site visit." },
];

export default function LandingPricing() {
  const handleCall = () => base44.analytics.track({ eventName: "phone_click", properties: { source: "pricing_landing" } });

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-16 md:pt-20">
      <SEOHead
        title="Home Remodeling Cost in Brandon, MS — Bradley Brown"
        description="Transparent pricing for kitchens, baths & custom homes in Brandon, MS. See cost ranges for every project type. Licensed & insured since 1995. Free estimates — call (844) 351-4154."
        schema={schema}
        canonical="https://bradleybrowninc.com/home-remodeling-cost"
      />
      <StickyCallButton />

      <div className="sticky top-16 md:top-20 z-40 bg-green-500 text-white py-2 px-4 text-center text-sm font-semibold">
        <a href="tel:+18443514154" onClick={handleCall} className="flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" /> Free Estimates — Call (844) 351-4154
        </a>
      </div>

      {/* Hero */}
      <div className="bg-[#1E2D3D] py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-sky-400/20 border border-sky-400/40 rounded-full px-3 py-1 mb-3">
            <DollarSign className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-sky-300 text-xs font-medium">Transparent Pricing</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            How Much Does Home Remodeling<br className="hidden md:block" /> Cost in Brandon, MS?
          </h1>
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-base md:text-lg">
            Honest, transparent pricing ranges — and free detailed estimates for your specific project.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+18443514154" onClick={handleCall} className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg">
              <Phone className="w-5 h-5" /> Call for Free Estimate
            </a>
            <Link to={createPageUrl("QuoteAssistant")} className="flex items-center justify-center gap-2 bg-sky-400 hover:bg-sky-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors">
              Online Quote <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-14">

        {/* Pricing table */}
        <div>
          <h2 className="text-2xl font-bold text-[#1E2D3D] mb-2">Starting Price Ranges</h2>
          <p className="text-slate-500 text-sm mb-6">All figures are typical ranges for the Brandon and Rankin County area. Your actual cost depends on scope, materials, and site conditions. <strong>Estimates are always free.</strong></p>
          <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-[#1E2D3D] text-white">
                <tr>
                  <th className="text-left p-4 font-semibold">Service</th>
                  <th className="text-left p-4 font-semibold">Starting Range</th>
                  <th className="text-left p-4 font-semibold hidden sm:table-cell">Includes</th>
                </tr>
              </thead>
              <tbody>
                {pricing.map((row, i) => (
                  <tr key={row.service} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-4 font-medium text-slate-800">{row.service}</td>
                    <td className="p-4 text-sky-700 font-semibold">{row.range}</td>
                    <td className="p-4 text-slate-500 hidden sm:table-cell">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-3">* These are illustrative estimates only. Not a quote or guarantee. Call for accurate pricing specific to your project.</p>
        </div>

        {/* Three-tier budget breakdown */}
        <BudgetTierBreakdown />

        {/* How we price */}
        <div>
          <h2 className="text-2xl font-bold text-[#1E2D3D] mb-4">How We Price Your Project</h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "Free Site Visit", desc: "We come to you — no charge. We walk through your home and listen to your goals." },
              { step: "2", title: "Detailed Line-Item Quote", desc: "You get a written, itemized estimate — no vague numbers. You'll know exactly where your money goes." },
              { step: "3", title: "No Surprises Policy", desc: "We don't add costs after the fact. Any change orders are discussed and approved by you before work begins." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <div className="w-8 h-8 bg-sky-400 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white text-sm">{item.step}</div>
                <div>
                  <h3 className="font-bold text-[#1E2D3D] text-sm mb-1">{item.title}</h3>
                  <p className="text-slate-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <LocalProofPoints />

        {/* FAQ */}
        <div>
          <h2 className="text-xl font-bold text-[#1E2D3D] mb-6 text-center">Pricing FAQs</h2>
          <LandingFAQ faqs={faqs} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-10">
        <div className="bg-slate-50 border border-gray-200 rounded-xl p-5">
          <h3 className="font-bold text-[#1E2D3D] text-sm mb-3">Related Pages</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "View All Services", page: "Services" },
              { label: "Our Portfolio", page: "Portfolio" },
              { label: "Schedule a Site Visit", page: "ScheduleVisit" },
              { label: "AI Estimator", page: "QuoteAssistant" },
              { label: "Renovation Loans", page: "RenovationLoans" },
              { label: "Home Addition Ideas", page: "HomeAdditionIdeas" },
              { label: "Small Bathroom Ideas", page: "SmallBathroomIdeas" },
              { label: "About Us", page: "About" },
              { label: "Contact Us", page: "Contact" },
            ].map((link) => (
              <Link key={link.page} to={createPageUrl(link.page)} className="inline-flex items-center gap-1 bg-white border border-gray-200 text-sky-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-sky-50 transition-colors">
                <ChevronRight className="w-3 h-3" /> {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <LandingCTABar headline="Get your free, no-obligation estimate today." />
    </div>
  );
}