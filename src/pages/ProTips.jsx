import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Lightbulb, RefreshCw, Calendar, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";
import SEOHead from "@/components/SEOHead";
import { usePageImages } from "@/lib/usePageImages";

export default function ProTips() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { hero: heroImage } = usePageImages("ProTips");

  useEffect(() => {
    loadPosts();
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    try {
      const user = await base44.auth.me();
      setIsAdmin(user?.role === "admin");
    } catch {}
  };

  const loadPosts = async () => {
    setLoading(true);
    const data = await base44.entities.BlogPost.list("-created_date", 50);
    setPosts(data);
    setLoading(false);
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Delete this tip permanently?")) return;
    await base44.entities.BlogPost.delete(postId);
    await loadPosts();
  };

  const handleGenerate = async () => {
    setGenerating(true);
    await base44.functions.invoke("generateProTip", {});
    await loadPosts();
    setGenerating(false);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <SEOHead
        title="Pro Tips — Home Remodeling Advice | Bradley Brown Inc."
        description="Expert remodeling tips for Brandon, MS homeowners — kitchens, baths, additions & more from Rankin County's trusted contractor since 2005. Call (844) 351-4154."
        canonical="https://bradleybrowninc.com/protips"
      />

      {/* Hero */}
      <div className="bg-foreground py-14 md:py-20 relative overflow-hidden">
        {heroImage && (
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('${heroImage.url}')` }} />
        )}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-2">
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-5">
          <h2 className="font-bold text-foreground text-sm mb-3">Featured Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "Small Bathroom Remodeling Ideas", to: "/protips/small-bathroom-ideas", desc: "6 contractor-tested ideas to maximize a small bath" },
              { label: "Home Addition Ideas", to: "/protips/home-addition-ideas", desc: "Master suites, sunrooms, in-law suites & more" },
              { label: "Energy-Efficient Home Upgrades", to: "/protips/energy-efficient-upgrades", desc: "Save on bills & claim federal tax credits" },
              { label: "Renovation Loan Options", to: "/protips/renovation-loans", desc: "FHA 203k, HELOC, home equity loans & more" },
              { label: "Kitchen Remodeling", to: "/services/kitchen-remodeling", desc: "Custom cabinets, countertops, tile & premium finishes" },
              { label: "Bathroom Remodeling", to: "/services/bathroom-remodeling", desc: "Walk-in showers, tub-to-shower conversions & vanities" },
              { label: "Emergency Home Repairs — Brandon, MS", to: "/services/emergency-repairs", desc: "Urgent? Call (601) 954-1306 — same-week service available" },
            ].map((g) => (
              <Link key={g.to} to={g.to} className="block bg-white border border-sky-100 rounded-lg p-4 hover:border-sky-400 hover:underline underline-offset-2 transition-colors">
                <p className="font-semibold text-foreground text-xs mb-1">{g.label}</p>
                <p className="text-slate-600 text-xs">{g.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Post Cards */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 pb-20">
        <h2 className="font-bold text-foreground text-lg mb-5">All Pro Tips</h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="h-48 bg-gray-200" />
                <div className="p-5">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
                  <div className="h-3 bg-gray-100 rounded w-full mb-2" />
                  <div className="h-3 bg-gray-100 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-slate-600">
            <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No tips yet.</p>
            {isAdmin && <p className="text-sm mt-1">Click "Generate New Pro Tip" to create the first one.</p>}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                <Link to={`/protips/${post.slug}`} className="block">
                  {post.image_url ? (
                    <img
                      src={post.image_url}
                      alt={post.image_alt_text || post.title}
                      width="400"
                      height="192"
                      className="w-full h-48 object-cover group-hover:scale-[1.02] transition-transform"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-sky-50 to-slate-100 flex items-center justify-center">
                      <Lightbulb className="w-10 h-10 text-sky-300" />
                    </div>
                  )}
                </Link>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-slate-600 text-xs mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    {format(new Date(post.created_date), "MMM d, yyyy")}
                    {post.topic && (
                      <span className="ml-1 bg-sky-50 text-sky-600 px-2 py-0.5 rounded-full text-xs truncate max-w-[140px]">
                        {post.topic}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 leading-snug">
                    <Link to={`/protips/${post.slug}`} className="hover:text-sky-600 transition-colors underline-offset-2 hover:underline">
                      {post.title}
                    </Link>
                  </h3>
                  {post.excerpt && (
                    <p className="text-slate-500 text-sm mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="mt-auto flex items-center justify-between">
                    <Link
                      to={`/protips/${post.slug}`}
                      className="text-sky-600 hover:text-sky-800 text-sm font-semibold underline-offset-2 hover:underline"
                    >
                      Read more →
                    </Link>
                    {isAdmin && (
                      <button
                        onClick={() => handleDelete(post.id)}
                        aria-label={`Delete tip: ${post.title}`}
                        className="flex items-center gap-1 text-xs bg-red-50 hover:bg-red-100 text-red-500 px-2.5 py-2 rounded-md font-medium min-w-[44px] min-h-[44px] justify-center"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}