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
import { usePageImages } from "@/lib/usePageImages";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      "name": "Bradley Brown Inc.",
      "telephone": "+18443514154",
      "email": "bradleybrowninc@gmail.com",
      "url": "https://bradleybrowninc.com/madison-ms-home-remodeling",
      "address": { "@type": "PostalAddress", "streetAddress": "104 Tiffany Drive", "addressLocality": "Brandon", "addressRegion": "MS", "postalCode": "39042", "addressCountry": "US" },
      "geo": { "@type": "GeoCoordinates", "latitude": 32.4635, "longitude": -90.0219 },
      "areaServed": { "@type": "City", "name": "Madison, Mississippi" },
      "priceRange": "$$",
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "87", "bestRating": "5" }
    },
    {
      "@type": "Service",
      "name": "Home Remodeling in Madison, MS",
      "provider": { "@type": "LocalBusiness", "name": "Bradley Brown Inc." },
      "areaServed": { "@type": "City", "name": "Madison, Mississippi" },
      "description": "Kitchen renovations, bathroom remodeling, room additions, and whole-home renovations in Madison, MS — by a licensed Mississippi contractor since 1995."
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bradleybrowninc.com" },
        { "@type": "ListItem", "position": 2, "name": "Madison, MS Home Remodeling", "item": "https://bradleybrowninc.com/madison-ms-home-remodeling" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Do you serve Madison, MS for home remodeling?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Bradley Brown Inc. serves Madison, Ridgeland, Gluckstadt, and the entire Madison County area — just a short drive from our Brandon headquarters. We've completed numerous kitchen, bath, and addition projects in Madison." } },
        { "@type": "Question", "name": "How much does a bathroom remodel cost in Madison, MS?", "acceptedAnswer": { "@type": "Answer", "text": "Bathroom remodels in Madison typically range from $10,000–$30,000 depending on size, tile selection, and fixture upgrades. Call (844) 351-4154 for a free estimate." } },
        { "@type": "Question", "name": "Are you licensed to work in Madison, MS?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Bradley Brown Inc. is a licensed Mississippi General Contractor with full liability insurance. We pull all required permits for Madison and Madison County projects." } }
      ]
    }
  ]
};

const faqs = [
  { question: "Do you serve Madison, MS for home remodeling?", answer: "Yes. Bradley Brown Inc. serves Madison, Ridgeland, Gluckstadt, and the wider Madison County area. We're based in Brandon — just 20 minutes away — and have completed numerous kitchen, bath, and addition projects throughout Madison." },
  { question: "How much does a bathroom remodel cost in Madison, MS?", answer: "Bathroom remodels in Madison typically range from $10,000–$30,000. Small guest baths start around $8,000, while master suite renovations with custom tile and premium fixtures can reach $40,000+. Every estimate is free and in writing." },
  { question: "How long does a kitchen remodel take in Madison?", answer: "Most kitchen remodels take 4–8 weeks depending on scope. We provide a detailed timeline before work begins so you always know what to expect." },
  { question: "Are you licensed to work in Madison, MS?", answer: "Yes. Bradley Brown Inc. is a licensed Mississippi General Contractor with full liability insurance and workers' comp. We pull all required permits for Madison and Madison County projects." },
  { question: "Do you offer free estimates in Madison?", answer: "Yes. Call (844) 351-4154 to schedule a free in-home consultation in Madison, or use our online Quote Assistant for a quick estimate." },
];

export default function MadisonRemodeling() {
  const handleCall = () => {
    base44.analytics.track({ eventName: "phone_click", properties: { source: "madison_remodeling_page" } });
    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", { send_to: "AW-17864041271/21TJCO2Bj5ccELfGnsZC", value: 30, currency: "USD" });
    }
  };
  const { hero: heroImage } = usePageImages("MadisonRemodeling");

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-16 md:pt-20">
      <SEOHead
        title="Home Remodeling in Madison, MS | Bradley Brown Inc"
        description="Madison, MS home remodeling — kitchen, bath, additions & whole-home renovations. Licensed & insured since 1995. Free estimates — call (844) 351-4154."
        schema={schema}
        canonical="https://bradleybrowninc.com/madison-ms-home-remodeling"
      />
      <StickyCallButton />

      <div className="sticky top-16 md:top-20 z-40 bg-green-500 text-white py-2 px-4 text-center text-sm font-semibold">
        <a href="tel:+18443514154" onClick={handleCall} className="flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" /> Call Now: (844) 351-4154 — Free Estimates in Madison, MS
        </a>
      </div>

      {/* Hero */}
      <div className="bg-[#1E2D3D] py-14 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: `url('${heroImage?.url || "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80"}')` }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sky-400 text-xs font-semibold uppercase tracking-wider mb-2">Madison, MS & Madison County</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Home Remodeling in Madison, MS<br className="hidden md:block" /> — Done Right
          </h1>
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-base md:text-lg">
            Kitchen renovations, bathroom remodels, room additions, and whole-home upgrades. Licensed. Insured. 30+ years of Mississippi craftsmanship — serving Madison from our Brandon headquarters.
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-14">
        {/* Local proof */}
        <LocalProofPoints />

        {/* Services */}
        <div>
          <h2 className="text-2xl font-bold text-[#1E2D3D] mb-6">Our Remodeling Services in Madison</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Kitchen Renovation", desc: "Custom cabinets, quartz countertops, islands, and full kitchen redesigns starting at $25,000.", link: "/services" },
              { title: "Bathroom Remodeling", desc: "Walk-in showers, tub-to-shower conversions, tile work, and vanities from $10,000.", link: "/bathroom-remodeling-brandon-ms" },
              { title: "Room Additions", desc: "Master suites, in-law suites, sunrooms, and home office additions that blend seamlessly.", link: "/services" },
              { title: "Whole-Home Renovation", desc: "Complete interior renovations matching your lifestyle and budget. Custom quote.", link: "/estimate" },
            ].map((s) => (
              <div key={s.title} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-[#1E2D3D] text-sm">{s.title}</h3>
                  <p className="text-slate-500 text-xs mt-1 leading-snug">{s.desc}</p>
                  <Link to={s.link} className="inline-flex items-center gap-1 text-sky-600 text-xs font-semibold mt-2 hover:text-sky-500">
                    Learn More <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Body copy */}
        <div className="prose prose-slate max-w-none">
          <h2 className="text-xl font-bold text-[#1E2D3D]">Why Madison Homeowners Choose Bradley Brown Inc.</h2>
          <p className="text-slate-600 leading-relaxed">Madison, Mississippi is one of the fastest-growing cities in the state, and homeowners here expect quality. Since 1995, Bradley Brown Inc. has served the Madison County area with the same craftsmanship and attention to detail that built our reputation in Brandon — just 20 minutes down the road.</p>
          <p className="text-slate-600 leading-relaxed">From kitchen renovations in Strawberry Park to bathroom remodels in Reunion, room additions in Gluckstadt, and whole-home renovations throughout Madison County, our team brings licensed tradespeople, transparent pricing, and a project manager on-site every day. We pull all Madison County permits and handle inspections.</p>
          <p className="text-slate-600 leading-relaxed">Whether you're updating a master bath, building a kitchen island, or adding an in-law suite, we deliver on time and on budget. Call us at <a href="tel:+18443514154" onClick={handleCall} className="text-sky-600 font-semibold">(844) 351-4154</a> to schedule your free Madison consultation.</p>
        </div>

        {/* Internal links */}
        <div className="bg-white border border-sky-100 rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold text-[#1E2D3D] mb-3">Serving All of Central Mississippi</h2>
          <p className="text-slate-600 leading-relaxed mb-5">
            We serve Madison, Brandon, Ridgeland, Flowood, Pearl, Clinton, Gluckstadt, and the wider Rankin and Madison County area.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/bathroom-remodeling-brandon-ms" className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-full font-semibold text-sm transition-colors">
              Bathroom Remodeling <ChevronRight className="w-4 h-4" />
            </Link>
            <Link to="/remodeling-ms" className="inline-flex items-center gap-2 bg-[#1E2D3D] hover:bg-[#2C3E50] text-white px-5 py-3 rounded-full font-semibold text-sm transition-colors">
              Core Services — Brandon, MS <ChevronRight className="w-4 h-4" />
            </Link>
            <Link to="/custom-home-builder-brandon-ms" className="inline-flex items-center gap-2 bg-[#C4922A] hover:bg-[#A37820] text-white px-5 py-3 rounded-full font-semibold text-sm transition-colors">
              Custom Home Builder <ChevronRight className="w-4 h-4" />
            </Link>
            <Link to="/services/barndominiums" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full font-semibold text-sm transition-colors">
              Barndominium Builder <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-xl font-bold text-[#1E2D3D] mb-6 text-center">Frequently Asked Questions</h2>
          <LandingFAQ faqs={faqs} />
        </div>
      </div>

      <LandingCTABar headline="Ready to remodel in Madison? Let's talk." />
    </div>
  );
}