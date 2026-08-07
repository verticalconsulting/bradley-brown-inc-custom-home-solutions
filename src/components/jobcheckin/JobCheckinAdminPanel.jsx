import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Loader2, Check, X, MapPin, Calendar, Eye, ExternalLink } from "lucide-react";
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

export default function JobCheckinAdminPanel() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("draft");
  const [busy, setBusy] = useState(null);

  const load = () => {
    setLoading(true);
    base44.entities.JobCheckin.filter({ status: filter }, "-created_date", 50)
      .then(setItems)
      .finally(() => setLoading(false));
  };

  useEffect(load, [filter]);

  const act = async (id, action) => {
    setBusy(id);
    const res = await base44.functions.invoke("publishJobCheckin", { id, action });
    setBusy(null);
    if (res.data?.success) load();
    else alert(res.data?.error || "Action failed");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 md:p-6 mb-8">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h2 className="text-lg font-bold text-[#1E2D3D]">Jobsite Check-Ins</h2>
        <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
          {["draft", "published", "rejected"].map(s => (
            <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize ${filter === s ? "bg-white shadow text-[#1E2D3D]" : "text-slate-500"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8"><Loader2 className="w-6 h-6 animate-spin mx-auto text-sky-400" /></div>
      ) : items.length === 0 ? (
        <p className="text-center py-8 text-slate-400 text-sm">No {filter} check-ins.</p>
      ) : (
        <div className="space-y-3">
          {items.map(it => (
            <div key={it.id} className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row gap-4">
              {it.photos?.[0] && (
                <img src={it.photos[0]} alt={it.title} width="128" height="128" loading="lazy" decoding="async" className="w-full md:w-32 h-32 object-cover rounded-lg flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <span className="inline-block bg-sky-50 text-sky-700 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded mb-1">{SERVICE_LABELS[it.service] || it.service}</span>
                    <h3 className="font-bold text-[#1E2D3D]">{it.title}</h3>
                    <div className="flex flex-wrap gap-3 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{[it.neighborhood, it.city, it.state].filter(Boolean).join(", ")}</span>
                      {it.checkin_date && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{format(new Date(it.checkin_date), "MMM d, yyyy")}</span>}
                      {it.submitted_by && <span>by {it.submitted_by}</span>}
                    </div>
                  </div>
                </div>
                {it.description && <p className="text-sm text-slate-600 mt-2 line-clamp-2">{it.description}</p>}

                <div className="flex flex-wrap gap-2 mt-3">
                  {filter === "draft" && (
                    <>
                      <button disabled={busy === it.id} onClick={() => act(it.id, "publish")} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1 disabled:opacity-50">
                        {busy === it.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />} Publish
                      </button>
                      <button disabled={busy === it.id} onClick={() => act(it.id, "reject")} className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1">
                        <X className="w-3 h-3" /> Reject
                      </button>
                    </>
                  )}
                  {filter === "published" && (
                    <>
                      <a href={`/jobsites/${it.slug}`} target="_blank" rel="noopener noreferrer" className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" /> View
                      </a>
                      <button onClick={() => act(it.id, "unpublish")} className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1">
                        <Eye className="w-3 h-3" /> Unpublish
                      </button>
                    </>
                  )}
                  {filter === "rejected" && (
                    <button onClick={() => act(it.id, "publish")} className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Restore &amp; Publish
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}