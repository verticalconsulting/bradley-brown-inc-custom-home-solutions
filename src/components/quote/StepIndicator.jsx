import React from "react";
import { Check } from "lucide-react";

export default function StepIndicator({ steps, currentStep }) {
  return (
    <>
      {/* Mobile: compact progress bar + step label */}
      <div className="sm:hidden mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-[#1E2D3D]">
            Step {currentStep + 1} of {steps.length}: <span className="text-[#C4922A]">{steps[currentStep]}</span>
          </span>
          <span className="text-xs text-slate-400">{Math.round((currentStep / (steps.length - 1)) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="bg-[#C4922A] h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop: step dots */}
      <div className="hidden sm:flex items-center justify-center gap-0 mb-8 overflow-x-auto pb-1">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center flex-shrink-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                i < currentStep ? "bg-[#C4922A] text-white" :
                i === currentStep ? "bg-[#1E2D3D] text-white ring-4 ring-[#1E2D3D]/20" :
                "bg-gray-100 text-gray-400"
              }`}>
                {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-xs mt-1 text-center max-w-[60px] leading-tight ${
                i === currentStep ? "text-[#1E2D3D] font-semibold" : "text-gray-400"
              }`}>{step}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-0.5 w-8 sm:w-12 mx-1 flex-shrink-0 mt-[-14px] ${i < currentStep ? "bg-[#C4922A]" : "bg-gray-200"}`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}