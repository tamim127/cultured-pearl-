const fs = require('fs');
const { execSync } = require('child_process');

async function checkCRMContact() {
  const token = execSync('npx @wix/cli@latest token', { encoding: 'utf8' }).trim();
  const siteId = '6f7426b7-afd2-4e14-84db-49d2395b4ee7';

  // Query contacts
  const res = await fetch('https://www.wixapis.com/contacts/v4/contacts/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
      'wix-site-id': siteId
    },
    body: JSON.stringify({
      search: { expression: 'Sarah' }
    })
  });
  console.log('Contacts query status:', res.status);
  const data = await res.json();
  console.log('Contacts found with Sarah:', data.contacts?.length);
  for (const c of data.contacts || []) {
    console.log('Contact:', {
      id: c.id,
      name: c.info?.name,
      emails: c.info?.emails,
      createdDate: c.createdDate
    });
  }

  // Also query RSVPs for the Gala 2027 event
  const rsvpRes = await fetch('https://www.wixapis.com/events/v2/rsvps/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
      'wix-site-id': siteId
    },
    body: JSON.stringify({
      query: {
        filter: { eventId: 'ce9f7432-2ea8-46b3-970b-891c88fadab0' }
      }
    })
  });
  console.log('RSVPs query status:', rsvpRes.status);
  const rsvpData = await rsvpRes.json();
  console.log('RSVPs found for event:', rsvpData.rsvps?.length);
  for (const r of rsvpData.rsvps || []) {
    console.log('RSVP:', {
      id: r.id,
      firstName: r.firstName,
      lastName: r.lastName,
      email: r.email,
      createdDate: r.createdDate,
      status: r.status
    });
  }
}

checkCRMContact().catch(console.error);
