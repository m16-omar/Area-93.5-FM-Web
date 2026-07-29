import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause } from 'react-icons/fa';
import { FiCalendar, FiClock, FiDownload, FiShare2, FiUser } from 'react-icons/fi';
import { Navbar } from '../components/Navbar/Navbar';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import { Pagination } from '../components/Blog/Pagination';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import podcastsData from '../data/podcasts.json';

const categories = ['ALL', 'CHARTS', 'URBAN', 'CHILL', 'CLUB'];

export const Podcasts = () => {
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = activeCategory === 'ALL' 
    ? podcastsData 
    : podcastsData.filter(p => p.category === activeCategory);

  return (
    <main style={{ position: 'relative', width: '100%', overflowX: 'hidden', background: 'var(--color-light-bg)' }}>
      <Navbar />
      <PageHeader title="PODCASTS" watermark={`ALL\nEPISODES`} />

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 48px 100px' }}>
        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '40px', justifyContent: 'center' }}>
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
                letterSpacing: '0.05em',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Podcast Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
          {filtered.map((ep) => {
            const isSelected = currentTrack?.id === ep.id && isPlaying;
            return (
              <motion.div
                key={ep.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{
                  background: '#ffffff',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-md)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ position: 'relative', height: '240px', background: '#f7e127', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img 
                    src={ep.image} 
                    alt={ep.title} 
                    style={{ position: 'absolute', width: '180px', height: '180px', borderRadius: '50%', objectFit: 'cover' }} 
                  />
                  <button
                    onClick={() => playTrack(ep)}
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: isSelected ? 'var(--color-accent)' : 'rgba(0,0,0,0.8)',
                      color: isSelected ? '#000000' : '#ffffff',
                      border: '2px solid #ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      cursor: 'pointer',
                      paddingLeft: isSelected ? '0' : '3px'
                    }}
                    aria-label={`Play ${ep.title}`}
                  >
                    {isSelected ? <FaPause /> : <FaPlay />}
                  </button>
                </div>

                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span className="badge-outline">{ep.category.toLowerCase()}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <FiClock size={13} /> {ep.duration}
                      </span>
                    </div>

                    <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.3rem', color: '#000000', marginBottom: '10px' }}>
                      {ep.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: '#4a5060', lineHeight: 1.5, marginBottom: '20px' }}>
                      {ep.description}
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#333333', fontWeight: 600 }}>
                    <div style={{ display: 'flex', gap: '14px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <FiCalendar size={13} /> {ep.date}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <FiUser size={13} /> {ep.host}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#000000' }} aria-label="Download">
                        <FiDownload size={15} />
                      </button>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#000000' }} aria-label="Share">
                        <FiShare2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <Pagination currentPage={currentPage} totalPages={3} onPageChange={(p) => setCurrentPage(p)} />
      </section>

      <Footer />
      <LivePlayer />
    </main>
  );
};
