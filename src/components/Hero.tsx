import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Hero.less';

// Type definitions
interface StatItem {
  value: string;
  label: string;
  delay: number;
}

interface GradientOrb {
  size: number;
  x: string;
  y: string;
  color: string;
  duration: number;
  delay: number;
}

// Stats data with separated value and label for better hierarchy
const stats: StatItem[] = [
  { value: '600K+', label: 'Historical Markers', delay: 0 },
  { value: '1,500+', label: 'Cities Worldwide', delay: 0.05 },
  { value: '17', label: 'Categories', delay: 0.1 },
];

// Animated gradient orbs for depth - reduced to 3 orbs for better performance
const gradientOrbs: GradientOrb[] = [
  { size: 400, x: '10%', y: '20%', color: 'rgba(255, 107, 0, 0.12)', duration: 20, delay: 0 },
  { size: 300, x: '80%', y: '60%', color: 'rgba(26, 188, 156, 0.1)', duration: 25, delay: 0 },
  { size: 350, x: '20%', y: '70%', color: 'rgba(255, 140, 0, 0.1)', duration: 22, delay: 0 },
];

// Fast fade-in for content - minimal delays
const fastFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: delay * 0.5, // Halved delays
      ease: 'easeOut',
    },
  }),
};

// Stats appear quickly
const statVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      delay: 0.2 + delay,
      ease: 'easeOut',
    },
  }),
};

// Phone entrance - faster and simpler
const phoneEntranceVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: 0.1,
      ease: 'easeOut',
    },
  },
};

// Inline styles
const styles: { [key: string]: React.CSSProperties } = {
  hero: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    fontFamily: "'Space Grotesk', sans-serif",
  },
  gradientBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0d1421 100%)',
    zIndex: 0,
  },
  orbContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  patternOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
    pointerEvents: 'none',
    opacity: 0.03,
  },
  container: {
    position: 'relative',
    zIndex: 3,
    maxWidth: '1400px',
    width: '100%',
    margin: '0 auto',
    padding: '0 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '4rem',
  },
  leftContent: {
    flex: '1 1 50%',
    maxWidth: '600px',
    textAlign: 'left',
  },
  rightContent: {
    flex: '1 1 50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandContainer: {
    marginBottom: '2rem',
  },
  brandName: {
    fontSize: '1rem',
    fontWeight: 500,
    color: 'rgba(255, 255, 255, 0.95)',
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    display: 'inline-block',
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.2) 0%, rgba(255, 165, 0, 0.15) 100%)',
    backdropFilter: 'blur(10px)',
    borderRadius: '100px',
    border: '1px solid rgba(255, 107, 0, 0.3)',
  },
  headlineContainer: {
    marginBottom: '2rem',
  },
  headline: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: 700,
    color: '#ffffff',
    textShadow: '0 4px 60px rgba(0, 0, 0, 0.15)',
    margin: 0,
    lineHeight: 1.05,
    letterSpacing: '-0.02em',
  },
  tagline: {
    fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
    fontWeight: 400,
    color: 'rgba(255, 255, 255, 0.9)',
    maxWidth: '500px',
    margin: 0,
    lineHeight: 1.7,
    letterSpacing: '0.01em',
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '1rem',
    flexWrap: 'wrap',
    marginTop: '3rem',
  },
  statCard: {
    padding: '1.25rem 1.75rem',
    background: 'rgba(255, 107, 0, 0.1)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 107, 0, 0.25)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    minWidth: '140px',
    cursor: 'default',
  },
  statValue: {
    fontSize: '1.75rem',
    fontWeight: 700,
    color: '#ffffff',
    display: 'block',
    marginBottom: '0.25rem',
    letterSpacing: '-0.02em',
  },
  statLabel: {
    fontSize: '0.85rem',
    fontWeight: 400,
    color: 'rgba(255, 255, 255, 0.85)',
    display: 'block',
    letterSpacing: '0.02em',
  },
  // Phone mockup styles
  phoneWrapper: {
    position: 'relative',
  },
  phoneFrame: {
    position: 'relative',
    width: '320px',
    height: '650px',
    borderRadius: '40px',
    background: '#1a1a1a',
    padding: '12px',
    boxShadow: '0 50px 100px rgba(0, 0, 0, 0.3), 0 20px 60px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
  },
  phoneScreen: {
    width: '100%',
    height: '100%',
    borderRadius: '32px',
    overflow: 'hidden',
    background: '#000',
  },
  phoneImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'top',
  },
  phoneNotch: {
    position: 'absolute',
    top: '12px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '120px',
    height: '28px',
    background: '#1a1a1a',
    borderRadius: '0 0 20px 20px',
    zIndex: 10,
  },
  phoneGlow: {
    position: 'absolute',
    top: '-20%',
    left: '-20%',
    right: '-20%',
    bottom: '-20%',
    background: 'radial-gradient(circle at center, rgba(255, 107, 0, 0.25) 0%, rgba(26, 188, 156, 0.1) 50%, transparent 70%)',
    borderRadius: '50%',
    zIndex: -1,
    filter: 'blur(40px)',
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: '3rem',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 3,
  },
  scrollPill: {
    width: '28px',
    height: '48px',
    borderRadius: '14px',
    border: '2px solid rgba(255, 255, 255, 0.4)',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '8px',
  },
  scrollDot: {
    width: '4px',
    height: '8px',
    borderRadius: '2px',
    background: 'rgba(255, 255, 255, 0.6)',
  },
  // App Store Button styles
  appStoreSection: {
    marginTop: '2.5rem',
    marginBottom: '1rem',
  },
  appStoreButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 32px',
    background: '#000000',
    borderRadius: '14px',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    textDecoration: 'none',
    cursor: 'pointer',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 60px rgba(255, 107, 0, 0.2)',
  },
  appStoreLogo: {
    width: '32px',
    height: '32px',
  },
  appStoreText: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
  },
  appStoreSmall: {
    fontSize: '11px',
    fontWeight: 400,
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: '0.02em',
    lineHeight: 1,
  },
  appStoreLarge: {
    fontSize: '22px',
    fontWeight: 600,
    color: '#ffffff',
    letterSpacing: '-0.01em',
    lineHeight: 1.2,
  },
};

// Dot Grid Pattern Component (3% opacity)
const DotPattern: React.FC = () => (
  <svg style={styles.patternOverlay} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="dotGrid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
        <circle cx="15" cy="15" r="1" fill="rgba(255, 255, 255, 1)" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dotGrid)" />
  </svg>
);

// Gradient Orb Component - uses CSS animation for better performance
const GradientOrbComponent: React.FC<{ orb: GradientOrb; index: number }> = ({ orb, index }) => (
  <div
    className={`hero-orb hero-orb-${index}`}
    style={{
      position: 'absolute',
      left: orb.x,
      top: orb.y,
      width: orb.size,
      height: orb.size,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
      filter: 'blur(40px)',
      willChange: 'transform',
    }}
  />
);

const Hero: React.FC = () => {
  // Track if page has loaded to enable floating animations after initial render
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Enable floating animations after a short delay to prioritize initial render
    const timer = setTimeout(() => setIsLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Google Fonts Import and Responsive Styles */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

          /* CSS-based orb animations - more performant than JS */
          @keyframes orbFloat0 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(15px, -20px); }
          }
          @keyframes orbFloat1 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-10px, 25px); }
          }
          @keyframes orbFloat2 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(20px, 15px); }
          }

          .hero-orb-0 { animation: orbFloat0 20s ease-in-out infinite; }
          .hero-orb-1 { animation: orbFloat1 25s ease-in-out infinite; }
          .hero-orb-2 { animation: orbFloat2 22s ease-in-out infinite; }

          /* Phone floating animation - CSS based, only after load */
          @keyframes phoneFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
          }

          .hero-phone-wrapper.loaded {
            animation: phoneFloat 5s ease-in-out infinite;
          }

          /* Scroll indicator animation */
          @keyframes scrollBounce {
            0%, 100% { transform: translateY(0); opacity: 1; }
            50% { transform: translateY(12px); opacity: 0.4; }
          }

          .scroll-dot-animated {
            animation: scrollBounce 1.8s ease-in-out infinite;
          }

          /* App Store button animations */
          @keyframes appStoreGlow {
            0%, 100% { box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 60px rgba(255, 107, 0, 0.2); }
            50% { box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 80px rgba(255, 107, 0, 0.35), 0 0 120px rgba(255, 165, 0, 0.15); }
          }

          .app-store-button {
            animation: appStoreGlow 3s ease-in-out infinite;
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }

          .app-store-button:hover {
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5), 0 0 100px rgba(255, 107, 0, 0.4), 0 0 150px rgba(255, 165, 0, 0.2) !important;
            border-color: rgba(255, 255, 255, 0.4);
          }

          /* Responsive styles for Hero */
          @media (max-width: 968px) {
            .hero-container {
              flex-direction: column !important;
              text-align: center !important;
              gap: 3rem !important;
              padding-top: 100px !important;
              padding-bottom: 100px !important;
            }
            .hero-left-content {
              text-align: center !important;
              max-width: 100% !important;
            }
            .hero-stats-container {
              justify-content: center !important;
            }
            .hero-tagline {
              margin: 0 auto !important;
            }
            .hero-phone-wrapper {
              transform: rotate(0deg) !important;
            }
            .hero-phone-wrapper.loaded {
              animation: none !important;
            }
            .hero-phone-frame {
              width: 280px !important;
              height: 570px !important;
            }
            .app-store-section {
              text-align: center !important;
            }
          }

          @media (max-width: 480px) {
            .hero-phone-frame {
              width: 240px !important;
              height: 490px !important;
            }
            .hero-stat-card {
              min-width: 120px !important;
              padding: 1rem 1.25rem !important;
            }
            .app-store-button {
              padding: 14px 24px !important;
            }
          }

          /* Reduce motion for users who prefer it */
          @media (prefers-reduced-motion: reduce) {
            .hero-orb-0, .hero-orb-1, .hero-orb-2,
            .hero-phone-wrapper.loaded,
            .scroll-dot-animated,
            .app-store-button {
              animation: none !important;
            }
          }
        `}
      </style>

      <section id="hero" style={styles.hero}>
        {/* Background Gradient */}
        <div style={styles.gradientBg} />

        {/* Animated Gradient Orbs - CSS animations for performance */}
        <div style={styles.orbContainer}>
          {gradientOrbs.map((orb, index) => (
            <GradientOrbComponent key={index} orb={orb} index={index} />
          ))}
        </div>

        {/* Dot Grid Pattern Overlay */}
        <DotPattern />

        {/* Main Content - Split Layout */}
        <div className="hero-container" style={styles.container}>
          {/* Left Side - Text Content */}
          <div className="hero-left-content" style={styles.leftContent}>
            {/* Brand Name Badge - instant appearance */}
            <motion.div
              style={{ ...styles.brandContainer, willChange: 'opacity, transform' }}
              initial="hidden"
              animate="visible"
              custom={0}
              variants={fastFadeIn}
            >
              <span style={styles.brandName}>Leirz</span>
            </motion.div>

            {/* Headline - no floating animation on initial load */}
            <div style={styles.headlineContainer}>
              <motion.h1
                style={{ ...styles.headline, willChange: 'opacity, transform' }}
                initial="hidden"
                animate="visible"
                custom={0.05}
                variants={fastFadeIn}
              >
                Discover History
                <br />
                Around You
              </motion.h1>
            </div>

            {/* Tagline - fast appearance */}
            <motion.p
              className="hero-tagline"
              style={{ ...styles.tagline, willChange: 'opacity, transform' }}
              initial="hidden"
              animate="visible"
              custom={0.1}
              variants={fastFadeIn}
            >
              Uncover the hidden stories beneath your feet. AI-powered historical
              discovery that transforms every location into a portal to the past.
            </motion.p>

            {/* App Store Download Button - Primary CTA */}
            <motion.div
              className="app-store-section"
              style={styles.appStoreSection}
              initial="hidden"
              animate="visible"
              custom={0.2}
              variants={fastFadeIn}
            >
              <a
                href="https://apps.apple.com/us/app/layers-tales-irl/id6742537781"
                target="_blank"
                rel="noopener noreferrer"
                className="app-store-button"
                style={styles.appStoreButton}
              >
                {/* Apple Logo SVG */}
                <svg style={styles.appStoreLogo} viewBox="0 0 384 512" fill="white">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.5-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                </svg>
                <div style={styles.appStoreText}>
                  <span style={styles.appStoreSmall}>Download on the</span>
                  <span style={styles.appStoreLarge}>App Store</span>
                </div>
              </a>
            </motion.div>

            {/* Glass Stats Cards - quick staggered appearance */}
            <div className="hero-stats-container" style={styles.statsContainer}>
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className="hero-stat-card"
                  style={{ ...styles.statCard, willChange: 'opacity, transform' }}
                  initial="hidden"
                  animate="visible"
                  custom={stat.delay}
                  variants={statVariants}
                  whileHover={{
                    scale: 1.03,
                    background: 'rgba(255, 107, 0, 0.18)',
                    boxShadow: '0 12px 40px rgba(255, 107, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                    transition: { duration: 0.2 },
                  }}
                >
                  <span style={styles.statValue}>{stat.value}</span>
                  <span style={styles.statLabel}>{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side - Phone Mockup */}
          <div style={styles.rightContent}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={phoneEntranceVariants}
              style={{ willChange: 'opacity, transform' }}
            >
              {/* Phone wrapper uses CSS animation for floating - only after load */}
              <div
                className={`hero-phone-wrapper ${isLoaded ? 'loaded' : ''}`}
                style={styles.phoneWrapper}
              >
                {/* Glow effect behind phone */}
                <div style={styles.phoneGlow} />

                {/* Phone Frame */}
                <div className="hero-phone-frame" style={styles.phoneFrame}>
                  {/* Dynamic Island / Notch */}
                  <div style={styles.phoneNotch} />

                  {/* Screen */}
                  <div style={styles.phoneScreen}>
                    <img
                      src="/ai-detail.jpg"
                      alt="Layers: Tales IRL app - Discover history around you"
                      style={styles.phoneImage}
                      loading="eager"
                      width={296}
                      height={626}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Modern Scroll Indicator - CSS animation for better performance */}
        <motion.div
          style={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <div style={styles.scrollPill}>
            <div className="scroll-dot-animated" style={styles.scrollDot} />
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;
