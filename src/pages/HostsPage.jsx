import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaYoutube, FaSpotify, FaTwitch, FaSoundcloud, FaPlay, FaUser, FaTiktok } from 'react-icons/fa';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import teamData from '../data/teamData.json';
import styles from './HostsPage.module.css';

const featuredEpisodes = [
  {
    id: "ep1",
    tag: "Vibe Check",
    title: "Vibe Check #4",
    date: "March 4, 2026",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "ep2",
    tag: "Vibe Check",
    title: "Vibe Check #3",
    date: "March 4, 2026",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80"
  }
];

export const HostsPage = () => {
  const featuredHost = teamData.find(t => t.name === "Samantha Lopez") || teamData[0];

  return (
    <main className={styles.hostsPageContainer}>
      <Navbar />

      {/* 1. HERO BANNER SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.bgCircleTopRight} />
        <div className={styles.glowCircleTeal} />

        <div className={styles.heroGrid}>
          {/* Left Column: Stacked Watermark Text */}
          <div className={styles.heroWatermarkCol}>
            <div className={styles.heroWatermarkText}>
              TEAM<br />MEMBERS
            </div>
          </div>

          {/* Right Column: Meet Our Hosts Header */}
          <div className={styles.heroContentCol}>
            <motion.h1 
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              MEET OUR HOSTS
            </motion.h1>

            <motion.p 
              className={styles.heroDesc}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Discover the hitmakers, creators, and DJs behind Area 93.5 FM. Delivering daily live radio sessions, exclusive pop culture interviews, and urban hit countdowns.
            </motion.p>

            <motion.a 
              href="mailto:careers@area-fm.xyz"
              className={styles.joinBtn}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              JOIN US
            </motion.a>
          </div>
        </div>
      </section>

      {/* 2. POPULAR HOST FEATURED BLOCK */}
      <section className={styles.popularHostSection}>
        <div className={styles.popularGlowBg} />

        <div className={styles.popularGrid}>
          {/* Left Col: Info & Socials */}
          <motion.div 
            className={styles.popularLeftCol}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={styles.popularTitle}>POPULAR HOST</h2>
            <p className={styles.popularDesc}>
              Hosting the prime time morning slot on Area 93.5 FM. Bringing high energy beats, live listener interaction, and breaking music news.
            </p>

            <button className={styles.discoverBtn}>
              DISCOVER MORE
            </button>

            <div className={styles.followOnHeader}>
              <span className={styles.followOnTag}>FOLLOW ON</span>
              <div className={styles.followOnLine} />
            </div>

            <div className={styles.socialBtnsRow}>
              <a href="#" className={styles.socialSquareBtn} aria-label="YouTube"><FaYoutube /></a>
              <a href="#" className={styles.socialSquareBtn} aria-label="Twitch"><FaTwitch /></a>
              <a href="#" className={styles.socialSquareBtn} aria-label="Spotify"><FaSpotify /></a>
              <a href="#" className={styles.socialSquareBtn} aria-label="Soundcloud"><FaSoundcloud /></a>
            </div>
          </motion.div>

          {/* Middle Col: Featured Host Portrait */}
          <motion.div 
            className={styles.popularMiddleCol}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className={styles.featuredHostCard}>
              <img src={featuredHost.photo} alt={featuredHost.name} className={styles.featuredHostImg} />
              
              <div className={styles.avatarBadge}>
                <FaUser />
              </div>

              <div className={styles.featuredHostFooter}>
                <div className={styles.djBadgeBox}>{featuredHost.badge || "DJ"}</div>
                <h3 className={styles.featuredHostName}>{featuredHost.name}</h3>
                <div className={styles.featuredHostSocials}>
                  <a href="#" className={styles.miniSocialCircle} aria-label="Instagram"><FaInstagram /></a>
                  <a href="#" className={styles.miniSocialCircle} aria-label="Twitter"><FaTwitter /></a>
                  <a href="#" className={styles.miniSocialCircle} aria-label="YouTube"><FaYoutube /></a>
                  <a href="#" className={styles.miniSocialCircle} aria-label="Spotify"><FaSpotify /></a>
                  <a href="#" className={styles.miniSocialCircle} aria-label="TikTok"><FaTiktok /></a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Col: Episodes & Listen On */}
          <motion.div 
            className={styles.popularRightCol}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className={styles.bgCircleRightEpisodes} />

            <div className={styles.listenOnHeader}>
              <span className={styles.listenOnTag}>LISTEN ON</span>
              <div className={styles.listenOnLine} />
            </div>

            <div className={styles.episodesList}>
              {featuredEpisodes.map(ep => (
                <div key={ep.id} className={styles.episodeCard}>
                  <div className={styles.episodeThumbWrapper}>
                    <img src={ep.image} alt={ep.title} className={styles.episodeThumb} />
                    <div className={styles.episodePlayOverlay}>
                      <FaPlay size={10} style={{ marginLeft: '1px' }} />
                    </div>
                  </div>
                  <div className={styles.episodeInfo}>
                    <span className={styles.episodePillOutline}>{ep.tag}</span>
                    <h4 className={styles.episodeTitle}>{ep.title}</h4>
                    <p className={styles.episodeDate}>{ep.date}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.paginationRow}>
              <button className={styles.pagBtn}>PREV</button>
              <button className={`${styles.pagBtn} ${styles.pagBtnActive}`}>NEXT</button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. ALL TEAM MEMBERS SECTION (3-COLUMN GRID MATCHING SCREENSHOT) */}
      <section className={styles.allMembersSection}>
        <div className={styles.allMembersWatermark}>ALL MEMBERS</div>

        <div className={styles.sectionCenterHeader}>
          <h2 className={styles.sectionCenterTitle}>ALL TEAM MEMBERS</h2>
        </div>

        <div className={styles.allMembersGrid}>
          {teamData.map((member, idx) => (
            <motion.div
              key={member.id}
              className={styles.memberCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <img src={member.photo} alt={member.name} className={styles.memberImg} />
              
              <div className={styles.memberAvatarIcon}>
                <FaUser />
              </div>

              <div className={styles.memberOverlayFooter}>
                <div className={styles.memberBadgeBox}>{member.badge || "DJ"}</div>
                <h3 className={styles.memberName}>{member.name}</h3>
                
                <div className={styles.memberSocialsRow}>
                  <a href="#" className={styles.memberSocialCircle} aria-label="Instagram"><FaInstagram /></a>
                  <a href="#" className={styles.memberSocialCircle} aria-label="Twitter"><FaTwitter /></a>
                  <a href="#" className={styles.memberSocialCircle} aria-label="YouTube"><FaYoutube /></a>
                  <a href="#" className={styles.memberSocialCircle} aria-label="Spotify"><FaSpotify /></a>
                  <a href="#" className={styles.memberSocialCircle} aria-label="TikTok"><FaTiktok /></a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
      <LivePlayer />
    </main>
  );
};
