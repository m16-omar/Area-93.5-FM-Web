import React from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import styles from './UpcomingShows.module.css';

export const UpcomingShows = ({ shows }) => {
  if (!shows || shows.length === 0) return null;

  return (
    <aside className={styles.sidebarBox}>
      <div className={styles.headingWrapper}>
        <span className={styles.tagBadge}>COMING NEXT</span>
        <div className={styles.greenLine} />
      </div>

      <h3 className={styles.title}>UPCOMING SHOWS</h3>

      <div className={styles.upcomingGrid}>
        {shows.map((item, index) => (
          <div key={item.id} className={styles.card}>
            {index % 2 === 0 ? (
              /* Photo Spotlight Card matching Pro Radio Screenshot 1 */
              <div className={styles.photoCard}>
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className={styles.photoImg} 
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80";
                  }}
                />
                <button className={styles.moreBtn} aria-label="More options">
                  <FiMoreVertical size={16} />
                </button>
              </div>
            ) : (
              /* Info Card matching Pro Radio Screenshot 1 */
              <div className={styles.infoCard}>
                <span className={styles.catBadge}>{item.category || 'SHOW'}</span>
                <h4 className={styles.itemTitle}>{item.title}</h4>
                <span className={styles.itemTime}>{item.time}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};
