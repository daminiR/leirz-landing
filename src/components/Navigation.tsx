import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navigation.less';

// Type definitions
interface NavLink {
  id: string;
  label: string;
  href: string;
}

interface NavigationProps {
  brandName?: string;
  links?: NavLink[];
  className?: string;
}

// Default navigation links per Leirz design specs
const defaultNavLinks: NavLink[] = [
  { id: 'features', label: 'Features', href: '#features' },
  { id: 'ai', label: 'AI Search', href: '#ai' },
  { id: 'categories', label: 'Categories', href: '#categories' },
  { id: 'premium', label: 'Premium', href: '#premium' },
  { id: 'screens', label: 'Screens', href: '#screens' },
];

// Animation variants for mobile menu
const menuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
      when: 'afterChildren',
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
      when: 'beforeChildren',
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const menuItemVariants = {
  closed: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.2,
    },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Hamburger line animation variants
const topLineVariants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: 45, y: 8 },
};

const middleLineVariants = {
  closed: { opacity: 1, scaleX: 1 },
  open: { opacity: 0, scaleX: 0 },
};

const bottomLineVariants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: -45, y: -8 },
};

const Navigation: React.FC<NavigationProps> = ({
  brandName = 'Leirz',
  links = defaultNavLinks,
  className = '',
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // Handle scroll event to determine active section
  const handleScroll = useCallback(() => {
    const sections = links.map((link) => link.id);
    for (const sectionId of [...sections].reverse()) {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 150) {
          setActiveSection(sectionId);
          break;
        }
      }
    }
  }, [links]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Smooth scroll to section
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }

    // Close mobile menu after clicking
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.header
      className={`${styles.navigation} ${className}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className={styles.container}>
        {/* Logo with icon and text */}
        <motion.a
          href="#"
          className={styles.logo}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <img src="/logo-icon.svg" alt="" className={styles.logoIcon} />
          <span className={styles.logoText}>{brandName}</span>
        </motion.a>

        {/* Desktop Navigation Links */}
        <nav className={styles.desktopNav}>
          {links.map((link) => (
            <motion.a
              key={link.id}
              href={link.href}
              className={`${styles.navLink} ${activeSection === link.id ? styles.active : ''}`}
              onClick={(e) => scrollToSection(e, link.href)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.span
                  className={styles.activeIndicator}
                  layoutId="activeIndicator"
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                />
              )}
            </motion.a>
          ))}
        </nav>

        {/* Mobile Menu Toggle Button (Hamburger) */}
        <motion.button
          className={styles.hamburger}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          whileTap={{ scale: 0.9 }}
        >
          <motion.span
            className={styles.hamburgerLine}
            variants={topLineVariants}
            animate={isMobileMenuOpen ? 'open' : 'closed'}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          />
          <motion.span
            className={styles.hamburgerLine}
            variants={middleLineVariants}
            animate={isMobileMenuOpen ? 'open' : 'closed'}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          />
          <motion.span
            className={styles.hamburgerLine}
            variants={bottomLineVariants}
            animate={isMobileMenuOpen ? 'open' : 'closed'}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          />
        </motion.button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.nav
              className={styles.mobileNav}
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {links.map((link) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  className={`${styles.mobileNavLink} ${activeSection === link.id ? styles.active : ''}`}
                  onClick={(e) => scrollToSection(e, link.href)}
                  variants={menuItemVariants}
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className={styles.mobileNavLinkText}>{link.label}</span>
                  {activeSection === link.id && (
                    <motion.span
                      className={styles.mobileActiveIndicator}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.a>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navigation;
