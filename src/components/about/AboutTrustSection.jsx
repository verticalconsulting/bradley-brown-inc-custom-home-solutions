import React from "react";
import { CheckCircle } from "lucide-react";
import TestimonialSlider from "@/components/TestimonialSlider";
import LandingFAQ from "@/components/landing/LandingFAQ";

const badges = [
  { name: "Licensed & Insured", img: "https://media.base44.com/images/public/699c758479c46f0580553750/f7e570d9e_generated_image.png" },
  { name: "MS Board of Contractors", img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c758479c46f0580553750/f98532894_ms-contractor.png" },
  { name: "Home Builders Association of MS", img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c758479c46f0580553750/103c2c527_mshba.png" },
  { name: "NAHB", img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c758479c46f0580553750/532a0ecba_nahb.png" },
  { name: "Better Business Bureau", img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c758479c46f0580553750/f47b53e12_bbb.png" },
];

const trustFaqs = [
  { question: "Is Bradley Brown Inc. licensed in Mississippi?", answer: "Yes. We are a licensed Mississippi General Contractor, fully insured with general liability and workers' compensation coverage on every project." },
  { question: "How long have you been in business?", answer: "Since 1995 — over 30 years serving Brandon and Rankin County area homeowners. We've built and renovated 500+ homes in the area." },
  { question: "Do you have references I can call?", answer: "Absolutely. Call us at (844) 351-4154 and we'll connect you with past clients in your area who are happy to share their experience." },
  { question: "What warranty do you offer?", answer: "We provide a workmanship warranty on all our projects. Material warranties pass through directly from manufacturers. We stand behind every job we do." },
];

export default function AboutTrustSection() {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
        {[{ v: "30+", l: "Years in Business" }, { v: "500+", l: "Homes Built" }, { v: "4.9★", l: "Average Rating" }, { v: "100%", l: "Licensed & Insured" }].map(s => (
          <div key={s.l} className="bg-white border border-gray-100 rounded-xl p-5 text-center shadow-sm">
            <p className="text-2xl font-bold text-sky-600">{s.v}</p><p className="text-xs text-slate-500 mt-1">{s.l}</p>
          </div>
        ))}
      </div>

      <div className="mb-14">
        <h2 className="text-2xl font-bold text-[#1E2D3D] mb-6">Certifications &amp; Memberships</h2>
        <div className="flex flex-wrap items-center justify-center gap-6 bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
          {badges.map(b => <img key={b.name} src={b.img} alt={b.name} width="56" height="56" className="h-14 w-auto object-contain" loading="lazy" decoding="async" />)}
        </div>
      </div>

      <div id="testimonials" className="mb-14">
        <TestimonialSlider variant="light" limit={6} title="What Our Clients Say" subtitle="500+ homes built across the Brandon and Rankin County area. Here's what homeowners say about working with us." />
      </div>

      <div className="mb-14">
        <h2 className="text-2xl font-bold text-[#1E2D3D] mb-6">Our Commitments to You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["Licensed Mississippi General Contractor (MC-2024)", "Full general liability insurance on every project", "Workers' compensation coverage for all crew", "Transparent, itemized written quotes — no surprises", "Workmanship warranty on all completed projects", "BBB member upholding ethical business standards"].map(item => (
            <div key={item} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" /><span className="text-sm text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-14">
        <h2 className="text-xl font-bold text-[#1E2D3D] mb-6 text-center">Frequently Asked Questions</h2>
        <LandingFAQ faqs={trustFaqs} />
      </div>
    </>
  );
}