'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { Monogram, WatercolorDivider, TornEdge } from '@/components/ui/WatercolorIllustrations';

export default function FooterSection() {
  const { t } = useLang();

  return (
    <footer
      className="relative py-20 px-6 text-center overflow-x-clip"
      style={{ background: '#FAF7F2' }}
    >
      <TornEdge position="top" color="#FAF7F2" />


      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative flex flex-col items-center gap-4"
      >

        <Monogram size={72} />
        <h2 style={{ fontFamily: "'Pinyon Script', cursive", fontSize: '2.5rem', color: '#5C111E' }}>
          {t.footer.names}
        </h2>
        <WatercolorDivider />
        <p className="section-subtitle">{t.footer.date}</p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem', color: '#A99F95', marginTop: '2rem' }}>
          {t.footer.madeWith} ♡
        </p>

        {/* Nav links */}
        <div className="flex flex-wrap justify-center gap-6 mt-4">
          {[
            { href: '#home',    label: t.nav.home },
            { href: '#story',   label: t.nav.ourStory },
            { href: '#events',  label: t.nav.events },
            { href: '#venue',   label: t.nav.venue },
            { href: '#rsvp',    label: t.nav.rsvp },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-[10px] tracking-widest uppercase hover:text-[#D8B36A] transition-colors"
              style={{ color: '#A99F95', fontFamily: "'Cormorant Garamond', serif" }}
            >
              {label}
            </a>
          ))}
        </div>
      </motion.div>
    </footer>
  );
}
