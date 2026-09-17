import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaInstagram, FaYoutube, FaSpotify, FaTwitch, FaSoundcloud, FaPlay, FaPause, FaUser, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { LIVE_STREAM_URL } from '../constants/audio';
import { getCurrentDayKey, getShowsForDay, getShowSlug } from '../utils/scheduleHelper';
import teamData from '../data/teamData.json';
import { SEO } from '../components/SEO/SEO';
import { getBreadcrumbSchema } from '../utils/seoSchemas';
import { SEO_KEYWORDS } from '../utils/seoKeywords';
import styles from './HostsPage.module.css';

export const HostsPage = () => {
  const navigate = useNavigate();
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();
  const [visibleCount, setVisibleCount] = useState(6);
  const [showPageIndex, setShowPageIndex] = useState(0);

  const currentDayKey = useMemo(() => getCurrentDayKey(), []);
  const todayShows = useMemo(() => getShowsForDay(currentDayKey), [currentDayKey]);
  const featuredHost = teamData.find(t => t.name === "Simi Ogunleye") || teamData[0];

  const pageSize = 2;
  const maxPage = Math.max(0, Math.ceil(todayShows.length / pageSize) - 1);
  const currentIncomingShows = todayShows.slice(showPageIndex * pageSize, (showPageIndex + 1) * pageSize);

  const handlePrevShow = () => {
    setShowPageIndex(prev => (prev > 0 ? prev - 1 : maxPage));
  };

  const handleNextShow = () => {
    setShowPageIndex(prev => (prev < maxPage ? prev + 1 : 0));
  };

  const handleViewMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, teamData.length));
  };

  const hostsBreadcrumbs = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "On-Air Hosts & DJs", url: "/hosts" }
  ]);

  return (
    <main className={styles.hostsPageContainer}>
      <SEO
        title="Meet Our On-Air Personalities, DJs & Radio Hosts | Area 93.5 FM"
        description="Discover the voices behind Area 93.5 FM Lagos. Meet top Nigerian radio presenters, DJ resident tastemakers, and broadcast journalists."
        keywords={[
          ...SEO_KEYWORDS.primary,
          "Radio presenters Lagos",
          "On-air personalities Nigeria",
          "Top radio DJs Lagos",
          "Area 93.5 FM team"
        ]}
        schemaJson={hostsBreadcrumbs}
      />
      <Navbar />

      {/* 1. HERO BANNER SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.bgCircleTopRight} />
        <div className={styles.glowCircleTeal} />

        <div className={styles.heroGrid}>
          {/* Left Column: Stacked Watermark Text */}
          <div className={styles.heroWatermarkCol}>
            <div className={styles.heroWatermarkText}>
              TEAM<br /><span className={styles.redWatermark}>MEMBERS</span>
            </div>
          </div>

          {/* Right Column: Meet Our Hosts Header */}
          <div className={styles.heroContentCol}>
            <motion.h1
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              MEET OUR HOSTS
            </motion.h1>

            <motion.p
              className={styles.heroDesc}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Discover the hitmakers, creators, and DJs behind Area 93.5 FM. Delivering daily live radio sessions, exclusive pop culture interviews, and urban hit countdowns.
            </motion.p>

            <motion.a
              href="mailto:careers@935areafm.com"
              className={styles.joinBtn}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              JOIN US
            </motion.a>
          </div>
        </div>
      </section>

      {/* 2. POPULAR HOST FEATURED BLOCK */}
      <section className={styles.popularHostSection}>
        <div className={styles.popularGlowBg} />

        <div className={styles.popularGrid}>
          {/* Left Col: Info & Socials */}
          <motion.div
            className={styles.popularLeftCol}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className={styles.popularTitle}
              onClick={() => navigate(`/hosts/${featuredHost.slug}`)}
              style={{ cursor: 'pointer' }}
            >
              TEAM LEAD<br /><span className={styles.redHighlight}>PRESENTERS</span>
            </h2>
            <p className={styles.popularDesc}>
              {featuredHost.bio || "Hosting the prime time morning slot on Area 93.5 FM. Bringing high energy beats, live listener interaction, and breaking music news."}
            </p>

            <button
              className={styles.discoverBtn}
              onClick={() => navigate(`/hosts/${featuredHost.slug}`)}
            >
              VIEW MORE
            </button>

            <div className={styles.followOnHeader}>
              <span className={styles.followOnTag}>FOLLOW ON</span>
              <div className={styles.followOnLine} />
            </div>

            <div className={styles.socialBtnsRow}>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className={styles.socialSquareBtn} aria-label="YouTube"><FaYoutube /></a>
              <a href="https://twitch.tv" target="_blank" rel="noreferrer" className={styles.socialSquareBtn} aria-label="Twitch"><FaTwitch /></a>
              <a href="https://spotify.com" target="_blank" rel="noreferrer" className={styles.socialSquareBtn} aria-label="Spotify"><FaSpotify /></a>
              <a href="https://soundcloud.com" target="_blank" rel="noreferrer" className={styles.socialSquareBtn} aria-label="Soundcloud"><FaSoundcloud /></a>
            </div>
          </motion.div>

          {/* Middle Col: Featured Host Portrait */}
          <motion.div
            className={styles.popularMiddleCol}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div
              className={styles.featuredHostCard}
              onClick={() => navigate(`/hosts/${featuredHost.slug}`)}
              style={{ cursor: 'pointer' }}
            >
              <img src={featuredHost.photo} alt={featuredHost.name} className={styles.featuredHostImg} />

              <div className={styles.avatarBadge}>
                <FaUser />
              </div>

              <div className={styles.featuredHostFooter}>
                <div className={styles.djBadgeBox}>{featuredHost.badge || "PRESENTER"}</div>
                <h3 className={styles.featuredHostName}>{featuredHost.name}</h3>
                <div className={styles.featuredHostSocials}>
                  <a href="#" className={styles.miniSocialCircle} aria-label="Instagram" onClick={(e) => e.stopPropagation()}><FaInstagram /></a>
                  <a href="#" className={styles.miniSocialCircle} aria-label="X" onClick={(e) => e.stopPropagation()}><FaXTwitter /></a>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" className={styles.miniSocialCircle} aria-label="YouTube" onClick={(e) => e.stopPropagation()}><FaYoutube /></a>
                  <a href="https://spotify.com" target="_blank" rel="noreferrer" className={styles.miniSocialCircle} aria-label="Spotify" onClick={(e) => e.stopPropagation()}><FaSpotify /></a>
                  <a href="https://tiktok.com" target="_blank" rel="noreferrer" className={styles.miniSocialCircle} aria-label="TikTok" onClick={(e) => e.stopPropagation()}><FaTiktok /></a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Col: Episodes & Listen On */}
          <motion.div
            className={styles.popularRightCol}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className={styles.bgCircleRightEpisodes} />

            <div
              className={styles.listenOnHeader}
              onClick={() => navigate('/shows')}
              style={{ cursor: 'pointer' }}
            >
              <span className={styles.listenOnTag}>INCOMING SHOWS</span>
              <div className={styles.listenOnLine} />
            </div>

            <div className={styles.episodesList}>
              {currentIncomingShows.map(show => {
                const isSelected = (currentTrack?.title === (show.name || show.title) || currentTrack?.id === show.id) && isPlaying;
                return (
                  <div
                    key={show.id}
                    className={styles.episodeCard}
                    onClick={() => navigate(`/shows/${getShowSlug(show.name || show.title)}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className={styles.episodeThumbWrapper}>
                      <img src={show.image} alt={show.name || show.title} className={styles.episodeThumb} />
                      <div
                        className={styles.episodePlayOverlay}
                        onClick={(e) => {
                          e.stopPropagation();
                          playTrack({
                            id: show.id,
                            title: show.name || show.title,
                            artist: show.dj,
                            showName: show.name || show.title,
                            presenterName: show.dj,
                            image: show.image,
                            audioUrl: LIVE_STREAM_URL,
                            isLive: true
                          });
                        }}
                      >
                        {isSelected ? <FaPause size={10} /> : <FaPlay size={10} style={{ marginLeft: '1px' }} />}
                      </div>
                    </div>
                    <div className={styles.episodeInfo}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className={styles.episodePillOutline}>{show.genre || 'SHOW'}</span>
                        {show.nowPlaying && (
                          <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#E50914', letterSpacing: '0.05em' }}>• LIVE</span>
                        )}
                      </div>
                      <h4 className={styles.episodeTitle}>{show.name || show.title}</h4>
                      <p className={styles.episodeDate}>{show.time} • {show.dj}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.paginationRow}>
              <button className={styles.pagBtn} onClick={handlePrevShow} aria-label="Previous Shows">PREV</button>
              <button className={`${styles.pagBtn} ${styles.pagBtnActive}`} onClick={handleNextShow} aria-label="Next Shows">NEXT</button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. ALL TEAM MEMBERS SECTION */}
      <section className={styles.allMembersSection}>
        <div className={styles.allMembersWatermark}>ALL MEMBERS</div>

        <div className={styles.sectionCenterHeader}>
          <h2 className={styles.sectionCenterTitle}>ALL TEAM MEMBERS</h2>
        </div>

        <div className={styles.allMembersGrid}>
          {teamData.slice(0, visibleCount).map((member, idx) => (
            <motion.div
              key={member.id}
              className={styles.memberCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <Link to={`/hosts/${member.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <img src={member.photo} alt={member.name} className={styles.memberImg} />

                <div className={styles.memberAvatarIcon}>
                  <FaUser />
                </div>

                <div className={styles.memberOverlayFooter}>
                  <div className={styles.memberBadgeBox}>{member.badge || "PRESENTER"}</div>
                  <h3 className={styles.memberName}>{member.name}</h3>

                  <div className={styles.memberSocialsRow}>
                    <span className={styles.memberSocialCircle} aria-label="Instagram"><FaInstagram /></span>
                    <span className={styles.memberSocialCircle} aria-label="X"><FaXTwitter /></span>
                    <span className={styles.memberSocialCircle} aria-label="YouTube"><FaYoutube /></span>
                    <span className={styles.memberSocialCircle} aria-label="Spotify"><FaSpotify /></span>
                    <span className={styles.memberSocialCircle} aria-label="TikTok"><FaTiktok /></span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Centered VIEW MORE Button */}
        {visibleCount < teamData.length && (
          <div className={styles.viewMoreWrapper}>
            <button className={styles.viewMoreBtn} onClick={handleViewMore}>
              VIEW MORE
            </button>
          </div>
        )}
      </section>

      <Footer />
      <LivePlayer />
    </main>
  );
};
