import React from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { DollarSign, CheckCircle, Phone, ChevronRight, Home, CreditCard, Landmark, Shield } from "lucide-react";

const loanOptions = [
  {
    icon: Landmark,
    name: "FHA 203(k) Renovation Loan",
    description: "Perfect for buying a fixer-upper or renovating your current home. FHA 203(k) loans wrap the purchase price and renovation costs into one mortgage.",
    pros: ["Low 3.5% down payment", "Credit scores as low as 580", "Covers most renovation types", "Available for primary residences"],
    bestFor: "First-time buyers or homeowners with limited equity"
  },
  {
    icon: Home,
    name: "Home Equity Loan (HEL)",
    description: "Borrow against the equity you've built in your home at a fixed interest rate. Great for large, planned renovation projects with a defined budget.",
    pros: ["Fixed monthly payments", "Lump-sum disbursement", "Tax-deductible interest (consult your CPA)", "Competitive interest rates"],
    bestFor: "Large remodels like kitchens, additions, or full-home renovations"
  },
  {
    icon: CreditCard,
    name: "Home Equity Line of Credit (HELOC)",
    description: "A revolving credit line secured by your home equity. Draw funds as needed during your renovation — only pay interest on what you use.",
    pros: ["Flexible draw period", "Only pay interest on drawn amount", "Reusable credit line", "Ideal for phased projects"],
    bestFor: "Multi-phase renovations or homeowners who want flexibility"
  },
  {
    icon: DollarSign,
    name: "Personal Renovation Loan",
    description: "Unsecured loans that don't require home equity. Fast approval, no collateral needed — a solid option if you're early in homeownership.",
    pros: ["No equity required", "Fast approval (1–3 days)", "Fixed rate & term", "No risk to your home"],
    bestFor: "Smaller projects or newer homeowners without built-up equity"
  },
  {
    icon: Shield,
    name: "Fannie Mae HomeStyle Loan",
    description: "A conventional loan that finances both the home purchase and renovation costs. More flexible than FHA on property types.",
    pros: ["Covers luxury improvements", "Works on investment properties", "Competitive rates", "Higher loan limits than FHA"],
    bestFor: "Higher-budget renovations or investment property upgrades"
  }
];

const renovationLoansSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Renovation Loans for Home Improvements in Brandon, MS — Complete Guide",
  "description": "A complete guide to renovation loans and financing options for home improvements in Brandon, MS. Compare FHA 203k, HELOC, home equity loans and more.",
  "author": { "@type": "Organization", "name": "Bradley Brown Inc." },
  "publisher": { "@type": "Organization", "name": "Bradley Brown Inc.", "url": "https://custom-home-builder.bradleybrowninc.com" },
  "datePublished": "2025-01-01",
  "mainEntityOfPage": "https://custom-home-builder.bradleybrowninc.com/renovation-loans"
};

export default function RenovationLoans() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      <SEOHead
        title="Renovation Loans for New Homes in Brandon, MS | Financing Guide"
        description="Compare renovation loans for new homes in Brandon, MS — FHA 203k, HELOC, home equity loans & personal loans. Find the best financing option for your remodeling project."
        schema={renovationLoansSchema}
        canonical="https://custom-home-builder.bradleybrowninc.com/renovation-loans"
      />

      <div className="bg-[#1E2D3D] py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sky-400 font-semibold text-sm uppercase tracking-wider mb-2">Financing Your Project</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white">Renovation Loans for New Homes</h1>
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-base md:text-lg">
            A complete guide to financing options for home remodeling in Brandon, MS. Compare loan types and find the best fit for your project and budget.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">

        <div className="bg-sky-50 border border-sky-200 rounded-xl p-5 mb-10">
          <p className="text-sky-800 text-sm font-medium">
            <strong>Bradley Brown Inc. works with homeowners at all budget levels.</strong> While we don't provide financing directly, we can help you plan your project scope to fit your loan amount. <a href="tel:+16019541306" className="underline font-bold">Call (601) 954-1306</a> to discuss your project.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-[#1E2D3D] mb-8">5 Best Renovation Loan Options for Brandon, MS Homeowners</h2>

        <div className="space-y-8">
          {loanOptions.map((loan, i) => {
            const Icon = loan.icon;
            return (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sky-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-sky-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1E2D3D] mb-2">{loan.name}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">{loan.description}</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-4">
                      {loan.pros.map((pro) => (
                        <li key={pro} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" /> {pro}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-amber-800">
                      <strong>Best for:</strong> {loan.bestFor}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-bold text-[#1E2D3D] mb-4">How Much Do Home Renovations Cost in Brandon, MS?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {[
              { project: "Kitchen Remodel", range: "$25,000 – $80,000" },
              { project: "Bathroom Renovation", range: "$10,000 – $35,000" },
              { project: "Room Addition", range: "$50,000 – $150,000" },
              { project: "Custom Home Build", range: "$250,000+" },
              { project: "Outdoor Living / Patio", range: "$15,000 – $50,000" },
              { project: "Full Home Renovation", range: "$75,000 – $300,000+" },
            ].map((item) => (
              <div key={item.project} className="flex justify-between items-center border-b border-gray-100 pb-2">
                <span className="text-slate-600">{item.project}</span>
                <span className="font-semibold text-[#1E2D3D]">{item.range}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4">*Ranges based on typical Central Mississippi projects. Contact us for a free estimate specific to your home.</p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link to={createPageUrl("Services")} className="inline-flex items-center gap-1.5 bg-white border border-sky-200 text-sky-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-sky-50 transition-colors">
            <ChevronRight className="w-3.5 h-3.5" /> View Our Services
          </Link>
          <Link to={createPageUrl("QuoteAssistant")} className="inline-flex items-center gap-1.5 bg-white border border-sky-200 text-sky-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-sky-50 transition-colors">
            <ChevronRight className="w-3.5 h-3.5" /> Get a Free Estimate
          </Link>
          <Link to={createPageUrl("ProTips")} className="inline-flex items-center gap-1.5 bg-white border border-sky-200 text-sky-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-sky-50 transition-colors">
            <ChevronRight className="w-3.5 h-3.5" /> Pro Remodeling Tips
          </Link>
        </div>
      </div>

      <div className="bg-[#1E2D3D] py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Start Your Renovation?</h2>
          <p className="text-slate-300 mb-8">Get a free project estimate from Bradley Brown Inc. and know exactly what to budget before you apply for financing.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("QuoteAssistant")} className="inline-flex items-center justify-center gap-2 bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors">
              Get Free Estimate <ChevronRight className="w-4 h-4" />
            </Link>
            <a href="tel:+16019541306" className="inline-flex items-center justify-center gap-2 border border-slate-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              <Phone className="w-4 h-4" /> Call (601) 954-1306
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}