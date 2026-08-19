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
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Search Input Bar */}
        <div className={styles.searchBar}>
          <FiSearch className={styles.searchIcon} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search shows, presenters, podcasts, news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.searchInput}
          />
          {query && (
            <button className={styles.clearBtn} onClick={() => setQuery('')} aria-label="Clear Search">
              <FiX />
            </button>
          )}
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close Modal">
            ESC
          </button>
        </div>

        {/* Filter Tabs */}
        <div className={styles.filterTabs}>
          {['ALL', 'SHOWS', 'HOSTS', 'PODCASTS', 'NEWS'].map((tab) => (
            <button
              key={tab}
              className={`${styles.tabBtn} ${activeTab === tab ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className={styles.resultsContainer}>
          {totalResults === 0 ? (
            <div className={styles.emptyState}>
              <p>No results found for "<strong>{query}</strong>"</p>
              <span>Try searching for shows, hosts like <em>Simi Ogunleye</em>, or categories.</span>
            </div>
          ) : (
            <>
              {/* Shows Section */}
              {(activeTab === 'ALL' || activeTab === 'SHOWS') && filteredShows.length > 0 && (
                <div className={styles.resultGroup}>
                  <div className={styles.groupHeader}>
                    <FiRadio className={styles.groupIcon} />
                    <span>SHOWS ({filteredShows.length})</span>
                  </div>
                  <div className={styles.itemsGrid}>
                    {filteredShows.slice(0, activeTab === 'SHOWS' ? 12 : 3).map((show) => (
                      <div
                        key={show.id || show.title}
                        className={styles.resultCard}
                        onClick={() => handleNavigate('/shows')}
                      >
                        <img src={show.image} alt={show.title} className={styles.itemThumb} />
                        <div className={styles.itemMeta}>
                          <span className={styles.categoryBadge}>{show.category || 'SHOW'}</span>
                          <h4 className={styles.itemTitle}>{show.title}</h4>
                          <p className={styles.itemSub}>{show.dj} • {show.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hosts Section */}
              {(activeTab === 'ALL' || activeTab === 'HOSTS') && filteredHosts.length > 0 && (
                <div className={styles.resultGroup}>
                  <div className={styles.groupHeader}>
                    <FiUser className={styles.groupIcon} />
                    <span>HOSTS & PRESENTERS ({filteredHosts.length})</span>
                  </div>
                  <div className={styles.itemsGrid}>
                    {filteredHosts.slice(0, activeTab === 'HOSTS' ? 12 : 3).map((host) => (
                      <div
                        key={host.id || host.slug}
                        className={styles.resultCard}
                        onClick={() => handleNavigate(`/hosts/${host.slug || 'simi-ogunleye'}`)}
                      >
                        <img src={host.image} alt={host.name} className={`${styles.itemThumb} ${styles.circleThumb}`} />
                        <div className={styles.itemMeta}>
                          <span className={styles.categoryBadge}>{host.role || 'PRESENTER'}</span>
                          <h4 className={styles.itemTitle}>{host.name}</h4>
                          <p className={styles.itemSub}>{host.show || '93.5 Area FM'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Podcasts Section */}
              {(activeTab === 'ALL' || activeTab === 'PODCASTS') && filteredPodcasts.length > 0 && (
                <div className={styles.resultGroup}>
                  <div className={styles.groupHeader}>
                    <FiMic className={styles.groupIcon} />
                    <span>PODCASTS ({filteredPodcasts.length})</span>
                  </div>
                  <div className={styles.itemsGrid}>
                    {filteredPodcasts.slice(0, activeTab === 'PODCASTS' ? 12 : 3).map((pod) => (
                      <div
                        key={pod.id || pod.title}
                        className={styles.resultCard}
                        onClick={() => handleNavigate('/podcasts')}
                      >
                        <img src={pod.image} alt={pod.title} className={styles.itemThumb} />
                        <div className={styles.itemMeta}>
                          <span className={styles.categoryBadge}>{pod.category || 'EPISODE'}</span>
                          <h4 className={styles.itemTitle}>{pod.title}</h4>
                          <p className={styles.itemSub}>{pod.host} • {pod.duration || '45 mins'}</p>
                        </div>
                        <button
                          className={styles.playNowBtn}
                          onClick={(e) => handlePlayPodcast(e, pod)}
                          aria-label="Play podcast"
                        >
                          <FaPlay size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* News Section */}
              {(activeTab === 'ALL' || activeTab === 'NEWS') && filteredNews.length > 0 && (
                <div className={styles.resultGroup}>
                  <div className={styles.groupHeader}>
                    <FiFileText className={styles.groupIcon} />
                    <span>NEWS & ARTICLES ({filteredNews.length})</span>
                  </div>
                  <div className={styles.itemsGrid}>
                    {filteredNews.slice(0, activeTab === 'NEWS' ? 12 : 3).map((newsItem, idx) => (
                      <div
                        key={newsItem.id || idx}
                        className={styles.resultCard}
                        onClick={() => handleNavigate('/news')}
                      >
                        <img src={newsItem.image} alt={newsItem.title} className={styles.itemThumb} />
                        <div className={styles.itemMeta}>
                          <span className={styles.categoryBadge}>{newsItem.category || 'ARTICLE'}</span>
                          <h4 className={styles.itemTitle}>{newsItem.title}</h4>
                          <p className={styles.itemSub}>{newsItem.date || 'Recent'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
