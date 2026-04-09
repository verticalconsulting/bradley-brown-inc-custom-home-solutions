import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';
import OpenAI from 'npm:openai';

const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY'),
});

function normalizeProjectType(projectType) {
  if (!projectType) return 'general renovation';
  const value = projectType.toLowerCase();
  if (value.includes('kitchen')) return 'kitchen remodel';
  if (value.includes('bath')) return 'bathroom remodel';
  if (value.includes('addition')) return 'addition';
  if (value.includes('whole') || value.includes('full') || value.includes('entire')) return 'whole home renovation';
  if (value.includes('outdoor') || value.includes('patio') || value.includes('deck')) return 'outdoor living project';
  if (value.includes('garage')) return 'garage or shop project';
  return projectType;
}

function inferSquareFootage(projectType, description = '') {
  const text = `${projectType} ${description}`.toLowerCase();
  if (text.includes('kitchen')) return '150-300';
  if (text.includes('bath')) return '40-120';
  if (text.includes('addition')) return '250-800';
  if (text.includes('whole home')) return '1500-3000';
  if (text.includes('deck') || text.includes('patio')) return '150-500';
  return 'Not specified';
}

function inferFinishTier(featuresText, description) {
  const text = `${featuresText} ${description}`.toLowerCase();
  const highEndTerms = ['custom cabinets','quartz','granite','marble','frameless glass','luxury','premium','high-end','designer','custom tile','hardwood','built-in','wolf','sub-zero','commercial range'];
  const budgetTerms = ['builder grade','budget','basic','cosmetic','laminate','vinyl','stock cabinets','simple update'];
  if (highEndTerms.some((term) => text.includes(term))) return 'high';
  if (budgetTerms.some((term) => text.includes(term))) return 'low';
  return 'mid';
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    void base44;

    const body = await req.json();
    const { project_type, location, square_footage_estimate, budget_range, timeline, description, features_selected } = body;

    const normalizedProjectType = normalizeProjectType(project_type);
    const featuresText = Array.isArray(features_selected) && features_selected.length
      ? features_selected.join(', ')
      : 'Not specified';

    const inferredSqft = square_footage_estimate || inferSquareFootage(normalizedProjectType, description);
    const sqftText = inferredSqft !== 'Not specified' ? `${inferredSqft} sq ft` : 'Not specified';
    const finishTier = inferFinishTier(featuresText, description || '');

    const prompt = `
You are a senior home renovation estimator for Central Mississippi, especially Jackson, Madison, and Rankin counties.

Give a realistic ballpark estimate for a renovation or building project using 2026 Central Mississippi labor and material pricing. Think like a local remodeling contractor, not a generic AI.

Project Details:
- Project Type: ${normalizedProjectType}
- Location: ${location || 'Central Mississippi'}
- Estimated Size: ${sqftText}
- Budget Range Provided: ${budget_range || 'Not specified'}
- Desired Timeline: ${timeline || 'Not specified'}
- Features Selected: ${featuresText}
- Description: ${description || 'Not provided'}
- Inferred Finish Tier: ${finishTier}

Pricing Logic:
- Central Mississippi labor is commonly lower than national average, but do not underprice skilled trades
- Use realistic 2026 material pricing
- Include labor, materials, permits, demolition/prep, and contingency
- Labor is usually 40% to 55% of total cost depending on project complexity
- Contingency is usually 10% to 20%
- Permit costs are often $500 to $3,000 depending on scope
- Older homes, structural work, plumbing relocation, electrical upgrades, custom finishes, and moisture issues should push estimates upward
- Cosmetic-only updates, stock materials, and simple layouts should lower estimates

Project-Type Benchmarks:
- Kitchen remodel: $150-$300 per sq ft
- Bathroom remodel: $200-$400 per sq ft
- Addition: $120-$200 per sq ft
- Whole home renovation: $80-$150 per sq ft
- Outdoor living / patio / deck: use realistic local installed pricing, not interior pricing

Rules:
- Do not pretend this is an exact quote
- Do not be overly optimistic
- Give a practical estimate range
- If important info is missing, state assumptions clearly
- Keep recommendations useful and contractor-like
- ROI should be a rough resale/value-improvement estimate, not a guarantee

Return ONLY valid JSON with these exact fields:
{
  "estimate_range": "$XX,XXX - $XX,XXX",
  "likely_midpoint": "$XX,XXX",
  "price_per_sqft_assumption": "$XXX",
  "finish_tier": "low|mid|high",
  "cost_breakdown": {
    "labor": "$XX,XXX - $XX,XXX",
    "materials": "$XX,XXX - $XX,XXX",
    "permits": "$X,XXX - $X,XXX",
    "demolition_and_prep": "$X,XXX - $X,XXX",
    "contingency": "$X,XXX - $X,XXX"
  },
  "timeline": "X to X months",
  "complexity": "Low|Standard|Moderate|High",
  "confidence": "Low|Moderate|High",
  "assumptions": ["..."],
  "key_factors": ["..."],
  "scope_gaps_to_verify": ["..."],
  "recommendations": ["..."],
  "roi_outlook": {
    "resale_value_impact": "...",
    "cost_recoup_range": "XX% - XX%",
    "roi_note": "..."
  },
  "consultation_cta": "..."
}
`;

    const systemPrompt = 'You are a highly practical Central Mississippi home renovation estimator. Return only valid JSON. No markdown. No prose outside JSON.';

    // gpt-5 uses the Responses API
    const response = await openai.responses.create({
      model: 'gpt-5',
      max_output_tokens: 8000,
      input: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
    });

    console.log('[DEBUG] status:', response.status);
    console.log('[DEBUG] output length:', response.output?.length);

    // Extract text from Responses API output
    const content = response.output
      ?.filter(item => item.type === 'message')
      ?.flatMap(item => item.content)
      ?.filter(c => c.type === 'output_text')
      ?.map(c => c.text)
      ?.join('') || null;

    console.log('[DEBUG] content preview:', content?.substring(0, 200));

    if (!content) {
      return Response.json(
        { success: false, error: 'No content returned from OpenAI.', debug: { status: response.status, output: response.output } },
        { status: 500 }
      );
    }

    let analysis;
    try {
      analysis = JSON.parse(content);
    } catch {
      return Response.json(
        { success: false, error: 'Failed to parse AI response as JSON.', raw_response: content },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      analysis,
      meta: {
        normalized_project_type: normalizedProjectType,
        inferred_finish_tier: finishTier,
        square_footage_used: sqftText,
      },
    });
  } catch (error) {
    console.error('[ERROR]', error.message);
    return Response.json(
      { success: false, error: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
});