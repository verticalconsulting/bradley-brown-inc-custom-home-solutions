import React from "react";
import { Phone, ChevronRight, CheckCircle, Star, Shield, BadgeCheck, Building2, User, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import SEOHead from "@/components/SEOHead";
import LandingCTABar from "@/components/landing/LandingCTABar";
import LandingFAQ from "@/components/landing/LandingFAQ";
import ServiceStickyCTA from "@/components/ServiceStickyCTA";
import RecentLuxuryProjects from "@/components/luxury/RecentLuxuryProjects";
import LuxuryTestimonials, { TESTIMONIALS } from "@/components/luxury/LuxuryTestimonials";
import { base44 } from "@/api/base44Client";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
  {
    "@type": "HomeAndConstructionBusiness",
    "name": "Bradley Brown Inc.",
    "telephone": "+18443514154",
    "address": { "@type": "PostalAddress", "addressLocality": "Brandon", "addressRegion": "MS", "postalCode": "39042", "addressCountry": "US" },
    "priceRange": "$$$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": String(TESTIMONIALS.length),
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": TESTIMONIALS.map((t) => ({
      "@type": "Review",
      "author": { "@type": "Person", "name": t.name },
      "reviewBody": t.quote,
      "reviewRating": { "@type": "Rating", "ratingValue": String(t.rating), "bestRating": "5", "worstRating": "1" }
    }))
  },
  {
    "@type": "Service",
    "name": "Luxury Home Renovations",
    "provider": { "@type": "HomeAndConstructionBusiness", "name": "Bradley Brown Inc." },
    "areaServed": "Brandon, MS and the Rankin County area",
    "description": "High-end kitchen and bathroom renovations, custom millwork, designer finishes, and whole-home luxury transformations in the Brandon and Rankin County area."
  },
  {
    "@type": "BreadcrumbList",
    "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bradleybrowninc.com" },
    { "@type": "ListItem", "position": 2, "name": "Pro Tips", "item": "https://bradleybrowninc.com/protips" },
    { "@type": "ListItem", "position": 3, "name": "Luxury Home Renovations", "item": "https://bradleybrowninc.com/luxuryhomerenovations" }]

  },
  {
    "@type": "FAQPage",
    "mainEntity": [
    { "@type": "Question", "name": "What qualifies as a luxury renovation?", "acceptedAnswer": { "@type": "Answer", "text": "Luxury renovations typically involve premium materials (natural stone, custom cabinetry, hardwood), dedicated project management, architectural detailing, and a focus on craftsmanship over speed. Budget typically starts at $100,000+." } },
    { "@type": "Question", "name": "How long does a luxury whole-home renovation take?", "acceptedAnswer": { "@type": "Answer", "text": "A full luxury renovation in the Brandon and Rankin County area typically runs 4–12 months depending on scope, permitting, and material lead times. We provide a phased timeline before work begins." } }]

  }]

};

const faqs = [
{ question: "What qualifies as a luxury renovation?", answer: "Luxury renovations prioritize premium materials (natural stone, custom cabinetry, hardwood floors), dedicated project management, architectural detailing, and uncompromising craftsmanship. Budget typically starts at $100,000 for a meaningful luxury transformation." },
{ question: "How long does a luxury whole-home renovation take?", answer: "A full luxury renovation typically runs 4–12 months. Custom millwork, stone fabrication, and specialty finishes all have production lead times. We build a phased schedule and stick to it — with weekly progress updates." },
{ question: "Do you have a design team or do I need to hire my own architect?", answer: "We work closely with architects and interior designers, and can recommend trusted local collaborators. We also have an in-house design-assist process for clients who want guidance without a full architect fee." },
{ question: "How do you ensure quality on a high-end project?", answer: "Every luxury project gets a dedicated project manager on-site daily. We use premium-grade subcontractors, conduct multi-point quality inspections at each phase, and don't move forward until the previous phase meets our standard." },
{ question: "Do luxury renovations add value to my home?", answer: "High-quality renovations consistently outperform the market in the Brandon and Rankin County area. Kitchen and bath renovations typically return 60–80% of cost in appraised value — and dramatically improve your quality of life in the meantime." }];


const phases = [
{ phase: "Discovery & Design", desc: "We start with a detailed consultation to understand your vision, lifestyle, and budget. We review existing plans, walk the home, and develop a design brief before any demolition begins." },
{ phase: "Material Selection", desc: "We guide you through material selection — tile, stone, cabinetry, fixtures, hardware, flooring — with access to our trade accounts for pricing below retail. Lead time planning is built in so nothing delays your project." },
{ phase: "Permitting & Pre-Construction", desc: "We pull all required permits, confirm structural conditions, and pre-order long-lead items before demo day. No surprises after walls are open." },
{ phase: "Construction & Daily Oversight", desc: "A dedicated project manager oversees your project daily. You get weekly photo reports and are consulted before any field decisions are made. Our crews are licensed, background-checked, and experienced with high-end finishes." },
{ phase: "Finish Work & Punch List", desc: "We don't consider a project done until every detail is right. Our punch-list process is rigorous — we walk the project with you before final payment and handle anything that isn't perfect." }];


export default function LuxuryHomeRenovations() {
  const handleCall = () => base44.analytics.track({ eventName: "phone_click", properties: { source: "luxury_reno_page" } });

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-16 md:pt-20">
      <SEOHead
        title="Luxury Home Renovations in Brandon, MS — Bradley Brown Inc"
        description="Premium kitchen, bath & whole-home renovations in the Brandon and Rankin County area. Custom millwork, designer finishes, dedicated project management. Call (844) 351-4154."
        schema={schema}
        canonical="https://bradleybrowninc.com/luxuryhomerenovations" />
      

      {/* Hero */}
      <div className="bg-[#1E2D3D] py-14 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/932d74d8-4f05-4b52-fa85-6903e1e42b00/herocover')" }} />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 rounded-full px-3 py-1 mb-3">
            <Star className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-amber-300 text-xs font-medium">Premium Craftsmanship</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Luxury Home Renovations in Brandon, MS
          </h1>
          <p className="text-slate-300 mt-4 text-base max-w-xl mx-auto">
            Custom materials, dedicated project management, and zero-compromise craftsmanship. Bradley Brown Inc. sets the standard for high-end renovations in the Brandon and Rankin County area.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+18443514154" onClick={handleCall} className="inline-flex items-center justify-center gap-2 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg bg-[#7591a3]">
              <Phone className="w-5 h-5" /> (844) 351-4154
            </a>
            <Link to={createPageUrl("QuoteAssistant")} className="inline-flex items-center justify-center gap-2 bg-sky-400 hover:bg-sky-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors">
              Free Consultation <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-14">

        {/* Intro */}
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 leading-relaxed text-base">Not every renovation is the same — and neither is every contractor. At Bradley Brown Inc., we specialize in renovations where the details matter: custom millwork, natural stone, designer tile, precision finish carpentry, and the kind of project management that keeps a complex job on time and on budget.</p>
          <p className="text-slate-600 leading-relaxed">We've been building and renovating homes in the Brandon and Rankin County area since 1995. Our luxury renovation clients choose us because we've earned trust on simpler projects first — and because we treat a $400,000 renovation with the same accountability as a $40,000 one.</p>
        </div>

        {/* What we do */}
        <div>
          <h2 className="text-2xl font-bold text-[#1E2D3D] mb-6">Luxury Renovation Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
            { title: "Kitchen Transformation", desc: "Custom cabinetry, quartz or natural stone countertops, high-end appliances, under-cabinet lighting, and statement islands. Starting at $60,000." },
            { title: "Master Bath Overhaul", desc: "Freestanding soaking tubs, heated floors, steam showers, custom tile work, and spa-grade fixtures. Starting at $30,000." },
            { title: "Whole-Home Renovation", desc: "Coordinated multi-room renovation with consistent design language, premium finishes, and single-point project management. Custom quote." },
            { title: "Custom Millwork & Built-Ins", desc: "Built-in bookcases, coffered ceilings, wainscoting, crown molding, and statement fireplaces crafted by skilled finish carpenters." },
            { title: "Luxury Outdoor Living", desc: "Full outdoor kitchens, covered pavilions, pergolas with integrated lighting, and pool surrounds that extend your home's luxury to the outdoors." },
            { title: "Home Office & Media Room", desc: "Purpose-built home offices with custom built-ins, media rooms with acoustic treatment, and dedicated spaces that work as hard as you do." }].
            map((s) =>
            <div key={s.title} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-[#1E2D3D] text-sm mb-1">{s.title}</h3>
                <p className="text-slate-500 text-xs leading-snug">{s.desc}</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Recent Luxury Renovation Projects — full width */}
      <RecentLuxuryProjects />

      {/* Testimonials — full width */}
      <LuxuryTestimonials />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-14 pb-12 space-y-14">

        {/* Process */}
        <div>
          <h2 className="text-2xl font-bold text-[#1E2D3D] mb-6">Our Luxury Renovation Process</h2>
          <div className="space-y-4">
            {phases.map((p, i) =>
            <div key={i} className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white text-sm">{i + 1}</div>
                <div>
                  <h3 className="font-bold text-[#1E2D3D] text-sm mb-1">{p.phase}</h3>
                  <p className="text-slate-500 text-sm">{p.desc}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Timeline expectations */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h2 className="font-bold text-[#1E2D3D] mb-3">Realistic Timeline Expectations</h2>
          <div className="space-y-2 text-sm">
            {[
            { scope: "Luxury kitchen remodel", timeline: "6–10 weeks" },
            { scope: "Master bath transformation", timeline: "4–6 weeks" },
            { scope: "Multi-room renovation (3–5 rooms)", timeline: "3–6 months" },
            { scope: "Whole-home luxury renovation", timeline: "6–12 months" }].
            map((row) =>
            <div key={row.scope} className="flex justify-between items-center border-b border-amber-100 pb-2">
                <span className="text-slate-700">{row.scope}</span>
                <span className="font-semibold text-amber-700">{row.timeline}</span>
              </div>
            )}
          </div>
          <p className="text-xs text-amber-600 mt-3">* Timelines include permitting, material lead times, and final punch list. Custom or imported materials may extend timelines.</p>
        </div>

        {/* Financing Your Luxury Renovation */}
        <div>
          <h2 className="text-2xl font-bold text-[#1E2D3D] mb-4">Financing Your Luxury Renovation</h2>
          <p className="text-slate-600 leading-relaxed text-sm mb-6">
            Most luxury renovation clients in the Brandon and Rankin County area finance at least part of their project. The three most common paths are a home equity line of credit (HELOC), which lets you draw against your home's equity at relatively low rates; a construction-to-permanent loan, which converts to a standard mortgage once the renovation is complete; and a personal renovation loan, which offers faster approval for smaller scopes. Bradley Brown Inc. works directly with you and your lender to provide accurate scopes of work, phased cost breakdowns, and the documentation lenders need to approve your loan. We're happy to recommend trusted local lenders who understand renovation projects in Central Mississippi.
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-[#1E2D3D] border-b border-gray-200">Financing Type</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#1E2D3D] border-b border-gray-200">Best For</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#1E2D3D] border-b border-gray-200">Typical Range</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-[#1E2D3D]">HELOC</td>
                  <td className="px-4 py-3 text-slate-600">Equity-rich homeowners</td>
                  <td className="px-4 py-3 text-slate-600">$50K–$500K</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-[#1E2D3D]">Personal Renovation Loan</td>
                  <td className="px-4 py-3 text-slate-600">Faster approval</td>
                  <td className="px-4 py-3 text-slate-600">$25K–$100K</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-[#1E2D3D]">Construction Loan</td>
                  <td className="px-4 py-3 text-slate-600">Full gut/rebuild</td>
                  <td className="px-4 py-3 text-slate-600">$150K+</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Link to={createPageUrl("ScheduleVisit")} className="inline-flex items-center gap-2 bg-sky-400 hover:bg-sky-500 text-white px-6 py-3 rounded-full font-bold text-sm transition-colors">
            Schedule a Free Consultation to discuss your project budget <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mid-page CTA */}
        <div className="bg-[#1E2D3D] rounded-2xl p-6 md:p-8 text-center">
          <p className="text-white font-bold text-lg mb-2">Start Your Luxury Renovation</p>
          <p className="text-slate-300 text-sm mb-5">Call us at (844) 351-4154 or request a free consultation. We serve Brandon, Madison, Ridgeland, Flowood, and all of the Rankin County area.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+18443514154" onClick={handleCall} className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold text-sm transition-colors">
              <Phone className="w-4 h-4" /> (844) 351-4154
            </a>
            <Link to={createPageUrl("ScheduleVisit")} className="inline-flex items-center justify-center gap-2 bg-sky-400 hover:bg-sky-500 text-white px-6 py-3 rounded-full font-bold text-sm transition-colors">
              Schedule a Site Visit <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Credentials */}
        <div className="bg-slate-50 border border-gray-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-[#1E2D3D] mb-5">Licensed, Insured &amp; Experienced</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm text-[#1E2D3D]">MS Residential Builder License #08290</p>
                <p className="text-xs text-slate-500 leading-relaxed">Licensed through the Mississippi Board of Contractors. Verify your contractor at <a href="https://www.msboc.us" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">msboc.us</a>.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm text-[#1E2D3D]">Fully Insured</p>
                <p className="text-xs text-slate-500 leading-relaxed">General liability and workers' compensation coverage on every project. Certificates available on request.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm text-[#1E2D3D]">Manufacturer-Trained Installers</p>
                <p className="text-xs text-slate-500 leading-relaxed">Authorized installers for leading cabinet, countertop, and appliance brands — warranty-backed workmanship.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm text-[#1E2D3D]">Led by Walker Magee, Project Manager</p>
                <p className="text-xs text-slate-500 leading-relaxed">Walker oversees every luxury renovation on-site daily — coordinating crews, subcontractors, and inspections to keep your project on time and on budget.</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-xl font-bold text-[#1E2D3D] mb-6 text-center">Frequently Asked Questions</h2>
          <LandingFAQ faqs={faqs} />
        </div>

        {/* Internal links */}
        <div className="bg-slate-50 border border-gray-200 rounded-xl p-5">
          <h3 className="font-bold text-[#1E2D3D] text-sm mb-3">Related Services & Pages</h3>
          <div className="flex flex-wrap gap-2">
            {[
            { label: "View Our Portfolio", page: "Portfolio" },
            { label: "All Services", page: "Services" },
            { label: "Get an AI Estimate", page: "QuoteAssistant" },
            { label: "Schedule a Site Visit", page: "ScheduleVisit" },
            { label: "More Pro Tips", page: "ProTips" }].
            map((link) =>
            <Link key={link.page} to={createPageUrl(link.page)} className="inline-flex items-center gap-1 bg-white border border-gray-200 text-sky-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-sky-50 transition-colors">
                <ChevronRight className="w-3 h-3" /> {link.label}
              </Link>
            )}
          </div>
        </div>
      </div>

      <LandingCTABar headline="Ready for a luxury renovation? Let's talk details." />
      <ServiceStickyCTA source="luxury_reno_page" label="Get a Free Quote" />
    </div>);

}