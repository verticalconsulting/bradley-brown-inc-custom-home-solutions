import React from "react";
import { Star, Quote, ExternalLink } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "Bradley Brown completely transformed our 1990s home into something that looks like it belongs in a magazine. The craftsmanship on the custom millwork is stunning, and Brad's team was on site every single day. We never wondered what was happening — they communicated constantly.",
    name: "Sarah T.",
    location: "Brandon, MS",
    projectType: "Whole-Home Renovation",
  },
  {
    quote:
      "Our kitchen renovation was seamless from start to finish. The project manager handled every subcontractor, every material order, and every inspection. The finish work is the best I've seen in the Brandon area. Worth every penny.",
    name: "Michael & Karen R.",
    location: "Madison, MS",
    projectType: "Kitchen Transformation",
  },
  {
    quote:
      "We needed a master bath that felt like a spa retreat, and that's exactly what we got. Heated floors, a steam shower, and tile work so precise it looks like a showroom. The crew was respectful of our home the entire time.",
    name: "Jennifer L.",
    location: "Flowood, MS",
    projectType: "Master Bath Overhaul",
  },
  {
    quote:
      "The built-in bookcases and coffered ceiling Bradley Brown installed are conversation pieces every time guests come over. Their finish carpenters are true craftsmen. I've already booked them for our kitchen next year.",
    name: "David W.",
    location: "Ridgeland, MS",
    projectType: "Custom Millwork & Built-Ins",
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export default function LuxuryTestimonials() {
  return (
    <section className="bg-white py-14 md:py-20 border-y border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 rounded-full px-3 py-1 mb-4">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-sky-700 text-xs font-semibold tracking-wide">
              5.0 · VERIFIED HOMEOWNERS
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1E2D3D] mb-3">
            What Brandon &amp; Rankin County Homeowners Say
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
            Real reviews from homeowners who trusted Bradley Brown Inc. with
            their luxury renovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="bg-slate-50 border border-gray-100 rounded-2xl p-6 md:p-7 relative"
            >
              <Quote className="w-8 h-8 text-sky-200 absolute top-5 right-5" />
              <div className="mb-3">
                <StarRating />
              </div>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-5 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center justify-between flex-wrap gap-2 pt-4 border-t border-gray-200">
                <p className="font-bold text-[#1E2D3D] text-sm">
                  {t.name} — {t.location}
                </p>
                <span className="inline-flex items-center bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                  {t.projectType}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.google.com/search?q=Bradley+Brown+Inc+Brandon+MS+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-semibold text-sm transition-colors"
          >
            Read more reviews on Google
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}