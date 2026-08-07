import React from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import LandingFAQ from "@/components/landing/LandingFAQ";
import { Phone, Sparkles, Star, CheckCircle, MapPin, ChevronRight, Shield, Award, Clock, AlertTriangle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { usePageImages } from "@/lib/usePageImages";

const PHONE = "(844) 351-4154";
const PHONE_HREF = "tel:+18443514154";

export default function ServicePageLayout({
  title, description, canonical,
  h1, subtitle, location = "Brandon, MS",
  bodySections, features, faqs, testimonials, images,
  relatedLinks, serviceName, emergencyPhone, bannerText,
  pageKey
}) {
  const { hero: heroImage, cta: ctaImage, gallery: galleryManaged } = usePageImages(pageKey);

  const trackCall = () => {
    base44.analytics.track({ eventName: "phone_click", properties: { source: serviceName } });
  };

  // Merge admin-managed gallery images with hardcoded fallbacks
  const allImages = [
  ...galleryManaged.map((img) => ({ url: img.url, alt: img.label, caption: img.notes })),
  ...(images || [])];


  const schema = {
    "@context": "https://schema.org",
    "@graph": [
    {
      "@type": "Service",
      name: serviceName,
      provider: { "@type": "HomeAndConstructionBusiness", name: "Bradley Brown Inc.", telephone: "+18443514154" },
      areaServed: "Brandon, MS and Central Mississippi"
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer }
      }))
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://bradleybrowninc.com" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://bradleybrowninc.com/services" },
      { "@type": "ListItem", position: 3, name: serviceName, item: canonical }]

    }]

  };

  const callNumber = emergencyPhone || PHONE;
  const callHref = emergencyPhone ? `tel:+1${emergencyPhone.replace(/\D/g, "")}` : PHONE_HREF;
  const testimonialList = Array.isArray(testimonials) ? testimonials : [testimonials];

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-16 md:pt-20">
      <SEOHead title={title} description={description} canonical={canonical} structuredData={schema} />

      {bannerText &&
      <div className={`sticky top-16 md:top-20 z-40 ${emergencyPhone ? "bg-red-600" : "bg-green-500"} text-white py-2.5 px-4 text-center text-sm font-semibold shadow`}>
          {emergencyPhone && <AlertTriangle className="w-4 h-4 inline mr-2" />}
          {bannerText}
        </div>
      }

      <section className="bg-[#1E2D3D] py-14 md:py-20 relative overflow-hidden">
        {heroImage ?
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url('${heroImage.url}')` }} /> :

        <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-64 h-64 bg-sky-400 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-400 rounded-full blur-3xl" />
          </div>
        }
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="inline-flex items-center gap-1.5 text-sky-400 font-semibold text-sm uppercase tracking-wider mb-3">
            <MapPin className="w-4 h-4" /> {location} &amp; Central Mississippi
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">{h1}</h1>
          {subtitle && <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">{subtitle}</p>}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/estimate" className="inline-flex items-center justify-center gap-2 hover:bg-[#A37820] text-white px-8 py-5 min-h-[52px] rounded-full font-bold text-base transition-colors shadow-lg bg-[hsl(var(--secondary))]">Get My Free Estimate

            </Link>
            <a href={callHref} onClick={trackCall} className="inline-flex items-center justify-center gap-2 hover:bg-green-600 text-white px-8 py-5 min-h-[52px] rounded-full font-bold text-base transition-colors bg-[hsl(var(--ring))]">
              <Phone className="w-5 h-5" /> Call {callNumber}
            </a>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-sky-400" /> Licensed &amp; Insured</span>
            <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-sky-400" /> 20+ Years</span>
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> 4.9★ Rated</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-sky-400" /> Renovations &amp; Custom Homes</span>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-10">
        {bodySections.map((section, i) =>
        <div key={i}>
            <h2 className="text-2xl font-bold text-[#1E2D3D] mb-4">{section.heading}</h2>
            {section.paragraphs.map((p, j) =>
          <p key={j} className="text-slate-600 leading-relaxed mb-3">{p}</p>
          )}
          </div>
        )}

        {features && features.length > 0 &&
        <div>
            <h2 className="text-2xl font-bold text-[#1E2D3D] mb-6">What We Include</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((f) =>
            <div key={f} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> {f}
                </div>
            )}
            </div>
          </div>
        }

        {allImages && allImages.length > 0 &&
        <div>
            <h2 className="text-2xl font-bold text-[#1E2D3D] mb-6">Our Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allImages.map((img, i) =>
            <div key={i} className="rounded-xl overflow-hidden shadow-md bg-white">
                  <img src={img.url} alt={img.alt} width="400" height="256" className="w-full h-64 object-cover" loading="lazy" decoding="async" />
                  {img.caption && <p className="text-sm text-slate-500 p-3">{img.caption}</p>}
                </div>
            )}
            </div>
          </div>
        }

        {testimonialList[0] &&
        <div>
            <h2 className="text-2xl font-bold text-[#1E2D3D] mb-6">What Our Clients Say</h2>
            <div className={`grid gap-4 ${testimonialList.length > 1 ? "md:grid-cols-3" : ""}`}>
              {testimonialList.map((t, i) =>
            <div key={i} className="bg-slate-50 border-l-4 border-sky-400 rounded-r-xl p-5">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, si) => <Star key={si} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-slate-600 italic leading-relaxed text-sm">"{t.text}"</p>
                  <p className="text-xs font-semibold text-slate-500 mt-3">— {t.author}, {t.location}</p>
                </div>
            )}
            </div>
          </div>
        }

        {faqs && faqs.length > 0 &&
        <div>
            <h2 className="text-2xl font-bold text-[#1E2D3D] mb-6 text-center">Frequently Asked Questions</h2>
            <LandingFAQ faqs={faqs} />
          </div>
        }

        {relatedLinks && relatedLinks.length > 0 &&
        <div className="bg-sky-50 border border-sky-100 rounded-xl p-6">
            <h2 className="text-lg font-bold text-[#1E2D3D] mb-4">Related Guides &amp; Pro Tips</h2>
            <div className="flex flex-wrap gap-3">
              {relatedLinks.map((link) =>
            <Link key={link.to} to={link.to} className="inline-flex items-center gap-1.5 bg-white border border-sky-200 text-sky-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-sky-100 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5" /> {link.label}
                </Link>
            )}
            </div>
          </div>
        }
      </div>

      <div className="bg-[#1E2D3D] py-14 md:py-20 relative overflow-hidden">
        {ctaImage &&
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('${ctaImage.url}')` }} />
        }
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to Start Your Project?</h2>
          <p className="text-slate-300 mb-8 text-base">Join 500+ Mississippi homeowners who've trusted Bradley Brown Inc. with their most important investment.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/estimate" className="inline-flex items-center justify-center gap-2 bg-[#C4922A] hover:bg-[#A37820] text-white px-8 py-5 min-h-[52px] rounded-full font-bold text-base transition-colors shadow-lg">
              <Sparkles className="w-5 h-5" /> Get My Free Estimate
            </Link>
            <a href={callHref} onClick={trackCall} className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-5 min-h-[52px] rounded-full font-bold text-base transition-colors">
              <Phone className="w-5 h-5" /> Call {callNumber}
            </a>
          </div>
        </div>
      </div>
    </div>);

}