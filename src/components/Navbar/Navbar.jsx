import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSearch, FiMenu, FiVolume2, FiVolumeX, FiMusic, FiX } from 'react-icons/fi';
import { FaTwitter, FaInstagram, FaFacebookF, FaYoutube, FaTiktok, FaPlay, FaPause } from 'react-icons/fa';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import logoImg from '../../assets/logo.jpeg';
import styles from './Navbar.module.css';

export const Navbar = () => {
  const location = useLocation();
  const { isPlaying, togglePlayPause, currentTrack, isMuted, toggleMute } = useAudioPlayer();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <div className={styles.stickyHeaderWrapper}>
      {/* Top Ticker / Social Bar */}
      <div className={styles.topBanner}>
        <div className={styles.nowPlayingTrack}>
          <FiMusic className={styles.musicIcon} />
          <span>{(currentTrack.showName || currentTrack.title).toUpperCase()} - {(currentTrack.presenterName || currentTrack.artist).toUpperCase()}</span>
        </div>
        <div className={styles.topSocials}>
          <a href="#" className={styles.topSocialLink} aria-label="YouTube"><FaYoutube /></a>
          <a href="#" className={styles.topSocialLink} aria-label="TikTok"><FaTiktok /></a>
          <a href="#" className={styles.topSocialLink} aria-label="Instagram"><FaInstagram /></a>
          <a href="#" className={styles.topSocialLink} aria-label="Facebook"><FaFacebookF /></a>
          <a href="#" className={styles.topSocialLink} aria-label="Twitter"><FaTwitter /></a>
        </div>
      </div>

      {/* Main Navbar */}
      <header className={styles.navbarContainer}>
        <Link to="/" className={styles.logoLink}>
          <img src={logoImg} alt="93.5 AREA FM Logo" className={styles.logoImg} />
          <span className={styles.logoText}>93.5 AREA <span className={styles.logoAccent}>FM</span></span>
        </Link>

        <nav className={`${styles.navWrapper} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          <ul className={styles.navMenu}>
            <li className={styles.navItem}>
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className={`${styles.navLink} ${isActive('/') ? styles.activeNavLink : ''}`}>HOME</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/news" onClick={() => setMobileMenuOpen(false)} className={`${styles.navLink} ${isActive('/news') || isActive('/blog-sidebar') || isActive('/blog') ? styles.activeNavLink : ''}`}>NEWS</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/podcasts" onClick={() => setMobileMenuOpen(false)} className={`${styles.navLink} ${isActive('/podcasts') ? styles.activeNavLink : ''}`}>PODCASTS</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/shows" onClick={() => setMobileMenuOpen(false)} className={`${styles.navLink} ${isActive('/shows') ? styles.activeNavLink : ''}`}>SHOWS</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/charts" onClick={() => setMobileMenuOpen(false)} className={`${styles.navLink} ${isActive('/charts') ? styles.activeNavLink : ''}`}>CHARTS</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/videos" onClick={() => setMobileMenuOpen(false)} className={`${styles.navLink} ${isActive('/videos') ? styles.activeNavLink : ''}`}>VIDEOS</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/promote" onClick={() => setMobileMenuOpen(false)} className={`${styles.navLink} ${isActive('/promote') ? styles.activeNavLink : ''}`}>PROMOTE</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/contacts" onClick={() => setMobileMenuOpen(false)} className={`${styles.navLink} ${isActive('/contacts') ? styles.activeNavLink : ''}`}>CONTACTS</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.navActions}>
          <button className={styles.iconBtn} aria-label="Search">
            <FiSearch />
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
          <button className={styles.mobileToggle} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu">
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </header>
    </div>
  );
};
