import React from 'react';
import { Eyebrow } from './Eyebrow';

export interface PageHeaderProps {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  intro?: React.ReactNode;
  subtitle?: React.ReactNode;
  image?: string;
}

export function PageHeader({ eyebrow, title, intro, subtitle, image }: PageHeaderProps) {
  const description = intro || subtitle;
  return (
    <header className="relative border-b border-sand bg-sand/60 px-6 pb-20 pt-28 md:px-10 md:pb-24 md:pt-36 overflow-hidden">
      {image && (
        <div className="absolute inset-0 z-0 opacity-15">
          <img src={image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-sand via-sand/70 to-transparent" />
        </div>
      )}
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-4xl text-4xl sm:text-5xl md:text-6xl font-serif text-espresso font-bold leading-[1.08]">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-espresso/80 font-sans">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}
