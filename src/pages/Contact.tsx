import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { Eyebrow } from '../components/Eyebrow';
import { Button } from '../components/Button';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Connect With Us"
        title="Contact Cultured Pearl"
        subtitle="Get in touch with Cultured Pearl to learn more about our work and how you can get involved with our nonprofit organization."
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
                    href="mailto:sharondasavoy@culturedpearl.org"
                    className="font-serif text-lg text-espresso hover:text-gold transition font-bold"
                  >
                    sharondasavoy@culturedpearl.org
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-sand/50 flex items-center justify-center text-gold text-lg font-bold">
                  📍
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-espresso/60 font-bold block">Location</span>
                  <p className="text-espresso font-medium">Washington, DC Metropolitan Area</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-sand/50 flex items-center justify-center text-gold text-lg font-bold">
                  🏛
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-espresso/60 font-bold block">Tax-Exempt Status</span>
                  <p className="text-espresso font-medium">501(c)(3) NonProfit Organization</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-sand/30 p-8 rounded-2xl border border-sand">
            {sent ? (
              <div className="text-center py-12">
                <span className="text-4xl text-gold block mb-3">✓</span>
                <h3 className="font-serif text-2xl text-espresso font-bold">Message Sent!</h3>
                <p className="text-sm font-sans text-espresso/70 mt-2">
                  Thank you for reaching out. A member of our team will respond to your message promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-espresso/80 font-bold mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-sand bg-pearl focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="Jane Doe"
                  />
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
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-sand bg-pearl focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="">Select a Topic</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Debutante Program">Debutante Program</option>
                    <option value="Purposeful Life Scholarship">Purposeful Life Scholarship</option>
                    <option value="Volunteering / Partnership">Volunteering / Partnership</option>
                    <option value="Prayer Request">Prayer Request</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-espresso/80 font-bold mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-sand bg-pearl focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="How can we assist you today?"
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" variant="primary" className="w-full">
                    Send Message
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
