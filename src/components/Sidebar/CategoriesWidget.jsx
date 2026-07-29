import React from 'react';
import categoriesData from '../../data/categoriesData.json';
import styles from './Sidebar.module.css';

export const CategoriesWidget = () => {
  return (
    <div className={styles.widgetBox}>
      <span className="section-label">CATEGORIES</span>

      <div className={styles.categoryList}>
        {categoriesData.map((cat) => (
          <div key={cat.id} className={styles.categoryRow}>
            <span>{cat.name}</span>
            <span className={styles.catCount}>({cat.count})</span>
          </div>
        ))}
      </div>
    </div>
  );
};
