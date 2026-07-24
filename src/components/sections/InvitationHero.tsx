'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { Monogram } from '@/components/ui/WatercolorIllustrations';

// Clean palette — only these three tones are used in the hero.
const BURGUNDY = '#5C111E';
const MUTED = '#6b5e56';
const GOLD = '#D8B36A';

const rise = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function InvitationHero() {
  const { t } = useLang();
  const inv = t.invitation;
  const card = t.card;

  return (
    <section
      id="home"
      className="relative w-full flex flex-col items-center justify-start text-center px-6 pb-24"
      style={{
        backgroundImage: 'url(/images/invitation-back.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
        minHeight: '100svh',
        paddingTop: 'clamp(7rem, 17vh, 12rem)',
      }}
    >
      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center">
        {/* monogram — golden, clear of the fabric drape, with space above the Bismillah */}
        <motion.div {...rise} transition={{ duration: 0.7 }}>
          <Monogram color="gold" size={96} className="mb-10" />
        </motion.div>

        {/* Bismillah — Arabic first */}
        <motion.p
          {...rise}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-arabic"
          dir="rtl"
          style={{ fontSize: 'clamp(1.6rem, 4.8vw, 2.2rem)', color: BURGUNDY, lineHeight: 1.7 }}
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </motion.p>
        {t.dir === 'ltr' && (
          <motion.p
            {...rise}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-body mt-1"
            style={{ fontSize: 'clamp(0.82rem, 2.2vw, 0.95rem)', color: MUTED, opacity: 0.75, lineHeight: 1.5 }}
          >
            {card.bismillah}
          </motion.p>
        )}

        {/* ceremony line (skipped when empty, e.g. Arabic) */}
        {card.ceremony && (
          <motion.p
            {...rise}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="font-body mt-9 mx-auto"
            style={{ fontSize: 'clamp(1rem, 2.6vw, 1.15rem)', color: MUTED, lineHeight: 1.6, maxWidth: 540 }}
          >
            {card.ceremony}
          </motion.p>
        )}

        {/* full names */}
        <motion.h1
          {...rise}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="font-script mt-4"
          style={{ fontSize: 'clamp(3.4rem, 13vw, 6rem)', color: BURGUNDY, lineHeight: 1 }}
        >
          {inv.groom}
        </motion.h1>
        <motion.p
          {...rise}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-script"
          style={{ fontSize: 'clamp(2rem, 6.5vw, 3rem)', color: GOLD, lineHeight: 1, margin: '0.1em 0' }}
        >
          {inv.ampersand}
        </motion.p>
        <motion.h1
          {...rise}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="font-script"
          style={{ fontSize: 'clamp(3.4rem, 13vw, 6rem)', color: BURGUNDY, lineHeight: 1 }}
        >
          {inv.bride}
        </motion.h1>

        {/* body — both sentences in one compact block */}
        <motion.p
          {...rise}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="font-body mt-10 mx-auto"
          style={{ fontSize: 'clamp(0.98rem, 2.5vw, 1.12rem)', color: MUTED, lineHeight: 1.7, maxWidth: 620 }}
        >
          {card.body1}{' '}{card.body2}
        </motion.p>

        {/* Quran verse */}
        <motion.p
          {...rise}
          transition={{ duration: 0.8, delay: 0.68 }}
          className="font-arabic mt-10 mx-auto"
          dir="rtl"
          style={{ fontSize: 'clamp(1.25rem, 3.8vw, 1.65rem)', color: BURGUNDY, lineHeight: 1.9, maxWidth: 480 }}
        >
          خَلَقَكُم مِّن نَّفْسٍ وَاحِدَةٍ وَخَلَقَ مِنْهَا زَوْجَهَا
        </motion.p>
        {t.quran.translation && (
          <motion.p
            {...rise}
            transition={{ duration: 0.8, delay: 0.74 }}
            className="font-body mt-2 mx-auto"
            style={{ fontSize: 'clamp(0.82rem, 2.2vw, 0.95rem)', color: MUTED, fontStyle: 'italic', lineHeight: 1.6, maxWidth: 420 }}
          >
            {t.quran.translation}
          </motion.p>
        )}
        <motion.p
          {...rise}
          transition={{ duration: 0.8, delay: 0.8 }}
          className={t.dir === 'rtl' ? 'font-arabic mt-3' : 'font-body mt-3'}
          dir={t.dir}
          style={{ fontSize: t.dir === 'rtl' ? '0.95rem' : '0.72rem', color: GOLD, letterSpacing: t.dir === 'rtl' ? undefined : '0.15em' }}
        >
          {t.quran.reference}
        </motion.p>
      </div>
    </section>
  );
}
