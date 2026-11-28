import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getEventBySlug,
  rsvpForEvent,
  getAvailableTickets,
  startTicketCheckout,
  TicketDefinition,
  EventRsvpResult,
} from '../services/wixEvents';
import { useWixLiveRefresh } from '../services/wixClient';
import { LiveEvent } from '../data/eventsData';
import { Button } from '../components/Button';

export function EventDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<LiveEvent | null>(null);
  const [loading, setLoading] = useState(true);

  // Tickets state
  const [tickets, setTickets] = useState<TicketDefinition[]>([]);
  const [ticketQuantities, setTicketQuantities] = useState<Record<string, number>>({});
  const [expandedInfo, setExpandedInfo] = useState<Record<string, boolean>>({});
  const [ticketSelectionError, setTicketSelectionError] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutNotice, setCheckoutNotice] = useState<{
    type: 'error' | 'warning';
    message: string;
    isPaymentSetup?: boolean;
  } | null>(null);

  // RSVP Form state (for complimentary events)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [guestNotes, setGuestNotes] = useState('');
  const [submittingRsvp, setSubmittingRsvp] = useState(false);
  const [rsvpResult, setRsvpResult] = useState<EventRsvpResult | null>(null);
  const [rsvpError, setRsvpError] = useState<string | null>(null);

  const loadEvent = useCallback(() => {
    if (slug) {
      getEventBySlug(slug).then((evt) => {
        setEvent(evt || null);
        setLoading(false);
        if (evt) {
          getAvailableTickets(evt.id).then((tData) => {
            setTickets(tData.definitions || []);
            const initQuantities: Record<string, number> = {};
            tData.definitions.forEach((d) => {
              initQuantities[d.id] = 0;
            });
            setTicketQuantities(initQuantities);
          });
        }
      });
    }
  }, [slug]);

  useEffect(() => {
    setLoading(true);
    setRsvpResult(null);
    setRsvpError(null);
    setCheckoutNotice(null);
    setTicketSelectionError(null);
    loadEvent();
  }, [loadEvent]);

  useWixLiveRefresh(loadEvent);

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;
    setSubmittingRsvp(true);
    setRsvpError(null);

    const res = await rsvpForEvent(event, {
      name: `${firstName} ${lastName}`.trim(),
      email: guestEmail,
      phone: guestPhone,
      guestCount,
      notes: guestNotes,
    });

    setSubmittingRsvp(false);
    if (res.success) {
      setRsvpResult(res);
    } else {
      setRsvpError(res.message);
    }
  };

  const handleTicketCheckout = async () => {
    if (!event) return;

    const picked = tickets
      .filter((t) => (ticketQuantities[t.id] || 0) > 0)
      .map((t) => ({
        ticketDefinitionId: t.id,
        name: t.name,
        quantity: ticketQuantities[t.id] || 0,
      }));

    if (picked.length === 0) {
      setTicketSelectionError('Please choose at least 1 ticket to proceed to checkout.');
      return;
    }

    setTicketSelectionError(null);
    setCheckoutNotice(null);
    setIsCheckingOut(true);

    const res = await startTicketCheckout(event, picked);
    setIsCheckingOut(false);

    if (res.success && res.redirectUrl) {
      // Official Wix Headless Events Checkout: navigate full window to Wix checkout page
      window.location.href = res.redirectUrl;
    } else if (res.requiresPaymentSetup) {
      setCheckoutNotice({
        type: 'warning',
        isPaymentSetup: true,
        message: res.message || 'Payment method required in Wix Dashboard.',
      });
    } else {
      setCheckoutNotice({
        type: 'error',
        message: res.message || 'Unable to proceed to checkout. Please try again.',
      });
    }
  };

  const toggleMoreInfo = (id: string) => {
    setExpandedInfo((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-[#F9F8F5]">
        <div className="inline-block w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-serif text-xl text-espresso/60 italic">Loading gathering details from Wix...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-[#F9F8F5]">
        <h2 className="font-serif text-3xl text-espresso font-bold mb-4">Gathering Not Found</h2>
        <p className="text-espresso/70 mb-6 font-sans text-sm">
          The requested gathering could not be located in our schedule.
        </p>
        <Link to="/events">
          <Button variant="primary">Return to All Events</Button>
        </Link>
      </div>
    );
  }

  const isTicketed = event.isOpenForTickets || tickets.length > 0;
  const isRsvpOpen = !isTicketed && event.isOpenForRsvp;
  const isClosed = event.isClosed || (!isTicketed && !isRsvpOpen);

  // Calculate ticket pricing with service fee
  const totalQuantity = Object.values(ticketQuantities).reduce((a, b) => a + b, 0);
  const totalPrice = tickets.reduce((acc, t) => {
    const qty = ticketQuantities[t.id] || 0;
    const base = parseFloat(t.price?.amount || '0');
    const fee = t.serviceFee || 0;
    return acc + qty * (base + fee);
  }, 0);

  // Social share URLs
  const currentUrl = window.location.href;
  const shareTitle = encodeURIComponent(event.title);
  const fbShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
  const twitterShare = `https://twitter.com/intent/tweet?text=${shareTitle}&url=${encodeURIComponent(currentUrl)}`;
  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;

  return (
    <div className="bg-[#F9F8F5] min-h-screen pt-12 pb-24 text-espresso">
      {/* 1. Centered Header Section */}
      <div className="max-w-3xl mx-auto px-4 text-center mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-espresso leading-tight mb-3">
          {event.title}
        </h1>

        <p className="text-xs uppercase tracking-wider text-espresso/70 font-semibold mb-4">
          {event.dateStr} | {event.location}
        </p>

        <p className="text-xs md:text-sm font-sans text-espresso/80 leading-relaxed max-w-2xl mx-auto mb-6">
          {event.description}
        </p>

        {event.isClosed ? (
          <span className="inline-block bg-sand/60 text-espresso/80 text-xs uppercase tracking-wider font-bold py-2 px-6 rounded-lg border border-sand">
            Registration Closed
          </span>
        ) : isTicketed ? (
          <button
            onClick={() => {
              const el = document.getElementById('tickets-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-block bg-[#3C3228] hover:bg-gold hover:text-espresso text-pearl text-xs uppercase tracking-wider font-bold py-2.5 px-8 rounded-lg shadow-sm transition duration-200"
          >
            Buy Tickets
          </button>
        ) : isRsvpOpen ? (
          <button
            onClick={() => {
              const el = document.getElementById('rsvp-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-block bg-[#3C3228] hover:bg-gold hover:text-espresso text-pearl text-xs uppercase tracking-wider font-bold py-2.5 px-8 rounded-lg shadow-sm transition duration-200"
          >
            Reserve Your Place
          </button>
        ) : (
          <span className="inline-block bg-sand/60 text-espresso/80 text-xs uppercase tracking-wider font-bold py-2 px-6 rounded-lg border border-sand">
            Registration Closed
          </span>
        )}
      </div>

      {/* 2. Hero Banner Image */}
      <div className="max-w-4xl mx-auto px-4 mb-12">
        <div className="rounded-2xl overflow-hidden shadow-soft border border-sand/60 bg-sand/20">
          <img
            src={event.banner}
            alt={event.title}
            className="w-full h-auto object-cover max-h-[500px]"
          />
        </div>
      </div>

      {/* 3. Event Details Content Column */}
      <div className="max-w-3xl mx-auto px-4">
        {/* Time & Location */}
        <div className="mb-10 pb-8 border-b border-sand/40">
          <h2 className="font-serif text-2xl font-bold text-espresso mb-3">Time & Location</h2>
          <p className="text-sm font-sans text-espresso font-medium">
            {event.dateStr}, {event.timeStr}
          </p>
          <p className="text-xs font-sans text-espresso/70 mt-1">
            {event.locationAddress || event.location || 'Location is TBD'}
          </p>
        </div>

        {/* Guests Section (Dynamic Wix Event Attendees) */}
        {Boolean(event.guestsCount && event.guestsCount > 0) && (
          <div className="mb-10 pb-8 border-b border-sand/40">
            <h2 className="font-serif text-2xl font-bold text-espresso mb-4">Guests</h2>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div
                  className="w-10 h-10 rounded-full bg-sand/70 border-2 border-[#F9F8F5] flex items-center justify-center text-espresso/60 shadow-sm text-sm"
                  title="Registered Guest"
                >
                  👤
                </div>
                <div
                  className="w-10 h-10 rounded-full bg-sand/90 border-2 border-[#F9F8F5] flex items-center justify-center text-espresso/60 shadow-sm text-sm"
                  title="Registered Guest"
                >
                  👤
                </div>
                <div
                  className="w-10 h-10 rounded-full bg-gold/25 border-2 border-[#F9F8F5] flex items-center justify-center text-espresso/70 shadow-sm text-sm"
                  title="Registered Guest"
                >
                  👤
                </div>
              </div>
              <span className="text-xs sm:text-sm font-sans text-espresso/80 font-semibold">
                + {Math.max(1, (event.guestsCount || 16) - 3)} other guests
              </span>
            </div>
          </div>
        )}

        {/* About the event */}
        <div className="mb-12 pb-8 border-b border-sand/40">
          <h2 className="font-serif text-2xl font-bold text-espresso mb-3">About the event</h2>
          <div className="text-xs md:text-sm font-sans text-espresso/80 leading-relaxed space-y-4">
            {event.longDescription ? (
              <p className="whitespace-pre-line">{event.longDescription}</p>
            ) : (
              <p>{event.description}</p>
            )}
          </div>
        </div>

        {/* 4. Action Section: Tickets OR RSVP OR Closed */}
        {isTicketed ? (
          <div id="tickets-section" className="mb-12 pb-8 border-b border-sand/40 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-espresso mb-4">Tickets</h2>

            <div>
              {ticketSelectionError && (
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-xs">
                  ⚠️ {ticketSelectionError}
                </div>
              )}

              {checkoutNotice && (
                <div
                  className={`mb-6 p-4 rounded-xl border text-xs leading-relaxed ${
                    checkoutNotice.isPaymentSetup
                      ? 'bg-amber-50/90 border-amber-300 text-amber-900 shadow-sm'
                      : 'bg-red-50 border-red-200 text-red-700'
                  }`}
                >
                  <div className="font-bold mb-1 flex items-center gap-1.5 text-sm">
                    {checkoutNotice.isPaymentSetup ? '⚠️ Wix Payment Provider Configuration Required' : '⚠️ Checkout Notice'}
                  </div>
                  <p>{checkoutNotice.message}</p>
                  {checkoutNotice.isPaymentSetup && (
                    <div className="pt-3 flex flex-wrap gap-2">
                      <a
                        href="https://manage.wix.com/dashboard/6f7426b7-afd2-4e14-84db-49d2395b4ee7/settings/accept-payments"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#3C3228] text-pearl rounded-lg font-bold text-[11px] hover:bg-gold hover:text-espresso transition shadow-sm"
                      >
                        ⚙️ Configure Payments in Wix Dashboard →
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Tickets Table */}
              <div className="border border-sand/60 rounded-xl overflow-hidden bg-pearl/60 mb-6">
                {/* Header */}
                <div className="grid grid-cols-12 bg-sand/30 px-4 py-2.5 text-[11px] uppercase tracking-wider text-espresso/70 font-bold border-b border-sand/40">
                  <div className="col-span-6 sm:col-span-7">Ticket type</div>
                  <div className="col-span-3 sm:col-span-3 text-left">Price</div>
                  <div className="col-span-3 sm:col-span-2 text-right">Quantity</div>
                </div>

                {/* Rows */}
                {tickets.map((t) => {
                  const qty = ticketQuantities[t.id] || 0;
                  const isExpanded = expandedInfo[t.id];

                  return (
                    <div key={t.id} className="border-b border-sand/30 last:border-b-0 p-4">
                      <div className="grid grid-cols-12 items-center gap-2">
                        <div className="col-span-6 sm:col-span-7">
                          <p className="text-sm font-bold text-espresso">{t.name}</p>
                          {t.description && (
                            <button
                              type="button"
                              onClick={() => toggleMoreInfo(t.id)}
                              className="text-[11px] text-gold-soft hover:underline font-sans flex items-center gap-1 mt-0.5"
                            >
                              <span>More info</span>
                              <span>{isExpanded ? '▲' : '▼'}</span>
                            </button>
                          )}
                        </div>

                        <div className="col-span-3 sm:col-span-3">
                          <p className="text-sm font-bold text-espresso">{t.price?.formatted || '$0.00'}</p>
                          {t.serviceFee && (
                            <p className="text-[10px] text-espresso/60 font-sans">
                              +${t.serviceFee.toFixed(2)} ticket service fee
                            </p>
                          )}
                        </div>

                        <div className="col-span-3 sm:col-span-2 text-right">
                          <select
                            value={qty}
                            onChange={(e) => {
                              const val = parseInt(e.target.value, 10);
                              setTicketQuantities((prev) => ({ ...prev, [t.id]: val }));
                              setTicketSelectionError(null);
                              setCheckoutNotice(null);
                            }}
                            className="px-2 py-1 bg-pearl border border-sand rounded text-xs text-espresso focus:outline-none focus:ring-1 focus:ring-gold"
                          >
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Expandable More Info */}
                      {isExpanded && t.description && (
                        <div className="mt-3 pt-3 border-t border-sand/20 text-xs text-espresso/70 font-sans italic bg-sand/10 p-2.5 rounded">
                          {t.description}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Total and Checkout Button */}
              <div className="flex flex-col items-end gap-3">
                <div className="text-sm font-sans font-bold text-espresso">
                  <span>Total: </span>
                  <span className="font-serif text-lg">${totalPrice.toFixed(2)}</span>
                </div>

                <button
                  type="button"
                  onClick={handleTicketCheckout}
                  disabled={isCheckingOut || event.isClosed}
                  className="bg-[#3C3228] hover:bg-gold hover:text-espresso disabled:opacity-50 text-pearl text-xs uppercase tracking-wider font-bold py-2.5 px-10 rounded shadow-sm transition duration-200 flex items-center gap-2"
                >
                  {isCheckingOut ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-pearl border-t-transparent rounded-full animate-spin" />
                      <span>Connecting to Wix Checkout...</span>
                    </>
                  ) : event.isClosed ? (
                    <span>Registration Closed</span>
                  ) : (
                    <span>Checkout</span>
                  )}
                </button>
                <p className="text-[10px] text-espresso/50">
                  Direct Wix Headless Cashier Checkout
                </p>
              </div>
            </div>
          </div>
        ) : isRsvpOpen ? (
          /* Complimentary RSVP Section */
          <div id="rsvp-section" className="mb-12 pb-8 border-b border-sand/40 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-espresso mb-2">Reserve Your Place</h2>
            <p className="text-xs text-espresso/70 mb-6 font-sans">
              Complimentary RSVP • Confirmed instantly with calendar invite and Wix CRM.
            </p>

            {rsvpResult ? (
              <div className="p-8 bg-pearl/90 rounded-2xl text-center border border-emerald-300 shadow-soft space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-espresso">RSVP Confirmed!</h3>
                  <p className="text-xs text-espresso/80 mt-1 max-w-md mx-auto leading-relaxed">
                    {rsvpResult.message}
                  </p>
                </div>

                {rsvpResult.calendarLinks && (
                  <div className="pt-4 border-t border-sand/40 flex flex-wrap justify-center gap-3">
                    {rsvpResult.calendarLinks.google && (
                      <a
                        href={rsvpResult.calendarLinks.google}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-4 rounded-lg text-xs font-bold text-espresso bg-sand/40 hover:bg-sand transition"
                      >
                        📅 Add to Google Calendar
                      </a>
                    )}
                    {rsvpResult.calendarLinks.ics && (
                      <a
                        href={rsvpResult.calendarLinks.ics}
                        download="event.ics"
                        className="py-2 px-4 rounded-lg text-xs font-bold text-espresso bg-sand/40 hover:bg-sand transition"
                      >
                        📥 Download Calendar Invite (.ics)
                      </a>
                    )}
                  </div>
                )}

                <button
                  onClick={() => {
                    setRsvpResult(null);
                    setFirstName('');
                    setLastName('');
                    setGuestEmail('');
                    setGuestPhone('');
                    setGuestNotes('');
                  }}
                  className="text-xs text-gold font-bold hover:underline block mx-auto pt-2"
                >
                  Register another guest
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleRsvpSubmit}
                className="bg-pearl/80 p-6 md:p-8 rounded-2xl border border-sand/60 shadow-soft space-y-4"
              >
                {rsvpError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs">
                    ⚠️ {rsvpError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-espresso/80 font-bold mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-sand bg-pearl focus:outline-none focus:ring-1 focus:ring-gold text-xs"
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-espresso/80 font-bold mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-sand bg-pearl focus:outline-none focus:ring-1 focus:ring-gold text-xs"
                      placeholder="Last Name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-espresso/80 font-bold mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-sand bg-pearl focus:outline-none focus:ring-1 focus:ring-gold text-xs"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-espresso/80 font-bold mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-sand bg-pearl focus:outline-none focus:ring-1 focus:ring-gold text-xs"
                      placeholder="(202) 555-0100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-espresso/80 font-bold mb-1">
                    Number of Guests
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-sand bg-pearl focus:outline-none focus:ring-1 focus:ring-gold text-xs"
                  >
                    <option value={1}>1 Guest (Myself)</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                    <option value={5}>5 Guests</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-espresso/80 font-bold mb-1">
                    Prayer Request / Special Notes
                  </label>
                  <textarea
                    rows={2}
                    value={guestNotes}
                    onChange={(e) => setGuestNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-sand bg-pearl focus:outline-none focus:ring-1 focus:ring-gold text-xs"
                    placeholder="Optional notes or questions for our sisterhood..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingRsvp}
                  className="w-full bg-[#3C3228] hover:bg-gold hover:text-espresso text-pearl text-xs uppercase tracking-wider font-bold py-3 rounded-lg shadow-sm transition duration-200 mt-2"
                >
                  {submittingRsvp ? 'Submitting to Wix Events...' : 'Confirm Event RSVP (Free)'}
                </button>
              </form>
            )}
          </div>
        ) : (
          /* Closed Event Section */
          <div className="mb-12 p-6 rounded-2xl bg-sand/30 border border-sand text-center">
            <h3 className="font-serif text-xl font-bold text-espresso mb-2">Registration Closed</h3>
            <p className="text-xs text-espresso/70 mb-4 max-w-md mx-auto">
              Online registration for this gathering has concluded. We invite you to join our future sisterhood gatherings.
            </p>
            <Link to="/events">
              <Button variant="outline" className="text-xs">
                Explore Upcoming Events →
              </Button>
            </Link>
          </div>
        )}

        {/* 5. Share this event Section */}
        <div className="pt-2 text-center">
          <p className="text-xs uppercase tracking-wider text-espresso/70 font-bold mb-3">
            Share this event
          </p>
          <div className="flex justify-center items-center gap-4 text-espresso/80 text-sm">
            <a
              href={fbShare}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Facebook"
              className="w-8 h-8 rounded-full border border-sand flex items-center justify-center hover:bg-sand transition font-bold"
            >
              f
            </a>
            <a
              href={twitterShare}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on X"
              className="w-8 h-8 rounded-full border border-sand flex items-center justify-center hover:bg-sand transition font-bold"
            >
              𝕏
            </a>
            <a
              href={linkedinShare}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
              className="w-8 h-8 rounded-full border border-sand flex items-center justify-center hover:bg-sand transition font-bold"
            >
              in
            </a>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link
            to="/events"
            className="text-xs uppercase tracking-wider text-espresso/70 hover:text-gold font-bold inline-flex items-center gap-1"
          >
            ← Back to All Gatherings
          </Link>
        </div>
      </div>
    </div>
  );
}
