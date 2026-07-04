'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { TornEdge, WatercolorDivider } from '@/components/ui/WatercolorIllustrations';

export default function QuranSection() {
  const { t } = useLang();

  return (
    <section
      className="relative py-32 px-6 overflow-x-clip"
      style={{ background: 'linear-gradient(160deg, #FAF7F2 0%, #FCFAF6 100%)' }}
    >
      <TornEdge position="top" color="#FAF7F2" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-3xl mx-auto text-center relative z-10"
      >
        {/* Arabic verse */}
        <p
          className="font-arabic mb-8"
          dir="rtl"
          style={{
            fontSize: 'clamp(1.8rem, 5vw, 2.6rem)',
            color: '#5C111E',
            lineHeight: 1.8,
            fontWeight: 500,
            letterSpacing: '0.05em',
          }}
        >
          خَلَقَكُم مِّن نَّفْسٍ وَاحِدَةٍ وَخَلَقَ مِنْهَا زَوْجَهَا
        </p>

        {/* Divider */}
        <div className="flex justify-center my-8">
          <WatercolorDivider />
        </div>

        {/* Translation (English side only) */}
        {t.quran.translation && (
          <p
            className="font-body mb-6"
            style={{
              fontSize: '1.1rem',
              color: '#6b5e56',
              lineHeight: 1.8,
              fontStyle: 'italic',
              maxWidth: 600,
              margin: '0 auto 2rem',
            }}
          >
            {t.quran.translation}
          </p>
        )}

        {/* Reference */}
        <p
          className={t.dir === 'rtl' ? 'font-arabic' : 'caps-label'}
          dir={t.dir}
          style={{
            fontSize: t.dir === 'rtl' ? '1rem' : '0.8rem',
            color: '#A99F95',
            letterSpacing: t.dir === 'rtl' ? undefined : '0.2em',
            fontWeight: 500,
          }}
        >
          {t.quran.reference}
        </p>
      </motion.div>
    </section>
  );
}
