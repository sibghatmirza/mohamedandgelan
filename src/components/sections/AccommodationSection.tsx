'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { WatercolorDivider, GoldLeaf, WatercolorWash, FloralBackdrop } from '@/components/ui/WatercolorIllustrations';

export default function AccommodationSection() {
  const { t } = useLang();

  return (
    <section
      id="stay"
      className="relative py-14 px-6 overflow-x-clip"
      style={{ background: 'linear-gradient(160deg, #EAE2D8 0%, #FAF7F2 100%)' }}
    >
      <WatercolorWash />
      <FloralBackdrop opacity={0.07} />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="section-subtitle mb-4">{t.venue.hotelsSubtitle}</p>
          <h2 className="section-title">{t.venue.hotels}</h2>
          <WatercolorDivider />
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-4">
          {t.venue.hotelList.map((hotel, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, boxShadow: '0 18px 40px rgba(92,17,30,0.15)' }}
              className="glass-card px-4 py-5 flex flex-col items-center text-center gap-2"
            >
              <GoldLeaf size={28} rotate={i * 15} />
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: '#5C111E' }}>{hotel.name}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#A99F95' }}>{hotel.distance}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#A99F95' }}>{hotel.note}</p>
              <a
                href={hotel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxury btn-luxury-primary mt-4"
                style={{ padding: '0.7rem 1.8rem', fontSize: '0.8rem' }}
              >
                {t.venue.book}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
