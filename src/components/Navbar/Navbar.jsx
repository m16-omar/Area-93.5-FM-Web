import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSearch, FiMenu, FiVolume2, FiVolumeX, FiPlus, FiMusic, FiX } from 'react-icons/fi';
import { FaTwitter, FaInstagram, FaFacebookF, FaPlay, FaPause } from 'react-icons/fa';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import styles from './Navbar.module.css';

export const Navbar = () => {
  const location = useLocation();
  const { isPlaying, togglePlayPause, currentTrack, isMuted, toggleMute } = useAudioPlayer();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top Ticker / Social Bar */}
      <div className={styles.topBanner}>
        <div className={styles.nowPlayingTrack}>
          <FiMusic className={styles.musicIcon} />
          <span>{currentTrack.artist.toUpperCase()} - {currentTrack.title.toUpperCase()}</span>
        </div>
        <div className={styles.topSocials}>
          <a href="#" className={styles.topSocialLink} aria-label="Twitter"><FaTwitter /></a>
          <a href="#" className={styles.topSocialLink} aria-label="Instagram"><FaInstagram /></a>
          <a href="#" className={styles.topSocialLink} aria-label="Facebook"><FaFacebookF /></a>
        </div>
      </div>

      {/* Main Navbar */}
      <header className={styles.navbarContainer}>
        <Link to="/" className={styles.logo}>
          <span>93.5 AREA</span>
          <span className={styles.logoAccent}>FM</span>
        </Link>

        <nav>
          <ul className={styles.navMenu}>
            <li className={styles.navItem}>
              <Link to="/" className={`${styles.navLink} ${isActive('/') ? styles.activeNavLink : ''}`}>DEMOS</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/blog-sidebar" className={`${styles.navLink} ${isActive('/blog-sidebar') || isActive('/blog') ? styles.activeNavLink : ''}`}>BLOG</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/podcasts" className={`${styles.navLink} ${isActive('/podcasts') ? styles.activeNavLink : ''}`}>PODCASTS</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/shows" className={`${styles.navLink} ${isActive('/shows') ? styles.activeNavLink : ''}`}>SHOWS</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/charts" className={`${styles.navLink} ${isActive('/charts') ? styles.activeNavLink : ''}`}>CHARTS</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/videos" className={`${styles.navLink} ${isActive('/videos') ? styles.activeNavLink : ''}`}>VIDEOS</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/promote" className={`${styles.navLink} ${isActive('/promote') ? styles.activeNavLink : ''}`}>PROMOTE</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/contacts" className={`${styles.navLink} ${isActive('/contacts') ? styles.activeNavLink : ''}`}>CONTACTS</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.navActions}>
          <button className={styles.iconBtn} aria-label="Search">
            <FiSearch />
          </button>
          <button className={styles.iconBtn} aria-label="Menu">
            <FiMenu />
          </button>
          <button className={styles.playBtn} onClick={togglePlayPause}>
            {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} />}
            <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
          </button>
          <button className={styles.iconBtn} onClick={toggleMute} aria-label="Toggle Sound">
            {isMuted ? <FiVolumeX /> : <FiVolume2 />}
          </button>
          <button className={styles.popupBtn}>
            POP UP
          </button>
          <button className={styles.mobileToggle} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </header>
    </>
  );
};
