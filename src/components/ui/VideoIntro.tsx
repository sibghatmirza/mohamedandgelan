'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';

// Cream matches the invitation background so the hand-off is light-to-light.
const CREAM = '#F7EFE8';

export default function VideoIntro() {
  const { t } = useLang();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ending, setEnding] = useState(false); // cream veil dissolving in
  const [gone, setGone] = useState(false);     // overlay removed

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
    window.dispatchEvent(new Event('wedding:start-music'));
    // 1) dissolve the video into a cream veil, then 2) reveal the invite under it
    setEnding(true);
    setTimeout(() => setGone(true), 950);
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
    // ask the music to start right away (as early as the browser allows)
    window.dispatchEvent(new Event('wedding:start-music'));
    // hard safety fallback in case 'ended' never fires
    const fallback = setTimeout(() => finish(), 32000);
    return () => clearTimeout(fallback);
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

          {/* soft scrim for text legibility */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, rgba(58,11,20,0.15) 0%, transparent 30%, transparent 55%, rgba(58,11,20,0.45) 100%)' }}
          />

          {/* Save the Date + date overlay */}
          <motion.div
            className="absolute inset-x-0 flex flex-col items-center text-center px-6"
            style={{ bottom: '11%' }}
            dir={t.dir}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: ending ? 0 : 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5 }}
          >
            <span
              className="font-script"
              style={{
                fontSize: 'clamp(2.6rem, 9vw, 5rem)',
                color: '#F7EFE8',
                lineHeight: 1,
                textShadow: '0 3px 18px rgba(0,0,0,0.45)',
              }}
            >
              {t.invitation.saveTheDate}
            </span>
            <span
              className="mt-4"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.85rem, 3vw, 1.15rem)',
                letterSpacing: t.dir === 'rtl' ? '0.1em' : '0.32em',
                textTransform: t.dir === 'rtl' ? 'none' : 'uppercase',
                color: '#F2E6C9',
                textShadow: '0 2px 12px rgba(0,0,0,0.5)',
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
