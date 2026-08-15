import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PLANNER_QUESTIONS } from "@/lib/plannerLogic";

export default function PlannerQuestionnaire({ onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const question = PLANNER_QUESTIONS[step];
  const isLast = step === PLANNER_QUESTIONS.length - 1;

  const canProceed = () => {
    const val = answers[question.id];
    if (question.type === "multi") return Array.isArray(val) && val.length > 0;
    return !!val;
  };

  const selectRadio = (value) => setAnswers((a) => ({ ...a, [question.id]: value }));

  const toggleMulti = (value) => {
    setAnswers((a) => {
      const current = a[question.id] || [];
      if (value === "none") return { ...a, [question.id]: ["none"] };
      const without = current.filter((v) => v !== "none");
      return {
        ...a,
        [question.id]: without.includes(value)
          ? without.filter((v) => v !== value)
          : [...without, value],
      };
    });
  };

  const handleNext = () => {
    if (isLast) {
      onComplete(answers);
    } else {
      setStep((s) => s + 1);
    }
  };

  const progress = Math.round(((step + 1) / PLANNER_QUESTIONS.length) * 100);

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Question {step + 1} of {PLANNER_QUESTIONS.length}
          </span>
          <span className="text-xs font-medium text-slate-400">{progress}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#C4922A] rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <h2 className="text-xl md:text-2xl font-bold text-[#1E2D3D] mb-1">{question.label}</h2>
      <p className="text-sm text-slate-500 mb-6">Select {question.type === "multi" ? "all that apply" : "one option"} below.</p>

      {/* Options */}
      <div className={`grid gap-3 ${question.type === "multi" ? "sm:grid-cols-2" : "sm:grid-cols-2"}`}>
        {question.options.map((opt) => {
          const val = answers[question.id];
          const selected =
            question.type === "multi"
              ? Array.isArray(val) && val.includes(opt.value)
              : val === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => (question.type === "multi" ? toggleMulti(opt.value) : selectRadio(opt.value))}
              className={`min-h-[52px] text-left px-4 py-3 rounded-xl border-2 font-medium text-sm transition-all ${
                selected
                  ? "border-[#C4922A] bg-[#C4922A]/10 text-[#1E2D3D]"
                  : "border-gray-200 text-slate-600 hover:border-[#C4922A]/40 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`flex-shrink-0 w-5 h-5 ${
                    question.type === "multi" ? "rounded-md" : "rounded-full"
                  } border-2 flex items-center justify-center ${
                    selected ? "border-[#C4922A] bg-[#C4922A]" : "border-gray-300"
                  }`}
                >
                  {selected && (
                    <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                {opt.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
        <button
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#1E2D3D] disabled:opacity-0 disabled:pointer-events-none transition-colors font-medium"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className="flex items-center gap-2 bg-[#C4922A] hover:bg-[#A37820] text-white px-6 py-2.5 min-h-[44px] rounded-lg font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isLast ? (
            <>See My Plan</>
          ) : (
            <>Next <ChevronRight className="w-4 h-4" /></>
          )}
        </button>
      </div>
    </div>
  );
}