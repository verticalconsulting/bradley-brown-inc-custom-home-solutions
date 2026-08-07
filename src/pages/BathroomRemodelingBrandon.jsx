import React from "react";
import { Phone, CheckCircle, ChevronRight, Star, Shield, Award, Clock, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import SEOHead from "@/components/SEOHead";
import StickyCallButton from "@/components/StickyCallButton";
import ServiceStickyCTA from "@/components/ServiceStickyCTA";
import LandingFAQ from "@/components/landing/LandingFAQ";
import { base44 } from "@/api/base44Client";
import { usePageImages } from "@/lib/usePageImages";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";

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
      "url": "https://bradleybrowninc.com/bathroom-remodeling-brandon-ms",
      "address": { "@type": "PostalAddress", "streetAddress": "104 Tiffany Drive", "addressLocality": "Brandon", "addressRegion": "MS", "postalCode": "39042", "addressCountry": "US" },
      "priceRange": "$$",
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "8", "bestRating": "5" }
    },
    {
      "@type": "Service",
      "name": "Bathroom Remodeling",
      "provider": { "@type": "LocalBusiness", "name": "Bradley Brown Inc." },
      "areaServed": { "@type": "City", "name": "Brandon, Mississippi" },
      "description": "Bathroom remodeling and bath renovations in Brandon, MS — walk-in showers, tile work, vanities, and complete bath transformations by a licensed contractor since 2005."
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bradleybrowninc.com" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://bradleybrowninc.com/services" },
        { "@type": "ListItem", "position": 3, "name": "Bathroom Remodeling — Brandon, MS", "item": "https://bradleybrowninc.com/bathroom-remodeling-brandon-ms" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "How much does a bathroom remodel cost in Brandon, MS?", "acceptedAnswer": { "@type": "Answer", "text": "Most bathroom remodels in the Brandon and Rankin County area range from $10,000 to $30,000 depending on size, tile selection, fixtures, and whether plumbing moves. Small bath remodels start around $8,000. Call (844) 351-4154 for a free estimate." } },
        { "@type": "Question", "name": "How long does a bathroom remodel take?", "acceptedAnswer": { "@type": "Answer", "text": "A typical bathroom remodel takes 2–4 weeks from demolition to final inspection. Larger master bath renovations with custom tile work may take 4–6 weeks. We provide a firm timeline before starting." } },
        { "@type": "Question", "name": "Do you handle permits for bathroom remodels in Mississippi?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Any bathroom remodel involving plumbing or electrical changes requires a permit in Mississippi. We handle all permitting and inspections — you don't have to worry about it." } },
        { "@type": "Question", "name": "Can you convert a tub to a walk-in shower?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. Tub-to-shower conversions are one of our most requested projects. We remove the tub, waterproof the area, and install a custom walk-in shower with frameless glass, tile, and a recessed niche." } },
        { "@type": "Question", "name": "Do you serve Madison and Ridgeland, MS?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — we serve Brandon, Madison, Ridgeland, Flowood, Pearl, Clinton, and the entire Rankin and Madison County area." } }
      ]
    }
  ]
};

const faqs = [
  { question: "How much does a bathroom remodel cost in Brandon, MS?", answer: "Most bathroom remodels in the Brandon area range from $10,000–$30,000. Small guest baths start around $8,000, while large master bath renovations with custom tile, steam showers, and premium fixtures can reach $40,000+. We give you a fixed written price before any work starts." },
  { question: "How long does a bathroom remodel take?", answer: "A standard bathroom remodel takes 2–4 weeks. Master bath renovations with extensive tile work or layout changes may take 4–6 weeks. We provide a detailed schedule before demolition so you always know what's happening." },
  { question: "Can you convert my bathtub to a walk-in shower?", answer: "Yes — tub-to-shower conversions are one of our most popular projects. We remove the tub, reconfigure plumbing if needed, waterproof the shower pan, install large-format tile, and finish with a frameless glass enclosure." },
  { question: "Do you handle permits for bathroom remodels?", answer: "Yes. Any bathroom work involving plumbing or electrical changes requires a permit in Mississippi. We pull all permits and schedule inspections — it's included in every project." },
  { question: "What areas do you serve for bathroom remodeling?", answer: "We serve Brandon, Madison, Ridgeland, Flowood, Pearl, Clinton, Richland, and the entire Rankin and Madison County area. If you're within 50 miles of Brandon, MS, we can help." },
  { question: "Do you offer free bathroom remodeling estimates?", answer: "Yes. Call (844) 351-4154 to schedule a free in-home consultation, or use our online Quote Assistant for a quick estimate." },
];

const projects = [
  { img: "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/249ced48-7f89-419a-f51d-80cfdcff5c00/medium", label: "Walk-In Shower Conversion", desc: "Tub removed, curbless walk-in shower with frameless glass and large-format tile — Brandon, MS." },
  { img: "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/d7c80483-87a5-4d63-9866-0029bb6d1300/medium", label: "Large-Format Tile Master Bath", desc: "Floor-to-ceiling porcelain tile, wall-mounted vanity, and recessed niche — Flowood, MS." },
  { img: "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/2bca08e7-738b-4377-7c65-ab5eaf8ae300/herobanner", label: "Modern Vanity & Storage", desc: "Floating vanity, backlit mirror, and custom shelving — maximizing a small bath in Rankin County." },
];

const trackCall = () => {
  base44.analytics.track({ eventName: "phone_click", properties: { source: "bathroom_remodeling_brandon" } });
  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", { send_to: "AW-17864041271/21TJCO2Bj5ccELfGnsZC", value: 30, currency: "USD" });
  }
};

export default function BathroomRemodelingBrandon() {
  const { hero: heroImage } = usePageImages("BathroomRemodelingBrandon");
  const { reviews: googleReviews } = useGoogleReviews();
  return (
    <div className="min-h-screen bg-background pt-16 md:pt-20">
      <SEOHead
        title="Bathroom Remodeling Brandon, MS | Bradley Brown Inc"
        description="Brandon, MS bathroom remodeling. Walk-in showers, tub-to-shower conversions, tile & vanities. Licensed & insured since 2005. Call (844) 351-4154."
        schema={schema}
        canonical="https://bradleybrowninc.com/bathroom-remodeling-brandon-ms"
      />
      <StickyCallButton />

      <div className="sticky top-16 md:top-20 z-40 bg-sky-500 text-white py-2.5 px-4 text-center text-sm font-semibold shadow">
        <a href={PHONE_HREF} onClick={trackCall} className="flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" /> Free Bathroom Remodel Estimate: {PHONE}
        </a>
      </div>

      {/* HERO */}
      <section className="relative bg-foreground overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('${heroImage?.url || "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&q=80"}')` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/70 to-foreground" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-24 text-center">
          <p className="inline-flex items-center gap-1.5 bg-sky-400/20 border border-sky-400/40 text-sky-200 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            <MapPin className="w-3.5 h-3.5" /> Brandon, MS &amp; Rankin County
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
            Bathroom Remodeling in Brandon, MS
          </h1>
          <p className="text-xl md:text-2xl text-sky-300 font-semibold mt-4">
            Your Bathroom, Completely Transformed — Built to Last.
          </p>
          <p className="text-slate-300 mt-5 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Walk-in showers, tub-to-shower conversions, custom tile, and complete bath renovations — from the contractor Brandon homeowners have trusted for 20+ years. Licensed, insured, and obsessed with the details.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href={PHONE_HREF} onClick={trackCall} className="flex items-center justify-center gap-2 bg-sky-400 hover:bg-sky-500 text-white px-8 py-4 rounded-full font-bold text-base md:text-lg transition-colors shadow-xl">
              <Phone className="w-5 h-5" /> Call {PHONE}
            </a>
            <Link to={"/estimate"} className="flex items-center justify-center gap-2 bg-primary hover:bg-accent text-white px-8 py-4 rounded-full font-bold text-base md:text-lg transition-colors shadow-xl">
              <Sparkles className="w-5 h-5" /> Get My Free Estimate
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-300">
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-sky-400" /> Licensed &amp; Insured</span>
            <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-sky-400" /> 20+ Years Experience</span>
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> 5.0★ · 8 Reviews</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-sky-400" /> 200+ Baths Remodeled</span>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: CheckCircle, title: "Fixed Written Price", desc: "No change-order surprises. You know the cost before we start." },
            { icon: Clock, title: "2–4 Week Timelines", desc: "Most baths done in 2–4 weeks. We give you a firm schedule." },
            { icon: Shield, title: "Waterproofed Right", desc: "Proper pan, membrane, and slope — no leaks, ever." },
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

      {/* PROJECT GALLERY */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <div className="text-center mb-8">
          <p className="text-sky-600 font-bold text-sm uppercase tracking-wider mb-2">Recent Bathroom Remodels</p>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground">Real Bath Renovations in Central Mississippi</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projects.map((p) => (
            <div key={p.label} className="rounded-xl overflow-hidden shadow-md bg-white">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.img} alt={p.label} width="400" height="300" loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <p className="text-sm font-bold text-foreground">{p.label}</p>
                <p className="text-xs text-slate-500 mt-1">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BODY COPY */}
      <section className="bg-slate-50 border-y border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 prose prose-slate">
          <h2 className="text-2xl font-bold text-foreground">Your Brandon, MS Bath Remodeler</h2>
          <p className="text-slate-600 leading-relaxed">Since 2005, Bradley Brown Inc. has been the bathroom remodeler Brandon, MS homeowners call when they want it done right. We've remodeled 200+ bathrooms across Rankin and Madison County — from compact guest baths to sprawling master suites.</p>
          <p className="text-slate-600 leading-relaxed">Every bathroom remodel includes proper waterproofing (pan, membrane, and slope), licensed plumbing and electrical work, and permits pulled and inspected. We handle tile selection, vanity and fixture sourcing, and the final punch list — one contractor, no finger-pointing.</p>
          <p className="text-slate-600 leading-relaxed">Whether you're converting a tub to a walk-in shower, updating a master bath with floor-to-ceiling tile, or renovating a small guest bathroom, we bring the same craftsmanship and project management that built our reputation across Central Mississippi. Call <a href={PHONE_HREF} onClick={trackCall} className="text-sky-600 font-semibold">{PHONE}</a> to schedule your free in-home consultation.</p>
        </div>
      </section>

      {/* PROCESS */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <div className="text-center mb-10">
          <p className="text-sky-600 font-bold text-sm uppercase tracking-wider mb-2">Our Process</p>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground">From Old Bath to Beautiful</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { n: "1", title: "Free Consultation", desc: "We visit your home, measure the space, and talk through your vision — shower vs. tub, tile style, vanity, budget. You get a fixed written estimate." },
            { n: "2", title: "Design &amp; Permits", desc: "We finalize the layout, source tile and fixtures, and pull all Mississippi permits. You approve everything before demolition." },
            { n: "3", title: "Build &amp; Enjoy", desc: "Demo, waterproofing, plumbing, tile, fixtures, and final punch list — managed by one project manager. Typical timeline: 2–4 weeks." },
          ].map((s) => (
            <div key={s.n} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center mb-3">{s.n}</div>
              <h3 className="font-bold text-foreground text-lg" dangerouslySetInnerHTML={{ __html: s.title }} />
              <p className="text-slate-500 text-sm mt-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: s.desc }} />
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-foreground py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">Bathroom Remodel Pricing</h2>
          <p className="text-slate-300 text-center text-sm mb-8">Typical Brandon, MS ranges — your estimate is always free and in writing.</p>
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
            {[
              { label: "Small / Guest Bathroom Remodel", range: "$8,000 – $15,000" },
              { label: "Standard Master Bath Remodel", range: "$15,000 – $30,000" },
              { label: "Luxury Master Suite with Custom Tile", range: "$30,000+" },
            ].map((row, i) => (
              <div key={row.label} className={`flex justify-between items-center p-5 ${i < 2 ? "border-b border-gray-100" : ""}`}>
                <span className="text-sm md:text-base text-foreground font-semibold">{row.label}</span>
                <span className="text-sky-600 font-black text-sm md:text-lg">{row.range}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-400 text-xs mt-4">All estimates are free &amp; in writing — no pressure, no obligation.</p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-slate-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
          <div className="text-center mb-8">
            <p className="text-sky-600 font-bold text-sm uppercase tracking-wider mb-2">What Our Clients Say</p>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground">From Mississippi Homeowners</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {(googleReviews.length > 0 ? googleReviews.map((r) => ({ name: r.author_name, loc: "Google Review", quote: r.text })) : [
              { name: "Jennifer R.", loc: "Flowood, MS", quote: "They remodeled our master bath — it looks like a spa. Frameless glass shower, heated floors, custom vanity. Finished in 3 weeks and on budget." },
              { name: "David &amp; Lisa K.", loc: "Brandon, MS", quote: "Converted our old tub to a walk-in shower. Best decision we made for this house. The tile work is flawless and the crew was clean and professional." },
              { name: "Marcus L.", loc: "Madison, MS", quote: "Bradley Brown remodeled our guest bath and powder room. Fixed pricing, showed up every day, and the finish work is incredible." },
            ]
            ).map((t) => (
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

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <div className="text-center mb-8">
          <p className="text-sky-600 font-bold text-sm uppercase tracking-wider mb-2">Questions</p>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground">Bathroom Remodeling FAQs</h2>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2 md:p-4">
          <LandingFAQ faqs={faqs} />
        </div>
        <div className="mt-8 bg-slate-50 border border-gray-200 rounded-xl p-5">
          <h3 className="font-bold text-foreground text-sm mb-3">Related Pages</h3>
          <div className="flex flex-wrap gap-2">
            <Link to={"/protips/small-bathroom-ideas"} className="inline-flex items-center gap-1 bg-white border border-gray-200 text-sky-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-sky-50 transition-colors">
              <ChevronRight className="w-3 h-3" /> Small Bathroom Remodeling Ideas
            </Link>
            <Link to={"/services"} className="inline-flex items-center gap-1 bg-white border border-gray-200 text-sky-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-sky-50 transition-colors">
              <ChevronRight className="w-3 h-3" /> All Services
            </Link>
            <Link to="/services/bathroom-remodeling" className="inline-flex items-center gap-1 bg-white border border-gray-200 text-sky-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-sky-50 transition-colors">
              <ChevronRight className="w-3 h-3" /> Bathroom Remodeling Service
            </Link>
            <Link to={"/estimate"} className="inline-flex items-center gap-1 bg-white border border-gray-200 text-sky-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-sky-50 transition-colors">
              <ChevronRight className="w-3 h-3" /> Get a Free Quote
            </Link>
            <Link to="/madison-ms-home-remodeling" className="inline-flex items-center gap-1 bg-white border border-gray-200 text-sky-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-sky-50 transition-colors">
              <ChevronRight className="w-3 h-3" /> Madison, MS Home Remodeling
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-br from-primary to-accent py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
            Ready to Remodel Your Bathroom?
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
          <Link to={"/schedulevisit"} className="inline-flex items-center gap-1.5 text-white text-sm font-semibold mt-5 underline underline-offset-4 hover:text-amber-100">
            Schedule a free site visit instead
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
      <ServiceStickyCTA source="bathroom_remodeling_brandon" label="Get a Free Quote" />
    </div>
  );
}