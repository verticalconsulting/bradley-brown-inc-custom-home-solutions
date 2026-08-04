import React from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { Home, Wrench, Plus, Leaf, Warehouse, AlertTriangle, ChevronRight, Phone, Sparkles, Shield, Award, Star, Clock, MapPin } from "lucide-react";
import { base44 } from "@/api/base44Client";

const services = [
  {
    icon: Home,
    color: "sky",
    name: "Custom Home Building",
    desc: "Full design-build custom homes in Brandon & Rankin County — from blueprint to move-in.",
    path: "/services/custom-home-building",
    price: "Starting at $250,000",
  },
  {
    icon: Wrench,
    color: "indigo",
    name: "Kitchen Remodeling",
    desc: "Custom cabinetry, granite & quartz countertops, tile backsplashes & islands — built for how your family cooks.",
    path: "/services/kitchen-remodeling",
    price: "Starting at $15,000",
  },
  {
    icon: Wrench,
    color: "indigo",
    name: "Bathroom Remodeling",
    desc: "Walk-in showers, tub-to-shower conversions, custom tile & vanities — waterproofed for Mississippi's humidity.",
    path: "/services/bathroom-remodeling",
    price: "Starting at $8,000",
  },
  {
    icon: Plus,
    color: "emerald",
    name: "Room Additions",
    desc: "Master suites, in-law suites, home offices, sunrooms — seamless additions that match your home.",
    path: "/services/room-additions",
    price: "Starting at $50,000",
  },
  {
    icon: Leaf,
    color: "green",
    name: "Outdoor Living Spaces",
    desc: "Covered patios, outdoor kitchens, custom decks & pergolas built for Mississippi's climate.",
    path: "/services/outdoor-living",
    price: "Starting at $10,000",
  },
  {
    icon: Warehouse,
    color: "amber",
    name: "Barndominiums",
    desc: "Steel-frame barndominiums combining living space, workshops & garages on your land.",
    path: "/services/barndominiums",
    price: "$75–$150 / sq ft",
  },
  {
    icon: AlertTriangle,
    color: "red",
    name: "Emergency Repairs",
    desc: "Storm damage, roof leaks, structural issues — fast response across Central Mississippi.",
    path: "/services/emergency-repairs",
    price: "Same-week service",
  },
];

const colorMap = {
  sky: { icon: "bg-sky-50 text-sky-500", btn: "bg-sky-500 hover:bg-sky-600" },
  indigo: { icon: "bg-indigo-50 text-indigo-500", btn: "bg-indigo-500 hover:bg-indigo-600" },
  emerald: { icon: "bg-emerald-50 text-emerald-500", btn: "bg-emerald-500 hover:bg-emerald-600" },
  green: { icon: "bg-green-50 text-green-600", btn: "bg-green-600 hover:bg-green-700" },
  amber: { icon: "bg-amber-50 text-amber-600", btn: "bg-amber-500 hover:bg-amber-600" },
  red: { icon: "bg-red-50 text-red-500", btn: "bg-red-500 hover:bg-red-600" },
};

export default function Services() {
  const trackCall = () => {
    base44.analytics.track({ eventName: "phone_click", properties: { source: "services_hub" } });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      <SEOHead
        title="Remodeling Services in Brandon, MS | Bradley Brown Inc"
        description="Custom homes, kitchen & bath remodels, additions, outdoor living & barndominiums in Brandon, MS. Licensed since 1995. Call (844) 351-4154."
        canonical="https://bradleybrowninc.com/services"
      />

      <div className="bg-[#1E2D3D] py-14 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 bg-sky-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sky-400 font-semibold text-sm uppercase tracking-wider mb-3">Brandon, MS & Central Mississippi</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">Our Services</h1>
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Licensed, insured, and trusted since 1995. From custom homes to emergency repairs, we bring Central Mississippi homeowners' visions to life.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/estimate" className="inline-flex items-center justify-center gap-2 bg-[#C4922A] hover:bg-[#A37820] text-white px-8 py-4 rounded-full font-bold text-base transition-colors shadow-lg">
              <Sparkles className="w-5 h-5" /> Get My Free Estimate
            </Link>
            <a href="tel:+18443514154" onClick={trackCall} className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-base transition-colors">
              <Phone className="w-5 h-5" /> (844) 351-4154
            </a>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-sky-400" /> Licensed & Insured</span>
            <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-sky-400" /> 30+ Years</span>
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> 4.9★ Rated</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-sky-400" /> 500+ Homes Built</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            const colors = colorMap[service.color];
            return (
              <Link
                key={service.path}
                to={service.path}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col"
              >
                <div className="p-6 flex-1">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colors.icon}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-[#1E2D3D] mb-2">{service.name}</h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{service.desc}</p>
                  <p className="text-sm font-semibold text-slate-400">{service.price}</p>
                </div>
                <div className="px-6 pb-6">
                  <span className={`inline-flex items-center gap-1.5 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${colors.btn}`}>
                    Learn More <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Areas We Serve */}
      <div className="bg-[#F5F2ED] py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E2D3D] mb-3">Areas We Serve in Central Mississippi</h2>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Bradley Brown Inc. serves homeowners across Rankin, Madison, and Hinds counties — and the greater Jackson metro area. Explore our dedicated local pages:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/remodeling-brandon-ms" className="inline-flex items-center gap-1.5 bg-white border border-sky-200 text-sky-700 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-sky-50 transition-colors">
              <MapPin className="w-4 h-4" /> Brandon, MS Remodeling
            </Link>
            <Link to="/madison-ms-home-remodeling" className="inline-flex items-center gap-1.5 bg-white border border-sky-200 text-sky-700 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-sky-50 transition-colors">
              <MapPin className="w-4 h-4" /> Madison, MS Remodeling
            </Link>
            <Link to="/remodeling-ms" className="inline-flex items-center gap-1.5 bg-white border border-sky-200 text-sky-700 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-sky-50 transition-colors">
              <MapPin className="w-4 h-4" /> All of Central Mississippi
            </Link>
            <Link to="/custom-home-builder-brandon-ms" className="inline-flex items-center gap-1.5 bg-white border border-sky-200 text-sky-700 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-sky-50 transition-colors">
              <MapPin className="w-4 h-4" /> Custom Home Builder
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-[#1E2D3D] py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to Start Your Project?</h2>
          <p className="text-slate-300 mb-8 text-base">Join 500+ Mississippi homeowners who've trusted Bradley Brown Inc. with their most important investment.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/estimate" className="inline-flex items-center justify-center gap-2 bg-[#C4922A] hover:bg-[#A37820] text-white px-8 py-4 rounded-full font-bold text-base transition-colors shadow-lg">
              <Sparkles className="w-5 h-5" /> Get My Free Estimate
            </Link>
            <a href="tel:+18443514154" onClick={trackCall} className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-base transition-colors">
              <Phone className="w-5 h-5" /> Call (844) 351-4154
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}