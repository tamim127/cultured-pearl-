import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEventBySlug, rsvpForEvent } from '../services/wixEvents';
import { useWixLiveRefresh } from '../services/wixClient';
import { LiveEvent } from '../data/eventsData';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { Eyebrow } from '../components/Eyebrow';
import { Button } from '../components/Button';

export function EventDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<LiveEvent | null>(null);
  const [loading, setLoading] = useState(true);

  // RSVP Form state
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestNotes, setGuestNotes] = useState('');
  const [rsvpStatus, setRsvpStatus] = useState<string | null>(null);

  const loadEvent = useCallback(() => {
    if (slug) {
      getEventBySlug(slug).then((evt) => {
        setEvent(evt || null);
        setLoading(false);
      });
    }
  }, [slug]);

  useEffect(() => {
    setLoading(true);
    loadEvent();
  }, [loadEvent]);

  useWixLiveRefresh(loadEvent);

  const handleRsvp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;
    const res = await rsvpForEvent(event.id, {
      name: guestName,
      email: guestEmail,
      phone: guestPhone,
      notes: guestNotes,
    });
    setRsvpStatus(res.message);
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="font-serif text-xl text-espresso/60 italic">Loading gathering details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="font-serif text-3xl text-espresso font-bold mb-4">Gathering Not Found</h2>
        <p className="text-espresso/70 mb-6 font-sans">The requested gathering could not be located in our schedule.</p>
        <Link to="/events">
          <Button variant="primary">Return to All Events</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow={event.category.toUpperCase()}
        title={event.title}
        subtitle={`${event.dateStr} • ${event.timeStr} • ${event.location}`}
        image={event.banner}
      />

      <Section tone="pearl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Description */}
          <div className="lg:col-span-2 space-y-6">
            <Eyebrow text="About This Gathering" />
            <h2 className="font-serif text-3xl text-espresso font-bold">Event Details</h2>
            <div className="w-16 h-0.5 bg-gold my-4" />

            <div className="text-base font-sans text-espresso/80 leading-relaxed space-y-4">
              <p>{event.description}</p>
              {event.longDescription && <p>{event.longDescription}</p>}
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-sand/30 border border-sand">
              <h3 className="font-serif text-xl font-bold text-espresso mb-4">Event Information</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-sans">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-espresso/60 font-bold">Date & Time</dt>
                  <dd className="text-espresso font-medium mt-1">{event.dateStr} — {event.timeStr}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-espresso/60 font-bold">Location</dt>
                  <dd className="text-espresso font-medium mt-1">{event.location}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-espresso/60 font-bold">Category</dt>
                  <dd className="text-espresso font-medium mt-1 capitalize">{event.category}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-espresso/60 font-bold">Status</dt>
                  <dd className="text-espresso font-medium mt-1">{event.status}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* RSVP Card */}
          <div>
            <div className="bg-sand/30 p-8 rounded-2xl border border-gold/40 shadow-soft sticky top-24">
              <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">
                Wix Events Reservation
              </span>
              <h3 className="font-serif text-2xl font-bold text-espresso mb-4">
                {event.status === 'Past' ? 'Past Gathering' : 'Reserve Your Place'}
              </h3>

              {rsvpStatus ? (
                <div className="p-6 bg-pearl rounded-xl text-center border border-gold/30">
                  <span className="text-3xl text-gold block mb-2">✓</span>
                  <p className="font-serif text-lg font-bold text-espresso">{rsvpStatus}</p>
                </div>
              ) : event.status === 'Past' ? (
                <div className="p-4 bg-pearl/60 rounded-xl text-center text-xs text-espresso/70 italic">
                  This gathering has concluded. Explore our upcoming events or view recordings in our video archive.
                </div>
              ) : (
                <form onSubmit={handleRsvp} className="space-y-4 font-sans text-sm">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-espresso/80 font-bold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-sand bg-pearl focus:outline-none focus:ring-1 focus:ring-gold"
                      placeholder="Your Name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-espresso/80 font-bold mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-sand bg-pearl focus:outline-none focus:ring-1 focus:ring-gold"
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
                      className="w-full px-3 py-2 rounded-lg border border-sand bg-pearl focus:outline-none focus:ring-1 focus:ring-gold"
                      placeholder="(202) 555-0100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-espresso/80 font-bold mb-1">
                      Guest Notes / Prayer Request
                    </label>
                    <textarea
                      rows={2}
                      value={guestNotes}
                      onChange={(e) => setGuestNotes(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-sand bg-pearl focus:outline-none focus:ring-1 focus:ring-gold"
                      placeholder="Optional notes or questions..."
                    />
                  </div>

                  <Button type="submit" variant="primary" className="w-full">
                    Confirm Event RSVP
                  </Button>
                </form>
              )}

              <div className="mt-6 pt-4 border-t border-sand text-center">
                <Link to="/events" className="text-xs uppercase tracking-wider text-espresso/70 hover:text-gold font-bold">
                  ← Back to All Gatherings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
