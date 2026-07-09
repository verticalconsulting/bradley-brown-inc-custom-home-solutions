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
import ExitIntentPopup from "@/components/ExitIntentPopup";

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": homeFaqs.map((f) => ({
    "@type": "Question",
    "name": f.question,
    "acceptedAnswer": { "@type": "Answer", "text": f.answer }
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
          title="Home Remodeling & Custom Builds | Bradley Brown Inc, MS"
          description="Brandon MS's top-rated remodeler & home builder since 1995. Kitchens, baths, additions & custom homes. Licensed & insured. Call (844) 351-4154 for a free estimate."
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
        <CTABanner />
        <ExitIntentPopup source="home" />
      </div>
    </PullToRefresh>
  );
}