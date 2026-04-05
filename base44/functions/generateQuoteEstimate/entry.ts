import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import OpenAI from 'npm:openai';

const openai = new OpenAI({ apiKey: Deno.env.get("OPENAI_API_KEY") });

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { project_type, location, square_footage_estimate, budget_range, timeline, description, features_selected } = await req.json();

    const featuresText = features_selected?.length ? features_selected.join(", ") : "Not specified";
    const sqft = square_footage_estimate ? `${square_footage_estimate} sq ft` : "Not specified";

    const prompt = `You are an expert construction cost estimator for Central Mississippi (Jackson, Madison, Rankin counties). 
    
Analyze this home construction/renovation project and provide a detailed cost estimate:

Project Type: ${project_type}
Location: ${location || "Central Mississippi"}
Square Footage: ${sqft}
Budget Range Given: ${budget_range || "Not specified"}
Timeline: ${timeline || "Not specified"}
Features/Scope: ${featuresText}
Project Description: ${description || "Not provided"}

Consider:
- Central Mississippi labor rates (typically 15-20% below national average)
- Current material costs (2026 pricing)
- Local permit costs
- Mississippi climate considerations (humidity, heat)

Respond with a JSON object only, no markdown:
{
  "estimate_range": "e.g. $280,000 – $340,000",
  "timeline": "e.g. 10–14 months",
  "complexity": "e.g. Moderate / High / Standard",
  "confidence": "e.g. Medium – need site visit for precision",
  "key_factors": ["list", "of", "3-5 key cost drivers for this project"],
  "recommendations": ["2-4 actionable recommendations to optimize cost or timeline"]
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      max_tokens: 600,
    });

    const analysis = JSON.parse(response.choices[0].message.content);
    return Response.json({ success: true, analysis });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});