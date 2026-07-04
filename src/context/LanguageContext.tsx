'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, type Lang } from '@/lib/translations';

// Derive a union type that covers both language shapes
type AnyTranslation = (typeof translations)['en'] | (typeof translations)['ar'];

interface LangContextType {
  lang: Lang;
  t: AnyTranslation;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextType>({
  lang: 'en',
  t: translations.en,
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  const setLang = (l: Lang) => {
    setLangState(l);
    document.documentElement.dir = translations[l].dir;
    document.documentElement.lang = l;
    localStorage.setItem('wedding-lang', l);
  };

  useEffect(() => {
    const saved = localStorage.getItem('wedding-lang') as Lang | null;
    if (saved && (saved === 'en' || saved === 'ar')) {
      setLang(saved);
    }
  }, []);

  return (
    <LangContext.Provider value={{ lang, t: translations[lang] as AnyTranslation, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
