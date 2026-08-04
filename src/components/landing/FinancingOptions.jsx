import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ChevronRight, Landmark, Home, Wallet, AlertCircle } from "lucide-react";

const options = [
  {
    icon: Landmark,
    title: "Home Equity Loans & HELOCs",
    body: "For projects over $25,000, a home equity loan or HELOC is one of the most common paths Brandon-area homeowners take. If you've built up equity, you can often access sub-8% rates and spread payments over 10–20 years. Interest may be tax-deductible if the funds are used for home improvements — check with your tax advisor.",
  },
  {
    icon: Home,
    title: "FHA 203(k) Renovation Loans",
    body: "The FHA 203(k) program lets buyers or current owners fold the full cost of a renovation into a single mortgage — ideal when a home needs significant work before move-in. We can coordinate with your lender to ensure construction milestones align with the 203(k) draw schedule.",
  },
  {
    icon: Wallet,
    title: "Personal / Contractor Financing",
    body: "For smaller projects or homeowners who prefer not to tap equity, Bradley Brown can discuss flexible payment schedules tied to construction milestones. We'll also connect you with our financing partners to explore personal loan options that fit your timeline and budget.",
  },
  {
    icon: AlertCircle,
    title: "What to Budget Beyond the Build",
    body: "We recommend setting aside a 10–15% contingency for unforeseen issues like subfloor repairs or electrical upgrades discovered during demolition. Permit fees in Rankin County typically run $500–$2,500 depending on project scope, and we handle all applications and inspections as part of your project.",
  },
];

export default function FinancingOptions() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1E2D3D] mb-2">Financing Your Remodel in Brandon, MS</h2>
      <p className="text-slate-500 text-sm mb-8">
        A great remodel starts with the right plan to pay for it. Here are the most common financing paths our Brandon and Rankin County clients use.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {options.map((opt) => {
          const Icon = opt.icon;
          return (
            <div key={opt.title} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 bg-sky-50 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-sky-600" />
                </div>
                <h3 className="font-bold text-[#1E2D3D] text-base">{opt.title}</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">{opt.body}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Link
          to={createPageUrl("RenovationLoans")}
          className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Compare Renovation Loans <ChevronRight className="w-4 h-4" />
        </Link>
        <Link
          to={createPageUrl("QuoteAssistant")}
          className="inline-flex items-center gap-2 border border-sky-200 text-sky-700 px-6 py-3 rounded-lg font-semibold hover:bg-sky-50 transition-colors"
        >
          Get a Free Estimate <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}