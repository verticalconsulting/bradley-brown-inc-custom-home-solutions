import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import {
  Plus, Pencil, Trash2, X, Check, ExternalLink, Loader2,
  Upload, MapPin, ImageOff, Star, Save,
} from "lucide-react";

const CATEGORY_LABELS = {
  custom_home: "Custom Home",
  renovation: "Renovation",
  addition: "Addition",
  outdoor: "Outdoor Living",
};

const STATUS_LABELS = { draft: "Draft", published: "Published" };

const emptyForm = {
  title: "",
  short_description: "",
  description: "",
  category: "custom_home",
  location: "",
  square_footage: "",
  year_completed: "",
  budget_range: "",
  images: [],
  featured: false,
  status: "published",
  duration_months: "",
  highlights: [],
};

/* ── Edit / Add Modal ── */
function ProjectModal({ project, onClose, onSave }) {
  const [form, setForm] = useState(project ? { ...project } : { ...emptyForm });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef(null);

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleUpload = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file.");
      return;
    }
    setUploading(true);
    setUploadError("");
    try {
      const res = await base44.integrations.Core.UploadFile({ file });
      update("images", [...(form.images || []), res.file_url]);
    } catch (err) {
      setUploadError("Upload failed. Try a smaller file or paste a URL instead.");
    } finally {
      setUploading(false);
    }
  };

  const addUrl = (url) => {
    const trimmed = (url || "").trim();
    if (trimmed) update("images", [...(form.images || []), trimmed]);
  };

  const removeImage = (idx) => update("images", form.images.filter((_, i) => i !== idx));

  const moveImage = (idx, dir) => {
    const arr = [...form.images];
    const next = idx + dir;
    if (next < 0 || next >= arr.length) return;
    [arr[idx], arr[next]] = [arr[next], arr[idx]];
    update("images", arr);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl my-8">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <h2 className="text-lg font-bold text-[#1E2D3D]">
            {project?.id ? "Edit Project" : "Add Project"}
          </h2>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Title */}
          <div>
            <label className="text-xs font-semibold text-slate-600 mb-1 block">Project Title *</label>
            <input
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="e.g. Luxury Kitchen Remodel"
            />
          </div>

          {/* Category (the "tag" shown on the picture) */}
          <div>
            <label className="text-xs font-semibold text-slate-600 mb-1 block">
              Category / Tag (shown on the portfolio image) *
            </label>
            <select
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
            >
              {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1 block">Location</label>
              <input
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={form.location || ""}
                onChange={(e) => update("location", e.target.value)}
                placeholder="e.g. Brandon, MS"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1 block">Year Completed</label>
              <input
                type="number"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={form.year_completed || ""}
                onChange={(e) => update("year_completed", e.target.value ? Number(e.target.value) : "")}
                placeholder="e.g. 2024"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1 block">Square Footage</label>
              <input
                type="number"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={form.square_footage || ""}
                onChange={(e) => update("square_footage", e.target.value ? Number(e.target.value) : "")}
                placeholder="e.g. 2400"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1 block">Duration (months)</label>
              <input
                type="number"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={form.duration_months || ""}
                onChange={(e) => update("duration_months", e.target.value ? Number(e.target.value) : "")}
                placeholder="e.g. 6"
              />
            </div>
          </div>

          {/* Short description */}
          <div>
            <label className="text-xs font-semibold text-slate-600 mb-1 block">Short Description (card summary)</label>
            <textarea
              rows={2}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none"
              value={form.short_description || ""}
              onChange={(e) => update("short_description", e.target.value)}
              placeholder="One-line summary shown on the portfolio card"
            />
          </div>

          {/* Status + Featured */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1 block">Status</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={form.status}
                onChange={(e) => update("status", e.target.value)}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer self-end pb-2">
              <input
                type="checkbox"
                checked={!!form.featured}
                onChange={(e) => update("featured", e.target.checked)}
              />
              Featured project
            </label>
          </div>

          {/* Images */}
          <div>
            <label className="text-xs font-semibold text-slate-600 mb-1 block">Project Images</label>
            <div className="flex gap-2 mb-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                Upload
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e.target.files[0])} />
              <UrlPaster onAdd={addUrl} />
            </div>
            {uploadError && <p className="text-xs text-red-500 mb-2">{uploadError}</p>}
            <div className="grid grid-cols-3 gap-2">
              {(form.images || []).map((url, idx) => (
                <div key={idx} className="relative group rounded-lg overflow-hidden border border-gray-100 h-24 bg-gray-100">
                  <img src={url} alt={`Project image ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" decoding="async" onError={(e) => { e.target.style.display = 'none'; }} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-1">
                      <button onClick={() => moveImage(idx, -1)} disabled={idx === 0} className="bg-white/90 rounded p-1 text-xs disabled:opacity-30" title="Move first">↑</button>
                      <button onClick={() => moveImage(idx, 1)} disabled={idx === form.images.length - 1} className="bg-white/90 rounded p-1 text-xs disabled:opacity-30" title="Move last">↓</button>
                      <button onClick={() => removeImage(idx)} className="bg-white/90 rounded p-1" title="Remove"><X className="w-3 h-3" /></button>
                    </div>
                  </div>
                  {idx === 0 && <span className="absolute top-1 left-1 bg-sky-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">Cover</span>}
                </div>
              ))}
              {(form.images || []).length === 0 && (
                <div className="col-span-3 flex items-center justify-center h-24 border-2 border-dashed border-gray-200 rounded-lg text-slate-400 text-sm">
                  <ImageOff className="w-5 h-5 mr-2" /> No images yet
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-gray-100 sticky bottom-0 bg-white rounded-b-2xl">
          <button onClick={onClose} className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
          <button
            onClick={() => onSave(form)}
            disabled={!form.title}
            className="flex-1 bg-[#1E2D3D] text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-[#2C3E50] disabled:bg-gray-300 flex items-center justify-center gap-2 transition-colors"
          >
            <Save className="w-4 h-4" /> Save Project
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── URL paste input ── */
function UrlPaster({ onAdd }) {
  const [val, setVal] = useState("");
  return (
    <div className="flex flex-1 gap-2">
      <input
        className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono"
        placeholder="Paste image URL…"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") { e.preventDefault(); onAdd(val); setVal(""); }
        }}
      />
      <button
        onClick={() => { onAdd(val); setVal(""); }}
        className="inline-flex items-center gap-1 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
      >
        <Plus className="w-4 h-4" /> Add
      </button>
    </div>
  );
}

/* ── Project Card ── */
function ProjectCard({ project, onEdit, onDelete, onToggleFeatured }) {
  return (
    <div className={`bg-white rounded-xl border shadow-sm overflow-hidden flex flex-col ${project.status === "draft" ? "opacity-60" : ""}`}>
      <div className="relative h-44 bg-gray-100">
        {project.images?.[0] ? (
          <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300"><ImageOff className="w-8 h-8" /></div>
        )}
        <span className="absolute top-2 left-2 bg-sky-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          {CATEGORY_LABELS[project.category] || project.category}
        </span>
        {project.featured && (
          <span className="absolute top-2 right-2 bg-amber-400 text-amber-900 text-xs font-semibold px-2 py-1 rounded-full inline-flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-900" /> Featured
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col gap-1 flex-1">
        <p className="font-semibold text-[#1E2D3D] text-sm leading-tight">{project.title}</p>
        {project.location && (
          <p className="text-xs text-slate-400 flex items-center gap-1"><MapPin className="w-3 h-3" />{project.location}</p>
        )}
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${project.status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
            {STATUS_LABELS[project.status] || project.status}
          </span>
          <span className="text-xs text-slate-400">{project.images?.length || 0} image{(project.images?.length || 0) !== 1 ? "s" : ""}</span>
        </div>
        <div className="flex items-center gap-1 mt-auto pt-2">
          <button onClick={() => onToggleFeatured(project)} className="p-1.5 hover:bg-amber-50 rounded-lg transition-colors" title={project.featured ? "Unfeature" : "Feature"}>
            <Star className={`w-3.5 h-3.5 ${project.featured ? "text-amber-400 fill-amber-400" : "text-slate-300"}`} />
          </button>
          <button onClick={() => onEdit(project)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="Edit"><Pencil className="w-3.5 h-3.5 text-slate-400" /></button>
          {project.images?.[0] && (
            <a href={project.images[0]} target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="Open image"><ExternalLink className="w-3.5 h-3.5 text-slate-400" /></a>
          )}
          <button onClick={() => onDelete(project.id)} className="p-1.5 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 className="w-3.5 h-3.5 text-red-400" /></button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState("");

  const load = () => {
    base44.entities.Project.list("-year_completed", 200)
      .then(setProjects)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const save = async (form) => {
    const payload = {
      ...form,
      square_footage: form.square_footage || undefined,
      year_completed: form.year_completed || undefined,
      duration_months: form.duration_months || undefined,
    };
    if (form.id) {
      await base44.entities.Project.update(form.id, payload);
      setProjects((prev) => prev.map((p) => (p.id === form.id ? { ...p, ...payload } : p)));
    } else {
      const created = await base44.entities.Project.create(payload);
      setProjects((prev) => [created, ...prev]);
    }
    setModal(null);
    showToast("Project saved");
  };

  const remove = async (id) => {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    await base44.entities.Project.delete(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    showToast("Project deleted");
  };

  const toggleFeatured = async (project) => {
    const updated = { ...project, featured: !project.featured };
    await base44.entities.Project.update(project.id, { featured: !project.featured });
    setProjects((prev) => prev.map((p) => (p.id === project.id ? { ...p, featured: !p.featured } : p)));
    showToast(updated.featured ? "Marked as featured" : "Removed featured");
  };

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-16 md:pt-20">
      {modal !== null && (
        <ProjectModal project={modal.id ? modal : null} onClose={() => setModal(null)} onSave={save} />
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1E2D3D]">Projects Manager</h1>
            <p className="text-sm text-slate-400">{projects.length} project{projects.length !== 1 ? "s" : ""} · edit categories, images & featured status</p>
          </div>
          <button
            onClick={() => setModal({ ...emptyForm })}
            className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors self-start"
          >
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 overflow-x-auto mb-6 pb-1">
          <button
            onClick={() => setFilter("all")}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === "all" ? "bg-[#1E2D3D] text-white" : "bg-white border border-gray-200 text-slate-600 hover:bg-gray-50"}`}
          >
            All ({projects.length})
          </button>
          {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === value ? "bg-sky-500 text-white" : "bg-white border border-gray-200 text-slate-600 hover:bg-gray-50"}`}
            >
              {label} ({projects.filter((p) => p.category === value).length})
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="bg-white rounded-xl h-64 animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <ImageOff className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-medium text-slate-500 mb-1">No projects in this category yet</p>
            <p className="text-sm">Click "Add Project" to create one.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={setModal}
                onDelete={remove}
                onToggleFeatured={toggleFeatured}
              />
            ))}
          </div>
        )}
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1E2D3D] text-white text-sm px-4 py-2.5 rounded-lg shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  );
}