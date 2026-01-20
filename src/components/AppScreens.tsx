import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Screen data for all 8 app screens
interface AppScreen {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const appScreensData: AppScreen[] = [
  {
    id: 1,
    title: 'Map Screen',
    description: 'Interactive map with marker clustering, category pill bar, "What Happened Here" long-press search',
    icon: '🗺️',
  },
  {
    id: 2,
    title: 'Marker Overlay',
    description: 'Rich marker details with period, vote buttons, save/bookmark toggle',
    icon: '📍',
  },
  {
    id: 3,
    title: 'My Collection',
    description: 'Explorer level card, quick stats, featured city showcase',
    icon: '📚',
  },
  {
    id: 4,
    title: 'Searches Screen',
    description: 'Search history grouped by city, swipe-to-delete',
    icon: '🔍',
  },
  {
    id: 5,
    title: 'Auth Screens',
    description: 'Onboarding carousel, email/password, Google/Apple Sign-In',
    icon: '🔐',
  },
  {
    id: 6,
    title: 'Settings Screen',
    description: 'Location services toggle, subscription tier display',
    icon: '⚙️',
  },
  {
    id: 7,
    title: 'Paywall Screen',
    description: 'Value propositions, annual vs monthly pricing',
    icon: '💎',
  },
  {
    id: 8,
    title: 'Loading Overlays',
    description: 'City loading with humor, "Did you know?" facts',
    icon: '⏳',
  },
];

// Screen Card Component
interface ScreenCardProps {
  screen: AppScreen;
  index: number;
}

const ScreenCard: React.FC<ScreenCardProps> = ({ screen, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={cardRef}
      style={{ ...styles.screenCard, willChange: 'transform' }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.4,
        delay: index * 0.05, // Faster stagger
        ease: 'easeOut',
      }}
      whileHover={{
        y: -8,
        boxShadow: '0 24px 36px rgba(25, 16, 21, 0.1), 0 6px 12px rgba(255, 106, 136, 0.06)',
        transition: { duration: 0.2, ease: 'easeOut' },
      }}
    >
      {/* Card Header with Gradient Accent */}
      <div style={styles.cardHeader}>
        <div style={styles.iconWrapper}>
          <span style={styles.icon}>{screen.icon}</span>
        </div>
        <div style={styles.cardNumber}>
          {String(screen.id).padStart(2, '0')}
        </div>
      </div>

      {/* Card Content */}
      <h3 style={styles.screenTitle}>{screen.title}</h3>
      <p style={styles.screenDescription}>{screen.description}</p>

      {/* Subtle gradient line accent */}
      <div style={styles.gradientAccent} />
    </motion.div>
  );
};

// Main Component
interface AppScreensProps {
  id?: string;
  className?: string;
}

const AppScreens: React.FC<AppScreensProps> = ({ id = 'screens', className = '' }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id={id} className={className} style={styles.section} ref={sectionRef}>
      <div style={styles.container}>
        {/* Header */}
        <motion.div
          style={styles.header}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Badge with Coral Gradient */}
          <motion.div
            style={styles.badge}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(255, 106, 136, 0.35)' }}
          >
            <span style={styles.badgeText}>App Screens</span>
          </motion.div>

          {/* Title with elegant typography */}
          <motion.h2
            style={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Beautifully Crafted Experience
          </motion.h2>

          <motion.p
            style={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Every screen designed for intuitive historical discovery.
          </motion.p>
        </motion.div>

        {/* Grid Container */}
        <motion.div
          style={styles.grid}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {appScreensData.map((screen, index) => (
            <ScreenCard key={screen.id} screen={screen} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Styles
const styles: { [key: string]: React.CSSProperties } = {
  section: {
    position: 'relative',
    padding: '120px 0',
    background: '#FAFAFA',
  },
  container: {
    maxWidth: '1240px',
    margin: '0 auto',
    padding: '0 32px',
    position: 'relative',
    zIndex: 1,
  },
  header: {
    textAlign: 'center',
    marginBottom: '72px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '12px 24px',
    borderRadius: '50px',
    background: 'linear-gradient(135deg, #FF6A88 0%, #FF9A8B 100%)',
    marginBottom: '28px',
    boxShadow: '0 4px 16px rgba(255, 106, 136, 0.25)',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: 600,
    letterSpacing: '0.8px',
    textTransform: 'uppercase' as const,
    fontFamily: '"Space Grotesk", sans-serif',
  },
  title: {
    fontSize: 'clamp(36px, 5vw, 52px)',
    fontWeight: 700,
    color: '#1A1A2E',
    lineHeight: 1.15,
    marginBottom: '20px',
    letterSpacing: '-0.02em',
    fontFamily: '"Space Grotesk", sans-serif',
  },
  subtitle: {
    fontSize: '19px',
    color: '#6B7280',
    maxWidth: '560px',
    margin: '0 auto',
    lineHeight: 1.7,
    fontWeight: 400,
    fontFamily: '"Space Grotesk", sans-serif',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '28px',
  },
  screenCard: {
    background: '#FFFFFF',
    borderRadius: '20px',
    padding: '32px',
    boxShadow: '0 4px 24px rgba(25, 16, 21, 0.06), 0 1px 3px rgba(25, 16, 21, 0.04)',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid rgba(0, 0, 0, 0.04)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
  },
  iconWrapper: {
    width: '52px',
    height: '52px',
    borderRadius: '14px',
    background: 'linear-gradient(135deg, rgba(255, 106, 136, 0.12) 0%, rgba(255, 154, 139, 0.12) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: '24px',
  },
  cardNumber: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#D1D5DB',
    fontFamily: '"Space Grotesk", sans-serif',
    letterSpacing: '0.5px',
  },
  screenTitle: {
    fontSize: '21px',
    fontWeight: 700,
    color: '#1A1A2E',
    marginBottom: '12px',
    margin: '0 0 12px 0',
    letterSpacing: '-0.01em',
    fontFamily: '"Space Grotesk", sans-serif',
  },
  screenDescription: {
    fontSize: '15px',
    color: '#6B7280',
    lineHeight: 1.65,
    margin: 0,
    fontFamily: '"Space Grotesk", sans-serif',
  },
  gradientAccent: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    height: '3px',
    background: 'linear-gradient(90deg, #FF6A88 0%, #FF9A8B 50%, transparent 100%)',
    opacity: 0.6,
    borderRadius: '0 0 20px 20px',
  },
};

export default AppScreens;
