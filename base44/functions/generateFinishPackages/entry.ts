import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);

    const body = await req.json().catch(() => ({}));
    const { inspiration_photo_url, room_type } = body || {};

    if (!inspiration_photo_url) {
      return Response.json({
        success: false,
        error: "An inspiration photo is required to generate finish package suggestions.",
      }, { status: 400 });
    }

    const room = room_type || "residential space";

    const prompt = `You are an expert interior designer and finish package consultant for Bradley Brown Inc., a custom home builder in Brandon, Mississippi.

Analyze the uploaded inspiration photo for a ${room} project and generate exactly 3 distinct themed finish package suggestions. Each theme should reflect a different design direction inspired by the colors, materials, and style visible in the photo.

For each theme provide:
1. A memorable theme name (2-4 words)
2. A short description of the design direction (2-3 sentences)
3. A "signature" (premium) tier with specific recommendations for: cabinetry, countertops, flooring, fixtures (hardware/faucets), paint or wall treatment, lighting, and an estimated cost range for a typical ${room}
4. A "budget" tier that achieves a similar aesthetic at a lower price point, with the same categories and a lower estimated cost range

Make recommendations practical for Central Mississippi homeowners. Use specific, recognizable material names (e.g., "quartz countertop in Calacatta white", "shaker-style maple cabinetry", "LVP flooring in weathered oak"). Keep each material description to one line.`;

    const response = await base44.integrations.Core.InvokeLLM({
      prompt,
      file_urls: [inspiration_photo_url],
      model: "gemini_3_flash",
      response_json_schema: {
        type: "object",
        properties: {
          packages: {
            type: "array",
            items: {
              type: "object",
              properties: {
                theme_name: { type: "string" },
                theme_description: { type: "string" },
                signature: {
                  type: "object",
                  properties: {
                    cabinetry: { type: "string" },
                    countertops: { type: "string" },
                    flooring: { type: "string" },
                    fixtures: { type: "string" },
                    paint: { type: "string" },
                    lighting: { type: "string" },
                    estimated_cost: { type: "string" },
                  },
                },
                budget: {
                  type: "object",
                  properties: {
                    cabinetry: { type: "string" },
                    countertops: { type: "string" },
                    flooring: { type: "string" },
                    fixtures: { type: "string" },
                    paint: { type: "string" },
                    lighting: { type: "string" },
                    estimated_cost: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    });

    const packages = response?.packages || [];

    if (!packages.length) {
      return Response.json({
        success: false,
        error: "Unable to generate finish packages from this photo. Please try a different image.",
      }, { status: 422 });
    }

    return Response.json({
      success: true,
      packages,
    });
  } catch (error) {
    console.error("generateFinishPackages error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}