import React from "react";
import SEOHead from "@/components/SEOHead";
import { localBusinessSchema } from "@/components/seoSchemas";
import HeroSection from "@/components/home/HeroSection";
import TrustSignals from "@/components/home/TrustSignals";
import ServicesPreview from "@/components/home/ServicesPreview";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import CTABanner from "@/components/home/CTABanner";
import GoogleReviews from "@/components/home/GoogleReviews";

export default function Home() {
  return (
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
      <GoogleReviews />
      <CTABanner />
    </div>
  );
}