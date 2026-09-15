import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ChevronRight, MapPin, Phone } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import LandingFAQ from "@/components/landing/LandingFAQ";
import LandingCTABar from "@/components/landing/LandingCTABar";
import StickyCallButton from "@/components/StickyCallButton";
import { base44 } from "@/api/base44Client";

const faqs = [
  {
    question: "Does Bradley Brown Inc. build custom homes near Madison, MS?",
    answer: "Yes. Bradley Brown Inc. provides custom home building for homeowners in Madison and nearby Central Mississippi communities from its Brandon headquarters.",
  },
  {
    question: "What is the first step in planning a custom home?",
    answer: "Start with a consultation to discuss your vision, property, priorities, and budget. Bradley Brown Inc. can then help define the appropriate next steps for your project.",
  },
  {
    question: "Can Bradley Brown Inc. help with both custom homes and remodeling?",
    answer: "Yes. Bradley Brown Inc. works on custom homes as well as substantial remodeling, room additions, and outdoor living projects in Central Mississippi.",
  },
  {
    question: "Where can I see Bradley Brown Inc. projects and customer feedback?",
    answer: "Visit the portfolio for completed-project examples and the reviews page for customer feedback returned by Bradley Brown Inc.'s connected Google review source.",
  },
  {
    question: "How do I request an estimate for a Madison custom home?",
    answer: "Use the online estimate form or call (844) 351-4154 to start a conversation about your Madison-area custom home project.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Custom Home Building near Madison, MS",
      provider: {
        "@type": "HomeAndConstructionBusiness",
        name: "Bradley Brown Inc.",
        url: "https://bradleybrowninc.com",
        telephone: "+18443514154",
        address: {
          "@type": "PostalAddress",
          streetAddress: "104 Tiffany Drive",
          addressLocality: "Brandon",
          addressRegion: "MS",
          postalCode: "39042",
          addressCountry: "US",
        },
      },
      areaServed: { "@type": "City", name: "Madison, Mississippi" },
      url: "https://bradleybrowninc.com/custom-home-builder-madison-ms",
      description: "Custom home building for homeowners in Madison and nearby Central Mississippi communities.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://bradleybrowninc.com" },
        { "@type": "ListItem", position: 2, name: "Custom Home Building", item: "https://bradleybrowninc.com/services/custom-home-building" },
        { "@type": "ListItem", position: 3, name: "Madison, MS", item: "https://bradleybrowninc.com/custom-home-builder-madison-ms" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

const services = [
  "Custom home planning and construction",
  "Residential additions and expansions",
  "Substantial home remodeling",
  "Outdoor living projects",
];

export default function MadisonCustomHomeBuilder() {
  const handleCall = () => base44.analytics.track({
    eventName: "phone_click",
    properties: { source: "madison_custom_home_page" },
  });

  return (
    <div className="min-h-screen bg-background pt-16 md:pt-20">
      <SEOHead
        title="Custom Home Builder near Madison, MS | Bradley Brown Inc."
        description="Bradley Brown Inc. builds custom homes for Madison-area homeowners from its Brandon headquarters. Discuss your property, priorities and vision."
        canonical="https://bradleybrowninc.com/custom-home-builder-madison-ms"
        schema={schema}
      />
      <StickyCallButton />

      <section className="bg-foreground py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 text-sky-300 text-sm font-semibold mb-4">
            <MapPin className="w-4 h-4" /> Madison, MS & Central Mississippi
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white">Custom Home Builder near Madison, MS</h1>
          <p className="text-slate-300 mt-5 max-w-2xl mx-auto text-lg leading-relaxed">
            Bradley Brown Inc. provides custom home building for homeowners in Madison and nearby Central Mississippi communities. From its Brandon headquarters, the company helps families turn a vision for their property into a tailored home.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/estimate" className="inline-flex items-center justify-center gap-2 bg-primary text-white px-7 py-4 rounded-full font-bold hover:opacity-90">
              Request a Free Estimate <ChevronRight className="w-5 h-5" />
            </Link>
            <a href="tel:+18443514154" onClick={handleCall} className="inline-flex items-center justify-center gap-2 border border-slate-500 text-white px-7 py-4 rounded-full font-bold hover:bg-slate-800">
              <Phone className="w-5 h-5" /> (844) 351-4154
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 space-y-14">
        <section>
          <h2 className="text-2xl font-bold text-foreground">Custom Home Services for Madison-Area Homeowners</h2>
          <p className="text-slate-600 leading-relaxed mt-3">
            Bradley Brown Inc. is a Brandon-based residential builder serving Madison and Central Mississippi. Each project begins with a conversation about the homeowner's vision, lifestyle, property, and priorities.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mt-6">
            {services.map((service) => (
              <div key={service} className="flex items-center gap-3 border border-slate-100 bg-white rounded-xl p-4 shadow-sm">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-slate-700 font-medium">{service}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">How to Start</h2>
          <p className="text-slate-600 leading-relaxed mt-3">
            Share the location, project type, and what you want the finished home to support. Bradley Brown Inc. can review those priorities with you and explain the next appropriate step. A detailed scope, schedule, and budget depend on the property and approved design.
          </p>
        </section>

        <section className="bg-sky-50 border border-sky-100 rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-foreground">Explore Relevant Proof and Services</h2>
          <div className="flex flex-wrap gap-3 mt-5">
            <Link to="/services/custom-home-building" className="inline-flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-full font-semibold">Custom Home Building <ChevronRight className="w-4 h-4" /></Link>
            <Link to="/portfolio" className="inline-flex items-center gap-2 bg-white border border-sky-200 text-sky-700 px-5 py-3 rounded-full font-semibold">View the Portfolio <ChevronRight className="w-4 h-4" /></Link>
            <Link to="/reviews" className="inline-flex items-center gap-2 bg-white border border-sky-200 text-sky-700 px-5 py-3 rounded-full font-semibold">Customer Reviews <ChevronRight className="w-4 h-4" /></Link>
            <Link to="/madison-ms-home-remodeling" className="inline-flex items-center gap-2 bg-white border border-sky-200 text-sky-700 px-5 py-3 rounded-full font-semibold">Madison Remodeling <ChevronRight className="w-4 h-4" /></Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground text-center mb-6">Frequently Asked Questions</h2>
          <LandingFAQ faqs={faqs} />
        </section>
      </div>

      <LandingCTABar headline="Planning a custom home near Madison? Let's talk." />
    </div>
  );
}
