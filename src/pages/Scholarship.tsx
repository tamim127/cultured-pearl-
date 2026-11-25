import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { Eyebrow } from '../components/Eyebrow';
import { Button } from '../components/Button';
import { IMAGES } from '../constants/images';

export function Scholarship() {
  return (
    <div>
      <PageHeader
        eyebrow="Higher Education Support"
        title="Purposeful Life Scholarship"
        subtitle="Honoring with a purpose — empowering graduating high school seniors who demonstrate unyielding faith, leadership, and community service."
      />

      <Section tone="pearl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow text="Honoring with a Purpose" />
            <h2 className="font-serif text-3xl md:text-4xl text-espresso font-bold mt-4">
              Investing in the Next Generation of Leaders
            </h2>
            <div className="w-16 h-0.5 bg-gold my-6" />
            <p className="font-sans text-base text-espresso/80 leading-relaxed">
              The Purposeful Life Scholarship is designed to assist High School seniors who would like to go beyond K-12 education. We are looking for Senior High students graduating in the current school year.
            </p>
            <p className="font-sans text-base text-espresso/80 leading-relaxed mt-4">
              Our scholarships are awarded to those who show against adversity that their faith in God is their strength while being a positive influence in a community-based setting. We award multiple scholarship stipends annually to help cover tuition, books, and campus housing expenses.
            </p>

            <div className="mt-8 p-6 rounded-2xl bg-sand/30 border border-gold/40">
              <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">
                Upcoming Application Cycle
              </span>
              <p className="font-serif text-2xl text-espresso font-bold">2027 Deadline: April 30, 2027</p>
              <p className="text-xs text-espresso/70 mt-1">Applications open each fall for graduating high school seniors.</p>
              <div className="mt-4">
                <Button variant="primary" onClick={() => window.open('mailto:sharondasavoy@culturedpearl.org?subject=Purposeful%20Life%20Scholarship%20Application')}>
                  Request Application Packet
                </Button>
              </div>
            </div>
          </div>

          {/* Winner Spotlight */}
          <div className="bg-sand/30 rounded-2xl p-8 border border-sand">
            <Eyebrow text="Recent Recipient Celebration" />
            <div className="mt-6 flex flex-col sm:flex-row gap-6 items-center">
              <img
                src={IMAGES.scholarshipWinner}
                alt="Kennedy Cordle - Scholarship Recipient"
                className="w-36 h-36 rounded-full object-cover border-4 border-pearl shadow-soft"
              />
              <div>
                <h3 className="font-serif text-2xl font-bold text-espresso">Kennedy Cordle</h3>
                <p className="text-xs uppercase tracking-wider text-gold font-bold mt-0.5">
                  2025 Purposeful Life Scholarship Recipient
                </p>
                <p className="text-xs text-espresso/70 italic mt-1">Bethesda High School Graduate</p>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-sm font-sans text-espresso/80 leading-relaxed">
              <p>
                Cultured Pearl is overjoyed to celebrate and congratulate Kennedy Cordle, our 2025 Purposeful Life Scholarship Recipient!
              </p>
              <p>
                Kennedy is preparing to continue her journey at North Carolina A&T State University, where she will study Construction Management with a heart set on building sustainable and equitable communities.
              </p>
              <blockquote className="p-4 rounded-xl bg-pearl border-l-2 border-gold text-xs italic text-espresso/80 mt-4">
                Guided by her favorite scripture: &ldquo;I can do all things through Christ who gives me strength.&rdquo; — Philippians 4:13
              </blockquote>
            </div>
          </div>
        </div>
      </Section>

      {/* Guidelines & Criteria */}
      <Section tone="sand">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Eyebrow text="Eligibility & Guidelines" />
            <h2 className="font-serif text-3xl text-espresso font-bold mt-2">Scholarship Criteria</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-pearl p-6 rounded-2xl border border-sand shadow-soft">
              <span className="font-serif text-2xl text-gold font-bold block mb-2">01</span>
              <h3 className="font-serif text-xl font-bold text-espresso mb-2">Academic Standing</h3>
              <p className="text-sm font-sans text-espresso/70">
                Graduating high school senior with minimum 2.5 GPA, official transcript, and acceptance letter to an accredited college, university, or trade institution.
              </p>
            </div>

            <div className="bg-pearl p-6 rounded-2xl border border-sand shadow-soft">
              <span className="font-serif text-2xl text-gold font-bold block mb-2">02</span>
              <h3 className="font-serif text-xl font-bold text-espresso mb-2">Faith & Adversity</h3>
              <p className="text-sm font-sans text-espresso/70">
                A personal statement essay demonstrating how faith in God gave you strength to conquer trials and persevere toward academic excellence.
              </p>
            </div>

            <div className="bg-pearl p-6 rounded-2xl border border-sand shadow-soft">
              <span className="font-serif text-2xl text-gold font-bold block mb-2">03</span>
              <h3 className="font-serif text-xl font-bold text-espresso mb-2">Community Impact</h3>
              <p className="text-sm font-sans text-espresso/70">
                Two letters of recommendation (educator, community leader, or pastor) attesting to your character, integrity, and servant leadership.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
