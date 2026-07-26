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

          {/* Save the Date — centered, gold, fades out before the mosque appears */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
            dir={t.dir}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: stdVisible && !ending ? 1 : 0, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          >
            {/* soft radial scrim just behind the text for legibility */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: '120%', height: '60%',
                background: 'radial-gradient(closest-side, rgba(58,11,20,0.35), transparent)',
              }}
            />
            <span
              className="font-script relative"
              style={{
                fontSize: 'clamp(2.8rem, 10vw, 5.5rem)',
                color: GOLD,
                lineHeight: 1,
                textShadow: '0 3px 20px rgba(0,0,0,0.5)',
              }}
            >
              {t.invitation.saveTheDate}
            </span>
            <span
              className="mt-4 relative"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.85rem, 3vw, 1.15rem)',
                letterSpacing: t.dir === 'rtl' ? 'normal' : '0.32em',
                textTransform: t.dir === 'rtl' ? 'none' : 'uppercase',
                color: GOLD,
                textShadow: '0 2px 14px rgba(0,0,0,0.55)',
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
