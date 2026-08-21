import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaPause, FaInstagram, FaTwitter, FaYoutube, FaSpotify, FaTiktok } from 'react-icons/fa';
import { FiCalendar, FiArrowRight, FiUser } from 'react-icons/fi';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import styles from './FeaturedPodcast.module.css';

const podcastEpisodes = [
  {
    id: "ep1",
    title: "Top 10 Countdown #4",
    artist: "Tobi Adebayo",
    date: "March 4, 2026",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
  },
  {
    id: "ep2",
    title: "Top 10 Countdown #3",
    artist: "Tobi Adebayo",
    date: "March 4, 2026",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
  },
  {
    id: "ep3",
    title: "Top 10 Countdown #2",
    artist: "Tobi Adebayo",
    date: "March 4, 2026",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
  },
  {
    id: "ep4",
    title: "Top 10 Countdown #1",
    artist: "Tobi Adebayo",
    date: "January 3, 2026",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
  }
];

const listenLiveSchedule = [
  { day: "TUESDAY", start: "3:00 PM", end: "9:00 PM" },
  { day: "FRIDAY", start: "12:00 AM", end: "4:30 AM" },
  { day: "SUNDAY", start: "5:00 PM", end: "9:30 PM" }
];

export const FeaturedPodcast = () => {
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();
  const navigate = useNavigate();

  return (
    <section className={styles.podcastSection} id="podcast">
      {/* Background Graphic Orb matching screenshot 3 */}
      <div className={styles.bgCircleGreen} />

      <div className={styles.podcastGrid}>
        {/* Left Column */}
        <motion.div 
          className={styles.leftCol}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            className={styles.mainTitle} 
            onClick={() => navigate('/podcasts')} 
            style={{ cursor: 'pointer' }}
          >
            FEATURED<br />
            PODCAST
          </h2>

          <p className={styles.description}>
            Catch up on exclusive behind-the-scenes conversations, countdown specials, and unfiltered interviews with Africa's biggest afrobeat stars.
          </p>

          {/* Listen Live Table */}
          <div className={styles.listenLiveSection}>
            <div 
              className={styles.tableHeader} 
              onClick={() => navigate('/shows')} 
              style={{ cursor: 'pointer' }}
            >
              <span className={styles.sectionLabel}>LISTEN LIVE</span>
            </div>

            <div className={styles.scheduleTable}>
              {listenLiveSchedule.map((item, idx) => (
                <div 
                  key={idx} 
                  className={styles.scheduleRow} 
                  onClick={() => navigate('/shows')}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={styles.dayCell}>{item.day}</div>
                  <div className={styles.timeCell}>
                    <span>{item.start}</span>
                    <FiArrowRight size={13} className={styles.arrowIcon} />
                    <span>{item.end}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hosted By Host Card */}
          <div className={styles.hostedSection}>
            <div 
              className={styles.tableHeader} 
              onClick={() => navigate('/hosts/dj-tobi')} 
              style={{ cursor: 'pointer' }}
            >
              <span className={styles.sectionLabel}>HOSTED BY</span>
            </div>

            <div 
              className={styles.hostCard}
              onClick={() => navigate('/hosts/dj-tobi')}
              style={{ cursor: 'pointer' }}
            >
              <img 
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80" 
                alt="Tobi Adebayo" 
                className={styles.hostImage} 
                loading="lazy" 
              />
              
              <div className={styles.avatarIconBadge}>
                <FiUser size={13} />
              </div>

              <div className={styles.hostOverlay}>
                <span className={styles.hostRoleBadge}>Host</span>
                <h3 className={styles.hostName}>Tobi Adebayo</h3>
                <div className={styles.hostSocials}>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIconBtn} aria-label="Instagram" onClick={(e) => e.stopPropagation()}><FaInstagram /></a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialIconBtn} aria-label="Twitter" onClick={(e) => e.stopPropagation()}><FaTwitter /></a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.socialIconBtn} aria-label="YouTube" onClick={(e) => e.stopPropagation()}><FaYoutube /></a>
                  <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" className={styles.socialIconBtn} aria-label="Spotify" onClick={(e) => e.stopPropagation()}><FaSpotify /></a>
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className={styles.socialIconBtn} aria-label="TikTok" onClick={(e) => e.stopPropagation()}><FaTiktok /></a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - 2x2 Podcast Episode Cards with Yellow Header & Circular Cutout */}
        <motion.div 
          className={styles.rightCol}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {podcastEpisodes.map((ep) => {
            const isSelected = currentTrack?.id === ep.id && isPlaying;

            return (
              <div 
                key={ep.id} 
                className={styles.episodeCard}
                onClick={() => playTrack(ep)}
                style={{ cursor: 'pointer' }}
              >
                {/* Yellow Header with Circular Avatar Cutout */}
                <div className={styles.episodeHeaderBg}>
                  <div className={styles.avatarCircleWrap}>
                    <img src={ep.avatar} alt={ep.title} className={styles.avatarCircleImg} />
                    <button 
                      className={styles.playCircleBtn} 
                      onClick={(e) => { e.stopPropagation(); playTrack(ep); }}
                      aria-label={`Play ${ep.title}`}
                    >
                      {isSelected ? <FaPause size={14} /> : <FaPlay size={14} style={{ marginLeft: '2px' }} />}
                    </button>
                  </div>
                </div>

                {/* White Card Body */}
                <div className={styles.episodeInfo}>
                  <h3 className={styles.episodeTitle}>{ep.title}</h3>
                  <div className={styles.episodeDate}>
                    <FiCalendar size={12} className={styles.calendarIcon} />
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
