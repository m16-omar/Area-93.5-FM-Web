import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause } from 'react-icons/fa';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import eventsData from '../../data/eventsData.json';
import styles from './Hero.module.css';

export const Hero = () => {
  const { isPlaying, togglePlayPause, currentTrack } = useAudioPlayer();

  return (
    <section className={styles.heroSection}>
      <div className={styles.bgCircle1} />
      <div className={styles.bgCircle2} />

      <div className={styles.heroContent}>
        {/* Left Column */}
        <motion.div 
          className={styles.leftCol}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.logoWatermark}>93.5 AREA FM</div>
          
          <h1 className={styles.heroHeadline}>
            WHERE EVERY<br />
            NOTE CONNECTS
          </h1>

          <div className={styles.giantPlayWrapper}>
            <button className={styles.giantPlayBtn} onClick={togglePlayPause} aria-label="Play Radio">
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <div className={styles.trackMeta}>
              <span className={styles.trackMetaTitle}>{currentTrack.title}</span>
              <span className={styles.trackMetaArtist}>{currentTrack.artist}</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Events */}
        <motion.div 
          className={styles.rightCol}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.nextEventsHeader}>
            <span className="section-label">NEXT EVENTS</span>
          </div>

          <div className={styles.eventsGrid}>
            {eventsData.map((ev) => (
              <div key={ev.id} className={styles.eventCard}>
                <img src={ev.image} alt={ev.title} className={styles.eventImage} loading="lazy" />
                <div className={styles.eventOverlay}>
                  <div className={styles.dateCircle}>
                    <span>{ev.dateDay}</span>
                    <span>{ev.dateMonth}</span>
                  </div>
                  <div>
                    <span className="badge-outline" style={{ marginBottom: '6px' }}>{ev.badge}</span>
                    <h3 className={styles.eventTitle}>{ev.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
