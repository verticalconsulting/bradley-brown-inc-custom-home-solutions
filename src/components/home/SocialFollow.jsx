import React from "react";
import { Facebook, Instagram, ChevronRight } from "lucide-react";

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/BradleyBrownInc",
    icon: Facebook,
    hoverClass: "hover:bg-[#1877F2] hover:border-[#1877F2]",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/bradleybrowninc",
    icon: Instagram,
    hoverClass: "hover:bg-gradient-to-tr hover:from-[#feda75] hover:via-[#d62976] hover:to-[#962fbf] hover:border-transparent",
  },
];

export default function SocialFollow() {
  return (
    <section className="bg-white py-12 md:py-16" aria-label="Follow Bradley Brown Inc. on social media">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
          Stay Connected
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 font-heading">
          Follow Our Latest Projects
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-7">
          See behind-the-scenes photos, before-and-after transformations, and new builds as they happen across Brandon and Central Mississippi.
        </p>
        <div className="flex items-center justify-center gap-4">
          {SOCIALS.map(({ label, href, icon: Icon, hoverClass }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit Bradley Brown Inc. on ${label}`}
              className={`flex items-center gap-2 bg-background border border-border rounded-full px-5 py-3 min-h-[48px] text-sm font-semibold text-foreground transition-colors ${hoverClass} hover:text-white`}
            >
              <Icon className="w-5 h-5" />
              {label}
              <ChevronRight className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}