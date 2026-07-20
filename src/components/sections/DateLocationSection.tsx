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
          <p className="section-subtitle mb-4">{t.events.subtitle}</p>
          <h2 className="section-title">{dl.title}</h2>
          <OrnateDivider />

          <div className="grid sm:grid-cols-3 gap-8 mt-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <p className="font-body" style={{ fontSize: '1.3rem', color: '#5C111E' }}>{dl.dateValue}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-body" style={{ fontSize: '1.3rem', color: '#5C111E' }}>{dl.ceremonyValue}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-body" style={{ fontSize: '1.3rem', color: '#5C111E' }}>{dl.venueValue}</p>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
