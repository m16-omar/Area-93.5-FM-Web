import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMoreVertical, FiPlay, FiPause } from 'react-icons/fi';
import { useAudioPlayer, LIVE_STREAM_URL } from '../../context/AudioPlayerContext';
import showsScheduleData from '../../data/showsScheduleData.json';
import styles from './UpcomingShows.module.css';

export const UpcomingShows = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();

  // Today's shows list
  const todaysShows = showsScheduleData.schedule["MONDAY"] || [];
  const maxIndex = Math.max(0, todaysShows.length - 2);

  const getSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleCardPlay = (show) => {
    playTrack({
      id: show.id,
      title: show.name || show.title,
      artist: show.dj,
      showName: show.name || show.title,
      presenterName: show.dj,
      image: show.image,
      audioUrl: show.nowPlaying ? LIVE_STREAM_URL : 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
      isLive: show.nowPlaying
    });
  };

  const handleNavigateDetail = (e, show) => {
    e.stopPropagation();
    navigate(`/shows/${getSlug(show.name || show.title)}`);
  };

  // Continuous auto-sliding effect (never stops on hover)
  useEffect(() => {
    if (maxIndex === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3200);

    return () => clearInterval(interval);
  }, [maxIndex]);

  return (
    <section className={styles.upcomingSection}>
      <div className={styles.headingWrapper}>
        <span className={styles.tagBadge}>COMING NEXT</span>
        <div className={styles.accentLine} />
      </div>

      <h2 className={styles.sectionHeadline}>UPCOMING SHOWS</h2>

      {/* 2-Card Non-Stop Auto-Sliding Viewport */}
      <div className={styles.carouselViewport}>
        <div 
          className={styles.carouselTrack}
          style={{
            transform: `translateX(calc(-${currentIndex} * (50% + 12px)))`
          }}
        >
          {todaysShows.map((item) => {
            const isSelected = (currentTrack?.title === (item.name || item.title)) && isPlaying;

            return (
              <div 
                key={item.id} 
                className={styles.upcomingCard}
                onClick={() => handleCardPlay(item)}
              >
                {item.nowPlaying && (
                  <span className={styles.nowPlayingTag}>NOW PLAYING</span>
                )}
                
                <img src={item.image} alt={item.name} className={styles.cardImg} />
                
                <div className={styles.cardOverlay}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <span className={styles.catBadge}>{item.genre}</span>
                    <button 
                      className={styles.cardPlayBtn} 
                      onClick={(e) => { e.stopPropagation(); handleCardPlay(item); }}
                      aria-label="Play show"
                    >
                      {isSelected ? <FiPause size={12} /> : <FiPlay size={12} style={{ marginLeft: '1px' }} />}
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
                    <div 
                      style={{ cursor: 'pointer', flex: 1, minWidth: 0 }}
                      onClick={(e) => handleNavigateDetail(e, item)}
                    >
                      <h3 className={styles.showTitle}>{item.name}</h3>
                      <p className={styles.showTime}>{item.time} • {item.dj}</p>
                    </div>

                    <button 
                      className={styles.moreBtn} 
                      aria-label="View Show Details"
                      onClick={(e) => handleNavigateDetail(e, item)}
                    >
                      <FiMoreVertical />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
