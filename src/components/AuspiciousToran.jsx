import React from 'react';

/**
 * AuspiciousToran (Bandhanwar)
 * Traditional Indian wedding entrance garland featuring:
 * - Royal crimson & gold brocade ribbon (Patti)
 * - Fresh sacred Mango leaves (Aam ke Patte) with golden veins
 * - Hand-strung yellow & saffron Marigold blossoms (Genda Phool)
 * - Miniature royal brass temple bells (Ghanti) with gentle swaying breeze animation
 * - Center auspicious golden medallion
 */
export default function AuspiciousToran({ className = '' }) {
  // 7 nodes across the 500px width
  const nodes = [36, 107, 178, 250, 321, 392, 464];

  // 6 bell positions hanging between the flower nodes
  const bellPositions = [71, 142, 214, 286, 357, 428];

  return (
    <div className={`auspicious-toran-container ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 500 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="toran-svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Gold Shimmer & Brocade Gradients */}
          <linearGradient id="toranGoldRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#DFB247" />
            <stop offset="25%" stopColor="#FFF1B0" />
            <stop offset="50%" stopColor="#C49229" />
            <stop offset="75%" stopColor="#FFF1B0" />
            <stop offset="100%" stopColor="#DFB247" />
          </linearGradient>

          <linearGradient id="toranGoldShine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF8D6" />
            <stop offset="35%" stopColor="#E5B84C" />
            <stop offset="70%" stopColor="#A37116" />
            <stop offset="100%" stopColor="#634005" />
          </linearGradient>

          {/* Deep Royal Maroon Ribbon Gradient */}
          <linearGradient id="toranMaroonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8A1313" />
            <stop offset="60%" stopColor="#5E0B0B" />
            <stop offset="100%" stopColor="#3D0606" />
          </linearGradient>

          {/* Mango Leaves Gradients */}
          <linearGradient id="mangoLeafGradCenter" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A8F5B" />
            <stop offset="50%" stopColor="#2A6B3A" />
            <stop offset="100%" stopColor="#144322" />
          </linearGradient>

          <linearGradient id="mangoLeafGradSide" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3D7D4D" />
            <stop offset="50%" stopColor="#225A30" />
            <stop offset="100%" stopColor="#0F3319" />
          </linearGradient>

          {/* Marigold Petal Gradients: Saffron-Orange & Golden-Yellow */}
          <radialGradient id="marigoldOrange" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#FFCC00" />
            <stop offset="35%" stopColor="#FF7700" />
            <stop offset="75%" stopColor="#DD3B00" />
            <stop offset="100%" stopColor="#8A1E00" />
          </radialGradient>

          <radialGradient id="marigoldYellow" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#FFFFCC" />
            <stop offset="30%" stopColor="#FFD700" />
            <stop offset="70%" stopColor="#FF9900" />
            <stop offset="100%" stopColor="#CC6600" />
          </radialGradient>

          {/* Drop Shadow for Realistic Layering */}
          <filter id="toranDropShadow" x="-10%" y="-10%" width="120%" height="135%">
            <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.45" />
          </filter>

          <filter id="bellSoftShadow" x="-30%" y="-20%" width="160%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.38" />
          </filter>
        </defs>

        {/* 1. TOP MAROON & GOLD ZARI VALANCE RIBBON */}
        <g filter="url(#toranDropShadow)">
          {/* Main Maroon Ribbon Bar */}
          <path
            d="M 0,0 L 500,0 L 500,15 Q 250,21 0,15 Z"
            fill="url(#toranMaroonGrad)"
          />

          {/* Top Gold Border Piping */}
          <rect x="0" y="0" width="500" height="2.5" fill="url(#toranGoldRibbon)" />

          {/* Bottom Gold Scalloped Piping */}
          <path
            d="M 0,15 Q 250,21 500,15"
            stroke="url(#toranGoldRibbon)"
            strokeWidth="2"
            fill="none"
          />

          {/* Zari Gold Diamond Stitching Across Ribbon */}
          <path
            d="M 0,7 Q 250,13 500,7"
            stroke="url(#toranGoldRibbon)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            fill="none"
            opacity="0.85"
          />
        </g>

        {/* 2. SACRED MANGO LEAF CLUSTERS (Aam ke Patte) */}
        <g filter="url(#toranDropShadow)">
          {nodes.map((cx, idx) => {
            const baseY = 14 + Math.sin((cx / 500) * Math.PI) * 4;
            return (
              <g key={`leaves-${idx}`} transform={`translate(${cx}, ${baseY})`}>
                {/* Left Angled Leaf */}
                <g transform="rotate(-18) translate(-1, 0)">
                  <path
                    d="M 0,0 C -12,18 -15,36 0,55 C 10,36 8,18 0,0 Z"
                    fill="url(#mangoLeafGradSide)"
                    stroke="#DDB748"
                    strokeWidth="0.5"
                    strokeOpacity="0.6"
                  />
                  {/* Leaf Central Vein */}
                  <path d="M 0,2 Q -4,28 0,53" stroke="#ECCB65" strokeWidth="0.6" strokeOpacity="0.65" fill="none" />
                </g>

                {/* Right Angled Leaf */}
                <g transform="rotate(18) translate(1, 0)">
                  <path
                    d="M 0,0 C 12,18 15,36 0,55 C -10,36 -8,18 0,0 Z"
                    fill="url(#mangoLeafGradSide)"
                    stroke="#DDB748"
                    strokeWidth="0.5"
                    strokeOpacity="0.6"
                  />
                  {/* Leaf Central Vein */}
                  <path d="M 0,2 Q 4,28 0,53" stroke="#ECCB65" strokeWidth="0.6" strokeOpacity="0.65" fill="none" />
                </g>

                {/* Center Forefront Leaf (longer, richer green) */}
                <g>
                  <path
                    d="M 0,0 C -14,22 -12,46 0,64 C 12,46 14,22 0,0 Z"
                    fill="url(#mangoLeafGradCenter)"
                    stroke="#E6C254"
                    strokeWidth="0.7"
                    strokeOpacity="0.8"
                  />
                  {/* Central Gold Vein */}
                  <path d="M 0,2 L 0,62" stroke="#FFF0A3" strokeWidth="0.9" strokeOpacity="0.8" fill="none" />
                  {/* Fine Side Leaf Veins */}
                  <path d="M 0,16 L -6,22 M 0,26 L -7,33 M 0,36 L -6,44 M 0,46 L -4,52" stroke="#ECCB65" strokeWidth="0.5" strokeOpacity="0.55" />
                  <path d="M 0,16 L 6,22 M 0,26 L 7,33 M 0,36 L 6,44 M 0,46 L 4,52" stroke="#ECCB65" strokeWidth="0.5" strokeOpacity="0.55" />
                </g>
              </g>
            );
          })}
        </g>

        {/* 3. HANGING BRASS TEMPLE BELLS (Ghanti) WITH SWAY ANIMATION */}
        {bellPositions.map((bx, bIdx) => {
          const ropeStartY = 15 + Math.sin((bx / 500) * Math.PI) * 4;
          return (
            <g
              key={`bell-${bIdx}`}
              className={`toran-bell-group toran-bell-${bIdx % 3}`}
              transform={`translate(${bx}, ${ropeStartY})`}
              filter="url(#bellSoftShadow)"
            >
              {/* Gold Beaded Chain */}
              <line x1="0" y1="0" x2="0" y2="40" stroke="url(#toranGoldShine)" strokeWidth="1.3" />
              <circle cx="0" cy="8" r="1.8" fill="#FFF2B2" />
              <circle cx="0" cy="18" r="2.2" fill="url(#toranGoldShine)" />
              <circle cx="0" cy="28" r="2.4" fill="#FFF2B2" />
              <circle cx="0" cy="38" r="2.8" fill="url(#toranGoldShine)" />

              {/* Brass Bell Body */}
              <g transform="translate(0, 42)">
                {/* Bell Dome Cap */}
                <ellipse cx="0" cy="2" rx="4.5" ry="3" fill="url(#toranGoldShine)" />
                {/* Bell Flared Body */}
                <path
                  d="M -3.5,3 C -4.5,10 -9,16 -10,19 C -10,21 10,21 10,19 C 9,16 4.5,10 3.5,3 Z"
                  fill="url(#toranGoldShine)"
                  stroke="#573703"
                  strokeWidth="0.4"
                />
                {/* Bell Bottom Rim */}
                <ellipse cx="0" cy="19" rx="10" ry="2.2" fill="#FFEAA3" stroke="#875708" strokeWidth="0.5" />
                {/* Inner Shadow / Cavity */}
                <ellipse cx="0" cy="19.4" rx="8" ry="1.5" fill="#3D2300" />
                {/* Little Brass Clapper Ball */}
                <circle cx="0" cy="21.5" r="2.2" fill="url(#toranGoldShine)" />
                {/* Red Sacred Thread Droplet (Kalawa Chutka) */}
                <path d="M 0,23.5 L 0,29" stroke="#B31212" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="0" cy="29.5" r="1.2" fill="#E61919" />
              </g>
            </g>
          );
        })}

        {/* 4. AUSPICIOUS MARIGOLD FLOWERS (Genda Phool Rosettes) */}
        <g filter="url(#toranDropShadow)">
          {nodes.map((nx, nIdx) => {
            const ny = 16 + Math.sin((nx / 500) * Math.PI) * 4;
            // Alternate between rich yellow and saffron orange
            const isYellow = nIdx % 2 === 0;
            const gradId = isYellow ? 'url(#marigoldYellow)' : 'url(#marigoldOrange)';
            const isCenter = nIdx === 3;
            const scale = isCenter ? 1.25 : 1.0;

            return (
              <g
                key={`marigold-${nIdx}`}
                transform={`translate(${nx}, ${ny}) scale(${scale})`}
                className="marigold-flower"
              >
                {/* Green Calyx / Sepal base behind */}
                <circle cx="0" cy="0" r="14" fill="#25542E" opacity="0.4" />

                {/* Outer Petal Ring (12 lobes) */}
                <g fill={gradId}>
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                    <circle
                      key={`p-out-${deg}`}
                      cx={Math.cos((deg * Math.PI) / 180) * 8.5}
                      cy={Math.sin((deg * Math.PI) / 180) * 8.5}
                      r="5.2"
                    />
                  ))}
                </g>

                {/* Middle Petal Ring (8 lobes) with contrasting tone */}
                <g fill={isYellow ? 'url(#marigoldOrange)' : 'url(#marigoldYellow)'}>
                  {[15, 60, 105, 150, 195, 240, 285, 330].map((deg) => (
                    <circle
                      key={`p-mid-${deg}`}
                      cx={Math.cos((deg * Math.PI) / 180) * 5.2}
                      cy={Math.sin((deg * Math.PI) / 180) * 5.2}
                      r="4.2"
                    />
                  ))}
                </g>

                {/* Center Core Ruffle */}
                <circle cx="0" cy="0" r="4.6" fill={gradId} />
                <circle cx="0" cy="0" r="2.4" fill="#802000" />
                <circle cx="-0.8" cy="-0.8" r="0.9" fill="#FFF2B2" opacity="0.85" />
              </g>
            );
          })}
        </g>

        {/* 5. CENTER AUSPICIOUS EMBLEM / GOLDEN LOTUS MEDALLION (At x = 250) */}
        <g transform="translate(250, 16)" filter="url(#toranDropShadow)">
          {/* Subtle Golden Aura */}
          <circle cx="0" cy="0" r="16" fill="url(#toranGoldShine)" opacity="0.25" />
          {/* Mini Gold Auspicious Lotus Crest on the ribbon */}
          <circle cx="0" cy="-6" r="3.5" fill="url(#toranGoldShine)" stroke="#613D04" strokeWidth="0.5" />
          <path d="M -4,-6 Q 0,-12 4,-6 Q 0,-3 -4,-6 Z" fill="#FFF3BD" />
          <path d="M -7,-5 Q -3,-10 0,-6 Q -4,-2 -7,-5 Z" fill="url(#toranGoldShine)" />
          <path d="M 7,-5 Q 3,-10 0,-6 Q 4,-2 7,-5 Z" fill="url(#toranGoldShine)" />
        </g>
      </svg>
    </div>
  );
}
