import React, { useState, useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { MapPin, Maximize2, Calendar, SlidersHorizontal, ChevronRight, Instagram } from "lucide-react";
import PullToRefresh from "@/components/PullToRefresh";
import InstagramFeed from "@/components/portfolio/InstagramFeed";

const categoryFilters = [
  { value: "all", label: "All Projects" },
  { value: "custom_home", label: "Custom Homes" },
  { value: "renovation", label: "Renovations" },
  { value: "addition", label: "Additions" },
  { value: "outdoor", label: "Outdoor Living" },
];

const categoryLabels = { custom_home: "Custom Home", renovation: "Renovation", addition: "Addition", outdoor: "Outdoor Living" };

const placeholderProjects = [
  { title: "Office Addition", category: "addition", location: "Brandon, MS", square_footage: 500, year_completed: 2024, images: ["https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/6c9b1767-038f-4dfc-fcc3-a97c611b7700/heromobile"] },
  { title: "County Custom Built", category: "custom_home", location: "Canton, MS", square_footage: 3200, year_completed: 2024, images: ["https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/cf31ad9a-e08a-4158-ddd3-ca127b735b00/large"] },
  { title: "Luxury Kitchen", category: "renovation", location: "Madison, MS", square_footage: 800, year_completed: 2024, images: ["https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/932d74d8-4f05-4b52-fa85-6903e1e42b00/large"] },
  { title: "Belhaven Master Bath", category: "renovation", location: "Jackson, MS", square_footage: 550, year_completed: 2023, images: ["https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/466141bd-cb8b-493a-6dce-ce29737aa600/large"] },
  { title: "Outdoor Oasis", category: "outdoor", location: "Ridgeland, MS", square_footage: 900, year_completed: 2023, images: ["https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/a550b013-bf54-4156-5f21-ebabe8869600/large"] },
];

const exploreLinks = [
  { label: "Our Services", to: "/services" },
  { label: "Get a Free Estimate", to: "/estimate" },
  { label: "Contact Us", to: "/contact" },
  { label: "Pricing Guide", to: "/pricing" },
  { label: "Pro Tips Blog", to: "/protips" },
  { label: "Home Addition Ideas", to: "/protips/home-addition-ideas" },
  { label: "Small Bathroom Ideas", to: "/protips/small-bathroom-ideas" },
  { label: "Energy-Efficient Upgrades", to: "/protips/energy-efficient-upgrades" },
  { label: "Renovation Loans & Financing", to: "/protips/renovation-loans" },
  { label: "Barndominiums", to: "/services/barndominiums" },
  { label: "Brandon MS Remodelers", to: "/remodeling-brandon-ms" },
  { label: "Custom Home Builder", to: "/custom-home-builder-brandon-ms" },
  { label: "Emergency Repairs", to: "/services/emergency-repairs" },
];

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const loadProjects = () => {
    base44.entities.Project.filter({ status: "published" }, "-year_completed", 50)
      .then(data => setProjects(data.length ? data : placeholderProjects))
      .catch(() => setProjects(placeholderProjects))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const handleRefresh = async () => {
    loadProjects();
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      <SEOHead
        title="Project Portfolio | Bradley Brown Inc — Brandon, MS"
        description="Browse our portfolio of custom homes, kitchen & bath renovations, additions & outdoor living across Brandon, Madison & Central MS. Call (844) 351-4154."
        canonical="https://bradleybrowninc.com/portfolio"
      />
      <div className="bg-[#1E2D3D] py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sky-400 font-semibold text-sm uppercase tracking-wider mb-2">Our Portfolio</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white">Our Work Speaks For Itself</h1>
          <p className="text-slate-300 mt-4 max-w-xl mx-auto">Browse through our completed projects across Central Mississippi.</p>
        </div>
      </div>

      <div className="sticky top-16 md:top-20 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 flex-shrink-0" />
            {categoryFilters.map(filter => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === filter.value ? "bg-sky-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {filter.label}
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
                    alt={`${categoryLabels[project.category] || project.category || "Project"} by Bradley Brown Inc — ${project.location || "Mississippi"}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-sky-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
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

        {/* Featured Project Story */}
        <div className="mt-10 bg-gradient-to-br from-[#1E2D3D] to-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-center">
            <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
              <img src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80" alt="Historic home restoration by Bradley Brown Inc. — Brandon, MS" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="p-8 md:p-10">
              <p className="text-[#C4922A] font-semibold text-xs uppercase tracking-wider mb-2">Featured Project Story</p>
              <h3 className="text-2xl font-bold text-white mb-3">Historic Home Restoration in Brandon, MS</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-5">
                See how we preserved a 1920s craftsman home — restoring original heart pine floors, rebuilding the wraparound porch, and modernizing every system while honoring its history.
              </p>
              <Link to="/projects/historic-home-restoration" className="inline-flex items-center gap-2 bg-[#C4922A] hover:bg-[#A37820] text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-colors">
                Read the Full Story <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Instagram Feed */}
        <div className="mt-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
            <div>
              <p className="text-sky-500 font-semibold text-sm uppercase tracking-wider mb-1 flex items-center gap-2">
                <Instagram className="w-4 h-4" /> Follow Along
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1E2D3D]">Latest from Instagram</h2>
              <p className="text-slate-500 text-sm mt-1">Behind-the-scenes shots & finished projects, straight from the field.</p>
            </div>
            <a
              href="https://www.instagram.com/bradleybrowninc/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity self-start sm:self-auto"
            >
              <Instagram className="w-4 h-4" /> View Profile
            </a>
          </div>
          <InstagramFeed />
        </div>

        {/* Internal links */}
        <div className="mt-12 bg-slate-50 border border-gray-200 rounded-xl p-5">
          <h2 className="font-bold text-[#1E2D3D] text-sm mb-3">Explore More</h2>
          <div className="flex flex-wrap gap-2">
            {exploreLinks.map(navItem => (
              <Link key={navItem.to} to={navItem.to} className="inline-flex items-center gap-1 bg-white border border-gray-200 text-sky-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-sky-50 transition-colors">
                <ChevronRight className="w-3 h-3" /> {navItem.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
    </PullToRefresh>
  );
}