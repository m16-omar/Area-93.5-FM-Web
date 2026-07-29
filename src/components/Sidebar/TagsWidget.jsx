import React from 'react';
import tagsData from '../../data/tagsData.json';
import styles from './Sidebar.module.css';

export const TagsWidget = () => {
  return (
    <div className={styles.widgetBox}>
      <span className="section-label">TAGS</span>

      <div className={styles.tagsCloud}>
        {tagsData.map((tag, idx) => (
          <span key={idx} className={styles.tagPill}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
