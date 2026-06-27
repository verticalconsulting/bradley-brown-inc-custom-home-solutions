import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export const homeFaqs = [
  {
    question: "What home remodeling services does Bradley Brown Inc offer in Brandon, MS?",
    answer:
      "Bradley Brown Inc offers kitchen remodels, bathroom renovations, room additions, custom home building, barndominiums, and outdoor living spaces throughout Brandon and Central Mississippi."
  },
  {
    question: "Is Bradley Brown Inc licensed and insured in Mississippi?",
    answer:
      "Yes. Bradley Brown Inc is fully licensed and insured in Mississippi and has served homeowners in Brandon and Rankin County since 1995."
  },
  {
    question: "How do I get a free estimate from Bradley Brown Inc?",
    answer:
      "You can request a free, no-obligation estimate by calling (844) 351-4154 or by using the online quote form at bradleybrowninc.com/quote."
  }
];

export default function HomeFAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E2D3D] mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600">
            Answers to the questions Brandon, MS homeowners ask us most.
          </p>
        </div>

        <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
          {homeFaqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="py-4">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between text-left gap-4"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-base md:text-lg font-semibold text-[#1E2D3D]">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-sky-500 flex-shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-3 text-slate-700 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}