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
  startAt?: number; // seconds to begin playback from (and loop back to)
}) {
  const { t } = useLang();
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const seededRef = useRef(false);

  useEffect(() => {
    const a = audioRef.current;
    if (a) a.volume = VOLUME;

    const start = () => {
      const el = audioRef.current;
      if (!el) return;
      el.volume = VOLUME;
      // begin from the requested offset the first time we actually start
      if (!seededRef.current && startAt > 0) {
        try { el.currentTime = startAt; } catch { /* metadata not ready yet */ }
      }
      el.play().then(() => { seededRef.current = true; setPlaying(true); }).catch(() => {});
    };

    // if metadata isn't loaded yet, seek as soon as it is
    const onMeta = () => {
      const el = audioRef.current;
      if (el && startAt > 0 && el.currentTime < startAt && !seededRef.current) {
        try { el.currentTime = startAt; } catch { /* noop */ }
      }
    };
    // loop back to the offset instead of 0
    const onEnded = () => {
      const el = audioRef.current;
      if (!el) return;
      try { el.currentTime = startAt; } catch { /* noop */ }
      el.play().catch(() => {});
    };
    audioRef.current?.addEventListener('loadedmetadata', onMeta);
    audioRef.current?.addEventListener('ended', onEnded);

    // Music begins when the intro video ends (VideoIntro fires this on finish).
    window.addEventListener('wedding:start-music', start);

    // 2) fallback: if the browser blocked the play() at the video's end,
    //    start on the first real user interaction after that.
    const onGesture = () => {
      start();
      ['pointerdown', 'keydown', 'touchstart', 'scroll'].forEach((e) =>
        window.removeEventListener(e, onGesture),
      );
    };
    ['pointerdown', 'keydown', 'touchstart', 'scroll'].forEach((e) =>
      window.addEventListener(e, onGesture, { passive: true }),
    );

    const audioEl = audioRef.current;
    return () => {
      window.removeEventListener('wedding:start-music', start);
      ['pointerdown', 'keydown', 'touchstart', 'scroll'].forEach((e) =>
        window.removeEventListener(e, onGesture),
      );
      audioEl?.removeEventListener('loadedmetadata', onMeta);
      audioEl?.removeEventListener('ended', onEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.volume = VOLUME;
      a.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      {/* no native loop — we loop back to startAt manually via 'ended' */}
      <audio ref={audioRef} src={src} preload="auto" />
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
