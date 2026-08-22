import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaPause, FaFacebookF, FaInstagram, FaYoutube, FaSpotify, FaShareAlt } from 'react-icons/fa';
import { FiMoreVertical, FiEye, FiMessageSquare, FiMail, FiPhone } from 'react-icons/fi';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import styles from './Podcasts.module.css';

const relatedPodcastsList = [
  {
    id: "rel-1",
    title: "Hit Play Stories",
    presenter: "Jordan Carter",
    genre: "Stories",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
  },
  {
    id: "rel-2",
    title: "Rhythm Roundtable",
    presenter: "Simi Ogunleye",
    genre: "Music",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
  },
  {
    id: "rel-3",
    title: "Beat Breakdown",
    presenter: "DJ Tobi",
    genre: "Production",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
  }
];

const allPodcastsData = [
  {
    id: "all-1",
    title: "Beat Breakdown",
    category: "Music",
    presenter: "DJ Tobi",
    date: "January 8, 2026",
    views: "1.2k",
    comments: "24",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
  },
  {
    id: "all-2",
    title: "Hit Play Stories",
    category: "Stories",
    presenter: "Jordan Carter",
    date: "January 8, 2026",
    views: "980",
    comments: "18",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
  },
  {
    id: "all-3",
    title: "Rhythm Roundtable",
    category: "Trendy",
    presenter: "Simi Ogunleye",
    date: "January 8, 2026",
    views: "1.5k",
    comments: "32",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
  },
  {
    id: "all-4",
    title: "Mic Drop",
    category: "Gossip",
    presenter: "Funke Akindele",
    date: "January 8, 2026",
    views: "2.1k",
    comments: "45",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
  },
  {
    id: "all-5",
    title: "Afrobeats Reloaded",
    category: "Music",
    presenter: "Olamide Okafor",
    date: "January 5, 2026",
    views: "1.8k",
    comments: "29",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
  },
  {
    id: "all-6",
    title: "Late Night Confessions",
    category: "Lifestyle",
    presenter: "Kemi Adetiba",
    date: "January 3, 2026",
    views: "1.4k",
    comments: "21",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
  },
  {
    id: "all-7",
    title: "The Fan Zone Podcast",
    category: "Sports",
    presenter: "Simi Ogunleye",
    date: "January 2, 2026",
    views: "3.2k",
    comments: "64",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
  },
  {
    id: "all-8",
    title: "Street Talk Lagos",
    category: "Culture",
    presenter: "Babalola Alabi",
    date: "December 28, 2025",
    views: "2.7k",
    comments: "50",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
  }
];

export const Podcasts = () => {
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();
  const [visibleCount, setVisibleCount] = useState(4);
  const navigate = useNavigate();

  const featuredLeftTrack = {
    id: "feat-left-1",
    title: "Beat Breakdown",
    artist: "DJ Tobi",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
  };

  const featuredRightTrack = {
    id: "feat-right-1",
    title: "Behind the Lens",
    artist: "Area 93.5 FM Special",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
  };

  const scrollToAll = () => {
    const el = document.getElementById('all-podcasts');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => (prev < allPodcastsData.length ? prev + 4 : 4));
  };

  return (
    <main className={styles.podcastsPageContainer}>
      <Navbar />

      {/* 1. HERO BANNER SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.heroWatermarkBg} />
        <div className={styles.watermarkText}>
          PODCASTS
        </div>

        <div className={styles.heroContentGrid}>
          {/* Left Column: Typography & Action Button */}
          <motion.div 
            className={styles.heroLeftCol}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={styles.heroTitle}>
              PODCASTS<br />
              EPISODES
            </h1>

            <p className={styles.heroDesc}>
              Catch up on exclusive behind-the-scenes conversations, countdown specials, and unfiltered interviews with Africa's biggest afrobeat stars.
            </p>

            <button className={styles.discoverBtn} onClick={scrollToAll}>
              DISCOVER ALL
            </button>
          </motion.div>

          {/* Right Column: Studio Mic & Presenter Card */}
          <motion.div 
            className={styles.heroRightCol}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className={styles.heroRightCard}>
              <img 
                src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80" 
                alt="Podcasts Episodes Presenter" 
                className={styles.heroRightImg} 
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURED PODCAST DUAL SHOWCASE SECTION */}
      <section className={styles.featuredSection}>
        <div className={styles.featuredDualGrid}>
          {/* Left Card: White Featured Podcast Box */}
          <motion.div 
            className={styles.featuredWhiteCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h2 className={styles.featuredWhiteTitle}>
                FEATURED<br />PODCAST
              </h2>
              <p className={styles.featuredWhiteDesc}>
                Exclusive deep dives into track production, studio secrets, and artist journeys on 93.5 Area FM.
              </p>
            </div>

            <div 
              className={styles.featuredPillBar}
              onClick={() => playTrack(featuredLeftTrack)}
            >
              <div className={styles.pillBadgeBox}>
                <span>POD</span>
                <span>CAST</span>
              </div>
              <span className={styles.pillTitleText}>Beat Breakdown</span>
              <div className={styles.pillPlayIcon}>
                {currentTrack?.id === featuredLeftTrack.id && isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
              </div>
            </div>
          </motion.div>

          {/* Right Card: Dark Cinematic Behind the Lens Card */}
          <motion.div 
            className={styles.featuredCinematicCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            onClick={() => playTrack(featuredRightTrack)}
          >
            <img 
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80" 
              alt="Behind the Lens" 
              className={styles.cinematicBgImg} 
            />

            <div className={styles.cinematicOverlay}>
              <span className={styles.cinematicTag}>Commercial</span>
              
              <div className={styles.giantCenterPlay}>
                {currentTrack?.id === featuredRightTrack.id && isPlaying ? <FaPause size={22} /> : <FaPlay size={22} style={{ marginLeft: '4px' }} />}
              </div>

              <h3 className={styles.cinematicBottomTitle}>Behind the Lens</h3>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. RELATED PODCASTS SECTION */}
      <section className={styles.relatedSection}>
        <div className={styles.relatedHeader}>
          <span className={styles.relatedBadge}>RELATED PODCASTS</span>
          <div className={styles.relatedAccentLine} />
        </div>

        <div className={styles.relatedCardsGrid}>
          {relatedPodcastsList.map((item, idx) => (
            <motion.div 
              key={item.id} 
              className={styles.relatedCard}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onClick={() => playTrack(item)}
            >
              <div className={styles.relatedArtworkWrapper}>
                <img src={item.image} alt={item.title} className={styles.relatedArtworkImg} />
                
                <div className={styles.boldPodGraphic}>
                  <span className={styles.podTextTop}>POD</span>
                  <span className={styles.podTextSub}>PODCASTS</span>
                  <span className={styles.podTextBottom}>CAST</span>
                </div>
              </div>

              <div className={styles.relatedCardFooter}>
                <h3 className={styles.relatedCardTitle}>{item.title}</h3>
                <button 
                  className={styles.relatedMoreBtn}
                  onClick={(e) => { e.stopPropagation(); playTrack(item); }}
                  aria-label="Play Podcast"
                >
                  <FiMoreVertical size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. ALL PODCASTS BIG GOLDEN CONTAINER */}
      <section className={styles.allPodcastsSection} id="all-podcasts">
        <motion.div 
          className={styles.goldenContainer}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.allPodcastsTitle}>ALL PODCASTS</h2>

          <div className={styles.allPodcastsGrid}>
            {allPodcastsData.slice(0, visibleCount).map((ep, idx) => {
              const isSelected = currentTrack?.id === ep.id && isPlaying;

              return (
                <motion.div 
                  key={ep.id} 
                  className={styles.allPodCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: (idx % 4) * 0.08 }}
                  onClick={() => playTrack(ep)}
                >
                  <div className={styles.allPodArtWrapper}>
                    <img src={ep.image} alt={ep.title} className={styles.allPodArtImg} />
                    
                    <div className={styles.boldPodGraphic}>
                      <span className={styles.podTextTop} style={{ fontSize: '3rem' }}>POD</span>
                      <span className={styles.podTextSub} style={{ fontSize: '0.8rem' }}>PODCASTS</span>
                      <span className={styles.podTextBottom} style={{ fontSize: '3rem' }}>CAST</span>
                    </div>

                    <div className={styles.allPodPlayCircle}>
                      {isSelected ? <FaPause size={10} /> : <FaPlay size={10} style={{ marginLeft: '1px' }} />}
                    </div>
                  </div>

                  <div className={styles.allPodInfoBody}>
                    <span className={styles.genreOutlineTag}>{ep.category}</span>
                    <h3 className={styles.allPodCardTitle}>{ep.title}</h3>
                    
                    <div className={styles.allPodMetaRow}>
                      <span>{ep.date}</span>
                      <span>•</span>
                      <span><FiEye size={11} /> {ep.views}</span>
                      <span><FiMessageSquare size={10} /> {ep.comments}</span>
                      <span className={styles.allPodMetaShare} onClick={(e) => { e.stopPropagation(); }}>
                        <FaShareAlt size={11} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className={styles.loadMoreWrapper}>
            <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
              {visibleCount >= allPodcastsData.length ? 'SHOW LESS' : 'LOAD MORE'}
            </button>
          </div>
        </motion.div>
      </section>

      {/* 5. CONTACT & PROMO BANNER SECTION */}
      <section className={styles.promoContactSection}>
        <div className={styles.promoContactCard}>
          {/* Left Yellow Contact Block */}
          <div className={styles.promoContactLeft}>
            <span className={styles.scriptWatermark}>Contact Us</span>
            
            <div className={styles.contactInfoList}>
              <a href="mailto:info@935areafm.com" className={styles.contactInfoRow}>
                <FiMail size={16} />
                <span>info@935areafm.com</span>
              </a>
              <a href="tel:+2348099358000" className={styles.contactInfoRow}>
                <FiPhone size={16} />
                <span>+234 809 935 8000</span>
              </a>
            </div>

            <div className={styles.promoSocialRow}>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className={styles.promoSocialIcon} aria-label="Facebook"><FaFacebookF /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.promoSocialIcon} aria-label="Instagram"><FaInstagram /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className={styles.promoSocialIcon} aria-label="YouTube"><FaYoutube /></a>
              <a href="https://spotify.com" target="_blank" rel="noreferrer" className={styles.promoSocialIcon} aria-label="Spotify"><FaSpotify /></a>
            </div>

            <div className={styles.promoCopy}>
              © 2026 Area 93.5 FM. One Voice, Every Area.
            </div>
          </div>

          {/* Right Image Block */}
          <div className={styles.promoContactRight}>
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80" 
              alt="93.5 Area FM Contact Model" 
              className={styles.promoRightImg} 
            />
          </div>
        </div>

        {/* Bottom Watermark Logo & Sound Session Row */}
        <div className={styles.stationBannerRow}>
          <div 
            className={styles.stationBigWatermark}
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          >
            <span>93.5</span>
            <span style={{ color: 'var(--primary-orange, #E50914)' }}>AREA</span>
            <span>FM</span>
          </div>

          <div 
            className={styles.soundSessionMiniCard}
            onClick={() => navigate('/shows/the-sound-session')}
          >
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" 
              alt="The Sound Session" 
              className={styles.soundSessionThumb} 
            />
            <div>
              <h4 className={styles.soundSessionTitle}>The Sound Session</h4>
              <p className={styles.soundSessionHost}>With Simi Ogunleye • 11:00 am - 2:00 pm</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <LivePlayer />
    </main>
  );
};
