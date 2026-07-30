'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';

const VOLUME = 0.16; // faint background level

export default function MusicPlayer({
  src = '/music/background.mp3',
  startAt = 0,
}: {
  src?: string;
  startAt?: number; // seconds to begin audible playback from (and loop back to)
}) {
  const { t } = useLang();
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audibleRef = useRef(false); // has it gone audible yet?

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const seek = () => {
      if (startAt > 0) {
        try { el.currentTime = startAt; } catch { /* metadata not ready */ }
      }
    };

    // Prime the element: muted autoplay is allowed on every browser, so the
    // audio is already "playing" silently and ready to be unmuted instantly.
    el.muted = true;
    el.volume = VOLUME;
    el.play().catch(() => {});

    // Go audible: seek to the offset, unmute, ensure it's playing.
    const goAudible = () => {
      const a = audioRef.current;
      if (!a) return;
      if (!audibleRef.current) seek();
      a.muted = false;
      a.volume = VOLUME;
      a.play()
        .then(() => { audibleRef.current = true; setPlaying(true); })
        .catch(() => {});
    };

    // seek once metadata is available
    const onMeta = () => { if (!audibleRef.current) seek(); };
    // loop back to the offset instead of 0
    const onEnded = () => { seek(); el.play().catch(() => {}); };
    el.addEventListener('loadedmetadata', onMeta);
    el.addEventListener('ended', onEnded);

    // 1) primary: the intro video fires this when it finishes
    window.addEventListener('wedding:start-music', goAudible);

    // 2) guaranteed fallback: the first user interaction anywhere unmutes it
    //    (mobile browsers require a gesture before audible playback).
    const gestures = ['pointerdown', 'touchstart', 'click', 'keydown', 'scroll'];
    const onGesture = () => {
      goAudible();
      gestures.forEach((e) => window.removeEventListener(e, onGesture, true));
    };
    gestures.forEach((e) => window.addEventListener(e, onGesture, true));

    return () => {
      window.removeEventListener('wedding:start-music', goAudible);
      gestures.forEach((e) => window.removeEventListener(e, onGesture, true));
      el.removeEventListener('loadedmetadata', onMeta);
      el.removeEventListener('ended', onEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused || a.muted) {
      a.muted = false;
      a.volume = VOLUME;
      a.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      {/* muted autoplay primes it; we unmute on video-end / first interaction */}
      <audio ref={audioRef} src={src} preload="auto" autoPlay muted />
      <motion.button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: '#5C111E', border: '1px solid rgba(216,179,106,0.5)' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={playing ? t.music.pause : t.music.play}
        aria-label={playing ? t.music.pause : t.music.play}
      >
        <motion.div
          animate={playing ? { opacity: [1, 0.5, 1] } : {}}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          {playing ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#D8B36A">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#D8B36A">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </motion.div>
      </motion.button>
    </>
  );
}
