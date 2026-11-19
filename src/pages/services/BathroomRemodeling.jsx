import React from "react";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import { bathroomRemodelingPage as page } from "@/content/bathroomRemodelingPage";

export default function BathroomRemodeling() {
  return (
    <ServicePageLayout
      title={page.title}
      description={page.description}
      canonical={page.canonical}
      h1={page.h1}
      subtitle={page.subtitle}
      serviceName="Bathroom Remodeling"
      answerFirstOpening={page.opening}
      answerFirstCta={page.openingCta}
      pageKey="BathroomRemodeling"
      bodySections={page.sections}
      features={[]}
      faqs={page.faqs}
      testimonials={[]}
      images={page.images}
      relatedLinks={page.relatedLinks}
      showTrustBar={false}
      ctaBody={page.ctaBody}
    />
  );
}
