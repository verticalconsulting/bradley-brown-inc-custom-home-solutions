import React from "react";
import {
  ShieldCheck,
  Clock,
  PhoneCall,
  Award,
  Wrench,
} from "lucide-react";

const BADGES = [
  { icon: ShieldCheck, label: "5-Year Workmanship Warranty" },
  { icon: Wrench, label: "Manufacturer Warranties Passed Through" },
  { icon: PhoneCall, label: "Single Point of Contact" },
  { icon: Clock, label: "48-Hour Response SLA" },
  { icon: Award, label: "Licensed & Insured Since 1995" },
];

export default function WorkmanshipGuarantee() {
  return (
    <div className="bg-[#1E2D3D] rounded-2xl p-6 md:p-8">
      <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
        Our Workmanship Guarantee
      </h3>
      <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 max-w-3xl">
        We back all labor with a{" "}
        <span className="font-semibold text-amber-300">
          5-year workmanship warranty
        </span>{" "}
        — one of the strongest in the Brandon and Rankin County area. All
        material and manufacturer warranties are passed through to you in full,
        with documentation provided at project closeout. If any post-completion
        issue arises, you have a single point of contact — your project manager
        — who will respond within 48 hours and coordinate the fix at no cost to
        you. That&rsquo;s the standard that comes with three decades of building
        in this community.
      </p>
      <div className="flex flex-wrap gap-3">
        {BADGES.map((b, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3.5 py-2"
          >
            <b.icon className="w-4 h-4 text-amber-300" />
            <span className="text-white text-xs font-medium">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}