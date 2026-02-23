import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { Home, Wrench, Plus, Leaf, ChevronRight } from "lucide-react";

const iconMap = { Home, Wrench, Plus, Leaf };

const defaultServices = [
  { name: "Custom Home Building", short_description: "Design and build your perfect home from the ground up, tailored to your vision and lifestyle.", icon: "Home" },
  { name: "Home Renovations", short_description: "Transform your existing space with expert remodeling that adds value and improves your daily life.", icon: "Wrench" },
  { name: "Room Additions", short_description: "Expand your living space seamlessly with additions that blend perfectly with your existing home.", icon: "Plus" },
  { name: "Outdoor Living", short_description: "Create stunning patios, decks, and outdoor kitchens for Mississippi's beautiful weather.", icon: "Leaf" },
];

export default function ServicesPreview() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    base44.entities.Service.filter({ active: true }, "order", 4)
      .then(data => setServices(data.length ? data : defaultServices))
      .catch(() => setServices(defaultServices));
  }, []);

  const display = services.length ? services : defaultServices;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-sky-400 font-semibold text-sm uppercase tracking-wider mb-2">What We Do</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E2D3D]">Our Services</h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">From the foundation to the finishing touches, we handle every aspect of your construction project.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {display.map((service, i) => {
            const Icon = iconMap[service.icon] || Home;
            return (
              <div key={i} className="group p-6 border border-[#E2D9CC] rounded-xl hover:border-sky-400 hover:shadow-lg transition-all duration-300 bg-white">
                <div className="w-12 h-12 bg-sky-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-sky-400 transition-colors">
                  <Icon className="w-6 h-6 text-sky-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-[#1E2D3D] mb-2">{service.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{service.short_description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            to={createPageUrl("Services")}
            className="inline-flex items-center gap-2 text-sky-400 font-semibold hover:gap-3 transition-all"
          >
            View All Services <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}