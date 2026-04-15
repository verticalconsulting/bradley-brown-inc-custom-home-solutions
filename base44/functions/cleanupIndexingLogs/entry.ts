import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    // List all logs older than 30 days
    const allLogs = await base44.asServiceRole.entities.IndexingLog.filter({
      created_date: { $lt: cutoff }
    });

    if (!allLogs.length) {
      return Response.json({ deleted: 0, message: "No old logs to clean up." });
    }

    // Delete them all
    await Promise.all(allLogs.map(log => base44.asServiceRole.entities.IndexingLog.delete(log.id)));

    return Response.json({ deleted: allLogs.length, message: `Deleted ${allLogs.length} log(s) older than 30 days.` });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});