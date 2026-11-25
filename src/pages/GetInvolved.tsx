import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { Eyebrow } from '../components/Eyebrow';
import { Button } from '../components/Button';
import { IMAGES } from '../constants/images';

export function GetInvolved() {
  return (
    <div>
      <PageHeader
        eyebrow="Serve With Us"
        title="Get Involved"
        subtitle="Lend your gifts, time, and heart — every act of service strengthens our mission to uplift women and support families in need."
        image={IMAGES.community}
      />

      <Section tone="pearl">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Eyebrow text="Show Your Support" />
          <h2 className="font-serif text-3xl md:text-4xl text-espresso font-bold mt-4">
            Ways to Walk Beside Cultured Pearl
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto my-6" />
          <p className="font-sans text-base text-espresso/80 leading-relaxed">
            We are so happy you’re interested in getting involved with our work here at Cultured Pearl. There are so many ways for you to help, and we truly appreciate each and every effort. By lending your support, you’ll become a valuable part of our NonProfit Organization and help to strengthen our operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-sand/30 p-8 rounded-2xl border border-sand hover:border-gold/50 transition duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-pearl flex items-center justify-center text-gold font-serif text-2xl font-bold shadow-soft mb-6">
                01
              </div>
              <h3 className="font-serif text-2xl font-bold text-espresso mb-3">Volunteer</h3>
              <p className="font-sans text-sm text-espresso/70 leading-relaxed">
                Join our outreach teams for community shoe and clothing drives, workshop facilitation, youth mentorship, and event coordination.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-sand">
              <a href="mailto:sharondasavoy@culturedpearl.org?subject=Volunteer%20Inquiry" className="text-xs uppercase tracking-wider text-gold font-bold hover:underline">
                Sign Up to Volunteer →
              </a>
            </div>
          </div>

          <div className="bg-sand/30 p-8 rounded-2xl border border-sand hover:border-gold/50 transition duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-pearl flex items-center justify-center text-gold font-serif text-2xl font-bold shadow-soft mb-6">
                02
              </div>
              <h3 className="font-serif text-2xl font-bold text-espresso mb-3">Partner With Us</h3>
              <p className="font-sans text-sm text-espresso/70 leading-relaxed">
                We partner with churches, schools, corporations, and community health centers to expand resources for underserved women.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-sand">
              <a href="mailto:sharondasavoy@culturedpearl.org?subject=Partnership%20Proposal" className="text-xs uppercase tracking-wider text-gold font-bold hover:underline">
                Partner With Us →
              </a>
            </div>
          </div>

          <div className="bg-sand/30 p-8 rounded-2xl border border-sand hover:border-gold/50 transition duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-pearl flex items-center justify-center text-gold font-serif text-2xl font-bold shadow-soft mb-6">
                03
              </div>
              <h3 className="font-serif text-2xl font-bold text-espresso mb-3">Make a Donation</h3>
              <p className="font-sans text-sm text-espresso/70 leading-relaxed">
                Your tax-deductible financial contribution directly funds the Purposeful Life Scholarship and emergency support packages.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-sand">
              <a href="/give" className="text-xs uppercase tracking-wider text-gold font-bold hover:underline">
                Giving Tiers & Info →
              </a>
            </div>
          </div>

          <div className="bg-sand/30 p-8 rounded-2xl border border-sand hover:border-gold/50 transition duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-pearl flex items-center justify-center text-gold font-serif text-2xl font-bold shadow-soft mb-6">
                04
              </div>
              <h3 className="font-serif text-2xl font-bold text-espresso mb-3">Spread the Word</h3>
              <p className="font-sans text-sm text-espresso/70 leading-relaxed">
                Follow and share our events, podcast episodes, and scholarship announcements across your social channels to help expand our reach.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-sand">
              <a href="/events" className="text-xs uppercase tracking-wider text-gold font-bold hover:underline">
                Explore Events →
              </a>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
