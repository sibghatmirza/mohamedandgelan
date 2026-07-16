'use client';

import React from 'react';
import { useLang } from '@/context/LanguageContext';

// Minimal floating language switch (top corner). Replaces the old nav bar.
export default function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div
      className="fixed top-4 z-40 flex items-center gap-1 text-xs tracking-widest rounded-full"
      style={{
        right: '1rem',
        fontFamily: 'var(--font-body)',
        background: 'rgba(92,17,30,0.85)',
        border: '1px solid rgba(216,179,106,0.5)',
        padding: '0.35rem 0.75rem',
        backdropFilter: 'blur(4px)',
        boxShadow: '0 4px 14px rgba(92,17,30,0.3)',
      }}
    >
      <button
        onClick={() => setLang('en')}
        className={`px-1.5 py-0.5 transition-colors ${lang === 'en' ? 'text-[#D8B36A]' : 'text-[#F2EDE4]'}`}
        style={lang === 'en' ? { borderBottom: '1px solid #D8B36A' } : undefined}
      >
        EN
      </button>
      <span style={{ color: 'rgba(242,237,228,0.5)' }}>|</span>
      <button
        onClick={() => setLang('ar')}
        className={`px-1.5 py-0.5 font-arabic transition-colors ${lang === 'ar' ? 'text-[#D8B36A]' : 'text-[#F2EDE4]'}`}
        style={lang === 'ar' ? { borderBottom: '1px solid #D8B36A' } : undefined}
      >
        العربية
      </button>
    </div>
  );
}
