import React from "react";

const steps = [
  {
    number: "1",
    title: "Initial Consultation & Vision Session",
    body: "We sit down with you in Brandon to understand your lifestyle, must-haves, and budget before a single line is drawn. This vision session shapes everything that follows — from floor plan layout to finish selections — so your custom home in Rankin County reflects how your family actually lives and grows over time."
  },
  {
    number: "2",
    title: "Site Selection & Land Evaluation",
    body: "Already own land in Brandon? We'll evaluate it for drainage, soil conditions, setbacks, and utility access. If you're still looking, we can point you toward available lots across Rankin County that fit your budget and building goals. Getting the site right early prevents costly surprises during construction and keeps your project on schedule."
  },
  {
    number: "3",
    title: "Custom Design & Blueprint Planning",
    body: "Next, we translate your vision into detailed blueprints and 3D renderings. You'll review room sizes, traffic flow, and material selections with our team right here in Brandon, MS. We refine the plans until every detail matches your expectations — from cabinetry style to ceiling height — before we move toward permitting and start construction on your new home."
  },
  {
    number: "4",
    title: "Permitting & Pre-Construction",
    body: "We handle all permits through Rankin County and the City of Brandon so you don't have to navigate the paperwork. During pre-construction, we finalize material orders, line up subcontractors, and confirm the build schedule. This groundwork keeps your project moving smoothly once we break ground on your custom home."
  },
  {
    number: "5",
    title: "Construction & Milestone Updates",
    body: "Throughout construction, you'll receive regular milestone updates and walkthrough invitations at key stages — framing, rough-in, and drywall. Our Brandon-based project managers stay on-site to keep quality high and your timeline on track. You'll always know what's happening at your build, with progress photos and direct communication at every step of the process."
  },
  {
    number: "6",
    title: "Final Walkthrough & Quality Inspection",
    body: "Before you receive your keys, we walk every room together and check every detail — from trim alignment to appliance function. Any punch-list items we find in your Brandon home are corrected before move-in. This quality inspection is our commitment to delivering a custom home that meets our standards, not just minimum code."
  },
  {
    number: "7",
    title: "Move-In & Ongoing Support",
    body: "On move-in day, we hand over the keys and a maintenance guide tailored to your home. Our team remains a phone call away for questions or anything that needs attention after you've settled in. Building a home in Brandon is a relationship, not just a transaction."
  },
];

export default function CustomHomeProcess() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1E2D3D] mb-2">Our Custom Home Building Process in Brandon, MS</h2>
      <p className="text-slate-500 text-sm mb-6">
        Seven steps from first conversation to move-in day — each designed to keep you informed and your custom home on track.
      </p>
      <ol className="relative border-l-2 border-sky-200 ml-3 space-y-6">
        {steps.map((step) => (
          <li key={step.number} className="pl-8 relative">
            <span className="absolute -left-[18px] flex items-center justify-center w-9 h-9 bg-sky-500 text-white rounded-full font-bold text-sm">
              {step.number}
            </span>
            <h3 className="text-lg font-bold text-[#1E2D3D] mb-1">{step.title}</h3>
            <p className="text-slate-600 leading-relaxed text-sm">{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}