import React from "react";
import { Phone, Award, Shield, Star, CheckCircle, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import SEOHead from "@/components/SEOHead";
import LandingCTABar from "@/components/landing/LandingCTABar";
import LandingFAQ from "@/components/landing/LandingFAQ";
import StickyCallButton from "@/components/StickyCallButton";
import { base44 } from "@/api/base44Client";

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c758479c46f0580553750/0990d7b76_bradleybrowninc-logo2.png";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      "name": "Bradley Brown Inc.",
      "telephone": "+16019541306",
      "address": { "@type": "PostalAddress", "addressLocality": "Brandon", "addressRegion": "MS", "postalCode": "39042", "addressCountry": "US" },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "87", "bestRating": "5" },
      "sameAs": ["https://www.facebook.com/BradleyBrownInc", "https://www.tiktok.com/@bb859876", "https://www.bbb.org"]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://custom-home-builder.bradleybrowninc.com" },
        { "@type": "ListItem", "position": 2, "name": "Why Trust Us", "item": "https://custom-home-builder.bradleybrowninc.com/LandingTrust" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Is Bradley Brown Inc. licensed in Mississippi?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We are a licensed Mississippi General Contractor (MC-2024), fully insured with liability and workers' compensation coverage." } },
        { "@type": "Question", "name": "Is Bradley Brown Inc. a BBB accredited business?", "acceptedAnswer": { "@type": "Answer", "text": "We maintain membership with the Better Business Bureau and uphold their standards of ethical business conduct." } }
      ]
    },
    {
      "@type": "Review",
      "itemReviewed": { "@type": "LocalBusiness", "name": "Bradley Brown Inc." },
      "author": { "@type": "Person", "name": "Sarah M." },
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "reviewBody": "Bradley Brown built our custom home in Brandon and the craftsmanship is incredible. 10/10 would recommend."
    }
  ]
};

const testimonials = [
  { name: "Sarah M.", location: "Brandon, MS", text: "Bradley Brown built our custom home in Brandon and the craftsmanship is incredible. Every detail was perfect. 10/10 would recommend.", rating: 5, project: "Custom Home" },
  { name: "James T.", location: "Flowood, MS", text: "Renovated our entire kitchen and two bathrooms. On time, on budget, and the quality is outstanding. We've already referred three neighbors.", rating: 5, project: "Kitchen & Bath Remodel" },
  { name: "Karen L.", location: "Madison, MS", text: "The most professional contractor we've ever worked with. They treated our home like it was their own. Zero regrets.", rating: 5, project: "Whole-Home Renovation" },
  { name: "Mike R.", location: "Pearl, MS", text: "Brad's crew built our outdoor living space and screened porch. Best investment we've made. Outstanding work.", rating: 5, project: "Outdoor Living" },
  { name: "Lisa P.", location: "Ridgeland, MS", text: "Honest, transparent, and genuinely talented builders. Our room addition came in on budget and looks like it was always part of the house.", rating: 5, project: "Room Addition" },
  { name: "David H.", location: "Jackson, MS", text: "I've used Bradley Brown twice now. First a bathroom remodel, then a full kitchen gut. Both times — perfect results.", rating: 5, project: "Remodeling" },
];

const badges = [
  { name: "Licensed & Insured", img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c758479c46f0580553750/a21f22f37_licensed-insured.png" },
  { name: "MS Board of Contractors", img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c758479c46f0580553750/f98532894_ms-contractor.png" },
  { name: "Home Builders Association of MS", img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c758479c46f0580553750/103c2c527_mshba.png" },
  { name: "NAHB", img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c758479c46f0580553750/532a0ecba_nahb.png" },
  { name: "Better Business Bureau", img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c758479c46f0580553750/f47b53e12_bbb.png" },
];

const faqs = [
  { question: "Is Bradley Brown Inc. licensed in Mississippi?", answer: "Yes. We are a licensed Mississippi General Contractor, fully insured with general liability and workers' compensation coverage on every project." },
  { question: "How long have you been in business?", answer: "Since 1995 — over 30 years serving Central Mississippi homeowners. We've built and renovated 500+ homes in the area." },
  { question: "Do you have references I can call?", answer: "Absolutely. Call us at (601) 954-1306 and we'll connect you with past clients in your area who are happy to share their experience." },
  { question: "What warranty do you offer?", answer: "We provide a workmanship warranty on all our projects. Material warranties pass through directly from manufacturers. We stand behind every job we do." },
];

export default function LandingTrust() {
  const handleCall = () => base44.analytics.track({ eventName: "phone_click", properties: { source: "trust_landing" } });

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-16 md:pt-20">
      <SEOHead
        title="Why Trust Bradley Brown Inc. — Certified MS Builder"
        description="Licensed MS contractor since 1995. 4.9★ rated, BBB member, NAHB & MSHBA certified. Call (601) 954-1306."
        schema={schema}
      />
      <StickyCallButton />

      <div className="sticky top-16 md:top-20 z-40 bg-green-500 text-white py-2 px-4 text-center text-sm font-semibold">
        <a href="tel:+16019541306" onClick={handleCall} className="flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" /> 4.9★ Rated · Licensed · Insured — Call (601) 954-1306
        </a>
      </div>

      {/* Hero */}
      <div className="bg-[#1E2D3D] py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 rounded-full px-3 py-1 mb-3">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-amber-300 text-xs font-medium">Licensed · Insured · 30+ Years</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Why Mississippi Homeowners<br className="hidden md:block" /> Trust Bradley Brown Inc.
          </h1>
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-base md:text-lg">
            Certified, insured, and backed by 500+ completed projects. See what our clients say — and why we're Central Mississippi's most trusted builder.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+16019541306" onClick={handleCall} className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg">
              <Phone className="w-5 h-5" /> (601) 954-1306
            </a>
            <Link to={createPageUrl("QuoteAssistant")} className="flex items-center justify-center gap-2 bg-sky-400 hover:bg-sky-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors">
              Free Estimate <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-14">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: "30+", label: "Years in Business" },
            { value: "500+", label: "Homes Built" },
            { value: "4.9★", label: "Average Rating" },
            { value: "100%", label: "Licensed & Insured" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-gray-100 rounded-xl p-5 text-center shadow-sm">
              <p className="text-2xl font-bold text-sky-600">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div>
          <h2 className="text-2xl font-bold text-[#1E2D3D] mb-6">Certifications & Memberships</h2>
          <div className="flex flex-wrap items-center justify-center gap-6 bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            {badges.map((b) => (
              <img key={b.name} src={b.img} alt={b.name} className="h-14 w-auto object-contain" loading="lazy" />
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div id="testimonials">
          <h2 className="text-2xl font-bold text-[#1E2D3D] mb-6">What Our Clients Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <div className="flex gap-0.5 mb-2">
                  {Array(t.rating).fill(0).map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed italic mb-3">"{t.text}"</p>
                <p className="text-xs font-semibold text-slate-700">{t.name} · {t.location}</p>
                <p className="text-xs text-sky-500">{t.project}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust signals */}
        <div>
          <h2 className="text-2xl font-bold text-[#1E2D3D] mb-6">Our Commitments to You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Licensed Mississippi General Contractor (MC-2024)",
              "Full general liability insurance on every project",
              "Workers' compensation coverage for all crew",
              "Transparent, itemized written quotes — no surprises",
              "Workmanship warranty on all completed projects",
              "BBB member upholding ethical business standards",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-sm text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-xl font-bold text-[#1E2D3D] mb-6 text-center">Frequently Asked Questions</h2>
          <LandingFAQ faqs={faqs} />
        </div>
      </div>

      <LandingCTABar headline="Ready to work with Mississippi's most trusted builder?" />
    </div>
  );
}