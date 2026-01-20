import React from 'react';
import { motion, type Variants } from 'framer-motion';
import './Categories.less';

interface Category {
  name: string;
  icon: string;
}

const categories: Category[] = [
  { name: 'Crime Chronicles', icon: '🔍' },
  { name: 'Art & Artists', icon: '🎨' },
  { name: 'Music History', icon: '🎵' },
  { name: 'Sports Legends', icon: '🏆' },
  { name: 'Tech & Innovation', icon: '💡' },
  { name: 'Movies & Film', icon: '🎬' },
  { name: 'Architecture', icon: '🏛️' },
  { name: 'Literature', icon: '📚' },
  { name: 'Cuisine & Food', icon: '🍽️' },
  { name: 'Fashion', icon: '👗' },
  { name: 'Medicine', icon: '⚕️' },
  { name: 'Environment', icon: '🌿' },
  { name: 'Transportation', icon: '🚀' },
  { name: 'Social Movements', icon: '✊' },
  { name: 'Education', icon: '🎓' },
  { name: 'Politics', icon: '🏛️' },
  { name: 'Economics', icon: '📈' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.2,
    },
  },
};

const pillVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 20,
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

const contentVariants: Variants = {
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

interface CategoriesProps {
  className?: string;
}

const Categories: React.FC<CategoriesProps> = ({ className = '' }) => {
  return (
    <section id="categories" className={`categories-wrapper home-page-wrapper ${className}`}>
      <div className="categories home-page">
        <div className="categories-split-layout">
          {/* Left Side - Content */}
          <motion.div
            className="categories-content"
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.span
              className="categories-badge"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              17 Categories
            </motion.span>
            <motion.h2
              className="categories-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              History Your Way
            </motion.h2>
            <motion.p
              className="categories-description"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Filter discoveries by the topics that fascinate you most.
            </motion.p>

            <motion.div
              className="categories-pills"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {categories.map((category, index) => (
                <motion.button
                  key={category.name}
                  className="category-pill"
                  variants={pillVariants}
                  whileHover={{
                    y: -3,
                    transition: { duration: 0.2, ease: 'easeOut' }
                  }}
                  whileTap={{ scale: 0.98 }}
                  custom={index}
                  style={{ willChange: 'transform' }}
                >
                  <span className="pill-icon">{category.icon}</span>
                  <span className="pill-text">{category.name}</span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Phone Mockup */}
          <motion.div
            className="categories-phone-mockup"
            variants={phoneVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="phone-mockup-wrapper">
              <div className="phone-glow"></div>
              <div className="phone-frame">
                <div className="phone-screen">
                  <div className="phone-notch">
                    <div className="phone-camera"></div>
                  </div>
                  <img
                    src="/categories-map.jpg"
                    alt="Dubai map with category filters"
                    className="phone-screen-image"
                    loading="lazy"
                    width={256}
                    height={536}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
