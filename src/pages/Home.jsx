import React, { useState } from "react";
import SEOHead from "@/components/SEOHead";
import { localBusinessSchema } from "@/components/seoSchemas";
import HeroSection from "@/components/home/HeroSection";
import TrustSignals from "@/components/home/TrustSignals";
import ServicesPreview from "@/components/home/ServicesPreview";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import CTABanner from "@/components/home/CTABanner";
import PullToRefresh from "@/components/PullToRefresh";

export default function Home() {
  const handleRefresh = async () => {
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div>
        <SEOHead
          title="Home Remodeling in Brandon MS | Bradley Brown Inc"
          description="Brandon, MS's trusted home remodeler & custom builder since 1995. Kitchen remodels, additions, whole-home renovations. Licensed & insured. Call (601) 954-1306 for a free estimate."
          schema={localBusinessSchema}
        />
        <HeroSection />
        <TrustSignals />
        <ServicesPreview />
        <FeaturedProjects />
        <TestimonialsCarousel />
        <CTABanner />
      </div>
    </PullToRefresh>
  );
}