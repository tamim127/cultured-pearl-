import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './Button';
import { IMAGES } from '../constants/images';

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const nav = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Team', to: '/meet-the-team' },
    { label: 'Debutante', to: '/debutante' },
    { label: 'Scholarship', to: '/scholarship' },
    { label: 'Events', to: '/events' },
    { label: 'Get Involved', to: '/get-involved' },
    { label: 'Store', to: '/shop' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-pearl/95 backdrop-blur-md border-b border-sand">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center py-1 group">
          <img
            src={IMAGES.logo}
            alt="Cultured Pearl"
            className="h-14 md:h-16 w-auto max-w-[200px] object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-6">
          {nav.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`text-xs uppercase tracking-widest font-sans transition-colors duration-200 ${
                  active ? 'text-gold font-bold border-b border-gold pb-0.5' : 'text-espresso/80 hover:text-espresso'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/give">
            <Button variant="primary" size="sm">
              Give Hope
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="xl:hidden p-2 text-espresso hover:text-gold"
          aria-label="Toggle Navigation"
        >
          <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="xl:hidden bg-pearl border-b border-sand px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-widest text-espresso font-sans py-1 hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/videos"
              onClick={() => setOpen(false)}
              className="text-sm uppercase tracking-widest text-espresso font-sans py-1 hover:text-gold"
            >
              Videos
            </Link>
            <Link
              to="/blog"
              onClick={() => setOpen(false)}
              className="text-sm uppercase tracking-widest text-espresso font-sans py-1 hover:text-gold"
            >
              Blog
            </Link>
          </nav>
          <div className="pt-4 border-t border-sand">
            <Link to="/give" onClick={() => setOpen(false)}>
              <Button variant="primary" className="w-full">
                Give Hope
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
