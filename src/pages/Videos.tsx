import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { Eyebrow } from '../components/Eyebrow';

export function Videos() {
  const videoEntries = [
    {
      title: 'Bringing Women Into God’s Light — Mission Highlight',
      speaker: 'Sharonda Savoy, Executive Director',
      duration: '5:40',
      description: 'The divine inspiration behind the founding of Cultured Pearl, based on Zechariah 13:9.',
    },
    {
      title: 'Pearls of Excellence Gala Highlights',
      speaker: 'Cultured Pearl Board & Community Guests',
      duration: '8:25',
      description: 'An evening celebrating women of faith, resilience, and extraordinary community impact.',
    },
    {
      title: 'A Mental Cleansing Seminar Excerpt',
      speaker: 'Dr. Pamela Gurley & Panelists',
      duration: '12:10',
      description: 'Holistic wellness, biblical wisdom, and overcoming life challenges with strength and dignity.',
    },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Media & Highlights"
        title="Video Archive"
        subtitle="Bringing women into God's light — recorded messages, keynote reflections, and highlights from our annual gatherings."
      />

      <Section tone="sand">
        <div className="max-w-4xl mx-auto space-y-8">
          {videoEntries.map((vid, idx) => (
            <div
              key={idx}
              className="bg-pearl rounded-2xl overflow-hidden border border-sand shadow-soft p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-full md:w-64 h-40 bg-espresso/90 rounded-xl flex flex-col items-center justify-center text-pearl relative group cursor-pointer border border-sand">
                <span className="w-14 h-14 rounded-full bg-gold/90 text-espresso flex items-center justify-center text-xl font-bold pl-1 group-hover:scale-110 transition duration-300 shadow-md">
                  ▶
                </span>
                <span className="text-[10px] uppercase tracking-widest text-gold-soft mt-3 font-bold">
                  {vid.duration} Video
                </span>
              </div>

              <div className="flex-1 space-y-2">
                <span className="text-xs uppercase tracking-widest text-gold font-bold">
                  {vid.speaker}
                </span>
                <h3 className="font-serif text-2xl font-bold text-espresso">{vid.title}</h3>
                <p className="font-sans text-sm text-espresso/70 leading-relaxed">{vid.description}</p>
                <div className="pt-2">
                  <a
                    href="https://www.youtube.com/@culturedpearl"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-xs uppercase tracking-wider text-gold font-bold hover:underline"
                  >
                    Watch on YouTube Channel →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
