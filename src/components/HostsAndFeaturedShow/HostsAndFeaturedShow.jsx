import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaYoutube, FaTiktok, FaSpotify } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';
import styles from './HostsAndFeaturedShow.module.css';

export const HostsAndFeaturedShow = () => {
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.bgCircleTeal} />

      <div className={styles.gridContent}>
        {/* Left Column: Meet Our Hosts */}
        <div className={styles.leftHostsCol}>
          <div className={styles.headingWrapper}>
            <span className={styles.tagBadge}>OUR SPEAKERS</span>
            <div className={styles.accentLine} />
          </div>

          <h2 className={styles.sectionHeadline}>MEET OUR HOSTS</h2>

          <motion.div 
            className={styles.hostCardTall}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" 
              alt="Funke Akindele" 
              className={styles.hostImg} 
            />
            <div className={styles.hostOverlay}>
              <span className={styles.hostRoleBadge}>HOST</span>
              <h3 className={styles.hostName}>Funke Akindele</h3>

              <div className={styles.socialsRow}>
                <span className={styles.socialCircle}><FaInstagram /></span>
                <span className={styles.socialCircle}><FaTwitter /></span>
                <span className={styles.socialCircle}><FaYoutube /></span>
                <span className={styles.socialCircle}><FaSpotify /></span>
                <span className={styles.socialCircle}><FaTiktok /></span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Featured Show */}
        <div className={styles.rightFeaturedCol}>
          <div className={styles.headingWrapper}>
            <span className={styles.tagBadge}>FEATURED SHOW</span>
            <div className={styles.accentLine} />
          </div>

          <h2 className={styles.sectionHeadline}>FEATURED SHOW</h2>

          <motion.div 
            className={styles.featuredCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80" 
              alt="The Fan Zone" 
              className={styles.featuredImg} 
            />
            <div className={styles.featuredOverlay}>
              <span className={styles.catBadge}>TRENDS</span>
              <h3 className={styles.featuredTitle}>The Fan Zone</h3>
            </div>
            <button className={styles.moreBtn} aria-label="Options">
              <FiMoreVertical />
            </button>
          </motion.div>

          <button className={styles.discoverBtn}>
            DISCOVER MORE
          </button>
        </div>
      </div>
    </section>
  );
};
