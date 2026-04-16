import React, { useState } from "react";
import SEOHead from "@/components/SEOHead";
import { servicesSchema } from "@/components/seoSchemas";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, Wrench, Plus, Leaf, Check, ChevronRight, Phone, Tag, Star, Sparkles, Clock, Shield, Award, ChevronDown } from "lucide-react";
import { base44 } from "@/api/base44Client";

const services = [
{
  icon: Home,
  color: "sky",
  name: "Custom Home Building",
  tagline: "Your vision. Our craftsmanship. Built to last generations.",
  description: "From the first blueprint to the final walkthrough, we manage every detail of your custom home build. Our team has delivered 500+ dream homes across Central Mississippi — on time, on budget, and built to exceed expectations.",
  benefits: [
  "One point of contact from design to move-in",
  "Transparent pricing — no hidden surprises",
  "Premium materials at competitive costs",
  "Energy-efficient building practices",
  "Industry-leading workmanship warranty",
  "Post-build support for peace of mind"],

  features: ["Full architectural consultation", "Custom floor plans", "Premium material selection", "Regular progress updates", "Industry-leading warranty", "Post-build support"],
  image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
  price: "Starting at $250,000",
  testimonial: {
    text: "Bradley Brown built our custom home in Brandon and the craftsmanship is absolutely incredible. They kept us informed every step of the way. We couldn't be happier!",
    author: "Sarah & Tom M.",
    location: "Brandon, MS"
  },
  faq: [
  { q: "How long does a custom home build take?", a: "Typically 8–14 months depending on size and complexity. We provide a detailed project timeline before breaking ground." },
  { q: "Can I make changes during construction?", a: "Yes — we use a change order process to handle modifications while keeping the project on track and within budget." }]

},
{
  icon: Wrench,
  color: "indigo",
  name: "Home Renovations & Remodeling",
  tagline: "Transform your existing home into the space you've always wanted.",
  description: "Whether it's a full home remodel, kitchen overhaul, or bathroom transformation, our team delivers exceptional craftsmanship at every stage. We've renovated hundreds of Mississippi homes — bringing modern style, better function, and lasting value.",
  benefits: [
  "Kitchen & bath specialists since 1995",
  "We handle all permits & inspections",
  "Minimal disruption to your daily routine",
  "Licensed electricians & plumbers on staff",
  "Custom cabinetry & finish carpentry",
  "Increased home resale value"],

  features: ["Kitchen & bath remodels", "Whole-home renovations", "Flooring & tile work", "Electrical & plumbing updates", "Custom cabinetry", "Painting & trim work"],
  image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
  price: "Starting at $15,000",
  testimonial: {
    text: "They remodeled our kitchen and master bath — it looks like a completely different house. The team was professional, clean, and finished on schedule. 10/10!",
    author: "Jennifer R.",
    location: "Flowood, MS"
  },
  faq: [
  { q: "How long does a kitchen remodel take?", a: "Typically 4–8 weeks depending on scope. We give you a realistic timeline upfront." },
  { q: "Do you handle permits?", a: "Yes — we pull all required permits and handle inspections so you don't have to." }]

},
{
  icon: Plus,
  color: "emerald",
  name: "Room Additions & Home Office Remodel",
  tagline: "More space, more possibilities — without moving.",
  description: "Need more room? We design and build additions that blend seamlessly with your existing home's architecture — from master suite additions and in-law suites to sunrooms and dedicated home offices. Stay in the home you love, just with more of it.",
  benefits: [
  "Seamless architectural integration",
  "Adds significant resale value",
  "Home office & bonus room specialists",
  "In-law suite & multigenerational designs",
  "Garage conversion experts",
  "Full permitting & code compliance"],

  features: ["Master suite additions", "Family room expansions", "Sunroom construction", "In-law suites", "Garage conversions", "Home office remodels"],
  image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  price: "Starting at $5,000",
  testimonial: {
    text: "We added a mother-in-law suite and a home office. Bradley Brown matched the brick and roofline perfectly — you'd never know it wasn't original to the house.",
    author: "Marcus & Dana L.",
    location: "Madison, MS"
  },
  faq: [
  { q: "Will an addition match my existing home?", a: "Absolutely — we match materials, rooflines, and finishes so the addition looks like it was always there." },
  { q: "Can I add a home office to my existing floor plan?", a: "Yes. We specialize in garage conversions, bonus room finishing, and purpose-built home office additions." }]

},
{
  icon: Leaf,
  color: "green",
  name: "Outdoor Living Spaces & Decks",
  tagline: "Mississippi's climate is made for outdoor living — let's build yours.",
  description: "We design and build beautiful outdoor spaces — from covered patios to full outdoor kitchens and custom decks — that extend your home's footprint and enhance your lifestyle year-round. Perfect for entertaining, relaxing, or enjoying Central Mississippi's beautiful weather.",
  benefits: [
  "Year-round outdoor entertaining spaces",
  "Covered porches to beat Mississippi heat",
  "Full outdoor kitchens & BBQ stations",
  "Custom decks & pergolas built to last",
  "Pool surrounds & landscape integration",
  "Outdoor lighting & electrical systems"],

  features: ["Covered patios & porches", "Outdoor kitchens", "Decks & pergolas", "Pool surrounds", "Landscape integration", "Outdoor lighting systems"],
  image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
  price: "Starting at $10,000",
  testimonial: {
    text: "Our new covered porch with an outdoor kitchen is the best investment we've ever made. The whole family lives out there on weekends. Absolutely beautiful work.",
    author: "Chris & Amy B.",
    location: "Pearl, MS"
  },
  faq: [
  { q: "What's the most popular outdoor project in Mississippi?", a: "Covered back porches with outdoor kitchens — perfect for year-round entertaining in Central Mississippi's climate." },
  { q: "Do decks need permits in Mississippi?", a: "Most decks over a certain size do. We handle all permits and inspections." }]

}];


const colorMap = {
  sky: { icon: "bg-sky-50 text-sky-500", badge: "bg-sky-100 text-sky-700", btn: "bg-sky-500 hover:bg-sky-600", check: "text-sky-500", border: "border-sky-200" },
  indigo: { icon: "bg-indigo-50 text-indigo-500", badge: "bg-indigo-100 text-indigo-700", btn: "bg-indigo-500 hover:bg-indigo-600", check: "text-indigo-500", border: "border-indigo-200" },
  emerald: { icon: "bg-emerald-50 text-emerald-500", badge: "bg-emerald-100 text-emerald-700", btn: "bg-emerald-500 hover:bg-emerald-600", check: "text-emerald-500", border: "border-emerald-200" },
  green: { icon: "bg-green-50 text-green-600", badge: "bg-green-100 text-green-700", btn: "bg-green-600 hover:bg-green-700", check: "text-green-500", border: "border-green-200" }
};

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 text-left text-sm font-semibold text-[#1E2D3D] hover:text-sky-600 transition-colors">
        
        {q}
        <ChevronDown className={`w-4 h-4 flex-shrink-0 ml-2 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="pb-3 text-sm text-slate-500 leading-relaxed">{a}</p>}
    </div>);

}

export default function Services() {
  const handleCallClick = () => {
    base44.analytics.track({ eventName: "phone_click", properties: { source: "services_page" } });
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', { send_to: 'AW-17864041271/21TJCO2Bj5ccELfGnsZC', value: 30, currency: 'USD' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      <SEOHead
        title="Expert Home Remodeling Services in Brandon, MS | Bradley Brown Inc"
        description="Expert home remodeling services in Brandon, MS — kitchen remodeling, bathroom renovations, room additions & custom homes. Licensed & insured since 1995. Free estimates. Call (844) 351-4154."
        schema={servicesSchema}
        canonical="https://bradleybrowninc.com/Services" />
      

      {/* Mobile click-to-call */}
      <div className="md:hidden sticky top-16 z-40 bg-green-500 text-white py-2.5 px-4 text-center text-sm font-semibold">
        <a href="tel:+18443514154" onClick={handleCallClick} className="flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" /> Call for a Free Estimate: (844) 351-4154
        </a>
      </div>

      {/* Hero */}
      <div className="bg-[#1E2D3D] py-14 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 bg-sky-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-400 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative">
          <p className="text-sky-400 font-semibold text-sm uppercase tracking-wider mb-3">Brandon, MS & Central Mississippi</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Expert Home Remodeling &<br className="hidden md:block" /> Construction Services
          </h1>
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Licensed, insured, and trusted since 1995. From custom homes to kitchen remodels, we bring Central Mississippi homeowners' visions to life — on time and on budget.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={createPageUrl("QuoteAssistant")}
              className="inline-flex items-center justify-center gap-2 bg-[#C4922A] hover:bg-[#A37820] text-white px-8 py-4 rounded-full font-bold text-base transition-colors shadow-lg">
              
              <Sparkles className="w-5 h-5" /> Get an AI Estimate — Free
            </Link>
            <a href="tel:+18443514154" onClick={handleCallClick} className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-base transition-colors">
              <Phone className="w-5 h-5" /> (844) 351-4154
            </a>
          </div>
          {/* Trust bar */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-sky-400" /> Licensed & Insured</span>
            <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-sky-400" /> 30+ Years Experience</span>
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> 4.9★ Rated</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-sky-400" /> 500+ Homes Built</span>
          </div>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="bg-amber-400 py-4 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-amber-900 flex-shrink-0" />
            <p className="font-bold text-amber-900 text-base md:text-lg">
              Special Offer: <span className="underline decoration-2">10% OFF</span> Your Kitchen Remodel
            </p>
          </div>
          <span className="hidden sm:block text-amber-700">|</span>
          <p className="text-amber-800 text-sm font-medium">Show us this ad when you call to claim your discount.</p>
          <a href="tel:+18443514154" onClick={handleCallClick} className="flex-shrink-0 bg-amber-900 hover:bg-amber-950 text-white px-5 py-2 rounded-full text-sm font-bold transition-colors">
            Call to Claim →
          </a>
        </div>
      </div>

      {/* Services */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-20">
        <div className="space-y-20 md:space-y-28">
          {services.map((service, i) => {
            const Icon = service.icon;
            const colors = colorMap[service.color];
            const isEven = i % 2 === 0;

            return (
              <div key={i} className="scroll-mt-24" id={service.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                  {/* Text */}
                  <div className={isEven ? "order-1" : "order-1 md:order-2"}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colors.icon}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">{service.tagline}</p>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1E2D3D] mb-4">{service.name}</h2>
                    <p className="text-slate-500 leading-relaxed mb-6">{service.description}</p>

                    {/* Benefits */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                      {service.benefits.map((benefit) =>
                      <li key={benefit} className="flex items-start gap-2 text-sm text-slate-700">
                          <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${colors.check}`} /> {benefit}
                        </li>
                      )}
                    </ul>

                    {/* Testimonial */}
                    <div className={`border-l-4 rounded-r-xl bg-slate-50 p-4 mb-6 ${colors.border}`}>
                      <div className="flex gap-0.5 mb-2">
                        {[...Array(5)].map((_, si) => <Star key={si} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                      </div>
                      <p className="text-sm text-slate-600 italic leading-relaxed">"{service.testimonial.text}"</p>
                      <p className="text-xs font-semibold text-slate-500 mt-2">— {service.testimonial.author}, {service.testimonial.location}</p>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-slate-400 text-sm font-medium">{service.price}</span>
                      <Link
                        to={createPageUrl("QuoteAssistant")}
                        className={`inline-flex items-center gap-1.5 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${colors.btn}`}>
                        
                        <Sparkles className="w-4 h-4" /> Get AI Estimate
                      </Link>
                      <Link
                        to={createPageUrl("ContactForm")}
                        className="inline-flex items-center gap-1.5 border border-gray-300 text-slate-600 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                        
                        Contact Us <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Image + FAQ */}
                  <div className={isEven ? "order-2" : "order-2 md:order-1"}>
                    <div className="rounded-2xl overflow-hidden shadow-xl mb-5">
                      <img
                        src={service.image}
                        alt={`${service.name} in Brandon MS by Bradley Brown Inc.`}
                        className="w-full h-72 md:h-96 object-cover"
                        loading="lazy"
                      />
                    </div>
                    {service.faq &&
                    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                        <h3 className="font-bold text-[#1E2D3D] text-sm mb-3 flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${colors.btn.split(" ")[0]}`} />
                          Common Questions
                        </h3>
                        {service.faq.map((f, fi) => <FAQItem key={fi} q={f.q} a={f.a} />)}
                      </div>
                    }
                  </div>
                </div>
              </div>);

          })}
        </div>

        {/* Mid-page AI Estimator CTA */}
        <div className="mt-20 bg-gradient-to-br from-[#1E2D3D] to-[#2a3f56] rounded-3xl p-8 md:p-12 text-center text-white shadow-xl">
          <div className="inline-flex items-center gap-2 bg-[#C4922A]/20 border border-[#C4922A]/40 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="w-4 h-4 text-[#C4922A]" />
            <span className="text-[#F5D78E] text-sm font-semibold">AI-Powered Estimation</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Not Sure What Your Project Will Cost?</h2>
          <p className="text-slate-300 max-w-xl mx-auto mb-8 text-base leading-relaxed">
            Answer a few quick questions and our AI estimator gives you a personalized cost range in seconds — completely free, no commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={createPageUrl("QuoteAssistant")}
              className="inline-flex items-center justify-center gap-2 bg-[#C4922A] hover:bg-[#A37820] text-white px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg">
              
              <Sparkles className="w-5 h-5" /> Try the AI Estimator — Free
            </Link>
            <a href="tel:+18443514154" onClick={handleCallClick} className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors">
              <Phone className="w-5 h-5" /> Prefer to Talk? Call Us
            </a>
          </div>
        </div>

        {/* Related links */}
        <div className="mt-12 bg-sky-50 border border-sky-100 rounded-2xl p-6 md:p-8">
          <h2 className="text-lg font-bold text-[#1E2D3D] mb-4">Explore More</h2>
          <div className="flex flex-wrap gap-3">
            {[
            { label: "Schedule a Site Visit", page: "ScheduleVisit" },
            { label: "View Our Portfolio", page: "Portfolio" },
            { label: "Pro Tips & Remodeling Advice", page: "ProTips" },
            { label: "Why Trust Us", page: "LandingTrust" },
            { label: "Pricing Guide", page: "LandingPricing" },
            { label: "Contact Us", page: "Contact" }].
            map((link) =>
            <Link key={link.page} to={createPageUrl(link.page)} className="inline-flex items-center gap-1.5 bg-white border border-sky-200 text-sky-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-sky-100 transition-colors">
                <ChevronRight className="w-3.5 h-3.5" /> {link.label}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-[#1E2D3D] py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to Start Your Project?</h2>
          <p className="text-slate-300 mb-8 text-base">Join 500+ Mississippi homeowners who've trusted Bradley Brown Inc. with their most important investment — their home.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("QuoteAssistant")} className="inline-flex items-center justify-center gap-2 bg-[#C4922A] hover:bg-[#A37820] text-white px-8 py-4 rounded-full font-bold text-base transition-colors shadow-lg">
              <Sparkles className="w-5 h-5" /> Get My Free AI Estimate
            </Link>
            <a href="tel:+18443514154" onClick={handleCallClick} className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-base transition-colors">
              <Phone className="w-5 h-5" /> Call (844) 351-4154
            </a>
          </div>
        </div>
      </div>
    </div>);

}