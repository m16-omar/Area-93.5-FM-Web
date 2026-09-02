import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiSearch, FiMenu, FiVolume2, FiVolumeX, FiMusic, FiX, FiRadio, FiUser, FiMic, FiFileText, FiTrendingUp } from 'react-icons/fi';
import { FaInstagram, FaFacebookF, FaYoutube, FaTiktok, FaPlay, FaPause } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import logoImg from '../../assets/area-logo.png';
import topTracksData from '../../data/topTracksData.json';
import scheduleData from '../../data/scheduleData.json';
import teamData from '../../data/teamData.json';
import podcastsData from '../../data/podcastsFullData.json';
import newsData from '../../data/newsData.json';
import styles from './Navbar.module.css';

const popularKeywords = [
  "The Fan Zone",
  "Lagos Morning Rush",
  "Afrobeats Reloaded",
  "Pop Pulse",
  "Simi Ogunleye",
  "Funke Akindele",
  "DJ Tobi",
  "Listener’s Choice Awards"
];

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isPlaying, togglePlayPause, currentTrack, isMuted, toggleMute, playTrack } = useAudioPlayer();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearchQuery('');
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  const isActive = (path) => location.pathname === path;

  const handleBlockedClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
  };

  const openPopUpPlayer = () => {
    const width = 420;
    const height = 660;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    window.open(
      '/popup-player',
      'Area935FMPopUpPlayer',
      `width=${width},height=${height},top=${top},left=${left},status=no,menubar=no,toolbar=no,resizable=no,scrollbars=no`
    );
  };

  const getSlug = (title) => {
    return title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '';
  };

  // Search filtering logic (safely extracted arrays)
  const allShows = (Object.values(scheduleData.shows || {}).flat() || []).filter(
    (show, index, self) => show && index === self.findIndex((s) => s?.title === show?.title)
  );

  const allHosts = Array.isArray(teamData) ? teamData : [];
  
  const allPodcasts = [
    podcastsData.featured,
    ...(podcastsData.trending || []),
    ...(podcastsData.latestEpisodes || [])
  ].filter(Boolean);

  const allNews = [
    newsData.featuredBig,
    newsData.featuredMedium,
    ...(newsData.newsList || [])
  ].filter(Boolean);

  const cleanQuery = searchQuery.toLowerCase().trim();

  const filteredShows = allShows.filter(s =>
    !cleanQuery || s.title?.toLowerCase().includes(cleanQuery) || s.dj?.toLowerCase().includes(cleanQuery) || s.category?.toLowerCase().includes(cleanQuery)
  );

  const filteredHosts = allHosts.filter(h =>
    !cleanQuery || h.name?.toLowerCase().includes(cleanQuery) || h.role?.toLowerCase().includes(cleanQuery) || h.show?.toLowerCase().includes(cleanQuery)
  );

  const filteredPodcasts = allPodcasts.filter(p =>
    !cleanQuery || p.title?.toLowerCase().includes(cleanQuery) || p.host?.toLowerCase().includes(cleanQuery) || p.presenter?.toLowerCase().includes(cleanQuery) || p.category?.toLowerCase().includes(cleanQuery)
  );

  const filteredNews = allNews.filter(n =>
    !cleanQuery || n.title?.toLowerCase().includes(cleanQuery) || n.category?.toLowerCase().includes(cleanQuery)
  );

  const handleNavigate = (path) => {
    setSearchOpen(false);
    setSearchQuery('');
    navigate(path);
  };

  const handleExecuteSearch = (e) => {
    if (e) e.preventDefault();
    const term = searchQuery.trim();
    if (!term) return;

    // Check direct show match
    const matchedShow = allShows.find(s => s?.title?.toLowerCase().includes(term.toLowerCase()));
    if (matchedShow) {
      handleNavigate(`/shows/${getSlug(matchedShow.title)}`);
      return;
    }

    // Check direct host match
    const matchedHost = allHosts.find(h => h?.name?.toLowerCase().includes(term.toLowerCase()));
    if (matchedHost) {
      handleNavigate(`/hosts/${matchedHost.slug}`);
      return;
    }

    // Check direct news match
    const matchedNews = allNews.find(n => n?.title?.toLowerCase().includes(term.toLowerCase()));
    if (matchedNews) {
      handleNavigate(`/news/${getSlug(matchedNews.title)}`);
      return;
    }

    // Default fallback to news search page
    handleNavigate(`/news?q=${encodeURIComponent(term)}`);
  };

  const handlePlayPodcast = (e, pod) => {
    e.stopPropagation();
    playTrack({
      id: pod.id || `pod-${Date.now()}`,
      title: pod.title,
      artist: pod.host || pod.presenter || 'Area FM Host',
      image: pod.image || pod.artwork,
      audioUrl: pod.audioUrl || "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
    });
  };

  const totalResults =
    (activeTab === 'ALL' || activeTab === 'SHOWS' ? filteredShows.length : 0) +
    (activeTab === 'ALL' || activeTab === 'HOSTS' ? filteredHosts.length : 0) +
    (activeTab === 'ALL' || activeTab === 'PODCASTS' ? filteredPodcasts.length : 0) +
    (activeTab === 'ALL' || activeTab === 'NEWS' ? filteredNews.length : 0);

  const currentTrackTitle = currentTrack?.showName || currentTrack?.title || "93.5 AREA FM LIVE";
  const currentTrackArtist = currentTrack?.presenterName || currentTrack?.artist || "ONE VOICE, EVERY AREA";

  return (
    <div className={styles.stickyHeaderWrapper}>
      {/* Top Ticker / Social Bar */}
      <div className={styles.topBanner}>
        <div className={styles.nowPlayingTrack}>
          <FiMusic className={styles.musicIcon} />
          <span className={styles.tickerText}>
            {currentTrackTitle.toUpperCase()} - {currentTrackArtist.toUpperCase()}
          </span>
        </div>
        <div className={styles.topSocials}>
          <a href="#" className={styles.topSocialLink} aria-label="YouTube"><FaYoutube /></a>
          <a href="#" className={styles.topSocialLink} aria-label="TikTok"><FaTiktok /></a>
          <a href="https://www.instagram.com/935areafm/" target="_blank" rel="noreferrer" className={styles.topSocialLink} aria-label="Instagram"><FaInstagram /></a>
          <a href="#" className={styles.topSocialLink} aria-label="Facebook"><FaFacebookF /></a>
          <a href="https://x.com/935areafm" target="_blank" rel="noreferrer" className={styles.topSocialLink} aria-label="X"><FaXTwitter /></a>
        </div>
      </div>

      {/* Main Navbar Header */}
      <header className={`${styles.navbarContainer} ${isScrolled ? styles.scrolled : ''} ${searchOpen ? styles.navbarSearching : ''}`}>
        
        {/* If Search is Open: Render the Full-Width White Search Header Bar (matching screenshot) */}
        {searchOpen ? (
          <form onSubmit={handleExecuteSearch} className={styles.inHeaderSearchBar}>
            <input
              ref={searchInputRef}
              type="text"
              className={styles.inHeaderSearchInput}
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />

            <div className={styles.inHeaderSearchActions}>
              <button 
                type="submit" 
                className={styles.inHeaderSearchBtn}
                onClick={handleExecuteSearch}
              >
                <FiSearch size={14} />
                <span>SEARCH</span>
              </button>

              <button 
                type="button" 
                className={styles.inHeaderCloseBtn} 
                onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                aria-label="Close search"
              >
                <FiX size={18} />
              </button>
            </div>
          </form>
        ) : (
          /* Normal Navbar State */
          <>
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
                  <Link to="/contact" className={`${styles.navLink} ${isActive('/contact') || isActive('/about') ? styles.activeNavLink : ''}`}>ABOUT US</Link>
                </li>
              </ul>
            </nav>

            {/* Right Header Action Buttons */}
            <div className={styles.navActions}>
              {/* Sharp Black Search Square Icon Button matching reference screenshot */}
              <button 
                className={`${styles.iconBtn} ${styles.searchSquareBtn}`} 
                onClick={() => setSearchOpen(true)} 
                aria-label="Search"
              >
                <FiSearch size={18} />
              </button>
              
              <button 
                className={`${styles.iconBtn} ${styles.menuSquareBtn}`} 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
              </button>

              <button className={styles.playBtn} onClick={togglePlayPause}>
                {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} />}
                <span>{isPlaying ? 'PAUSE' : 'LIVE'}</span>
              </button>

              <button className={`${styles.iconBtn} ${styles.hideOnMobile}`} onClick={toggleMute} aria-label="Toggle Sound">
                {isMuted ? <FiVolumeX size={18} /> : <FiVolume2 size={18} />}
              </button>

              <button className={`${styles.popupBtn} ${styles.hideOnTablet}`} onClick={openPopUpPlayer}>
                POP UP
              </button>
            </div>
          </>
        )}

        {/* Live Search Results Dropdown Panel (attached right below the search header) */}
        {searchOpen && (
          <div className={styles.headerSearchDropdown} onClick={(e) => e.stopPropagation()}>
            {!cleanQuery ? (
              <div className={styles.popularSearchBox}>
                <span className={styles.popularSearchLabel}>
                  <FiTrendingUp /> POPULAR SEARCHES:
                </span>
                <div className={styles.popularPillsList}>
                  {popularKeywords.map((kw, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={styles.popularPillBtn}
                      onClick={() => setSearchQuery(kw)}
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className={styles.dropdownResultsBody}>
                {/* Filter Tabs */}
                <div className={styles.dropdownTabsRow}>
                  {['ALL', 'SHOWS', 'HOSTS', 'PODCASTS', 'NEWS'].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      className={`${styles.dropdownTabBtn} ${activeTab === tab ? styles.activeDropdownTab : ''}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {totalResults === 0 ? (
                  <div className={styles.noMatchesBox}>
                    <p>No results found for "<strong>{searchQuery}</strong>"</p>
                    <button 
                      type="button" 
                      className={styles.browseAllNewsBtn}
                      onClick={() => handleNavigate('/news')}
                    >
                      BROWSE ALL NEWS
                    </button>
                  </div>
                ) : (
                  <div className={styles.dropdownResultsGrid}>
                    {/* SHOWS */}
                    {(activeTab === 'ALL' || activeTab === 'SHOWS') && filteredShows.length > 0 && (
                      <div className={styles.resultsCategoryCol}>
                        <h4 className={styles.resultsCatTitle}><FiRadio /> SHOWS ({filteredShows.length})</h4>
                        <div className={styles.resultsItemList}>
                          {filteredShows.slice(0, 4).map((show, idx) => (
                            <div 
                              key={idx} 
                              className={styles.dropdownResultCard}
                              onClick={() => handleNavigate(`/shows/${getSlug(show.title)}`)}
                            >
                              <img src={show.image} alt={show.title} className={styles.dropdownThumb} />
                              <div className={styles.dropdownInfo}>
                                <span className={styles.dropdownBadge}>{show.category || 'SHOW'}</span>
                                <h5 className={styles.dropdownTitle}>{show.title}</h5>
                                <p className={styles.dropdownSub}>{show.time} • {show.dj}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* HOSTS */}
                    {(activeTab === 'ALL' || activeTab === 'HOSTS') && filteredHosts.length > 0 && (
                      <div className={styles.resultsCategoryCol}>
                        <h4 className={styles.resultsCatTitle}><FiUser /> HOSTS ({filteredHosts.length})</h4>
                        <div className={styles.resultsItemList}>
                          {filteredHosts.slice(0, 4).map((host, idx) => (
                            <div 
                              key={idx} 
                              className={styles.dropdownResultCard}
                              onClick={() => handleNavigate(`/hosts/${host.slug}`)}
                            >
                              <img src={host.photo} alt={host.name} className={`${styles.dropdownThumb} ${styles.circleThumb}`} />
                              <div className={styles.dropdownInfo}>
                                <span className={styles.dropdownBadge}>{host.badge || 'HOST'}</span>
                                <h5 className={styles.dropdownTitle}>{host.name}</h5>
                                <p className={styles.dropdownSub}>{host.role}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* PODCASTS */}
                    {(activeTab === 'ALL' || activeTab === 'PODCASTS') && filteredPodcasts.length > 0 && (
                      <div className={styles.resultsCategoryCol}>
                        <h4 className={styles.resultsCatTitle}><FiMic /> PODCASTS ({filteredPodcasts.length})</h4>
                        <div className={styles.resultsItemList}>
                          {filteredPodcasts.slice(0, 4).map((pod, idx) => (
                            <div 
                              key={idx} 
                              className={styles.dropdownResultCard}
                              onClick={() => handleNavigate('/podcasts')}
                            >
                              <img src={pod.image} alt={pod.title} className={styles.dropdownThumb} />
                              <div className={styles.dropdownInfo}>
                                <span className={styles.dropdownBadge}>{pod.category || 'PODCAST'}</span>
                                <h5 className={styles.dropdownTitle}>{pod.title}</h5>
                                <p className={styles.dropdownSub}>{pod.host}</p>
                              </div>
                              <button 
                                type="button" 
                                className={styles.podPlayBtn}
                                onClick={(e) => handlePlayPodcast(e, pod)}
                                aria-label="Play Podcast"
                              >
                                <FaPlay size={10} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* NEWS */}
                    {(activeTab === 'ALL' || activeTab === 'NEWS') && filteredNews.length > 0 && (
                      <div className={styles.resultsCategoryCol}>
                        <h4 className={styles.resultsCatTitle}><FiFileText /> NEWS ({filteredNews.length})</h4>
                        <div className={styles.resultsItemList}>
                          {filteredNews.slice(0, 4).map((item, idx) => (
                            <div 
                              key={idx} 
                              className={styles.dropdownResultCard}
                              onClick={() => handleNavigate(`/news/${getSlug(item.title)}`)}
                            >
                              <img src={item.image} alt={item.title} className={styles.dropdownThumb} />
                              <div className={styles.dropdownInfo}>
                                <span className={styles.dropdownBadge}>{item.category || 'NEWS'}</span>
                                <h5 className={styles.dropdownTitle}>{item.title}</h5>
                                <p className={styles.dropdownSub}>{item.date || 'Latest News'}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </header>

      {/* Offcanvas Drawer Navigation */}
      {mobileMenuOpen && (
        <div className={styles.drawerOverlay} onClick={() => setMobileMenuOpen(false)}>
          <div className={styles.mobileDrawer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.drawerHeader}>
              <div 
                className={styles.mobileSearchBox}
                onClick={() => { setMobileMenuOpen(false); setSearchOpen(true); }}
                style={{ cursor: 'pointer' }}
              >
                <FiSearch className={styles.searchBoxIcon} />
                <input 
                  type="text" 
                  placeholder="Search shows, news, podcasts..." 
                  className={styles.mobileSearchInput}
                  readOnly
                />
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
                    <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className={`${styles.mobileNavLink} ${isActive('/contact') || isActive('/about') ? styles.activeMobileLink : ''}`}>ABOUT US</Link>
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
                <button className={styles.mobilePopUpBtn} onClick={() => { setMobileMenuOpen(false); openPopUpPlayer(); }}>
                  POP UP PLAYER
                </button>
                
                <div className={styles.mobileSocialsRow}>
                  <a href="#" aria-label="YouTube"><FaYoutube /></a>
                  <a href="#" aria-label="TikTok"><FaTiktok /></a>
                  <a href="https://www.instagram.com/935areafm/" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
                  <a href="#" aria-label="Facebook"><FaFacebookF /></a>
                  <a href="https://x.com/935areafm" target="_blank" rel="noreferrer" aria-label="X"><FaXTwitter /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
