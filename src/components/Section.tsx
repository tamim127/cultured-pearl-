import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  tone?: 'pearl' | 'sand' | 'espresso' | string;
  id?: string;
}

export function Section({ children, className, tone, id }: SectionProps) {
  const toneBg =
    tone === 'sand'
      ? 'bg-sand/35 text-espresso'
      : tone === 'espresso'
      ? 'bg-espresso text-pearl'
      : 'bg-pearl text-espresso';

  return (
    <section id={id} className={cn("px-6 py-16 md:px-10 md:py-24", toneBg, className)}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
