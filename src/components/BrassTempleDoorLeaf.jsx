import React from 'react';

/**
 * BrassTempleDoorLeaf
 * Traditional Indian Solid Embossed Brass Temple Gate Leaf (पीतल व अष्टधातु मंडित कपाट)
 * 
 * Features:
 * - Hand-hammered antique brass sheeting with warm golden-amber luster and bronze patina
 * - Heavy riveted brass cross-bands with 3D forged rivets (Gul-Mekh)
 * - Upper Coffer: Auspicious Surya Mandala (Divine Sunburst repoussé)
 * - Upper-Mid Coffer: Beveled lotus frame surrounding the Royal Brass Knocker
 * - Lower Coffer: Symmetrical Royal Embossed Elephants (Airavat Gajraj) with raised trunks
 *   saluting towards the center seam
 * - Bottom Coffer: Heavy beaten brass fortress kick-plate with diamond lattice
 * - Outer Frame: Heavy cast brass fortress hinges (Kabje)
 */
export default function BrassTempleDoorLeaf({ side = 'left', className = '' }) {
  const isLeft = side === 'left';
  const idPrefix = `temple-gate-${side}`;

  return (
    <div className={`brass-temple-door-leaf leaf-${side} ${className}`}>
      {/* 1. Base Hammered Antique Brass Metallic Surface */}
      <div className="temple-brass-base" />

      {/* 2. Beaten Metal Specular Sheen & Patina Overlay */}
      <div className="temple-brass-patina" />

      {/* 3. Deep Architectural Coffer Recesses */}
      <div className="temple-coffer-panels">
        {/* Panel 1: Top Arch / Surya Mandala */}
        <div className="temple-coffer-panel coffer-top">
          <div className="coffer-inner-bevel">
            <svg viewBox="0 0 120 120" className="coffer-svg mandala-svg" aria-hidden="true">
              <defs>
                <radialGradient id={`${idPrefix}-sunGrad`} cx="40%" cy="38%" r="60%">
                  <stop offset="0%" stopColor="#FFFCE6" />
                  <stop offset="25%" stopColor="#F5D068" />
                  <stop offset="60%" stopColor="#A8771A" />
                  <stop offset="85%" stopColor="#6E4809" />
                  <stop offset="100%" stopColor="#3B2303" />
                </radialGradient>
                <filter id={`${idPrefix}-reliefShadow`}>
                  <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#000" floodOpacity="0.65" />
                </filter>
              </defs>

              {/* Surya / Sunburst Mandala Relief */}
              <g filter={`url(#${idPrefix}-reliefShadow)`} transform="translate(60, 60)">
                {/* 16 Radiating Sacred Sunbeams / Petals */}
                {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((deg) => (
                  <path
                    key={`ray-${deg}`}
                    d="M 0,-16 L 4,-30 L 0,-44 L -4,-30 Z"
                    transform={`rotate(${deg})`}
                    fill={`url(#${idPrefix}-sunGrad)`}
                    stroke="#523204"
                    strokeWidth="0.5"
                  />
                ))}

                {/* Outer Beaded Rim */}
                <circle cx="0" cy="0" r="28" fill={`url(#${idPrefix}-sunGrad)`} stroke="#4A2B03" strokeWidth="0.8" />
                <circle cx="0" cy="0" r="25" fill="none" stroke="#FFF5B8" strokeWidth="0.8" strokeDasharray="1.5 2.5" opacity="0.85" />

                {/* Inner 8-Petaled Sacred Lotus */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                  <path
                    key={`lotus-${deg}`}
                    d="M 0,-6 C 5,-12 8,-18 0,-24 C -8,-18 -5,-12 0,-6 Z"
                    transform={`rotate(${deg})`}
                    fill={`url(#${idPrefix}-sunGrad)`}
                    stroke="#482902"
                    strokeWidth="0.4"
                  />
                ))}

                {/* Center Auspicious Boss Dome */}
                <circle cx="0" cy="0" r="10" fill={`url(#${idPrefix}-sunGrad)`} stroke="#3D2102" strokeWidth="0.6" />
                <circle cx="-2" cy="-2" r="3.5" fill="#FFFCE8" opacity="0.8" />
              </g>
            </svg>
          </div>
        </div>

        {/* Panel 2: Knocker Lotus Halo (Surrounding the Brass Knocker) */}
        <div className="temple-coffer-panel coffer-knocker-backing">
          <div className="coffer-inner-bevel">
            <svg viewBox="0 0 140 140" className="coffer-svg knocker-backing-svg" aria-hidden="true">
              {/* Embossed Concentric Lotus Border Framing Knocker */}
              <g transform="translate(70, 70)">
                <circle cx="0" cy="0" r="54" fill="none" stroke="rgba(255, 243, 179, 0.45)" strokeWidth="1.2" strokeDasharray="3 3" />
                <circle cx="0" cy="0" r="48" fill="rgba(0, 0, 0, 0.25)" stroke="#664208" strokeWidth="0.8" />
                {/* 12 Outer Scalloped Crest Petals */}
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                  <path
                    key={`fl-${deg}`}
                    d="M -6,-48 C -6,-56 6,-56 6,-48 Z"
                    transform={`rotate(${deg})`}
                    fill="#E0B147"
                    stroke="#5A3705"
                    strokeWidth="0.4"
                  />
                ))}
              </g>
            </svg>
          </div>
        </div>

        {/* Panel 3: Center Seal Floral Frame (Behind Central Plaque) */}
        <div className="temple-coffer-panel coffer-seal-frame">
          <div className="coffer-inner-bevel">
            <svg viewBox="0 0 160 160" className="coffer-svg seal-bg-svg" aria-hidden="true">
              {/* Auspicious Floral Arabesque Vines */}
              <g transform={isLeft ? "translate(160, 80)" : "translate(0, 80)"}>
                <circle cx="0" cy="0" r="70" fill="none" stroke="#DDA83A" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
                <circle cx="0" cy="0" r="58" fill="rgba(60, 36, 5, 0.3)" stroke="#8C5C12" strokeWidth="0.8" />
              </g>
            </svg>
          </div>
        </div>

        {/* Panel 4: Royal Auspicious Elephant (Airavat Gajraj) in Embossed Repoussé */}
        <div className="temple-coffer-panel coffer-elephant">
          <div className="coffer-inner-bevel">
            <svg
              viewBox="0 0 160 140"
              className={`coffer-svg elephant-svg ${isLeft ? 'face-right' : 'face-left'}`}
              aria-label="Auspicious Royal Elephant"
            >
              <defs>
                <linearGradient id={`${idPrefix}-elephantGrad`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFBD9" />
                  <stop offset="20%" stopColor="#ECC25E" />
                  <stop offset="50%" stopColor="#A37218" />
                  <stop offset="80%" stopColor="#DBAB3D" />
                  <stop offset="100%" stopColor="#5E3C06" />
                </linearGradient>

                <linearGradient id={`${idPrefix}-saddleGrad`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#871616" />
                  <stop offset="50%" stopColor="#610E0E" />
                  <stop offset="100%" stopColor="#400707" />
                </linearGradient>

                <filter id={`${idPrefix}-heavyShadow`} x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#000" floodOpacity="0.75" />
                </filter>
              </defs>

              {/* Elephant Facing Right by default (flipped for right door leaf) */}
              <g
                transform={isLeft ? "translate(80, 70)" : "translate(80, 70) scale(-1, 1)"}
                filter={`url(#${idPrefix}-heavyShadow)`}
              >
                {/* 1. Auspicious Lotus Pedestal (Padmapitha) */}
                <g transform="translate(0, 48)">
                  <ellipse cx="0" cy="0" rx="60" ry="7" fill={`url(#${idPrefix}-elephantGrad)`} stroke="#4A2D03" strokeWidth="0.8" />
                  <ellipse cx="0" cy="0" rx="55" ry="4.5" fill="#361D02" />
                  {/* Scalloped Lotus Petals on Pedestal */}
                  {[-45, -30, -15, 0, 15, 30, 45].map((x) => (
                    <path key={`ped-${x}`} d={`M ${x - 6},0 Q ${x},6 ${x + 6},0 Z`} fill="#FCE280" stroke="#523204" strokeWidth="0.4" />
                  ))}
                </g>

                {/* 2. Main Elephant Body & Forehead */}
                {/* Hind Legs & Tail */}
                <path
                  d="M -38,14 C -44,24 -46,38 -44,48 L -32,48 C -32,38 -28,26 -28,18 Z"
                  fill={`url(#${idPrefix}-elephantGrad)`}
                  stroke="#472A03"
                  strokeWidth="0.7"
                />
                <path
                  d="M -44,4 C -48,14 -46,26 -43,34"
                  stroke="#382002"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle cx="-42.5" cy="35" r="2.2" fill="#FCE280" />

                {/* Forelegs */}
                <path
                  d="M 12,18 C 12,28 14,40 14,48 L 26,48 C 26,38 24,26 22,14 Z"
                  fill={`url(#${idPrefix}-elephantGrad)`}
                  stroke="#472A03"
                  strokeWidth="0.7"
                />
                <path
                  d="M -8,18 C -8,28 -7,40 -6,48 L 4,48 C 4,38 3,26 2,14 Z"
                  fill={`url(#${idPrefix}-elephantGrad)`}
                  stroke="#472A03"
                  strokeWidth="0.7"
                />

                {/* Torso & Massive Hindquarters */}
                <path
                  d="M -42,12 
                     C -44,-8 -24,-26 4,-26 
                     C 24,-26 36,-14 42,0 
                     C 46,12 34,22 18,22 
                     C -2,22 -14,24 -28,20 
                     C -36,18 -40,16 -42,12 Z"
                  fill={`url(#${idPrefix}-elephantGrad)`}
                  stroke="#472A03"
                  strokeWidth="0.9"
                />

                {/* Royal Ceremonial Saddle Cloth (Jhool) with Gold Fringe */}
                <path
                  d="M -22,-18 C -14,-22 12,-22 18,-18 L 18,8 C 12,14 -14,14 -22,8 Z"
                  fill={`url(#${idPrefix}-saddleGrad)`}
                  stroke="#FFDF85"
                  strokeWidth="1.2"
                />
                <path
                  d="M -22,8 Q -2,16 18,8"
                  stroke="#FFDF85"
                  strokeWidth="2"
                  strokeDasharray="2 3"
                  fill="none"
                />
                {/* Center Golden Lotus Emblem on Saddle */}
                <circle cx="-2" cy="-5" r="5" fill="#FFEAA3" stroke="#4A2E04" strokeWidth="0.5" />
                <circle cx="-2" cy="-5" r="2.5" fill="#871616" />

                {/* Royal Head, Raised Trunk & Tusk */}
                {/* Head Dome */}
                <circle cx="28" cy="-14" r="14" fill={`url(#${idPrefix}-elephantGrad)`} stroke="#4A2D03" strokeWidth="0.8" />

                {/* Ceremonial Royal Crown (Mukut) atop head */}
                <path
                  d="M 22,-26 L 36,-26 L 38,-34 L 29,-30 L 20,-34 Z"
                  fill="#FFF0A3"
                  stroke="#573704"
                  strokeWidth="0.6"
                />
                <circle cx="29" cy="-33" r="1.8" fill="#B31717" />

                {/* Graceful Royal Ear */}
                <path
                  d="M 16,-18 C 12,-14 12,0 20,4 C 24,0 24,-14 16,-18 Z"
                  fill={`url(#${idPrefix}-elephantGrad)`}
                  stroke="#4A2D03"
                  strokeWidth="0.7"
                />
                <circle cx="17" cy="-6" r="2" fill="#FFEB9E" />

                {/* Raised Auspicious Trunk (Shoond in Salutation) */}
                <path
                  d="M 38,-6 
                     C 48,-6 56,-14 54,-28 
                     C 52,-40 42,-44 38,-38 
                     C 35,-32 40,-26 44,-24 
                     C 48,-22 44,-10 34,-2 Z"
                  fill={`url(#${idPrefix}-elephantGrad)`}
                  stroke="#472A03"
                  strokeWidth="0.9"
                />

                {/* Golden Sacred Lotus Held in Trunk Tip */}
                <circle cx="38" cy="-40" r="3.8" fill="#FFF2AD" stroke="#694004" strokeWidth="0.5" />
                <path d="M 38,-44 L 40,-40 L 36,-40 Z" fill="#E62222" />

                {/* Curved Royal Ivory Tusk */}
                <path
                  d="M 34,-2 C 44,-2 48,-10 46,-14 C 44,-12 40,-6 32,-4 Z"
                  fill="#FFFEE6"
                  stroke="#63450E"
                  strokeWidth="0.5"
                />

                {/* Friendly Auspicious Eye */}
                <ellipse cx="29" cy="-15" rx="2" ry="1.4" fill="#2E1A02" />
                <circle cx="28.5" cy="-15.5" r="0.6" fill="#FFF" />

                {/* Anklets (Payal / Toda) on All Four Feet */}
                {[-44, -32, -8, 14].map((lx) => (
                  <rect key={`ank-${lx}`} x={lx} y="44" width="11" height="2.5" fill="#FFF2B2" stroke="#523204" strokeWidth="0.4" rx="1" />
                ))}
              </g>
            </svg>
          </div>
        </div>

        {/* Panel 5: Fortress Diamond Kick-Plate (Dwar Tali) */}
        <div className="temple-coffer-panel coffer-bottom-kickplate">
          <div className="coffer-inner-bevel">
            <svg viewBox="0 0 200 80" className="coffer-svg kickplate-svg" aria-hidden="true" preserveAspectRatio="none">
              {/* Heavy Diamond Repoussé Lattice */}
              <pattern id={`${idPrefix}-diamondLattice`} width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 12,0 L 24,12 L 12,24 L 0,12 Z" fill="none" stroke="rgba(255, 240, 163, 0.45)" strokeWidth="0.8" />
                <circle cx="12" cy="12" r="2.2" fill="url(#temple-stud-grad)" stroke="#452702" strokeWidth="0.4" />
              </pattern>
              <rect x="0" y="0" width="200" height="80" fill={`url(#${idPrefix}-diamondLattice)`} />
            </svg>
          </div>
        </div>
      </div>

      {/* 4. Heavy Riveted Brass Reinforcement Cross-Straps (Horizontal Bands) */}
      <div className="temple-straps-container">
        <div className="temple-strap strap-1" />
        <div className="temple-strap strap-2" />
        <div className="temple-strap strap-3" />
        <div className="temple-strap strap-4" />
      </div>

      {/* 5. Outer Fortress Hinges (Kabje) on the Hinge Edge */}
      <div className={`temple-hinges-container hinges-${isLeft ? 'left' : 'right'}`}>
        <div className="temple-hinge hinge-top" />
        <div className="temple-hinge hinge-mid" />
        <div className="temple-hinge hinge-bottom" />
      </div>

      {/* 6. Overlapping Astragal Strip on Meeting Edge */}
      <div className={`temple-meeting-strip strip-${isLeft ? 'right' : 'left'}`}>
        <div className="strip-highlight" />
      </div>
    </div>
  );
}
