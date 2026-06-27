import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export const homeFaqs = [
  {
    question: "How much does home remodeling cost in Brandon, MS?",
    answer:
      "Home remodeling costs in Brandon, MS vary by project. Kitchen remodels typically range from $15,000–$60,000, bathroom renovations from $8,000–$25,000, and room additions from $30,000–$100,000+. Bradley Brown Inc offers free estimates — call (844) 351-4154."
  },
  {
    question: "Is Bradley Brown Inc licensed and insured in Mississippi?",
    answer:
      "Yes. Bradley Brown Inc is fully licensed and insured in Mississippi, with 30+ years of experience serving Brandon, Rankin County, and Central Mississippi since 1995."
  },
  {
    question: "Do you build custom homes and barndominiums in Mississippi?",
    answer:
      "Yes. We design and build custom homes, barndominiums, and steel-frame structures across Central Mississippi. Contact us for a free consultation."
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