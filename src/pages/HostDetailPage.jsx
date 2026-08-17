import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaInstagram, FaTwitter, FaYoutube, FaSpotify, FaTiktok,
  FaMicrophone, FaEnvelope, FaArrowLeft, FaChevronDown
} from 'react-icons/fa';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import teamData from '../data/teamData.json';
import styles from './HostDetailPage.module.css';

const socialConfig = [
  { key: 'instagram', Icon: FaInstagram, label: 'Instagram' },
  { key: 'twitter',   Icon: FaTwitter,   label: 'Twitter'   },
  { key: 'youtube',   Icon: FaYoutube,   label: 'YouTube'   },
  { key: 'spotify',   Icon: FaSpotify,   label: 'Spotify'   },
  { key: 'tiktok',    Icon: FaTiktok,    label: 'TikTok'    },
];

export const HostDetailPage = () => {
  const { slug }   = useParams();
  const navigate   = useNavigate();
  const host       = teamData.find(h => h.slug === slug);

  if (!host) {
    return (
      <main className={styles.pageWrapper}>
        <Navbar />
        <div className={styles.notFound}>
          <h2>HOST NOT FOUND</h2>
          <Link to="/hosts" className={styles.backBtn}>
            <FaArrowLeft /> Back to All Hosts
          </Link>
        </div>
        <Footer />
        <LivePlayer />
      </main>
    );
  }

  const heroBg = host.heroBg || host.photo;

  return (
    <main className={styles.pageWrapper}>
      <Navbar />

      {/* ══════════════════════
          1. HERO
         ══════════════════════ */}
      <section className={styles.heroSection}>
        {/* Background image */}
        <img
          src={heroBg}
          alt=""
          className={styles.heroBgImg}
          aria-hidden="true"
        />
        {/* Overlay */}
        <div className={styles.heroOverlay} />
        {/* Accent circle */}
        <div className={styles.heroCircleTopRight} />

        {/* Content */}
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Small avatar */}
          <img
            src={host.photo}
            alt={host.name}
            className={styles.heroAvatar}
          />

          <div className={styles.heroTextBlock}>
            <span className={styles.heroRole}>{host.badge} · {host.role}</span>
            <h1 className={styles.heroName}>{host.name}</h1>

            {/* Social circles */}
            <div className={styles.heroSocials}>
              {socialConfig.map(({ key, Icon, label }) => (
                host.socials?.[key] ? (
                  <a
                    key={key}
                    href={host.socials[key]}
                    className={styles.heroSocialCircle}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon />
                  </a>
                ) : null
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div className={styles.scrollIndicator} aria-hidden="true">
          <FaChevronDown size={16} />
        </div>
      </section>

      {/* ══════════════════════
          2. BODY: portrait + bio | sidebar
         ══════════════════════ */}
      <div className={styles.bodySection}>

        {/* ── LEFT COLUMN ── */}
        <div className={styles.leftCol}>
          {/* Back link */}
          <button onClick={() => navigate('/hosts')} className={styles.backBtn}>
            <FaArrowLeft size={12} /> Back to All Hosts
          </button>

          {/* Large portrait */}
          <motion.div
            className={`${styles.portraitWrapper} ${styles.portraitWatermark}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <img
              src={host.photo}
              alt={host.name}
              className={styles.portraitImg}
            />
          </motion.div>

          {/* Bio block */}
          <motion.div
            className={styles.bioBlock}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className={styles.bioHeading}>About {host.name.split(' ')[0]}</h2>
            <div className={styles.bioDivider} />
            <p className={styles.bioText}>{host.bio || 'No bio available.'}</p>
          </motion.div>
        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <aside className={styles.rightCol}>

          {/* Shows */}
          {host.shows && host.shows.length > 0 && (
            <motion.div
              className={styles.sideCard}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className={styles.sideCardTitle}>Shows</h3>
              <div className={styles.showsList}>
                {host.shows.map(show => (
                  <div key={show} className={styles.showItem}>
                    <span className={styles.showIcon}><FaMicrophone /></span>
                    <p className={styles.showName}>{show}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Contact */}
          {host.email && (
            <motion.div
              className={styles.sideCard}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className={styles.sideCardTitle}>Contact</h3>
              <div className={styles.contactInfo}>
                <div className={styles.contactRow}>
                  <span className={styles.contactIcon}><FaEnvelope /></span>
                  <a href={`mailto:${host.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {host.email}
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* Social links */}
          {host.socials && (
            <motion.div
              className={styles.sideCard}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <h3 className={styles.sideCardTitle}>Follow</h3>
              <div className={styles.socialLinksGrid}>
                {socialConfig.map(({ key, Icon, label }) => (
                  host.socials[key] ? (
                    <a
                      key={key}
                      href={host.socials[key]}
                      className={styles.socialLinkBtn}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon /> {label}
                    </a>
                  ) : null
                ))}
              </div>
            </motion.div>
          )}
        </aside>
      </div>

      <Footer />
      <LivePlayer />
    </main>
  );
};
