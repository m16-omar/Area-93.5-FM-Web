import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FiSearch, FiEye, FiHeart, FiShare2, FiLink, FiMousePointer, FiMusic } from 'react-icons/fi';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import { fetchNewsArticles, fetchNewsCategories, likeArticle, shareArticle } from '../services/newsApi';
import defaultNewsData from '../data/newsData.json';
import styles from './NewsPage.module.css';

const mostListenedTracks = [
  {
    rank: 1,
    title: "Higher",
    artist: "Burna Boy",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=200&q=80"
  },
  {
    rank: 2,
    title: "Calm Down",
    artist: "Rema & Selena Gomez",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=200&q=80"
  },
  {
    rank: 3,
    title: "Die With A Smile",
    artist: "Lady Gaga & Bruno Mars",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=200&q=80"
  }
];

export const NewsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [categories, setCategories] = useState(['ALL']);
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadNews = async () => {
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
        console.warn('Could not fetch news from backend:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadNews();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    } else {
      setSearchParams({});
    }
  };

  const getSlug = (item) => {
    if (!item) return '';
    if (item.slug) return item.slug;
    return item.title ? item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '';
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

  const cleanQuery = searchQuery.toLowerCase().trim();
  const filteredArticles = articles.filter(post => {
    const matchesCat = selectedCategory === 'ALL' || (post.category || '').toUpperCase() === selectedCategory.toUpperCase();
    const matchesSearch = !cleanQuery || 
      post.title?.toLowerCase().includes(cleanQuery) || 
      post.excerpt?.toLowerCase().includes(cleanQuery) ||
      post.category?.toLowerCase().includes(cleanQuery);
    return matchesCat && matchesSearch;
  });

  const displayedArticles = filteredArticles.slice(0, visibleCount);

  return (
    <main className={styles.newsPageContainer}>
      <Navbar />

      {/* 1. HERO BANNER SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.bgCircleTopRight} />
        <div className={styles.glowCircleTeal} />

        <div className={styles.watermarkText}>
          BLOG<br />NEWS
        </div>

        <div className={styles.heroContent}>
          <motion.h1 
            className={styles.mainTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            BLOG & NEWS
          </motion.h1>

          <div className={styles.scrollIndicator}>
            <FiMousePointer />
          </div>
        </div>
      </section>

      {/* 2. MAIN 2-COLUMN LAYOUT */}
      <div className={styles.mainLayout}>
        {/* Left Column: Blog Post Cards Stream */}
        <div className={styles.blogStream}>
          {displayedArticles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '16px' }}>
              <p style={{ fontSize: '1.1rem', color: '#6B7280', margin: '0 0 16px' }}>
                {loading ? 'Loading news from 93.5 Area FM...' : `No articles found matching "${searchQuery}"`}
              </p>
              {searchQuery && (
                <button 
                  className={styles.loadMoreBtn} 
                  onClick={() => { setSearchQuery(''); setSearchParams({}); setSelectedCategory('ALL'); }}
                >
                  CLEAR SEARCH
                </button>
              )}
            </div>
          ) : (
            displayedArticles.map((post, idx) => (
              <motion.article 
                key={post.id || idx}
                className={styles.blogCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => navigate(`/news/${getSlug(post)}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.cardImgWrapper}>
                  <img src={post.image} alt={post.title} className={styles.cardImg} loading="lazy" />
                  <div 
                    className={styles.actionIconCircle} 
                    title="Share Article"
                    onClick={(e) => handleShare(e, post)}
                  >
                    <FiShare2 />
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <span className={styles.catBadge}>{post.category || 'NEWS'}</span>
                  <h2 className={styles.cardTitle}>
                    <Link to={`/news/${getSlug(post)}`} className={styles.titleLink} onClick={(e) => e.stopPropagation()}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className={styles.cardExcerpt}>{post.excerpt}</p>

                  <div className={styles.cardMetaRow}>
                    <span className={styles.metaItem}>📅 {post.date}</span>
                    <span className={styles.metaItem}><FiEye /> {post.views || 0}</span>
                    <button 
                      className={styles.iconBtn} 
                      onClick={(e) => handleLike(e, post)}
                      aria-label="Like article"
                    >
                      <FiHeart /> {post.likes || 0}
                    </button>
                    <button 
                      className={styles.iconBtn} 
                      onClick={(e) => handleShare(e, post)}
                      aria-label="Share article"
                    >
                      <FiShare2 />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))
          )}

          {/* Centered LOAD MORE Button */}
          {visibleCount < filteredArticles.length && (
            <div className={styles.loadMoreWrapper}>
              <button 
                className={styles.loadMoreBtn}
                onClick={() => setVisibleCount(prev => prev + 4)}
              >
                LOAD MORE
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Sticky Sidebar Widgets */}
        <aside className={styles.sidebarCol}>
          {/* SEARCH Widget */}
          <div className={styles.sidebarWidget}>
            <div className={styles.widgetBadgeRow}>
              <span className={styles.widgetBadge}>SEARCH</span>
              <div className={styles.widgetLine} />
            </div>

            <form onSubmit={handleSearchSubmit} className={styles.searchBox}>
              <input
                type="text"
                placeholder="Search in this website"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchIconBtn} aria-label="Search">
                <FiSearch />
              </button>
            </form>
          </div>

          {/* CATEGORIES Widget */}
          {categories.length > 1 && (
            <div className={styles.sidebarWidget}>
              <div className={styles.widgetBadgeRow}>
                <span className={styles.widgetBadge}>CATEGORIES</span>
                <div className={styles.widgetLine} />
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '4px',
                      border: '1px solid rgba(0, 107, 141, 0.2)',
                      background: selectedCategory === cat ? 'var(--primary-orange)' : '#ffffff',
                      color: selectedCategory === cat ? '#ffffff' : '#111827',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: '700',
                      fontSize: '0.72rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* NOW ON AIR Widget */}
          <div className={styles.sidebarWidget}>
            <div className={styles.widgetBadgeRow}>
              <span className={styles.widgetBadge}>NOW ON AIR</span>
              <div className={styles.widgetLine} />
            </div>

            <div 
              className={styles.nowOnAirCard}
              onClick={() => navigate('/shows/the-fan-zone')}
              style={{ cursor: 'pointer' }}
            >
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80" 
                alt="The Fan Zone Show" 
                className={styles.nowOnAirImg} 
              />
              <div className={styles.nowOnAirOverlay}>
                <span className={styles.nowOnAirCat}>TRENDS</span>
                <h3 className={styles.nowOnAirTitle}>The Fan Zone</h3>
                <p className={styles.nowOnAirTime}>11:00 am - 02:30 pm</p>
              </div>
            </div>
          </div>

          {/* MOST LISTENED Widget */}
          <div className={styles.sidebarWidget}>
            <div className={styles.widgetBadgeRow}>
              <span className={styles.widgetBadge}>MOST LISTENED</span>
              <div className={styles.widgetLine} />
            </div>

            <div className={styles.mostListenedList}>
              {mostListenedTracks.map((track) => (
                <div key={track.rank} className={styles.trackRowCard}>
                  <span className={styles.rankBadge}>{track.rank}</span>
                  <img src={track.cover} alt={track.title} className={styles.trackThumb} />
                  <div className={styles.trackMetaInfo}>
                    <h4 className={styles.trackName}>{track.title}</h4>
                    <p className={styles.artistName}>{track.artist}</p>
                  </div>
                  <button className={styles.trackActionBtn} aria-label="Play Track" onClick={() => navigate('/charts')}>
                    <FiMusic />
                  </button>
                </div>
              ))}
            </div>

            <Link to="/charts" className={styles.fullTracklistBtn}>
              FULL TRACKLIST
            </Link>
          </div>
        </aside>
      </div>

      <Footer />
      <LivePlayer />
    </main>
  );
};
