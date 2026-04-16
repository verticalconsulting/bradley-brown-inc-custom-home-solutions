import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Phone, Mail, MapPin, Calendar, Tag, MessageSquare, ChevronDown, Trash2 } from "lucide-react";

const STATUS_COLORS = {
  new: "bg-sky-100 text-sky-700",
  contacted: "bg-yellow-100 text-yellow-700",
  qualified: "bg-purple-100 text-purple-700",
  proposal_sent: "bg-orange-100 text-orange-700",
  won: "bg-green-100 text-green-700",
  lost: "bg-gray-100 text-gray-500",
};

const STATUS_OPTIONS = ["new", "contacted", "qualified", "proposal_sent", "won", "lost"];

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const loadLeads = () => {
    base44.entities.Lead.list("-created_date", 100)
      .then(data => setLeads(Array.isArray(data) ? data.filter(Boolean) : []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadLeads(); }, []);

  const updateStatus = async (id, status) => {
    if (status === "__delete__") {
      if (!window.confirm("Delete this lead? This cannot be undone.")) return;
      await base44.entities.Lead.delete(id);
      setLeads(prev => prev.filter(l => l.id !== id));
      return;
    }
    await base44.entities.Lead.update(id, { status });
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const filtered = (filter === "all" ? leads : leads.filter(l => l.status === filter)).filter(Boolean);

  const counts = STATUS_OPTIONS.reduce((acc, s) => {
    acc[s] = leads.filter(l => l.status === s).length;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      <div className="bg-[#1E2D3D] py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Project Leads</h1>
          <p className="text-slate-400 mt-1 text-sm">All inquiries submitted through the website contact forms.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Summary pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === "all" ? "bg-[#1E2D3D] text-white" : "bg-white border border-gray-200 text-slate-600 hover:bg-gray-50"}`}
          >
            All ({leads.length})
          </button>
          {STATUS_OPTIONS.map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${filter === s ? "bg-[#1E2D3D] text-white" : "bg-white border border-gray-200 text-slate-600 hover:bg-gray-50"}`}
            >
              {s.replace("_", " ")} ({counts[s] || 0})
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-28 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400">No leads found.</div>
        ) : (
          <div className="grid gap-4">
            {filtered.map(lead => lead && (
              <div key={lead.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-[#1E2D3D] text-lg">{lead.name}</h3>
                      {lead.project_type && (
                        <span className="bg-sky-50 text-sky-600 text-xs font-medium px-2 py-0.5 rounded-full">{lead.project_type}</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                      {lead.email && (
                        <a href={`mailto:${lead.email}`} className="flex items-center gap-1 hover:text-sky-500 transition-colors">
                          <Mail className="w-3.5 h-3.5" /> {lead.email}
                        </a>
                      )}
                      {lead.phone && (
                        <a href={`tel:${lead.phone}`} className="flex items-center gap-1 hover:text-sky-500 transition-colors">
                          <Phone className="w-3.5 h-3.5" /> {lead.phone}
                        </a>
                      )}
                      {lead.address && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> {lead.address}
                        </span>
                      )}
                      {lead.source && (
                        <span className="flex items-center gap-1 text-slate-400">
                          <Tag className="w-3.5 h-3.5" /> {lead.source}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-slate-400">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(lead.created_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                    {lead.message && (
                      <p className="mt-2 text-sm text-slate-600 flex items-start gap-1">
                        <MessageSquare className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-slate-400" />
                        <span className="line-clamp-2">{lead.message}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex-shrink-0">
                    <div className="relative">
                      <select
                        value={lead.status || "new"}
                        onChange={e => updateStatus(lead.id, e.target.value)}
                        className={`appearance-none pl-3 pr-7 py-1.5 rounded-full text-xs font-semibold capitalize border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-300 ${STATUS_COLORS[lead.status] || STATUS_COLORS.new}`}
                      >
                        {STATUS_OPTIONS.map(s => (
                          <option key={s} value={s} className="bg-white text-slate-800">{s.replace("_", " ")}</option>
                        ))}
                        <option value="__delete__" className="bg-white text-red-600">🗑 Delete Lead</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}