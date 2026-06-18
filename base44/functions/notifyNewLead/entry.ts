import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Fail fast if Twilio not configured
    const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
    const authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
    const fromNumber = Deno.env.get("TWILIO_FROM_NUMBER");
    const adminPhone = Deno.env.get("ADMIN_PHONE_NUMBER");

    if (!accountSid || !authToken || !fromNumber || !adminPhone) {
      console.error("Missing Twilio env vars:", { accountSid: !!accountSid, authToken: !!authToken, fromNumber: !!fromNumber, adminPhone: !!adminPhone });
      return Response.json({ error: "Twilio not configured" }, { status: 500 });
    }

    // Defensive JSON parsing with raw body fallback
    const rawText = await req.text();
    console.log("Request body:", rawText);
    console.log("Request headers:", Object.fromEntries(req.headers.entries()));

    let payload;
    try {
      payload = JSON.parse(rawText);
    } catch {
      console.error("Non-JSON body received:", rawText);
      return Response.json(
        { error: "Invalid request body", received: rawText.substring(0, 100) },
        { status: 400 }
      );
    }

    const { data } = payload;

    const name = data?.name || "Unknown";
    const email = data?.email || "N/A";
    const phone = data?.phone || "N/A";
    const projectType = (data?.project_type || "N/A").replace(/_/g, " ");
    const description = data?.description || data?.message || "N/A";

    const message = `🏠 NEW LEAD - Bradley Brown Inc!\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nProject: ${projectType}\nDetails: ${description.substring(0, 100)}`;

    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
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

    const resultText = await twilioResponse.text();
    console.log("Twilio response status:", twilioResponse.status);
    console.log("Twilio response body:", resultText);

    if (twilioResponse.ok) {
      return Response.json({ status: "success", message: resultText });
    } else {
      // Twilio rejected (e.g. 401 Unauthorized from rotated/invalid credentials).
      // Log it but return 200 so the automation does not retry-spam — the lead
      // is already saved in the database; SMS notification is best-effort.
      console.error("Twilio rejected request:", twilioResponse.status, resultText);
      return Response.json({
        status: "sms_skipped",
        twilio_status: twilioResponse.status,
        twilio_error: resultText.substring(0, 200),
      });
    }
  } catch (error) {
    console.error("Unhandled error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});