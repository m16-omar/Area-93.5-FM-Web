import { useState, useEffect, useRef } from 'react';
import { FiUser, FiMoreVertical } from 'react-icons/fi';
import { FaInstagram, FaYoutube, FaSpotify } from 'react-icons/fa6';
import { FaTwitter } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import styles from './HostsAndFeaturedShow.module.css';

const hosts = [
  { id: 1, name: 'Simi Ogunleye',   role: 'DJ',       bg: '#1a1a2e' },
  { id: 2, name: 'Tobi Adebayo',    role: 'HOST',     bg: '#16213e' },
  { id: 3, name: 'Funke Akindele',  role: 'HOST',     bg: '#0f3460' },
  { id: 4, name: 'Olamide Okafor',  role: 'DJ',       bg: '#533483' },
  { id: 5, name: 'Kemi Adetiba',    role: 'PRODUCER', bg: '#1a1a2e' },
  { id: 6, name: 'Babalola Alabi',  role: 'HOST',     bg: '#16213e' },
];

const socialIcons = [
  { Icon: FaInstagram, key: 'ig' },
  { Icon: FaTwitter,   key: 'tw' },
  { Icon: FaYoutube,   key: 'yt' },
  { Icon: FaSpotify,   key: 'sp' },
  { Icon: SiTiktok,    key: 'tk' },
];

export default function HostsAndFeaturedShow() {
  const [offset, setOffset]     = useState(0);      // how many cards we've shifted
  const [transition, setTrans]  = useState(true);
  const total = hosts.length;

  // Looped array: original + clone for seamless loop
  const looped = [...hosts, ...hosts];

  useEffect(() => {
    const timer = setInterval(() => {
      setTrans(true);
      setOffset(prev => prev + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // When we've gone past the original set, silently jump back
  const handleTransEnd = () => {
    if (offset >= total) {
      setTrans(false);
      setOffset(0);
    }
  };

  // After disabling transition and resetting, re-enable on next frame
  useEffect(() => {
    if (!transition) {
      const id = requestAnimationFrame(() => setTrans(true));
      return () => cancelAnimationFrame(id);
    }
  }, [transition]);

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.gridContent}>

        {/* ── LEFT: MEET OUR HOSTS ── */}
        <div className={styles.leftHostsCol}>
          <div className={styles.headingWrapper}>
            <span className={styles.tagBadge}>OUR SPEAKERS</span>
            <span className={styles.accentLine} />
          </div>
          <h2 className={styles.sectionHeadline}>MEET OUR HOSTS</h2>

          <div className={styles.hostsViewport}>
            <div
              className={styles.hostsTrack}
              style={{
                // Each card is exactly 33.333% - (2/3 * 12px) = 1/3 of viewport
                // Moving by 1 card = (100% / 3) + (12px * 2/3)
                transform: `translateX(calc(-${offset} * (33.333% + 4px)))`,
                transition: transition ? 'transform 0.75s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
              }}
              onTransitionEnd={handleTransEnd}
            >
              {looped.map((host, idx) => (
                <div
                  key={`${host.id}-${idx}`}
                  className={styles.hostCard}
                  style={{ background: host.bg }}
                >
                  <span className={styles.userBadge}><FiUser size={13} /></span>
                  <div className={styles.hostInfo}>
                    <span className={styles.hostRoleBadge}>{host.role}</span>
                    <p className={styles.hostName}>{host.name}</p>
                    <div className={styles.socialsRow}>
                      {socialIcons.map(({ Icon, key }) => (
                        <span key={key} className={styles.socialCircle}><Icon /></span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: FEATURED SHOW ── */}
        <div className={styles.rightFeaturedCol}>
          <div className={styles.headingWrapper}>
            <span className={styles.tagBadge}>FEATURED SHOW</span>
            <span className={styles.accentLine} />
          </div>
          <h2 className={styles.sectionHeadline}>FEATURED SHOW</h2>

          <div className={styles.featuredCard}>
            <div
              className={styles.featuredImg}
              style={{
                background: 'linear-gradient(135deg, #8B4B8B 0%, #4B6B8B 50%, #2B3B6B 100%)',
              }}
            />
            <div className={styles.featuredOverlay}>
              <span className={styles.catBadge}>TRENDS</span>
              <h3 className={styles.featuredTitle}>The Fan Zone</h3>
            </div>
            <button className={styles.moreBtn} aria-label="More options">
              <FiMoreVertical />
            </button>
          </div>

          <button className={styles.discoverBtn}>DISCOVER MORE</button>
        </div>
      </div>

      <div className={styles.bgCircleTeal} aria-hidden="true" />
    </section>
  );
}
