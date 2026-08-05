import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';
import styles from './NewsletterCTA.module.css';

export const NewsletterCTA = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <section className={styles.ctaSection}>
      <div className={styles.bgCircle} />

      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.headline}>Never Miss a New Episode</h2>
        <p className={styles.subtext}>
          Subscribe to receive the latest podcasts, exclusive interviews, and special programmes directly from Area 93.5 FM.
        </p>

        {subscribed ? (
          <div style={{ background: 'rgba(255,255,255,0.15)', padding: '16px 24px', borderRadius: '12px', fontWeight: 700 }}>
            🎉 Thank you for subscribing to Area 93.5 FM Podcasts!
          </div>
        ) : (
          <form className={styles.formRow} onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Enter your email address..." 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.inputField} 
            />
            <button type="submit" className={styles.subscribeBtn}>
              <FiSend size={15} />
              <span>SUBSCRIBE</span>
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
};
