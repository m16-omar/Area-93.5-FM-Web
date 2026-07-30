import React, { useState, useEffect } from 'react';
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleBlockedClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
  };

  return (
    <div className={styles.stickyHeaderWrapper}>
      {/* Top Ticker / Social Bar */}
      <div className={styles.topBanner}>
        <div className={styles.nowPlayingTrack}>
          <FiMusic className={styles.musicIcon} />
          <span className={styles.tickerText}>
            {(currentTrack.showName || currentTrack.title).toUpperCase()} - {(currentTrack.presenterName || currentTrack.artist).toUpperCase()}
          </span>
        </div>
        <div className={styles.topSocials}>
          <a href="#" className={styles.topSocialLink} aria-label="YouTube"><FaYoutube /></a>
          <a href="#" className={styles.topSocialLink} aria-label="TikTok"><FaTiktok /></a>
          <a href="#" className={styles.topSocialLink} aria-label="Instagram"><FaInstagram /></a>
          <a href="#" className={styles.topSocialLink} aria-label="Facebook"><FaFacebookF /></a>
          <a href="#" className={styles.topSocialLink} aria-label="Twitter"><FaTwitter /></a>
        </div>
      </div>

      {/* Main Navbar Header */}
      <header className={`${styles.navbarContainer} ${isScrolled ? styles.scrolled : ''}`}>
        <Link to="/" className={styles.logoLink}>
          <img src={logoImg} alt="93.5 AREA FM Logo" className={styles.logoImg} />
          <span className={styles.logoText}>93.5 AREA <span className={styles.logoAccent}>FM</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navMenu}>
            <li className={styles.navItem}>
              <Link to="/" className={`${styles.navLink} ${isActive('/') ? styles.activeNavLink : ''}`}>HOME</Link>
            </li>
            <li className={styles.navItem}>
              <a href="#" onClick={handleBlockedClick} className={styles.navLink}>NEWS</a>
            </li>
            <li className={styles.navItem}>
              <a href="#" onClick={handleBlockedClick} className={styles.navLink}>PODCASTS</a>
            </li>
            <li className={styles.navItem}>
              <a href="#" onClick={handleBlockedClick} className={styles.navLink}>SHOWS</a>
            </li>
            <li className={styles.navItem}>
              <a href="#" onClick={handleBlockedClick} className={styles.navLink}>CHARTS</a>
            </li>
            <li className={styles.navItem}>
              <a href="#" onClick={handleBlockedClick} className={styles.navLink}>VIDEOS</a>
            </li>
            <li className={styles.navItem}>
              <a href="#" onClick={handleBlockedClick} className={styles.navLink}>PROMOTE</a>
            </li>
            <li className={styles.navItem}>
              <a href="#" onClick={handleBlockedClick} className={styles.navLink}>CONTACTS</a>
            </li>
          </ul>
        </nav>

        {/* Right Header Action Buttons */}
        <div className={styles.navActions}>
          <button className={`${styles.iconBtn} ${styles.hideOnMobile}`} onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">
            <FiSearch />
          </button>
          
          <button className={styles.iconBtn} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu">
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>

          <button className={styles.playBtn} onClick={togglePlayPause}>
            {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} />}
            <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
          </button>

          <button className={`${styles.iconBtn} ${styles.hideOnMobile}`} onClick={toggleMute} aria-label="Toggle Sound">
            {isMuted ? <FiVolumeX /> : <FiVolume2 />}
          </button>

          <button className={`${styles.popupBtn} ${styles.hideOnTablet}`}>
            POP UP
          </button>
        </div>
      </header>

      {/* Mobile Slide-Out Drawer Navigation */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          <div className={styles.mobileSearchBox}>
            <FiSearch className={styles.searchBoxIcon} />
            <input type="text" placeholder="Search shows, news, podcasts..." className={styles.mobileSearchInput} />
          </div>

          <ul className={styles.mobileNavList}>
            <li>
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className={`${styles.mobileNavLink} ${isActive('/') ? styles.activeMobileLink : ''}`}>HOME</Link>
            </li>
            <li>
              <a href="#" onClick={handleBlockedClick} className={styles.mobileNavLink}>NEWS</a>
            </li>
            <li>
              <a href="#" onClick={handleBlockedClick} className={styles.mobileNavLink}>PODCASTS</a>
            </li>
            <li>
              <a href="#" onClick={handleBlockedClick} className={styles.mobileNavLink}>SHOWS</a>
            </li>
            <li>
              <a href="#" onClick={handleBlockedClick} className={styles.mobileNavLink}>CHARTS</a>
            </li>
            <li>
              <a href="#" onClick={handleBlockedClick} className={styles.mobileNavLink}>VIDEOS</a>
            </li>
            <li>
              <a href="#" onClick={handleBlockedClick} className={styles.mobileNavLink}>PROMOTE</a>
            </li>
            <li>
              <a href="#" onClick={handleBlockedClick} className={styles.mobileNavLink}>CONTACTS</a>
            </li>
          </ul>

          <div className={styles.mobileExtraActions}>
            <button className={styles.mobilePopUpBtn}>
              POP UP PLAYER
            </button>
            
            <div className={styles.mobileSocialsRow}>
              <a href="#" aria-label="YouTube"><FaYoutube /></a>
              <a href="#" aria-label="TikTok"><FaTiktok /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
