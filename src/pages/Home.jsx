import React, { lazy } from "react";
import SEOHead from "@/components/SEOHead";
import { localBusinessSchema } from "@/components/seoSchemas";
import HeroSection from "@/components/home/HeroSection";
import HomeFAQ, { homeFaqs } from "@/components/home/HomeFAQ";
import PullToRefresh from "@/components/PullToRefresh";
import IdleMount from "@/components/IdleMount";

// Below-the-fold sections — code-split out of the homepage entry chunk and
// mounted when the main thread is idle (after the hero is interactive).
const TrustSignals = lazy(() => import("@/components/home/TrustSignals"));
const ServicesPreview = lazy(() => import("@/components/home/ServicesPreview"));
const FeaturedProjects = lazy(() => import("@/components/home/FeaturedProjects"));
const FeaturedResources = lazy(() => import("@/components/home/FeaturedResources"));
const ServiceAreaSection = lazy(() => import("@/components/home/ServiceAreaSection"));
const TestimonialSlider = lazy(() => import("@/components/TestimonialSlider"));
const SocialFollow = lazy(() => import("@/components/home/SocialFollow"));
const CTABanner = lazy(() => import("@/components/home/CTABanner"));
const ExitIntentPopup = lazy(() => import("@/components/ExitIntentPopup"));

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
        {/* Above the fold — eager, lightweight, immediate */}
        <HeroSection />

        {/* Below the fold — lazy chunks mounted when idle */}
        <IdleMount>
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
        </IdleMount>
      </div>
    </PullToRefresh>
  );
}