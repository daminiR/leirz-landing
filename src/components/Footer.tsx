import React from 'react';

const styles: { [key: string]: React.CSSProperties } = {
  footer: {
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0d1421 100%)',
    padding: '80px 32px 48px',
    textAlign: 'center',
    fontFamily: '"Space Grotesk", sans-serif',
    position: 'relative',
    overflow: 'hidden',
  },
  decorativeShape: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '200px',
    height: '3px',
    background: 'linear-gradient(90deg, transparent 0%, #FF6B00 50%, transparent 100%)',
    borderRadius: '2px',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
  },
  logo: {
    marginBottom: '16px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  logoIcon: {
    height: '40px',
    width: 'auto',
  },
  logoText: {
    fontSize: '28px',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #FF6B00 0%, #FFA500 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '-0.5px',
  },
  tagline: {
    color: '#FFFFFF',
    fontSize: '20px',
    fontWeight: 500,
    marginBottom: '20px',
    margin: '0 0 20px 0',
    letterSpacing: '0.5px',
  },
  footerCopy: {
    color: 'rgba(255, 255, 255, 0.65)',
    fontSize: '15px',
    lineHeight: 1.7,
    marginBottom: '40px',
    margin: '0 0 40px 0',
    maxWidth: '400px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  divider: {
    width: '60px',
    height: '1px',
    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 107, 0, 0.5) 50%, transparent 100%)',
    margin: '0 auto 40px',
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '32px',
    marginBottom: '48px',
  },
  link: {
    color: 'rgba(255, 255, 255, 0.6)',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 500,
    letterSpacing: '0.5px',
    transition: 'all 0.3s ease',
    padding: '8px 0',
    position: 'relative',
    cursor: 'pointer',
  },
  separator: {
    color: 'rgba(255, 255, 255, 0.2)',
    fontSize: '14px',
  },
  copyright: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: '13px',
    letterSpacing: '0.3px',
    margin: 0,
  },
  backgroundGlow: {
    position: 'absolute',
    bottom: '-100px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '400px',
    height: '200px',
    background: 'radial-gradient(ellipse, rgba(255, 107, 0, 0.12) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      {/* Decorative top gradient line */}
      <div style={styles.decorativeShape} />

      {/* Background glow effect */}
      <div style={styles.backgroundGlow} />

      <div style={styles.container}>
        <div style={styles.logo}>
          <img src="/logo-icon.svg" alt="" style={styles.logoIcon} />
          <span style={styles.logoText}>Layers</span>
        </div>
        <p style={styles.tagline}>Discover History Everywhere</p>
        <p style={styles.footerCopy}>
          Built for curious explorers who believe every place has a story.
        </p>

        {/* Subtle divider */}
        <div style={styles.divider} />

        <div style={styles.links}>
          <a
            href="/privacy"
            style={styles.link}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FFA500';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Privacy
          </a>
          <span style={styles.separator}>|</span>
          <a
            href="/terms"
            style={styles.link}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FFA500';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Terms
          </a>
        </div>

        <p style={styles.copyright}>
          © {currentYear} Layers. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
