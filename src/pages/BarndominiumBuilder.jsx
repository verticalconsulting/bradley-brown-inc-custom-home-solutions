import React from "react";
import { Phone, CheckCircle, ChevronRight, Star, Shield, Award, Clock, MapPin, Hammer, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import SEOHead from "@/components/SEOHead";
import StickyCallButton from "@/components/StickyCallButton";
import LandingFAQ from "@/components/landing/LandingFAQ";
import BarndominiumComparison from "@/components/landing/BarndominiumComparison";
import BarndominiumFinancing from "@/components/landing/BarndominiumFinancing";
import { base44 } from "@/api/base44Client";

const PHONE = "(844) 351-4154";
const PHONE_HREF = "tel:+18443514154";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      "name": "Bradley Brown Inc.",
      "telephone": "+18443514154",
      "email": "bradleybrowninc@gmail.com",
      "url": "https://bradleybrowninc.com/barndominium-builder",
      "address": { "@type": "PostalAddress", "streetAddress": "104 Tiffany Drive", "addressLocality": "Brandon", "addressRegion": "MS", "postalCode": "39042", "addressCountry": "US" },
      "priceRange": "$$$",
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "87", "bestRating": "5" }
    },
    {
      "@type": "Service",
      "name": "Custom Barndominium Construction",
      "provider": { "@type": "LocalBusiness", "name": "Bradley Brown Inc." },
      "areaServed": { "@type": "City", "name": "Brandon, Mississippi" },
      "description": "Turnkey custom barndominium builds in Brandon, MS and the Rankin County area — steel frame, living + workshop combos, built by a licensed contractor since 1995.",
      "priceRange": "$45,000–$350,000",
      "offers": [
        { "@type": "Offer", "name": "Basic Shell Only", "priceCurrency": "USD", "priceSpecification": { "@type": "PriceSpecification", "minPrice": 45000, "maxPrice": 80000 } },
        { "@type": "Offer", "name": "Standard Turnkey (1,200–1,800 sq ft)", "priceCurrency": "USD", "priceSpecification": { "@type": "PriceSpecification", "minPrice": 120000, "maxPrice": 180000 } },
        { "@type": "Offer", "name": "Premium Turnkey with Shop (2,000–3,000 sq ft)", "priceCurrency": "USD", "priceSpecification": { "@type": "PriceSpecification", "minPrice": 200000, "maxPrice": 350000 } }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "How much does a barndominium cost in Brandon, MS?", "acceptedAnswer": { "@type": "Answer", "text": "Most Brandon and Rankin County area barndos fall between $75–$150 per square foot depending on finishes and site. Call (844) 351-4154 for a free custom estimate on your land." } },
        { "@type": "Question", "name": "How long does it take to build a barndominium?", "acceptedAnswer": { "@type": "Answer", "text": "Typical timeline is 4–8 months from permit to move-in. Steel shells erect in weeks; the interior finish work is what takes the most time." } },
        { "@type": "Question", "name": "Can you combine a shop, garage, and home under one roof?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — that's exactly what we specialize in. Living quarters, workshops, RV bays, and garages all under one steel-frame structure." } },
        { "@type": "Question", "name": "Do you handle permits and site prep?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We pull all permits, schedule inspections, and manage site prep, concrete, plumbing, electrical, and HVAC from start to finish." } },
        { "@type": "Question", "name": "Will you build on my existing land?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. We build on rural and suburban acreage throughout Rankin, Hinds, Simpson, Scott, Smith, and surrounding counties." } },
        { "@type": "Question", "name": "Can I get a loan to build a barndominium in Mississippi?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. USDA Rural Development loans, construction-to-permanent loans, and Farm Credit financing all work for barndominiums in Mississippi, and most local lenders are now familiar with steel-frame residential builds. We recommend working with a lender who knows the area. Bradley Brown provides the draw plans, permits, and builder documentation most lenders require to close." } },
        { "@type": "Question", "name": "What are the zoning requirements for a barndominium in Rankin County, MS?", "acceptedAnswer": { "@type": "Answer", "text": "Barndominiums are permitted in agricultural and residential zones across Rankin County, though setback and minimum square footage rules vary by district. Bradley Brown handles the permit application, submits engineered plans to the county, and coordinates with Rankin County inspectors from slab to final so your build stays compliant." } },
        { "@type": "Question", "name": "How long does it take to build a barndominium from land to move-in?", "acceptedAnswer": { "@type": "Answer", "text": "Plan on 4–8 months for most builds. The engineered steel shell erects in a few weeks once the slab is poured; the finish-out — insulation, drywall, cabinets, electrical, and HVAC — is the variable that depends on your finishes and the weather." } },
        { "@type": "Question", "name": "Are barndominiums harder to insure than traditional homes?", "acceptedAnswer": { "@type": "Answer", "text": "Some carriers initially treat barndominiums as outbuildings, but proper final inspections and a certificate of occupancy usually qualify them for standard homeowner coverage. We recommend contacting a Mississippi-licensed insurer who writes farm-and-ranch policies. Bradley Brown provides the documentation underwriters need to classify the build as a residence." } },
        { "@type": "Question", "name": "Do I need to own land before starting?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Bradley Brown works with clients who already own rural acreage across Rankin, Hinds, Simpson, Scott, Smith, and surrounding counties. If you're still shopping for land, we're happy to walk a parcel with you and flag any site-prep, access, or utility concerns before you close." } },
        { "@type": "Question", "name": "What is the difference between a shell build and a turnkey barndominium?", "acceptedAnswer": { "@type": "Answer", "text": "A shell build is the structure only — slab, steel frame, roof, and exterior — leaving the interior for you to finish. A turnkey barndominium is fully finished and move-in ready, including insulation, drywall, plumbing, electrical, cabinets, and flooring. Bradley Brown offers both, so you choose how much you want us to handle." } }
      ]
    }
  ]
};

const faqs = [
  { question: `How much does a barndominium cost in Brandon, MS?`, answer: `Most Brandon and Rankin County area barndos fall between $75–$150 per square foot depending on finishes and site. Call ${PHONE} for a free custom estimate on your land.` },
  { question: `How long does it take to build?`, answer: `Typical timeline is 4–8 months from permit to move-in. Steel shells erect in weeks; the interior finish work is what takes the most time.` },
  { question: `Can you combine a shop, garage, and home under one roof?`, answer: `Yes — that's exactly what we specialize in. Living quarters, workshops, RV bays, and garages all under one steel-frame structure.` },
  { question: `Do you handle permits and site prep?`, answer: `Yes. We pull all permits, schedule inspections, and manage site prep, concrete, plumbing, electrical, and HVAC from start to finish.` },
  { question: `Will you build on my existing land?`, answer: `Absolutely. We build on rural and suburban acreage throughout Rankin, Hinds, Simpson, Scott, Smith, and surrounding counties.` },
  { question: `Can I get a loan to build a barndominium in Mississippi?`, answer: `Yes. USDA Rural Development loans, construction-to-permanent loans, and Farm Credit financing all work for barndominiums in Mississippi, and most local lenders are now familiar with steel-frame residential builds. We recommend working with a lender who knows the area. Bradley Brown provides the draw plans, permits, and builder documentation most lenders require to close.` },
  { question: `What are the zoning requirements for a barndominium in Rankin County, MS?`, answer: `Barndominiums are permitted in agricultural and residential zones across Rankin County, though setback and minimum square footage rules vary by district. Bradley Brown handles the permit application, submits engineered plans to the county, and coordinates with Rankin County inspectors from slab to final so your build stays compliant.` },
  { question: `How long does it take to build a barndominium from land to move-in?`, answer: `Plan on 4–8 months for most builds. The engineered steel shell erects in a few weeks once the slab is poured; the finish-out — insulation, drywall, cabinets, electrical, and HVAC — is the variable that depends on your finishes and the weather.` },
  { question: `Are barndominiums harder to insure than traditional homes?`, answer: `Some carriers initially treat barndominiums as outbuildings, but proper final inspections and a certificate of occupancy usually qualify them for standard homeowner coverage. We recommend contacting a Mississippi-licensed insurer who writes farm-and-ranch policies. Bradley Brown provides the documentation underwriters need to classify the build as a residence.` },
  { question: `Do I need to own land before starting?`, answer: `Yes. Bradley Brown works with clients who already own rural acreage across Rankin, Hinds, Simpson, Scott, Smith, and surrounding counties. If you're still shopping for land, we're happy to walk a parcel with you and flag any site-prep, access, or utility concerns before you close.` },
  { question: `What is the difference between a shell build and a turnkey barndominium?`, answer: `A shell build is the structure only — slab, steel frame, roof, and exterior — leaving the interior for you to finish. A turnkey barndominium is fully finished and move-in ready, including insulation, drywall, plumbing, electrical, cabinets, and flooring. Bradley Brown offers both, so you choose how much you want us to handle.` },
];

const trackCall = () => {
  base44.analytics.track({ eventName: "phone_click", properties: { source: "barndominium_builder_landing" } });
  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", { send_to: "AW-17864041271/21TJCO2Bj5ccELfGnsZC", value: 30, currency: "USD" });
  }
};

export default function BarndominiumBuilder() {
  return (
    <div className="min-h-screen bg-background pt-16 md:pt-20">
      <SEOHead
        title="Barndominium Builder in Brandon, MS | Built Right the First Time"
        description="Licensed Brandon, MS barndominium builder. Steel-frame homes combining living + workshop, built to last by a contractor trusted since 1995. Free estimates — call (844) 351-4154."
        schema={schema}
        canonical="https://bradleybrowninc.com/barndominium-builder"
      />
      <StickyCallButton />

      {/* Sticky call bar */}
      <div className="sticky top-16 md:top-20 z-40 bg-green-600 text-white py-2.5 px-4 text-center text-sm font-semibold shadow">
        <a href={PHONE_HREF} onClick={trackCall} className="flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" /> Call Now for a Free Barndominium Estimate: {PHONE}
        </a>
      </div>

      {/* ===== HERO — Problem + Outcome headline, CTA above the fold ===== */}
      <section className="relative bg-foreground overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/7b34280a-4da6-4735-a990-074941b06e00/medium')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/70 to-foreground" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-24 text-center">
          <p className="inline-flex items-center gap-1.5 bg-sky-400/20 border border-sky-400/40 text-sky-200 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            <MapPin className="w-3.5 h-3.5" /> Brandon, MS &amp; Rankin County Area
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
            Custom Barndominium Builder in Brandon, MS
          </h1>
          <p className="text-xl md:text-2xl text-sky-300 font-semibold mt-4">
            Built Right the First Time — Living &amp; Workshop, One Roof.
          </p>
          <p className="text-slate-300 mt-5 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Stop chasing contractors who ghost you. We design, permit, and build turnkey steel-frame barndominiums on your land — with the same craftsmanship we've put into 500+ Mississippi homes since 1995.
          </p>

          {/* Primary CTAs above the fold */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={PHONE_HREF}
              onClick={trackCall}
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-base md:text-lg transition-colors shadow-xl"
            >
              <Phone className="w-5 h-5" /> Call {PHONE}
            </a>
            <Link
              to={"/estimate"}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-accent text-white px-8 py-4 rounded-full font-bold text-base md:text-lg transition-colors shadow-xl"
            >
              <Sparkles className="w-5 h-5" /> Get My Free Estimate
            </Link>
          </div>
          <Link to="/ScheduleVisit" className="inline-flex items-center gap-1.5 text-sky-300 hover:text-sky-200 text-sm font-semibold mt-5 underline underline-offset-4">
            Or schedule a free on-site visit →
          </Link>

          {/* Trust bar */}
          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-300">
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-sky-400" /> Licensed &amp; Insured</span>
            <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-sky-400" /> 30+ Years Experience</span>
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> 4.9★ · 87 Reviews</span>
            <span className="flex items-center gap-1.5"><Hammer className="w-4 h-4 text-sky-400" /> 500+ Homes Built</span>
          </div>
        </div>
      </section>

      {/* ===== QUICK VALUE PROP STRIP ===== */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: CheckCircle, title: "On Your Land", desc: "Rural acreage specialists across Rankin, Hinds, Simpson & more." },
            { icon: Clock, title: "4–8 Month Builds", desc: "Fast-track steel shell; turnkey finish on a clear schedule." },
            { icon: Shield, title: "No Surprises", desc: "Fixed written estimates. No change-order games." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-sky-500" />
              </div>
              <div>
                <p className="font-bold text-foreground text-sm">{title}</p>
                <p className="text-slate-500 text-xs leading-snug">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURED PROJECT — PROOF ===== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <div className="text-center mb-8">
          <p className="text-sky-600 font-bold text-sm uppercase tracking-wider mb-2">Featured Barndominium Build</p>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground">One Project. Every Detail.</h2>
          <p className="text-slate-500 mt-2 max-w-xl mx-auto">A real Mississippi barndominium — from the nighttime exterior to the wide-open interior and custom workspace.</p>
        </div>

        {/* Hero featured image */}
        <div className="rounded-2xl overflow-hidden shadow-xl bg-white mb-4">
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src="https://media.base44.com/images/public/699c758479c46f0580553750/106b7349c_nighttime.png"
              alt="Custom barndominium exterior at dusk with warm lighting — built by Bradley Brown Inc. in Brandon, MS"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="p-4 md:p-5">
            <p className="text-sm md:text-base font-semibold text-foreground">Custom Barndominium — Rankin County, MS</p>
            <p className="text-xs text-slate-500 mt-1">Steel-frame construction · stone wainscot · custom wood accents · integrated garage + living quarters</p>
          </div>
        </div>

        {/* Supporting interior shots */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              url: "https://media.base44.com/images/public/699c758479c46f0580553750/345f5b642_barndo.png",
              label: "Open Interior Shell",
              desc: "Exposed steel trusses, polished concrete floors, and flexible living space.",
            },
            {
              url: "https://media.base44.com/images/public/699c758479c46f0580553750/97a6460ae_insidecomputer.png",
              label: "Custom Workspace",
              desc: "Vaulted ceiling with wood beams, barn doors, and natural light — a built-in home office.",
            },
          ].map((p) => (
            <div key={p.url} className="rounded-xl overflow-hidden shadow-md bg-white">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.url} alt={p.label} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-4">
                <p className="text-sm font-bold text-foreground">{p.label}</p>
                <p className="text-xs text-slate-500 mt-1">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Repeated CTA */}
        <div className="mt-8 text-center">
          <Link to={"/estimate"} className="inline-flex items-center gap-2 bg-primary hover:bg-accent text-white px-6 py-3 rounded-full font-bold text-sm transition-colors shadow">
            <Sparkles className="w-4 h-4" /> Price Out My Barndominium
          </Link>
        </div>
      </section>

      {/* ===== TESTIMONIALS — PROOF ===== */}
      <section className="bg-slate-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
          <div className="text-center mb-8">
            <p className="text-sky-600 font-bold text-sm uppercase tracking-wider mb-2">What Our Clients Say</p>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground">Straight From Mississippi Homeowners</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: "Chris B.", loc: "Brandon, MS", quote: "Bradley Brown built our barndo in 6 months — shop, living, and guest suite. Steel shell went up in 3 weeks. No surprises on the final bill." },
              { name: "Sarah &amp; Tom M.", loc: "Pelahatchie, MS", quote: "We got three quotes. Brad was the only one who gave us a fixed written price and stuck to it. Craftsmanship inside is incredible." },
              { name: "Marcus L.", loc: "Rankin Co., MS", quote: "Built exactly what we drew on a napkin. Shop on one end, 2,400 sq ft of house on the other. Worth every dollar." },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-slate-600 text-sm italic leading-relaxed" dangerouslySetInnerHTML={{ __html: `"${t.quote}"` }} />
                <p className="text-xs font-bold text-foreground mt-3" dangerouslySetInnerHTML={{ __html: `— ${t.name}, ${t.loc}` }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OUR PROCESS ===== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <div className="text-center mb-10">
          <p className="text-sky-600 font-bold text-sm uppercase tracking-wider mb-2">Our Process</p>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground">From Bare Land to Move-In Day</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { n: "1", title: "Free Consultation", desc: "We visit your land, talk through your vision (living + shop, size, finishes), and give you a fixed written estimate." },
            { n: "2", title: "Design &amp; Permits", desc: "Custom floor plan, engineered steel package, and all Mississippi permits pulled. No surprises." },
            { n: "3", title: "Build &amp; Move In", desc: "Slab, steel, roof, interior finish — managed under one contractor. Final walk-through, keys, done." },
          ].map((s) => (
            <div key={s.n} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center mb-3">{s.n}</div>
              <h3 className="font-bold text-foreground text-lg" dangerouslySetInnerHTML={{ __html: s.title }} />
              <p className="text-slate-500 text-sm mt-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: s.desc }} />
            </div>
          ))}
        </div>

        {/* Repeated CTA */}
        <div className="mt-10 text-center">
          <a href={PHONE_HREF} onClick={trackCall} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold text-sm transition-colors shadow">
            <Phone className="w-4 h-4" /> Call {PHONE} Now
          </a>
        </div>
      </section>

      {/* ===== PRICING TRANSPARENCY ===== */}
      <section className="bg-foreground py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">Honest Barndominium Pricing</h2>
          <p className="text-slate-300 text-center text-sm mb-8">Typical Central MS ranges — exact price depends on your site &amp; finishes.</p>

          {/* Per-square-foot cost breakdown table */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl mb-6">
            <table className="w-full text-sm md:text-base">
              <thead>
                <tr className="bg-foreground text-white">
                  <th className="text-left p-4 font-semibold">Build Type</th>
                  <th className="text-left p-4 font-semibold">Typical Price Range</th>
                  <th className="text-left p-4 font-semibold">Cost Per Sq Ft</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: "Basic Shell Only", range: "$45,000 – $80,000", psf: "$25 – $35 / sq ft" },
                  { type: "Standard Turnkey (1,200–1,800 sq ft)", range: "$120,000 – $180,000", psf: "$85 – $110 / sq ft" },
                  { type: "Premium Turnkey with Shop (2,000–3,000 sq ft)", range: "$200,000 – $350,000", psf: "$100 – $130 / sq ft" },
                ].map((row, i) => (
                  <tr key={row.type} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="p-4 font-semibold text-foreground">{row.type}</td>
                    <td className="p-4 text-slate-600">{row.range}</td>
                    <td className="p-4 text-sky-600 font-bold">{row.psf}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-slate-400 text-xs mb-8">All estimates are based on Rankin County, MS build conditions as of 2025; call (844) 351-4154 for a site-specific quote.</p>

          {/* Per-sq-ft tiered summary */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
            {[
              { label: "Basic Shell + Rough-In", range: "$75 – $100 / sq ft" },
              { label: "Full Turnkey Barndominium", range: "$100 – $150 / sq ft" },
              { label: "Luxury Finishes &amp; Custom Layouts", range: "$150+ / sq ft" },
            ].map((row, i) => (
              <div key={row.label} className={`flex justify-between items-center p-5 ${i < 2 ? "border-b border-gray-100" : ""}`}>
                <span className="text-sm md:text-base text-foreground font-semibold" dangerouslySetInnerHTML={{ __html: row.label }} />
                <span className="text-sky-600 font-black text-sm md:text-lg">{row.range}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-400 text-xs mt-4">All estimates are free &amp; in writing — no pressure, no obligation.</p>
          <div className="text-center mt-4">
            <Link to="/barndominium-cost-mississippi" className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 text-sm font-semibold underline underline-offset-4">
              See our full barndominium cost breakdown for Mississippi →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== BARNDOMINIUM vs. TRADITIONAL HOME COMPARISON ===== */}
      <BarndominiumComparison />

      {/* ===== FAQ ===== */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <div className="text-center mb-8">
          <p className="text-sky-600 font-bold text-sm uppercase tracking-wider mb-2">Questions</p>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground">Barndominium FAQs</h2>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2 md:p-4">
          <LandingFAQ faqs={faqs} />
        </div>
      </section>

      {/* ===== FINANCING ===== */}
      <BarndominiumFinancing />

      {/* ===== FINAL CTA ===== */}
      <section className="bg-gradient-to-br from-primary to-accent py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
            Ready to Build on Your Land?
          </h2>
          <p className="text-amber-50 mt-3 text-base md:text-lg max-w-xl mx-auto">
            Free estimates. Fixed written prices. Built by a contractor your neighbors already trust.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href={PHONE_HREF} onClick={trackCall} className="flex items-center justify-center gap-2 bg-white text-foreground px-8 py-4 rounded-full font-black text-base md:text-lg shadow-xl hover:bg-slate-100 transition-colors">
              <Phone className="w-5 h-5" /> Call {PHONE}
            </a>
            <Link to={"/estimate"} className="flex items-center justify-center gap-2 bg-foreground hover:bg-black text-white px-8 py-4 rounded-full font-black text-base md:text-lg shadow-xl transition-colors">
              <Sparkles className="w-5 h-5" /> Get My Free Estimate
            </Link>
          </div>
          <Link to={"/estimate"} className="inline-flex items-center gap-1.5 text-white text-sm font-semibold mt-5 underline underline-offset-4 hover:text-amber-100">
            Schedule a free site visit instead
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}