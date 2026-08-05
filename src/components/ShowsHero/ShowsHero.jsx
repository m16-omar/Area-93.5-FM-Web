import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import styles from './ShowsHero.module.css';

export const ShowsHero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroBgGlow} />

      <div className={styles.heroContent}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.breadcrumbRow}
        >
          <Link to="/" className={styles.breadcrumbLink}>Home</Link>
          <FiChevronRight size={14} />
          <span>Shows</span>
        </motion.div>

        <motion.h1 
          className={styles.heroTitle}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Shows & Schedule
        </motion.h1>

        <motion.p 
          className={styles.heroSubtitle}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover every programme airing on Area 93.5 FM throughout the week.
        </motion.p>
      </div>
    </section>
  );
};
