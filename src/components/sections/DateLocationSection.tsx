'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { OrnateDivider, TornEdge, WatercolorWash, LilyDivider } from '@/components/ui/WatercolorIllustrations';

export default function DateLocationSection() {
  const { t } = useLang();
  const dl = t.dateLocation;

  return (
    <section
      id="details"
      className="relative py-24 px-6 overflow-x-clip"
      style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF7F2 100%)' }}
    >
      <TornEdge position="top" color="#FFFFFF" />
      <WatercolorWash />

      {/* Photo header band with "The Details" */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative max-w-3xl mx-auto rounded-sm overflow-hidden mb-16"
        style={{ height: 190, background: 'center/cover url(/images/couple-1.jpg)' }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center"
          style={{ background: 'linear-gradient(to bottom, rgba(92,17,30,0.45), rgba(58,11,20,0.55))' }}>
          <p className="caps-label" style={{ fontSize: '0.7rem', color: '#F2EDE4', letterSpacing: '0.3em' }}>{dl.bandTop}</p>
          <p className="font-script" style={{ fontSize: 'clamp(2.6rem,9vw,3.6rem)', color: '#FAF7F2', lineHeight: 1 }}>{dl.bandTitle}</p>
        </div>
      </motion.div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">{dl.title}</h2>
          <OrnateDivider />

          <div className="grid sm:grid-cols-2 gap-10 mt-12 max-w-lg mx-auto">
            <div className="flex flex-col items-center gap-2">
              <p className="caps-label" style={{ fontSize: '0.75rem' }}>{dl.dateLabel}</p>
              <div className="h-px w-8" style={{ background: '#D8B36A' }} />
              <p className="font-body" style={{ fontSize: '1.3rem', color: '#5C111E' }}>{dl.dateValue}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="caps-label" style={{ fontSize: '0.75rem' }}>{dl.ceremonyLabel}</p>
              <div className="h-px w-8" style={{ background: '#D8B36A' }} />
              <p className="font-body" style={{ fontSize: '1.3rem', color: '#5C111E' }}>{dl.ceremonyValue}</p>
            </div>
          </div>
        </motion.div>

        <LilyDivider className="mt-14" />
      </div>

    </section>
  );
}
