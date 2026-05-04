import React from "react";
import SEOHead from "@/components/SEOHead";
import JobCheckinForm from "@/components/jobcheckin/JobCheckinForm";
import { HardHat } from "lucide-react";

export default function JobCheckin() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      <SEOHead
        title="Crew Jobsite Check-In — Bradley Brown Inc."
        description="Internal check-in form for Bradley Brown Inc. crew."
        noIndex={true}
      />
      <div className="bg-[#1E2D3D] py-8">
        <div className="max-w-xl mx-auto px-4 text-center">
          <HardHat className="w-8 h-8 text-sky-300 mx-auto mb-2" />
          <h1 className="text-2xl font-bold text-white">Jobsite Check-In</h1>
          <p className="text-slate-300 text-sm mt-1">Crew use only. Sends to admin for review before publishing.</p>
        </div>
      </div>
      <div className="max-w-xl mx-auto px-4 py-8">
        <JobCheckinForm />
      </div>
    </div>
  );
}