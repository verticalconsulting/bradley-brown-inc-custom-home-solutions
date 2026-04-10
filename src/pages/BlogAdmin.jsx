import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import {
  Plus, Sparkles, Pencil, Trash2, X, Check, RefreshCw,
  LogIn, FileText, Eye, EyeOff
} from "lucide-react";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";

const emptyPost = { title: "", content: "", image_url: "", topic: "", category: "home-remodeling", published: true };

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// ── Auth Gate ────────────────────────────────────────────────────────────────
function LoginGate({ onLogin }) {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    base44.auth.redirectToLogin(window.location.href);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-10 max-w-sm w-full text-center">
        <div className="w-14 h-14 bg-[#1E2D3D] rounded-xl flex items-center justify-center mx-auto mb-5">
          <FileText className="w-7 h-7 text-sky-400" />
        </div>
        <h1 className="text-xl font-bold text-[#1E2D3D] mb-2">Blog Admin</h1>
        <p className="text-slate-500 text-sm mb-6">Sign in as an admin to manage and publish blog posts.</p>
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-[#1E2D3D] hover:bg-[#2C3E50] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
        >
          <LogIn className="w-4 h-4" />
          {loading ? "Redirecting…" : "Sign In"}
        </button>
      </div>
    </div>
  );
}

// ── Post Form Modal ───────────────────────────────────────────────────────────
function PostModal({ post, onClose, onSave }) {
  const [form, setForm] = useState(post || emptyPost);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSave = async () => {
    setSaving(true);
    const data = { ...form, slug: slugify(form.title) };
    if (form.id) {
      await base44.entities.BlogPost.update(form.id, data);
    } else {
      await base44.entities.BlogPost.create(data);
    }
    onSave();
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col">
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="font-bold text-[#1E2D3D]">{form.id ? "Edit Post" : "New Blog Post"}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPreview(p => !p)}
              className="flex items-center gap-1 text-xs text-slate-500 border rounded-lg px-3 py-1.5 hover:bg-gray-50"
            >
              {preview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {preview ? "Edit" : "Preview"}
            </button>
            <button onClick={onClose}><X className="w-5 h-5 text-slate-400" /></button>
          </div>
        </div>

        <div className="overflow-y-auto p-5 space-y-4 flex-1">
          {preview ? (
            <div className="prose prose-slate prose-sm max-w-none">
              <h1>{form.title}</h1>
              {form.image_url && <img src={form.image_url} alt="" className="rounded-xl w-full object-cover h-48" />}
              <ReactMarkdown>{form.content}</ReactMarkdown>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Title *</label>
                <input
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                  value={form.title}
                  onChange={e => update("title", e.target.value)}
                  placeholder="e.g. 5 Kitchen Remodeling Mistakes to Avoid"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Image URL</label>
                <input
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                  value={form.image_url}
                  onChange={e => update("image_url", e.target.value)}
                  placeholder="https://..."
                />
                {form.image_url && (
                  <img src={form.image_url} alt="preview" className="mt-2 h-28 w-full object-cover rounded-lg" />
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Topic / Tag</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                    value={form.topic}
                    onChange={e => update("topic", e.target.value)}
                    placeholder="e.g. kitchen remodel"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Published</label>
                  <select
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                    value={form.published ? "yes" : "no"}
                    onChange={e => update("published", e.target.value === "yes")}
                  >
                    <option value="yes">Yes — Live</option>
                    <option value="no">No — Draft</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Content (Markdown) *</label>
                <textarea
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 font-mono"
                  rows={14}
                  value={form.content}
                  onChange={e => update("content", e.target.value)}
                  placeholder="## Section Header&#10;&#10;Write your post here using Markdown..."
                />
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end gap-3 p-5 border-t">
          <button onClick={onClose} className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700">Cancel</button>
          <button
            onClick={handleSave}
            disabled={saving || !form.title || !form.content}
            className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
          >
            <Check className="w-4 h-4" /> {saving ? "Saving…" : "Publish Post"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function BlogAdmin() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | {} | existing post
  const [generating, setGenerating] = useState(false);
  const [genStatus, setGenStatus] = useState("");

  useEffect(() => {
    base44.auth.me()
      .then(u => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setAuthChecked(true));
  }, []);

  useEffect(() => {
    if (user?.role === "admin") loadPosts();
  }, [user]);

  const loadPosts = async () => {
    setLoading(true);
    const data = await base44.entities.BlogPost.list("-created_date", 50);
    setPosts(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this post permanently?")) return;
    await base44.entities.BlogPost.delete(id);
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setGenStatus("Asking AI for a trending topic…");
    try {
      await base44.functions.invoke("generateProTip", {});
      setGenStatus("Done! Post created.");
      await loadPosts();
    } catch (e) {
      setGenStatus("Error: " + e.message);
    }
    setGenerating(false);
    setTimeout(() => setGenStatus(""), 4000);
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#1E2D3D] rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <LoginGate />;

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-[#1E2D3D] mb-2">Access Denied</p>
          <p className="text-slate-500">You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      {modal !== null && (
        <PostModal
          post={modal?.id ? modal : null}
          onClose={() => setModal(null)}
          onSave={async () => { setModal(null); await loadPosts(); }}
        />
      )}

      <div className="bg-[#1E2D3D] py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Blog Admin</h1>
            <p className="text-slate-400 text-sm mt-1">{posts.length} posts published</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors"
            >
              <Sparkles className={`w-4 h-4 ${generating ? "animate-pulse" : ""}`} />
              {generating ? "Generating…" : "AI Generate Post"}
            </button>
            <button
              onClick={() => setModal({})}
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors"
            >
              <Plus className="w-4 h-4" /> Write Manually
            </button>
          </div>
        </div>
        {genStatus && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-3">
            <p className="text-sky-300 text-sm flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" /> {genStatus}
            </p>
          </div>
        )}
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => <div key={i} className="h-20 bg-white rounded-xl animate-pulse" />)}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>No posts yet. Generate one with AI or write one manually.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map(post => (
              <div key={post.id} className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                {post.image_url && (
                  <img src={post.image_url} alt={post.title} className="w-full sm:w-20 h-20 object-cover rounded-lg flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-bold text-[#1E2D3D] text-sm leading-tight">{post.title}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${post.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {post.published ? "Live" : "Draft"}
                    </span>
                  </div>
                  <div className="flex gap-3 text-xs text-slate-400">
                    <span>{format(new Date(post.created_date), "MMM d, yyyy")}</span>
                    {post.topic && <span className="bg-sky-50 text-sky-600 px-2 py-0.5 rounded-full">{post.topic}</span>}
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => setModal(post)}
                    className="flex items-center gap-1.5 text-xs bg-sky-50 hover:bg-sky-100 text-sky-600 px-3 py-2 rounded-lg font-medium"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="flex items-center gap-1.5 text-xs bg-red-50 hover:bg-red-100 text-red-500 px-3 py-2 rounded-lg font-medium"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}