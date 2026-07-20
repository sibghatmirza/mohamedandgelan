'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { WatercolorDivider, WatercolorWash, FloralBackdrop } from '@/components/ui/WatercolorIllustrations';
import { lineIconMap } from '@/components/ui/LineIcons';

export default function EventsSection() {
  const { t } = useLang();
  const items = t.events.items;

  return (
    <section
      id="events"
      className="relative py-14 px-6 overflow-x-clip"
      style={{ background: 'linear-gradient(160deg, #EAE2D8 0%, #F7F3EE 100%)' }}
    >
      <WatercolorWash />
      <FloralBackdrop opacity={0.06} />

      <div className="max-w-2xl mx-auto relative z-10 text-center">
        {/* Header */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">{t.events.title}</h2>
          <WatercolorDivider />
        </motion.div>

        {/* Vertical timeline */}
        <div className="relative mt-8">
          {/* center line */}
          <motion.div
            className="absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 origin-top"
            style={{ background: 'linear-gradient(to bottom, transparent, #D8B36A, transparent)' }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />

          <div className="flex flex-col gap-8">
            {items.map((ev, i) => {
              const Icon = lineIconMap[ev.icon] ?? lineIconMap.cheers;
              return (
                <motion.div
                  key={i}
                  className="relative flex flex-col items-center gap-2"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* icon node */}
                  <motion.div
                    className="flex w-16 h-16 rounded-full items-center justify-center relative z-10"
                    style={{ background: '#FFFFFF', border: '1px solid rgba(216,179,106,0.5)', boxShadow: '0 6px 18px rgba(92,17,30,0.08)' }}
                    whileHover={{ scale: 1.08, rotate: 3 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {Icon && <Icon size={40} />}
                  </motion.div>

                  <p className="font-body" style={{ fontSize: '1.05rem', letterSpacing: '0.15em', color: '#D8B36A' }}>
                    {ev.time}
                  </p>
                  <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1.4rem', color: '#5C111E' }}>
                    {ev.name}
                  </h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

    </section>
  );
}
