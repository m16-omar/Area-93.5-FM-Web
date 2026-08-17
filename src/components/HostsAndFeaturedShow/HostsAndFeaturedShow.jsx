import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaYoutube, FaTiktok, FaSpotify } from 'react-icons/fa';
import { FiUser, FiMoreVertical } from 'react-icons/fi';
import styles from './HostsAndFeaturedShow.module.css';

const hostsList = [
  {
    id: "h1",
    name: "Simi Ogunleye",
    role: "DJ",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "h2",
    name: "Tobi Adebayo",
    role: "DJ",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "h3",
    name: "Funke Akindele",
    role: "HOST",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "h4",
    name: "Olamide Okafor",
    role: "HOST",
    photo: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "h5",
    name: "Kemi Adetiba",
    role: "DJ",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "h6",
    name: "Babalola Alabi",
    role: "PRODUCER",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"
  }
];

export const HostsAndFeaturedShow = () => {
  const [hostIndex, setHostIndex] = useState(0);

  // Displays 3 cards at a time, max step index = total - 3
  const maxIndex = Math.max(0, hostsList.length - 3);

  useEffect(() => {
    if (maxIndex === 0) return;

    const interval = setInterval(() => {
      setHostIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3200);

    return () => clearInterval(interval);
  }, [maxIndex]);

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.bgCircleTeal} />

      <div className={styles.gridContent}>
        {/* Left Column: Meet Our Hosts (3 Cards Auto Sliding Track) */}
        <div className={styles.leftHostsCol}>
          <div className={styles.headingWrapper}>
            <span className={styles.tagBadge}>OUR SPEAKERS</span>
            <div className={styles.accentLine} />
          </div>

          <h2 className={styles.sectionHeadline}>MEET OUR HOSTS</h2>

          {/* Viewport for 3 Cards Carousel */}
          <div className={styles.hostsViewport}>
            <div 
              className={styles.hostsTrack}
              style={{
                transform: `translateX(calc(-${hostIndex} * (33.333% + 4.66px)))`
              }}
            >
              {hostsList.map((host) => (
                <div key={host.id} className={styles.hostCard}>
                  <img src={host.photo} alt={host.name} className={styles.hostImg} />
                  
                  {/* Top-right avatar icon circle */}
                  <div className={styles.userBadgeCircle}>
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
                </div>
              ))}
            </div>
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
