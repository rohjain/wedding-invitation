import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { Volume2, VolumeX, ChevronDown, ChevronLeft, ChevronRight, MapPin, PartyPopper, Share2, Check, Flower2 } from 'lucide-react';
import WaxSealSection from './components/WaxSealSection';
import PetalShower from './components/PetalShower';
import AuspiciousToran from './components/AuspiciousToran';
import ShubhLabhMedallion from './components/ShubhLabhMedallion';
import RoyalPreloader from './components/RoyalPreloader';
import invitationBg from './assets/invitation-bg.jpg';
import './App.css';

const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

/* ===== ANIMATION VARIANTS ===== */
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

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.9,
      delay,
      ease: 'easeOut',
    },
  },
});

const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.75 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
});

/* ===== HEART SVG ===== */
const HeartIcon = ({ size = 26, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

/* ===== SECTION DIVIDER ===== */
function SectionDivider({ className = '' }) {
  return (
    <div className={`section-divider-line ${className}`}>
      <span className="divider-line" />
      <HeartIcon size={10} className="divider-heart" />
      <span className="divider-line" />
    </div>
  );
}

/* ===== WAVY SECTION SEPARATOR ===== */
function WavySeparator() {
  return (
    <div className="wavy-separator">
      <svg viewBox="0 0 400 30" preserveAspectRatio="none" className="wavy-svg">
        <path d="M0,15 Q25,5 50,15 T100,15 T150,15 T200,15 T250,15 T300,15 T350,15 T400,15" 
              fill="none" stroke="rgba(59,74,63,0.12)" strokeWidth="1.5" />
        <circle cx="100" cy="15" r="2.5" fill="rgba(59,74,63,0.1)" />
        <circle cx="200" cy="15" r="2.5" fill="rgba(59,74,63,0.1)" />
        <circle cx="300" cy="15" r="2.5" fill="rgba(59,74,63,0.1)" />
      </svg>
    </div>
  );
}

/* ===== GATEFOLD DOORS ===== */
function GatefoldDoors({ onOpen, isOpen, isMuted: _isMuted }) {
  return (
    <div className={`gatefold-overlay ${isOpen ? 'is-open' : ''}`}>
      {/* Radiant golden light shaft spilling from parting royal gates */}
      <div className="door-light-spill" aria-hidden="true" />

      {/* Auspicious Entrance Toran (Bandhanwar) with swaying brass bells */}
      <AuspiciousToran />

      <div
        className="gatefold-doors"
        onClick={!isOpen ? onOpen : undefined}
        style={{ cursor: !isOpen ? 'pointer' : 'default' }}
      >
        {/* Left Door */}
        <div className="gate-door gate-door-left">
          <div className="door-leaf-content">
            <img
              src={asset('/royal-door-only.jpg')}
              alt="Royal Palace Gate Left"
              className="door-photo door-photo-left"
            />
            {/* Dynamic 3D lighting shadow overlay */}
            <div className="door-surface-shadow door-shadow-left" aria-hidden="true" />
            {/* 3D meeting edge thickness bevel */}
            <div className="door-edge-bevel door-edge-left" aria-hidden="true" />
          </div>
          <ShubhLabhMedallion text="शुभ" side="left" isOpen={isOpen} onOpen={onOpen} />
        </div>

        {/* Right Door */}
        <div className="gate-door gate-door-right">
          <div className="door-leaf-content">
            <img
              src={asset('/royal-door-only.jpg')}
              alt="Royal Palace Gate Right"
              className="door-photo door-photo-right"
            />
            {/* Dynamic 3D lighting shadow overlay */}
            <div className="door-surface-shadow door-shadow-right" aria-hidden="true" />
            {/* 3D meeting edge thickness bevel */}
            <div className="door-edge-bevel door-edge-right" aria-hidden="true" />
          </div>
          <ShubhLabhMedallion text="लाभ" side="right" isOpen={isOpen} onOpen={onOpen} />
        </div>

        {/* Center seam shadow when closed */}
        <div className="door-center-seam" aria-hidden="true" />
      </div>

      {/* Animated Tap to Open Invitation Call-to-Action Hint */}
      {!isOpen && (
        <div
          className="door-interaction-hint"
          onClick={onOpen}
          role="button"
          tabIndex={0}
          aria-label="Tap to open invitation"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpen();
            }
          }}
        >
          <span className="door-hint-text">✨ TAP TO OPEN INVITATION ✨</span>
        </div>
      )}
    </div>
  );
}

/* ===== HERO SECTION ===== */
function HeroSection({ isOpen, curtainsUnfolding, curtainsOpened, onHeroTap }) {
  return (
    <section
      className="hero-section"
      id="hero"
      onClick={onHeroTap}
      style={{ cursor: isOpen ? 'pointer' : 'default' }}
      title={isOpen ? "Tap anywhere to shower flower petals 🌸" : undefined}
    >
      <div className="hero-bg-image" style={{ backgroundImage: `url(${asset('/wedding-bg.jpg')})` }} />
      <div className="hero-overlay" />

      {/* Curtain Unfold — only activates AFTER the gate animation is done */}
      <div
        className={`curtains-unfold-overlay ${curtainsUnfolding ? 'unfold-active' : ''} ${
          curtainsOpened ? 'unfold-complete' : ''
        }`}
      >
        <div className="curtain-wing curtain-wing-left">
          <img src={asset('/curtains-closed.jpg')} alt="" className="curtain-wing-img curtain-img-left" />
        </div>
        <div className="curtain-wing curtain-wing-right">
          <img src={asset('/curtains-closed.jpg')} alt="" className="curtain-wing-img curtain-img-right" />
        </div>
      </div>

      {curtainsUnfolding && <div className="center-tap-ripple" />}

      <div className="hero-content">
        <motion.div
          className="heart-icon"
          variants={scaleIn(2.2)}
          initial="hidden"
          animate={isOpen ? 'visible' : 'hidden'}
        >
          <HeartIcon size={28} />
        </motion.div>

        <motion.p
          className="hero-subtitle"
          variants={fadeInUp(2.4)}
          initial="hidden"
          animate={isOpen ? 'visible' : 'hidden'}
        >
          We're getting married
        </motion.p>

        <motion.div
          className="hero-divider"
          variants={fadeIn(2.6)}
          initial="hidden"
          animate={isOpen ? 'visible' : 'hidden'}
        >
          <SectionDivider />
        </motion.div>

        <motion.div
          className="person-block"
          variants={fadeInUp(2.8)}
          initial="hidden"
          animate={isOpen ? 'visible' : 'hidden'}
        >
          <h1 className="name-script">Rohit</h1>
          <p className="person-details">Son of Sunil Jain &amp; Usha Jain</p>
        </motion.div>

        <motion.div
          className="ampersand-block"
          variants={scaleIn(3.1)}
          initial="hidden"
          animate={isOpen ? 'visible' : 'hidden'}
        >
          <span className="ampersand">&amp;</span>
        </motion.div>

        <motion.div
          className="person-block"
          variants={fadeInUp(3.3)}
          initial="hidden"
          animate={isOpen ? 'visible' : 'hidden'}
        >
          <h2 className="name-script">Priyanshi</h2>
          <p className="person-details">Daughter of Dinesh Jain &amp; Rani Jain</p>
        </motion.div>

        <motion.div
          className="scroll-cue"
          variants={fadeIn(3.7)}
          initial="hidden"
          animate={isOpen ? 'visible' : 'hidden'}
        >
          <span className="scroll-text">SCROLL</span>
          <ChevronDown size={18} className="scroll-chevron" />
        </motion.div>
      </div>
    </section>
  );
}

/* ===== AUSPICIOUS MANGAL KALASH SVG ===== */
function MangalKalash({ size = 52, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Auspicious Mangal Kalash"
    >
      <defs>
        <linearGradient id="patrikaGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF4C2" />
          <stop offset="25%" stopColor="#E2BD63" />
          <stop offset="50%" stopColor="#AA7C11" />
          <stop offset="75%" stopColor="#F5D77F" />
          <stop offset="100%" stopColor="#8F6416" />
        </linearGradient>
        <linearGradient id="patrikaGoldDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#7A5615" />
        </linearGradient>
        <radialGradient id="kalashGlowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Gentle radiant aura */}
      <circle cx="50" cy="50" r="46" fill="url(#kalashGlowGrad)" />

      {/* Center Mango Leaf (behind) */}
      <path
        d="M50 36 C47 22, 49 12, 50 5 C51 12, 53 22, 50 36 Z"
        fill="url(#patrikaGoldGrad)"
        stroke="#7A5615"
        strokeWidth="0.8"
      />
      {/* Side Mango Leaves */}
      <path
        d="M45 40 C30 32, 20 22, 16 14 C26 17, 36 27, 45 40 Z"
        fill="url(#patrikaGoldGrad)"
        stroke="#7A5615"
        strokeWidth="0.8"
      />
      <path
        d="M55 40 C70 32, 80 22, 84 14 C74 17, 64 27, 55 40 Z"
        fill="url(#patrikaGoldGrad)"
        stroke="#7A5615"
        strokeWidth="0.8"
      />
      <path
        d="M42 45 C22 42, 12 34, 8 26 C18 29, 30 38, 42 45 Z"
        fill="url(#patrikaGoldGrad)"
        stroke="#7A5615"
        strokeWidth="0.8"
      />
      <path
        d="M58 45 C78 42, 88 34, 92 26 C82 29, 70 38, 58 45 Z"
        fill="url(#patrikaGoldGrad)"
        stroke="#7A5615"
        strokeWidth="0.8"
      />

      {/* Sacred Coconut (Nariyal) */}
      <path
        d="M40 44 C36 30, 42 17, 50 15 C58 17, 64 30, 60 44 Z"
        fill="url(#patrikaGoldGrad)"
        stroke="#6E4A0C"
        strokeWidth="1"
      />
      {/* Sacred Red Thread / Mauli Bindings */}
      <path d="M42 30 Q50 34 58 30" stroke="#8C1D13" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M43 24 Q50 28 57 24" stroke="#8C1D13" strokeWidth="1.4" strokeLinecap="round" />

      {/* Neck & Rim of Kalash */}
      <ellipse cx="50" cy="45" rx="18" ry="4.5" fill="url(#patrikaGoldGrad)" stroke="#6E4A0C" strokeWidth="1" />
      <path d="M34 45 L31 52 L69 52 L66 45 Z" fill="url(#patrikaGoldDark)" stroke="#6E4A0C" strokeWidth="0.8" />

      {/* Pot Belly */}
      <path
        d="M31 52 C21 60, 23 74, 36 82 L64 82 C77 74, 79 60, 69 52 Z"
        fill="url(#patrikaGoldGrad)"
        stroke="#6E4A0C"
        strokeWidth="1.2"
      />

      {/* Decorative Embossed Bands on Pot */}
      <path d="M28 62 Q50 67 72 62" stroke="#6E4A0C" strokeWidth="0.9" fill="none" />
      <path d="M29 66 Q50 71 71 66" stroke="#6E4A0C" strokeWidth="0.9" fill="none" />

      {/* Sacred Swastika / Auspicious Seal in Red Kumkum */}
      <g stroke="#8C1D13" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M50 58 L50 74" />
        <path d="M42 66 L58 66" />
        <path d="M50 58 L56 58" />
        <path d="M58 66 L58 72" />
        <path d="M50 74 L44 74" />
        <path d="M42 66 L42 60" />
      </g>
      <circle cx="45" cy="62" r="1" fill="#8C1D13" />
      <circle cx="55" cy="62" r="1" fill="#8C1D13" />
      <circle cx="45" cy="70" r="1" fill="#8C1D13" />
      <circle cx="55" cy="70" r="1" fill="#8C1D13" />

      {/* Pedestal Base */}
      <path
        d="M36 82 Q50 86 64 82 L67 87 Q50 91 33 87 Z"
        fill="url(#patrikaGoldGrad)"
        stroke="#6E4A0C"
        strokeWidth="1"
      />
    </svg>
  );
}

/* ===== PATRIKA ORNATE DIVIDER ===== */
function PatrikaDivider({ className = '' }) {
  return (
    <div className={`patrika-divider ${className}`} aria-hidden="true">
      <svg width="220" height="20" viewBox="0 0 220 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pGoldLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C5A059" stopOpacity="0.05" />
            <stop offset="35%" stopColor="#D4AF37" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#FFF2B2" stopOpacity="1" />
            <stop offset="65%" stopColor="#D4AF37" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#C5A059" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <path d="M12 10 L82 10" stroke="url(#pGoldLine)" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M138 10 L208 10" stroke="url(#pGoldLine)" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="12" cy="10" r="2" fill="#D4AF37" />
        <circle cx="208" cy="10" r="2" fill="#D4AF37" />
        {/* Central Auspicious Motif */}
        <g transform="translate(110, 10)">
          <path d="M0 -7 C3 -2, 5 0, 8 0 C5 3, 2 5, 0 8 C-2 5, -5 3, -8 0 C-5 0, -3 -2, 0 -7 Z" fill="url(#patrikaGoldGrad)" />
          <circle cx="0" cy="0" r="2" fill="#8C1D13" />
          <path d="M-8 0 C-14 -4, -18 0, -22 -2" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" fill="none" />
          <path d="M8 0 C14 -4, 18 0, 22 -2" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" fill="none" />
        </g>
      </svg>
    </div>
  );
}

/* ===== WELCOME MESSAGE (LAGNA PATRIKA STYLE) ===== */
function WelcomeSection() {
  return (
    <section className="welcome-section" id="welcome">
      {/* Ambient Patrika Watermark & Aura */}
      <div className="patrika-watermark-disc" aria-hidden="true" />

      <motion.div
        className="patrika-card"
        variants={fadeInUp(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {/* Card Gold Trim Inner Container */}
        <div className="patrika-card-inner">
          {/* Card Shimmer Sweep */}
          <div className="patrika-card-shimmer" aria-hidden="true" />

          {/* Top Auspicious Invocation Header */}
          <motion.div
            className="patrika-header"
            variants={fadeInUp(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <MangalKalash size={38} className="patrika-kalash-icon" />
            <p className="patrika-shloka-text">॥ श्री महावीराय नमः ॥</p>
            <div className="patrika-vivah-badge">
              <span className="patrika-badge-dot">•</span>
              <span className="patrika-badge-text">शुभ विवाह</span>
              <span className="patrika-badge-dot">•</span>
            </div>
          </motion.div>

          <PatrikaDivider />

          {/* Invitation Content */}
          <motion.div
            className="patrika-content"
            variants={fadeInUp(0.3)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="patrika-title">WEDDING INVITATION</h3>
            <p className="welcome-text-intro">
              We are honored to welcome you to the<br />Wedding ceremony of
            </p>
            <div className="patrika-couple-names">Rohit &amp; Priyanshi</div>
            <p className="welcome-text-blessing">
              As they begin their sacred journey together in faith and love,<br />
              we thank you from the bottom of our hearts for being part of this blessed occasion{' '}
              <HeartIcon size={14} className="inline-heart" />
            </p>
          </motion.div>

          <PatrikaDivider />

          {/* Traditional Auspicious Blessing Sign-off */}
          <motion.div
            className="patrika-footer"
            variants={fadeInUp(0.4)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="patrika-blessing-header">॥ स्नेह निमंत्रण ॥</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}


/* ===== SECTION VINE BORDERS (PER-SECTION 90% COVERAGE) ===== */
function SectionVineBorders() {
  return (
    <>
      <div className="section-vine-border vine-left" aria-hidden="true" />
      <div className="section-vine-border vine-right" aria-hidden="true" />
    </>
  );
}

/* ===== PHOTO GALLERY ===== */
function GallerySection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const photos = ['/gallery-1.jpg', '/gallery-2.jpg', '/gallery-3.jpg'].map(asset);
  const touchStartX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX.current;
    // Dampen drag resistance at carousel edges
    if ((activeSlide === 0 && diff > 0) || (activeSlide === photos.length - 1 && diff < 0)) {
      setDragOffset(diff * 0.35);
    } else {
      setDragOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (dragOffset < -45 && activeSlide < photos.length - 1) {
      setActiveSlide((prev) => prev + 1);
    } else if (dragOffset > 45 && activeSlide > 0) {
      setActiveSlide((prev) => prev - 1);
    }
    setDragOffset(0);
  };

  const prevSlide = () => {
    if (activeSlide > 0) setActiveSlide((prev) => prev - 1);
  };

  const nextSlide = () => {
    if (activeSlide < photos.length - 1) setActiveSlide((prev) => prev + 1);
  };

  return (
    <section className="gallery-section" id="gallery">
      <SectionVineBorders />

      <motion.div
        className="gallery-content"
        variants={fadeInUp(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <SectionDivider />

        <div
          className="gallery-slider"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="gallery-track"
            style={{
              transform: `translateX(calc(-${activeSlide * 100}% + ${dragOffset}px))`,
              transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.35, 1)',
            }}
          >
            {photos.map((src, i) => (
              <div
                key={i}
                className={`gallery-slide ${i === activeSlide ? 'is-active' : ''}`}
              >
                <img src={src} alt={`Wedding photo ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>

          {/* Desktop Arrow Controls */}
          {activeSlide > 0 && (
            <button
              className="gallery-arrow gallery-arrow-prev"
              onClick={prevSlide}
              aria-label="Previous photo"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          {activeSlide < photos.length - 1 && (
            <button
              className="gallery-arrow gallery-arrow-next"
              onClick={nextSlide}
              aria-label="Next photo"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        <div className="gallery-dots">
          {photos.map((_, i) => (
            <button
              key={i}
              className={`gallery-dot ${i === activeSlide ? 'active' : ''}`}
              onClick={() => setActiveSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ===== COUNTDOWN SECTION ===== */
function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-11-21T10:00:00');
    const update = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const blocks = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <section className="countdown-section" id="countdown">
      <SectionVineBorders />

      <motion.div
        className="countdown-content"
        variants={fadeInUp(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <h2 className="section-title-script">Counting Down to Forever</h2>
        <SectionDivider />

        <div className="countdown-grid">
          {blocks.map((block, i) => (
            <motion.div
              key={i}
              className={`countdown-item ${block.label === 'SECONDS' ? 'countdown-seconds' : ''}`}
              variants={scaleIn(0.1 * i)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="countdown-number-wrapper">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={block.value}
                    className="countdown-number"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                  >
                    {String(block.value).padStart(2, '0')}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="countdown-label">{block.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <WavySeparator />
    </section>
  );
}

/* ===== VENUE SECTION ===== */
function VenueSection() {
  return (
    <section className="venue-section" id="venue">
      <SectionVineBorders />

      <motion.div
        className="venue-content"
        variants={fadeInUp(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <div className="venue-pin-wrapper">
          <div className="venue-pin-beacon" aria-hidden="true" />
          <MapPin size={26} className="section-icon venue-map-pin" />
        </div>
        <h2 className="section-title-script">Venue</h2>
        <SectionDivider />

        <h3 className="venue-name">Bhagwati Palace</h3>
        <p className="venue-location">Ashta</p>

        <div className="venue-map">
          <iframe
            title="Venue Map - Bhagwati Palace, Ashta"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.4894680360862!2d76.7200245753133!3d23.005793779185563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397cdb1c37e52935%3A0x1201aa948e6f2feb!2sBhagwati%20palace%2Chotel!5e0!3m2!1sen!2sin!4v1792469589458!5m2!1sen!2sin"
            width="100%"
            height="250"
            style={{ border: 0, borderRadius: '12px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <a
            href="https://www.google.com/maps/search/?api=1&query=Bhagwati+palace,+hotel,+Ashta"
            target="_blank"
            rel="noopener noreferrer"
            className="map-link"
          >
            Open in Maps ↗
          </a>
        </div>

        <a
          href="https://www.google.com/maps/search/?api=1&query=Bhagwati+palace,+hotel,+Ashta"
          target="_blank"
          rel="noopener noreferrer"
          className="view-maps-btn"
        >
          View on Google Maps
        </a>
      </motion.div>

      <WavySeparator />
    </section>
  );
}

/* ===== PRE-WEDDING EVENTS ===== */
function PreWeddingSection() {
  const events = [
    {
      date: 'THURSDAY, NOV 19, 2026',
      items: [{ time: '8:30 PM', title: 'Mahendi', desc: "At Groom's & Bride's House" }],
    },
    {
      date: 'FRIDAY, NOV 20, 2026',
      items: [
        { time: '2:00 PM', title: 'Haldi', desc: "At Venue" },
        { time: '8:00 PM', title: 'Sangeet', desc: "Music, Dance & Dinner" },
      ],
    },
    {
      date: 'SATURDAY, NOV 21, 2026',
      items: [{ time: '11:00 AM', title: 'Reception' }],
    },
  ];

  return (
    <section className="prewedding-section" id="prewedding">
      <SectionVineBorders />

      <motion.div
        className="prewedding-content"
        variants={fadeInUp(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <PartyPopper size={24} className="section-icon" />
        <h2 className="section-title-script">Wedding Events</h2>
        <SectionDivider />

        {events.map((group, gi) => (
          <div key={gi} className="timeline-group">
            <div className="timeline-date-row">
              <span className="timeline-date-line" />
              <span className="timeline-date">{group.date}</span>
              <span className="timeline-date-line" />
            </div>
            {group.items.map((item, ii) => (
              <motion.div
                key={ii}
                className="timeline-item"
                variants={fadeInUp(0.12 * (gi * 2 + ii))}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-20px' }}
              >
                <span className="timeline-time">{item.time}</span>
                <span className="timeline-bar" />
                <div className="timeline-info">
                  <h4 className="timeline-title">{item.title}</h4>
                  {item.desc && <p className="timeline-desc">{item.desc}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </motion.div>

      <WavySeparator />
    </section>
  );
}


/* ===== CLOSING / FOOTER ===== */
function ClosingSection({ onShare, copied }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setImageLoaded(true);
    }
  }, []);

  return (
    <section className="closing-section">
      <SectionVineBorders />

      <motion.div
        className="closing-content"
        variants={fadeInUp(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <h2 className="closing-text">We can't wait to celebrate with you!</h2>
        <div className="closing-image-wrapper">
          <picture>
            <source srcSet={asset('/celebrate-couple.webp')} type="image/webp" />
            <img
              ref={imgRef}
              src={asset('/celebrate-couple.png')}
              alt="Rohit & Priyanshi"
              className={`closing-image ${imageLoaded ? 'is-loaded' : 'is-loading'}`}
              loading="eager"
              decoding="async"
              onLoad={() => setImageLoaded(true)}
            />
          </picture>
        </div>
        <p className="closing-names">Rohit &amp; Priyanshi</p>

        {/* Native Share Invitation Action */}
        <div className="share-section-container">
          <button
            className={`share-invite-btn ${copied ? 'is-copied' : ''}`}
            onClick={onShare}
            aria-label="Share Wedding Invitation"
          >
            {copied ? (
              <Check size={18} className="share-btn-icon" />
            ) : (
              <Share2 size={18} className="share-btn-icon" />
            )}
            <span>{copied ? 'Link Copied to Clipboard!' : 'Share Invitation'}</span>
          </button>
          <p className="share-helper-text">
            Send this invitation to your loved ones &amp; family
          </p>
        </div>

        <WavySeparator />
      </motion.div>
    </section>
  );
}

function Footer() {
  return <footer className="footer-section" />;
}

/* ===== MAIN APP ===== */
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [curtainsUnfolding, setCurtainsUnfolding] = useState(false);
  const [curtainsOpened, setCurtainsOpened] = useState(false);
  const [doorsGone, setDoorsGone] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showerCount, setShowerCount] = useState(0);
  const [tapCoords, setTapCoords] = useState(null);
  const audioRef = useRef(null);
  const toastTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  // Ensure scroll is at the top on mount and prevent browser auto-restoring scroll
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleOpen = useCallback(() => {
    if (isOpen) return;

    // Reset scroll to the absolute top of the page immediately
    const prevScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const wrapper = document.querySelector('.invitation-wrapper');
    if (wrapper) {
      wrapper.scrollTop = 0;
    }

    const hero = document.getElementById('hero');
    if (hero) {
      hero.scrollIntoView({ behavior: 'instant', block: 'start' });
    }

    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      document.documentElement.style.scrollBehavior = prevScrollBehavior;
    });

    setIsOpen(true);

    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
      setIsMuted(false);
    }

    // Once gate animation is done (1.8s), THEN ONLY the curtain animation starts
    setTimeout(() => {
      setDoorsGone(true);
      setCurtainsUnfolding(true);
    }, 1800);

    // Curtain unfold completes at 3.4s
    setTimeout(() => {
      setCurtainsOpened(true);
    }, 3400);
  }, [isOpen]);

  // Auto-open support if query param present (waits until preloader finishes)
  useEffect(() => {
    if (isLoading) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('open')) {
      const timer = setTimeout(() => handleOpen(), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading, handleOpen]);

  // Lock scroll while doors are present
  useEffect(() => {
    if (!doorsGone) {
      document.documentElement.classList.add('doors-locked');
      document.body.classList.add('doors-locked');
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    } else {
      document.documentElement.classList.remove('doors-locked');
      document.body.classList.remove('doors-locked');
    }

    return () => {
      document.documentElement.classList.remove('doors-locked');
      document.body.classList.remove('doors-locked');
    };
  }, [doorsGone]);

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (audioRef.current) {
        if (next) audioRef.current.pause();
        else audioRef.current.play().catch(() => {});
      }
      return next;
    });
  };

  const triggerToast = () => {
    setCopied(true);
    setShowToast(true);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setShowToast(false);
      setCopied(false);
    }, 3200);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Rohit & Priyanshi — Wedding Invitation',
      text: "Rohit & Priyanshi are getting married! 💍✨\nYou are cordially invited to celebrate our wedding on November 21, 2026 at Bhagwati Palace, Ashta.",
      url: window.location.href,
    };

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if (err.name === 'AbortError') return;
      }
    }

    // Fallback: copy link & details to clipboard
    try {
      const textToCopy = `${shareData.text}\n${shareData.url}`;
      await navigator.clipboard.writeText(textToCopy);
      triggerToast();
    } catch {
      // If clipboard write is denied or unsupported, open direct WhatsApp share
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${shareData.text}\n${shareData.url}`
      )}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleHeroTap = (e) => {
    if (!isOpen) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX ?? (rect.left + rect.width / 2);
    const clientY = e.clientY ?? (rect.top + rect.height * 0.4);
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    setTapCoords({ x, y, id: Date.now() });
  };

  const triggerPetalShower = (e) => {
    e.stopPropagation();
    setShowerCount((prev) => prev + 1);
  };

  return (
    <MotionConfig reducedMotion="never">
      <div className="app-container">
        {/* Royal Indian Wedding Preloader */}
        {isLoading && (
          <RoyalPreloader onComplete={() => setIsLoading(false)} />
        )}

        <audio ref={audioRef} loop preload="auto">
          <source src={asset('/wedding-music.wav')} type="audio/wav" />
        </audio>

        {!doorsGone && (
          <div className={`gatefold-container ${isOpen ? 'is-open' : ''}`}>
            <GatefoldDoors onOpen={handleOpen} isOpen={isOpen} isMuted={isMuted} />
          </div>
        )}

        {/* Falling Flower Petals & Gold Confetti Shower */}
        <PetalShower
          active={isOpen}
          triggerKey={showerCount}
          tapCoords={tapCoords}
        />

        <div
          className={`invitation-wrapper ${isOpen ? 'invitation-revealed' : 'invitation-hidden'}`}
        >
          <HeroSection
            isOpen={isOpen}
            curtainsUnfolding={curtainsUnfolding}
            curtainsOpened={curtainsOpened}
            onHeroTap={handleHeroTap}
          />
          <div
            className="invitation-seamless-body"
            style={{ backgroundImage: `url("${invitationBg}")` }}
          >
            <WelcomeSection />
            <WaxSealSection isMuted={isMuted} />
            <GallerySection />
            <CountdownSection />
            <VenueSection />
            <PreWeddingSection />
            <ClosingSection onShare={handleShare} copied={copied} />
            <Footer />
          </div>
        </div>

        {/* Floating Controls */}
        <div className="floating-controls top-right">
          {isOpen && (
            <button
              className="control-btn btn-flower-shower"
              onClick={triggerPetalShower}
              aria-label="Shower flower petals"
              title="Shower Petals 🌸"
            >
              <Flower2 size={18} />
            </button>
          )}
          <button
            className={`control-btn ${copied ? 'is-copied' : ''}`}
            onClick={handleShare}
            aria-label="Share wedding invitation"
            title={copied ? "Link Copied!" : "Share Invitation"}
          >
            {copied ? <Check size={18} /> : <Share2 size={18} />}
          </button>
          <button
            className="control-btn"
            onClick={toggleMute}
            aria-label="Toggle music"
            title={isMuted ? "Play Music" : "Mute Music"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>

        {/* Share Toast Notification */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              className="share-toast"
              initial={{ opacity: 0, y: 30, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div className="share-toast-content">
                <Check size={17} className="toast-check-icon" />
                <span>Invitation link copied! Share with loved ones ✨</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

export default App;
