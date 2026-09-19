import React from "react";
import { Link } from "react-router-dom";
import { Home, Wrench, Plus, Leaf, Warehouse, AlertTriangle, ChevronRight } from "lucide-react";

const resources = [
  {
    to: "/services/custom-home-building",
    icon: Home,
    title: "Custom Home Building",
    desc: "Design and build your dream home from the ground up in Brandon & Rankin County.",
    color: "text-primary",
    bg: "bg-sky-50",
  },
  {
    to: "/services/kitchen-remodeling",
    icon: Wrench,
    title: "Kitchen & Bath Remodeling",
    desc: "Custom cabinets, countertops, tile & premium finishes that add real value.",
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  },
  {
    to: "/services/room-additions",
    icon: Plus,
    title: "Room Additions",
    desc: "Master suites, in-law suites, home offices & sunrooms — seamless expansions.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    to: "/services/outdoor-living",
    icon: Leaf,
    title: "Outdoor Living",
    desc: "Covered patios, outdoor kitchens, custom decks & pergolas for Mississippi living.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    to: "/services/barndominiums",
    icon: Warehouse,
    title: "Barndominiums",
    desc: "Steel-frame barndominiums combining living space, workshops & garages.",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    to: "/services/emergency-repairs",
    icon: AlertTriangle,
    title: "Emergency Repairs",
    desc: "Storm damage, roof leaks & urgent structural repairs — fast response.",
    color: "text-red-600",
    bg: "bg-red-50",
  },
];

export default function FeaturedResources() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Our Services</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Plan Your Project</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Explore our full range of construction and remodeling services for Brandon, MS and Central Mississippi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {resources.map((r) => {
            const Icon = r.icon;
            return (
              <Link
                key={r.to}
                to={r.to}
                className="group p-6 border border-border rounded-xl hover:border-primary hover:shadow-lg transition-all duration-300 bg-white"
              >
                <div className={`w-12 h-12 ${r.bg} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${r.color}`} />
                </div>
                <h3 className="font-bold text-foreground mb-2">{r.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">{r.desc}</p>
                <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold group-hover:gap-2 transition-all">
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