import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../constants/images';
import {
  fetchFooterContent,
  fetchHeaderContent,
  useWixLiveRefresh,
  FooterContent,
} from '../services/wixClient';

export function Footer() {
  const [logoUrl, setLogoUrl] = useState<string>(IMAGES.logo);
  const [content, setContent] = useState<FooterContent>({
    title: 'Main Footer',
    brandText: "Bringing women into God's light. Empowering through sisterhood, faith, higher education scholarships, and community service.",
    scriptureVerse: '“And I will put this third into the fire, and refine them as one refines silver, and test them as gold is tested.” — Zechariah 13:9',
    copyrightText: '© 2026 Cultured Pearl. A 501(c)(3) nonprofit organization. All rights reserved.',
    contactEmail: 'info@culturedpearl.org',
    contactPhone: '(202) 555-0199',
    address: 'Washington, DC Metropolitan Area',
  });

  const loadFooter = useCallback(() => {
    fetchFooterContent().then(setContent);
    fetchHeaderContent().then((hc) => {
      if (hc.logoUrl) setLogoUrl(hc.logoUrl);
    });
  }, []);

  useEffect(() => {
    loadFooter();
  }, [loadFooter]);

  useWixLiveRefresh(loadFooter);

  return (
    <footer className="bg-espresso text-pearl border-t border-gold/30">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block bg-pearl/10 p-2 rounded-xl backdrop-blur-sm hover:bg-pearl/15 transition-colors">
              <img
                src={logoUrl}
                alt="Cultured Pearl"
                className="h-14 w-auto object-contain brightness-110"
              />
            </Link>
            <p className="text-pearl/70 text-sm font-sans leading-relaxed max-w-sm">
              {content.brandText}
            </p>
            <p className="font-serif italic text-sm text-gold-soft">
              {content.scriptureVerse}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold font-bold mb-4 font-sans">
              Programs
            </h4>
            <ul className="space-y-2.5 text-sm font-sans text-pearl/80">
              <li>
                <Link to="/debutante" className="hover:text-gold transition">
                  Debutante Ball
                </Link>
              </li>
              <li>
                <Link to="/scholarship" className="hover:text-gold transition">
                  Purposeful Life Scholarship
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-gold transition">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-gold transition">
                  Magazine Store
                </Link>
              </li>
            </ul>
          </div>

          {/* Organization */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold font-bold mb-4 font-sans">
              About
            </h4>
            <ul className="space-y-2.5 text-sm font-sans text-pearl/80">
              <li>
                <Link to="/about" className="hover:text-gold transition">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link to="/meet-the-team" className="hover:text-gold transition">
                  Meet the Team
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-gold transition">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link to="/videos" className="hover:text-gold transition">
                  Video Archive
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-gold transition">
                  Blog & Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold font-bold mb-4 font-sans">
              Support
            </h4>
            <ul className="space-y-2.5 text-sm font-sans text-pearl/80">
              <li>
                <Link to="/give" className="hover:text-gold transition">
                  Make a Donation
                </Link>
              </li>
              <li>
                <Link to="/get-involved" className="hover:text-gold transition">
                  Volunteer & Partner
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold transition">
                  Contact Us
                </Link>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-pearl/10 text-xs text-pearl/60">
              <p>Email:</p>
              <a
                href={`mailto:${content.contactEmail || 'info@culturedpearl.org'}`}
                className="text-gold hover:underline font-mono text-[11px]"
              >
                {content.contactEmail || 'info@culturedpearl.org'}
              </a>
              {content.contactPhone && (
                <p className="mt-1 font-mono text-[11px] text-pearl/50">
                  Phone: {content.contactPhone}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-pearl/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-pearl/50">
          <p>{content.copyrightText || `© ${new Date().getFullYear()} Cultured Pearl. A 501(c)(3) nonprofit organization. All rights reserved.`}</p>
          <div className="flex gap-6">
            <Link to="/about" className="hover:text-gold">Mission</Link>
            <Link to="/give" className="hover:text-gold">Tax Exemption</Link>
            <Link to="/contact" className="hover:text-gold">Inquiries</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
