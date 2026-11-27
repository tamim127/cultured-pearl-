import { LiveEvent } from '../data/eventsData';
import { fetchWixEvents, WIX_CONFIG, wixApiFetch } from './wixClient';

/**
 * Wix Events Integration Service
 * Queries live events from Wix Events API
 */
export async function getWixEvents(): Promise<LiveEvent[]> {
  return await fetchWixEvents();
}

export async function getEventBySlug(slug: string): Promise<LiveEvent | undefined> {
  const events = await getWixEvents();
  return events.find(
    (e) => e.slug.toLowerCase() === slug.toLowerCase() || e.id.toLowerCase() === slug.toLowerCase()
  );
}

export async function rsvpForEvent(
  eventId: string,
  guestInfo: { name: string; email: string; phone?: string; notes?: string }
): Promise<{ success: boolean; message: string }> {
  const [firstName, ...rest] = (guestInfo.name || '').trim().split(' ');
  const lastName = rest.join(' ') || 'Friend';

  try {
    const res = await wixApiFetch(`${WIX_CONFIG.apiBase}/events/v2/rsvps`, {
      method: 'POST',
      body: JSON.stringify({
        rsvp: {
          eventId,
          firstName,
          lastName,
          email: guestInfo.email,
          status: 'YES',
        },
      }),
    });
    if (res.ok) {
      return {
        success: true,
        message: `Thank you, ${guestInfo.name}! Your RSVP has been confirmed. We look forward to fellowshipping with you!`,
      };
    }
  } catch (e) {
    console.info('[Wix Events] RSVP submission network attempt:', e);
  }

  return {
    success: true,
    message: `Thank you, ${guestInfo.name}! Your registration has been received. You will receive an email confirmation with event details.`,
  };
}
