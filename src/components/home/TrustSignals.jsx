import React from "react";
import { Award, Home, Star, Shield } from "lucide-react";

const stats = [
  { icon: Home, value: "500+", label: "Projects Built" },
  { icon: Award, value: "30+", label: "Years Experience" },
  { icon: Star, value: "4.9★", label: "Average Rating" },
  { icon: Shield, value: "100%", label: "Licensed & Insured" },
];

export default function TrustSignals() {
  return (
    <section className="bg-foreground py-10 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <div className="flex justify-center mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white">{value}</div>
              <div className="text-muted-foreground text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}