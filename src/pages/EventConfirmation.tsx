import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { LIVE_EVENTS } from '../data/eventsData';

export function EventConfirmation() {
  const [searchParams] = useSearchParams();

  // Support query params whether passed in search, hash, or window.location
  const urlSearch = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const hashSearch = typeof window !== 'undefined' && window.location.hash.includes('?')
    ? new URLSearchParams(window.location.hash.split('?')[1])
    : null;

  const orderNumber =
    searchParams.get('orderNumber') ||
    urlSearch?.get('orderNumber') ||
    hashSearch?.get('orderNumber') ||
    searchParams.get('orderId') ||
    urlSearch?.get('orderId') ||
    hashSearch?.get('orderId') ||
    '';

  const eventId =
    searchParams.get('eventId') ||
    urlSearch?.get('eventId') ||
    hashSearch?.get('eventId') ||
    '';

  const matchedEvent = LIVE_EVENTS.find(
    (e) => e.id.toLowerCase() === eventId.toLowerCase() || e.slug.toLowerCase().includes(eventId.toLowerCase())
  ) || LIVE_EVENTS[0];

  if (!orderNumber) {
    return (
      <div className="min-h-[60vh] bg-[#F9F8F5] flex flex-col items-center justify-center p-8 text-center text-espresso">
        <h1 className="font-serif text-3xl font-bold mb-3">No Order Specified</h1>
        <p className="text-sm font-sans text-espresso/70 mb-6 max-w-md">
          We couldn't locate an active ticket order in this session. If you recently made a purchase, please check your email for the confirmation receipt.
        </p>
        <Link to="/events">
          <Button variant="primary">Browse All Gatherings</Button>
        </Link>
      </div>
    );
  }

  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    matchedEvent ? matchedEvent.title : 'Cultured Pearl Gathering'
  )}&details=${encodeURIComponent(
    `Confirmed ticket reservation #${orderNumber} for ${matchedEvent?.title || 'Cultured Pearl'}. Thank you for joining us!`
  )}&location=${encodeURIComponent(matchedEvent?.location || 'Location is TBD')}`;

  return (
    <div className="min-h-[70vh] bg-[#F9F8F5] pt-16 pb-24 text-espresso">
      <div className="max-w-xl mx-auto px-4 text-center">
        <div className="p-8 sm:p-10 bg-pearl rounded-2xl border border-emerald-300 shadow-soft space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl font-bold shadow-sm">
            ✓
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-gold-soft font-bold mb-1">
              Official Wix Events Order
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-espresso">
              You're Going!
            </h1>
            <p className="text-sm font-semibold text-espresso/70 mt-1">
              Order #{orderNumber}
            </p>
          </div>

          {matchedEvent && (
            <div className="py-4 border-y border-sand/40 text-left space-y-2">
              <h2 className="font-serif text-xl font-bold text-espresso">
                {matchedEvent.title}
              </h2>
              <p className="text-xs font-sans text-espresso/80">
                📅 <span className="font-semibold">{matchedEvent.dateStr}</span> • {matchedEvent.timeStr}
              </p>
              <p className="text-xs font-sans text-espresso/70">
                📍 {matchedEvent.location}
              </p>
            </div>
          )}

          <p className="text-xs sm:text-sm font-sans text-espresso/80 leading-relaxed max-w-md mx-auto">
            Your ticket reservation has been recorded in our Wix Events system. A confirmation receipt and e-tickets have been dispatched to your email address.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center py-2.5 px-6 rounded-lg text-xs font-bold text-espresso bg-sand/40 hover:bg-sand border border-sand/60 transition shadow-sm"
            >
              📅 Add to Google Calendar
            </a>
            <Link to="/events" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto bg-[#3C3228] hover:bg-gold hover:text-espresso text-pearl text-xs uppercase tracking-wider font-bold py-2.5 px-6 rounded-lg shadow-sm transition"
              >
                View More Gatherings
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
