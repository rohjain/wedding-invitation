import React, { useState } from 'react';

/**
 * ShubhLabhMedallion (शुभ — लाभ मुद्रा)
 * Authentic sacred 24K gold foil and royal ruby enamel medallions
 * 
 * - Left Door: "शुभ" (Auspiciousness, Blessing & Goodwill)
 * - Right Door: "लाभ" (Prosperity, Grace & Abundance)
 * 
 * Symmetrically placed at the center meeting edge of the doors.
 * Features:
 * - 16-lobed scalloped gold foil lotus bezel with beaded rim
 * - Deep ruby/crimson enamel dish with radiant sunburst aura
 * - Royal Devanagari calligraphy in embossed 24K gold foil
 * - Sacred red kumkum tilak bindi with golden halo
 * - Touch pulse animation & haptic feedback on tap
 */
export default function ShubhLabhMedallion({
  text = 'शुभ',
  side = 'left',
  isOpen = false,
  onOpen,
  className = '',
}) {
  const [isTapped, setIsTapped] = useState(false);
  const idPrefix = `medallion-${side}`;

  const handleTap = (e) => {
    e.stopPropagation();
    if (isOpen) return;

    setIsTapped(true);
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate([25, 45, 20]);
      } catch {
        // ignore
      }
    }

    if (onOpen) {
      onOpen();
    }
  };

  return (
    <div
      className={`shubh-labh-medallion medallion-${side} ${isTapped ? 'is-tapped' : ''} ${className}`}
      onClick={handleTap}
      role="button"
      tabIndex={0}
      aria-label={`Auspicious ${text} medallion — Tap to open invitation`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleTap(e);
        }
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="medallion-svg"
        aria-hidden="true"
      >
        <defs>
          {/* 24K Gold Foil Metallic Gradient */}
          <linearGradient id={`${idPrefix}-goldFoil`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF9DA" />
            <stop offset="25%" stopColor="#F5D77F" />
            <stop offset="50%" stopColor="#C9972A" />
            <stop offset="75%" stopColor="#F9DF8E" />
            <stop offset="100%" stopColor="#7E540C" />
          </linearGradient>

          {/* Deep Royal Ruby / Crimson Enamel Dish */}
          <radialGradient id={`${idPrefix}-rubyEnamel`} cx="42%" cy="40%" r="58%">
            <stop offset="0%" stopColor="#9C1721" />
            <stop offset="45%" stopColor="#730C14" />
            <stop offset="85%" stopColor="#4A050A" />
            <stop offset="100%" stopColor="#2E0205" />
          </radialGradient>

          {/* Gold Sunburst Rays on the Enamel */}
          <radialGradient id={`${idPrefix}-goldHalo`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFEBA8" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#D4AF37" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </radialGradient>

          {/* Dimensional Drop Shadow */}
          <filter id={`${idPrefix}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4.5" stdDeviation="4" floodColor="#000" floodOpacity="0.8" />
          </filter>
        </defs>

        <g filter={`url(#${idPrefix}-shadow)`}>
          {/* 1. Outer Scalloped 16-Petal Gold Lotus Bezel */}
          <g transform="translate(50, 50)">
            {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((deg) => (
              <path
                key={`petal-${deg}`}
                d="M -6,-48 C -6,-52 0,-54 0,-54 C 0,-54 6,-52 6,-48 Z"
                transform={`rotate(${deg})`}
                fill={`url(#${idPrefix}-goldFoil)`}
                stroke="#543603"
                strokeWidth="0.4"
              />
            ))}
          </g>

          {/* 2. Outer Beaded Gold Rim */}
          <circle cx="50" cy="50" r="46" fill={`url(#${idPrefix}-goldFoil)`} stroke="#4D3004" strokeWidth="0.8" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="#FFEAA8" strokeWidth="1.2" strokeDasharray="1.8 2.6" opacity="0.9" />

          {/* 3. Stepped Inner Gold Bevel */}
          <circle cx="50" cy="50" r="38" fill={`url(#${idPrefix}-goldFoil)`} stroke="#4A2E03" strokeWidth="0.6" />

          {/* 4. Deep Ruby / Sindoor Enamel Center Dish */}
          <circle cx="50" cy="50" r="33" fill={`url(#${idPrefix}-rubyEnamel)`} stroke="#3D0407" strokeWidth="1" />
          <circle cx="50" cy="50" r="33" fill={`url(#${idPrefix}-goldHalo)`} />

          {/* 5. Delicate Auspicious Filigree Ring inside Enamel */}
          <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255, 235, 140, 0.45)" strokeWidth="0.6" strokeDasharray="2 3" />

          {/* 6. Sacred Devanagari Calligraphy ("शुभ" or "लाभ") in 24K Gold Foil */}
          <g>
            {/* Calligraphic Text with Specular Highlight and 3D Bevel */}
            <text
              x="50"
              y="56"
              textAnchor="middle"
              dominantBaseline="central"
              fill={`url(#${idPrefix}-goldFoil)`}
              stroke="#4D2E02"
              strokeWidth="0.9"
              paintOrder="stroke fill"
              style={{
                fontFamily: "'Rozha One', 'Yatra One', 'Nirmala UI', 'Mangal', 'Kohinoor Devanagari', 'Noto Serif Devanagari', serif",
                fontSize: '28px',
                fontWeight: '700',
                letterSpacing: '0.04em',
              }}
            >
              {text}
            </text>

            {/* Sacred Red Kumkum Tilak Bindi above the Shiro-Rekha */}
            <circle cx="50" cy="37" r="2.2" fill="#E61A1A" stroke="#FFF2B2" strokeWidth="0.5" />
          </g>
        </g>
      </svg>

      {/* Breathing Sacred Gold Aura Pulse */}
      <div className="medallion-aura-pulse" />
    </div>
  );
}
