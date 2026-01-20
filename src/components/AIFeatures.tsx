import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';

// Types
interface AIFeature {
  id: string;
  badge: string;
  title: string;
  description: string;
}

interface AIFeaturesProps {
  className?: string;
}

interface HeroStep {
  number: number;
  title: string;
  description: string;
}

// Hero feature steps
const heroSteps: HeroStep[] = [
  {
    number: 1,
    title: 'Tap the Search Bar',
    description: 'Open "What happened here?" from anywhere on the map',
  },
  {
    number: 2,
    title: 'Choose Your Radius',
    description: 'Local (500m), Area (2km), or City (10km)',
  },
  {
    number: 3,
    title: 'Search Anything',
    description: 'Type any topic and watch AI populate your map',
  },
];

// Example search queries
const exampleQueries = [
  'perfumes',
  'famous crimes',
  'music history',
  'architecture',
  'celebrity homes',
  'film locations',
  'scientific discoveries',
  'political events',
];

// Feature data with exact copy
const features: AIFeature[] = [
  {
    id: 'ai-search',
    badge: 'Search',
    title: 'AI Search Service',
    description: 'Generate 20-25 historical markers per search using advanced AI models with search grounding for verified facts.',
  },
  {
    id: 'hyper-local',
    badge: 'Location',
    title: 'What Happened Here',
    description: 'Hyper-local discovery within 200-500m radius revealing hidden historical events at your exact location.',
  },
  {
    id: 'radius-search',
    badge: 'Scoped',
    title: 'Radius Search',
    description: 'Three search scopes: Local (500m), Area (2km), and City-wide (10km) for customized exploration.',
  },
  {
    id: 'auto-tours',
    badge: 'Tours',
    title: 'Auto-Generated Walking Tours',
    description: 'AI discovers themes and patterns to create cohesive walking tours from nearby historical markers.',
  },
  {
    id: 'route-optimization',
    badge: 'Routing',
    title: 'Route Optimization',
    description: 'Nearest-neighbor algorithm calculates optimal walking paths between selected historical points.',
  },
  {
    id: 'smart-geocoding',
    badge: 'Geo',
    title: 'Smart Geocoding',
    description: 'Address-to-coordinates conversion with intelligent location parsing and validation.',
  },
];

// Optimized animation variants - reduced complexity for better performance
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Faster stagger
      delayChildren: 0.1,
    },
  },
};

const phoneVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut' as const,
    },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
};

const heroCardVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const pillVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.3 + i * 0.05,
      duration: 0.3,
      ease: 'easeOut',
    },
  }),
};

// Styles
const styles: { [key: string]: React.CSSProperties } = {
  section: {
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    padding: '100px 0',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: '"Space Grotesk", sans-serif',
  },
  gradientOrb1: {
    position: 'absolute',
    top: '-20%',
    left: '-10%',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255, 107, 0, 0.12) 0%, transparent 70%)',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  gradientOrb2: {
    position: 'absolute',
    bottom: '-30%',
    right: '-15%',
    width: '700px',
    height: '700px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(26, 188, 156, 0.08) 0%, transparent 70%)',
    filter: 'blur(80px)',
    pointerEvents: 'none',
  },
  gradientOrb3: {
    position: 'absolute',
    top: '40%',
    right: '20%',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255, 165, 0, 0.08) 0%, transparent 70%)',
    filter: 'blur(50px)',
    pointerEvents: 'none',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    position: 'relative',
    zIndex: 1,
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '64px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.15) 0%, rgba(255, 165, 0, 0.1) 100%)',
    border: '1px solid rgba(255, 107, 0, 0.3)',
    borderRadius: '9999px',
    marginBottom: '24px',
    backdropFilter: 'blur(10px)',
  },
  badgeDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #FF6B00 0%, #FFA500 100%)',
    boxShadow: '0 0 12px rgba(255, 107, 0, 0.6)',
    animation: 'pulse 2s ease-in-out infinite',
  },
  badgeText: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#FF6B00',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    fontFamily: '"Space Grotesk", sans-serif',
  },
  heading: {
    fontSize: 'clamp(32px, 5vw, 48px)',
    fontWeight: 700,
    color: '#ffffff',
    margin: '0 0 16px 0',
    fontFamily: '"Space Grotesk", sans-serif',
    letterSpacing: '-0.02em',
  },
  subheading: {
    fontSize: '18px',
    color: 'rgba(255, 255, 255, 0.6)',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: 1.7,
    fontFamily: '"Space Grotesk", sans-serif',
    fontWeight: 400,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  },
  card: {
    position: 'relative' as const,
    padding: '28px',
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: 'blur(10px)',
  },
  cardBadge: {
    display: 'inline-block',
    padding: '6px 14px',
    background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.2) 0%, rgba(255, 165, 0, 0.15) 100%)',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: 600,
    color: '#FF6B00',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    marginBottom: '18px',
    fontFamily: '"Space Grotesk", sans-serif',
    border: '1px solid rgba(255, 107, 0, 0.25)',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#ffffff',
    margin: '0 0 12px 0',
    fontFamily: '"Space Grotesk", sans-serif',
    letterSpacing: '-0.01em',
    lineHeight: 1.3,
  },
  cardDescription: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: 1.7,
    margin: 0,
    fontFamily: '"Space Grotesk", sans-serif',
    fontWeight: 400,
  },
  phoneMockupContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '64px',
  },
  phoneMockupWrapper: {
    position: 'relative' as const,
  },
  phoneGlow: {
    position: 'absolute' as const,
    top: '-20px',
    left: '-20px',
    right: '-20px',
    bottom: '-20px',
    borderRadius: '50px',
    background: 'radial-gradient(ellipse at center, rgba(255, 107, 0, 0.3) 0%, rgba(255, 165, 0, 0.18) 40%, transparent 70%)',
    filter: 'blur(30px)',
    pointerEvents: 'none' as const,
    zIndex: 0,
  },
  phoneFrame: {
    position: 'relative' as const,
    width: '280px',
    height: '560px',
    background: 'linear-gradient(145deg, #1a1a2e 0%, #0d0d1a 100%)',
    borderRadius: '40px',
    padding: '12px',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)',
    zIndex: 1,
  },
  phoneScreen: {
    width: '100%',
    height: '100%',
    borderRadius: '30px',
    overflow: 'hidden' as const,
    background: '#000',
    position: 'relative' as const,
  },
  phoneNotch: {
    position: 'absolute' as const,
    top: '8px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100px',
    height: '28px',
    background: '#0d0d1a',
    borderRadius: '20px',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneCamera: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: 'linear-gradient(145deg, #1a1a2e, #2a2a4e)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  phoneImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  // Hero Feature Section Styles
  heroFeatureSection: {
    display: 'grid',
    gridTemplateColumns: '1fr 320px',
    gap: '48px',
    alignItems: 'center',
    marginBottom: '80px',
  },
  heroFeatureCard: {
    background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.12) 0%, rgba(255, 165, 0, 0.08) 100%)',
    border: '2px solid rgba(255, 107, 0, 0.3)',
    borderRadius: '24px',
    padding: '40px',
    position: 'relative' as const,
    overflow: 'hidden' as const,
  },
  heroCardGlow: {
    position: 'absolute' as const,
    top: '-50%',
    right: '-30%',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255, 107, 0, 0.18) 0%, transparent 70%)',
    filter: 'blur(40px)',
    pointerEvents: 'none' as const,
  },
  heroFeatureBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    background: 'linear-gradient(135deg, #FF6B00 0%, #FFA500 100%)',
    borderRadius: '20px',
    marginBottom: '20px',
  },
  heroFeatureBadgeText: {
    fontSize: '12px',
    fontWeight: 700,
    color: '#ffffff',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    fontFamily: '"Space Grotesk", sans-serif',
  },
  heroFeatureTitle: {
    fontSize: 'clamp(28px, 4vw, 36px)',
    fontWeight: 700,
    color: '#ffffff',
    margin: '0 0 12px 0',
    fontFamily: '"Space Grotesk", sans-serif',
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
  },
  heroFeatureSubtitle: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.7)',
    margin: '0 0 32px 0',
    lineHeight: 1.6,
    fontFamily: '"Space Grotesk", sans-serif',
  },
  stepsContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
    marginBottom: '32px',
  },
  stepItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
  },
  stepNumber: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #FF6B00 0%, #FFA500 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 700,
    color: '#ffffff',
    fontFamily: '"Space Grotesk", sans-serif',
    flexShrink: 0,
    boxShadow: '0 4px 15px rgba(255, 107, 0, 0.4)',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#ffffff',
    margin: '0 0 4px 0',
    fontFamily: '"Space Grotesk", sans-serif',
  },
  stepDescription: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.6)',
    margin: 0,
    fontFamily: '"Space Grotesk", sans-serif',
    lineHeight: 1.5,
  },
  exampleQueriesLabel: {
    fontSize: '13px',
    fontWeight: 600,
    color: 'rgba(255, 255, 255, 0.5)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    marginBottom: '12px',
    fontFamily: '"Space Grotesk", sans-serif',
  },
  exampleQueriesContainer: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '8px',
    marginBottom: '24px',
  },
  queryPill: {
    padding: '8px 16px',
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '20px',
    fontSize: '13px',
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: '"Space Grotesk", sans-serif',
    cursor: 'default',
    transition: 'all 0.2s ease',
  },
  globalBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    background: 'rgba(78, 205, 196, 0.1)',
    border: '1px solid rgba(78, 205, 196, 0.3)',
    borderRadius: '12px',
  },
  globeIcon: {
    width: '20px',
    height: '20px',
    color: '#4ECDC4',
  },
  globalText: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#4ECDC4',
    fontFamily: '"Space Grotesk", sans-serif',
  },
  moreFeaturesLabel: {
    fontSize: '14px',
    fontWeight: 600,
    color: 'rgba(255, 255, 255, 0.5)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    marginBottom: '24px',
    textAlign: 'center' as const,
    fontFamily: '"Space Grotesk", sans-serif',
  },
};

// Keyframe animations - simplified for better performance
const keyframes = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }
  /* Simplified orb animations - less scaling for better performance */
  @keyframes floatOrb1 {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(20px, -15px); }
  }
  @keyframes floatOrb2 {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-25px, 20px); }
  }
  @keyframes floatOrb3 {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(15px, 25px); }
  }
  @keyframes floatPhone {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  @keyframes glowPulse {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
  }

  /* Responsive styles for hero section */
  @media (max-width: 900px) {
    .hero-feature-section {
      grid-template-columns: 1fr !important;
      gap: 32px !important;
    }
    .hero-feature-section > div:last-child {
      order: -1;
    }
  }
  @media (max-width: 600px) {
    .hero-feature-card {
      padding: 24px !important;
    }
  }

  /* Reduce motion for users who prefer it */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
    }
  }
`;

// Card component with hover state
const FeatureCard: React.FC<{ feature: AIFeature }> = ({ feature }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle: React.CSSProperties = {
    ...styles.card,
    background: isHovered
      ? 'rgba(255, 107, 0, 0.1)'
      : 'rgba(255, 255, 255, 0.05)',
    borderColor: isHovered
      ? '#FF6B00'
      : 'rgba(255, 255, 255, 0.1)',
    boxShadow: isHovered
      ? '0 0 30px rgba(255, 107, 0, 0.2), 0 8px 32px rgba(0, 0, 0, 0.3)'
      : '0 4px 20px rgba(0, 0, 0, 0.2)',
    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
  };

  return (
    <motion.div
      style={cardStyle}
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Badge */}
      <div style={styles.cardBadge}>{feature.badge}</div>

      {/* Content */}
      <h3 style={styles.cardTitle}>{feature.title}</h3>
      <p style={styles.cardDescription}>{feature.description}</p>
    </motion.div>
  );
};

// Phone Mockup component (now smaller for hero section)
const PhoneMockupCompact: React.FC = () => {
  return (
    <motion.div
      style={{ display: 'flex', justifyContent: 'center' }}
      variants={phoneVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div
        style={{
          ...styles.phoneMockupWrapper,
          animation: 'floatPhone 4s ease-in-out infinite',
        }}
      >
        {/* Glow effect */}
        <div
          style={{
            ...styles.phoneGlow,
            animation: 'glowPulse 3s ease-in-out infinite',
          }}
        />

        {/* Phone frame */}
        <div style={styles.phoneFrame}>
          <div style={styles.phoneScreen}>
            {/* Notch */}
            <div style={styles.phoneNotch}>
              <div style={styles.phoneCamera} />
            </div>

            {/* Screenshot */}
            <img
              src="/hero-phone.jpg"
              alt="AI-generated marker detail card"
              style={styles.phoneImage}
              loading="lazy"
              width={256}
              height={536}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Query Pill component with hover effect
const QueryPill: React.FC<{ query: string; index: number }> = ({ query, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.span
      style={{
        ...styles.queryPill,
        background: isHovered
          ? 'rgba(255, 107, 0, 0.15)'
          : 'rgba(255, 255, 255, 0.08)',
        borderColor: isHovered
          ? 'rgba(255, 107, 0, 0.4)'
          : 'rgba(255, 255, 255, 0.15)',
        color: isHovered ? '#FF6B00' : 'rgba(255, 255, 255, 0.8)',
      }}
      variants={pillVariants}
      custom={index}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {query}
    </motion.span>
  );
};

// Globe Icon SVG component
const GlobeIcon: React.FC = () => (
  <svg
    style={styles.globeIcon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

// Hero Feature Section component
const HeroFeatureSection: React.FC = () => {
  return (
    <motion.div
      className="hero-feature-section"
      style={styles.heroFeatureSection}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Hero Feature Card */}
      <motion.div
        className="hero-feature-card"
        style={styles.heroFeatureCard}
        variants={heroCardVariants}
      >
        {/* Glow effect */}
        <div style={styles.heroCardGlow} />

        {/* Badge */}
        <div style={styles.heroFeatureBadge}>
          <span style={styles.heroFeatureBadgeText}>Hero Feature</span>
        </div>

        {/* Title */}
        <h3 style={styles.heroFeatureTitle}>
          "What happened here?" AI Search
        </h3>
        <p style={styles.heroFeatureSubtitle}>
          Turn any location into a living history book. AI instantly generates historical markers based on your interests.
        </p>

        {/* Steps */}
        <div style={styles.stepsContainer}>
          {heroSteps.map((step, index) => (
            <motion.div
              key={step.number}
              style={styles.stepItem}
              variants={stepVariants}
              custom={index}
            >
              <div style={styles.stepNumber}>{step.number}</div>
              <div style={styles.stepContent}>
                <h4 style={styles.stepTitle}>{step.title}</h4>
                <p style={styles.stepDescription}>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Example Queries */}
        <div style={styles.exampleQueriesLabel}>Try searching for:</div>
        <motion.div
          style={styles.exampleQueriesContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {exampleQueries.map((query, index) => (
            <QueryPill key={query} query={query} index={index} />
          ))}
        </motion.div>

        {/* Global Badge */}
        <div style={styles.globalBadge}>
          <GlobeIcon />
          <span style={styles.globalText}>Works anywhere in the world</span>
        </div>
      </motion.div>

      {/* Phone Mockup */}
      <PhoneMockupCompact />
    </motion.div>
  );
};

// Component
const AIFeatures: React.FC<AIFeaturesProps> = ({ className }) => {
  return (
    <section id="ai" style={styles.section} className={className}>
      <style>{keyframes}</style>

      {/* Animated gradient orbs */}
      <motion.div
        style={{
          ...styles.gradientOrb1,
          animation: 'floatOrb1 15s ease-in-out infinite',
        }}
      />
      <motion.div
        style={{
          ...styles.gradientOrb2,
          animation: 'floatOrb2 18s ease-in-out infinite',
        }}
      />
      <motion.div
        style={{
          ...styles.gradientOrb3,
          animation: 'floatOrb3 12s ease-in-out infinite',
        }}
      />

      <div style={styles.container}>
        {/* Header */}
        <motion.div
          style={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div style={styles.badge} variants={badgeVariants}>
            <div style={styles.badgeDot} />
            <span style={styles.badgeText}>AI-Powered</span>
          </motion.div>

          <motion.h2 style={styles.heading} variants={titleVariants}>
            Intelligent Historical Discovery
          </motion.h2>

          <motion.p style={styles.subheading} variants={titleVariants}>
            Powered by advanced AI models with search grounding for verified, fascinating historical facts.
          </motion.p>
        </motion.div>

        {/* Hero Feature Section with Phone Mockup */}
        <HeroFeatureSection />

        {/* More Features Label */}
        <motion.div
          style={styles.moreFeaturesLabel}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          More AI-Powered Features
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          style={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AIFeatures;
