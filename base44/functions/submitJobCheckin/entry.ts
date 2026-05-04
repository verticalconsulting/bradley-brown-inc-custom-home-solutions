import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

function slugify(str) {
  return String(str || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();

    const expected = Deno.env.get("JOBSITE_CHECKIN_PASSCODE");
    if (!expected || body.passcode !== expected) {
      return Response.json({ success: false, error: "Invalid passcode" }, { status: 401 });
    }

    const {
      title, service, description, city, neighborhood, state, zip,
      latitude, longitude, photos, checkin_date, submitted_by,
    } = body;

    if (!title || !service || !city) {
      return Response.json({ success: false, error: "Missing required fields (title, service, city)" }, { status: 400 });
    }

    const dateStr = (checkin_date || new Date().toISOString().split("T")[0]).split("T")[0];
    const baseSlug = `${slugify(service)}-${slugify(city)}-${dateStr}-${slugify(title)}`.slice(0, 90);

    // Ensure uniqueness
    let slug = baseSlug;
    let suffix = 1;
    while (true) {
      const existing = await base44.asServiceRole.entities.JobCheckin.filter({ slug });
      if (!existing || existing.length === 0) break;
      suffix += 1;
      slug = `${baseSlug}-${suffix}`;
      if (suffix > 50) break;
    }

    const created = await base44.asServiceRole.entities.JobCheckin.create({
      title,
      slug,
      service,
      description: description || "",
      city,
      neighborhood: neighborhood || "",
      state: state || "MS",
      zip: zip || "",
      latitude: latitude ? Number(latitude) : undefined,
      longitude: longitude ? Number(longitude) : undefined,
      photos: Array.isArray(photos) ? photos : [],
      checkin_date: dateStr,
      submitted_by: submitted_by || "",
      status: "draft",
    });

    // Notify admin via SMS (best-effort)
    try {
      const adminPhone = Deno.env.get("ADMIN_PHONE_NUMBER");
      if (adminPhone) {
        await base44.asServiceRole.functions.invoke("sendSMS", {
          to: adminPhone,
          message: `New jobsite check-in pending review: "${title}" in ${city}. Submitted by ${submitted_by || "crew"}. Approve in CRM.`,
        });
      }
    } catch (_) { /* ignore notify failure */ }

    return Response.json({ success: true, id: created.id, slug: created.slug });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});