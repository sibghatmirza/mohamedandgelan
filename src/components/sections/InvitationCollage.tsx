'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { Polaroid, OrnateCard } from '@/components/ui/Collage';
import { Monogram } from '@/components/ui/WatercolorIllustrations';

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
  const card = t.card;
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

        {/* ── Envelope + date ─────────────────────────── */}
        <motion.div {...fade} transition={{ duration: 0.8 }} className="relative w-full flex flex-col items-center">
          <p className="section-subtitle mb-3">{inv.youAreInvited}</p>

          {/* Formal invitation card */}
          <div className="relative mt-2 w-full">
            {/* bouquets peeking from behind the card */}
            <div className="absolute pointer-events-none animate-float-slow" style={{ width: '58%', top: '14%', left: '-24%' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/bouquet.png" alt="" aria-hidden className="select-none w-full"
                style={{ transform: 'rotate(-24deg)' }} />
            </div>
            <div className="absolute pointer-events-none animate-float-slow" style={{ width: '58%', top: '38%', right: '-24%', animationDelay: '-3.5s' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/bouquet.png" alt="" aria-hidden className="select-none w-full"
                style={{ transform: 'rotate(26deg) scaleX(-1)' }} />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
            <OrnateCard className="relative">
              <Monogram color="burgundy" size={78} className="mb-3" />
              <p className="font-arabic" dir="rtl" style={{ fontSize: 'clamp(1.1rem,4vw,1.4rem)', color: '#5C111E', lineHeight: 1.5 }}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
              {t.dir === 'ltr' && (
                <p className="font-body mt-1" style={{ fontSize: 'clamp(0.6rem,2vw,0.72rem)', color: '#A99F95', lineHeight: 1.4 }}>{card.bismillah}</p>
              )}
              <p className="caps-label mt-3" style={{ fontSize: 'clamp(0.5rem,1.7vw,0.6rem)', color: '#8a6d4a', lineHeight: 1.7 }}>{card.ceremony}</p>

              <h2 className="font-script mt-2" style={{ fontSize: 'clamp(1.5rem,6vw,2.1rem)', color: '#5C111E', lineHeight: 1.05, whiteSpace: 'nowrap' }}>
                {inv.groom}
              </h2>
              <p className={t.dir === 'rtl' ? 'font-arabic' : 'font-script'} style={{ fontSize: 'clamp(1.2rem,4vw,1.5rem)', color: '#D8B36A', lineHeight: 1 }}>{inv.ampersand}</p>
              <h2 className="font-script" style={{ fontSize: 'clamp(1.5rem,6vw,2.1rem)', color: '#5C111E', lineHeight: 1.05, whiteSpace: 'nowrap' }}>
                {inv.bride}
              </h2>

              <p className="font-body mt-3 mx-auto" style={{ fontSize: 'clamp(0.7rem,2.3vw,0.85rem)', color: '#6b5e56', lineHeight: 1.55, maxWidth: 300 }}>{card.body1}</p>
              <p className="font-body mt-2 mx-auto" style={{ fontSize: 'clamp(0.7rem,2.3vw,0.85rem)', color: '#6b5e56', lineHeight: 1.55, maxWidth: 300 }}>{card.body2}</p>

              <div className="w-10 h-px mx-auto my-3" style={{ background: '#D8B36A' }} />

              <p className="font-accent" style={{ fontSize: 'clamp(0.72rem,2.4vw,0.88rem)', color: '#5C111E', letterSpacing: '0.04em' }}>{card.dateLine}</p>
              <p className="font-accent" style={{ fontSize: 'clamp(0.72rem,2.4vw,0.88rem)', color: '#5C111E', letterSpacing: '0.04em' }}>{card.timeLine}</p>
              <p className="font-accent mt-1 mx-auto" style={{ fontSize: 'clamp(0.72rem,2.4vw,0.88rem)', color: '#5C111E', letterSpacing: '0.04em', maxWidth: 250 }}>{card.venueLine}</p>
            </OrnateCard>
            </motion.div>
          </div>
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
          className="mt-12 w-full max-w-sm px-6 py-5 text-center"
          style={{ background: 'linear-gradient(160deg,#6e1422,#5C111E)', borderRadius: 6, boxShadow: '0 16px 38px rgba(92,17,30,0.3)' }}>
          <div className="flex justify-center gap-4">
            {[[t.countdown.days, c.d], [t.countdown.hours, c.h], [t.countdown.minutes, c.m], [t.countdown.seconds, c.s]].map(([label, val]) => (
              <div key={label as string} className="flex flex-col items-center">
                <motion.span
                  key={`${label}-${val}`}
                  initial={{ opacity: 0.3, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="font-body"
                  style={{ fontSize: '1.8rem', color: '#FAF7F2', lineHeight: 1 }}
                >
                  {pad(val as number)}
                </motion.span>
                <span className="caps-label" style={{ fontSize: '0.55rem', color: '#D8B36A', marginTop: 4 }}>{label as string}</span>
              </div>
            ))}
          </div>
          <p className="caps-label mt-4" style={{ fontSize: '0.62rem', color: '#D8B36A' }}>{t.countdown.title}</p>
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
