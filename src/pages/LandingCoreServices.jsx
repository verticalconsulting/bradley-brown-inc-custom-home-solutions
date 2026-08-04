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

const faqs = [
  { question: "How long does a kitchen remodel take?", answer: "Most kitchen remodels take 4–8 weeks depending on scope. We provide a detailed timeline before work begins so you always know what to expect." },
  { question: "Do you serve Brandon, MS and surrounding areas?", answer: "Yes — we're centrally located and serve Brandon, Madison, Jackson, Flowood, Pearl, Ridgeland, Clinton, and the wider 50-mile radius." },
  { question: "What licenses does Bradley Brown Inc. hold for Mississippi remodeling?", answer: "Bradley Brown Inc. is a licensed Mississippi General Contractor (license #08290) with full liability insurance and workers' comp on every job. We pull all required permits for remodeling projects statewide." },
  { question: "What energy-efficient upgrades do you offer?", answer: "We install energy-efficient windows, upgrade insulation, improve HVAC airflow, and can frame for solar-readiness — all in one project." },
  { question: "How do I get a free remodeling estimate in Mississippi?", answer: "Call us at (844) 351-4154 or use our online estimate tool for a free, no-obligation project estimate. We serve homeowners across Central Mississippi." },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HomeAndConstructionBusiness",
      "name": "Bradley Brown Inc.",
      "telephone": "+18443514154",
      "email": "bradleybrowninc@gmail.com",
      "url": "https://bradleybrowninc.com",
      "address": { "@type": "PostalAddress", "addressLocality": "Brandon", "addressRegion": "MS", "postalCode": "39042", "addressCountry": "US" },
      "geo": { "@type": "GeoCoordinates", "latitude": 32.2729, "longitude": -89.9923 },
      "priceRange": "$$$",
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:00", "closes": "18:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday"], "opens": "09:00", "closes": "15:00" }
      ],
      "sameAs": ["https://www.facebook.com/BradleyBrownInc", "https://www.tiktok.com/@bb859876"]
    },
    {
      "@type": "Service",
      "name": "Home Remodeling & Renovation",
      "provider": { "@type": "HomeAndConstructionBusiness", "name": "Bradley Brown Inc." },
      "areaServed": "Brandon, MS and surrounding 50-mile radius",
      "description": "Kitchen renovation, bathroom remodeling, whole-home renovations, and energy-efficient upgrades in the Brandon and Rankin County area."
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bradleybrowninc.com" },
        { "@type": "ListItem", "position": 2, "name": "Core Services", "item": "https://bradleybrowninc.com/remodeling-ms" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.question, "acceptedAnswer": { "@type": "Answer", "text": f.answer } }))
    }
  ]
};

export default function LandingCoreServices() {
  const handleCall = () => base44.analytics.track({ eventName: "phone_click", properties: { source: "core_services_landing" } });

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-16 md:pt-20">
      <SEOHead
        title="Home Remodeling in Mississippi | Bradley Brown Inc"
        description="Mississippi home remodelers — kitchen, bath & whole-home renovations across Central MS. Licensed since 1995. Free estimates — call (844) 351-4154."
        schema={schema}
        canonical="https://bradleybrowninc.com/remodeling-ms"
      />
      <StickyCallButton />

      {/* Top sticky call bar */}
      <div className="sticky top-16 md:top-20 z-40 bg-green-500 text-white py-2 px-4 text-center text-sm font-semibold">
        <a href="tel:+18443514154" onClick={handleCall} className="flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" /> Call Now: (844) 351-4154 — Free Estimates, Mon–Fri 8am–6pm
        </a>
      </div>

      {/* Hero */}
      <div className="bg-[#1E2D3D] py-14 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80')" }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sky-400 text-xs font-semibold uppercase tracking-wider mb-2">Brandon, MS & Surrounding Areas</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Home Remodeling in Brandon, MS<br className="hidden md:block" /> — Done Right
          </h1>
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-base md:text-lg">
            Kitchen renovations, bathroom remodels, whole-home upgrades, and energy-efficient improvements. Licensed. Insured. 30+ years of Mississippi craftsmanship.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+18443514154" onClick={handleCall} className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg">
              <Phone className="w-5 h-5" /> (844) 351-4154
            </a>
            <Link to="/estimate" className="flex items-center justify-center gap-2 bg-sky-400 hover:bg-sky-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors">
              Free Estimate <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-14">

        {/* Local proof */}
        <LocalProofPoints />

        {/* Services list */}
        <div>
          <h2 className="text-2xl font-bold text-[#1E2D3D] mb-6">Our Remodeling Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Kitchen Renovation", desc: "Custom cabinets, countertops, islands, and full kitchen redesigns starting at $25,000." },
              { title: "Bathroom Remodeling", desc: "Master bath overhauls, tile work, vanities, and walk-in showers from $10,000." },
              { title: "Whole-Home Renovation", desc: "Complete interior renovations matching your lifestyle and budget. Get a custom quote." },
              { title: "Energy-Efficient Upgrades", desc: "Insulation, windows, and air-sealing upgrades that lower your utility bills year-round." },
              { title: "Room Additions", desc: "Seamless additions that expand your living space without compromising your home's look." },
              { title: "Outdoor Living", desc: "Patios, decks, pergolas, and outdoor kitchens — perfect for Mississippi living." },
            ].map((s) => (
              <div key={s.title} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-[#1E2D3D] text-sm">{s.title}</h3>
                  <p className="text-slate-500 text-xs mt-1 leading-snug">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Body copy */}
        <div className="prose prose-slate max-w-none">
          <h2 className="text-xl font-bold text-[#1E2D3D]">Why Brandon, MS Homeowners Choose Bradley Brown Inc.</h2>
          <p className="text-slate-600 leading-relaxed">Since 1995, Bradley Brown Inc. has been the contractor Brandon and Rankin County area homeowners trust for quality remodeling work. Whether you're updating a single bathroom or transforming your entire home, our team brings the same level of craftsmanship and attention to detail to every project.</p>
          <p className="text-slate-600 leading-relaxed">We serve Brandon, Flowood, Pearl, Richland, Madison, Ridgeland, and all of Rankin, Hinds, and Madison counties. Every estimate is free, every quote is transparent, and every project is backed by our quality guarantee.</p>
          <p className="text-slate-600 leading-relaxed">From energy-efficient window replacements to complete kitchen gut-and-rebuilds, we handle it all with licensed tradespeople and a project manager on-site every day. Call us at <a href="tel:+18443514154" onClick={handleCall} className="text-sky-600 font-semibold">(844) 351-4154</a> to schedule your free consultation.</p>
        </div>

        {/* Local internal links */}
        <div className="bg-white border border-sky-100 rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold text-[#1E2D3D] mb-3">Looking for a Local Brandon, MS Contractor?</h2>
          <p className="text-slate-600 leading-relaxed mb-5">
            Bradley Brown Inc. serves homeowners across Mississippi, with a strong local focus on Brandon and Rankin County.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/remodeling-brandon-ms"
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-full font-semibold text-sm transition-colors"
            >
              Home Remodeling in Brandon, MS <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              to="/custom-home-builder-brandon-ms"
              className="inline-flex items-center gap-2 bg-[#1E2D3D] hover:bg-[#2C3E50] text-white px-5 py-3 rounded-full font-semibold text-sm transition-colors"
            >
              Custom Home Builder in Brandon, MS <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              to="/madison-ms-home-remodeling"
              className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-5 py-3 rounded-full font-semibold text-sm transition-colors"
            >
              Home Remodeling in Madison, MS <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              to="/bathroom-remodeling-brandon-ms"
              className="inline-flex items-center gap-2 bg-[#C4922A] hover:bg-[#A37820] text-white px-5 py-3 rounded-full font-semibold text-sm transition-colors"
            >
              Bathroom Remodeling — Brandon, MS <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-xl font-bold text-[#1E2D3D] mb-6 text-center">Frequently Asked Questions</h2>
          <LandingFAQ faqs={faqs} />
        </div>
      </div>

      <LandingCTABar headline="Ready to remodel? Let's talk." />
    </div>
  );
}