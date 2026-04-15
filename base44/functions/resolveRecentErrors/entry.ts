import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    // Fetch all error logs from the last 24 hours
    const recentLogs = await base44.asServiceRole.entities.IndexingLog.filter({
      success: false,
      created_date: { $gte: since }
    });

    if (!recentLogs.length) {
      return Response.json({ message: "No error logs in the last 24 hours.", resolved: [] });
    }

    // Deduplicate by error_message — keep last 5 unique
    const seenMessages = new Set();
    const uniqueErrors = [];
    for (const log of recentLogs.sort((a, b) => new Date(b.created_date) - new Date(a.created_date))) {
      const key = log.error_message || log.action || "unknown";
      if (!seenMessages.has(key)) {
        seenMessages.add(key);
        uniqueErrors.push(log);
      }
      if (uniqueErrors.length >= 5) break;
    }

    // Ask AI to diagnose and resolve each error
    const errorDescriptions = uniqueErrors.map((log, i) =>
      `Error ${i + 1}:
  Action: ${log.action}
  Error Message: ${log.error_message || "N/A"}
  HTTP Status: ${log.http_status || "N/A"}
  Triggered By: ${log.triggered_by || "N/A"}
  Date: ${log.created_date}`
    ).join("\n\n");

    const aiResponse = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: `You are an SEO and Google Search Console expert. Analyze the following indexing/crawl errors from the Bradley Brown Inc. home remodeling website and provide specific resolution steps for each.

${errorDescriptions}

For each error, provide:
1. Root cause analysis
2. Step-by-step resolution
3. Prevention tips

Return JSON with this structure:
{
  "resolutions": [
    {
      "errorIndex": 1,
      "action": "action name",
      "rootCause": "what caused this",
      "steps": ["step 1", "step 2"],
      "prevention": "how to prevent recurrence"
    }
  ],
  "summary": "overall summary of the error patterns and main recommendations"
}`,
      response_json_schema: {
        type: "object",
        properties: {
          resolutions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                errorIndex: { type: "number" },
                action: { type: "string" },
                rootCause: { type: "string" },
                steps: { type: "array", items: { type: "string" } },
                prevention: { type: "string" }
              }
            }
          },
          summary: { type: "string" }
        }
      }
    });

    return Response.json({
      message: `Analyzed ${uniqueErrors.length} unique error(s) from the last 24 hours.`,
      errorsAnalyzed: uniqueErrors.map(l => ({ id: l.id, action: l.action, error_message: l.error_message, created_date: l.created_date })),
      aiResolutions: aiResponse,
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});