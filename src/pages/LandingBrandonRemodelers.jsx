import React from "react";
import { Phone, MapPin, CheckCircle, ChevronRight, Star, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import SEOHead from "@/components/SEOHead";
import LandingCTABar from "@/components/landing/LandingCTABar";
import LandingFAQ from "@/components/landing/LandingFAQ";
import StickyCallButton from "@/components/StickyCallButton";
import { base44 } from "@/api/base44Client";

const faqs = [
  {
    question: "Is Bradley Brown Inc. based in Brandon, MS?",
    answer:
      "We're centrally located in the Brandon/Jackson area of Mississippi, serving a 50-mile radius including Flowood, Pearl, Madison, Ridgeland, and beyond.",
  },
  {
    question: "What areas do you service?",
    answer:
      "We serve all of Rankin, Hinds, and Madison counties — including Brandon, Flowood, Pearl, Richland, Jackson, Madison, Ridgeland, Clinton, and more.",
  },
  {
    question: "How long have you been remodeling homes in Mississippi?",
    answer:
      "Since 1995 — over 30 years of continuous remodeling work in the Brandon and Rankin County area. We've completed 500+ kitchen, bathroom, addition, and whole-home renovation projects.",
  },
  {
    question: "What types of remodeling projects do you handle?",
    answer:
      "We handle kitchen remodeling, bathroom remodeling, whole-home renovations, room additions, and outdoor living upgrades for homeowners in Brandon, MS and the surrounding Rankin County area.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HomeAndConstructionBusiness",
      "name": "Bradley Brown Inc.",
      "telephone": "+18443514154",
      "url": "https://bradleybrowninc.com/landingbrandonremodelers",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Brandon",
        "addressRegion": "MS",
        "postalCode": "39042",
        "addressCountry": "US",
      },
      "geo": { "@type": "GeoCoordinates", "latitude": 32.2729, "longitude": -89.9923 },
      "priceRange": "$$$",
      "areaServed": [
        { "@type": "City", "name": "Brandon, Mississippi" },
        { "@type": "City", "name": "Flowood, Mississippi" },
        { "@type": "City", "name": "Pearl, Mississippi" },
        { "@type": "City", "name": "Richland, Mississippi" },
        { "@type": "City", "name": "Jackson, Mississippi" },
        { "@type": "City", "name": "Madison, Mississippi" },
        { "@type": "City", "name": "Ridgeland, Mississippi" },
        { "@type": "City", "name": "Clinton, Mississippi" },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bradleybrowninc.com" },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Brandon MS Home Remodelers",
          "item": "https://bradleybrowninc.com/landingbrandonremodelers",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is Bradley Brown Inc. based in Brandon, MS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Bradley Brown Inc. is a local remodeling contractor headquartered in Brandon, MS, serving Brandon, Rankin County, and Central Mississippi.",
          },
        },
        {
          "@type": "Question",
          "name": "What areas do you service?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We serve Brandon, Flowood, Pearl, Richland, Jackson, Madison, Ridgeland, and Clinton, MS.",
          },
        },
        {
          "@type": "Question",
          "name": "How long have you been remodeling homes in Mississippi?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bradley Brown Inc. has years of experience remodeling homes throughout Mississippi. Contact us at (844) 351-4154 for more details.",
          },
        },
        {
          "@type": "Question",
          "name": "What types of remodeling projects do you handle?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We handle kitchen remodeling, bathroom remodeling, room additions, whole-home renovations, outdoor living spaces, and custom renovation projects.",
          },
        },
      ],
    },
  ],
};

const testimonials = [
  { name: "Sarah M., Brandon, MS", text: "Bradley Brown remodeled our kitchen in Brandon and the craftsmanship is incredible. 10/10 would recommend.", rating: 5 },
  { name: "James T., Flowood, MS", text: "Renovated our entire kitchen and two bathrooms. On time, on budget, and the quality is outstanding.", rating: 5 },
  { name: "Karen L., Madison, MS", text: "The most professional remodeling contractor we've ever worked with. They treated our home like it was their own.", rating: 5 },
];

const services = [
  "Kitchen Remodeling in Brandon, MS",
  "Bathroom Remodeling in Brandon, MS",
  "Whole-Home Renovations",
  "Room Additions",
  "Outdoor Living Spaces",
  "Custom Renovation Projects",
];

export default function LandingBrandonRemodelers() {
  const handleCall = () =>
    base44.analytics.track({
      eventName: "phone_click",
      properties: { source: "brandon_remodeling_landing" },
    });

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-16 md:pt-20">
      <SEOHead
        title="Brandon, MS Home Remodelers | Kitchen, Bath & Whole-Home Renovations"
        description="Bradley Brown Inc. provides home remodeling, kitchen remodeling, bathroom remodeling, additions, and whole-home renovations in Brandon, MS and Rankin County. Call (844) 351-4154 for a free estimate."
        schema={schema}
        canonical="https://bradleybrowninc.com/landingbrandonremodelers"
      />
      <StickyCallButton />

      <div className="sticky top-16 md:top-20 z-40 bg-green-500 text-white py-2 px-4 text-center text-sm font-semibold">
        <a href="tel:+18443514154" onClick={handleCall} className="flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" /> Brandon, MS Home Remodelers — Call: (844) 351-4154
        </a>
      </div>

      {/* Hero */}
      <div className="bg-[#1E2D3D] py-14 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80')" }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-sky-400/20 border border-sky-400/40 rounded-full px-3 py-1 mb-3">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-sky-300 text-xs font-medium">Serving Brandon, MS & Rankin County</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Brandon, MS Home Remodelers
          </h1>
          <p className="text-sky-300 mt-2 text-lg md:text-2xl font-semibold">
            Kitchen, Bath & Whole-Home Renovations
          </p>
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-base md:text-lg">
            Bradley Brown Inc. provides kitchen remodeling, bathroom remodeling, room additions, whole-home renovations,
            and outdoor living upgrades for homeowners in Brandon, Rankin County, and Central Mississippi.
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

        {/* Service area */}
        <div>
          <h2 className="text-2xl font-bold text-[#1E2D3D] mb-4">Our Service Area</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {["Brandon, MS", "Flowood, MS", "Pearl, MS", "Richland, MS", "Jackson, MS", "Madison, MS", "Ridgeland, MS", "Clinton, MS"].map((city) => (
              <div key={city} className="flex items-center gap-2 bg-sky-50 border border-sky-100 rounded-lg px-3 py-2 text-sm text-sky-700 font-medium">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" /> {city}
              </div>
            ))}
          </div>
          <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm h-64">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d218083.47153490375!2d-90.24965!3d32.27291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x862834f7b56a0d85%3A0x3f2ac15e9f9d90!2sBrandon%2C%20MS!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              title="Bradley Brown Inc. service area - Brandon, MS"
            />
          </div>
        </div>

        {/* Services */}
        <div>
          <h2 className="text-2xl font-bold text-[#1E2D3D] mb-6">Remodeling Services in Brandon, MS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {services.map((s) => (
              <div key={s} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-sm font-medium text-slate-700">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h2 className="text-2xl font-bold text-[#1E2D3D] mb-6">What Our Neighbors Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <div className="flex gap-0.5 mb-3">
                  {Array(t.rating).fill(0).map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed italic mb-3">"{t.text}"</p>
                <p className="text-xs font-semibold text-slate-500">{t.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cross-link to custom home builder page */}
        <div className="bg-white border border-sky-100 rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold text-[#1E2D3D] mb-3">Also Building a Custom Home in Brandon?</h2>
          <p className="text-slate-600 leading-relaxed mb-5">
            In addition to remodeling, Bradley Brown Inc. builds custom homes and new construction homes throughout
            Brandon, MS and Rankin County.
          </p>
          <Link
            to="/custom-home-builder-brandon-ms"
            className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-full font-semibold text-sm transition-colors"
          >
            <Home className="w-4 h-4" /> Custom Home Builder in Brandon, MS
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-xl font-bold text-[#1E2D3D] mb-6 text-center">Frequently Asked Questions</h2>
          <LandingFAQ faqs={faqs} />
        </div>
      </div>

      <LandingCTABar headline="Remodeling in Brandon, MS — Call for a free estimate." />
    </div>
  );
}