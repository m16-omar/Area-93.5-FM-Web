import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause } from 'react-icons/fa';
import { FiRadio } from 'react-icons/fi';
import { useAudioPlayer, LIVE_STREAM_URL } from '../../context/AudioPlayerContext';
import heroPresenterImg from '../../assets/Here Presenters.png';
import styles from './Hero.module.css';

const todayShows = [
  {
    id: "s1",
    title: "The Fan Zone",
    dj: "Simi Ogunleye",
    time: "11:00",
    period: "AM",
    genre: "INTERVIEWS",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    nowPlaying: true
  },
  {
    id: "s2",
    title: "Lagos Morning Rush",
    dj: "Olamide Okafor",
    time: "06:00",
    period: "AM",
    genre: "MUSIC",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    nowPlaying: false
  },
  {
    id: "s3",
    title: "Afrobeats Reloaded",
    dj: "DJ Tobi",
    time: "04:00",
    period: "PM",
    genre: "CLUB MIX",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
    nowPlaying: false
  },
  {
    id: "s4",
    title: "Midnight Vibes",
    dj: "Kemi Adetiba",
    time: "10:00",
    period: "PM",
    genre: "R&B",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    nowPlaying: false
  },
  {
    id: "s5",
    title: "Pop Culture Replay",
    dj: "Funke Akindele",
    time: "02:30",
    period: "PM",
    genre: "TRENDS",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    nowPlaying: false
  },
  {
    id: "s6",
    title: "The Founders Hour",
    dj: "Babalola Alabi",
    time: "08:00",
    period: "PM",
    genre: "TALK SHOW",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    nowPlaying: false
  }
];

export const Hero = () => {
  const { isPlaying, togglePlayPause, currentTrack, playTrack } = useAudioPlayer();
  const [slideIndex, setSlideIndex] = useState(0);

  const maxIndex = Math.max(0, todayShows.length - 3);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3800);
    return () => clearInterval(interval);
  }, [maxIndex]);

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
      <div className={styles.bgCircleBottomTeal} />

      {/* Top Right Current Host Credit */}
      <div className={styles.topRightHost}>
        <span className={styles.topRightTrack}>The Fan Zone - Right Now</span>
        <span className={styles.topRightHostName}>Simi Ogunleye</span>
      </div>

      {/* Hero Presenter Image Overlay */}
      <div className={styles.heroImageContainer}>
        <img 
          src={heroPresenterImg} 
          alt="93.5 Area FM Presenter" 
          className={styles.heroDjImage} 
        />
        <div className={styles.heroImageOverlay} />
      </div>

      {/* Hero Content Grid */}
      <div className={styles.heroContent}>
        {/* Left Column: Station Typography & Play Button */}
        <motion.div 
          className={styles.leftCol}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.stationLogoBlock}>
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
              {isPlaying ? <FaPause size={28} /> : <FaPlay size={28} style={{ marginLeft: '4px' }} />}
            </button>
            <div className={styles.trackMeta}>
              <span className={styles.trackMetaTitle}>LISTEN LIVE</span>
              <span className={styles.trackMetaArtist}>
                {currentTrack.showName || currentTrack.title || 'The Fan Zone'} — {currentTrack.presenterName || currentTrack.artist || 'Simi Ogunleye'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Floating 3-Card Shows Slider */}
        <motion.div 
          className={styles.rightCol}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.nextEventsHeader}>
            <span className={styles.sectionBadge}>NEXT EVENTS</span>
            <span className={styles.sectionAccentLine} />
          </div>

          <div className={styles.sliderTrackViewport}>
            <motion.div 
              className={styles.sliderTrack}
              animate={{ x: `calc(-${slideIndex} * (33.333% + 4.66px))` }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            >
              {todayShows.map((show) => (
                <div key={show.id} className={styles.eventCardItem}>
                  <div className={styles.eventCard}>
                    <img 
                      src={show.image} 
                      alt={show.title} 
                      className={styles.eventImage} 
                      loading="lazy" 
                    />
                    
                    {/* Top Right Badge Icon */}
                    <div className={styles.cardTopIcon}>
                      <FiRadio size={12} />
                    </div>

                    <div className={styles.eventOverlay}>
                      {/* Date / Time Circle */}
                      <div className={styles.dateCircle}>
                        <span>{show.time}</span>
                        <span>{show.period}</span>
                      </div>

                      <div className={styles.cardBottomInfo}>
                        <span className={styles.genreBadge}>{show.genre}</span>
                        <h3 className={styles.eventTitle}>{show.title}</h3>
                        <p className={styles.eventDj}>{show.dj}</p>
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
