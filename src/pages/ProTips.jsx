import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Lightbulb, RefreshCw, ChevronRight, Calendar, Phone, Pencil, Trash2, X, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import SEOHead from "@/components/SEOHead";

export default function ProTips() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeSlug, setActiveSlug] = useState(null);

  useEffect(() => {
    loadPosts();
    checkAdmin();
    // Check URL hash for anchor
    if (window.location.hash) {
      setActiveSlug(window.location.hash.replace("#", ""));
    }
  }, []);

  const checkAdmin = async () => {
    try {
      const user = await base44.auth.me();
      setIsAdmin(user?.role === "admin");
    } catch {}
  };

  const loadPosts = async () => {
    setLoading(true);
    const data = await base44.entities.BlogPost.list("-created_date", 20);
    setPosts(data);
    setLoading(false);
  };

  const handleGenerate = async () => {
    setGenerating(true);
    await base44.functions.invoke("generateProTip", {});
    await loadPosts();
    setGenerating(false);
  };

  useEffect(() => {
    if (activeSlug && posts.length > 0) {
      const el = document.getElementById(activeSlug);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeSlug, posts]);

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      <SEOHead
        title="Pro Tips — Home Remodeling Advice | Bradley Brown Inc."
        description="Expert home remodeling tips for Brandon, MS homeowners — bathrooms, kitchens, luxury renovations & more from Central Mississippi's trusted contractor since 1995."
      />

      {/* Hero */}
      <div className="bg-[#1E2D3D] py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-sky-400/20 border border-sky-400/40 rounded-full px-3 py-1 mb-3">
            <Lightbulb className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-sky-300 text-xs font-medium">AI-Powered Tips</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white">Pro Tips</h1>
          <p className="text-slate-300 mt-3 max-w-xl mx-auto text-base md:text-lg">
            Practical home remodeling advice on the topics homeowners are searching most.
          </p>
          {isAdmin && (
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="mt-6 inline-flex items-center gap-2 bg-sky-400 hover:bg-sky-500 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors disabled:opacity-60"
            >
              <RefreshCw className={`w-4 h-4 ${generating ? "animate-spin" : ""}`} />
              {generating ? "Generating new tip…" : "Generate New Pro Tip"}
            </button>
          )}
        </div>
      </div>

      {/* Keyword-gap pages */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-2">
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-5">
          <h2 className="font-bold text-[#1E2D3D] text-sm mb-3">Featured Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "Small Bathroom Remodeling Ideas", page: "SmallBathroomIdeas", desc: "6 contractor-tested ideas to maximize a small bath" },
              { label: "Luxury Home Renovations", page: "LuxuryHomeRenovations", desc: "Premium finishes, project management & timeline expectations" },
              { label: "Emergency Home Repairs — Brandon, MS", page: "LandingEmergencyRepair", desc: "Urgent? Call (601) 954-1306 — same-week service available" },
            ].map((g) => (
              <Link key={g.page} to={createPageUrl(g.page)} className="block bg-white border border-sky-100 rounded-lg p-4 hover:border-sky-400 transition-colors">
                <p className="font-semibold text-[#1E2D3D] text-xs mb-1">{g.label}</p>
                <p className="text-slate-500 text-xs">{g.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      {posts.length > 0 && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="font-bold text-[#1E2D3D] mb-4 text-sm uppercase tracking-wider">All Tips</h2>
            <ul className="space-y-2">
              {posts.map((post) => (
                <li key={post.id}>
                  <a
                    href={`#${post.slug}`}
                    className="flex items-center gap-2 text-sky-600 hover:text-sky-800 text-sm font-medium transition-colors"
                    onClick={() => setActiveSlug(post.slug)}
                  >
                    <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
                    {post.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Blog Posts */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 space-y-16">
        {loading ? (
          <div className="space-y-8 pt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-64 bg-gray-200 rounded-xl mb-4" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-gray-100 rounded w-full mb-2" />
                <div className="h-4 bg-gray-100 rounded w-5/6" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No tips yet.</p>
            {isAdmin && <p className="text-sm mt-1">Click "Generate New Pro Tip" to create the first one.</p>}
          </div>
        ) : (
          posts.map((post) => (
            <article
              key={post.id}
              id={post.slug}
              className="scroll-mt-24 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {post.image_url && (
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  {format(new Date(post.created_date), "MMMM d, yyyy")}
                  {post.topic && (
                    <span className="ml-2 bg-sky-50 text-sky-600 px-2 py-0.5 rounded-full text-xs">
                      {post.topic}
                    </span>
                  )}
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-[#1E2D3D] mb-4">
                  <a href={`#${post.slug}`} className="hover:text-sky-600 transition-colors">
                    {post.title}
                  </a>
                </h2>
                <div className="prose prose-slate prose-sm max-w-none prose-headings:text-[#1E2D3D] prose-a:text-sky-600">
                  <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
                {/* Internal links after each post */}
                <div className="mt-6 pt-5 border-t border-gray-100 flex flex-wrap gap-2">
                  <Link to={createPageUrl("Services")} className="text-xs text-sky-600 hover:underline font-medium">→ Our Services</Link>
                  <Link to={createPageUrl("QuoteAssistant")} className="text-xs text-sky-600 hover:underline font-medium">→ Get a Free Quote</Link>
                  <a href="tel:+16019541306" className="text-xs text-green-600 hover:underline font-medium flex items-center gap-1"><Phone className="w-3 h-3" /> Call (601) 954-1306</a>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}