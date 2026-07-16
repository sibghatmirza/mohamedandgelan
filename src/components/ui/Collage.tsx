'use client';

import React from 'react';

// ── Polaroid photo ────────────────────────────────────────────
export function Polaroid({
  src, caption, rotate = 0, width = 150, className = '', style,
}: { src?: string; caption?: string; rotate?: number; width?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`bg-white pt-2 px-2 pb-6 ${className}`}
      style={{
        width,
        transform: `rotate(${rotate}deg)`,
        boxShadow: '0 10px 28px rgba(92,17,30,0.20)',
        ...style,
      }}
    >
      <div
        className="w-full overflow-hidden"
        style={{ aspectRatio: '1 / 1', background: src ? `center/cover url(${src})` : 'linear-gradient(135deg,#EAE2D8,#A99F95)' }}
      />
      {caption && (
        <p className="text-center mt-2" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: '#5C111E' }}>
          {caption}
        </p>
      )}
    </div>
  );
}

// ── Lace doily (scalloped white disc) ─────────────────────────
export function Doily({
  size = 280, children, className = '',
}: { size?: number; children?: React.ReactNode; className?: string }) {
  const scallops = 28;
  const r = 46;
  const cx = 50, cy = 50;
  const petals = Array.from({ length: scallops }, (_, i) => {
    const a = (i / scallops) * Math.PI * 2;
    return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  });
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" aria-hidden>
        <defs>
          <filter id="doily-shadow"><feDropShadow dx="0" dy="1.2" stdDeviation="1.4" floodColor="#5C111E" floodOpacity="0.18" /></filter>
        </defs>
        {/* scalloped edge */}
        {petals.map((p, i) => {
          const [x, y] = p.split(',').map(Number);
          return <circle key={i} cx={x} cy={y} r="5.2" fill="#FFFDF9" filter={i === 0 ? 'url(#doily-shadow)' : undefined} />;
        })}
        <circle cx={cx} cy={cy} r={r} fill="#FFFDF9" />
        {/* lace ring of tiny holes */}
        {Array.from({ length: 40 }).map((_, i) => {
          const a = (i / 40) * Math.PI * 2;
          return <circle key={'h' + i} cx={cx + 40 * Math.cos(a)} cy={cy + 40 * Math.sin(a)} r="1.1" fill="#F2EDE4" />;
        })}
        <circle cx={cx} cy={cy} r="33" fill="none" stroke="#EAE2D8" strokeWidth="0.6" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-center px-8">{children}</div>
    </div>
  );
}

// ── Scalloped doily photo frame (white, lace edge) ────────────
export function ScallopedFrame({
  src, width = 260, ratio = 1.25, className = '',
}: { src?: string; width?: number; ratio?: number; className?: string }) {
  const w = 200, h = Math.round(200 * ratio);
  const scR = 12;            // scallop radius
  const step = 25;           // spacing
  const cols = Math.round(w / step);
  const rows = Math.round(h / step);
  const circles: { cx: number; cy: number }[] = [];
  for (let i = 0; i <= cols; i++) { circles.push({ cx: i * (w / cols), cy: 0 }); circles.push({ cx: i * (w / cols), cy: h }); }
  for (let j = 1; j < rows; j++) { circles.push({ cx: 0, cy: j * (h / rows) }); circles.push({ cx: w, cy: j * (h / rows) }); }
  const inset = 26;
  return (
    <div className={`relative ${className}`} style={{ width, aspectRatio: `${w} / ${h}` }}>
      {/* photo */}
      <div className="absolute" style={{ inset: `${(inset / h) * 100}% ${(inset / w) * 100}%`, overflow: 'hidden', background: src ? `center/cover url(${src})` : 'linear-gradient(135deg,#EAE2D8,#A99F95)' }} />
      {/* white lace frame overlay */}
      <svg viewBox={`0 0 ${w} ${h}`} className="absolute inset-0 w-full h-full" aria-hidden style={{ filter: 'drop-shadow(0 12px 26px rgba(0,0,0,0.28))' }}>
        <path
          fillRule="evenodd"
          fill="#FFFDF9"
          d={`M0 0 H${w} V${h} H0 Z M${inset} ${inset} V${h - inset} H${w - inset} V${inset} Z`}
        />
        {circles.map((c, i) => <circle key={i} cx={c.cx} cy={c.cy} r={scR} fill="#FFFDF9" />)}
        {/* inner lace holes */}
        <rect x={inset - 6} y={inset - 6} width={w - 2 * inset + 12} height={h - 2 * inset + 12} fill="none" stroke="#EAE2D8" strokeWidth="1.2" />
      </svg>
    </div>
  );
}

// ── Silver baroque tray (uses silver-oval.png) ────────────────
export function SilverTray({
  width = 300, children, className = '',
}: { width?: number; children?: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ width, aspectRatio: '700 / 1050' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/silver-oval.png" alt="" aria-hidden className="absolute inset-0 w-full h-full"
        style={{ filter: 'drop-shadow(0 14px 30px rgba(92,17,30,0.22))' }} />
      <div className="absolute flex items-center justify-center text-center"
        style={{ top: '12%', bottom: '10.5%', left: '14%', right: '14%' }}>
        <div>{children}</div>
      </div>
    </div>
  );
}

// ── Arch card (rounded top, like a chapel window) ─────────────
export function ArchCard({
  children, className = '', style,
}: { children?: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        borderRadius: '50% 50% 10px 10px / 28% 28% 4px 4px',
        border: '1px solid rgba(216,179,106,0.5)',
        boxShadow: '0 16px 40px rgba(92,17,30,0.25)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Ornate ivory invitation card (cartouche / embossed feel) ──
// The card keeps the exact aspect ratio of invite-bg.png so the
// scalloped frame never crops, and the content is inset to stay
// inside the shaped edges of the frame.
export function OrnateCard({
  children, className = '',
}: { children?: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        aspectRatio: '1045 / 1500',
        backgroundImage: 'url(/images/invite-bg.png)',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'drop-shadow(0 24px 50px rgba(92,17,30,0.14))',
      }}
    >
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center"
        style={{ padding: '12% 15% 19%' }}
      >
        {children}
      </div>
    </div>
  );
}

// ── Wax seal (real gold floral seal image) ────────────────────
export function WaxSealImg({ size = 80, className = '', rotate = 0 }: { size?: number; className?: string; rotate?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/images/seal-floral.png" alt="" aria-hidden width={size} height={size}
      className={`select-none pointer-events-none ${className}`}
      style={{ width: size, height: 'auto', transform: rotate ? `rotate(${rotate}deg)` : undefined,
        filter: 'drop-shadow(0 6px 14px rgba(92,17,30,0.3))' }} />
  );
}
