import { PageHeader } from '@/components/PageHeader';
import { Section } from '@/components/Section';
import { Eyebrow } from '@/components/Eyebrow';
import { Button } from '@/components/Button';

const giftTiers = [
  {
    amount: '$25',
    body: 'Materials for one woman at a seminar.',
  },
  {
    amount: '$100',
    body: 'Care packages for a community day table.',
  },
  {
    amount: '$500',
    body: 'A meaningful step toward one Purposeful Life Scholarship.',
  },
];

export function Give() {
  return (
    <>
      <PageHeader
        eyebrow="Support the work"
        title="Give to a woman, change a community."
        intro="Cultured Pearl is a 501(c)(3) nonprofit. Every gift goes directly into teaching, scholarships and outreach."
      />

      <Section className="bg-background">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>Where it goes</Eyebrow>
            <h2 className="rule-gold mt-6 text-4xl leading-tight font-display">
              Small, faithful gifts — compounded.
            </h2>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="mailto:sharondasavoy@culturedpearl.org" variant="gold">
                Donate now
              </Button>
              <Button href="mailto:sharondasavoy@culturedpearl.org" variant="outline">
                Partner with us
              </Button>
            </div>
          </div>
          <ul className="divide-y divide-border border-y border-border md:col-span-6 md:col-start-7">
            {giftTiers.map((tier) => (
              <li key={tier.amount} className="flex items-baseline gap-8 py-7">
                <span className="font-display text-3xl text-gold">{tier.amount}</span>
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {tier.body}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="bg-sand">
        <div className="mx-auto max-w-2xl text-center">
          <blockquote className="font-display text-3xl leading-[1.3] md:text-[2.5rem]">
            “Sometimes all it takes to change the world is a little support.”
          </blockquote>
          <p className="mt-8 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Cultured Pearl, founded 2017
          </p>
        </div>
      </Section>
    </>
  );
}
