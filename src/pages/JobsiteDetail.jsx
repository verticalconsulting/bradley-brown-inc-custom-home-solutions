import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import SEOHead from "@/components/SEOHead";
import { MapPin, Calendar, ChevronLeft, Phone, Sparkles } from "lucide-react";
import { format } from "date-fns";

const SERVICE_LABELS = {
  custom_home: "Custom Home",
  kitchen_remodel: "Kitchen Remodel",
  bathroom_renovation: "Bathroom Renovation",
  room_addition: "Room Addition",
  outdoor_living: "Outdoor Living",
  barndominium: "Barndominium",
  repair_maintenance: "Repair / Maintenance",
  other: "Construction",
};

export default function JobsiteDetail() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.JobCheckin.filter({ slug, status: "published" }, "-checkin_date", 1)
      .then(arr => setItem(arr[0] || null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="min-h-screen pt-20 flex items-center justify-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-sky-500 rounded-full animate-spin" /></div>;
  if (!item) return (
    <div className="min-h-screen pt-24 text-center px-4">
      <p className="text-slate-500">Jobsite not found.</p>
      <Link to="/jobsites" className="text-sky-600 mt-4 inline-block">← Back to all jobsites</Link>
    </div>
  );

  const serviceLabel = SERVICE_LABELS[item.service] || "Construction";
  const locationStr = [item.neighborhood, item.city, item.state].filter(Boolean).join(", ");
  const url = `https://bradleybrowninc.com/jobsites/${item.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": item.title,
        "description": item.description || `${serviceLabel} project in ${locationStr} by Bradley Brown Inc.`,
        "image": item.photos || [],
        "datePublished": item.published_date || item.created_date,
        "dateModified": item.updated_date,
        "author": { "@type": "Organization", "name": "Bradley Brown Inc." },
        "publisher": {
          "@type": "Organization",
          "name": "Bradley Brown Inc.",
          "logo": { "@type": "ImageObject", "url": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c758479c46f0580553750/0990d7b76_bradleybrowninc-logo2.png" }
        },
        "mainEntityOfPage": url,
        "contentLocation": {
          "@type": "Place",
          "name": locationStr,
          "address": { "@type": "PostalAddress", "addressLocality": item.city, "addressRegion": item.state || "MS", "postalCode": item.zip || undefined, "addressCountry": "US" },
          ...(item.latitude && item.longitude ? {
            "geo": { "@type": "GeoCoordinates", "latitude": item.latitude, "longitude": item.longitude }
          } : {})
        }
      },
      {
        "@type": "Service",
        "name": serviceLabel,
        "provider": { "@id": "https://bradleybrowninc.com/#localbusiness" },
        "areaServed": item.latitude && item.longitude ? {
          "@type": "GeoCircle",
          "geoMidpoint": { "@type": "GeoCoordinates", "latitude": item.latitude, "longitude": item.longitude },
          "geoRadius": (item.service_radius_miles || 5) * 1609
        } : { "@type": "City", "name": item.city }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      <SEOHead
        title={`${item.title} | ${serviceLabel} in ${locationStr}`}
        description={item.description || `${serviceLabel} completed by Bradley Brown Inc. in ${locationStr}. See photos and project details from this Mississippi jobsite.`}
        canonical={url}
        schema={schema}
      />

      <div className="max-w-4xl mx-auto px-4 py-6">
        <Link to="/jobsites" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-sky-600">
          <ChevronLeft className="w-4 h-4" /> Back to all jobsites
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100">
          {item.photos?.[0] && (
            <div className="aspect-[16/9] bg-slate-100">
              <img src={item.photos[0]} alt={item.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="p-6 md:p-8">
            <span className="inline-block bg-sky-50 text-sky-700 text-xs font-bold uppercase px-2.5 py-1 rounded mb-3">{serviceLabel}</span>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1E2D3D]">{item.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-slate-500 mt-3">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-sky-500" />{locationStr}</span>
              {item.checkin_date && <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-sky-500" />{format(new Date(item.checkin_date), "MMMM d, yyyy")}</span>}
            </div>

            {item.description && (
              <div className="mt-6 prose prose-slate max-w-none">
                <p className="text-slate-700 leading-relaxed whitespace-pre-line">{item.description}</p>
              </div>
            )}

            {item.photos && item.photos.length > 1 && (
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
                {item.photos.slice(1).map((p, i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden bg-slate-100">
                    <img src={p} alt={`${item.title} ${i + 2}`} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 p-5 bg-slate-50 border border-gray-100 rounded-xl">
              <p className="text-sm text-slate-600">
                <strong className="text-[#1E2D3D]">Servicing {item.city}, {item.state}</strong> — Bradley Brown Inc. is a licensed Mississippi contractor with crews working across {item.city} and the surrounding {item.state} area. We've built or remodeled hundreds of homes since 1995.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-[#1E2D3D] rounded-2xl p-6 md:p-8 text-center text-white">
          <h2 className="text-xl md:text-2xl font-bold">Need similar work in {item.city}?</h2>
          <p className="text-slate-300 text-sm mt-2 mb-5">Free estimates. Licensed &amp; insured. Same crew, same craftsmanship.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+18443514154" className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" /> (844) 351-4154
            </a>
            <Link to="/QuoteAssistant" className="bg-[#C4922A] hover:bg-[#A37820] text-white px-6 py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" /> Get Free Estimate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}