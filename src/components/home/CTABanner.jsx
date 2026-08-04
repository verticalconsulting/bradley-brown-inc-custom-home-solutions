import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Phone, ChevronRight, Sparkles } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-16 md:py-24 from-[#C4922A] to-[#A37820] bg-[hsl(var(--popover-foreground))]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-sky-200" />
          <span className="text-sky-100 text-sm font-medium">AI-Powered Estimates in Minutes</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Build Your Dream Home?
        </h2>
        <p className="text-slate-100 mb-10 mx-auto text-lg max-w-xl">Tell us about your project and get a personalized cost estimate in seconds — free, no obligation.

        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/estimate" className="bg-gray-200 text-[#0752df] px-8 py-4 text-lg font-bold rounded-3xl inline-flex items-center justify-center gap-2 hover:bg-amber-50 transition-colors shadow-lg">

            Get My Free Estimate <Sparkles className="w-5 h-5" /> <ChevronRight className="w-5 h-5" />
          </Link>
          <a
            href="tel:+18443514154" className="text-white px-8 py-4 text-lg font-bold rounded-2xl inline-flex items-center justify-center gap-2 border-2 border-white hover:bg-white/10 transition-colors">
            <Phone className="w-5 h-5" /> Call (844) 351-4154
          </a>
        </div>
      </div>
    </section>);

}