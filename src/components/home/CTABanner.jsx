import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Phone, ChevronRight, Sparkles } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#C4922A] to-[#A37820]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-amber-200" />
          <span className="text-amber-100 text-sm font-medium">AI-Powered Estimates in Minutes</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Build Your Dream Home?
        </h2>
        <p className="text-amber-100 text-lg mb-10 max-w-xl mx-auto">
          Tell us about your project and our AI will generate a personalized cost estimate in seconds.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to={createPageUrl("QuoteAssistant")}
            className="inline-flex items-center justify-center gap-2 bg-white text-[#C4922A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-50 transition-colors shadow-lg"
          >
            Start Your Free Quote <ChevronRight className="w-5 h-5" />
          </Link>
          <a
            href="tel:+16012345678"
            className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors"
          >
            <Phone className="w-5 h-5" /> Call Us Now
          </a>
        </div>
      </div>
    </section>
  );
}