const fs = require('fs');

async function test() {
  // 1. Get anonymous token
  const tokenRes = await fetch('https://www.wixapis.com/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'anonymous',
      client_id: 'ce53d5c9-71bf-455a-998b-006434e70ebd'
    })
  });
  const tokenData = await tokenRes.json();
  const token = tokenData.access_token;
  console.log('Anonymous token obtained.');

  // 2. Query event form definition for the upcoming event
  const eventId = 'ce9f7432-2ea8-46b3-970b-891c88fadab0';
  const formRes = await fetch(`https://www.wixapis.com/events/v3/events/${eventId}`, {
    headers: { 'Authorization': token }
  });
  const eventData = await formRes.json();
  console.log('Event details:', {
    id: eventData.event?.id,
    title: eventData.event?.title,
    registration: eventData.event?.registration,
    form: eventData.event?.form
  });

  // 3. Check RSVP Form schema
  const formId = eventData.event?.registration?.rsvp?.formId;
  console.log('Form ID:', formId);
  if (formId) {
    try {
      const fRes = await fetch(`https://www.wixapis.com/wix-forms/v1/forms/${formId}`, {
        headers: { 'Authorization': token }
      });
      console.log('Form status:', fRes.status);
      if (fRes.ok) {
        const formData = await fRes.json();
        console.log('Form data:', JSON.stringify(formData));
      }
    } catch(e) {
      console.log('Form fetch err:', e.message);
    }
  }

  // 4. Test RSVP creation with full payload
  console.log('Testing RSVP creation...');
  const testEmail = `test.attendee.${Date.now()}@example.com`;
  const rsvpPayload = {
    rsvp: {
      eventId: eventId,
      firstName: 'Sarah',
      lastName: 'Jenkins',
      email: testEmail,
      status: 'YES',
      guestCount: 1
    }
  };
  const rsvpRes = await fetch('https://www.wixapis.com/events/v2/rsvps', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(rsvpPayload)
  });
  console.log('RSVP HTTP Status:', rsvpRes.status);
  const rsvpBody = await rsvpRes.json();
  console.log('RSVP response:', JSON.stringify(rsvpBody, null, 2));

  // 5. Check what calendar links or confirmation messages are returned
  // 6. Check checkout endpoints
  console.log('Checking checkout endpoints...');
  try {
    const resCheckout = await fetch('https://www.wixapis.com/events/v1/checkout/available-tickets?eventId=' + eventId, {
      headers: { 'Authorization': token }
    });
    console.log('Available tickets status:', resCheckout.status, await resCheckout.text());
  } catch(e) {
    console.log('Ticket err:', e.message);
  }
}

test().catch(console.error);
