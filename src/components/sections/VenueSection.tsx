'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { WatercolorDivider, GoldLeaf, TornEdge, WatercolorWash, LilyDivider } from '@/components/ui/WatercolorIllustrations';

export default function VenueSection() {
  const { t } = useLang();

  return (
    <section
      id="venue"
      className="relative py-24 px-6 overflow-x-clip"
      style={{ background: 'linear-gradient(160deg, #FAF7F2 0%, #EAE2D8 100%)' }}
    >
      <TornEdge position="top" color="#FAF7F2" />
      <WatercolorWash />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="section-subtitle mb-4">{t.venue.subtitle}</p>
          <h2 className="section-title">{t.venue.title}</h2>
          <WatercolorDivider />
        </motion.div>

        {/* Venue illustration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 rounded-sm overflow-hidden mx-auto"
          style={{ height: 340, maxWidth: 600 }}
        >
          <img src="/images/venue-setup.png" alt={t.venue.name} className="w-full h-full object-cover" />
        </motion.div>

        {/* Venue details — centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-2 mb-6"
        >
          <p style={{ fontFamily: "'Marcellus', serif", fontSize: '1.2rem', color: '#5C111E' }}>{t.venue.name}</p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', color: '#6b5e56' }}>{t.venue.address}</p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.95rem', color: '#A99F95' }}>{t.venue.parking}</p>
          <a
            href={t.venue.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury btn-luxury-primary mt-5"
          >
            {t.venue.directions}
          </a>
        </motion.div>

        {/* Embedded Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="overflow-hidden mx-auto mt-8"
          style={{ maxWidth: 640 }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.178622045559!2d31.348924000000004!3d30.0890703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145815002cc2406f%3A0xe4fbaa77b1a168f4!2z2YXYs9is2K8g2KfZhNi52YTZiiDYp9mE2LnYuNmK2YUg2KfZhNmF2KfYuNip!5e0!3m2!1sen!2som!4v1783072653171!5m2!1sen!2som"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Venue Location"
          />
        </motion.div>

        {/* Nearby hotels — centered */}
        <div className="mt-12">
          <h3 style={{ fontFamily: "'Marcellus', serif", fontSize: '1.3rem', color: '#5C111E', marginBottom: '1.25rem' }}>
            {t.venue.hotels}
          </h3>
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
                <p style={{ fontFamily: "'Marcellus', serif", fontSize: '0.95rem', color: '#5C111E' }}>{hotel.name}</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem', color: '#A99F95' }}>{hotel.distance}</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.8rem', color: '#A99F95' }}>{hotel.note}</p>
                <a
                  href={hotel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="caps-label mt-2 inline-block transition-colors hover:text-[#5C111E]"
                  style={{ fontSize: '0.62rem', color: '#D8B36A', borderBottom: '1px solid rgba(216,179,106,0.5)', paddingBottom: 2 }}
                >
                  {t.venue.book} →
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        <LilyDivider className="mt-14" />
      </div>
    </section>
  );
}
