import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { base44 } from "@/api/base44Client";
import { barndominiums as page, barndominiumsSchema } from "@/content/barndominiums";
import "./barndominiums.css";

const PHONE = "(844) 351-4154";
const trackCall = () => {
  base44.analytics.track({ eventName: "phone_click", properties: { source: "Barndominium Construction" } });
};

function EstimateLinks() {
  return (
    <div className="barndo-actions">
      <Link to="/estimate" className="barndo-button barndo-button-primary">Request a Barndominium Estimate</Link>
      <a href="tel:+18443514154" onClick={trackCall} className="barndo-button barndo-button-outline">Call {PHONE}</a>
    </div>
  );
}

export default function BarndominiumsService() {
  useEffect(() => {
    // The host injects unmanaged fallback tags before React runs. Helmet does
    // not own those nodes, so remove only conflicting fallbacks on this route.
    // Restore them on navigation; other pages retain their existing behavior.
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
    <div className="barndo-page">
      <SEOHead
        title={page.title}
        description={page.description}
        canonical={page.canonical}
        ogImage={page.proof.image}
        structuredData={barndominiumsSchema}
      />
      <Helmet>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Open+Sans:wght@400;600;700&display=swap" />
      </Helmet>

      <section className="barndo-hero" aria-labelledby="barndo-title">
        <div className="barndo-container">
          <nav aria-label="Breadcrumb" className="barndo-breadcrumb">
            <Link to="/">Home</Link><span aria-hidden="true"> / </span>
            <Link to="/services">Services</Link><span aria-hidden="true"> / </span>
            <span>Barndominiums</span>
          </nav>
          <p className="barndo-eyebrow">Brandon &amp; Central Mississippi</p>
          <h1 id="barndo-title">{page.h1}</h1>
          <p className="barndo-opening">{page.opening}</p>
          <EstimateLinks />
        </div>
      </section>

      <div className="barndo-container barndo-content">
        {page.sections.map(({ heading, paragraphs }) => (
          <section key={heading}>
            <h2>{heading}</h2>
            {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}

        <section className="barndo-proof" aria-labelledby="barndo-proof-title">
          <div>
            <h2 id="barndo-proof-title">{page.proof.heading}</h2>
            <p>{page.proof.text}</p>
            <Link to="/portfolio">View the project portfolio</Link>
          </div>
          <img src={page.proof.image} alt={page.proof.alt} width="640" height="480" loading="lazy" decoding="async" />
        </section>

        <section aria-labelledby="barndo-faq-title" id="faq">
          <h2 id="barndo-faq-title">Mississippi barndominium questions</h2>
          <p>These answers describe Bradley Brown Inc.'s published services and next steps. Confirm availability and the agreed scope for your property.</p>
          <div className="barndo-faqs">
            {page.faqs.map(({ question, answer }) => (
              <section key={question}>
                <h3>{question}</h3>
                <p>{answer}</p>
              </section>
            ))}
          </div>
        </section>

        <nav aria-label="Related services and customer information" className="barndo-related">
          <h2>Explore Bradley Brown Inc.</h2>
          <ul>
            <li><Link to="/services/custom-home-building">Custom home building</Link></li>
            <li><Link to="/portfolio">Project portfolio</Link></li>
            <li><Link to="/reviews">Customer reviews</Link></li>
            <li><Link to="/contact">Contact the team</Link></li>
          </ul>
        </nav>
      </div>

      <section className="barndo-cta" aria-labelledby="barndo-cta-title">
        <div className="barndo-container">
          <h2 id="barndo-cta-title">Discuss your barndominium plans</h2>
          <p>Tell Bradley Brown Inc. where you want to build and how you want to use the space. Use the estimate page's message form and select Other if no listed project type fits.</p>
          <EstimateLinks />
        </div>
      </section>
    </div>
  );
}
