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
    <main style={{ position: 'relative', width: '100%', overflowX: 'clip', background: 'var(--color-light-bg)' }}>
      <Navbar />
      <PageHeader title="CONTACT US" watermark={`GET IN\nTOUCH`} />

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 48px 100px' }}>
        {/* Top Info Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '60px' }}>
          {/* Card 1: Address */}
          <div style={{ background: '#ffffff', borderRadius: '18px', border: '1px solid #E5E7EB', padding: '32px', boxShadow: '0 4px 12px rgba(10, 79, 146, 0.08)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-orange)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', marginBottom: '16px', boxShadow: '0 4px 12px rgba(239, 75, 0, 0.3)' }}>
              <FiMapPin />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.2rem', color: 'var(--primary-blue)', marginBottom: '8px' }}>
              {contactInfoData.address.title}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-dark)', lineHeight: 1.5, margin: 0 }}>
              {contactInfoData.address.street}<br />
              {contactInfoData.address.city}
            </p>
          </div>

          {/* Card 2: Hotlines */}
          <div style={{ background: '#ffffff', borderRadius: '18px', border: '1px solid #E5E7EB', padding: '32px', boxShadow: '0 4px 12px rgba(10, 79, 146, 0.08)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-orange)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', marginBottom: '16px', boxShadow: '0 4px 12px rgba(239, 75, 0, 0.3)' }}>
              <FiPhone />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.2rem', color: 'var(--primary-blue)', marginBottom: '8px' }}>
              HOTLINES & EMAIL
            </h3>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-dark)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {contactInfoData.contacts.map((c, idx) => (
                <div key={idx}><strong>{c.type}:</strong> {c.value}</div>
              ))}
            </div>
          </div>

          {/* Card 3: Business Hours */}
          <div style={{ background: '#ffffff', borderRadius: '18px', border: '1px solid #E5E7EB', padding: '32px', boxShadow: '0 4px 12px rgba(10, 79, 146, 0.08)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-orange)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', marginBottom: '16px', boxShadow: '0 4px 12px rgba(239, 75, 0, 0.3)' }}>
              <FiClock />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.2rem', color: 'var(--primary-blue)', marginBottom: '8px' }}>
              OFFICE HOURS
            </h3>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-dark)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {contactInfoData.hours.map((h, idx) => (
                <div key={idx}><strong>{h.day}:</strong> {h.time}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form & Studio Location Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '48px', alignItems: 'flex-start' }}>
          {/* Form */}
          <div style={{ background: '#ffffff', borderRadius: '18px', border: '1px solid #E5E7EB', padding: '40px', boxShadow: '0 4px 12px rgba(10, 79, 146, 0.08)' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.8rem', color: 'var(--primary-blue)', marginBottom: '6px' }}>
              Send Us a Message
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
              Have song requests, press releases, or general questions? Drop us a line below.
            </p>

            {submitted ? (
              <div style={{ background: 'var(--gradient-hero)', padding: '24px', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                <FiCheckCircle size={36} style={{ color: 'var(--primary-orange)', marginBottom: '8px' }} />
                <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.3rem', color: '#ffffff', margin: 0 }}>
                  Message Sent Successfully!
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#F5F7FA', marginTop: '4px' }}>
                  We appreciate your message and will respond shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary-blue)', marginBottom: '4px' }}>FULL NAME</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid #D1D5DB', background: '#ffffff', outline: 'none', color: '#1A1A1A' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary-blue)', marginBottom: '4px' }}>EMAIL ADDRESS</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid #D1D5DB', background: '#ffffff', outline: 'none', color: '#1A1A1A' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary-blue)', marginBottom: '4px' }}>SUBJECT</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid #D1D5DB', background: '#ffffff', outline: 'none', color: '#1A1A1A' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary-blue)', marginBottom: '4px' }}>YOUR MESSAGE</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid #D1D5DB', background: '#ffffff', outline: 'none', color: '#1A1A1A' }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    background: 'var(--primary-orange)',
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
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(239, 75, 0, 0.3)'
                  }}
                >
                  <FiSend /> SEND MESSAGE
                </button>
              </form>
            )}
          </div>

          {/* Map Preview Card */}
          <div style={{ background: 'var(--secondary-blue)', color: '#ffffff', borderRadius: '18px', border: '1px solid #E5E7EB', overflow: 'hidden', boxShadow: '0 8px 24px rgba(10, 79, 146, 0.15)', height: '100%', minHeight: '440px', position: 'relative' }}>
            <img 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80" 
              alt="Studio Location" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} 
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,59,110,0.3) 0%, rgba(8,59,110,0.92) 100%)', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <span className="badge-outline" style={{ background: 'var(--primary-orange)', color: '#ffffff', border: 'none', alignSelf: 'flex-start', marginBottom: '8px' }}>STUDIO LOCATION</span>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.4rem', color: '#ffffff', margin: '0 0 6px 0' }}>
                93.5 AREA FM HEADQUARTERS
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#F5F7FA', margin: 0 }}>
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
