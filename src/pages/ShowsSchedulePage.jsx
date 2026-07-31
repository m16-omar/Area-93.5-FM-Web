import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiUser, FiChevronRight } from 'react-icons/fi';
import { Navbar } from '../components/Navbar/Navbar';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import showsData from '../data/showsScheduleData.json';
import styles from './ShowsSchedulePage.module.css';

export const ShowsSchedulePage = () => {
  const [activeDay, setActiveDay] = useState('MONDAY');

  const currentSchedule = showsData.schedule[activeDay] || [];

  return (
    <main className={styles.showsPageContainer}>
      <Navbar />
      <PageHeader title="SHOWS SCHEDULE" watermark={`WEEKLY\nRADIO`} />

      <section className={styles.scheduleSection}>
        {/* Day Selector Tabs */}
        <div className={styles.dayTabsRow}>
          {showsData.days.map((day) => {
            const isActive = activeDay === day;
            return (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`${styles.dayTabBtn} ${isActive ? styles.dayTabBtnActive : ''}`}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Schedule Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className={styles.scheduleList}
          >
            {currentSchedule.map((show) => (
              <div
                key={show.id}
                className={`${styles.showCard} ${show.nowPlaying ? styles.showCardNowPlaying : ''}`}
              >
                <div className={styles.showCardImageWrapper}>
                  <img src={show.image} alt={show.name} className={styles.showCardImg} />
                  {show.nowPlaying && (
                    <span className={styles.nowPlayingBadge}>
                      NOW PLAYING
                    </span>
                  )}
                </div>

                <div className={styles.showCardContent}>
                  <div className={styles.showCardMainInfo}>
                    <span className={`badge-outline ${styles.genreBadge}`}>
                      {show.genre.toLowerCase()}
                    </span>

                    <h3 className={styles.showTitle}>
                      {show.name}
                    </h3>

                    <div className={styles.showDetailsRow}>
                      <span className={styles.showDetailItem}>
                        <FiUser size={14} className={styles.detailIcon} /> {show.dj}
                      </span>
                      <span className={styles.showDetailItem}>
                        <FiClock size={14} className={styles.detailIcon} /> {show.time}
                      </span>
                    </div>
                  </div>

                  <button className={styles.actionBtn} aria-label="Show Details">
                    <FiChevronRight />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      <Footer />
      <LivePlayer />
    </main>
  );
};
