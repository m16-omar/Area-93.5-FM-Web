import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaYoutube, FaSpotify, FaTwitch, FaSoundcloud, FaPlay, FaUser } from 'react-icons/fa';
import { FiMail, FiRadio } from 'react-icons/fi';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import teamData from '../data/teamData.json';
import styles from './HostsPage.module.css';

const featuredEpisodes = [
  {
    id: "ep1",
    tag: "LIVE SHOW",
    title: "Vibe Check #4",
    date: "March 4, 2026",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "ep2",
    tag: "POPULAR",
    title: "Vibe Check #3",
    date: "March 4, 2026",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80"
  }
];

export const HostsPage = () => {
  const featuredHost = teamData[0] || {
    name: "Samantha Lopez",
    role: "Head DJ & Station Host",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
  };

  return (
    <main className={styles.hostsPageContainer}>
      <Navbar />

      {/* 1. HERO BANNER SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.bgCircleTopRight} />
        <div className={styles.glowCircleTeal} />

        <div className={styles.heroWatermark}>
          TEAM MEMBERS
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroHeaderBox}>
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

            <span className={styles.followOnTag}>FOLLOW ON</span>
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
                <h3 className={styles.featuredHostName}>{featuredHost.name}</h3>
                <div className={styles.featuredHostSocials}>
                  <a href="#" className={styles.miniSocialIcon} aria-label="Instagram"><FaInstagram /></a>
                  <a href="#" className={styles.miniSocialIcon} aria-label="Twitter"><FaTwitter /></a>
                  <a href="#" className={styles.miniSocialIcon} aria-label="Spotify"><FaSpotify /></a>
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
                    <span className={styles.episodeTag}>{ep.tag}</span>
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

      {/* 3. ALL TEAM MEMBERS SECTION */}
      <section className={styles.allMembersSection}>
        <div className={styles.allMembersWatermark}>ALL MEMBERS</div>

        <div className={styles.sectionCenterHeader}>
          <h2 className={styles.sectionCenterTitle}>ALL TEAM MEMBERS</h2>
        </div>

        <div className={styles.hostsGrid}>
          {teamData.map((host, idx) => (
            <motion.div
              key={host.id}
              className={styles.hostCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              {/* Photo & On Air Badge Wrapper */}
              <div className={styles.hostImgWrapper}>
                <img src={host.photo} alt={host.name} className={styles.hostImg} />
                
                <div className={styles.hostBadge}>
                  <FiRadio size={11} /> ON AIR
                </div>

                {/* Social Links Overlay Bar on Hover */}
                <div className={styles.hostSocialsOverlay}>
                  {host.socials?.instagram && (
                    <a href={host.socials.instagram} className={styles.socialIconLink} aria-label="Instagram">
                      <FaInstagram />
                    </a>
                  )}
                  {host.socials?.twitter && (
                    <a href={host.socials.twitter} className={styles.socialIconLink} aria-label="Twitter">
                      <FaTwitter />
                    </a>
                  )}
                  {host.socials?.youtube && (
                    <a href={host.socials.youtube} className={styles.socialIconLink} aria-label="YouTube">
                      <FaYoutube />
                    </a>
                  )}
                  {host.socials?.spotify && (
                    <a href={host.socials.spotify} className={styles.socialIconLink} aria-label="Spotify">
                      <FaSpotify />
                    </a>
                  )}
                </div>
              </div>

              {/* Host Meta Details */}
              <div className={styles.hostInfo}>
                <h3 className={styles.hostName}>{host.name}</h3>
                <span className={styles.hostRole}>{host.role}</span>
                <p className={styles.hostBio}>{host.bio}</p>

                {/* Show Tag Pills */}
                {host.shows && host.shows.length > 0 && (
                  <div className={styles.showsTagWrapper}>
                    {host.shows.map((show, sIdx) => (
                      <span key={sIdx} className={styles.showPill}>
                        {show}
                      </span>
                    ))}
                  </div>
                )}

                {/* Contact Row */}
                <div className={styles.contactRow}>
                  {host.email && (
                    <a href={`mailto:${host.email}`} className={styles.contactBtn}>
                      <FiMail size={13} /> {host.email}
                    </a>
                  )}
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
