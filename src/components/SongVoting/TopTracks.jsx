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
      {/* Background Glow Orb */}
      <div className={styles.bgGlowOrb} />

      <div className={styles.tracksGrid}>
        {/* Column 1: Title & Voting Intro */}
        <motion.div 
          className={styles.introCol}
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
            Have your say in the weekly Area 93.5 FM charts! Vote for your favorite tracks and hear them spun during our flagship weekend countdown.
          </p>

          <h3 className={styles.subTitle}>Vote for your favourite song!</h3>
        </motion.div>

        {/* Column 2: Featured Single Large Square Card */}
        <motion.div 
          className={styles.featuredCol}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
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
              <div className={styles.featuredMeta}>
                <h4 className={styles.featuredTitle}>{topTracksData.featuredTrack.title}</h4>
                <p className={styles.featuredArtist}>{topTracksData.featuredTrack.artist}</p>
              </div>
              <button 
                className={`${styles.featuredVoteBtn} ${votedMap[topTracksData.featuredTrack.id] ? styles.voted : ''}`}
                onClick={() => handleVote(topTracksData.featuredTrack.id)}
                aria-label="Vote Featured Track"
              >
                <FaHeart size={14} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Column 3: Stacked List of 5 Tracks */}
        <motion.div 
          className={styles.listCol}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {tracks.slice(0, 5).map((track) => {
            const isCurrentPlaying = currentTrack?.id === track.id && isPlaying;
            return (
              <div key={track.id} className={styles.trackRowCard}>
                <img 
                  src={track.image} 
                  alt={track.title} 
                  className={styles.trackThumb} 
                  loading="lazy" 
                />

                <div className={styles.trackMeta}>
                  <h4 className={styles.trackTitle}>{track.title}</h4>
                  <p className={styles.trackArtist}>{track.artist}</p>
                </div>

                <button 
                  className={`${styles.voteBtn} ${votedMap[track.id] ? styles.voted : ''}`}
                  onClick={() => handleVote(track.id)}
                  aria-label="Vote Track"
                >
                  <FaHeart size={13} />
                </button>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
