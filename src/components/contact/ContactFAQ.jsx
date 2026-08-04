import React, { useState } from "react";
import SEOHead from "@/components/SEOHead";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const faqs = [
  {
    question: "Are you licensed and insured in Mississippi?",
    answer: (
      <>
        Yes. Bradley Brown Inc. holds a Mississippi Residential Builder License (MSBOC #) and carries full general liability and workers' compensation insurance. We provide license and insurance documentation on request before any project begins, so you can verify our credentials directly with the Mississippi Board of Contractors.
      </>
    ),
  },
  {
    question: "Do you offer a warranty on your work?",
    answer: (
      <>
        Yes. We stand behind every project with a workmanship warranty. Our standard warranty covers labor and installation for one year from project completion, and we pass through all manufacturer warranties on materials, fixtures, and appliances. For custom home builds, structural warranties extend further — ask Brad for specifics during your consultation.
      </>
    ),
  },
  {
    question: "How long does a typical remodel take?",
    answer: (
      <>
        Timelines vary by scope, but here are realistic ranges: a kitchen remodel typically takes 4–8 weeks, a bathroom renovation 2–3 weeks, and a room addition 6–12 weeks depending on size and permitting. Custom home builds generally run 6–10 months. We provide a detailed schedule before construction starts and keep you updated weekly.
      </>
    ),
  },
  {
    question: "Do you offer financing options?",
    answer: (
      <>
        Yes. We work with several financing partners to help homeowners fund their projects, including renovation loans, HELOCs, and personal improvement loans. We can connect you with lenders familiar with Central Mississippi home values, or you can review options on our{" "}
        <Link to={"/protips/renovation-loans"} className="text-sky-600 font-medium hover:underline">
          Renovation Loans
        </Link>{" "}
        page. Ask Brad about payment plans during your free estimate.
      </>
    ),
  },
  {
    question: "What areas do you serve?",
    answer: (
      <>
        We serve Brandon, Flowood, Pearl, Madison, Ridgeland, Jackson, Clinton, and Byram — plus all of Rankin, Hinds, and Madison counties. If you're in Central Mississippi and not sure whether you're in our service area, give us a call at (844) 351-4154 and we'll let you know.
      </>
    ),
  },
  {
    question: "How do I get a free estimate?",
    answer: (
      <>
        Getting an estimate is easy. You can call us directly at (844) 351-4154, fill out the contact form on this page, or try our{" "}
        <Link to={"/estimate"} className="text-sky-600 font-medium hover:underline">
          AI Cost Estimator
        </Link>{" "}
        for an instant ballpark range. For a detailed quote, we'll schedule a free on-site visit to measure, discuss your goals, and provide a written estimate — usually within 1–2 business days.
      </>
    ),
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => {
    // Extract plain text from JSX answer for schema
    let text = "";
    if (typeof f.answer === "string") {
      text = f.answer;
    } else {
      // Walk the JSX tree to get text content
      const walk = (node) => {
        if (node == null || node === false) return;
        if (typeof node === "string") { text += node; return; }
        if (Array.isArray(node)) { node.forEach(walk); return; }
        if (node.props && node.props.children) {
          walk(node.props.children);
        }
      };
      walk(f.answer);
    }
    return {
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text },
    };
  }),
};

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-14" id="common-questions">
      <SEOHead schema={faqSchema} />
      <h2 className="text-2xl md:text-3xl font-bold text-[#1E2D3D] text-center mb-8">
        Common Questions Before You Call
      </h2>

      <div className="space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={faq.question} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-[#1E2D3D] text-sm md:text-base">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-sm">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}