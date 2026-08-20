import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMoreVertical } from 'react-icons/fi';
import scheduleData from '../../data/scheduleData.json';
import styles from './WeeklySchedule.module.css';

export const WeeklySchedule = () => {
  const [selectedDay, setSelectedDay] = useState('MONDAY');
  const navigate = useNavigate();
  const shows = scheduleData.shows[selectedDay] || [];

  const getSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleShowDetails = (show) => {
    navigate(`/shows/${getSlug(show.title)}`);
  };

  return (
    <section className={styles.scheduleSection} id="shows">
      <div className={styles.watermarkTitle}>WEEKLY SCHEDULE</div>

      <div className={styles.sectionHeader}>
        <h2 className={styles.mainTitle}>WEEKLY SCHEDULE</h2>
      </div>

      {/* Day Selector Tabs */}
      <div className={styles.tabContainer}>
        {scheduleData.days.map((day) => (
          <button
            key={day}
            className={`${styles.tabButton} ${selectedDay === day ? styles.activeTab : ''}`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Shows Grid */}
      <motion.div 
        layout 
        className={styles.showGrid}
      >
        <AnimatePresence mode="popLayout">
          {shows.map((show) => (
            <motion.div
              key={show.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={styles.showCard}
              onClick={() => handleShowDetails(show)}
            >
              <img 
                src={show.image} 
                alt={show.title} 
                className={styles.showImage} 
                loading="lazy" 
              />

              <div className={styles.showOverlay}>
                {/* Top Row: Category badge or Now Playing tag */}
                <div className={styles.cardTopRow}>
                  <div className={styles.badgeGroup}>
                    {show.nowPlaying ? (
                      <span className={styles.nowPlayingBadge}>
                        <span className={styles.greenDot} />
                        NOW STREAMING
                      </span>
                    ) : (
                      <span className={styles.genrePill}>{show.category}</span>
                    )}
                  </div>
                </div>

                {/* Bottom Row: Title, Meta and 3-dots */}
                <div className={styles.showDetails}>
                  <div className={styles.showTextInfo}>
                    <h3 className={styles.showTitle}>{show.title}</h3>
                    <p className={styles.showTime}>{show.time} • {show.dj}</p>
                  </div>

                  <button 
                    className={styles.moreBtn} 
                    aria-label="Show Options"
                    onClick={(e) => { e.stopPropagation(); handleShowDetails(show); }}
                  >
                    <FiMoreVertical />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
