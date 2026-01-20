// src/pages/index.tsx
import React, { useState } from 'react';
import { Helmet } from 'umi';

// Component imports
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import AIFeatures from '@/components/AIFeatures';
import Categories from '@/components/Categories';
import Premium from '@/components/Premium';
import AppScreens from '@/components/AppScreens';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

// Global styles for the landing page
const globalStyles = `
  /* Smooth scroll behavior */
  html {
    scroll-behavior: smooth;
  }

  /* Global resets and base styles */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #ffffff;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Selection styling */
  ::selection {
    background-color: rgba(102, 126, 234, 0.3);
    color: inherit;
  }

  /* Focus styles for accessibility */
  :focus-visible {
    outline: 2px solid #667eea;
    outline-offset: 2px;
  }

  /* Smooth scrolling for anchor links */
  @media (prefers-reduced-motion: no-preference) {
    html {
      scroll-behavior: smooth;
    }
  }

  /* Reduced motion preference */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Improve image rendering */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Link base styles */
  a {
    color: inherit;
    text-decoration: none;
  }

  /* Button reset */
  button {
    font: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  /* List reset */
  ul, ol {
    list-style: none;
  }

  /* Container for sections */
  section {
    position: relative;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%);
  }
`;

// Main page component
const IndexPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Loading Screen - shows while images preload */}
      {isLoading && (
        <LoadingScreen onLoadComplete={() => setIsLoading(false)} />
      )}

      {/* SEO Meta Tags */}
      <Helmet>
        <html lang="en" />
        <title>Leirz - Discover Hidden History</title>
        <meta
          name="description"
          content="Leirz is your gateway to discovering the hidden history around you. Explore 600K+ historical markers across 1,500+ cities. Uncover fascinating stories of crime, art, music, sports, and more with AI-powered insights."
        />
        <meta
          name="keywords"
          content="history app, historical markers, discover history, local history, historical sites, AI history, hidden history, infymous"
        />
        <meta name="author" content="Leirz" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Leirz - Discover Hidden History" />
        <meta
          property="og:description"
          content="Explore 600K+ historical markers across 1,500+ cities. Uncover fascinating stories with AI-powered insights."
        />
        <meta property="og:site_name" content="Leirz" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Leirz - Discover Hidden History" />
        <meta
          name="twitter:description"
          content="Explore 600K+ historical markers across 1,500+ cities. Uncover fascinating stories with AI-powered insights."
        />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#667eea" />

        {/* Apple specific */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Leirz" />

        {/* Global styles injection */}
        <style type="text/css">{globalStyles}</style>
      </Helmet>

      {/* Main Layout */}
      <div className="landing-page">
        {/* Navigation - Fixed at top */}
        <Navigation />

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <section id="hero">
            <Hero />
          </section>

          {/* Features Section */}
          <section id="features">
            <Features />
          </section>

          {/* AI Features Section */}
          <section id="ai">
            <AIFeatures />
          </section>

          {/* Categories Section */}
          <section id="categories">
            <Categories />
          </section>

          {/* Premium Section */}
          <section id="premium">
            <Premium />
          </section>

          {/* App Screens Section */}
          <section id="screens">
            <AppScreens />
          </section>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default IndexPage;
