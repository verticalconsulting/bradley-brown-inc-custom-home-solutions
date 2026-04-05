import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { visitorName, visitorEmail, conversationSummary, messages, pageUrl } = await req.json();

    // Build a readable transcript of the last several messages
    const transcript = (messages || [])
      .slice(-10)
      .filter(m => m.role === "user" || m.role === "assistant")
      .map(m => `${m.role === "user" ? visitorName || "Visitor" : "AI"}: ${m.content}`)
      .join("\n");

    const body = {
      visitorName: visitorName || "Unknown",
      visitorEmail: visitorEmail || "Not provided",
      summary: conversationSummary || "Visitor requested to speak with Brad or has a serious inquiry.",
      transcript,
      pageUrl: pageUrl || "",
      timestamp: new Date().toISOString(),
    };

    const response = await fetch("https://forward-message-3536-921x3d.twil.io/forward-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      return Response.json({ error: `Webhook failed: ${text}` }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});