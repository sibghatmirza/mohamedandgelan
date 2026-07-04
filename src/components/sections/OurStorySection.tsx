'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';

export default function OurStorySection() {
  const { t } = useLang();

  return (
    <section
      id="story"
      className="relative py-28 px-6 overflow-x-clip"
      style={{
        background:
          'radial-gradient(120% 80% at 50% 0%, #7a1a2e 0%, #5C111E 45%, #3a0b14 100%)',
      }}
    >
      {/* velvet sheen */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.12]" aria-hidden
        style={{ background: 'repeating-linear-gradient(115deg, #ffffff 0 2px, transparent 2px 9px)' }} />

      <div className="relative max-w-2xl mx-auto flex flex-col items-center text-center">

        {/* Gold ornate framed photo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative"
          style={{ width: 280, aspectRatio: '700 / 1050' }}
          whileHover={{ scale: 1.03 }}
        >
          {/* photo clipped to the oval opening */}
          <div
            className="absolute"
            style={{
              inset: '9% 12%',
              borderRadius: '50%',
              overflow: 'hidden',
              background: 'center/cover url(/images/couple-2.jpg)',
            }}
          />
          {/* gold frame on top */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/frame-oval.png" alt="" aria-hidden
            className="absolute inset-0 w-full h-full select-none pointer-events-none"
            style={{ filter: 'drop-shadow(0 16px 34px rgba(0,0,0,0.35))' }} />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-10"
        >
          <p className="caps-label" style={{ fontSize: '0.75rem', color: '#D8B36A' }}>{t.story.capsLabel}</p>
          <h2 className="font-script" style={{ fontSize: 'clamp(3rem,12vw,4.5rem)', color: '#FAF7F2', lineHeight: 1 }}>
            {t.story.scriptTitle}
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4" aria-hidden>
            <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, #D8B36A)' }} />
            <span style={{ color: '#D8B36A' }}>✦</span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, #D8B36A)' }} />
          </div>
        </motion.div>

        {/* Single paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="mt-10"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', color: '#e7d9cf', lineHeight: 2 }}
        >
          {t.story.para}
        </motion.p>
      </div>
    </section>
  );
}
