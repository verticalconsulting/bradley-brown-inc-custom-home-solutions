import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

const TIME_LABELS = {
    "08:00": "8:00 AM", "09:00": "9:00 AM", "10:00": "10:00 AM",
    "11:00": "11:00 AM", "13:00": "1:00 PM", "14:00": "2:00 PM",
    "15:00": "3:00 PM", "16:00": "4:00 PM",
};

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);

        const body = await req.json();

        // Honeypot — real users never see/fill this hidden field; bots do.
        if (body.website) {
            return Response.json({ success: true, message: 'Scheduled.' });
        }

        const { name, email, phone, project_type, location, date, time, notes } = body;

        if (!name || !email || !date || !time) {
            return Response.json({ error: 'Missing required fields: name, email, date, time' }, { status: 400 });
        }

        const accessToken = await base44.asServiceRole.connectors.getAccessToken("googlecalendar");

        // Build start/end datetime
        const startDateTime = new Date(`${date}T${time}:00`);
        const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // 1 hour

        const event = {
            summary: `Site Visit - ${name}`,
            description: [
                `Client: ${name}`,
                `Email: ${email}`,
                phone ? `Phone: ${phone}` : null,
                project_type ? `Project Type: ${project_type}` : null,
                location ? `Location: ${location}` : null,
                notes ? `Notes: ${notes}` : null,
            ].filter(Boolean).join('\n'),
            start: {
                dateTime: startDateTime.toISOString(),
                timeZone: 'America/Chicago',
            },
            end: {
                dateTime: endDateTime.toISOString(),
                timeZone: 'America/Chicago',
            },
            attendees: [{ email }],
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 24 * 60 },
                    { method: 'popup', minutes: 60 },
                ],
            },
        };

        const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?sendUpdates=all', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        });

        if (!response.ok) {
            const err = await response.json();
            return Response.json({ error: err.error?.message || 'Failed to create calendar event' }, { status: 500 });
        }

        const createdEvent = await response.json();

        // Send SMS notification to admin
        const twilioSid = Deno.env.get("TWILIO_ACCOUNT_SID");
        const twilioAuth = Deno.env.get("TWILIO_AUTH_TOKEN");
        const twilioFrom = Deno.env.get("TWILIO_FROM_NUMBER");
        const adminPhone = Deno.env.get("ADMIN_PHONE_NUMBER");

        if (twilioSid && twilioAuth && twilioFrom && adminPhone) {
            const smsBody = `New Site Visit Booked!\nClient: ${name}\nEmail: ${email}\nDate: ${date}\nTime: ${TIME_LABELS[time] || time}${phone ? `\nPhone: ${phone}` : ""}`;
            await fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`, {
                method: "POST",
                headers: {
                    "Authorization": "Basic " + btoa(`${twilioSid}:${twilioAuth}`),
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({ From: twilioFrom, To: adminPhone, Body: smsBody }),
            });
        }

        // Save to QuoteRequest entity if applicable
        await base44.asServiceRole.entities.QuoteRequest.create({
            name,
            email,
            phone: phone || '',
            project_type: project_type || 'other',
            location: location || '',
            description: `Site visit scheduled for ${date} at ${time}. ${notes || ''}`.trim(),
            status: 'contacted',
        });

        return Response.json({
            success: true,
            eventId: createdEvent.id,
            eventLink: createdEvent.htmlLink,
            message: `Site visit scheduled for ${date} at ${time}. A calendar invite has been sent to ${email}.`,
        });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});