import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { CheckCircle, Phone, ChevronRight, Loader2, TrendingUp, Clock, Lightbulb } from "lucide-react";

export default function EstimateResult({ analysis, loading, contactName }) {
  if (loading) {
    return (
      <div className="text-center py-16">
        <Loader2 className="w-12 h-12 text-[#C4922A] mx-auto mb-4 animate-spin" />
        <h3 className="text-xl font-bold text-[#1E2D3D] mb-2">Analyzing Your Project…</h3>
        <p className="text-slate-500">Our AI is reviewing your details to generate a personalized estimate.</p>
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <div>
      <div className="text-center mb-8">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-[#1E2D3D]">Your Estimate is Ready{contactName ? `, ${contactName.split(" ")[0]}` : ""}!</h2>
        <p className="text-slate-500 mt-1">Based on your project details and local Central Mississippi market rates.</p>
      </div>

      <div className="bg-gradient-to-br from-[#1E2D3D] to-[#2C3E50] rounded-xl p-6 mb-6 text-center text-white">
        <p className="text-slate-300 text-sm uppercase tracking-wider mb-1">Estimated Project Cost</p>
        <div className="text-3xl md:text-4xl font-bold text-[#C4922A]">{analysis.estimate_range || "$—"}</div>
        <p className="text-slate-400 text-xs mt-2">* Estimates vary based on final design, materials & site conditions</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {analysis.timeline && (
          <div className="bg-white border border-[#E2D9CC] rounded-lg p-4 text-center">
            <Clock className="w-5 h-5 text-[#C4922A] mx-auto mb-1" />
            <p className="text-xs text-slate-400 uppercase tracking-wide">Est. Timeline</p>
            <p className="font-bold text-[#1E2D3D] text-sm mt-0.5">{analysis.timeline}</p>
          </div>
        )}
        {analysis.complexity && (
          <div className="bg-white border border-[#E2D9CC] rounded-lg p-4 text-center">
            <TrendingUp className="w-5 h-5 text-[#C4922A] mx-auto mb-1" />
            <p className="text-xs text-slate-400 uppercase tracking-wide">Complexity</p>
            <p className="font-bold text-[#1E2D3D] text-sm mt-0.5">{analysis.complexity}</p>
          </div>
        )}
        {analysis.confidence && (
          <div className="bg-white border border-[#E2D9CC] rounded-lg p-4 text-center">
            <Lightbulb className="w-5 h-5 text-[#C4922A] mx-auto mb-1" />
            <p className="text-xs text-slate-400 uppercase tracking-wide">Estimate Confidence</p>
            <p className="font-bold text-[#1E2D3D] text-sm mt-0.5">{analysis.confidence}</p>
          </div>
        )}
      </div>

      {analysis.key_factors?.length > 0 && (
        <div className="bg-amber-50 border border-[#C4922A]/20 rounded-lg p-5 mb-6">
          <h4 className="font-bold text-[#1E2D3D] mb-3">Key Cost Factors for Your Project</h4>
          <ul className="space-y-1.5">
            {analysis.key_factors.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="text-[#C4922A] font-bold mt-0.5">·</span> {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {analysis.recommendations?.length > 0 && (
        <div className="bg-white border border-[#E2D9CC] rounded-lg p-5 mb-8">
          <h4 className="font-bold text-[#1E2D3D] mb-3">Recommendations From Our AI</h4>
          <ul className="space-y-1.5">
            {analysis.recommendations.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="text-[#C4922A] font-bold mt-0.5">·</span> {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <a href="tel:+18443514154" className="flex-1 inline-flex items-center justify-center gap-2 bg-[#C4922A] text-white px-5 py-3 rounded-lg font-semibold hover:bg-[#A37820] transition-colors">
          <Phone className="w-4 h-4" /> Call to Discuss
        </a>
        <Link to={createPageUrl("Contact")} className="flex-1 inline-flex items-center justify-center gap-2 border border-[#1E2D3D] text-[#1E2D3D] px-5 py-3 rounded-lg font-semibold hover:bg-[#1E2D3D] hover:text-white transition-colors">
          Schedule Consultation <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}