import React, { useState, useEffect } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import showsScheduleData from '../../data/showsScheduleData.json';
import styles from './UpcomingShows.module.css';

export const UpcomingShows = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Today's shows list
  const todaysShows = showsScheduleData.schedule["MONDAY"] || [];
  const maxIndex = Math.max(0, todaysShows.length - 2);

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
          {todaysShows.map((item) => (
            <div key={item.id} className={styles.upcomingCard}>
              {item.nowPlaying && (
                <span className={styles.nowPlayingTag}>NOW PLAYING</span>
              )}
              <img src={item.image} alt={item.name} className={styles.cardImg} />
              <div className={styles.cardOverlay}>
                <span className={styles.catBadge}>{item.genre}</span>
                <h3 className={styles.showTitle}>{item.name}</h3>
                <p className={styles.showTime}>{item.time} • {item.dj}</p>
              </div>
              <button className={styles.moreBtn} aria-label="Options">
                <FiMoreVertical />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
