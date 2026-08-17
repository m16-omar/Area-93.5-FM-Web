import React, { useState, useEffect } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import showsScheduleData from '../../data/showsScheduleData.json';
import styles from './UpcomingShows.module.css';

export const UpcomingShows = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Shows schedule for today (e.g. MONDAY)
  const todaysShows = showsScheduleData.schedule["MONDAY"] || [];
  const maxIndex = Math.max(0, todaysShows.length - 2);

  // Auto-sliding timer effect (slides every 3.5 seconds without manual button clicks)
  useEffect(() => {
    if (isHovered || maxIndex === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(interval);
  }, [isHovered, maxIndex]);

  return (
    <section className={styles.upcomingSection}>
      <div className={styles.headingWrapper}>
        <span className={styles.tagBadge}>COMING NEXT</span>
        <div className={styles.accentLine} />
      </div>

      <h2 className={styles.sectionHeadline}>UPCOMING SHOWS</h2>

      {/* 2-Card Auto-Sliding Viewport Container */}
      <div 
        className={styles.carouselViewport}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className={styles.carouselTrack}
          style={{
            transform: `translateX(-${currentIndex * 50}%)`
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

      {/* Dots Indicator Bar */}
      {maxIndex > 0 && (
        <div className={styles.dotsRow}>
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <span
              key={idx}
              className={`${styles.dot} ${currentIndex === idx ? styles.activeDot : ''}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      )}
    </section>
  );
};
