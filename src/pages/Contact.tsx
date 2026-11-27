import React, { useState, useEffect, useCallback } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { Eyebrow } from '../components/Eyebrow';
import { Button } from '../components/Button';
import { submitContactToWix, fetchPageContent, useWixLiveRefresh, GenericPageContent } from '../services/wixClient';

export function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [pageData, setPageData] = useState<GenericPageContent>({
    eyebrow: 'Connect With Us',
    pageTitle: 'Contact Cultured Pearl',
    description: 'Get in touch with Cultured Pearl to learn more about our work and how you can get involved with our nonprofit organization.',
    email: 'info@culturedpearl.org',
    phone: '(202) 555-0199',
    address: 'Washington, DC Metropolitan Area',
  });

  const loadContact = useCallback(() => {
    fetchPageContent('ContactPage', pageData).then(setPageData);
  }, []);

  useEffect(() => {
    loadContact();
  }, [loadContact]);

  useWixLiveRefresh(loadContact);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage(null);

    const res = await submitContactToWix({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    });

    setSubmitting(false);
    setStatusMessage(res.message);
    setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  };

  return (
    <div>
      <PageHeader
        eyebrow={pageData.eyebrow || 'Connect With Us'}
        title={pageData.pageTitle || 'Contact Cultured Pearl'}
        subtitle={pageData.description}
      />

      <Section tone="pearl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info Side */}
          <div>
            <Eyebrow text="Reach Out" />
            <h2 className="font-serif text-3xl md:text-4xl text-espresso font-bold mt-4">
              We Welcome Your Heart & Voice
            </h2>
            <div className="w-16 h-0.5 bg-gold my-6" />
            <p className="font-sans text-base text-espresso/80 leading-relaxed">
              Whether you’re interested in partnering on a community outreach project, volunteering your skills, requesting scholarship guidance, or submitting a prayer request, we invite you to connect.
            </p>

            <div className="space-y-6 mt-8 font-sans">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-sand/50 flex items-center justify-center text-gold text-lg font-bold">
                  ✉
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-espresso/60 font-bold block">Email</span>
                  <a
                    href={`mailto:${pageData.email || 'info@culturedpearl.org'}`}
                    className="font-serif text-lg text-espresso hover:text-gold transition font-bold"
                  >
                    {pageData.email || 'info@culturedpearl.org'}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-sand/50 flex items-center justify-center text-gold text-lg font-bold">
                  📍
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-espresso/60 font-bold block">Location</span>
                  <p className="text-espresso font-medium">{pageData.address || 'Washington, DC Metropolitan Area'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-sand/50 flex items-center justify-center text-gold text-lg font-bold">
                  🏛
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-espresso/60 font-bold block">Tax-Exempt Status</span>
                  <p className="text-espresso font-medium">501(c)(3) Nonprofit Organization</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-sand/30 p-8 rounded-2xl border border-sand">
            {statusMessage ? (
              <div className="text-center py-12">
                <span className="text-4xl text-gold block mb-3">✓</span>
                <h3 className="font-serif text-2xl text-espresso font-bold">Message Sent!</h3>
                <p className="text-sm font-sans text-espresso/70 mt-2 max-w-md mx-auto">
                  {statusMessage}
                </p>
                <button
                  onClick={() => setStatusMessage(null)}
                  className="mt-6 px-6 py-2.5 rounded-full bg-espresso text-pearl text-xs uppercase tracking-wider font-bold hover:bg-gold transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      Phone Number (Optional)
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
                    Your Message / Prayer Request *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-sand bg-pearl focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="How can we stand in agreement with you or walk beside you?"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full mt-2"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting to Wix CRM...' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
