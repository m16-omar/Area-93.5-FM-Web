import React from 'react';
import styles from './CategoryFilters.module.css';

export const CategoryFilters = ({ categories, activeCategory, onSelectCategory }) => {
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
