import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const PRESET_PROMPTS = {
  old_english_office:
    "old English cigar lounge office, dark walnut wood built-ins, brown leather executive chair, brass desk lamp, deep green walls, vintage books, cigar lounge atmosphere, coffered ceiling, warm moody lighting, masculine luxury interior design",
  modern_luxury:
    "modern luxury interior, clean lines, large-format porcelain, matte black fixtures, integrated LED lighting, designer furnishings, soft neutral palette",
  farmhouse:
    "modern farmhouse interior, shiplap accent wall, white oak floors, shaker cabinetry, black hardware, apron-front sink, soft natural daylight, cozy textiles",
  industrial:
    "industrial loft interior, exposed brick, blackened steel beams, edison bulb pendant lighting, concrete floors, reclaimed wood, leather and metal furniture",
  coastal:
    "coastal interior, whitewashed shiplap, light oak floors, linen upholstery, brushed brass fixtures, soft blues and sandy neutrals, abundant natural light",
  traditional:
    "traditional American interior, raised-panel cabinetry, crown molding, hardwood floors, classic chandelier, warm neutral palette, timeless furnishings",
  minimalist:
    "minimalist interior, monochrome palette, hidden cabinetry, integrated lighting, polished concrete, sparse curated decor, soft diffused daylight",
};

const PRESERVATION_INSTRUCTION =
  "Preserve the original room layout, wall structure, windows, doors, flooring direction, ceiling shape, and camera perspective. Change the visual design style, materials, lighting, furniture, decor, and finish selections based on the user's prompt and inspiration images. Make the result photorealistic and suitable for a remodeling visualization.";

const NEGATIVE_PROMPT =
  "cartoon, blurry, distorted furniture, warped walls, extra windows, bad perspective, low quality, unrealistic lighting, duplicate objects, messy layout, deformed architecture, oversaturated, fantasy, CGI look.";

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me().catch(() => null);
    // Public quote assistant — auth not required.

    const body = await req.json().catch(() => ({}));
    const {
      project_type,
      location,
      description,
      design_photo,
      inspiration_images = [],
      design_style_prompt,
      style_preset,
    } = body || {};

    if (!design_photo) {
      return Response.json({
        success: false,
        error: "A current room/project photo is required to generate a design concept.",
      }, { status: 400 });
    }

    const presetText = style_preset && PRESET_PROMPTS[style_preset] ? PRESET_PROMPTS[style_preset] : "";
    const userText = (design_style_prompt || "").trim();

    const finalPrompt = [
      `Remodeling visualization for a ${project_type || "home"} project${location ? ` in ${location}` : ""}.`,
      description ? `Project context: ${description}` : "",
      presetText ? `Style direction: ${presetText}.` : "",
      userText ? `Design intent from homeowner: ${userText}` : "",
      PRESERVATION_INSTRUCTION,
      `Avoid: ${NEGATIVE_PROMPT}`,
    ].filter(Boolean).join("\n\n");

    // Use the built-in image generation integration as image-to-image with
    // the current room photo as the source and inspiration images as style refs.
    const referenceUrls = [design_photo, ...(Array.isArray(inspiration_images) ? inspiration_images : [])].filter(Boolean);

    let imageUrls = [];
    try {
      const result = await base44.integrations.Core.GenerateImage({
        prompt: finalPrompt,
        existing_image_urls: referenceUrls,
      });
      if (result?.url) imageUrls = [result.url];
    } catch (imgErr) {
      console.error("GenerateImage failed:", imgErr);
      return Response.json({
        success: false,
        error: "Image generation service is unavailable right now.",
        prompt_used: finalPrompt,
      }, { status: 502 });
    }

    if (!imageUrls.length) {
      // Graceful placeholder fallback so the UI can still render something useful.
      return Response.json({
        success: true,
        placeholder: true,
        message: "Design concept could not be generated. Showing your inspiration references instead.",
        image_urls: [],
        prompt_used: finalPrompt,
        reference_urls: referenceUrls,
      });
    }

    return Response.json({
      success: true,
      image_urls: imageUrls,
      prompt_used: finalPrompt,
      reference_urls: referenceUrls,
      submitted_by: user?.email || null,
    });
  } catch (error) {
    console.error("generateRemodelConcept error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});