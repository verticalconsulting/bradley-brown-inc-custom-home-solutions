import React, { useState } from "react";
import SEOHead from "@/components/SEOHead";
import { localBusinessSchema } from "@/components/seoSchemas";
import HeroSection from "@/components/home/HeroSection";
import TrustSignals from "@/components/home/TrustSignals";
import ServicesPreview from "@/components/home/ServicesPreview";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import CTABanner from "@/components/home/CTABanner";
import ServiceAreaSection from "@/components/home/ServiceAreaSection";
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
          title="Home Remodeling in Brandon, MS | Bradley Brown Inc — Since 1995"
          description="Trusted home remodeling in Brandon, MS since 1995. Kitchen remodels, bathroom renovations, room additions & custom homes. Licensed & insured. Free estimate — call (601) 954-1306."
          schema={localBusinessSchema}
          canonical="https://custom-home-builder.bradleybrowninc.com"
        />
        <HeroSection />
        <TrustSignals />
        <ServicesPreview />
        <FeaturedProjects />
        <ServiceAreaSection />
        <TestimonialsCarousel />
        <CTABanner />
      </div>
    </PullToRefresh>
  );
}