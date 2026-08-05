import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaHeart, FaRegHeart } from 'react-icons/fa';
import { FiClock, FiCalendar, FiUser, FiShare2, FiHeadphones } from 'react-icons/fi';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import styles from './PodcastGrid.module.css';

export const PodcastCard = ({ episode }) => {
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();
  const [likesCount, setLikesCount] = useState(episode.likes || 120);
  const [isLiked, setIsLiked] = useState(false);

  const isSelected = currentTrack?.id === episode.id && isPlaying;

  const handleLike = (e) => {
    e.stopPropagation();
    if (isLiked) {
      setLikesCount(prev => prev - 1);
      setIsLiked(false);
    } else {
      setLikesCount(prev => prev + 1);
      setIsLiked(true);
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: episode.title,
        text: `Listen to ${episode.title} on Area 93.5 FM!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Episode link copied!');
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
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.cardHeaderImg}>
        <img 
          src={episode.artwork} 
          alt={episode.title} 
          className={styles.artwork} 
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80";
          }}
        />
        
        <div className={styles.overlay}>
          <div className={styles.badgeRow}>
            <span className={styles.catBadge}>{episode.category}</span>
            <span className={styles.durationBadge}>
              <FiClock size={12} /> {episode.duration}
            </span>
          </div>

          <button className={styles.centerPlayBtn} onClick={handlePlayClick} aria-label="Play Episode">
            {isSelected ? <FaPause /> : <FaPlay style={{ marginLeft: '2px' }} />}
          </button>
        </div>
      </div>

      <div className={styles.cardBody}>
        <div>
          <h3 className={styles.cardTitle}>{episode.title}</h3>
          <p className={styles.cardDesc}>{episode.description}</p>
        </div>

        <div className={styles.cardFooter}>
          <div className={styles.metaGroup}>
            <span className={styles.metaItem}>
              <FiCalendar size={13} style={{ color: 'var(--primary-orange)' }} /> {episode.publishDate}
            </span>
            <span className={styles.metaItem}>
              <FiUser size={13} style={{ color: 'var(--primary-orange)' }} /> {episode.presenter}
            </span>
            <span className={styles.metaItem}>
              <FiHeadphones size={13} style={{ color: 'var(--primary-orange)' }} /> {(episode.listens || 5000).toLocaleString()}
            </span>
          </div>

          <div className={styles.actionsGroup}>
            <button 
              className={`${styles.iconActionBtn} ${isLiked ? styles.iconActionBtnLiked : ''}`}
              onClick={handleLike}
              aria-label="Like episode"
            >
              {isLiked ? <FaHeart /> : <FaRegHeart />}
              <span>{likesCount}</span>
            </button>
            <button className={styles.iconActionBtn} onClick={handleShare} aria-label="Share episode">
              <FiShare2 />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
