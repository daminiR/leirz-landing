import React, { useEffect, useState } from 'react';
import { Link, Helmet } from 'umi';
import { ArrowLeftOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';

interface TableOfContentsItem {
  id: string;
  title: string;
}

// Global styles for the terms of service page
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
  .terms-back-link:hover {
    color: #fff !important;
  }

  .terms-toc-link:hover {
    background-color: #f5f5f5;
    color: #1890ff;
  }

  .terms-toc-link.active {
    background-color: #e6f7ff;
    color: #1890ff;
    font-weight: 500;
  }

  .terms-footer-link:hover {
    color: #fff !important;
  }

  .terms-related-link:hover {
    background-color: #bae7ff;
  }

  /* Responsive styles */
  @media (max-width: 900px) {
    .terms-main-content {
      flex-direction: column !important;
    }

    .terms-sidebar {
      position: relative !important;
      width: 100% !important;
      top: 0 !important;
      margin-bottom: 24px;
    }

    .terms-sidebar.mobile-hidden {
      display: none;
    }

    .terms-sidebar.mobile-visible {
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

    .terms-sidebar.mobile-visible .terms-toc-container {
      max-width: 300px;
      margin: 60px auto 0;
      max-height: calc(100vh - 100px);
      overflow-y: auto;
    }

    .terms-mobile-toc-toggle {
      display: flex !important;
    }

    .terms-content {
      min-width: 0 !important;
    }

    .terms-header-title {
      font-size: 28px !important;
    }

    .terms-section {
      padding: 24px !important;
    }

    .terms-section-title {
      font-size: 20px !important;
    }
  }

  @media (max-width: 480px) {
    .terms-header {
      padding: 24px 16px !important;
    }

    .terms-main-content {
      padding: 24px 16px !important;
    }

    .terms-header-title {
      font-size: 24px !important;
    }

    .terms-section {
      padding: 20px !important;
    }

    .terms-intro-box {
      padding: 16px !important;
    }
  }

  /* Custom scrollbar */
  .terms-container ::-webkit-scrollbar {
    width: 6px;
  }

  .terms-container ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  .terms-container ::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }

  .terms-container ::-webkit-scrollbar-thumb:hover {
    background: #a1a1a1;
  }

  /* Animation for mobile menu */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .terms-sidebar.mobile-visible {
    animation: fadeIn 0.2s ease-out;
  }
`;

const tableOfContents: TableOfContentsItem[] = [
  { id: 'acceptance', title: '1. Acceptance of Terms' },
  { id: 'description', title: '2. Description of Service' },
  { id: 'accounts', title: '3. User Accounts' },
  { id: 'subscription', title: '4. Premium Subscription' },
  { id: 'acceptable-use', title: '5. Acceptable Use Policy' },
  { id: 'ai-content', title: '6. AI-Generated Content Disclaimer' },
  { id: 'user-content', title: '7. User-Generated Content' },
  { id: 'intellectual-property', title: '8. Intellectual Property' },
  { id: 'location-services', title: '9. Location Services' },
  { id: 'third-party', title: '10. Third-Party Services' },
  { id: 'disclaimers', title: '11. Disclaimers' },
  { id: 'limitation', title: '12. Limitation of Liability' },
  { id: 'indemnification', title: '13. Indemnification' },
  { id: 'termination', title: '14. Termination' },
  { id: 'governing-law', title: '15. Governing Law' },
  { id: 'dispute-resolution', title: '16. Dispute Resolution' },
  { id: 'changes', title: '17. Changes to Terms' },
  { id: 'contact', title: '18. Contact Information' },
];

const TermsOfService: React.FC = () => {
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
        <title>Terms of Service - Leirz</title>
        <meta name="description" content="Terms of Service for Leirz - Read our terms and conditions for using the Leirz app and services." />
        <style type="text/css">{globalStyles}</style>
      </Helmet>

      <div style={styles.container} className="terms-container">
        {/* Header */}
        <header style={styles.header} className="terms-header">
          <div style={styles.headerContent}>
            <Link to="/" style={styles.backLink} className="terms-back-link">
              <ArrowLeftOutlined style={{ marginRight: 8 }} />
              Back to Home
            </Link>
            <h1 style={styles.headerTitle} className="terms-header-title">Terms of Service</h1>
            <p style={styles.lastUpdated}>Last Updated: January 2025</p>
          </div>
        </header>

        {/* Mobile TOC Toggle Button */}
        <button
          onClick={toggleMobileMenu}
          style={styles.mobileTocToggle}
          className="terms-mobile-toc-toggle"
          aria-label="Toggle table of contents"
        >
          {mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
          <span style={{ marginLeft: 8 }}>Table of Contents</span>
        </button>

        <div style={styles.mainContent} className="terms-main-content">
          {/* Table of Contents - Sidebar */}
          <nav
            style={styles.sidebar}
            className={`terms-sidebar ${mobileMenuOpen ? 'mobile-visible' : 'mobile-hidden'}`}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setMobileMenuOpen(false);
              }
            }}
          >
            <div style={styles.tocContainer} className="terms-toc-container">
              <div style={styles.tocHeader}>
                <h3 style={styles.tocTitle}>Table of Contents</h3>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  style={styles.tocCloseBtn}
                  className="terms-toc-close"
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
                      className={`terms-toc-link ${activeSection === item.id ? 'active' : ''}`}
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <main style={styles.content} className="terms-content">
            <div style={styles.introBox} className="terms-intro-box">
            <p style={styles.introText}>
              Welcome to Leirz. These Terms of Service ("Terms") govern your access to and use of
              the Leirz mobile application ("App"), website, and related services (collectively,
              the "Service"). Leirz is a historical discovery platform featuring over 600,000 historical
              markers across more than 1,500 cities worldwide. Please read these Terms carefully before
              using our Service.
            </p>
          </div>

          {/* Section 1: Acceptance of Terms */}
          <section id="acceptance" style={styles.section} className="terms-section">
            <h2 style={styles.sectionTitle} className="terms-section-title">1. Acceptance of Terms</h2>
            <p style={styles.paragraph}>
              By downloading, installing, accessing, or using the Leirz App, you acknowledge that
              you have read, understood, and agree to be bound by these Terms of Service and our
              Privacy Policy. If you do not agree to these Terms, you must not access or use the Service.
            </p>
            <p style={styles.paragraph}>
              These Terms constitute a legally binding agreement between you ("User," "you," or "your")
              and Leirz ("Company," "we," "us," or "our"). By using the Service, you represent that you
              are at least 13 years of age, or the minimum age required in your jurisdiction, whichever
              is higher. If you are between 13 and 18 years of age (or the age of majority in your
              jurisdiction), you must have parental or guardian consent to use the Service.
            </p>
            <p style={styles.paragraph}>
              Your continued use of the Service following the posting of any changes to these Terms
              constitutes acceptance of those changes. We reserve the right to refuse service to anyone
              for any reason at any time.
            </p>
            <p style={styles.paragraph}>
              If you are accepting these Terms on behalf of a company, organization, or other legal
              entity, you represent and warrant that you have the authority to bind such entity to
              these Terms, in which case "you" and "your" will refer to such entity.
            </p>
          </section>

          {/* Section 2: Description of Service */}
          <section id="description" style={styles.section} className="terms-section">
            <h2 style={styles.sectionTitle} className="terms-section-title">2. Description of Service</h2>
            <p style={styles.paragraph}>
              Leirz is a historical discovery and education platform that enables users to explore
              and learn about historical events, figures, locations, and landmarks. Our comprehensive
              database includes over 600,000 historical markers across more than 1,500 cities worldwide.
            </p>

            <h3 style={styles.subsectionTitle}>2.1 Core Features</h3>
            <p style={styles.paragraph}>Our Service includes the following features:</p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>Location-Based Historical Discovery:</strong> Explore historical sites and
                events based on proximity to your current location. Our radius-based search allows
                you to discover history at three levels: Local (500 meters), Area (2 kilometers),
                and City (10 kilometers).
              </li>
              <li style={styles.listItem}>
                <strong>AI-Powered "What Happened Here?" Search:</strong> Utilizing advanced
                artificial intelligence technology, our innovative search feature provides detailed
                historical information about any location, answering the question "What happened here?"
                with rich, contextual historical narratives.
              </li>
              <li style={styles.listItem}>
                <strong>Interactive Maps Integration:</strong> Seamless integration with mapping
                services to visualize historical markers, plan routes to historical sites, and
                navigate to points of interest.
              </li>
              <li style={styles.listItem}>
                <strong>Personal Collections:</strong> Save, organize, and manage your favorite
                historical discoveries in custom collections for future reference.
              </li>
              <li style={styles.listItem}>
                <strong>Saved Places:</strong> Bookmark historical locations you want to visit or
                remember for quick access later.
              </li>
              <li style={styles.listItem}>
                <strong>Community Voting:</strong> Participate in community-driven content curation
                by voting on historical markers to help surface the most accurate and interesting content.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>2.2 Premium Features</h3>
            <p style={styles.paragraph}>
              Premium subscribers gain access to enhanced features including unlimited AI-powered searches,
              advanced filtering options, offline access to saved content, an ad-free experience, and
              exclusive historical content and collections.
            </p>

            <h3 style={styles.subsectionTitle}>2.3 Service Availability</h3>
            <p style={styles.paragraph}>
              While we strive to provide continuous access to the Service, we do not guarantee that
              the Service will be available at all times. The Service may be subject to limitations,
              delays, and other problems inherent in the use of the internet and electronic
              communications. We are not responsible for any delays, delivery failures, or other
              damage resulting from such problems.
            </p>
          </section>

          {/* Section 3: User Accounts */}
          <section id="accounts" style={styles.section} className="terms-section">
            <h2 style={styles.sectionTitle} className="terms-section-title">3. User Accounts</h2>

            <h3 style={styles.subsectionTitle}>3.1 Account Registration</h3>
            <p style={styles.paragraph}>
              To access certain features of the Service, including saving collections, participating
              in community voting, and subscribing to Premium, you must create an account. When
              creating an account, you agree to:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Provide accurate, current, and complete information during the registration process.
              </li>
              <li style={styles.listItem}>
                Maintain and promptly update your account information to keep it accurate, current, and complete.
              </li>
              <li style={styles.listItem}>
                Use only one account per person; creating multiple accounts for the same individual is prohibited.
              </li>
              <li style={styles.listItem}>
                Not use another person's account without their explicit permission.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>3.2 Account Security</h3>
            <p style={styles.paragraph}>
              You are responsible for maintaining the confidentiality of your account credentials,
              including your password and any other authentication methods. You agree to:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Create a strong, unique password that you do not use for other online services.
              </li>
              <li style={styles.listItem}>
                Not share your account credentials with any third party.
              </li>
              <li style={styles.listItem}>
                Notify us immediately at support@leirz.com of any unauthorized use of your account
                or any other security breach.
              </li>
              <li style={styles.listItem}>
                Log out of your account at the end of each session, especially when using shared
                or public devices.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>3.3 Account Responsibilities</h3>
            <p style={styles.paragraph}>
              You accept full responsibility for all activities that occur under your account, whether
              or not you authorized such activities. We will not be liable for any loss or damage
              arising from your failure to comply with these security requirements. We reserve the
              right to suspend or terminate accounts that contain false or misleading information or
              that we reasonably believe have been compromised.
            </p>

            <h3 style={styles.subsectionTitle}>3.4 Account Deletion</h3>
            <p style={styles.paragraph}>
              You may delete your account at any time through the App settings or by contacting us
              at support@leirz.com. Upon account deletion, we will delete or anonymize your personal
              data in accordance with our Privacy Policy, except where we are required to retain
              certain information for legal or regulatory purposes.
            </p>
          </section>

          {/* Section 4: Premium Subscription */}
          <section id="subscription" style={styles.section} className="terms-section">
            <h2 style={styles.sectionTitle} className="terms-section-title">4. Premium Subscription</h2>

            <h3 style={styles.subsectionTitle}>4.1 Subscription Plans</h3>
            <p style={styles.paragraph}>
              Leirz offers premium subscription plans ("Premium") that provide access to enhanced
              features beyond the free tier. Premium plans are available in the following options:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>Monthly Plan:</strong> Billed on a recurring monthly basis, providing full
                access to all Premium features for one calendar month.
              </li>
              <li style={styles.listItem}>
                <strong>Yearly Plan:</strong> Billed on a recurring annual basis at a discounted rate,
                providing full access to all Premium features for one calendar year.
              </li>
            </ul>
            <p style={styles.paragraph}>
              Premium features include, but are not limited to: unlimited AI-powered historical searches,
              extended search radius options, advanced filtering and sorting, offline access to saved
              content, priority customer support, and an ad-free experience.
            </p>

            <h3 style={styles.subsectionTitle}>4.2 Pricing and Billing</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Current pricing for all subscription plans is displayed in the App and may vary by region.
              </li>
              <li style={styles.listItem}>
                Subscription fees are billed in advance on a recurring basis (monthly or annually,
                depending on your selected plan).
              </li>
              <li style={styles.listItem}>
                Payment will be charged to your designated payment method (via Apple App Store or
                Google Play Store) at confirmation of purchase.
              </li>
              <li style={styles.listItem}>
                Subscriptions automatically renew unless cancelled at least 24 hours before the end
                of the current billing period.
              </li>
              <li style={styles.listItem}>
                Prices are subject to change with at least 30 days' prior notice. Price changes will
                apply to subsequent billing cycles and will not affect the current billing period.
              </li>
              <li style={styles.listItem}>
                All fees are exclusive of applicable taxes, which will be added to your billing amount
                where required by law.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>4.3 Free Trials</h3>
            <p style={styles.paragraph}>
              We may offer free trial periods for Premium subscriptions from time to time. The terms
              of free trials include:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Trial eligibility is determined at our sole discretion and is typically limited to
                one trial per user, per device, and per payment method.
              </li>
              <li style={styles.listItem}>
                At the end of the trial period, your subscription will automatically convert to a
                paid subscription at the then-current subscription rate unless cancelled before the
                trial ends.
              </li>
              <li style={styles.listItem}>
                You may cancel at any time during the trial period to avoid being charged.
              </li>
              <li style={styles.listItem}>
                We reserve the right to modify, suspend, or discontinue free trial offers at any time
                without notice.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>4.4 Cancellation</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                You may cancel your subscription at any time through your account settings in the
                App or through the applicable app store (Apple App Store or Google Play Store).
              </li>
              <li style={styles.listItem}>
                Cancellation must be completed at least 24 hours before the end of the current billing
                period to prevent automatic renewal.
              </li>
              <li style={styles.listItem}>
                Upon cancellation, you will retain access to Premium features until the end of your
                current paid billing period.
              </li>
              <li style={styles.listItem}>
                After your subscription ends, your account will revert to the free tier with limited
                features, but your saved data (collections, saved places) will be preserved.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>4.5 Refunds</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Subscription fees are generally non-refundable, and no refunds or credits will be
                provided for partial billing periods, except as required by applicable law.
              </li>
              <li style={styles.listItem}>
                For subscriptions purchased through the Apple App Store, refund requests must be
                directed to Apple in accordance with their refund policies.
              </li>
              <li style={styles.listItem}>
                For subscriptions purchased through the Google Play Store, refund requests must be
                directed to Google in accordance with their refund policies.
              </li>
              <li style={styles.listItem}>
                In exceptional circumstances, we may, at our sole discretion, provide refunds or
                credits. Please contact support@leirz.com for refund inquiries.
              </li>
            </ul>
          </section>

          {/* Section 5: Acceptable Use Policy */}
          <section id="acceptable-use" style={styles.section} className="terms-section">
            <h2 style={styles.sectionTitle} className="terms-section-title">5. Acceptable Use Policy</h2>
            <p style={styles.paragraph}>
              You agree to use the Service only for lawful purposes and in accordance with these Terms.
              By using the Service, you agree to the following:
            </p>

            <h3 style={styles.subsectionTitle}>5.1 Permitted Uses</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Using the Service for personal, non-commercial historical education and discovery.
              </li>
              <li style={styles.listItem}>
                Participating constructively in community features, including voting and contributing
                accurate historical information.
              </li>
              <li style={styles.listItem}>
                Sharing content from the Service through legitimate means with proper attribution.
              </li>
              <li style={styles.listItem}>
                Providing feedback and suggestions to help improve the Service.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>5.2 Prohibited Uses</h3>
            <p style={styles.paragraph}>You agree NOT to:</p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Use the Service in any way that violates any applicable federal, state, local, or
                international law or regulation.
              </li>
              <li style={styles.listItem}>
                Impersonate any person or entity, or falsely state or otherwise misrepresent your
                affiliation with any person or entity.
              </li>
              <li style={styles.listItem}>
                Interfere with or disrupt the Service or servers or networks connected to the Service,
                or disobey any requirements, procedures, policies, or regulations of networks connected
                to the Service.
              </li>
              <li style={styles.listItem}>
                Attempt to gain unauthorized access to any portion of the Service, other accounts,
                computer systems, or networks connected to the Service, whether through hacking,
                password mining, or any other means.
              </li>
              <li style={styles.listItem}>
                Use any automated means, including bots, scrapers, spiders, crawlers, or data mining
                tools, to access, collect data from, or interact with the Service without our express
                written permission.
              </li>
              <li style={styles.listItem}>
                Transmit any viruses, worms, malware, Trojan horses, or other malicious or technologically
                harmful code.
              </li>
              <li style={styles.listItem}>
                Harass, threaten, abuse, stalk, or otherwise harm other users of the Service.
              </li>
              <li style={styles.listItem}>
                Post or transmit content that is defamatory, obscene, pornographic, hateful, discriminatory,
                or promotes violence against any individual or group.
              </li>
              <li style={styles.listItem}>
                Use the Service to intentionally spread misinformation, propaganda, or false historical
                claims.
              </li>
              <li style={styles.listItem}>
                Circumvent, disable, or otherwise interfere with security-related features of the
                Service or features that prevent or restrict use or copying of any content.
              </li>
              <li style={styles.listItem}>
                Manipulate community voting through multiple accounts, coordinated voting campaigns,
                vote buying, or other deceptive practices.
              </li>
              <li style={styles.listItem}>
                Resell, redistribute, or commercially exploit the Service or any content from the
                Service without our express written consent.
              </li>
              <li style={styles.listItem}>
                Use the Service in any manner that could damage, disable, overburden, or impair the
                Service or interfere with any other party's use of the Service.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>5.3 Enforcement</h3>
            <p style={styles.paragraph}>
              We reserve the right to investigate and take appropriate legal action against anyone who,
              in our sole discretion, violates this Acceptable Use Policy, including removing offending
              content, suspending or terminating accounts, and reporting violations to law enforcement
              authorities.
            </p>
          </section>

          {/* Section 6: AI-Generated Content Disclaimer */}
          <section id="ai-content" style={styles.section} className="terms-section">
            <h2 style={styles.sectionTitle} className="terms-section-title">6. AI-Generated Content Disclaimer</h2>
            <div style={styles.warningBox}>
              <h3 style={styles.warningTitle}>Important Notice Regarding AI-Generated Content</h3>
              <p style={styles.warningText}>
                Leirz utilizes advanced artificial intelligence technology
                to power our "What Happened Here?" search feature and provide historical information.
                While we strive for accuracy, AI-generated content may contain errors, omissions,
                inaccuracies, or biases. All AI-generated content is provided for educational and
                informational purposes only.
              </p>
            </div>

            <h3 style={styles.subsectionTitle}>6.1 Nature of AI-Generated Content</h3>
            <p style={styles.paragraph}>
              By using the Service, you acknowledge and understand that:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                AI-generated content, including responses to "What happened here?" queries, is produced
                by machine learning algorithms and is not reviewed or verified by professional historians
                before delivery.
              </li>
              <li style={styles.listItem}>
                AI systems may generate content that is factually incorrect,
                incomplete, outdated, or contains unintentional biases.
              </li>
              <li style={styles.listItem}>
                AI may "hallucinate" or generate plausible-sounding but entirely fabricated historical
                information, dates, names, or events.
              </li>
              <li style={styles.listItem}>
                The AI's knowledge has a training cutoff date and may not include recent historical
                discoveries, updated interpretations, or newly uncovered information.
              </li>
              <li style={styles.listItem}>
                AI-generated content may reflect biases present in its training data, which could
                affect the representation of certain historical events, cultures, or perspectives.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>6.2 Limitations on Use</h3>
            <p style={styles.paragraph}>
              AI-generated content provided by Leirz should NOT be:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Relied upon as the sole or primary source for academic research, scholarly papers,
                or educational assignments.
              </li>
              <li style={styles.listItem}>
                Used as the basis for professional, business, legal, or medical decisions.
              </li>
              <li style={styles.listItem}>
                Cited as an authoritative historical source without independent verification.
              </li>
              <li style={styles.listItem}>
                Used in any context where factual accuracy is critical and errors could cause harm.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>6.3 User Responsibility</h3>
            <p style={styles.paragraph}>
              Users are strongly encouraged to:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Verify important historical information through authoritative sources, including
                academic publications, historical societies, and primary sources.
              </li>
              <li style={styles.listItem}>
                Treat AI-generated content as a starting point for historical exploration rather
                than definitive truth.
              </li>
              <li style={styles.listItem}>
                Report suspected inaccuracies through our feedback mechanisms to help improve
                content quality.
              </li>
              <li style={styles.listItem}>
                Exercise critical thinking and skepticism when consuming any AI-generated content.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>6.4 No Guarantee of Accuracy</h3>
            <p style={styles.paragraph}>
              WE MAKE NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, REGARDING
              THE ACCURACY, COMPLETENESS, RELIABILITY, OR SUITABILITY OF ANY AI-GENERATED CONTENT.
              WE EXPRESSLY DISCLAIM ALL LIABILITY FOR ANY ERRORS, OMISSIONS, OR INACCURACIES IN
              AI-GENERATED CONTENT AND ANY RELIANCE YOU PLACE ON SUCH CONTENT IS STRICTLY AT YOUR
              OWN RISK.
            </p>
          </section>

          {/* Section 7: User-Generated Content */}
          <section id="user-content" style={styles.section} className="terms-section">
            <h2 style={styles.sectionTitle} className="terms-section-title">7. User-Generated Content</h2>

            <h3 style={styles.subsectionTitle}>7.1 Your Content</h3>
            <p style={styles.paragraph}>
              The Service allows you to submit, post, or share content, including but not limited
              to comments, reviews, corrections, historical insights, collection names and descriptions,
              and votes ("User Content"). You retain ownership of your User Content, subject to the
              licenses granted below.
            </p>

            <h3 style={styles.subsectionTitle}>7.2 License Grant to Leirz</h3>
            <p style={styles.paragraph}>
              By submitting User Content to the Service, you grant Leirz a worldwide, non-exclusive,
              royalty-free, sublicensable, and transferable license to use, reproduce, modify, adapt,
              publish, translate, create derivative works from, distribute, display, and perform your
              User Content in connection with operating, promoting, and improving the Service. This
              license continues even if you stop using the Service, to the extent your User Content
              has been incorporated into the Service or shared with other users.
            </p>

            <h3 style={styles.subsectionTitle}>7.3 Community Contributions and Voting</h3>
            <p style={styles.paragraph}>
              Leirz includes community features that allow users to vote on historical markers and
              content. By participating in these features, you agree that:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                You will vote and contribute in good faith, based on your genuine assessment of
                historical accuracy, educational value, and relevance.
              </li>
              <li style={styles.listItem}>
                Community votes influence content visibility and rankings but do not constitute
                academic verification, professional historical validation, or endorsement by Leirz.
              </li>
              <li style={styles.listItem}>
                You will not manipulate voting through multiple accounts, coordinated voting schemes,
                automated systems, or other deceptive practices.
              </li>
              <li style={styles.listItem}>
                We may use community input and voting patterns to improve AI-generated content,
                algorithms, and overall service quality.
              </li>
              <li style={styles.listItem}>
                We reserve the right to discount, remove, or reverse votes that appear fraudulent
                or that violate our community guidelines.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>7.4 Content Standards</h3>
            <p style={styles.paragraph}>
              You are solely responsible for your User Content. By submitting User Content, you
              represent and warrant that:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                You own or have the necessary rights, licenses, consents, and permissions to submit
                the content and to grant the licenses described in these Terms.
              </li>
              <li style={styles.listItem}>
                Your content does not infringe, misappropriate, or violate any third-party rights,
                including intellectual property rights, privacy rights, or publicity rights.
              </li>
              <li style={styles.listItem}>
                Your content is accurate to the best of your knowledge, particularly regarding
                historical claims, dates, and facts.
              </li>
              <li style={styles.listItem}>
                Your content complies with all applicable laws, regulations, and these Terms.
              </li>
              <li style={styles.listItem}>
                Your content does not contain any defamatory, obscene, hateful, discriminatory,
                or otherwise objectionable material.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>7.5 Content Moderation</h3>
            <p style={styles.paragraph}>
              We reserve the right, but have no obligation, to review, monitor, edit, or remove any
              User Content at our sole discretion for any reason, including content that we determine
              violates these Terms, our community guidelines, or is otherwise objectionable. We are
              not responsible or liable for any User Content posted by users. Your use of User Content
              is at your own risk.
            </p>
          </section>

          {/* Section 8: Intellectual Property */}
          <section id="intellectual-property" style={styles.section} className="terms-section">
            <h2 style={styles.sectionTitle} className="terms-section-title">8. Intellectual Property</h2>

            <h3 style={styles.subsectionTitle}>8.1 Leirz Intellectual Property</h3>
            <p style={styles.paragraph}>
              The Service and its entire contents, features, and functionality are owned by Leirz,
              its licensors, or other providers and are protected by United States and international
              copyright, trademark, patent, trade secret, and other intellectual property or proprietary
              rights laws. This includes, but is not limited to:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                The Leirz name, logo, and all related names, logos, product and service names, designs,
                and slogans.
              </li>
              <li style={styles.listItem}>
                The App's software, source code, algorithms, and technical infrastructure.
              </li>
              <li style={styles.listItem}>
                The compilation, organization, and presentation of historical data and content.
              </li>
              <li style={styles.listItem}>
                The user interface design, graphics, icons, and visual elements.
              </li>
              <li style={styles.listItem}>
                Any proprietary methodologies, processes, or technologies used in the Service.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>8.2 Limited License to Users</h3>
            <p style={styles.paragraph}>
              Subject to your compliance with these Terms, we grant you a limited, non-exclusive,
              non-transferable, non-sublicensable, revocable license to:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Download and install the App on devices that you own or control.
              </li>
              <li style={styles.listItem}>
                Access and use the Service for your personal, non-commercial educational purposes.
              </li>
              <li style={styles.listItem}>
                Share content from the Service with proper attribution for non-commercial purposes.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>8.3 Restrictions</h3>
            <p style={styles.paragraph}>
              Except as expressly permitted by these Terms, you may not:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Reproduce, distribute, modify, create derivative works of, publicly display, publicly
                perform, republish, download, store, or transmit any content from the Service without
                our prior written consent.
              </li>
              <li style={styles.listItem}>
                Reverse engineer, decompile, disassemble, or attempt to derive the source code of
                any software used in the Service.
              </li>
              <li style={styles.listItem}>
                Remove, alter, or obscure any copyright, trademark, or other proprietary rights
                notices from the Service or any content.
              </li>
              <li style={styles.listItem}>
                Use our trademarks, logos, service marks, or brand elements without our prior written
                permission.
              </li>
              <li style={styles.listItem}>
                Use the Service or any content for any commercial purpose without obtaining a
                commercial license from us.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>8.4 User Ownership</h3>
            <p style={styles.paragraph}>
              You retain all ownership rights in your User Content. We do not claim ownership of any
              User Content you submit to the Service. However, by submitting User Content, you grant
              us the licenses described in Section 7.2 above. You also acknowledge that any personal
              data you provide is subject to our Privacy Policy.
            </p>

            <h3 style={styles.subsectionTitle}>8.5 Feedback</h3>
            <p style={styles.paragraph}>
              If you provide us with any feedback, suggestions, ideas, or other information regarding
              the Service ("Feedback"), you hereby assign to us all rights in such Feedback and agree
              that we have the right to use and fully exploit such Feedback without any obligation
              or compensation to you.
            </p>
          </section>

          {/* Section 9: Location Services */}
          <section id="location-services" style={styles.section} className="terms-section">
            <h2 style={styles.sectionTitle} className="terms-section-title">9. Location Services</h2>

            <h3 style={styles.subsectionTitle}>9.1 Consent to Location Access</h3>
            <p style={styles.paragraph}>
              Leirz's core functionality relies on location-based services to provide you with
              relevant historical information about your surroundings. By using the Service, you
              consent to our collection and use of your location data as described in these Terms
              and our Privacy Policy.
            </p>
            <p style={styles.paragraph}>
              You will be prompted to grant location access permissions when you first use the App.
              You may revoke or modify these permissions at any time through your device settings.
              However, please note that certain features of the Service, including Local (500m),
              Area (2km), and City (10km) radius searches, require location access to function.
            </p>

            <h3 style={styles.subsectionTitle}>9.2 Location Data Usage</h3>
            <p style={styles.paragraph}>
              We use your location data to:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Provide location-based historical discovery features at various radius levels.
              </li>
              <li style={styles.listItem}>
                Power the "What happened here?" AI search feature with your current location context.
              </li>
              <li style={styles.listItem}>
                Display nearby historical markers on the map.
              </li>
              <li style={styles.listItem}>
                Improve and personalize your experience based on regions you explore.
              </li>
              <li style={styles.listItem}>
                Generate anonymized, aggregated analytics to improve the Service.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>9.3 Location Accuracy Disclaimer</h3>
            <p style={styles.paragraph}>
              While we strive to provide accurate location-based services, you acknowledge that:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Location accuracy depends on your device's GPS capabilities, network connectivity,
                and environmental factors, and may vary significantly.
              </li>
              <li style={styles.listItem}>
                Historical marker locations are approximations and may not represent exact historical
                boundaries or positions.
              </li>
              <li style={styles.listItem}>
                Indoor positioning may be limited or unavailable.
              </li>
              <li style={styles.listItem}>
                We are not responsible for any inaccuracies in location data or any consequences
                resulting from such inaccuracies.
              </li>
              <li style={styles.listItem}>
                You should not rely solely on the Service for navigation or to determine your
                precise physical location.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>9.4 Battery and Data Usage</h3>
            <p style={styles.paragraph}>
              Continuous use of location services may significantly reduce your device's battery
              life and may consume mobile data. You are responsible for managing your device's
              location settings and data usage according to your preferences.
            </p>
          </section>

          {/* Section 10: Third-Party Services */}
          <section id="third-party" style={styles.section} className="terms-section">
            <h2 style={styles.sectionTitle} className="terms-section-title">10. Third-Party Services</h2>

            <h3 style={styles.subsectionTitle}>10.1 Integrated Third-Party Services</h3>
            <p style={styles.paragraph}>
              The Service integrates with and relies upon various third-party services to provide
              its functionality. These include, but are not limited to:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>AI Services:</strong> Powers our AI-generated historical content and
                "What happened here?" search feature. Your use of AI-generated features is subject
                to applicable third-party AI service provider terms.
              </li>
              <li style={styles.listItem}>
                <strong>Apple Maps:</strong> Provides mapping, navigation, and location visualization
                services on iOS devices. Your use is subject to Apple's Terms and Conditions.
              </li>
              <li style={styles.listItem}>
                <strong>Google Maps / Google Services:</strong> May be used for mapping, geocoding,
                and location services. Your use is subject to Google's Terms of Service and Privacy Policy.
              </li>
              <li style={styles.listItem}>
                <strong>Apple App Store / Google Play Store:</strong> Handles subscription payments
                and app distribution. Purchases are subject to the respective store's terms.
              </li>
              <li style={styles.listItem}>
                <strong>Authentication Providers:</strong> Third-party sign-in services (such as
                Sign in with Apple or Google Sign-In) if you choose to use them.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>10.2 Third-Party Terms</h3>
            <p style={styles.paragraph}>
              Your use of any third-party services integrated with Leirz is subject to the terms,
              conditions, and privacy policies of those third parties. We encourage you to review
              the applicable terms and policies of any third-party services you use in connection
              with our Service.
            </p>

            <h3 style={styles.subsectionTitle}>10.3 Third-Party Disclaimer</h3>
            <p style={styles.paragraph}>
              We are not responsible for the performance, availability, accuracy, or reliability
              of any third-party services. We do not endorse and are not responsible or liable for
              any content, advertising, products, or other materials available through third-party
              services. Any issues with third-party services should be directed to the respective
              third-party provider.
            </p>

            <h3 style={styles.subsectionTitle}>10.4 Links to Third-Party Content</h3>
            <p style={styles.paragraph}>
              The Service may contain links to third-party websites, resources, or content. These
              links are provided for your convenience only and do not signify our endorsement of
              such websites or resources. We have no control over the contents of third-party
              sites and accept no responsibility for them or for any loss or damage that may arise
              from your use of them.
            </p>
          </section>

          {/* Section 11: Disclaimers */}
          <section id="disclaimers" style={styles.section} className="terms-section">
            <h2 style={styles.sectionTitle} className="terms-section-title">11. Disclaimers</h2>
            <div style={styles.disclaimerBox}>
              <p style={styles.disclaimerText}>
                THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES
                OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES
                OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, TITLE, OR
                COURSE OF PERFORMANCE.
              </p>
            </div>

            <h3 style={styles.subsectionTitle}>11.1 No Warranty</h3>
            <p style={styles.paragraph}>
              To the fullest extent permitted by applicable law, Leirz, its affiliates, licensors,
              and service providers make no warranties or representations about:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                The accuracy, completeness, reliability, timeliness, or availability of the Service
                or any content.
              </li>
              <li style={styles.listItem}>
                That the Service will function uninterrupted, secure, or error-free.
              </li>
              <li style={styles.listItem}>
                That any errors or defects in the Service will be corrected.
              </li>
              <li style={styles.listItem}>
                That the Service or servers are free of viruses or other harmful components.
              </li>
              <li style={styles.listItem}>
                That the results of using the Service will meet your requirements or expectations.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>11.2 Historical Accuracy Disclaimer</h3>
            <p style={styles.paragraph}>
              WE EXPRESSLY DISCLAIM ANY WARRANTY REGARDING THE HISTORICAL ACCURACY OF CONTENT
              PROVIDED THROUGH THE SERVICE. Historical information is subject to interpretation,
              ongoing research, and revision. The content provided, whether curated, user-generated,
              or AI-generated, may contain errors, omissions, outdated information, or disputed
              interpretations. We do not warrant that:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Historical dates, names, events, or facts presented are accurate or complete.
              </li>
              <li style={styles.listItem}>
                All relevant historical perspectives are represented.
              </li>
              <li style={styles.listItem}>
                Content reflects current historical scholarship or consensus.
              </li>
              <li style={styles.listItem}>
                Marker locations correspond to exact historical sites.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>11.3 Educational Purpose</h3>
            <p style={styles.paragraph}>
              The Service is intended for general educational and informational purposes only. It
              is not intended to provide professional historical consultation, academic research
              guidance, or authoritative historical documentation. Users should verify any
              information obtained through the Service before relying on it for any important purpose.
            </p>

            <h3 style={styles.subsectionTitle}>11.4 Jurisdictional Limitations</h3>
            <p style={styles.paragraph}>
              Some jurisdictions do not allow the exclusion of certain warranties or limitations
              on implied warranties. If these laws apply to you, some or all of the above
              disclaimers, exclusions, or limitations may not apply, and you may have additional
              rights.
            </p>
          </section>

          {/* Section 12: Limitation of Liability */}
          <section id="limitation" style={styles.section} className="terms-section">
            <h2 style={styles.sectionTitle} className="terms-section-title">12. Limitation of Liability</h2>
            <div style={styles.disclaimerBox}>
              <p style={styles.disclaimerText}>
                TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL LEIRZ, ITS
                AFFILIATES, LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS
                BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR
                PUNITIVE DAMAGES, REGARDLESS OF THE CAUSE OF ACTION OR THE THEORY OF LIABILITY.
              </p>
            </div>

            <h3 style={styles.subsectionTitle}>12.1 Excluded Damages</h3>
            <p style={styles.paragraph}>
              We shall not be liable for any damages including, but not limited to:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Loss of profits, revenue, business, goodwill, or anticipated savings.
              </li>
              <li style={styles.listItem}>
                Loss of data, use, or other intangible losses.
              </li>
              <li style={styles.listItem}>
                Damages resulting from your access to, use of, or inability to access or use the Service.
              </li>
              <li style={styles.listItem}>
                Damages resulting from any content obtained from the Service, including reliance on
                AI-generated or user-generated content.
              </li>
              <li style={styles.listItem}>
                Damages resulting from unauthorized access, use, or alteration of your transmissions
                or content.
              </li>
              <li style={styles.listItem}>
                Damages resulting from the conduct of any third party on the Service.
              </li>
              <li style={styles.listItem}>
                Damages resulting from any inaccuracies in historical content or location data.
              </li>
              <li style={styles.listItem}>
                Any other matter relating to the Service.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>12.2 Liability Cap</h3>
            <p style={styles.paragraph}>
              IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING
              TO THESE TERMS OR YOUR USE OF THE SERVICE EXCEED THE GREATER OF: (A) THE AMOUNT PAID
              BY YOU TO LEIRZ DURING THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING
              RISE TO THE CLAIM; OR (B) ONE HUNDRED DOLLARS ($100 USD).
            </p>

            <h3 style={styles.subsectionTitle}>12.3 Basis of the Bargain</h3>
            <p style={styles.paragraph}>
              THE LIMITATIONS OF DAMAGES SET FORTH ABOVE ARE FUNDAMENTAL ELEMENTS OF THE BASIS OF
              THE BARGAIN BETWEEN LEIRZ AND YOU. THE SERVICE WOULD NOT BE PROVIDED WITHOUT SUCH
              LIMITATIONS.
            </p>

            <h3 style={styles.subsectionTitle}>12.4 Jurisdictional Limitations</h3>
            <p style={styles.paragraph}>
              Some jurisdictions do not allow the exclusion or limitation of incidental or
              consequential damages, so the above limitations or exclusions may not apply to you.
              In such jurisdictions, our liability will be limited to the greatest extent permitted
              by law.
            </p>
          </section>

          {/* Section 13: Indemnification */}
          <section id="indemnification" style={styles.section} className="terms-section">
            <h2 style={styles.sectionTitle} className="terms-section-title">13. Indemnification</h2>
            <p style={styles.paragraph}>
              You agree to defend, indemnify, and hold harmless Leirz and its parent, subsidiaries,
              affiliates, licensors, service providers, partners, and their respective officers,
              directors, employees, contractors, agents, licensors, suppliers, successors, and
              assigns (collectively, the "Indemnified Parties") from and against any and all claims,
              liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including
              reasonable attorneys' fees) arising out of or relating to:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Your violation of these Terms or any applicable law or regulation.
              </li>
              <li style={styles.listItem}>
                Your User Content, including any claims that your User Content infringes or
                misappropriates any third-party intellectual property or other rights.
              </li>
              <li style={styles.listItem}>
                Your use or misuse of the Service.
              </li>
              <li style={styles.listItem}>
                Your violation of any third-party rights, including intellectual property, privacy,
                or publicity rights.
              </li>
              <li style={styles.listItem}>
                Any dispute between you and any other user of the Service.
              </li>
              <li style={styles.listItem}>
                Your negligent or wrongful conduct.
              </li>
            </ul>
            <p style={styles.paragraph}>
              We reserve the right, at your expense, to assume the exclusive defense and control of
              any matter for which you are required to indemnify us, and you agree to cooperate with
              our defense of such claims. You agree not to settle any such matter without our prior
              written consent. We will use reasonable efforts to notify you of any such claim, action,
              or proceeding upon becoming aware of it.
            </p>
          </section>

          {/* Section 14: Termination */}
          <section id="termination" style={styles.section} className="terms-section">
            <h2 style={styles.sectionTitle} className="terms-section-title">14. Termination</h2>

            <h3 style={styles.subsectionTitle}>14.1 Termination by Leirz</h3>
            <p style={styles.paragraph}>
              We may terminate or suspend your account and access to the Service immediately, without
              prior notice or liability, for any reason, including without limitation if:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                You breach any provision of these Terms.
              </li>
              <li style={styles.listItem}>
                You violate our Acceptable Use Policy or community guidelines.
              </li>
              <li style={styles.listItem}>
                We are required to do so by law or legal process.
              </li>
              <li style={styles.listItem}>
                We believe your conduct may expose Leirz, other users, or third parties to legal liability.
              </li>
              <li style={styles.listItem}>
                We discontinue providing the Service in your region.
              </li>
              <li style={styles.listItem}>
                We determine, in our sole discretion, that your continued use is detrimental to the
                Service or other users.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>14.2 Termination by You</h3>
            <p style={styles.paragraph}>
              You may terminate your account at any time by:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Using the account deletion feature in the App settings.
              </li>
              <li style={styles.listItem}>
                Contacting us at support@leirz.com with your termination request.
              </li>
              <li style={styles.listItem}>
                Uninstalling the App (note: this alone does not delete your account or cancel
                subscriptions).
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>14.3 Effects of Termination</h3>
            <p style={styles.paragraph}>
              Upon termination of your account:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Your right to use the Service will immediately cease.
              </li>
              <li style={styles.listItem}>
                Your access to your collections, saved places, and other account data will be lost.
              </li>
              <li style={styles.listItem}>
                We may delete your account and all associated data in accordance with our Privacy
                Policy, except where we are required to retain certain information.
              </li>
              <li style={styles.listItem}>
                Any active Premium subscription will not be refunded for the remaining period unless
                required by applicable law.
              </li>
              <li style={styles.listItem}>
                You remain liable for all obligations incurred prior to termination.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>14.4 Survival</h3>
            <p style={styles.paragraph}>
              The following sections of these Terms shall survive any termination: Section 6
              (AI-Generated Content Disclaimer), Section 7.2 (License Grant to Leirz), Section 8
              (Intellectual Property), Section 11 (Disclaimers), Section 12 (Limitation of Liability),
              Section 13 (Indemnification), Section 15 (Governing Law), Section 16 (Dispute Resolution),
              and any other provisions that by their nature should survive termination.
            </p>
          </section>

          {/* Section 15: Governing Law */}
          <section id="governing-law" style={styles.section} className="terms-section">
            <h2 style={styles.sectionTitle} className="terms-section-title">15. Governing Law</h2>
            <p style={styles.paragraph}>
              These Terms of Service and any dispute or claim arising out of or in connection with
              them or their subject matter or formation (including non-contractual disputes or claims)
              shall be governed by and construed in accordance with the laws of the State of Delaware,
              United States, without regard to its conflict of law provisions.
            </p>
            <p style={styles.paragraph}>
              To the extent that any lawsuit or court proceeding is permitted under these Terms, you
              and Leirz agree to submit to the exclusive personal jurisdiction of the state and federal
              courts located in New Castle County, Delaware, for the purpose of litigating all such
              disputes. You waive any objection based on lack of personal jurisdiction, place of
              residence, improper venue, or forum non conveniens in any such action.
            </p>
            <p style={styles.paragraph}>
              For users located in the European Union, European Economic Area, or United Kingdom,
              nothing in these Terms affects your rights under mandatory consumer protection laws
              in your country of residence. You may bring legal proceedings in your country of
              residence, and the mandatory consumer protection laws of your country will apply to
              the extent that they provide greater protection than Delaware law.
            </p>
            <p style={styles.paragraph}>
              The United Nations Convention on Contracts for the International Sale of Goods does
              not apply to these Terms.
            </p>
          </section>

          {/* Section 16: Dispute Resolution */}
          <section id="dispute-resolution" style={styles.section} className="terms-section">
            <h2 style={styles.sectionTitle} className="terms-section-title">16. Dispute Resolution</h2>

            <h3 style={styles.subsectionTitle}>16.1 Informal Resolution</h3>
            <p style={styles.paragraph}>
              Before initiating any formal dispute resolution proceeding, you agree to first contact
              us at legal@leirz.com to attempt to resolve any dispute informally. We will attempt to
              resolve the dispute by contacting you via email. If the dispute is not resolved within
              sixty (60) days of your initial contact, either party may proceed with formal dispute
              resolution as described below.
            </p>

            <h3 style={styles.subsectionTitle}>16.2 Binding Arbitration</h3>
            <p style={styles.paragraph}>
              Any dispute, controversy, or claim arising out of or relating to these Terms or the
              Service that cannot be resolved through informal negotiation shall be resolved by
              binding arbitration administered by the American Arbitration Association ("AAA") in
              accordance with its Consumer Arbitration Rules then in effect.
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                The arbitration shall be conducted in English.
              </li>
              <li style={styles.listItem}>
                The arbitration shall be held in Wilmington, Delaware, or at another mutually agreed
                location, or via telephone or video conference if appropriate.
              </li>
              <li style={styles.listItem}>
                The arbitrator's decision shall be final and binding and may be entered as a judgment
                in any court of competent jurisdiction.
              </li>
              <li style={styles.listItem}>
                Each party shall bear its own costs and attorneys' fees unless the arbitrator determines
                that a claim was frivolous or brought in bad faith.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>16.3 Class Action Waiver</h3>
            <p style={styles.paragraph}>
              YOU AND LEIRZ AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS
              INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR
              REPRESENTATIVE PROCEEDING. Unless both you and Leirz agree otherwise, the arbitrator
              may not consolidate more than one person's claims and may not otherwise preside over
              any form of a representative or class proceeding.
            </p>

            <h3 style={styles.subsectionTitle}>16.4 Exceptions</h3>
            <p style={styles.paragraph}>
              Notwithstanding the foregoing:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Either party may seek injunctive or other equitable relief in any court of competent
                jurisdiction to prevent the actual or threatened infringement, misappropriation, or
                violation of intellectual property rights.
              </li>
              <li style={styles.listItem}>
                You may bring claims in small claims court if your claims qualify.
              </li>
              <li style={styles.listItem}>
                Nothing in this section prevents you from bringing issues to the attention of federal,
                state, or local agencies that may be able to seek relief on your behalf.
              </li>
            </ul>

            <h3 style={styles.subsectionTitle}>16.5 Opt-Out</h3>
            <p style={styles.paragraph}>
              You may opt out of the agreement to arbitrate by sending written notice to legal@leirz.com
              within thirty (30) days of first accepting these Terms. Your notice must include your
              name, address, email address, and a clear statement that you wish to opt out of arbitration.
              If you opt out, you may still resolve disputes through the courts as described in
              Section 15.
            </p>
          </section>

          {/* Section 17: Changes to Terms */}
          <section id="changes" style={styles.section} className="terms-section">
            <h2 style={styles.sectionTitle} className="terms-section-title">17. Changes to Terms</h2>
            <p style={styles.paragraph}>
              We reserve the right to modify, amend, or update these Terms at any time in our sole
              discretion. When we make changes:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                We will post the updated Terms on the Service with a new "Last Updated" date at the
                top of this page.
              </li>
              <li style={styles.listItem}>
                For material changes, we will provide at least thirty (30) days' notice before the
                changes take effect through one or more of the following: email notification (if you
                have provided your email address), a prominent notice within the App, or a notification
                when you next open the App.
              </li>
              <li style={styles.listItem}>
                We will indicate at the top of the Terms when they were last revised.
              </li>
            </ul>
            <p style={styles.paragraph}>
              Your continued use of the Service after any such changes constitutes your binding
              acceptance of the updated Terms. If you do not agree to the modified Terms, your sole
              remedy is to discontinue using the Service and delete your account.
            </p>
            <p style={styles.paragraph}>
              We encourage you to review these Terms periodically to stay informed of updates. For
              material changes, we may require you to expressly accept the new Terms before continuing
              to use the Service.
            </p>
            <p style={styles.paragraph}>
              No amendment to these Terms will apply to any dispute of which we had written notice
              on or before the date of the amendment.
            </p>
          </section>

          {/* Section 18: Contact Information */}
          <section id="contact" style={styles.section} className="terms-section">
            <h2 style={styles.sectionTitle} className="terms-section-title">18. Contact Information</h2>
            <p style={styles.paragraph}>
              If you have any questions, concerns, or feedback about these Terms of Service, the
              Service, or our practices, please contact us:
            </p>
            <div style={styles.contactBox}>
              <p style={styles.contactText}><strong>Leirz</strong></p>
              <p style={styles.contactText}>
                <strong>Legal Inquiries:</strong> legal@leirz.com
              </p>
              <p style={styles.contactText}>
                <strong>General Support:</strong> support@leirz.com
              </p>
            </div>
            <p style={styles.paragraph}>
              For legal notices, please send correspondence to legal@leirz.com with "Legal Notice"
              in the subject line. We will respond to legal inquiries within thirty (30) days of receipt.
            </p>
            <p style={styles.paragraph}>
              For general support inquiries, including questions about your account, subscriptions,
              or technical issues, please contact support@leirz.com. Our support team typically
              responds within 48 business hours.
            </p>
            <p style={styles.paragraph}>
              To report violations of these Terms, abuse, or inappropriate content, please email
              support@leirz.com with "Report Violation" in the subject line and include as much
              detail as possible about the issue.
            </p>
          </section>

          {/* Related Links */}
          <div style={styles.relatedLinks}>
            <h3 style={styles.relatedTitle}>Related Documents</h3>
            <Link to="/privacy" style={styles.relatedLink} className="terms-related-link">Privacy Policy</Link>
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
              <Link to="/" style={styles.footerLink} className="terms-footer-link">Home</Link>
              <Link to="/privacy" style={styles.footerLink} className="terms-footer-link">Privacy Policy</Link>
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
    borderLeft: '4px solid #1890ff',
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
  listItem: {
    fontSize: 15,
    lineHeight: 1.8,
    color: '#434343',
    marginBottom: 8,
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
  disclaimerBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  disclaimerText: {
    fontSize: 13,
    lineHeight: 1.7,
    color: '#595959',
    margin: 0,
    fontWeight: 500,
  },
  contactBox: {
    backgroundColor: '#f6ffed',
    border: '1px solid #b7eb8f',
    borderRadius: 8,
    padding: 20,
    marginTop: 16,
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

export default TermsOfService;
