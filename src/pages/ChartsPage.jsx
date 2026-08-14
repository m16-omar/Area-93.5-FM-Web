import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { FiMusic, FiEye, FiMessageSquare, FiShare2 } from 'react-icons/fi';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import chartsData from '../data/chartsData.json';
import styles from './ChartsPage.module.css';

const mostListenedTracks = [
  {
    id: "m1",
    title: "Weightless",
    artist: "Fresh Body Shop",
    album: "Weightless Album",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=400&q=80",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
  },
  {
    id: "m2",
    title: "Out Of My Head",
    artist: "Tom Orlando",
    album: "Radio Edit",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
  },
  {
    id: "m3",
    title: "Talk a Little",
    artist: "Samie Bower",
    album: "Pop N' Trap",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
  },
  {
    id: "m4",
    title: "Feelings of Yesterday",
    artist: "ASHWYN",
    album: "Skate Tape",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
  }
];

const allChartsCategories = [
  {
    id: "ac1",
    tag: "TOP PICKS",
    title: "Top Picks Chart",
    date: "January 8, 2026",
    views: "1.2k",
    comments: "24",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ac2",
    tag: "STAR TRACKS",
    title: "Star Tracks Chart",
    date: "January 8, 2026",
    views: "980",
    comments: "18",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ac3",
    tag: "THE BUZZ",
    title: "The Buzz 50 Chart",
    date: "January 8, 2026",
    views: "1.5k",
    comments: "32",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ac4",
    tag: "POP DROP",
    title: "Pop Drop Chart",
    date: "January 8, 2026",
    views: "850",
    comments: "14",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ac5",
    tag: "BEAT",
    title: "Beat Chart",
    date: "January 8, 2026",
    views: "1.1k",
    comments: "19",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ac6",
    tag: "HIT LIST",
    title: "Hit List Chart",
    date: "January 8, 2026",
    views: "2.1k",
    comments: "45",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80"
  }
];

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
          return { ...t, votes: t.votes - voteChange };
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

        {/* SECTION 2: MOST LISTENED TRACKS */}
        <div className={styles.mostListenedSection}>
          <div className={styles.bgCircleMostListened} />

          <div className={styles.sectionCenterHeader}>
            <h2 className={styles.sectionCenterTitle}>MOST LISTENED TRACKS</h2>
          </div>

          <div className={styles.mostListenedGrid}>
            {mostListenedTracks.map((item, idx) => {
              const isSelected = currentTrack?.id === item.id && isPlaying;
              return (
                <motion.div
                  key={item.id}
                  className={styles.mostCard}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <div className={styles.mostImgWrapper}>
                    <img src={item.image} alt={item.title} className={styles.mostImg} />
                    <div className={styles.mostPlayOverlay}>
                      <button 
                        onClick={() => playTrack(item)}
                        className={styles.mostPlayBtn}
                        aria-label="Play Track"
                      >
                        {isSelected ? <FaPause size={14} /> : <FaPlay size={14} style={{ marginLeft: '2px' }} />}
                      </button>
                    </div>
                  </div>

                  <div className={styles.mostCardFooter}>
                    <h4 className={styles.mostTrackTitle}>{item.title} <span style={{ color: '#9CA3AF', fontWeight: 400 }}>[{item.album}]</span></h4>
                    <p className={styles.mostTrackArtist}>{item.artist}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: ALL CHARTS (6 CARDS IN 2 ROWS) */}
        <div className={styles.allChartsSection}>
          <div className={styles.allChartsWatermark}>ALL CHARTS</div>

          <div className={styles.sectionCenterHeader}>
            <h2 className={styles.sectionCenterTitle}>ALL CHARTS</h2>
          </div>

          <div className={styles.allChartsGrid}>
            {allChartsCategories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                className={styles.categoryCard}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className={styles.categoryImgWrapper}>
                  <img src={cat.image} alt={cat.title} className={styles.categoryImg} />
                  <div className={styles.categoryBadgeTag}>{cat.tag}</div>
                  <div className={styles.categoryBadgeIcon}>
                    <FiMusic size={14} />
                  </div>
                  <div className={styles.categoryOverlayWatermark}>
                    MUSIC<br />CHARTS
                  </div>
                </div>

                <div className={styles.categoryFooter}>
                  <h3 className={styles.categoryTitle}>{cat.title}</h3>
                  <div className={styles.categoryMetaRow}>
                    <span>{cat.date}</span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><FiEye size={12} /> {cat.views}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><FiMessageSquare size={11} /> {cat.comments}</span>
                    <span style={{ marginLeft: 'auto' }}><FiShare2 size={12} /></span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <LivePlayer />
    </main>
  );
};
