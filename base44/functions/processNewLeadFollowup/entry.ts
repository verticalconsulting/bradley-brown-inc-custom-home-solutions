import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const FROM_NAME = "Bradley Brown Inc.";

function buildThankYouEmail(name) {
  const firstName = (name || "").split(" ")[0] || "there";
  return {
    subject: "Thanks for reaching out to Bradley Brown Inc.",
    body: `Hi ${firstName},

Thank you for your interest in Bradley Brown Inc.! We've received your inquiry and truly appreciate you considering us for your project.

One of our team members will be in touch with you very soon — typically within 1 business day — to learn more about your project and answer any questions you may have.

In the meantime, feel free to:
• Browse recent projects: https://bradleybrowninc.com/Portfolio
• See real jobsites we're working: https://bradleybrowninc.com/jobsites
• Read what our clients say: https://bradleybrowninc.com/customertestimonials

If your project is time-sensitive or you'd like to talk now, give us a call at (844) 351-4154.

Talk soon,
The Bradley Brown Inc. Team
Licensed & Insured · Brandon, MS · Since 1995
(844) 351-4154
bradleybrowninc@gmail.com`
  };
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();

    // Resolve lead data (handle large-payload case)
    let lead = payload.data;
    if (!lead && payload.event?.entity_id) {
      const entityName = payload.event.entity_name; // "Lead" or "QuoteRequest"
      lead = await base44.asServiceRole.entities[entityName].get(payload.event.entity_id);
    }
    if (!lead) return Response.json({ success: false, error: "No lead data" }, { status: 200 });

    const email = lead.email;
    const name = lead.name || "";
    const phone = lead.phone || "";

    if (!email && !phone) {
      return Response.json({ success: true, skipped: "no contact info" });
    }

    // 1) Upsert into Client CRM (dedupe by email or phone)
    let existing = [];
    if (email) {
      existing = await base44.asServiceRole.entities.Client.filter({ email });
    }
    if (existing.length === 0 && phone) {
      existing = await base44.asServiceRole.entities.Client.filter({ phone });
    }

    const projectType = lead.project_type || "";
    const clientPayload = {
      name: name || (email ? email.split("@")[0] : "New Lead"),
      email: email || "",
      phone: phone || "",
      project_type: projectType,
      status: "lead",
      notes: lead.message || lead.description || "",
      budget_range: lead.budget_range || "",
      last_contacted: new Date().toISOString(),
    };

    let clientId;
    if (existing.length > 0) {
      clientId = existing[0].id;
      // Merge: only fill in blanks, don't overwrite existing CRM notes
      const merged = { ...clientPayload };
      if (existing[0].notes && clientPayload.notes) {
        merged.notes = `${existing[0].notes}\n---\n${clientPayload.notes}`;
      } else if (existing[0].notes) {
        merged.notes = existing[0].notes;
      }
      await base44.asServiceRole.entities.Client.update(clientId, merged);
    } else {
      const created = await base44.asServiceRole.entities.Client.create(clientPayload);
      clientId = created.id;
    }

    // 2) Send thank-you email (best-effort — Base44 SendEmail only delivers to
    //    registered app users, so external leads will be rejected. We catch and
    //    continue so the automation still succeeds and the CRM record is kept.)
    let emailSent = false;
    let emailSkippedReason = null;
    if (email) {
      try {
        const { subject, body } = buildThankYouEmail(name);
        await base44.asServiceRole.integrations.Core.SendEmail({
          from_name: FROM_NAME,
          to: email,
          subject,
          body,
        });
        emailSent = true;
      } catch (emailErr) {
        emailSkippedReason = emailErr?.message || String(emailErr);
        console.warn("Thank-you email not delivered:", emailSkippedReason);
      }
    }

    return Response.json({
      success: true,
      client_id: clientId,
      email_sent: emailSent,
      email_skipped_reason: emailSkippedReason,
    });
  } catch (error) {
    console.error("processNewLeadFollowup error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});