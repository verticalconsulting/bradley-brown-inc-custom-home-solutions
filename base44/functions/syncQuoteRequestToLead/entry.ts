import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();

    // Support direct calls with quote data, or entity automation payload
    const quoteData = body.data || body;
    const { name, email, phone, location, project_type, description, budget_range } = quoteData;

    if (!name || !email) {
      return Response.json({ error: 'Missing required fields: name, email' }, { status: 400 });
    }

    // Map QuoteRequest project_type enum to Lead project_type enum
    const projectTypeMap = {
      custom_home: 'Custom Home',
      renovation: 'Kitchen Remodel',
      addition: 'Room Addition',
      outdoor: 'Outdoor Living',
      other: 'Other',
    };

    const leadData = {
      name,
      email,
      phone: phone || '',
      address: location || '',
      project_type: projectTypeMap[project_type] || 'Other',
      message: description
        ? `${description}${budget_range ? ` | Budget: ${budget_range}` : ''}`
        : budget_range || '',
      source: 'AI Quote Estimator',
      status: 'new',
    };

    // Check if a lead with this email already exists from the same source to avoid duplicates
    const existing = await base44.asServiceRole.entities.Lead.filter({
      email,
      source: 'AI Quote Estimator',
    });

    if (existing && existing.length > 0) {
      return Response.json({ skipped: true, reason: 'Lead already exists for this email from AI Quote Estimator' });
    }

    const lead = await base44.asServiceRole.entities.Lead.create(leadData);

    console.log(`[syncQuoteRequestToLead] Created lead ${lead.id} for ${email}`);
    return Response.json({ success: true, lead_id: lead.id });
  } catch (error) {
    console.error('[syncQuoteRequestToLead] Error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});