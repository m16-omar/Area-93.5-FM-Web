import React from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { FiSkipBack, FiSkipForward, FiVolume2, FiVolumeX, FiList } from 'react-icons/fi';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import styles from './LivePlayer.module.css';

const formatTime = (secs) => {
  if (isNaN(secs)) return '00:00';
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

  return (
    <div className={styles.stickyPlayerContainer}>
      {/* Left Column: Play button & Track Info */}
      <div className={styles.leftControls}>
        <button className={styles.playToggleBtn} onClick={togglePlayPause} aria-label="Toggle Play">
          {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
        </button>
        <img src={currentTrack.image} alt={currentTrack.title} className={styles.trackThumb} />
        <div className={styles.trackMeta}>
          <span className={styles.trackTitle}>{currentTrack.showName || currentTrack.title}</span>
          <span className={styles.trackArtist}>{currentTrack.presenterName || currentTrack.artist}</span>
        </div>
      </div>

      {/* Center Column: Controls & Progress */}
      <div className={styles.centerControls}>
        <button className={styles.skipBtn} aria-label="Previous Track">
          <FiSkipBack />
        </button>
        <button className={styles.skipBtn} aria-label="Next Track">
          <FiSkipForward />
        </button>

        <div className={styles.progressWrapper}>
          <span className={styles.timeText}>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={(e) => seek(Number(e.target.value))}
            className={styles.seekBar}
          />
          <span className={styles.timeText}>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right Column: Volume & Playlist */}
      <div className={styles.rightControls}>
        <button className={styles.volumeBtn} onClick={toggleMute} aria-label="Toggle Volume">
          {isMuted ? <FiVolumeX /> : <FiVolume2 />}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={isMuted ? 0 : volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className={styles.volumeSlider}
        />

        <button className={styles.listToggleBtn} aria-label="Toggle Playlist">
          <FiList />
        </button>
      </div>
    </div>
  );
};
