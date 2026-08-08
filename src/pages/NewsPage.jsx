import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiCalendar, FiUser, FiEye, FiHeart, FiArrowRight } from 'react-icons/fi';
import { Navbar } from '../components/Navbar/Navbar';
import { NewsletterCTA } from '../components/NewsletterCTA/NewsletterCTA';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import blogPostsData from '../data/blogPostsData.json';
import newsData from '../data/newsData.json';
import styles from './NewsPage.module.css';

export const NewsPage = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = ['ALL', 'CONCERTS', 'TRENDS', 'ARTISTS', 'EVENTS', 'INTERVIEWS'];

  const filteredPosts = activeCategory === 'ALL'
    ? blogPostsData
    : blogPostsData.filter((post) => post.category.toUpperCase() === activeCategory);

  const featuredHero = blogPostsData[0] || {
    id: "hero-1",
    title: "Listener’s Choice Awards: Your Top Picks for This Year’s Music Icons",
    category: "Events",
    date: "August 8, 2026",
    excerpt: "As the heartbeat of the music world, we’re always tuned in to what’s trending! From chart-topping hits to the latest artist interviews, here’s everything you need to stay updated.",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1000&q=80",
    author: "Jordan Carter",
    views: 142,
    likes: 28
  };

  const articleGrid = filteredPosts.length > 1 ? filteredPosts.slice(1) : filteredPosts;

  return (
    <main className={styles.newsPageContainer}>
      <Navbar />

      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <div className={styles.heroBgGlow} />
        <div className={styles.heroContent}>
          <div className={styles.breadcrumbRow}>
            <Link to="/" className={styles.breadcrumbLink}>Home</Link>
            <FiChevronRight size={14} />
            <span>News</span>
          </div>

          <h1 className={styles.heroTitle}>LATEST NEWS & MUSIC UPDATES</h1>
          <p className={styles.heroSubtitle}>
            Stay informed with breaking music news, exclusive celebrity interviews, festival announcements, and culture trends from Area 93.5 FM.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className={styles.mainLayout}>
        {/* Left Column: News Feed */}
        <div>
          {/* Category Filters */}
          <div className={styles.filterRow}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.catBtn} ${activeCategory === cat ? styles.catBtnActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Big Featured Story Card */}
          <motion.article 
            className={styles.featuredHeroCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.featuredHeroImgWrapper}>
              <img 
                src={featuredHero.image} 
                alt={featuredHero.title} 
                className={styles.featuredHeroImg} 
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1000&q=80";
                }}
              />
            </div>
            <div className={styles.featuredHeroContent}>
              <span className={styles.catTag}>{featuredHero.category}</span>
              <h2 className={styles.featuredTitle}>{featuredHero.title}</h2>
              <p className={styles.featuredExcerpt}>{featuredHero.excerpt}</p>

              <div className={styles.metaRow}>
                <span className={styles.metaItem}><FiUser size={13} style={{ color: 'var(--primary-orange)' }} /> {featuredHero.author}</span>
                <span className={styles.metaItem}><FiCalendar size={13} /> {featuredHero.date}</span>
                <span className={styles.metaItem}><FiEye size={13} /> {featuredHero.views}</span>
                <span className={styles.metaItem}><FiHeart size={13} /> {featuredHero.likes}</span>
              </div>
            </div>
          </motion.article>

          {/* Articles Grid */}
          <div className={styles.articlesGrid}>
            {articleGrid.map((post) => (
              <motion.article 
                key={post.id} 
                className={styles.articleCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className={styles.articleImgWrapper}>
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className={styles.articleImg} 
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                </div>
                <div className={styles.articleBody}>
                  <span className={styles.catTag}>{post.category}</span>
                  <h3 className={styles.articleTitle}>{post.title}</h3>
                  <p className={styles.articleExcerpt}>{post.excerpt}</p>

                  <button className={styles.readMoreBtn}>
                    <span>READ ARTICLE</span>
                    <FiArrowRight size={14} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className={styles.sidebar}>
          {/* Popular Read Stories */}
          <div className={styles.sidebarBox}>
            <div className={styles.sidebarHeadingWrapper}>
              <span className={styles.sidebarTagBadge}>TOP READ</span>
              <div className={styles.sidebarLine} />
            </div>
            <h3 className={styles.sidebarTitle}>POPULAR STORIES</h3>

            <div className={styles.popularList}>
              {newsData.newsList.map((item) => (
                <div key={item.id} className={styles.popularItem}>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className={styles.popularThumb} 
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=300&q=80";
                    }}
                  />
                  <div>
                    <span className={styles.catTag} style={{ fontSize: '0.6rem', padding: '1px 4px', marginBottom: '4px' }}>
                      {item.category}
                    </span>
                    <h4 className={styles.popularItemTitle}>{item.title}</h4>
                    <span className={styles.popularItemDate}>August 2026</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <NewsletterCTA />
      <Footer />
      <LivePlayer />
    </main>
  );
};
