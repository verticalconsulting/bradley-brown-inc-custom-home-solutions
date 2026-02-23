import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Star, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";

const placeholders = [
  { client_name: "Michael & Sarah T.", location: "Ridgeland, MS", rating: 5, text: "Bradley Brown built our custom home from scratch and it was an incredible experience. They kept us informed at every stage, came in on budget, and the quality is outstanding. Five years later and we still marvel at the craftsmanship." },
  { client_name: "Jennifer L.", location: "Madison, MS", rating: 5, text: "We had our master bath and kitchen completely renovated. The team was professional, respectful of our home, and the results exceeded our expectations. Worth every penny!" },
  { client_name: "Robert & Karen H.", location: "Brandon, MS", rating: 5, text: "From the initial consultation to the final walkthrough, Bradley Brown was exceptional. They turned our outdated house into the home we always dreamed of. Highly recommend!" },
];

export default function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    base44.entities.Testimonial.filter({ featured: true }, "-created_date", 6)
      .then(data => setTestimonials(data.length ? data : placeholders))
      .catch(() => setTestimonials(placeholders));
  }, []);

  const display = testimonials.length ? testimonials : placeholders;

  const prev = () => setCurrent(c => (c - 1 + display.length) % display.length);
  const next = () => setCurrent(c => (c + 1) % display.length);

  const t = display[current];
  if (!t) return null;

  return (
    <section className="py-16 md:py-24 bg-[#1E2D3D]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-[#C4922A] font-semibold text-sm uppercase tracking-wider mb-2">Testimonials</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">What Our Clients Say</h2>

        <div className="relative min-h-[200px]">
          <MessageSquare className="w-10 h-10 text-[#C4922A]/30 mx-auto mb-6" />
          <p className="text-lg md:text-xl text-slate-200 leading-relaxed mb-8 italic">
            "{t.text}"
          </p>
          <div className="flex justify-center gap-1 mb-3">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} className="w-5 h-5 text-[#C4922A] fill-[#C4922A]" />
            ))}
          </div>
          <p className="font-bold text-white">{t.client_name}</p>
          <p className="text-slate-400 text-sm">{t.location}</p>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button onClick={prev} className="w-10 h-10 rounded-full border border-slate-600 flex items-center justify-center text-slate-400 hover:border-[#C4922A] hover:text-[#C4922A] transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {display.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-[#C4922A]" : "bg-slate-600"}`}
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