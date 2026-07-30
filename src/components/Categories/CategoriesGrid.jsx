import React from 'react';
import { motion } from 'framer-motion';
import styles from './CategoriesGrid.module.css';

const partners = [
  {
    id: 'p1',
    title: 'MTN',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p2',
    title: 'GLO',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p3',
    title: 'PEAK',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p4',
    title: 'MALTINA',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p5',
    title: 'GIG LOGISTICS',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p6',
    title: 'AIRTEL',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80'
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
          {partners.map((partner, idx) => (
            <motion.div
              key={partner.id}
              className={styles.categoryCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <img src={partner.image} alt={partner.title} className={styles.bgImage} loading="lazy" />
              <div className={styles.overlay} />
              <h3 className={styles.title}>{partner.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
