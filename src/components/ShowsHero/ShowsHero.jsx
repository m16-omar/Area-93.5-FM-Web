import React from 'react';
import { motion } from 'framer-motion';
import { FiClock } from 'react-icons/fi';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import showsFullData from '../../data/showsFullData.json';
import styles from './ShowsHero.module.css';

export const ShowsHero = () => {
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();

  const featured = showsFullData.featured || {
    id: "feat-1",
    title: "Vibe Check",
    presenter: "Presented by Jordan Carter",
    time: "5:30 am - 11:30 am",
    thumbnail: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  };

  const isSelected = currentTrack?.id === featured.id && isPlaying;
  const imageSrc = featured.thumbnail || featured.artwork || featured.banner || "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80";

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
        {/* Left Column: Featured Show Block */}
        <motion.div
          className={styles.leftShowBlock}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.thumbnailWrapper}>
            <img 
              src={imageSrc} 
              alt={featured.title} 
              className={styles.artworkImg} 
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80";
              }}
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
