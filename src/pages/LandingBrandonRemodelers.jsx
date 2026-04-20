import React from "react";
import { Phone, MapPin, CheckCircle, ChevronRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import SEOHead from "@/components/SEOHead";
import LandingCTABar from "@/components/landing/LandingCTABar";
import LandingFAQ from "@/components/landing/LandingFAQ";
import StickyCallButton from "@/components/StickyCallButton";
import { base44 } from "@/api/base44Client";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      "name": "Bradley Brown Inc.",
      "telephone": "+18443514154",
      "address": { "@type": "PostalAddress", "addressLocality": "Brandon", "addressRegion": "MS", "postalCode": "39042", "addressCountry": "US" },
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
        { "@type": "City", "name": "Clinton, Mississippi" }
      ],
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "87", "bestRating": "5" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bradleybrowninc.com" },
        { "@type": "ListItem", "position": 2, "name": "Brandon MS Remodelers", "item": "https://bradleybrowninc.com/LandingBrandonRemodelers" }
      ]
    }
  ]
};

const testimonials = [
  { name: "Sarah M., Brandon, MS", text: "Bradley Brown built our custom home in Brandon and the craftsmanship is incredible. 10/10 would recommend.", rating: 5 },
  { name: "James T., Flowood, MS", text: "Renovated our entire kitchen and two bathrooms. On time, on budget, and the quality is outstanding.", rating: 5 },
  { name: "Karen L., Madison, MS", text: "The most professional contractor we've ever worked with. They treated our home like it was their own.", rating: 5 },
];

const faqs = [
  { question: "Is Bradley Brown Inc. based in Brandon, MS?", answer: "We're centrally located in the Brandon/Jackson area of Mississippi, serving a 50-mile radius including Flowood, Pearl, Madison, Ridgeland, and beyond." },
  { question: "What areas do you service?", answer: "We serve all of Rankin, Hinds, and Madison counties — including Brandon, Flowood, Pearl, Richland, Jackson, Madison, Ridgeland, Clinton, and more." },
  { question: "How long have you been building in Mississippi?", answer: "Since 1995 — over 30 years of continuous service to Brandon and Rankin County area homeowners. We've built and renovated 500+ homes in the area." },
  { question: "Do you do both new construction and remodeling?", answer: "Yes! We do custom home building from the ground up, full renovations, room additions, and everything in between." },
];

export default function LandingBrandonRemodelers() {
  const handleCall = () => base44.analytics.track({ eventName: "phone_click", properties: { source: "brandon_landing" } });

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-16 md:pt-20">
      <SEOHead
        title="Brandon, MS Home Remodelers — Bradley Brown Inc."
        description="Bradley Brown Inc. — Brandon & Rankin County area home remodelers. 30+ yrs. Call (844) 351-4154 for a free estimate."
        schema={schema}
        canonical="https://bradleybrowninc.com/LandingBrandonRemodelers"
      />
      <StickyCallButton />

      <div className="sticky top-16 md:top-20 z-40 bg-green-500 text-white py-2 px-4 text-center text-sm font-semibold">
        <a href="tel:+18443514154" onClick={handleCall} className="flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" /> Local Brandon, MS Contractor — Call: (844) 351-4154
        </a>
      </div>

      {/* Hero */}
      <div className="bg-[#1E2D3D] py-14 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80')" }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-sky-400/20 border border-sky-400/40 rounded-full px-3 py-1 mb-3">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-sky-300 text-xs font-medium">Serving Brandon, MS & 50-Mile Radius</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Bradley Brown — Brandon, MS<br className="hidden md:block" /> Home Remodelers
          </h1>
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-base md:text-lg">
            Brandon and the Rankin County area's most trusted home builder and remodeler since 1995. Licensed, local, and proud to serve Brandon and surrounding communities.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+18443514154" onClick={handleCall} className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg">
              <Phone className="w-5 h-5" /> (844) 351-4154
            </a>
            <Link to={createPageUrl("QuoteAssistant")} className="flex items-center justify-center gap-2 bg-sky-400 hover:bg-sky-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors">
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
          {/* Map embed */}
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
          <h2 className="text-2xl font-bold text-[#1E2D3D] mb-6">What We Build in Brandon & Beyond</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {["Custom Home Building", "Kitchen & Bath Remodeling", "Room Additions", "Whole-Home Renovations", "Outdoor Living Spaces", "Barndominiums & Specialty Builds"].map((s) => (
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

        {/* FAQ */}
        <div>
          <h2 className="text-xl font-bold text-[#1E2D3D] mb-6 text-center">Frequently Asked Questions</h2>
          <LandingFAQ faqs={faqs} />
        </div>
      </div>

      <LandingCTABar headline="Serving Brandon, MS — Call for a free estimate." />
    </div>
  );
}