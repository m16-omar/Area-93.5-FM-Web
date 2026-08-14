import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaEye, FaShareAlt, FaClock } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import videosData from '../data/videosData.json';
import styles from './VideosPage.module.css';

const categories = ["ALL VIDEOS", "LIVE SETS", "INTERVIEWS", "BEHIND THE SCENES", "RECAPS"];

export const VideosPage = () => {
  const [activeCategory, setActiveCategory] = useState("ALL VIDEOS");
  const [selectedVideo, setSelectedVideo] = useState(null);

  const featuredVideo = videosData.find(v => v.featured) || videosData[0];

  const filteredVideos = activeCategory === "ALL VIDEOS"
    ? videosData
    : videosData.filter(v => v.category.toUpperCase() === activeCategory);

  return (
    <main className={styles.videosPageContainer}>
      <Navbar />

      {/* 1. HERO BANNER SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.bgCircleBottomLeft} />
        <div className={styles.bgCircleTopRight} />
        <div className={styles.glowCircleTeal} />

        <div className={styles.watermarkText}>
          VIDEOS
        </div>

        <div className={styles.heroContent}>
          <motion.div 
            className={styles.tagWrapper}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.tagDot} />
            <span className={styles.tagText}>AREA 93.5 FM VIDEO SESSIONS</span>
          </motion.div>

          <motion.h1 
            className={styles.mainTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            EXCLUSIVE VIDEO SESSIONS & INTERVIEWS
          </motion.h1>

          <motion.p 
            className={styles.heroDesc}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Watch live in-studio DJ mixes, back-stage festival coverage, celebrity artist interviews, and weekly broadcast recaps from Area 93.5 FM.
          </motion.p>
        </div>
      </section>

      {/* 2. FEATURED VIDEO HERO PLAYER CARD */}
      <section className={styles.featuredSection}>
        <motion.div 
          className={styles.featuredCard}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onClick={() => setSelectedVideo(featuredVideo)}
        >
          <img src={featuredVideo.thumbnail} alt={featuredVideo.title} className={styles.featuredBgImg} />

          <div className={styles.featuredOverlay}>
            <div className={styles.featuredTopRow}>
              <span className={styles.featuredCatBadge}>{featuredVideo.category}</span>
              <span className={styles.featuredDuration}><FaClock style={{ marginRight: '4px' }} /> {featuredVideo.duration}</span>
            </div>

            <div className={styles.featuredCenterPlay}>
              <FaPlay style={{ marginLeft: '4px' }} />
            </div>

            <div className={styles.featuredBottomContent}>
              <h2 className={styles.featuredTitle}>{featuredVideo.title}</h2>
              <div className={styles.featuredMeta}>
                <span>by {featuredVideo.presenter} • {featuredVideo.show}</span>
                <span>•</span>
                <span><FaEye style={{ marginRight: '4px' }} /> {featuredVideo.views} views</span>
                <span>•</span>
                <span>{featuredVideo.date}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. VIDEO ARCHIVE GRID */}
      <section className={styles.videoGridSection}>
        {/* Category Filters */}
        <div className={styles.categoryFilterRow}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`${styles.filterTab} ${activeCategory === cat ? styles.filterTabActive : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3-Column Video Cards Grid */}
        <div className={styles.videoGrid}>
          {filteredVideos.map((video, idx) => (
            <motion.div
              key={video.id}
              className={styles.videoCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => setSelectedVideo(video)}
            >
              <div className={styles.videoThumbWrapper}>
                <img src={video.thumbnail} alt={video.title} className={styles.videoThumb} />
                <span className={styles.videoCategoryBadge}>{video.category}</span>
                <span className={styles.videoDurationTag}>{video.duration}</span>

                <div className={styles.playCircleBtn}>
                  <div className={styles.playIconInner}>
                    <FaPlay style={{ marginLeft: '2px' }} />
                  </div>
                </div>
              </div>

              <div className={styles.videoCardBody}>
                <h3 className={styles.videoTitle}>{video.title}</h3>
                <p className={styles.videoMetaInfo}>by {video.presenter} • {video.show}</p>

                <div className={styles.videoFooterRow}>
                  <span>{video.date}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <FaEye /> {video.views}
                  </span>
                  <span><FaShareAlt /></span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <div className={styles.viewMoreWrapper}>
          <button className={styles.viewMoreBtn}>
            LOAD MORE VIDEOS
          </button>
        </div>
      </section>

      {/* 4. VIDEO PLAYER MODAL */}
      {selectedVideo && (
        <div className={styles.modalBackdrop} onClick={() => setSelectedVideo(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalCloseBtn} onClick={() => setSelectedVideo(null)} aria-label="Close Video">
              <FiX />
            </button>
            <iframe 
              src={`${selectedVideo.videoUrl}?autoplay=1`} 
              title={selectedVideo.title}
              className={styles.modalIframe}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <Footer />
      <LivePlayer />
    </main>
  );
};
