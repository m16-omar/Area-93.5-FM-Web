import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import eventsData from '../../data/eventsData.json';
import heroPresenterImg from '../../assets/Here Presenters.png';
import styles from './Hero.module.css';

export const Hero = () => {
  const { isPlaying, togglePlayPause, currentTrack } = useAudioPlayer();
  const [slideIndex, setSlideIndex] = useState(0);

  const maxIndex = Math.max(0, eventsData.length - 3);

  const nextSlide = () => {
    setSlideIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setSlideIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

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

        {/* Right Column: Floating Current Shows Slider (z-index: 2) */}
        <motion.div 
          className={styles.rightCol}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.nextEventsHeader}>
            <span className="section-label">CURRENT SHOWS</span>
            <div className={styles.sliderNavControls}>
              <button onClick={prevSlide} className={styles.sliderArrowBtn} aria-label="Previous Shows">
                <FiChevronLeft />
              </button>
              <button onClick={nextSlide} className={styles.sliderArrowBtn} aria-label="Next Shows">
                <FiChevronRight />
              </button>
            </div>
          </div>

          <div className={styles.sliderTrackViewport}>
            <motion.div 
              className={styles.sliderTrack}
              animate={{ x: `calc(-${slideIndex} * (33.333% + 4.66px))` }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            >
              {eventsData.map((ev) => (
                <div key={ev.id} className={styles.eventCardItem}>
                  <div className={styles.eventCard}>
                    <img src={ev.image} alt={ev.title} className={styles.eventImage} loading="lazy" />
                    <div className={styles.eventOverlay}>
                      <div className={styles.dateCircle}>
                        <span>{ev.dateDay}</span>
                        <span>{ev.dateMonth}</span>
                      </div>
                      <div>
                        <span className="badge-outline" style={{ marginBottom: '6px' }}>{ev.badge}</span>
                        <h3 className={styles.eventTitle}>{ev.title}</h3>
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
