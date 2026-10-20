import React from 'react';

/**
 * RoyalCrimsonDarbarDoorLeaf
 * Royal Crimson & Gold Zari Darbar Gate (शाही सिंदूरी व स्वर्ण कपाट)
 * 
 * Features:
 * - Lacquered Crimson Wood: Deep royal vermillion / maroon wood stain with satin lacquer sheen
 * - Top Header: Intricate 24K gold geometric Jaali (lattice) transom
 * - Upper Jharokha Arch: Royal Peacock (Mayur) with emerald plumage and flowing fan tail amidst lotus blooms
 * - Lower Jharokha Arch: Royal Caparisoned Elephant (Airavat Gajraj) with raised trunk in auspicious welcome
 * - Center Meeting Strip: 24K Gold astragal band with ruby & emerald jewel cabochons and gold rosettes
 * - Gold Foil Scalloped Rajput / Mughal Mehrab arches with Zari borders
 */
export default function RoyalCrimsonDarbarDoorLeaf({ side = 'left', className = '' }) {
  const isLeft = side === 'left';
  const idPrefix = `crimson-gate-${side}`;

  return (
    <div className={`royal-crimson-door-leaf leaf-${side} ${className}`}>
      {/* 1. Base Lacquered Royal Crimson Wood Surface */}
      <div className="darbar-crimson-base" />

      {/* 2. Satin Lacquer Highlight & Gold Dust Reflection Overlay */}
      <div className="darbar-crimson-sheen" />

      {/* 3. Gold Foil Zari Border Framing the entire Leaf */}
      <div className="darbar-zari-frame" />

      {/* 4. Top Header: Intricate Golden Geometric Jaali (Lattice) Transom */}
      <div className="darbar-jaali-transom">
        <svg viewBox="0 0 200 48" className="jaali-svg" aria-hidden="true" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`${idPrefix}-goldFoil`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF4BD" />
              <stop offset="25%" stopColor="#F5D77F" />
              <stop offset="50%" stopColor="#C9972A" />
              <stop offset="75%" stopColor="#F9DF8E" />
              <stop offset="100%" stopColor="#7E540C" />
            </linearGradient>

            <pattern id={`${idPrefix}-jaaliPattern`} width="20" height="20" patternUnits="userSpaceOnUse">
              {/* Interlocking 8-Pointed Star Lattice Fretwork */}
              <rect x="0" y="0" width="20" height="20" fill="#4A070B" />
              <path
                d="M 10,0 L 20,10 L 10,20 L 0,10 Z"
                fill="none"
                stroke={`url(#${idPrefix}-goldFoil)`}
                strokeWidth="1.2"
              />
              <circle cx="10" cy="10" r="2.8" fill={`url(#${idPrefix}-goldFoil)`} />
              <circle cx="0" cy="0" r="1.5" fill="#FFEAA8" />
              <circle cx="20" cy="0" r="1.5" fill="#FFEAA8" />
              <circle cx="0" cy="20" r="1.5" fill="#FFEAA8" />
              <circle cx="20" cy="20" r="1.5" fill="#FFEAA8" />
            </pattern>
          </defs>

          {/* Lattice Background & Frame */}
          <rect x="2" y="2" width="196" height="44" fill={`url(#${idPrefix}-jaaliPattern)`} rx="3" />
          <rect x="2" y="2" width="196" height="44" fill="none" stroke={`url(#${idPrefix}-goldFoil)`} strokeWidth="1.8" rx="3" />
          {/* Bottom Beaded Trim of the Transom */}
          <line x1="2" y1="46" x2="198" y2="46" stroke="#FFEAA8" strokeWidth="1.2" strokeDasharray="2 3" />
        </svg>
      </div>

      {/* 5. Upper Jharokha Arch: Royal Peacock (Mayur) Amidst Lotus Blooms */}
      <div className="darbar-jharokha-upper">
        <svg viewBox="0 0 200 220" className="jharokha-svg peacock-jharokha-svg" aria-label="Royal Peacock">
          <defs>
            {/* Rich 24K Gold Foil Gradients */}
            <linearGradient id={`${idPrefix}-goldShine`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF9DA" />
              <stop offset="30%" stopColor="#F5D77F" />
              <stop offset="60%" stopColor="#B8861E" />
              <stop offset="85%" stopColor="#E8C35F" />
              <stop offset="100%" stopColor="#694305" />
            </linearGradient>

            {/* Emerald Green Peacock Neck & Plumage Gradient */}
            <linearGradient id={`${idPrefix}-emeraldPlumage`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2DE089" />
              <stop offset="35%" stopColor="#128C50" />
              <stop offset="70%" stopColor="#0B522E" />
              <stop offset="100%" stopColor="#052E19" />
            </linearGradient>

            {/* Royal Sapphire Feather Core */}
            <radialGradient id={`${idPrefix}-sapphireEye`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#5CA6FF" />
              <stop offset="50%" stopColor="#1750AC" />
              <stop offset="90%" stopColor="#082559" />
            </radialGradient>

            <filter id={`${idPrefix}-dropGold`} x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="3.5" stdDeviation="3" floodColor="#000" floodOpacity="0.75" />
            </filter>
          </defs>

          {/* Scalloped Rajput / Mughal Mehrab Arch Frame */}
          <g filter={`url(#${idPrefix}-dropGold)`}>
            {/* Inner Dark Velvet Arch Cutout */}
            <path
              d="M 12,216 
                 L 12,95 
                 C 12,65 24,52 38,44 
                 C 48,38 56,28 70,20 
                 C 82,12 94,6 100,2 
                 C 106,6 118,12 130,20 
                 C 144,28 152,38 162,44 
                 C 176,52 188,65 188,95 
                 L 188,216 Z"
              fill="#3A0508"
              stroke={`url(#${idPrefix}-goldShine)`}
              strokeWidth="2.5"
            />

            {/* Scalloped Cusps Molding (Foil Lobes) */}
            <path
              d="M 14,95 
                 C 14,75 28,68 44,62 
                 C 60,56 74,44 86,30 
                 C 94,20 98,12 100,5 
                 C 102,12 106,20 114,30 
                 C 126,44 140,56 156,62 
                 C 172,68 186,75 186,95"
              fill="none"
              stroke="#FFF2B2"
              strokeWidth="1.2"
              strokeDasharray="2.5 3"
              opacity="0.9"
            />

            {/* Apex Auspicious Spire (Kalash Finial) */}
            <path d="M 100,-2 L 103,4 L 100,6 L 97,4 Z" fill="#FFEAA8" />
            <circle cx="100" cy="-3.5" r="2" fill="#E62222" />
          </g>

          {/* Symmetrical Royal Peacock (Mayur) with Lotus Blooms */}
          <g
            transform={isLeft ? "translate(100, 120)" : "translate(100, 120) scale(-1, 1)"}
            filter={`url(#${idPrefix}-dropGold)`}
          >
            {/* Blooming Golden Lotus Flower at Peacock Base */}
            <g transform="translate(0, 80)">
              <ellipse cx="0" cy="0" rx="48" ry="6" fill={`url(#${idPrefix}-goldShine)`} stroke="#4A2F03" strokeWidth="0.8" />
              {[-36, -24, -12, 0, 12, 24, 36].map((lx) => (
                <path key={`lt-${lx}`} d={`M ${lx - 8},0 C ${lx - 8},-10 ${lx + 8},-10 ${lx + 8},0 Z`} fill="#FFDF85" stroke="#5C3B05" strokeWidth="0.4" />
              ))}
              {/* Sacred Lotus Bud & Padmapitha */}
              <circle cx="0" cy="-6" r="5" fill="#E62222" />
              <path d="M -5,-6 Q 0,-14 5,-6 Z" fill="#FFF2B0" />
            </g>

            {/* Peacock Fan Tail Feathers (Mor-Pankh) Cascading with Chandraka Eyes */}
            <g transform="translate(-18, 10)">
              {[
                { dx: -38, dy: 16, rot: -32 },
                { dx: -26, dy: 34, rot: -18 },
                { dx: -10, dy: 50, rot: -4 },
                { dx: 8, dy: 58, rot: 12 },
                { dx: -45, dy: 38, rot: -28 },
                { dx: -32, dy: 56, rot: -14 },
                { dx: -18, dy: 66, rot: 0 },
              ].map((p, idx) => (
                <g key={`feather-${idx}`} transform={`translate(${p.dx}, ${p.dy}) rotate(${p.rot})`}>
                  {/* Stem */}
                  <line x1="0" y1="-8" x2="0" y2="16" stroke="#DDA83A" strokeWidth="0.9" />
                  {/* Outer Gold Teardrop */}
                  <path
                    d="M 0,-8 C 9,-8 13,0 0,16 C -13,0 -9,-8 0,-8 Z"
                    fill={`url(#${idPrefix}-goldShine)`}
                    stroke="#5A3A05"
                    strokeWidth="0.5"
                  />
                  {/* Emerald Green Ring */}
                  <ellipse cx="0" cy="3" rx="6" ry="7" fill={`url(#${idPrefix}-emeraldPlumage)`} />
                  {/* Sapphire Blue Eye (Chandraka) */}
                  <circle cx="0" cy="3" r="3.4" fill={`url(#${idPrefix}-sapphireEye)`} />
                  {/* Specular Golden Pupil */}
                  <circle cx="-0.8" cy="2" r="1.1" fill="#FFF8D6" />
                </g>
              ))}
            </g>

            {/* Peacock Body, Slender Curved Neck & Head Facing Right */}
            {/* Graceful Stately Legs */}
            <line x1="6" y1="52" x2="6" y2="76" stroke="#FFE799" strokeWidth="2" strokeLinecap="round" />
            <line x1="16" y1="50" x2="18" y2="76" stroke="#FFE799" strokeWidth="2" strokeLinecap="round" />
            {/* Claws */}
            <path d="M 2,76 L 6,76 L 10,76 M 14,76 L 18,76 L 22,76" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />

            {/* Main Body (Torso & Folded Wing in Gold & Emerald) */}
            <path
              d="M -16,36 
                 C -24,20 -18,-2 4,-8 
                 C 18,-8 28,6 24,26 
                 C 20,44 6,56 -10,54 
                 C -18,52 -20,44 -16,36 Z"
              fill={`url(#${idPrefix}-emeraldPlumage)`}
              stroke="#D4AF37"
              strokeWidth="0.9"
            />

            {/* Overlapping Gold Wing Scallop Feathers */}
            <g fill={`url(#${idPrefix}-goldShine)`} stroke="#4D3204" strokeWidth="0.4">
              <path d="M -6,14 C 2,12 12,18 8,30 C 0,32 -6,24 -6,14 Z" />
              <path d="M 4,20 C 12,18 20,24 16,36 C 8,38 2,30 4,20 Z" />
              <path d="M -10,24 C -2,22 6,28 2,40 C -6,42 -12,34 -10,24 Z" />
              <path d="M 0,32 C 8,30 16,36 12,46 C 4,48 -2,40 0,32 Z" />
            </g>

            {/* S-Curved Royal Neck & Head */}
            <path
              d="M 12,0 
                 C 14,-14 6,-28 14,-42 
                 C 18,-48 26,-48 30,-42 
                 C 32,-38 28,-30 22,-22 
                 C 16,-14 20,-2 18,4 Z"
              fill={`url(#${idPrefix}-emeraldPlumage)`}
              stroke="#FFEBA3"
              strokeWidth="0.8"
            />

            {/* Head Dome */}
            <circle cx="28" cy="-44" r="6.5" fill={`url(#${idPrefix}-emeraldPlumage)`} stroke="#D4AF37" strokeWidth="0.6" />

            {/* Slender Beak holding a Pearl Droplet */}
            <path d="M 33,-45 L 42,-44 L 34,-41 Z" fill="#FFF2B0" stroke="#5E3E06" strokeWidth="0.4" />
            <circle cx="42" cy="-40" r="1.8" fill="#FFF" stroke="#D4AF37" strokeWidth="0.5" />

            {/* Intelligent Eye */}
            <ellipse cx="29" cy="-45" rx="1.5" ry="1.2" fill="#0C1B33" />
            <circle cx="28.5" cy="-45.5" r="0.5" fill="#FFF" />

            {/* Royal Triple Crest (Kalgi) atop Head with Golden Pearl Tips */}
            <g stroke="#FFE694" strokeWidth="0.9" fill="#FFF4BD">
              <line x1="26" y1="-50" x2="22" y2="-59" />
              <circle cx="22" cy="-60" r="1.8" fill="#E62222" stroke="#FFDF85" strokeWidth="0.5" />

              <line x1="28" y1="-50" x2="27" y2="-62" />
              <circle cx="27" cy="-63" r="2.2" fill="#0A7A42" stroke="#FFDF85" strokeWidth="0.5" />

              <line x1="30" y1="-50" x2="33" y2="-60" />
              <circle cx="33" cy="-61" r="1.8" fill="#E62222" stroke="#FFDF85" strokeWidth="0.5" />
            </g>
          </g>
        </svg>
      </div>

      {/* 6. Mid Section: Gold Zari Framing for Door Knocker & Central Plaque */}
      <div className="darbar-mid-framing">
        {/* Subtle Gold Filigree Rosette backing the Knocker */}
        <div className="knocker-gold-rosette" />
      </div>

      {/* 7. Lower Jharokha Arch: Royal Caparisoned Elephant (Airavat Gajraj) */}
      <div className="darbar-jharokha-lower">
        <svg viewBox="0 0 200 230" className="jharokha-svg elephant-jharokha-svg" aria-label="Royal Caparisoned Elephant">
          <defs>
            {/* Rich Ceremonial Crimson Saddle Gradient */}
            <linearGradient id={`${idPrefix}-jhoolRed`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9E1923" />
              <stop offset="50%" stopColor="#700D15" />
              <stop offset="100%" stopColor="#4A060C" />
            </linearGradient>

            <linearGradient id={`${idPrefix}-elephantGold`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF9DA" />
              <stop offset="25%" stopColor="#F5D77F" />
              <stop offset="55%" stopColor="#A8771A" />
              <stop offset="85%" stopColor="#E2B750" />
              <stop offset="100%" stopColor="#634005" />
            </linearGradient>
          </defs>

          {/* Scalloped Rajput / Mughal Mehrab Arch Frame */}
          <g filter={`url(#${idPrefix}-dropGold)`}>
            {/* Inner Dark Velvet Arch Cutout */}
            <path
              d="M 12,224 
                 L 12,95 
                 C 12,65 24,52 38,44 
                 C 48,38 56,28 70,20 
                 C 82,12 94,6 100,2 
                 C 106,6 118,12 130,20 
                 C 144,28 152,38 162,44 
                 C 176,52 188,65 188,95 
                 L 188,224 Z"
              fill="#3A0508"
              stroke={`url(#${idPrefix}-goldShine)`}
              strokeWidth="2.5"
            />

            {/* Scalloped Cusps Molding */}
            <path
              d="M 14,95 
                 C 14,75 28,68 44,62 
                 C 60,56 74,44 86,30 
                 C 94,20 98,12 100,5 
                 C 102,12 106,20 114,30 
                 C 126,44 140,56 156,62 
                 C 172,68 186,75 186,95"
              fill="none"
              stroke="#FFF2B2"
              strokeWidth="1.2"
              strokeDasharray="2.5 3"
              opacity="0.9"
            />

            {/* Arch Apex Spire */}
            <path d="M 100,-2 L 103,4 L 100,6 L 97,4 Z" fill="#FFEAA8" />
            <circle cx="100" cy="-3.5" r="2" fill="#E62222" />
          </g>

          {/* Symmetrical Royal Caparisoned Elephant (Gajraj) with Raised Trunk */}
          <g
            transform={isLeft ? "translate(100, 142)" : "translate(100, 142) scale(-1, 1)"}
            filter={`url(#${idPrefix}-dropGold)`}
          >
            {/* Auspicious Lotus Pedestal (Padmapitha) */}
            <g transform="translate(0, 58)">
              <ellipse cx="0" cy="0" rx="66" ry="8" fill={`url(#${idPrefix}-elephantGold)`} stroke="#4A2F03" strokeWidth="0.8" />
              <ellipse cx="0" cy="0" rx="60" ry="5" fill="#3D0609" />
              {[-48, -32, -16, 0, 16, 32, 48].map((x) => (
                <path key={`el-lt-${x}`} d={`M ${x - 7},0 Q ${x},7 ${x + 7},0 Z`} fill="#FFE694" stroke="#5E3F05" strokeWidth="0.4" />
              ))}
            </g>

            {/* Elephant Legs */}
            {/* Hind Legs & Tail */}
            <path
              d="M -44,18 C -50,30 -52,48 -50,58 L -36,58 C -36,46 -32,32 -32,22 Z"
              fill={`url(#${idPrefix}-elephantGold)`}
              stroke="#523405"
              strokeWidth="0.8"
            />
            {/* Tail */}
            <path d="M -50,6 C -56,20 -54,34 -49,44" stroke="#422502" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <circle cx="-48" cy="45" r="2.5" fill="#FFF2AD" />

            {/* Forelegs */}
            <path
              d="M 14,22 C 14,34 16,48 16,58 L 30,58 C 30,46 28,32 26,18 Z"
              fill={`url(#${idPrefix}-elephantGold)`}
              stroke="#523405"
              strokeWidth="0.8"
            />
            <path
              d="M -10,22 C -10,34 -9,48 -8,58 L 4,58 C 4,46 3,32 2,18 Z"
              fill={`url(#${idPrefix}-elephantGold)`}
              stroke="#523405"
              strokeWidth="0.8"
            />

            {/* Massive Royal Torso in Polished Gold Foil */}
            <path
              d="M -48,16 
                 C -52,-8 -28,-30 6,-30 
                 C 28,-30 42,-16 48,2 
                 C 52,16 38,28 20,28 
                 C -2,28 -16,30 -32,26 
                 C -40,24 -46,20 -48,16 Z"
              fill={`url(#${idPrefix}-elephantGold)`}
              stroke="#523405"
              strokeWidth="1"
            />

            {/* Royal Embroidered Ceremonial Saddle (Jhool) with Gold Zari Fringe */}
            <path
              d="M -26,-22 C -16,-26 14,-26 22,-22 L 22,12 C 14,20 -16,20 -26,12 Z"
              fill={`url(#${idPrefix}-jhoolRed)`}
              stroke="#FFDF85"
              strokeWidth="1.4"
            />
            {/* Gold Diamond Zari Embroidery on Saddle */}
            <path
              d="M -26,12 Q -2,22 22,12"
              stroke="#FFDF85"
              strokeWidth="2"
              strokeDasharray="2 3"
              fill="none"
            />
            {/* Center Auspicious Emerald Lotus Emblem on Saddle */}
            <circle cx="-2" cy="-4" r="6" fill="#0E6B39" stroke="#FFDF85" strokeWidth="0.8" />
            <circle cx="-2" cy="-4" r="3" fill="#FFF2B0" />

            {/* Head Dome */}
            <circle cx="32" cy="-16" r="16" fill={`url(#${idPrefix}-elephantGold)`} stroke="#523405" strokeWidth="0.9" />

            {/* Ceremonial Royal Crown (Mukut) */}
            <path
              d="M 26,-30 L 42,-30 L 44,-38 L 34,-34 L 24,-38 Z"
              fill="#FFF0A3"
              stroke="#573704"
              strokeWidth="0.8"
            />
            <circle cx="34" cy="-37" r="2.2" fill="#E62222" />

            {/* Royal Ear with Gold Trim */}
            <path
              d="M 18,-20 C 14,-16 14,2 24,6 C 28,2 28,-16 18,-20 Z"
              fill={`url(#${idPrefix}-elephantGold)`}
              stroke="#523405"
              strokeWidth="0.8"
            />
            <circle cx="20" cy="-6" r="2.5" fill="#0E6B39" />

            {/* Raised Auspicious Trunk in Salutation (Shoond Holding Lotus) */}
            <path
              d="M 44,-8 
                 C 56,-8 64,-16 62,-32 
                 C 60,-46 48,-50 44,-44 
                 C 40,-38 46,-30 50,-28 
                 C 54,-26 50,-12 38,-4 Z"
              fill={`url(#${idPrefix}-elephantGold)`}
              stroke="#523405"
              strokeWidth="1"
            />

            {/* Golden Blooming Lotus Held at Trunk Tip */}
            <circle cx="44" cy="-46" r="4.5" fill="#FFEAA8" stroke="#694004" strokeWidth="0.6" />
            <path d="M 44,-51 L 47,-46 L 41,-46 Z" fill="#E62222" />

            {/* Curved Polished Ivory Tusk */}
            <path
              d="M 40,-4 C 52,-4 56,-12 54,-18 C 52,-16 46,-8 38,-6 Z"
              fill="#FFFFF0"
              stroke="#6E4D12"
              strokeWidth="0.6"
            />

            {/* Auspicious Eye */}
            <ellipse cx="33" cy="-17" rx="2.2" ry="1.6" fill="#1F0F02" />
            <circle cx="32.5" cy="-17.5" r="0.7" fill="#FFF" />

            {/* Anklets (Payal / Toda) with Tiny Hanging Bells on All Feet */}
            {[-50, -36, -8, 16].map((lx) => (
              <g key={`anklet-${lx}`} transform={`translate(${lx}, 52)`}>
                <rect x="0" y="0" width="13" height="3" fill="#FFEBA3" stroke="#523405" strokeWidth="0.5" rx="1" />
                <circle cx="3" cy="4" r="1" fill="#E62222" />
                <circle cx="7" cy="4" r="1" fill="#0E6B39" />
                <circle cx="11" cy="4" r="1" fill="#E62222" />
              </g>
            ))}
          </g>
        </svg>
      </div>

      {/* 8. Bottom Zari Decorative Border */}
      <div className="darbar-bottom-border" />

      {/* 9. Center Astragal Meeting Strip with Ruby & Emerald Jewels */}
      <div className={`darbar-center-astragal astragal-${isLeft ? 'right' : 'left'}`}>
        <div className="astragal-jewel jewel-1" />
        <div className="astragal-jewel jewel-2" />
        <div className="astragal-jewel jewel-3" />
        <div className="astragal-jewel jewel-4" />
      </div>

      {/* 10. Outer Frame Hinges on Hinge Edge */}
      <div className={`darbar-hinges-container hinges-${isLeft ? 'left' : 'right'}`}>
        <div className="darbar-hinge hinge-1" />
        <div className="darbar-hinge hinge-2" />
        <div className="darbar-hinge hinge-3" />
      </div>
    </div>
  );
}
