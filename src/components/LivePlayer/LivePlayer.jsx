import React from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { FiSkipBack, FiSkipForward, FiVolume2, FiVolumeX, FiFolder } from 'react-icons/fi';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import styles from './LivePlayer.module.css';

const formatTime = (secs) => {
  if (isNaN(secs) || !isFinite(secs)) return '00:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
};

export const LivePlayer = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    togglePlayPause,
    seek,
    setVolume,
    toggleMute
  } = useAudioPlayer();

  const isLive = currentTrack?.isLive || !isFinite(duration) || duration === 0;

  return (
    <div className={styles.stickyPlayerContainer}>
      {/* Left Section: Play Button, Track Meta, Thumbnail, Prev/Next & Folder Icon */}
      <div className={styles.leftControls}>
        <button className={styles.playToggleBtn} onClick={togglePlayPause} aria-label="Toggle Play">
          {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} style={{ marginLeft: '1px' }} />}
        </button>

        <div className={styles.trackMeta}>
          <span className={styles.trackTitle}>{currentTrack.showName || currentTrack.title}</span>
          <span className={styles.trackArtist}>{currentTrack.presenterName || currentTrack.artist}</span>
        </div>

        <img src={currentTrack.image} alt={currentTrack.title} className={styles.trackThumb} />

        <button className={styles.skipBtn} aria-label="Previous Track">
          <FiSkipBack size={13} />
        </button>
        <button className={styles.skipBtn} aria-label="Next Track">
          <FiSkipForward size={13} />
        </button>
        <button className={styles.folderBtn} aria-label="Playlist">
          <FiFolder size={13} />
        </button>
      </div>

      {/* Center Section: Time / Live Indicator */}
      <div className={styles.centerControls}>
        <span className={styles.timeText}>{isLive ? '00:00' : formatTime(currentTime)}</span>
      </div>

      {/* Right Section: Volume Toggle */}
      <div className={styles.rightControls}>
        <button className={styles.volumeBtn} onClick={toggleMute} aria-label="Toggle Volume">
          {isMuted ? <FiVolumeX size={15} /> : <FiVolume2 size={15} />}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={isMuted ? 0 : volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className={styles.volumeSlider}
          aria-label="Volume Slider"
        />
      </div>
    </div>
  );
};
