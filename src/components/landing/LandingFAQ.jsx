import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function LandingFAQ({ faqs }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="max-w-2xl mx-auto">
      {faqs.map((faq, i) => (
        <div key={i} className="border-b border-gray-200">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-4 text-left text-[#1E2D3D] font-semibold text-sm hover:text-sky-600 transition-colors"
          >
            {faq.question}
            <ChevronDown className={`w-4 h-4 flex-shrink-0 ml-2 transition-transform ${open === i ? "rotate-180" : ""}`} />
          </button>
          {open === i && (
            <p className="pb-4 text-slate-500 text-sm leading-relaxed">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
}