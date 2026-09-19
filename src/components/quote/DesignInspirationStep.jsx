import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Image as ImageIcon, Upload, Palette, Sparkles, Wand2, X, Loader2 } from "lucide-react";

const STYLE_PRESETS = [
  { value: "", label: "— Select a style (optional) —" },
  { value: "old_english_office", label: "Old English Office" },
  { value: "modern_luxury", label: "Modern Luxury" },
  { value: "farmhouse", label: "Farmhouse" },
  { value: "industrial", label: "Industrial" },
  { value: "coastal", label: "Coastal" },
  { value: "traditional", label: "Traditional" },
  { value: "minimalist", label: "Minimalist" },
  { value: "custom", label: "Custom" },
];

const PRESET_PROMPTS = {
  old_english_office:
    "old English cigar lounge office, dark walnut wood built-ins, brown leather executive chair, brass desk lamp, deep green walls, vintage books, cigar lounge atmosphere, coffered ceiling, warm moody lighting, masculine luxury interior design, photorealistic, high-end remodeling visualization.",
  modern_luxury:
    "modern luxury interior, clean lines, large-format porcelain, matte black fixtures, integrated LED lighting, floor-to-ceiling windows, designer furnishings, soft neutral palette, photorealistic, high-end remodeling visualization.",
  farmhouse:
    "modern farmhouse interior, shiplap accent wall, white oak floors, shaker cabinetry, black hardware, apron-front sink, soft natural daylight, cozy textiles, photorealistic, high-end remodeling visualization.",
  industrial:
    "industrial loft interior, exposed brick, blackened steel beams, edison bulb pendant lighting, concrete floors, reclaimed wood, leather and metal furniture, photorealistic, high-end remodeling visualization.",
  coastal:
    "coastal interior, whitewashed shiplap, light oak floors, linen upholstery, brushed brass fixtures, soft blues and sandy neutrals, abundant natural light, photorealistic, high-end remodeling visualization.",
  traditional:
    "traditional American interior, raised-panel cabinetry, crown molding, hardwood floors, classic chandelier, warm neutral palette, timeless furnishings, photorealistic, high-end remodeling visualization.",
  minimalist:
    "minimalist interior, monochrome palette, hidden cabinetry, integrated lighting, polished concrete, sparse curated decor, soft diffused daylight, photorealistic, high-end remodeling visualization.",
  custom: "",
};

const PRESET_LABELS = STYLE_PRESETS.reduce((acc, p) => ({ ...acc, [p.value]: p.label }), {});

const inputClass =
  "w-full border border-[#E2D9CC] rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#C4922A]/30 focus:border-[#C4922A] bg-white";

export default function DesignInspirationStep({ data, onChange }) {
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingInspo, setUploadingInspo] = useState(false);
  const update = (patch) => onChange({ ...data, ...patch });

  const handleMainUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingMain(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      update({ design_photo: file_url });
    } finally {
      setUploadingMain(false);
    }
  };

  const handleInspoUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploadingInspo(true);
    try {
      const uploads = await Promise.all(
        files.map((file) => base44.integrations.Core.UploadFile({ file }))
      );
      const urls = uploads.map((u) => u.file_url).filter(Boolean);
      update({ inspiration_images: [...(data.inspiration_images || []), ...urls] });
    } finally {
      setUploadingInspo(false);
    }
  };

  const removeInspo = (idx) => {
    const next = [...(data.inspiration_images || [])];
    next.splice(idx, 1);
    update({ inspiration_images: next });
  };

  const handlePresetChange = (val) => {
    const presetText = PRESET_PROMPTS[val] || "";
    const current = (data.design_style_prompt || "").trim();
    // Append preset prompt suggestion if user hasn't typed something custom yet,
    // or if the current text matches a previous preset's seed.
    const previousSeeds = Object.values(PRESET_PROMPTS).filter(Boolean);
    const shouldReplace = !current || previousSeeds.includes(current);
    update({
      style_preset: val,
      design_style_prompt: shouldReplace && presetText ? presetText : current,
    });
  };

  const enabled = !!data.generate_design_concept;

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Palette className="w-5 h-5 text-[#C4922A]" />
        <h2 className="text-xl font-bold text-[#1E2D3D]">Design Inspiration</h2>
        <span className="text-xs text-slate-400 font-medium ml-1">(optional)</span>
      </div>
      <p className="text-slate-500 text-sm mb-6">
        Optional: Add inspiration photos to help guide the look and feel of your design concept.
      </p>

      {/* Toggle */}
      <label className="flex items-start gap-3 p-4 bg-amber-50 border border-[#C4922A]/30 rounded-xl cursor-pointer mb-6">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => update({ generate_design_concept: e.target.checked })}
          className="mt-1 w-4 h-4 accent-[#C4922A]"
        />
        <div>
          <div className="flex items-center gap-1.5 font-semibold text-[#1E2D3D]">
            <Wand2 className="w-4 h-4 text-[#C4922A]" />
            Generate an AI design concept image
          </div>
          <p className="text-xs text-slate-600 mt-1">
            We'll create a photorealistic remodeling visualization of your space along with your estimate.
          </p>
        </div>
      </label>

      {enabled && (
        <div className="space-y-6">
          {/* Main room photo */}
          <div>
            <label className="block text-sm font-semibold text-[#1E2D3D] mb-1">
              Current room / project photo <span className="text-[#C4922A]">*</span>
            </label>
            <p className="text-xs text-slate-400 mb-2">
              We'll use this as the base layout for the design concept.
            </p>
            <label className="block border-2 border-dashed border-[#E2D9CC] rounded-xl p-5 text-center cursor-pointer hover:border-[#C4922A] hover:bg-amber-50/30 transition-colors">
              <input type="file" accept="image/*" className="hidden" onChange={handleMainUpload} />
              {uploadingMain ? (
                <div className="flex flex-col items-center gap-2 text-[#C4922A]">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span className="text-sm">Uploading…</span>
                </div>
              ) : data.design_photo ? (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={data.design_photo}
                    alt="Current room"
                    width="128" height="128" loading="lazy" decoding="async"
                    className="h-32 w-auto rounded-lg object-cover"
                  />
                  <span className="text-xs text-slate-500">Click to replace</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-slate-500">
                  <Upload className="w-6 h-6" />
                  <span className="text-sm font-medium">Upload current room photo</span>
                  <span className="text-xs">JPG or PNG</span>
                </div>
              )}
            </label>
          </div>

          {/* Inspiration images */}
          <div>
            <label className="block text-sm font-semibold text-[#1E2D3D] mb-1">
              Inspiration images <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <p className="text-xs text-slate-400 mb-2">
              Pinterest screenshots, magazine clippings — anything that captures your vision.
            </p>
            <label className="block border-2 border-dashed border-[#E2D9CC] rounded-xl p-4 text-center cursor-pointer hover:border-[#C4922A] hover:bg-amber-50/30 transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleInspoUpload}
              />
              {uploadingInspo ? (
                <div className="flex items-center justify-center gap-2 text-[#C4922A] text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" /> Uploading…
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
                  <ImageIcon className="w-4 h-4" /> Add inspiration photos
                </div>
              )}
            </label>

            {data.inspiration_images?.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-3">
                {data.inspiration_images.map((url, i) => (
                  <div key={i} className="relative group">
                    <img src={url} alt={`Inspiration ${i + 1}`} width="200" height="200" loading="lazy" decoding="async" className="w-full aspect-square object-cover rounded-lg border border-[#E2D9CC]" />
                    <button
                      type="button"
                      onClick={() => removeInspo(i)}
                      className="absolute -top-1.5 -right-1.5 bg-white border border-gray-200 rounded-full p-0.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove image"
                    >
                      <X className="w-3 h-3 text-slate-600" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Style preset */}
          <div>
            <label className="block text-sm font-semibold text-[#1E2D3D] mb-1">Style preset</label>
            <select
              value={data.style_preset || ""}
              onChange={(e) => handlePresetChange(e.target.value)}
              className={inputClass}
            >
              {STYLE_PRESETS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {data.style_preset && data.style_preset !== "custom" && (
              <p className="text-xs text-[#C4922A] mt-1.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> {PRESET_LABELS[data.style_preset]} prompt suggested below — edit freely.
              </p>
            )}
          </div>

          {/* Style description */}
          <div>
            <label className="block text-sm font-semibold text-[#1E2D3D] mb-1">
              Describe the design style you want
            </label>
            <textarea
              rows={4}
              placeholder="Example: Create an old English cigar lounge office with dark walnut built-ins, brown leather seating, brass lighting, deep green walls, vintage books, and warm moody lighting."
              value={data.design_style_prompt || ""}
              onChange={(e) => update({ design_style_prompt: e.target.value })}
              className={`${inputClass} resize-none`}
            />
            <p className="text-xs text-slate-400 mt-1">
              The more specific you are about materials, colors, and mood, the better the result.
            </p>
          </div>
        </div>
      )}

      {!enabled && (
        <p className="text-xs text-slate-400 text-center">
          Skip this step to go straight to your estimate, or toggle it on above to add a design concept.
        </p>
      )}
    </div>
  );
}