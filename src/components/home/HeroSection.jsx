import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ChevronRight, Play, Sparkles, Phone } from "lucide-react";

const slides = [
{
  image: "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/932d74d8-4f05-4b52-fa85-6903e1e42b00/herocover",
  headline: "Building Your",
  highlight: "Dream Home Kitchen"
},
{
  image: "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/b3a782a9-ca3b-4d50-622d-0992951eca00/hiresthumb",
  headline: "Man Caves &",
  highlight: "Barndominiums"
}];


export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setFading(false);
      }, 600);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background images */}
      {slides.map((s, i) =>
      <div
        key={i}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
        style={{
          backgroundImage: `url('${s.image}')`,
          opacity: i === current ? 1 : 0
        }} />

      )}

      <div className="absolute inset-0 bg-gradient-to-b from-[#1E2D3D]/75 via-[#1E2D3D]/55 to-[#1E2D3D]/85" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
        <div className="bg-slate-700 mb-6 px-4 py-1.5 rounded-full inline-flex items-center gap-2 border border-sky-400/40">
          <span className="bg-sky-400 rounded-full w-2 h-2" />
          <span className="text-sky-400 text-sm font-medium">Bra Premier Builder Since 1995 Brandon Mississippi'</span>
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 transition-opacity duration-500"
          style={{ opacity: fading ? 0 : 1 }}>
          
          {slide.headline}
          <span className="text-sky-400 block">{slide.highlight}</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed">
          Custom home construction, renovations, and additions crafted with integrity, precision, and 30+ years of Mississippi expertise.
        </p>

        {/* Mobile: stacked prominent CTAs */}
        <div className="flex flex-col gap-3 sm:hidden w-full max-w-xs mx-auto">
          <Link
            to={createPageUrl("QuoteAssistant")}
            className="text-white px-6 py-4 text-base font-bold rounded-xl inline-flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all bg-[#a5a29c]">
            <Sparkles className="w-5 h-5" /> Get My Free AI Estimate
          </Link>
          <a href="tel:+18443514154" className="text-white px-6 py-4 text-base font-bold rounded-xl inline-flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all bg-sky-400">Call (844) 351-4154

          </a>
          <Link
            to={createPageUrl("Portfolio")}
            className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all">
            <Play className="w-4 h-4" /> View Our Work
          </Link>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden sm:flex flex-row gap-4 justify-center">
          <Link
            to={createPageUrl("QuoteAssistant")} className="hover:bg-[#A37820] text-white px-8 py-4 text-lg font-semibold rounded-xl inline-flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-lg bg-teal-500">
            <Sparkles className="w-5 h-5" /> Get a Free Estimate
          </Link>
          <Link
            to={createPageUrl("Portfolio")}
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all">
            <Play className="w-5 h-5" /> View Our Work
          </Link>
        </div>

        {/* Slide dots */}
        <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Slides">
          {slides.map((s, i) =>
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}: ${s.headline} ${s.highlight}`}
            onClick={() => {setFading(true);setTimeout(() => {setCurrent(i);setFading(false);}, 600);}}
            className={`min-w-[44px] min-h-[44px] flex items-center justify-center -m-2 p-2`}>
            
              <span className={`block rounded-full transition-all duration-300 ${i === current ? "bg-sky-400 w-6 h-2.5" : "bg-white/40 w-2.5 h-2.5"}`} />
            </button>
          )}
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-white/60 rounded-full" />
          </div>
        </div>
      </div>
    </section>);

}