import React from 'react';
import { FaFacebookF, FaYoutube, FaInstagram, FaSpotify } from 'react-icons/fa';
import { FiPhone, FiMail } from 'react-icons/fi';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import styles from './Footer.module.css';

export const Footer = () => {
  const { currentTrack } = useAudioPlayer();

  return (
    <footer className={styles.footerSection} id="contacts">
      <div className={styles.watermarkText}>
        WHERE EVERY<br />
        NOTE CONNECTS
      </div>

      <div className={styles.footerGrid}>
        {/* Left Column */}
        <div className={styles.leftCol}>
          <div className={styles.logo}>
            <span>93.5 AREA</span>
            <span className={styles.logoAccent}>FM</span>
          </div>

          <div className={styles.nowPlayingInfo}>
            <span>{currentTrack.title}</span> - <span>{currentTrack.artist}</span>
          </div>
        </div>

        {/* Middle Column */}
        <div className={styles.midCol}>
          <div>
            <span className="section-label" style={{ marginBottom: '12px' }}>FOLLOW US ON</span>
            <div className={styles.socialGrid}>
              <a href="#" className={styles.socialSquare} aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" className={styles.socialSquare} aria-label="YouTube"><FaYoutube /></a>
              <a href="#" className={styles.socialSquare} aria-label="Instagram"><FaInstagram /></a>
              <a href="#" className={styles.socialSquare} aria-label="Spotify"><FaSpotify /></a>
            </div>
          </div>

          <div>
            <span className="section-label" style={{ marginBottom: '12px' }}>CONTACTS</span>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <FiPhone size={16} />
                <span>+523 456 403</span>
              </div>
              <div className={styles.contactItem}>
                <FiMail size={16} />
                <span>info@info.xyz</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.rightCol}>
          <span className="section-label">LATEST PODCASTS</span>

          <div className={styles.podcastMiniCard}>
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" 
              alt="Vibe Check #2" 
              className={styles.podcastThumb} 
              loading="lazy" 
            />
            <span className={styles.podcastTitle}>Vibe Check #2</span>
          </div>

          <div className={styles.podcastMiniCard}>
            <img 
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80" 
              alt="Throwback Jam #2" 
              className={styles.podcastThumb} 
              loading="lazy" 
            />
            <span className={styles.podcastTitle}>Throwback Jam #2</span>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className={styles.copyrightRow}>
        <p>© 2025 - 93.5 AREA FM / Pro Radio Demo Re-creation. All Rights Reserved.</p>
        <p>Built with React 19, Vite, Framer Motion & CSS Modules.</p>
      </div>
    </footer>
  );
};
