'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BURGUNDY = '#5C111E';
const DARK = '#3f0a13';
const DARKER = '#310810';

// Fold-out timing (seconds)
const FLAP_DURATION = 0.9;

export default function EnvelopeIntro() {
  const [opened, setOpened] = useState(false);
  const [gone, setGone] = useState(false);

  // lock page scroll while the envelope is closed
  useEffect(() => {
    if (!gone) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [gone]);

  const open = () => {
    if (opened) return;
    setOpened(true);
    // start the banner video from the beginning the moment the envelope opens
    const video = document.querySelector('video');
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
    setTimeout(() => setGone(true), (FLAP_DURATION + 0.3) * 1000);
  };

  const flap = (origin: string, rotate: string) => ({
    initial: { transform: 'rotate3d(0,0,0,0deg)' },
    animate: opened ? { transform: rotate, opacity: 0 } : { transform: 'rotate3d(0,0,0,0deg)' },
    transition: { duration: FLAP_DURATION, ease: [0.65, 0, 0.35, 1] as const, opacity: { duration: FLAP_DURATION, ease: 'easeIn' as const } },
    style: { transformOrigin: origin } as React.CSSProperties,
  });

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          key="envelope"
          className="fixed inset-0 z-[100] cursor-pointer select-none overflow-hidden"
          style={{ perspective: 1400, background: 'transparent', minHeight: '100dvh', pointerEvents: opened ? 'none' : 'auto' }}
          onClick={open}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
          aria-label="Open your invite"
          role="button"
        >
          {/* Envelope canvas: keeps real landscape envelope proportions and
              always covers the viewport — on phones you see a zoomed-in crop
              instead of a squeezed envelope. */}
          <div
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              height: 'max(100dvh, 69vw)',
              aspectRatio: '1.45',
              perspective: 1400,
            }}
          >

          {/* ── 4 flaps, points meeting at the center ── */}
          {/* top — brightest, catches the light */}
          <motion.div
            className="absolute inset-0 z-10"
            {...flap('50% 0%', 'rotate3d(1,0,0,150deg)')}
          >
            <div className="w-full h-full texture-paper" style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 58%)',
              background: `linear-gradient(180deg, #8d2136 0%, #7a1a2e 45%, ${BURGUNDY} 80%, #4a0d18 100%)`,
              filter: 'drop-shadow(0 10px 22px rgba(0,0,0,0.55))',
            }} />
            {/* crease highlight along the fold edges */}
            <div className="w-full h-full absolute inset-0" style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 58%)',
              background: 'linear-gradient(115deg, rgba(255,255,255,0.10) 0%, transparent 18%), linear-gradient(-115deg, rgba(0,0,0,0.28) 0%, transparent 18%)',
            }} />
          </motion.div>
          {/* bottom — darker, in shadow */}
          <motion.div
            className="absolute inset-0 z-[9]"
            {...flap('50% 100%', 'rotate3d(1,0,0,-150deg)')}
          >
            <div className="w-full h-full texture-paper" style={{
              clipPath: 'polygon(0 100%, 100% 100%, 50% 45%)',
              background: `linear-gradient(0deg, #58101c 0%, ${BURGUNDY} 55%, ${DARK} 100%)`,
              filter: 'drop-shadow(0 -8px 18px rgba(0,0,0,0.45))',
            }} />
            <div className="w-full h-full absolute inset-0" style={{
              clipPath: 'polygon(0 100%, 100% 100%, 50% 45%)',
              background: 'linear-gradient(65deg, rgba(255,255,255,0.06) 0%, transparent 20%), linear-gradient(-65deg, rgba(0,0,0,0.3) 0%, transparent 20%)',
            }} />
          </motion.div>
          {/* left — mid tone */}
          <motion.div
            className="absolute inset-0 z-[8]"
            {...flap('0% 50%', 'rotate3d(0,1,0,-150deg)')}
          >
            <div className="w-full h-full texture-paper" style={{
              clipPath: 'polygon(0 0, 0 100%, 52% 50%)',
              background: `linear-gradient(90deg, #77192c 0%, #64131f 60%, ${DARK} 100%)`,
              filter: 'drop-shadow(8px 0 16px rgba(0,0,0,0.4))',
            }} />
          </motion.div>
          {/* right — darkest side */}
          <motion.div
            className="absolute inset-0 z-[8]"
            {...flap('100% 50%', 'rotate3d(0,1,0,150deg)')}
          >
            <div className="w-full h-full texture-paper" style={{
              clipPath: 'polygon(100% 0, 100% 100%, 48% 50%)',
              background: `linear-gradient(270deg, #6b1526 0%, #521020 60%, ${DARKER} 100%)`,
              filter: 'drop-shadow(-8px 0 16px rgba(0,0,0,0.4))',
            }} />
          </motion.div>
          </div>

          {/* paper grain + vignette over the whole envelope (fades out with the seal) */}
          <motion.div
            className="absolute inset-0 z-[11] pointer-events-none"
            animate={opened ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="absolute inset-0 texture-paper" style={{ opacity: 0.9 }} />
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(120% 90% at 50% 42%, transparent 55%, rgba(0,0,0,0.38) 100%)',
            }} />
          </motion.div>

          {/* ── wax seal + prompt ── */}
          <motion.div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 px-6"
            animate={opened ? { opacity: 0, scale: 1.4 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
          >
            <motion.img
              src="/images/seal-monogram.png"
              alt=""
              className="pointer-events-none"
              style={{ width: 'clamp(110px, 30vw, 170px)', height: 'auto', filter: 'drop-shadow(0 10px 26px rgba(0,0,0,0.45))' }}
              animate={opened ? {} : { scale: [1, 1.05, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="text-center">
              <p className="uppercase" style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 'clamp(0.8rem, 3vw, 1rem)',
                letterSpacing: '0.35em',
                color: '#D8B36A',
              }}>
                Open Your Invite
              </p>
              <p className="font-arabic mt-2" dir="rtl" style={{ fontSize: 'clamp(1rem, 3.6vw, 1.25rem)', color: '#F2EDE4', opacity: 0.85 }}>
                افتح دعوتك
              </p>
            </div>
            {/* tap hint ring */}
            <motion.div
              className="rounded-full"
              style={{ width: 8, height: 8, background: '#D8B36A' }}
              animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
