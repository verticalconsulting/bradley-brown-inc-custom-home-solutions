import React from "react";
import { Phone, MapPin, CheckCircle, ChevronRight, Star, Home } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import LandingCTABar from "@/components/landing/LandingCTABar";
import LandingFAQ from "@/components/landing/LandingFAQ";
import StickyCallButton from "@/components/StickyCallButton";
import { base44 } from "@/api/base44Client";
import { usePageImages } from "@/lib/usePageImages";

const faqs = [
  { question: "Is Bradley Brown Inc. based in Brandon, MS?", answer: "We're centrally located in the Brandon/Jackson area of Mississippi, serving a 50-mile radius including Flowood, Pearl, Madison, Ridgeland, and beyond." },
  { question: "What areas do you service?", answer: "We serve all of Rankin, Hinds, and Madison counties — including Brandon, Flowood, Pearl, Richland, Jackson, Madison, Ridgeland, Clinton, and more." },
  { question: "How long have you been remodeling homes in Mississippi?", answer: "Since 2005 — over 20 years of continuous remodeling work in the Brandon and Rankin County area. We've completed countless kitchen, bathroom, addition, and whole-home renovation projects." },
  { question: "What types of remodeling projects do you handle?", answer: "We handle kitchen remodeling, bathroom remodeling, whole-home renovations, room additions, and outdoor living upgrades for homeowners in Brandon, MS and the surrounding Rankin County area." },
  { question: "Are you licensed and insured in Mississippi?", answer: "Absolutely. Bradley Brown Inc. is a licensed Mississippi General Contractor with full liability insurance and workers' comp on every job." },
  { question: "Do you offer free estimates?", answer: "Yes. Call us at (844) 351-4154 or use our online Quote Assistant for a free, no-obligation project estimate." },
];

const testimonials = [
  { name: "Sarah M., Brandon, MS", text: "Bradley Brown remodeled our kitchen in Brandon and the craftsmanship is incredible. 10/10 would recommend.", rating: 5 },
  { name: "James T., Flowood, MS", text: "Renovated our entire kitchen and two bathrooms. On time, on budget, and the quality is outstanding.", rating: 5 },
  { name: "Karen L., Madison, MS", text: "The most professional remodeling contractor we've ever worked with. They treated our home like it was their own.", rating: 5 },
];

const services = [
  { title: "Kitchen Remodeling", desc: "Custom cabinets, countertops, islands, and full kitchen redesigns starting at $25,000." },
  { title: "Bathroom Remodeling", desc: "Master bath overhauls, tile work, vanities, and walk-in showers from $10,000." },
  { title: "Whole-Home Renovation", desc: "Complete interior renovations matching your lifestyle and budget. Get a custom quote." },
  { title: "Energy-Efficient Upgrades", desc: "Insulation, windows, and air-sealing upgrades that lower your utility bills year-round." },
  { title: "Room Additions", desc: "Seamless additions that expand your living space without compromising your home's look." },
  { title: "Outdoor Living", desc: "Patios, decks, pergolas, and outdoor kitchens — perfect for Mississippi living." },
];

const cities = ["Brandon, MS", "Flowood, MS", "Pearl, MS", "Richland, MS", "Jackson, MS", "Madison, MS", "Ridgeland, MS", "Clinton, MS"];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HomeAndConstructionBusiness", name: "Bradley Brown Inc.", telephone: "+18443514154",
      url: "https://bradleybrowninc.com/remodeling-brandon-ms",
      address: { "@type": "PostalAddress", addressLocality: "Brandon", addressRegion: "MS", postalCode: "39042", addressCountry: "US" },
      geo: { "@type": "GeoCoordinates", latitude: 32.2729, longitude: -89.9923 }, priceRange: "$$$",
      areaServed: cities.map(c => ({ "@type": "City", name: c.replace(", MS", ", Mississippi") })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://bradleybrowninc.com" },
        { "@type": "ListItem", position: 2, name: "Brandon MS Home Remodelers", item: "https://bradleybrowninc.com/remodeling-brandon-ms" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(f => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
    },
  ],
};

export default function RemodelingBrandonMS() {
  const handleCall = () => base44.analytics.track({ eventName: "phone_click", properties: { source: "remodeling_brandon_ms" } });
  const { hero: heroImage } = usePageImages("RemodelingBrandonMS");

  return (
    <div className="min-h-screen bg-background pt-16 md:pt-20">
      <SEOHead
        title="Home Remodeling in Brandon, MS | Bradley Brown Inc"
        description="Brandon, MS home remodelers since 2005. Kitchen, bath, room additions & whole-home renovations. Licensed & insured. Call (844) 351-4154."
        schema={schema}
        canonical="https://bradleybrowninc.com/remodeling-brandon-ms"
      />
      <StickyCallButton />

      <div className="sticky top-16 md:top-20 z-40 bg-green-500 text-white py-2 px-4 text-center text-sm font-semibold">
        <a href="tel:+18443514154" onClick={handleCall} className="flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" /> Brandon, MS Home Remodelers — Call: (844) 351-4154
        </a>
      </div>

      <div className="bg-foreground py-14 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: `url('${heroImage?.url || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"}')` }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-sky-400/20 border border-sky-400/40 rounded-full px-3 py-1 mb-3">
            <MapPin className="w-3.5 h-3.5 text-sky-400" /><span className="text-sky-300 text-xs font-medium">Serving Brandon, MS & Rankin County</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">Home Remodeling in Brandon, MS</h1>
          <p className="text-sky-300 mt-2 text-lg md:text-2xl font-semibold">Kitchen, Bath &amp; Whole-Home Renovations</p>
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-base md:text-lg">
            Bradley Brown Inc. provides kitchen remodeling, bathroom remodeling, room additions, whole-home renovations, and outdoor living upgrades for homeowners in Brandon, Rankin County, and Central Mississippi.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+18443514154" onClick={handleCall} className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg">
              <Phone className="w-5 h-5" /> (844) 351-4154
            </a>
            <Link to="/estimate" className="flex items-center justify-center gap-2 bg-primary hover:bg-accent text-white px-8 py-4 rounded-full font-bold text-lg transition-colors">
              Get My Free Estimate <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-14">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Our Service Area</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {cities.map(city => (
              <div key={city} className="flex items-center gap-2 bg-sky-50 border border-sky-100 rounded-lg px-3 py-2 text-sm text-sky-700 font-medium">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" /> {city}
              </div>
            ))}
          </div>
          <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm h-64">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d218083.47153490375!2d-90.24965!3d32.27291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x862834f7b56a0d85%3A0x3f2ac15e9f9d90!2sBrandon%2C%20MS!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Bradley Brown Inc. service area - Brandon, MS" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Remodeling Services in Brandon, MS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map(s => (
              <div key={s.title} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-foreground text-sm">{s.title}</h3>
                  <p className="text-slate-500 text-xs mt-1 leading-snug">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-foreground">Why Brandon, MS Homeowners Choose Bradley Brown Inc.</h2>
          <p className="text-slate-600 leading-relaxed">Since 2005, Bradley Brown Inc. has been the contractor Brandon and Rankin County area homeowners trust for quality remodeling work. Whether you're updating a single bathroom or transforming your entire home, our team brings the same level of craftsmanship and attention to detail to every project.</p>
          <p className="text-slate-600 leading-relaxed">We serve Brandon, Flowood, Pearl, Richland, Madison, Ridgeland, and all of Rankin, Hinds, and Madison counties. Every estimate is free, every quote is transparent, and every project is backed by our quality guarantee.</p>
          <p className="text-slate-600 leading-relaxed">From energy-efficient window replacements to complete kitchen gut-and-rebuilds, we handle it all with licensed tradespeople and a project manager on-site every day. Call us at <a href="tel:+18443514154" onClick={handleCall} className="text-sky-600 font-semibold">(844) 351-4154</a> to schedule your free consultation.</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">What Our Neighbors Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <div className="flex gap-0.5 mb-3">{Array(t.rating).fill(0).map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
                <p className="text-slate-600 text-sm leading-relaxed italic mb-3">"{t.text}"</p>
                <p className="text-xs font-semibold text-slate-500">{t.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-sky-100 rounded-2xl p-6 md:p-8 shadow-sm mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">Specialized Bathroom Remodeling in Brandon</h2>
          <p className="text-slate-600 leading-relaxed mb-5">Looking for a dedicated bathroom remodeling page with local project photos, pricing tiers, and Brandon-specific FAQs? Visit our comprehensive bathroom remodeling landing page.</p>
          <Link to="/bathroom-remodeling-brandon-ms" className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-full font-semibold text-sm transition-colors">
            Bathroom Remodeling in Brandon, MS <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white border border-sky-100 rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">Also Building a Custom Home in Brandon?</h2>
          <p className="text-slate-600 leading-relaxed mb-5">In addition to remodeling, Bradley Brown Inc. builds custom homes and new construction homes throughout Brandon, MS and Rankin County.</p>
          <Link to="/custom-home-builder-brandon-ms" className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-full font-semibold text-sm transition-colors">
            <Home className="w-4 h-4" /> Custom Home Builder in Brandon, MS <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-6 text-center">Frequently Asked Questions</h2>
          <LandingFAQ faqs={faqs} />
        </div>
      </div>

      <LandingCTABar headline="Remodeling in Brandon, MS — Call for a free estimate." />
    </div>
  );
}