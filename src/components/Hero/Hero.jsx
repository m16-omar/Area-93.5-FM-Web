import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaPause } from 'react-icons/fa';
import { FiRadio } from 'react-icons/fi';
import { useAudioPlayer, LIVE_STREAM_URL } from '../../context/AudioPlayerContext';
import { getCurrentDayKey, getShowsForDay, getCurrentOnAirShow, getShowSlug } from '../../utils/scheduleHelper';
import heroPresenterImg from '../../assets/Here Presenters.png';
import styles from './Hero.module.css';

export const Hero = () => {
  const { isPlaying, togglePlayPause, currentTrack, playTrack } = useAudioPlayer();
  const [slideIndex, setSlideIndex] = useState(0);
  const navigate = useNavigate();

  const currentDayKey = useMemo(() => getCurrentDayKey(), []);
  const todayShows = useMemo(() => getShowsForDay(currentDayKey), [currentDayKey]);
  const activeShow = useMemo(() => getCurrentOnAirShow(), []);

  const maxIndex = Math.max(0, todayShows.length - 3);

  // Format today's date (e.g., "15.09.2026")
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '.');

  useEffect(() => {
    if (maxIndex === 0) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  const handleLivePlay = () => {
    if (currentTrack?.audioUrl === LIVE_STREAM_URL) {
      togglePlayPause();
    } else {
      playTrack({
        id: "area_fm_live",
        title: activeShow.name || activeShow.title || "Midday Vibes",
        artist: activeShow.dj || "Simi Ogunleye",
        showName: activeShow.name || activeShow.title || "Midday Vibes",
        presenterName: activeShow.dj || "Simi Ogunleye",
        image: activeShow.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
        audioUrl: LIVE_STREAM_URL,
        isLive: true
      });
    }
  };

  return (
    <section className={styles.heroSection}>
      {/* Background Graphic Orbs */}
      <div className={styles.bgCircleTopLime} />
      <div className={styles.bgCircleLeftGreen} />

      {/* Top Right Current Track Text */}
      <div 
        className={styles.topRightTrackInfo}
        onClick={() => navigate(`/shows/${getShowSlug(activeShow.name || activeShow.title)}`)}
        style={{ cursor: 'pointer' }}
      >
        <span className={styles.topRightSongTitle}>
          {currentTrack.showName || currentTrack.title || activeShow.name || activeShow.title || 'Midday Vibes'}
        </span>
        <span className={styles.topRightArtist}>
          {currentTrack.presenterName || currentTrack.artist || activeShow.dj || 'Simi Ogunleye'}
        </span>
      </div>

      {/* Hero DJ Image */}
      <div className={styles.heroImageContainer}>
        <img 
          src={heroPresenterImg} 
          alt="Area 93.5 FM Lagos Live Radio Studio Presenters - #1 Pidgin English Radio Station" 
          className={styles.heroDjImage} 
        />
      </div>

      {/* Hero Content Grid */}
      <div className={styles.heroContent}>
        {/* Left Column: Typography & Play Button */}
        <motion.div 
          className={styles.leftCol}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.brandTitleWrap}>
            <span className={styles.logoNumber}>93.5</span>
            <span className={styles.logoText}>AREA</span>
            <span className={styles.logoSub}>FM</span>
          </div>

          <h1 className={styles.heroHeadline}>
            ONE VOICE,<br />
            EVERY AREA
          </h1>

          <div className={styles.giantPlayWrapper}>
            <button 
              className={styles.giantPlayBtn} 
              onClick={handleLivePlay} 
              aria-label="Play Live Radio Area 93.5 FM"
            >
              {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} style={{ marginLeft: '4px' }} />}
            </button>
          </div>
        </motion.div>

        {/* Right Column: TODAY'S SHOWS 3-Card Poster Stream */}
        <motion.div 
          className={styles.rightCol}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div 
            className={styles.nextEventsHeader}
            onClick={() => navigate('/shows')}
            style={{ cursor: 'pointer' }}
          >
            <span className={styles.sectionBadge}>UPCOMING SHOWS • {formattedDate}</span>
            <span className={styles.sectionAccentLine} />
          </div>

          <div className={styles.sliderTrackViewport}>
            <motion.div 
              className={styles.sliderTrack}
              animate={{ x: `calc(-${slideIndex} * (33.333% + 4.66px))` }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            >
              {todayShows.map((evt) => {
                const showTitle = evt.name || evt.title;
                const startTime = evt.time ? evt.time.split('-')[0].trim().toUpperCase() : '';
                return (
                  <div key={evt.id} className={styles.eventCardItem}>
                    <div 
                      className={styles.eventCard}
                      onClick={() => navigate(`/shows/${getShowSlug(showTitle)}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      <img 
                        src={evt.image} 
                        alt={showTitle} 
                        className={styles.eventImage} 
                        loading="lazy" 
                      />
                      
                      {/* Top Right Radio Icon Badge */}
                      <div className={styles.cardTopIcon}>
                        <FiRadio size={11} />
                      </div>

                      <div className={styles.eventOverlay}>
                        {/* Top Tag / Subtitle */}
                        <div className={styles.cardTopMeta}>
                          <span className={styles.cardTag}>{startTime}</span>
                          <span className={styles.cardSubtitle}>{evt.genre || 'GBEDU'}</span>
                        </div>

                        {/* Bottom Info */}
                        <div className={styles.cardBottomInfo}>
                          <span className={styles.genreBadge}>
                            {evt.nowPlaying ? 'NOW STREAMING' : (evt.genre || 'SHOW')}
                          </span>
                          <h3 className={styles.eventTitle}>{showTitle}</h3>
                          <p className={styles.eventDj}>{evt.dj}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
