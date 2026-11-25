import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { Eyebrow } from '../components/Eyebrow';
import { IMAGES } from '../constants/images';

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    {
      src: IMAGES.gathering,
      title: 'Sisterhood Annual Gala',
      caption: 'Gathering in joy and reverence at the historic Night of the Cultured Pearl.',
    },
    {
      src: IMAGES.celebration,
      title: 'Pearls of Excellence Honorees',
      caption: 'Celebrating phenomenal women who shine God’s light into our community.',
    },
    {
      src: IMAGES.teaParty,
      title: 'Mother’s Day Tea Celebration',
      caption: 'Honoring mothers and grandmothers with high tea and fellowship.',
    },
    {
      src: IMAGES.heroWomen,
      title: 'Daughters of the King Sanctuary',
      caption: 'Uplifting praise and faith devotionals.',
    },
    {
      src: IMAGES.community,
      title: 'Community Empowerment Day',
      caption: 'Serving families, distributing shoes, and building community hope.',
    },
    {
      src: IMAGES.debutanteGroup,
      title: 'Debutante Ball Program',
      caption: 'Mentorship and poise for our next generation of young women leaders.',
    },
    {
      src: IMAGES.scholarshipWinner,
      title: 'Purposeful Life Scholarship',
      caption: 'Recognizing academic merit and steadfast Christian faith.',
    },
    {
      src: IMAGES.founder,
      title: 'Founder Fellowship',
      caption: 'Walking in divine calling and sisterhood.',
    },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Photo Gallery"
        title="Night of the Pearl & Gatherings"
        subtitle="Bringing women into God's light — a visual chronicle of sisterhood, service, elegance, and joyful fellowship."
      />

      <Section tone="pearl">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Eyebrow text="Visual Chronicle" />
          <h2 className="font-serif text-3xl text-espresso font-bold mt-2">Moments of Light & Love</h2>
          <div className="w-16 h-0.5 bg-gold mx-auto my-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(item.src)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-sand/30 border border-sand shadow-soft aspect-square"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4 text-pearl">
                <p className="font-serif text-lg font-bold leading-tight">{item.title}</p>
                <p className="text-xs text-pearl/80 font-sans mt-1">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-espresso/90 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh]">
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="max-h-[85vh] w-auto rounded-xl shadow-2xl border-2 border-sand"
              />
              <button
                className="absolute top-4 right-4 bg-espresso/80 text-pearl text-sm px-3 py-1.5 rounded-full border border-sand"
                onClick={() => setSelectedImage(null)}
              >
                Close ✕
              </button>
            </div>
          </div>
        )}
      </Section>
    </div>
  );
}
