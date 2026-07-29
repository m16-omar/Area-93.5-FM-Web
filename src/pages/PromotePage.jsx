import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiChevronDown, FiSend, FiZap, FiRadio, FiCheckCircle } from 'react-icons/fi';
import { Navbar } from '../components/Navbar/Navbar';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import promoteData from '../data/promoteData.json';

export const PromotePage = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    campaignType: 'PRO RADIO SHOUTOUT',
    budget: '$500 - $1,000',
    duration: '1 Month',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <main style={{ position: 'relative', width: '100%', overflowX: 'hidden', background: 'var(--color-light-bg)' }}>
      <Navbar />
      <PageHeader title="PROMOTE" watermark={`ADVERTISE\nWITH US`} />

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 48px 100px' }}>
        {/* Statistics Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '80px' }}>
          {promoteData.stats.map((stat, idx) => (
            <div
              key={idx}
              style={{
                background: '#ffffff',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                textAlign: 'center',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '4px' }}>
                {stat.value}
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.08em', color: '#000000' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Packages */}
        <div style={{ textAlignment: 'center', marginBottom: '40px', textAlign: 'center' }}>
          <span className="section-label">ADVERTISING PACKAGES</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '2.5rem', color: '#000000', marginTop: '6px' }}>
            Choose Your Campaign
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginBottom: '100px' }}>
          {promoteData.packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'relative',
                background: pkg.popular ? '#000000' : '#ffffff',
                color: pkg.popular ? '#ffffff' : '#000000',
                borderRadius: 'var(--radius-md)',
                padding: '40px 32px',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: pkg.popular ? '2px solid var(--color-accent)' : 'none'
              }}
            >
              {pkg.popular && (
                <span style={{
                  position: 'absolute',
                  top: '-14px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--color-accent)',
                  color: '#000000',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 900,
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  padding: '4px 16px',
                  borderRadius: '20px'
                }}>
                  MOST POPULAR
                </span>
              )}

              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.4rem', marginBottom: '12px' }}>
                  {pkg.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '24px' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '3rem', color: pkg.popular ? 'var(--color-accent)' : 'var(--color-primary)' }}>
                    {pkg.price}
                  </span>
                  <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>{pkg.period}</span>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', fontWeight: 600 }}>
                      <FiCheck style={{ color: pkg.popular ? 'var(--color-accent)' : '#000000', flexShrink: 0 }} /> {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setFormData(prev => ({ ...prev, campaignType: pkg.name }))}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: pkg.popular ? 'var(--color-accent)' : '#000000',
                  color: '#000000',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 900,
                  fontSize: '0.85rem',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                SELECT PACKAGE
              </button>
            </motion.div>
          ))}
        </div>

        {/* Promotion Request Form */}
        <div style={{ background: '#ffffff', borderRadius: 'var(--radius-md)', padding: '48px', boxShadow: 'var(--shadow-md)', marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="section-label">GET STARTED</span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '2rem', color: '#000000', marginTop: '6px' }}>
              Request Advertising Proposal
            </h3>
          </div>

          {submitted ? (
            <div style={{ background: 'var(--gradient-hero)', padding: '32px', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
              <FiCheckCircle size={48} style={{ color: '#000', marginBottom: '12px' }} />
              <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.5rem', color: '#000' }}>
                Thank You for Your Submission!
              </h4>
              <p style={{ fontSize: '0.95rem', color: '#333' }}>
                Our 93.5 AREA FM sales team will contact you within 24 hours with your customized media kit.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, marginBottom: '6px' }}>COMPANY NAME</label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.15)', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, marginBottom: '6px' }}>CONTACT NAME</label>
                <input
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.15)', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, marginBottom: '6px' }}>EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.15)', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, marginBottom: '6px' }}>PHONE NUMBER</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.15)', outline: 'none' }}
                />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, marginBottom: '6px' }}>CAMPAIGN DETAILS / MESSAGE</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.15)', outline: 'none' }}
                />
              </div>

              <div style={{ gridColumn: 'span 2', textAlign: 'center', marginTop: '10px' }}>
                <button
                  type="submit"
                  style={{
                    background: '#000000',
                    color: '#ffffff',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 900,
                    fontSize: '0.9rem',
                    padding: '14px 40px',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    cursor: 'pointer',
                    letterSpacing: '0.05em'
                  }}
                >
                  SUBMIT PROPOSAL REQUEST
                </button>
              </div>
            </form>
          )}
        </div>

        {/* FAQ Accordion */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.8rem', textAlign: 'center', marginBottom: '24px' }}>
            Frequently Asked Questions
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {promoteData.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} style={{ background: '#ffffff', borderRadius: 'var(--radius-sm)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '18px 24px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 800,
                      fontSize: '1rem',
                      color: '#000000',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span>{faq.question}</span>
                    <FiChevronDown style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 24px 20px', fontSize: '0.9rem', color: '#4a5060', lineHeight: 1.6 }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
      <LivePlayer />
    </main>
  );
};
