import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { MapPin, Calendar, ChevronRight } from "lucide-react";
import { format } from "date-fns";

const SERVICE_LABELS = {
  custom_home: "Custom Home", kitchen_remodel: "Kitchen Remodel", bathroom_renovation: "Bathroom Renovation",
  room_addition: "Room Addition", outdoor_living: "Outdoor Living", barndominium: "Barndominium",
  repair_maintenance: "Repair / Maintenance", other: "Other",
};

export default function LiveJobsitesSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.JobCheckin.filter({ status: "published" }, "-checkin_date", 6)
      .then(setItems).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: 3 }).map((_, i) => <div key={i} className="bg-white rounded-xl h-48 animate-pulse" />)}
    </div>
  );
  if (items.length === 0) return null;

  return (
    <div>
      <div className="text-center mb-8">
        <p className="text-sky-500 font-semibold text-sm uppercase tracking-wider mb-2">Where We've Been</p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#1E2D3D]">Recent Jobsites Across Mississippi</h2>
        <p className="text-slate-500 mt-2 text-sm max-w-xl mx-auto">Real check-ins from our crews — fresh from the field.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
              <h3 className="font-bold text-[#1E2D3D] text-base leading-snug mb-2">{it.title}</h3>
              <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{[it.neighborhood, it.city, it.state].filter(Boolean).join(", ")}</span>
                {it.checkin_date && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{format(new Date(it.checkin_date), "MMM d, yyyy")}</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}