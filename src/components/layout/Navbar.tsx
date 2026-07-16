'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { Monogram } from '@/components/ui/WatercolorIllustrations';

const navLinks = (t: ReturnType<typeof useLang>['t']) => [
  { href: '#home',       label: t.nav.home },
  { href: '#details',    label: t.nav.details },
  { href: '#events',     label: t.nav.events },
  { href: '#venue',      label: t.nav.venue },
  { href: '#rsvp',       label: t.nav.rsvp },
];

export default function Navbar() {
  const { lang, t, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(242,237,228,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(216,179,106,0.3)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Monogram */}
        <a href="#home" className="flex items-center gap-2 group">
          <Monogram size={48} />
        </a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-6">
          {navLinks(t).map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="text-[0.72rem] tracking-[0.18em] uppercase transition-colors duration-300 hover:text-[#D8B36A]"
                style={{ color: '#5C111E', fontFamily: 'var(--font-body)', fontWeight: 500 }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: Language + mobile menu */}
        <div className="flex items-center gap-4">
          {/* Language toggle */}
          <div className="flex items-center gap-1 text-xs tracking-widest" style={{ fontFamily: 'var(--font-body)' }}>
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-1 transition-colors duration-200 ${lang === 'en' ? 'text-[#D8B36A] border-b border-[#D8B36A]' : 'text-[#5C111E]'}`}
            >
              EN
            </button>
            <span className="text-[#A99F95]">|</span>
            <button
              onClick={() => setLang('ar')}
              className={`px-2 py-1 transition-colors duration-200 font-arabic ${lang === 'ar' ? 'text-[#D8B36A] border-b border-[#D8B36A]' : 'text-[#5C111E]'}`}
            >
              العربية
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-px w-6 transition-all duration-300"
                style={{ background: '#5C111E' }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden"
            style={{ background: 'rgba(242,237,228,0.98)', borderTop: '1px solid rgba(216,179,106,0.3)' }}
          >
            <ul className="flex flex-col py-6 px-8 gap-5">
              {navLinks(t).map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-base tracking-widest uppercase text-[#5C111E] hover:text-[#D8B36A] transition-colors"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
