import React, { useState } from "react";
import SEOHead from "@/components/SEOHead";
import PackageCard from "@/components/finishstudio/PackageCard";
import { base44 } from "@/api/base44Client";
import { useNavigate, Link } from "react-router-dom";
import { Sparkles, Upload, Loader2, Image as ImageIcon, X, Palette, ArrowRight, CalendarClock } from "lucide-react";

const ROOM_TYPES = [
  "Kitchen",
  "Bathroom",
  "Living Room",
  "Master Suite",
  "Home Office",
  "Dining Room",
  "Outdoor Living",
  "Whole Home",
];

export default function FinishPackageStudio() {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [roomType, setRoomType] = useState("Kitchen");
  const [packages, setPackages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedIds, setSavedIds] = useState(new Set());
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setPhotoUrl(file_url);
      setPackages(null);
    } catch {
      setError("Photo upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleGenerate = async () => {
    if (!photoUrl) return;
    setLoading(true);
    setError("");
    setPackages(null);
    setSavedIds(new Set());
    try {
      base44.analytics.track({
        eventName: "finish_package_generated",
        properties: { room_type: roomType },
      });
      const response = await base44.functions.invoke("generateFinishPackages", {
        inspiration_photo_url: photoUrl,
        room_type: roomType,
      });
      const result = response?.data;
      if (!result?.success || !result?.packages?.length) {
        throw new Error(result?.error || "Unable to generate finish packages.");
      }
      setPackages(result.packages);
    } catch (err) {
      setError(err.message || "Something went wrong generating your finish packages.");
    } finally {
      setLoading(false);
    }
  };

  const buildPackageSummary = (pkg, tier) => {
    const d = tier === "signature" ? pkg.signature : pkg.budget;
    const lines = [
      `Finish Package: ${pkg.theme_name} (${tier} tier)`,
      `Room: ${roomType}`,
      `Description: ${pkg.theme_description}`,
      `Cabinetry: ${d.cabinetry}`,
      `Countertops: ${d.countertops}`,
      `Flooring: ${d.flooring}`,
      `Fixtures: ${d.fixtures}`,
      `Paint/Walls: ${d.paint}`,
      `Lighting: ${d.lighting}`,
      `Estimated Cost: ${d.estimated_cost}`,
    ];
    return lines.join("\n");
  };

  const handleSave = async (pkg, tier, index) => {
    try {
      const summary = buildPackageSummary(pkg, tier);
      await base44.entities.FinishPackage.create({
        inspiration_photo_url: photoUrl,
        room_type: roomType,
        selected_theme: pkg.theme_name,
        selected_tier: tier,
        package_details: { theme: pkg, tier, roomType },
        description: summary,
        status: "saved",
      });
      setSavedIds((prev) => new Set(prev).add(index));
    } catch (err) {
      console.error("Save failed:", err);
      setError("Could not save your package. Please try again.");
    }
  };

  const handleAttach = async (pkg, tier) => {
    const summary = buildPackageSummary(pkg, tier);
    try {
      await base44.entities.FinishPackage.create({
        inspiration_photo_url: photoUrl,
        room_type: roomType,
        selected_theme: pkg.theme_name,
        selected_tier: tier,
        package_details: { theme: pkg, tier, roomType },
        description: summary,
        status: "attached_to_quote",
      });
    } catch {
      // proceed to quote even if save fails
    }
    sessionStorage.setItem("finishPackage", JSON.stringify({ summary, project_type: "renovation" }));
    navigate("/estimate?from=finishpackage");
  };

  const handleReset = () => {
    setPhotoUrl(null);
    setPackages(null);
    setError("");
    setSavedIds(new Set());
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      <SEOHead
        title="Finish Package Studio — AI-Powered Design Suggestions"
        description="Upload an inspiration photo and get 3 themed finish package suggestions with signature and budget alternatives. Save your favorite or attach it to a quote request."
        canonical="https://bradleybrowninc.com/finish-package-studio"
        keywords={["finish package", "interior design suggestions", "budget alternatives", "material selection"]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is the Finish Package Studio?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Upload an inspiration photo and our AI analyzes it to generate three themed finish package suggestions, each with a premium signature tier and a cost-saving budget alternative. Save your favorite package or attach it directly to a quote request.",
              },
            },
          ],
        }}
      />

      {/* Hero */}
      <div className="bg-[#1E2D3D] py-10 md:py-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#C4922A]/20 border border-[#C4922A]/40 rounded-full px-3 py-1 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C4922A]" />
            <span className="text-[#F5D78E] text-xs font-medium">AI-Powered · Free · No Obligation</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white">Finish Package Studio</h1>
          <p className="text-slate-300 mt-2 text-sm md:text-base">
            Upload an inspiration photo and get three themed finish package suggestions — each with a signature and budget alternative.
          </p>
        </div>
      </div>

      {/* Studio */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        {/* Upload step */}
        {!packages && (
          <div className="bg-white rounded-2xl shadow-md border border-[#E2D9CC] p-6 md:p-8 max-w-xl mx-auto">
            <div className="flex items-center gap-2 mb-1">
              <Palette className="w-5 h-5 text-[#C4922A]" />
              <h2 className="text-xl font-bold text-[#1E2D3D]">Upload Your Inspiration</h2>
            </div>
            <p className="text-slate-500 text-sm mb-6">
              Share a photo of a room or design style you love. We'll analyze it and suggest finish packages tailored to your space.
            </p>

            {/* Photo upload */}
            <label className="block border-2 border-dashed border-[#E2D9CC] rounded-xl p-8 text-center cursor-pointer hover:border-[#C4922A] hover:bg-amber-50/30 transition-colors mb-5">
              <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
              {uploading ? (
                <div className="flex flex-col items-center gap-2 text-[#C4922A]">
                  <Loader2 className="w-8 h-8 animate-spin" />
                  <span className="text-sm font-medium">Uploading…</span>
                </div>
              ) : photoUrl ? (
                <div className="flex flex-col items-center gap-3">
                  <img
                    src={photoUrl}
                    alt="Inspiration"
                    width="200" height="200" loading="lazy" decoding="async"
                    className="h-40 w-auto rounded-lg object-cover"
                  />
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <ImageIcon className="w-3 h-3" /> Click to replace
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-slate-500">
                  <Upload className="w-8 h-8" />
                  <span className="text-sm font-semibold">Upload an inspiration photo</span>
                  <span className="text-xs">JPG or PNG — Pinterest screenshots, magazine clippings, your current room</span>
                </div>
              )}
            </label>

            {/* Room type */}
            <label className="block text-sm font-semibold text-[#1E2D3D] mb-1">What room is this for?</label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full border border-[#E2D9CC] rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#C4922A]/30 focus:border-[#C4922A] bg-white mb-6"
            >
              {ROOM_TYPES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              onClick={handleGenerate}
              disabled={!photoUrl || loading}
              className="w-full flex items-center justify-center gap-2 bg-[#C4922A] hover:bg-[#A37820] text-white px-6 py-3.5 min-h-[48px] rounded-lg font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing Your Photo…</>
              ) : (
                <><Sparkles className="w-4 h-4" /> Generate Finish Packages</>
              )}
            </button>
          </div>
        )}

        {/* Loading state */}
        {loading && !packages && (
          <div className="text-center py-16">
            <Loader2 className="w-12 h-12 text-[#C4922A] mx-auto mb-4 animate-spin" />
            <h3 className="text-xl font-bold text-[#1E2D3D] mb-2">Analyzing Your Inspiration…</h3>
            <p className="text-slate-500">Our AI is identifying design themes and building your finish packages.</p>
          </div>
        )}

        {/* Results */}
        {packages && (
          <div>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-4 py-1.5 mb-3">
                <Sparkles className="w-4 h-4 text-green-600" />
                <span className="text-green-700 text-sm font-semibold">3 finish packages ready</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1E2D3D]">Your Finish Package Suggestions</h2>
              <p className="text-slate-500 mt-1 text-sm">
                Based on your inspiration photo for a {roomType.toLowerCase()}. Toggle between Signature and Budget tiers on each card.
              </p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <img src={photoUrl} alt="Your inspiration" width="80" height="80" loading="lazy" decoding="async" className="h-20 w-20 rounded-lg object-cover border border-[#E2D9CC]" />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm text-center mb-6">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              {packages.map((pkg, i) => (
                <PackageCard
                  key={i}
                  pkg={pkg}
                  index={i}
                  roomType={roomType}
                  isSaved={savedIds.has(i)}
                  onSave={(p, tier) => handleSave(p, tier, i)}
                  onAttach={handleAttach}
                />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <button
                onClick={handleReset}
                className="flex-1 flex items-center justify-center gap-2 border border-slate-300 text-slate-600 px-5 py-3 min-h-[48px] rounded-lg font-semibold text-sm hover:bg-slate-50 transition-colors"
              >
                <X className="w-4 h-4" /> Try a Different Photo
              </button>
              <Link
                to="/estimate"
                className="flex-1 flex items-center justify-center gap-2 bg-[#1E2D3D] text-white px-5 py-3 min-h-[48px] rounded-lg font-semibold text-sm hover:bg-[#2C3E50] transition-colors"
              >
                <ArrowRight className="w-4 h-4" /> Get a Full Estimate
              </Link>
            </div>
          </div>
        )}

        {/* Cross-link */}
        {!packages && (
          <p className="text-center text-slate-400 text-xs mt-6">
            Planning a renovation?{" "}
            <Link to="/renovation-planner" className="text-[#C4922A] font-semibold hover:underline inline-flex items-center gap-1">
              <CalendarClock className="w-3 h-3" /> Try our Renovation Planner →
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}