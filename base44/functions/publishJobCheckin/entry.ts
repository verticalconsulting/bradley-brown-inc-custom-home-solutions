import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== "admin") {
      return Response.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const { id, action } = await req.json();
    if (!id || !["publish", "reject", "unpublish"].includes(action)) {
      return Response.json({ success: false, error: "Invalid request" }, { status: 400 });
    }

    const updates = {};
    if (action === "publish") {
      updates.status = "published";
      updates.published_date = new Date().toISOString();
    } else if (action === "reject") {
      updates.status = "rejected";
    } else {
      updates.status = "draft";
    }

    const updated = await base44.asServiceRole.entities.JobCheckin.update(id, updates);
    return Response.json({ success: true, jobcheckin: updated });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});