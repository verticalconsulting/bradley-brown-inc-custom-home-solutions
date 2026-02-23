import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import StepIndicator from "@/components/quote/StepIndicator";
import ProjectTypeStep from "@/components/quote/ProjectTypeStep";
import ProjectDetailsStep from "@/components/quote/ProjectDetailsStep";
import FeaturesStep from "@/components/quote/FeaturesStep";
import ContactStep from "@/components/quote/ContactStep";
import EstimateResult from "@/components/quote/EstimateResult";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const STEPS = ["Project Type", "Details", "Features", "Your Info", "Estimate"];

const initialData = {
  project_type: "",
  location: "",
  square_footage_estimate: "",
  budget_range: "",
  timeline: "",
  description: "",
  features_selected: [],
  name: "",
  email: "",
  phone: "",
};

export default function QuoteAssistant() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initialData);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const canProceed = () => {
    if (step === 0) return !!data.project_type;
    if (step === 1) return !!data.location && !!data.description;
    if (step === 2) return true;
    if (step === 3) return !!data.name && !!data.email;
    return true;
  };

  const handleNext = async () => {
    if (step === 3) {
      await submitAndGenerate();
    } else {
      setStep(s => s + 1);
    }
  };

  const submitAndGenerate = async () => {
    setStep(4);
    setLoading(true);

    const record = await base44.entities.QuoteRequest.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      project_type: data.project_type,
      location: data.location,
      square_footage_estimate: data.square_footage_estimate || undefined,
      budget_range: data.budget_range || undefined,
      timeline: data.timeline || undefined,
      description: data.description,
      features_selected: data.features_selected,
      status: "new",
    });

    const response = await base44.functions.invoke("generateQuoteEstimate", {
      project_type: data.project_type,
      location: data.location,
      square_footage_estimate: data.square_footage_estimate,
      budget_range: data.budget_range,
      timeline: data.timeline,
      description: data.description,
      features_selected: data.features_selected,
    });

    const result = response.data;
    if (result?.analysis) {
      setAnalysis(result.analysis);
      if (record?.id) {
        await base44.entities.QuoteRequest.update(record.id, {
          ai_analysis: result.analysis,
          ai_estimate: result.analysis.estimate_range,
        });
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      <div className="bg-[#1E2D3D] py-10 md:py-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#C4922A]/20 border border-[#C4922A]/40 rounded-full px-3 py-1 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C4922A]" />
            <span className="text-[#F5D78E] text-xs font-medium">AI-Powered Estimation</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white">Get Your Free Project Estimate</h1>
          <p className="text-slate-300 mt-2 text-sm md:text-base">Answer a few quick questions and our AI will generate a personalized cost estimate in seconds.</p>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <StepIndicator steps={STEPS} currentStep={step} />

        <div className="bg-white rounded-2xl shadow-md border border-[#E2D9CC] p-6 md:p-8">
          {step === 0 && (
            <ProjectTypeStep value={data.project_type} onChange={val => setData(d => ({ ...d, project_type: val }))} />
          )}
          {step === 1 && (
            <ProjectDetailsStep data={data} onChange={updated => setData(d => ({ ...d, ...updated }))} />
          )}
          {step === 2 && (
            <FeaturesStep
              projectType={data.project_type}
              selected={data.features_selected}
              onChange={val => setData(d => ({ ...d, features_selected: val }))}
            />
          )}
          {step === 3 && (
            <ContactStep data={data} onChange={updated => setData(d => ({ ...d, ...updated }))} />
          )}
          {step === 4 && (
            <EstimateResult analysis={analysis} loading={loading} contactName={data.name} />
          )}

          {step < 4 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={() => setStep(s => s - 1)}
                disabled={step === 0}
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#1E2D3D] disabled:opacity-0 disabled:pointer-events-none transition-colors font-medium"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center gap-2 bg-[#C4922A] hover:bg-[#A37820] text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {step === 3 ? (
                  <><Sparkles className="w-4 h-4" /> Generate My Estimate</>
                ) : (
                  <>Next <ChevronRight className="w-4 h-4" /></>
                )}
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-slate-400 text-xs mt-4">
          Your information is kept private and only used to prepare your estimate.
        </p>
      </div>
    </div>
  );
}