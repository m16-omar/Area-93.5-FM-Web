import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaYoutube, FaSpotify, FaMicrophone } from 'react-icons/fa';
import { FiMail, FiPhone, FiRadio } from 'react-icons/fi';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import teamData from '../data/teamData.json';
import styles from './HostsPage.module.css';

export const HostsPage = () => {
  return (
    <main className={styles.hostsPageContainer}>
      <Navbar />

      {/* 1. HERO BANNER SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.bgCircleBottomLeft} />
        <div className={styles.bgCircleTopRight} />
        <div className={styles.glowCircleTeal} />

        <div className={styles.watermarkText}>
          OUR HOSTS
        </div>

        <div className={styles.heroContent}>
          <motion.div 
            className={styles.tagWrapper}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.tagDot} />
            <span className={styles.tagText}>AREA 93.5 FM BROADCAST TEAM</span>
          </motion.div>

          <motion.h1 
            className={styles.mainTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            MEET OUR RADIO HOSTS & PRESENTERS
          </motion.h1>

          <motion.p 
            className={styles.heroDesc}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover the voices, hitmakers, and creators powering Area 93.5 FM. Delivering live morning shows, urban beat sessions, exclusive podcasts, and weekly music chart countdowns.
          </motion.p>
        </div>
      </section>

      {/* 2. HOSTS GRID SECTION */}
      <section className={styles.hostsGridSection}>
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

      {/* 3. JOIN OUR TEAM CTA */}
      <section className={styles.joinCtaSection}>
        <div className={styles.ctaBox}>
          <div className={styles.ctaTextCol}>
            <h2 className={styles.ctaTitle}>WANT TO HOST YOUR OWN SHOW ON AREA 93.5 FM?</h2>
            <p className={styles.ctaDesc}>
              We are constantly seeking talented DJs, podcast creators, and broadcast journalists. Get in touch with our program management team today.
            </p>
          </div>
          <a href="mailto:careers@area-fm.xyz" className={styles.ctaBtn}>
            JOIN THE TEAM
          </a>
        </div>
      </section>

      <Footer />
      <LivePlayer />
    </main>
  );
};
