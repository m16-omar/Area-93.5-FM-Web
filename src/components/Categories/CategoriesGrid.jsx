import React from 'react';
import { motion } from 'framer-motion';
import styles from './CategoriesGrid.module.css';

const categories = [
  {
    id: 'c1',
    title: 'ARTISTS',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'c2',
    title: 'TRENDS',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'c3',
    title: 'RELEASES',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'c4',
    title: 'CONCERTS',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80'
  }
];

export const CategoriesGrid = () => {
  return (
    <section className={styles.categoriesSection}>
      <div className={styles.innerContainer}>
        <div className={styles.headerBadge}>
          <span className="section-label">PARTNERS</span>
        </div>

        <div className={styles.grid}>
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              className={styles.categoryCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <img src={cat.image} alt={cat.title} className={styles.bgImage} loading="lazy" />
              <div className={styles.overlay} />
              <h3 className={styles.title}>{cat.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
