import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Globe, ChevronDown, Clock, MapPin, Calendar, Car, Building, Gift, Shirt, PartyPopper } from 'lucide-react';
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

/* ===== WELCOME MESSAGE ===== */
function WelcomeSection() {
  return (
    <section className="welcome-section" id="welcome">

      <motion.div
        className="welcome-content"
        variants={fadeInUp(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <SectionDivider />
        <p className="welcome-text">
          We are honored to welcome you to the Wedding
          ceremony of Rohit &amp; Priya. As they begin their
          journey together in faith and love,
          <br />
          we thank you for being part of this blessed
          occasion <HeartIcon size={14} className="inline-heart" />
        </p>
        <SectionDivider />
      </motion.div>
    </section>
  );
}

/* ===== SCRATCH TO REVEAL ===== */
function ScratchSection() {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 260;
    canvas.height = 280;

    // Draw the scratch overlay (green sparkle heart shape)
    ctx.fillStyle = '#7a8f7e';
    ctx.beginPath();
    const x = canvas.width / 2;
    const y = canvas.height / 2 - 10;
    const size = 105;

    // Heart path function
    function createHeartPath() {
      ctx.beginPath();
      ctx.moveTo(x, y + size * 0.75);
      ctx.bezierCurveTo(x - size * 1.35, y - size * 0.15, x - size * 0.65, y - size * 0.95, x, y - size * 0.4);
      ctx.bezierCurveTo(x + size * 0.65, y - size * 0.95, x + size * 1.35, y - size * 0.15, x, y + size * 0.75);
      ctx.closePath();
    }

    createHeartPath();
    const grad = ctx.createRadialGradient(x, y - 20, 10, x, y, size);
    grad.addColorStop(0, '#8ea693');
    grad.addColorStop(0.5, '#728b77');
    grad.addColorStop(1, '#576f5c');
    ctx.fillStyle = grad;
    ctx.fill();

    // Glitter/speckles
    ctx.save();
    ctx.clip();
    for (let i = 0; i < 220; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * size * 0.95;
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius * 0.8;
      const dotSize = Math.random() * 2.2 + 0.4;
      const alpha = Math.random() * 0.6 + 0.2;
      ctx.fillStyle = Math.random() > 0.4 ? `rgba(255, 255, 255, ${alpha})` : `rgba(235, 215, 160, ${alpha})`;
      ctx.beginPath();
      ctx.arc(px, py, dotSize, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Subtle golden stroke
    createHeartPath();
    ctx.strokeStyle = 'rgba(197, 160, 89, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }, []);

  const scratch = useCallback((e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    let clientX, clientY;
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Check how much is scratched
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparent++;
    }
    const percentage = transparent / (imageData.data.length / 4);
    if (percentage > 0.35) {
      setIsRevealed(true);
    }
  }, [isDrawing]);

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
        <SectionDivider />

        <div className={`scratch-card ${isRevealed ? 'revealed' : ''}`}>
          <div className="scratch-hidden-content">
            <p className="scratch-date-label">Save the Date</p>
            <p className="scratch-date">November 21</p>
            <p className="scratch-year">2026</p>
          </div>
          {!isRevealed && (
            <canvas
              ref={canvasRef}
              className="scratch-canvas"
              onMouseDown={() => setIsDrawing(true)}
              onMouseUp={() => setIsDrawing(false)}
              onMouseLeave={() => setIsDrawing(false)}
              onMouseMove={scratch}
              onTouchStart={() => setIsDrawing(true)}
              onTouchEnd={() => setIsDrawing(false)}
              onTouchMove={scratch}
            />
          )}
        </div>

        <button className="save-date-btn">
          <Calendar size={16} />
          <span>SAVE THE DATE</span>
        </button>
      </motion.div>

      <WavySeparator />
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

/* ===== TRANSPORTATION ===== */
function TransportationSection() {
  return (
    <section className="info-section" id="transportation">

      <motion.div
        className="info-content"
        variants={fadeInUp(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <Car size={24} className="section-icon" />
        <h2 className="section-title-script">Transportation</h2>
        <SectionDivider />
        <p className="info-text">
          Shuttle service will be available from the city center to the venue. Pickup point: Central Station at 3:30 PM.
        </p>
      </motion.div>

      <WavySeparator />
    </section>
  );
}

/* ===== ACCOMMODATION ===== */
function AccommodationSection() {
  return (
    <section className="info-section" id="accommodation">

      <motion.div
        className="info-content"
        variants={fadeInUp(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <Building size={24} className="section-icon" />
        <h2 className="section-title-script">Accommodation</h2>
        <SectionDivider />
        <p className="info-text">
          Special rates at The Grand Palace Hotel (5 min from venue). Use code WEDDING2026 when booking.
        </p>
      </motion.div>

      <WavySeparator />
    </section>
  );
}

/* ===== GIFTS ===== */
function GiftsSection() {
  return (
    <section className="info-section" id="gifts">

      <motion.div
        className="info-content"
        variants={fadeInUp(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <Gift size={24} className="section-icon" />
        <h2 className="section-title-script">Gifts</h2>
        <SectionDivider />
        <p className="info-text">
          Your love, blessings, and presence are the greatest gifts we could ever ask for.
        </p>
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
        <motion.div className="footer-names" variants={fadeIn(0.2)}>
          Rohit &amp; Priya
        </motion.div>
        <motion.p className="footer-text" variants={fadeIn(0.4)}>
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

      <div className={`invitation-wrapper ${isOpen ? 'invitation-revealed' : 'invitation-hidden'}`}>
        <div className="invitation-vine-border vine-left" aria-hidden="true" style={{ backgroundImage: `url(${asset('/floral-vine-clean.png')})` }} />
        <div className="invitation-vine-border vine-right" aria-hidden="true" style={{ backgroundImage: `url(${asset('/floral-vine-clean.png')})` }} />
        <HeroSection isOpen={isOpen} curtainsOpened={curtainsOpened} />
        <WelcomeSection />
        <ScratchSection />
        <GallerySection />
        <CountdownSection />
        <TimelineSection />
        <VenueSection />
        <DressCodeSection />
        <PreWeddingSection />
        <TransportationSection />
        <AccommodationSection />
        <GiftsSection />
        <ClosingSection />
        <Footer />
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
