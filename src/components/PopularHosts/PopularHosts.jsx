import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaSpotify } from 'react-icons/fa';
import styles from './PopularHosts.module.css';

export const PopularHosts = ({ hosts }) => {
  if (!hosts || hosts.length === 0) return null;

  return (
    <section className={styles.hostsSection}>
      <div className={styles.headingWrapper}>
        <span className={styles.tagBadge}>CREATORS</span>
        <div className={styles.greenLine} />
      </div>
      <h2 className={styles.sectionHeadline}>POPULAR HOSTS</h2>

      <div className={styles.grid}>
        {hosts.map((h, idx) => (
          <motion.div
            key={h.id}
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <img src={h.photo} alt={h.name} className={styles.photo} />
            <h3 className={styles.name}>{h.name}</h3>
            <span className={styles.role}>{h.role}</span>
            <span className={styles.episodesCount}>{h.totalEpisodes}</span>

            <div className={styles.socialsRow}>
              {h.socials?.instagram && <a href={h.socials.instagram} aria-label="Instagram"><FaInstagram /></a>}
              {h.socials?.twitter && <a href={h.socials.twitter} aria-label="Twitter"><FaTwitter /></a>}
              {h.socials?.spotify && <a href={h.socials.spotify} aria-label="Spotify"><FaSpotify /></a>}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
