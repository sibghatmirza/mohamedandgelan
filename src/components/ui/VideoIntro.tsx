'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Cream matches the invitation background so the hand-off is light-to-light.
const CREAM = '#F7EFE8';

export default function VideoIntro() {
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
    // start the faint background music as the intro ends
    window.dispatchEvent(new Event('wedding:start-music'));
    // 1) dissolve the video into a cream veil, then 2) reveal the invite under it
    setEnding(true);
    setTimeout(() => setGone(true), 950);
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
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
