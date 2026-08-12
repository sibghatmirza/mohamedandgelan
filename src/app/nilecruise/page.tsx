'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useLang } from '@/context/LanguageContext';
import { Monogram, WatercolorDivider, TornEdge, WatercolorWash, FloralBackdrop } from '@/components/ui/WatercolorIllustrations';
import MusicPlayer from '@/components/ui/MusicPlayer';

type FormValues = {
  name: string;
  phone: string;
  guests: number;
  [guestKey: string]: string | number;
};

type Status = 'idle' | 'submitting' | 'success' | 'declined' | 'error';

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3452.7909718221335!2d31.22446827555469!3d30.071525574909895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDA0JzE3LjUiTiAzMcKwMTMnMzcuNCJF!5e0!3m2!1sen!2som!4v1783114619732!5m2!1sen!2som';

export default function NileCruisePage() {
  const { lang, t, setLang } = useLang();
  const cr = t.cruise;
  const [status, setStatus] = useState<Status>('idle');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: { guests: 1 },
  });
  const guestCount = Math.max(1, Number(watch('guests')) || 1);

  const onSubmit = async (data: FormValues) => {
    setStatus('submitting');
    try {
      const guestNames = Array.from({ length: guestCount }, (_, i) => data[`guest_${i}`] || '')
        .filter(Boolean)
        .join(', ');
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          guests: guestCount,
          guestNames,
          attending,
          event: 'cruise',
        }),
      });
      const result = await res.json();
      if (!res.ok || !result.ok) throw new Error(result.error || 'Submit failed');
      setStatus(attending === 'yes' ? 'success' : 'declined');
      reset();
    } catch {
      setStatus('error');
    }
  };

  const labelCls = 'block text-xs tracking-widest mb-2';
  const labelStyle = { color: '#D8B36A', fontFamily: 'var(--font-body)' };

  return (
    <main dir={t.dir} style={{ background: '#FAF7F2', minHeight: '100vh' }}>
      {/* ── Top bar: monogram + language toggle ── */}
      <div className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <Link href="/"><Monogram size={44} /></Link>
        <div className="flex items-center gap-1 text-xs tracking-widest" style={{ fontFamily: 'var(--font-body)' }}>
          <button onClick={() => setLang('en')}
            className={`px-2 py-1 ${lang === 'en' ? 'text-[#D8B36A] border-b border-[#D8B36A]' : 'text-[#5C111E]'}`}>
            EN
          </button>
          <span className="text-[#A99F95]">|</span>
          <button onClick={() => setLang('ar')}
            className={`px-2 py-1 font-arabic ${lang === 'ar' ? 'text-[#D8B36A] border-b border-[#D8B36A]' : 'text-[#5C111E]'}`}>
            العربية
          </button>
        </div>
      </div>

      {/* ── Details (light, main-site theme) ── */}
      <section
        className="relative py-14 px-6 overflow-x-clip"
        style={{ background: 'linear-gradient(160deg, #FAF7F2 0%, #EAE2D8 100%)' }}
      >
        <WatercolorWash />
        <FloralBackdrop opacity={0.08} />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          {/* Header — matches the main-page section headers */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-4">
              <span
                className="section-subtitle"
                style={{
                  background: 'linear-gradient(120deg, rgba(216,179,106,0.28), rgba(216,179,106,0.14))',
                  color: '#8a6d4a',
                  padding: '0.35em 0.9em',
                  borderRadius: '999px',
                  display: 'inline-block',
                }}
              >
                {cr.heroSubtitle}
              </span>
            </p>
            <h1 className="section-title">{cr.heroTitle}</h1>
            <WatercolorDivider />
          </motion.div>

          {/* Boarding time */}
          <motion.div
            className="flex flex-col items-center gap-2 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="caps-label" style={{ fontSize: '0.75rem' }}>{cr.boardingTimeLabel}</p>
            <div className="h-px w-8" style={{ background: '#D8B36A' }} />
            <p className="font-body" style={{ fontSize: '1.4rem', color: '#5C111E' }}>{cr.boardingTime}</p>
          </motion.div>

          {/* Boarding location */}
          <motion.div
            className="flex flex-col items-center gap-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="caps-label" style={{ fontSize: '0.75rem' }}>{cr.boardingLabel}</p>
            <div className="h-px w-8" style={{ background: '#D8B36A' }} />
            <p className="font-body" style={{ fontSize: '1.05rem', color: '#6b5e56', lineHeight: 1.6, maxWidth: 460 }}>{cr.boardingValue}</p>
          </motion.div>

          {/* map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="overflow-hidden mx-auto mt-8"
            style={{ maxWidth: 640, border: '1px solid rgba(216,179,106,0.5)' }}
          >
            <iframe
              src={MAP_SRC}
              width="100%"
              height="400"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Boarding Location"
            />
          </motion.div>
        </div>
      </section>

      {/* ── RSVP (same as main site) ── */}
      <section
        className="relative py-14 px-6 overflow-x-clip"
        style={{ background: 'linear-gradient(160deg, #5C111E 0%, #3a0b14 50%, #5C111E 100%)' }}
      >
        <TornEdge position="top" color="#EAE2D8" />
        <div className="max-w-xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-4"><Monogram size={56} /></div>
            <p className="section-subtitle mb-4" style={{ color: '#D8B36A' }}>{cr.rsvpSubtitle}</p>
            <h2 className="section-title" style={{ color: '#FAF7F2' }}>{cr.rsvpTitle}</h2>
            <WatercolorDivider />
          </motion.div>

          <AnimatePresence mode="wait">
            {status === 'success' && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-14 flex flex-col items-center gap-5">
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', color: '#FAF7F2' }}>{t.rsvp.thankYou}</h3>
                <p style={{ fontFamily: 'var(--font-body)', color: '#D8B36A', fontSize: '1.1rem' }}>{t.rsvp.success}</p>
              </motion.div>
            )}
            {status === 'declined' && (
              <motion.div key="declined" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-14 flex flex-col items-center gap-5">
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', color: '#FAF7F2' }}>{t.rsvp.understand}</h3>
                <p style={{ fontFamily: 'var(--font-body)', color: '#D8B36A', fontSize: '1.1rem' }}>{t.rsvp.successDecline}</p>
              </motion.div>
            )}
            {(status === 'idle' || status === 'submitting' || status === 'error') && (
              <motion.form key="form" onSubmit={handleSubmit(onSubmit)}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-8">
                <div className="px-8 py-10 relative"
                  style={{ background: 'rgba(242,237,228,0.08)', border: '1px solid rgba(216,179,106,0.3)', backdropFilter: 'blur(8px)' }}>
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="sm:col-span-2">
                      <label className={labelCls} style={labelStyle}>{t.rsvp.fields.name} *</label>
                      <input className="luxury-input" {...register('name', { required: true })}
                        style={{ color: '#FAF7F2', borderBottomColor: errors.name ? '#e07070' : undefined }} />
                    </div>
                    <div>
                      <label className={labelCls} style={labelStyle}>{t.rsvp.fields.phone}</label>
                      <input type="tel" className="luxury-input" {...register('phone')} style={{ color: '#FAF7F2' }} />
                    </div>
                    <div>
                      <label className={labelCls} style={labelStyle}>{t.rsvp.fields.guests}</label>
                      <select className="luxury-input" {...register('guests')}
                        style={{ color: '#FAF7F2', background: 'transparent', cursor: 'pointer' }}>
                        {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n} style={{ color: '#5C111E' }}>{n}</option>)}
                      </select>
                    </div>
                    <div className="sm:col-span-2 grid sm:grid-cols-2 gap-6">
                      {Array.from({ length: guestCount }).map((_, i) => (
                        <div key={i}>
                          <label className={labelCls} style={labelStyle}>{t.rsvp.fields.guestName} {i + 1}</label>
                          <input className="luxury-input" {...register(`guest_${i}`)} style={{ color: '#FAF7F2' }} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <button type="submit" disabled={status === 'submitting'}
                      className="btn-luxury flex-1"
                      style={{ background: attending === 'yes' ? '#D8B36A' : 'transparent', color: attending === 'yes' ? '#5C111E' : '#D8B36A', borderColor: '#D8B36A' }}
                      onMouseDown={() => setAttending('yes')}>
                      ✓ {t.rsvp.fields.attendingYes}
                    </button>
                    <button type="submit" disabled={status === 'submitting'}
                      className="btn-luxury flex-1"
                      style={{ background: attending === 'no' ? 'rgba(92,17,30,0.3)' : 'transparent', color: '#FAF7F2', borderColor: 'rgba(255,255,255,0.3)' }}
                      onMouseDown={() => setAttending('no')}>
                      {t.rsvp.fields.attendingNo}
                    </button>
                  </div>
                </div>
                {status === 'error' && (
                  <p className="text-center" style={{ color: '#e07070', fontFamily: 'var(--font-body)' }}>
                    Something went wrong. Please try again.
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Mini footer ── */}
      <footer className="py-12 text-center flex flex-col items-center gap-3" style={{ background: '#FAF7F2' }}>
        <Monogram size={56} />
        <p className="font-script" style={{ fontSize: '2.2rem', color: '#5C111E' }}>{t.hero.coupleNames}</p>
        <Link href="/" className="caps-label mt-2" style={{ fontSize: '0.65rem', color: '#A99F95' }}>
          {cr.backHome}
        </Link>
      </footer>

      <MusicPlayer src="/music/casablanca.mp3" startAt={0.7} endAt={25} />
    </main>
  );
}
