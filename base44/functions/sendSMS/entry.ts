import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    let user = null;
    try {
      user = await base44.auth.me();
    } catch {
      user = null;
    }

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only admins may trigger outbound SMS. This prevents low-privileged users
    // from turning the function into an open SMS relay against Twilio billing.
    if (user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
    const authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
    const fromNumber = Deno.env.get("TWILIO_FROM_NUMBER");
    const adminPhone = Deno.env.get("ADMIN_PHONE_NUMBER");

    if (!accountSid || !authToken || !fromNumber) {
      return Response.json({ error: "Twilio credentials not configured" }, { status: 500 });
    }

    const { to, message } = await req.json();
    if (!to || !message) {
      return Response.json({ error: "Missing 'to' or 'message'" }, { status: 400 });
    }

    // Lock the recipient to the pre-approved admin phone number. Even an admin
    // account cannot use this endpoint to send SMS to arbitrary destinations.
    if (!adminPhone || to !== adminPhone) {
      return Response.json({ error: "Recipient not allowed" }, { status: 403 });
    }

    const forwardUrl = "https://forward-message-3536-921x3d.twil.io/forward-message";
    const body = new URLSearchParams();
    body.append('To', to);
    body.append('Body', message);
    body.append('From', fromNumber);

    const twilioResponse = await fetch(forwardUrl, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    const responseData = await twilioResponse.json();

    if (twilioResponse.ok) {
      return Response.json({ status: "success", twilio_sid: responseData.sid });
    } else {
      return Response.json({ status: "error", error_message: responseData.message || "Failed to send SMS" });
    }
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});