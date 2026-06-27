import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import StepIndicator from "@/components/quote/StepIndicator";
import ProjectTypeStep from "@/components/quote/ProjectTypeStep";
import ProjectDetailsStep from "@/components/quote/ProjectDetailsStep";
import DesignInspirationStep from "@/components/quote/DesignInspirationStep";
import ContactStep from "@/components/quote/ContactStep";
import EstimateResult from "@/components/quote/EstimateResult";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const STEPS = ["Project Type", "Details", "Design Inspiration", "Your Info", "Estimate"];
const RESULT_STEP = 4;

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
  design_photo: null,
  inspiration_images: [],
  design_style_prompt: "",
  style_preset: "",
  generate_design_concept: false,
};

export default function QuoteAssistant() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initialData);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [designConcept, setDesignConcept] = useState(null);
  const [designLoading, setDesignLoading] = useState(false);
  const [designError, setDesignError] = useState("");

  const canProceed = () => {
    if (step === 0) return !!data.project_type;
    if (step === 1) return !!data.location && !!data.description;
    if (step === 2) return true; // Design Inspiration is optional
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
    setStep(RESULT_STEP);
    setLoading(true);
    setError("");
    setDesignError("");
    setDesignConcept(null);

    try {
      base44.analytics.track({
        eventName: "quote_request_submitted",
        properties: {
          project_type: data.project_type,
          location: data.location,
          budget_range: data.budget_range || null,
          has_phone: !!data.phone,
          requested_design_concept: !!data.generate_design_concept,
        },
      });

      const [record] = await Promise.all([
        base44.entities.QuoteRequest.create({
          name: data.name,
          email: data.email,
          phone: data.phone || undefined,
          project_type: data.project_type,
          location: data.location,
          square_footage_estimate: data.square_footage_estimate || undefined,
          budget_range: data.budget_range || undefined,
          timeline: data.timeline || undefined,
          description: data.description,
          features_selected: data.features_selected,
          status: "new",
          design_photo_url: data.design_photo || undefined,
          inspiration_image_urls: data.inspiration_images?.length ? data.inspiration_images : undefined,
          design_style_prompt: data.design_style_prompt || undefined,
          style_preset: data.style_preset || undefined,
        }),
        fetch("https://formspree.io/f/xeeranrd", {
          method: "POST",
          headers: { "Accept": "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
            project_type: data.project_type,
            location: data.location,
            budget_range: data.budget_range || "",
            timeline: data.timeline || "",
            description: data.description,
            features_selected: (data.features_selected || []).join(", "),
            design_concept_requested: data.generate_design_concept ? "yes" : "no",
            design_style_prompt: data.design_style_prompt || "",
            style_preset: data.style_preset || "",
          }),
        }),
      ]);

      const quoteResponse = await base44.functions.invoke("generateQuoteEstimate", {
        project_type: data.project_type,
        location: data.location,
        square_footage_estimate: data.square_footage_estimate || undefined,
        budget_range: data.budget_range || undefined,
        timeline: data.timeline || undefined,
        description: data.description,
        features_selected: [],
      });

      const result = quoteResponse?.data;

      if (!result?.success || !result?.analysis) {
        throw new Error(result?.error || "Unable to generate estimate.");
      }

      setAnalysis(result.analysis);

      if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          send_to: 'AW-17864041271/aquote_form',
          value: 75,
          currency: 'USD'
        });
      }

      // Kick off design concept generation independently — never block the estimate.
      let designResult = null;
      if (data.generate_design_concept && data.design_photo) {
        setDesignLoading(true);
        try {
          const designResponse = await base44.functions.invoke("generateRemodelConcept", {
            project_type: data.project_type,
            location: data.location,
            description: data.description,
            design_photo: data.design_photo,
            inspiration_images: data.inspiration_images,
            design_style_prompt: data.design_style_prompt,
            style_preset: data.style_preset,
          });
          designResult = designResponse?.data;

          if (designResult?.success) {
            setDesignConcept(designResult);
          } else {
            setDesignError(designResult?.error || "Design concept could not be created.");
          }
        } catch (designErr) {
          console.error("Design concept generation failed:", designErr);
          setDesignError("Design concept could not be created.");
        } finally {
          setDesignLoading(false);
        }
      }

      if (record?.id) {
        await base44.entities.QuoteRequest.update(record.id, {
          ai_analysis: result.analysis,
          ai_estimate: result.analysis.estimate_range,
          ai_midpoint: result.analysis.likely_midpoint || null,
          ai_finish_tier: result.analysis.finish_tier || null,
          ai_timeline: result.analysis.timeline || null,
          ai_confidence: result.analysis.confidence || null,
          design_concept_image_urls: designResult?.image_urls?.length ? designResult.image_urls : undefined,
          design_concept_prompt: designResult?.prompt_used || undefined,
        });
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong generating your estimate.");
    } finally {
      setLoading(false);
    }
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
            <DesignInspirationStep data={data} onChange={updated => setData(d => ({ ...d, ...updated }))} />
          )}
          {step === 3 && (
            <ContactStep data={data} onChange={updated => setData(d => ({ ...d, ...updated }))} />
          )}
          {step === RESULT_STEP && (
            <>
              <EstimateResult
                analysis={analysis}
                loading={loading}
                error={error}
                contactName={data.name}
                designConcept={designConcept}
                designLoading={designLoading}
                designError={designError}
                inspirationImages={data.inspiration_images}
                designRequested={data.generate_design_concept}
              />
              {error && (
                <p className="text-red-500 text-sm text-center mt-4">{error}</p>
              )}
            </>
          )}

          {step < RESULT_STEP && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={() => setStep(s => s - 1)}
                disabled={step === 0}
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#1E2D3D] disabled:opacity-0 disabled:pointer-events-none transition-colors font-medium"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <div className="flex items-center gap-2">
                {step === 2 && !data.generate_design_concept && (
                  <span className="text-xs text-slate-400 hidden sm:inline">Optional step</span>
                )}
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