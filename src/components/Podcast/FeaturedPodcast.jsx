import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaInstagram, FaTwitter, FaYoutube, FaSpotify, FaTiktok } from 'react-icons/fa';
import { FiCalendar, FiArrowRight } from 'react-icons/fi';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import podcastData from '../../data/podcastData.json';
import styles from './FeaturedPodcast.module.css';

export const FeaturedPodcast = () => {
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();

  return (
    <section className={styles.podcastSection} id="podcast">
      <div className={styles.podcastGrid}>
        {/* Left Column */}
        <motion.div 
          className={styles.leftCol}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.mainTitle}>
            FEATURED<br />
            PODCAST
          </h2>

          <p className={styles.description}>
            Tune in to our weekly flagship podcast sessions exploring the hottest music trends, exclusive artist interviews, and top 10 chart breakdowns with your favorite hosts.
          </p>

          {/* Listen Live Table */}
          <div className={styles.listenLiveSection}>
            <div className={styles.tableHeader}>
              <span className="section-label">LISTEN LIVE</span>
            </div>

            <div className={styles.scheduleTable}>
              {podcastData.listenLive.map((item, idx) => (
                <div key={idx} className={styles.scheduleRow}>
                  <div className={styles.dayCell}>{item.day}</div>
                  <div className={styles.timeCell}>
                    <span>{item.start}</span>
                    <FiArrowRight size={14} />
                    <span>{item.end}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hosted By */}
          <div className={styles.hostedSection}>
            <div className={styles.tableHeader}>
              <span className="section-label">HOSTED BY</span>
            </div>

            <div className={styles.hostCard}>
              <img src={podcastData.host.image} alt={podcastData.host.name} className={styles.hostImage} loading="lazy" />
              <div className={styles.hostOverlay}>
                <span className="badge-neon" style={{ background: 'var(--color-primary)', color: '#000' }}>
                  {podcastData.host.role}
                </span>
                <h3 className={styles.hostName}>{podcastData.host.name}</h3>
                <div className={styles.hostSocials}>
                  <a href="#" className={styles.socialIconBtn} aria-label="Instagram"><FaInstagram /></a>
                  <a href="#" className={styles.socialIconBtn} aria-label="Twitter"><FaTwitter /></a>
                  <a href="#" className={styles.socialIconBtn} aria-label="YouTube"><FaYoutube /></a>
                  <a href="#" className={styles.socialIconBtn} aria-label="Spotify"><FaSpotify /></a>
                  <a href="#" className={styles.socialIconBtn} aria-label="TikTok"><FaTiktok /></a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Podcast Episode Cards */}
        <motion.div 
          className={styles.rightCol}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {podcastData.episodes.map((ep) => {
            const isSelected = currentTrack?.id === ep.id && isPlaying;
            return (
              <div key={ep.id} className={styles.episodeCard}>
                <div className={styles.episodeArtWrapper}>
                  <img src={ep.image} alt={ep.title} className={styles.episodeArtBg} loading="lazy" />
                  <button 
                    className={styles.playCircleBtn} 
                    onClick={() => playTrack(ep)}
                    aria-label={`Play ${ep.title}`}
                  >
                    {isSelected ? <FaPause /> : <FaPlay />}
                  </button>
                </div>

                <div className={styles.episodeInfo}>
                  <h3 className={styles.episodeTitle}>{ep.title}</h3>
                  <div className={styles.episodeDate}>
                    <FiCalendar size={13} />
                    <span>{ep.date}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
