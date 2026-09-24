import React from "react";
import { Phone, CheckCircle, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import LandingCTABar from "@/components/landing/LandingCTABar";
import LandingFAQ from "@/components/landing/LandingFAQ";
import StickyCallButton from "@/components/StickyCallButton";
import { base44 } from "@/api/base44Client";
import { usePageImages } from "@/lib/usePageImages";

const faqs = [
  {
    question: "Does Bradley Brown Inc. remodel homes in Madison, MS?",
    answer: "Yes. Bradley Brown Inc. publicly serves Madison-area homeowners from its Brandon base. Its documented residential services include kitchen remodeling, bathroom remodeling, room additions, and broader home renovations. Current availability should be confirmed when the homeowner requests an estimate.",
  },
  {
    question: "Which remodeling services are available in Madison?",
    answer: "The documented service scope includes kitchens, bathrooms, room additions, and substantial residential renovations. A consultation can confirm whether the requested work fits Bradley Brown Inc.'s current services and whether related custom-home or outdoor-living work should be handled separately.",
  },
  {
    question: "What information helps Bradley Brown Inc. understand a remodeling project?",
    answer: "Share the property location, the rooms or areas involved, what is not working today, and the result you want. Photos, measurements, plans, or inspiration may help explain the idea, but Bradley Brown Inc. can confirm what is needed for the next step.",
  },
  {
    question: "How much does a Madison home remodel cost?",
    answer: "Cost depends on the rooms involved, the condition of the home, design choices, materials, structural changes, and overall scope. Request a project-specific estimate instead of relying on a generic public price.",
  },
  {
    question: "Does Bradley Brown Inc. also build custom homes near Madison?",
    answer: "Bradley Brown Inc. serves Central Mississippi with custom home building. Homeowners near Madison should use the custom-home page or request a consultation to confirm the property, proposed scope, and current service availability.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      "name": "Bradley Brown Inc.",
      "telephone": "+18443514154",
      "url": "https://bradleybrowninc.com/madison-ms-home-remodeling",
      "address": { "@type": "PostalAddress", "streetAddress": "104 Tiffany Drive", "addressLocality": "Brandon", "addressRegion": "MS", "postalCode": "39042", "addressCountry": "US" },
      "areaServed": { "@type": "City", "name": "Madison, Mississippi" }
    },
    {
      "@type": "Service",
      "name": "Home Remodeling in Madison, MS",
      "provider": { "@type": "LocalBusiness", "name": "Bradley Brown Inc." },
      "areaServed": { "@type": "City", "name": "Madison, Mississippi" },
      "description": "Kitchen remodeling, bathroom remodeling, room additions, and broader residential renovations for Madison-area homeowners."
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
      "mainEntity": faqs.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": { "@type": "Answer", "text": item.answer }
      }))
    }
  ]
};

export default function MadisonRemodeling() {
  const handleCall = () => {
    base44.analytics.track({ eventName: "phone_click", properties: { source: "madison_remodeling_page" } });
    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", { send_to: "AW-17864041271/CKLvCOWk3_IbELfGnsZC", value: 30, currency: "USD" });
    }
  };
  const { hero: heroImage } = usePageImages("MadisonRemodeling");

  return (
    <div className="min-h-screen bg-background pt-16 md:pt-20">
      <SEOHead
        title="Home Remodeling for Madison, MS Homeowners | Bradley Brown Inc"
        description="Bradley Brown Inc. serves Madison-area homeowners with kitchen, bathroom, addition, and broader remodeling options. Request an estimate."
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
      <div className="bg-foreground py-14 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: `url('${heroImage?.url || "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80"}')` }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sky-400 text-xs font-semibold uppercase tracking-wider mb-2">Madison, MS & Madison County</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Home Remodeling in Madison, MS<br className="hidden md:block" /> — Done Right
          </h1>
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-base md:text-lg">
            Bradley Brown Inc. provides home remodeling for Madison-area homeowners from its Brandon base. Documented services include kitchen and bathroom remodeling, room additions, and broader residential renovations. Request a free estimate to discuss your property, priorities, and scope before cost or schedule expectations are set.
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
        {/* Services */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-3">Remodeling Services for Madison Homeowners</h2>
          <p className="text-slate-600 leading-relaxed mb-6">Bradley Brown Inc. can discuss kitchen and bathroom remodeling, room additions, and broader renovation needs with Madison-area homeowners. The specific scope is confirmed after reviewing the property and project priorities.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Kitchen Remodeling", desc: "Discuss layout, storage, finishes, and the changes needed to make the kitchen work better for your household.", link: "/services/kitchen-remodeling" },
              { title: "Bathroom Remodeling", desc: "Discuss the room's current condition, priorities, desired fixtures, accessibility needs, and finish preferences.", link: "/bathroom-remodeling-brandon-ms" },
              { title: "Room Additions", desc: "Explore additional space for bedrooms, suites, offices, sunrooms, or another household need.", link: "/services/room-additions" },
              { title: "Whole-Home Renovation", desc: "Review the areas that need to function differently and the goals for a broader renovation. Request a project-specific estimate.", link: "/estimate" },
            ].map((s) => (
              <div key={s.title} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-foreground text-sm">{s.title}</h3>
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
          <h2 className="text-xl font-bold text-foreground">Planning a Remodel Around Your Home and Priorities</h2>
          <p className="text-slate-600 leading-relaxed">Start with the property location, the rooms or areas involved, what is not working today, and the result you want. Photos, measurements, plans, or inspiration can help explain the idea, but the appropriate scope, schedule, and budget depend on the property and requested work.</p>
          <p className="text-slate-600 leading-relaxed">Bradley Brown Inc. is based in Brandon and serves Central Mississippi, including Madison-area homeowners. A conversation about the property and priorities helps determine whether the project is a fit and what information is needed next.</p>
          <p className="text-slate-600 leading-relaxed">Use the estimate form or call <a href="tel:+18443514154" onClick={handleCall} className="text-sky-600 font-semibold">(844) 351-4154</a> to start the discussion.</p>
        </div>

        {/* Internal links */}
        <div className="bg-white border border-sky-100 rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">Related Services and Verified Project Work</h2>
          <p className="text-slate-600 leading-relaxed mb-5">
            Explore the related services below, then request an estimate to discuss the property, priorities, and the work that may fit your project.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/bathroom-remodeling-brandon-ms" className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-full font-semibold text-sm transition-colors">
              Bathroom Remodeling <ChevronRight className="w-4 h-4" />
            </Link>
            <Link to="/remodeling-ms" className="inline-flex items-center gap-2 bg-foreground hover:bg-secondary-foreground text-white px-5 py-3 rounded-full font-semibold text-sm transition-colors">
              Core Services — Brandon, MS <ChevronRight className="w-4 h-4" />
            </Link>
            <Link to="/custom-home-builder-madison-ms" className="inline-flex items-center gap-2 bg-primary hover:bg-accent text-white px-5 py-3 rounded-full font-semibold text-sm transition-colors">
              Custom Homes near Madison <ChevronRight className="w-4 h-4" />
            </Link>
            <Link to="/services/barndominiums" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full font-semibold text-sm transition-colors">
              Barndominium Builder <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-6 text-center">Frequently Asked Questions About Remodeling in Madison</h2>
          <LandingFAQ faqs={faqs} />
        </div>
      </div>

      <LandingCTABar headline="Ready to remodel in Madison? Let's talk." />
    </div>
  );
}
