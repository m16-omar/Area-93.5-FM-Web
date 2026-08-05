import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaApple, FaGooglePlay } from 'react-icons/fa';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import styles from './ListenCTA.module.css';

export const ListenCTA = () => {
  const { isPlaying, togglePlayPause } = useAudioPlayer();

  return (
    <section className={styles.ctaSection}>
      <div className={styles.bgCircle} />

      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.headline}>
          You're One Click Away From Live Radio
        </h2>
        <p className={styles.subtext}>
          Tune in to Area 93.5 FM anywhere, anytime. Stream crystal-clear live broadcasts, podcasts, charts, and breaking news updates directly from your device.
        </p>

        <div className={styles.buttonsRow}>
          <button className={styles.listenBtn} onClick={togglePlayPause} aria-label="Listen Live">
            {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
            <span>{isPlaying ? 'PAUSE STREAM' : 'LISTEN LIVE'}</span>
          </button>
          
          <button className={styles.storeBtn} onClick={() => alert('Area 93.5 FM iOS App coming soon!')} aria-label="Download on App Store">
            <FaApple size={20} />
            <div className={styles.storeText}>
              <span className={styles.storeSub}>Download on the</span>
              <span className={styles.storeTitle}>App Store</span>
            </div>
          </button>

          <button className={styles.storeBtn} onClick={() => alert('Area 93.5 FM Android App coming soon!')} aria-label="Get it on Google Play">
            <FaGooglePlay size={17} />
            <div className={styles.storeText}>
              <span className={styles.storeSub}>Get it on</span>
              <span className={styles.storeTitle}>Google Play</span>
            </div>
          </button>
        </div>
      </motion.div>
    </section>
  );
};
