import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
    const authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
    const fromNumber = Deno.env.get("TWILIO_FROM_NUMBER");

    if (!accountSid || !authToken || !fromNumber) {
      return Response.json({ error: "Twilio not configured" }, { status: 500 });
    }

    const { visitor_name, visitor_phone, page_url } = await req.json();

    if (!visitor_phone) {
      return Response.json({ error: "Missing visitor phone" }, { status: 400 });
    }

    const message = `New chat on Bradley Brown Inc! ${visitor_name || 'Visitor'} wants to message you. Page: ${page_url || 'N/A'}`;

    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    const body = new URLSearchParams();
    body.append('To', visitor_phone);
    body.append('Body', message);
    body.append('From', fromNumber);

    const twilioResponse = await fetch(twilioUrl, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    if (twilioResponse.ok) {
      const responseData = await twilioResponse.json();
      return Response.json({ status: "success", twilio_sid: responseData.sid });
    } else {
      const responseData = await twilioResponse.json();
      return Response.json({ status: "error", error_message: responseData.message || "Failed" });
    }
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});