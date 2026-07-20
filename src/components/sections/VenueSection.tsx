'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { WatercolorDivider, WatercolorWash, FloralBackdrop } from '@/components/ui/WatercolorIllustrations';

export default function VenueSection() {
  const { t } = useLang();

  return (
    <section
      id="venue"
      className="relative py-14 px-6 overflow-x-clip"
      style={{ background: 'linear-gradient(160deg, #FAF7F2 0%, #EAE2D8 100%)' }}
    >
      <WatercolorWash />
      <FloralBackdrop opacity={0.08} />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Header */}
        <motion.div
          className="mb-8"
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
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', color: '#5C111E' }}>{t.venue.name}</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#6b5e56' }}>{t.venue.address}</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: '#A99F95' }}>{t.venue.parking}</p>
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
      </div>
    </section>
  );
}
