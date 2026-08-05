import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause } from 'react-icons/fa';
import { FiClock, FiUser } from 'react-icons/fi';
import { LiveIndicator } from '../WeeklySchedule/LiveIndicator';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import styles from './FeaturedShow.module.css';

export const FeaturedShow = ({ showData, onScrollToSchedule }) => {
  const { isPlaying, togglePlayPause } = useAudioPlayer();

  if (!showData) return null;

  return (
    <section className={styles.featuredSection}>
      <motion.div 
        className={styles.featuredCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Left Image Column */}
        <div className={styles.imageCol}>
          <img src={showData.banner || showData.thumbnail} alt={showData.title} className={styles.featuredImg} />
          <div className={styles.imageOverlay}>
            <span className={styles.genreBadge}>{showData.genre}</span>
            {showData.isLive && <LiveIndicator />}
          </div>
        </div>

        {/* Right Content Column */}
        <div className={styles.contentCol}>
          <div>
            <span className={styles.featuredTag}>FEATURED PROGRAMME</span>
            <h2 className={styles.showTitle}>{showData.title}</h2>

            <div className={styles.metaRow}>
              <span className={styles.metaItem}>
                <FiUser className={styles.metaIcon} size={15} />
                {showData.presenter}
              </span>
              <span className={styles.metaItem}>
                <FiClock className={styles.metaIcon} size={15} />
                {showData.time}
              </span>
            </div>

            <p className={styles.description}>{showData.shortDescription}</p>
          </div>

          <div className={styles.actionsRow}>
            <button className={styles.listenBtn} onClick={togglePlayPause} aria-label="Listen Live">
              {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
              <span>{isPlaying ? 'PAUSE STREAM' : 'LISTEN LIVE'}</span>
            </button>
            <button className={styles.scheduleBtn} onClick={onScrollToSchedule}>
              VIEW SCHEDULE
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
