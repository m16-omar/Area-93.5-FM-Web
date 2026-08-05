import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiClock, FiUser, FiShare2 } from 'react-icons/fi';
import { FaPlay, FaPause } from 'react-icons/fa';
import { LiveIndicator } from './LiveIndicator';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import styles from './ShowCard.module.css';

export const ShowCard = ({ show }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isPlaying, togglePlayPause } = useAudioPlayer();

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: show.title,
        text: `Listen to ${show.title} with ${show.presenter} on Area 93.5 FM!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Show link copied to clipboard!');
    }
  };

  return (
    <div className={`${styles.showCard} ${show.isLive ? styles.showCardLive : ''}`}>
      {/* Closed Header View */}
      <div className={styles.cardHeader} onClick={() => setIsExpanded(!isExpanded)}>
        <div className={styles.thumbnailWrapper}>
          <img src={show.thumbnail} alt={show.title} className={styles.thumbnail} />
        </div>

        <div className={styles.headerMain}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className={styles.categoryBadge}>{show.category}</span>
            {show.isLive && <LiveIndicator />}
          </div>

          <h3 className={styles.title}>{show.title}</h3>

          <div className={styles.metaRow}>
            <span className={styles.metaItem}>
              <FiUser size={13} style={{ color: 'var(--primary-orange)' }} /> {show.presenter}
            </span>
            <span className={styles.metaItem}>
              <FiClock size={13} style={{ color: 'var(--primary-orange)' }} /> {show.startTime} - {show.endTime} ({show.duration})
            </span>
          </div>
        </div>

        <button 
          className={`${styles.expandBtn} ${isExpanded ? styles.expandBtnActive : ''}`}
          aria-label="Toggle Details"
        >
          <FiChevronDown />
        </button>
      </div>

      {/* Expanded Details Body */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{ overflow: 'hidden' }}
          >
            <div className={styles.cardExpandedBody}>
              <div className={styles.expandedGrid}>
                {/* Left Description & Metadata */}
                <div>
                  <p className={styles.fullDesc}>{show.fullDescription || show.description}</p>
                  
                  <div className={styles.detailsList}>
                    <div className={styles.detailBox}>
                      <span className={styles.detailLabel}>Genre</span>
                      <span className={styles.detailValue}>{show.genre || 'General Radio'}</span>
                    </div>
                    <div className={styles.detailBox}>
                      <span className={styles.detailLabel}>Language</span>
                      <span className={styles.detailValue}>{show.language || 'English'}</span>
                    </div>
                    <div className={styles.detailBox}>
                      <span className={styles.detailLabel}>Target Audience</span>
                      <span className={styles.detailValue}>{show.targetAudience || 'General Audience'}</span>
                    </div>
                    <div className={styles.detailBox}>
                      <span className={styles.detailLabel}>Air Time</span>
                      <span className={styles.detailValue}>{show.startTime} - {show.endTime}</span>
                    </div>
                  </div>
                </div>

                {/* Right Presenter Card */}
                <div className={styles.presenterProfileBox}>
                  <img 
                    src={show.presenterPhoto || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'} 
                    alt={show.presenter} 
                    className={styles.presenterAvatar} 
                  />
                  <h4 className={styles.presenterName}>{show.presenter}</h4>
                  <span className={styles.presenterRole}>{show.presenterRole || 'On-Air Personality'}</span>

                  <div className={styles.actionButtonsRow}>
                    <button className={styles.listenNowBtn} onClick={togglePlayPause}>
                      {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} />}
                      <span>{isPlaying ? 'PAUSE' : 'LISTEN LIVE'}</span>
                    </button>
                    <button className={styles.shareBtn} onClick={handleShare} aria-label="Share">
                      <FiShare2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
