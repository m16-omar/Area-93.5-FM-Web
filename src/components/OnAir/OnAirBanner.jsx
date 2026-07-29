import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaHeart } from 'react-icons/fa';
import { FiMoreHorizontal, FiClock } from 'react-icons/fi';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import playlistData from '../../data/playlistData.json';
import styles from './OnAirBanner.module.css';

export const OnAirBanner = () => {
  const { playTrack, currentTrack, isPlaying, togglePlayPause } = useAudioPlayer();

  return (
    <section className={styles.onAirSection}>
      {/* Top Watermark Row */}
      <div className={styles.watermarkRow}>
        <div className={styles.logoWatermark}>93.5 AREA FM</div>
        <div className={styles.mottoWatermark}>
          WHERE EVERY<br />
          NOTE CONNECTS
        </div>
        <button className={styles.giantPlayCircle} onClick={togglePlayPause} aria-label="Play Stream">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>

      {/* Grid Content */}
      <div className={styles.contentGrid}>
        {/* Left Column: SHOW ON AIR */}
        <motion.div 
          className={styles.leftCol}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">SHOW ON AIR</span>

          <div className={styles.onAirCard}>
            <img 
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80" 
              alt="Hitmakers Live" 
              className={styles.onAirImage} 
              loading="lazy" 
            />
            <div className={styles.onAirOverlay}>
              <div className={styles.badgeRow}>
                <span className="badge-outline">interviews</span>
                <span className="badge-neon" style={{ background: '#ffffff', color: '#000' }}>Now on air</span>
              </div>

              <h3 className={styles.showTitleHighlight}>Hitmakers Live</h3>
              <p className={styles.presenterText}>Presented by Jordan Carter</p>
              <div className={styles.showTimeText}>
                <FiClock size={14} />
                <span>12:00 pm - 3:00 pm</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: PLAYLIST */}
        <motion.div 
          className={styles.rightCol}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="section-label">PLAYLIST</span>

          <div className={styles.playlistStack}>
            {playlistData.map((item) => {
              const isSelected = currentTrack?.id === item.id && isPlaying;
              return (
                <div key={item.id} className={styles.playlistItem}>
                  <img src={item.image} alt={item.title} className={styles.playlistThumb} loading="lazy" />

                  <div className={styles.playlistMeta}>
                    <h4 className={styles.playlistTitle}>{item.title}</h4>
                    <p className={styles.playlistArtist}>{item.artist}</p>
                  </div>

                  <button 
                    className={styles.actionCircle}
                    onClick={() => playTrack(item)}
                    aria-label={`Play ${item.title}`}
                  >
                    {isSelected ? <FaPause size={10} /> : <FaPlay size={10} />}
                  </button>

                  <button className={styles.actionCircle} aria-label="More Options">
                    <FiMoreHorizontal />
                  </button>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
