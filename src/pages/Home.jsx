import React, { useState } from "react";
import SEOHead from "@/components/SEOHead";
import { localBusinessSchema } from "@/components/seoSchemas";
import HeroSection from "@/components/home/HeroSection";
import TrustSignals from "@/components/home/TrustSignals";
import ServicesPreview from "@/components/home/ServicesPreview";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import FeaturedResources from "@/components/home/FeaturedResources";
import TestimonialSlider from "@/components/TestimonialSlider";
import CTABanner from "@/components/home/CTABanner";
import ServiceAreaSection from "@/components/home/ServiceAreaSection";
import PullToRefresh from "@/components/PullToRefresh";
import HomeFAQ, { homeFaqs } from "@/components/home/HomeFAQ";
import SocialFollow from "@/components/home/SocialFollow";
import ExitIntentPopup from "@/components/ExitIntentPopup";

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": homeFaqs.map((f) => ({
    "@type": "Question",
    "name": f.question,
    "acceptedAnswer": { "@type": "Answer", "text": f.schemaAnswer || f.answer }
  }))
};

const homeSchemaGraph = {
  "@context": "https://schema.org",
  "@graph": [localBusinessSchema, faqPageSchema]
};

export default function Home() {
  const handleRefresh = async () => {
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div>
        <SEOHead
          title="Custom Home Builder & Remodeler in Brandon, MS | Bradley Brown Inc."
          description="Custom homes, remodeling, additions, and outdoor living in Brandon and Central Mississippi. Explore Bradley Brown Inc.'s work and request a free estimate."
          schema={homeSchemaGraph}
          canonical="https://bradleybrowninc.com"
        />
        <HeroSection />
        <TrustSignals />
        <ServicesPreview />
        <FeaturedProjects />
        <FeaturedResources />
        <ServiceAreaSection />
        <div id="testimonials">
          <TestimonialSlider featuredOnly={true} limit={6} />
        </div>
        <HomeFAQ />
        <SocialFollow />
        <CTABanner />
        <ExitIntentPopup source="home" />
      </div>
    </PullToRefresh>
  );
}