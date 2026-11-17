import React from 'react';

type P = { className?: string; style?: React.CSSProperties };

export const Pumpkin: React.FC<P> = ({ className, style }) => (
  <svg viewBox="0 0 120 110" className={className} style={style} aria-hidden="true">
    <defs>
      <radialGradient id="pk-body" cx="50%" cy="40%" r="65%">
        <stop offset="0%" stopColor="#fca5a5" />
        <stop offset="30%" stopColor="#ea580c" />
        <stop offset="70%" stopColor="#c2410c" />
        <stop offset="100%" stopColor="#7f1d1d" />
      </radialGradient>
      <radialGradient id="pk-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="40%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#dc2626" />
      </radialGradient>
    </defs>
    <ellipse cx="60" cy="102" rx="38" ry="5" fill="#000" opacity="0.45" />
    <ellipse cx="34" cy="62" rx="26" ry="40" fill="url(#pk-body)" />
    <ellipse cx="86" cy="62" rx="26" ry="40" fill="url(#pk-body)" />
    <ellipse cx="60" cy="62" rx="30" ry="42" fill="url(#pk-body)" />
    <path d="M60 22 C 52 40, 52 84, 60 102" stroke="#450a0a" strokeWidth="2" fill="none" opacity="0.55" />
    <path d="M42 26 C 30 46, 30 80, 42 98" stroke="#450a0a" strokeWidth="2" fill="none" opacity="0.4" />
    <path d="M78 26 C 90 46, 90 80, 78 98" stroke="#450a0a" strokeWidth="2" fill="none" opacity="0.4" />
    {/* Tallo */}
    <path d="M56 24 C 56 14, 60 8, 68 4 C 66 12, 66 18, 66 24 Z" fill="#15803d" />
    {/* Ojos y boca siniestra */}
    <path d="M40 52 L52 62 L36 66 Z" fill="url(#pk-glow)" />
    <path d="M80 52 L68 62 L84 66 Z" fill="url(#pk-glow)" />
    <path d="M60 64 L55 72 L65 72 Z" fill="url(#pk-glow)" />
    <path d="M36 78 Q60 102 84 78 L78 76 L72 85 L66 77 L60 88 L54 77 L48 85 L42 76 Z" fill="url(#pk-glow)" />
  </svg>
);

export const Bat: React.FC<P> = ({ className, style }) => (
  <svg viewBox="0 0 100 50" className={className} style={style} aria-hidden="true">
    <path
      d="M50 16 L45 6 L48 18 C 38 10, 20 8, 2 22 C 14 20, 20 26, 26 38 C 32 30, 40 30, 46 40 L50 32 L54 40 C 60 30, 68 30, 74 38 C 80 26, 86 20, 98 22 C 80 8, 62 10, 52 18 L55 6 Z"
      fill="currentColor"
    />
    <circle cx="47" cy="22" r="1.3" fill="#ef4444" />
    <circle cx="53" cy="22" r="1.3" fill="#ef4444" />
  </svg>
);

export const Ghost: React.FC<P> = ({ className, style }) => (
  <svg viewBox="0 0 80 100" className={className} style={style} aria-hidden="true">
    <defs>
      <linearGradient id="gh-red" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="60%" stopColor="#fed7aa" />
        <stop offset="100%" stopColor="#fca5a5" />
      </linearGradient>
    </defs>
    <path
      d="M10 94 V40 C 10 16, 24 4, 40 4 C 56 4, 70 16, 70 40 V94 L60 84 L50 94 L40 84 L30 94 L20 84 Z"
      fill="url(#gh-red)"
    />
    <ellipse cx="30" cy="40" rx="5" ry="7" fill="#450a0a" />
    <ellipse cx="50" cy="40" rx="5" ry="7" fill="#450a0a" />
    <ellipse cx="40" cy="58" rx="6" ry="8" fill="#450a0a" />
  </svg>
);

export const Cobweb: React.FC<P> = ({ className, style }) => (
  <svg viewBox="0 0 160 160" className={className} style={style} aria-hidden="true">
    <g stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round">
      <path d="M0 0 L160 0" /><path d="M0 0 L140 50" /><path d="M0 0 L110 110" />
      <path d="M0 0 L50 140" /><path d="M0 0 L0 160" />
      <path d="M30 0 Q 28 22 0 30" /><path d="M60 0 Q 56 44 0 60" />
      <path d="M95 0 Q 88 70 0 95" /><path d="M130 0 Q 118 96 0 130" />
    </g>
  </svg>
);

// Luna Sangrienta (Blood Moon)
export const BloodMoon: React.FC<P> = ({ className, style }) => (
  <svg viewBox="0 0 200 200" className={className} style={style} aria-hidden="true">
    <defs>
      <radialGradient id="moon-blood" cx="42%" cy="40%" r="68%">
        <stop offset="0%" stopColor="#fff1f2" />
        <stop offset="35%" stopColor="#fca5a5" />
        <stop offset="70%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#991b1b" />
      </radialGradient>
    </defs>
    <circle cx="100" cy="100" r="64" fill="url(#moon-blood)" />
    <circle cx="78" cy="82" r="10" fill="#7f1d1d" opacity="0.32" />
    <circle cx="120" cy="112" r="14" fill="#7f1d1d" opacity="0.25" />
    <circle cx="94" cy="130" r="8" fill="#7f1d1d" opacity="0.3" />
  </svg>
);

// Cementerio en silueta para la base de la página con tumbas y cruces góticas
export const Graveyard: React.FC<P> = ({ className }) => (
  <svg viewBox="0 0 1200 140" preserveAspectRatio="none" className={className} aria-hidden="true">
    <path
      d="M0 140 V92 C 60 80 100 100 160 92 C 220 84 260 100 330 94 C 420 86 480 100 560 94 C 660 86 720 100 800 92 C 880 84 940 98 1020 92 C 1100 86 1150 96 1200 90 V140 Z"
      fill="#060204"
    />
    {[90, 230, 410, 640, 790, 960, 1100].map((x, i) => (
      <g key={x} fill="#14070a" stroke="#2d0b13" strokeWidth="1.5">
        {i % 3 === 0 ? (
          <path d={`M${x - 6} 104 V60 H${x - 18} V50 H${x - 6} V36 H${x + 6} V50 H${x + 18} V60 H${x + 6} V104 Z`} />
        ) : (
          <path d={`M${x - 16} 104 V62 C ${x - 16} 40 ${x + 16} 40 ${x + 16} 62 V104 Z`} />
        )}
      </g>
    ))}
    <g stroke="#14070a" strokeWidth="5" fill="none" strokeLinecap="round">
      <path d="M170 100 C 172 70 160 56 150 36 M162 62 C 150 56 142 54 136 44 M166 52 C 176 46 182 40 186 30" />
      <path d="M1040 100 C 1038 72 1050 58 1058 38 M1048 64 C 1060 58 1068 56 1074 46" />
    </g>
  </svg>
);

// Capa de fondo: Luna Sangrienta, niebla carmesí, murciélagos con ojos rojos y fantasmas
export const HalloweenBackdrop: React.FC = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
    <div className="absolute -top-10 -right-10 sm:top-4 sm:right-6 w-36 sm:w-52 opacity-40 blur-[0.5px] hw-moon">
      <BloodMoon className="w-full h-full" />
    </div>
    <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-blue-950/25 via-orange-950/15 to-transparent" />
    <div className="hidden md:block absolute inset-x-0 bottom-0 h-44 hw-fog" />

    {[
      { top: '12%', size: 'w-12', dur: '18s', delay: '0s' },
      { top: '26%', size: 'w-9', dur: '24s', delay: '5s' },
      { top: '45%', size: 'w-14', dur: '21s', delay: '11s' },
      { top: '65%', size: 'w-8', dur: '27s', delay: '2s' },
    ].map((b, i) => (
      <div
        key={i}
        className={`hidden md:block absolute left-0 hw-bat-path hw-bat-${i}`}
        style={{ top: b.top, animationDuration: b.dur, animationDelay: b.delay }}
      >
        <div className="hw-bat-bob">
          <Bat className={`${b.size} text-[#0a0305] hw-bat-flap`} style={{ animationDelay: `${i * 0.12}s` }} />
        </div>
      </div>
    ))}

    <Ghost className="hidden md:block absolute left-[5%] top-[36%] w-12 sm:w-16 opacity-35 hw-ghost" style={{ animationDelay: '0s' }} />
    <Ghost className="hidden md:block absolute right-[8%] top-[58%] w-10 sm:w-14 opacity-30 hw-ghost" style={{ animationDelay: '2.5s' }} />
  </div>
);
