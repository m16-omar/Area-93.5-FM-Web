import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiEye, FiHeart, FiShare2, FiLink, FiMousePointer, FiMusic } from 'react-icons/fi';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import blogPostsData from '../data/blogPostsData.json';
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
  }
];

export const NewsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const blogStreamPosts = [
    {
      id: "b1",
      category: "EVENTS",
      title: "Listener’s Choice Awards: Your Top Picks for This Year’s Music Icons",
      excerpt: "As the heartbeat of the music world, we’re always tuned in to what’s trending, and this week is no exception! From chart-topping hits to the latest artist interviews, we’ve got everything you need to stay updated on the sounds shaping the future of music.",
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1000&q=80",
      date: "August 8, 2026",
      views: 142,
      likes: 28,
      actionType: "share"
    },
    {
      id: "b2",
      category: "ARTISTS",
      title: "From Viral Dance Challenges to Radio Play: How Pop Songs Go Mainstream",
      excerpt: "As the heartbeat of the music world, we’re always tuned in to what’s trending, and this week is no exception! From chart-topping hits to the latest artist interviews, we’ve got everything you need to stay updated on the sounds that are shaping the future of music. Here’s what’s new and...",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80",
      date: "August 5, 2026",
      views: 68,
      likes: 19,
      actionType: "link"
    },
    {
      id: "b3",
      category: "CHARTS",
      title: "Chart Breakdown: What Makes a Song ‘The One’?",
      excerpt: "As the heartbeat of the music world, we’re always tuned in to what’s trending, and this week is no exception! From chart-topping hits to the latest artist interviews, we’ve got everything you need to stay updated on the sounds that are shaping the future of music. Here’s what’s new and...",
      image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=80",
      date: "August 2, 2026",
      views: 95,
      likes: 34,
      actionType: "link"
    }
  ];

  const getSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

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
          {blogStreamPosts.map((post, idx) => (
            <motion.article 
              key={post.id}
              className={styles.blogCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => navigate(`/news/${getSlug(post.title)}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className={styles.cardImgWrapper}>
                <img src={post.image} alt={post.title} className={styles.cardImg} />
                <div className={styles.actionIconCircle} title="Share / Link">
                  {post.actionType === 'share' ? <FiShare2 /> : <FiLink />}
                </div>
              </div>

              <div className={styles.cardBody}>
                <span className={styles.catBadge}>{post.category}</span>
                <h2 className={styles.cardTitle}>
                  <Link to={`/news/${getSlug(post.title)}`} className={styles.titleLink}>
                    {post.title}
                  </Link>
                </h2>
                <p className={styles.cardExcerpt}>{post.excerpt}</p>

                <div className={styles.cardMetaRow}>
                  <span className={styles.metaItem}>📅 {post.date}</span>
                  <span className={styles.metaItem}><FiEye /> {post.views}</span>
                  <button className={styles.iconBtn} onClick={(e) => e.stopPropagation()}><FiHeart /> {post.likes}</button>
                  <button className={styles.iconBtn} onClick={(e) => e.stopPropagation()}><FiShare2 /></button>
                </div>
              </div>
            </motion.article>
          ))}

          {/* Centered LOAD MORE Button */}
          <div className={styles.loadMoreWrapper}>
            <button className={styles.loadMoreBtn}>
              LOAD MORE
            </button>
          </div>
        </div>

        {/* Right Column: Sticky Sidebar Widgets */}
        <aside className={styles.sidebarCol}>
          {/* SEARCH Widget */}
          <div className={styles.sidebarWidget}>
            <div className={styles.widgetBadgeRow}>
              <span className={styles.widgetBadge}>SEARCH</span>
              <div className={styles.widgetLine} />
            </div>

            <div className={styles.searchBox}>
              <input
                type="text"
                placeholder="Search in this website"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <button className={styles.searchIconBtn} aria-label="Search">
                <FiSearch />
              </button>
            </div>
          </div>

          {/* NOW ON AIR Widget */}
          <div className={styles.sidebarWidget}>
            <div className={styles.widgetBadgeRow}>
              <span className={styles.widgetBadge}>NOW ON AIR</span>
              <div className={styles.widgetLine} />
            </div>

            <div className={styles.nowOnAirCard}>
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
                  <button className={styles.trackActionBtn} aria-label="Play Track">
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
