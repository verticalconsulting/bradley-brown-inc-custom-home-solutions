import React from "react";
import { Shield, CheckCircle, Calendar, Award } from "lucide-react";

const BBB_URL = "https://www.bbb.org/us/ms/brandon/profile/remodeling/bradley-brown-inc-0523-235908473";

export default function ContactTrustBar() {
  return (
    <section className="bg-[#F5F5F5] py-6" aria-label="Our credentials and certifications">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-stretch justify-center gap-3 md:gap-4">
          {/* License */}
          <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100 flex-1 min-w-[200px]">
            <div className="w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Licensed</p>
              <p className="text-sm font-bold text-[#1E2D3D] leading-tight">MS Contractor License #08290</p>
            </div>
          </div>

          {/* Insured */}
          <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100 flex-1 min-w-[200px]">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Insured</p>
              <p className="text-sm font-bold text-[#1E2D3D] leading-tight">Fully Insured — GL &amp; Workers Comp</p>
            </div>
          </div>

          {/* Experience */}
          <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100 flex-1 min-w-[200px]">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Established</p>
              <p className="text-sm font-bold text-[#1E2D3D] leading-tight">Since 1995 — 29 Years Experience</p>
            </div>
          </div>

          {/* BBB Accredited — clickable */}
          <a
            href={BBB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100 flex-1 min-w-[200px] hover:border-sky-300 hover:shadow-md transition-all group"
            aria-label="BBB Accredited Business — view profile"
          >
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Accredited</p>
              <p className="text-sm font-bold text-[#1E2D3D] leading-tight group-hover:text-sky-600 transition-colors">
                BBB Accredited Business
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}