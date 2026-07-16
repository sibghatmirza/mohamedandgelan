'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { Polaroid } from '@/components/ui/Collage';

const WEDDING_DATE = new Date('2026-09-30T17:00:00');
function useCountdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, WEDDING_DATE.getTime() - Date.now());
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

const fade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

export default function InvitationCollage() {
  const { t } = useLang();
  const inv = t.invitation;
  const c = useCountdown();
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section
      id="home"
      className="relative px-5 pt-16 pb-20 overflow-x-clip"
      style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #FCFAF6 100%)' }}
    >
      {/* paper texture */}
      <div className="absolute inset-0 texture-paper opacity-30 pointer-events-none" aria-hidden />

      <div className="relative max-w-md mx-auto flex flex-col items-center">

        {/* ── Quran verse ─────────────────────────────── */}
        <motion.div {...fade} transition={{ duration: 0.9 }} className="text-center mt-6">
          <p className="font-arabic mx-auto" dir="rtl" style={{ fontSize: 'clamp(1.3rem,4.5vw,1.8rem)', color: '#5C111E', lineHeight: 1.9 }}>
            خَلَقَكُم مِّن نَّفْسٍ وَاحِدَةٍ وَخَلَقَ مِنْهَا زَوْجَهَا
          </p>
          {t.quran.translation && (
            <p className="font-body mt-3 mx-auto" style={{ fontSize: 'clamp(0.85rem,2.6vw,1rem)', color: '#6b5e56', lineHeight: 1.6, fontStyle: 'italic', maxWidth: 460 }}>
              {t.quran.translation}
            </p>
          )}
          <p className={t.dir === 'rtl' ? 'font-arabic mt-3' : 'caps-label mt-3'} dir={t.dir}
            style={{ fontSize: t.dir === 'rtl' ? '0.9rem' : '0.62rem', color: '#A99F95', letterSpacing: t.dir === 'rtl' ? undefined : '0.2em' }}>
            {t.quran.reference}
          </p>
        </motion.div>

        {/* ── Polaroids ──────────────────────── */}
        <motion.div {...fade} transition={{ duration: 0.8 }} className="relative mt-14 flex items-center justify-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: 24, rotate: -12 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            whileHover={{ y: -8, rotate: 0, scale: 1.04 }}
            className="relative z-10"
          >
            <Polaroid src="/images/couple-1.jpg" caption={inv.us} rotate={-5} width={140} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24, rotate: 12 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            whileHover={{ y: -8, rotate: 0, scale: 1.04 }}
            className="relative z-10"
          >
            <Polaroid src="/images/couple-3.jpg" caption={inv.forever} rotate={6} width={140} />
          </motion.div>
        </motion.div>

        {/* ── Names ────────────────────────────────────── */}
        <motion.div {...fade} transition={{ duration: 0.8 }} className="mt-16 text-center">
          <p className="caps-label" style={{ fontSize: '0.7rem', color: '#A99F95' }}>{inv.withLove}</p>
          <p className="font-script" style={{ fontSize: 'clamp(1.9rem,7.5vw,3.2rem)', color: '#5C111E', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
            {t.hero.coupleNames}
          </p>
        </motion.div>

        {/* ── Countdown ────────────────────────────────── */}
        <motion.div {...fade} transition={{ duration: 0.8 }}
          className="mt-12 w-full px-6 py-14 text-center"
          style={{ background: 'radial-gradient(140% 130% at 50% 0%, #6e1422 0%, #4a0d18 55%, #380a13 100%)' }}>
          <p className="caps-label" style={{ fontSize: 'clamp(0.75rem,2.6vw,1.05rem)', color: '#D8B36A', letterSpacing: '0.3em' }}>
            {t.countdown.title}
          </p>
          {/* gold divider */}
          <div className="flex items-center justify-center gap-2 mt-4 mb-9" aria-hidden>
            <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, #D8B36A)' }} />
            <span style={{ color: '#D8B36A', fontSize: '0.65rem' }}>◆</span>
            <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, #D8B36A)' }} />
          </div>
          <div className="flex justify-center items-start gap-2 sm:gap-4">
            {[[t.countdown.days, c.d], [t.countdown.hours, c.h], [t.countdown.minutes, c.m], [t.countdown.seconds, c.s]].map(([label, val], i) => (
              <React.Fragment key={label as string}>
                {i > 0 && (
                  <span className="font-body" style={{ fontSize: 'clamp(1.3rem,4vw,2rem)', color: '#D8B36A', lineHeight: 1, marginTop: 'clamp(0.85rem,4.5vw,2rem)' }}>:</span>
                )}
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center justify-center"
                    style={{ width: 'clamp(60px,17vw,120px)', height: 'clamp(60px,17vw,120px)', background: '#E3DAD2' }}>
                    <motion.span
                      key={`${label}-${val}`}
                      initial={{ opacity: 0.3, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className="font-body"
                      style={{ fontSize: 'clamp(1.8rem,7vw,3.4rem)', color: '#5C111E', lineHeight: 1 }}
                    >
                      {pad(val as number)}
                    </motion.span>
                  </div>
                  <span className="caps-label" style={{ fontSize: 'clamp(0.55rem,1.9vw,0.85rem)', color: '#E3DAD2', letterSpacing: '0.22em' }}>{label as string}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* scroll hint */}
        <motion.a href="#details" {...fade} transition={{ duration: 0.8 }}
          className="caps-label mt-8" style={{ fontSize: '0.6rem', color: '#A99F95', letterSpacing: '0.3em' }}>
          {inv.explore}
        </motion.a>
      </div>
    </section>
  );
}
