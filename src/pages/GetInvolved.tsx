import React, { useState, useEffect, useCallback } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { Eyebrow } from '../components/Eyebrow';
import { Button } from '../components/Button';
import { IMAGES } from '../constants/images';
import { submitVolunteerToWix, fetchPageContent, useWixLiveRefresh, GenericPageContent } from '../services/wixClient';

export function GetInvolved() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    skills: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [pageData, setPageData] = useState<GenericPageContent>({
    eyebrow: 'Serve With Us',
    pageTitle: 'Get Involved',
    description: 'Lend your gifts, time, and heart — every act of service strengthens our mission to uplift women and support families in need.',
  });

  const loadGetInvolved = useCallback(() => {
    fetchPageContent('GetInvolvedPage', pageData).then(setPageData);
  }, []);

  useEffect(() => {
    loadGetInvolved();
  }, [loadGetInvolved]);

  useWixLiveRefresh(loadGetInvolved);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage(null);

    const res = await submitVolunteerToWix({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      skills: formData.skills,
    });

    setSubmitting(false);
    setStatusMessage(res.message);
    setFormData({ firstName: '', lastName: '', email: '', phone: '', skills: '' });
  };

  return (
    <div>
      <PageHeader
        eyebrow={pageData.eyebrow || 'Serve With Us'}
        title={pageData.pageTitle || 'Get Involved'}
        subtitle={pageData.description}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-sand/30 p-8 rounded-2xl border border-sand hover:border-gold/50 transition duration-300 flex flex-col justify-between">
            <div>
              <span className="font-serif text-3xl text-gold font-bold">01</span>
              <h3 className="font-serif text-xl font-bold text-espresso mt-3">Community Days</h3>
              <p className="text-xs font-sans text-espresso/70 mt-2">
                Serve on the ground during our annual shoe drives, homeless meal deliveries, and seasonal hygiene package distributions.
              </p>
            </div>
          </div>
          <div className="bg-sand/30 p-8 rounded-2xl border border-sand hover:border-gold/50 transition duration-300 flex flex-col justify-between">
            <div>
              <span className="font-serif text-3xl text-gold font-bold">02</span>
              <h3 className="font-serif text-xl font-bold text-espresso mt-3">Youth Mentoring</h3>
              <p className="text-xs font-sans text-espresso/70 mt-2">
                Mentor young ladies in our Debutante Ball cohort — sharing career wisdom, personal poise, and biblical womanhood.
              </p>
            </div>
          </div>
          <div className="bg-sand/30 p-8 rounded-2xl border border-sand hover:border-gold/50 transition duration-300 flex flex-col justify-between">
            <div>
              <span className="font-serif text-3xl text-gold font-bold">03</span>
              <h3 className="font-serif text-xl font-bold text-espresso mt-3">Spiritual Seminars</h3>
              <p className="text-xs font-sans text-espresso/70 mt-2">
                Facilitate workshops on financial wellness, mental health, family stewardship, or scriptural study for our sisters.
              </p>
            </div>
          </div>
          <div className="bg-sand/30 p-8 rounded-2xl border border-sand hover:border-gold/50 transition duration-300 flex flex-col justify-between">
            <div>
              <span className="font-serif text-3xl text-gold font-bold">04</span>
              <h3 className="font-serif text-xl font-bold text-espresso mt-3">Gala & Event Logistics</h3>
              <p className="text-xs font-sans text-espresso/70 mt-2">
                Join our host committee to coordinate venue logistics, catering, program development, and sponsorship outreach.
              </p>
            </div>
          </div>
        </div>

        {/* Volunteer Application Form */}
        <div className="max-w-2xl mx-auto bg-sand/30 p-8 md:p-12 rounded-2xl shadow-soft border border-sand">
          <div className="text-center mb-8">
            <Eyebrow text="Volunteer Corps" />
            <h2 className="font-serif text-3xl text-espresso font-bold mt-2">Volunteer Application</h2>
            <p className="text-sm font-sans text-espresso/70 mt-2">
              Share your contact details and areas of interest so our team can connect you with an upcoming ministry opportunity.
            </p>
          </div>

          {statusMessage ? (
            <div className="p-8 text-center bg-pearl rounded-xl border border-gold/40">
              <span className="text-4xl text-gold block mb-3">✓</span>
              <h3 className="font-serif text-2xl text-espresso font-bold">Application Received!</h3>
              <p className="text-sm text-espresso/80 mt-2">
                {statusMessage}
              </p>
              <button
                onClick={() => setStatusMessage(null)}
                className="mt-6 px-6 py-2.5 rounded-full bg-espresso text-pearl text-xs uppercase tracking-wider font-bold hover:bg-gold transition"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-espresso/80 font-bold mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-sand bg-pearl focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-espresso/80 font-bold mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-sand bg-pearl focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="Doe"
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
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-espresso/80 font-bold mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-sand bg-pearl focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="(202) 555-0199"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-espresso/80 font-bold mb-1">
                  Skills, Talents & Ministry Interests *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-sand bg-pearl focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="e.g. Event planning, mentoring, music, cooking, driving, administrative assistance..."
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full mt-4"
                disabled={submitting}
              >
                {submitting ? 'Submitting to Wix...' : 'Submit Volunteer Application'}
              </Button>
            </form>
          )}
        </div>
      </Section>
    </div>
  );
}
