import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiCheckCircle } from 'react-icons/fi';
import { Navbar } from '../components/Navbar/Navbar';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import contactInfoData from '../data/contactInfoData.json';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <main style={{ position: 'relative', width: '100%', overflowX: 'hidden', background: 'var(--color-light-bg)' }}>
      <Navbar />
      <PageHeader title="CONTACT US" watermark={`GET IN\nTOUCH`} />

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 48px 100px' }}>
        {/* Top Info Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '60px' }}>
          {/* Card 1: Address */}
          <div style={{ background: '#ffffff', borderRadius: 'var(--radius-md)', padding: '32px', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--gradient-hero)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', marginBottom: '16px' }}>
              <FiMapPin />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.2rem', marginBottom: '8px' }}>
              {contactInfoData.address.title}
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#4a5060', lineHeight: 1.5, margin: 0 }}>
              {contactInfoData.address.street}<br />
              {contactInfoData.address.city}
            </p>
          </div>

          {/* Card 2: Hotlines */}
          <div style={{ background: '#ffffff', borderRadius: 'var(--radius-md)', padding: '32px', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-accent)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', marginBottom: '16px' }}>
              <FiPhone />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.2rem', marginBottom: '8px' }}>
              HOTLINES & EMAIL
            </h3>
            <div style={{ fontSize: '0.9rem', color: '#4a5060', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {contactInfoData.contacts.map((c, idx) => (
                <div key={idx}><strong>{c.type}:</strong> {c.value}</div>
              ))}
            </div>
          </div>

          {/* Card 3: Business Hours */}
          <div style={{ background: '#ffffff', borderRadius: 'var(--radius-md)', padding: '32px', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#000000', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', marginBottom: '16px' }}>
              <FiClock />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.2rem', marginBottom: '8px' }}>
              OFFICE HOURS
            </h3>
            <div style={{ fontSize: '0.9rem', color: '#4a5060', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {contactInfoData.hours.map((h, idx) => (
                <div key={idx}><strong>{h.day}:</strong> {h.time}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form & Studio Location Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '48px', alignItems: 'flex-start' }}>
          {/* Form */}
          <div style={{ background: '#ffffff', borderRadius: 'var(--radius-md)', padding: '40px', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.8rem', color: '#000000', marginBottom: '6px' }}>
              Send Us a Message
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#666666', marginBottom: '24px' }}>
              Have song requests, press releases, or general questions? Drop us a line below.
            </p>

            {submitted ? (
              <div style={{ background: 'var(--gradient-hero)', padding: '24px', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                <FiCheckCircle size={36} style={{ color: '#000', marginBottom: '8px' }} />
                <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.3rem', color: '#000', margin: 0 }}>
                  Message Sent Successfully!
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#333', marginTop: '4px' }}>
                  We appreciate your message and will respond shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, marginBottom: '4px' }}>FULL NAME</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.15)', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, marginBottom: '4px' }}>EMAIL ADDRESS</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.15)', outline: 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, marginBottom: '4px' }}>SUBJECT</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.15)', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, marginBottom: '4px' }}>YOUR MESSAGE</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.15)', outline: 'none' }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    background: '#000000',
                    color: '#ffffff',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 900,
                    fontSize: '0.85rem',
                    padding: '14px 28px',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    cursor: 'pointer',
                    letterSpacing: '0.05em',
                    alignSelf: 'flex-start',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <FiSend /> SEND MESSAGE
                </button>
              </form>
            )}
          </div>

          {/* Map Preview Card */}
          <div style={{ background: '#000000', color: '#ffffff', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', height: '100%', minHeight: '440px', position: 'relative' }}>
            <img 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80" 
              alt="Studio Location" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} 
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.9) 100%)', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <span className="badge-outline" style={{ background: 'var(--color-accent)', color: '#000', alignSelf: 'flex-start', marginBottom: '8px' }}>STUDIO LOCATION</span>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.4rem', margin: '0 0 6px 0' }}>
                93.5 AREA FM HEADQUARTERS
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#cccccc', margin: 0 }}>
                108 Music Frequency Avenue, Metro City
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <LivePlayer />
    </main>
  );
};
