import React from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { Phone, ChevronRight, CheckCircle, Star } from "lucide-react";
import LandingFAQ from "@/components/landing/LandingFAQ";
import ServiceStickyCTA from "@/components/ServiceStickyCTA";
import { usePageImages } from "@/lib/usePageImages";

const faqs = [
  {
    question: "Does Bradley Brown Inc. work on historic homes?",
    answer: "Yes. Bradley Brown Inc. has an existing historic-home restoration project page and provides residential remodeling in Central Mississippi. The work for a specific property should be confirmed after reviewing the home and owner priorities.",
  },
  {
    question: "What is the difference between restoration and remodeling?",
    answer: "Restoration prioritizes preserving or recreating a home's defining existing character. Remodeling changes a space to improve its function, appearance, or use. Many historic-home projects combine both approaches, but the right balance depends on the property and the homeowner's goals.",
  },
  {
    question: "Can a historic home be updated for modern living?",
    answer: "Often, yes, but the appropriate work depends on the home's condition, construction, and character. Bradley Brown Inc. should assess the requested changes before committing to specific structural, mechanical, preservation, or code-related work.",
  },
  {
    question: "What should homeowners assess before starting a historic-home project?",
    answer: "Start with the home's current condition, the features the owner wants to preserve, the spaces that need to function differently, and any known structural or system concerns. A project-specific review is more reliable than applying a standard remodeling plan.",
  },
  {
    question: "Are special approvals sometimes required for historic-home work?",
    answer: "Requirements vary by property and jurisdiction. A homeowner should confirm whether local rules, district requirements, or specialist reviews apply before work begins. This page does not promise an approval outcome or provide legal guidance.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "Historic Home Restoration in Central Mississippi — Bradley Brown Inc.",
      "description": "Explore Bradley Brown Inc.'s approach to historic home restoration in Central Mississippi and request a conversation about your property.",
      "author": { "@type": "Organization", "name": "Bradley Brown Inc." },
      "publisher": {
        "@type": "Organization",
        "name": "Bradley Brown Inc.",
        "logo": { "@type": "ImageObject", "url": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c758479c46f0580553750/0990d7b76_bradleybrowninc-logo2.png" }
      },
      "mainEntityOfPage": "https://bradleybrowninc.com/projects/historic-home-restoration"
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqs.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": { "@type": "Answer", "text": item.answer }
      }))
    }
  ]
};

export default function HistoricHomeRestoration() {
  const { hero: heroImage, gallery: managedGallery } = usePageImages("HistoricHomeRestoration");
  const fallbackGallery = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
  ];
  const galleryImages = managedGallery.length > 0 ? managedGallery.map((img) => img.url) : fallbackGallery;
  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      <SEOHead
        title="Historic Home Restoration in Central Mississippi | Bradley Brown Inc"
        description="Explore Bradley Brown Inc.'s approach to historic home restoration in Central Mississippi and request a conversation about your property."
        canonical="https://bradleybrowninc.com/projects/historic-home-restoration"
        noindex={false}
        schema={schema}
      />

      {/* Hero */}
      <div
        className="relative bg-[#1E2D3D] py-20 md:py-28 overflow-hidden"
        style={{
          backgroundImage: `url('${heroImage?.url || "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80"}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#1E2D3D]/80" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#C4922A]/20 border border-[#C4922A]/40 rounded-full px-3 py-1 mb-4">
            <Star className="w-3.5 h-3.5 text-[#C4922A]" />
            <span className="text-[#F5D78E] text-xs font-medium">Featured Project</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Historic Home Restoration in Central Mississippi
          </h1>
          <p className="text-slate-300 mt-4 text-base md:text-lg max-w-2xl mx-auto">
            Bradley Brown Inc. documents historic home restoration work in Brandon and serves homeowners across Central Mississippi. Its approach connects residential remodeling craftsmanship with the goal of preserving a home's existing character while improving how the space functions.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <a
              href="tel:+18443514154"
              onClick={() => {
                if (typeof window.gtag === "function") {
                  window.gtag("event", "conversion", { send_to: "AW-17864041271/CKLvCOWk3_IbELfGnsZC", value: 30, currency: "USD" });
                }
              }}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-colors"
            >
              <Phone className="w-4 h-4" /> (844) 351-4154
            </a>
            <Link
              to="/estimate"
              className="inline-flex items-center gap-2 bg-sky-400 hover:bg-sky-500 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-colors"
            >
              Get a Free Estimate <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        <section>
          <h2 className="text-2xl font-bold text-[#1E2D3D] mb-4">Historic Home Restoration in Central Mississippi</h2>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
            <p>Historic-home work should begin with the property's current condition, the features the owner wants to preserve, the spaces that need to function differently, and any known structural or system concerns.</p>
            <p>Restoration prioritizes preserving or recreating a home's defining existing character. Remodeling changes a space to improve its function, appearance, or use. Many historic-home projects combine both approaches, but the right balance depends on the property and the homeowner's goals.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1E2D3D] mb-4">A Documented Historic Home Project</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryImages.map((src, i) => (
              <div key={i} className="rounded-xl overflow-hidden aspect-square bg-slate-100">
                <img src={src} alt={`Historic home restoration photo ${i + 1}`} width="400" height="400" loading="lazy" decoding="async" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1E2D3D] mb-4">What to Assess Before Work Begins</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "The home's current condition and known structural or system concerns",
              "Existing features the homeowner wants to preserve",
              "Rooms or functions that need to work differently",
              "Property-specific requirements that may affect the project",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-4">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#1E2D3D] mb-6">Frequently Asked Questions About Historic Homes</h2>
          <LandingFAQ faqs={faqs} />
        </section>

        {/* CTA */}
        <section className="bg-[#1E2D3D] rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Have a Historic Home That Needs Care?</h2>
          <p className="text-slate-300 text-sm mb-6 max-w-md mx-auto">
            Bradley Brown Inc. has the experience and craftsmanship to honor your home's history while making it ready for the next hundred years.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+18443514154"
              onClick={() => {
                if (typeof window.gtag === "function") {
                  window.gtag("event", "conversion", { send_to: "AW-17864041271/CKLvCOWk3_IbELfGnsZC", value: 30, currency: "USD" });
                }
              }}
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Phone className="w-4 h-4" /> Call (844) 351-4154
            </a>
            <Link
              to="/estimate"
              className="inline-flex items-center justify-center gap-2 bg-sky-400 hover:bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Get a Free Estimate <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Related */}
        <section>
          <h2 className="text-xl font-bold text-[#1E2D3D] mb-4">Related Projects & Resources</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Our Services", to: "/services" },
              { label: "Portfolio", to: "/portfolio" },
              { label: "Home Addition Ideas", to: "/protips/home-addition-ideas" },
              { label: "Renovation Loans", to: "/protips/renovation-loans" },
            ].map(item => (
              <Link
                key={item.to}
                to={item.to}
                className="bg-white border border-gray-100 rounded-xl p-4 text-center text-sm font-medium text-[#1E2D3D] hover:border-sky-300 hover:text-sky-600 transition-colors"
              >
                {item.label} <ChevronRight className="w-3 h-3 inline" />
              </Link>
            ))}
          </div>
        </section>

      </div>
      <ServiceStickyCTA source="historic_restoration_page" label="Get a Free Quote" />
    </div>
  );
}
