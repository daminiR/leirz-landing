import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadComplete: () => void;
  imagesToPreload?: string[];
}

// Critical images to preload
const defaultImagesToPreload = [
  '/categories-map.jpg',
  '/hero-phone.jpg',
  '/ai-detail.jpg',
];

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onLoadComplete,
  imagesToPreload = defaultImagesToPreload,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    let loadedCount = 0;
    const totalImages = imagesToPreload.length;

    // Minimum display time for branding (300ms)
    const minDisplayTime = 300;
    const startTime = Date.now();

    const checkComplete = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

      setTimeout(() => {
        setIsVisible(false);
        // Small delay for fade-out animation
        setTimeout(onLoadComplete, 200);
      }, remainingTime);
    };

    const updateProgress = () => {
      loadedCount++;
      setLoadProgress(Math.round((loadedCount / totalImages) * 100));

      if (loadedCount >= totalImages) {
        checkComplete();
      }
    };

    // Preload images
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.onload = updateProgress;
      img.onerror = updateProgress; // Still count as loaded even if error
      img.src = src;
    });

    // Fallback timeout in case images take too long
    const fallbackTimeout = setTimeout(() => {
      if (loadedCount < totalImages) {
        setLoadProgress(100);
        checkComplete();
      }
    }, 3000);

    return () => clearTimeout(fallbackTimeout);
  }, [imagesToPreload, onLoadComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <style>
        {`
          @keyframes loadingPulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }

          @keyframes loadingFadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
          }

          .loading-screen-exit {
            animation: loadingFadeOut 0.2s ease-out forwards;
          }
        `}
      </style>
      <div
        className={!isVisible ? 'loading-screen-exit' : ''}
        style={styles.container}
      >
        <div style={styles.content}>
          {/* Brand Logo */}
          <div style={styles.logoContainer}>
            <img src="/logo.png" alt="Leirz" style={styles.logoImage} />
          </div>

          {/* Progress Bar */}
          <div style={styles.progressContainer}>
            <div
              style={{
                ...styles.progressBar,
                width: `${loadProgress}%`,
              }}
            />
          </div>

          {/* Loading Text */}
          <div style={styles.loadingText}>
            Discovering history...
          </div>
        </div>
      </div>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0d1421 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  content: {
    textAlign: 'center',
  },
  logoContainer: {
    marginBottom: '32px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    height: '64px',
    width: 'auto',
  },
  progressContainer: {
    width: '200px',
    height: '4px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '2px',
    overflow: 'hidden',
    margin: '0 auto 16px',
  },
  progressBar: {
    height: '100%',
    background: 'linear-gradient(90deg, #FF6B00 0%, #FFA500 100%)',
    borderRadius: '2px',
    transition: 'width 0.2s ease-out',
  },
  loadingText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '14px',
    fontFamily: '"Space Grotesk", sans-serif',
    animation: 'loadingPulse 1.5s ease-in-out infinite',
  },
};

export default LoadingScreen;
