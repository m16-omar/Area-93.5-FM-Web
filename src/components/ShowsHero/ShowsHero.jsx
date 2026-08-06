import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause } from 'react-icons/fa';
import { FiClock } from 'react-icons/fi';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import showsFullData from '../../data/showsFullData.json';
import styles from './ShowsHero.module.css';

export const ShowsHero = ({ onScrollToSchedule }) => {
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();

  const featured = showsFullData.featured || {
    id: "f-1",
    title: "Vibe Check",
    presenter: "Presented by Jordan Carter",
    time: "05:30 AM - 11:30 AM",
    artwork: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  };

  const isSelected = currentTrack?.id === featured.id && isPlaying;

  const handlePlayClick = () => {
    playTrack({
      id: featured.id,
      title: featured.title,
      artist: featured.presenter,
      showName: featured.title,
      presenterName: featured.presenter,
      audioUrl: featured.audioUrl
    });
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContentGrid}>
        {/* Left Column: Featured Show Card */}
        <motion.div
          className={styles.leftShowCard}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.cardHeaderImg}>
            <img 
              src={featured.artwork} 
              alt={featured.title} 
              className={styles.artworkImg} 
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80";
              }}
            />
            <span className={styles.liveBadge}>FEATURED SHOW</span>
          </div>

          <div className={styles.cardBody}>
            <h3 className={styles.showTitle}>{featured.title}</h3>
            <span className={styles.presenterName}>{featured.presenter}</span>
            <span className={styles.timeSchedule}>
              <FiClock size={14} style={{ color: 'var(--primary-orange)' }} /> {featured.time}
            </span>

            <button className={styles.listenBtn} onClick={handlePlayClick}>
              {isSelected ? <FaPause size={12} /> : <FaPlay size={12} />}
              <span>{isSelected ? 'PAUSE SHOW' : 'LISTEN'}</span>
            </button>
          </div>
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

          <button 
            className={styles.contactBtn}
            onClick={() => {
              window.location.href = "mailto:shows@area935fm.com";
            }}
          >
            CONTACT US
          </button>
        </motion.div>
      </div>
    </section>
  );
};
