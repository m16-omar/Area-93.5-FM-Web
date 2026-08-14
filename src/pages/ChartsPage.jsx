import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { FiShoppingBag } from 'react-icons/fi';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import chartsData from '../data/chartsData.json';
import styles from './ChartsPage.module.css';

export const ChartsPage = () => {
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();
  const [tracks, setTracks] = useState(chartsData.slice(0, 5));
  const [userVotes, setUserVotes] = useState({});

  const handleVoteUp = (id) => {
    setTracks(prev =>
      prev.map(t => {
        if (t.id === id) {
          const currentVote = userVotes[id];
          if (currentVote === 'up') return t;
          const voteChange = currentVote === 'down' ? 2 : 1;
          return { ...t, votes: t.votes + voteChange };
        }
        return t;
      })
    );
    setUserVotes(prev => ({ ...prev, [id]: 'up' }));
  };

  const handleVoteDown = (id) => {
    setTracks(prev =>
      prev.map(t => {
        if (t.id === id) {
          const currentVote = userVotes[id];
          if (currentVote === 'down') return t;
          const voteChange = currentVote === 'up' ? -2 : -1;
          return { ...t, votes: t.votes + voteChange };
        }
        return t;
      })
    );
    setUserVotes(prev => ({ ...prev, [id]: 'down' }));
  };

  return (
    <main className={styles.chartsPageContainer}>
      <Navbar />

      <section className={styles.heroSection}>
        {/* Background decorative circles & watermark */}
        <div className={styles.bgCircleBottomLeft} />
        <div className={styles.bgCircleTopRight} />
        <div className={styles.glowCircleTeal} />
        
        <div className={styles.watermarkText}>
          MUSIC CHARTS
        </div>

        {/* 2-Column Content Grid */}
        <div className={styles.chartsGrid}>
          {/* Left Column: Top 5 Tracks List */}
          <div className={styles.trackListCol}>
            {tracks.map((track, idx) => {
              const isSelected = currentTrack?.id === track.id && isPlaying;
              const voteState = userVotes[track.id];

              return (
                <motion.div
                  key={track.id}
                  className={styles.trackCard}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                >
                  {/* Rank & Image Block */}
                  <div className={styles.rankImgBlock}>
                    <img src={track.image} alt={track.title} className={styles.trackImg} />
                    <div className={styles.rankBadge}>{track.rank}</div>
                  </div>

                  {/* Up / Down Vote Counter */}
                  <div className={styles.voteBlock}>
                    <button 
                      onClick={() => handleVoteUp(track.id)}
                      className={`${styles.voteArrowBtn} ${voteState === 'up' ? styles.votedUp : ''}`}
                      aria-label="Vote Up"
                    >
                      <FaChevronUp size={11} />
                    </button>

                    <span className={styles.voteCount}>{track.votes}</span>

                    <button 
                      onClick={() => handleVoteDown(track.id)}
                      className={`${styles.voteArrowBtn} ${voteState === 'down' ? styles.votedDown : ''}`}
                      aria-label="Vote Down"
                    >
                      <FaChevronDown size={11} />
                    </button>
                  </div>

                  {/* Track Meta Details */}
                  <div className={styles.trackMetaInfo}>
                    <h3 className={styles.trackTitle}>{track.title}</h3>
                    <p className={styles.trackArtist}>
                      {track.artist} <span className={styles.trackAlbum}>[{track.album}]</span>
                    </p>
                  </div>

                  {/* Action Play Button */}
                  <button
                    onClick={() => playTrack(track)}
                    className={`${styles.actionBtn} ${isSelected ? styles.actionBtnPlaying : ''}`}
                    aria-label="Play Track"
                  >
                    {isSelected ? <FaPause size={13} /> : <FaPlay size={13} style={{ marginLeft: '2px' }} />}
                  </button>
                </motion.div>
              );
            })}

            {/* Centered Full Tracklist Button */}
            <button className={styles.fullTracklistBtn}>
              FULL TRACKLIST
            </button>
          </div>

          {/* Right Column: Chart of the Week & Top Picks Promo */}
          <div className={styles.chartSidebarCol}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <h1 className={styles.sidebarHeading}>
                CHART OF<br />THE WEEK
              </h1>

              <p className={styles.sidebarDesc}>
                Discover Area 93.5 FM's weekly top 5 music charts. Voted live by our listeners across the city, featuring the hottest viral hits, chart-topping anthems, and exclusive radio releases.
              </p>
            </motion.div>

            {/* Top Picks Chart Card */}
            <motion.div
              className={styles.topPicksCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className={styles.topPicksImgWrapper}>
                <img 
                  src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80" 
                  alt="Top Picks Chart Headphones" 
                  className={styles.topPicksImg} 
                />
                <div className={styles.topPicksWatermark}>
                  MUSIC<br />CHARTS
                </div>
              </div>

              <div className={styles.topPicksFooter}>
                <h3 className={styles.topPicksTitle}>Top Picks Chart</h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <LivePlayer />
    </main>
  );
};
