import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Show welcome modal when visiting home page
    if (location.pathname !== '/') return;

    // Check if user has already dismissed the welcome modal in this session
    const hasSeenModal = sessionStorage.getItem('cp_welcome_popup_seen');
    if (!hasSeenModal) {
      // Delay slightly for smooth, luxurious page reveal before showing
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      sessionStorage.setItem('cp_welcome_popup_seen', 'true');
    }, 250);
  };

  const handleNavigate = (path: string) => {
    handleClose();
    navigate(path);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Luxurious Backdrop */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-espresso/65 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Card */}
      <div
        className={`relative w-full max-w-lg bg-gradient-to-b from-[#FFFDF9] via-[#FAF8F5] to-[#F4EEE4] rounded-3xl p-7 sm:p-9 shadow-2xl border border-[#D4AF37]/40 text-center transform transition-all duration-300 ${
          isClosing ? 'scale-95 translate-y-2 opacity-0' : 'scale-100 translate-y-0 opacity-100'
        }`}
        style={{
          boxShadow: '0 25px 60px -15px rgba(44, 36, 32, 0.45), 0 0 40px 0 rgba(212, 175, 55, 0.15)',
        }}
      >
        {/* Subtle Decorative Inner Border Frame */}
        <div className="absolute inset-2.5 sm:inset-3 rounded-[22px] border border-[#D4AF37]/25 pointer-events-none" />

        {/* Elegant Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-sand/30 hover:bg-gold hover:text-espresso text-espresso/70 flex items-center justify-center text-sm font-bold transition-all duration-200 shadow-sm hover:scale-105"
        >
          ✕
        </button>

        {/* Top Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[10px] tracking-widest uppercase font-bold text-[#8C6D1F] mb-4">
          <span>✦</span>
          <span>EST. 2017 • 501(C)(3) NONPROFIT</span>
          <span>✦</span>
        </div>

        {/* High-Resolution Emblem / Logo */}
        <div className="relative mx-auto w-36 sm:w-44 mb-3 flex flex-col items-center">
          <img
            src="/logo_600.png"
            alt="Cultured Pearl"
            className="w-full h-auto object-contain drop-shadow-md hover:scale-[1.02] transition-transform duration-300"
          />
        </div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-2 my-2.5 opacity-60">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <span className="text-xs text-[#D4AF37]">❖</span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>

        {/* Headline & Subtitle */}
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-espresso tracking-tight leading-tight mb-2">
          Welcome to Cultured Pearl
        </h2>

        <p className="font-serif italic text-sm sm:text-base text-[#9A7B38] font-medium mb-3">
          Embracing, Encouraging, & Celebrating Sisterhood
        </p>

        <p className="font-sans text-xs sm:text-sm text-espresso/75 leading-relaxed max-w-sm mx-auto mb-7">
          Bringing women into God’s light through spiritual enrichment, higher education scholarships, and compassionate community empowerment.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10">
          <button
            onClick={() => handleNavigate('/events')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#2C2420] hover:bg-[#D4AF37] hover:text-[#2C2420] text-pearl font-sans text-xs uppercase tracking-wider font-bold transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>📅</span>
            <span>Upcoming Events</span>
          </button>

          <button
            onClick={() => handleNavigate('/about')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-pearl/90 hover:bg-[#D4AF37]/15 text-[#2C2420] border border-[#D4AF37]/60 hover:border-[#D4AF37] font-sans text-xs uppercase tracking-wider font-bold transition-all duration-200 shadow-sm hover:shadow hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>👑</span>
            <span>Daughters of the King</span>
          </button>
        </div>

        {/* Subtle Dismiss Hint */}
        <p className="mt-5 text-[10px] text-espresso/40 font-sans tracking-wide">
          Click outside or press <span className="font-mono bg-sand/30 px-1 py-0.5 rounded">Esc</span> to dismiss
        </p>
      </div>
    </div>
  );
}
