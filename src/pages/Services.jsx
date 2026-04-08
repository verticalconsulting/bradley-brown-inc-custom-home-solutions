import React from "react";
import SEOHead from "@/components/SEOHead";
import { servicesSchema, localBusinessSchema } from "@/components/seoSchemas";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, Wrench, Plus, Leaf, Check, ChevronRight, Phone } from "lucide-react";

const services = [
  {
    icon: Home,
    name: "Custom Home Building",
    description: "Your dream home, built from the ground up. We work closely with you throughout the entire design and construction process, ensuring every detail reflects your vision and lifestyle.",
    features: ["Full architectural consultation", "Custom floor plans", "Premium material selection", "Regular progress updates", "Industry-leading warranty", "Post-build support"],
    image: "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/cf31ad9a-e08a-4158-ddd3-ca127b735b00/logo",
    price: "Starting at $250,000",
  },
  {
    icon: Wrench,
    name: "Home Renovations & Remodeling",
    description: "Breathe new life into your existing home with expert renovations. Whether it's a full home remodel, kitchen overhaul, bathroom transformation, or finish work, our team delivers exceptional craftsmanship at every stage.",
    features: ["Kitchen & bath remodels", "Whole-home renovations", "Flooring & tile work", "Electrical & plumbing updates", "Custom cabinetry", "Painting & trim work"],
    image: "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/466141bd-cb8b-493a-6dce-ce29737aa600/logo",
    price: "Starting at $15,000",
    faq: [
      { q: "How long does a kitchen remodel take?", a: "Typically 4–8 weeks depending on scope. We give you a realistic timeline upfront." },
      { q: "Do you handle permits?", a: "Yes — we pull all required permits and handle inspections so you don't have to." },
    ]
  },
  {
    icon: Plus,
    name: "Room Additions & Home Office Remodel",
    description: "Need more space? Whether it's a master suite addition, in-law suite, sunroom, or a dedicated home office, we design and build additions that blend seamlessly with your existing home's architecture.",
    features: ["Master suite additions", "Family room expansions", "Sunroom construction", "In-law suites", "Garage conversions", "Home office remodels"],
    image: "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/76d5990e-fde6-4281-e9c7-387dda7f1300/logo",
    price: "Starting at $5,000",
    faq: [
      { q: "Will an addition match my existing home?", a: "Absolutely — we match materials, rooflines, and finishes so the addition looks like it was always there." },
      { q: "Can I add a home office to my existing floor plan?", a: "Yes. We specialize in garage conversions, bonus room finishing, and purpose-built home office additions." },
    ]
  },
  {
    icon: Leaf,
    name: "Outdoor Living Spaces & Decks",
    description: "Mississippi's climate is made for outdoor living. We design and build beautiful outdoor spaces — from covered patios to full outdoor kitchens and custom decks — that extend your home's footprint and enhance your lifestyle year-round.",
    features: ["Covered patios & porches", "Outdoor kitchens", "Decks & pergolas", "Pool surrounds", "Landscape integration", "Outdoor lighting systems"],
    image: "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/c97c56d2-0c0c-40ca-15b1-892d6e909800/logo",
    price: "Starting at $10,000",
    faq: [
      { q: "What's the most popular outdoor project in Mississippi?", a: "Covered back porches with outdoor kitchens — perfect for year-round entertaining in Central Mississippi's climate." },
      { q: "Do decks need permits in Mississippi?", a: "Most decks over a certain size do. We handle all permits and inspections." },
    ]
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      <SEOHead
        title="Expert Home Remodeling Services in Brandon, MS | Bradley Brown Inc"
        description="Expert home remodeling services in Brandon, MS — kitchen remodeling, bathroom renovations, room additions & custom homes. Licensed & insured since 1995. Free estimates. Call (844) 351-4154."
        schema={servicesSchema}
        canonical="https://bradleybrowninc.com/services"
      />
      {/* Mobile click-to-call above fold */}
      <div className="md:hidden sticky top-16 z-40 bg-green-500 text-white py-2.5 px-4 text-center text-sm font-semibold">
        <a href="tel:+18443514154" className="flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" /> Call for a Free Estimate: (844) 351-4154
        </a>
      </div>
      <div className="bg-[#1E2D3D] py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sky-400 font-semibold text-sm uppercase tracking-wider mb-2">Brandon, MS & Central Mississippi</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white">Expert Home Remodeling Services in Brandon, MS</h1>
          <p className="text-slate-300 mt-4 max-w-xl mx-auto">Licensed, insured, and trusted since 1995. Serving Brandon, Flowood, Pearl, Madison, Ridgeland, Jackson & surrounding areas.</p>
          <a href="tel:+18443514154" className="mt-6 hidden md:inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold transition-colors">
            <Phone className="w-4 h-4" /> (844) 351-4154 — Free Estimate
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="space-y-16 md:space-y-24">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isEven = i % 2 === 0;
            return (
              <div key={i}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                  <div className={isEven ? "order-1" : "order-1 md:order-2"}>
                    <div className="w-12 h-12 bg-sky-50 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-sky-500" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1E2D3D] mb-4">{service.name}</h2>
                    <p className="text-slate-500 leading-relaxed mb-6">{service.description}</p>
                    <ul className="grid grid-cols-2 gap-2 mb-6">
                      {service.features.map(feature => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                          <Check className="w-4 h-4 text-sky-500 flex-shrink-0" /> {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className="text-sky-500 font-semibold">{service.price}</span>
                      <Link
                        to={createPageUrl("ContactForm")}
                        className="inline-flex items-center gap-1 bg-sky-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-sky-600 transition-colors"
                      >
                        Get a Quote <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                  <div className={`rounded-xl overflow-hidden shadow-lg ${isEven ? "order-2" : "order-2 md:order-1"}`}>
                    <img src={service.image} alt={`${service.name} in Brandon MS by Bradley Brown Inc.`} className="w-full h-64 md:h-80 object-cover" loading="lazy" width="800" height="640" />
                  </div>
                </div>
                {service.faq && (
                  <div className="mt-6 border-t border-gray-100 pt-6">
                    <h3 className="font-bold text-[#1E2D3D] text-sm mb-3">Common Questions</h3>
                    <div className="space-y-3">
                      {service.faq.map((f, fi) => (
                        <div key={fi}>
                          <p className="text-sm font-semibold text-slate-700">Q: {f.q}</p>
                          <p className="text-sm text-slate-500 mt-0.5">A: {f.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Related Services & Internal Links */}
        <div className="mt-16 bg-sky-50 border border-sky-100 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-[#1E2D3D] mb-4">Related Pages</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Schedule a Site Visit", page: "ScheduleVisit" },
              { label: "Get an Estimate", page: "ContactForm" },
              { label: "AI Estimator", page: "QuoteAssistant" },
              { label: "View Our Portfolio", page: "Portfolio" },
              { label: "Pro Tips & Remodeling Advice", page: "ProTips" },
              { label: "Contact Us", page: "Contact" },
            ].map((link) => (
              <Link key={link.page} to={createPageUrl(link.page)} className="inline-flex items-center gap-1.5 bg-white border border-sky-200 text-sky-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-sky-100 transition-colors">
                <ChevronRight className="w-3.5 h-3.5" /> {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#1E2D3D] py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Not Sure Which Service You Need?</h2>
          <p className="text-slate-300 mb-8">Our team is happy to consult with you about your project and recommend the best approach.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("ContactForm")} className="inline-flex items-center justify-center gap-2 bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors">
              Get a Free Estimate <ChevronRight className="w-4 h-4" />
            </Link>
            <a href="tel:+18443514154" className="inline-flex items-center justify-center gap-2 border border-slate-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              <Phone className="w-4 h-4" /> Call (844) 351-4154
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}