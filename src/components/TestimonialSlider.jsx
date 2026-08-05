import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const PROJECT_LABELS = {
  custom_home: "Custom Home",
  renovation: "Renovation",
  addition: "Room Addition",
  outdoor: "Outdoor Living",
};

const PLACEHOLDERS = [
  { client_name: "Michael & Sarah T.", location: "Ridgeland, MS", rating: 5, text: "Bradley Brown built our custom home from scratch and it was an incredible experience. They kept us informed at every stage, came in on budget, and the quality is outstanding. Five years later and we still marvel at the craftsmanship.", project_type: "custom_home" },
  { client_name: "Jennifer L.", location: "Madison, MS", rating: 5, text: "We had our master bath and kitchen completely renovated. The team was professional, respectful of our home, and the results exceeded our expectations. Worth every penny!", project_type: "renovation" },
  { client_name: "Robert & Karen H.", location: "Brandon, MS", rating: 5, text: "From the initial consultation to the final walkthrough, Bradley Brown was exceptional. They turned our outdated house into the home we always dreamed of. Highly recommend!", project_type: "addition" },
  { client_name: "Lisa P.", location: "Flowood, MS", rating: 5, text: "Honest, transparent, and genuinely talented builders. Our room addition came in on budget and looks like it was always part of the house.", project_type: "addition" },
  { client_name: "David H.", location: "Pearl, MS", rating: 5, text: "I've used Bradley Brown twice now. First a bathroom remodel, then a full kitchen gut. Both times — perfect results. The best contractor in Central Mississippi.", project_type: "renovation" },
  { client_name: "Karen L.", location: "Madison, MS", rating: 5, text: "The most professional contractor we've ever worked with. They treated our home like it was their own. Zero regrets.", project_type: "renovation" },
];

/**
 * TestimonialSlider
 * 
 * Props:
 *   variant: "dark" (default) | "light"
 *     - "dark": dark navy background — for home page sections
 *     - "light": white card grid — for trust/landing pages
 *   limit: number (default 6)
 *   featuredOnly: boolean (default false) — filter to featured=true records
 *   title: string (optional override)
 *   subtitle: string (optional override)
 */
export default function TestimonialSlider({
  variant = "dark",
  limit = 6,
  featuredOnly = false,
  title = "What Our Clients Say",
  subtitle = "Trusted by homeowners across Central Mississippi since 1995.",
}) {
  const [testimonials, setTestimonials] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const autoRef = useRef(null);

  useEffect(() => {
    const filters = featuredOnly ? { featured: true } : {};
    base44.entities.Testimonial.filter(filters, "-created_date", limit)
      .then((data) => setTestimonials(data.length ? data : PLACEHOLDERS.slice(0, limit)))
      .catch(() => setTestimonials(PLACEHOLDERS.slice(0, limit)))
      .finally(() => setLoading(false));
  }, [limit, featuredOnly]);

  // Auto-advance for dark variant
  useEffect(() => {
    if (variant !== "dark" || testimonials.length === 0) return;
    autoRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(autoRef.current);
  }, [variant, testimonials.length]);

  const prev = () => {
    clearInterval(autoRef.current);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  };
  const next = () => {
    clearInterval(autoRef.current);
    setCurrent((c) => (c + 1) % testimonials.length);
  };

  if (loading) return null;

  // ── LIGHT VARIANT: card grid ──────────────────────────────────────────────
  if (variant === "light") {
    return (
      <section className="py-12 md:py-16">
        {(title || subtitle) && (
          <div className="text-center mb-8">
            {title && <h2 className="text-2xl md:text-3xl font-bold text-[#1E2D3D]">{title}</h2>}
            {subtitle && <p className="text-slate-500 mt-2 text-sm max-w-xl mx-auto">{subtitle}</p>}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex flex-col">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed italic flex-1 mb-4">"{t.text}"</p>
              <div className="flex items-center gap-3">
                {t.photo_url ? (
                  <img src={t.photo_url} alt={t.client_name} width="36" height="36" loading="lazy" decoding="async" className="w-9 h-9 rounded-full object-cover border-2 border-sky-100" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold text-sm flex-shrink-0">
                    {t.client_name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-xs font-semibold text-slate-800">{t.client_name}</p>
                  <p className="text-xs text-slate-400">{t.location}{t.project_type ? ` · ${PROJECT_LABELS[t.project_type] || t.project_type}` : ""}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ── DARK VARIANT: full-width slider ──────────────────────────────────────
  const t = testimonials[current];
  if (!t) return null;

  return (
    <section className="py-16 md:py-24 bg-[#1E2D3D]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-sky-400 mb-2 text-sm font-semibold uppercase tracking-wider">Testimonials</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">{title}</h2>

        <div className="relative min-h-[220px] flex flex-col items-center justify-center">
          <Quote className="w-10 h-10 text-[#C4922A]/40 mb-4" />
          <p className="text-lg md:text-xl text-slate-200 leading-relaxed mb-6 italic max-w-2xl mx-auto">
            "{t.text}"
          </p>
          <div className="flex justify-center gap-1 mb-3">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} className="w-5 h-5 text-[#C4922A] fill-[#C4922A]" />
            ))}
          </div>
          <div className="flex items-center gap-3 justify-center mt-1">
            {t.photo_url && (
              <img src={t.photo_url} alt={t.client_name} width="40" height="40" loading="lazy" decoding="async" className="w-10 h-10 rounded-full object-cover border-2 border-sky-400/30" />
            )}
            <div>
              <p className="font-bold text-white">{t.client_name}</p>
              <p className="text-slate-400 text-sm">
                {t.location}{t.project_type ? ` · ${PROJECT_LABELS[t.project_type] || t.project_type}` : ""}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button onClick={prev} className="w-10 h-10 rounded-full border border-slate-600 flex items-center justify-center text-slate-400 hover:border-[#C4922A] hover:text-[#C4922A] transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { clearInterval(autoRef.current); setCurrent(i); }}
                className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-[#C4922A]" : "bg-slate-600 hover:bg-slate-400"}`}
              />
            ))}
          </div>
          <button onClick={next} className="w-10 h-10 rounded-full border border-slate-600 flex items-center justify-center text-slate-400 hover:border-[#C4922A] hover:text-[#C4922A] transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}