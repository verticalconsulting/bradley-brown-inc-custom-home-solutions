import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Upload, Sparkles, Image as ImageIcon, ArrowRight, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import SEOHead, { webSiteSchema, combineSchemas } from "@/components/SEOHead";
import { organizationSchema } from "@/components/seo/seoSchemas";
import FinishPackageCard from "@/components/finish/FinishPackageCard";
import HowItWorks from "@/components/finish/HowItWorks";
import WhatsInsidePackage from "@/components/finish/WhatsInsidePackage";

const ROOMS = ["Kitchen", "Primary Bath", "Living Room", "Bedroom", "Outdoor / Patio", "Whole Home"];

// SoftwareApplication schema — the primary structured data for this tool page.
// GeneralContractor / localBusiness is intentionally NOT included here; it remains
// scoped to site-wide / trade-category pages (e.g. homepage, service landing pages).
const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AI Finish Package Studio",
  applicationCategory: "DesignApplication",
  operatingSystem: "Web browser",
  description:
    "Upload an inspiration photo and receive three AI-curated interior finish packages — each with materials, color palettes, and a budget-friendly alternative — then save your favorite to include with a project quote.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  provider: {
    "@type": "Organization",
    name: "Bradley Brown Inc.",
    url: "https://bradleybrowninc.com",
  },
};

const studioSchema = combineSchemas(
  webSiteSchema(),
  organizationSchema(),
  softwareApplicationSchema,
);

const PACKAGE_SCHEMA = {
  type: "object",
  properties: {
    detected_room: { type: "string" },
    style_summary: { type: "string" },
    packages: {
      type: "array",
      items: {
        type: "object",
        properties: {
          theme_name: { type: "string" },
          vibe: { type: "string" },
          color_palette: {
            type: "array",
            items: {
              type: "object",
              properties: { name: { type: "string" }, hex: { type: "string" } },
            },
          },
          materials: { type: "array", items: { type: "string" } },
          fixtures: { type: "array", items: { type: "string" } },
          signature_highlight: { type: "string" },
          estimated_price_range: { type: "string" },
          budget_alternative: {
            type: "object",
            properties: {
              name: { type: "string" },
              swaps: { type: "array", items: { type: "string" } },
              estimated_price_range: { type: "string" },
            },
          },
        },
      },
    },
  },
};

export default function FinishPackageStudio() {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [room, setRoom] = useState("Kitchen");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Save flow
  const [savingIdx, setSavingIdx] = useState(null);
  const [savedRecord, setSavedRecord] = useState(null);
  const [selectedTiers, setSelectedTiers] = useState({}); // { [idx]: 'signature' | 'budget' }
  const [contactEmail, setContactEmail] = useState("");
  const [contactName, setContactName] = useState("");

  const navigate = useNavigate();

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setPhotoUrl(file_url);
    setUploading(false);
  };

  const generatePackages = async () => {
    if (!photoUrl) return;
    setAnalyzing(true);
    setError(null);
    setResult(null);
    try {
      const res = await base44.integrations.Core.InvokeLLM({
        prompt: `You're a senior interior designer for a high-end Mississippi custom home builder.
Analyze the attached inspiration photo. The visitor is planning a ${room} renovation.

Return EXACTLY 3 themed finish packages, each clearly distinct in mood (e.g. "Modern Farmhouse Warm",
"Coastal Light", "Moody Transitional"). For each package include:
- theme_name and a one-line "vibe"
- a 4-color palette (with friendly names and hex codes)
- 4–6 specific materials (e.g. "honed quartzite counters", "white oak rift cabinetry")
- 4–6 specific fixtures (e.g. "matte black bridge faucet", "linear LED under-cabinet lighting")
- a one-line "signature_highlight" — the wow detail
- estimated_price_range as a contractor-style range (e.g. "$48,000 – $62,000")
- a budget_alternative with a friendly name, 3–5 smart swap items, and its own estimated_price_range
  that comes in roughly 30–45% lower than the signature tier.

Be specific to what's visible in the inspiration photo. Keep prose tight — no marketing fluff.`,
        file_urls: [photoUrl],
        response_json_schema: PACKAGE_SCHEMA,
      });
      setResult(res);
    } catch (err) {
      setError("Something went wrong analyzing the photo. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const savePackage = async (pkg, idx) => {
    const tier = selectedTiers[idx] || "signature";
    setSavingIdx(idx);
    try {
      const record = await base44.entities.FinishPackage.create({
        name: contactName || undefined,
        email: contactEmail || undefined,
        inspiration_photo_url: photoUrl,
        room_type: result?.detected_room || room,
        selected_theme: pkg.theme_name,
        selected_tier: tier,
        package_details: { ...pkg, style_summary: result?.style_summary },
        status: "saved",
        description: `${pkg.theme_name} · ${tier} tier · ${result?.detected_room || room}`,
      });
      setSavedRecord({ idx, id: record.id, tier, pkg });
    } catch {
      setError("Couldn't save your package. Please try again.");
    } finally {
      setSavingIdx(null);
    }
  };

  const attachToQuote = () => {
    if (!savedRecord) return;
    const params = new URLSearchParams({
      finish_package_id: savedRecord.id,
      finish_theme: savedRecord.pkg.theme_name,
      finish_tier: savedRecord.tier,
    });
    navigate(`/quote?${params.toString()}`);
  };

  return (
    <div className="bg-[#FAFAF8] min-h-screen pt-24 pb-16">
      <SEOHead
        title="AI Finish Package Studio | Upload a Photo, Get 3 Designer Packages — Bradley Brown Inc."
        description="Upload an inspiration photo and get three AI-curated finish packages with materials, color palettes, and budget-friendly alternatives — then save your favorite to attach to a quote."
        canonical="https://bradleybrowninc.com/estimate"
        structuredData={studioSchema}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-600 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" /> New · AI Designer Tool
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-[#1E2D3D]">Finish Package Studio</h1>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            Upload an inspiration photo. Get three themed finish packages — each with a budget alternative — and save your favorite to include with a future quote.
          </p>
        </div>

        {/* Step 1: Upload */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1 w-full">
              <label className="block text-sm font-semibold text-[#1E2D3D] mb-2">1. Which room is this for?</label>
              <div className="flex flex-wrap gap-2 mb-5">
                {ROOMS.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRoom(r)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      room === r ? "bg-[#1E2D3D] text-white" : "bg-gray-100 text-slate-600 hover:bg-gray-200"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              <label className="block text-sm font-semibold text-[#1E2D3D] mb-2">2. Upload an inspiration photo</label>
              <label className="block border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-sky-400 hover:bg-sky-50/30 transition-colors">
                <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                {uploading ? (
                  <div className="flex flex-col items-center gap-2 text-sky-600">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span className="text-sm">Uploading…</span>
                  </div>
                ) : photoUrl ? (
                  <div className="flex flex-col items-center gap-2">
                    <ImageIcon className="w-6 h-6 text-emerald-500" />
                    <span className="text-sm text-emerald-600 font-medium">Photo uploaded — click to replace</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-500">
                    <Upload className="w-7 h-7" />
                    <span className="text-sm font-medium">Click to upload a photo (Pinterest, magazine, etc.)</span>
                    <span className="text-xs">JPG or PNG · max ~10 MB</span>
                  </div>
                )}
              </label>
            </div>

            {photoUrl && (
              <div className="w-full md:w-56 flex-shrink-0">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Your inspiration</p>
                <img src={photoUrl} alt="Inspiration upload" className="w-full rounded-xl border border-gray-200 object-cover aspect-square" />
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={generatePackages}
            disabled={!photoUrl || analyzing}
            className="mt-6 w-full md:w-auto bg-sky-500 hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            {analyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Designing your packages…
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Generate 3 finish packages
              </>
            )}
          </button>

          {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
        </div>

        {/* Step 2: Packages */}
        {result?.packages?.length > 0 && (
          <div className="mt-12">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1E2D3D]">Your three finish packages</h2>
              {result.style_summary && (
                <p className="text-slate-500 mt-2 max-w-2xl mx-auto text-sm">{result.style_summary}</p>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {result.packages.slice(0, 3).map((pkg, idx) => (
                <FinishPackageCard
                  key={idx}
                  pkg={pkg}
                  isSelected={savedRecord?.idx === idx}
                  tier={selectedTiers[idx] || "signature"}
                  onSelectTier={(t) => setSelectedTiers((prev) => ({ ...prev, [idx]: t }))}
                  onSave={() => savePackage(pkg, idx)}
                  saving={savingIdx === idx}
                />
              ))}
            </div>

            {/* Optional contact pre-fill, only shown before save */}
            {!savedRecord && (
              <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-5">
                <p className="text-sm font-semibold text-[#1E2D3D] mb-3">
                  Optional — add your name and email so we can attach your saved package to a future quote
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Your name"
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                  />
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                  />
                </div>
              </div>
            )}

            {/* Saved confirmation + attach to quote */}
            {savedRecord && (
              <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="font-semibold text-emerald-800">
                    "{savedRecord.pkg.theme_name}" saved ({savedRecord.tier === "budget" ? "Budget" : "Signature"} tier)
                  </p>
                  <p className="text-sm text-emerald-700 mt-1">
                    We'll include this package with your quote request so our team can price it accurately.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={attachToQuote}
                  className="bg-[#1E2D3D] hover:bg-sky-600 text-white px-5 py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors flex-shrink-0"
                >
                  Attach to quote <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Empty state hint */}
        {!result && !analyzing && (
          <p className="text-center text-xs text-slate-400 mt-6">
            Not sure where to start? Try a Pinterest screenshot of a room you love.{" "}
            <Link to="/portfolio" className="text-sky-500 hover:underline">
              Or browse our portfolio
            </Link>
            .
          </p>
        )}

        {/* How It Works */}
        <HowItWorks />

        {/* What's Inside Each Finish Package */}
        <WhatsInsidePackage />
      </div>
    </div>
  );
}