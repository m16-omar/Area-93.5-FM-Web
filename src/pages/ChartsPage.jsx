import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaHeart } from 'react-icons/fa';
import { FiTrendingUp, FiTrendingDown, FiMinus, FiStar } from 'react-icons/fi';
import { Navbar } from '../components/Navbar/Navbar';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import chartsData from '../data/chartsData.json';

export const ChartsPage = () => {
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();
  const [tracks, setTracks] = useState(chartsData);
  const [votedMap, setVotedMap] = useState({});

  const handleVote = (id) => {
    setTracks(prev =>
      prev.map(t => {
        if (t.id === id) {
          const isVoted = votedMap[id];
          return { ...t, votes: isVoted ? t.votes - 1 : t.votes + 1 };
        }
        return t;
      })
    );
    setVotedMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getTrendIcon = (trend) => {
    if (trend === 'UP') return <span style={{ color: '#22C55E', display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.75rem', fontWeight: 800 }}><FiTrendingUp /> UP</span>;
    if (trend === 'DOWN') return <span style={{ color: '#DC2626', display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.75rem', fontWeight: 800 }}><FiTrendingDown /> DOWN</span>;
    if (trend === 'NEW') return <span style={{ color: 'var(--primary-orange)', display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.75rem', fontWeight: 800 }}><FiStar /> NEW</span>;
    return <span style={{ color: '#6B7280', display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.75rem', fontWeight: 800 }}><FiMinus /> EVEN</span>;
  };

  return (
    <main style={{ position: 'relative', width: '100%', overflowX: 'clip', background: 'var(--color-light-bg)' }}>
      <Navbar />
      <PageHeader title="TOP 40 CHARTS" watermark={`TOP 40\nHITS`} />

      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 48px 100px' }}>
        {/* Top Charts List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {tracks.map((track) => {
            const isSelected = currentTrack?.id === track.id && isPlaying;
            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -4, borderColor: 'var(--primary-orange)', boxShadow: '0 12px 30px rgba(0, 107, 141, 0.18)' }}
                style={{
                  background: '#ffffff',
                  borderRadius: '18px',
                  border: '1px solid #E5E7EB',
                  padding: '16px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  boxShadow: '0 4px 12px rgba(10, 79, 146, 0.08)',
                  transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                {/* Rank Number */}
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 900,
                  fontSize: '1.8rem',
                  color: 'var(--primary-orange)',
                  minWidth: '40px',
                  textAlign: 'center'
                }}>
                  #{track.rank}
                </div>

                {/* Track Artwork */}
                <img 
                  src={track.image} 
                  alt={track.title} 
                  style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} 
                />

                {/* Track Meta */}
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.15rem', color: 'var(--primary-blue)', margin: 0 }}>
                    {track.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: '2px 0 0' }}>
                    {track.artist} • <span style={{ opacity: 0.75 }}>{track.album}</span>
                  </p>
                </div>

                {/* Trend Badge */}
                <div style={{ minWidth: '70px' }}>
                  {getTrendIcon(track.trend)}
                </div>

                {/* Duration */}
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-blue)', minWidth: '50px' }}>
                  {track.duration}
                </div>

                {/* Vote Button */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => handleVote(track.id)}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: votedMap[track.id] ? 'var(--orange-hover)' : 'var(--primary-orange)',
                      color: '#ffffff',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 4px 10px rgba(239, 75, 0, 0.3)',
                      transition: 'all 0.2s ease'
                    }}
                    aria-label="Vote Track"
                  >
                    <FaHeart size={14} />
                  </button>
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', minWidth: '45px', textAlign: 'right', color: 'var(--primary-blue)' }}>
                    {track.votes}
                  </span>
                </div>

                {/* Play Button */}
                <button
                  onClick={() => playTrack(track)}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'var(--primary-blue)',
                    color: '#ffffff',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    paddingLeft: isSelected ? '0' : '2px',
                    boxShadow: '0 4px 10px rgba(10, 79, 146, 0.3)'
                  }}
                  aria-label="Play Track"
                >
                  {isSelected ? <FaPause size={12} /> : <FaPlay size={12} />}
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>

      <Footer />
      <LivePlayer />
    </main>
  );
};
