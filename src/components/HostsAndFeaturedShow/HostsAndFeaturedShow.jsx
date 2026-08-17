import { useState, useEffect, useRef, useCallback } from 'react';
import { FiUser, FiMoreVertical } from 'react-icons/fi';
import { FaInstagram, FaXTwitter, FaYoutube, FaSpotify } from 'react-icons/fa6';
import { SiTiktok } from 'react-icons/si';
import styles from './HostsAndFeaturedShow.module.css';

const GAP = 12; // px, matches CSS gap

const hosts = [
  { id: 1, name: 'Simi Ogunleye',   role: 'DJ',       bg: '#1a1a2e' },
  { id: 2, name: 'Tobi Adebayo',    role: 'HOST',     bg: '#16213e' },
  { id: 3, name: 'Funke Akindele',  role: 'HOST',     bg: '#0f3460' },
  { id: 4, name: 'Olamide Okafor',  role: 'DJ',       bg: '#533483' },
  { id: 5, name: 'Kemi Adetiba',    role: 'PRODUCER', bg: '#1a1a2e' },
  { id: 6, name: 'Babalola Alabi',  role: 'HOST',     bg: '#16213e' },
];

// Duplicate for seamless infinite loop
const loopedHosts = [...hosts, ...hosts];

const socialIcons = [
  { Icon: FaInstagram, key: 'ig' },
  { Icon: FaXTwitter,  key: 'tw' },
  { Icon: FaYoutube,   key: 'yt' },
  { Icon: FaSpotify,   key: 'sp' },
  { Icon: SiTiktok,    key: 'tk' },
];

export default function HostsAndFeaturedShow() {
  const [index,  setIndex]  = useState(0);   // current lead card index
  const [animate, setAnimate] = useState(true);
  const viewportRef = useRef(null);
  const timerRef    = useRef(null);

  // cardWidth = (viewportWidth - 2 * GAP) / 3
  const getCardWidth = () => {
    if (!viewportRef.current) return 0;
    return (viewportRef.current.offsetWidth - GAP * 2) / 3;
  };

  const slideNext = useCallback(() => {
    setAnimate(true);
    setIndex(i => i + 1);
  }, []);

  // When we reach the cloned set, silently reset
  const handleTransitionEnd = useCallback(() => {
    if (index >= hosts.length) {
      setAnimate(false);
      setIndex(0);
    }
  }, [index]);

  // After disabling animation and resetting index, re-enable animation on next tick
  useEffect(() => {
    if (!animate) {
      const raf = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [animate]);

  useEffect(() => {
    timerRef.current = setInterval(slideNext, 3000);
    return () => clearInterval(timerRef.current);
  }, [slideNext]);

  const cardWidth  = getCardWidth();
  const translateX = cardWidth > 0 ? index * (cardWidth + GAP) : 0;

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

          {/* Clip window */}
          <div className={styles.hostsViewport} ref={viewportRef}>
            <div
              className={styles.hostsTrack}
              style={{
                transform:  `translateX(-${translateX}px)`,
                transition: animate ? 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {loopedHosts.map((host, idx) => (
                <div
                  key={`${host.id}-${idx}`}
                  className={styles.hostCard}
                  style={{ background: host.bg }}
                >
                  {/* Avatar circle top-right */}
                  <span className={styles.userBadge}><FiUser size={13} /></span>

                  {/* Bottom info */}
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
                background:
                  'linear-gradient(135deg, #8B4B8B 0%, #4B6B8B 50%, #2B3B6B 100%)',
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

      {/* Decorative teal circle */}
      <div className={styles.bgCircleTeal} aria-hidden="true" />
    </section>
  );
}
