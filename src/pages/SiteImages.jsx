import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Plus, Pencil, Trash2, X, Check, ExternalLink, ImageOff } from "lucide-react";

const CATEGORIES = ["hero", "logo", "team", "association", "general", "cta", "background"];

const CATEGORY_COLORS = {
  hero: "bg-purple-100 text-purple-700",
  logo: "bg-blue-100 text-blue-700",
  team: "bg-green-100 text-green-700",
  association: "bg-yellow-100 text-yellow-700",
  general: "bg-gray-100 text-gray-700",
  cta: "bg-orange-100 text-orange-700",
  background: "bg-teal-100 text-teal-700",
};

const empty = { label: "", url: "", category: "general", location: "", notes: "", active: true };

function ImageModal({ image, onClose, onSave }) {
  const [form, setForm] = useState(image || empty);
  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-bold text-[#1E2D3D]">{image?.id ? "Edit Image" : "Add Image"}</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
        </div>

        {form.url && (
          <div className="mb-4 rounded-xl overflow-hidden h-36 bg-gray-100">
            <img src={form.url} alt={form.label} className="w-full h-full object-cover" onError={e => e.target.style.display = 'none'} />
          </div>
        )}

        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-600 mb-1 block">Label *</label>
            <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={form.label} onChange={e => update("label", e.target.value)} placeholder="e.g. Home Hero Slide 1" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 mb-1 block">Image URL *</label>
            <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono" value={form.url} onChange={e => update("url", e.target.value)} placeholder="https://..." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1 block">Category</label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={form.category} onChange={e => update("category", e.target.value)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1 block">Used In</label>
              <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={form.location} onChange={e => update("location", e.target.value)} placeholder="e.g. Home Hero" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 mb-1 block">Notes</label>
            <textarea rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none" value={form.notes} onChange={e => update("notes", e.target.value)} />
          </div>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={form.active} onChange={e => update("active", e.target.checked)} />
            Active / in use
          </label>
        </div>

        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-medium hover:bg-gray-50">Cancel</button>
          <button
            onClick={() => onSave(form)}
            disabled={!form.label || !form.url}
            className="flex-1 bg-[#1E2D3D] text-white rounded-lg py-2 text-sm font-semibold hover:bg-[#2C3E50] disabled:bg-gray-300 flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" /> Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SiteImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | {} | existing record
  const [filter, setFilter] = useState("all");

  const load = () => {
    base44.entities.SiteImage.list("-created_date", 200)
      .then(setImages)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const save = async (form) => {
    if (form.id) {
      await base44.entities.SiteImage.update(form.id, form);
      setImages(prev => prev.map(i => i.id === form.id ? { ...i, ...form } : i));
    } else {
      const created = await base44.entities.SiteImage.create(form);
      setImages(prev => [created, ...prev]);
    }
    setModal(null);
  };

  const remove = async (id) => {
    if (!confirm("Delete this image record?")) return;
    await base44.entities.SiteImage.delete(id);
    setImages(prev => prev.filter(i => i.id !== id));
  };

  const filtered = filter === "all" ? images : images.filter(i => i.category === filter);

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      {modal !== null && <ImageModal image={modal.id ? modal : null} onClose={() => setModal(null)} onSave={save} />}

      <div className="bg-[#1E2D3D] py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Site Image Library</h1>
            <p className="text-slate-400 text-sm mt-1">Manage hero, team, logo, and other site-wide images.</p>
          </div>
          <button
            onClick={() => setModal({})}
            className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Image
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["all", ...CATEGORIES].map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors ${filter === c ? "bg-[#1E2D3D] text-white" : "bg-white border border-gray-200 text-slate-600 hover:bg-gray-50"}`}
            >
              {c} {c === "all" ? `(${images.length})` : `(${images.filter(i => i.category === c).length})`}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => <div key={i} className="bg-white rounded-xl h-48 animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <ImageOff className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p>No images yet. Click "Add Image" to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(img => (
              <div key={img.id} className={`bg-white rounded-xl border shadow-sm overflow-hidden flex flex-col ${!img.active ? "opacity-50" : ""}`}>
                <div className="relative h-36 bg-gray-100">
                  <img src={img.url} alt={img.label} className="w-full h-full object-cover" onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                  <div className="hidden absolute inset-0 items-center justify-center text-slate-300">
                    <ImageOff className="w-8 h-8" />
                  </div>
                </div>
                <div className="p-3 flex flex-col gap-1 flex-1">
                  <p className="font-semibold text-[#1E2D3D] text-sm leading-tight">{img.label}</p>
                  {img.location && <p className="text-xs text-slate-400">{img.location}</p>}
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${CATEGORY_COLORS[img.category] || CATEGORY_COLORS.general}`}>
                      {img.category}
                    </span>
                    <div className="flex gap-1">
                      <a href={img.url} target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-gray-100 rounded-lg" title="Open image"><ExternalLink className="w-3.5 h-3.5 text-slate-400" /></a>
                      <button onClick={() => setModal(img)} className="p-1.5 hover:bg-gray-100 rounded-lg" title="Edit"><Pencil className="w-3.5 h-3.5 text-slate-400" /></button>
                      <button onClick={() => remove(img.id)} className="p-1.5 hover:bg-red-50 rounded-lg" title="Delete"><Trash2 className="w-3.5 h-3.5 text-red-400" /></button>
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