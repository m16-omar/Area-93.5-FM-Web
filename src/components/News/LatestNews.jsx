import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEye, FiHeart, FiShare2, FiCalendar } from 'react-icons/fi';
import { fetchNewsArticles, fetchNewsCategories, likeArticle, shareArticle } from '../../services/newsApi';
import defaultNewsData from '../../data/newsData.json';
import styles from './LatestNews.module.css';

export const LatestNews = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [categories, setCategories] = useState(() => defaultNewsData.categories || ['ALL', 'CONCERTS', 'TRENDS', 'ARTISTS']);
  const [articles, setArticles] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const [newsList, catsList] = await Promise.all([
          fetchNewsArticles(),
          fetchNewsCategories()
        ]);
        if (isMounted) {
          if (newsList && newsList.length > 0) {
            setArticles(newsList);
          }
          if (catsList && catsList.length > 0) {
            setCategories(catsList);
          }
        }
      } catch (err) {
        console.warn('Failed to load news from backend:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();
    return () => { isMounted = false; };
  }, []);

  const getSlug = (item) => {
    if (!item) return '';
    if (item.slug) return item.slug;
    return item.title ? item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '';
  };

  const handleArticleClick = (item) => {
    if (!item) return;
    navigate(`/news/${getSlug(item)}`);
  };

  const handleLike = async (e, item) => {
    e.stopPropagation();
    const newLikes = await likeArticle(item.id || item.slug);
    if (newLikes !== null) {
      setArticles(prev => prev.map(a => (a.id === item.id || a.slug === item.slug) ? { ...a, likes: newLikes } : a));
    }
  };

  const handleShare = async (e, item) => {
    e.stopPropagation();
    await shareArticle(item.id || item.slug);
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.excerpt,
        url: window.location.origin + `/news/${getSlug(item)}`
      }).catch(() => {});
    }
  };

  // Derive active items
  const rawList = articles.length > 0 ? articles : [
    defaultNewsData.featuredBig,
    defaultNewsData.featuredMedium,
    ...(defaultNewsData.newsList || [])
  ];

  const filteredList = activeCategory === 'ALL'
    ? rawList
    : rawList.filter(n => (n.category || '').toUpperCase() === activeCategory.toUpperCase());

  const displayList = filteredList.length > 0 ? filteredList : rawList;

  const featuredBig = displayList[0] || defaultNewsData.featuredBig;
  const featuredMedium = displayList[1] || rawList[1] || defaultNewsData.featuredMedium;
  const streamList = displayList.length > 2 ? displayList.slice(2) : (rawList.length > 2 ? rawList.slice(2) : rawList);

  const itemsPerPage = 3;
  const totalPages = Math.max(1, Math.ceil(streamList.length / itemsPerPage));
  const currentItems = streamList.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage);

  const handlePrev = () => {
    setPageIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setPageIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <section className={styles.newsSection} id="news">
      <div className={styles.watermarkTitle}>LATEST NEWS</div>

      {/* Top Bar with Categories & Sponsors */}
      <div className={styles.topControls}>
        <div className={styles.categoriesBar}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.catBtn} ${activeCategory === cat ? styles.activeCat : ''}`}
              onClick={() => { setActiveCategory(cat); setPageIndex(0); }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.sponsorsBox} onClick={() => navigate('/promote')} style={{ cursor: 'pointer' }}>
          <span className="section-label">SPONSORED BY AREA 93.5 FM</span>
        </div>
      </div>

      <h2 
        className={styles.mainTitle} 
        onClick={() => navigate('/news')}
        style={{ cursor: 'pointer' }}
      >
        LATEST NEWS
      </h2>

      {/* News Grid */}
      <div className={styles.newsGrid}>
        {/* Big Main Featured Card */}
        {featuredBig && (
          <motion.div 
            className={styles.bigCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => handleArticleClick(featuredBig)}
            style={{ cursor: 'pointer' }}
          >
            <div className={styles.bigImageWrapper}>
              <img 
                src={featuredBig.image} 
                alt={featuredBig.title} 
                className={styles.bigImage} 
                loading="lazy" 
              />
            </div>
            <div className={styles.bigContent}>
              <span className="badge-outline">{(featuredBig.category || 'NEWS').toLowerCase()}</span>
              <h3 className={styles.bigTitle}>{featuredBig.title}</h3>
              <div className={styles.metaRow}>
                <span><FiCalendar size={13} /> {featuredBig.date || 'Recent'}</span>
                <span><FiEye size={13} /> {featuredBig.views || 0}</span>
                <span onClick={(e) => handleLike(e, featuredBig)} style={{ cursor: 'pointer' }}>
                  <FiHeart size={13} /> {featuredBig.likes || 0}
                </span>
                <FiShare2 size={13} style={{ cursor: 'pointer' }} onClick={(e) => handleShare(e, featuredBig)} />
              </div>
            </div>
          </motion.div>
        )}

        {/* Medium Featured Card */}
        {featuredMedium && (
          <motion.div 
            className={styles.mediumCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => handleArticleClick(featuredMedium)}
            style={{ cursor: 'pointer' }}
          >
            <img 
              src={featuredMedium.image} 
              alt={featuredMedium.title} 
              className={styles.mediumImage} 
              loading="lazy" 
            />
            <div className={styles.mediumOverlay}>
              <span className="badge-neon" style={{ background: 'var(--color-primary)', color: '#000' }}>
                {featuredMedium.category || 'TOP PICK'}
              </span>
              <h3 className={styles.mediumTitle}>{featuredMedium.title}</h3>
              <div className={styles.metaRow} style={{ color: '#ffffff' }}>
                <span><FiCalendar size={13} /> {featuredMedium.date || 'Recent'}</span>
                <span><FiEye size={13} /> {featuredMedium.views || 0}</span>
                <span onClick={(e) => handleLike(e, featuredMedium)} style={{ cursor: 'pointer' }}>
                  <FiHeart size={13} /> {featuredMedium.likes || 0}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Small List & Navigation */}
        <motion.div 
          className={styles.rightList}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {currentItems.map((item) => (
            <div 
              key={item.id} 
              className={styles.smallItem}
              onClick={() => handleArticleClick(item)}
              style={{ cursor: 'pointer' }}
            >
              <img src={item.image} alt={item.title} className={styles.smallThumb} loading="lazy" />
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-primary)', fontWeight: '700', textTransform: 'uppercase' }}>
                  {item.category || 'NEWS'}
                </span>
                <h4 className={styles.smallTitle}>{item.title}</h4>
              </div>
            </div>
          ))}

          {totalPages > 1 && (
            <div className={styles.navRow}>
              <button className={styles.navBtn} onClick={handlePrev} aria-label="Previous News">PREV</button>
              <button className={styles.navBtn} onClick={handleNext} aria-label="Next News">NEXT</button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
