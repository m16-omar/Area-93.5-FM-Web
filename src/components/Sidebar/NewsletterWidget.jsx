import React, { useState } from 'react';
import styles from './Sidebar.module.css';

export const NewsletterWidget = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail('');
    }
  };

  return (
    <div className={styles.widgetBox}>
      <span className="section-label">NEWSLETTER</span>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.searchInput}
          required
        />
        <button type="submit" className={styles.fullTracklistBtn} style={{ background: '#000', color: '#fff' }}>
          {submitted ? 'SUBSCRIBED!' : 'SUBSCRIBE'}
        </button>
      </form>
    </div>
  );
};
