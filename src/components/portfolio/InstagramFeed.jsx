import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Instagram, Play, ExternalLink } from "lucide-react";

export default function InstagramFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    base44.functions.invoke("getInstagramFeed", {})
      .then((res) => {
        if (res?.data?.success) {
          setPosts(res.data.posts || []);
        } else {
          setError(res?.data?.error || "Could not load feed");
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-lg bg-gray-200 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error || posts.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
        <Instagram className="w-8 h-8 text-slate-300 mx-auto mb-3" />
        <p className="text-slate-500 text-sm">
          {error ? "Unable to load Instagram posts right now." : "No Instagram posts yet."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {posts.map((post) => {
        const isVideo = post.media_type === "VIDEO";
        const imgSrc = isVideo ? (post.thumbnail_url || post.media_url) : post.media_url;
        return (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden rounded-lg bg-slate-100 block"
            title={post.caption?.slice(0, 100) || "View on Instagram"}
          >
            <img
              src={imgSrc}
              alt={post.caption?.slice(0, 80) || "Instagram post"}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {isVideo && (
              <div className="absolute top-2 right-2 bg-black/60 rounded-full p-1.5">
                <Play className="w-3 h-3 text-white fill-white" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <ExternalLink className="w-4 h-4 text-white" />
            </div>
          </a>
        );
      })}
    </div>
  );
}