'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { OrnateDivider, WatercolorWash, FloralBackdrop } from '@/components/ui/WatercolorIllustrations';

export default function DateLocationSection() {
  const { t } = useLang();
  const dl = t.dateLocation;

  return (
    <section
      id="details"
      className="relative py-14 px-6 overflow-x-clip"
      style={{ background: 'linear-gradient(180deg, #FAF7F2 0%, #F3ECE3 100%)' }}
    >
      <WatercolorWash />
      <FloralBackdrop opacity={0.07} />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">{dl.title}</h2>
          <OrnateDivider />

          <div className="flex flex-col items-center gap-10 mt-10 max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-3">
              <p className="caps-label" style={{ fontSize: '0.75rem' }}>{dl.dateLabel}</p>
              <div className="h-px w-8" style={{ background: '#D8B36A' }} />
              <p className="font-body" style={{ fontSize: '1.3rem', color: '#5C111E' }}>{dl.dateValue}</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <p className="caps-label" style={{ fontSize: '0.75rem' }}>{dl.ceremonyLabel}</p>
              <div className="h-px w-8" style={{ background: '#D8B36A' }} />
              <p className="font-body" style={{ fontSize: '1.3rem', color: '#5C111E' }}>{dl.ceremonyValue}</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <p className="caps-label" style={{ fontSize: '0.75rem' }}>{dl.venueLabel}</p>
              <div className="h-px w-8" style={{ background: '#D8B36A' }} />
              <p className="font-body" style={{ fontSize: '1.3rem', color: '#5C111E' }}>{dl.venueValue}</p>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
