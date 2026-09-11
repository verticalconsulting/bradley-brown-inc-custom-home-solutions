import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { MapPin, ChevronRight } from "lucide-react";
import { cfResponsive } from "@/lib/responsiveImage";

const placeholderProjects = [
{
  title: "Office Addition",
  category: "addition",
  location: "Brandon, MS",
  square_footage: 500,
  short_description: "Dedicated home office addition, separate HVAC zoning, custom built-in shelving, siding matched to original 1990s construction.",
  images: ["https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/6c9b1767-038f-4dfc-fcc3-a97c611b7700/medium"]
},
{
  title: "Barndominium Custom Office & Shop",
  category: "custom_home",
  location: "Brandon, MS",
  square_footage: 3200,
  short_description: "Climate-controlled workshop + finished office suite, post-frame construction, spray foam insulation, polished concrete shop floors, built to client's custom drawings.",
  images: ["https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/b3a782a9-ca3b-4d50-622d-0992951eca00/medium"]
},
{
  title: "County Custom Built",
  category: "custom_home",
  location: "Canton, MS",
  square_footage: 3200,
  short_description: "Fully custom new construction; finishes selected through the AI Finish Package Studio before groundbreak.",
  images: ["https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/cf31ad9a-e08a-4158-ddd3-ca127b735b00/medium"]
}];


const FALLBACK_PROJECT_IMAGE = "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/b3a782a9-ca3b-4d50-622d-0992951eca00/medium";

// Card grid: 1 column mobile → 2 columns at sm → 3 columns at md
const CARD_SIZES = "(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw";

const categoryLabels = { custom_home: "Custom Home", renovation: "Renovation", addition: "Addition", outdoor: "Outdoor Living" };

const buildAltText = (project) => {
  const type = categoryLabels[project.category] || project.category || "Project";
  const city = project.location || "Mississippi";
  return `${type} by Bradley Brown Inc — ${city}`;
};

// Stable portfolio content — cached by react-query (staleTime 10 min) so revisits
// and back-navigation don't refetch. Home only mounts this section near the
// viewport (VisibleMount), keeping the call out of the initial load chain.
export default function FeaturedProjects() {
  const { data: projects = [] } = useQuery({
    queryKey: ["home", "featuredProjects"],
    queryFn: () =>
      base44.entities.Project.filter({ featured: true, status: "published" }, "-created_date", 3),
    staleTime: 10 * 60 * 1000,
  });

  const display = projects.length ? projects : placeholderProjects;

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="font-semibold text-sm uppercase tracking-wider mb-2 text-[hsl(var(--background))]">OUR WORK</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--background))]">Featured Projects</h2>
          <p className="mt-3 max-w-xl mx-auto text-[hsl(var(--ring))]">A glimpse of the homes and spaces we've crafted across Central Mississippi.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {display.map((project, i) => {
          const { src, srcSet } = cfResponsive(project.images?.[0] || FALLBACK_PROJECT_IMAGE, [400, 800]);
          return (
          <div key={i} className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img
                src={src}
                srcSet={srcSet || undefined}
                sizes={srcSet ? CARD_SIZES : undefined}
                alt={buildAltText(project)}
                width="400"
                height="256"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async" />
              
                <div className="absolute top-3 left-3">
                  <span className="bg-primary text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    {categoryLabels[project.category] || project.category}
                  </span>
                </div>
              </div>
              <div className="bg-background p-5">
                <h3 className="font-bold text-foreground text-lg mb-1">{project.title}</h3>
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <MapPin className="w-3.5 h-3.5" /> {project.location}
                </div>
                {project.square_footage &&
              <p className="text-muted-foreground text-sm mt-0.5">{project.square_footage.toLocaleString()} sq ft</p>
              }
                {project.short_description &&
              <p className="text-foreground/70 text-sm mt-2 leading-relaxed">{project.short_description}</p>
              }
              </div>
            </div>
          );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 bg-foreground hover:opacity-90 text-white px-8 py-4 min-h-[48px] rounded-lg font-semibold transition-colors">
            
            View All Projects <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>);

}