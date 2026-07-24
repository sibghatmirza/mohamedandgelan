'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';

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

export default function CountdownSection() {
  const { t } = useLang();
  const c = useCountdown();
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section className="relative px-6 pt-10 pb-16 text-center"
      style={{ background: 'linear-gradient(to bottom, #6e1422 0%, #4a0d18 45%, #380a13 100%)' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="caps-label" style={{ fontSize: t.dir === 'rtl' ? 'clamp(1.4rem,5vw,2rem)' : 'clamp(0.75rem,2.6vw,1.05rem)', color: '#D8B36A', letterSpacing: t.dir === 'rtl' ? 'normal' : '0.3em' }}>
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
                <span className="caps-label" style={{ fontSize: 'clamp(0.6rem,1.9vw,0.85rem)', color: '#E3DAD2', letterSpacing: t.dir === 'rtl' ? 'normal' : '0.22em' }}>{label as string}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
