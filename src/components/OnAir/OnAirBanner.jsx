import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaPause } from 'react-icons/fa';
import { FiMoreHorizontal, FiClock } from 'react-icons/fi';
import { useAudioPlayer, LIVE_STREAM_URL } from '../../context/AudioPlayerContext';
import playlistData from '../../data/playlistData.json';
import styles from './OnAirBanner.module.css';

export const OnAirBanner = () => {
  const { playTrack, currentTrack, isPlaying, togglePlayPause } = useAudioPlayer();
  const navigate = useNavigate();

  const handleLivePlay = () => {
    if (currentTrack?.audioUrl === LIVE_STREAM_URL) {
      togglePlayPause();
    } else {
      playTrack({
        id: "area_fm_live",
        title: "The Fan Zone",
        artist: "Simi Ogunleye",
        showName: "The Fan Zone",
        presenterName: "Simi Ogunleye",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
        audioUrl: LIVE_STREAM_URL,
        isLive: true
      });
    }
  };

  return (
    <section className={styles.onAirSection}>
      {/* Background Glowing Green Orb */}
      <div className={styles.bgGlowOrb} />

      {/* Top Watermark / Brand Banner Row */}
      <div className={styles.watermarkRow}>
        <div className={styles.stationBrandLogo} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <span className={styles.brandNum}>93.5</span>
          <span className={styles.brandText}>AREA</span>
          <span className={styles.brandSub}>FM</span>
        </div>
        <div className={styles.mottoWatermark}>
          ONE VOICE,<br />
          EVERY AREA
        </div>
        <button 
          className={styles.giantPlayCircle} 
          onClick={handleLivePlay} 
          aria-label="Play Live Radio"
        >
          {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} style={{ marginLeft: '4px' }} />}
        </button>
      </div>

      {/* Grid Content: SHOW ON AIR & PLAYLIST */}
      <div className={styles.contentGrid}>
        {/* Left Column: SHOW ON AIR */}
        <motion.div 
          className={styles.leftCol}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div 
            className={styles.headerLabelWrap}
            onClick={() => navigate('/shows/the-fan-zone')}
            style={{ cursor: 'pointer' }}
          >
            <span className={styles.sectionBadge}>SHOW ON AIR</span>
            <span className={styles.sectionLine} />
          </div>

          <div 
            className={styles.onAirCard}
            onClick={() => navigate('/shows/the-fan-zone')}
            style={{ cursor: 'pointer' }}
          >
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" 
              alt="The Fan Zone" 
              className={styles.onAirImage} 
              loading="lazy" 
            />
            <div className={styles.onAirOverlay}>
              <div className={styles.badgeRow}>
                <span className={styles.genreBadge}>INTERVIEWS</span>
                <span className={styles.livePill}>NOW ON AIR</span>
              </div>

              <h3 className={styles.showTitleHighlight}>The Fan Zone</h3>
              <p className={styles.presenterText}>Presented by Simi Ogunleye</p>
              <div className={styles.showTimeText}>
                <FiClock size={13} />
                <span>11:00 am - 02:30 pm</span>
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
          <div 
            className={styles.headerLabelWrap}
            onClick={() => navigate('/charts')}
            style={{ cursor: 'pointer' }}
          >
            <span className={styles.sectionBadge}>PLAYLIST</span>
            <span className={styles.sectionLine} />
          </div>

          <div className={styles.playlistStack}>
            {playlistData.slice(0, 4).map((item) => {
              const isSelected = currentTrack?.id === item.id && isPlaying;
              return (
                <div 
                  key={item.id} 
                  className={styles.playlistItem}
                  onClick={() => playTrack(item)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={item.image} alt={item.title} className={styles.playlistThumb} loading="lazy" />

                  <div className={styles.playlistMeta}>
                    <h4 className={styles.playlistTitle}>{item.title}</h4>
                    <p className={styles.playlistArtist}>{item.artist}</p>
                  </div>

                  <button 
                    className={styles.actionCircle}
                    onClick={(e) => { e.stopPropagation(); playTrack(item); }}
                    aria-label={`Play ${item.title}`}
                  >
                    {isSelected ? <FaPause size={10} /> : <FaPlay size={10} style={{ marginLeft: '1px' }} />}
                  </button>

                  <button 
                    className={styles.moreCircle} 
                    aria-label="View in Charts"
                    onClick={(e) => { e.stopPropagation(); navigate('/charts'); }}
                  >
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
