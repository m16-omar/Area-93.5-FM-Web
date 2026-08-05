import React from 'react';
import styles from './PodcastCategories.module.css';

export const PodcastCategories = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <div className={styles.chipsRow}>
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`${styles.chipBtn} ${isActive ? styles.chipActive : ''}`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};
