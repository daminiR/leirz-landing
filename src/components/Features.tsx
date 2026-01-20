import React from 'react';
import { motion } from 'framer-motion';

// Feature data - highlighting what makes Leirz unique and impressive
const featuresData = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    title: '"What Happened Here" AI Search',
    description: 'AI-powered search reveals the fascinating history of any location you explore.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'Interactive Map Exploration',
    description: 'Explore historical markers on an interactive map with intuitive navigation and discovery.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
    ),
    title: 'Smart Category Filtering',
    description: 'Filter by 17+ categories including Crime, Art, Music, Sports, Fashion, and more.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20V10" />
        <path d="M18 20V4" />
        <path d="M6 20v-4" />
      </svg>
    ),
    title: 'Explorer Levels & Gamification',
    description: 'Earn levels, unlock achievements, and compete as you explore more historical sites.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
      </svg>
    ),
    title: 'Community Voting',
    description: 'Upvote the most interesting markers and see what others find fascinating.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: 'Multi-City Support',
    description: 'Discover history across 1500+ cities worldwide with comprehensive marker coverage.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'Personal Collections',
    description: 'Save and organize your favorite markers into custom collections for easy access.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: 'City Statistics & Insights',
    description: 'View detailed historical data and insights organized by city and region.',
  },
];

// Subtle coral/peach gradient for badge and icons
const coralPeachGradient = 'linear-gradient(135deg, #FF6A88 0%, #FF9A8B 100%)';

// Styles object with refined design specifications
const styles: { [key: string]: React.CSSProperties } = {
  section: {
    padding: '120px 24px',
    background: '#FFFFFF',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: '"Space Grotesk", sans-serif',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
  },
  header: {
    textAlign: 'center',
    marginBottom: '72px',
  },
  badge: {
    display: 'inline-block',
    padding: '8px 20px',
    background: coralPeachGradient,
    borderRadius: '50px',
    marginBottom: '24px',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: '13px',
    fontWeight: 600,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    margin: 0,
    fontFamily: '"Space Grotesk", sans-serif',
  },
  title: {
    fontSize: 'clamp(28px, 4.5vw, 44px)',
    fontWeight: 700,
    color: '#191015',
    marginBottom: '20px',
    lineHeight: 1.2,
    margin: 0,
    fontFamily: '"Space Grotesk", sans-serif',
  },
  description: {
    fontSize: '16px',
    color: '#7B7578',
    maxWidth: '560px',
    margin: '20px auto 0',
    lineHeight: 1.7,
    fontFamily: '"Space Grotesk", sans-serif',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '40px',
  },
  card: {
    background: '#FFFCFA',
    borderRadius: '20px',
    padding: '36px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    cursor: 'pointer',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  iconWrapper: {
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px',
    color: '#ffffff',
    background: coralPeachGradient,
  },
  icon: {
    width: '26px',
    height: '26px',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#191015',
    marginBottom: '12px',
    margin: '0 0 12px 0',
    fontFamily: '"Space Grotesk", sans-serif',
  },
  cardDescription: {
    fontSize: '14px',
    color: '#7B7578',
    lineHeight: 1.7,
    margin: 0,
    fontFamily: '"Space Grotesk", sans-serif',
  },
};

// Optimized animation variants - reduced complexity for better performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Faster stagger
      delayChildren: 0.1,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

// Individual Feature Card Component
interface FeatureCardProps {
  feature: typeof featuresData[0];
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  return (
    <motion.div
      variants={cardVariants}
      style={{ ...styles.card, willChange: 'transform' }}
      whileHover={{
        y: -6,
        boxShadow: '0 16px 20px -5px rgba(0, 0, 0, 0.1), 0 8px 8px -5px rgba(0, 0, 0, 0.04)',
        transition: { duration: 0.2, ease: 'easeOut' },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div style={styles.iconWrapper}>
        <div style={styles.icon}>{feature.icon}</div>
      </div>
      <h3 style={styles.cardTitle}>{feature.title}</h3>
      <p style={styles.cardDescription}>{feature.description}</p>
    </motion.div>
  );
};

// Main Features Component
interface FeaturesProps {
  id?: string;
  className?: string;
}

const Features: React.FC<FeaturesProps> = ({ id = 'features', className = '' }) => {
  return (
    <section id={id} className={className} style={styles.section}>
      <motion.div
        style={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div style={styles.header} variants={headerVariants}>
          <motion.div
            style={styles.badge}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <p style={styles.badgeText}>Core Features</p>
          </motion.div>
          <h2 style={styles.title}>
            Everything You Need to Explore History
          </h2>
          <p style={styles.description}>
            A comprehensive suite of features designed to make historical discovery intuitive, engaging, and personal.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div style={styles.grid} variants={containerVariants}>
          {featuresData.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Features;
