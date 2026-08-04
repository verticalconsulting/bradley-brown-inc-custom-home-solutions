import React from "react";
import { Award, Calendar, User } from "lucide-react";

const associations = [
  { name: "MS Board of Contractors", url: "https://www.msboc.us" },
  { name: "Home Builders Association of MS", url: "https://www.mshba.com" },
  { name: "NAHB", url: "https://www.nahb.org" },
  { name: "Better Business Bureau", url: "https://www.bbb.org" },
];

export default function BrandonCredentials() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-[#1E2D3D] mb-6">Licensed Custom Home Builder in Brandon, MS — Our Credentials</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <div className="flex items-start gap-3">
          <Award className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">MS License</p>
            <p className="text-sm font-bold text-[#1E2D3D]">Residential Builder #08290</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Experience</p>
            <p className="text-sm font-bold text-[#1E2D3D]">Building custom homes since 1995 — 29+ years</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <User className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Lead Builder</p>
            <p className="text-sm font-bold text-[#1E2D3D]">Bradley Brown, Principal</p>
          </div>
        </div>
      </div>
      <p className="text-slate-600 leading-relaxed text-sm mb-6">
        Bradley Brown founded the company in 1995 and has personally overseen hundreds of custom home and renovation
        projects across Rankin County. As a licensed Mississippi Residential Builder, he manages every project from the
        first design meeting through final walkthrough. His hands-on approach means homeowners work directly with the
        builder — not a sales rep or project coordinator — throughout the entire construction process. That continuity
        is why families across Brandon trust Bradley Brown Inc. to deliver their custom home on time, on budget, and to
        a standard that stands up to Mississippi weather and decades of family living.
      </p>
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Trade Association Memberships</p>
        <div className="flex flex-wrap gap-3">
          {associations.map((a) => (
            <a
              key={a.name}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 rounded-lg px-3 py-2 text-xs font-semibold text-sky-700 hover:bg-sky-100 transition-colors"
            >
              <Award className="w-3.5 h-3.5" /> {a.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}