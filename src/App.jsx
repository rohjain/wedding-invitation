import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Globe, ChevronDown, Clock, MapPin, Calendar, Shirt, PartyPopper } from 'lucide-react';
import ScratchSection from './components/ScratchSection';
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
function GatefoldDoors({ onOpen, isOpen }) {
  return (
    <div className={`gatefold-overlay ${isOpen ? 'is-open' : ''}`}>
      <div className="gatefold-doors">
        {/* Left Door */}
        <div className="gate-door gate-door-left">
          <img src={asset('/green-door.jpg')} alt="" className="door-bg" />
          <div className="door-gold-rod door-rod-right" />
          <div className="plaque-half plaque-half-left">
            <img src={asset('/plaque-clean.png')} alt="Tap to" />
          </div>
        </div>

        {/* Right Door */}
        <div className="gate-door gate-door-right">
          <img src={asset('/green-door.jpg')} alt="" className="door-bg door-bg-flipped" />
          <div className="door-gold-rod door-rod-left" />
          <div className="plaque-half plaque-half-right">
            <img src={asset('/plaque-clean.png')} alt="Open" />
          </div>
        </div>

        {!isOpen && (
          <div className="plaque-tap-trigger" onClick={onOpen} role="button" tabIndex={0}>
            <div className="plaque-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}

/* ===== HERO SECTION ===== */
function HeroSection({ isOpen, curtainsOpened }) {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-bg-image" style={{ backgroundImage: `url(${asset('/wedding-bg.jpg')})` }} />
      <div className="hero-overlay" />

      {/* Curtain Unfold */}
      <div
        className={`curtains-unfold-overlay ${isOpen ? 'unfold-active' : ''} ${
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

      {isOpen && <div className="center-tap-ripple" />}

      <div className="hero-content">
        <motion.div
          className="heart-icon"
          variants={scaleIn(2.8)}
          initial="hidden"
          animate={isOpen ? 'visible' : 'hidden'}
        >
          <HeartIcon size={28} />
        </motion.div>

        <motion.p
          className="hero-subtitle"
          variants={fadeInUp(3.2)}
          initial="hidden"
          animate={isOpen ? 'visible' : 'hidden'}
        >
          We're getting married
        </motion.p>

        <motion.div
          className="hero-divider"
          variants={fadeIn(3.6)}
          initial="hidden"
          animate={isOpen ? 'visible' : 'hidden'}
        >
          <SectionDivider />
        </motion.div>

        <motion.div
          className="person-block"
          variants={fadeInUp(4.1)}
          initial="hidden"
          animate={isOpen ? 'visible' : 'hidden'}
        >
          <h1 className="name-script">Rohit</h1>
          <p className="person-details">Son of Sunil Jain &amp; Usha Jain</p>
          <p className="person-details">B.E., M.S.</p>
          <p className="person-details">Data Scientist</p>
        </motion.div>

        <motion.div
          className="ampersand-block"
          variants={scaleIn(5.1)}
          initial="hidden"
          animate={isOpen ? 'visible' : 'hidden'}
        >
          <span className="ampersand">&amp;</span>
        </motion.div>

        <motion.div
          className="person-block"
          variants={fadeInUp(5.6)}
          initial="hidden"
          animate={isOpen ? 'visible' : 'hidden'}
        >
          <h2 className="name-script">Priya</h2>
          <p className="person-details">Daughter of Dinesh Jain &amp; Rani Jain</p>
          <p className="person-details">MBBS, M.D</p>
          <p className="person-details">Pediatrician</p>
        </motion.div>

        <motion.div
          className="scroll-cue"
          variants={fadeIn(6.6)}
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
          <div className="patrika-header">
            <MangalKalash size={38} className="patrika-kalash-icon" />
            <p className="patrika-shloka-text">॥ श्री गणेशाय नमः ॥</p>
            <div className="patrika-vivah-badge">
              <span className="patrika-badge-dot">•</span>
              <span className="patrika-badge-text">शुभ विवाह</span>
              <span className="patrika-badge-dot">•</span>
            </div>
          </div>

          <PatrikaDivider />

          {/* Invitation Content */}
          <div className="patrika-content">
            <h3 className="patrika-title">WEDDING INVITATION</h3>
            <p className="welcome-text-intro">
              We are honored to welcome you to the<br />Wedding ceremony of
            </p>
            <div className="patrika-couple-names">Rohit &amp; Priya</div>
            <p className="welcome-text-blessing">
              As they begin their sacred journey together in faith and love,<br />
              we thank you from the bottom of our hearts for being part of this blessed occasion{' '}
              <HeartIcon size={14} className="inline-heart" />
            </p>
          </div>

          <PatrikaDivider />

          {/* Traditional Auspicious Blessing Sign-off */}
          <div className="patrika-footer">
            <p className="patrika-blessing-header">॥ स्नेह निमंत्रण ॥</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}


/* ===== PHOTO GALLERY ===== */
function GallerySection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const photos = ['/gallery-1.jpg', '/gallery-2.jpg', '/gallery-3.jpg'].map(asset);
  const touchStart = useRef(0);

  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeSlide < photos.length - 1) {
        setActiveSlide(prev => prev + 1);
      } else if (diff < 0 && activeSlide > 0) {
        setActiveSlide(prev => prev - 1);
      }
    }
  };

  return (
    <section className="gallery-section" id="gallery">

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
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="gallery-track"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {photos.map((src, i) => (
              <div key={i} className="gallery-slide">
                <img src={src} alt={`Wedding photo ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="gallery-dots">
          {photos.map((_, i) => (
            <button
              key={i}
              className={`gallery-dot ${i === activeSlide ? 'active' : ''}`}
              onClick={() => setActiveSlide(i)}
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
              className="countdown-item"
              variants={scaleIn(0.1 * i)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="countdown-number">{String(block.value).padStart(2, '0')}</div>
              <div className="countdown-label">{block.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <WavySeparator />
    </section>
  );
}

/* ===== PROGRAM TIMELINE ===== */
function TimelineSection() {
  const events = [
    {
      date: 'SATURDAY, NOV 21, 2026',
      items: [
        { time: '10:00 AM', title: 'Guest Arrival', desc: 'We welcome you.. ♥' },
        { time: '10:30 AM', title: 'Wedding Ceremony', desc: 'Your presence means a lot!' },
      ],
    },
    {
      date: 'SUNDAY, NOV 22, 2026',
      items: [
        { time: '7:30 PM', title: 'Reception', desc: '' },
      ],
    },
  ];

  return (
    <section className="timeline-section" id="timeline">

      <motion.div
        className="timeline-content"
        variants={fadeInUp(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <Clock size={24} className="section-icon" />
        <h2 className="section-title-script">Program Timeline</h2>
        <SectionDivider />

        {events.map((group, gi) => (
          <div key={gi} className="timeline-group">
            <div className="timeline-date-row">
              <span className="timeline-date-line" />
              <span className="timeline-date">{group.date}</span>
              <span className="timeline-date-line" />
            </div>
            {group.items.map((item, ii) => (
              <div key={ii} className="timeline-item">
                <span className="timeline-time">{item.time}</span>
                <span className="timeline-bar" />
                <div className="timeline-info">
                  <h4 className="timeline-title">{item.title}</h4>
                  {item.desc && <p className="timeline-desc">{item.desc}</p>}
                </div>
              </div>
            ))}
          </div>
        ))}
      </motion.div>

      <WavySeparator />
    </section>
  );
}

/* ===== VENUE SECTION ===== */
function VenueSection() {
  return (
    <section className="venue-section" id="venue">

      <motion.div
        className="venue-content"
        variants={fadeInUp(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <MapPin size={24} className="section-icon" />
        <h2 className="section-title-script">Venue</h2>
        <SectionDivider />

        <h3 className="venue-name">Grand Palace Hall</h3>
        <p className="venue-location">City centre, London</p>

        <div className="venue-map">
          <iframe
            title="Venue Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.8741!2d-0.1657!3d51.5504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDMzJzAxLjQiTiAwwrAwOSc1Ni41Ilc!5e0!3m2!1sen!2suk!4v1600000000000!5m2!1sen!2suk"
            width="100%"
            height="250"
            style={{ border: 0, borderRadius: '12px' }}
            allowFullScreen=""
            loading="lazy"
          />
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="map-link"
          >
            Open in Maps ↗
          </a>
        </div>

        <a
          href="https://maps.google.com"
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

/* ===== DRESS CODE SECTION ===== */
function DressCodeSection() {
  return (
    <section className="dressCode-section" id="dressCode">

      <motion.div
        className="dressCode-content"
        variants={fadeInUp(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <Shirt size={24} className="section-icon" />
        <h2 className="section-title-script">Dress Code</h2>
        <SectionDivider />

        <div className="dress-category">
          <h3 className="dress-title">Women</h3>
          <div className="dress-underline" />
          <p className="dress-desc">Elegant formal attire in pastel or jewel tones</p>
        </div>

        <div className="dress-category">
          <h3 className="dress-title">Men</h3>
          <div className="dress-underline" />
          <p className="dress-desc">Suit or traditional formal wear</p>
        </div>
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
      items: [{ time: '8:30 PM', title: 'Mahendi', desc: "At Bride's House" }],
    },
    {
      date: 'FRIDAY, NOV 20, 2026',
      items: [
        { time: '2:00 PM', title: 'Haldi', desc: "At Groom's House" },
        { time: '8:00 PM', title: 'Sangeet', desc: "Music, Dance & Dinner" },
      ],
    },
  ];

  return (
    <section className="prewedding-section" id="prewedding">

      <motion.div
        className="prewedding-content"
        variants={fadeInUp(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <PartyPopper size={24} className="section-icon" />
        <h2 className="section-title-script">Pre-Wedding Events</h2>
        <SectionDivider />

        {events.map((group, gi) => (
          <div key={gi} className="timeline-group">
            <div className="timeline-date-row">
              <span className="timeline-date-line" />
              <span className="timeline-date">{group.date}</span>
              <span className="timeline-date-line" />
            </div>
            {group.items.map((item, ii) => (
              <div key={ii} className="timeline-item">
                <span className="timeline-time">{item.time}</span>
                <span className="timeline-bar" />
                <div className="timeline-info">
                  <h4 className="timeline-title">{item.title}</h4>
                  {item.desc && <p className="timeline-desc">{item.desc}</p>}
                </div>
              </div>
            ))}
          </div>
        ))}
      </motion.div>

      <WavySeparator />
    </section>
  );
}


/* ===== CLOSING / FOOTER ===== */
function ClosingSection() {
  return (
    <section className="closing-section">

      <motion.div
        className="closing-content"
        variants={fadeInUp(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <h2 className="closing-text">We can't wait to celebrate with you!</h2>
        <div className="closing-image-wrapper">
          <img
            src={asset('/celebrate-couple.jpg')}
            alt="Rohit & Priya"
            className="closing-image"
          />
        </div>
        <p className="closing-names">Rohit &amp; Priya</p>
        <WavySeparator />
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-floral" />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <motion.p className="footer-text" variants={fadeIn(0.2)}>
          Create your own Invitation on <span className="footer-brand">Zareqia</span>
        </motion.p>
      </motion.div>
    </footer>
  );
}

/* ===== MAIN APP ===== */
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [curtainsOpened, setCurtainsOpened] = useState(false);
  const [doorsGone, setDoorsGone] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
      setIsMuted(false);
    }

    setTimeout(() => setCurtainsOpened(true), 2500);
    setTimeout(() => setDoorsGone(true), 2200);
  };

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

  return (
    <div className="app-container">
      <audio ref={audioRef} loop>
        <source src={asset('/wedding-music.wav')} type="audio/wav" />
      </audio>

      {!doorsGone && (
        <div className={`gatefold-container ${isOpen ? 'is-open' : ''}`}>
          <GatefoldDoors onOpen={handleOpen} isOpen={isOpen} />
        </div>
      )}

      <div
        className={`invitation-wrapper ${isOpen ? 'invitation-revealed' : 'invitation-hidden'}`}
        style={{ '--gold-paper-bg': `url(${asset('/gold-paper-bg.jpg')})` }}
      >
        <div className="invitation-vine-border vine-left" aria-hidden="true" style={{ backgroundImage: `url(${asset('/floral-vine-clean.png')})` }} />
        <div className="invitation-vine-border vine-right" aria-hidden="true" style={{ backgroundImage: `url(${asset('/floral-vine-clean.png')})` }} />
        <HeroSection isOpen={isOpen} curtainsOpened={curtainsOpened} />
        <div
          className="invitation-seamless-body"
          style={{ '--patrika-texture': `url(${asset('/patrika-texture.jpg')})` }}
        >
          <WelcomeSection />
          <ScratchSection isMuted={isMuted} />
          <GallerySection />
          <CountdownSection />
          <TimelineSection />
          <VenueSection />
          <DressCodeSection />
          <PreWeddingSection />
          <ClosingSection />
          <Footer />
        </div>
      </div>

      {/* Floating Controls */}
      <div className="floating-controls top-right">
        <button className="control-btn" onClick={toggleMute} aria-label="Toggle music">
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      <div className={`floating-controls bottom-left ${isOpen ? '' : 'on-doors'}`}>
        <button className="pill-btn">
          <Globe size={14} className="icon-mr" /> Arabic
        </button>
      </div>
    </div>
  );
}

export default App;
