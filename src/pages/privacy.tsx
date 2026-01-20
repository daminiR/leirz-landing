import React, { useEffect, useState } from 'react';
import { Link, Helmet } from 'umi';
import { ArrowLeftOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';

interface TableOfContentsItem {
  id: string;
  title: string;
}

// Global styles for the privacy policy page
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
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #fafafa;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Link hover states */
  .privacy-back-link:hover {
    color: #fff !important;
  }

  .privacy-toc-link:hover {
    background-color: #f5f5f5;
    color: #1890ff;
  }

  .privacy-toc-link.active {
    background-color: #e6f7ff;
    color: #1890ff;
    font-weight: 500;
  }

  .privacy-footer-link:hover {
    color: #fff !important;
  }

  .privacy-related-link:hover {
    background-color: #bae7ff;
  }

  /* Responsive styles */
  @media (max-width: 900px) {
    .privacy-main-content {
      flex-direction: column !important;
    }

    .privacy-sidebar {
      position: relative !important;
      width: 100% !important;
      top: 0 !important;
      margin-bottom: 24px;
    }

    .privacy-sidebar.mobile-hidden {
      display: none;
    }

    .privacy-sidebar.mobile-visible {
      display: block;
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      width: 100% !important;
      height: 100vh !important;
      z-index: 1000;
      background: rgba(0, 0, 0, 0.5);
      padding: 20px;
      overflow-y: auto;
    }

    .privacy-sidebar.mobile-visible .privacy-toc-container {
      max-width: 300px;
      margin: 60px auto 0;
      max-height: calc(100vh - 100px);
      overflow-y: auto;
    }

    .privacy-mobile-toc-toggle {
      display: flex !important;
    }

    .privacy-content {
      min-width: 0 !important;
    }

    .privacy-header-title {
      font-size: 28px !important;
    }

    .privacy-section {
      padding: 24px !important;
    }

    .privacy-section-title {
      font-size: 20px !important;
    }

    .privacy-data-row {
      flex-direction: column !important;
    }

    .privacy-data-label {
      width: 100% !important;
      border-bottom: 1px solid #f0f0f0;
    }
  }

  @media (max-width: 480px) {
    .privacy-header {
      padding: 24px 16px !important;
    }

    .privacy-main-content {
      padding: 24px 16px !important;
    }

    .privacy-header-title {
      font-size: 24px !important;
    }

    .privacy-section {
      padding: 20px !important;
    }

    .privacy-intro-box {
      padding: 16px !important;
    }

    .privacy-contact-grid {
      flex-direction: column !important;
      gap: 16px !important;
    }
  }

  /* Custom scrollbar */
  .privacy-container ::-webkit-scrollbar {
    width: 6px;
  }

  .privacy-container ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  .privacy-container ::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }

  .privacy-container ::-webkit-scrollbar-thumb:hover {
    background: #a1a1a1;
  }

  /* Animation for mobile menu */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .privacy-sidebar.mobile-visible {
    animation: fadeIn 0.2s ease-out;
  }
`;

const tableOfContents: TableOfContentsItem[] = [
  { id: 'introduction', title: '1. Introduction' },
  { id: 'information-collected', title: '2. Information We Collect' },
  { id: 'how-we-use', title: '3. How We Use Your Information' },
  { id: 'ai-integration', title: '4. AI Integration' },
  { id: 'location-data', title: '5. Location Data' },
  { id: 'data-sharing', title: '6. Data Sharing' },
  { id: 'data-retention', title: '7. Data Retention' },
  { id: 'your-rights', title: '8. Your Rights' },
  { id: 'gdpr', title: '9. GDPR Compliance' },
  { id: 'ccpa', title: '10. CCPA Compliance' },
  { id: 'children', title: '11. Children\'s Privacy' },
  { id: 'security', title: '12. Security Measures' },
  { id: 'changes', title: '13. Changes to Policy' },
  { id: 'contact', title: '14. Contact Information' },
];

const PrivacyPolicy: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = tableOfContents.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(tableOfContents[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleTocClick = (id: string) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Privacy Policy - Leirz</title>
        <meta name="description" content="Privacy Policy for Leirz - Learn how we collect, use, and protect your personal information." />
        <style type="text/css">{globalStyles}</style>
      </Helmet>

      <div style={styles.container} className="privacy-container">
        {/* Header */}
        <header style={styles.header} className="privacy-header">
          <div style={styles.headerContent}>
            <Link to="/" style={styles.backLink} className="privacy-back-link">
              <ArrowLeftOutlined style={{ marginRight: 8 }} />
              Back to Home
            </Link>
            <h1 style={styles.headerTitle} className="privacy-header-title">Privacy Policy</h1>
            <p style={styles.lastUpdated}>Last Updated: January 2025</p>
          </div>
        </header>

        {/* Mobile TOC Toggle Button */}
        <button
          onClick={toggleMobileMenu}
          style={styles.mobileTocToggle}
          className="privacy-mobile-toc-toggle"
          aria-label="Toggle table of contents"
        >
          {mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
          <span style={{ marginLeft: 8 }}>Table of Contents</span>
        </button>

        <div style={styles.mainContent} className="privacy-main-content">
          {/* Table of Contents - Sidebar */}
          <nav
            style={styles.sidebar}
            className={`privacy-sidebar ${mobileMenuOpen ? 'mobile-visible' : 'mobile-hidden'}`}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setMobileMenuOpen(false);
              }
            }}
          >
            <div style={styles.tocContainer} className="privacy-toc-container">
              <div style={styles.tocHeader}>
                <h3 style={styles.tocTitle}>Table of Contents</h3>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  style={styles.tocCloseBtn}
                  className="privacy-toc-close"
                  aria-label="Close menu"
                >
                  <CloseOutlined />
                </button>
              </div>
              <ul style={styles.tocList}>
                {tableOfContents.map((item) => (
                  <li key={item.id} style={styles.tocItem}>
                    <button
                      onClick={() => handleTocClick(item.id)}
                      style={styles.tocLink}
                      className={`privacy-toc-link ${activeSection === item.id ? 'active' : ''}`}
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <main style={styles.content} className="privacy-content">
            <div style={styles.introBox} className="privacy-intro-box">
            <p style={styles.introText}>
              At Leirz, we are committed to protecting your privacy and ensuring transparency
              about how we collect, use, and safeguard your personal information. This Privacy Policy
              explains our data practices for the Leirz mobile application - a historical discovery
              platform featuring 600,000+ markers across 1,500+ cities worldwide, AI-powered search,
              location-based features, and community engagement tools.
            </p>
          </div>

          {/* Section 1: Introduction */}
          <section id="introduction" style={styles.section} className="privacy-section">
            <h2 style={styles.sectionTitle} className="privacy-section-title">1. Introduction</h2>
            <p style={styles.paragraph}>
              Leirz ("Company," "we," "us," or "our") operates a historical discovery and education
              platform that helps users explore and learn about historical events, figures, and locations
              around the world. Our app contains over 600,000 historical markers across more than 1,500
              cities, powered by AI technology and community contributions.
            </p>
            <p style={styles.paragraph}>
              This Privacy Policy applies to all users of the Leirz mobile application and related
              services (collectively, the "Service"). By using our Service, you consent to the collection,
              use, and disclosure of your information as described in this Privacy Policy. If you do not
              agree with our practices, please do not use our Service.
            </p>
            <div style={styles.highlightBox}>
              <p style={styles.highlightText}>
                <strong>Key Points Summary:</strong>
              </p>
              <ul style={styles.highlightList}>
                <li>We collect location data to provide location-based historical content at various radius levels (500m, 2km, 10km).</li>
                <li>We use AI technology to power our "What happened here?" search feature.</li>
                <li>We store your saved collections, search history, and community voting activity.</li>
                <li>We do not sell your personal data to third parties.</li>
                <li>You have rights to access, delete, and export your data.</li>
                <li>Users must be 13 years or older to use our Service.</li>
              </ul>
            </div>
          </section>

          {/* Section 2: Information We Collect */}
          <section id="information-collected" style={styles.section} className="privacy-section">
            <h2 style={styles.sectionTitle} className="privacy-section-title">2. Information We Collect</h2>
            <p style={styles.paragraph}>
              We collect various types of information to provide and improve our historical discovery
              Service. Below is a comprehensive overview of the data we collect:
            </p>

            <h3 style={styles.subsectionTitle}>2.1 Account Information</h3>
            <p style={styles.paragraph}>
              When you create an account, we collect:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>Basic Profile Data:</strong> Name, email address, username, and password
                (securely hashed and encrypted).
              </li>
              <li style={styles.listItem}>
                <strong>Optional Profile Data:</strong> Profile photo, biographical information,
                and interests in historical topics.
              </li>
              <li style={styles.listItem}>
                <strong>Authentication Data:</strong> If you sign in via Apple or Google, we receive
                basic profile information as permitted by those services.
              </li>
              <li style={styles.listItem}>
                <strong>Subscription Status:</strong> Information about your Premium subscription
                status, plan type, and renewal dates.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>2.2 Location Data</h3>
            <div style={styles.dataTable}>
              <div style={styles.dataRow} className="privacy-data-row">
                <div style={styles.dataLabel} className="privacy-data-label">Precise Location</div>
                <div style={styles.dataDescription}>
                  GPS coordinates when you use location-based features such as "Local" (500m radius),
                  "Area" (2km radius), or "City" (10km radius) searches. This enables us to show you
                  historical markers and events near your current location.
                </div>
              </div>
              <div style={styles.dataRow} className="privacy-data-row">
                <div style={styles.dataLabel} className="privacy-data-label">General Location</div>
                <div style={styles.dataDescription}>
                  City, region, and country information derived from your IP address when precise
                  location is not enabled. Used for regional content recommendations.
                </div>
              </div>
              <div style={styles.dataRow} className="privacy-data-row">
                <div style={styles.dataLabel} className="privacy-data-label">Location History</div>
                <div style={styles.dataDescription}>
                  Historical record of locations you've explored within the app (if enabled), used
                  to provide personalized recommendations and track your discovery journey.
                </div>
              </div>
            </div>

            <h3 style={styles.subsectionTitle}>2.3 Search Queries and AI Interactions</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>Search History:</strong> All search queries you enter, including "What happened
                here?" queries processed by our AI system.
              </li>
              <li style={styles.listItem}>
                <strong>AI Conversation Context:</strong> The context and parameters of your AI-powered
                searches to provide relevant historical information.
              </li>
              <li style={styles.listItem}>
                <strong>Search Preferences:</strong> Your preferred search radius, date ranges, and
                topic filters.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>2.4 User-Generated Content and Collections</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>Saved Places:</strong> Historical markers, events, and figures you save to
                your personal collections, including custom names, notes, and organization.
              </li>
              <li style={styles.listItem}>
                <strong>Community Contributions:</strong> Comments, corrections, insights, and other
                content you contribute to the community.
              </li>
              <li style={styles.listItem}>
                <strong>Voting Activity:</strong> Your upvotes, downvotes, and ratings on community
                markers and historical content.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>2.5 Device and Technical Information</h3>
            <div style={styles.dataTable}>
              <div style={styles.dataRow} className="privacy-data-row">
                <div style={styles.dataLabel} className="privacy-data-label">Device Identifiers</div>
                <div style={styles.dataDescription}>
                  Unique device identifiers, advertising identifiers (with your consent), hardware
                  model, and operating system version.
                </div>
              </div>
              <div style={styles.dataRow} className="privacy-data-row">
                <div style={styles.dataLabel} className="privacy-data-label">App Usage Data</div>
                <div style={styles.dataDescription}>
                  Features used, time spent in different sections, markers viewed, navigation patterns,
                  and interaction frequency.
                </div>
              </div>
              <div style={styles.dataRow} className="privacy-data-row">
                <div style={styles.dataLabel} className="privacy-data-label">Technical Logs</div>
                <div style={styles.dataDescription}>
                  Crash reports, performance data, error logs, and debugging information to maintain
                  and improve app stability.
                </div>
              </div>
              <div style={styles.dataRow} className="privacy-data-row">
                <div style={styles.dataLabel} className="privacy-data-label">Network Information</div>
                <div style={styles.dataDescription}>
                  IP address, mobile carrier, connection type (WiFi/cellular), and timezone settings.
                </div>
              </div>
            </div>

            <h3 style={styles.subsectionTitle}>2.6 Payment Information</h3>
            <p style={styles.paragraph}>
              For Premium subscriptions, payment transactions are processed securely through Apple App
              Store, Google Play Store, or Stripe. We do not store complete credit card numbers or
              payment credentials. We only retain transaction IDs, subscription status, and purchase
              history necessary for account management and customer support.
            </p>
          </section>

          {/* Section 3: How We Use Your Information */}
          <section id="how-we-use" style={styles.section} className="privacy-section">
            <h2 style={styles.sectionTitle} className="privacy-section-title">3. How We Use Your Information</h2>
            <p style={styles.paragraph}>
              We use the information we collect for specific purposes that enhance your experience
              and allow us to provide our historical discovery Service:
            </p>

            <h3 style={styles.subsectionTitle}>3.1 Personalization and Recommendations</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>Personalized Content:</strong> Recommend historical markers, events, and
                stories based on your interests, search history, and saved collections.
              </li>
              <li style={styles.listItem}>
                <strong>Discovery Suggestions:</strong> Suggest nearby historical sites when you
                travel to new cities or neighborhoods.
              </li>
              <li style={styles.listItem}>
                <strong>Interest Profiles:</strong> Build understanding of your historical interests
                (e.g., ancient history, wars, architecture) to surface relevant content.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>3.2 AI-Powered Search and Features</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>"What Happened Here?" Searches:</strong> Process your natural language queries
                through our AI systems to provide contextual historical information.
              </li>
              <li style={styles.listItem}>
                <strong>Content Enhancement:</strong> Use AI to generate detailed historical narratives
                and connect related events across time and geography.
              </li>
              <li style={styles.listItem}>
                <strong>Search Refinement:</strong> Improve search accuracy based on your feedback
                and interaction patterns.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>3.3 Location-Based Services</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>Proximity Features:</strong> Show historical markers within your chosen radius
                (Local 500m, Area 2km, City 10km).
              </li>
              <li style={styles.listItem}>
                <strong>Navigation Support:</strong> Help you find and navigate to historical locations.
              </li>
              <li style={styles.listItem}>
                <strong>Location Alerts:</strong> Optionally notify you when you're near significant
                historical sites (if enabled).
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>3.4 Service Operations</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Sync your collections and preferences across devices.
              </li>
              <li style={styles.listItem}>
                Process and manage your Premium subscription.
              </li>
              <li style={styles.listItem}>
                Provide customer support and respond to inquiries.
              </li>
              <li style={styles.listItem}>
                Send service-related notifications (account updates, security alerts, policy changes).
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>3.5 Improvement and Analytics</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Analyze usage patterns to improve app features and user experience.
              </li>
              <li style={styles.listItem}>
                Identify and fix technical issues, crashes, and performance problems.
              </li>
              <li style={styles.listItem}>
                Develop new features based on user behavior and feedback.
              </li>
              <li style={styles.listItem}>
                Conduct research using anonymized and aggregated data.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>3.6 Safety and Compliance</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Detect, prevent, and address fraud, abuse, and security issues.
              </li>
              <li style={styles.listItem}>
                Moderate community content and enforce community guidelines.
              </li>
              <li style={styles.listItem}>
                Comply with legal obligations and respond to lawful requests.
              </li>
            </ul>
          </section>

          {/* Section 4: AI Integration */}
          <section id="ai-integration" style={styles.section} className="privacy-section">
            <h2 style={styles.sectionTitle} className="privacy-section-title">4. AI Integration</h2>
            <div style={styles.warningBox}>
              <h3 style={styles.warningTitle}>Important Information About AI Processing</h3>
              <p style={styles.warningText}>
                Leirz uses advanced AI technology to power our "What happened here?" feature and enhance
                historical content. This section explains how your data interacts with AI systems
                and what information is shared with our AI service providers.
              </p>
            </div>

            <h3 style={styles.subsectionTitle}>4.1 How AI Powers Leirz</h3>
            <p style={styles.paragraph}>
              Our AI integration enables powerful historical discovery capabilities:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>"What Happened Here?" Search:</strong> When you ask questions about a location's
                history, your query is processed through our AI systems to generate contextual,
                informative responses about historical events.
              </li>
              <li style={styles.listItem}>
                <strong>Natural Language Understanding:</strong> AI interprets your natural language
                queries to find relevant historical markers and events from our database.
              </li>
              <li style={styles.listItem}>
                <strong>Content Synthesis:</strong> AI helps synthesize information from multiple
                historical sources to provide comprehensive answers.
              </li>
              <li style={styles.listItem}>
                <strong>Related Discoveries:</strong> AI suggests related historical events, figures,
                or locations you might find interesting.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>4.2 Data Sent to AI Service Providers</h3>
            <p style={styles.paragraph}>
              When you use AI-powered features, the following data may be sent to our AI service providers:
            </p>
            <div style={styles.dataTable}>
              <div style={styles.dataRow} className="privacy-data-row">
                <div style={styles.dataLabel} className="privacy-data-label">Search Queries</div>
                <div style={styles.dataDescription}>
                  The text of your "What happened here?" questions and search terms.
                </div>
              </div>
              <div style={styles.dataRow} className="privacy-data-row">
                <div style={styles.dataLabel} className="privacy-data-label">Location Context</div>
                <div style={styles.dataDescription}>
                  General location context (city/region level, not precise GPS coordinates) to
                  provide geographically relevant answers.
                </div>
              </div>
              <div style={styles.dataRow} className="privacy-data-row">
                <div style={styles.dataLabel} className="privacy-data-label">Conversation Context</div>
                <div style={styles.dataDescription}>
                  Previous messages in the current search session to maintain context for follow-up questions.
                </div>
              </div>
            </div>

            <h3 style={styles.subsectionTitle}>4.3 Data NOT Sent to AI Service Providers</h3>
            <p style={styles.paragraph}>
              We protect your privacy by NOT sharing the following with AI providers:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>Your name, email address, or account credentials.</li>
              <li style={styles.listItem}>Precise GPS coordinates or exact addresses.</li>
              <li style={styles.listItem}>Your saved collections or bookmarks.</li>
              <li style={styles.listItem}>Your complete search history.</li>
              <li style={styles.listItem}>Payment or subscription information.</li>
              <li style={styles.listItem}>Community voting history or contributions.</li>
            </ul>

            <h3 style={styles.subsectionTitle}>4.4 AI Service Provider Data Processing</h3>
            <p style={styles.paragraph}>
              Data sent to our AI service providers is processed in accordance with:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Our data processing agreements with AI service providers.
              </li>
              <li style={styles.listItem}>
                Applicable cloud data processing addendums and AI/ML privacy commitments.
              </li>
              <li style={styles.listItem}>
                API queries are not used by our AI providers to train their general AI models.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>4.5 AI Training and Improvement</h3>
            <p style={styles.paragraph}>
              Leirz may use anonymized and aggregated user interactions to improve our own AI
              integration and search quality. This data cannot be used to identify individual users.
              You can opt out of contributing to Leirz's AI improvement through your account settings.
            </p>
          </section>

          {/* Section 5: Location Data */}
          <section id="location-data" style={styles.section} className="privacy-section">
            <h2 style={styles.sectionTitle} className="privacy-section-title">5. Location Data</h2>
            <p style={styles.paragraph}>
              Location data is central to Leirz's historical discovery experience. This section
              provides detailed information about how we collect, use, and protect your location information.
            </p>

            <h3 style={styles.subsectionTitle}>5.1 Types of Location Access</h3>
            <div style={styles.dataTable}>
              <div style={styles.dataRow} className="privacy-data-row">
                <div style={styles.dataLabel} className="privacy-data-label">Local (500m)</div>
                <div style={styles.dataDescription}>
                  Shows historical markers within 500 meters of your current location. Ideal for
                  walking tours and exploring your immediate surroundings. Requires precise GPS access.
                </div>
              </div>
              <div style={styles.dataRow} className="privacy-data-row">
                <div style={styles.dataLabel} className="privacy-data-label">Area (2km)</div>
                <div style={styles.dataDescription}>
                  Shows historical markers within 2 kilometers. Perfect for exploring a neighborhood
                  or district. Requires precise GPS access.
                </div>
              </div>
              <div style={styles.dataRow} className="privacy-data-row">
                <div style={styles.dataLabel} className="privacy-data-label">City (10km)</div>
                <div style={styles.dataDescription}>
                  Shows historical markers within 10 kilometers. Great for discovering history across
                  an entire city or metropolitan area. Requires precise GPS access.
                </div>
              </div>
            </div>

            <h3 style={styles.subsectionTitle}>5.2 How We Use Location Data</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>Marker Discovery:</strong> Display historical markers near your current location
                based on your selected radius.
              </li>
              <li style={styles.listItem}>
                <strong>Contextual AI Responses:</strong> Provide location-aware answers to "What
                happened here?" queries.
              </li>
              <li style={styles.listItem}>
                <strong>Distance Calculations:</strong> Show how far markers are from your location.
              </li>
              <li style={styles.listItem}>
                <strong>Navigation:</strong> Help you navigate to historical sites (via integration
                with your device's maps app).
              </li>
              <li style={styles.listItem}>
                <strong>Personalization:</strong> Remember cities you've explored to improve recommendations.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>5.3 Location Data Storage</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>Real-time Processing:</strong> Precise coordinates are primarily processed
                in real-time to show nearby markers and are not persistently stored on our servers
                for most features.
              </li>
              <li style={styles.listItem}>
                <strong>Search Context:</strong> When you perform a location-based search, we may
                temporarily store location data (up to 24 hours) to provide consistent results
                during your session.
              </li>
              <li style={styles.listItem}>
                <strong>Exploration History:</strong> If you enable "Discovery Journey" tracking,
                we store the cities and regions (not precise coordinates) you've explored.
              </li>
              <li style={styles.listItem}>
                <strong>Analytics:</strong> We store anonymized, aggregated location data (city/region
                level) for analytics purposes.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>5.4 Controlling Location Access</h3>
            <p style={styles.paragraph}>
              You have full control over location access:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>Deny Access:</strong> Use Leirz without location features by searching
                manually for cities and places.
              </li>
              <li style={styles.listItem}>
                <strong>While Using:</strong> Allow location access only when the app is open
                and in the foreground.
              </li>
              <li style={styles.listItem}>
                <strong>Always:</strong> Allow background location for notifications when near
                historical sites (optional).
              </li>
              <li style={styles.listItem}>
                <strong>Revoke Anytime:</strong> Change location permissions at any time through
                your device settings.
              </li>
            </ul>

            <div style={styles.highlightBox}>
              <p style={styles.highlightText}>
                <strong>Note:</strong> Denying location access will limit certain features but
                you can still explore our 600,000+ historical markers by searching for specific
                cities, addresses, or topics.
              </p>
            </div>
          </section>

          {/* Section 6: Data Sharing */}
          <section id="data-sharing" style={styles.section} className="privacy-section">
            <h2 style={styles.sectionTitle} className="privacy-section-title">6. Data Sharing</h2>
            <div style={styles.highlightBox}>
              <p style={styles.highlightText}>
                <strong>We do not sell your personal information.</strong> We only share your data
                in the limited circumstances described below.
              </p>
            </div>

            <h3 style={styles.subsectionTitle}>6.1 Service Providers</h3>
            <p style={styles.paragraph}>
              We work with trusted third-party service providers who help us operate and improve
              our Service:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>AI Services:</strong> Third-party AI service providers for processing "What happened here?"
                queries. See Section 4 for details.
              </li>
              <li style={styles.listItem}>
                <strong>Cloud Infrastructure:</strong> Cloud hosting providers (AWS, Google Cloud)
                for secure data storage and processing.
              </li>
              <li style={styles.listItem}>
                <strong>Payment Processing:</strong> Apple App Store, Google Play Store, and Stripe
                for subscription payments.
              </li>
              <li style={styles.listItem}>
                <strong>Analytics:</strong> Firebase Analytics for understanding app usage and
                improving features (with anonymized data).
              </li>
              <li style={styles.listItem}>
                <strong>Customer Support:</strong> Help desk tools for managing support inquiries.
              </li>
            </ul>
            <p style={styles.paragraph}>
              All service providers are contractually obligated to protect your data, use it only
              for specified purposes, and comply with applicable privacy laws.
            </p>

            <h3 style={styles.subsectionTitle}>6.2 Community Features</h3>
            <p style={styles.paragraph}>
              When you participate in community features, certain information becomes visible to
              other users:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>Public Profile:</strong> Your username and profile photo (if set).
              </li>
              <li style={styles.listItem}>
                <strong>Contributions:</strong> Comments, corrections, and insights you submit
                are visible to other users with your username attributed.
              </li>
              <li style={styles.listItem}>
                <strong>Public Collections:</strong> If you choose to make collections public,
                they can be viewed by other users.
              </li>
              <li style={styles.listItem}>
                <strong>Voting Activity:</strong> Aggregate vote counts are public; your individual
                votes are not publicly visible.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>6.3 Legal Requirements</h3>
            <p style={styles.paragraph}>
              We may disclose your information if required or permitted by law:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                To comply with legal obligations, court orders, subpoenas, or government requests.
              </li>
              <li style={styles.listItem}>
                To protect the rights, property, or safety of Leirz, our users, or the public.
              </li>
              <li style={styles.listItem}>
                To detect, prevent, or address fraud, security issues, or technical problems.
              </li>
              <li style={styles.listItem}>
                To enforce our Terms of Service and other policies.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>6.4 Business Transfers</h3>
            <p style={styles.paragraph}>
              If Leirz is involved in a merger, acquisition, bankruptcy, or sale of assets, your
              information may be transferred as part of that transaction. We will notify you of
              any such change and any choices you may have regarding your information before the
              transfer occurs.
            </p>

            <h3 style={styles.subsectionTitle}>6.5 With Your Consent</h3>
            <p style={styles.paragraph}>
              We may share your information for other purposes with your explicit consent.
            </p>
          </section>

          {/* Section 7: Data Retention */}
          <section id="data-retention" style={styles.section} className="privacy-section">
            <h2 style={styles.sectionTitle} className="privacy-section-title">7. Data Retention</h2>
            <p style={styles.paragraph}>
              We retain your personal information only for as long as necessary to provide our
              Service and fulfill the purposes described in this Privacy Policy. Below are our
              retention periods for different data types:
            </p>

            <div style={styles.dataTable}>
              <div style={styles.dataRow} className="privacy-data-row">
                <div style={styles.dataLabel} className="privacy-data-label">Account Data</div>
                <div style={styles.dataDescription}>
                  Retained while your account is active. After account deletion, we retain certain
                  data for up to 30 days for recovery purposes, then permanently delete it (except
                  as required by law).
                </div>
              </div>
              <div style={styles.dataRow} className="privacy-data-row">
                <div style={styles.dataLabel} className="privacy-data-label">Search History</div>
                <div style={styles.dataDescription}>
                  Retained for up to 18 months to personalize your experience. You can delete your
                  search history at any time through app settings, and it will be removed within 7 days.
                </div>
              </div>
              <div style={styles.dataRow} className="privacy-data-row">
                <div style={styles.dataLabel} className="privacy-data-label">Saved Collections</div>
                <div style={styles.dataDescription}>
                  Retained until you delete them or delete your account. You can export your
                  collections before deletion.
                </div>
              </div>
              <div style={styles.dataRow} className="privacy-data-row">
                <div style={styles.dataLabel} className="privacy-data-label">Location Data</div>
                <div style={styles.dataDescription}>
                  Precise location data is processed in real-time and not persistently stored.
                  City-level exploration history is retained for up to 24 months.
                </div>
              </div>
              <div style={styles.dataRow} className="privacy-data-row">
                <div style={styles.dataLabel} className="privacy-data-label">Community Contributions</div>
                <div style={styles.dataDescription}>
                  Public contributions (comments, corrections) may be retained to maintain community
                  content integrity, but can be anonymized upon request.
                </div>
              </div>
              <div style={styles.dataRow} className="privacy-data-row">
                <div style={styles.dataLabel} className="privacy-data-label">Voting Activity</div>
                <div style={styles.dataDescription}>
                  Retained for up to 24 months for community ranking purposes. Deleted or anonymized
                  after account deletion.
                </div>
              </div>
              <div style={styles.dataRow} className="privacy-data-row">
                <div style={styles.dataLabel} className="privacy-data-label">Usage Analytics</div>
                <div style={styles.dataDescription}>
                  Anonymized and aggregated usage data may be retained indefinitely for analytical
                  and research purposes.
                </div>
              </div>
              <div style={styles.dataRow} className="privacy-data-row">
                <div style={styles.dataLabel} className="privacy-data-label">Payment Records</div>
                <div style={styles.dataDescription}>
                  Transaction records retained for 7 years as required for tax and legal compliance.
                </div>
              </div>
            </div>

            <h3 style={styles.subsectionTitle}>7.1 Data Deletion Upon Request</h3>
            <p style={styles.paragraph}>
              When you request account deletion or data erasure:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Your personal data will be deleted within 30 days of your request.
              </li>
              <li style={styles.listItem}>
                Some data may be retained longer if required by law or for legitimate business
                purposes (fraud prevention, legal claims).
              </li>
              <li style={styles.listItem}>
                Anonymized data that cannot identify you may be retained for analytics.
              </li>
              <li style={styles.listItem}>
                Backup copies may take up to 90 days to be fully purged from our systems.
              </li>
            </ul>
          </section>

          {/* Section 8: Your Rights */}
          <section id="your-rights" style={styles.section} className="privacy-section">
            <h2 style={styles.sectionTitle} className="privacy-section-title">8. Your Rights</h2>
            <p style={styles.paragraph}>
              You have significant rights regarding your personal information. Here's how you can
              exercise them:
            </p>

            <h3 style={styles.subsectionTitle}>8.1 Right to Access</h3>
            <p style={styles.paragraph}>
              You can request a copy of your personal data at any time:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Go to Settings {">"} Privacy {">"} Download My Data in the app.
              </li>
              <li style={styles.listItem}>
                Or email privacy@leirz.com with your request.
              </li>
              <li style={styles.listItem}>
                We will provide your data within 30 days in a commonly used format (JSON/CSV).
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>8.2 Right to Deletion</h3>
            <p style={styles.paragraph}>
              You can request deletion of your account and associated data:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Go to Settings {">"} Account {">"} Delete Account in the app.
              </li>
              <li style={styles.listItem}>
                Or email privacy@leirz.com to request deletion.
              </li>
              <li style={styles.listItem}>
                Deletion will be completed within 30 days (see Section 7 for retention exceptions).
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>8.3 Right to Data Export (Portability)</h3>
            <p style={styles.paragraph}>
              You can export your data in portable formats:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>Collections:</strong> Export saved places and markers as JSON or CSV.
              </li>
              <li style={styles.listItem}>
                <strong>Search History:</strong> Export your search queries and results.
              </li>
              <li style={styles.listItem}>
                <strong>Account Data:</strong> Export all personal information we hold about you.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>8.4 Right to Correction</h3>
            <p style={styles.paragraph}>
              You can update or correct your account information at any time through the app
              settings. For corrections to other data, contact support@leirz.com.
            </p>

            <h3 style={styles.subsectionTitle}>8.5 Right to Opt-Out</h3>
            <p style={styles.paragraph}>
              You can opt out of various data uses:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>Location Tracking:</strong> Disable location access in device settings.
              </li>
              <li style={styles.listItem}>
                <strong>Search History:</strong> Disable search history saving in app settings.
              </li>
              <li style={styles.listItem}>
                <strong>Analytics:</strong> Opt out of analytics collection in privacy settings.
              </li>
              <li style={styles.listItem}>
                <strong>AI Improvement:</strong> Opt out of contributing to AI training in settings.
              </li>
              <li style={styles.listItem}>
                <strong>Marketing Emails:</strong> Unsubscribe via link in emails or notification settings.
              </li>
              <li style={styles.listItem}>
                <strong>Push Notifications:</strong> Manage in device notification settings.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>8.6 Right to Restrict Processing</h3>
            <p style={styles.paragraph}>
              You can request that we limit how we process your data in certain circumstances.
              Contact privacy@leirz.com to make this request.
            </p>
          </section>

          {/* Section 9: GDPR Compliance */}
          <section id="gdpr" style={styles.section} className="privacy-section">
            <h2 style={styles.sectionTitle} className="privacy-section-title">9. GDPR Compliance (EU Users)</h2>
            <p style={styles.paragraph}>
              If you are located in the European Union (EU), European Economic Area (EEA), or the
              United Kingdom (UK), you have additional rights under the General Data Protection
              Regulation (GDPR) and UK GDPR.
            </p>

            <div style={styles.complianceBox}>
              <h3 style={styles.complianceTitle}>Your GDPR Rights</h3>
              <ul style={styles.complianceList}>
                <li><strong>Right of Access (Art. 15):</strong> Obtain confirmation of whether we process your data and request a copy.</li>
                <li><strong>Right to Rectification (Art. 16):</strong> Correct inaccurate or incomplete personal data.</li>
                <li><strong>Right to Erasure (Art. 17):</strong> Request deletion of your personal data ("right to be forgotten").</li>
                <li><strong>Right to Restrict Processing (Art. 18):</strong> Limit how we use your data in certain circumstances.</li>
                <li><strong>Right to Data Portability (Art. 20):</strong> Receive your data in a structured, machine-readable format.</li>
                <li><strong>Right to Object (Art. 21):</strong> Object to processing based on legitimate interests or for direct marketing.</li>
                <li><strong>Right to Withdraw Consent (Art. 7):</strong> Withdraw consent at any time where processing is based on consent.</li>
                <li><strong>Rights Related to Automated Decision-Making (Art. 22):</strong> Not be subject to solely automated decisions with legal effects.</li>
              </ul>
            </div>

            <h3 style={styles.subsectionTitle}>9.1 Legal Bases for Processing</h3>
            <p style={styles.paragraph}>
              We process your data based on the following legal grounds:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>Contract Performance (Art. 6(1)(b)):</strong> Processing necessary to provide
                the Service you requested and manage your account.
              </li>
              <li style={styles.listItem}>
                <strong>Consent (Art. 6(1)(a)):</strong> Processing based on your explicit consent,
                such as location data collection, marketing communications, and analytics.
              </li>
              <li style={styles.listItem}>
                <strong>Legitimate Interests (Art. 6(1)(f)):</strong> Processing for our legitimate
                business interests (security, fraud prevention, service improvement), balanced against
                your rights and freedoms.
              </li>
              <li style={styles.listItem}>
                <strong>Legal Obligation (Art. 6(1)(c)):</strong> Processing required to comply with
                applicable laws and regulations.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>9.2 International Data Transfers</h3>
            <p style={styles.paragraph}>
              Your data may be transferred to and processed in the United States and other countries.
              For transfers outside the EEA/UK, we rely on:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Standard Contractual Clauses (SCCs) approved by the European Commission.
              </li>
              <li style={styles.listItem}>
                Data processing agreements with appropriate supplementary measures.
              </li>
              <li style={styles.listItem}>
                Adequacy decisions where applicable.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>9.3 Data Controller</h3>
            <p style={styles.paragraph}>
              Leirz is the data controller for personal data collected through the Service.
              For GDPR-related inquiries, contact us at privacy@leirz.com.
            </p>

            <h3 style={styles.subsectionTitle}>9.4 Supervisory Authority</h3>
            <p style={styles.paragraph}>
              You have the right to lodge a complaint with your local data protection supervisory
              authority if you believe your rights have been violated.
            </p>
          </section>

          {/* Section 10: CCPA Compliance */}
          <section id="ccpa" style={styles.section} className="privacy-section">
            <h2 style={styles.sectionTitle} className="privacy-section-title">10. CCPA Compliance (California Users)</h2>
            <p style={styles.paragraph}>
              If you are a California resident, you have specific rights under the California
              Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA).
            </p>

            <div style={styles.complianceBox}>
              <h3 style={styles.complianceTitle}>Your California Privacy Rights</h3>
              <ul style={styles.complianceList}>
                <li><strong>Right to Know:</strong> Request disclosure of personal information we've collected, used, disclosed, or sold about you in the past 12 months.</li>
                <li><strong>Right to Delete:</strong> Request deletion of your personal information, subject to certain exceptions.</li>
                <li><strong>Right to Correct:</strong> Request correction of inaccurate personal information.</li>
                <li><strong>Right to Opt-Out of Sale/Sharing:</strong> Opt out of the sale or sharing of personal information for cross-context behavioral advertising.</li>
                <li><strong>Right to Limit Use of Sensitive Personal Information:</strong> Limit how we use sensitive personal information.</li>
                <li><strong>Right to Non-Discrimination:</strong> Not be discriminated against for exercising your privacy rights.</li>
              </ul>
            </div>

            <h3 style={styles.subsectionTitle}>10.1 Categories of Personal Information Collected</h3>
            <p style={styles.paragraph}>
              In the past 12 months, we have collected the following categories of personal information:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>Identifiers:</strong> Name, email address, username, IP address, device identifiers.
              </li>
              <li style={styles.listItem}>
                <strong>Geolocation Data:</strong> Precise and approximate location information.
              </li>
              <li style={styles.listItem}>
                <strong>Internet or Network Activity:</strong> Browsing history, search history, interaction with the app.
              </li>
              <li style={styles.listItem}>
                <strong>Commercial Information:</strong> Subscription and transaction history.
              </li>
              <li style={styles.listItem}>
                <strong>Inferences:</strong> Profiles reflecting preferences, characteristics, and behavior.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>10.2 Sale and Sharing of Personal Information</h3>
            <div style={styles.highlightBox}>
              <p style={styles.highlightText}>
                <strong>We do not sell your personal information.</strong> We do not "share" personal
                information for cross-context behavioral advertising as defined by CPRA. We have not
                sold or shared personal information in the preceding 12 months.
              </p>
            </div>

            <h3 style={styles.subsectionTitle}>10.3 How to Exercise Your Rights</h3>
            <p style={styles.paragraph}>
              To exercise your California privacy rights:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Email privacy@leirz.com with your request.
              </li>
              <li style={styles.listItem}>
                Use the in-app privacy request feature in Settings {">"} Privacy.
              </li>
            </ul>
            <p style={styles.paragraph}>
              We will verify your identity before processing requests. You may designate an authorized
              agent to make requests on your behalf with proper verification.
            </p>

            <h3 style={styles.subsectionTitle}>10.4 Financial Incentives</h3>
            <p style={styles.paragraph}>
              We do not offer financial incentives for the collection of personal information.
              Premium subscription pricing is the same regardless of what personal information you
              choose to share.
            </p>
          </section>

          {/* Section 11: Children's Privacy */}
          <section id="children" style={styles.section} className="privacy-section">
            <h2 style={styles.sectionTitle} className="privacy-section-title">11. Children's Privacy</h2>
            <div style={styles.warningBox}>
              <h3 style={styles.warningTitle}>Age Requirement: 13+</h3>
              <p style={styles.warningText}>
                Leirz is not intended for children under 13 years of age. We do not knowingly collect
                personal information from children under 13.
              </p>
            </div>

            <h3 style={styles.subsectionTitle}>11.1 Age Verification</h3>
            <p style={styles.paragraph}>
              Users must confirm they are 13 years or older when creating an account. While we do
              not implement strict age verification, we rely on users to provide accurate information.
            </p>

            <h3 style={styles.subsectionTitle}>11.2 If We Discover Child Data</h3>
            <p style={styles.paragraph}>
              If we discover that we have collected personal information from a child under 13
              without parental consent:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                We will promptly delete the account and all associated personal information.
              </li>
              <li style={styles.listItem}>
                We will take steps to prevent future collection from the same user.
              </li>
              <li style={styles.listItem}>
                If applicable, we will notify the parent or guardian.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>11.3 Parental Rights</h3>
            <p style={styles.paragraph}>
              If you are a parent or guardian and believe your child under 13 has provided us with
              personal information, please contact us immediately at privacy@leirz.com. You have
              the right to:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Request review of your child's personal information.
              </li>
              <li style={styles.listItem}>
                Request deletion of your child's personal information.
              </li>
              <li style={styles.listItem}>
                Refuse further collection or use of your child's information.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>11.4 Teen Users (13-17)</h3>
            <p style={styles.paragraph}>
              For users between 13 and 17 years of age:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                We encourage parental involvement and supervision.
              </li>
              <li style={styles.listItem}>
                Parents may request access to or deletion of their teen's data.
              </li>
              <li style={styles.listItem}>
                We recommend parents discuss online privacy and safety with their teens.
              </li>
            </ul>
          </section>

          {/* Section 12: Security Measures */}
          <section id="security" style={styles.section} className="privacy-section">
            <h2 style={styles.sectionTitle} className="privacy-section-title">12. Security Measures</h2>
            <p style={styles.paragraph}>
              We implement comprehensive technical and organizational security measures to protect
              your personal information from unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h3 style={styles.subsectionTitle}>12.1 Technical Safeguards</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>Encryption in Transit:</strong> All data transmitted between your device and
                our servers is encrypted using TLS 1.3 (Transport Layer Security).
              </li>
              <li style={styles.listItem}>
                <strong>Encryption at Rest:</strong> Personal data stored on our servers is encrypted
                using AES-256 encryption.
              </li>
              <li style={styles.listItem}>
                <strong>Password Security:</strong> Passwords are hashed using industry-standard
                bcrypt algorithm with salt; we never store plain-text passwords.
              </li>
              <li style={styles.listItem}>
                <strong>API Security:</strong> API endpoints are protected with authentication tokens,
                rate limiting, and input validation.
              </li>
              <li style={styles.listItem}>
                <strong>Secure Infrastructure:</strong> We use reputable cloud providers with SOC 2
                Type II certification and maintain secure server configurations.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>12.2 Access Controls</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>Least Privilege:</strong> Employee access to personal data is limited to
                those who need it for their job functions.
              </li>
              <li style={styles.listItem}>
                <strong>Authentication:</strong> Multi-factor authentication (MFA) is required for
                all administrative access.
              </li>
              <li style={styles.listItem}>
                <strong>Access Logging:</strong> All access to personal data is logged and regularly audited.
              </li>
              <li style={styles.listItem}>
                <strong>Regular Reviews:</strong> Access permissions are reviewed quarterly and
                revoked when no longer needed.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>12.3 Security Practices</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>Security Assessments:</strong> Regular vulnerability assessments and
                penetration testing by third-party security firms.
              </li>
              <li style={styles.listItem}>
                <strong>Code Reviews:</strong> Security-focused code reviews for all changes
                affecting personal data handling.
              </li>
              <li style={styles.listItem}>
                <strong>Employee Training:</strong> Regular security awareness training for all employees.
              </li>
              <li style={styles.listItem}>
                <strong>Vendor Assessment:</strong> Security evaluation of all third-party service
                providers before engagement.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>12.4 Incident Response</h3>
            <p style={styles.paragraph}>
              We maintain a comprehensive incident response plan:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                24/7 security monitoring and alerting systems.
              </li>
              <li style={styles.listItem}>
                Documented incident response procedures.
              </li>
              <li style={styles.listItem}>
                Breach notification within 72 hours as required by applicable laws.
              </li>
              <li style={styles.listItem}>
                Post-incident analysis and remediation.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>12.5 Your Security Responsibilities</h3>
            <p style={styles.paragraph}>
              While we take extensive measures to protect your data, security is a shared responsibility:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Use a strong, unique password for your Leirz account.
              </li>
              <li style={styles.listItem}>
                Enable two-factor authentication if available.
              </li>
              <li style={styles.listItem}>
                Keep your device operating system and app updated.
              </li>
              <li style={styles.listItem}>
                Do not share your account credentials with others.
              </li>
              <li style={styles.listItem}>
                Report any suspicious activity to security@leirz.com.
              </li>
            </ul>
          </section>

          {/* Section 13: Changes to Policy */}
          <section id="changes" style={styles.section} className="privacy-section">
            <h2 style={styles.sectionTitle} className="privacy-section-title">13. Changes to This Policy</h2>
            <p style={styles.paragraph}>
              We may update this Privacy Policy from time to time to reflect changes in our practices,
              technology, legal requirements, or other factors. We are committed to keeping you
              informed about how we protect your privacy.
            </p>

            <h3 style={styles.subsectionTitle}>13.1 How We Notify You of Changes</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>Policy Updates:</strong> We will update the "Last Updated" date at the top
                of this policy whenever changes are made.
              </li>
              <li style={styles.listItem}>
                <strong>Material Changes:</strong> For significant changes that affect how we collect,
                use, or share your data, we will provide prominent notice through:
                <ul style={styles.nestedList}>
                  <li>In-app notification</li>
                  <li>Email notification (if you've provided an email address)</li>
                  <li>Banner on our website</li>
                </ul>
              </li>
              <li style={styles.listItem}>
                <strong>Advance Notice:</strong> We will provide at least 30 days' notice before
                material changes take effect, where required by law.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>13.2 Your Choices on Policy Changes</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                You can review the current policy at any time in the app or on our website.
              </li>
              <li style={styles.listItem}>
                For changes requiring consent under applicable law, we will obtain your consent
                before implementing those changes.
              </li>
              <li style={styles.listItem}>
                If you disagree with any changes, you may delete your account before the changes
                take effect.
              </li>
              <li style={styles.listItem}>
                Continued use of the Service after changes take effect constitutes acceptance of
                the updated policy.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>13.3 Policy Version History</h3>
            <p style={styles.paragraph}>
              We maintain an archive of previous policy versions. You can request access to previous
              versions by contacting privacy@leirz.com.
            </p>
          </section>

          {/* Section 14: Contact Information */}
          <section id="contact" style={styles.section} className="privacy-section">
            <h2 style={styles.sectionTitle} className="privacy-section-title">14. Contact Information</h2>
            <p style={styles.paragraph}>
              We are committed to addressing your privacy concerns and questions. Please reach out
              to us through any of the following channels:
            </p>

            <div style={styles.contactBox}>
              <h3 style={styles.contactTitle}>Leirz Privacy Team</h3>
              <div style={styles.contactGrid} className="privacy-contact-grid">
                <div style={styles.contactItem}>
                  <p style={styles.contactLabel}>Privacy Inquiries</p>
                  <p style={styles.contactValue}>privacy@leirz.com</p>
                </div>
                <div style={styles.contactItem}>
                  <p style={styles.contactLabel}>General Support</p>
                  <p style={styles.contactValue}>support@leirz.com</p>
                </div>
              </div>
            </div>

            <h3 style={styles.subsectionTitle}>14.1 What to Include in Your Request</h3>
            <p style={styles.paragraph}>
              To help us respond efficiently, please include:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Your full name and email address associated with your Leirz account.
              </li>
              <li style={styles.listItem}>
                A clear description of your request or concern.
              </li>
              <li style={styles.listItem}>
                Any relevant details that help us understand and address your inquiry.
              </li>
              <li style={styles.listItem}>
                Your country/region of residence (for jurisdiction-specific requests).
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>14.2 Response Times</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>General Inquiries:</strong> We aim to respond within 5 business days.
              </li>
              <li style={styles.listItem}>
                <strong>Data Access/Deletion Requests:</strong> We will respond within 30 days
                (or sooner as required by applicable law).
              </li>
              <li style={styles.listItem}>
                <strong>Security Concerns:</strong> Urgent security matters are prioritized and
                addressed as quickly as possible.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>14.3 Supervisory Authorities</h3>
            <p style={styles.paragraph}>
              If you are not satisfied with our response, you have the right to lodge a complaint
              with your local data protection authority:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>EU/EEA:</strong> Contact your national Data Protection Authority.
              </li>
              <li style={styles.listItem}>
                <strong>UK:</strong> Information Commissioner's Office (ICO).
              </li>
              <li style={styles.listItem}>
                <strong>California:</strong> California Attorney General's Office.
              </li>
            </ul>
          </section>

          {/* Related Links */}
          <div style={styles.relatedLinks}>
            <h3 style={styles.relatedTitle}>Related Documents</h3>
            <Link to="/terms" style={styles.relatedLink} className="privacy-related-link">Terms of Service</Link>
          </div>
        </main>
        </div>

        {/* Footer */}
        <footer style={styles.footer}>
          <div style={styles.footerContent}>
            <p style={styles.footerText}>
              &copy; {new Date().getFullYear()} Leirz. All rights reserved.
            </p>
            <div style={styles.footerLinks}>
              <Link to="/" style={styles.footerLink} className="privacy-footer-link">Home</Link>
              <Link to="/terms" style={styles.footerLink} className="privacy-footer-link">Terms of Service</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#fafafa',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  header: {
    backgroundColor: '#001529',
    color: '#fff',
    padding: '40px 24px',
  },
  headerContent: {
    maxWidth: 1200,
    margin: '0 auto',
  },
  backLink: {
    color: 'rgba(255, 255, 255, 0.85)',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: 14,
    marginBottom: 16,
    transition: 'color 0.3s',
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 600,
    margin: '0 0 8px 0',
    color: '#fff',
  },
  lastUpdated: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.65)',
    margin: 0,
  },
  mainContent: {
    display: 'flex',
    maxWidth: 1200,
    margin: '0 auto',
    padding: '40px 24px',
    gap: 40,
  },
  sidebar: {
    flexShrink: 0,
    width: 280,
    position: 'sticky' as const,
    top: 24,
    alignSelf: 'flex-start',
  },
  tocContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 24,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  },
  tocTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#001529',
    margin: 0,
  },
  tocList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  tocItem: {
    marginBottom: 4,
  },
  tocLink: {
    display: 'block',
    padding: '8px 12px',
    fontSize: 13,
    color: '#595959',
    textDecoration: 'none',
    borderRadius: 4,
    transition: 'all 0.2s',
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    width: '100%',
    textAlign: 'left' as const,
  },
  tocLinkActive: {
    backgroundColor: '#e6f7ff',
    color: '#1890ff',
    fontWeight: 500,
  },
  tocHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottom: '1px solid #f0f0f0',
  },
  tocCloseBtn: {
    display: 'none',
    padding: 8,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    color: '#595959',
    fontSize: 16,
  },
  mobileTocToggle: {
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed' as const,
    bottom: 24,
    right: 24,
    padding: '12px 20px',
    backgroundColor: '#001529',
    color: '#fff',
    border: 'none',
    borderRadius: 24,
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    zIndex: 999,
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  introBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 24,
    marginBottom: 32,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    borderLeft: '4px solid #52c41a',
  },
  introText: {
    fontSize: 16,
    lineHeight: 1.8,
    color: '#262626',
    margin: 0,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 32,
    marginBottom: 24,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 600,
    color: '#001529',
    marginBottom: 20,
    paddingBottom: 12,
    borderBottom: '2px solid #f0f0f0',
  },
  subsectionTitle: {
    fontSize: 17,
    fontWeight: 600,
    color: '#262626',
    marginTop: 24,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 1.8,
    color: '#434343',
    marginBottom: 16,
  },
  list: {
    paddingLeft: 24,
    marginBottom: 16,
  },
  nestedList: {
    paddingLeft: 24,
    marginTop: 8,
    marginBottom: 8,
  },
  listItem: {
    fontSize: 15,
    lineHeight: 1.8,
    color: '#434343',
    marginBottom: 8,
  },
  highlightBox: {
    backgroundColor: '#f0f5ff',
    border: '1px solid #adc6ff',
    borderRadius: 8,
    padding: 20,
    marginTop: 20,
  },
  highlightText: {
    fontSize: 14,
    lineHeight: 1.7,
    color: '#1d39c4',
    margin: 0,
  },
  highlightList: {
    fontSize: 14,
    lineHeight: 1.7,
    color: '#1d39c4',
    margin: '12px 0 0 0',
    paddingLeft: 20,
  },
  warningBox: {
    backgroundColor: '#fffbe6',
    border: '1px solid #ffe58f',
    borderRadius: 8,
    padding: 20,
    marginBottom: 24,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#ad6800',
    marginBottom: 8,
  },
  warningText: {
    fontSize: 14,
    lineHeight: 1.7,
    color: '#614700',
    margin: 0,
  },
  dataTable: {
    border: '1px solid #f0f0f0',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 16,
    marginBottom: 20,
  },
  dataRow: {
    display: 'flex',
    borderBottom: '1px solid #f0f0f0',
  },
  dataLabel: {
    width: 180,
    flexShrink: 0,
    padding: '16px 20px',
    backgroundColor: '#fafafa',
    fontWeight: 600,
    fontSize: 14,
    color: '#262626',
  },
  dataDescription: {
    flex: 1,
    padding: '16px 20px',
    fontSize: 14,
    lineHeight: 1.7,
    color: '#434343',
  },
  complianceBox: {
    backgroundColor: '#f6ffed',
    border: '1px solid #b7eb8f',
    borderRadius: 8,
    padding: 24,
    marginBottom: 24,
  },
  complianceTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#135200',
    marginBottom: 16,
  },
  complianceList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  contactBox: {
    backgroundColor: '#f6ffed',
    border: '1px solid #b7eb8f',
    borderRadius: 8,
    padding: 24,
    marginTop: 16,
    marginBottom: 16,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: '#135200',
    marginBottom: 16,
  },
  contactGrid: {
    display: 'flex',
    gap: 32,
    flexWrap: 'wrap' as const,
  },
  contactItem: {
    minWidth: 200,
  },
  contactLabel: {
    fontSize: 13,
    color: '#52c41a',
    marginBottom: 4,
    fontWeight: 500,
  },
  contactValue: {
    fontSize: 16,
    color: '#135200',
    margin: 0,
    fontWeight: 600,
  },
  contactText: {
    fontSize: 15,
    lineHeight: 1.8,
    color: '#135200',
    margin: '4px 0',
  },
  relatedLinks: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 24,
    marginTop: 32,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  },
  relatedTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#001529',
    marginBottom: 16,
  },
  relatedLink: {
    display: 'inline-block',
    padding: '8px 16px',
    backgroundColor: '#e6f7ff',
    color: '#1890ff',
    borderRadius: 4,
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 500,
  },
  footer: {
    backgroundColor: '#001529',
    padding: '24px',
  },
  footerContent: {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: 16,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.65)',
    fontSize: 14,
    margin: 0,
  },
  footerLinks: {
    display: 'flex',
    gap: 24,
  },
  footerLink: {
    color: 'rgba(255, 255, 255, 0.85)',
    textDecoration: 'none',
    fontSize: 14,
  },
};

export default PrivacyPolicy;
