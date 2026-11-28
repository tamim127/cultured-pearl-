import { PageHeader } from '@/components/PageHeader';
import { Section } from '@/components/Section';
import { Eyebrow } from '@/components/Eyebrow';
import { Button } from '@/components/Button';
import { IMAGES } from '@/constants/images';

const programs = [
  {
    n: '01',
    title: 'Daughters of the King',
    body: 'Our core sisterhood circle. Women meet to study scripture, pray for one another and walk together through the seasons that shape them.',
  },
  {
    n: '02',
    title: 'Seminars',
    body: 'Practical teaching from God\'s word on finances, time management, counseling, managing home and life, and the women of the Bible.',
  },
  {
    n: '03',
    title: 'Purposeful Life Scholarship',
    body: 'Support for women pursuing education with intention — because calling often needs a little funding behind it.',
    href: '/scholarship',
  },
  {
    n: '04',
    title: 'Community outreach',
    body: 'Community days, care drives and partnerships that put our convictions in front of real needs, close to home.',
  },
];

export function Sisterhood() {
  return (
    <>
      <PageHeader
        eyebrow="Programs"
        title="Sisterhood, in practice"
        intro="Strength and dignity is her clothing, and she laughs without fear for the times that are near."
      />

      <Section className="bg-background">
        <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
          {programs.map((item) => (
            <article
              key={item.n}
              className="flex flex-col bg-background p-10 md:p-14"
            >
              <span className="font-display text-2xl text-gold">{item.n}</span>
              <h2 className="mt-6 text-3xl font-display">{item.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
              {item.href && (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-block w-fit border-b border-gold pb-1 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-foreground transition-colors hover:text-gold"
                >
                  Learn more
                </a>
              )}
            </article>
          ))}
        </div>
      </Section>

      {/* Banner */}
      <section className="relative overflow-hidden">
        <img
          src={IMAGES.heroWomen}
          alt="Women of Cultured Pearl gathered together"
          width={1600}
          height={1200}
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="veil absolute inset-0" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-32 md:px-10 md:py-40">
          <Eyebrow>
            <span className="text-pearl/60">Join us</span>
          </Eyebrow>
          <h2 className="mt-6 max-w-xl text-4xl leading-tight text-pearl md:text-5xl font-display">
            There is a seat in this circle with your name on it.
          </h2>
          <div className="mt-10">
            <Button to="/events" variant="gold">
              Find a gathering
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
