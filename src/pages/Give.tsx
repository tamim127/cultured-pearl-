import React, { useState, useEffect, useCallback } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Section } from '@/components/Section';
import { Eyebrow } from '@/components/Eyebrow';
import { Button } from '@/components/Button';
import { processWixPayment, fetchPageContent, fetchSiteSettings, useWixLiveRefresh, GenericPageContent, SiteSettingsMap } from '@/services/wixClient';

const giftTiers = [
  {
    amount: 25,
    label: '$25',
    impact: 'Materials and study journals for one woman at a spiritual seminar.',
  },
  {
    amount: 50,
    label: '$50',
    impact: 'Two pairs of sturdy shoes and hygiene kits for our community homeless drive.',
  },
  {
    amount: 100,
    label: '$100',
    impact: 'Care packages, refreshments, and resource packets for a community outreach table.',
  },
  {
    amount: 250,
    label: '$250',
    impact: 'Sponsors etiquette, public speaking, and poise workshops for a Debutante participant.',
  },
  {
    amount: 500,
    label: '$500',
    impact: 'A significant milestone contribution directly toward a Purposeful Life Scholarship stipend.',
  },
];

export function Give() {
  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [siteSettings, setSiteSettings] = useState<SiteSettingsMap>({ ein: '82-XXXXXXX', address: 'Washington, DC' });
  const [pageData, setPageData] = useState<GenericPageContent>({
    eyebrow: 'Support the Mission',
    pageTitle: 'Give to a Woman, Change a Generation',
    description: 'Cultured Pearl is an official 501(c)(3) tax-exempt nonprofit organization. Every gift directly funds teaching, scholarships, and vulnerable community outreach.',
    taxDeductibleNotice: 'Contributions to Cultured Pearl are tax-deductible to the fullest extent permitted by U.S. law. Official donation receipts are issued for all contributions.',
    mailAddress: 'Cultured Pearl, P.O. Box 2411, Washington, DC 20013',
  });

  const loadGive = useCallback(() => {
    fetchPageContent('GivePage', pageData).then(setPageData);
    fetchSiteSettings().then(setSiteSettings);
  }, []);

  useEffect(() => {
    loadGive();
  }, [loadGive]);

  useWixLiveRefresh(loadGive);

  const effectiveAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (effectiveAmount <= 0) return;

    setSubmitting(true);
    const res = await processWixPayment({
      type: 'donation',
      amount: effectiveAmount,
      title: `${frequency === 'monthly' ? 'Monthly' : 'One-Time'} Donation to Cultured Pearl`,
      frequency,
      donorName,
      donorEmail,
    });
    setSubmitting(false);
    setConfirmation(res.message);
  };

  return (
    <>
      <PageHeader
        eyebrow={pageData.eyebrow || 'Support the Mission'}
        title={pageData.pageTitle || 'Give to a Woman, Change a Generation'}
        intro={pageData.description}
      />

      <Section className="bg-background">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Left Column: Mission & Impact */}
          <div className="lg:col-span-5">
            <Eyebrow>Where It Goes</Eyebrow>
            <h2 className="rule-gold mt-6 text-4xl leading-tight font-display">
              Small, Faithful Gifts — Compounded by Grace.
            </h2>
            <p className="mt-6 text-base text-muted-foreground leading-relaxed">
              When you invest in Cultured Pearl, you invest in mothers, daughters, students, and families striving to overcome adversity. Your support maintains our free community seminars, equips college-bound youth, and serves the vulnerable.
            </p>

            <div className="mt-10 p-6 rounded-2xl bg-sand/40 border border-sand">
              <h3 className="font-serif text-lg font-bold text-espresso mb-2">501(c)(3) Tax Exemption</h3>
              <p className="text-xs text-espresso/70 leading-relaxed font-sans">
                {pageData.taxDeductibleNotice ||
                  'Contributions to Cultured Pearl are tax-deductible to the fullest extent permitted by U.S. law. Official donation receipts are issued for all contributions.'}
              </p>
              <div className="mt-4 pt-4 border-t border-sand/60 flex items-center justify-between text-xs font-sans text-espresso/80">
                <span>EIN Tax ID: {siteSettings.ein || '82-XXXXXXX'}</span>
                <span>{siteSettings.address || 'Washington, DC'}</span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <h4 className="text-xs uppercase tracking-widest font-bold text-gold">Alternative Giving Methods:</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong>Checks:</strong> Payable to <em>Cultured Pearl, Inc.</em><br />
                <strong>Mailing Address:</strong> {pageData.mailAddress || 'Cultured Pearl, P.O. Box 2411, Washington, DC 20013'}<br />
                <strong>Direct Inquiries:</strong> <a href="mailto:sharondasavoy@culturedpearl.org" className="text-gold hover:underline">sharondasavoy@culturedpearl.org</a>
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Donation Form */}
          <div className="lg:col-span-7 bg-sand/30 p-8 md:p-10 rounded-3xl border border-sand shadow-soft">
            <Eyebrow>Secure Giving Portal</Eyebrow>
            <h3 className="font-serif text-3xl font-bold text-espresso mt-2">Make a Contribution</h3>

            {confirmation ? (
              <div className="py-12 text-center">
                <span className="text-5xl text-gold block mb-4">✓</span>
                <h4 className="font-serif text-2xl text-espresso font-bold">Donation Confirmed</h4>
                <p className="text-sm text-espresso/80 mt-3 max-w-md mx-auto leading-relaxed">
                  {confirmation}
                </p>
                <div className="mt-8 p-4 rounded-xl bg-pearl border border-sand text-xs text-espresso/70 max-w-sm mx-auto">
                  A receipt has been prepared for {donorEmail || 'your records'}.
                </div>
                <button
                  onClick={() => setConfirmation(null)}
                  className="mt-6 px-6 py-2.5 rounded-full bg-espresso text-pearl text-xs uppercase tracking-wider font-bold hover:bg-gold transition"
                >
                  Give Another Gift
                </button>
              </div>
            ) : (
              <form onSubmit={handleDonate} className="mt-6 space-y-6">
                {/* Frequency selector */}
                <div className="flex p-1 rounded-full bg-sand/60 max-w-xs">
                  <button
                    type="button"
                    onClick={() => setFrequency('once')}
                    className={`flex-1 py-2 text-xs uppercase tracking-wider font-bold rounded-full transition ${
                      frequency === 'once' ? 'bg-espresso text-pearl shadow-sm' : 'text-espresso/70 hover:text-espresso'
                    }`}
                  >
                    One-Time Gift
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    className={`flex-1 py-2 text-xs uppercase tracking-wider font-bold rounded-full transition ${
                      frequency === 'monthly' ? 'bg-espresso text-pearl shadow-sm' : 'text-espresso/70 hover:text-espresso'
                    }`}
                  >
                    Monthly Partner
                  </button>
                </div>

                {/* Amount presets */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-espresso/80 mb-3">
                    Select Donation Amount
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                    {giftTiers.map((tier) => (
                      <button
                        key={tier.amount}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(tier.amount);
                          setCustomAmount('');
                        }}
                        className={`py-3 px-2 rounded-xl text-center border font-serif text-lg font-bold transition ${
                          selectedAmount === tier.amount && !customAmount
                            ? 'bg-espresso text-pearl border-espresso shadow-soft'
                            : 'bg-pearl text-espresso border-sand hover:border-gold'
                        }`}
                      >
                        {tier.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom amount */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-espresso/80 mb-1">
                    Or Enter Custom Amount ($ USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-serif text-lg text-espresso/60">$</span>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      placeholder="Other Amount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                      }}
                      className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-sand bg-pearl font-serif text-lg focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                </div>

                {/* Active Impact Note */}
                <div className="p-4 rounded-xl bg-pearl border-l-4 border-gold text-xs text-espresso/80">
                  <strong>Impact:</strong>{' '}
                  {giftTiers.find((t) => t.amount === selectedAmount)?.impact ||
                    `Every dollar helps fund scholarships and community support packages.`}
                </div>

                {/* Donor Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-espresso/80 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-sand bg-pearl text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-espresso/80 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-sand bg-pearl text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-espresso/80 mb-1">
                    Dedication or Prayer Note (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="In honor of... or a special blessing"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-sand bg-pearl text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>

                <Button
                  type="submit"
                  variant="gold"
                  className="w-full py-3.5 text-sm font-bold"
                  disabled={submitting || effectiveAmount <= 0}
                >
                  {submitting
                    ? 'Processing Gift...'
                    : `Complete ${frequency === 'monthly' ? 'Monthly' : ''} Gift of $${effectiveAmount.toFixed(2)}`}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Section>

      <Section className="bg-sand">
        <div className="mx-auto max-w-2xl text-center">
          <blockquote className="font-display text-3xl leading-[1.3] md:text-[2.5rem]">
            “Sometimes all it takes to change the world is a little support.”
          </blockquote>
          <p className="mt-8 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Cultured Pearl, founded 2017
          </p>
        </div>
      </Section>
    </>
  );
}
