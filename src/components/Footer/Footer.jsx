import React from 'react';
import { FaFacebookF, FaYoutube, FaTiktok, FaInstagram, FaTwitter } from 'react-icons/fa';
import { FiPhone, FiMail } from 'react-icons/fi';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footerSection} id="contacts">
      {/* Background Watermark */}
      <div className={styles.watermarkText}>
        ONE VOICE,<br />
        EVERY AREA
      </div>

      <div className={styles.footerGrid}>
        {/* Left Column: Logo & Slogan */}
        <div className={styles.leftCol}>
          <div className={styles.brandTitleWrap}>
            <span className={styles.logoNumber}>93.5</span>
            <span className={styles.logoText}>AREA</span>
            <span className={styles.logoSub}>FM</span>
          </div>
          <p className={styles.stationSlogan}>One Voice, Every Area</p>
        </div>

        {/* Middle Column: Socials & Contacts */}
        <div className={styles.midCol}>
          {/* Follow Us */}
          <div className={styles.subBlock}>
            <span className={styles.sectionBadge}>FOLLOW US ON</span>
            <div className={styles.socialRow}>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className={styles.socialSquare} aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className={styles.socialSquare} aria-label="YouTube">
                <FaYoutube />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.socialSquare} aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className={styles.socialSquare} aria-label="Twitter">
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* Contacts */}
          <div className={styles.subBlock}>
            <span className={styles.sectionBadge}>CONTACTS</span>
            <div className={styles.contactList}>
              <a href="tel:+2348099358000" className={styles.contactItem}>
                <FiPhone size={13} className={styles.contactIcon} />
                <span>+234 809 935 8000</span>
              </a>
              <a href="mailto:info@areafm.ng" className={styles.contactItem}>
                <FiMail size={13} className={styles.contactIcon} />
                <span>info@areafm.ng</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Latest Podcasts */}
        <div className={styles.rightCol}>
          <span className={styles.sectionBadge}>LATEST PODCASTS</span>

          <div className={styles.podcastStack}>
            <div className={styles.podcastMiniCard}>
              <img 
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=160&q=80" 
                alt="Top 10 Countdown #1" 
                className={styles.podcastThumb} 
                loading="lazy" 
              />
              <span className={styles.podcastTitle}>Top 10 Countdown #1</span>
            </div>

            <div className={styles.podcastMiniCard}>
              <img 
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&q=80" 
                alt="Top 10 Countdown #2" 
                className={styles.podcastThumb} 
                loading="lazy" 
              />
              <span className={styles.podcastTitle}>Top 10 Countdown #2</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
