'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useLang } from '@/context/LanguageContext';
import { WatercolorDivider, TornEdge, Monogram } from '@/components/ui/WatercolorIllustrations';

type FormValues = {
  name: string;
  phone: string;
  guests: number;
  attending: 'yes' | 'no';
  [guestKey: string]: string | number;
};

type Status = 'idle' | 'submitting' | 'success' | 'declined' | 'error';

export default function RSVPSection() {
  const { t } = useLang();
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
          name:   data.name,
          phone:  data.phone,
          guests: guestCount,
          guestNames,
          attending,
          event:  'nikah',
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
    <section
      id="rsvp"
      className="relative py-14 px-6 overflow-x-clip"
      style={{ background: 'linear-gradient(160deg, #5C111E 0%, #3a0b14 50%, #5C111E 100%)' }}
    >
      <TornEdge position="top" color="#5C111E" />


      <div className="max-w-xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-4"><Monogram size={56} /></div>
          <p className="section-subtitle mb-4" style={{ color: '#D8B36A' }}>{t.rsvp.subtitle}</p>
          <h2 className="section-title" style={{ color: '#FAF7F2' }}>{t.rsvp.title}</h2>
          <WatercolorDivider />
          <p style={{ fontFamily: 'var(--font-body)', color: '#A99F95', fontSize: '0.9rem', letterSpacing: '0.1em' }}>
            {t.rsvp.deadline}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === 'success' && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 flex flex-col items-center gap-6">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: '#FAF7F2' }}>{t.rsvp.thankYou}</h3>
              <p style={{ fontFamily: 'var(--font-body)', color: '#D8B36A', fontSize: '1.1rem' }}>{t.rsvp.success}</p>
            </motion.div>
          )}

          {status === 'declined' && (
            <motion.div key="declined" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 flex flex-col items-center gap-6">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: '#FAF7F2' }}>{t.rsvp.understand}</h3>
              <p style={{ fontFamily: 'var(--font-body)', color: '#D8B36A', fontSize: '1.1rem' }}>{t.rsvp.successDecline}</p>
            </motion.div>
          )}

          {(status === 'idle' || status === 'submitting' || status === 'error') && (
            <motion.form key="form" onSubmit={handleSubmit(onSubmit)}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-8">
              <div className="px-8 py-10 relative"
                style={{ background: 'rgba(242,237,228,0.08)', border: '1px solid rgba(216,179,106,0.3)', backdropFilter: 'blur(8px)' }}>
                <div className="absolute top-3 left-3 w-8 h-8" style={{ borderTop: '1px solid rgba(216,179,106,0.4)', borderLeft: '1px solid rgba(216,179,106,0.4)' }} />
                <div className="absolute bottom-3 right-3 w-8 h-8" style={{ borderBottom: '1px solid rgba(216,179,106,0.4)', borderRight: '1px solid rgba(216,179,106,0.4)' }} />

                <div className="grid sm:grid-cols-2 gap-8">
                  {/* Name */}
                  <div className="sm:col-span-2">
                    <label className={labelCls} style={labelStyle}>{t.rsvp.fields.name} *</label>
                    <input
                      className="luxury-input"
                      placeholder="Gelan Badr"
                      {...register('name', { required: true })}
                      style={{ color: '#FAF7F2', borderBottomColor: errors.name ? '#e07070' : undefined }}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className={labelCls} style={labelStyle}>{t.rsvp.fields.phone}</label>
                    <input type="tel" className="luxury-input" placeholder="+20 100 000 0000"
                      {...register('phone')} style={{ color: '#FAF7F2' }} />
                  </div>

                  {/* Guests */}
                  <div>
                    <label className={labelCls} style={labelStyle}>{t.rsvp.fields.guests}</label>
                    <select className="luxury-input" {...register('guests')}
                      style={{ color: '#FAF7F2', background: 'transparent', cursor: 'pointer' }}>
                      {[1,2,3,4,5,6].map(n => <option key={n} value={n} style={{ color: '#5C111E' }}>{n}</option>)}
                    </select>
                  </div>

                  {/* Dynamic guest name boxes */}
                  <div className="sm:col-span-2 grid sm:grid-cols-2 gap-6">
                    <AnimatePresence initial={false}>
                      {Array.from({ length: guestCount }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <label className={labelCls} style={labelStyle}>{t.rsvp.fields.guestName} {i + 1}</label>
                          <input className="luxury-input" placeholder={`${t.rsvp.fields.guestName} ${i + 1}`}
                            {...register(`guest_${i}`)} style={{ color: '#FAF7F2' }} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Attendance buttons */}
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
  );
}
