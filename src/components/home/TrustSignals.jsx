import React from "react";
import { Hammer, Home, MapPin, Shield } from "lucide-react";

const signals = [
  { icon: MapPin, title: "Brandon, Mississippi", label: "Locally Based" },
  { icon: Home, title: "Custom Homes", label: "Built Around Your Vision" },
  { icon: Hammer, title: "Renovations", label: "From Planning to Finish" },
  { icon: Shield, title: "Licensed & Insured", label: "Professional Construction" },
];

export default function TrustSignals() {
  return (
    <section className="bg-foreground py-10 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {signals.map(({ icon: Icon, title, label }) => (
            <div key={title} className="text-center">
              <div className="flex justify-center mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="text-lg md:text-xl font-bold text-white">
                {title}
              </div>
              <div className="text-slate-300 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
