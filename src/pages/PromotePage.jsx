import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiDownload, FiEye, FiFileText, FiX } from 'react-icons/fi';
import { FaFilePdf } from 'react-icons/fa';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import promoteData from '../data/promoteData.json';
import styles from './PromotePage.module.css';

export const PromotePage = () => {
  const [activePdfModal, setActivePdfModal] = useState(null);

  const rateCardPdfUrl = "/assets/Area_935_FM_Rate_Card_2026.pdf";
  const programmePdfUrl = "/assets/Area_935_FM_Programme_Schedule_2026.pdf";

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

        {/* DUAL SECTION: PROGRAMME CARD PDF & RATE CARD PDF */}
        <div className={styles.cardsDualRow}>
          {/* PROGRAMME CARD PDF */}
          <motion.div 
            className={styles.pdfCard}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <div className={styles.cardHeaderRow}>
                <span className={styles.cardBadge}>STATION SCHEDULE</span>
                <div className={styles.pdfIconCircle}>
                  <FaFilePdf />
                </div>
              </div>

              <h2 className={styles.cardTitle}>PROGRAMME CARD (PDF)</h2>
              <p className={styles.cardDesc}>
                Download the complete official 93.5 Area FM broadcast schedule PDF document detailing show times, presenter lineups, and prime-time sponsorship slots.
              </p>

              {/* PDF Preview Container */}
              <div className={styles.pdfPreviewBox}>
                <FaFilePdf className={styles.pdfDocIcon} />
                <div className={styles.pdfDocMeta}>
                  <div className={styles.pdfDocName}>Area_935_FM_Programme_Schedule_2026.pdf</div>
                  <div className={styles.pdfMetaPillRow}>
                    <span className={styles.pdfMetaPill}>PDF Document</span>
                    <span className={styles.pdfMetaPill}>Size: 1.2 MB</span>
                    <span className={styles.pdfMetaPill}>Version 2026</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.btnGroupRow}>
              <a 
                href={programmePdfUrl}
                download="Area_935_FM_Programme_Schedule_2026.pdf"
                className={styles.downloadBtn}
              >
                <FiDownload /> DOWNLOAD PDF
              </a>

              <button 
                onClick={() => setActivePdfModal({ title: "Programme Schedule 2026 (PDF)", url: programmePdfUrl })}
                className={styles.viewPdfBtn}
              >
                <FiEye /> VIEW ONLINE
              </button>
            </div>
          </motion.div>

          {/* RATE CARD PDF */}
          <motion.div 
            className={styles.pdfCard}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <div className={styles.cardHeaderRow}>
                <span className={styles.cardBadge}>OFFICIAL RATES</span>
                <div className={styles.pdfIconCircle}>
                  <FaFilePdf />
                </div>
              </div>

              <h2 className={styles.cardTitle}>ADVERTISING RATE CARD (PDF)</h2>
              <p className={styles.cardDesc}>
                Download the official 93.5 Area FM Rate Card PDF document containing full commercial spot rates, live presenter hypes, segment sponsorships, and digital packages.
              </p>

              {/* PDF Preview Container */}
              <div className={styles.pdfPreviewBox}>
                <FaFilePdf className={styles.pdfDocIcon} />
                <div className={styles.pdfDocMeta}>
                  <div className={styles.pdfDocName}>Area_935_FM_Rate_Card_2026.pdf</div>
                  <div className={styles.pdfMetaPillRow}>
                    <span className={styles.pdfMetaPill}>PDF Document</span>
                    <span className={styles.pdfMetaPill}>Size: 1.4 MB</span>
                    <span className={styles.pdfMetaPill}>Official Rate Card</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.btnGroupRow}>
              <a 
                href={rateCardPdfUrl}
                download="Area_935_FM_Rate_Card_2026.pdf"
                className={styles.downloadBtn}
              >
                <FiDownload /> DOWNLOAD RATE CARD PDF
              </a>

              <button 
                onClick={() => setActivePdfModal({ title: "Official Rate Card 2026 (PDF)", url: rateCardPdfUrl })}
                className={styles.viewPdfBtn}
              >
                <FiEye /> VIEW ONLINE
              </button>
            </div>
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

      {/* PDF VIEWER MODAL */}
      {activePdfModal && (
        <div className={styles.modalBackdrop} onClick={() => setActivePdfModal(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>{activePdfModal.title}</h3>
              <button className={styles.modalCloseBtn} onClick={() => setActivePdfModal(null)}>
                <FiX />
              </button>
            </div>
            <iframe 
              src={activePdfModal.url} 
              title={activePdfModal.title}
              className={styles.modalIframe}
            />
          </div>
        </div>
      )}

      <Footer />
      <LivePlayer />
    </main>
  );
};
