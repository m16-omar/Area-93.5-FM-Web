import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiCheckCircle } from 'react-icons/fi';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import contactInfoData from '../data/contactInfoData.json';
import styles from './ContactPage.module.css';

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
    <main className={styles.contactPageContainer}>
      <Navbar />

      {/* 1. HERO BANNER SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.bgCircleTopRight} />
        <div className={styles.glowCircleTeal} />

        <div className={styles.watermarkText}>
          CONTACT
        </div>

        <div className={styles.heroContent}>
          <motion.div 
            className={styles.tagWrapper}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.tagDot} />
            <span className={styles.tagText}>GET IN TOUCH WITH AREA 93.5 FM</span>
          </motion.div>

          <motion.h1 
            className={styles.mainTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            CONTACT OUR BROADCAST TEAM
          </motion.h1>

          <motion.p 
            className={styles.heroDesc}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Have song requests, press inquiries, advertising partnerships, or listener feedback? Send us a message or reach out via our direct hotlines.
          </motion.p>
        </div>
      </section>

      {/* 2. CONTACT INFO CARDS & FORM SECTION */}
      <section className={styles.contactMainSection}>
        {/* Top 3 Info Cards */}
        <div className={styles.infoCardsGrid}>
          {/* Card 1: Address */}
          <motion.div 
            className={styles.infoCard}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.iconBadge}>
              <FiMapPin />
            </div>
            <h3 className={styles.cardTitle}>
              {contactInfoData.address.title}
            </h3>
            <p className={styles.cardBodyText}>
              {contactInfoData.address.street}<br />
              {contactInfoData.address.city}
            </p>
          </motion.div>

          {/* Card 2: Hotlines */}
          <motion.div 
            className={styles.infoCard}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className={styles.iconBadge}>
              <FiPhone />
            </div>
            <h3 className={styles.cardTitle}>
              HOTLINES & EMAIL
            </h3>
            <div className={styles.contactList}>
              {contactInfoData.contacts.map((c, idx) => (
                <div key={idx}><strong>{c.type}:</strong> {c.value}</div>
              ))}
            </div>
          </motion.div>

          {/* Card 3: Business Hours */}
          <motion.div 
            className={styles.infoCard}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className={styles.iconBadge}>
              <FiClock />
            </div>
            <h3 className={styles.cardTitle}>
              OFFICE HOURS
            </h3>
            <div className={styles.contactList}>
              {contactInfoData.hours.map((h, idx) => (
                <div key={idx}><strong>{h.day}:</strong> {h.time}</div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Contact Form & Studio Location Section */}
        <div className={styles.formLocationGrid}>
          {/* Form Card */}
          <motion.div 
            className={styles.formCard}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className={styles.formTitle}>
              SEND US A MESSAGE
            </h3>
            <p className={styles.formSubtitle}>
              Have song requests, press releases, or general questions? Drop us a line below.
            </p>

            {submitted ? (
              <div className={styles.successBox}>
                <FiCheckCircle size={36} style={{ color: 'var(--primary-orange)' }} />
                <h4 className={styles.successTitle}>
                  Message Sent Successfully!
                </h4>
                <p className={styles.successDesc}>
                  We appreciate your message and will respond shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroupRow}>
                  <div>
                    <label className={styles.inputLabel}>FULL NAME</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={styles.inputControl}
                      placeholder="e.g. Tobi Adebayo"
                    />
                  </div>
                  <div>
                    <label className={styles.inputLabel}>EMAIL ADDRESS</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={styles.inputControl}
                      placeholder="e.g. tobi@areafm.ng"
                    />
                  </div>
                </div>

                <div className={styles.formGroupRow}>
                  <div>
                    <label className={styles.inputLabel}>PHONE NUMBER</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={styles.inputControl}
                      placeholder="e.g. +234 800 000 0000"
                    />
                  </div>
                  <div>
                    <label className={styles.inputLabel}>SUBJECT</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={styles.inputControl}
                      placeholder="e.g. Song Request / Inquiry"
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>YOUR MESSAGE</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`${styles.inputControl} ${styles.textareaControl}`}
                    placeholder="Type your message here..."
                  />
                </div>

                <button type="submit" className={styles.submitBtn}>
                  <FiSend /> SEND MESSAGE
                </button>
              </form>
            )}
          </motion.div>

          {/* Map & Studio Location Card */}
          <motion.div 
            className={styles.mapCard}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80" 
              alt="Studio Location" 
              className={styles.mapImg}
            />
            <div className={styles.mapOverlay}>
              <span className={styles.mapBadge}>STUDIO LOCATION</span>
              <h4 className={styles.mapTitle}>
                93.5 AREA FM HEADQUARTERS
              </h4>
              <p className={styles.mapAddress}>
                Plot 11 Lateef Jakande Rd, Agidingbi, Ikeja 101233, Lagos, Nigeria
              </p>

              <div className={styles.mapDetailsList}>
                <div><strong>Live Studio Line:</strong> +234 809 935 8000</div>
                <div><strong>WhatsApp Line:</strong> +234 812 935 8001</div>
                <div><strong>Email:</strong> contact@areafm.ng</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <LivePlayer />
    </main>
  );
};
