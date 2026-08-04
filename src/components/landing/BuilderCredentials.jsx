import React from "react";
import { ShieldCheck, Award, Calendar } from "lucide-react";

const credentials = [
  {
    label: "MS Residential Builders Commission",
    value: "Licensed · #BR-______",
    href: "https://www.msboc.us",
  },
  {
    label: "Years of Experience",
    value: "Building custom homes since 1995 — 29+ years",
  },
];

const associations = [
  {
    name: "NAHB",
    img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c758479c46f0580553750/532a0ecba_nahb.png",
    url: "https://www.nahb.org",
  },
  {
    name: "Home Builders Association of MS",
    img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c758479c46f0580553750/103c2c527_mshba.png",
    url: "https://www.mshba.com",
  },
  {
    name: "Better Business Bureau",
    img: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c758479c46f0580553750/f47b53e12_bbb.png",
    url: "https://www.bbb.org",
  },
];

const bio =
  "Bradley Brown founded Bradley Brown Inc. in 1995 and has personally overseen the design and construction of more than 200 custom homes across Rankin County and Central Mississippi. A lifelong Brandon resident, Bradley holds a Mississippi Residential Builders license and is an active member of the Home Builders Association of Mississippi and the National Association of Home Builders. He is involved in every project from the first consultation through the final walkthrough.";

export default function BuilderCredentials() {
  return (
    <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-[#1E2D3D] mb-5">Licensed Custom Home Builder in Brandon, MS — Our Credentials</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">Mississippi License</p>
            <p className="text-sm font-medium text-[#1E2D3D]">
              MS Residential Builders Commission —{" "}
              <a href="https://www.msboc.us" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">
                Licensed &amp; Insured
              </a>
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">Experience</p>
            <p className="text-sm font-medium text-[#1E2D3D]">Building custom homes since 1995 — 29+ years</p>
          </div>
        </div>
      </div>

      {/* Lead builder bio */}
      <div className="flex items-start gap-3 mb-6">
        <Award className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold mb-1">Principal Builder</p>
          <h3 className="text-base font-bold text-[#1E2D3D] mb-1">Bradley Brown</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{bio}</p>
        </div>
      </div>

      {/* Association badges */}
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold mb-3">Trade Association Memberships</p>
        <div className="flex flex-wrap items-center gap-4">
          {associations.map((a) => (
            <a
              key={a.name}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              title={a.name}
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              <img src={a.img} alt={a.name} className="h-10 w-auto object-contain" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}