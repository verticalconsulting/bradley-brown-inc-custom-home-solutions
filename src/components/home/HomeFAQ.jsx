import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export const homeFaqs = [
  {
    question: "How much does a home remodel cost in Brandon, MS?",
    answer: (
      <>
        Kitchen remodels in the Brandon area typically run $15,000–$60,000,
        bathroom renovations $8,000–$30,000, and room additions $30,000–$120,000
        depending on size, finishes, and scope. Every project gets a{" "}
        <Link to="/estimate" className="text-primary hover:underline font-medium">
          free itemized estimate
        </Link>{" "}
        with no hidden costs. See our{" "}
        <Link to="/pricing" className="text-primary hover:underline font-medium">
          pricing page
        </Link>{" "}
        for detailed cost breakdowns by project type.
      </>
    ),
    schemaAnswer:
      "Kitchen remodels in the Brandon area typically run $15,000–$60,000, bathroom renovations $8,000–$30,000, and room additions $30,000–$120,000 depending on size, finishes, and scope. Every project gets a free itemized estimate with no hidden costs. See our pricing page for detailed cost breakdowns by project type."
  },
  {
    question: "Is Bradley Brown Inc licensed and insured in Mississippi?",
    answer:
      "Yes. Bradley Brown Inc holds a full Mississippi contractor's license and carries liability insurance and workers' compensation on every project in Brandon and Rankin County. We pull all required permits and schedule inspections so your remodel is code-compliant from start to finish.",
    schemaAnswer:
      "Yes. Bradley Brown Inc holds a full Mississippi contractor's license and carries liability insurance and workers' compensation on every project in Brandon and Rankin County. We pull all required permits and schedule inspections so your remodel is code-compliant from start to finish."
  },
  {
    question: "How long does a kitchen or bathroom remodel take in Brandon?",
    answer: (
      <>
        Kitchen remodels typically take 4–8 weeks and bathroom renovations 2–4
        weeks, depending on layout changes, tile scope, and material
        availability. We provide a detailed timeline at kickoff so you know what
        to expect at every phase. Learn more about our{" "}
        <Link to="/services/kitchen-remodeling" className="text-primary hover:underline font-medium">
          kitchen remodeling
        </Link>{" "}
        and{" "}
        <Link to="/services/bathroom-remodeling" className="text-primary hover:underline font-medium">
          bathroom remodeling
        </Link>{" "}
        services.
      </>
    ),
    schemaAnswer:
      "Kitchen remodels typically take 4–8 weeks and bathroom renovations 2–4 weeks, depending on layout changes, tile scope, and material availability. We provide a detailed timeline at kickoff so you know what to expect at every phase. Learn more about our kitchen remodeling and bathroom remodeling services."
  },
  {
    question: "Do you handle storm damage and emergency home repairs?",
    answer: (
      <>
        Yes. We respond to storm damage, roof leaks, structural issues, and
        water intrusion across Brandon, Flowood, and Rankin County. Our crews
        are available for same-week emergency service to prevent further damage
        to your home. Call{" "}
        <a href="tel:+18443514154" className="text-primary hover:underline font-medium">
          (844) 351-4154
        </a>{" "}
        or visit our{" "}
        <Link to="/services/emergency-repairs" className="text-primary hover:underline font-medium">
          emergency repairs
        </Link>{" "}
        page to get help fast.
      </>
    ),
    schemaAnswer:
      "Yes. We respond to storm damage, roof leaks, structural issues, and water intrusion across Brandon, Flowood, and Rankin County. Our crews are available for same-week emergency service to prevent further damage to your home. Call (844) 351-4154 or visit our emergency repairs page to get help fast."
  },
  {
    question: "What areas near Brandon, MS do you serve?",
    answer:
      "We serve Brandon, Flowood, Ridgeland, Pearl, Florence, Richland, and the greater Rankin County area from our headquarters in Brandon. We also take on custom home builds and larger renovations in Madison and Hinds County when the project is a good fit. Call (844) 351-4154 to confirm we cover your address.",
    schemaAnswer:
      "We serve Brandon, Flowood, Ridgeland, Pearl, Florence, Richland, and the greater Rankin County area from our headquarters in Brandon. We also take on custom home builds and larger renovations in Madison and Hinds County when the project is a good fit. Call (844) 351-4154 to confirm we cover your address."
  },
  {
    question: "Can you help with financing a home renovation?",
    answer: (
      <>
        Yes. We work with renovation loan partners who offer FHA 203(k),
        HomeStyle, and conventional renovation financing for qualifying
        homeowners. Ask about financing options when requesting your{" "}
        <Link to="/estimate" className="text-primary hover:underline font-medium">
          free estimate
        </Link>
        , or read our{" "}
        <Link to="/protips/renovation-loans" className="text-primary hover:underline font-medium">
          renovation loans guide
        </Link>{" "}
        for details.
      </>
    ),
    schemaAnswer:
      "Yes. We work with renovation loan partners who offer FHA 203(k), HomeStyle, and conventional renovation financing for qualifying homeowners. Ask about financing options when requesting your free estimate, or read our renovation loans guide for details."
  }
];

export default function HomeFAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Frequently Asked Questions About Home Remodeling in Brandon, MS
          </h2>
          <p className="text-foreground/70">
            Answers to the questions Brandon, MS homeowners ask us most.
          </p>
        </div>

        <div className="divide-y divide-border border-t border-b border-border">
          {homeFaqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="py-4">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between text-left gap-4"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-base md:text-lg font-semibold text-foreground">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-3 text-foreground leading-relaxed">
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