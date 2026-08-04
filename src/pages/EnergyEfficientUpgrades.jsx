import React from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ChevronRight, Phone, Zap, CheckCircle, DollarSign, Leaf, Wind, Sun, Thermometer, Home } from "lucide-react";
import ServiceStickyCTA from "@/components/ServiceStickyCTA";

const upgrades = [
  {
    icon: Thermometer,
    title: "High-Efficiency HVAC Systems",
    description: "Upgrading to a high-SEER HVAC system can cut cooling and heating costs by 20–40% — huge savings in Mississippi's hot summers.",
    annualSavings: "$400 – $900/year",
    upfrontCost: "$5,000 – $12,000",
    taxCredit: "Up to 30% federal tax credit",
    tips: ["Look for SEER2 ratings of 16+", "Add a smart thermostat for extra savings", "Proper duct sealing maximizes efficiency"]
  },
  {
    icon: Wind,
    title: "Spray Foam Insulation",
    description: "The single highest-impact upgrade for Mississippi homes. Proper insulation keeps the cool air in during summer and dramatically reduces energy bills.",
    annualSavings: "$300 – $700/year",
    upfrontCost: "$2,500 – $7,500",
    taxCredit: "Up to 30% federal tax credit",
    tips: ["Attic insulation has highest ROI", "Spray foam outperforms fiberglass in humidity", "Reduces moisture intrusion too"]
  },
  {
    icon: Sun,
    title: "Energy-Efficient Windows & Doors",
    description: "Low-E double or triple-pane windows block heat gain while still letting in natural light — critical in the Brandon and Rankin County area's climate.",
    annualSavings: "$200 – $500/year",
    upfrontCost: "$8,000 – $20,000",
    taxCredit: "Up to $600 federal credit",
    tips: ["Look for ENERGY STAR certified windows", "Solar heat gain coefficient (SHGC) below 0.25 for MS", "Proper installation prevents air leaks"]
  },
  {
    icon: Zap,
    title: "LED Lighting Throughout the Home",
    description: "Swapping all fixtures to LED is one of the cheapest, fastest energy upgrades with immediate savings on every monthly bill.",
    annualSavings: "$150 – $400/year",
    upfrontCost: "$500 – $2,000",
    taxCredit: "N/A (included in renovation costs)",
    tips: ["Replace high-use fixtures first", "Use smart bulbs for automated scheduling", "Dimmable LEDs extend bulb life further"]
  },
  {
    icon: Home,
    title: "Tankless (On-Demand) Water Heaters",
    description: "Eliminate standby heat loss with a tankless water heater. They only heat water when needed — lasting 20+ years vs 10–12 for tank models.",
    annualSavings: "$100 – $300/year",
    upfrontCost: "$1,500 – $4,000",
    taxCredit: "Up to $600 federal credit",
    tips: ["Natural gas units typically more efficient", "Size correctly for your home's demand", "Pair with low-flow fixtures for more savings"]
  },
  {
    icon: Sun,
    title: "Solar Panels",
    description: "Mississippi has excellent solar potential. With the 30% federal tax credit, solar is more affordable than ever and can eliminate your electric bill.",
    annualSavings: "$800 – $1,500+/year",
    upfrontCost: "$18,000 – $35,000 (before credits)",
    taxCredit: "30% federal investment tax credit",
    tips: ["Pair with battery storage for backup power", "Net metering available in Mississippi", "Average payback period: 7–10 years"]
  }
];

const energySchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Energy-Efficient Home Upgrades in Brandon, MS — Save Money & Increase Value",
  "description": "Discover the best energy-efficient home upgrades for Brandon, MS homeowners. Compare costs, savings, and tax credits for HVAC, insulation, windows, solar and more.",
  "author": { "@type": "Organization", "name": "Bradley Brown Inc." },
  "publisher": { "@type": "Organization", "name": "Bradley Brown Inc.", "url": "https://bradleybrowninc.com" }
};

export default function EnergyEfficientUpgrades() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      <SEOHead
        title="Energy-Efficient Home Upgrades in Brandon, MS | Save on Bills"
        description="Top energy-efficient home upgrades for Brandon, MS homeowners — HVAC, insulation, windows, solar & more. Reduce bills, increase home value & claim federal tax credits."
        schema={energySchema}
        canonical="https://bradleybrowninc.com/energyefficientupgrades"
      />

      <div className="bg-[#1E2D3D] py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sky-400 font-semibold text-sm uppercase tracking-wider mb-2">Save Money & Increase Home Value</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white">Energy-Efficient Home Upgrades</h1>
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-base md:text-lg">
            The best energy upgrades for Brandon, MS homeowners — ranked by savings, cost, and ROI. Lower your bills and increase your home's value.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">

        {/* Intro */}
        <div className="prose prose-slate max-w-none mb-8">
          <p className="text-slate-600 leading-relaxed text-base">Mississippi's hot, humid summers make energy efficiency one of the smartest investments a Brandon homeowner can make. The right upgrades — from better insulation to high-efficiency HVAC systems — can cut your monthly utility bills by hundreds of dollars while also increasing your home's resale value. And thanks to the Inflation Reduction Act, many of these upgrades now qualify for federal tax credits of up to 30%.</p>
          <p className="text-slate-600 leading-relaxed">At Bradley Brown Inc., we incorporate energy-efficient building practices into every project we build or renovate. Below are the six best energy upgrades for Brandon and Rankin County area homeowners — ranked by annual savings, upfront cost, and available incentives. <a href="tel:+18443514154" className="text-sky-600 font-semibold">Call (844) 351-4154</a> to discuss which upgrades make the most sense for your home.</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-10">
          <div className="flex items-start gap-3">
            <Leaf className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-green-800 text-sm">
              <strong>Federal Tax Credits:</strong> The Inflation Reduction Act offers homeowners up to <strong>30% back</strong> on qualifying energy-efficient upgrades through 2032. We help you plan projects to maximize your eligible credits.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {upgrades.map((upgrade, i) => {
            const Icon = upgrade.icon;
            return (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-[#1E2D3D] mb-2">{upgrade.title}</h2>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">{upgrade.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                      <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                        <p className="text-xs text-green-600 font-semibold mb-0.5">Annual Savings</p>
                        <p className="text-sm font-bold text-green-800">{upgrade.annualSavings}</p>
                      </div>
                      <div className="bg-sky-50 border border-sky-100 rounded-lg p-3">
                        <p className="text-xs text-sky-600 font-semibold mb-0.5">Upfront Cost</p>
                        <p className="text-sm font-bold text-sky-800">{upgrade.upfrontCost}</p>
                      </div>
                      <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                        <p className="text-xs text-amber-600 font-semibold mb-0.5">Tax Credit</p>
                        <p className="text-sm font-bold text-amber-800">{upgrade.taxCredit}</p>
                      </div>
                    </div>

                    <ul className="space-y-1.5">
                      {upgrade.tips.map((tip) => (
                        <li key={tip} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle className="w-4 h-4 text-sky-500 flex-shrink-0" /> {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-[#1E2D3D] mb-6">Frequently Asked Questions — Energy Upgrades in Brandon, MS</h2>
          <div className="space-y-4">
            {[
              { q: "Which energy upgrade has the best ROI for Mississippi homes?", a: "Attic insulation and HVAC upgrades consistently offer the highest ROI in the Brandon and Rankin County area due to the extreme summer heat. Proper attic insulation can pay for itself in 3–5 years through energy savings alone." },
              { q: "Can I claim federal tax credits for energy upgrades in 2025?", a: "Yes. The Inflation Reduction Act (IRA) offers a 30% federal tax credit on qualifying upgrades including HVAC systems, insulation, windows, doors, and solar panels through 2032. Consult your CPA for eligibility details." },
              { q: "Does Bradley Brown Inc. handle energy-efficient upgrades?", a: "Yes. We incorporate spray foam insulation, energy-efficient windows, high-efficiency HVAC prep work, and air sealing into our renovation and new construction projects. We can advise on the upgrades that make the most sense for your home and budget." },
              { q: "Is solar worth it in Mississippi?", a: "Mississippi has strong solar potential due to high sun hours. With the 30% federal tax credit, the typical payback period is 7–10 years. Net metering is available through most Mississippi utilities, allowing you to sell excess power back to the grid." },
              { q: "What's the fastest energy upgrade I can make?", a: "LED lighting throughout the home is the fastest and cheapest upgrade — it can be completed in a day and delivers immediate savings on every electric bill, with bulbs lasting 15–25 years." },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <h3 className="font-semibold text-[#1E2D3D] text-sm mb-2">{item.q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {[
            { label: "View All Services", page: "Services" },
            { label: "Get a Free Estimate", page: "QuoteAssistant" },
            { label: "Home Addition Ideas", page: "HomeAdditionIdeas" },
            { label: "Small Bathroom Ideas", page: "SmallBathroomIdeas" },
            { label: "Renovation Loans", page: "RenovationLoans" },
            { label: "Schedule a Site Visit", page: "ScheduleVisit" },
            { label: "Portfolio", page: "Portfolio" },
            { label: "Contact Us", page: "Contact" },
          ].map((link) => (
            <Link key={link.page} to={createPageUrl(link.page)} className="inline-flex items-center gap-1.5 bg-white border border-sky-200 text-sky-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-sky-50 transition-colors">
              <ChevronRight className="w-3.5 h-3.5" /> {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-[#1E2D3D] py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Make Your Home More Efficient?</h2>
          <p className="text-slate-300 mb-8">Bradley Brown Inc. incorporates energy-efficient building practices into every project. Call us to discuss your upgrade goals.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={"/estimate"} className="inline-flex items-center justify-center gap-2 bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors">
              Get Free Estimate <ChevronRight className="w-4 h-4" />
            </Link>
            <a href="tel:+18443514154" className="inline-flex items-center justify-center gap-2 border border-slate-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              <Phone className="w-4 h-4" /> Call (844) 351-4154
            </a>
          </div>
        </div>
      </div>
      <ServiceStickyCTA source="energy_upgrades_page" label="Get a Free Quote" />
    </div>
  );
}