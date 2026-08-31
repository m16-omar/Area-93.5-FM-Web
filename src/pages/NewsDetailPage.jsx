import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaInstagram, FaYoutube, FaSpotify, FaFacebookF, 
  FaPinterest, FaLinkedinIn, FaWhatsapp, FaTelegramPlane, FaStar, FaShareAlt, FaHeart, FaComment
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiSearch, FiCalendar, FiClock, FiArrowRight, FiMoreVertical, FiShoppingCart } from 'react-icons/fi';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import { useAudioPlayer, LIVE_STREAM_URL } from '../context/AudioPlayerContext';
import styles from './NewsDetailPage.module.css';

// Rich articles catalog mapping by slug
const articlesCatalog = {
  "listeners-choice-awards-your-top-picks-for-this-years-music-icons": {
    slug: "listeners-choice-awards-your-top-picks-for-this-years-music-icons",
    category: "EVENTS",
    title: "Listener’s Choice Awards: Your Top Picks for This Year’s Music Icons",
    date: "January 8, 2026",
    comments: 61,
    likes: 142,
    author: "Simi Ogunleye",
    authorRole: "Senior Entertainment Editor",
    heroImage: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
    inArticleImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    tags: ["ARTISTS", "CHARTS", "DJ", "EVENTS", "HITS", "MUSIC", "POP", "REVIEWS", "AFROBEATS"],
    intro: "As the heartbeat of the music world, we’re always tuned in to what’s trending, and this week is no exception! From chart-topping hits to the latest artist interviews, we’ve got everything you need to stay updated on the sounds that are shaping the future of music. Here’s what’s new and exciting in the world of commercial and African pop music right now.",
    sections: [
      {
        heading: "Top Tracks You Can’t Miss",
        content: "If you haven’t heard the latest tracks dominating the charts, now’s the time to tune in! This week, we’re all about the 'Hot List', featuring the biggest pop and Afrobeats anthems that everyone is talking about. From electrifying dance bangers to heartwarming ballads, these songs are taking over airwaves and streaming platforms alike. The question is, did your favorites make the cut?"
      },
      {
        heading: "Exclusive Artist Interviews",
        content: "We’re bringing you closer to the artists you love with our exclusive interviews! This week, we caught up with Kendal, the breakout star of the year. Known for their chart-topping single 'Formal', Kendal opened up about their journey to success, the inspiration behind their music, and what's next for their evolving career. Don't miss out on hearing the stories behind the songs that define our playlists."
      },
      {
        heading: "Behind the Scenes: The Making of a Hit",
        content: "Ever wonder what goes into crafting a pop anthem? In this week's 'Hit Makers' segment, we take a deep dive into the process of producing a smash hit. From the first studio session to the final polished track, discover the secrets behind creating a song that connects with millions of fans. This week, we’re breaking down the sound of 'Die With A Smile' — the track that’s currently taking the world by storm."
      },
      {
        heading: "Trending on Social Media: The Songs You’re Talking About",
        content: "We know you're always on your phone, scrolling through your social media feeds — and so are we! That's why we're keeping tabs on the latest music trends across platforms like TikTok, Instagram, and Twitter. This week, 'In the End' is the track everyone is obsessed with, sparking viral challenges and thousands of posts from fans. Tune in to find out what's driving the hype and how you can be a part of it!"
      },
      {
        heading: "Fan Poll: Your Favorite Song of the Week",
        content: "We love hearing from you, our listeners! Every week, we take a poll to find out which songs are making the biggest impact on our audience. This week, 'Changing Smiles' leads the pack, with fans voting it as their favorite track of the week! Will it stay on top, or will a new hit emerge to take the crown? Make sure to cast your vote for next week's Listener's Choice!"
      },
      {
        heading: "Upcoming Events: Don’t Miss Out!",
        content: "Exciting events are on the horizon, and we’re bringing you exclusive access! From live concerts to virtual listening parties, there’s always something happening in the world of pop music. This week, join us for the Pop Hits Live Show streaming this Saturday night, featuring performances from some of your favorite stars. Stay tuned for more details and ticket information."
      }
    ]
  },
  "from-viral-dance-challenges-to-radio-play-how-pop-songs-go-mainstream": {
    slug: "from-viral-dance-challenges-to-radio-play-how-pop-songs-go-mainstream",
    category: "TRENDS",
    title: "From Viral Dance Challenges to Radio Play: How Pop Songs Go Mainstream",
    date: "August 15, 2026",
    comments: 48,
    likes: 92,
    author: "Funke Akindele",
    authorRole: "Culture & Trends Editor",
    heroImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    inArticleImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
    tags: ["TRENDS", "TIKTOK", "AFROBEATS", "CHARTS", "VIRAL", "DANCE", "RADIO"],
    intro: "Social media algorithms and dance creators in Lagos, London, and Atlanta have transformed how records break into mainstream global radio. Here is how a 15-second snippet becomes a stadium anthem.",
    sections: [
      {
        heading: "The 15-Second Hook Phenomenon",
        content: "Before a record hits FM transmitters, it often starts as an unreleased acoustic riff or high-tempo hook on creator feeds. Songs engineered with relatable dance routines spread faster than traditional PR campaigns."
      },
      {
        heading: "Radio DJs as the Final Gatekeepers",
        content: "While social media sparks initial virality, radio airplay provides cultural staying power. Stations like 93.5 Area FM validate internet buzz by adding grassroots hits into daily rotation."
      },
      {
        heading: "Listener Feedback & Phone-Ins",
        content: "The real test of any viral track comes when listeners call into the request lines. If real drivers and office workers ask for the song repeatedly, it secures a permanent slot on the weekly Top 40."
      }
    ]
  },
  "the-2026-pop-music-festival-you-cant-miss": {
    slug: "the-2026-pop-music-festival-you-cant-miss",
    category: "CONCERTS",
    title: "The 2026 Pop Music Festival You Can’t Miss",
    date: "January 8, 2026",
    comments: 34,
    likes: 110,
    author: "Tobi Adebayo",
    authorRole: "Events & Music Specialist",
    heroImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
    inArticleImage: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80",
    tags: ["CONCERTS", "FESTIVAL", "LIVE", "STAGE", "ARTISTS", "LAGOS"],
    intro: "Festival season is kicking into overdrive with multi-stage experiences, sound immersion tents, and all-star lineups heading to Lagos and Abuja.",
    sections: [
      {
        heading: "Unmatched Lineup of Global & African Stars",
        content: "Featuring headliners across Afrobeats, Amapiano, R&B, and international pop, this year's festival is primed to be the largest cultural gathering in West Africa."
      },
      {
        heading: "Exclusive Backstage Access with 93.5 Area FM",
        content: "Our broadcast crew will be on ground streaming live interviews, acoustic VIP tent sets, and instant festival updates across all our channels."
      }
    ]
  },
  "the-best-of-both-worlds-how-commercial-and-indie-music-are-coming-together": {
    slug: "the-best-of-both-worlds-how-commercial-and-indie-music-are-coming-together",
    category: "ARTISTS",
    title: "The Best of Both Worlds: How Commercial and Indie Music Are Coming Together",
    date: "January 8, 2026",
    comments: 18,
    likes: 76,
    author: "Kemi Adetiba",
    authorRole: "Music Journalist",
    heroImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    inArticleImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    tags: ["ARTISTS", "INDIE", "COLLABORATIONS", "PRODUCTION", "SOUND"],
    intro: "The line between underground indie creativity and commercial chart dominance is blurring faster than ever.",
    sections: [
      {
        heading: "Genre-Bending Production Styles",
        content: "Producers are fusing indie alternative guitars with heavy 808s and Afro-percussions, creating fresh textures that appeal to purists and club crowds alike."
      },
      {
        heading: "Independent Distribution Power",
        content: "Independent creators now command direct distribution tools, forcing major record labels to adapt and collaborate on artists' own terms."
      }
    ]
  }
};

// Fallback generator for any custom article slug
const buildFallbackArticle = (slug) => {
  const cleanTitle = slug
    ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : "Listener’s Choice Awards: Your Top Picks for This Year’s Music Icons";

  return {
    slug: slug || "listeners-choice-awards-your-top-picks-for-this-years-music-icons",
    category: "MUSIC NEWS",
    title: cleanTitle,
    date: "January 8, 2026",
    comments: 42,
    likes: 88,
    author: "93.5 Area FM Editorial Desk",
    authorRole: "Music & News Department",
    heroImage: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
    inArticleImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    tags: ["ARTISTS", "CHARTS", "DJ", "EVENTS", "HITS", "MUSIC", "POP", "REVIEWS"],
    intro: "As the heartbeat of the music world, 93.5 Area FM brings you complete breaking coverage on trending music, festival announcements, and chart-topping songs.",
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

export const NewsDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [sidebarSearch, setSidebarSearch] = useState('');

  // Resolve article
  const article = articlesCatalog[slug] || buildFallbackArticle(slug);

  const similarPosts = [
    {
      slug: "the-2026-pop-music-festival-you-cant-miss",
      title: "The 2026 Pop Music Festival You Can’t Miss",
      category: "CONCERTS",
      date: "January 8, 2026",
      comments: 34,
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80"
    },
    {
      slug: "the-best-of-both-worlds-how-commercial-and-indie-music-are-coming-together",
      title: "The Best of Both Worlds: How Commercial and Indie Music Are Coming Together",
      category: "ARTISTS",
      date: "January 8, 2026",
      comments: 18,
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const mostListened = [
    { rank: 1, title: "Die With A Smile", artist: "Lady Gaga & Bruno Mars", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=120&q=80" },
    { rank: 2, title: "Sweater Weather", artist: "The Neighbourhood", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=120&q=80" }
  ];

  const handleSidebarSearchSubmit = (e) => {
    e.preventDefault();
    if (sidebarSearch.trim()) {
      navigate(`/news?q=${encodeURIComponent(sidebarSearch.trim())}`);
    }
  };

  return (
    <main className={styles.newsDetailPageWrapper}>
      <Navbar />

      {/* 1. HERO HEADER SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.watermarkBgWrap}>
          <img src={article.heroImage} alt={article.title} className={styles.watermarkImage} />
          <div className={styles.watermarkFadeOverlay} />
        </div>

        <div className={styles.heroContainer}>
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.categoryBadge}>{article.category}</span>
            <h1 className={styles.articleMainTitle}>{article.title}</h1>

            <div className={styles.metaRow}>
              <span className={styles.metaItem}>
                <FiCalendar size={13} /> {article.date}
              </span>
              <span className={styles.metaDivider}>•</span>
              <span className={styles.metaItem}>
                <FaComment size={12} /> {article.comments}
              </span>
              <span className={styles.metaDivider}>•</span>
              <span className={styles.metaItem}>
                <FaHeart size={12} className={styles.heartIcon} /> {article.likes}
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
              <img src={article.heroImage} alt={article.title} className={styles.featuredImage} />
            </div>

            {/* Introductory text */}
            <p className={styles.introParagraph}>{article.intro}</p>

            {/* Dynamic Article Sections */}
            {article.sections && article.sections.map((sec, idx) => (
              <div key={idx} className={styles.articleSectionBlock}>
                <h2 className={styles.sectionHeading}>{sec.heading}</h2>
                <p className={styles.sectionParagraph}>{sec.content}</p>
                
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
                Written by: <strong className={styles.authorName}>{article.author}</strong> ({article.authorRole})
              </p>
            </div>

            {/* Tag Cloud */}
            <div className={styles.tagCloudRow}>
              {article.tags.map((tag, idx) => (
                <span key={idx} className={styles.tagPill}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Social Share & Star Rating Bar */}
            <div className={styles.shareRatingBar}>
              <div className={styles.shareButtonsGroup}>
                <button className={`${styles.shareBtn} ${styles.pinBtn}`} aria-label="Pinterest"><FaPinterest /></button>
                <button className={`${styles.shareBtn} ${styles.fbBtn}`} aria-label="Facebook"><FaFacebookF /></button>
                <button className={`${styles.shareBtn} ${styles.twBtn}`} aria-label="X"><FaXTwitter /></button>
                <button className={`${styles.shareBtn} ${styles.inBtn}`} aria-label="LinkedIn"><FaLinkedinIn /></button>
                <button className={`${styles.shareBtn} ${styles.waBtn}`} aria-label="WhatsApp"><FaWhatsapp /></button>
                <button className={`${styles.shareBtn} ${styles.tgBtn}`} aria-label="Telegram"><FaTelegramPlane /></button>
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
                    onClick={() => navigate(`/news/${post.slug}`)}
                  >
                    <div className={styles.similarImageWrap}>
                      <img src={post.image} alt={post.title} className={styles.similarImage} />
                      <span className={styles.similarCategoryBadge}>{post.category}</span>
                    </div>

                    <div className={styles.similarMetaContent}>
                      <h3 className={styles.similarPostTitle}>{post.title}</h3>
                      <div className={styles.similarCardFooter}>
                        <span className={styles.similarDate}><FiCalendar size={11} /> {post.date}</span>
                        <span className={styles.similarComments}><FaComment size={11} /> {post.comments}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
                onClick={() => navigate('/shows/pop-pulse')}
              >
                <img 
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80" 
                  alt="Pop Pulse" 
                  className={styles.nowOnAirBg} 
                />
                <div className={styles.nowOnAirOverlay}>
                  <span className={styles.nowOnAirPill}>LIVE SHOW</span>
                  <div className={styles.nowOnAirInfo}>
                    <h4 className={styles.nowOnAirTitle}>Pop Pulse</h4>
                    <p className={styles.nowOnAirTime}>03:00 pm - 06:00 pm • Funke Akindele</p>
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
                {mostListened.map((track, idx) => (
                  <div key={idx} className={styles.trackItemCard}>
                    <div className={styles.trackRank}>{track.rank}</div>
                    <img src={track.cover} alt={track.title} className={styles.trackCover} />
                    
                    <div className={styles.trackMeta}>
                      <h4 className={styles.trackTitle}>{track.title}</h4>
                      <p className={styles.trackArtist}>{track.artist}</p>
                    </div>

                    <button className={styles.trackCartBtn} aria-label="Track Action">
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
      <button className={styles.floatingShareBtn} aria-label="Share Article">
        <FaShareAlt size={16} />
      </button>

      <Footer />
      <LivePlayer />
    </main>
  );
};
