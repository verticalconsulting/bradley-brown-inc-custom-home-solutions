import React from "react";
import { Quote, ExternalLink } from "lucide-react";
import StarRating from "@/components/reviews/StarRating";

const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/place/Bradley+Brown+Inc/@32.3017,-90.1847,15z";

const TESTIMONIALS = [
  {
    quote: "Bradley Brown transformed our 1990s kitchen into a showpiece — custom cabinetry, a quartz waterfall island, and lighting that makes you want to cook every night. The crew was on time, clean, and Brad walked us through every decision. Worth every penny.",
    name: "Sarah T.",
    city: "Brandon, MS",
    projectType: "Kitchen Transformation",
    rating: 5,
  },
  {
    quote: "We renovated the entire first floor — kitchen, living room, powder bath, and a custom bar wall. Walker kept the project on schedule and the finish work is flawless. Three months in and we're still finding details we love. Highly recommend.",
    name: "Michael R.",
    city: "Madison, MS",
    projectType: "Whole-Home Renovation",
    rating: 5,
  },
  {
    quote: "Our master bath went from a cramped hallway bathroom to a spa retreat with a freestanding tub, heated floors, and a walk-in steam shower. The tile work alone is stunning. Bradley Brown's team treated our home like it was their own.",
    name: "Jennifer L.",
    city: "Flowood, MS",
    projectType: "Master Bath Overhaul",
    rating: 5,
  },
  {
    quote: "The built-in bookcases and coffered ceiling they added to our study completely changed the feel of the home. Precision carpentry, no shortcuts, and they matched existing trim perfectly. True craftsmen — we'll use them again.",
    name: "David K.",
    city: "Ridgeland, MS",
    projectType: "Custom Millwork & Built-Ins",
    rating: 5,
  },
];

export default function LuxuryTestimonials() {
  return (
    <section className="bg-[#FAFAF8] py-14 md:py-20 border-y border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-200 rounded-full px-3 py-1 mb-4">
            <StarRating value={5} size="w-3.5 h-3.5" />
            <span className="text-amber-700 text-xs font-semibold tracking-wide">
              5.0 — VERIFIED CLIENTS
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1E2D3D] mb-3">
            What Brandon &amp; Rankin County Homeowners Say
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
            Real reviews from real luxury renovation clients across Central Mississippi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-7 relative"
            >
              <Quote className="w-8 h-8 text-amber-300 absolute top-5 right-5 opacity-50" />
              <StarRating value={t.rating} size="w-4 h-4" />
              <p className="text-slate-700 leading-relaxed text-sm md:text-base mt-4 mb-5">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="border-t border-gray-100 pt-4">
                <p className="font-bold text-[#1E2D3D] text-sm">
                  {t.name} — {t.city}
                </p>
                <p className="text-xs text-sky-600 font-medium mt-0.5">
                  {t.projectType}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href={GOOGLE_REVIEWS_URL}
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

export { TESTIMONIALS, GOOGLE_REVIEWS_URL };