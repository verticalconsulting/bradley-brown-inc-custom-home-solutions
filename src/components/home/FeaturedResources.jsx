import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, DollarSign, Star, Warehouse, Hammer, FileText, ChevronRight, Crown, Banknote, Plus, Bath, Leaf, MapPin, AlertTriangle, Palette, Home } from "lucide-react";

const resources = [
  {
    to: "/finish-package-studio",
    icon: Palette,
    title: "AI Finish Package Studio",
    desc: "Upload an inspiration photo — get 3 themed packages with budget alternatives.",
    color: "text-fuchsia-500",
    bg: "bg-fuchsia-50",
  },
  {
    to: "/quote",
    icon: Sparkles,
    title: "Get a Free Quote",
    desc: "Fast, no-obligation project estimate from our team.",
    color: "text-sky-500",
    bg: "bg-sky-50",
  },
  {
    to: "/home-remodeling-cost",
    icon: DollarSign,
    title: "Home Remodeling Cost Guide",
    desc: "Transparent pricing for kitchens, baths, additions & more.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    to: "/customertestimonials",
    icon: Star,
    title: "Customer Testimonials",
    desc: "See why Brandon homeowners trust Bradley Brown Inc.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    to: "/barndominium-builder",
    icon: Warehouse,
    title: "Barndominium Builder",
    desc: "Custom steel-frame barndominiums built across Mississippi.",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    to: "/barndominiums-ms",
    icon: Warehouse,
    title: "Barndominiums in MS",
    desc: "Why Mississippi families are choosing barndominiums.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    to: "/remodeling-ms",
    icon: Hammer,
    title: "Remodeling in MS",
    desc: "Core remodeling services serving Central Mississippi.",
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  },
  {
    to: "/projects/historic-home-restoration",
    icon: FileText,
    title: "Historic Home Restoration",
    desc: "Featured project: a 1920s craftsman home in Brandon.",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    to: "/LuxuryHomeRenovations",
    icon: Crown,
    title: "Luxury Home Renovations",
    desc: "High-end renovations with premium finishes and custom millwork.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    to: "/RenovationLoans",
    icon: Banknote,
    title: "Renovation Loans",
    desc: "Financing options to make your remodel affordable.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    to: "/HomeAdditionIdeas",
    icon: Plus,
    title: "Home Addition Ideas",
    desc: "Inspiration for room additions, sunrooms & in-law suites.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    to: "/SmallBathroomIdeas",
    icon: Bath,
    title: "Small Bathroom Ideas",
    desc: "Design ideas to maximize style in a compact bathroom.",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
  {
    to: "/EnergyEfficientUpgrades",
    icon: Leaf,
    title: "Energy-Efficient Upgrades",
    desc: "Save on bills with smart energy upgrades for your home.",
    color: "text-lime-600",
    bg: "bg-lime-50",
  },
  {
    to: "/LandingBrandonRemodelers",
    icon: MapPin,
    title: "Home Remodelers in Brandon, MS",
    desc: "Kitchen, bath & whole-home renovations in Brandon and Rankin County.",
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    to: "/custom-home-builder-brandon-ms",
    icon: Home,
    title: "Custom Home Builder in Brandon, MS",
    desc: "Custom homes, new construction & luxury builds in Rankin County.",
    color: "text-[#1E2D3D]",
    bg: "bg-slate-100",
  },
  {
    to: "/remodeling-ms",
    icon: Hammer,
    title: "Home Remodeling in Mississippi",
    desc: "Statewide remodeling services for Mississippi homeowners.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    to: "/LandingEmergencyRepair",
    icon: AlertTriangle,
    title: "Emergency Home Repairs",
    desc: "Fast response for storm damage and urgent repairs.",
    color: "text-red-600",
    bg: "bg-red-50",
  },
];

export default function FeaturedResources() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-sky-400 font-semibold text-sm uppercase tracking-wider mb-2">Helpful Resources</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E2D3D]">Plan Your Project</h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            Free tools, pricing guides, and real stories to help you make confident decisions about your home.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {resources.map((r) => {
            const Icon = r.icon;
            return (
              <Link
                key={r.to}
                to={r.to}
                className="group p-6 border border-[#E2D9CC] rounded-xl hover:border-sky-400 hover:shadow-lg transition-all duration-300 bg-white"
              >
                <div className={`w-12 h-12 ${r.bg} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${r.color}`} />
                </div>
                <h3 className="font-bold text-[#1E2D3D] mb-2">{r.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-3">{r.desc}</p>
                <span className="inline-flex items-center gap-1 text-sky-500 text-sm font-semibold group-hover:gap-2 transition-all">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}