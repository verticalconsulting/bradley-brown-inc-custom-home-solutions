import React, { useState } from "react";

const faqs = [
  {
    q: "What file formats and sizes does the tool accept?",
    a: "The studio accepts JPG and PNG files up to 10 MB. For best results, upload a well-lit, high-resolution photo that clearly shows the colors and textures you love."
  },
  {
    q: "How long does it take to generate my three finish packages?",
    a: "Packages are generated within seconds of clicking 'Generate 3 finish packages.' You'll see all three options — including budget alternatives — on the same screen."
  },
  {
    q: "Can I request changes to a generated package?",
    a: "Once saved, your package is included with your quote request, and a Bradley Brown designer will review it with you to make any adjustments before work begins."
  },
  {
    q: "What's the difference between the main package and the budget alternative?",
    a: "Each package includes a premium selection and a budget-friendly alternative that achieves a similar aesthetic at a lower material cost — so you can choose based on your project budget."
  },
  {
    q: "Do I need an account to save a package?",
    a: "No account is required. You can optionally add your name and email when saving, and your package is linked to your quote request when you reach out."
  },
  {
    q: "Is this tool free to use?",
    a: "Yes. The Finish Package Studio is a complimentary tool for homeowners exploring their design options with Bradley Brown Inc."
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a
    }
  }))
};

export default function FinishPackageFAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="mt-16 pt-12 border-t border-gray-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <h2 className="text-2xl md:text-3xl font-bold text-[#1E2D3D] mb-8">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full flex items-center justify-between gap-3 p-4 md:p-5 text-left"
              aria-expanded={openIdx === i}
            >
              <span className="font-semibold text-[#1E2D3D] text-sm md:text-base">{faq.q}</span>
              <span className={`text-sky-500 text-xl flex-shrink-0 transition-transform ${openIdx === i ? "rotate-45" : ""}`}>
                +
              </span>
            </button>
            {openIdx === i && (
              <p className="px-4 md:px-5 pb-4 md:pb-5 text-slate-600 text-sm leading-relaxed">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}