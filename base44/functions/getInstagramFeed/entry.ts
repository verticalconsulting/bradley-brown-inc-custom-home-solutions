import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { accessToken } = await base44.asServiceRole.connectors.getConnection("instagram");

    // Fetch the 12 most recent media items
    const fields = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp";
    const url = `https://graph.instagram.com/me/media?fields=${fields}&limit=12&access_token=${accessToken}`;
    const res = await fetch(url);

    if (!res.ok) {
      const errText = await res.text();
      return Response.json({ success: false, error: `Instagram API error: ${errText}` }, { status: 500 });
    }

    const data = await res.json();
    const posts = (data.data || []).map(p => ({
      id: p.id,
      caption: p.caption || "",
      media_type: p.media_type,
      media_url: p.media_url,
      thumbnail_url: p.thumbnail_url || null,
      permalink: p.permalink,
      timestamp: p.timestamp,
    }));

    return Response.json({ success: true, posts });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});