'use client';

import React from 'react';

// Antique line-art icons (burgundy strokes) for the timeline
const base = {
  fill: 'none',
  stroke: '#5C111E',
  strokeWidth: 2.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function ChurchIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <g {...base}>
        <path d="M32 6 L32 16" />
        <path d="M28 10 L36 10" />
        <path d="M32 16 L22 26 L22 54 L42 54 L42 26 Z" />
        <path d="M22 26 L14 32 L14 54 L22 54" />
        <path d="M42 26 L50 32 L50 54 L42 54" />
        <path d="M32 36 Q32 30 32 30 Q32 36 32 36 M27 42 Q32 32 37 42 L37 54 L27 54 Z" />
        <circle cx="32" cy="24" r="2.5" />
        <path d="M17 40 L19 40 M17 46 L19 46 M45 40 L47 40 M45 46 L47 46" />
      </g>
    </svg>
  );
}

export function CameraIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <g {...base}>
        <rect x="10" y="22" width="44" height="30" rx="3" />
        <path d="M24 22 L27 16 L37 16 L40 22" />
        <circle cx="32" cy="37" r="9" />
        <circle cx="32" cy="37" r="4.5" />
        <circle cx="46" cy="28" r="1.6" />
      </g>
    </svg>
  );
}

export function CheersIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <g {...base}>
        <path d="M20 12 L14 30 Q14 38 22 38 Q30 38 30 30 L24 12 Z" />
        <path d="M44 12 L38 30 Q38 38 46 38 Q54 38 54 30 L48 12 Z" />
        <path d="M22 38 L22 52 M16 52 L28 52" />
        <path d="M46 38 L46 52 M40 52 L52 52" />
        <path d="M30 16 L38 16" />
      </g>
    </svg>
  );
}

export function BouquetIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <g {...base}>
        <circle cx="32" cy="16" r="5" />
        <circle cx="22" cy="22" r="4.5" />
        <circle cx="42" cy="22" r="4.5" />
        <circle cx="27" cy="30" r="4" />
        <circle cx="37" cy="30" r="4" />
        <path d="M30 34 L26 54 M34 34 L38 54" />
        <path d="M22 48 Q32 44 42 48" />
      </g>
    </svg>
  );
}

export function CakeIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <g {...base}>
        <path d="M30 8 Q32 4 34 8 Q34 11 32 13 Q30 11 30 8 Z" />
        <path d="M32 13 L32 18" />
        <rect x="24" y="18" width="16" height="10" rx="2" />
        <rect x="18" y="28" width="28" height="12" rx="2" />
        <rect x="12" y="40" width="40" height="14" rx="2" />
        <path d="M24 23 Q28 20 32 23 Q36 20 40 23" />
        <path d="M18 34 Q24 31 30 34 Q36 31 42 34 Q44 32 46 34" />
        <path d="M14 47 L50 47" />
      </g>
    </svg>
  );
}

export function HeelIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <g {...base}>
        <path d="M12 22 Q12 18 16 18 Q34 18 44 30 Q52 38 52 42 L40 42 Q38 42 36 40 L24 30 Q20 28 12 30 Z" />
        <path d="M12 30 L12 44 L18 44 L20 36" />
        <path d="M18 44 L20 50 L24 50 L22 42" />
        <path d="M44 42 L46 50 L50 50 L48 42" />
      </g>
    </svg>
  );
}

export function ChairIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <g {...base}>
        <path d="M22 10 L22 34 M42 10 L42 34" />
        <path d="M22 12 L42 12 M22 18 L42 18 M22 24 L42 24" />
        <path d="M20 34 L44 34 L43 44 L21 44 Z" />
        <path d="M21 44 L18 58 M43 44 L46 58" />
        <path d="M24 48 L40 48" />
        <circle cx="22" cy="10" r="1.6" /><circle cx="42" cy="10" r="1.6" />
      </g>
    </svg>
  );
}

export function RingsIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <g {...base}>
        <circle cx="26" cy="38" r="14" />
        <circle cx="40" cy="34" r="13" />
        <path d="M40 21 L36 13 L44 13 Z" />
        <path d="M38 12 L40 9 L42 12" />
      </g>
    </svg>
  );
}

export function ChandelierIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <g {...base}>
        <path d="M32 6 L32 18" />
        <path d="M14 26 Q32 14 50 26" />
        <path d="M32 18 Q32 24 32 26" />
        <path d="M14 26 L12 34 M32 26 L32 34 M50 26 L52 34" />
        <path d="M8 34 Q12 42 16 34 Z" />
        <path d="M28 34 Q32 42 36 34 Z" />
        <path d="M48 34 Q52 42 56 34 Z" />
        <path d="M12 34 L12 40 M32 34 L32 40 M52 34 L52 40" />
        <path d="M20 30 L20 44 M44 30 L44 44" />
      </g>
    </svg>
  );
}

export function PlateIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <g {...base}>
        {/* plate */}
        <circle cx="32" cy="32" r="15" />
        <circle cx="32" cy="32" r="9" />
        {/* fork (left): three tines + handle */}
        <path d="M9 14 L9 24 M13 14 L13 24 M17 14 L17 24" />
        <path d="M9 24 Q13 28 13 30 L13 50 M17 24 Q13 28 13 30" />
        {/* knife (right): blade + handle */}
        <path d="M51 14 Q55 22 55 28 L51 32 L51 50" />
      </g>
    </svg>
  );
}

export const lineIconMap: Record<string, React.FC<{ size?: number }>> = {
  church:     ChurchIcon,
  camera:     CameraIcon,
  cheers:     CheersIcon,
  bouquet:    BouquetIcon,
  cake:       CakeIcon,
  heel:       HeelIcon,
  chair:      ChairIcon,
  rings:      RingsIcon,
  chandelier: ChandelierIcon,
  plate:      PlateIcon,
};
