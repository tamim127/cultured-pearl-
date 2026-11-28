import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { getWixEvents } from '../services/wixEvents';
import { fetchPageContent, useWixLiveRefresh, GenericPageContent } from '../services/wixClient';
import { LiveEvent } from '../data/eventsData';

type FilterTab = 'all' | 'upcoming' | 'past' | 'gathering' | 'community' | 'seminar';

export function Events() {
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [pageData, setPageData] = useState<GenericPageContent>({
    eyebrow: 'Community & Gatherings',
    pageTitle: 'Events & Seminars',
    description:
      "Bringing women into God's light through uplifting fellowship, spiritual devotionals, and transformative community outreach.",
  });

  const loadEvents = useCallback(() => {
    fetchPageContent('EventsPage', pageData).then(setPageData);
    getWixEvents().then((data) => {
      setEvents(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  useWixLiveRefresh(loadEvents);

  const filteredEvents = events.filter((e) => {
    let matchesTab = true;
    if (activeTab === 'upcoming') {
      matchesTab = !e.isPast;
    } else if (activeTab === 'past') {
      matchesTab = !!e.isPast;
    } else if (activeTab !== 'all') {
      matchesTab = e.category === activeTab;
    }

    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const upcomingCount = events.filter((e) => !e.isPast).length;
  const pastCount = events.filter((e) => e.isPast).length;

  return (
    <div>
      <PageHeader
        eyebrow={pageData.eyebrow || 'Community & Gatherings'}
        title={pageData.pageTitle || 'Events & Seminars'}
        subtitle={pageData.description}
      />

      <Section tone="pearl">
        {/* Filters and Search Bar */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-sand pb-6">
          <div className="flex flex-wrap gap-2">
            {(
              [
                { id: 'all', label: `All (${events.length})` },
                { id: 'upcoming', label: `Upcoming (${upcomingCount})` },
                { id: 'past', label: `Past Gatherings (${pastCount})` },
                { id: 'gathering', label: 'Sisterhood Galas' },
                { id: 'seminar', label: 'Wellness & Seminars' },
                { id: 'community', label: 'Outreach' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-bold transition duration-200 ${
                  activeTab === tab.id
                    ? 'bg-espresso text-pearl shadow-soft'
                    : 'bg-sand/40 text-espresso/80 hover:bg-sand'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search gatherings or venues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 text-xs font-sans rounded-full border border-sand bg-pearl focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mb-4" />
            <p className="font-serif text-xl italic text-espresso/60">Fetching live events from Wix...</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="py-20 text-center bg-sand/10 rounded-2xl border border-sand/40 p-8">
            <p className="font-serif text-2xl text-espresso mb-2">No gatherings found</p>
            <p className="font-sans text-xs text-espresso/60 mb-6">
              There are no gatherings currently matching your filter selection.
            </p>
            <button
              onClick={() => {
                setActiveTab('all');
                setSearchQuery('');
              }}
              className="text-xs uppercase tracking-widest text-gold hover:text-espresso font-bold underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((evt) => {
              const isRsvpOpen = evt.isOpenForRsvp;
              const isTicketsOpen = evt.isOpenForTickets;
              const isClosed = evt.isClosed;
              const isPast = evt.isPast;

              return (
                <div
                  key={evt.id}
                  className="bg-sand/20 rounded-2xl overflow-hidden border border-sand shadow-soft hover:shadow-hover transition duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-56 overflow-hidden bg-sand/30">
                      <img
                        src={evt.banner}
                        alt={evt.title}
                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3">
                        {isRsvpOpen ? (
                          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-800 text-white shadow-sm flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            RSVP Open
                          </span>
                        ) : isTicketsOpen ? (
                          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold text-espresso shadow-sm font-semibold">
                            Tickets Available
                          </span>
                        ) : isClosed ? (
                          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-espresso/85 text-pearl/90">
                            Registration Closed
                          </span>
                        ) : isPast ? (
                          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-stone-700/80 text-pearl/80">
                            Past Gathering
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-espresso/80 text-pearl">
                            {evt.status}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-gold font-bold uppercase tracking-wider mb-2">
                        <span>{evt.dateStr}</span>
                        <span>•</span>
                        <span>{evt.timeStr}</span>
                      </div>

                      <h3 className="font-serif text-2xl font-bold text-espresso leading-snug mb-3">
                        {evt.title}
                      </h3>

                      <p className="font-sans text-xs text-espresso/70 line-clamp-3 leading-relaxed mb-4">
                        {evt.description}
                      </p>

                      <div className="text-xs text-espresso/60 font-sans flex items-center gap-1.5">
                        <span>📍</span>
                        <span className="truncate">{evt.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Link to={`/events/${evt.slug}`}>
                      <Button
                        variant={isRsvpOpen || isTicketsOpen ? 'primary' : 'outline'}
                        className="w-full"
                      >
                        {isRsvpOpen
                          ? 'Reserve RSVP →'
                          : isTicketsOpen
                          ? 'Get Tickets →'
                          : 'View Details & Recap →'}
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Section>
    </div>
  );
}
