import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();

    const { data, event } = payload;

    const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
    const authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
    const fromNumber = Deno.env.get("TWILIO_FROM_NUMBER");
    const adminPhone = Deno.env.get("ADMIN_PHONE_NUMBER");

    if (!accountSid || !authToken || !fromNumber || !adminPhone) {
      return Response.json({ error: "Twilio not configured" }, { status: 500 });
    }

    const name = data?.name || "Unknown";
    const email = data?.email || "N/A";
    const phone = data?.phone || "N/A";
    const projectType = (data?.project_type || "N/A").replace(/_/g, " ");
    const description = data?.description || data?.message || "N/A";

    const message = `🏠 NEW LEAD - Bradley Brown Inc!\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nProject: ${projectType}\nDetails: ${description.substring(0, 100)}`;

    const twilioUrl = "https://forward-message-3536-921x3d.twil.io/forward-message";
    const body = new URLSearchParams();
    body.append('To', adminPhone);
    body.append('From', fromNumber);
    body.append('Body', message);

    const twilioResponse = await fetch(twilioUrl, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    const result = await twilioResponse.json();

    if (twilioResponse.ok) {
      return Response.json({ status: "success", sid: result.sid });
    } else {
      return Response.json({ status: "error", error: result.message }, { status: 500 });
    }
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});