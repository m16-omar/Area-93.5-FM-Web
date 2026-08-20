import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiX, FiRadio, FiUser, FiMic, FiFileText } from 'react-icons/fi';
import { FaPlay } from 'react-icons/fa';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import scheduleData from '../../data/scheduleData.json';
import teamData from '../../data/teamData.json';
import podcastsData from '../../data/podcastsFullData.json';
import newsData from '../../data/newsData.json';
import styles from './SearchModal.module.css';

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { playTrack } = useAudioPlayer();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getSlug = (title) => {
    return title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '';
  };

  // Aggregate searchable items
  const allShows = Object.values(scheduleData.shows || {}).flat().filter(
    (show, index, self) => index === self.findIndex((s) => s.title === show.title)
  );

  const allHosts = teamData || [];
  const allPodcasts = podcastsData || [];
  const allNews = [
    newsData.featuredBig,
    newsData.featuredMedium,
    ...(newsData.newsList || [])
  ].filter(Boolean);

  const cleanQuery = query.toLowerCase().trim();

  const filteredShows = allShows.filter(s =>
    !cleanQuery || s.title?.toLowerCase().includes(cleanQuery) || s.dj?.toLowerCase().includes(cleanQuery) || s.category?.toLowerCase().includes(cleanQuery)
  );

  const filteredHosts = allHosts.filter(h =>
    !cleanQuery || h.name?.toLowerCase().includes(cleanQuery) || h.role?.toLowerCase().includes(cleanQuery) || h.show?.toLowerCase().includes(cleanQuery)
  );

  const filteredPodcasts = allPodcasts.filter(p =>
    !cleanQuery || p.title?.toLowerCase().includes(cleanQuery) || p.host?.toLowerCase().includes(cleanQuery) || p.category?.toLowerCase().includes(cleanQuery)
  );

  const filteredNews = allNews.filter(n =>
    !cleanQuery || n.title?.toLowerCase().includes(cleanQuery) || n.category?.toLowerCase().includes(cleanQuery)
  );

  const handleNavigate = (path) => {
    onClose();
    navigate(path);
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/news?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handlePlayPodcast = (e, pod) => {
    e.stopPropagation();
    playTrack({
      id: pod.id || `pod-${Date.now()}`,
      title: pod.title,
      artist: pod.host || 'Area FM Host',
      image: pod.image,
      audioUrl: pod.audioUrl || "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
    });
  };

  const totalResults =
    (activeTab === 'ALL' || activeTab === 'SHOWS' ? filteredShows.length : 0) +
    (activeTab === 'ALL' || activeTab === 'HOSTS' ? filteredHosts.length : 0) +
    (activeTab === 'ALL' || activeTab === 'PODCASTS' ? filteredPodcasts.length : 0) +
    (activeTab === 'ALL' || activeTab === 'NEWS' ? filteredNews.length : 0);

  return (
    <div className={styles.topSearchOverlay} onClick={onClose}>
      <div className={styles.topSearchWrapper} onClick={(e) => e.stopPropagation()}>
        
        {/* Top Expandable Search Header Bar (matching screenshot) */}
        <form onSubmit={handleSearchSubmit} className={styles.searchBarRow}>
          <input
            ref={inputRef}
            type="text"
            className={styles.searchInput}
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className={styles.searchActionsGroup}>
            <button type="submit" className={styles.searchSubmitBtn}>
              <FiSearch className={styles.btnSearchIcon} />
              <span>SEARCH</span>
            </button>

            <button 
              type="button" 
              className={styles.closeSearchBtn} 
              onClick={onClose}
              aria-label="Close search"
            >
              <FiX size={18} />
            </button>
          </div>
        </form>

        {/* Live Instant Results Dropdown Container */}
        {cleanQuery && (
          <div className={styles.resultsDropdown}>
            {/* Filter Tabs */}
            <div className={styles.tabsRow}>
              {['ALL', 'SHOWS', 'HOSTS', 'PODCASTS', 'NEWS'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`${styles.tabBtn} ${activeTab === tab ? styles.activeTabBtn : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Results Grid */}
            <div className={styles.resultsScrollArea}>
              {totalResults === 0 ? (
                <div className={styles.noResultsBox}>
                  <p>No results found for "<strong>{query}</strong>"</p>
                </div>
              ) : (
                <div className={styles.resultsGrid}>
                  
                  {/* SHOWS */}
                  {(activeTab === 'ALL' || activeTab === 'SHOWS') && filteredShows.length > 0 && (
                    <div className={styles.categoryBlock}>
                      <h4 className={styles.categoryTitle}><FiRadio /> SHOWS ({filteredShows.length})</h4>
                      <div className={styles.itemsList}>
                        {filteredShows.slice(0, 4).map((show, idx) => (
                          <div 
                            key={idx} 
                            className={styles.resultItem} 
                            onClick={() => handleNavigate(`/shows/${getSlug(show.title)}`)}
                          >
                            <img src={show.image} alt={show.title} className={styles.itemThumb} />
                            <div className={styles.itemMeta}>
                              <span className={styles.itemBadge}>{show.category || 'SHOW'}</span>
                              <h5 className={styles.itemTitle}>{show.title}</h5>
                              <p className={styles.itemSub}>{show.time} • {show.dj}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* HOSTS */}
                  {(activeTab === 'ALL' || activeTab === 'HOSTS') && filteredHosts.length > 0 && (
                    <div className={styles.categoryBlock}>
                      <h4 className={styles.categoryTitle}><FiUser /> HOSTS ({filteredHosts.length})</h4>
                      <div className={styles.itemsList}>
                        {filteredHosts.slice(0, 4).map((host, idx) => (
                          <div 
                            key={idx} 
                            className={styles.resultItem} 
                            onClick={() => handleNavigate(`/hosts/${host.slug}`)}
                          >
                            <img src={host.photo} alt={host.name} className={`${styles.itemThumb} ${styles.circleThumb}`} />
                            <div className={styles.itemMeta}>
                              <span className={styles.itemBadge}>{host.badge || 'HOST'}</span>
                              <h5 className={styles.itemTitle}>{host.name}</h5>
                              <p className={styles.itemSub}>{host.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* PODCASTS */}
                  {(activeTab === 'ALL' || activeTab === 'PODCASTS') && filteredPodcasts.length > 0 && (
                    <div className={styles.categoryBlock}>
                      <h4 className={styles.categoryTitle}><FiMic /> PODCASTS ({filteredPodcasts.length})</h4>
                      <div className={styles.itemsList}>
                        {filteredPodcasts.slice(0, 4).map((pod, idx) => (
                          <div 
                            key={idx} 
                            className={styles.resultItem} 
                            onClick={() => handleNavigate(`/podcasts`)}
                          >
                            <img src={pod.image} alt={pod.title} className={styles.itemThumb} />
                            <div className={styles.itemMeta}>
                              <span className={styles.itemBadge}>{pod.category || 'PODCAST'}</span>
                              <h5 className={styles.itemTitle}>{pod.title}</h5>
                              <p className={styles.itemSub}>{pod.host}</p>
                            </div>
                            <button 
                              className={styles.playMiniBtn} 
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
                    <div className={styles.categoryBlock}>
                      <h4 className={styles.categoryTitle}><FiFileText /> NEWS ({filteredNews.length})</h4>
                      <div className={styles.itemsList}>
                        {filteredNews.slice(0, 4).map((item, idx) => (
                          <div 
                            key={idx} 
                            className={styles.resultItem} 
                            onClick={() => handleNavigate(`/news/${getSlug(item.title)}`)}
                          >
                            <img src={item.image} alt={item.title} className={styles.itemThumb} />
                            <div className={styles.itemMeta}>
                              <span className={styles.itemBadge}>{item.category || 'NEWS'}</span>
                              <h5 className={styles.itemTitle}>{item.title}</h5>
                              <p className={styles.itemSub}>{item.date || 'Latest News'}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
