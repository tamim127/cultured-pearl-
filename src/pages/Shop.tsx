import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { Eyebrow } from '../components/Eyebrow';
import { PRODUCTS } from '../data/storeAndBlogData';
import { Button } from '../components/Button';

export function Shop() {
  return (
    <div>
      <PageHeader
        eyebrow="Print & Digital Publications"
        title="Cultured Pearl Store"
        subtitle="Celebrating women services, talking about things that matter to women, providing information regarding every facet of life, and educating on topics that affect women's wellbeing."
      />

      <Section tone="sand">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Eyebrow text="Official Publications" />
          <h2 className="font-serif text-3xl md:text-4xl text-espresso font-bold mt-4">
            Cultured Pearl, The Magazine
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto my-6" />
          <p className="font-sans text-base text-espresso/80 leading-relaxed">
            All proceeds from magazine purchases and commemorative digital editions directly fund the Purposeful Life Scholarship and homeless outreach initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="bg-pearl rounded-2xl overflow-hidden border border-sand/80 shadow-soft hover:shadow-hover transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-64 overflow-hidden bg-sand/20 flex items-center justify-center p-6">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full object-contain rounded-md shadow-md hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-widest text-gold font-bold">
                      {product.category}
                    </span>
                    <span className="font-serif text-xl font-bold text-espresso">
                      {product.price}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-espresso mb-3 leading-snug">
                    {product.title}
                  </h3>

                  <p className="font-sans text-xs text-espresso/70 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => alert(`Added ${product.title} to bag! Wix eCommerce checkout is available in our store portal.`)}
                >
                  {product.digital ? 'Download Edition' : 'Order Print Copy'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
