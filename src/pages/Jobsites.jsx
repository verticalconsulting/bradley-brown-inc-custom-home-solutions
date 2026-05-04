import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import SEOHead from "@/components/SEOHead";
import { MapPin, Calendar, ChevronRight } from "lucide-react";
import { format } from "date-fns";

const SERVICE_LABELS = {
  custom_home: "Custom Home",
  kitchen_remodel: "Kitchen Remodel",
  bathroom_renovation: "Bathroom Renovation",
  room_addition: "Room Addition",
  outdoor_living: "Outdoor Living",
  barndominium: "Barndominium",
  repair_maintenance: "Repair / Maintenance",
  other: "Other",
};

export default function Jobsites() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.JobCheckin.filter({ status: "published" }, "-checkin_date", 100)
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Recent Jobsites — Bradley Brown Inc.",
    "itemListElement": items.slice(0, 20).map((it, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `https://bradleybrowninc.com/jobsites/${it.slug}`,
      "name": it.title,
    })),
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      <SEOHead
        title="Recent Jobsites — Bradley Brown Inc. | Local Mississippi Construction Work"
        description="Real jobsite check-ins from Bradley Brown Inc. crews working across Brandon, Madison, Ridgeland, Jackson and Central Mississippi. See where we've been and what we built."
        canonical="https://bradleybrowninc.com/jobsites"
        schema={schema}
      />
      <div className="bg-[#1E2D3D] py-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-sky-400 font-semibold text-sm uppercase tracking-wider mb-2">Where We've Been</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Recent Jobsites Across Mississippi</h1>
          <p className="text-slate-300 mt-3 max-w-2xl mx-auto text-sm md:text-base">
            Real check-ins from our crews — fresh from the field. Every one shows when, where, and what we built for our neighbors.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="bg-white rounded-xl h-64 animate-pulse" />)}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 text-slate-400">No jobsites published yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map(it => (
              <Link key={it.id} to={`/jobsites/${it.slug}`} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                  {it.photos?.[0] ? (
                    <img src={it.photos[0]} alt={it.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300"><MapPin className="w-10 h-10" /></div>
                  )}
                </div>
                <div className="p-4">
                  <span className="inline-block bg-sky-50 text-sky-700 text-xs font-semibold px-2 py-0.5 rounded mb-2">{SERVICE_LABELS[it.service] || it.service}</span>
                  <h2 className="font-bold text-[#1E2D3D] text-base leading-snug mb-2">{it.title}</h2>
                  <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{[it.neighborhood, it.city, it.state].filter(Boolean).join(", ")}</span>
                    {it.checkin_date && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{format(new Date(it.checkin_date), "MMM d, yyyy")}</span>}
                  </div>
                  <div className="mt-3 inline-flex items-center gap-1 text-sky-600 text-xs font-semibold">View details <ChevronRight className="w-3 h-3" /></div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}