'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';

export default function MusicPlayer() {
  const { t } = useLang();
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  // Optional: replace src with actual music file in /public/music/wedding.mp3
  return (
    <>
      <audio ref={audioRef} loop src="/music/wedding.mp3" preload="none" />
      <motion.button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
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
