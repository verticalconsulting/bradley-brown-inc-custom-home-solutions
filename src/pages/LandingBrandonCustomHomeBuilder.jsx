import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import LandingCTABar from "@/components/landing/LandingCTABar";
import StickyCallButton from "@/components/StickyCallButton";
import { base44 } from "@/api/base44Client";
import { brandonCustomHomes as page, brandonCustomHomesSchema } from "@/content/brandonCustomHomes";
import "./brandon-custom-homes.css";

const handleCall = () => base44.analytics.track({
  eventName: "phone_click",
  properties: { source: "brandon_custom_home_landing" }
});

export default function LandingBrandonCustomHomeBuilder() {
  useEffect(() => {
    // Remove only conflicting host fallback tags on this route. Helmet owns
    // data-rh nodes. Restore fallbacks when leaving; do not change other pages.
    const selector = [
      'meta[name="description"]', 'meta[name="robots"]',
      'meta[property^="og:"]', 'meta[name^="twitter:"]',
      'link[rel="canonical"]'
    ].join(',');
    const fallbacks = [...document.head.querySelectorAll(selector)]
      .filter((node) => !node.hasAttribute('data-rh'));
    fallbacks.forEach((node) => node.remove());
    return () => fallbacks.forEach((node) => document.head.appendChild(node));
  }, []);

  return (
    <div className="brandon-homes-page">
      <SEOHead
        title={page.title}
        description={page.description}
        canonical={page.canonical}
        ogImage={page.projects[0].image}
        structuredData={brandonCustomHomesSchema}
      />
      <Helmet>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Open+Sans:wght@400;600;700&display=swap" />
      </Helmet>
      <StickyCallButton />

      <section className="brandon-homes-hero" aria-labelledby="brandon-homes-title">
        <div className="brandon-homes-container">
          <nav aria-label="Breadcrumb" className="brandon-homes-breadcrumb">
            <Link to="/">Home</Link><span aria-hidden="true"> / </span><span>{page.h1}</span>
          </nav>
          <p className="brandon-homes-eyebrow">Brandon, Rankin County &amp; Central Mississippi</p>
          <h1 id="brandon-homes-title">{page.h1}</h1>
          <p className="brandon-homes-opening">{page.opening}</p>
          <div className="brandon-homes-actions">
            <Link to="/estimate" className="brandon-homes-button brandon-homes-primary">Request a Custom-Home Estimate</Link>
            <a href="tel:+18443514154" onClick={handleCall} className="brandon-homes-button brandon-homes-outline">Call (844) 351-4154</a>
          </div>
        </div>
      </section>

      <div className="brandon-homes-container brandon-homes-content">
        <section aria-labelledby="brandon-homes-service-title">
          <h2 id="brandon-homes-service-title">{page.sections[0].heading}</h2>
          {page.sections[0].paragraphs.map((text) => <p key={text}>{text}</p>)}
          <Link to="/services/custom-home-building">Explore the custom-home building service</Link>
        </section>

        <section aria-labelledby="brandon-homes-projects-title">
          <h2 id="brandon-homes-projects-title">Brandon project examples from our portfolio</h2>
          <p>These are the project names, locations, sizes, and years listed in Bradley Brown Inc.'s portfolio. The remodel and addition is identified separately from the new-home build.</p>
          <div className="brandon-homes-projects">
            {page.projects.map((project) => (
              <article key={project.title} className="brandon-homes-project">
                <img src={project.image} alt={project.alt} width="640" height="480" loading="lazy" decoding="async" />
                <div>
                  <p className="brandon-homes-project-type">{project.type}</p>
                  <h3>{project.title}</h3>
                  <p className="brandon-homes-project-meta">{project.location} · {project.squareFeet.toLocaleString('en-US')} sq ft · {project.year}</p>
                  <p>{project.description}</p>
                  <Link to="/portfolio">View {project.title} in the portfolio</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {page.sections.slice(1).map(({ heading, paragraphs }) => (
          <section key={heading}>
            <h2>{heading}</h2>
            {paragraphs.map((text) => <p key={text}>{text}</p>)}
          </section>
        ))}

        <section id="faq" aria-labelledby="brandon-homes-faq-title">
          <h2 id="brandon-homes-faq-title">Questions about custom homes in Brandon</h2>
          <div className="brandon-homes-faqs">
            {page.faqs.map(({ question, answer }) => (
              <section key={question}>
                <h3>{question}</h3>
                <p>{answer}</p>
              </section>
            ))}
          </div>
        </section>

        <nav aria-label="Related services and customer information" className="brandon-homes-related">
          <h2>Explore projects, remodeling, and customer reviews</h2>
          <p>Visit the Reviews page for customer feedback across the company's work. Remodeling feedback should not be treated as a new-home project description.</p>
          <ul>
            <li><Link to="/portfolio">Project portfolio</Link></li>
            <li><Link to="/reviews">Customer reviews</Link></li>
            <li><Link to="/remodeling-brandon-ms">Home remodeling in Brandon</Link></li>
            <li><Link to="/estimate">Request a Custom-Home Estimate</Link></li>
          </ul>
        </nav>
      </div>

      {/* Keep the existing bottom phone/conversion handler and estimate route. */}
      <LandingCTABar headline="Planning a custom home in Brandon? Tell us about your project." />
    </div>
  );
}
