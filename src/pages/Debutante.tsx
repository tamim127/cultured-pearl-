import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { Eyebrow } from '../components/Eyebrow';
import { Button } from '../components/Button';
import { IMAGES } from '../constants/images';

export function Debutante() {
  const [formData, setFormData] = useState({
    candidateName: '',
    parentName: '',
    email: '',
    phone: '',
    school: '',
    grade: '',
    interests: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Signature Program"
        title="Cultured Pearl Debutante Ball"
        subtitle="Step into elegance, grace, and empowerment — celebrating young women as they blossom into leaders of faith, poise, and purpose."
        image={IMAGES.debutanteHero}
      />

      <Section tone="pearl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow text="A Rite of Passage" />
            <h2 className="font-serif text-3xl md:text-4xl text-espresso mt-4 font-bold">
              Welcome to Cultured Pearl's Debutante Experience
            </h2>
            <div className="w-16 h-0.5 bg-gold my-6" />
            <p className="font-sans text-base text-espresso/80 leading-relaxed">
              Welcome to Cultured Pearl’s Debutante Page! Get ready for the latest buzz about our stunning pearls and their incredible journeys. We can’t wait to share their exciting stories with you, so stay tuned for all the amazing updates coming your way!
            </p>
            <p className="font-sans text-base text-espresso/80 leading-relaxed mt-4">
              Our Debutante program provides young women aged 14–19 with an enriching multi-month curriculum featuring leadership seminars, etiquette training, public speaking mastery, community outreach projects, and dedicated mentorship from esteemed women in our community.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 rounded-xl bg-sand/40 border border-sand">
                <span className="block font-serif text-2xl text-gold font-bold">6+ Months</span>
                <span className="text-xs uppercase tracking-wider text-espresso/70">Mentorship & Study</span>
              </div>
              <div className="p-4 rounded-xl bg-sand/40 border border-sand">
                <span className="block font-serif text-2xl text-gold font-bold">100%</span>
                <span className="text-xs uppercase tracking-wider text-espresso/70">College & Career Support</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-soft border-4 border-sand">
              <img
                src={IMAGES.debutanteGroup}
                alt="Cultured Pearl Debutantes"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden sm:block p-6 rounded-2xl bg-espresso text-pearl max-w-xs shadow-hover">
              <p className="font-serif italic text-sm text-gold-soft">
                &ldquo;Culturing pearls takes patience, care, and the loving touch of God.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Registration Section */}
      <Section tone="sand">
        <div className="max-w-2xl mx-auto bg-pearl p-8 md:p-12 rounded-2xl shadow-soft border border-sand">
          <div className="text-center mb-8">
            <Eyebrow text="Enrollment" />
            <h2 className="font-serif text-3xl text-espresso font-bold mt-2">Debutante Ball Sign-Up</h2>
            <p className="text-sm font-sans text-espresso/70 mt-2">
              Begin your application for our next Debutante Season. Candidates and parents are welcomed to apply.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center bg-sand/30 rounded-xl border border-gold/40">
              <span className="text-4xl text-gold block mb-3">✓</span>
              <h3 className="font-serif text-2xl text-espresso font-bold">Registration Received!</h3>
              <p className="text-sm text-espresso/80 mt-2">
                Thank you for applying to the Cultured Pearl Debutante Ball. Our coordinator will contact you shortly with informational packet details.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-espresso/80 font-bold mb-1">
                    Candidate Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.candidateName}
                    onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-sand bg-pearl focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="Candidate Name"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-espresso/80 font-bold mb-1">
                    Parent/Guardian Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-sand bg-pearl focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="Parent/Guardian Name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-espresso/80 font-bold mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-sand bg-pearl focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-espresso/80 font-bold mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-sand bg-pearl focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="(202) 555-0199"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-espresso/80 font-bold mb-1">
                    Current High School
                  </label>
                  <input
                    type="text"
                    value={formData.school}
                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-sand bg-pearl focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="High School Name"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-espresso/80 font-bold mb-1">
                    Grade Level
                  </label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-sand bg-pearl focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="">Select Grade</option>
                    <option value="9th">Freshman (9th)</option>
                    <option value="10th">Sophomore (10th)</option>
                    <option value="11th">Junior (11th)</option>
                    <option value="12th">Senior (12th)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-espresso/80 font-bold mb-1">
                  Tell Us About Your Goals & Hobbies
                </label>
                <textarea
                  rows={3}
                  value={formData.interests}
                  onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-sand bg-pearl focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="Share what inspires you and why you'd like to be a Cultured Pearl debutante..."
                />
              </div>

              <div className="pt-4 text-center">
                <Button type="submit" variant="primary" className="w-full md:w-auto px-8">
                  Submit Debutante Registration
                </Button>
              </div>
            </form>
          )}
        </div>
      </Section>
    </div>
  );
}
