import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaPause } from 'react-icons/fa';
import { FiRadio } from 'react-icons/fi';
import { useAudioPlayer, LIVE_STREAM_URL } from '../../context/AudioPlayerContext';
import heroPresenterImg from '../../assets/Here Presenters.png';
import styles from './Hero.module.css';

const todayShows = [
  {
    id: "e1",
    tag: "06:00 PM",
    subtitle: "ELECTRO / AFRO",
    title: "The Buzz Hour",
    dj: "Olamide Okafor",
    badge: "LIVE SHOW",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "e2",
    tag: "08:00 PM",
    subtitle: "MUSIC & CULTURE",
    title: "Vibe Makers Live",
    dj: "Simi Ogunleye",
    badge: "INTERVIEWS",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "e3",
    tag: "10:00 PM",
    subtitle: "SPECIAL COUNTDOWN",
    title: "Pop Picks Spotlight",
    dj: "DJ Tobi",
    badge: "POP PICKS",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "e4",
    tag: "11:30 PM",
    subtitle: "R&B SESSIONS",
    title: "Midnight Vibes",
    dj: "Kemi Adetiba",
    badge: "R&B",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
  }
];

export const Hero = () => {
  const { isPlaying, togglePlayPause, currentTrack, playTrack } = useAudioPlayer();
  const [slideIndex, setSlideIndex] = useState(0);
  const navigate = useNavigate();

  const maxIndex = Math.max(0, todayShows.length - 3);

  // Format today's date (e.g., "19.08.2026")
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '.');

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  const getSlug = (title) => {
    return title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '';
  };

  const handleLivePlay = () => {
    if (currentTrack?.audioUrl === LIVE_STREAM_URL) {
      togglePlayPause();
    } else {
      playTrack({
        id: "area_fm_live",
        title: "The Fan Zone",
        artist: "Simi Ogunleye",
        showName: "The Fan Zone",
        presenterName: "Simi Ogunleye",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
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
        onClick={() => navigate('/shows')}
        style={{ cursor: 'pointer' }}
      >
        <span className={styles.topRightSongTitle}>
          {currentTrack.showName || currentTrack.title || 'The Fan Zone'}
        </span>
        <span className={styles.topRightArtist}>
          {currentTrack.presenterName || currentTrack.artist || 'Simi Ogunleye'}
        </span>
      </div>

      {/* Hero DJ Image */}
      <div className={styles.heroImageContainer}>
        <img 
          src={heroPresenterImg} 
          alt="Area 93.5 FM Presenter" 
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
              aria-label="Play Live Radio"
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
              {todayShows.map((evt) => (
                <div key={evt.id} className={styles.eventCardItem}>
                  <div 
                    className={styles.eventCard}
                    onClick={() => navigate(`/shows/${getSlug(evt.title)}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img 
                      src={evt.image} 
                      alt={evt.title} 
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
                        <span className={styles.cardTag}>{evt.tag}</span>
                        <span className={styles.cardSubtitle}>{evt.subtitle}</span>
                      </div>

                      {/* Bottom Info */}
                      <div className={styles.cardBottomInfo}>
                        <span className={styles.genreBadge}>{evt.badge}</span>
                        <h3 className={styles.eventTitle}>{evt.title}</h3>
                        <p className={styles.eventDj}>{evt.dj}</p>
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
