import React from 'react';
import styles from './UpcomingShows.module.css';

export const UpcomingShows = ({ shows }) => {
  if (!shows || shows.length === 0) return null;

  return (
    <aside className={styles.sidebarBox}>
      <div className={styles.headingWrapper}>
        <span className={styles.tagBadge}>COMING NEXT</span>
        <div className={styles.greenLine} />
      </div>

      <h3 className={styles.title}>TODAY'S SHOWS</h3>

      <div className={styles.upcomingList}>
        {shows.map((item) => (
          <div key={item.id} className={styles.upcomingItem}>
            <img src={item.thumbnail} alt={item.title} className={styles.itemImg} />
            <div>
              <span className={styles.itemTime}>{item.time}</span>
              <h4 className={styles.itemTitle}>{item.title}</h4>
              <span className={styles.itemPresenter}>{item.presenter}</span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
