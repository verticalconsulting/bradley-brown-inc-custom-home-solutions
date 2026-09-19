import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { visitorName, visitorEmail, conversationSummary, messages, pageUrl } = await req.json();

    // --- Input validation: prevent abuse from unauthenticated callers ---
    // Require a real conversation (at least 2 messages) so empty/spam
    // requests cannot trigger Twilio message forwarding.
    if (!Array.isArray(messages) || messages.length < 2) {
      return Response.json({ error: "A minimum conversation history is required." }, { status: 400 });
    }
    // Validate message structure — only role/content pairs are accepted.
    const validMessages = messages.filter(
      m => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim()
    );
    if (validMessages.length < 2) {
      return Response.json({ error: "Invalid conversation messages." }, { status: 400 });
    }
    // Enforce reasonable field-length limits.
    const MAX_LEN = 2000;
    const name = typeof visitorName === "string" ? visitorName.slice(0, 100) : "Unknown";
    const email = typeof visitorEmail === "string" ? visitorEmail.slice(0, 200) : "Not provided";
    const summary = typeof conversationSummary === "string" ? conversationSummary.slice(0, MAX_LEN) : "";
    const url = typeof pageUrl === "string" ? pageUrl.slice(0, 500) : "";

    // Build a readable transcript of the last several messages
    const transcript = validMessages
      .slice(-10)
      .map(m => `${m.role === "user" ? name : "AI"}: ${m.content.slice(0, MAX_LEN)}`)
      .join("\n");

    const body = {
      visitorName: name,
      visitorEmail: email,
      summary: summary || "Visitor requested to speak with Brad or has a serious inquiry.",
      transcript,
      pageUrl: url,
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