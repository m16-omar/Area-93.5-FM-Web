import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../../assets/area-logo.png';
import styles from './PageLoader.module.css';

export const PageLoader = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="page-loader"
          className={styles.loaderOverlay}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <img src={logoImg} alt="93.5 AREA FM Logo" className={styles.loaderLogo} />
          <div className={styles.spinnerCircle} />
          <div className={styles.brandText}>93.5 AREA FM</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
