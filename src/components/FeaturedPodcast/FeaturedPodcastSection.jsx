import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause } from 'react-icons/fa';
import { FiClock, FiCalendar, FiUser, FiDownload, FiShare2 } from 'react-icons/fi';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import styles from './FeaturedPodcastSection.module.css';

export const FeaturedPodcastSection = ({ episode }) => {
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();

  if (!episode) return null;

  const isSelected = currentTrack?.id === episode.id && isPlaying;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: episode.title,
        text: `Listen to ${episode.title} on Area 93.5 FM Podcasts!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Episode link copied to clipboard!');
    }
  };

  const handlePlayClick = () => {
    playTrack({
      id: episode.id,
      title: episode.title,
      artist: episode.presenter,
      showName: episode.title,
      presenterName: episode.presenter,
      audioUrl: episode.audioUrl
    });
  };

  return (
    <section className={styles.sectionContainer}>
      <motion.div 
        className={styles.featuredCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Left Artwork Column */}
        <div className={styles.imageCol}>
          <img 
            src={episode.artwork} 
            alt={episode.title} 
            className={styles.artworkImg} 
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80";
            }}
          />
          
          <div className={styles.imageOverlay}>
            <div className={styles.topBadgesRow}>
              <span className={styles.epBadge}>{episode.episodeNumber}</span>
              <span className={styles.categoryBadge}>{episode.category}</span>
            </div>

            <div className={styles.centerPlayBtnWrapper}>
              <button 
                className={styles.playCircleBtn} 
                onClick={handlePlayClick} 
                aria-label={`Play ${episode.title}`}
              >
                {isSelected ? <FaPause size={18} /> : <FaPlay size={18} style={{ marginLeft: '3px' }} />}
              </button>
            </div>
          </div>
        </div>

        {/* Right Details Column */}
        <div className={styles.contentCol}>
          <div>
            <span className={styles.tagline}>FEATURED EPISODE</span>
            <h2 className={styles.title}>{episode.title}</h2>

            <div className={styles.metaRow}>
              <span className={styles.metaItem}>
                <FiUser style={{ color: 'var(--primary-orange)' }} size={15} />
                {episode.presenter}
              </span>
              <span className={styles.metaItem}>
                <FiCalendar style={{ color: 'var(--primary-orange)' }} size={15} />
                {episode.publishDate}
              </span>
              <span className={styles.metaItem}>
                <FiClock style={{ color: 'var(--primary-orange)' }} size={15} />
                {episode.duration}
              </span>
            </div>

            <p className={styles.description}>{episode.description}</p>
          </div>

          <div className={styles.actionsRow}>
            <button className={styles.listenBtn} onClick={handlePlayClick}>
              {isSelected ? <FaPause size={14} /> : <FaPlay size={14} />}
              <span>{isSelected ? 'PAUSE EPISODE' : 'LISTEN NOW'}</span>
            </button>

            <button 
              className={styles.secondaryBtn} 
              onClick={() => alert(`Downloading ${episode.title}...`)}
            >
              <FiDownload size={15} />
              <span>DOWNLOAD</span>
            </button>

            <button className={styles.secondaryBtn} onClick={handleShare}>
              <FiShare2 size={15} />
              <span>SHARE</span>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
