import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiUser, FiChevronRight, FiMoreVertical } from 'react-icons/fi';
import { FaInstagram, FaTwitter, FaYoutube, FaSpotify, FaTiktok } from 'react-icons/fa';
import { Navbar } from '../components/Navbar/Navbar';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import showsData from '../data/showsScheduleData.json';
import styles from './ShowsSchedulePage.module.css';

const hostsList = [
  {
    id: "h1",
    name: "Ryan Taylor",
    role: "Owner",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "h2",
    name: "Samantha Lopez",
    role: "DJ",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "h3",
    name: "Alex Rivera",
    role: "DJ",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
  }
];

export const ShowsSchedulePage = () => {
  const [activeDay, setActiveDay] = useState('MONDAY');

  const currentSchedule = showsData.schedule[activeDay] || [];

  return (
    <main className={styles.showsPageContainer}>
      <Navbar />
      <PageHeader title="SHOWS SCHEDULE" watermark={`WEEKLY\nRADIO`} />

      <section className={styles.scheduleSection}>
        {/* Day Selector Tabs */}
        <div className={styles.dayTabsRow}>
          {showsData.days.map((day) => {
            const isActive = activeDay === day;
            return (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`${styles.dayTabBtn} ${isActive ? styles.dayTabBtnActive : ''}`}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Schedule Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className={styles.scheduleList}
          >
            {currentSchedule.map((show) => (
              <div
                key={show.id}
                className={`${styles.showCard} ${show.nowPlaying ? styles.showCardNowPlaying : ''}`}
              >
                <div className={styles.showCardImageWrapper}>
                  <img src={show.image} alt={show.name} className={styles.showCardImg} />
                  {show.nowPlaying && (
                    <span className={styles.nowPlayingBadge}>
                      NOW PLAYING
                    </span>
                  )}
                </div>

                <div className={styles.showCardContent}>
                  <div className={styles.showCardMainInfo}>
                    <span className={`badge-outline ${styles.genreBadge}`}>
                      {show.genre.toLowerCase()}
                    </span>

                    <h3 className={styles.showTitle}>
                      {show.name}
                    </h3>

                    <div className={styles.showDetailsRow}>
                      <span className={styles.showDetailItem}>
                        <FiUser size={14} className={styles.detailIcon} /> {show.dj}
                      </span>
                      <span className={styles.showDetailItem}>
                        <FiClock size={14} className={styles.detailIcon} /> {show.time}
                      </span>
                    </div>
                  </div>

                  <button className={styles.actionBtn} aria-label="Show Details">
                    <FiChevronRight />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* MEET OUR HOSTS & FEATURED SHOW Section */}
      <section className={styles.hostsAndFeaturedSection}>
        {/* Left Col: Meet Our Hosts */}
        <div>
          <div className={styles.sectionBadgeWrapper}>
            <span className={styles.neonBadge}>OUR SPEAKERS</span>
            <div className={styles.greenLine} />
          </div>
          <h2 className={styles.sectionHeadline}>MEET OUR HOSTS</h2>

          <div className={styles.hostsGrid}>
            {hostsList.map((host) => (
              <div key={host.id} className={styles.hostCard}>
                <img src={host.image} alt={host.name} className={styles.hostImg} />
                <div className={styles.speakerBadgeIcon}>
                  <FiUser />
                </div>
                <div className={styles.hostOverlay}>
                  <span className={styles.hostRoleBadge}>{host.role}</span>
                  <h4 className={styles.hostName}>{host.name}</h4>
                  <div className={styles.hostSocials}>
                    <a href="#" aria-label="Instagram"><FaInstagram /></a>
                    <a href="#" aria-label="Twitter"><FaTwitter /></a>
                    <a href="#" aria-label="YouTube"><FaYoutube /></a>
                    <a href="#" aria-label="Spotify"><FaSpotify /></a>
                    <a href="#" aria-label="TikTok"><FaTiktok /></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Featured Show */}
        <div>
          <div className={styles.sectionBadgeWrapper}>
            <span className={styles.neonBadge}>FEATURED SHOW</span>
            <div className={styles.greenLine} />
          </div>

          <div className={styles.featuredShowCard}>
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80" 
              alt="Featured Show" 
              className={styles.featuredShowImg} 
            />
            <div className={styles.featuredShowOverlay}>
              <span className={styles.hostRoleBadge}>TRENDS</span>
              <div className={styles.featuredShowHeaderRow}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.4rem', margin: 0 }}>The Fan Zone</h3>
                <FiMoreVertical size={20} style={{ cursor: 'pointer' }} />
              </div>
            </div>
          </div>

          <button className={styles.discoverBtn}>
            DISCOVER MORE
          </button>
        </div>
      </section>

      {/* WANT YOUR OWN SHOW? Banner Section */}
      <section className={styles.wantShowBannerSection}>
        <div className={styles.wantShowBgOverlay} />
        
        <div className={styles.wantShowGrid}>
          {/* Left Preview Box */}
          <div className={styles.wantShowPreviewBox}>
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80" 
              alt="The Sound Session" 
              className={styles.soundSessionImg} 
            />
            <h4 className={styles.soundSessionTitle}>The Sound Session</h4>
            <p className={styles.soundSessionPresenter}>With Chloe Nguyen</p>
            <p className={styles.soundSessionTime}>
              <FiClock size={12} /> 8:30 am - 12:30 pm
            </p>
            <button className={styles.listenBtn}>
              LISTEN
            </button>
          </div>

          {/* Right Text Column */}
          <div className={styles.wantShowTextCol}>
            <h2 className={styles.wantShowHeadline}>
              WANT YOUR<br />
              OWN SHOW?
            </h2>
            <p className={styles.wantShowDesc}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
            <button className={styles.contactUsBtn}>
              CONTACT US
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <LivePlayer />
    </main>
  );
};
