import React, { lazy } from "react";
import SEOHead from "@/components/SEOHead";
import { localBusinessSchema } from "@/components/seoSchemas";
import HeroSection from "@/components/home/HeroSection";
import HomeFAQ from "@/components/home/HomeFAQ";
import { homeAnswerOpening, homeAnswerFaqs } from "@/content/aiAnswerFirstContent";
import PullToRefresh from "@/components/PullToRefresh";
import IdleMount from "@/components/IdleMount";
import VisibleMount from "@/components/VisibleMount";

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
  "mainEntity": homeAnswerFaqs.map((f) => ({
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
          title="Custom Home Builder & Remodeler in Brandon, MS | Bradley Brown Inc."
          description="Custom homes, remodeling, additions, and outdoor living in Brandon and Central Mississippi. Explore Bradley Brown Inc.'s work and request a free estimate."
          schema={homeSchemaGraph}
          canonical="https://bradleybrowninc.com"
        />
        {/* Above the fold — eager, lightweight, immediate */}
        <HeroSection />

        <section className="bg-sky-50 border-y border-sky-100 py-10 md:py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Custom Homes and Remodeling in Brandon and Central Mississippi</h2>
            <p className="text-foreground/75 leading-relaxed">{homeAnswerOpening}</p>
          </div>
        </section>

        {/* Below the fold — lazy chunks mounted when idle. Data-fetching sections
            (services, projects, reviews) additionally wait until near the viewport,
            keeping their API calls out of the initial load dependency chain. */}
        <IdleMount>
          <TrustSignals />
          <VisibleMount><ServicesPreview /></VisibleMount>
          <VisibleMount><FeaturedProjects /></VisibleMount>
          <FeaturedResources />
          <ServiceAreaSection />
          <div id="testimonials">
            <VisibleMount><TestimonialSlider featuredOnly={true} limit={6} /></VisibleMount>
          </div>
          <HomeFAQ faqs={homeAnswerFaqs} />
          <SocialFollow />
          <CTABanner />
          <ExitIntentPopup source="home" />
        </IdleMount>
      </div>
    </PullToRefresh>
  );
}