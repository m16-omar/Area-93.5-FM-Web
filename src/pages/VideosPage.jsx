import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaHeart } from 'react-icons/fa';
import { FiClock, FiEye, FiSearch, FiShare2, FiX, FiCalendar, FiUser } from 'react-icons/fi';
import { Navbar } from '../components/Navbar/Navbar';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import videosData from '../data/videosData.json';

const categories = ['ALL', 'LIVE SESSIONS', 'BEHIND THE SCENES', 'TRENDS', 'INTERVIEWS'];

export const VideosPage = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState(null);
  const [likedMap, setLikedMap] = useState({});

  const filteredVideos = videosData.filter((v) => {
    const matchesCat = activeCategory === 'ALL' || v.category === activeCategory;
    const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featuredVideo = videosData.find((v) => v.featured) || videosData[0];

  const toggleLike = (id) => {
    setLikedMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main style={{ position: 'relative', width: '100%', overflowX: 'hidden', background: 'var(--color-light-bg)' }}>
      <Navbar />
      <PageHeader title="VIDEOS" watermark={`LATEST\nCLIPS`} />

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 48px 100px' }}>
        {/* Featured Video Box */}
        <div
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
            marginBottom: '50px',
            minHeight: '440px',
            display: 'flex',
            alignItems: 'flex-end',
            cursor: 'pointer'
          }}
          onClick={() => setActiveVideo(featuredVideo)}
        >
          <img src={featuredEventImage(featuredVideo.image)} alt={featuredVideo.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%)' }} />

          {/* Central Play Button */}
          <button
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'var(--color-accent)',
              color: '#000000',
              border: '4px solid #ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              boxShadow: 'var(--shadow-md)',
              paddingLeft: '4px',
              zIndex: 3
            }}
            aria-label="Play Featured Video"
          >
            <FaPlay />
          </button>

          <div style={{ position: 'relative', zIndex: 2, padding: '40px', color: '#ffffff', width: '100%' }}>
            <span className="badge-outline" style={{ background: 'var(--color-accent)', color: '#000000', marginBottom: '12px', display: 'inline-block' }}>
              {featuredVideo.category}
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '2.2rem', margin: '6px 0 10px' }}>
              {featuredVideo.title}
            </h2>
            <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem', opacity: 0.9, fontWeight: 600 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiClock /> {featuredVideo.duration}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiEye /> {featuredVideo.views.toLocaleString()} views</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiCalendar /> {featuredVideo.date}</span>
            </div>
          </div>
        </div>

        {/* Filter Controls & Search Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: activeCategory === cat ? '#000000' : '#ffffff',
                  color: activeCategory === cat ? '#ffffff' : '#000000',
                  border: '1px solid #000000',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div style={{ position: 'relative', minWidth: '280px' }}>
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 38px 10px 14px',
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.15)',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            <FiSearch style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
          </div>
        </div>

        {/* Video Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
          {filteredVideos.map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              style={{
                background: '#ffffff',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div
                style={{ position: 'relative', height: '240px', overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => setActiveVideo(video)}
              >
                <img src={video.image} alt={video.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} />

                {/* Duration Badge */}
                <span style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  background: 'rgba(0,0,0,0.85)',
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '4px 8px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <FiClock size={12} /> {video.duration}
                </span>

                {/* Play Button Circle */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  color: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  paddingLeft: '3px',
                  boxShadow: 'var(--shadow-md)'
                }}>
                  <FaPlay />
                </div>
              </div>

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span className="badge-outline" style={{ marginBottom: '8px', display: 'inline-block' }}>
                    {video.category.toLowerCase()}
                  </span>
                  <h3 
                    onClick={() => setActiveVideo(video)}
                    style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.3rem', color: '#000000', margin: '4px 0 10px', cursor: 'pointer' }}
                  >
                    {video.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#4a5060', lineHeight: 1.5, marginBottom: '20px' }}>
                    {video.description}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#333333', fontWeight: 600 }}>
                  <div style={{ display: 'flex', gap: '14px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiEye size={13} /> {video.views.toLocaleString()}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiUser size={13} /> {video.author}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button
                      onClick={() => toggleLike(video.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: likedMap[video.id] ? '#ff3b68' : '#000000' }}
                      aria-label="Like Video"
                    >
                      <FaHeart size={14} />
                    </button>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#000000' }} aria-label="Share Video">
                      <FiShare2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Video Modal Player */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(0,0,0,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <div style={{ position: 'relative', width: '100%', maxWidth: '900px', background: '#000000', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <button
                onClick={() => setActiveVideo(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  zIndex: 10,
                  background: 'rgba(255,255,255,0.2)',
                  color: '#ffffff',
                  border: 'none',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  cursor: 'pointer'
                }}
                aria-label="Close Video"
              >
                <FiX />
              </button>

              <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                <iframe
                  src={activeVideo.videoUrl}
                  title={activeVideo.title}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div style={{ padding: '24px', color: '#ffffff' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.4rem', marginBottom: '6px' }}>
                  {activeVideo.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#aaaaaa', margin: 0 }}>
                  {activeVideo.description}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <LivePlayer />
    </main>
  );
};

function featuredEventImage(img) {
  return img || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80";
}
