'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useLang } from '@/context/LanguageContext';
import { Monogram, WatercolorDivider, TornEdge } from '@/components/ui/WatercolorIllustrations';

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
  const labelStyle = { color: '#D8B36A', fontFamily: "'Cormorant Garamond', serif" };

  return (
    <main dir={t.dir} style={{ background: '#FAF7F2', minHeight: '100vh' }}>
      {/* ── Top bar: monogram + language toggle ── */}
      <div className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <Link href="/"><Monogram size={44} /></Link>
        <div className="flex items-center gap-1 text-xs tracking-widest" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
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

      {/* ── Burgundy hero card ── */}
      <section className="px-4 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-3xl mx-auto text-center relative"
          style={{
            background: 'linear-gradient(160deg, #4a0d18, #3a0b14)',
            border: '10px solid #4a0d18',
            boxShadow: '0 26px 60px rgba(92,17,30,0.35)',
          }}
        >
          <div className="px-8 py-14 sm:py-16" style={{ border: '1px solid rgba(242,237,228,0.35)' }}>
            <p className="font-script" style={{ fontSize: 'clamp(3rem,12vw,4.2rem)', color: '#FAF7F2', lineHeight: 1 }}>
              {cr.script}
            </p>
            <h1 className="mt-4 uppercase" style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(1.05rem,4vw,1.7rem)',
              letterSpacing: '0.12em',
              color: '#F2EDE4',
            }}>
              {cr.title}
            </h1>
            <div className="flex justify-center mt-8">
              <Monogram size={92} color="ivory" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Details ── */}
      <section className="px-6 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="uppercase" style={{ fontFamily: "'Cinzel', serif", fontSize: '1.5rem', color: '#5C111E', letterSpacing: '0.1em' }}>
            {cr.timeLabel}
          </h2>
          <div className="h-px w-10 mx-auto my-3" style={{ background: '#D8B36A' }} />
          <p className="font-body" style={{ fontSize: '1.25rem', color: '#6b5e56' }}>{cr.timeValue}</p>

          <h2 className="uppercase mt-12" style={{ fontFamily: "'Cinzel', serif", fontSize: '1.5rem', color: '#5C111E', letterSpacing: '0.1em' }}>
            {cr.boardingLabel}
          </h2>
          <div className="h-px w-10 mx-auto my-3" style={{ background: '#D8B36A' }} />
          <p className="font-body" style={{ fontSize: '1.15rem', color: '#5C111E', lineHeight: 1.7 }}>{cr.boardingValue}</p>

          {/* map */}
          <div className="overflow-hidden mx-auto mt-10" style={{ maxWidth: 640, border: '1px solid rgba(216,179,106,0.5)' }}>
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
          </div>
        </motion.div>
      </section>

      {/* ── RSVP ── */}
      <section
        className="relative py-20 px-6 overflow-x-clip"
        style={{ background: 'linear-gradient(160deg, #5C111E 0%, #3a0b14 50%, #5C111E 100%)' }}
      >
        <TornEdge position="top" color="#5C111E" />
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
                <h3 style={{ fontFamily: "'Pinyon Script', cursive", fontSize: '2.5rem', color: '#FAF7F2' }}>{t.rsvp.thankYou}</h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", color: '#D8B36A', fontSize: '1.1rem' }}>{t.rsvp.success}</p>
              </motion.div>
            )}
            {status === 'declined' && (
              <motion.div key="declined" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-14 flex flex-col items-center gap-5">
                <h3 style={{ fontFamily: "'Pinyon Script', cursive", fontSize: '2.5rem', color: '#FAF7F2' }}>{t.rsvp.understand}</h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", color: '#D8B36A', fontSize: '1.1rem' }}>{t.rsvp.successDecline}</p>
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
                  <p className="text-center" style={{ color: '#e07070', fontFamily: "'Cormorant Garamond', serif" }}>
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
        <p className="font-script" style={{ fontSize: '1.8rem', color: '#5C111E' }}>{t.hero.coupleNames}</p>
        <Link href="/" className="caps-label mt-2" style={{ fontSize: '0.65rem', color: '#A99F95' }}>
          {cr.backHome}
        </Link>
      </footer>
    </main>
  );
}
