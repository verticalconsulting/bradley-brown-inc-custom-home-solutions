import React from "react";
import { Phone, ChevronRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import SEOHead from "@/components/SEOHead";
import LandingCTABar from "@/components/landing/LandingCTABar";
import LandingFAQ from "@/components/landing/LandingFAQ";
import { base44 } from "@/api/base44Client";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      "name": "Bradley Brown Inc.",
      "telephone": "+16019541306",
      "address": { "@type": "PostalAddress", "addressLocality": "Brandon", "addressRegion": "MS", "postalCode": "39042", "addressCountry": "US" }
    },
    {
      "@type": "Article",
      "headline": "Small Bathroom Remodeling Ideas That Actually Work",
      "author": { "@type": "Organization", "name": "Bradley Brown Inc." },
      "publisher": { "@type": "Organization", "name": "Bradley Brown Inc." },
      "description": "Practical small bathroom remodeling tips and ideas from Central Mississippi's trusted remodeler."
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bradleybrowninc.com" },
        { "@type": "ListItem", "position": 2, "name": "Pro Tips", "item": "https://bradleybrowninc.com/ProTips" },
        { "@type": "ListItem", "position": 3, "name": "Small Bathroom Remodeling Ideas", "item": "https://bradleybrowninc.com/SmallBathroomIdeas" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "How much does a small bathroom remodel cost in Mississippi?", "acceptedAnswer": { "@type": "Answer", "text": "Most small bathroom remodels in Central Mississippi run $8,000–$20,000 depending on tile choice, fixtures, and whether plumbing needs to move. Call us at (601) 954-1306 for a free estimate." } },
        { "@type": "Question", "name": "Can a small bathroom feel bigger without tearing it down?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely — large-format tile, frameless glass showers, wall-mounted vanities, and strategic mirrors can make even a 50 sq ft bathroom feel spacious." } }
      ]
    }
  ]
};

const faqs = [
  { question: "How much does a small bathroom remodel cost in Mississippi?", answer: "Most small bathroom remodels in Central Mississippi run $8,000–$20,000. The cost depends on tile choice, fixtures, vanity size, and whether plumbing needs to move. Call (601) 954-1306 for a free, no-obligation estimate specific to your bathroom." },
  { question: "Can a small bathroom feel bigger without expanding it?", answer: "Yes. Large-format tile (fewer grout lines = more visual space), frameless glass showers, wall-mounted vanities, and well-placed mirrors are our top tricks for making small baths feel larger — no demolition of walls required." },
  { question: "How long does a small bathroom remodel take?", answer: "A typical small bath remodel takes 2–4 weeks from demo to finish. Custom tile work or special-order fixtures can extend the timeline. We'll give you a firm schedule before we start." },
  { question: "Should I keep the existing plumbing layout to save money?", answer: "Generally yes — moving plumbing adds $1,500–$4,000+ to a project. We work with your existing layout wherever possible. If moving a fixture dramatically improves function, we'll show you the cost difference so you can decide." },
  { question: "Do you handle permits for bathroom remodels in Brandon, MS?", answer: "Yes. Any work involving plumbing or electrical changes requires a permit in Mississippi. We handle all permitting and inspections — you don't have to worry about it." },
];

const ideas = [
  {
    title: "1. Go Full Walk-In Shower (No Tub)",
    body: "Eliminating the bathtub is the single best square-footage move in a small bathroom. A curbless, walk-in shower with large-format tile and a frameless glass panel makes the space feel 2x bigger. If it's not your only bathroom, remove the tub. We see this upgrade regularly in Brandon and Flowood homes and homeowners never look back.",
    img: "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/249ced48-7f89-419a-f51d-80cfdcff5c00/large",
    alt: "Walk-in shower in a small bathroom remodel by Bradley Brown Inc., Brandon MS"
  },
  {
    title: "2. Use Large-Format Tile — 24×24 or Larger",
    body: "Small tile = more grout lines = smaller-looking room. Large-format porcelain tile (24×24 or even 12×24 laid horizontally) reduces visual noise and tricks the eye into perceiving more space. Use the same tile on the floor and into the shower for a seamless, spa-like feel. We source tiles at wholesale pricing for our clients.",
    img: "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/d7c80483-87a5-4d63-9866-0029bb6d1300/large",
    alt: "Large format tile bathroom renovation in Central Mississippi"
  },
  {
    title: "3. Wall-Mounted Vanity + Floating Storage",
    body: "A wall-hung vanity with 8–12 inches of clearance below it gives the eye a clear path across the floor, making the room appear wider. Pair it with open floating shelves (instead of a medicine cabinet that juts out) to maximize vertical space without closing the room in.",
    img: "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/1cdab79b-f084-4cfb-de1e-0727c2bd9700/logo",
    alt: "Wall mounted vanity small bathroom remodel Brandon Mississippi"
  },
  {
    title: "4. Extend Tile to the Ceiling in the Shower",
    body: "Stopping tile at shoulder height creates a visual 'cap' that makes the room feel shorter. Running tile all the way to the ceiling draws the eye up, adds drama, and makes the shower feel like a luxury spa. For a small bathroom, this is one of the highest-impact, lowest-cost decisions you can make.",
    img: "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/1cdab79b-f084-4cfb-de1e-0727c2bd9700/logo",
    alt: "Floor to ceiling tile bathroom renovation Mississippi"
  },
  {
    title: "5. Strategic Mirror Placement",
    body: "A large mirror (or mirrored medicine cabinet with frameless edge) spanning the full width above the vanity reflects light and doubles the perceived depth of the room. For an extra-tight space, a mirror on a side wall — angled slightly — can make the room feel 30–40% larger visually.",
    img: "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/e1e04d36-a036-486c-14c3-ec07cc111500/logo",
    alt: "Large mirror bathroom remodeling idea for small bathrooms"
  },
  {
    title: "6. Recessed Niches Instead of Shower Shelves",
    body: "Stick-out shower shelves or caddies eat into your standing space. A recessed niche (cut between studs during construction) gives you all the storage with zero intrusion into the shower footprint. We build these into every shower we tile — they're inexpensive to add during a remodel and look incredibly polished.",
    img: "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/b859f7f3-7950-4d17-e5cb-a2936ba53b00/large",
    alt: "Recessed shower niche built by Bradley Brown Inc."
  },
];

export default function SmallBathroomIdeas() {
  const handleCall = () => base44.analytics.track({ eventName: "phone_click", properties: { source: "small_bathroom_page" } });

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-16 md:pt-20">
      <SEOHead
        title="Small Bathroom Remodeling Ideas — Brandon, MS | Bradley Brown Inc"
        description="6 practical small bathroom remodeling ideas from Central Mississippi's trusted contractor. Walk-in showers, large-format tile & more. Call (601) 954-1306."
        schema={schema}
      />

      {/* Hero */}
      <div className="bg-[#1E2D3D] py-12 md:py-18">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sky-400 text-xs font-semibold uppercase tracking-wider mb-2">Pro Tips · Bathroom Remodeling</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Small Bathroom Remodeling Ideas That Actually Work
          </h1>
          <p className="text-slate-300 mt-4 text-base max-w-xl mx-auto">
            Practical, contractor-tested ideas for maximizing a small bathroom — from Brandon, MS's trusted remodeling team.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+16019541306" onClick={handleCall} className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold text-sm transition-colors">
              <Phone className="w-4 h-4" /> Call (601) 954-1306
            </a>
            <Link to={createPageUrl("QuoteAssistant")} className="inline-flex items-center justify-center gap-2 bg-sky-400 hover:bg-sky-500 text-white px-6 py-3 rounded-full font-bold text-sm transition-colors">
              Free Estimate <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-14">

        {/* Intro */}
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 leading-relaxed text-base">A small bathroom doesn't have to feel small. After 30+ years of remodeling homes across Central Mississippi, our team at Bradley Brown Inc. has learned exactly which changes deliver the biggest visual and functional impact per dollar spent. Whether you're working with a 50 sq ft guest bath or a tight master ensuite, these six ideas will transform what you've got.</p>
        </div>

        {/* Ideas */}
        <div className="space-y-12">
          {ideas.map((idea, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <img src={idea.img} alt={idea.alt} loading="lazy" className="w-full h-52 object-cover" width="600" height="400" />
              <div className="p-6">
                <h2 className="text-lg font-bold text-[#1E2D3D] mb-2">{idea.title}</h2>
                <p className="text-slate-600 text-sm leading-relaxed">{idea.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mid-page CTA */}
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-6 text-center">
          <p className="font-bold text-[#1E2D3D] mb-2">Ready to remodel your bathroom in Brandon, MS?</p>
          <p className="text-slate-500 text-sm mb-4">Call us for a free, no-obligation estimate. We serve Brandon, Flowood, Pearl, Madison, Ridgeland, and all of Central Mississippi.</p>
          <a href="tel:+16019541306" onClick={handleCall} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold text-sm transition-colors">
            <Phone className="w-4 h-4" /> (601) 954-1306
          </a>
        </div>

        {/* Checklist */}
        <div>
          <h2 className="text-xl font-bold text-[#1E2D3D] mb-4">Quick Checklist: Before You Start</h2>
          <div className="space-y-2">
            {[
              "Set a realistic budget (small bath remodels: $8K–$20K in Central MS)",
              "Decide whether to keep the existing plumbing layout (saves $1,500–$4,000)",
              "Choose large-format tile (24×24 or 12×24) to maximize perceived space",
              "Plan for a recessed niche in the shower during framing",
              "Order fixtures early — long lead times can delay your project",
              "Get permits pulled before any plumbing or electrical work begins",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm text-slate-600">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
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
              { label: "All Remodeling Services", page: "Services" },
              { label: "Get a Free Quote", page: "QuoteAssistant" },
              { label: "Schedule a Site Visit", page: "ScheduleVisit" },
              { label: "More Pro Tips", page: "ProTips" },
              { label: "Contact Us", page: "Contact" },
            ].map((link) => (
              <Link key={link.page} to={createPageUrl(link.page)} className="inline-flex items-center gap-1 bg-white border border-gray-200 text-sky-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-sky-50 transition-colors">
                <ChevronRight className="w-3 h-3" /> {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <LandingCTABar headline="Ready to transform your bathroom? Let's talk." />
    </div>
  );
}