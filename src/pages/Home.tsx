import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Section } from '@/components/Section';
import { Eyebrow } from '@/components/Eyebrow';
import { Button } from '@/components/Button';
import { IMAGES } from '@/constants/images';

const pillars = [
  {
    n: '01',
    title: 'Teaching',
    body: 'Seminars grounded in scripture that meet real life — finances, time, home, calling and the women of the Bible.',
  },
  {
    n: '02',
    title: 'Sisterhood',
    body: 'Circles where women are known by name, prayed for by name, and carried through whatever season they are in.',
  },
  {
    n: '03',
    title: 'Outreach',
    body: 'Community days, care drives and the Purposeful Life Scholarship — small acts, gathered into something larger.',
  },
];

const upcomingEvents = [
  {
    date: 'Fri, Oct 16',
    title: 'KingsDaughters',
    place: 'Ocean City',
  },
  {
    date: 'January 2027',
    title: 'Community Day',
    place: 'Location TBD',
  },
];

export function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <img
          src={IMAGES.heroWomen}
          alt="Women of Cultured Pearl gathered in conversation and prayer"
          width={1600}
          height={1200}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="veil absolute inset-0" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-24 md:px-10 md:pb-32">
          <p className="eyebrow text-pearl/70">Since 2017</p>
          <h1 className="mt-6 max-w-4xl text-[3.25rem] leading-[0.98] text-pearl md:text-[6.5rem] font-display">
            Bringing women into{' '}
            <em className="block text-gold-soft font-normal">God's light.</em>
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-pearl/75">
            Embracing, encouraging and celebrating sisterhood — through teaching,
            presence and quiet, persistent service.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button to="/about" variant="gold">
              Our story
            </Button>
            <Button to="/events" variant="ghostLight">
              Upcoming events
            </Button>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <Section className="bg-background">
        <div className="grid gap-16 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="rule-gold mt-6 text-4xl leading-tight md:text-5xl font-display">
              A pearl is formed under pressure, on purpose.
            </h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:col-span-6 md:col-start-7">
            <p>
              A cultured pearl is grown by a farmer under conditions he controls.
              In the same way, God allows the seasons of our lives — the good and
              the hard alike — to shape us into something luminous.
            </p>
            <p>
              Since our founding in 2017 we have been determined to make an
              impact. The core of our effort is simple: give to women. We bring
              fresh ideas and steady conviction to everything we're part of.
            </p>
            <div>
              <Link
                to="/about"
                className="group inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-foreground transition-colors hover:text-gold"
              >
                Read our story
                <ArrowRight className="size-4 text-gold transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Our Name (Proverbs) */}
      <Section className="bg-sand">
        <div className="grid items-center gap-14 md:grid-cols-2 md:gap-20">
          <img
            src={IMAGES.pearl}
            alt="A single pearl resting inside an open oyster shell"
            width={1200}
            height={1200}
            loading="lazy"
            className="aspect-square w-full object-cover"
          />
          <div>
            <Eyebrow>Our name</Eyebrow>
            <blockquote className="mt-8 font-display text-3xl leading-[1.25] md:text-[2.6rem]">
              “She is clothed with strength and dignity, and she laughs without
              fear of the future.”
            </blockquote>
            <p className="mt-8 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold">
              Proverbs 31:25
            </p>
          </div>
        </div>
      </Section>

      {/* What We Do */}
      <Section className="bg-background">
        <Eyebrow>What we do</Eyebrow>
        <div className="mt-14 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {pillars.map((item) => (
            <article key={item.n} className="bg-background p-10">
              <span className="font-display text-2xl text-gold">{item.n}</span>
              <h3 className="mt-6 text-2xl font-display">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* Gather With Us */}
      <Section className="bg-espresso text-pearl">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-pearl/60">Gather with us</p>
            <h2 className="mt-6 text-4xl md:text-5xl font-display">Upcoming events</h2>
          </div>
          <Button to="/events" variant="ghostLight">
            All events
          </Button>
        </div>
        <ul className="mt-14 divide-y divide-pearl/15 border-y border-pearl/15">
          {upcomingEvents.map((item) => (
            <li key={item.title}>
              <Link
                to="/events"
                className="group flex flex-col gap-2 py-8 transition-colors sm:flex-row sm:items-baseline sm:justify-between"
              >
                <span className="font-display text-3xl transition-colors group-hover:text-gold-soft md:text-4xl">
                  {item.title}
                </span>
                <span className="flex gap-8 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-pearl/60">
                  <span>{item.date}</span>
                  <span>{item.place}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Collective Action Banner */}
      <section className="relative overflow-hidden">
        <img
          src={IMAGES.community}
          alt="Volunteers handing out care packages at a community day"
          width={1600}
          height={900}
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="veil absolute inset-0" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-32 md:px-10 md:py-44">
          <h2 className="max-w-2xl text-4xl leading-tight text-pearl md:text-6xl font-display">
            One action changes a life. Collective action changes a community.
          </h2>
          <div className="mt-10">
            <Button to="/give" variant="gold">
              Support the work
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
