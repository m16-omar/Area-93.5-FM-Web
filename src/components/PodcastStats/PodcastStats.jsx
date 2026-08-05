import React from 'react';
import { motion } from 'framer-motion';
import styles from './PodcastStats.module.css';

export const PodcastStats = ({ stats }) => {
  if (!stats || stats.length === 0) return null;

  return (
    <section className={styles.statsSection}>
      <div className={styles.grid}>
        {stats.map((st, idx) => (
          <motion.div
            key={st.id}
            className={styles.card}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <h3 className={styles.value}>{st.value}</h3>
            <span className={styles.label}>{st.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
