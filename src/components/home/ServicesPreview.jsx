import React from "react";
import { useQuery } from "@tanstack/react-query";
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
  "custom-homes": CustomHomeIcon,
  "kitchen-remodeling": KitchenIcon,
  "bathroom-remodeling": BathroomIcon,
  "room-additions": RoomAdditionIcon,
  "additions": RoomAdditionIcon,
  "outdoor-living": OutdoorLivingIcon,
  barndominiums: BarndominiumIcon,
  renovations: HomeRenovationIcon,
};

// Maps the Service entity `slug` values (from the database) to the
// actual route paths defined in App.jsx.  DB slugs don't always match
// the route segment (e.g. slug "custom-homes" → /services/custom-home-building).
const slugToRoute = {
  "custom-homes": "/services/custom-home-building",
  "custom-home-building": "/services/custom-home-building",
  "kitchen-remodeling": "/services/kitchen-remodeling",
  "bathroom-remodeling": "/services/bathroom-remodeling",
  "additions": "/services/room-additions",
  "room-additions": "/services/room-additions",
  "outdoor-living": "/services/outdoor-living",
  "barndominiums": "/services/barndominiums",
  "emergency-repairs": "/services/emergency-repairs",
  // "renovations" has no dedicated service page — link to the Services hub.
  "renovations": "/services",
};

const defaultServices = [
  { name: "Custom Home Building", short_description: "Design and build your perfect home from the ground up, tailored to your vision and lifestyle.", icon: "custom-home-building", link: "/services/custom-home-building" },
  { name: "Kitchen Remodeling", short_description: "Custom cabinetry, granite & quartz countertops, tile backsplashes & islands — built for how your family cooks.", icon: "kitchen-remodeling", link: "/services/kitchen-remodeling" },
  { name: "Bathroom Remodeling", short_description: "Walk-in showers, tub-to-shower conversions, tile & vanities — Brandon MS bath remodeling experts.", icon: "bathroom-remodeling", link: "/services/bathroom-remodeling" },
  { name: "Room Additions", short_description: "Expand your living space seamlessly with additions that blend perfectly with your existing home.", icon: "room-additions", link: "/services/room-additions" },
  { name: "Outdoor Living", short_description: "Create stunning patios, decks, and outdoor kitchens for Mississippi's beautiful weather.", icon: "outdoor-living", link: "/services/outdoor-living" },
  { name: "Barndominiums", short_description: "Custom steel-frame barndominiums combining living space, garages & workshops — built for Mississippi.", icon: "barndominiums", link: "/services/barndominiums" },
];

// Stable marketing content — cached by react-query (staleTime 10 min) so revisits
// and back-navigation don't refetch. Home only mounts this section near the
// viewport (VisibleMount), so the call never runs during initial page load.
export default function ServicesPreview() {
  const { data: services = [] } = useQuery({
    queryKey: ["home", "services"],
    queryFn: () => base44.entities.Service.filter({ active: true }, "order", 4),
    staleTime: 10 * 60 * 1000,
  });

  const display = services.length ? services : defaultServices;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">What We Do</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Services</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">From the foundation to the finishing touches, we handle every aspect of your construction project.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {display.map((service, i) => {
            const Icon = iconMap[service.icon] || iconMap[service.slug] || HomeRenovationIcon;
            const link = service.link || (service.slug ? (slugToRoute[service.slug] || `/services/${service.slug}`) : null);
            const card = (
              <div key={i} className="group p-6 border border-border rounded-xl hover:border-primary hover:shadow-lg transition-all duration-300 bg-background cursor-pointer h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl flex items-center justify-center mb-4 group-hover:from-primary group-hover:to-primary/80 transition-all duration-300">
                  <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{service.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.short_description}</p>
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
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all px-7 py-4 min-h-[52px] rounded-lg border-2 border-primary hover:bg-primary hover:text-white"
          >
            View All Services <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}