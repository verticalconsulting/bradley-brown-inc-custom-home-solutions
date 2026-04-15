import React from "react";
import { Check } from "lucide-react";

export default function StepIndicator({ steps, currentStep }) {
  const pct = Math.round((currentStep / (steps.length - 1)) * 100);

  return (
    <div className="mb-8">
      {/* Progress bar */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-[#1E2D3D]">
          Step {currentStep + 1} of {steps.length}:&nbsp;
          <span className="text-[#C4922A]">{steps[currentStep]}</span>
        </span>
        <span className="text-xs text-slate-400">{pct}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
        <div
          className="bg-[#C4922A] h-2 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Step dots — hidden on very small screens */}
      <div className="hidden sm:flex items-center justify-center gap-0">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center flex-shrink-0">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i < currentStep ? "bg-[#C4922A] text-white" :
                i === currentStep ? "bg-[#1E2D3D] text-white ring-4 ring-[#1E2D3D]/20" :
                "bg-gray-100 text-gray-400"
              }`}>
                {i < currentStep ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span className={`text-xs mt-1 text-center w-16 leading-tight ${
                i === currentStep ? "text-[#1E2D3D] font-semibold" : "text-gray-400"
              }`}>{step}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-0.5 w-10 mx-1 flex-shrink-0 mb-4 ${i < currentStep ? "bg-[#C4922A]" : "bg-gray-200"}`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}