import React, { useState, useRef, useCallback } from 'react';

/**
 * Procedural Web Audio Synthesizer for Authentic Brass Door Knocker
 * Produces:
 * 1. Low-mid acoustic wood reverberation of heavy palace doors
 * 2. High-frequency brass metal clack (transient)
 * 3. Warm resonant brass ring chime / sustain
 * 4. Realistic secondary bounce strike
 */
class KnockerAudioSynth {
  constructor() {
    this.ctx = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.initialized = true;
    } catch {
      // Audio unsupported or restricted
    }
  }

  playKnock(isMuted = false) {
    if (isMuted) return;
    if (!this.initialized) this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    try {
      const t0 = this.ctx.currentTime;
      // Strike 1 (primary heavy hit)
      this._strike(t0, 1.0);
      // Strike 2 (lighter natural recoil bounce)
      this._strike(t0 + 0.12, 0.58);
    } catch {
      // Ignore audio error
    }
  }

  _strike(time, intensity) {
    const ctx = this.ctx;

    // 1. Heavy Wooden Door Acoustic Body (thud)
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(145, time);
    osc.frequency.exponentialRampToValueAtTime(38, time + 0.13);
    oscGain.gain.setValueAtTime(0.42 * intensity, time);
    oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(time);
    osc.stop(time + 0.16);

    // 2. Crisp Metal Clack (High-frequency transient)
    const bufferSize = Math.floor(ctx.sampleRate * 0.035);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 3400;
    filter.Q.value = 4.5;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.55 * intensity, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.045);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(time);

    // 3. Brass Metal Resonance (Warm metallic ring)
    const ringOsc = ctx.createOscillator();
    const ringGain = ctx.createGain();
    ringOsc.type = 'sine';
    ringOsc.frequency.setValueAtTime(1720, time);
    ringGain.gain.setValueAtTime(0.24 * intensity, time);
    ringGain.gain.exponentialRampToValueAtTime(0.001, time + 0.32);
    ringOsc.connect(ringGain);
    ringGain.connect(ctx.destination);
    ringOsc.start(time);
    ringOsc.stop(time + 0.35);
  }
}

// Single instance of synthesizer across both left and right knockers
const knockerAudio = new KnockerAudioSynth();

/**
 * BrassDoorKnocker (Kundi)
 * Authentic Royal Haveli cast-brass door knocker featuring:
 * - Scalloped embossed sunburst rosette backplate with brass mounting rivets
 * - Heavy cast brass loop (Kadi) with weighted striker ball
 * - Raised brass anvil stud (Chot ki Kheel)
 * - Interactive double-tap strike animation with realistic procedural sound & haptics
 */
export default function BrassDoorKnocker({
  side = 'left',
  isOpen = false,
  isMuted = false,
  onOpen,
  className = '',
}) {
  const [isStriking, setIsStriking] = useState(false);
  const strikeTimerRef = useRef(null);
  const idPrefix = `knocker-${side}`;

  const handleKnock = useCallback(
    (e) => {
      e.stopPropagation();
      if (isOpen) return;

      // Play audio and trigger haptic feedback
      knockerAudio.playKnock(isMuted);
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try {
          navigator.vibrate([28, 55, 20]);
        } catch {
          // ignore
        }
      }

      // Trigger recoil visual animation
      setIsStriking(true);
      if (strikeTimerRef.current) clearTimeout(strikeTimerRef.current);
      strikeTimerRef.current = setTimeout(() => {
        setIsStriking(false);
      }, 550);

      // Open the doors naturally on knock after the authentic sound finishes
      if (onOpen) {
        setTimeout(() => {
          onOpen();
        }, 380);
      }
    },
    [isOpen, isMuted, onOpen]
  );

  return (
    <div
      className={`brass-door-knocker knocker-${side} ${isStriking ? 'is-striking' : ''} ${className}`}
      onClick={handleKnock}
      role="button"
      tabIndex={0}
      aria-label={`Knock on ${side} royal palace door`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleKnock(e);
        }
      }}
    >
      <svg
        viewBox="0 0 100 135"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="knocker-svg"
      >
        <defs>
          {/* Dimensional Drop Shadow */}
          <filter id={`${idPrefix}-shadow`} x="-25%" y="-15%" width="150%" height="150%">
            <feDropShadow dx="0" dy="7" stdDeviation="5.5" floodColor="#000000" floodOpacity="0.72" />
          </filter>

          {/* Golden Brass Backplate Gradient */}
          <linearGradient id={`${idPrefix}-brassPlate`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF9DA" />
            <stop offset="22%" stopColor="#E5BD5F" />
            <stop offset="48%" stopColor="#9C6F19" />
            <stop offset="72%" stopColor="#E2B754" />
            <stop offset="88%" stopColor="#734F0C" />
            <stop offset="100%" stopColor="#3B2603" />
          </linearGradient>

          {/* Heavy Cast Brass Ring Gradient */}
          <linearGradient id={`${idPrefix}-brassRing`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF4CB" />
            <stop offset="30%" stopColor="#DCB04B" />
            <stop offset="65%" stopColor="#7B520E" />
            <stop offset="85%" stopColor="#E6BF63" />
            <stop offset="100%" stopColor="#482F05" />
          </linearGradient>

          {/* Rivet Dome Radial Gradient */}
          <radialGradient id={`${idPrefix}-rivet`} cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFF6D6" />
            <stop offset="45%" stopColor="#D9A93E" />
            <stop offset="80%" stopColor="#7E530F" />
            <stop offset="100%" stopColor="#422904" />
          </radialGradient>

          {/* Striker Anvil Radial Gradient */}
          <radialGradient id={`${idPrefix}-anvil`} cx="38%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#FFFEE8" />
            <stop offset="35%" stopColor="#E5B951" />
            <stop offset="70%" stopColor="#946513" />
            <stop offset="100%" stopColor="#4D3105" />
          </radialGradient>
        </defs>

        {/* 1. WOOD INDENTATION AMBIENT CONTACT SHADOW */}
        <circle cx="50" cy="50" r="44" fill="#000000" opacity="0.3" filter="blur(4px)" />

        {/* 2. CAST BRASS ESCUTCHEON / BACKPLATE */}
        <g filter={`url(#${idPrefix}-shadow)`}>
          {/* Outer Scalloped Rosette (12 Petals) */}
          <path
            d="M 50,14 
               C 55,14 58,19 62,20 C 66,21 72,19 75,23 C 78,27 77,33 80,38 C 83,43 89,45 89,50 
               C 89,55 83,57 80,62 C 77,67 78,73 75,77 C 72,81 66,79 62,80 C 58,81 55,86 50,86 
               C 45,86 42,81 38,80 C 34,79 28,81 25,77 C 22,73 23,67 20,62 C 17,57 11,55 11,50 
               C 11,45 17,43 20,38 C 23,33 22,27 25,23 C 28,19 34,21 38,20 C 42,19 45,14 50,14 Z"
            fill={`url(#${idPrefix}-brassPlate)`}
            stroke="#5E3C06"
            strokeWidth="0.8"
          />

          {/* Stepped Inner Ring with Beaded Rim */}
          <circle cx="50" cy="50" r="28" fill={`url(#${idPrefix}-brassPlate)`} stroke="#4D3004" strokeWidth="0.7" />
          <circle cx="50" cy="50" r="24" fill="none" stroke="#FFE9A3" strokeWidth="0.8" strokeDasharray="1.5 2.5" opacity="0.85" />
          <circle cx="50" cy="50" r="18" fill={`url(#${idPrefix}-brassPlate)`} stroke="#4A2F03" strokeWidth="0.6" />

          {/* Four Auspicious Brass Mounting Rivets */}
          <circle cx="50" cy="21" r="3.2" fill={`url(#${idPrefix}-rivet)`} stroke="#422904" strokeWidth="0.5" />
          <circle cx="79" cy="50" r="3.2" fill={`url(#${idPrefix}-rivet)`} stroke="#422904" strokeWidth="0.5" />
          <circle cx="50" cy="79" r="3.2" fill={`url(#${idPrefix}-rivet)`} stroke="#422904" strokeWidth="0.5" />
          <circle cx="21" cy="50" r="3.2" fill={`url(#${idPrefix}-rivet)`} stroke="#422904" strokeWidth="0.5" />

          {/* Striker Anvil Stud (Chot Ki Kheel) where the ring strikes at bottom */}
          <g transform="translate(50, 96)">
            <ellipse cx="0" cy="0" rx="7.5" ry="5.5" fill={`url(#${idPrefix}-anvil)`} stroke="#452B03" strokeWidth="0.6" />
            <ellipse cx="-1.5" cy="-1.5" rx="3.5" ry="2" fill="#FFFCE8" opacity="0.75" />
          </g>

          {/* Central Hinge Mount / Bracket (Boss) */}
          <g transform="translate(50, 44)">
            <path
              d="M -12,-8 C -12,-14 12,-14 12,-8 L 10,8 C 10,11 -10,11 -10,8 Z"
              fill={`url(#${idPrefix}-brassPlate)`}
              stroke="#4A2F03"
              strokeWidth="0.7"
            />
            {/* Pivot Pin Head */}
            <circle cx="0" cy="0" r="5" fill={`url(#${idPrefix}-rivet)`} stroke="#3D2402" strokeWidth="0.5" />
            <circle cx="-1.2" cy="-1.2" r="1.8" fill="#FFFBE6" opacity="0.8" />
          </g>
        </g>

        {/* 3. HEAVY HINGED BRASS RING (Kadi) WITH STRIKER BALL */}
        <g
          className={`knocker-ring-group ${isStriking ? 'ring-striking' : ''}`}
          filter={`url(#${idPrefix}-shadow)`}
        >
          {/* Ring Outer Loop & Hole */}
          <path
            d="M 50,44 
               C 30,44 26,62 26,82 
               C 26,106 38,116 50,116 
               C 62,116 74,106 74,82 
               C 74,62 70,44 50,44 Z
               M 50,56
               C 60,56 62,68 62,82
               C 62,98 56,104 50,104
               C 44,104 38,98 38,82
               C 38,68 40,56 50,56 Z"
            fill={`url(#${idPrefix}-brassRing)`}
            stroke="#4A2F03"
            strokeWidth="0.8"
            fillRule="evenodd"
          />

          {/* Weighted Solid Brass Striker Ball at Ring Bottom */}
          <g transform="translate(50, 102)">
            <ellipse cx="0" cy="0" rx="9" ry="7" fill={`url(#${idPrefix}-brassRing)`} stroke="#4B3004" strokeWidth="0.7" />
            <ellipse cx="-2.2" cy="-2.2" rx="4.2" ry="2.6" fill="#FFFCE6" opacity="0.75" />
          </g>

          {/* Delicate Chiseled Filigree Accents on the Ring */}
          <path
            d="M 31,76 C 30,86 34,96 42,102"
            stroke="#FFECA0"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.65"
          />
          <path
            d="M 69,76 C 70,86 66,96 58,102"
            stroke="#FFECA0"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.65"
          />
        </g>
      </svg>
      <div className="knocker-touch-ripple" />
    </div>
  );
}
