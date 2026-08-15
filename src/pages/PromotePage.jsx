import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiDownload, FiRadio, FiPercent, FiCalendar, FiDollarSign } from 'react-icons/fi';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import promoteData from '../data/promoteData.json';
import styles from './PromotePage.module.css';

const programmeSchedule = [
  { time: "06:00 - 10:00 AM", name: "Morning Vibe Blast", host: "Jordan Carter" },
  { time: "10:00 - 02:00 PM", name: "Urban Beats & Rhythms", host: "Elena Vance" },
  { time: "02:00 - 06:00 PM", name: "Hitmakers Live Drive", host: "Alex Rivera" },
  { time: "06:00 - 10:00 PM", name: "Top 10 Countdown", host: "Lucas Ruiz" },
  { time: "10:00 - 02:00 AM", name: "Vibe Check Late Night", host: "Mia Johnson" }
];

const rateCardSlots = [
  { slot: "30s Morning Spot (06:00 - 10:00)", price: "₦45,000 / spot" },
  { slot: "30s Daytime Spot (10:00 - 16:00)", price: "₦35,000 / spot" },
  { slot: "30s Drive Time Spot (16:00 - 20:00)", price: "₦40,000 / spot" },
  { slot: "60s Live Presenter Hype", price: "₦60,000 / read" },
  { slot: "1-Hour Show Sponsorship", price: "₦250,000 / ep" }
];

export const PromotePage = () => {
  return (
    <main className={styles.promotePageContainer}>
      <Navbar />

      {/* 1. HERO BANNER SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.bgCircleTopRight} />
        <div className={styles.glowCircleTeal} />

        <div className={styles.watermarkText}>
          PROMOTE
        </div>

        <div className={styles.heroContent}>
          <motion.div 
            className={styles.tagWrapper}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.tagDot} />
            <span className={styles.tagText}>ADVERTISE WITH AREA 93.5 FM</span>
          </motion.div>

          <motion.h1 
            className={styles.mainTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            AMPLIFY YOUR BRAND TO MILLIONS
          </motion.h1>

          <motion.p 
            className={styles.heroDesc}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Connect your brand directly to millions of engaged radio listeners, streaming fans, and urban music lovers across Area 93.5 FM.
          </motion.p>
        </div>
      </section>

      {/* 2. MAIN CONTENT SECTION */}
      <section className={styles.promoteMainSection}>
        {/* Listener Statistics Grid */}
        <div className={styles.statsGrid}>
          {promoteData.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className={styles.statCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <div className={styles.statVal}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* DUAL SECTION: PROGRAMME CARD & RATE CARD */}
        <div className={styles.cardsDualRow}>
          {/* PROGRAMME CARD */}
          <motion.div 
            className={styles.resourceCard}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <div className={styles.cardHeaderRow}>
                <span className={styles.cardBadge}>STATION SCHEDULE</span>
                <div className={styles.cardIconCircle}>
                  <FiCalendar />
                </div>
              </div>

              <h2 className={styles.cardTitle}>PROGRAMME CARD</h2>
              <p className={styles.cardDesc}>
                Explore our official broadcast schedule, prime-time show slots, and drive-time presenter lineups for targeted sponsorship placement.
              </p>

              <div className={styles.resourceList}>
                {programmeSchedule.map((p, idx) => (
                  <div key={idx} className={styles.resourceItem}>
                    <span className={styles.itemLabel}>{p.name} ({p.time})</span>
                    <span className={styles.itemDetail}>Host: {p.host}</span>
                  </div>
                ))}
              </div>
            </div>

            <a 
              href="#"
              onClick={(e) => { e.preventDefault(); alert("Downloading Station Programme Card (PDF)..."); }}
              className={styles.downloadBtn}
            >
              <FiDownload /> DOWNLOAD PROGRAMME CARD (PDF)
            </a>
          </motion.div>

          {/* RATE CARD */}
          <motion.div 
            className={styles.resourceCard}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <div className={styles.cardHeaderRow}>
                <span className={styles.cardBadge}>OFFICIAL RATES</span>
                <div className={styles.cardIconCircle}>
                  <FiDollarSign />
                </div>
              </div>

              <h2 className={styles.cardTitle}>ADVERTISING RATE CARD 2026</h2>
              <p className={styles.cardDesc}>
                Transparent commercial rates for 30s radio spots, live presenter hypes, show segment sponsorships, and digital cross-promotions.
              </p>

              <div className={styles.resourceList}>
                {rateCardSlots.map((r, idx) => (
                  <div key={idx} className={styles.resourceItem}>
                    <span className={styles.itemLabel}>{r.slot}</span>
                    <span className={styles.itemDetail}>{r.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <a 
              href="#"
              onClick={(e) => { e.preventDefault(); alert("Downloading Official Rate Card 2026 (PDF)..."); }}
              className={styles.downloadBtn}
            >
              <FiDownload /> DOWNLOAD RATE CARD 2026 (PDF)
            </a>
          </motion.div>
        </div>

        {/* CAMPAIGN PACKAGES SECTION */}
        <div className={styles.packagesHeader}>
          <h2 className={styles.packagesTitle}>CAMPAIGN ADVERTISING PACKAGES</h2>
        </div>

        <div className={styles.packagesGrid}>
          {promoteData.packages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              className={`${styles.pkgCard} ${pkg.popular ? styles.pkgPopular : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              {pkg.popular && (
                <span className={styles.popularBadge}>MOST POPULAR</span>
              )}

              <div>
                <h3 className={styles.pkgName}>{pkg.name}</h3>
                <div className={styles.pkgPrice}>
                  {pkg.price} <span>/ campaign</span>
                </div>

                <ul className={styles.pkgFeaturesList}>
                  {pkg.features.map((feat, fIdx) => (
                    <li key={fIdx} className={styles.pkgFeatureItem}>
                      <FiCheck className={styles.checkIcon} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                className={styles.selectPkgBtn}
                onClick={() => alert(`Selected ${pkg.name} package. Our advertising team will contact you shortly!`)}
              >
                SELECT PACKAGE
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
      <LivePlayer />
    </main>
  );
};
