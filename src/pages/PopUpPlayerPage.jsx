import React from 'react';
import { FaPlay, FaPause, FaInstagram, FaYoutube, FaSpotify } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiVolume2, FiVolumeX, FiRadio } from 'react-icons/fi';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import styles from './PopUpPlayerPage.module.css';

export const PopUpPlayerPage = () => {
  const {
    currentTrack,
    isPlaying,
    volume,
    isMuted,
    togglePlayPause,
    setVolume,
    toggleMute,
  } = useAudioPlayer();

  return (
    <div className={styles.popupContainer}>
      {/* Top Header */}
      <header className={styles.popupHeader}>
        <div className={styles.brandWrap}>
          <FiRadio size={20} color="#E50914" />
          <h1 className={styles.brandTitle}>93.5 AREA FM</h1>
        </div>
        <div className={styles.liveBadge}>
          <span className={styles.liveDot} />
          <span>ON AIR</span>
        </div>
      </header>

      {/* Main Player Body */}
      <main className={styles.playerBody}>
        {/* Big Artwork */}
        <div className={styles.artworkContainer}>
          <img
            src={
              currentTrack?.image ||
              'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
            }
            alt={currentTrack?.showName || 'Area 93.5 FM Live'}
            className={`${styles.artworkImg} ${isPlaying ? styles.artworkImgPlaying : ''}`}
          />
          {isPlaying && (
            <div className={styles.artworkOverlay}>
              <div className={styles.equalizerWave}>
                <span className={styles.eqBar} />
                <span className={styles.eqBar} />
                <span className={styles.eqBar} />
                <span className={styles.eqBar} />
                <span className={styles.eqBar} />
              </div>
            </div>
          )}
        </div>

        {/* Track / Show Info */}
        <span className={styles.trackTag}>LIVE BROADCAST</span>
        <h2 className={styles.showTitle}>
          {currentTrack?.showName || currentTrack?.title || 'The Fan Zone'}
        </h2>
        <p className={styles.presenterName}>
          Host: {currentTrack?.presenterName || currentTrack?.artist || 'Simi Ogunleye'}
        </p>

        {/* Play/Pause Button */}
        <div className={styles.mainControlsRow}>
          <button
            className={styles.bigPlayBtn}
            onClick={togglePlayPause}
            aria-label={isPlaying ? 'Pause broadcast' : 'Play live broadcast'}
          >
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} style={{ marginLeft: '3px' }} />}
          </button>
        </div>

        {/* Volume Controls */}
        <div className={styles.volumeRow}>
          <button className={styles.volumeBtn} onClick={toggleMute} aria-label="Toggle mute">
            {isMuted || volume === 0 ? <FiVolumeX /> : <FiVolume2 />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className={styles.volumeSlider}
            aria-label="Volume control"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.popupFooter}>
        <span className={styles.stationFreq}>93.5 FM · LAGOS</span>
        <div className={styles.footerActions}>
          <a href="https://www.instagram.com/935areafm/" target="_blank" rel="noreferrer" className={styles.socialMiniLink} aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://x.com/935areafm" target="_blank" rel="noreferrer" className={styles.socialMiniLink} aria-label="X">
            <FaXTwitter />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className={styles.socialMiniLink} aria-label="YouTube">
            <FaYoutube />
          </a>
          <a href="https://spotify.com" target="_blank" rel="noreferrer" className={styles.socialMiniLink} aria-label="Spotify">
            <FaSpotify />
          </a>
        </div>
      </footer>
    </div>
  );
};
