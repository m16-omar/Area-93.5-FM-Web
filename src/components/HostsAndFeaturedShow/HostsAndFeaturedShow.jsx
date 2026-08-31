import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMoreVertical } from 'react-icons/fi';
import { FaInstagram, FaYoutube, FaSpotify, FaXTwitter } from 'react-icons/fa6';
import { SiTiktok } from 'react-icons/si';
import teamData from '../../data/teamData.json';
import styles from './HostsAndFeaturedShow.module.css';

const socialIcons = [
  { Icon: FaInstagram, key: 'ig' },
  { Icon: FaXTwitter,  key: 'tw' },
  { Icon: FaYoutube,   key: 'yt' },
  { Icon: FaSpotify,   key: 'sp' },
  { Icon: SiTiktok,    key: 'tk' },
];

export default function HostsAndFeaturedShow() {
  const navigate = useNavigate();
  const [offset, setOffset]     = useState(0);
  const [transition, setTrans]  = useState(true);
  const total = teamData.length;

  // Looped array: original + clone for seamless loop
  const looped = [...teamData, ...teamData];

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
                transform: `translateX(calc(-${offset} * (33.333% + 4px)))`,
                transition: transition ? 'transform 0.75s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
              }}
              onTransitionEnd={handleTransEnd}
            >
              {looped.map((host, idx) => (
                <Link
                  key={`${host.id}-${idx}`}
                  to={`/hosts/${host.slug}`}
                  className={styles.hostCard}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {/* Host Photo */}
                  <img
                    src={host.photo}
                    alt={host.name}
                    className={styles.hostImg}
                    loading="lazy"
                  />

                  {/* Top-Right Avatar Badge */}
                  <span className={styles.userBadge}>
                    <FiUser size={13} />
                  </span>

                  {/* Host Info Overlay */}
                  <div className={styles.hostInfo}>
                    <span className={styles.hostRoleBadge}>
                      {host.badge || 'HOST'}
                    </span>
                    <p className={styles.hostName}>{host.name}</p>
                    <div className={styles.socialsRow}>
                      {socialIcons.map(({ Icon, key }) => (
                        <span
                          key={key}
                          className={styles.socialCircle}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Icon />
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
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

          <div 
            className={styles.featuredCard}
            onClick={() => navigate('/shows/the-fan-zone')}
            style={{ cursor: 'pointer' }}
          >
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
              alt="The Fan Zone"
              className={styles.featuredImg}
            />
            <div className={styles.featuredOverlay}>
              <span className={styles.catBadge}>TRENDS</span>
              <h3 className={styles.featuredTitle}>The Fan Zone</h3>
            </div>
            <button 
              className={styles.moreBtn} 
              aria-label="View Show Details"
              onClick={(e) => { e.stopPropagation(); navigate('/shows/the-fan-zone'); }}
            >
              <FiMoreVertical />
            </button>
          </div>

          <Link to="/shows/the-fan-zone" style={{ textDecoration: 'none' }}>
            <button className={styles.discoverBtn}>DISCOVER MORE</button>
          </Link>
        </div>
      </div>

      <div className={styles.bgCircleTeal} aria-hidden="true" />
    </section>
  );
}
