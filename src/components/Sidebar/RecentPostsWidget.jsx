import React from 'react';
import recentPostsData from '../../data/recentPostsData.json';
import styles from './Sidebar.module.css';

export const RecentPostsWidget = () => {
  return (
    <div className={styles.widgetBox}>
      <span className="section-label">RECENT POSTS</span>

      <div className={styles.recentPostsList}>
        {recentPostsData.map((post) => (
          <div key={post.id} className={styles.recentPostItem}>
            <img src={post.image} alt={post.title} className={styles.recentPostThumb} loading="lazy" />
            <div>
              <h4 className={styles.recentPostTitle}>{post.title}</h4>
              <p className={styles.recentPostDate}>{post.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
