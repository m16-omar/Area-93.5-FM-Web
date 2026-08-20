import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './CategoriesGrid.module.css';

const categories = [
  {
    id: 'c1',
    title: 'ARTISTS',
    link: '/news',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #f59e0b 100%)',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'c2',
    title: 'TRENDS',
    link: '/news',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'c3',
    title: 'RELEASES',
    link: '/news',
    gradient: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #f43f5e 100%)',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'c4',
    title: 'CONCERTS',
    link: '/news',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #eab308 100%)',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=500&q=80'
  }
];

export const CategoriesGrid = () => {
  return (
    <section className={styles.categoriesSection}>
      <div className={styles.innerContainer}>
        <div className={styles.headerBadge}>
          <span className={styles.categoryLabel}>PARTNERS</span>
          <span className={styles.accentLine} />
        </div>

        <div className={styles.grid}>
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              className={styles.categoryCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <Link to={cat.link} className={styles.cardLink}>
                <img src={cat.image} alt={cat.title} className={styles.bgImage} loading="lazy" />
                <div 
                  className={styles.overlay} 
                  style={{ background: cat.gradient, opacity: 0.85 }} 
                />
                <h3 className={styles.title}>{cat.title}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
