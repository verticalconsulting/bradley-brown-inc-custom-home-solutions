import React from "react";
import { useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import LeadCaptureForm from "@/components/LeadCaptureForm";

export default function Quote() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      <SEOHead
        title="Get a Free Quote — Bradley Brown Inc."
        description="Request a free home remodeling quote from Bradley Brown Inc. Serving Brandon, MS and Central Mississippi."
        canonical="https://bradleybrowninc.com/quote"
      />

      <div className="bg-[#1E2D3D] py-10 md:py-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-white">
            Get Your Free Estimate
          </h1>
          <p className="text-slate-300 mt-2 text-sm md:text-base">
            Tell us about your project and we'll get back to you within 24 hours.
          </p>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="bg-white rounded-2xl shadow-md border border-[#E2D9CC] p-6 md:p-8">
          <LeadCaptureForm source="Quote Page" onSuccess={() => navigate("/thank-you")} />
        </div>
      </div>
    </div>
  );
}