import React from "react";
import SEOHead from "@/components/SEOHead";
import { localBusinessSchema } from "@/components/seoSchemas";
import HeroSection from "@/components/home/HeroSection";
import TrustSignals from "@/components/home/TrustSignals";
import ServicesPreview from "@/components/home/ServicesPreview";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import CTABanner from "@/components/home/CTABanner";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <TrustSignals />
      <ServicesPreview />
      <FeaturedProjects />
      <TestimonialsCarousel />
      <CTABanner />
    </div>
  );
}