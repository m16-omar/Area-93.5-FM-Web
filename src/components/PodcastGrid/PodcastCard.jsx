import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FiShare2, FiMoreVertical } from 'react-icons/fi';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import styles from './PodcastGrid.module.css';

export const PodcastCard = ({ episode }) => {
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();
  const [isLiked, setIsLiked] = useState(false);

  const isSelected = currentTrack?.id === episode.id && isPlaying;

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
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

  const handleCardClick = () => {
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
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {/* Circle Backdrop */}
      <div className={styles.backdropCircle} />

      {/* Presenter / Episode Artwork */}
      <img 
        src={episode.artwork} 
        alt={episode.title} 
        className={styles.presenterPhoto} 
        onError={(e) => {
          e.target.src = "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80";
        }}
      />

      {/* Hover Action Icons (Right Edge) */}
      <div className={styles.hoverActions}>
        <button 
          className={styles.actionIconBtn} 
          onClick={handleShare} 
          aria-label="Share Episode"
        >
          <FiShare2 />
        </button>
        <button 
          className={`${styles.actionIconBtn} ${isLiked ? styles.actionIconBtnLiked : ''}`} 
          onClick={handleLike} 
          aria-label="Like Episode"
        >
          {isLiked ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      {/* Bottom Card Content Overlay */}
      <div className={styles.cardOverlay}>
        <span className={styles.catBadge}>{episode.category}</span>
        
        <div className={styles.cardHeaderRow}>
          <h3 className={`${styles.titlePill} ${isSelected ? styles.titlePillActive : ''}`}>
            {episode.title}
          </h3>
          <FiMoreVertical className={styles.moreIcon} />
        </div>
      </div>
    </motion.div>
  );
};
