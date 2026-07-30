import React from 'react';
import { motion } from 'framer-motion';
import styles from './PageHeader.module.css';

export const PageHeader = ({ title = "NEWS", watermark = "NEWS\nUPDATES" }) => {
  return (
    <section className={styles.pageHeaderSection}>
      <div className={styles.watermarkTitle}>{watermark}</div>

      <motion.h1 
        className={styles.title}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h1>

      <div className={styles.scrollIndicator}>
        <div className={styles.mouseIcon}>
          <div className={styles.mouseWheel} />
        </div>
      </div>
    </section>
  );
};
