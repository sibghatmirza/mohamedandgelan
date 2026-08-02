'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';

// Cream matches the invitation background so the hand-off is light-to-light.
const CREAM = '#F7EFE8';
const GOLD = '#E4C579';

export default function VideoIntro() {
  const { t } = useLang();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ending, setEnding] = useState(false);   // cream veil dissolving in
  const [gone, setGone] = useState(false);       // overlay removed
  const [stdVisible, setStdVisible] = useState(true); // Save the Date shown

  // lock scroll while the intro plays
  useEffect(() => {
    if (!gone) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [gone]);

  const finish = () => {
    if (ending) return;
    // start the background music as the video ends
    window.dispatchEvent(new Event('wedding:start-music'));
    setEnding(true);
    setTimeout(() => setGone(true), 950);
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
    // hide "Save the Date" before the mosque scene comes into view
    const hideStd = setTimeout(() => setStdVisible(false), 2600);
    // hard safety fallback in case 'ended' never fires
    const fallback = setTimeout(() => finish(), 32000);
    return () => { clearTimeout(hideStd); clearTimeout(fallback); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          key="video-intro"
          className="fixed inset-0 z-[100] overflow-hidden"
          style={{ background: '#000' }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } }}
        >
          <video
            ref={videoRef}
            src="/videos/newbanner.mp4"
            autoPlay
            muted
            playsInline
            onEnded={finish}
            className="w-full h-full object-cover"
          />

          {/* Save the Date — centered, gold, bold; fades out before the mosque appears */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
            dir={t.dir}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: stdVisible && !ending ? 1 : 0, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          >
            {/* stronger scrim behind the text for legibility on the video */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: '135%', height: '72%',
                background: 'radial-gradient(closest-side, rgba(50,9,17,0.55), rgba(50,9,17,0.22) 55%, transparent)',
              }}
            />

            {t.dir === 'rtl' ? (
              /* Arabic: custom calligraphy word — big */
              <img
                src="/images/banner-arabic-date.svg"
                alt={t.invitation.saveTheDate}
                className="relative"
                style={{ width: 'min(86%, 720px)', height: 'auto', filter: 'drop-shadow(0 4px 22px rgba(0,0,0,0.55))' }}
              />
            ) : (
              <span
                className="font-script relative"
                style={{
                  fontSize: 'clamp(4rem, 15vw, 8rem)',
                  color: GOLD,
                  lineHeight: 1,
                  textShadow: '0 2px 4px rgba(0,0,0,0.6), 0 4px 24px rgba(0,0,0,0.6)',
                }}
              >
                {t.invitation.saveTheDate}
              </span>
            )}

            <span
              className="relative"
              style={{
                marginTop: t.dir === 'rtl' ? '1.8rem' : '1.4rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: t.dir === 'rtl' ? 'clamp(2rem, 7vw, 3.4rem)' : 'clamp(1.5rem, 5vw, 2.6rem)',
                letterSpacing: t.dir === 'rtl' ? 'normal' : '0.28em',
                textTransform: t.dir === 'rtl' ? 'none' : 'uppercase',
                color: GOLD,
                textShadow: '0 2px 4px rgba(0,0,0,0.6), 0 3px 18px rgba(0,0,0,0.6)',
              }}
            >
              {t.hero.weddingDate}
            </span>
          </motion.div>

          {/* cream dissolve that bridges the video into the light invitation */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: CREAM }}
            initial={{ opacity: 0 }}
            animate={{ opacity: ending ? 1 : 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
