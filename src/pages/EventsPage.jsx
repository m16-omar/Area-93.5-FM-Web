import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiMapPin, FiShare2 } from 'react-icons/fi';
import { FaTicketAlt } from 'react-icons/fa';
import { Navbar } from '../components/Navbar/Navbar';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import eventsListData from '../data/eventsListData.json';

export const EventsPage = () => {
  const featuredEvent = eventsListData.find(e => e.featured) || eventsListData[0];
  const otherEvents = eventsListData.filter(e => e.id !== featuredEvent.id);

  const [timeLeft, setTimeLeft] = useState(featuredEvent.countdown || { days: 14, hours: 8, minutes: 42, seconds: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        return { ...prev, seconds: 59, minutes: Math.max(0, prev.minutes - 1) };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main style={{ position: 'relative', width: '100%', overflowX: 'clip', background: 'var(--color-light-bg)' }}>
      <Navbar />
      <PageHeader title="UPCOMING EVENTS" watermark={`LIVE\nCONCERTS`} />

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 48px 100px' }}>
        {/* Featured Event Hero Banner */}
        <div
          style={{
            position: 'relative',
            borderRadius: '18px',
            border: '1px solid #E5E7EB',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(10, 79, 146, 0.15)',
            marginBottom: '60px',
            minHeight: '420px',
            display: 'flex',
            alignItems: 'flex-end'
          }}
        >
          <img
            src={featuredEvent.image}
            alt={featuredEvent.title}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,59,110,0.3) 0%, rgba(8,59,110,0.92) 100%)' }} />

          <div style={{ position: 'relative', zIndex: 2, padding: '40px', color: '#ffffff', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span className="badge-outline" style={{ background: 'var(--primary-orange)', color: '#ffffff', border: 'none', marginBottom: '12px', display: 'inline-block' }}>
                {featuredEvent.badge}
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '2.5rem', color: '#ffffff', margin: '6px 0 10px' }}>
                {featuredEvent.title}
              </h2>
              <p style={{ fontSize: '1rem', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '8px', color: '#F5F7FA' }}>
                <FiMapPin style={{ color: 'var(--primary-orange)' }} /> {featuredEvent.venue} — {featuredEvent.location}
              </p>
            </div>

            {/* Countdown Box */}
            <div style={{ display: 'flex', gap: '16px', background: 'rgba(8,59,110,0.85)', backdropFilter: 'blur(10px)', padding: '16px 24px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.8rem', color: 'var(--primary-orange)' }}>{timeLeft.days}</div>
                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#ffffff' }}>DAYS</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.8rem', color: '#ffffff' }}>{timeLeft.hours}</div>
                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#ffffff' }}>HOURS</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.8rem', color: '#ffffff' }}>{timeLeft.minutes}</div>
                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#ffffff' }}>MINS</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.8rem', color: 'var(--primary-orange)' }}>{timeLeft.seconds}</div>
                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#ffffff' }}>SECS</div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Event Cards Grid */}
        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.8rem', color: 'var(--primary-blue)', marginBottom: '24px' }}>
          ALL EVENTS
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
          {eventsListData.map((ev) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -6, borderColor: '#EF4B00', boxShadow: '0 12px 30px rgba(10, 79, 146, 0.18)' }}
              style={{
                background: '#ffffff',
                borderRadius: '18px',
                border: '1px solid #E5E7EB',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(10, 79, 146, 0.08)',
                transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease'
              }}
            >
              <div style={{ position: 'relative', height: '220px' }}>
                <img src={ev.image} alt={ev.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {/* Date Badge */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: 'var(--primary-orange)',
                  color: '#ffffff',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-sm)',
                  textAlign: 'center',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 900,
                  boxShadow: '0 4px 12px rgba(239, 75, 0, 0.3)'
                }}>
                  <div style={{ fontSize: '1.3rem', lineHeight: 1 }}>{ev.dateDay}</div>
                  <div style={{ fontSize: '0.7rem', color: '#ffffff' }}>{ev.dateMonth}</div>
                </div>
              </div>

              <div style={{ padding: '24px' }}>
                <span className="badge-outline" style={{ marginBottom: '8px', display: 'inline-block' }}>{ev.badge.toLowerCase()}</span>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.3rem', color: 'var(--primary-blue)', margin: '4px 0 10px' }}>
                  {ev.title}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
                  <FiMapPin style={{ color: 'var(--primary-orange)' }} /> {ev.venue} • {ev.location}
                </p>

                <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button style={{
                    background: 'var(--primary-blue)',
                    color: '#ffffff',
                    border: 'none',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    padding: '10px 20px',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(10, 79, 146, 0.25)',
                    transition: 'background 0.2s ease'
                  }}>
                    <FaTicketAlt /> BUY TICKETS
                  </button>

                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary-orange)' }} aria-label="Share Event">
                    <FiShare2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
      <LivePlayer />
    </main>
  );
};
