import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMoreVertical } from 'react-icons/fi';
import scheduleData from '../../data/scheduleData.json';
import styles from './WeeklySchedule.module.css';

export const WeeklySchedule = () => {
  const [selectedDay, setSelectedDay] = useState('TUESDAY');
  const shows = scheduleData.shows[selectedDay] || [];

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
            >
              <img src={show.image} alt={show.title} className={styles.showImage} loading="lazy" />
              <div className={styles.showOverlay}>
                <div className={styles.badgeGroup}>
                  {show.nowPlaying && (
                    <span className="badge-neon" style={{ background: '#000', color: 'var(--color-accent)' }}>
                      NOW PLAYING
                    </span>
                  )}
                  <span className="badge-outline">{show.category.toLowerCase()}</span>
                </div>

                <div className={styles.showDetails}>
                  <div>
                    <h3 className={styles.showTitle}>{show.title}</h3>
                    <p className={styles.showTime}>{show.time}</p>
                  </div>
                  <button className={styles.moreBtn} aria-label="Show Options">
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
