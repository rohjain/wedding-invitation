import { useEffect, useRef, useCallback } from 'react';
import './PetalShower.css';

/* ===== ROSE PALETTES ===== */
const ROSE_VARIANTS = [
  {
    // Royal Deep Ruby
    colorDark: '#780016',
    colorMid: '#B71C1C',
    colorLight: '#D32F2F',
    highlightColor: 'rgba(255, 138, 128, 0.45)',
  },
  {
    // Velvety Crimson Pink
    colorDark: '#880E4F',
    colorMid: '#C2185B',
    colorLight: '#E91E63',
    highlightColor: 'rgba(248, 187, 208, 0.5)',
  },
  {
    // Soft Romantic Rose
    colorDark: '#9C27B0',
    colorMid: '#D81B60',
    colorLight: '#F06292',
    highlightColor: 'rgba(255, 220, 235, 0.55)',
  },
];

/* ===== MARIGOLD (GENDA PHOOL) PALETTES ===== */
const MARIGOLD_VARIANTS = [
  {
    // Vibrant Saffron Orange
    colorDark: '#D84315',
    colorMid: '#FF6F00',
    colorLight: '#FFB300',
    veinColor: 'rgba(216, 67, 21, 0.4)',
  },
  {
    // Golden Sunburst
    colorDark: '#E65100',
    colorMid: '#FF8F00',
    colorLight: '#FFCA28',
    veinColor: 'rgba(230, 81, 0, 0.35)',
  },
  {
    // Radiant Festive Marigold
    colorDark: '#BF360C',
    colorMid: '#FFA000',
    colorLight: '#FFE082',
    veinColor: 'rgba(191, 54, 12, 0.45)',
  },
];

/* ===== GOLD CONFETTI PALETTE ===== */
const GOLD_COLORS = ['#FFF3B0', '#FFD700', '#F5D77F', '#E5B842', '#C5A059', '#D4AF37'];

function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

function createParticle(width, height, isSpawnAtTap = false, tapX = 0, tapY = 0) {
  // Distribution: ~38% Rose, ~40% Marigold, ~14% Gold Flake, ~8% Sparkle
  const rand = Math.random();
  let type;
  if (rand < 0.38) {
    type = 'rose';
  } else if (rand < 0.78) {
    type = 'marigold';
  } else if (rand < 0.92) {
    type = 'gold-flake';
  } else {
    type = 'sparkle';
  }

  // Z-depth layer: 0.65 (distant/slow) to 1.35 (foreground/dramatic)
  const z = randomRange(0.65, 1.35);

  let pWidth, pLength;
  if (type === 'rose') {
    pWidth = randomRange(13, 22) * z;
    pLength = randomRange(17, 28) * z;
  } else if (type === 'marigold') {
    pWidth = randomRange(9, 16) * z;
    pLength = randomRange(16, 26) * z;
  } else if (type === 'gold-flake') {
    pWidth = randomRange(5, 9) * z;
    pLength = randomRange(7, 13) * z;
  } else {
    // sparkle
    pWidth = randomRange(3, 6) * z;
    pLength = pWidth;
  }

  // Position
  let x, y;
  if (isSpawnAtTap) {
    x = tapX + randomRange(-35, 35);
    y = tapY + randomRange(-30, 30);
  } else {
    x = randomRange(0, width);
    // Allow slight lead-in so some petals are immediately visible as doors crack open
    y = randomRange(-120, 20);
  }

  // Target fall speed
  let targetSpeedY;
  if (type === 'sparkle') {
    targetSpeedY = randomRange(0.5, 1.2) * z;
  } else if (type === 'gold-flake') {
    targetSpeedY = randomRange(1.6, 2.8) * z;
  } else {
    targetSpeedY = randomRange(1.2, 2.4) * z;
  }

  const speedY = isSpawnAtTap ? randomRange(-2.2, 0.4) : targetSpeedY;

  const roseVariant = ROSE_VARIANTS[Math.floor(Math.random() * ROSE_VARIANTS.length)];
  const marigoldVariant = MARIGOLD_VARIANTS[Math.floor(Math.random() * MARIGOLD_VARIANTS.length)];
  const goldColor = GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)];

  return {
    type,
    x,
    y,
    z,
    width: pWidth,
    length: pLength,
    speedY,
    targetSpeedY,
    speedX: isSpawnAtTap ? randomRange(-2.6, 2.6) : 0,
    swayPhase: randomRange(0, Math.PI * 2),
    swaySpeed: randomRange(0.018, 0.045),
    swayAmp: randomRange(1.4, 3.4) * z,
    rotation: randomRange(0, Math.PI * 2),
    rotSpeed: randomRange(-0.025, 0.025),
    flip: randomRange(0, Math.PI * 2),
    flipSpeed: type === 'gold-flake' ? randomRange(0.06, 0.14) : randomRange(0.02, 0.05),
    tilt: randomRange(0, Math.PI * 2),
    tiltSpeed: randomRange(0.015, 0.04),
    opacity: randomRange(0.72, 0.98),
    twinklePhase: randomRange(0, Math.PI * 2),
    roseVariant,
    marigoldVariant,
    goldColor,
  };
}

/* ===== CANVAS DRAW HELPERS ===== */
function drawRosePetal(ctx, p) {
  const w = p.width;
  const l = p.length;
  const v = p.roseVariant;

  // Rich radial gradient simulating curved velvety petal
  const grad = ctx.createRadialGradient(-w * 0.12, -l * 0.1, w * 0.1, 0, 0, Math.max(w, l) * 0.6);
  grad.addColorStop(0, v.colorLight);
  grad.addColorStop(0.55, v.colorMid);
  grad.addColorStop(1, v.colorDark);

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(0, l * 0.48);
  // Left curve to apex
  ctx.bezierCurveTo(-w * 0.55, l * 0.22, -w * 0.62, -l * 0.22, -w * 0.22, -l * 0.46);
  // Center gentle notch at petal top
  ctx.quadraticCurveTo(0, -l * 0.38, w * 0.22, -l * 0.46);
  // Right curve back to base
  ctx.bezierCurveTo(w * 0.62, -l * 0.22, w * 0.55, l * 0.22, 0, l * 0.48);
  ctx.closePath();
  ctx.fill();

  // Subtle curved highlight line on petal shoulder
  ctx.beginPath();
  ctx.moveTo(-w * 0.15, l * 0.25);
  ctx.quadraticCurveTo(-w * 0.25, -l * 0.05, -w * 0.1, -l * 0.28);
  ctx.strokeStyle = v.highlightColor;
  ctx.lineWidth = Math.max(0.75, w * 0.07);
  ctx.stroke();
}

function drawMarigoldPetal(ctx, p) {
  const w = p.width;
  const l = p.length;
  const v = p.marigoldVariant;

  // Saffron base transitioning to golden yellow tip
  const grad = ctx.createLinearGradient(0, l * 0.48, 0, -l * 0.48);
  grad.addColorStop(0, v.colorDark);
  grad.addColorStop(0.5, v.colorMid);
  grad.addColorStop(1, v.colorLight);

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(0, l * 0.48);
  // Left flare
  ctx.bezierCurveTo(-w * 0.32, l * 0.15, -w * 0.52, -l * 0.12, -w * 0.45, -l * 0.38);
  // Scalloped 3-pointed tip of marigold floret
  ctx.quadraticCurveTo(-w * 0.25, -l * 0.48, -w * 0.14, -l * 0.42);
  ctx.quadraticCurveTo(0, -l * 0.52, w * 0.14, -l * 0.42);
  ctx.quadraticCurveTo(w * 0.25, -l * 0.48, w * 0.45, -l * 0.38);
  // Right flare back to base
  ctx.bezierCurveTo(w * 0.52, -l * 0.12, w * 0.32, l * 0.15, 0, l * 0.48);
  ctx.closePath();
  ctx.fill();

  // Fine delicate floret vein
  ctx.beginPath();
  ctx.moveTo(0, l * 0.38);
  ctx.quadraticCurveTo(w * 0.06, 0, 0, -l * 0.32);
  ctx.strokeStyle = v.veinColor;
  ctx.lineWidth = Math.max(0.65, w * 0.06);
  ctx.stroke();
}

function drawGoldFlake(ctx, p) {
  const w = p.width;
  const l = p.length;

  const grad = ctx.createLinearGradient(-w * 0.5, -l * 0.5, w * 0.5, l * 0.5);
  grad.addColorStop(0, '#FFFBE6');
  grad.addColorStop(0.35, p.goldColor);
  grad.addColorStop(0.8, '#D4AF37');
  grad.addColorStop(1, '#8A6715');

  ctx.fillStyle = grad;
  ctx.beginPath();
  // Rounded foil flake
  ctx.rect(-w * 0.5, -l * 0.5, w, l);
  ctx.fill();

  // Specular sheen when catching light during 3D tumble
  const sheenAlpha = Math.abs(Math.sin(p.flip * 2)) * 0.45;
  if (sheenAlpha > 0.05) {
    ctx.fillStyle = `rgba(255, 255, 255, ${sheenAlpha})`;
    ctx.fillRect(-w * 0.25, -l * 0.5, w * 0.25, l);
  }
}

function drawSparkle(ctx, p) {
  const s = p.width;
  const pulse = 0.75 + 0.35 * Math.sin(p.twinklePhase);
  const size = s * pulse;

  // Luminous radial glow
  const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 2.5);
  glow.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
  glow.addColorStop(0.3, 'rgba(255, 224, 130, 0.65)');
  glow.addColorStop(0.7, 'rgba(212, 175, 55, 0.25)');
  glow.addColorStop(1, 'rgba(212, 175, 55, 0)');

  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, 0, size * 2.5, 0, Math.PI * 2);
  ctx.fill();

  // 4-point golden star glint
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.moveTo(0, -size * 1.6);
  ctx.quadraticCurveTo(0, 0, size * 0.28, 0);
  ctx.quadraticCurveTo(0, 0, 0, size * 1.6);
  ctx.quadraticCurveTo(0, 0, -size * 0.28, 0);
  ctx.quadraticCurveTo(0, 0, 0, -size * 1.6);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(-size * 1.6, 0);
  ctx.quadraticCurveTo(0, 0, 0, size * 0.28);
  ctx.quadraticCurveTo(0, 0, size * 1.6, 0);
  ctx.quadraticCurveTo(0, 0, -size * 0.28, 0);
  ctx.quadraticCurveTo(0, 0, -size * 1.6, 0);
  ctx.fill();
}

export default function PetalShower({
  active = false,
  triggerKey = 0,
  tapCoords = null,
  maxCascadeTime = 14000,
}) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);
  const isCascadeActiveRef = useRef(false);
  const spawnTimerRef = useRef(null);
  const cascadeEndTimeRef = useRef(0);

  // Spawns a batch of particles from the top
  const spawnTopBatch = useCallback((count = 15) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || window.innerWidth;
    const h = rect.height || window.innerHeight;

    for (let i = 0; i < count; i++) {
      particlesRef.current.push(createParticle(w, h, false));
    }
  }, []);

  // Spawns a blossom burst at coordinates (e.g. tap)
  const spawnTapBurst = useCallback((tapX, tapY, count = 22) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || window.innerWidth;
    const h = rect.height || window.innerHeight;

    for (let i = 0; i < count; i++) {
      particlesRef.current.push(createParticle(w, h, true, tapX, tapY));
    }
  }, []);

  // Handle active state changes (e.g. doors parting and curtains unfolding)
  useEffect(() => {
    if (!active) {
      particlesRef.current = [];
      isCascadeActiveRef.current = false;
      return;
    }

    // Grand opening cascade starts!
    isCascadeActiveRef.current = true;
    cascadeEndTimeRef.current = Date.now() + maxCascadeTime;

    // Initial batch just above and entering the top of screen
    spawnTopBatch(42);

    // Continuous shower stream for the opening reveal duration
    if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
    spawnTimerRef.current = setInterval(() => {
      if (Date.now() < cascadeEndTimeRef.current) {
        // Active cascade: feed new petals smoothly
        if (particlesRef.current.length < 90) {
          spawnTopBatch(3);
        }
      } else {
        // Cascade finished -> ambient mode
        isCascadeActiveRef.current = false;
      }
    }, 140);

    return () => {
      if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
    };
  }, [active, maxCascadeTime, spawnTopBatch]);

  // Handle manual trigger (e.g. user clicked "Shower Petals" button)
  useEffect(() => {
    if (triggerKey > 0 && active) {
      isCascadeActiveRef.current = true;
      cascadeEndTimeRef.current = Date.now() + 8000;
      spawnTopBatch(32);
    }
  }, [triggerKey, active, spawnTopBatch]);

  // Handle tap coordinate trigger (e.g. tapped on hero section)
  useEffect(() => {
    if (tapCoords && active) {
      spawnTapBurst(tapCoords.x, tapCoords.y, 20);
      // Also sprinkle a few from above for delight
      spawnTopBatch(14);
    }
  }, [tapCoords, active, spawnTapBurst, spawnTopBatch]);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let running = true;

    // Resize handler
    const updateSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = Math.round(rect.width) || Math.min(window.innerWidth, 500);
      const h = Math.round(rect.height) || window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    let lastTime = performance.now();

    const render = (time) => {
      if (!running) return;

      const dt = Math.min((time - lastTime) / 16.67, 2.5); // normalized to 60fps frame
      lastTime = time;

      const rect = canvas.getBoundingClientRect();
      const width = rect.width || 500;
      const height = rect.height || window.innerHeight;

      // Clean full canvas clear across physical pixels
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      const particles = particlesRef.current;
      const isCascade = isCascadeActiveRef.current;
      const ambientTargetCount = 15;

      // Subtle room breeze swaying softly back and forth
      const ambientWind = Math.sin(time * 0.0008) * 0.35;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Physics step
        p.swayPhase += p.swaySpeed * dt;
        p.rotation += p.rotSpeed * dt;
        p.flip += p.flipSpeed * dt;
        p.tilt += p.tiltSpeed * dt;
        p.twinklePhase += 0.06 * dt;

        // Velocity & motion
        const sway = Math.sin(p.swayPhase) * p.swayAmp;
        p.x += (p.speedX + sway + ambientWind) * dt;
        p.y += p.speedY * dt;

        // Ease speedY towards target downward fall speed (for tap burst physics)
        if (p.speedY < p.targetSpeedY) {
          p.speedY = Math.min(p.targetSpeedY, p.speedY + 0.09 * dt);
        }

        // Dampen any initial tap burst horizontal velocity
        if (p.speedX !== 0) {
          p.speedX *= Math.pow(0.95, dt);
          if (Math.abs(p.speedX) < 0.05) p.speedX = 0;
        }

        // Draw particle with 3D tumble
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // 3D perspective flip and tilt
        const cosFlip = Math.cos(p.flip);
        const sinTilt = Math.sin(p.tilt);
        ctx.scale(cosFlip, 0.82 + 0.18 * sinTilt);
        ctx.globalAlpha = p.opacity;

        if (p.type === 'rose') {
          drawRosePetal(ctx, p);
        } else if (p.type === 'marigold') {
          drawMarigoldPetal(ctx, p);
        } else if (p.type === 'gold-flake') {
          drawGoldFlake(ctx, p);
        } else if (p.type === 'sparkle') {
          drawSparkle(ctx, p);
        }

        ctx.restore();

        // Recycle or cleanup particles that reach bottom or side margins
        if (p.y > height + 40 || p.x < -40 || p.x > width + 40) {
          if (isCascade || particles.length <= ambientTargetCount) {
            // Recycle to top with fresh parameters
            p.x = randomRange(0, width);
            p.y = randomRange(-70, -10);
            p.swayPhase = randomRange(0, Math.PI * 2);
            p.flip = randomRange(0, Math.PI * 2);
            p.rotation = randomRange(0, Math.PI * 2);
          } else {
            // Natural attrition: remove finished particle
            particles.splice(i, 1);
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    // Pause when page is hidden
    const handleVisibility = () => {
      if (document.hidden) {
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      } else {
        lastTime = performance.now();
        animFrameRef.current = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      running = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', updateSize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`petal-shower-canvas ${active ? 'is-active' : ''}`}
      aria-hidden="true"
    />
  );
}
