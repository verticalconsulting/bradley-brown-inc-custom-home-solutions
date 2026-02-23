import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { MapPin, ChevronRight } from "lucide-react";

const placeholderProjects = [
  { title: "Ridgewood Estate", category: "custom_home", location: "Ridgeland, MS", square_footage: 3800, images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80"] },
  { title: "Madison Kitchen & Bath Remodel", category: "renovation", location: "Madison, MS", square_footage: 1200, images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80"] },
  { title: "Lakeside Master Suite Addition", category: "addition", location: "Brandon, MS", square_footage: 650, images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80"] },
];

const categoryLabels = { custom_home: "Custom Home", renovation: "Renovation", addition: "Addition", outdoor: "Outdoor Living" };

export default function FeaturedProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    base44.entities.Project.filter({ featured: true, status: "published" }, "-created_date", 3)
      .then(data => setProjects(data.length ? data : placeholderProjects))
      .catch(() => setProjects(placeholderProjects));
  }, []);

  const display = projects.length ? projects : placeholderProjects;

  return (
    <section className="py-16 md:py-24 bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-[#C4922A] font-semibold text-sm uppercase tracking-wider mb-2">Our Work</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E2D3D]">Featured Projects</h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">A glimpse of the homes and spaces we've crafted across Central Mississippi.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {display.map((project, i) => (
            <div key={i} className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative h-56 md:h-64 overflow-hidden">
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
              <div className="bg-white p-5">
                <h3 className="font-bold text-[#1E2D3D] text-lg mb-1">{project.title}</h3>
                <div className="flex items-center gap-1 text-slate-400 text-sm">
                  <MapPin className="w-3.5 h-3.5" /> {project.location}
                </div>
                {project.square_footage && (
                  <p className="text-slate-400 text-sm mt-0.5">{project.square_footage.toLocaleString()} sq ft</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to={createPageUrl("Portfolio")}
            className="inline-flex items-center gap-2 bg-[#1E2D3D] hover:bg-[#2C3E50] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            View All Projects <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}