import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './SubscribeForm.module.css';

export const SubscribeForm = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail('');
    }
  };

  return (
    <section className={styles.subscribeSection}>
      <div className={styles.overlay} />

      <div className={styles.contentContainer}>
        {/* Left Column: Title & Description */}
        <motion.div 
          className={styles.leftCol}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>STAY UPDATED</h2>
          <p className={styles.description}>
            Subscribe to our weekly newsletter to get the latest radio charts, upcoming live show announcements, special event passes, and guest DJ mixes delivered directly to your inbox.
          </p>
        </motion.div>

        {/* Right Column: Subscribe Input & Button */}
        <motion.div 
          className={styles.rightCol}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.formHeader}>
            <span className={styles.formLabel}>SUBSCRIBE FORM</span>
            <span className={styles.formAccentLine} />
          </div>

          <form onSubmit={handleSubmit} className={styles.formStack}>
            <input
              type="email"
              placeholder="Your email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.emailInput}
              required
            />

            <button type="submit" className={styles.submitBtn}>
              {submitted ? 'THANK YOU FOR SUBSCRIBING!' : 'SUBSCRIBE TO OUR NEWSLETTER'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
