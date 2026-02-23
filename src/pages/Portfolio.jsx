import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { MapPin, Maximize2, Calendar, SlidersHorizontal } from "lucide-react";

const categoryFilters = [
  { value: "all", label: "All Projects" },
  { value: "custom_home", label: "Custom Homes" },
  { value: "renovation", label: "Renovations" },
  { value: "addition", label: "Additions" },
  { value: "outdoor", label: "Outdoor Living" },
];

const categoryLabels = { custom_home: "Custom Home", renovation: "Renovation", addition: "Addition", outdoor: "Outdoor Living" };

const placeholderProjects = [
  { title: "Ridgewood Estate", category: "custom_home", location: "Ridgeland, MS", square_footage: 3800, year_completed: 2024, images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80"] },
  { title: "Modern Kitchen & Bath Remodel", category: "renovation", location: "Madison, MS", square_footage: 1200, year_completed: 2024, images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80"] },
  { title: "Lakeside Master Suite", category: "addition", location: "Brandon, MS", square_footage: 650, year_completed: 2023, images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80"] },
  { title: "Colonial Dream Home", category: "custom_home", location: "Flowood, MS", square_footage: 4200, year_completed: 2023, images: ["https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80"] },
  { title: "Backyard Oasis Patio", category: "outdoor", location: "Pearl, MS", square_footage: 800, year_completed: 2024, images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"] },
  { title: "Craftsman Style Build", category: "custom_home", location: "Clinton, MS", square_footage: 2900, year_completed: 2022, images: ["https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&q=80"] },
];

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Project.filter({ status: "published" }, "-year_completed", 50)
      .then(data => setProjects(data.length ? data : placeholderProjects))
      .catch(() => setProjects(placeholderProjects))
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      <div className="bg-[#1E2D3D] py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[#C4922A] font-semibold text-sm uppercase tracking-wider mb-2">Our Portfolio</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white">Our Work Speaks For Itself</h1>
          <p className="text-slate-300 mt-4 max-w-xl mx-auto">Browse through our completed projects across Central Mississippi.</p>
        </div>
      </div>

      <div className="sticky top-16 md:top-20 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 flex-shrink-0" />
            {categoryFilters.map(f => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === f.value ? "bg-[#C4922A] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-72 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <div key={project.id || i} className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.images?.[0] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#C4922A] text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      {categoryLabels[project.category] || project.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#1E2D3D] text-lg mb-2">{project.title}</h3>
                  <div className="flex flex-wrap gap-3 text-slate-400 text-sm">
                    {project.location && (
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{project.location}</span>
                    )}
                    {project.square_footage && (
                      <span className="flex items-center gap-1"><Maximize2 className="w-3.5 h-3.5" />{project.square_footage.toLocaleString()} sqft</span>
                    )}
                    {project.year_completed && (
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{project.year_completed}</span>
                    )}
                  </div>
                  {project.short_description && (
                    <p className="text-slate-500 text-sm mt-3 line-clamp-2">{project.short_description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg">No projects in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}