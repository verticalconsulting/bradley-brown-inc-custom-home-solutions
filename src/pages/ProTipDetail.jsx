import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Calendar, Phone, ChevronLeft, Lightbulb } from "lucide-react";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import SEOHead from "@/components/SEOHead";
import { Helmet } from "react-helmet-async";

export default function ProTipDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setNotFound(false);
      const results = await base44.entities.BlogPost.filter({ slug });
      if (cancelled) return;
      if (results && results.length > 0) {
        setPost(results[0]);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    };
    load();
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <div className="animate-pulse">
            <div className="h-72 bg-gray-200 rounded-xl mb-6" />
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-100 rounded w-full mb-2" />
            <div className="h-4 bg-gray-100 rounded w-5/6 mb-2" />
            <div className="h-4 bg-gray-100 rounded w-4/6" />
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
          <Lightbulb className="w-12 h-12 mx-auto mb-4 text-slate-300" />
          <h1 className="text-2xl font-bold text-[#1E2D3D] mb-2">Tip not found</h1>
          <p className="text-slate-500 mb-6">This Pro Tip may have been moved or removed.</p>
          <Link to={createPageUrl("ProTips")} className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm">
            <ChevronLeft className="w-4 h-4" /> Back to All Pro Tips
          </Link>
        </div>
      </div>
    );
  }

  const canonical = `https://bradleybrowninc.com/protips/${post.slug}`;
  const description = post.meta_description || post.excerpt || `Expert home remodeling advice from Bradley Brown Inc. — ${post.title}`;

  const slugServiceMap = { 'home-addition-ideas': '/services/room-additions', 'small-bathroom-ideas': '/services/bathroom-remodeling', 'energy-efficient-upgrades': '/services/custom-home-building', 'renovation-loans': '/pricing' };
  const catServiceMap = { 'home-remodeling': '/services', 'kitchen-remodeling': '/services/kitchen-remodeling', 'bathroom-remodeling': '/services/bathroom-remodeling', 'outdoor-living': '/services/outdoor-living', 'curb-appeal': '/services/outdoor-living', 'home-value': '/services/custom-home-building', 'interior-updates': '/services/kitchen-remodeling' };
  const relatedServiceUrl = slugServiceMap[post.slug] || catServiceMap[post.category] || '/services';

  const howToSteps = (post.content || '').match(/^##\s+.+$/gm)?.map(s => s.replace(/^##\s+/, '').trim()) || [];
  const isHowTo = /how to/i.test(post.title) || howToSteps.length >= 3;
  const howToData = isHowTo ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": post.title,
    "description": description,
    ...(post.image_url && { image: post.image_url }),
    step: howToSteps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s,
      text: s,
    })),
  } : null;

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      <SEOHead
        title={post.title}
        description={description}
        canonical={canonical}
        ogImage={post.image_url}
        ogType="article"
        article={{
          publishedTime: post.created_date,
          modifiedTime: post.updated_date || post.created_date,
          author: "Bradley Brown Inc.",
          section: post.category || post.topic || "Home Remodeling",
          tags: post.topic ? [post.topic] : [],
          content: post.content,
          type: "BlogPosting",
          categories: [
            { name: "Pro Tips", url: "https://bradleybrowninc.com/protips" },
          ],
        }}
      />
      {howToData && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(howToData)}
          </script>
        </Helmet>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-sky-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
      </div>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {post.image_url && (
            <div className="p-4 md:p-6 pb-0">
              <img
                src={post.image_url}
                alt={post.image_alt_text || post.title}
                className="w-full h-72 md:h-96 object-cover rounded-xl"
              />
            </div>
          )}
          <div className="p-6 md:p-10">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-3">
              <Calendar className="w-3.5 h-3.5" />
              {format(new Date(post.created_date), "MMMM d, yyyy")}
              {post.topic && (
                <span className="ml-2 bg-sky-50 text-sky-600 px-2 py-0.5 rounded-full text-xs">
                  {post.topic}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1E2D3D] mb-3 leading-tight">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-slate-500 text-base md:text-lg mb-6 leading-relaxed">
                {post.excerpt}
              </p>
            )}
            <div className="max-w-4xl text-slate-800">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2 className="mt-12 mb-5 text-3xl font-bold tracking-tight text-[#1E2D3D]">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mt-8 mb-4 text-2xl font-semibold text-[#1E2D3D]">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-6 text-lg leading-8 text-slate-700">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-8 ml-6 list-disc space-y-3 text-lg leading-8 text-slate-700">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="mb-8 ml-6 list-decimal space-y-3 text-lg leading-8 text-slate-700">{children}</ol>
                  ),
                  li: ({ children }) => <li className="pl-2">{children}</li>,
                  strong: ({ children }) => (
                    <strong className="font-bold text-[#1E2D3D]">{children}</strong>
                  ),
                  a: ({ href, children }) => (
                    <a href={href} className="text-sky-600 hover:underline">{children}</a>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-100 flex flex-wrap gap-3">
              <Link to="/protips" className="text-xs text-sky-600 hover:underline font-medium">← All Pro Tips</Link>
              <Link to={relatedServiceUrl} className="text-xs text-sky-600 hover:underline font-medium">→ Related Service</Link>
              <Link to="/services" className="text-xs text-sky-600 hover:underline font-medium">→ All Services</Link>
              <Link to="/estimate" className="text-xs text-sky-600 hover:underline font-medium">→ Get a Free Quote</Link>
              <a href="tel:+18443514154" className="text-xs text-green-600 hover:underline font-medium flex items-center gap-1">
                <Phone className="w-3 h-3" /> Call (844) 351-4154
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}