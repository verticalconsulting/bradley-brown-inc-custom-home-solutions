import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { ChevronRight } from "lucide-react";
import {
  CustomHomeIcon,
  KitchenIcon,
  BathroomIcon,
  RoomAdditionIcon,
  OutdoorLivingIcon,
  BarndominiumIcon,
  HomeRenovationIcon,
} from "@/components/home/ServiceIcons";

const iconMap = {
  "custom-home-building": CustomHomeIcon,
  "kitchen-remodeling": KitchenIcon,
  "bathroom-remodeling": BathroomIcon,
  "room-additions": RoomAdditionIcon,
  "outdoor-living": OutdoorLivingIcon,
  barndominiums: BarndominiumIcon,
  renovations: HomeRenovationIcon,
};

const defaultServices = [
  { name: "Custom Home Building", short_description: "Design and build your perfect home from the ground up, tailored to your vision and lifestyle.", icon: "custom-home-building", link: "/services/custom-home-building" },
  { name: "Kitchen Remodeling", short_description: "Custom cabinetry, granite & quartz countertops, tile backsplashes & islands — built for how your family cooks.", icon: "kitchen-remodeling", link: "/services/kitchen-remodeling" },
  { name: "Bathroom Remodeling", short_description: "Walk-in showers, tub-to-shower conversions, tile & vanities — Brandon MS bath remodeling experts.", icon: "bathroom-remodeling", link: "/services/bathroom-remodeling" },
  { name: "Room Additions", short_description: "Expand your living space seamlessly with additions that blend perfectly with your existing home.", icon: "room-additions", link: "/services/room-additions" },
  { name: "Outdoor Living", short_description: "Create stunning patios, decks, and outdoor kitchens for Mississippi's beautiful weather.", icon: "outdoor-living", link: "/services/outdoor-living" },
  { name: "Barndominiums", short_description: "Custom steel-frame barndominiums combining living space, garages & workshops — built for Mississippi.", icon: "barndominiums", link: "/services/barndominiums" },
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
            const Icon = iconMap[service.icon] || iconMap[service.slug] || HomeRenovationIcon;
            const link = service.link || (service.slug ? `/services/${service.slug}` : null);
            const card = (
              <div key={i} className="group p-6 border border-[#E2D9CC] rounded-xl hover:border-sky-400 hover:shadow-lg transition-all duration-300 bg-white cursor-pointer h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-sky-50 to-sky-100 rounded-xl flex items-center justify-center mb-4 group-hover:from-[#1E2D3D] group-hover:to-[#2a3f54] transition-all duration-300">
                  <Icon className="w-7 h-7 text-[#37b5eb] group-hover:text-sky-300 transition-colors" />
                </div>
                <h3 className="font-bold text-[#1E2D3D] mb-2 group-hover:text-sky-600 transition-colors">{service.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{service.short_description}</p>
              </div>
            );
            return link ? (
              <Link key={i} to={link} className="block h-full">{card}</Link>
            ) : (
              <div key={i}>{card}</div>
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