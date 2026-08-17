import React, { useRef } from 'react';
import { FiChevronLeft, FiChevronRight, FiMoreVertical } from 'react-icons/fi';
import showsScheduleData from '../../data/showsScheduleData.json';
import styles from './UpcomingShows.module.css';

export const UpcomingShows = () => {
  const scrollTrackRef = useRef(null);

  // Today's shows list from MONDAY (or current day)
  const todaysShows = showsScheduleData.schedule["MONDAY"] || [];

  const handleScroll = (direction) => {
    if (scrollTrackRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      scrollTrackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.upcomingSection}>
      <div className={styles.headerRow}>
        <div className={styles.headerLeft}>
          <div className={styles.headingWrapper}>
            <span className={styles.tagBadge}>COMING NEXT</span>
            <div className={styles.accentLine} />
          </div>
          <h2 className={styles.sectionHeadline}>TODAY'S SHOWS</h2>
        </div>

        {/* Sliding Navigation Control Arrows */}
        <div className={styles.navArrowsRow}>
          <button 
            className={styles.arrowBtn} 
            onClick={() => handleScroll('left')}
            aria-label="Previous Shows"
          >
            <FiChevronLeft />
          </button>
          <button 
            className={styles.arrowBtn} 
            onClick={() => handleScroll('right')}
            aria-label="Next Shows"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>

      {/* Sliding Horizontal Cards Track */}
      <div ref={scrollTrackRef} className={styles.carouselTrack}>
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
    </section>
  );
};
