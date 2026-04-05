import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import OpenAI from 'npm:openai';

const openai = new OpenAI({ apiKey: Deno.env.get("OPENAI_API_KEY") });

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Step 1: Find the most searched home remodeling topic right now
    const topicRes = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a home improvement content strategist. Use your knowledge of trending Google searches to identify what homeowners are searching most right now."
        },
        {
          role: "user",
          content: "What is one of the most searched home remodeling 'how to' or problem-solving topics right now? Just return the topic as a short phrase (e.g. 'how to update a bathroom on a budget'). Nothing else."
        }
      ]
    });

    const topic = topicRes.choices[0].message.content.trim();

    // Step 2: Write a full blog post on that topic
    const blogRes = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a home improvement expert and writer for Bradley Brown Inc., a custom home builder in Central Mississippi. Write helpful, practical, and engaging blog posts for homeowners. Use markdown formatting with headers (##), bullet points, and clear sections. Keep it around 500-700 words."
        },
        {
          role: "user",
          content: `Write a helpful Pro Tips blog post about: "${topic}". Include practical advice that homeowners can actually use. Mention when it's best to call a professional contractor. End with a subtle call to action for Bradley Brown Inc. at (601) 954-1306. Do NOT include a title at the top — just the body content starting with the first section header.`
        }
      ]
    });

    const content = blogRes.choices[0].message.content.trim();

    // Step 3: Generate a descriptive title
    const titleRes = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: `Create a catchy, SEO-friendly blog post title for an article about: "${topic}". Return only the title, nothing else.` }
      ]
    });

    const title = titleRes.choices[0].message.content.trim().replace(/^"|"$/g, '');
    const slug = slugify(title);

    // Step 4: Find a relevant Unsplash image
    const imageKeyword = topic.split(' ').slice(0, 3).join('+');
    const image_url = `https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80`;

    // Step 5: Pick a better image via keyword
    const imageMap = {
      bathroom: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
      kitchen: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      flooring: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
      roof: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      paint: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80",
      deck: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      budget: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80",
      window: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80",
      insulation: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      outdoor: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    };

    const topicLower = topic.toLowerCase();
    let finalImage = image_url;
    for (const [key, url] of Object.entries(imageMap)) {
      if (topicLower.includes(key)) { finalImage = url; break; }
    }

    // Save to database
    const post = await base44.asServiceRole.entities.BlogPost.create({
      title,
      slug,
      topic,
      content,
      image_url: finalImage,
      published: true,
      category: "home-remodeling"
    });

    return Response.json({ success: true, post });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});