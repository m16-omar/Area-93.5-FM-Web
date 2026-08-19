import React from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { FiSkipBack, FiSkipForward, FiVolume2, FiVolumeX, FiRadio } from 'react-icons/fi';
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
      {/* Left Column: Play button & Track Info */}
      <div className={styles.leftControls}>
        <button className={styles.playToggleBtn} onClick={togglePlayPause} aria-label="Toggle Play">
          {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
        </button>
        <img src={currentTrack.image} alt={currentTrack.title} className={styles.trackThumb} />
        <div className={styles.trackMeta}>
          <div className={styles.titleRow}>
            <span className={styles.trackTitle}>{currentTrack.showName || currentTrack.title}</span>
            {isLive && <span className={styles.livePill}>LIVE</span>}
          </div>
          <span className={styles.trackArtist}>{currentTrack.presenterName || currentTrack.artist}</span>
        </div>
      </div>

      {/* Center Column: Controls & Progress */}
      <div className={styles.centerControls}>
        {isLive ? (
          <div className={styles.liveStreamCenter}>
            <FiRadio className={styles.radioIcon} />
            <span className={styles.liveStreamText}>
              {isPlaying ? 'STREAMING LIVE ON 93.5 AREA FM' : '93.5 AREA FM — CLICK PLAY TO LISTEN LIVE'}
            </span>
            {isPlaying && (
              <div className={styles.liveEq}>
                <span className={styles.eq1} />
                <span className={styles.eq2} />
                <span className={styles.eq3} />
                <span className={styles.eq4} />
              </div>
            )}
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>

      {/* Right Column: Volume & Controls */}
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
          aria-label="Volume Slider"
        />
      </div>
    </div>
  );
};
