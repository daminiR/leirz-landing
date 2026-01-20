import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface PremiumFeature {
  title: string;
  description: string;
  icon: string;
}

const premiumFeatures: PremiumFeature[] = [
  {
    title: '1,000+ Monthly Discoveries',
    description: 'Unlimited access to AI-generated historical markers every month.',
    icon: '🗺️',
  },
  {
    title: 'Unlimited Searches',
    description: 'No credit limits. Search anywhere, anytime, as much as you want.',
    icon: '🔍',
  },
  {
    title: 'Priority AI Insights',
    description: 'Get the best historical narratives with premium AI processing.',
    icon: '✨',
  },
  {
    title: 'New City Access',
    description: 'Be the first to discover history in newly added cities.',
    icon: '🏙️',
  },
];

interface FeatureCardProps {
  feature: PremiumFeature;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...styles.card,
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered
          ? '0 20px 40px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.3)'
          : '0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2)',
        background: isHovered
          ? 'rgba(255, 255, 255, 0.25)'
          : 'rgba(255, 255, 255, 0.15)',
      }}
    >
      <div style={styles.iconContainer}>
        <span style={styles.icon}>{feature.icon}</span>
      </div>
      <h3 style={styles.cardTitle}>{feature.title}</h3>
      <p style={styles.cardDescription}>{feature.description}</p>
    </motion.div>
  );
};

const CTAButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...styles.ctaButton,
        transform: isHovered ? 'translateY(-3px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: isHovered
          ? '0 12px 40px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(255, 255, 255, 0.2)'
          : '0 6px 24px rgba(0, 0, 0, 0.2)',
        background: isHovered
          ? 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)'
          : '#FFFFFF',
      }}
    >
      <span style={styles.ctaText}>Upgrade to Premium</span>
      <motion.span
        animate={{ x: isHovered ? 5 : 0 }}
        transition={{ duration: 0.2 }}
        style={styles.ctaArrow}
      >
        →
      </motion.span>
    </motion.button>
  );
};

const Premium: React.FC = () => {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="premium" style={styles.section} ref={sectionRef}>
      {/* Decorative Elements */}
      <div style={styles.decorativeCircle1} />
      <div style={styles.decorativeCircle2} />
      <div style={styles.decorativeCircle3} />
      <div style={styles.decorativePattern} />

      <div style={styles.container}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4 }}
          style={styles.badge}
        >
          Premium
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={styles.heading}
        >
          Unlock the Full Experience
        </motion.h2>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={styles.tagline}
        >
          Unlimited discoveries await. Get the full Leirz experience<br />
          with premium features designed for history enthusiasts.
        </motion.p>

        {/* Feature Cards Grid */}
        <div style={styles.cardsGrid}>
          {premiumFeatures.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* CTA Button */}
        <CTAButton />

        {/* Footer Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={styles.footerCopy}
        >
          Free users get 5 search credits to start exploring.
        </motion.p>
      </div>
    </section>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  section: {
    position: 'relative',
    padding: '80px 32px',
    background: 'linear-gradient(135deg, #FF6B00 0%, #FFA500 100%)',
    textAlign: 'center',
    overflow: 'hidden',
  },
  // Decorative elements
  decorativeCircle1: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.08)',
    top: '-150px',
    right: '-100px',
    pointerEvents: 'none',
  },
  decorativeCircle2: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.06)',
    bottom: '-100px',
    left: '-50px',
    pointerEvents: 'none',
  },
  decorativeCircle3: {
    position: 'absolute',
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.05)',
    top: '30%',
    left: '10%',
    pointerEvents: 'none',
  },
  decorativePattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.03) 0%, transparent 50%)`,
    pointerEvents: 'none',
  },
  container: {
    position: 'relative',
    maxWidth: '1200px',
    margin: '0 auto',
    zIndex: 1,
  },
  badge: {
    display: 'inline-block',
    padding: '8px 20px',
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    borderRadius: '50px',
    fontSize: '13px',
    fontWeight: 600,
    color: '#FFFFFF',
    marginBottom: '24px',
    fontFamily: '"Space Grotesk", sans-serif',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  heading: {
    fontSize: 'clamp(32px, 5vw, 52px)',
    fontWeight: 700,
    color: '#FFFFFF',
    marginBottom: '20px',
    fontFamily: '"Space Grotesk", sans-serif',
    letterSpacing: '-0.5px',
    textShadow: '0 2px 20px rgba(0, 0, 0, 0.15)',
  },
  tagline: {
    fontSize: '18px',
    color: 'rgba(255, 255, 255, 0.95)',
    marginBottom: '56px',
    fontFamily: '"Space Grotesk", sans-serif',
    lineHeight: 1.7,
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    marginBottom: '48px',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '32px 24px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    cursor: 'pointer',
  },
  iconContainer: {
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
    border: '1px solid rgba(255, 255, 255, 0.25)',
  },
  icon: {
    fontSize: '24px',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#FFFFFF',
    marginBottom: '12px',
    fontFamily: '"Space Grotesk", sans-serif',
  },
  cardDescription: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 1.7,
    margin: 0,
    fontFamily: '"Space Grotesk", sans-serif',
  },
  ctaButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '16px 36px',
    background: '#FFFFFF',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    marginBottom: '32px',
  },
  ctaText: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#FF6B00',
    fontFamily: '"Space Grotesk", sans-serif',
    background: 'linear-gradient(135deg, #FF6B00 0%, #FFA500 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  ctaArrow: {
    fontSize: '18px',
    color: '#FF6B00',
  },
  footerCopy: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.85)',
    fontFamily: '"Space Grotesk", sans-serif',
  },
};

export default Premium;
