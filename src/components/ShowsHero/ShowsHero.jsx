import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiClock } from 'react-icons/fi';
import { useAudioPlayer, LIVE_STREAM_URL } from '../../context/AudioPlayerContext';
import styles from './ShowsHero.module.css';

export const ShowsHero = () => {
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();

  const featured = {
    id: "area_fm_live",
    title: "The Fan Zone",
    presenter: "Simi Ogunleye",
    time: "11:00 am - 02:30 pm",
    thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    audioUrl: LIVE_STREAM_URL,
    isLive: true
  };

  const isSelected = (currentTrack?.id === featured.id || currentTrack?.audioUrl === LIVE_STREAM_URL) && isPlaying;

  const handlePlayClick = () => {
    playTrack({
      id: featured.id,
      title: featured.title,
      artist: featured.presenter,
      showName: featured.title,
      presenterName: featured.presenter,
      image: featured.thumbnail,
      audioUrl: featured.audioUrl,
      isLive: true
    });
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.bgCircleTopRight} />

      <div className={styles.heroContentGrid}>
        {/* Left Column: Featured Show Badge Card */}
        <motion.div
          className={styles.leftShowBlock}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.thumbnailWrapper}>
            <img 
              src={featured.thumbnail} 
              alt={featured.title} 
              className={styles.artworkImg} 
            />
          </div>

          <h2 className={styles.showTitle}>{featured.title}</h2>
          <span className={styles.presenterName}>{featured.presenter}</span>
          <span className={styles.timeSchedule}>
            <FiClock size={13} /> {featured.time}
          </span>

          <button className={styles.listenBtn} onClick={handlePlayClick}>
            {isSelected ? 'PAUSE' : 'LISTEN'}
          </button>
        </motion.div>

        {/* Right Column: Want Your Own Show Callout */}
        <motion.div
          className={styles.rightCallout}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className={styles.calloutTitle}>
            WANT YOUR<br />OWN SHOW?
          </h1>
          <p className={styles.calloutDesc}>
            Have a unique voice, podcast concept, or radio show idea? Join the Area 93.5 FM presenter family and broadcast live across the city to thousands of listeners.
          </p>

          <Link to="/contact" className={styles.contactBtn}>
            CONTACT US
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
