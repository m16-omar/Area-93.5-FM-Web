import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaInstagram, FaYoutube, FaSpotify, FaFacebookF, 
  FaPinterest, FaLinkedinIn, FaWhatsapp, FaTelegramPlane, FaStar, FaShareAlt, FaHeart, FaComment
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiSearch, FiCalendar, FiClock, FiArrowRight, FiMoreVertical, FiShoppingCart, FiEye } from 'react-icons/fi';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import { 
  fetchNewsDetail, 
  fetchNewsArticles, 
  trackArticleView, 
  likeArticle, 
  shareArticle 
} from '../services/newsApi';
import styles from './NewsDetailPage.module.css';

// Fallback generator for custom article slug if backend is temporarily unreachable
const buildFallbackArticle = (slug) => {
  let cleanTitle = slug
    ? slug
        .replace(/-s-/g, "’s ")
        .replace(/-s$/g, "’s")
        .replace(/-t-/g, "’t ")
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : "Breaking Music & Culture News";

  return {
    id: `fallback-${slug}`,
    slug: slug || "breaking-music-and-culture-news",
    category: "NEWS",
    title: cleanTitle,
    date: "August 15, 2026",
    comments: 18,
    likes: 42,
    views: 120,
    author: "93.5 Area FM Editorial Desk",
    authorRole: "Music & News Department",
    heroImage: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
    inArticleImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    tags: ["ARTISTS", "CHARTS", "DJ", "EVENTS", "HITS", "MUSIC", "AFROBEATS", "LAGOS"],
    excerpt: "As the heartbeat of the music world, 93.5 Area FM brings you complete breaking coverage on trending music, festival announcements, and chart-topping songs.",
    content: "Stay up to date with the latest breaking stories, Afrobeats releases, music industry analyses, and culture news straight from 93.5 Area FM.",
    sections: [
      {
        heading: "Top Tracks You Can’t Miss",
        content: "If you haven’t heard the latest tracks dominating the charts, now’s the time to tune in! We bring you the full rundown of songs taking over airwaves and streaming playlists."
      },
      {
        heading: "Exclusive Artist Insights",
        content: "We sit down with top talents to understand their musical journey, studio habits, and the creative vision behind their latest records."
      }
    ]
  };
};

const mostListenedTracks = [
  { rank: 1, title: "Die With A Smile", artist: "Lady Gaga & Bruno Mars", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=120&q=80" },
  { rank: 2, title: "Higher", artist: "Burna Boy", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=120&q=80" },
  { rank: 3, title: "Calm Down", artist: "Rema", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=120&q=80" }
];

export const NewsDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(() => buildFallbackArticle(slug));
  const [similarPosts, setSimilarPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    let isMounted = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const loadArticle = async () => {
      setLoading(true);
      try {
        // Fetch article detail and all articles for similar suggestions in parallel
        const [fetchedArticle, allArticles] = await Promise.all([
          fetchNewsDetail(slug),
          fetchNewsArticles()
        ]);

        if (isMounted) {
          if (fetchedArticle) {
            setArticle(fetchedArticle);
            // Track view count on backend
            trackArticleView(fetchedArticle.id || slug);
          } else {
            setArticle(buildFallbackArticle(slug));
          }

          if (allArticles && allArticles.length > 0) {
            const cleanSlug = String(slug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
            const others = allArticles.filter(a => {
              const aSlug = String(a.slug || a.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
              return aSlug !== cleanSlug && a.id !== (fetchedArticle?.id);
            });
            setSimilarPosts(others.slice(0, 2));
          }
        }
      } catch (err) {
        console.warn('Error fetching article detail:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadArticle();
    return () => { isMounted = false; };
  }, [slug]);

  const handleLike = async () => {
    const newLikes = await likeArticle(article.id || slug);
    if (newLikes !== null) {
      setArticle(prev => ({ ...prev, likes: newLikes }));
      setLiked(true);
    } else {
      setArticle(prev => ({ ...prev, likes: (prev.likes || 0) + (liked ? -1 : 1) }));
      setLiked(!liked);
    }
  };

  const handleShare = async (platform = 'native') => {
    await shareArticle(article.id || slug);
    const url = window.location.href;
    const title = article.title || '93.5 Area FM News';

    if (platform === 'native') {
      if (navigator.share) {
        navigator.share({ title, text: article.excerpt, url }).catch(() => {});
        return;
      }
      platform = 'tw';
    }

    const shareUrls = {
      fb: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      tw: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      wa: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`,
      in: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      tg: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      pin: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'noopener,noreferrer,width=600,height=500');
    }
  };

  const handleSidebarSearchSubmit = (e) => {
    e.preventDefault();
    if (sidebarSearch.trim()) {
      navigate(`/news?q=${encodeURIComponent(sidebarSearch.trim())}`);
    }
  };

  const getSlug = (item) => {
    if (!item) return '';
    if (item.slug) return item.slug;
    return item.title ? item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '';
  };

  const isHtml = (str) => /<[a-z][\s\S]*>/i.test(str || '');

  return (
    <main className={styles.newsDetailPageWrapper}>
      <Navbar />

      {/* 1. HERO HEADER SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.watermarkBgWrap}>
          <img src={article.heroImage || article.image} alt={article.title} className={styles.watermarkImage} />
          <div className={styles.watermarkFadeOverlay} />
        </div>

        <div className={styles.heroContainer}>
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.categoryBadge}>{article.category || 'NEWS'}</span>
            <h1 className={styles.articleMainTitle}>{article.title}</h1>

            <div className={styles.metaRow}>
              <span className={styles.metaItem}>
                <FiCalendar size={13} /> {article.date || 'Recent'}
              </span>
              <span className={styles.metaDivider}>•</span>
              <span className={styles.metaItem}>
                <FiEye size={13} /> {article.views || 0} views
              </span>
              <span className={styles.metaDivider}>•</span>
              <span className={styles.metaItem} onClick={handleLike} style={{ cursor: 'pointer' }}>
                <FaHeart size={12} className={styles.heartIcon} style={{ color: liked ? '#E50914' : undefined }} /> {article.likes || 0}
              </span>
            </div>
          </motion.div>

          <div className={styles.scrollDownIndicator}>
            <div className={styles.mouseIcon}>
              <span className={styles.mouseWheelDot} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN 2-COLUMN CONTENT & SIDEBAR */}
      <section className={styles.bodySection}>
        <div className={styles.bodyGridContainer}>

          {/* LEFT: MAIN ARTICLE BODY */}
          <div className={styles.mainArticleCol}>
            {/* Featured Image */}
            <div className={styles.featuredImageWrap}>
              <img 
                src={article.heroImage || article.image} 
                alt={article.title} 
                className={styles.featuredImage} 
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80';
                }}
              />
            </div>

            {/* Introductory excerpt */}
            {article.excerpt && (
              <p className={styles.introParagraph}>{article.excerpt}</p>
            )}

            {/* Full Story Content */}
            {article.content && (
              <div className={styles.articleSectionBlock}>
                {isHtml(article.content) ? (
                  <div 
                    className={styles.sectionParagraph}
                    dangerouslySetInnerHTML={{ __html: article.content }} 
                  />
                ) : (
                  article.content.split('\n\n').map((para, pIdx) => (
                    <p key={pIdx} className={styles.sectionParagraph}>{para}</p>
                  ))
                )}
              </div>
            )}

            {/* Dynamic Article Sections if any */}
            {article.sections && article.sections.length > 0 && article.sections.map((sec, idx) => (
              <div key={idx} className={styles.articleSectionBlock}>
                {sec.heading && <h2 className={styles.sectionHeading}>{sec.heading}</h2>}
                {isHtml(sec.content) ? (
                  <div 
                    className={styles.sectionParagraph}
                    dangerouslySetInnerHTML={{ __html: sec.content }} 
                  />
                ) : (
                  <p className={styles.sectionParagraph}>{sec.content}</p>
                )}
                
                {/* Mid-article showcase portrait image after 4th section */}
                {idx === 4 && article.inArticleImage && (
                  <div className={styles.inArticleImageWrap}>
                    <img src={article.inArticleImage} alt="Featured Artist" className={styles.inArticleImage} />
                  </div>
                )}
              </div>
            ))}

            <div className={styles.authorCreditBlock}>
              <p className={styles.authorText}>
                Written by: <strong className={styles.authorName}>{article.author || '93.5 Area FM Editorial Desk'}</strong> ({article.authorRole || 'Music & News Department'})
              </p>
            </div>

            {/* Tag Cloud */}
            <div className={styles.tagCloudRow}>
              {(article.tags || ["NEWS", "AFROBEATS", "CHARTS", "LAGOS"]).map((tag, idx) => (
                <span key={idx} className={styles.tagPill}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Social Share & Star Rating Bar */}
            <div className={styles.shareRatingBar}>
              <div className={styles.shareButtonsGroup}>
                <button className={`${styles.shareBtn} ${styles.pinBtn}`} aria-label="Pinterest" onClick={() => handleShare('pin')}><FaPinterest /></button>
                <button className={`${styles.shareBtn} ${styles.fbBtn}`} aria-label="Facebook" onClick={() => handleShare('fb')}><FaFacebookF /></button>
                <button className={`${styles.shareBtn} ${styles.twBtn}`} aria-label="X" onClick={() => handleShare('tw')}><FaXTwitter /></button>
                <button className={`${styles.shareBtn} ${styles.inBtn}`} aria-label="LinkedIn" onClick={() => handleShare('in')}><FaLinkedinIn /></button>
                <button className={`${styles.shareBtn} ${styles.waBtn}`} aria-label="WhatsApp" onClick={() => handleShare('wa')}><FaWhatsapp /></button>
                <button className={`${styles.shareBtn} ${styles.tgBtn}`} aria-label="Telegram" onClick={() => handleShare('tg')}><FaTelegramPlane /></button>
              </div>

              <div className={styles.starRatingWidget}>
                <span className={styles.ratingPrompt}>RATE IT:</span>
                <div className={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      size={15}
                      className={`${styles.starIcon} ${(hoverRating || rating) >= star ? styles.starActive : ''}`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* SIMILAR POSTS */}
            {similarPosts.length > 0 && (
              <div className={styles.similarPostsWrapper}>
                <div className={styles.similarHeader}>
                  <span className={styles.similarLabel}>SIMILAR POSTS</span>
                  <span className={styles.similarAccentLine} />
                </div>

                <div className={styles.similarGrid}>
                  {similarPosts.map((post, idx) => (
                    <div 
                      key={idx} 
                      className={styles.similarCard}
                      onClick={() => navigate(`/news/${getSlug(post)}`)}
                    >
                      <div className={styles.similarImageWrap}>
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className={styles.similarImage} 
                          loading="lazy" 
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80';
                          }}
                        />
                        <span className={styles.similarCategoryBadge}>{post.category || 'NEWS'}</span>
                      </div>

                      <div className={styles.similarMetaContent}>
                        <h3 className={styles.similarPostTitle}>{post.title}</h3>
                        <div className={styles.similarCardFooter}>
                          <span className={styles.similarDate}><FiCalendar size={11} /> {post.date}</span>
                          <span className={styles.similarComments}><FiEye size={11} /> {post.views || 0} views</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: SIDEBAR WIDGETS */}
          <aside className={styles.sidebarCol}>

            {/* 1. SEARCH WIDGET */}
            <div className={styles.sidebarWidget}>
              <div className={styles.widgetHeader}>
                <span className={styles.widgetBadge}>SEARCH</span>
                <span className={styles.widgetAccentLine} />
              </div>

              <form onSubmit={handleSidebarSearchSubmit} className={styles.searchForm}>
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  value={sidebarSearch}
                  onChange={(e) => setSidebarSearch(e.target.value)}
                  className={styles.searchInput} 
                />
                <button type="submit" className={styles.searchBtn} aria-label="Search">
                  <FiSearch size={15} />
                </button>
              </form>
            </div>

            {/* 2. NOW ON AIR WIDGET */}
            <div className={styles.sidebarWidget}>
              <div className={styles.widgetHeader}>
                <span className={styles.widgetBadge}>NOW ON AIR</span>
                <span className={styles.widgetAccentLine} />
              </div>

              <div 
                className={styles.nowOnAirCard}
                onClick={() => navigate('/shows/the-fan-zone')}
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80" 
                  alt="The Fan Zone" 
                  className={styles.nowOnAirBg} 
                />
                <div className={styles.nowOnAirOverlay}>
                  <span className={styles.nowOnAirPill}>LIVE SHOW</span>
                  <div className={styles.nowOnAirInfo}>
                    <h4 className={styles.nowOnAirTitle}>The Fan Zone</h4>
                    <p className={styles.nowOnAirTime}>11:00 am - 02:30 pm • Area FM</p>
                  </div>
                  <button className={styles.nowOnAirMoreBtn} aria-label="Show Details">
                    <FiMoreVertical />
                  </button>
                </div>
              </div>
            </div>

            {/* 3. MOST LISTENED (TOP TRACKS) WIDGET */}
            <div className={styles.sidebarWidget}>
              <div className={styles.widgetHeader}>
                <span className={styles.widgetBadge}>MOST LISTENED</span>
                <span className={styles.widgetAccentLine} />
              </div>

              <div className={styles.mostListenedStack}>
                {mostListenedTracks.map((track, idx) => (
                  <div key={idx} className={styles.trackItemCard}>
                    <div className={styles.trackRank}>{track.rank}</div>
                    <img src={track.cover} alt={track.title} className={styles.trackCover} />
                    
                    <div className={styles.trackMeta}>
                      <h4 className={styles.trackTitle}>{track.title}</h4>
                      <p className={styles.trackArtist}>{track.artist}</p>
                    </div>

                    <button 
                      className={styles.trackCartBtn} 
                      aria-label="Track Action"
                      onClick={() => navigate('/charts')}
                    >
                      <FiShoppingCart size={13} />
                    </button>
                  </div>
                ))}

                <button 
                  className={styles.fullTracklistBtn}
                  onClick={() => navigate('/charts')}
                >
                  FULL TRACKLIST
                </button>
              </div>
            </div>

          </aside>
        </div>
      </section>

      {/* Floating Share Button */}
      <button className={styles.floatingShareBtn} aria-label="Share Article" onClick={() => handleShare('native')}>
        <FaShareAlt size={16} />
      </button>

      <Footer />
      <LivePlayer />
    </main>
  );
};
