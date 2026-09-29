import React from "react";
import { Phone, MapPin, CheckCircle, ChevronRight, Hammer } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import LandingCTABar from "@/components/landing/LandingCTABar";
import LandingFAQ from "@/components/landing/LandingFAQ";
import StickyCallButton from "@/components/StickyCallButton";
import CustomHomeProcess from "@/components/landing/CustomHomeProcess";
import BrandonReviewSection from "@/components/landing/BrandonReviewSection";
import { base44 } from "@/api/base44Client";
import { usePageImages } from "@/lib/usePageImages";

const faqs = [
  {
    question: "Does Bradley Brown Inc. build custom homes in Brandon, MS?",
    answer:
      "Yes. Bradley Brown Inc. is based in Brandon and provides custom home building for homeowners in Brandon and nearby Central Mississippi communities. The service focuses on creating a home around the owner's vision, lifestyle, and functional needs rather than offering a one-size-fits-all plan.",
  },
  {
    question: "What is the first step in planning a custom home?",
    answer:
      "Start by sharing the property, goals, priorities, and questions you already have. Bradley Brown Inc. invites homeowners to request a free estimate or schedule a consultation so the project's scope can be discussed before detailed decisions are made.",
  },
  {
    question: "Can Bradley Brown Inc. build a home around my family's needs?",
    answer:
      "Personalization is central to Bradley Brown Inc.'s custom-home approach. The planning conversation should cover how the household uses the home, what spaces matter most, and which functional or design priorities should shape the project.",
  },
  {
    question: "How much does a custom home in Brandon cost?",
    answer:
      "A custom home's budget depends on the property, size, design, materials, site conditions, and project scope. Homeowners should request an estimate based on their specific plans rather than rely on a generic cost range.",
  },
  {
    question: "Where can I see Bradley Brown Inc. projects?",
    answer:
      "Visit the portfolio to review available Bradley Brown Inc. project examples. Each project should be considered alongside its documented service type, location, scope, and photographs.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HomeAndConstructionBusiness",
      "name": "Bradley Brown Inc.",
      "telephone": "+18443514154",
      "url": "https://bradleybrowninc.com/custom-home-builder-brandon-ms",
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
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Custom Home Building Services in Brandon, MS",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Custom Home Building in Brandon, MS",
              "areaServed": "Brandon, MS",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "New Construction Homes in Brandon, MS",
              "areaServed": "Brandon, MS",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Residential General Contractor in Brandon, MS",
              "areaServed": "Brandon, MS",
            },
          },
        ],
      },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bradleybrowninc.com" },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Custom Home Builder in Brandon, MS",
          "item": "https://bradleybrowninc.com/custom-home-builder-brandon-ms",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqs.map((f) => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": { "@type": "Answer", "text": f.answer },
      })),
    },
  ],
};

const services = [
  "Custom Home Building in Brandon, MS",
  "New Construction Homes",
  "Luxury Custom Homes",
  "Residential General Contracting",
  "Design-Build Coordination",
  "Home Additions & Expansions",
  "Whole-Home Renovations",
  "Outdoor Living Spaces",
];

const cities = [
  "Brandon, MS",
  "Flowood, MS",
  "Pearl, MS",
  "Richland, MS",
  "Jackson, MS",
  "Madison, MS",
  "Ridgeland, MS",
  "Clinton, MS",
];

export default function LandingBrandonCustomHomeBuilder() {
  const handleCall = () =>
    base44.analytics.track({
      eventName: "phone_click",
      properties: { source: "brandon_custom_home_landing" },
    });
  const { hero: heroImage } = usePageImages("LandingBrandonCustomHomeBuilder");

  return (
    <div className="min-h-screen bg-background pt-16 md:pt-20">
      <SEOHead
        title="Custom Home Builder in Brandon, MS | Bradley Brown Inc."
        description="Bradley Brown Inc. builds personalized custom homes in Brandon and Central Mississippi. Explore the service and request a free estimate."
        schema={schema}
        canonical="https://bradleybrowninc.com/custom-home-builder-brandon-ms"
      />
      <StickyCallButton />

      {/* Sticky call bar */}
      <div className="sticky top-16 md:top-20 z-40 bg-green-500 text-white py-2 px-4 text-center text-sm font-semibold">
        <a href="tel:+18443514154" onClick={handleCall} className="flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" /> Brandon, MS Custom Home Builder — Call: (844) 351-4154
        </a>
      </div>

      {/* Hero */}
      <div className="bg-foreground py-14 md:py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage: `url('${heroImage?.url || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"}')`,
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-sky-400/20 border border-sky-400/40 rounded-full px-3 py-1 mb-3">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-sky-300 text-xs font-medium">Serving Brandon, MS & Rankin County</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Custom Home Builder in Brandon, MS
          </h1>
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-base md:text-lg">
            Bradley Brown Inc. builds custom homes for homeowners in Brandon and Central Mississippi. The company manages residential construction from early planning through the finishing stages, with each home shaped around the owner's vision, lifestyle, and space needs. Request a free estimate or schedule a consultation to begin.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+18443514154"
              onClick={handleCall}
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg"
            >
              <Phone className="w-5 h-5" /> (844) 351-4154
            </a>
            <Link
              to={"/estimate"}
              className="flex items-center justify-center gap-2 bg-sky-400 hover:bg-sky-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors"
            >
              Start Your Custom Home Estimate <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-14">
        {/* Services */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Custom Home Building Services in Brandon</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {services.map((s) => (
              <div key={s} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-sm font-medium text-slate-700">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Brandon, MS Custom Home Construction */}
        <div className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-foreground">Brandon, MS Custom Home Construction</h2>
          <p className="text-slate-600 leading-relaxed">
            Building a custom home in Brandon takes the right planning, craftsmanship, and local experience. Bradley
            Brown Inc. helps homeowners turn ideas into finished homes with a process built around quality,
            communication, and long-term value.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Whether you are building on your own land, planning a new construction home in Rankin County, or looking for
            a residential general contractor to manage the full project, our team can help.
          </p>
        </div>

        {/* Our Custom Home Building Process */}
        <CustomHomeProcess />

        {/* New Construction Homes in Brandon, MS */}
        <div className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-foreground">New Construction Homes in Brandon, MS</h2>
          <p className="text-slate-600 leading-relaxed">
            If you are planning a new construction home in Brandon, Bradley Brown Inc. can help with the full residential
            building process — from early planning and budgeting to construction management and final project completion.
          </p>
        </div>

        {/* Residential General Contractor in Brandon and Rankin County */}
        <div className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-foreground">Residential General Contractor in Brandon and Rankin County</h2>
          <p className="text-slate-600 leading-relaxed">
            Homeowners choose Bradley Brown Inc. when they need an experienced general contractor in Brandon, MS who
            understands custom homes, remodeling, additions, and residential construction in Central Mississippi.
          </p>
        </div>

        {/* Areas We Serve */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Areas We Serve</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {cities.map((city) => (
              <div
                key={city}
                className="flex items-center gap-2 bg-sky-50 border border-sky-100 rounded-lg px-3 py-2 text-sm text-sky-700 font-medium"
              >
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" /> {city}
              </div>
            ))}
          </div>
        </div>

        {/* Cross-link to remodeling */}
        <div className="bg-white border border-sky-100 rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">Need Remodeling Instead?</h2>
          <p className="text-slate-600 leading-relaxed mb-5">
            Bradley Brown Inc. also provides kitchen remodeling, bathroom remodeling, additions, and whole-home
            renovations in Brandon, MS and Rankin County.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/remodeling-brandon-ms"
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-full font-semibold text-sm transition-colors"
            >
              <Hammer className="w-4 h-4" /> Home Remodeling in Brandon, MS
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              to="/custom-home-builder-madison-ms"
              className="inline-flex items-center gap-2 border border-sky-200 text-sky-700 hover:bg-sky-50 px-5 py-3 rounded-full font-semibold text-sm transition-colors"
            >
              Custom Homes near Madison, MS <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              to="/reviews"
              className="inline-flex items-center gap-2 border border-sky-200 text-sky-700 hover:bg-sky-50 px-5 py-3 rounded-full font-semibold text-sm transition-colors"
            >
              Read Verified Reviews <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* What Brandon, MS Homeowners Say About Us */}
        <BrandonReviewSection />

        {/* FAQ */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-6 text-center">Frequently Asked Questions</h2>
          <LandingFAQ faqs={faqs} />
        </div>
      </div>

      <LandingCTABar headline="Building a custom home in Brandon, MS? Let's talk." />
    </div>
  );
}