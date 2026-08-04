import React from "react";

const steps = [
  {
    title: "Choose Your Room",
    body: "The room type you select — whether it's a Kitchen, Primary Bath, Living Room, Bedroom, Outdoor/Patio, or Whole Home project — directly shapes the material and finish recommendations our AI provides. That's because each space has distinct functional requirements: kitchens need heat- and stain-resistant surfaces, bathrooms demand moisture-rated fixtures and slip-resistant flooring, outdoor patios require weatherproof materials, and living rooms prioritize warmth and acoustic comfort. By telling us which room you're planning, we can narrow our recommendations to the materials and finishes that actually make sense for how you'll use the space day to day.",
  },
  {
    title: "Upload an Inspiration Photo",
    body: "Upload a JPG or PNG image up to 10 MB — common sources include Pinterest screenshots, magazine scans, Houzz saves, or portfolio photos from homes you admire. You don't need a professional photo; a quick phone screenshot of a kitchen, bath, or living space that catches your eye works perfectly. Our AI analyzes the image to detect dominant color tones, surface textures, cabinetry styles, and the overall design mood — whether that's modern farmhouse, coastal light, moody transitional, or something in between. The more representative the photo is of the look you want, the more accurate your finish packages will be.",
  },
  {
    title: "Receive Three Themed Finish Packages",
    body: "Within seconds of uploading, you'll receive three distinct finish packages — each built around a different design mood so you can compare options side by side. Every package includes a curated material palette with specific product names, a four-color scheme with friendly names and hex codes, fixture and hardware pairings tailored to your room type, and a signature highlight that captures the standout detail of the look. We also include a budget-friendly alternative tier for each package, with smart material swaps that deliver a similar aesthetic at roughly 30–45% lower cost. You can toggle between the signature and budget versions of each package before deciding which one to save.",
  },
  {
    title: "Save & Include with Your Quote",
    body: "Once you've found a package that fits your vision, save it with a single click and it attaches directly to a future project quote request through our system. You can optionally add your name and email so we can link the package to your account. When you submit a quote request, your saved finish package travels with it — meaning our design team can see your exact material preferences, color palette, estimated price range, and budget tier before we ever pick up the phone. This eliminates the typical back-and-forth of sharing inspiration links and trying to describe what you want, so your consultation can focus on scope, timeline, and budget from the very first conversation.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mt-16 pt-12 border-t border-gray-200">
      <h2 className="text-2xl md:text-3xl font-bold text-[#1E2D3D] text-center mb-8">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-[#1E2D3D] text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                {i + 1}
              </div>
              <h2 className="text-lg font-bold text-[#1E2D3D]">{step.title}</h2>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}