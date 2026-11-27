import React, { useState, useEffect, useCallback } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { Eyebrow } from '../components/Eyebrow';
import { Button } from '../components/Button';
import { IMAGES } from '../constants/images';
import {
  submitContactToWix,
  fetchPageContent,
  fetchScholarships,
  useWixLiveRefresh,
  GenericPageContent,
  ScholarshipRecord,
} from '../services/wixClient';

export function Scholarship() {
  const [modalOpen, setModalOpen] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [school, setSchool] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [scholarships, setScholarships] = useState<ScholarshipRecord[]>([]);
  const [pageData, setPageData] = useState<GenericPageContent>({
    eyebrow: 'Higher Education Support',
    pageTitle: 'Purposeful Life Scholarship',
    description: 'Honoring with a purpose — empowering graduating high school seniors who demonstrate unyielding faith, leadership, and community service.',
    deadline: 'Applications open January 15 and close April 30 annually',
    awardAmount: '$1,500 - $3,000 per recipient',
  });

  const loadScholarshipData = useCallback(() => {
    fetchPageContent('ScholarshipPage', pageData).then(setPageData);
    fetchScholarships().then((items) => {
      if (items.length > 0) setScholarships(items);
    });
  }, []);

  useEffect(() => {
    loadScholarshipData();
  }, [loadScholarshipData]);

  useWixLiveRefresh(loadScholarshipData);

  const featuredScholarship = scholarships.find((s) => s.slug === 'purposeful-life-scholarship') || scholarships[0];

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await submitContactToWix({
      firstName: studentName,
      lastName: `(School: ${school || 'High School Senior'})`,
      email: studentEmail,
      phone: studentPhone,
      message: `Purposeful Life Scholarship Packet Request — High School/Institution: ${school}`,
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div>
      <PageHeader
        eyebrow={pageData.eyebrow || 'Higher Education Support'}
        title={pageData.pageTitle || 'Purposeful Life Scholarship'}
        subtitle={pageData.description}
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
              <p className="font-serif text-2xl text-espresso font-bold">
                {featuredScholarship?.deadline || pageData.deadline || 'Deadline: April 30 annually'}
              </p>
              <p className="text-xs text-espresso/70 mt-1">
                Stipend: {featuredScholarship?.amount || pageData.awardAmount || '$1,500 - $3,000 per recipient'}
              </p>
            </div>

            <div className="mt-8">
              <Button variant="primary" onClick={() => setModalOpen(true)}>
                Request Application Packet
              </Button>
            </div>
          </div>

          <div>
            <div className="rounded-2xl overflow-hidden shadow-soft border-4 border-sand">
              <img
                src={featuredScholarship?.image || pageData.image || IMAGES.scholarshipWinner}
                alt={featuredScholarship?.title || 'Purposeful Life Scholarship Honoree'}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Criteria Section */}
      <Section tone="sand">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Eyebrow text="Eligibility Requirements" />
            <h2 className="font-serif text-3xl md:text-4xl text-espresso font-bold mt-2">
              Who We Look For
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-pearl p-6 rounded-xl border border-sand">
              <span className="font-serif text-3xl text-gold font-bold">01</span>
              <h3 className="font-serif text-xl font-bold text-espresso mt-3">Graduating Senior</h3>
              <p className="text-xs font-sans text-espresso/70 mt-2">
                Currently enrolled high school senior in good academic standing, accepted or applying to an accredited higher learning institution.
              </p>
            </div>
            <div className="bg-pearl p-6 rounded-xl border border-sand">
              <span className="font-serif text-3xl text-gold font-bold">02</span>
              <h3 className="font-serif text-xl font-bold text-espresso mt-3">Faith in Adversity</h3>
              <p className="text-xs font-sans text-espresso/70 mt-2">
                Demonstrated personal resilience and steadfast trust in God during seasons of trial, hardship, or personal testing.
              </p>
            </div>
            <div className="bg-pearl p-6 rounded-xl border border-sand">
              <span className="font-serif text-3xl text-gold font-bold">03</span>
              <h3 className="font-serif text-xl font-bold text-espresso mt-3">Community Service</h3>
              <p className="text-xs font-sans text-espresso/70 mt-2">
                Active servant leadership in church, community, or school settings — proving love through consistent, humble action.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Request Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-espresso/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-pearl rounded-3xl max-w-lg w-full p-8 border border-sand shadow-2xl relative">
            <button
              onClick={() => {
                setModalOpen(false);
                setSubmitted(false);
              }}
              className="absolute top-6 right-6 text-espresso/60 hover:text-espresso text-xl font-bold"
            >
              ✕
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <span className="text-5xl text-gold block mb-3">✓</span>
                <h3 className="font-serif text-2xl font-bold text-espresso">Packet Requested!</h3>
                <p className="text-sm text-espresso/80 mt-2">
                  Thank you, <strong>{studentName}</strong>. The 2026/2027 Purposeful Life Scholarship packet and instructions have been requested.
                </p>
                <p className="text-xs text-espresso/60 mt-2">
                  We will email application materials to <strong>{studentEmail}</strong>.
                </p>
                <Button variant="primary" className="mt-6" onClick={() => setModalOpen(false)}>
                  Close
                </Button>
              </div>
            ) : (
              <div>
                <Eyebrow text="Scholarship Request" />
                <h3 className="font-serif text-2xl font-bold text-espresso mt-1">
                  Request Application Packet
                </h3>
                <p className="text-xs font-sans text-espresso/70 mt-1 mb-6">
                  Complete this brief form to receive the official scholarship essay prompts and packet checklist.
                </p>

                <form onSubmit={handleRequest} className="space-y-4 font-sans text-sm">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-espresso/80 font-bold mb-1">
                      Applicant Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2 rounded-lg border border-sand bg-pearl focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-espresso/80 font-bold mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-2 rounded-lg border border-sand bg-pearl focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-espresso/80 font-bold mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={studentPhone}
                      onChange={(e) => setStudentPhone(e.target.value)}
                      placeholder="(202) 555-0199"
                      className="w-full px-4 py-2 rounded-lg border border-sand bg-pearl focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-espresso/80 font-bold mb-1">
                      High School / Current Institution *
                    </label>
                    <input
                      type="text"
                      required
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      placeholder="e.g. Washington-Liberty High School"
                      className="w-full px-4 py-2 rounded-lg border border-sand bg-pearl focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>

                  <Button type="submit" variant="primary" className="w-full mt-4" disabled={submitting}>
                    {submitting ? 'Submitting Request...' : 'Send Packet to My Email'}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
