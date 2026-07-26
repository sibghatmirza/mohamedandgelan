'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { Monogram, WatercolorDivider } from '@/components/ui/WatercolorIllustrations';

export default function FooterSection() {
  const { t } = useLang();

  return (
    <footer
      className="relative py-14 px-6 text-center overflow-x-clip"
      style={{ background: '#FAF7F2' }}
    >


      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative flex flex-col items-center gap-4"
      >

        <Monogram size={72} />

        {/* Thank-you note */}
        <p
          className="mx-auto"
          style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.95rem,2.4vw,1.1rem)', color: '#6b5e56', lineHeight: 1.7, maxWidth: 460, fontStyle: 'italic' }}
        >
          {t.rsvp.thankYouNote}
        </p>

        <WatercolorDivider />
        <p className="section-subtitle">{t.footer.date}</p>

        {/* Nav links */}
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {[
            { href: '#home',    label: t.nav.home },
            { href: '#details', label: t.nav.details },
            { href: '#events',  label: t.nav.events },
            { href: '#venue',   label: t.nav.venue },
            { href: '#rsvp',    label: t.nav.rsvp },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-[10px] tracking-widest uppercase hover:text-[#D8B36A] transition-colors"
              style={{ color: '#A99F95', fontFamily: 'var(--font-body)' }}
            >
              {label}
            </a>
          ))}
        </div>
      </motion.div>
    </footer>
  );
}
