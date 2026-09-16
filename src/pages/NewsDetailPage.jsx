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
import { SEO } from '../components/SEO/SEO';
import { getArticleSchema, getBreadcrumbSchema } from '../utils/seoSchemas';
import { SEO_KEYWORDS } from '../utils/seoKeywords';
import styles from './NewsDetailPage.module.css';

export const NewsDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
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
        // 1. Fetch main article first for fastest paint
        const fetchedArticle = await fetchNewsDetail(slug);

        if (isMounted) {
          if (fetchedArticle) {
            setArticle(fetchedArticle);
            setLoading(false);
            trackArticleView(fetchedArticle.id || slug);
          } else {
            setArticle(null);
            setLoading(false);
          }
        }

        // 2. Concurrently load suggestions in background
        fetchNewsArticles().then((allArticles) => {
          if (isMounted && allArticles && allArticles.length > 0) {
            const cleanSlug = String(slug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
            const others = allArticles.filter(a => {
              const aSlug = String(a.slug || a.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
              return aSlug !== cleanSlug && String(a.id) !== String(fetchedArticle?.id);
            });
            setSimilarPosts(others.slice(0, 4));
          }
        }).catch(() => {});

      } catch (err) {
        console.warn('Error fetching article detail:', err);
        if (isMounted) {
          setArticle(null);
          setLoading(false);
        }
      }
    };

    loadArticle();
    return () => { isMounted = false; };
  }, [slug]);

  const handleLike = async () => {
    if (!article) return;
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
    if (!article) return;
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

  // Loading State
  if (loading) {
    return (
      <main className={styles.newsDetailPageWrapper}>
        <Navbar />
        <div className={styles.loadingSkeletonContainer}>
          <div className={styles.skeletonLine} style={{ width: '30%', margin: '0 auto 20px' }} />
          <div className={styles.skeletonLine} style={{ height: '36px', width: '80%', margin: '0 auto 20px' }} />
          <div className={styles.skeletonLine} style={{ width: '40%', margin: '0 auto 40px' }} />
          <div className={styles.skeletonLine} style={{ height: '320px', width: '100%', borderRadius: '8px' }} />
          <div className={styles.skeletonLine} style={{ width: '100%', marginTop: '30px' }} />
          <div className={styles.skeletonLine} style={{ width: '90%' }} />
          <div className={styles.skeletonLine} style={{ width: '95%' }} />
        </div>
        <Footer />
        <LivePlayer />
      </main>
    );
  }

  // Not Found State
  if (!article) {
    return (
      <main className={styles.newsDetailPageWrapper}>
        <Navbar />
        <div className={styles.notFoundContainer}>
          <h1 className={styles.notFoundTitle}>ARTICLE NOT FOUND</h1>
          <p className={styles.notFoundText}>
            The requested article could not be found or has been moved. Explore the latest verified news from 93.5 Area FM below.
          </p>
          <button className={styles.notFoundBtn} onClick={() => navigate('/news')}>
            <FiArrowLeft /> BROWSE ALL NEWS
          </button>

          {similarPosts.length > 0 && (
            <div className={styles.similarPostsWrapper} style={{ marginTop: '48px', textAlign: 'left' }}>
              <div className={styles.similarHeader}>
                <span className={styles.similarLabel}>LATEST STORIES</span>
                <span className={styles.similarAccentLine} />
              </div>
              <div className={styles.similarGrid}>
                {similarPosts.slice(0, 2).map((post, idx) => (
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
        <Footer />
        <LivePlayer />
      </main>
    );
  }

  const articleUrl = `https://area935fm.ng/news/${article.slug || slug}`;
  const detailSchema = {
    "@context": "https://schema.org",
    "@graph": [
      getArticleSchema(article, articleUrl),
      getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "News", url: "/news" },
        { name: article.title || "Article", url: `/news/${article.slug || slug}` }
      ])
    ]
  };

  return (
    <main className={styles.newsDetailPageWrapper}>
      <SEO 
        title={article.title}
        description={article.excerpt || article.content?.substring(0, 160) || "Read the latest news update on Area 93.5 FM Lagos."}
        image={article.heroImage || article.image}
        canonicalUrl={articleUrl}
        type="article"
        keywords={[
          ...(article.tags || []),
          ...SEO_KEYWORDS.longTailNews,
          article.category || "News",
          "Area 93.5 FM news report"
        ]}
        schemaJson={detailSchema}
      />
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
            {article.sections && article.sections.length > 0 && article.sections
              .filter(sec => sec && sec.content && sec.content !== article.content && sec.heading?.toLowerCase() !== 'full story')
              .map((sec, idx) => (
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
