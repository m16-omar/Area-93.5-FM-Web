import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEye, FiHeart, FiShare2, FiCalendar } from 'react-icons/fi';
import newsData from '../../data/newsData.json';
import styles from './LatestNews.module.css';

export const LatestNews = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const navigate = useNavigate();

  const getSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleArticleClick = (title) => {
    navigate(`/news/${getSlug(title)}`);
  };

  return (
    <section className={styles.newsSection} id="news">
      <div className={styles.watermarkTitle}>LATEST NEWS</div>

      {/* Top Bar with Categories & Sponsors */}
      <div className={styles.topControls}>
        <div className={styles.categoriesBar}>
          {newsData.categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.catBtn} ${activeCategory === cat ? styles.activeCat : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.sponsorsBox}>
          <span className="section-label">SPONSORED BY</span>
        </div>
      </div>

      <h2 className={styles.mainTitle}>LATEST NEWS</h2>

      {/* News Grid */}
      <div className={styles.newsGrid}>
        {/* Big Main Featured Card */}
        <motion.div 
          className={styles.bigCard}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onClick={() => handleArticleClick(newsData.featuredBig.title)}
          style={{ cursor: 'pointer' }}
        >
          <div className={styles.bigImageWrapper}>
            <img 
              src={newsData.featuredBig.image} 
              alt={newsData.featuredBig.title} 
              className={styles.bigImage} 
              loading="lazy" 
            />
          </div>
          <div className={styles.bigContent}>
            <span className="badge-outline">{newsData.featuredBig.category.toLowerCase()}</span>
            <h3 className={styles.bigTitle}>{newsData.featuredBig.title}</h3>
            <div className={styles.metaRow}>
              <span><FiCalendar size={13} /> {newsData.featuredBig.date}</span>
              <span><FiEye size={13} /> {newsData.featuredBig.views}</span>
              <span><FiHeart size={13} /> {newsData.featuredBig.likes}</span>
              <FiShare2 size={13} style={{ cursor: 'pointer' }} onClick={(e) => e.stopPropagation()} />
            </div>
          </div>
        </motion.div>

        {/* Medium Featured Card */}
        <motion.div 
          className={styles.mediumCard}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onClick={() => handleArticleClick(newsData.featuredMedium.title)}
          style={{ cursor: 'pointer' }}
        >
          <img 
            src={newsData.featuredMedium.image} 
            alt={newsData.featuredMedium.title} 
            className={styles.mediumImage} 
            loading="lazy" 
          />
          <div className={styles.mediumOverlay}>
            <span className="badge-neon" style={{ background: 'var(--color-primary)', color: '#000' }}>
              {newsData.featuredMedium.badge}
            </span>
            <h3 className={styles.mediumTitle}>{newsData.featuredMedium.title}</h3>
            <div className={styles.metaRow} style={{ color: '#ffffff' }}>
              <span><FiCalendar size={13} /> {newsData.featuredMedium.date}</span>
              <span><FiEye size={13} /> {newsData.featuredMedium.views}</span>
              <span><FiHeart size={13} /> {newsData.featuredMedium.likes}</span>
            </div>
          </div>
        </motion.div>

        {/* Small List & Navigation */}
        <motion.div 
          className={styles.rightList}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {newsData.newsList.map((item) => (
            <div 
              key={item.id} 
              className={styles.smallItem}
              onClick={() => handleArticleClick(item.title)}
              style={{ cursor: 'pointer' }}
            >
              <img src={item.image} alt={item.title} className={styles.smallThumb} loading="lazy" />
              <div>
                <h4 className={styles.smallTitle}>{item.title}</h4>
              </div>
            </div>
          ))}

          <div className={styles.navRow}>
            <button className={styles.navBtn}>PREV</button>
            <button className={styles.navBtn}>NEXT</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
