import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import OpenAI from 'npm:openai';

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80);
}

// Curated Unsplash image map — keyed by topic keywords.
// Each entry pairs an image with descriptive alt text.
const IMAGE_MAP = [
  { keys: ['kitchen'], category: 'kitchen-remodeling',
    url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
    alt: 'Bright modern remodeled kitchen with white cabinets and a large island' },
  { keys: ['bathroom', 'bath ', 'shower', 'tub'], category: 'bathroom-remodeling',
    url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80',
    alt: 'Renovated modern bathroom with walk-in shower and tile finishes' },
  { keys: ['deck', 'patio', 'porch', 'outdoor kitchen', 'outdoor living', 'pergola', 'backyard'], category: 'outdoor-living',
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    alt: 'Covered backyard patio with outdoor furniture and warm string lights' },
  { keys: ['curb appeal', 'front door', 'landscaping', 'exterior', 'siding', 'driveway'], category: 'curb-appeal',
    url: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1200&q=80',
    alt: 'Charming Southern home exterior with manicured landscaping and welcoming front porch' },
  { keys: ['resale', 'home value', 'roi', 'appraisal', 'increase value', 'add value'], category: 'home-value',
    url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80',
    alt: 'Two-story home with for-sale-ready curb appeal and clean landscaping' },
  { keys: ['paint', 'interior', 'living room', 'lighting', 'flooring', 'trim', 'molding'], category: 'interior-updates',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    alt: 'Updated interior living space with fresh paint, modern lighting, and refinished flooring' },
  { keys: ['energy', 'efficient', 'insulation', 'window', 'hvac', 'solar'], category: 'home-remodeling',
    url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&q=80',
    alt: 'Energy-efficient home windows with natural light filling a modern room' },
  { keys: ['budget', 'affordable', 'cheap', 'low cost', 'inexpensive'], category: 'home-remodeling',
    url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200&q=80',
    alt: 'Affordable home remodeling project in progress with tools and materials' },
  { keys: ['addition', 'expand', 'sunroom', 'bonus room'], category: 'home-remodeling',
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    alt: 'Bright home addition with vaulted ceiling and large windows' },
];

const DEFAULT_IMAGE = {
  url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80',
  alt: 'Custom home remodeling project in progress',
  category: 'home-remodeling',
};

function pickImage(topic) {
  const t = topic.toLowerCase();
  for (const entry of IMAGE_MAP) {
    if (entry.keys.some(k => t.includes(k))) return entry;
  }
  return DEFAULT_IMAGE;
}

const VALID_CATEGORIES = [
  'home-remodeling',
  'kitchen-remodeling',
  'bathroom-remodeling',
  'outdoor-living',
  'curb-appeal',
  'home-value',
  'interior-updates',
];

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const openai = new OpenAI({ apiKey: Deno.env.get('OPENAI_API_KEY') });

    // Single structured call — generates topic + full SEO post in one shot.
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'You are an SEO content strategist and home improvement expert writing for Bradley Brown Inc., a custom home builder and remodeling contractor based in Brandon, Mississippi (Central MS). You write practical, helpful "Pro Tips" articles for homeowners — not generic filler. You understand what homeowners actually type into Google when planning a remodel, boosting home value, or improving curb appeal. You always return valid JSON.',
        },
        {
          role: 'user',
          content: `Generate ONE new SEO-focused "Pro Tips" blog post for homeowners. Pick a fresh, specific topic homeowners are actively searching for right now in one of these areas:
- remodeling ideas
- kitchen remodeling
- bathroom remodeling
- outdoor living (patios, decks, porches, outdoor kitchens)
- curb appeal upgrades
- interior updates
- energy-efficient home upgrades
- budget-friendly remodeling
- projects that increase home value / resale value
- Mississippi / Southern home improvement needs

Choose a topic that reads like a real Google search (e.g. "kitchen remodel ideas that add the most value" or "small bathroom remodel ideas on a budget"). Avoid generic titles like "Home Improvement Tips".

Write a practical Pro Tips article of 700–900 words that includes:
- practical, specific remodeling advice
- what improves appeal or home value
- common mistakes homeowners make and how to avoid them
- clear guidance on when to call a professional contractor
- one subtle, natural call-to-action mentioning Bradley Brown Inc. and the phone number (844) 351-4154 near the end

Markdown formatting rules:
- Use ## for section headers (3–5 sections)
- Short paragraphs (2–4 sentences)
- Use bullet points where they help readability
- Do NOT include a # title at the top — start directly with the first ## section
- Do not include the phrase "In this article" or filler intros
- Sound like a knowledgeable Mississippi builder, not a marketing brochure

Return a JSON object with EXACTLY these fields:
{
  "topic": "short search-style phrase the article answers",
  "title": "compelling SEO title, 50–65 characters",
  "slug": "url-friendly-slug-with-hyphens",
  "excerpt": "1–2 sentence hook for blog listings, ~160 chars",
  "meta_description": "SEO meta description, 150–160 characters, includes primary keyword",
  "content": "full markdown article body, 700–900 words",
  "category": "ONE of: home-remodeling, kitchen-remodeling, bathroom-remodeling, outdoor-living, curb-appeal, home-value, interior-updates",
  "image_keyword": "1–3 word visual keyword that best matches the article (e.g. 'kitchen', 'deck', 'curb appeal', 'bathroom remodel')"
}`,
        },
      ],
    });

    const raw = completion.choices[0].message.content;
    let data;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      return Response.json({ error: 'Invalid JSON from model', raw }, { status: 500 });
    }

    // Normalize and validate
    const title = String(data.title || '').trim().replace(/^"|"$/g, '');
    const topic = String(data.topic || title).trim();
    const slug = slugify(data.slug || title);
    const excerpt = String(data.excerpt || '').trim();
    const meta_description = String(data.meta_description || excerpt).trim().slice(0, 160);
    const content = String(data.content || '').trim();
    const category = VALID_CATEGORIES.includes(data.category) ? data.category : 'home-remodeling';

    if (!title || !content) {
      return Response.json({ error: 'Model returned incomplete post', data }, { status: 500 });
    }

    // Pick image from curated map using both the topic and the model's image_keyword
    const image = pickImage(`${data.image_keyword || ''} ${topic} ${title}`);

    const post = await base44.asServiceRole.entities.BlogPost.create({
      title,
      slug,
      topic,
      excerpt,
      meta_description,
      content,
      image_url: image.url,
      image_alt_text: image.alt,
      category,
      published: true,
    });

    return Response.json({ success: true, post });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});