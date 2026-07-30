import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause } from 'react-icons/fa';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import heroPresenterImg from '../../assets/Here Presenters.png';
import styles from './Hero.module.css';

const currentShows = [
  {
    id: "s1",
    title: "Morning Vibe Blast",
    dj: "Jordan Carter",
    time: "06:00",
    period: "AM",
    genre: "Interviews",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "s2",
    title: "Urban Beats & Rhythms",
    dj: "Elena Vance",
    time: "10:00",
    period: "AM",
    genre: "Music",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "s3",
    title: "Sunset Chillout Sessions",
    dj: "Marcus Sterling",
    time: "02:00",
    period: "PM",
    genre: "Trends",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "s4",
    title: "Hitmakers Live",
    dj: "Jordan Carter",
    time: "06:00",
    period: "PM",
    genre: "Live Show",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "s5",
    title: "Top 10 Countdown",
    dj: "Lucas Ruiz",
    time: "08:00",
    period: "PM",
    genre: "Charts",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "s6",
    title: "Friday Party Starter",
    dj: "DJ Pulse",
    time: "10:00",
    period: "PM",
    genre: "Club Mix",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80"
  }
];

export const Hero = () => {
  const { isPlaying, togglePlayPause, currentTrack } = useAudioPlayer();
  const [slideIndex, setSlideIndex] = useState(0);

  const maxIndex = Math.max(0, currentShows.length - 3);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  return (
    <section className={styles.heroSection}>
      {/* Background circles */}
      <div className={styles.bgCircle1} />
      <div className={styles.bgCircle2} />

      {/* Hero Image Absolute Container (z-index: 1) */}
      <div className={styles.heroImageContainer}>
        <img 
          src={heroPresenterImg} 
          alt="93.5 Area FM Presenter" 
          className={styles.heroDjImage} 
        />
        <div className={styles.heroImageOverlay} />
      </div>

      {/* Hero Foreground Content */}
      <div className={styles.heroContent}>
        {/* Left Column: Hero Text (z-index: 3) & Play Button (z-index: 4) */}
        <motion.div 
          className={styles.leftCol}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.logoWatermark}>93.5 AREA FM</div>
          
          <h1 className={styles.heroHeadline}>
            WHERE EVERY<br />
            NOTE CONNECTS
          </h1>

          <div className={styles.giantPlayWrapper}>
            <button className={styles.giantPlayBtn} onClick={togglePlayPause} aria-label="Play Radio">
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <div className={styles.trackMeta}>
              <span className={styles.trackMetaTitle}>{currentTrack.title}</span>
              <span className={styles.trackMetaArtist}>{currentTrack.artist}</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Floating Current Shows Auto-Slider (z-index: 2) */}
        <motion.div 
          className={styles.rightCol}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.nextEventsHeader}>
            <span className="section-label">CURRENT SHOWS</span>
          </div>

          <div className={styles.sliderTrackViewport}>
            <motion.div 
              className={styles.sliderTrack}
              animate={{ x: `calc(-${slideIndex} * (33.333% + 4.66px))` }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            >
              {currentShows.map((show) => (
                <div key={show.id} className={styles.eventCardItem}>
                  <div className={styles.eventCard}>
                    <img src={show.image} alt={show.title} className={styles.eventImage} loading="lazy" />
                    <div className={styles.eventOverlay}>
                      <div className={styles.dateCircle}>
                        <span>{show.time}</span>
                        <span>{show.period}</span>
                      </div>
                      <div>
                        <span className="badge-outline" style={{ marginBottom: '6px' }}>{show.genre}</span>
                        <h3 className={styles.eventTitle}>{show.title}</h3>
                        <p style={{ fontSize: '0.75rem', color: '#D1D5DB', marginTop: '2px', fontWeight: 600 }}>{show.dj}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
