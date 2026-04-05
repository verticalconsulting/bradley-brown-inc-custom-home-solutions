import React from "react";
import { Phone, AlertTriangle, CheckCircle, Clock } from "lucide-react";
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
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      "name": "Bradley Brown Inc.",
      "telephone": "+16019541306",
      "address": { "@type": "PostalAddress", "addressLocality": "Brandon", "addressRegion": "MS", "postalCode": "39042", "addressCountry": "US" },
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:00", "closes": "18:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday"], "opens": "09:00", "closes": "15:00" }
      ]
    },
    {
      "@type": "Service",
      "name": "Emergency Home Repair",
      "provider": { "@type": "LocalBusiness", "name": "Bradley Brown Inc." },
      "areaServed": "Brandon, MS and surrounding 50-mile radius"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bradleybrowninc.com" },
        { "@type": "ListItem", "position": 2, "name": "Emergency Repair", "item": "https://bradleybrowninc.com/LandingEmergencyRepair" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Do you handle emergency home repairs?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Call (601) 954-1306 during business hours (Mon–Fri 8am–6pm, Sat 9am–3pm). We prioritize urgent repair calls and can often schedule same-week service." } },
        { "@type": "Question", "name": "What counts as an emergency repair?", "acceptedAnswer": { "@type": "Answer", "text": "Storm damage, roof leaks, structural cracks, water intrusion, broken windows, and anything that risks your home's safety or habitability." } }
      ]
    }
  ]
};

const faqs = [
  { question: "Do you handle emergency home repairs?", answer: "Yes. Call (601) 954-1306 during business hours — Mon–Fri 8am–6pm and Sat 9am–3pm. We prioritize urgent calls and work to schedule same-week or next-day service for serious issues." },
  { question: "What types of urgent repairs do you handle?", answer: "Storm damage, roof leaks, water intrusion, structural damage, broken windows, foundation cracks, collapsed ceilings, and fire/flood damage repairs." },
  { question: "How quickly can you respond?", answer: "For urgent situations, call us directly at (601) 954-1306 for the fastest response. We'll assess the situation and get someone out as quickly as possible." },
  { question: "Do you work with insurance companies?", answer: "Yes, we have experience working with homeowner insurance claims for storm and water damage. We can document the damage and provide itemized estimates for your adjuster." },
  { question: "Are you licensed for structural repairs in Mississippi?", answer: "Yes — Bradley Brown Inc. is a licensed Mississippi General Contractor with 30+ years of experience, fully qualified for all structural and major repair work." },
];

export default function LandingEmergencyRepair() {
  const handleCall = () => base44.analytics.track({ eventName: "phone_click", properties: { source: "emergency_landing" } });

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-16 md:pt-20">
      <SEOHead
        title="Emergency Home Repairs — Call Bradley Brown Now"
        description="Urgent home repairs in Brandon, MS — storm damage, leaks & structural issues. Call (601) 954-1306 for fast response."
        schema={schema}
      />
      <StickyCallButton />

      {/* Urgent top banner */}
      <div className="sticky top-16 md:top-20 z-40 bg-red-600 text-white py-2 px-4 text-center text-sm font-semibold">
        <a href="tel:+16019541306" onClick={handleCall} className="flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4" /> Urgent? Call Now: (601) 954-1306 — Hours: Mon–Fri 8am–6pm, Sat 9am–3pm
        </a>
      </div>

      {/* Hero */}
      <div className="bg-[#1E2D3D] py-14 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80')" }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-400/40 rounded-full px-3 py-1 mb-3">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span className="text-red-300 text-xs font-medium">Urgent Repair Service</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Emergency Home Repairs —<br className="hidden md:block" /> Call Bradley Brown Now
          </h1>
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-base md:text-lg">
            Storm damage, roof leaks, structural issues — don't wait. Bradley Brown Inc. responds fast to urgent repairs across Brandon, MS and Central Mississippi.
          </p>
          <a href="tel:+16019541306" onClick={handleCall} className="mt-8 inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-10 py-4 rounded-full font-bold text-xl transition-colors shadow-xl">
            <Phone className="w-6 h-6" /> Call Now: (601) 954-1306
          </a>
          <p className="text-slate-400 text-xs mt-3">Mon–Fri 8am–6pm · Sat 9am–3pm · Same-week service available</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-14">

        {/* Hours notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
          <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800 text-sm">Business Hours for Urgent Calls</p>
            <p className="text-amber-700 text-sm mt-1">Mon–Fri: 8:00am – 6:00pm · Saturday: 9:00am – 3:00pm · For after-hours emergencies, leave a voicemail and we'll call back first thing.</p>
          </div>
        </div>

        {/* Local proof */}
        <LocalProofPoints />

        {/* Repair types */}
        <div>
          <h2 className="text-2xl font-bold text-[#1E2D3D] mb-6">Urgent Repairs We Handle</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Storm & wind damage repair",
              "Roof leak patching & replacement",
              "Water intrusion & flood damage",
              "Structural wall & foundation cracks",
              "Ceiling collapse & drywall damage",
              "Broken windows & door frames",
              "Fire & smoke damage restoration",
              "Siding damage & weatherproofing",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-sm text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Body copy */}
        <div className="prose prose-slate max-w-none">
          <h2 className="text-xl font-bold text-[#1E2D3D]">Mississippi's Trusted Emergency Repair Contractor</h2>
          <p className="text-slate-600 leading-relaxed">When your home is damaged, every hour matters. Bradley Brown Inc. has been responding to urgent repair calls across Central Mississippi since 1995. Our licensed crews know how to assess damage quickly, stabilize the situation, and get to work immediately.</p>
          <p className="text-slate-600 leading-relaxed">We handle insurance documentation, itemized repair estimates, and full restoration — so you can focus on your family while we handle the job. We serve Brandon, Flowood, Pearl, Jackson, Madison, Ridgeland, and all surrounding areas.</p>
          <p className="text-slate-600 leading-relaxed">Call <a href="tel:+16019541306" onClick={handleCall} className="text-red-600 font-semibold">(601) 954-1306</a> right now to speak with a team member.</p>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-xl font-bold text-[#1E2D3D] mb-6 text-center">Frequently Asked Questions</h2>
          <LandingFAQ faqs={faqs} />
        </div>
      </div>

      <LandingCTABar headline="Don't wait — call now for urgent repairs." />
    </div>
  );
}