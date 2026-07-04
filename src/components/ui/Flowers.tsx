'use client';

import React from 'react';

// Real watercolor-style peony photographs (transparent PNG) — burgundy & ivory
export const FLOWERS = {
  burgundy1: '/images/tilda/peony-burgundy-1.png',
  burgundy2: '/images/tilda/peony-burgundy-2.png',
  burgundy3: '/images/tilda/peony-burgundy-3.png',
  budBurgundy: '/images/tilda/bud-burgundy.png',
  ivory1: '/images/tilda/peony-ivory-1.png',
  ivory2: '/images/tilda/peony-ivory-2.png',
  budIvory: '/images/tilda/bud-ivory.png',
} as const;

export type FlowerKey = keyof typeof FLOWERS;

export function Flower({
  variant = 'burgundy1',
  size = 120,
  className = '',
  style,
  rotate = 0,
}: {
  variant?: FlowerKey;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  rotate?: number;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={FLOWERS[variant]}
      alt=""
      aria-hidden
      width={size}
      height={size}
      loading="lazy"
      className={`pointer-events-none select-none ${className}`}
      style={{
        width: size,
        height: 'auto',
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        filter: 'drop-shadow(0 8px 18px rgba(92,17,30,0.18))',
        ...style,
      }}
    />
  );
}

// Decorative floral divider using real peonies
export function FlowerDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 my-6 ${className}`} aria-hidden>
      <div className="h-px flex-1 max-w-[110px]" style={{ background: 'linear-gradient(to right, transparent, #D8B36A)' }} />
      <Flower variant="budIvory" size={34} rotate={-20} />
      <Flower variant="burgundy1" size={48} />
      <Flower variant="budBurgundy" size={34} rotate={20} />
      <div className="h-px flex-1 max-w-[110px]" style={{ background: 'linear-gradient(to left, transparent, #D8B36A)' }} />
    </div>
  );
}

// A corner spray of real flowers (for card corners)
export function FlowerCorner({ size = 130, flip = false, className = '' }: { size?: number; flip?: boolean; className?: string }) {
  return (
    <div
      className={`relative pointer-events-none ${className}`}
      style={{ width: size, height: size, transform: flip ? 'scaleX(-1)' : undefined }}
      aria-hidden
    >
      <Flower variant="burgundy2" size={size * 0.6} className="absolute" style={{ top: 0, left: 0 }} />
      <Flower variant="ivory1" size={size * 0.5} className="absolute" style={{ top: size * 0.28, left: size * 0.34 }} />
      <Flower variant="budBurgundy" size={size * 0.34} rotate={30} className="absolute" style={{ top: size * 0.5, left: size * 0.05 }} />
    </div>
  );
}
