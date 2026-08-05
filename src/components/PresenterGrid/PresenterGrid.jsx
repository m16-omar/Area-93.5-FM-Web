import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaYoutube, FaSpotify } from 'react-icons/fa';
import styles from './PresenterGrid.module.css';

export const PresenterGrid = ({ presenters }) => {
  if (!presenters || presenters.length === 0) return null;

  return (
    <section className={styles.presenterSection}>
      <div className={styles.headingWrapper}>
        <span className={styles.tagBadge}>OUR HOSTS</span>
        <div className={styles.greenLine} />
      </div>
      <h2 className={styles.sectionHeadline}>MEET OUR PRESENTERS</h2>

      <div className={styles.grid}>
        {presenters.map((p, idx) => (
          <motion.div
            key={p.id}
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <img src={p.photo} alt={p.name} className={styles.avatar} />
            <h3 className={styles.name}>{p.name}</h3>
            <span className={styles.role}>{p.role}</span>
            <span className={styles.showName}>{p.show}</span>

            <div className={styles.socialsRow}>
              {p.socials?.instagram && <a href={p.socials.instagram} aria-label="Instagram"><FaInstagram /></a>}
              {p.socials?.twitter && <a href={p.socials.twitter} aria-label="Twitter"><FaTwitter /></a>}
              {p.socials?.youtube && <a href={p.socials.youtube} aria-label="YouTube"><FaYoutube /></a>}
              {p.socials?.spotify && <a href={p.socials.spotify} aria-label="Spotify"><FaSpotify /></a>}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
