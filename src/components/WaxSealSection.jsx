import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sparkles, RefreshCw } from 'lucide-react';
import './WaxSealSection.css';

const fadeInUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
});

/* ===== PROCEDURAL WEB AUDIO SYNTHESIZER FOR CRISP WAX CRACK & CHIME ===== */
class WaxAudioSynth {
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
      // Audio unsupported or blocked
    }
  }

  playCrack(isMuted) {
    if (isMuted) return;
    if (!this.initialized) this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    try {
      const now = this.ctx.currentTime;

      // 1. High frequency brittle snap noise (fracturing wax)
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.05);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(2800, now);
      bandpass.Q.setValueAtTime(2.2, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.25, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.048);

      noise.connect(bandpass);
      bandpass.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(now);

      // 2. Resonant stamp separation 'pop'
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(190, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.065);

      oscGain.gain.setValueAtTime(0.18, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.065);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.07);
    } catch {
      // Fail silently
    }
  }

  playCelebrationChime(isMuted) {
    if (isMuted) return;
    if (!this.initialized) this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    try {
      const notes = [587.33, 739.99, 880.0, 1174.66]; // D5, F#5, A5, D6
      const now = this.ctx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);

        gain.gain.setValueAtTime(0.0001, now + idx * 0.09);
        gain.gain.linearRampToValueAtTime(0.045, now + idx * 0.09 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.09 + 1.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 1.35);
      });
    } catch {
      // Fail silently
    }
  }
}

const audioSynth = new WaxAudioSynth();

export default function WaxSealSection({ isMuted = false }) {
  const [isBroken, setIsBroken] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false);
  const particlesCanvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);

  /* ===== PARTICLE BURST ANIMATION ===== */
  const spawnBreakParticles = useCallback(() => {
    const canvas = particlesCanvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = 340 * dpr;
    canvas.height = 340 * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const cx = 170;
    const cy = 170;
    const count = 48;
    const newParticles = [];

    const goldColors = ['#F9E7B0', '#E5BA65', '#C5A059', '#FDECB8', '#D4AF37'];
    const waxColors = ['#2D3E32', '#3B4A3F', '#4A6250', '#1F2E23'];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5.5 + 2.0;
      const isGold = Math.random() > 0.4;
      const color = isGold
        ? goldColors[Math.floor(Math.random() * goldColors.length)]
        : waxColors[Math.floor(Math.random() * waxColors.length)];

      newParticles.push({
        x: cx + (Math.random() - 0.5) * 16,
        y: cy + (Math.random() - 0.5) * 16,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.2,
        gravity: 0.16,
        drag: 0.965,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 4.5 + 2.5,
        aspectRatio: isGold ? Math.random() * 0.7 + 0.4 : 1,
        color,
        isGold,
        alpha: 1,
        fadeSpeed: Math.random() * 0.015 + 0.012,
      });
    }

    particlesRef.current = newParticles;

    const render = () => {
      ctx.clearRect(0, 0, 340, 340);
      let alive = 0;

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        if (p.alpha <= 0.02) continue;
        alive++;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.rotation += p.rotSpeed;
        p.alpha = Math.max(0, p.alpha - p.fadeSpeed);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        if (p.isGold && Math.random() > 0.82) {
          // Sparkle star glint
          ctx.beginPath();
          const s = p.size * 1.3;
          ctx.moveTo(0, -s);
          ctx.lineTo(s * 0.3, -s * 0.3);
          ctx.lineTo(s, 0);
          ctx.lineTo(s * 0.3, s * 0.3);
          ctx.lineTo(0, s);
          ctx.lineTo(-s * 0.3, s * 0.3);
          ctx.lineTo(-s, 0);
          ctx.lineTo(-s * 0.3, -s * 0.3);
          ctx.closePath();
          ctx.fill();
        } else {
          // Wax crumb or gold leaf fleck
          const w = p.size;
          const h = p.size * p.aspectRatio;
          ctx.fillRect(-w / 2, -h / 2, w, h);
        }

        ctx.restore();
      }

      if (alive > 0) {
        animFrameRef.current = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, 340, 340);
      }
    };

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(render);
  }, []);

  /* Clean up animation frame on unmount */
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  /* ===== BREAK THE SEAL INTERACTION ===== */
  const handleBreakSeal = () => {
    if (isBroken || isBreaking) return;
    setIsBreaking(true);

    // Audio effects
    audioSynth.playCrack(isMuted);

    // Launch celebratory particle explosion
    spawnBreakParticles();

    // After brief crack fracture transient, open the flaps & play chime
    setTimeout(() => {
      setIsBroken(true);
      setIsBreaking(false);
      audioSynth.playCelebrationChime(isMuted);
    }, 450);
  };

  /* Re-seal helper (lets guest or user replay the experience) */
  const handleReseal = (e) => {
    e.stopPropagation();
    setIsBroken(false);
    setIsBreaking(false);
    const canvas = particlesCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const googleCalUrl =
    'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Rohit+%26+Priyanshi%27s+Wedding&dates=20261121T180000/20261121T233000&details=Wedding+ceremony+of+Rohit+and+Priyanshi.+We+look+forward+to+celebrating+with+you!&location=Bhagwati+Palace%2C+Ashta';

  return (
    <section className="wax-section" id="date-reveal">
      {/* Floral side borders covering 90% of section */}
      <div className="section-vine-border vine-left" aria-hidden="true" />
      <div className="section-vine-border vine-right" aria-hidden="true" />

      <motion.div
        className="wax-content"
        variants={fadeInUp(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <h2 className="section-title-script">Our Forever Begins</h2>

        <div className="section-divider-line">
          <span className="divider-line" />
          <Sparkles size={12} className="divider-sparkle" />
          <span className="divider-line" />
        </div>

        {/* 3D Wax Seal Card Container */}
        <div
          className={`wax-envelope-wrapper ${isBroken ? 'is-opened' : ''} ${
            isBreaking ? 'is-breaking' : ''
          }`}
          onClick={!isBroken ? handleBreakSeal : undefined}
          role={!isBroken ? 'button' : undefined}
          tabIndex={!isBroken ? 0 : undefined}
          onKeyDown={(e) => {
            if (!isBroken && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              handleBreakSeal();
            }
          }}
          aria-label={!isBroken ? 'Tap royal wax seal to reveal wedding date' : 'Wedding date plaque'}
        >
          {/* 1. Underlying Luxury Heart Base Plaque (Revealed) */}
          <div className="wax-heart-base">
            <svg viewBox="0 0 280 270" className="heart-base-svg" preserveAspectRatio="none">
              <defs>
                <linearGradient id="heart-base-paper-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDFBF7" />
                  <stop offset="55%" stopColor="#F6EEE1" />
                  <stop offset="100%" stopColor="#EDE2CF" />
                </linearGradient>
                <filter id="heart-base-shadow" x="-20%" y="-10%" width="140%" height="125%">
                  <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#2D3A30" floodOpacity="0.22" />
                  <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#2D3A30" floodOpacity="0.12" />
                </filter>
                <clipPath id="heart-base-clip">
                  <path d="M 140,42 C 118,14 60,14 30,56 C 6,90 8,140 42,182 C 72,218 115,242 140,256 C 165,242 208,218 238,182 C 272,140 274,90 250,56 C 220,14 162,14 140,42 Z" />
                </clipPath>
              </defs>

              <g filter="url(#heart-base-shadow)">
                {/* Solid Heart Silhouette Base */}
                <path
                  d="M 140,42 C 118,14 60,14 30,56 C 6,90 8,140 42,182 C 72,218 115,242 140,256 C 165,242 208,218 238,182 C 272,140 274,90 250,56 C 220,14 162,14 140,42 Z"
                  fill="url(#heart-base-paper-grad)"
                  stroke="#C5A059"
                  strokeWidth="2.2"
                />

                {/* Inner Stitched Gold Border */}
                <path
                  d="M 140,48 C 119,23 66,23 38,60 C 17,92 18,138 48,177 C 75,210 114,233 140,247 C 166,233 205,210 232,177 C 262,138 263,92 242,60 C 214,23 161,23 140,48 Z"
                  fill="none"
                  stroke="rgba(197, 160, 89, 0.75)"
                  strokeWidth="1.2"
                  strokeDasharray="3.5 2.5"
                />

                {/* Golden Filigree Stars in Lobe Corners */}
                <text x="75" y="76" fill="#C5A059" opacity="0.6" fontSize="13" textAnchor="middle">
                  ✦
                </text>
                <text x="205" y="76" fill="#C5A059" opacity="0.6" fontSize="13" textAnchor="middle">
                  ✦
                </text>
              </g>
            </svg>

            {/* Date Details Revealed in Heart Belly */}
            <div className="wax-date-content">
              <p className="wax-couple-names">Rohit &amp; Priyanshi</p>
              <div className="wax-date-box">
                <p className="wax-date-day">November 21</p>
                <p className="wax-date-year">2026</p>
              </div>
            </div>

            {/* Golden Shimmer Sweep Reflection */}
            <div className="heart-shimmer-sweep" />
          </div>

          {/* 2. Heart-Shaped Folding Flaps (Left & Right Heart Wings) */}
          <div className="wax-heart-flaps-stage" aria-hidden="true">
            <div className="wax-heart-container">
              {/* Left Wing of the Heart Flap */}
              <div className="wax-heart-wing wing-left">
                <svg viewBox="0 0 140 270" className="heart-wing-svg" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="heart-paper-grad-left" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FDFBF7" />
                      <stop offset="60%" stopColor="#F6EEE1" />
                      <stop offset="100%" stopColor="#EDE2CF" />
                    </linearGradient>
                    <filter id="heart-shadow-left" x="-25%" y="-10%" width="150%" height="120%">
                      <feDropShadow dx="-2" dy="4" stdDeviation="4" floodColor="#2D3A30" floodOpacity="0.22" />
                    </filter>
                  </defs>
                  <g filter="url(#heart-shadow-left)">
                    {/* Outer Heart Body */}
                    <path
                      d="M 140,42 C 118,14 60,14 30,56 C 6,90 8,140 42,182 C 72,218 115,242 140,256 Z"
                      fill="url(#heart-paper-grad-left)"
                      stroke="#C5A059"
                      strokeWidth="1.8"
                    />
                    {/* Inner Stitched Gold Border */}
                    <path
                      d="M 137,48 C 117,23 65,23 37,60 C 16,92 18,138 48,177 C 75,210 114,233 137,247"
                      fill="none"
                      stroke="rgba(197, 160, 89, 0.75)"
                      strokeWidth="1.2"
                      strokeDasharray="3.5 2.5"
                    />
                    {/* Golden Filigree Star in Upper Lobe */}
                    <text
                      x="75"
                      y="76"
                      fill="#C5A059"
                      opacity="0.65"
                      fontSize="13"
                      textAnchor="middle"
                    >
                      ✦
                    </text>
                  </g>
                </svg>
              </div>

              {/* Right Wing of the Heart Flap */}
              <div className="wax-heart-wing wing-right">
                <svg viewBox="140 0 140 270" className="heart-wing-svg" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="heart-paper-grad-right" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FDFBF7" />
                      <stop offset="60%" stopColor="#F6EEE1" />
                      <stop offset="100%" stopColor="#EDE2CF" />
                    </linearGradient>
                    <filter id="heart-shadow-right" x="-10%" y="-10%" width="150%" height="120%">
                      <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#2D3A30" floodOpacity="0.22" />
                    </filter>
                  </defs>
                  <g filter="url(#heart-shadow-right)">
                    {/* Outer Heart Body */}
                    <path
                      d="M 140,42 C 162,14 220,14 250,56 C 274,90 272,140 238,182 C 208,218 165,242 140,256 Z"
                      fill="url(#heart-paper-grad-right)"
                      stroke="#C5A059"
                      strokeWidth="1.8"
                    />
                    {/* Inner Stitched Gold Border */}
                    <path
                      d="M 143,48 C 163,23 215,23 243,60 C 264,92 262,138 232,177 C 205,210 166,233 143,247"
                      fill="none"
                      stroke="rgba(197, 160, 89, 0.75)"
                      strokeWidth="1.2"
                      strokeDasharray="3.5 2.5"
                    />
                    {/* Golden Filigree Star in Upper Lobe */}
                    <text
                      x="205"
                      y="76"
                      fill="#C5A059"
                      opacity="0.65"
                      fontSize="13"
                      textAnchor="middle"
                    >
                      ✦
                    </text>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* Horizontal Golden Ribbon Beneath Seal */}
          <div className="wax-ribbon-band" aria-hidden="true">
            <div className="ribbon-gold-thread" />
          </div>

          {/* 3. 3D Embossed Royal Sage & Gold Wax Seal */}
          <div className="wax-seal-anchor">
            {/* Left Seal Half */}
            <div className="wax-seal-half seal-half-left">
              <WaxSealGraphic side="left" />
            </div>

            {/* Right Seal Half */}
            <div className="wax-seal-half seal-half-right">
              <WaxSealGraphic side="right" />
            </div>

            {/* Dynamic Gold Crack Line (Appears during fracture) */}
            {isBreaking && (
              <svg className="wax-crack-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                  d="M50,4 L49,22 L53,38 L47,54 L52,72 L49,86 L50,96"
                  fill="none"
                  stroke="#FFE294"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}

            {/* Breathing Golden Halo (Pulsing hint before broken) */}
            {!isBroken && !isBreaking && (
              <div className="wax-seal-pulse-ring" aria-hidden="true" />
            )}
          </div>

          {/* 4. Canvas for Gold & Wax Particle Burst */}
          <canvas ref={particlesCanvasRef} className="wax-particles-canvas" />
        </div>

        {/* Helper Hint or Celebration Banner */}
        {!isBroken ? (
          <div className="wax-hint-container">
            <p className="wax-hint-text">
              <Sparkles size={14} className="wax-hint-sparkle" />
              <span>Tap royal seal to reveal date</span>
              <Sparkles size={14} className="wax-hint-sparkle" />
            </p>
          </div>
        ) : (
          <div className="wax-revealed-banner">
            <p className="revealed-celebration-title">
              ✨ Date Unlocked! We Can&apos;t Wait to Celebrate with You ✨
            </p>
            <button
              type="button"
              className="wax-reseal-btn"
              onClick={handleReseal}
              title="Seal again to replay animation"
            >
              <RefreshCw size={12} />
              <span>Re-seal Date</span>
            </button>
          </div>
        )}

        {/* Action Button: Google Calendar */}
        <div className="save-date-actions">
          <a
            href={googleCalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="save-date-btn"
          >
            <Calendar size={16} />
            <span>SAVE THE DATE</span>
          </a>
        </div>
      </motion.div>

      {/* Elegant Wavy Section Divider */}
      <div className="wavy-separator">
        <svg viewBox="0 0 400 30" preserveAspectRatio="none" className="wavy-svg">
          <path
            d="M0,15 Q25,5 50,15 T100,15 T150,15 T200,15 T250,15 T300,15 T350,15 T400,15"
            fill="none"
            stroke="rgba(59,74,63,0.12)"
            strokeWidth="1.5"
          />
          <circle cx="100" cy="15" r="2.5" fill="rgba(59,74,63,0.1)" />
          <circle cx="200" cy="15" r="2.5" fill="rgba(59,74,63,0.1)" />
          <circle cx="300" cy="15" r="2.5" fill="rgba(59,74,63,0.1)" />
        </svg>
      </div>
    </section>
  );
}

/* ===== HIGH RESOLUTION 3D EMBOSSED SAGE & GOLD WAX SEAL GRAPHIC ===== */
function WaxSealGraphic({ side }) {
  // Realistic organic melted wax silhouette with bezier lobes
  const clipId = side === 'left' ? 'clip-wax-left' : 'clip-wax-right';

  return (
    <svg
      className="wax-seal-svg"
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Jagged interlocking fracture line for splitting halves */}
        <clipPath id="clip-wax-left">
          <polygon points="0,0 60,0 59,26 64,44 57,64 63,84 60,120 0,120" />
        </clipPath>
        <clipPath id="clip-wax-right">
          <polygon points="60,0 120,0 120,120 60,120 63,84 57,64 64,44 59,26" />
        </clipPath>

        {/* Deep Royal Sage Green Wax Gradient */}
        <radialGradient id="wax-body-grad" cx="42%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#4A6553" />
          <stop offset="45%" stopColor="#354B3C" />
          <stop offset="82%" stopColor="#25352A" />
          <stop offset="100%" stopColor="#18231C" />
        </radialGradient>

        {/* Specular Highlight on Wax Crest */}
        <linearGradient id="wax-sheen-grad" x1="25%" y1="15%" x2="75%" y2="85%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.45)" />
          <stop offset="35%" stopColor="rgba(255, 255, 255, 0.08)" />
          <stop offset="70%" stopColor="rgba(0, 0, 0, 0.25)" />
          <stop offset="100%" stopColor="rgba(0, 0, 0, 0.55)" />
        </linearGradient>

        {/* Embossed Metallic Gold Monogram Gradient */}
        <linearGradient id="gold-foil-grad" x1="20%" y1="10%" x2="80%" y2="90%">
          <stop offset="0%" stopColor="#FFF2C6" />
          <stop offset="25%" stopColor="#E9CA7C" />
          <stop offset="55%" stopColor="#C89D4B" />
          <stop offset="80%" stopColor="#967129" />
          <stop offset="100%" stopColor="#EED288" />
        </linearGradient>

        {/* Soft Drop Shadow for Bevel */}
        <filter id="wax-inner-bevel" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1" floodColor="#000" floodOpacity="0.45" />
        </filter>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        {/* 1. Organic Melted Wax Outer Silhouette */}
        <path
          d="M 60,7
             C 74,6 86,11 96,20
             C 107,30 114,43 114,58
             C 114,73 108,87 97,98
             C 86,108 72,114 57,113
             C 42,113 29,107 19,96
             C 9,86 5,72 6,57
             C 6,42 13,29 24,19
             C 35,9 47,7 60,7 Z"
          fill="url(#wax-body-grad)"
          filter="drop-shadow(0 4px 6px rgba(0,0,0,0.35))"
        />

        {/* 2. Top Wax Specular Glaze */}
        <path
          d="M 60,7
             C 74,6 86,11 96,20
             C 107,30 114,43 114,58
             C 114,73 108,87 97,98
             C 86,108 72,114 57,113
             C 42,113 29,107 19,96
             C 9,86 5,72 6,57
             C 6,42 13,29 24,19
             C 35,9 47,7 60,7 Z"
          fill="url(#wax-sheen-grad)"
        />

        {/* 3. Concentric Inner Stamp Bead Rim */}
        <circle
          cx="60"
          cy="58"
          r="41"
          fill="none"
          stroke="rgba(242, 213, 140, 0.45)"
          strokeWidth="1.6"
          strokeDasharray="2.5 1.5"
          filter="url(#wax-inner-bevel)"
        />

        {/* 4. Debossed Center Matrix Bed */}
        <circle
          cx="60"
          cy="58"
          r="34"
          fill="#27382B"
          stroke="rgba(0, 0, 0, 0.4)"
          strokeWidth="1.2"
        />

        {/* 5. Delicate Laurel Ring Decor */}
        <circle
          cx="60"
          cy="58"
          r="30"
          fill="none"
          stroke="url(#gold-foil-grad)"
          strokeWidth="0.8"
          opacity="0.65"
        />

        {/* 6. Embossed Couple Monogram & Heart */}
        <g filter="url(#wax-inner-bevel)">
          {/* Monogram Text: R ♡ P */}
          <text
            x="39"
            y="64"
            fill="url(#gold-foil-grad)"
            fontFamily="'Cormorant Garamond', Georgia, serif"
            fontSize="21"
            fontWeight="700"
            textAnchor="middle"
            letterSpacing="0.5"
          >
            R
          </text>

          {/* Center Heart Emblem */}
          <path
            d="M 60,63 L 58.5,61.4 C 54.5,57.8 52,55.5 52,52.8 C 52,50.7 53.6,49.1 55.7,49.1 C 56.9,49.1 58.1,49.7 58.8,50.6 L 60,51.8 L 61.2,50.6 C 61.9,49.7 63.1,49.1 64.3,49.1 C 66.4,49.1 68,50.7 68,52.8 C 68,55.5 65.5,57.8 61.5,61.4 Z"
            fill="url(#gold-foil-grad)"
            opacity="0.95"
          />

          <text
            x="81"
            y="64"
            fill="url(#gold-foil-grad)"
            fontFamily="'Cormorant Garamond', Georgia, serif"
            fontSize="21"
            fontWeight="700"
            textAnchor="middle"
            letterSpacing="0.5"
          >
            P
          </text>

          {/* Micro Subtitle in Seal Stamp */}
          <text
            x="60"
            y="74"
            fill="url(#gold-foil-grad)"
            fontFamily="'Montserrat', sans-serif"
            fontSize="5.2"
            fontWeight="600"
            textAnchor="middle"
            letterSpacing="2.2"
            opacity="0.85"
          >
            FOREVER
          </text>
        </g>
      </g>
    </svg>
  );
}
