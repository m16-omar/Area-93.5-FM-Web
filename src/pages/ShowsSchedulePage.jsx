import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiUser, FiMusic, FiChevronRight } from 'react-icons/fi';
import { Navbar } from '../components/Navbar/Navbar';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import showsData from '../data/showsScheduleData.json';

export const ShowsSchedulePage = () => {
  const [activeDay, setActiveDay] = useState('MONDAY');

  const currentSchedule = showsData.schedule[activeDay] || [];

  return (
    <main style={{ position: 'relative', width: '100%', overflowX: 'hidden', background: 'var(--color-light-bg)' }}>
      <Navbar />
      <PageHeader title="SHOWS SCHEDULE" watermark={`WEEKLY\nRADIO`} />

      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 48px 100px' }}>
        {/* Day Selector Tabs */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '50px' }}>
          {showsData.days.map((day) => {
            const isActive = activeDay === day;
            return (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                style={{
                  position: 'relative',
                  background: isActive ? '#000000' : '#ffffff',
                  color: isActive ? '#ffffff' : '#000000',
                  border: '1.5px solid #000000',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 900,
                  fontSize: '0.85rem',
                  letterSpacing: '0.05em',
                  padding: '12px 22px',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  boxShadow: isActive ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                  transition: 'all 0.2s ease'
                }}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Schedule Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            {currentSchedule.map((show) => (
              <div
                key={show.id}
                style={{
                  background: '#ffffff',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  boxShadow: 'var(--shadow-md)',
                  borderLeft: show.nowPlaying ? '6px solid var(--color-primary)' : 'none'
                }}
              >
                <div style={{ position: 'relative', width: '220px', height: '160px', flexShrink: 0 }}>
                  <img src={show.image} alt={show.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {show.nowPlaying && (
                    <span className="badge-live" style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2 }}>
                      NOW PLAYING
                    </span>
                  )}
                </div>

                <div style={{ padding: '24px 32px', flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span className="badge-outline" style={{ marginBottom: '8px', display: 'inline-block' }}>
                      {show.genre.toLowerCase()}
                    </span>

                    <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.5rem', color: '#000000', margin: '4px 0 8px' }}>
                      {show.name}
                    </h3>

                    <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem', color: '#4a5060', fontWeight: 600 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FiUser size={14} /> {show.dj}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FiClock size={14} /> {show.time}
                      </span>
                    </div>
                  </div>

                  <button
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
                      fontSize: '1.2rem',
                      cursor: 'pointer'
                    }}
                    aria-label="Show Details"
                  >
                    <FiChevronRight />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      <Footer />
      <LivePlayer />
    </main>
  );
};
