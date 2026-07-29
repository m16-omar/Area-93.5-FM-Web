import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiTv } from 'react-icons/fi';
import { FaInstagram, FaTwitter, FaSpotify, FaYoutube } from 'react-icons/fa';
import { Navbar } from '../components/Navbar/Navbar';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import teamData from '../data/teamData.json';

export const TeamPage = () => {
  return (
    <main style={{ position: 'relative', width: '100%', overflowX: 'hidden', background: 'var(--color-light-bg)' }}>
      <Navbar />
      <PageHeader title="OUR TEAM" watermark={`STATION\nCREW`} />

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 48px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
          {teamData.map((member) => (
            <motion.div
              key={member.id}
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
              <div style={{ position: 'relative', height: '320px', overflow: 'hidden' }}>
                <img 
                  src={member.photo} 
                  alt={member.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.85) 100%)' }} />
                <div style={{ position: 'absolute', bottom: '20px', left: '24px', zIndex: 2 }}>
                  <span className="badge-outline" style={{ background: 'var(--color-accent)', color: '#000000', marginBottom: '6px', display: 'inline-block' }}>
                    {member.role}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.6rem', color: '#ffffff', margin: 0 }}>
                    {member.name}
                  </h3>
                </div>
              </div>

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <p style={{ fontSize: '0.95rem', color: '#4a5060', lineHeight: 1.6, marginBottom: '20px' }}>
                  {member.bio}
                </p>

                <div>
                  {/* Shows */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#888', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <FiTv /> SHOWS HOSTED
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {member.shows.map((show, idx) => (
                        <span key={idx} style={{ background: '#f0f0f0', color: '#000', fontSize: '0.8rem', fontWeight: 700, padding: '4px 10px', borderRadius: 'var(--radius-sm)' }}>
                          {show}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact & Socials Footer */}
                  <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', gap: '12px', color: '#333', fontWeight: 600 }}>
                      <a href={`mailto:${member.email}`} style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
                        <FiMail /> {member.email}
                      </a>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', fontSize: '1.1rem' }}>
                      {member.socials.instagram && <a href={member.socials.instagram} style={{ color: '#000' }} aria-label="Instagram"><FaInstagram /></a>}
                      {member.socials.twitter && <a href={member.socials.twitter} style={{ color: '#000' }} aria-label="Twitter"><FaTwitter /></a>}
                      {member.socials.spotify && <a href={member.socials.spotify} style={{ color: '#000' }} aria-label="Spotify"><FaSpotify /></a>}
                      {member.socials.youtube && <a href={member.socials.youtube} style={{ color: '#000' }} aria-label="YouTube"><FaYoutube /></a>}
                    </div>
                  </div>
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
