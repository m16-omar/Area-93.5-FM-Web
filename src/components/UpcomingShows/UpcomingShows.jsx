import React from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import styles from './UpcomingShows.module.css';

export const UpcomingShows = () => {
  const upcomingList = [
    {
      id: "up-1",
      title: "Pop Culture Replay",
      category: "TRENDS",
      time: "12:00 pm - 03:00 pm",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "up-2",
      title: "Hitmakers Live Drive",
      category: "AFROBEATS",
      time: "03:00 pm - 06:30 pm",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section className={styles.upcomingSection}>
      <div className={styles.headingWrapper}>
        <span className={styles.tagBadge}>COMING NEXT</span>
        <div className={styles.accentLine} />
      </div>

      <h2 className={styles.sectionHeadline}>UPCOMING SHOWS</h2>

      <div className={styles.cardsGrid}>
        {upcomingList.map((item) => (
          <div key={item.id} className={styles.upcomingCard}>
            <img src={item.image} alt={item.title} className={styles.cardImg} />
            <div className={styles.cardOverlay}>
              <span className={styles.catBadge}>{item.category}</span>
              <h3 className={styles.showTitle}>{item.title}</h3>
              <p className={styles.showTime}>{item.time}</p>
            </div>
            <button className={styles.moreBtn} aria-label="Options">
              <FiMoreVertical />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
