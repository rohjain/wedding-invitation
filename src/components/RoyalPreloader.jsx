import React, { useState, useEffect, useRef } from 'react';
import invitationBg from '../assets/invitation-bg.jpg';
import './RoyalPreloader.css';

const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

/**
 * RoyalPreloader
 * An opulent, regal Indian wedding preloader screen for Rohit & Priyanshi.
 * Preloads all high-res door visuals, hero backdrops, textures and Google fonts
 * before smoothly unveiling the royal palace doors.
 */
export default function RoyalPreloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const startTimeRef = useRef(null);
  const animFrameRef = useRef(null);
  const isCompleteRef = useRef(false);

  // Derive status message directly from current display progress (no extra effect / state)
  const statusMessage =
    displayProgress < 30
      ? 'Inviting Auspicious Beginnings...'
      : displayProgress < 65
      ? 'Adorning the Royal Darbar...'
      : displayProgress < 95
      ? 'Preparing the Royal Invitation...'
      : 'Welcome to the Celebration ✨';

  // Smooth progress interpolation to prevent abrupt jumps
  useEffect(() => {
    if (!startTimeRef.current) {
      startTimeRef.current = Date.now();
    }

    const updateProgress = () => {
      setDisplayProgress((prev) => {
        if (prev < progress) {
          const step = Math.max(1, Math.ceil((progress - prev) * 0.12));
          return Math.min(progress, prev + step);
        }
        return prev;
      });
      animFrameRef.current = requestAnimationFrame(updateProgress);
    };

    animFrameRef.current = requestAnimationFrame(updateProgress);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [progress]);

  // Preloading core assets (Images & Fonts)
  useEffect(() => {
    const imagesToPreload = [
      asset('/royal-door-only.jpg'),
      asset('/wedding-bg.jpg'),
      asset('/curtains-closed.jpg'),
      asset('/celebrate-couple.webp'),
      invitationBg,
    ];

    const totalItems = imagesToPreload.length + 1; // +1 for fonts
    let loadedCount = 0;

    const handleItemLoaded = () => {
      loadedCount++;
      const targetPercent = Math.min(100, Math.round((loadedCount / totalItems) * 100));
      setProgress(targetPercent);
    };

    // Preload Images
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.onload = handleItemLoaded;
      img.onerror = handleItemLoaded; // Don't block on network error
      img.src = src;
      if (img.complete) {
        // Image already cached in browser
        handleItemLoaded();
      }
    });

    // Preload Web Fonts
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready
        .then(() => handleItemLoaded())
        .catch(() => handleItemLoaded());
    } else {
      handleItemLoaded();
    }

    // Safety timeout: Maximum 4.2 seconds to ensure user is NEVER blocked on slow networks
    const safetyTimeout = setTimeout(() => {
      setProgress(100);
    }, 4200);

    return () => clearTimeout(safetyTimeout);
  }, []);

  // When loading reaches 100% and minimum display time (1.2s) has passed, trigger fade-out
  useEffect(() => {
    if (displayProgress >= 100 && !isCompleteRef.current) {
      isCompleteRef.current = true;
      const elapsed = startTimeRef.current ? Date.now() - startTimeRef.current : 1200;
      const minDisplayDuration = 1200; // Minimum duration for royal anticipation
      const remainingTime = Math.max(0, minDisplayDuration - elapsed);

      const timer = setTimeout(() => {
        setIsFadingOut(true);
        // Call onComplete after exit animation finishes (750ms)
        const exitTimer = setTimeout(() => {
          if (onComplete) onComplete();
        }, 750);
        return () => clearTimeout(exitTimer);
      }, remainingTime + 200);

      return () => clearTimeout(timer);
    }
  }, [displayProgress, onComplete]);

  return (
    <div
      className={`royal-preloader ${isFadingOut ? 'preloader-fade-out' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Royal Wedding Invitation"
    >
      {/* Ambient background glowing light & rotating subtle mandala */}
      <div className="preloader-bg-pattern" aria-hidden="true" />
      <div className="preloader-mandala" aria-hidden="true">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" stroke="url(#preloaderGoldStroke)" strokeWidth="0.8" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="70" stroke="url(#preloaderGoldStroke)" strokeWidth="0.8" />
          <circle cx="100" cy="100" r="50" stroke="url(#preloaderGoldStroke)" strokeWidth="0.6" strokeDasharray="2 4" />
          {[...Array(12)].map((_, i) => (
            <path
              key={i}
              d="M100 20 C108 45, 120 60, 100 100 C80 60, 92 45, 100 20 Z"
              fill="none"
              stroke="url(#preloaderGoldStroke)"
              strokeWidth="0.6"
              transform={`rotate(${i * 30} 100 100)`}
            />
          ))}
          <defs>
            <linearGradient id="preloaderGoldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DFB247" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#FFF1B0" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#A37116" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Ornate Corner Accents */}
      <div className="preloader-corner preloader-corner-tl" aria-hidden="true">
        <svg viewBox="0 0 60 60" fill="none">
          <path d="M4 56 V12 C4 7.58 7.58 4 12 4 H56" stroke="url(#preloaderCornerGold)" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="3" fill="#DFB247" />
        </svg>
      </div>
      <div className="preloader-corner preloader-corner-tr" aria-hidden="true">
        <svg viewBox="0 0 60 60" fill="none">
          <path d="M56 56 V12 C56 7.58 52.42 4 48 4 H4" stroke="url(#preloaderCornerGold)" strokeWidth="1.5" />
          <circle cx="48" cy="12" r="3" fill="#DFB247" />
        </svg>
      </div>
      <div className="preloader-corner preloader-corner-bl" aria-hidden="true">
        <svg viewBox="0 0 60 60" fill="none">
          <path d="M4 4 V48 C4 52.42 7.58 56 12 56 H56" stroke="url(#preloaderCornerGold)" strokeWidth="1.5" />
          <circle cx="12" cy="48" r="3" fill="#DFB247" />
        </svg>
      </div>
      <div className="preloader-corner preloader-corner-br" aria-hidden="true">
        <svg viewBox="0 0 60 60" fill="none">
          <path d="M56 4 V48 C56 52.42 52.42 56 48 56 H4" stroke="url(#preloaderCornerGold)" strokeWidth="1.5" />
          <circle cx="48" cy="48" r="3" fill="#DFB247" />
        </svg>
      </div>

      <svg width="0" height="0" className="preloader-defs">
        <defs>
          <linearGradient id="preloaderCornerGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF1B0" />
            <stop offset="50%" stopColor="#DFB247" />
            <stop offset="100%" stopColor="#A37116" />
          </linearGradient>
          <linearGradient id="preloaderEmblemGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF7D1" />
            <stop offset="35%" stopColor="#E2BD63" />
            <stop offset="70%" stopColor="#AA7C11" />
            <stop offset="100%" stopColor="#6E4A0C" />
          </linearGradient>
          <radialGradient id="preloaderHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#DFB247" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#DFB247" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#DFB247" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Main Preloader Card */}
      <div className="preloader-card">
        {/* Sacred Jain Invocation */}
        <div className="preloader-shloka" aria-hidden="true">
          ॥ श्री महावीराय नमः ॥
        </div>

        {/* Ornate Royal Couple Monogram */}
        <div className="preloader-emblem-wrap">
          <div className="preloader-halo-pulse" aria-hidden="true" />
          <div className="preloader-emblem">
            <svg viewBox="0 0 120 120" className="preloader-emblem-svg">
              {/* Outer scalloped beaded rim */}
              <circle cx="60" cy="60" r="54" fill="#240711" stroke="url(#preloaderEmblemGold)" strokeWidth="2.5" />
              <circle cx="60" cy="60" r="48" fill="none" stroke="url(#preloaderEmblemGold)" strokeWidth="0.8" strokeDasharray="3 2" />
              {/* Lotus petal fluting */}
              {[...Array(16)].map((_, i) => (
                <circle
                  key={i}
                  cx={60 + 51 * Math.cos((i * 22.5 * Math.PI) / 180)}
                  cy={60 + 51 * Math.sin((i * 22.5 * Math.PI) / 180)}
                  r="1.8"
                  fill="#FFF0A0"
                />
              ))}
            </svg>
            <div className="preloader-monogram">
              <span className="monogram-letter">R</span>
              <span className="monogram-heart">♥</span>
              <span className="monogram-letter">P</span>
            </div>
          </div>
        </div>

        {/* Couple Names & Title */}
        <div className="preloader-typography">
          <h1 className="preloader-names">Rohit &amp; Priyanshi</h1>
          <p className="preloader-subtitle">Wedding Celebration</p>
        </div>

        {/* Ornate Progress Bar & Percentage */}
        <div className="preloader-progress-section">
          <div className="preloader-bar-outer">
            <div className="preloader-bar-finial finial-left" aria-hidden="true">◆</div>
            <div className="preloader-bar-track">
              <div
                className="preloader-bar-fill"
                style={{ width: `${displayProgress}%` }}
              >
                <div className="preloader-bar-shimmer" />
              </div>
            </div>
            <div className="preloader-bar-finial finial-right" aria-hidden="true">◆</div>
          </div>

          <div className="preloader-meta">
            <span className="preloader-status">{statusMessage}</span>
            <span className="preloader-percentage">{displayProgress}%</span>
          </div>
        </div>

        {/* Golden Sacred Diya Flame */}
        <div className="preloader-diya" aria-hidden="true">
          <div className="diya-glow" />
          <div className="diya-flame" />
          <div className="diya-wick" />
          <div className="diya-base" />
        </div>
      </div>
    </div>
  );
}
