import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaPlay, FaPause } from 'react-icons/fa';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import topTracksData from '../../data/topTracksData.json';
import styles from './TopTracks.module.css';

export const TopTracks = () => {
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();
  const [tracks, setTracks] = useState(topTracksData.tracks);
  const [votedMap, setVotedMap] = useState({});

  const handleVote = (id) => {
    setTracks(prev =>
      prev.map(t => {
        if (t.id === id) {
          const isVoted = votedMap[id];
          return { ...t, votes: isVoted ? t.votes - 1 : t.votes + 1 };
        }
        return t;
      })
    );
    setVotedMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className={styles.tracksSection} id="charts">
      <div className={styles.tracksGrid}>
        {/* Left Column */}
        <motion.div 
          className={styles.leftCol}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.mainTitle}>
            TOP<br />
            TRACKS
          </h2>

          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>

          <h3 className={styles.subTitle}>Vote for your favourite song!</h3>

          {/* Featured Single Card */}
          <div className={styles.featuredCard}>
            <div className={styles.featuredArtWrapper}>
              <img 
                src={topTracksData.featuredTrack.image} 
                alt={topTracksData.featuredTrack.title} 
                className={styles.featuredImage} 
                loading="lazy" 
              />
              <span className={styles.featuredBadge}>{topTracksData.featuredTrack.badge}</span>
            </div>
            <div className={styles.featuredFooter}>
              <div>
                <h4 className={styles.featuredTitle}>{topTracksData.featuredTrack.title}</h4>
                <p className={styles.featuredArtist}>{topTracksData.featuredTrack.artist}</p>
              </div>
              <button 
                className={`${styles.voteBtn} ${votedMap[topTracksData.featuredTrack.id] ? styles.voted : ''}`}
                onClick={() => handleVote(topTracksData.featuredTrack.id)}
                aria-label="Vote Track"
              >
                <FaHeart />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Track List */}
        <motion.div 
          className={styles.rightCol}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {tracks.map((track) => {
            const isCurrentPlaying = currentTrack?.id === track.id && isPlaying;
            return (
              <div key={track.id} className={styles.trackRowCard}>
                <img src={track.image} alt={track.title} className={styles.trackThumb} loading="lazy" />

                <div className={styles.trackMeta}>
                  <h4 className={styles.trackTitle}>{track.title}</h4>
                  <p className={styles.trackArtist}>{track.artist}</p>
                </div>

                <span className={styles.voteCount}>{track.votes}</span>

                <button 
                  className={`${styles.voteBtn} ${votedMap[track.id] ? styles.voted : ''}`}
                  onClick={() => handleVote(track.id)}
                  aria-label="Vote Track"
                >
                  <FaHeart />
                </button>

                <button 
                  className={styles.voteBtn}
                  onClick={() => playTrack(track)}
                  aria-label="Play Track"
                >
                  {isCurrentPlaying ? <FaPause size={12} /> : <FaPlay size={12} />}
                </button>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
