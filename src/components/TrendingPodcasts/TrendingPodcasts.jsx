import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause } from 'react-icons/fa';
import { FiClock } from 'react-icons/fi';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import styles from './TrendingPodcasts.module.css';

export const TrendingPodcasts = ({ episodes }) => {
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();

  if (!episodes || episodes.length === 0) return null;

  return (
    <section className={styles.trendingSection}>
      <div className={styles.headingWrapper}>
        <span className={styles.tagBadge}>POPULAR NOW</span>
        <div className={styles.greenLine} />
      </div>
      <h2 className={styles.sectionHeadline}>TRENDING PODCASTS</h2>

      <div className={styles.carouselRow}>
        {episodes.map((ep) => {
          const isSelected = currentTrack?.id === ep.id && isPlaying;
          return (
            <motion.div
              key={ep.id}
              className={styles.card}
              onClick={() => playTrack({
                id: ep.id,
                title: ep.title,
                artist: ep.presenter,
                showName: ep.title,
                presenterName: ep.presenter,
                audioUrl: ep.audioUrl
              })}
            >
              <div className={styles.imageWrapper}>
                <img src={ep.artwork} alt={ep.title} className={styles.artwork} />
                <span className={styles.catBadge}>{ep.category}</span>
                <button className={styles.playOverlayBtn} aria-label="Play Episode">
                  {isSelected ? <FaPause /> : <FaPlay style={{ marginLeft: '2px' }} />}
                </button>
              </div>

              <div className={styles.cardContent}>
                <h4 className={styles.cardTitle}>{ep.title}</h4>
                <div className={styles.cardMeta}>
                  <span>{ep.presenter}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <FiClock size={12} /> {ep.duration}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
