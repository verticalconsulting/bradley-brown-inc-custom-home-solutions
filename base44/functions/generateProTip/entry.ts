import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import OpenAI from 'npm:openai';

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80);
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

// Category-specific image direction — used to build the AI image prompt
// and to validate that the resulting visual matches the article subject.
const CATEGORY_IMAGE_DIRECTION = {
  'kitchen-remodeling': {
    subject:
      'an interior kitchen remodel showing custom cabinets, a large island, quartz or granite countertops, a tile backsplash, pendant lighting, hardwood or tile floors, refined Southern-home finishes',
    avoid: 'no outdoor scenes, no grills, no patios',
  },
  'bathroom-remodeling': {
    subject:
      'a renovated residential bathroom showing a walk-in tile shower, a vanity with quartz top, modern fixtures, polished mirror, soft warm lighting, clean finishes',
    avoid: 'no kitchens, no outdoor scenes',
  },
  'outdoor-living': {
    subject:
      'a covered outdoor living space showing an outdoor kitchen with built-in grill, stone or brick counters, comfortable outdoor seating, ceiling fan or covered porch structure, warm Southern backyard setting, lush landscaping in the background',
    avoid:
      'no indoor kitchens, no interior rooms, no people cooking inside, no generic indoor remodel scenes',
  },
  'curb-appeal': {
    subject:
      'the exterior front of a Southern-style home showing a welcoming front porch, manicured landscaping, a clean walkway, shutters, fresh siding or brick, a tasteful entryway, daylight',
    avoid: 'no interior rooms, no kitchens, no bathrooms',
  },
  'home-value': {
    subject:
      'a polished finished residential remodel showing upgraded curb appeal or a refined interior — a modern but timeless Southern home design with features that suggest improved resale value',
    avoid: 'no construction-in-progress scenes, no demolition, no clutter',
  },
  'interior-updates': {
    subject:
      'an updated interior living area showing fresh paint, refinished hardwood or new flooring, modern recessed and pendant lighting, refined trim and crown molding, an open and bright layout',
    avoid: 'no exteriors, no outdoor scenes, no kitchens or bathrooms in close-up',
  },
  'home-remodeling': {
    subject:
      'a beautifully finished residential home remodel — could be a refined Southern kitchen, living area, or covered porch — with bright natural light and upscale residential finishes',
    avoid: 'no commercial buildings, no offices',
  },
};

// Category-matched Unsplash fallbacks (used only if AI image generation fails).
const FALLBACK_IMAGES = {
  'kitchen-remodeling': {
    url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80',
    alt: 'Bright modern remodeled kitchen with white cabinets, large island, and pendant lighting',
  },
  'bathroom-remodeling': {
    url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1600&q=80',
    alt: 'Renovated modern bathroom with walk-in tile shower and vanity',
  },
  'outdoor-living': {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
    alt: 'Covered backyard patio with outdoor seating and warm lighting',
  },
  'curb-appeal': {
    url: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1600&q=80',
    alt: 'Southern home exterior with manicured landscaping and welcoming front porch',
  },
  'home-value': {
    url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1600&q=80',
    alt: 'Polished two-story home with strong curb appeal and clean landscaping',
  },
  'interior-updates': {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80',
    alt: 'Updated interior living space with fresh paint, modern lighting, and refinished flooring',
  },
  'home-remodeling': {
    url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80',
    alt: 'Beautifully finished custom home remodeling project',
  },
};

function buildImagePrompt({ title, topic, category, excerpt }) {
  const direction = CATEGORY_IMAGE_DIRECTION[category] || CATEGORY_IMAGE_DIRECTION['home-remodeling'];
  return [
    `Realistic professional home remodeling photograph for a website hero image.`,
    `Subject: ${direction.subject}.`,
    `The image should clearly illustrate the article topic: "${topic}" (article title: "${title}").`,
    excerpt ? `Context from the article: ${excerpt}` : '',
    `Style: bright natural daylight, polished Southern-home design, high-end but realistic residential remodeling, clean website-hero composition, 16:9 cinematic framing, shallow depth of field, photorealistic, magazine-quality interior/exterior photography.`,
    `Strict rules: no text, no logos, no signs, no watermarks, no distorted architecture, no unrealistic objects, no people unless absolutely necessary for the topic, no generic duplicate stock-photo look.`,
    `Category constraint: ${direction.avoid}.`,
  ]
    .filter(Boolean)
    .join(' ');
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const openai = new OpenAI({ apiKey: Deno.env.get('OPENAI_API_KEY') });

    // ─── Step 1: Generate the full blog post in one structured call ──────────
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: `You are a remodeling SEO writer for Bradley Brown Inc., a custom home builder and remodeling contractor in Central Mississippi.

Write visually polished, SEO-friendly blog content using clean markdown that renders beautifully on a website.

Critical formatting rules:
- Return clean markdown only.
- Do not include the main blog title in the content body.
- Start with a short intro paragraph before the first section heading.
- Every major section heading must use ## markdown syntax.
- Every smaller subsection must use ### markdown syntax.
- Do not write plain text section headings.
- Use blank lines between every paragraph, heading, and list.
- Keep paragraphs short, ideally 2-4 sentences max.
- Use bullet lists for pro tips, mistakes, checklists, or grouped ideas.
- Bullet points should use this format: - **Tip title:** Explanation text.
- Use **bold text** for key tips, warnings, and takeaways.
- Avoid long blocks of text.
- Avoid tables unless absolutely necessary.
- Do not use emojis.
- Do not keyword stuff.
- Do not include fake statistics.

Critical writing style rules (to sound human, not AI):
- Write like an experienced Mississippi contractor talking to a neighbor — not a content mill.
- Use contractions freely (you'll, we've, don't, it's, we're).
- Vary sentence length dramatically. Short punchy sentences. Then longer explanatory ones.
- Include specific, concrete details from real experience — "In 30 years building in Rankin County, we've seen too many homeowners skip this step..."
- AVOID these AI-typical phrases: delve into, navigate, realm, crucial, elevate, embark, tapestry, unveil, uncover, it's worth noting, when it comes to, in the world of, game-changer, holistic, synergy, robust, landscape (as metaphor).
- Don't start more than one sentence with "However," "Moreover," "Furthermore," or "Additionally."
- Address the reader directly with "you" and "your."
- Keep it practical and conversational, not academic.
- If a tip feels obvious, say so — "This sounds basic, but you'd be surprised how many homes we walk into where..."
- Don't use a predictable intro formula. Start with a real scenario, a question, or a surprising fact.

The blog should include:
- a short intro paragraph
- ## Why This Project Matters
- ## Pro Tips for Better Results
- ## Common Mistakes to Avoid
- ## When to Call a Professional Contractor
- ## Final Takeaway

The article should include practical advice homeowners can actually use, explain how the project can improve appeal or home value, and end with a subtle call to action for Bradley Brown Inc. at (844) 351-4154.

You always return valid JSON.`,
        },
        {
          role: 'user',
          content: `Generate ONE new SEO-focused "Pro Tips" blog post for homeowners. Pick a fresh, specific topic homeowners are actively searching for right now — something that reads like a real Google search (e.g. "kitchen remodel ideas that add the most value", "small bathroom remodel ideas on a budget", "outdoor kitchen designs for Southern homes", "curb appeal upgrades that increase home value"). Avoid generic titles.

Before writing, mentally research what homeowners are searching for right now in the home improvement space. Focus on topics with HIGH search volume. Think about seasonal relevance (outdoor living in spring, energy efficiency in fall), current trends, and specific questions real homeowners ask contractors.

Pick a topic that:
1. Has high monthly search volume (estimate 1,000+ searches/month)
2. Matches an intent a homeowner searches BEFORE hiring a contractor
3. Is specific enough to rank for (not "kitchen remodel" but "kitchen island ideas for small kitchens")
4. Has relevance to the Mississippi / Southern home market

Topic areas to draw from:
- remodeling ideas that add value
- kitchen remodeling ideas
- bathroom remodeling ideas
- outdoor living upgrades (patios, decks, porches, outdoor kitchens)
- curb appeal upgrades
- interior updates
- energy-efficient home upgrades
- budget-friendly remodeling
- projects that increase home value / resale value
- Central Mississippi / Southern home improvement needs

Naturally include relevant search phrases ONLY when they fit (do not keyword stuff): home remodeling tips, remodeling ideas that add value, curb appeal upgrades, kitchen remodeling ideas, bathroom remodeling ideas, outdoor living upgrades, Central Mississippi remodeling contractor.

Article length: 700–900 words. Follow the system formatting rules EXACTLY — every section heading must start with "## " on its own line, every subsection with "### " on its own line, with blank lines around them. Never write a section title as plain paragraph text.

Required structure:
1. Short intro paragraph (no heading)
2. ## Why This Project Matters
3. ## Pro Tips for Better Results
4. ## Common Mistakes to Avoid
5. ## When to Call a Professional Contractor
6. ## Final Takeaway

Return a JSON object with EXACTLY these fields:
{
  "topic": "short search-style phrase the article answers",
  "title": "compelling SEO title, 50–65 characters",
  "slug": "url-friendly-slug-with-hyphens",
  "excerpt": "1–2 sentence hook for blog listings, ~160 chars",
  "meta_description": "SEO meta description, 150–160 characters, includes primary keyword",
  "content": "full markdown article body, 700–900 words, no H1, headings use ## and ### syntax",
  "category": "ONE of: home-remodeling, kitchen-remodeling, bathroom-remodeling, outdoor-living, curb-appeal, home-value, interior-updates"
}

Choose the category that BEST matches the actual subject of the post. If the post is about an outdoor kitchen or patio, category MUST be outdoor-living, not kitchen-remodeling.`,
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

    // ─── Step 2: Build category-aware image prompt + generate the image ──────
    const imagePrompt = buildImagePrompt({ title, topic, category, excerpt });

    let imageUrl = null;
    let imageAlt = '';
    let imageError = null;

    try {
      const result = await base44.asServiceRole.integrations.Core.GenerateImage({
        prompt: imagePrompt,
      });
      imageUrl = result?.url || null;
    } catch (err) {
      imageError = err?.message || String(err);
      console.error('GenerateImage failed:', imageError);
    }

    // Generate a concise SEO alt text for whichever image we end up using
    try {
      const altRes = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: `Write a single sentence (max 120 characters) of SEO-friendly alt text describing the hero image for a blog post titled "${title}" in the category "${category}". Describe what the image shows literally and concretely. No quotes, no period at the end.`,
          },
        ],
      });
      imageAlt = altRes.choices[0].message.content.trim().replace(/^"|"$/g, '').slice(0, 140);
    } catch {
      imageAlt = '';
    }

    // ─── Step 3: Fallback if AI image generation failed ──────────────────────
    if (!imageUrl) {
      const fb = FALLBACK_IMAGES[category] || FALLBACK_IMAGES['home-remodeling'];
      imageUrl = fb.url;
      if (!imageAlt) imageAlt = fb.alt;
    }

    if (!imageAlt) {
      imageAlt = `${title} — Bradley Brown Inc.`;
    }

    // ─── Step 4: Save the post ───────────────────────────────────────────────
    const post = await base44.asServiceRole.entities.BlogPost.create({
      title,
      slug,
      topic,
      excerpt,
      meta_description,
      content,
      image_url: imageUrl,
      image_alt_text: imageAlt,
      image_prompt: imagePrompt,
      category,
      published: true,
    });

    return Response.json({
      success: true,
      post,
      image_generated: !imageError,
      image_error: imageError,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});