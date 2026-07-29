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
    if (trend === 'UP') return <span style={{ color: '#00d26a', display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.75rem', fontWeight: 800 }}><FiTrendingUp /> UP</span>;
    if (trend === 'DOWN') return <span style={{ color: '#ff3b68', display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.75rem', fontWeight: 800 }}><FiTrendingDown /> DOWN</span>;
    if (trend === 'NEW') return <span style={{ color: '#ffc107', display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.75rem', fontWeight: 800 }}><FiStar /> NEW</span>;
    return <span style={{ color: '#888', display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.75rem', fontWeight: 800 }}><FiMinus /> EVEN</span>;
  };

  return (
    <main style={{ position: 'relative', width: '100%', overflowX: 'hidden', background: 'var(--color-light-bg)' }}>
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
                style={{
                  background: '#ffffff',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  boxShadow: 'var(--shadow-md)',
                  transition: 'transform 0.2s ease'
                }}
              >
                {/* Rank Number */}
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 900,
                  fontSize: '1.8rem',
                  color: track.rank === 1 ? 'var(--color-primary)' : '#000000',
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
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.15rem', color: '#000000', margin: 0 }}>
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
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#555', minWidth: '50px' }}>
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
                      background: votedMap[track.id] ? '#ff3b68' : '#1a1c23',
                      color: '#ffffff',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    aria-label="Vote Track"
                  >
                    <FaHeart size={14} />
                  </button>
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', minWidth: '45px', textAlign: 'right', color: '#333' }}>
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
                    background: '#000000',
                    color: '#ffffff',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    paddingLeft: isSelected ? '0' : '2px'
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
