import React, { useState } from "react";
import SEOHead from "@/components/SEOHead";
import PlannerQuestionnaire from "@/components/planner/PlannerQuestionnaire";
import PlannerResults from "@/components/planner/PlannerResults";
import { computeResults } from "@/lib/plannerLogic";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import { Sparkles, Clock, ShieldCheck, FileText } from "lucide-react";

export default function RenovationPlanner() {
  const [answers, setAnswers] = useState(null);
  const [results, setResults] = useState(null);

  const handleComplete = (allAnswers) => {
    setAnswers(allAnswers);
    setResults(computeResults(allAnswers));
    base44.analytics.track({
      eventName: "renovation_planner_completed",
      properties: { project_type: allAnswers.project_type },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRestart = () => {
    setAnswers(null);
    setResults(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      <SEOHead
        title="Renovation Planner — Timeline, Disruption Score & Checklist"
        description="Free interactive renovation planner. Answer lifestyle and project questions to get a personalized timeline, disruption score, and preparation checklist. Export to PDF or attach to a quote."
        canonical="https://bradleybrowninc.com/renovation-planner"
        keywords={["renovation planner", "remodel timeline calculator", "disruption score", "preparation checklist"]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is the renovation planner?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The renovation planner is a free interactive tool that asks about your lifestyle and project scope, then generates a personalized timeline, disruption score, and preparation checklist you can export to PDF or attach to a quote request.",
              },
            },
          ],
        }}
      />

      {/* Hero */}
      <div className="bg-[#1E2D3D] py-10 md:py-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#C4922A]/20 border border-[#C4922A]/40 rounded-full px-3 py-1 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C4922A]" />
            <span className="text-[#F5D78E] text-xs font-medium">Free · Personalized · No Obligation</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white">Renovation Planner</h1>
          <p className="text-slate-300 mt-2 text-sm md:text-base">
            Answer a few quick questions about your lifestyle and project scope. We'll generate a personalized timeline, disruption score, and preparation checklist.
          </p>
        </div>
      </div>

      {/* Planner card */}
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="bg-white rounded-2xl shadow-md border border-[#E2D9CC] p-6 md:p-8">
          {results && answers ? (
            <PlannerResults results={results} answers={answers} onRestart={handleRestart} />
          ) : (
            <PlannerQuestionnaire onComplete={handleComplete} />
          )}
        </div>

        {/* Trust badges */}
        {!results && (
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="text-center">
              <Clock className="w-5 h-5 text-[#C4922A] mx-auto mb-1" />
              <p className="text-xs text-slate-500 font-medium">Personalized Timeline</p>
            </div>
            <div className="text-center">
              <ShieldCheck className="w-5 h-5 text-[#C4922A] mx-auto mb-1" />
              <p className="text-xs text-slate-500 font-medium">Disruption Score</p>
            </div>
            <div className="text-center">
              <FileText className="w-5 h-5 text-[#C4922A] mx-auto mb-1" />
              <p className="text-xs text-slate-500 font-medium">PDF Export</p>
            </div>
          </div>
        )}

        {/* Cross-link to estimate */}
        {!results && (
          <p className="text-center text-slate-400 text-xs mt-6">
            Looking for a cost estimate instead?{" "}
            <Link to="/estimate" className="text-[#C4922A] font-semibold hover:underline">
              Get a free estimate →
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}