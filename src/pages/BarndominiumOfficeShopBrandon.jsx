import React from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { webPageSchema, breadcrumbSchema } from "@/components/seo/seoSchemas";
import { combineSchemas } from "@/components/seo/schemaExtras";
import { Phone, ChevronRight, CheckCircle, MapPin, Maximize2, Home, Ruler } from "lucide-react";
import ServiceStickyCTA from "@/components/ServiceStickyCTA";
import { usePageImages } from "@/lib/usePageImages";
import { cfResponsive } from "@/lib/responsiveImage";

// Every fact on this page comes from the documented project record
// (FeaturedProjects placeholder / change-log-phase6). Do not add budget,
// schedule, quotes, warranty, savings, or before/after claims — or the
// unconfirmed "200-amp electrical service" detail — without a project-team source.
const PAGE_PATH = "/projects/barndominium-office-shop-brandon-ms";
const TITLE = "Barndominium Custom Office & Shop in Brandon, MS";
const DESCRIPTION =
  "A 3,200 sq ft barndominium in Brandon, MS with a climate-controlled workshop and finished office suite, built by Bradley Brown Inc. to the client's custom drawings.";

const PRIMARY_IMAGE = "https://imagedelivery.net/dXRounTcgmfhZwbsZCZLTw/b3a782a9-ca3b-4d50-622d-0992951eca00/medium";
const PRIMARY_ALT = "Barndominium custom office and shop built by Bradley Brown Inc. in Brandon, MS";

const atAGlance = [
  { icon: MapPin, label: "Location", value: "Brandon, MS" },
  { icon: Maximize2, label: "Size", value: "3,200 sq ft" },
  { icon: Home, label: "Project type", value: "Custom barndominium" },
  { icon: Ruler, label: "Design", value: "Built to the client's custom drawings" },
];

const scope = [
  "Climate-controlled workshop",
  "Finished office suite",
  "Post-frame construction",
  "Spray-foam insulation",
  "Polished concrete shop floors",
  "Built to the client's custom drawings",
];

const schema = combineSchemas(
  {
    ...webPageSchema({ title: TITLE, description: DESCRIPTION, url: PAGE_PATH }),
    primaryImageOfPage: PRIMARY_IMAGE,
    about: {
      "@type": "HomeAndConstructionBusiness",
      name: "Bradley Brown Inc.",
      url: "https://bradleybrowninc.com",
    },
  },
  breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Portfolio", url: "/portfolio" },
    { name: TITLE, url: PAGE_PATH },
  ]),
);

const trackCall = () => {
  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", { send_to: "AW-17864041271/CKLvCOWk3_IbELfGnsZC", value: 30, currency: "USD" });
  }
};

export default function BarndominiumOfficeShopBrandon() {
  // Additional project photos are supplied through the Image Manager (SiteImages)
  // under this page key; each image's label is used as its alt text.
  const { gallery: managedGallery } = usePageImages("BarndominiumOfficeShopBrandon");
  const galleryImages = [
    { url: PRIMARY_IMAGE, alt: PRIMARY_ALT },
    ...managedGallery.map((img) => ({ url: img.url, alt: img.label || PRIMARY_ALT })),
  ];
  const hero = cfResponsive(PRIMARY_IMAGE, [800, 1200], 80);

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      <SEOHead
        title={TITLE}
        description={DESCRIPTION}
        canonical={`https://bradleybrowninc.com${PAGE_PATH}`}
        ogImage={PRIMARY_IMAGE}
        schema={schema}
      />

      {/* Hero */}
      <div className="bg-[#1E2D3D]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <nav aria-label="Breadcrumb" className="text-xs text-slate-400 mb-3">
              <Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
              <ChevronRight className="w-3 h-3 inline mx-1" />
              <span className="text-slate-300">Brandon, MS</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">{TITLE}</h1>
            <p className="text-slate-300 mt-4 text-base md:text-lg">
              Bradley Brown Inc. built this 3,200 sq ft barndominium in Brandon, MS, combining a climate-controlled workshop and a finished office suite under one post-frame structure built to the client's custom drawings.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-slate-700">
            <img
              src={hero.src}
              srcSet={hero.srcSet || undefined}
              sizes={hero.srcSet ? "(min-width: 768px) 50vw, 100vw" : undefined}
              alt={PRIMARY_ALT}
              width="800"
              height="600"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* Project at a glance */}
        <section>
          <h2 className="text-2xl font-bold text-[#1E2D3D] mb-4">Project at a Glance</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {atAGlance.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-4">
                <Icon className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
                <div>
                  <dt className="text-xs uppercase tracking-wider text-slate-400">{label}</dt>
                  <dd className="text-sm font-medium text-slate-700 mt-0.5">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </section>

        {/* Documented scope */}
        <section>
          <h2 className="text-2xl font-bold text-[#1E2D3D] mb-4">Documented Scope &amp; Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {scope.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-4">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Photo gallery */}
        <section>
          <h2 className="text-2xl font-bold text-[#1E2D3D] mb-4">Project Photos</h2>
          <div className={`grid gap-3 ${galleryImages.length > 1 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1"}`}>
            {galleryImages.map((img, i) => {
              const { src, srcSet } = cfResponsive(img.url, [400, 800]);
              return (
                <figure key={img.url + i} className="rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={src}
                    srcSet={srcSet || undefined}
                    sizes={srcSet ? (galleryImages.length > 1 ? "(min-width: 768px) 33vw, 50vw" : "(min-width: 896px) 896px, 100vw") : undefined}
                    alt={img.alt}
                    width="800"
                    height="600"
                    loading="lazy"
                    decoding="async"
                    className="w-full aspect-[4/3] object-cover"
                  />
                </figure>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#1E2D3D] rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Planning a Similar Project?</h2>
          <p className="text-slate-300 text-sm mb-6 max-w-md mx-auto">
            Tell us about the shop, office, or living space you have in mind and we'll follow up to talk through your plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/estimate"
              className="inline-flex items-center justify-center gap-2 bg-sky-400 hover:bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Get a Free Estimate <ChevronRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+18443514154"
              onClick={trackCall}
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Phone className="w-4 h-4" /> Call (844) 351-4154
            </a>
          </div>
        </section>

        {/* Related */}
        <section>
          <h2 className="text-xl font-bold text-[#1E2D3D] mb-4">Related Projects &amp; Resources</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Barndominium Services", to: "/services/barndominiums" },
              { label: "Portfolio", to: "/portfolio" },
              { label: "Custom Home Builder", to: "/custom-home-builder-brandon-ms" },
              { label: "Pricing Guide", to: "/pricing" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="bg-white border border-gray-100 rounded-xl p-4 text-center text-sm font-medium text-[#1E2D3D] hover:border-sky-300 hover:text-sky-600 transition-colors"
              >
                {item.label} <ChevronRight className="w-3 h-3 inline" />
              </Link>
            ))}
          </div>
        </section>

      </div>
      <ServiceStickyCTA source="barndominium_office_shop_brandon" label="Get a Free Quote" />
    </div>
  );
}
