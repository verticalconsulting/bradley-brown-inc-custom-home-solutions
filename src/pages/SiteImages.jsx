import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import {
  Plus, Pencil, Trash2, X, Check, ExternalLink, ImageOff,
  Upload, Search, ChevronDown, FolderOpen, ImageIcon, Loader2, Copy
} from "lucide-react";
import {
  PAGE_GROUPS, ALL_PAGES, getPageLabel,
  IMAGE_CATEGORIES, getCategoryLabel,
} from "@/lib/imageManifest";

const CATEGORY_COLORS = {
  hero: "bg-purple-100 text-purple-700",
  logo: "bg-blue-100 text-blue-700",
  team: "bg-green-100 text-green-700",
  association: "bg-yellow-100 text-yellow-700",
  general: "bg-gray-100 text-gray-700",
  cta: "bg-orange-100 text-orange-700",
  background: "bg-teal-100 text-teal-700",
};

const emptyForm = { label: "", url: "", category: "general", location: "Home", notes: "", active: true };

/* ── Upload + Edit Modal ── */
function ImageModal({ image, onClose, onSave }) {
  const [form, setForm] = useState(image ? { ...image } : { ...emptyForm });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

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
      update("url", res.file_url);
      if (!form.label) {
        const name = file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
        update("label", name.charAt(0).toUpperCase() + name.slice(1));
      }
    } catch (err) {
      setUploadError("Upload failed. Try a smaller file or paste a URL instead.");
    } finally {
      setUploading(false);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleUpload(file);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg my-8">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-[#1E2D3D]">{image?.id ? "Edit Image" : "Add Image"}</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-6">
          {/* Preview */}
          {form.url ? (
            <div className="mb-4 rounded-xl overflow-hidden h-40 bg-gray-100 relative group">
              <img src={form.url} alt={form.label} className="w-full h-full object-cover" onError={e => e.target.style.display = 'none'} />
              <button
                onClick={() => update("url", "")}
                className="absolute top-2 right-2 bg-black/60 text-white rounded-lg p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              className={`mb-4 rounded-xl border-2 border-dashed h-40 flex flex-col items-center justify-center cursor-pointer transition-colors ${dragOver ? "border-sky-400 bg-sky-50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`}
            >
              {uploading ? (
                <>
                  <Loader2 className="w-8 h-8 text-sky-500 animate-spin mb-2" />
                  <p className="text-sm text-slate-500">Uploading…</p>
                </>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-slate-400 mb-2" />
                  <p className="text-sm text-slate-600 font-medium">Click or drag an image to upload</p>
                  <p className="text-xs text-slate-400 mt-1">PNG, JPG, WebP — max ~10 MB</p>
                </>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={e => handleUpload(e.target.files[0])} />
            </div>
          )}

          {uploadError && <p className="text-xs text-red-500 mb-3">{uploadError}</p>}

          {/* URL paste fallback */}
          {!form.url && (
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-slate-400">or paste a URL</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <input
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono"
                value={form.url}
                onChange={e => update("url", e.target.value)}
                placeholder="https://..."
              />
            </div>
          )}

          {/* Form fields */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1 block">Label *</label>
              <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={form.label} onChange={e => update("label", e.target.value)} placeholder="e.g. Home Hero Background" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">Page / Location</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={form.location || ""} onChange={e => update("location", e.target.value)}>
                  {PAGE_GROUPS.map(g => (
                    <optgroup key={g.group} label={g.group}>
                      {g.pages.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
                    </optgroup>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">Category</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={form.category} onChange={e => update("category", e.target.value)}>
                  {IMAGE_CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1 block">Notes</label>
              <textarea rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none" value={form.notes || ""} onChange={e => update("notes", e.target.value)} placeholder="Internal notes about this image…" />
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.active} onChange={e => update("active", e.target.checked)} />
              Active / in use
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
          <button onClick={onClose} className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
          <button
            onClick={() => onSave(form)}
            disabled={!form.label || !form.url}
            className="flex-1 bg-[#1E2D3D] text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-[#2C3E50] disabled:bg-gray-300 flex items-center justify-center gap-2 transition-colors"
          >
            <Check className="w-4 h-4" /> Save Image
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Single Image Card ── */
function ImageCard({ img, onEdit, onDelete, onCopyUrl }) {
  return (
    <div className={`bg-white rounded-xl border shadow-sm overflow-hidden flex flex-col group ${!img.active ? "opacity-50" : ""}`}>
      <div className="relative h-36 bg-gray-100">
        <img src={img.url} alt={img.label} className="w-full h-full object-cover" onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
        <div className="hidden absolute inset-0 items-center justify-center text-slate-300">
          <ImageOff className="w-8 h-8" />
        </div>
        <span className={`absolute top-2 left-2 text-xs font-medium px-2 py-0.5 rounded-full capitalize ${CATEGORY_COLORS[img.category] || CATEGORY_COLORS.general}`}>
          {getCategoryLabel(img.category)}
        </span>
      </div>
      <div className="p-3 flex flex-col gap-1 flex-1">
        <p className="font-semibold text-[#1E2D3D] text-sm leading-tight">{img.label}</p>
        {img.notes && <p className="text-xs text-slate-400 line-clamp-2">{img.notes}</p>}
        <div className="flex items-center gap-1 mt-auto pt-2">
          <a href={img.url} target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="Open image"><ExternalLink className="w-3.5 h-3.5 text-slate-400" /></a>
          <button onClick={() => onCopyUrl(img.url)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="Copy URL"><Copy className="w-3.5 h-3.5 text-slate-400" /></button>
          <button onClick={() => onEdit(img)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="Edit"><Pencil className="w-3.5 h-3.5 text-slate-400" /></button>
          <button onClick={() => onDelete(img.id)} className="p-1.5 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 className="w-3.5 h-3.5 text-red-400" /></button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function SiteImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [selectedPage, setSelectedPage] = useState("Home");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");

  const load = () => {
    base44.entities.SiteImage.list("-created_date", 500)
      .then(setImages)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const save = async (form) => {
    if (form.id) {
      await base44.entities.SiteImage.update(form.id, form);
      setImages(prev => prev.map(i => i.id === form.id ? { ...i, ...form } : i));
    } else {
      const created = await base44.entities.SiteImage.create(form);
      setImages(prev => [created, ...prev]);
    }
    setModal(null);
    showToast("Image saved");
  };

  const remove = async (id) => {
    if (!confirm("Delete this image record? (The file itself stays on the server.)")) return;
    await base44.entities.SiteImage.delete(id);
    setImages(prev => prev.filter(i => i.id !== id));
    showToast("Image deleted");
  };

  const copyUrl = (url) => {
    navigator.clipboard?.writeText(url);
    showToast("URL copied to clipboard");
  };

  // Images for the currently selected page
  const pageImages = images.filter(i =>
    (search ? (i.label?.toLowerCase().includes(search.toLowerCase()) || i.url?.toLowerCase().includes(search.toLowerCase())) : true) &&
    (selectedPage === "__all" ? true : selectedPage === "__unassigned" ? !ALL_PAGES.some(p => p.key === i.location) : i.location === selectedPage)
  );

  // Count per page for sidebar badges
  const countFor = (pageKey) => images.filter(i => i.location === pageKey).length;
  const unassignedCount = images.filter(i => !ALL_PAGES.some(p => p.key === i.location)).length;

  return (
    <div className="min-h-screen md:h-screen bg-[#FAFAF8] flex flex-col md:flex-row pt-16 md:pt-0">
      {modal !== null && <ImageModal image={modal.id ? modal : null} onClose={() => setModal(null)} onSave={save} />}

      {/* Sidebar */}
      <aside className="md:w-64 md:flex-shrink-0 md:h-screen md:sticky md:top-0 bg-white border-r border-gray-100 md:overflow-y-auto">
        <div className="p-4 md:p-5 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <ImageIcon className="w-5 h-5 text-[#37b5eb]" />
            <h1 className="text-base font-bold text-[#1E2D3D]">Image Manager</h1>
          </div>
          <p className="text-xs text-slate-400">{images.length} images total</p>
        </div>

        {/* Search */}
        <div className="p-4 md:px-5">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-300 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm"
              placeholder="Search images…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Page tree */}
        <nav className="px-2 md:px-3 pb-4 space-y-3">
          <button
            onClick={() => setSelectedPage("__all")}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedPage === "__all" ? "bg-[#1E2D3D] text-white" : "text-slate-600 hover:bg-gray-50"}`}
          >
            <span className="flex items-center gap-2"><FolderOpen className="w-4 h-4" /> All Images</span>
            <span className={`text-xs px-1.5 rounded-full ${selectedPage === "__all" ? "bg-white/20" : "bg-gray-100"}`}>{images.length}</span>
          </button>

          {PAGE_GROUPS.map(group => (
            <div key={group.group}>
              <p className="px-3 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">{group.group}</p>
              {group.pages.map(p => {
                const count = countFor(p.key);
                const isActive = selectedPage === p.key;
                return (
                  <button
                    key={p.key}
                    onClick={() => setSelectedPage(p.key)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? "bg-[#1E2D3D] text-white font-medium" : "text-slate-600 hover:bg-gray-50"}`}
                  >
                    <span className="truncate text-left">{p.label}</span>
                    {count > 0 && <span className={`text-xs px-1.5 rounded-full flex-shrink-0 ml-2 ${isActive ? "bg-white/20" : "bg-gray-100"}`}>{count}</span>}
                  </button>
                );
              })}
            </div>
          ))}

          {unassignedCount > 0 && (
            <button
              onClick={() => setSelectedPage("__unassigned")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedPage === "__unassigned" ? "bg-amber-100 text-amber-700" : "text-amber-600 hover:bg-amber-50"}`}
            >
              <span className="flex items-center gap-2"><ImageOff className="w-4 h-4" /> Unassigned</span>
              <span className="text-xs px-1.5 rounded-full bg-amber-200 text-amber-800">{unassignedCount}</span>
            </button>
          )}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 md:overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 bg-white border-b border-gray-100 z-10 px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-[#1E2D3D]">
              {selectedPage === "__all" ? "All Images" : selectedPage === "__unassigned" ? "Unassigned Images" : getPageLabel(selectedPage)}
            </h2>
            <p className="text-xs text-slate-400">{pageImages.length} image{pageImages.length !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={() => setModal({ ...emptyForm, location: selectedPage !== "__all" && selectedPage !== "__unassigned" ? selectedPage : "Home" })}
            className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors flex-shrink-0"
          >
            <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Add Image</span>
          </button>
        </div>

        {/* Image grid */}
        <div className="p-4 md:p-8">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => <div key={i} className="bg-white rounded-xl h-52 animate-pulse" />)}
            </div>
          ) : pageImages.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <ImageOff className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="font-medium text-slate-500 mb-1">No images in the manager for this page yet</p>
              <p className="text-sm">This registry only shows images you've added here. Images hardcoded in the page's code aren't listed automatically — use the "Add Image" button above to upload and track an image for this page.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {pageImages.map(img => (
                <ImageCard key={img.id} img={img} onEdit={setModal} onDelete={remove} onCopyUrl={copyUrl} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1E2D3D] text-white text-sm px-4 py-2.5 rounded-lg shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  );
}