'use client';

import React from 'react';

export default function VideoBanner() {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: '#FAF7F2' }}>
      <video
        src="/videos/banner.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full object-cover"
        style={{ height: 'min(78vh, max(52vw, 420px))', display: 'block', objectPosition: 'center 38%' }}
      />
      {/* soft fade into the invite section below */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 90, background: 'linear-gradient(to bottom, transparent, #FFFFFF)' }}
      />
    </section>
  );
}
