import { PageHeader } from '@/components/PageHeader';
import { Section } from '@/components/Section';
import { Eyebrow } from '@/components/Eyebrow';
import { Button } from '@/components/Button';
import { IMAGES } from '@/constants/images';

const values = [
  {
    title: 'Embrace',
    body: 'Every woman arrives as she is. No performance required.',
  },
  {
    title: 'Encourage',
    body: 'Scripture applied to the ordinary weight of a real week.',
  },
  {
    title: 'Celebrate',
    body: 'We mark the growth, the healing and the small wins out loud.',
  },
];

export function About() {
  return (
    <>
      <PageHeader
        eyebrow="The organization"
        title="What is a Cultured Pearl?"
        intro="A cultured pearl is created by an oyster farmer under controlled circumstances. Just so, God places us under conditions he controls, and brings us into his light."
      />

      <Section className="bg-background">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <img
              src={IMAGES.pearl}
              alt="A pearl inside an open oyster shell"
              width={1200}
              height={1200}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="space-y-10 md:col-span-6 md:col-start-7">
            <div>
              <Eyebrow>God's women</Eyebrow>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                “Strength and dignity are her clothing, and she laughs at the
                time to come. She opens her mouth with wisdom, and the teaching
                of kindness is on her tongue.”
                <span className="mt-3 block text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold">
                  Proverbs 31:25–26
                </span>
              </p>
            </div>
            <div>
              <Eyebrow>Our vision</Eyebrow>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                To bring women into God's light through teaching and being. We
                offer seminars centered on God's word that support real-world
                examples of how the Bible meets everyday challenges — finances,
                time management, counseling, managing home and life, and
                exploring the women of the Bible.
              </p>
            </div>
            <div>
              <Eyebrow>Our name</Eyebrow>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                He allows the fire of affliction, persecution and life events
                arriving all at once to transform us. What is formed is not
                damage — it is a pearl.
                <span className="mt-3 block text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold">
                  Zechariah 13:9
                </span>
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* How We Gather */}
      <Section className="bg-sand">
        <Eyebrow>How we gather</Eyebrow>
        <div className="mt-14 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {values.map((v) => (
            <article key={v.title} className="bg-sand p-10">
              <h3 className="text-2xl font-display">{v.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {v.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* Leadership */}
      <Section className="bg-background">
        <div className="grid items-center gap-14 md:grid-cols-2 md:gap-20">
          <div>
            <Eyebrow>Leadership</Eyebrow>
            <h2 className="rule-gold mt-6 text-4xl md:text-5xl font-display">
              Sharonda Savoy
            </h2>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Founder of Cultured Pearl. What began in 2017 as a conviction that
              women deserve support has grown into seminars, scholarships and a
              community that keeps showing up for one another.
            </p>
            <div className="mt-10">
              <Button href="mailto:sharondasavoy@culturedpearl.org" variant="outline">
                Contact the board
              </Button>
            </div>
          </div>
          <img
            src={IMAGES.founder}
            alt="Portrait of Cultured Pearl founder Sharonda Savoy"
            width={1000}
            height={1250}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover md:order-first"
          />
        </div>
      </Section>
    </>
  );
}
