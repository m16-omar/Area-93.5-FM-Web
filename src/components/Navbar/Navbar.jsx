import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSearch, FiMenu, FiVolume2, FiVolumeX, FiMusic, FiX } from 'react-icons/fi';
import { FaTwitter, FaInstagram, FaFacebookF, FaYoutube, FaTiktok, FaPlay, FaPause } from 'react-icons/fa';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import logoImg from '../../assets/area-logo.png';
import topTracksData from '../../data/topTracksData.json';
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
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navMenu}>
            <li className={styles.navItem}>
              <Link to="/" className={`${styles.navLink} ${isActive('/') ? styles.activeNavLink : ''}`}>HOME</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/shows" className={`${styles.navLink} ${isActive('/shows') ? styles.activeNavLink : ''}`}>SHOWS</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/podcasts" className={`${styles.navLink} ${isActive('/podcasts') ? styles.activeNavLink : ''}`}>PODCASTS</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/news" className={`${styles.navLink} ${isActive('/news') ? styles.activeNavLink : ''}`}>NEWS</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/charts" className={`${styles.navLink} ${isActive('/charts') ? styles.activeNavLink : ''}`}>CHARTS</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/hosts" className={`${styles.navLink} ${isActive('/hosts') ? styles.activeNavLink : ''}`}>HOSTS</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/videos" className={`${styles.navLink} ${isActive('/videos') ? styles.activeNavLink : ''}`}>VIDEOS</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/promote" className={`${styles.navLink} ${isActive('/promote') ? styles.activeNavLink : ''}`}>PROMOTE</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/contact" className={`${styles.navLink} ${isActive('/contact') ? styles.activeNavLink : ''}`}>CONTACTS</Link>
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
            <span>{isPlaying ? 'PAUSE' : 'LIVE'}</span>
          </button>

          <button className={`${styles.iconBtn} ${styles.hideOnMobile}`} onClick={toggleMute} aria-label="Toggle Sound">
            {isMuted ? <FiVolumeX /> : <FiVolume2 />}
          </button>

          <button className={`${styles.popupBtn} ${styles.hideOnTablet}`}>
            POP UP
          </button>
        </div>
      </header>

      {/* Offcanvas Drawer Navigation */}
      {mobileMenuOpen && (
        <div className={styles.drawerOverlay} onClick={() => setMobileMenuOpen(false)}>
          <div className={styles.mobileDrawer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.drawerHeader}>
              <div className={styles.mobileSearchBox}>
                <FiSearch className={styles.searchBoxIcon} />
                <input type="text" placeholder="Search shows, news, podcasts..." className={styles.mobileSearchInput} />
              </div>
              <button className={styles.closeDrawerBtn} onClick={() => setMobileMenuOpen(false)} aria-label="Close Drawer">
                <FiX />
              </button>
            </div>

            <div className={styles.drawerContent}>
              {/* ON AIR Section */}
              <div className={styles.drawerSection}>
                <div className={styles.sectionHeadingWrapper}>
                  <span className={styles.sectionTagBadge}>ON AIR</span>
                  <div className={styles.sectionLine} />
                </div>
                
                <div className={styles.onAirCard}>
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80" 
                    alt="On Air Presenter" 
                    className={styles.onAirBgImg} 
                  />
                  <div className={styles.onAirOverlay}>
                    <span className={styles.genreBadge}>TRENDS</span>
                    <h4 className={styles.onAirTitle}>{currentTrack.showName || "The Sound Session"}</h4>
                    <p className={styles.onAirTime}>8:00 am - 12:00 pm</p>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className={styles.drawerSection}>
                <ul className={styles.mobileNavList}>
                  <li>
                    <Link to="/" onClick={() => setMobileMenuOpen(false)} className={`${styles.mobileNavLink} ${isActive('/') ? styles.activeMobileLink : ''}`}>HOME</Link>
                  </li>
                  <li>
                    <Link to="/shows" onClick={() => setMobileMenuOpen(false)} className={`${styles.mobileNavLink} ${isActive('/shows') ? styles.activeMobileLink : ''}`}>SHOWS</Link>
                  </li>
                  <li>
                    <Link to="/podcasts" onClick={() => setMobileMenuOpen(false)} className={`${styles.mobileNavLink} ${isActive('/podcasts') ? styles.activeMobileLink : ''}`}>PODCASTS</Link>
                  </li>
                  <li>
                    <Link to="/news" onClick={() => setMobileMenuOpen(false)} className={`${styles.mobileNavLink} ${isActive('/news') ? styles.activeMobileLink : ''}`}>NEWS</Link>
                  </li>
                  <li>
                    <Link to="/charts" onClick={() => setMobileMenuOpen(false)} className={`${styles.mobileNavLink} ${isActive('/charts') ? styles.activeMobileLink : ''}`}>CHARTS</Link>
                  </li>
                  <li>
                    <Link to="/hosts" onClick={() => setMobileMenuOpen(false)} className={`${styles.mobileNavLink} ${isActive('/hosts') ? styles.activeMobileLink : ''}`}>HOSTS</Link>
                  </li>
                  <li>
                    <Link to="/videos" onClick={() => setMobileMenuOpen(false)} className={`${styles.mobileNavLink} ${isActive('/videos') ? styles.activeMobileLink : ''}`}>VIDEOS</Link>
                  </li>
                  <li>
                    <Link to="/promote" onClick={() => setMobileMenuOpen(false)} className={`${styles.mobileNavLink} ${isActive('/promote') ? styles.activeMobileLink : ''}`}>PROMOTE</Link>
                  </li>
                  <li>
                    <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className={`${styles.mobileNavLink} ${isActive('/contact') ? styles.activeMobileLink : ''}`}>CONTACTS</Link>
                  </li>
                </ul>
              </div>

              {/* TOP CHART Section */}
              <div className={styles.drawerSection}>
                <div className={styles.sectionHeadingWrapper}>
                  <span className={styles.sectionTagBadge}>TOP CHART</span>
                  <div className={styles.sectionLine} />
                </div>

                <div className={styles.topChartList}>
                  {topTracksData.tracks.slice(0, 5).map((track) => (
                    <div key={track.id} className={styles.topChartItem}>
                      <div className={styles.trackArtWrapper}>
                        <img src={track.image} alt={track.title} className={styles.trackArtImg} />
                        <span className={styles.rankNum}>{track.rank}</span>
                      </div>
                      <div className={styles.trackDetails}>
                        <h5 className={styles.trackTitleText}>{track.title}</h5>
                        <p className={styles.trackArtistText}>{track.artist}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className={styles.fullTracklistBtn} onClick={handleBlockedClick}>
                  FULL TRACKLIST
                </button>
              </div>

              {/* Extra Actions & Socials */}
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
          </div>
        </div>
      )}
    </div>
  );
};
