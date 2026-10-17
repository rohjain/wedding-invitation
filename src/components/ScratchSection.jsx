import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sparkles } from 'lucide-react';

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

/* ===== PROCEDURAL WEB AUDIO SYNTHESIZER FOR ASMR SCRATCH & CHIME ===== */
class ScratchAudioSynth {
  constructor() {
    this.ctx = null;
    this.noiseNode = null;
    this.filterNode = null;
    this.gainNode = null;
    this.isPlaying = false;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      // Procedural noise buffer with gentle pink-filter curve
      const bufferSize = Math.floor(this.ctx.sampleRate * 1.5);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        lastOut = (lastOut + 0.03 * white) / 1.03;
        data[i] = lastOut * 3.2;
      }
      this.noiseBuffer = buffer;
      this.initialized = true;
    } catch {
      // Audio unsupported or blocked
    }
  }

  startScratch(isMuted) {
    if (isMuted) return;
    if (!this.initialized) this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    try {
      if (!this.isPlaying && this.noiseBuffer) {
        this.noiseNode = this.ctx.createBufferSource();
        this.noiseNode.buffer = this.noiseBuffer;
        this.noiseNode.loop = true;

        this.filterNode = this.ctx.createBiquadFilter();
        this.filterNode.type = 'bandpass';
        this.filterNode.frequency.setValueAtTime(2800, this.ctx.currentTime);
        this.filterNode.Q.setValueAtTime(1.6, this.ctx.currentTime);

        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);

        this.noiseNode.connect(this.filterNode);
        this.filterNode.connect(this.gainNode);
        this.gainNode.connect(this.ctx.destination);

        this.noiseNode.start(0);
        this.isPlaying = true;
      }
    } catch {
      // Fail silently
    }
  }

  updateVelocity(velocity, isMuted) {
    if (isMuted || !this.isPlaying || !this.gainNode || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const targetGain = Math.min(0.075, Math.max(0.012, velocity * 0.0035));
      const targetFreq = Math.min(3400, 2400 + velocity * 12);
      this.gainNode.gain.cancelScheduledValues(now);
      this.gainNode.gain.linearRampToValueAtTime(targetGain, now + 0.04);
      this.filterNode.frequency.cancelScheduledValues(now);
      this.filterNode.frequency.linearRampToValueAtTime(targetFreq, now + 0.04);
    } catch {
      // Fail silently
    }
  }

  stopScratch() {
    if (!this.isPlaying || !this.gainNode || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      this.gainNode.gain.cancelScheduledValues(now);
      this.gainNode.gain.linearRampToValueAtTime(0.0001, now + 0.06);
      setTimeout(() => {
        if (this.isPlaying && this.noiseNode) {
          try {
            this.noiseNode.stop();
            this.noiseNode.disconnect();
          } catch {}
          this.isPlaying = false;
        }
      }, 70);
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
      notes.forEach((f, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + idx * 0.09);

        gain.gain.setValueAtTime(0.0001, now + idx * 0.09);
        gain.gain.linearRampToValueAtTime(0.04, now + idx * 0.09 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.09 + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 1.3);
      });
    } catch {
      // Fail silently
    }
  }
}

const audioSynth = new ScratchAudioSynth();

export default function ScratchSection({ isMuted = false }) {
  const scratchCanvasRef = useRef(null);
  const particlesCanvasRef = useRef(null);
  const cardWrapperRef = useRef(null);

  const [isRevealed, setIsRevealed] = useState(false);
  const [hasStartedScratching, setHasStartedScratching] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  // Desktop 3D Coin Cursor state
  const [coinPos, setCoinPos] = useState({ x: 0, y: 0 });
  const [showCoin, setShowCoin] = useState(false);

  // Physics & Particle references
  const shavingsRef = useRef([]);
  const animFrameRef = useRef(null);
  const lastPosRef = useRef(null);
  const lastTimeRef = useRef(0);
  const totalPixelsCheckedRef = useRef(0);
  const checkThrottleRef = useRef(0);

  /* ===== HEART PATH GEOMETRY ===== */
  const createHeartPath = useCallback((ctx, cx, cy, size) => {
    ctx.beginPath();
    ctx.moveTo(cx, cy + size * 0.72);
    ctx.bezierCurveTo(
      cx - size * 1.35, cy - size * 0.15,
      cx - size * 0.65, cy - size * 0.95,
      cx, cy - size * 0.38
    );
    ctx.bezierCurveTo(
      cx + size * 0.65, cy - size * 0.95,
      cx + size * 1.35, cy - size * 0.15,
      cx, cy + size * 0.72
    );
    ctx.closePath();
  }, []);

  /* ===== PAINT REALISTIC FOIL OVERLAY ===== */
  const initFoilCanvas = useCallback(() => {
    const canvas = scratchCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = 320;
    const height = 320;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const cx = 160;
    const cy = 152;
    const size = 135;

    ctx.clearRect(0, 0, width, height);

    // 1. Multi-tone Brushed Metallic Foil Gradient
    createHeartPath(ctx, cx, cy, size);
    const grad = ctx.createLinearGradient(cx - size, cy - size, cx + size, cy + size);
    grad.addColorStop(0.0, '#E8CA82'); // Bright champagne gold
    grad.addColorStop(0.18, '#C49F56'); // Warm burnished gold
    grad.addColorStop(0.36, '#8DA792'); // Metallic sage highlight
    grad.addColorStop(0.52, '#556E5A'); // Deep royal sage metallic
    grad.addColorStop(0.68, '#C9A35B'); // Golden reflection
    grad.addColorStop(0.84, '#FBE8B3'); // Specular glint
    grad.addColorStop(1.0, '#75907B'); // Rich sage foil
    ctx.fillStyle = grad;
    ctx.fill();

    // 2. Foil Micro-Grain and Brushed Texture
    ctx.save();
    createHeartPath(ctx, cx, cy, size);
    ctx.clip();

    // Subtle brushed diagonal lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let i = -size * 2; i < size * 2; i += 5) {
      ctx.beginPath();
      ctx.moveTo(cx + i, cy - size * 1.2);
      ctx.lineTo(cx + i + size * 1.2, cy + size * 1.2);
      ctx.stroke();
    }

    // 950 micro-metallic speckles / foil grain
    for (let i = 0; i < 950; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * size * 1.05;
      const px = cx + Math.cos(angle) * radius;
      const py = cy + Math.sin(angle) * radius * 0.8;
      const dotSize = Math.random() * 1.8 + 0.4;
      const alpha = Math.random() * 0.45 + 0.15;
      const isGold = Math.random() > 0.45;
      ctx.fillStyle = isGold
        ? `rgba(255, 235, 175, ${alpha})`
        : `rgba(255, 255, 255, ${alpha * 0.9})`;
      ctx.fillRect(px, py, dotSize, dotSize);
    }

    // Soft 3D Specular Sheen
    const specular = ctx.createRadialGradient(cx - 35, cy - 35, 10, cx - 20, cy - 20, size * 0.9);
    specular.addColorStop(0, 'rgba(255, 255, 255, 0.32)');
    specular.addColorStop(0.5, 'rgba(255, 255, 255, 0.06)');
    specular.addColorStop(1, 'rgba(0, 0, 0, 0.15)');
    ctx.fillStyle = specular;
    ctx.fill();
    ctx.restore();

    // 3. Embossed 3D Bevel Rim
    createHeartPath(ctx, cx, cy, size);
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 3.5;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.32)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 2;
    ctx.stroke();
    ctx.shadowColor = 'transparent';

    // Inner highlight stroke
    createHeartPath(ctx, cx, cy, size - 4);
    ctx.strokeStyle = 'rgba(255, 248, 220, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 4. Stamped Gold Medallion & Scratch Prompt
    ctx.save();
    createHeartPath(ctx, cx, cy - 2, size * 0.46);
    ctx.strokeStyle = 'rgba(248, 228, 170, 0.65)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Star icon in medallion center
    ctx.font = '16px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨', cx, cy - 14);

    // Stamped gilded text
    ctx.fillStyle = '#FFF5D6';
    ctx.shadowColor = 'rgba(35, 48, 38, 0.85)';
    ctx.shadowOffsetY = 1;
    ctx.shadowBlur = 3;
    ctx.font = '600 11px Montserrat, sans-serif';
    ctx.letterSpacing = '1.8px';
    ctx.fillText('✦ SCRATCH HERE ✦', cx, cy + 12);

    ctx.font = '400 8.5px Montserrat, sans-serif';
    ctx.fillStyle = 'rgba(255, 245, 214, 0.9)';
    ctx.fillText('WITH COIN TO REVEAL', cx, cy + 28);
    ctx.restore();
  }, [createHeartPath]);

  /* ===== PARTICLE PHYSICS & SHAVINGS ===== */
  const spawnShavings = useCallback((x, y, dx, dy, count = 2) => {
    if (shavingsRef.current.length > 140) return;
    const baseAngle = Math.atan2(dy, dx);

    for (let i = 0; i < count; i++) {
      const spreadAngle = baseAngle + (Math.random() - 0.5) * 1.6 + Math.PI / 2;
      const speed = Math.random() * 3.2 + 1.2;
      const isCurled = Math.random() > 0.4;
      shavingsRef.current.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 8,
        vx: Math.cos(spreadAngle) * speed + (Math.random() - 0.5) * 1.5,
        vy: Math.sin(spreadAngle) * speed - (Math.random() * 2.2 + 1.2), // pop upward
        gravity: 0.32 + Math.random() * 0.12,
        friction: 0.96,
        size: isCurled ? Math.random() * 3.5 + 2.5 : Math.random() * 2.5 + 1.2,
        length: isCurled ? Math.random() * 7 + 4 : 0,
        isCurled,
        color: Math.random() > 0.35
          ? (Math.random() > 0.5 ? '#FBE8B3' : '#D4AF37')
          : '#728B77',
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.35,
        life: 1.0,
        decay: Math.random() * 0.02 + 0.02,
      });
    }
  }, []);

  const triggerCelebrationConfetti = useCallback((cx, cy) => {
    for (let i = 0; i < 60; i++) {
      const angle = (i / 60) * Math.PI * 2 + (Math.random() - 0.5) * 0.35;
      const speed = Math.random() * 6.5 + 2.5;
      shavingsRef.current.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.0,
        gravity: 0.22,
        friction: 0.97,
        size: Math.random() * 4 + 2,
        length: Math.random() * 10 + 4,
        isCurled: Math.random() > 0.35,
        color: ['#FFDF73', '#E6C265', '#D4AF37', '#FFFFFF', '#96B29C', '#F9E8B6'][Math.floor(Math.random() * 6)],
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.4,
        life: 1.0,
        decay: Math.random() * 0.012 + 0.012,
      });
    }
  }, []);

  /* ===== PARTICLE RENDER LOOP ===== */
  useEffect(() => {
    const pCanvas = particlesCanvasRef.current;
    if (!pCanvas) return;
    const width = 360;
    const height = 360;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    pCanvas.width = width * dpr;
    pCanvas.height = height * dpr;

    let isRunning = true;
    const loop = () => {
      if (!isRunning) return;
      const ctx = pCanvas.getContext('2d');
      ctx.clearRect(0, 0, pCanvas.width, pCanvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      const particles = shavingsRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= p.friction;
        p.vy = p.vy * p.friction + p.gravity;
        // Particle canvas has 20px padding offset from card
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.rotSpeed;
        p.life -= p.decay;

        if (p.life <= 0 || p.y > height + 20) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x + 20, p.y + 20);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, p.life);

        // 3D tumbling effect
        const scaleX = Math.abs(Math.cos(p.rot * 1.5));
        ctx.scale(scaleX, 1);

        ctx.fillStyle = p.color;
        if (p.isCurled) {
          ctx.beginPath();
          ctx.ellipse(0, 0, p.length / 2, p.size / 2, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        }
        ctx.restore();
      }

      ctx.restore();
      animFrameRef.current = requestAnimationFrame(loop);
    };

    loop();
    return () => {
      isRunning = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Initialize foil canvas on mount
  useEffect(() => {
    initFoilCanvas();
  }, [initFoilCanvas]);

  /* ===== SCRATCH PROGRESS CALCULATION ===== */
  const checkScratchPercentage = useCallback(() => {
    const canvas = scratchCanvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Fast subsampled grid check inside heart area
    // cx=160, cy=152, rx=90, ry=80
    const sampleBox = {
      x: Math.floor(70 * dpr),
      y: Math.floor(70 * dpr),
      w: Math.floor(180 * dpr),
      h: Math.floor(160 * dpr),
    };

    try {
      const imgData = ctx.getImageData(sampleBox.x, sampleBox.y, sampleBox.w, sampleBox.h);
      const data = imgData.data;
      let total = 0;
      let cleared = 0;

      // Sample every 4th pixel for high speed
      for (let i = 3; i < data.length; i += 16) {
        total++;
        if (data[i] < 45) {
          cleared++;
        }
      }

      const ratio = cleared / total;
      if (ratio > 0.42) {
        setIsRevealed(true);
        audioSynth.playCelebrationChime(isMuted);
        triggerCelebrationConfetti(160, 152);
      }
    } catch {
      // Fallback safe
    }
  }, [isRevealed, isMuted, triggerCelebrationConfetti]);

  /* ===== SCRATCH PHYSICS INTERPOLATION ===== */
  const performScratch = useCallback((clientX, clientY) => {
    const canvas = scratchCanvasRef.current;
    if (!canvas || isRevealed) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const currX = (clientX - rect.left) * (320 / rect.width);
    const currY = (clientY - rect.top) * (320 / rect.height);

    const now = performance.now();
    const dt = Math.max(1, now - (lastTimeRef.current || now));
    const last = lastPosRef.current || { x: currX, y: currY };

    const dx = currX - last.x;
    const dy = currY - last.y;
    const dist = Math.hypot(dx, dy);
    const velocity = (dist / dt) * 10;

    audioSynth.updateVelocity(velocity, isMuted);

    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.globalCompositeOperation = 'destination-out';

    // Step every 3px along stroke vector
    const step = 3;
    const steps = Math.max(1, Math.floor(dist / step));

    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      const x = last.x + dx * t;
      const y = last.y + dy * t;

      // Main smooth core circle
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();

      // Organic rough chipped foil edge: 4-6 micro-nicks
      for (let k = 0; k < 5; k++) {
        const nickAngle = Math.random() * Math.PI * 2;
        const nickDist = 16 + Math.random() * 8;
        const nickRadius = 3 + Math.random() * 4.5;
        ctx.beginPath();
        ctx.arc(
          x + Math.cos(nickAngle) * nickDist,
          y + Math.sin(nickAngle) * nickDist,
          nickRadius,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      // Dynamic Shavings & Flakes
      if (Math.random() < 0.45) {
        spawnShavings(x, y, dx, dy, 2);
      }
    }

    ctx.restore();

    lastPosRef.current = { x: currX, y: currY };
    lastTimeRef.current = now;

    // Throttle progress check to every ~180ms
    checkThrottleRef.current++;
    if (checkThrottleRef.current % 12 === 0) {
      checkScratchPercentage();
    }
  }, [isRevealed, isMuted, spawnShavings, checkScratchPercentage]);

  /* ===== MOUSE & TOUCH EVENT HANDLERS ===== */
  const handleMouseDown = (e) => {
    setIsDrawing(true);
    setHasStartedScratching(true);
    lastPosRef.current = null;
    audioSynth.startScratch(isMuted);
    performScratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    if (cardWrapperRef.current) {
      const rect = cardWrapperRef.current.getBoundingClientRect();
      setCoinPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }

    if (!isDrawing) return;
    performScratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    lastPosRef.current = null;
    audioSynth.stopScratch();
    checkScratchPercentage();
  };

  const handleMouseLeave = () => {
    setIsDrawing(false);
    setShowCoin(false);
    lastPosRef.current = null;
    audioSynth.stopScratch();
  };

  const handleMouseEnter = () => {
    setShowCoin(true);
  };

  const handleTouchStart = (e) => {
    setIsDrawing(true);
    setHasStartedScratching(true);
    lastPosRef.current = null;
    audioSynth.startScratch(isMuted);
    if (e.touches[0]) {
      performScratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDrawing) return;
    if (e.touches[0]) {
      performScratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
    lastPosRef.current = null;
    audioSynth.stopScratch();
    checkScratchPercentage();
  };

  /* ===== INSTANT REVEAL FALLBACK ===== */
  const handleQuickReveal = () => {
    if (isRevealed) return;
    setIsRevealed(true);
    setHasStartedScratching(true);
    audioSynth.playCelebrationChime(isMuted);
    triggerCelebrationConfetti(160, 152);
  };

  const googleCalUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Rohit+%26+Priya%27s+Wedding&dates=20261121T180000/20261121T233000&details=Wedding+ceremony+of+Rohit+and+Priya.+We+look+forward+to+celebrating+with+you!&location=Grand+Ballroom%2C+Jaipur%2C+Rajasthan';

  return (
    <section className="scratch-section" id="scratch">
      <motion.div
        className="scratch-content"
        variants={fadeInUp(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <h2 className="section-title-script">Scratch to Reveal</h2>
        
        <div className="section-divider-line">
          <span className="divider-line" />
          <Sparkles size={12} className="divider-sparkle" />
          <span className="divider-line" />
        </div>

        {/* Scratch Card Interactive Stage */}
        <div
          className={`scratch-card-wrapper ${isRevealed ? 'is-revealed' : ''}`}
          ref={cardWrapperRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* 1. Physical Luxury Cardstock Plaque Underneath */}
          <div className="scratch-card-base">
            <div className="card-filigree top-left">✦</div>
            <div className="card-filigree top-right">✦</div>
            <div className="card-filigree bottom-left">✦</div>
            <div className="card-filigree bottom-right">✦</div>
            <div className="card-inner-border" />

            {/* Header on physical cardstock */}
            <div className="card-header-badge">
              <span className="card-header-line" />
              <span className="card-header-text">SAVE THE DATE</span>
              <span className="card-header-line" />
            </div>

            {/* Secret Date Revealed Underneath Heart Foil */}
            <div className="scratch-hidden-content">
              <p className="scratch-couple-names">Rohit &amp; Priya</p>
              <div className="scratch-date-box">
                <p className="scratch-date">November 21</p>
                <p className="scratch-year">2026</p>
              </div>
            </div>

            {/* Footer on physical cardstock */}
            <div className="card-footer-badge">
              <p className="scratch-day-highlight">SATURDAY • JAIPUR</p>
            </div>

            {/* Foil shimmer reflection sweep when revealed */}
            <div className="card-shimmer-sweep" />
          </div>

          {/* 2. Realistic Scratch-Off Foil Canvas */}
          <canvas
            ref={scratchCanvasRef}
            className={`scratch-foil-canvas ${isRevealed ? 'revealed-fade' : ''}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            onTouchMove={handleTouchMove}
          />

          {/* 3. Flying Foil Shavings & Dust Particles Overlay */}
          <canvas
            ref={particlesCanvasRef}
            className="scratch-particles-canvas"
          />

          {/* 4. Desktop 3D Gold Wedding Coin Cursor */}
          {showCoin && !isRevealed && (
            <div
              className={`scratch-coin-cursor ${isDrawing ? 'scratching' : ''}`}
              style={{
                left: `${coinPos.x}px`,
                top: `${coinPos.y}px`,
              }}
            >
              <div className="coin-disc">
                <div className="coin-rim" />
                <div className="coin-core">
                  <span className="coin-monogram">🪙</span>
                </div>
              </div>
              <div className="coin-contact-shadow" />
            </div>
          )}
        </div>

        {/* Helper Hint & Quick Reveal Button */}
        {!isRevealed ? (
          <div className="scratch-interaction-hints">
            <p className={`scratch-helper-text ${hasStartedScratching ? 'faded' : ''}`}>
              <span className="coin-emoji">🪙</span> Drag coin or finger to scratch off foil
            </p>
            <button
              className="quick-reveal-link"
              onClick={handleQuickReveal}
              type="button"
            >
              Or tap here to reveal date instantly
            </button>
          </div>
        ) : (
          <div className="scratch-revealed-banner">
            <p className="revealed-celebration-title">
              ✨ Date Unlocked! We Can&apos;t Wait to Celebrate with You ✨
            </p>
          </div>
        )}

        {/* Action Button: Save the Date */}
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
