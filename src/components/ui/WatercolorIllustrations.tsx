'use client';

import React from 'react';
import { useLang } from '@/context/LanguageContext';

// ── Burgundy Rose SVG ──────────────────────────────────────────
export function BurgundyRose({ className = '', size = 120 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className={className} aria-hidden>
      <defs>
        <radialGradient id="rg1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8B1A2D" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#5C111E" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3a0b14" stopOpacity="0.6" />
        </radialGradient>
        <filter id="blur-rose">
          <feGaussianBlur stdDeviation="0.5" />
        </filter>
      </defs>
      {/* outer petals */}
      <ellipse cx="60" cy="45" rx="18" ry="28" fill="url(#rg1)" opacity="0.7" transform="rotate(-20,60,60)" filter="url(#blur-rose)" />
      <ellipse cx="60" cy="45" rx="18" ry="28" fill="url(#rg1)" opacity="0.7" transform="rotate(20,60,60)" filter="url(#blur-rose)" />
      <ellipse cx="35" cy="65" rx="16" ry="24" fill="url(#rg1)" opacity="0.65" transform="rotate(-45,60,60)" filter="url(#blur-rose)" />
      <ellipse cx="85" cy="65" rx="16" ry="24" fill="url(#rg1)" opacity="0.65" transform="rotate(45,60,60)" filter="url(#blur-rose)" />
      <ellipse cx="60" cy="80" rx="18" ry="24" fill="url(#rg1)" opacity="0.6" filter="url(#blur-rose)" />
      {/* inner petals */}
      <ellipse cx="60" cy="52" rx="12" ry="20" fill="url(#rg1)" opacity="0.85" transform="rotate(-15,60,60)" />
      <ellipse cx="60" cy="52" rx="12" ry="20" fill="url(#rg1)" opacity="0.85" transform="rotate(15,60,60)" />
      {/* centre */}
      <circle cx="60" cy="60" r="10" fill="#8B1A2D" opacity="0.95" />
      <circle cx="60" cy="60" r="6" fill="#5C111E" />
      {/* gold highlight */}
      <circle cx="57" cy="57" r="2" fill="#D8B36A" opacity="0.5" />
      {/* stem */}
      <path d="M60 90 Q55 100 50 110" stroke="#4a7c59" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M60 95 Q65 100 68 105" stroke="#4a7c59" strokeWidth="1.5" fill="none" opacity="0.5" />
      <ellipse cx="50" cy="112" rx="8" ry="5" fill="#4a7c59" opacity="0.4" transform="rotate(-20,50,112)" />
    </svg>
  );
}

// ── White Peony SVG ────────────────────────────────────────────
export function WhitePeony({ className = '', size = 130 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 130 130" fill="none" className={className} aria-hidden>
      <defs>
        <radialGradient id="pg1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="70%" stopColor="#F2EDE4" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#EAE2D8" stopOpacity="0.7" />
        </radialGradient>
        <filter id="blur-peony"><feGaussianBlur stdDeviation="0.8" /></filter>
      </defs>
      <ellipse cx="65" cy="40" rx="20" ry="32" fill="url(#pg1)" opacity="0.8" transform="rotate(-25,65,65)" filter="url(#blur-peony)" stroke="#D8B36A" strokeWidth="0.3" />
      <ellipse cx="65" cy="40" rx="20" ry="32" fill="url(#pg1)" opacity="0.8" transform="rotate(25,65,65)" filter="url(#blur-peony)" stroke="#D8B36A" strokeWidth="0.3" />
      <ellipse cx="35" cy="70" rx="18" ry="28" fill="url(#pg1)" opacity="0.75" transform="rotate(-50,65,65)" filter="url(#blur-peony)" stroke="#D8B36A" strokeWidth="0.3" />
      <ellipse cx="95" cy="70" rx="18" ry="28" fill="url(#pg1)" opacity="0.75" transform="rotate(50,65,65)" filter="url(#blur-peony)" stroke="#D8B36A" strokeWidth="0.3" />
      <ellipse cx="65" cy="88" rx="20" ry="28" fill="url(#pg1)" opacity="0.7" filter="url(#blur-peony)" stroke="#D8B36A" strokeWidth="0.3" />
      <ellipse cx="65" cy="55" rx="13" ry="22" fill="url(#pg1)" opacity="0.9" transform="rotate(-10,65,65)" />
      <ellipse cx="65" cy="55" rx="13" ry="22" fill="url(#pg1)" opacity="0.9" transform="rotate(10,65,65)" />
      <circle cx="65" cy="63" r="9" fill="#FAF7F2" opacity="1" />
      <circle cx="63" cy="61" r="2.5" fill="#D8B36A" opacity="0.6" />
      <circle cx="67" cy="60" r="1.5" fill="#D8B36A" opacity="0.5" />
    </svg>
  );
}

// ── Gold Leaf SVG ──────────────────────────────────────────────
export function GoldLeaf({ className = '', size = 80, rotate = 0 }: { className?: string; size?: number; rotate?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className} style={{ transform: `rotate(${rotate}deg)` }} aria-hidden>
      <defs>
        <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D8B36A" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#e8c87a" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#c4a050" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <path d="M40 5 Q55 20 60 40 Q55 60 40 75 Q25 60 20 40 Q25 20 40 5Z" fill="url(#lg1)" opacity="0.8" />
      <path d="M40 15 Q40 40 40 70" stroke="#c4a050" strokeWidth="0.8" opacity="0.6" />
      <path d="M40 25 Q48 30 55 38" stroke="#c4a050" strokeWidth="0.5" opacity="0.4" />
      <path d="M40 25 Q32 30 25 38" stroke="#c4a050" strokeWidth="0.5" opacity="0.4" />
      <path d="M40 40 Q46 44 52 50" stroke="#c4a050" strokeWidth="0.5" opacity="0.4" />
      <path d="M40 40 Q34 44 28 50" stroke="#c4a050" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}

// ── Eucalyptus Sprig SVG ───────────────────────────────────────
export function EucalyptusSprig({ className = '', size = 100 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 140" fill="none" className={className} aria-hidden>
      <path d="M50 130 Q45 90 50 10" stroke="#6b9e7a" strokeWidth="2" fill="none" opacity="0.7" />
      {[20, 35, 50, 65, 80, 95, 110].map((y, i) => (
        <g key={i}>
          <ellipse
            cx={i % 2 === 0 ? 35 : 65}
            cy={y}
            rx="10"
            ry="7"
            fill="#7ab085"
            opacity={0.6 - i * 0.05}
            transform={`rotate(${i % 2 === 0 ? -30 : 30}, ${i % 2 === 0 ? 35 : 65}, ${y})`}
          />
        </g>
      ))}
    </svg>
  );
}

// ── Floral Corner Ornament SVG ─────────────────────────────────
export function FloralCorner({ className = '', size = 120, flip = false }: { className?: string; size?: number; flip?: boolean }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
      aria-hidden
    >
      {/* vine */}
      <path d="M5 5 Q40 10 60 40 Q80 70 115 115" stroke="#6b9e7a" strokeWidth="1.5" fill="none" opacity="0.5" />
      {/* small roses along vine */}
      <circle cx="20" cy="20" r="6" fill="#5C111E" opacity="0.7" />
      <circle cx="18" cy="18" r="3" fill="#8B1A2D" opacity="0.8" />
      <circle cx="55" cy="55" r="8" fill="#5C111E" opacity="0.65" />
      <circle cx="53" cy="53" r="4" fill="#8B1A2D" opacity="0.8" />
      <circle cx="95" cy="90" r="6" fill="#5C111E" opacity="0.6" />
      {/* gold leaves */}
      <ellipse cx="35" cy="15" rx="8" ry="5" fill="#D8B36A" opacity="0.5" transform="rotate(-30,35,15)" />
      <ellipse cx="70" cy="50" rx="8" ry="5" fill="#D8B36A" opacity="0.45" transform="rotate(-45,70,50)" />
      <ellipse cx="105" cy="80" rx="7" ry="4" fill="#D8B36A" opacity="0.4" transform="rotate(-60,105,80)" />
      {/* peony */}
      <circle cx="85" cy="20" r="12" fill="#FAF7F2" opacity="0.7" />
      <circle cx="83" cy="18" r="7" fill="#F2EDE4" opacity="0.8" />
      <circle cx="82" cy="17" r="3" fill="#D8B36A" opacity="0.5" />
    </svg>
  );
}

// ── Watercolor Divider SVG ─────────────────────────────────────
// Clean, elegant gold divider (no flowers)
export function WatercolorDivider({ className = '', color = '#D8B36A' }: { className?: string; color?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 my-8 ${className}`} aria-hidden>
      <div className="h-px w-16 sm:w-24" style={{ background: `linear-gradient(to right, transparent, ${color})` }} />
      <svg width="34" height="10" viewBox="0 0 34 10" fill="none">
        <path d="M0 5 H11" stroke={color} strokeWidth="1" opacity="0.8" />
        <path d="M17 1 L20 5 L17 9 L14 5 Z" fill={color} />
        <path d="M23 5 H34" stroke={color} strokeWidth="1" opacity="0.8" />
      </svg>
      <div className="h-px w-16 sm:w-24" style={{ background: `linear-gradient(to left, transparent, ${color})` }} />
    </div>
  );
}

// ── Monogram (real couple monogram artwork) ───────────────────
export function Monogram({ className = '', size = 80, color = 'gold' }: { className?: string; size?: number; initials?: string; color?: 'gold' | 'burgundy' | 'ivory' }) {
  const { t } = useLang();
  const suffix = color === 'burgundy' ? '-burgundy' : color === 'ivory' ? '-ivory' : '';
  const src = t.dir === 'rtl' ? `/images/monogram-ar${suffix}.svg` : `/images/monogram-en${suffix}.svg`;
  // Dilation filter: stacked same-colour drop-shadows thicken the thin strokes
  // so the monogram reads as bolder and stays legible.
  const dilate = color === 'gold' ? '#B8912F' : color === 'burgundy' ? '#5C111E' : '#F2EDE4';
  const bold =
    `drop-shadow(0.7px 0 0 ${dilate}) drop-shadow(-0.7px 0 0 ${dilate}) ` +
    `drop-shadow(0 0.7px 0 ${dilate}) drop-shadow(0 -0.7px 0 ${dilate})`;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="Monogram" className={`select-none ${className}`}
      style={{ height: size, width: 'auto', filter: bold }} />
  );
}

// ── Wax Seal SVG ───────────────────────────────────────────────
export function WaxSeal({ className = '', size = 60 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" className={className} aria-hidden>
      <defs>
        <radialGradient id="wg1" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#8B1A2D" />
          <stop offset="100%" stopColor="#3a0b14" />
        </radialGradient>
      </defs>
      {/* seal body */}
      {[...Array(12)].map((_, i) => (
        <polygon
          key={i}
          points="30,5 32,10 30,8 28,10"
          fill="url(#wg1)"
          transform={`rotate(${i * 30}, 30, 30)`}
          opacity="0.9"
        />
      ))}
      <circle cx="30" cy="30" r="22" fill="url(#wg1)" />
      <circle cx="30" cy="30" r="18" stroke="#D8B36A" strokeWidth="0.5" fill="none" opacity="0.6" />
      <text x="30" y="35" textAnchor="middle" fontFamily="var(--font-heading)" fontSize="13" fill="#D8B36A">M&P</text>
    </svg>
  );
}

// ── Floral Spray (horizontal arrangement) ─────────────────────
export function FloralSpray({ className = '', width = 260, flip = false }: { className?: string; width?: number; flip?: boolean }) {
  return (
    <svg width={width} height={width * 0.45} viewBox="0 0 260 120" fill="none" className={className}
      style={{ transform: flip ? 'scaleX(-1)' : undefined }} aria-hidden>
      {/* main stem */}
      <path d="M10 60 Q90 55 250 60" stroke="#6b9e7a" strokeWidth="1.5" fill="none" opacity="0.55" />
      <path d="M30 60 Q60 30 95 35" stroke="#6b9e7a" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M30 60 Q60 90 95 85" stroke="#6b9e7a" strokeWidth="1" fill="none" opacity="0.5" />
      {/* eucalyptus leaves */}
      {[40, 70, 100, 130, 160, 190, 220].map((x, i) => (
        <g key={i}>
          <ellipse cx={x} cy={i % 2 ? 44 : 76} rx="11" ry="6"
            fill="#7ab085" opacity={0.4} transform={`rotate(${i % 2 ? -25 : 25}, ${x}, ${i % 2 ? 44 : 76})`} />
        </g>
      ))}
      {/* gold leaves */}
      <ellipse cx="200" cy="40" rx="10" ry="5" fill="#D8B36A" opacity="0.45" transform="rotate(-30,200,40)" />
      <ellipse cx="60" cy="78" rx="9" ry="5" fill="#D8B36A" opacity="0.4" transform="rotate(40,60,78)" />
      {/* burgundy roses */}
      <g transform="translate(90,60)"><BurgundyRose size={56} /></g>
      <g transform="translate(140,42)"><WhitePeony size={50} /></g>
      <g transform="translate(168,64)"><BurgundyRose size={40} /></g>
    </svg>
  );
}

// ── Ornate Divider (refined, with center motif) ───────────────
export function OrnateDivider({ className = '', color = '#D8B36A' }: { className?: string; color?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 my-6 ${className}`} aria-hidden>
      <svg width="120" height="20" viewBox="0 0 120 20" fill="none">
        <path d="M0 10 L80 10" stroke={color} strokeWidth="0.8" opacity="0.6" />
        <path d="M80 10 Q90 4 100 10 Q90 16 80 10" stroke={color} strokeWidth="0.8" fill="none" opacity="0.7" />
        <circle cx="110" cy="10" r="2" fill={color} opacity="0.7" />
      </svg>
      <svg width="20" height="20" viewBox="0 0 20 20"><path d="M10 2 L12 8 L18 10 L12 12 L10 18 L8 12 L2 10 L8 8 Z" fill={color} opacity="0.8" /></svg>
      <svg width="120" height="20" viewBox="0 0 120 20" fill="none">
        <path d="M120 10 L40 10" stroke={color} strokeWidth="0.8" opacity="0.6" />
        <path d="M40 10 Q30 4 20 10 Q30 16 40 10" stroke={color} strokeWidth="0.8" fill="none" opacity="0.7" />
        <circle cx="10" cy="10" r="2" fill={color} opacity="0.7" />
      </svg>
    </div>
  );
}

// ── Torn Paper Edge ────────────────────────────────────────────
// Deterministic jagged deckle edge (no Math.random → SSR-safe)
// Smooth colour blend strip placed *between* two sections in normal flow,
// so it never washes over section content. Fades from one section's edge
// colour to the next for a seamless, elegant merge.
export function Blend({ from, to, height = 120 }: { from: string; to: string; height?: number }) {
  return (
    <div
      className="w-full"
      style={{ height, background: `linear-gradient(to bottom, ${from}, ${to})` }}
      aria-hidden
    />
  );
}

// Soft gradient divider (replaces the old jagged torn-paper edge).
// It feathers the section's colour into the neighbouring section for a
// smooth, elegant transition instead of a hard choppy line.
export function TornEdge({
  color = '#FAF7F2',
  position = 'top',
  height = 130,
  className = '',
}: { color?: string; position?: 'top' | 'bottom'; height?: number; className?: string }) {
  const gradient =
    position === 'top'
      ? `linear-gradient(to bottom, transparent, ${color})`
      : `linear-gradient(to top, transparent, ${color})`;
  const posStyle: React.CSSProperties =
    position === 'top'
      ? { top: 0, transform: 'translateY(-100%)' }
      : { bottom: 0, transform: 'translateY(100%)' };
  return (
    <div
      className={`absolute left-0 w-full pointer-events-none ${className}`}
      style={{ height, zIndex: 6, background: gradient, ...posStyle }}
      aria-hidden
    />
  );
}

// ── Faint invitation-frame backdrop (subtle floral touch) ─────
export function FloralBackdrop({ opacity = 0.08 }: { opacity?: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden
      style={{
        backgroundImage: 'url(/images/invitation-back.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        opacity,
        mixBlendMode: 'multiply',
      }}
    />
  );
}

// ── Watercolor Wash (subtle paper texture only) ───────────────
export function WatercolorWash({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden>
      <div className="absolute inset-0 texture-paper opacity-40" />
    </div>
  );
}

// ── Floating Petals Component ──────────────────────────────────
// ── Lily cluster section divider ──────────────────────────────
export function LilyDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-5 py-4 ${className}`} aria-hidden>
      <div className="h-px w-16 sm:w-28" style={{ background: 'linear-gradient(to right, transparent, #D8B36A)' }} />
      <div className="animate-sway" style={{ transform: 'rotate(-18deg)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/red-lily.png" alt="" className="select-none pointer-events-none"
          style={{ width: 46, height: 'auto', transform: 'scaleX(-1)', opacity: 0.9 }} />
      </div>
      <div className="animate-sway" style={{ animationDelay: '-2.5s' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/red-lily.png" alt="" className="select-none pointer-events-none"
          style={{ width: 72, height: 'auto', marginTop: -8 }} />
      </div>
      <div className="animate-sway" style={{ animationDelay: '-1.2s' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/red-lily.png" alt="" className="select-none pointer-events-none"
          style={{ width: 46, height: 'auto', transform: 'rotate(18deg)', opacity: 0.9 }} />
      </div>
      <div className="h-px w-16 sm:w-28" style={{ background: 'linear-gradient(to left, transparent, #D8B36A)' }} />
    </div>
  );
}

export function FloatingPetals() {
  const colors = ['#8B1A2D', '#a8465a', '#7a1a2e', '#b5757f'];
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-10" aria-hidden>
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute opacity-0"
          style={{
            left: `${10 + i * 12}%`,
            top: '-30px',
            animation: `float-petal ${6 + i * 0.8}s ${i * 1.5}s linear infinite`,
          }}
        >
          {/* rose petal: teardrop body with a curled notch at the top */}
          <svg width="18" height="20" viewBox="0 0 24 26" fill="none" style={{ transform: `rotate(${i * 45}deg)` }}>
            <path
              d="M12 2 C7 6 2 10 2 16 C2 22 7 25 12 25 C17 25 22 22 22 16 C22 10 17 6 12 2 Z"
              fill={colors[i % colors.length]}
              opacity="0.5"
            />
            <path
              d="M12 2 C10 6 10 10 12 14 C14 10 14 6 12 2 Z"
              fill={colors[i % colors.length]}
              opacity="0.65"
            />
            <path
              d="M12 6 C11 10 11 15 12 20"
              stroke="#5C111E"
              strokeWidth="0.7"
              opacity="0.35"
              fill="none"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
