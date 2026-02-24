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
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    price: "Starting at $250,000",
  },
  {
    icon: Wrench,
    name: "Home Renovations",
    description: "Breathe new life into your existing home with expert renovations. Whether it's a full home remodel or a single room transformation, our team delivers exceptional craftsmanship.",
    features: ["Kitchen & bath remodels", "Basement finishing", "Flooring & tile work", "Electrical & plumbing updates", "Custom cabinetry", "Painting & trim work"],
    image: "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/31b031d9-2d3e-4f27-3859-edc447039100/logo",
    price: "Starting at $15,000",
  },
  {
    icon: Plus,
    name: "Office Remodel",
    description: "Need an updated home office? We design luxury with efficiency.",
    features: ["Master suite additions", "Family room expansions", "Sunroom construction", "In-law suites", "Garage conversions", "Second story additions"],
    image: "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/8fa9542f-abce-4de1-6d95-5ebe09c2dd00/small",
    price: "Starting at $5,000",
  },
  {
    icon: Leaf,
    name: "Outdoor Living",
    description: "Mississippi's climate is made for outdoor living. We design and build beautiful outdoor spaces that extend your home's footprint and enhance your lifestyle year-round.",
    features: ["Covered patios & porches", "Outdoor kitchens", "Decks & pergolas", "Pool surrounds", "Landscape integration", "Outdoor lighting systems"],
    image: "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/87585406-af1b-4e1b-b10e-cacbebcc5a00/small",
    price: "Starting at $10,000",
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      <SEOHead
        title="Construction Services – Custom Homes, Renovations & Additions"
        description="Bradley Brown Inc. offers custom home building, kitchen and bath renovations, home office upgrades, room additions, and outdoor living construction across Central Mississippi. Starting at $6,000."
        schema={servicesSchema}
      />
      <div className="bg-[#1E2D3D] py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sky-400 font-semibold text-sm uppercase tracking-wider mb-2">What We Offer</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white">Our Services</h1>
          <p className="text-slate-300 mt-4 max-w-xl mx-auto">Comprehensive construction services for Central Mississippi homeowners, from foundation to finish.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="space-y-16 md:space-y-24">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isEven = i % 2 === 0;
            return (
              <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
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
                      to={createPageUrl("QuoteAssistant")}
                      className="inline-flex items-center gap-1 bg-sky-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-sky-600 transition-colors"
                    >
                      Get a Quote <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
                <div className={`rounded-xl overflow-hidden shadow-lg ${isEven ? "order-2" : "order-2 md:order-1"}`}>
                  <img src={service.image} alt={service.name} className="w-full h-64 md:h-80 object-cover" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-[#1E2D3D] py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Not Sure Which Service You Need?</h2>
          <p className="text-slate-300 mb-8">Our team is happy to consult with you about your project and recommend the best approach.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("QuoteAssistant")} className="inline-flex items-center justify-center gap-2 bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors">
              Get AI-Powered Estimate <ChevronRight className="w-4 h-4" />
            </Link>
            <a href="tel:+16012345678" className="inline-flex items-center justify-center gap-2 border border-slate-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              <Phone className="w-4 h-4" /> Call (601) 234-5678
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}