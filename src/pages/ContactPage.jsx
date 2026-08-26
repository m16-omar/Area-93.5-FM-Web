import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiClock, 
  FiSend, 
  FiCheckCircle, 
  FiRadio, 
  FiMusic, 
  FiUsers, 
  FiGlobe, 
  FiZap, 
  FiArrowRight 
} from 'react-icons/fi';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import contactInfoData from '../data/contactInfoData.json';
import teamData from '../data/teamData.json';
import styles from './ContactPage.module.css';

export const ContactPage = () => {
  const navigate = useNavigate();
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

  const corePillars = [
    {
      icon: <FiRadio />,
      title: "Grassroots Voice",
      desc: "Authentic, unfiltered broadcasting that connects every neighbourhood across Lagos, giving real people and communities an active voice on the airwaves."
    },
    {
      icon: <FiMusic />,
      title: "Afrobeats & Urban Anthems",
      desc: "Home to the hottest chart-topping music, street anthems, exclusive artist interviews, and trendsetting daily live DJ sets."
    },
    {
      icon: <FiGlobe />,
      title: "Global Digital Stream",
      desc: "Broadcasting on 93.5 FM across Lagos and streaming 24/7 in high-fidelity to millions of listeners worldwide via web and mobile apps."
    },
    {
      icon: <FiUsers />,
      title: "Youth & Creative Hub",
      desc: "Empowering upcoming broadcasters, DJs, musicians, and creators through masterclasses, live stage opportunities, and talent showcases."
    }
  ];

  return (
    <main className={styles.contactPageContainer}>
      <Navbar />

      {/* 1. HERO BANNER SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.bgCircleTopRight} />
        <div className={styles.glowCircleTeal} />

        <div className={styles.watermarkText}>
          ABOUT US
        </div>

        <div className={styles.heroContent}>
          <motion.div 
            className={styles.tagWrapper}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.tagDot} />
            <span className={styles.tagText}>ABOUT 93.5 AREA FM</span>
          </motion.div>

          <motion.h1 
            className={styles.mainTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            ONE VOICE, EVERY AREA
          </motion.h1>

          <motion.p 
            className={styles.heroDesc}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            93.5 Area FM is Lagos’ premier urban radio powerhouse. We blend high-energy afrobeats, street culture, hard-hitting talk shows, and community empowerment into an electrifying broadcast experience on air and online.
          </motion.p>
        </div>
      </section>

      {/* 2. STATS COUNTER BAR */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          <motion.div 
            className={styles.statItem}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.statNumber}>93.5 <span className={styles.statUnit}>FM</span></div>
            <div className={styles.statLabel}>Official Frequency</div>
          </motion.div>

          <motion.div 
            className={styles.statItem}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className={styles.statNumber}>5M+</div>
            <div className={styles.statLabel}>Weekly Listeners</div>
          </motion.div>

          <motion.div 
            className={styles.statItem}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className={styles.statNumber}>24/7</div>
            <div className={styles.statLabel}>Live Non-Stop Stream</div>
          </motion.div>

          <motion.div 
            className={styles.statItem}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statLabel}>Urban Culture & Hits</div>
          </motion.div>
        </div>
      </section>

      {/* 3. OUR STORY & BRAND PILLARS SECTION */}
      <section className={styles.storySection}>
        <div className={styles.storyContainer}>
          <div className={styles.storyHeader}>
            <span className={styles.sectionBadge}>OUR MISSION & STORY</span>
            <h2 className={styles.storyTitle}>THE HEARTBEAT OF LAGOS URBAN RADIO</h2>
            <p className={styles.storySubtitle}>
              Founded with the bold mission to give every neighbourhood a platform, 93.5 Area FM celebrates the resilience, music, and distinct cultural energy of Nigeria. From grassroots discussions to global Afrobeats releases, our studio is where the streets meet the airwaves.
            </p>
          </div>

          <div className={styles.pillarsGrid}>
            {corePillars.map((pillar, idx) => (
              <motion.div 
                key={idx}
                className={styles.pillarCard}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className={styles.pillarIconWrapper}>
                  {pillar.icon}
                </div>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <p className={styles.pillarDesc}>{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MEET THE VOICES (HOSTS PREVIEW) */}
      <section className={styles.hostsSection}>
        <div className={styles.hostsContainer}>
          <div className={styles.hostsHeaderRow}>
            <div>
              <span className={styles.sectionBadge}>ON-AIR VOICES</span>
              <h2 className={styles.storyTitle}>MEET OUR PRESENTERS & DJS</h2>
            </div>
            <button 
              className={styles.viewAllHostsBtn}
              onClick={() => navigate('/hosts')}
            >
              ALL HOSTS & DJS <FiArrowRight />
            </button>
          </div>

          <div className={styles.hostsGrid}>
            {teamData.slice(0, 4).map((host) => (
              <motion.div 
                key={host.id}
                className={styles.hostCard}
                onClick={() => navigate(`/hosts/${host.slug}`)}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <div className={styles.hostImageWrapper}>
                  <img src={host.photo} alt={host.name} className={styles.hostImg} loading="lazy" />
                  <span className={styles.hostBadge}>{host.badge}</span>
                </div>
                <div className={styles.hostInfo}>
                  <h4 className={styles.hostName}>{host.name}</h4>
                  <p className={styles.hostRole}>{host.role}</p>
                  <div className={styles.hostShows}>
                    {host.shows.slice(0, 2).map((sh, sIdx) => (
                      <span key={sIdx} className={styles.hostShowTag}>{sh}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CONTACT INFO CARDS & FORM SECTION */}
      <section className={styles.contactMainSection}>
        <div className={styles.contactHeaderBlock}>
          <span className={styles.sectionBadge}>GET IN TOUCH</span>
          <h2 className={styles.storyTitle}>VISIT OUR STUDIO OR DROP A LINE</h2>
          <p className={styles.storySubtitle}>
            Have song requests, press releases, sponsorship opportunities, or listener feedback? Reach our team directly.
          </p>
        </div>

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
                      placeholder="e.g. tobi@935areafm.com"
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
            {/* Real Interactive Google Map */}
            <div className={styles.mapIframeWrapper}>
              <iframe
                title="93.5 Area FM Studio Location"
                src="https://maps.google.com/maps?q=Plot+11+Lateef+Jakande+Rd,+Agidingbi,+Ikeja+101233,+Lagos,+Nigeria&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className={styles.googleMapIframe}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className={styles.mapOverlay}>
              <div className={styles.mapHeaderRow}>
                <span className={styles.mapBadge}>STUDIO LOCATION</span>
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=Plot+11+Lateef+Jakande+Rd,+Agidingbi,+Ikeja,+Lagos" 
                  target="_blank" 
                  rel="noreferrer"
                  className={styles.directionsBtn}
                >
                  <FiMapPin size={12} /> GET DIRECTIONS
                </a>
              </div>

              <h4 className={styles.mapTitle}>
                93.5 AREA FM OFFICE
              </h4>
              <p className={styles.mapAddress}>
                Plot 11 Lateef Jakande Rd, Agidingbi, Ikeja 101233, Lagos, Nigeria
              </p>

              <div className={styles.mapDetailsList}>
                <div><strong>Live Studio Line:</strong> <a href="tel:+2348099358000" className={styles.mapLink}>+234 809 935 8000</a></div>
                <div><strong>WhatsApp Line:</strong> <a href="https://wa.me/2348129358001" target="_blank" rel="noreferrer" className={styles.mapLink}>+234 812 935 8001</a></div>
                <div><strong>Email:</strong> <a href="mailto:contact@935areafm.com" className={styles.mapLink}>contact@935areafm.com</a></div>
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
