import React from "react";

const steps = [
  {
    title: "Initial Consultation & Vision Session",
    body: "We start every Brandon custom home with a one-on-one consultation at our office or on your land. We'll discuss your family's lifestyle, must-have features, target budget, and timeline so our team understands your vision before putting anything on paper. This session shapes every decision that follows in Rankin County.",
  },
  {
    title: "Site Selection & Land Evaluation",
    body: "Not every lot in Brandon is ready to build on. We walk your property to evaluate soil conditions, drainage, setback requirements, and utility access across Rankin County. If you haven't purchased land yet, we can recommend parcels that fit your home size, orientation, and long-term resale goals.",
  },
  {
    title: "Custom Design & Blueprint Planning",
    body: "Next we translate your vision into detailed floor plans and elevations. You'll review room layouts, material selections, and structural details with our design team. We refine the drawings until they match exactly what you want to see built on your Brandon homesite, down to every door and window.",
  },
  {
    title: "Permitting & Pre-Construction",
    body: "Before breaking ground, we handle all Rankin County and City of Brandon permitting, coordinate subcontractors, order long-lead materials, and finalize the construction schedule. You receive a project timeline with milestone dates so you always know what's happening next on your custom home build.",
  },
  {
    title: "Construction & Milestone Updates",
    body: "During active construction in Brandon, you get regular milestone updates — framing, roofing, mechanicals, drywall, and finishes. Our superintendents are on-site daily across Rankin County, and you can visit your home at each stage with advance notice so you see progress firsthand.",
  },
  {
    title: "Final Walkthrough & Quality Inspection",
    body: "As construction wraps up, we walk every room of your new Brandon home together. We document a detailed punch list, test every system, and verify that finishes meet our quality standards. No item closes until you're satisfied that your Rankin County home is truly move-in ready.",
  },
  {
    title: "Move-In & Warranty Activation",
    body: "On move-in day, we hand over the keys along with warranty documentation, product manuals, and care instructions for your Brandon home. Our team stays reachable for any post-closing questions across Rankin County, and we schedule follow-up visits at set intervals to make sure everything performs as promised.",
  },
];

export default function BuildProcessTimeline() {
  return (
    <div className="prose prose-slate max-w-none">
      <h2 className="text-2xl font-bold text-[#1E2D3D]">Our Custom Home Building Process in Brandon, MS</h2>
      <p className="text-slate-600 leading-relaxed">
        Every custom home we build in Brandon follows a proven seven-step process. Here's what to expect from the first conversation to your move-in day.
      </p>
      <div className="mt-6 space-y-6 not-prose">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-[#1E2D3D] text-white rounded-full flex items-center justify-center font-bold text-base">
                {i + 1}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1E2D3D] mb-1">{step.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{step.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}