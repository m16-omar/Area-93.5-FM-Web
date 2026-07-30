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
    <main style={{ position: 'relative', width: '100%', overflowX: 'clip', background: 'var(--color-light-bg)' }}>
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
                background: activeCategory === cat ? 'var(--primary-orange)' : '#ffffff',
                color: activeCategory === cat ? '#ffffff' : 'var(--primary-blue)',
                border: activeCategory === cat ? '1px solid var(--primary-orange)' : '1px solid var(--border)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '0.8rem',
                padding: '8px 18px',
                letterSpacing: '0.05em',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                boxShadow: activeCategory === cat ? '0 4px 12px rgba(239, 75, 0, 0.3)' : '0 2px 6px rgba(10,79,146,0.06)',
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
                whileHover={{ y: -6, borderColor: '#EF4B00', boxShadow: '0 12px 30px rgba(10, 79, 146, 0.18)' }}
                style={{
                  background: '#ffffff',
                  borderRadius: '18px',
                  border: '1px solid #E5E7EB',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(10, 79, 146, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                <div style={{ position: 'relative', height: '240px', background: 'var(--secondary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                      background: 'var(--primary-orange)',
                      color: '#ffffff',
                      border: '2px solid #ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      cursor: 'pointer',
                      paddingLeft: isSelected ? '0' : '3px',
                      boxShadow: '0 4px 14px rgba(239, 75, 0, 0.4)'
                    }}
                    aria-label={`Play ${ep.title}`}
                  >
                    {isSelected ? <FaPause /> : <FaPlay />}
                  </button>
                </div>

                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span className="badge-outline" style={{ border: '1px solid var(--primary-orange)', color: 'var(--primary-orange)' }}>
                        {ep.category.toLowerCase()}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#ffffff', background: 'var(--primary-blue)', padding: '2px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
                        <FiClock size={13} /> {ep.duration}
                      </span>
                    </div>

                    <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.3rem', color: 'var(--primary-blue)', marginBottom: '10px' }}>
                      {ep.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-dark)', lineHeight: 1.5, marginBottom: '20px' }}>
                      {ep.description}
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    <div style={{ display: 'flex', gap: '14px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <FiCalendar size={13} /> {ep.date}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <FiUser size={13} /> {ep.host}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary-orange)' }} aria-label="Download">
                        <FiDownload size={15} />
                      </button>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary-orange)' }} aria-label="Share">
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
