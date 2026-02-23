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
          title="Custom Home Builder in Central Mississippi"
          description="Bradley Brown Inc. builds dream homes across Jackson, Madison, Ridgeland, Brandon & surrounding areas. Custom homes, renovations, additions, and outdoor living since 1995."
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