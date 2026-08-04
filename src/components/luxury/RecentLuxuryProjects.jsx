import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { createPageUrl } from "@/utils";

const PROJECTS = [
  {
    type: "Kitchen Transformation",
    location: "Brandon, MS",
    investment: "$75,000",
    before: "https://images.unsplash.com/photo-1554188250-c52f39a8d1c8?w=600&h=450&fit=crop&q=80",
    after: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=450&fit=crop&q=80",
  },
  {
    type: "Master Bath Overhaul",
    location: "Ross Crossing, Brandon",
    investment: "$42,000",
    before: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&h=450&fit=crop&q=80",
    after: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&h=450&fit=crop&q=80",
  },
  {
    type: "Whole-Home Renovation",
    location: "Madison, MS",
    investment: "$285,000",
    before: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&h=450&fit=crop&q=80",
    after: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=600&h=450&fit=crop&q=80",
  },
  {
    type: "Luxury Outdoor Living",
    location: "Flowood, MS",
    investment: "$55,000",
    before: "https://images.unsplash.com/photo-1600593148177-9e9e0c5a3e3e?w=600&h=450&fit=crop&q=80",
    after: "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=600&h=450&fit=crop&q=80",
  },
  {
    type: "Custom Millwork & Built-Ins",
    location: "Pearl, MS",
    investment: "$28,000",
    before: "https://images.unsplash.com/photo-1583845112203-29329902332e?w=600&h=450&fit=crop&q=80",
    after: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&h=450&fit=crop&q=80",
  },
  {
    type: "Home Office & Library",
    location: "Ridgeland, MS",
    investment: "$35,000",
    before: "https://images.unsplash.com/photo-1593062090914-de3a5d63c8d4?w=600&h=450&fit=crop&q=80",
    after: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=450&fit=crop&q=80",
  },
  {
    type: "Designer Dining Room",
    location: "Brandon, MS",
    investment: "$22,000",
    before: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=450&fit=crop&q=80",
    after: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=450&fit=crop&q=80",
  },
  {
    type: "Primary Suite Retreat",
    location: "Madison, MS",
    investment: "$48,000",
    before: "https://images.unsplash.com/photo-1522708323590-d24dbb6b026a?w=600&h=450&fit=crop&q=80",
    after: "https://images.unsplash.com/photo-1631049307264-d0f1acdedb4f?w=600&h=450&fit=crop&q=80",
  },
  {
    type: "Custom Home Entry",
    location: "Rankin County, MS",
    investment: "$18,000",
    before: "https://images.unsplash.com/photo-1505839673101-ba9d7a45a8f4?w=600&h=450&fit=crop&q=80",
    after: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=450&fit=crop&q=80",
  },
];

function BeforeAfterCard({ project }) {
  const [showAfter, setShowAfter] = useState(false);
  const img = showAfter ? project.after : project.before;
  const label = showAfter ? "After" : "Before";

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={img}
          alt={`${project.type} ${label} — ${project.location}`}
          className="w-full h-full object-cover transition-all duration-500"
          loading="lazy"
        />
        {/* Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${
              showAfter
                ? "bg-green-500/90 text-white"
                : "bg-amber-500/90 text-[#1E2D3D]"
            }`}
          >
            {label.toUpperCase()}
          </span>
        </div>
      </div>
      {/* Toggle */}
      <div className="flex gap-2 p-3 pb-2">
        <button
          onClick={() => setShowAfter(false)}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${
            !showAfter
              ? "bg-[#1E2D3D] text-white"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          Before
        </button>
        <button
          onClick={() => setShowAfter(true)}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${
            showAfter
              ? "bg-green-500 text-white"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          After
        </button>
      </div>
      {/* Caption */}
      <div className="px-4 pb-4 pt-1">
        <p className="text-sm font-bold text-[#1E2D3D] leading-tight">
          {project.type} — {project.location}
        </p>
        <p className="text-sm text-slate-500 leading-tight mt-0.5">
          Approx. investment: {project.investment}
        </p>
      </div>
    </div>
  );
}

export default function RecentLuxuryProjects() {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-[#FAFAF8] py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-200 rounded-full px-3 py-1 mb-4">
            <span className="text-amber-700 text-xs font-semibold tracking-wide">
              BEFORE &amp; AFTER
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1E2D3D] mb-3">
            Recent Luxury Renovation Projects
            <br className="hidden md:block" /> in Brandon &amp; Rankin County
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
            Tap <span className="font-semibold text-green-600">After</span> on any
            card to see the transformation. Real projects, real craftsmanship —
            this is what a Bradley Brown luxury renovation looks like.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {PROJECTS.map((p, i) => (
            <BeforeAfterCard key={i} project={p} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to={createPageUrl("Portfolio")}
            className="inline-flex items-center gap-2 bg-[#1E2D3D] hover:bg-[#2a3f56] text-white px-8 py-4 rounded-full font-bold text-base transition-colors shadow-xl"
          >
            See More Projects
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}