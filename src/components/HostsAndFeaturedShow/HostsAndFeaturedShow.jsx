import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaYoutube, FaTiktok, FaSpotify } from 'react-icons/fa';
import { FiUser, FiMoreVertical } from 'react-icons/fi';
import styles from './HostsAndFeaturedShow.module.css';

export const HostsAndFeaturedShow = () => {
  const hosts = [
    {
      id: "h1",
      name: "Simi Ogunleye",
      role: "DJ",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "h2",
      name: "Tobi Adebayo",
      role: "DJ",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "h3",
      name: "Funke Akindele",
      role: "DJ",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.bgCircleTeal} />

      <div className={styles.gridContent}>
        {/* Left Column: Meet Our Hosts (3 Cards Side-by-Side) */}
        <div className={styles.leftHostsCol}>
          <div className={styles.headingWrapper}>
            <span className={styles.tagBadge}>OUR SPEAKERS</span>
            <div className={styles.accentLine} />
          </div>

          <h2 className={styles.sectionHeadline}>MEET OUR HOSTS</h2>

          <div className={styles.hostsGrid}>
            {hosts.map((host, idx) => (
              <motion.div 
                key={host.id}
                className={styles.hostCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <img src={host.image} alt={host.name} className={styles.hostImg} />
                <div className={styles.profileIconCircle}>
                  <FiUser />
                </div>
                
                <div className={styles.hostOverlay}>
                  <span className={styles.hostRoleBadge}>{host.role}</span>
                  <h3 className={styles.hostName}>{host.name}</h3>

                  <div className={styles.socialsRow}>
                    <span className={styles.socialCircle}><FaInstagram /></span>
                    <span className={styles.socialCircle}><FaTwitter /></span>
                    <span className={styles.socialCircle}><FaYoutube /></span>
                    <span className={styles.socialCircle}><FaSpotify /></span>
                    <span className={styles.socialCircle}><FaTiktok /></span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
