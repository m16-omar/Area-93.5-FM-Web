import React from 'react';
import { motion } from 'framer-motion';
import styles from './LiveIndicator.module.css';

export const LiveIndicator = () => {
  return (
    <div className={styles.liveContainer}>
      <div className={styles.equalizerBar}>
        <motion.span 
          className={styles.bar} 
          animate={{ height: ['40%', '100%', '30%'] }} 
          transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }} 
        />
        <motion.span 
          className={styles.bar} 
          animate={{ height: ['90%', '20%', '80%'] }} 
          transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }} 
        />
        <motion.span 
          className={styles.bar} 
          animate={{ height: ['30%', '90%', '40%'] }} 
          transition={{ repeat: Infinity, duration: 0.7, ease: "easeInOut" }} 
        />
      </div>
      <span>LIVE</span>
    </div>
  );
};
