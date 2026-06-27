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
          title="Home Remodeling & Custom Homes in Brandon, MS | Bradley Brown Inc"
          description="Brandon MS's trusted remodeler since 1995. Kitchen & bath remodels, room additions, custom homes & barndominiums. Licensed, insured. Get your free estimate today."
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
      </div>
    </PullToRefresh>
  );
}