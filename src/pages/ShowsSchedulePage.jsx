import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMoreVertical } from 'react-icons/fi';
import { Navbar } from '../components/Navbar/Navbar';
import { ShowsHero } from '../components/ShowsHero/ShowsHero';
import { UpcomingShows } from '../components/UpcomingShows/UpcomingShows';
import HostsAndFeaturedShow from '../components/HostsAndFeaturedShow/HostsAndFeaturedShow';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import showsScheduleData from '../data/showsScheduleData.json';
import styles from './ShowsSchedulePage.module.css';

export const ShowsSchedulePage = () => {
  const [activeDay, setActiveDay] = useState('MONDAY');
  const navigate = useNavigate();

  const currentSchedule = showsScheduleData.schedule[activeDay] || [];

  const getSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleNavigateDetail = (show) => {
    navigate(`/shows/${getSlug(show.name || show.title)}`);
  };

  return (
    <main className={styles.showsPageContainer}>
      <Navbar />

      {/* 1. HERO BANNER SECTION (WANT YOUR OWN SHOW?) */}
      <ShowsHero />

      {/* 2. UPCOMING SHOWS SECTION */}
      <UpcomingShows />

      {/* 3. MEET OUR HOSTS & FEATURED SHOW SECTION */}
      <HostsAndFeaturedShow />

      {/* 4. WEEKLY SCHEDULE SECTION */}
      <section className={styles.weeklyScheduleSection}>
        <div className={styles.glowCircleLeft} />

        <div className={styles.watermarkText}>
          WEEKLY SCHEDULE
        </div>

        <div className={styles.weeklyHeader}>
          <h2 className={styles.sectionTitle}>WEEKLY SCHEDULE</h2>
        </div>

        {/* Day Selector Tabs */}
        <div className={styles.dayTabsRow}>
          {showsScheduleData.days.map((day) => (
            <button
              key={day}
              className={`${styles.dayTabBtn} ${activeDay === day ? styles.dayTabBtnActive : ''}`}
              onClick={() => setActiveDay(day)}
            >
              {day}
            </button>
          ))}
        </div>

        {/* 6-Card Shows Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            className={styles.scheduleCardsGrid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentSchedule.map((show) => (
              <div 
                key={show.id} 
                className={styles.gridShowCard}
                onClick={() => handleNavigateDetail(show)}
              >
                {show.nowPlaying && (
                  <span className={styles.nowPlayingTag}>
                    <span className={styles.greenPulseDot} />
                    NOW PLAYING
                  </span>
                )}
                
                <img src={show.image} alt={show.name || show.title} className={styles.cardBgImg} />
                
                <div className={styles.cardOverlay}>
                  <div className={styles.cardTopRow}>
                    <span className={styles.catBadge}>{show.genre || show.category}</span>
                  </div>

                  <div className={styles.cardBottomRow}>
                    <div className={styles.cardTextInfo}>
                      <h3 className={styles.showTitle}>{show.name || show.title}</h3>
                      <p className={styles.showMeta}>{show.time} • {show.dj}</p>
                    </div>

                    <button 
                      className={styles.moreBtn} 
                      aria-label="View Show Details"
                      onClick={(e) => { e.stopPropagation(); handleNavigateDetail(show); }}
                    >
                      <FiMoreVertical />
                    </button>
                  </div>
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
