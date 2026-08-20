import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaInstagram, FaTwitter, FaYoutube, FaSpotify, FaFacebookF, 
  FaPinterest, FaLinkedinIn, FaWhatsapp, FaTelegramPlane, FaStar, FaShareAlt
} from 'react-icons/fa';
import { FiArrowRight, FiUser, FiCalendar, FiClock, FiVolume2 } from 'react-icons/fi';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import { useAudioPlayer, LIVE_STREAM_URL } from '../context/AudioPlayerContext';
import styles from './ShowDetailPage.module.css';

// Show details catalog mapping by slug
const showsCatalog = {
  "pop-culture-replay": {
    slug: "pop-culture-replay",
    title: "Pop Culture Replay",
    category: "TRENDS",
    host: "Funke Akindele",
    hostSlug: "funke-akindele",
    hostRole: "Lead Host & Culture Critic",
    hostPhoto: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    bannerPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
    description: "Pop culture meets music in this high-energy, informative flagship show. We discuss everything from viral trends, new music videos, and the latest celebrity gossip to upcoming music releases. Tune in to stay up-to-date on the intersection of music, urban lifestyle, and African pop culture.",
    timetable: [
      { day: "MONDAY", start: "2:30 PM", end: "4:30 PM" },
      { day: "TUESDAY", start: "10:00 AM", end: "01:00 PM" },
      { day: "THURSDAY", start: "12:30 AM", end: "05:30 AM" },
      { day: "SATURDAY", start: "09:00 PM", end: "12:00 AM" }
    ],
    crew: [
      {
        name: "Funke Akindele",
        slug: "funke-akindele",
        role: "HOST",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Simi Ogunleye",
        slug: "simi-ogunleye",
        role: "CO-HOST",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "DJ Tobi",
        slug: "tobi-adebayo",
        role: "RESIDENT DJ",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80"
      }
    ],
    events: [
      {
        day: "23",
        monthYear: "DEC 2027",
        title: "Pop Culture Live Fest",
        artists: "BURNA BOY, WIZKID, TIWA SAVAGE, REMA",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  "the-fan-zone": {
    slug: "the-fan-zone",
    title: "The Fan Zone",
    category: "INTERVIEWS",
    host: "Simi Ogunleye",
    hostSlug: "simi-ogunleye",
    hostRole: "Senior Broadcaster",
    hostPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    bannerPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    description: "The Fan Zone is 93.5 Area FM's midday home for sports banter, football fever, athlete phone-ins, and entertainment showdowns. Simi Ogunleye keeps listeners energized with breaking sports news, premier league debriefs, and exclusive artist gossip.",
    timetable: [
      { day: "MONDAY", start: "11:00 AM", end: "02:30 PM" },
      { day: "WEDNESDAY", start: "11:00 AM", end: "02:30 PM" },
      { day: "FRIDAY", start: "11:00 AM", end: "02:30 PM" },
      { day: "SUNDAY", start: "01:00 PM", end: "05:00 PM" }
    ],
    crew: [
      {
        name: "Simi Ogunleye",
        slug: "simi-ogunleye",
        role: "HOST",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Olamide Okafor",
        slug: "olamide-okafor",
        role: "CO-HOST",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Babalola Alabi",
        slug: "babalola-alabi",
        role: "ANALYST",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"
      }
    ],
    events: [
      {
        day: "15",
        monthYear: "NOV 2026",
        title: "Area FM Super Fan Cup Live",
        artists: "LIVE MATCH STREAMING & FAN ZONE DERBY",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  "the-sound-session": {
    slug: "the-sound-session",
    title: "The Sound Session",
    category: "CLUB MIX",
    host: "DJ Tobi",
    hostSlug: "tobi-adebayo",
    hostRole: "Official Head DJ",
    hostPhoto: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    bannerPhoto: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
    description: "The Sound Session delivers raw, unfiltered club mixes, underground Afro-house rhythms, and party anthems directly to your speakers. Curated by DJ Tobi, this show turns your evening into an electric festival.",
    timetable: [
      { day: "WEDNESDAY", start: "07:00 PM", end: "10:00 PM" },
      { day: "FRIDAY", start: "04:00 PM", end: "08:00 PM" },
      { day: "SATURDAY", start: "08:00 PM", end: "12:00 AM" }
    ],
    crew: [
      {
        name: "DJ Tobi",
        slug: "tobi-adebayo",
        role: "HOST & DJ",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Kemi Adetiba",
        slug: "kemi-adetiba",
        role: "VOCALIST / CO-HOST",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
      }
    ],
    events: [
      {
        day: "04",
        monthYear: "OCT 2026",
        title: "All-Night Afrobeats Rave",
        artists: "DJ TOBI, DJ SPINALL, DJ KHALID & GUESTS",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80"
      }
    ]
  }
};

export const ShowDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { playTrack } = useAudioPlayer();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  // Fallback to pop-culture-replay if slug not found
  const show = showsCatalog[slug] || showsCatalog["pop-culture-replay"];

  const handlePlayLive = () => {
    playTrack({
      id: `show-${show.slug}`,
      title: show.title,
      artist: show.host,
      showName: show.title,
      presenterName: show.host,
      image: show.hostPhoto,
      audioUrl: LIVE_STREAM_URL,
      isLive: true
    });
  };

  return (
    <main className={styles.showPageWrapper}>
      <Navbar />

      {/* 1. HERO SECTION WITH WATERMARK BACKGROUND */}
      <section className={styles.heroSection}>
        <div className={styles.watermarkBgImgWrap}>
          <img src={show.hostPhoto} alt={show.title} className={styles.watermarkHostPhoto} />
          <div className={styles.watermarkFadeOverlay} />
        </div>

        <div className={styles.heroContainer}>
          <motion.div 
            className={styles.heroInfoBlock}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.genreBadge}>{show.category}</span>
            <h1 className={styles.showMainTitle}>{show.title}</h1>

            <div className={styles.socialCirclesRow}>
              <a href="#" className={styles.socialCircle} aria-label="Instagram"><FaInstagram /></a>
              <a href="#" className={styles.socialCircle} aria-label="Twitter"><FaTwitter /></a>
              <a href="#" className={styles.socialCircle} aria-label="YouTube"><FaYoutube /></a>
              <a href="#" className={styles.socialCircle} aria-label="Spotify"><FaSpotify /></a>
            </div>

            <p className={styles.hostCreditText}>
              With <Link to={`/hosts/${show.hostSlug}`} className={styles.hostLink}>{show.host}</Link>
            </p>
          </motion.div>

          <div className={styles.scrollDownIndicator}>
            <div className={styles.mouseIcon}>
              <span className={styles.mouseWheelDot} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. BROADCAST TIMETABLE SECTION */}
      <section className={styles.timetableSection}>
        <div className={styles.timetableContainer}>
          <div className={styles.scheduleTableGrid}>
            {show.timetable.map((item, idx) => (
              <div key={idx} className={styles.scheduleTableRow}>
                <div className={styles.dayCol}>{item.day}</div>
                <div className={styles.timeCol}>
                  <span>{item.start}</span>
                  <FiArrowRight size={14} className={styles.arrowIcon} />
                  <span>{item.end}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SHOW FEATURED MEDIA & DESCRIPTION */}
      <section className={styles.descriptionSection}>
        <div className={styles.descContainer}>
          <div className={styles.featuredMediaWrap}>
            <img src={show.bannerPhoto} alt={show.title} className={styles.featuredMediaImg} />
          </div>

          <div className={styles.descTextBlock}>
            <p className={styles.fullDescriptionText}>{show.description}</p>
          </div>
        </div>
      </section>

      {/* 4. CREW SECTION (PRESENTERS & DJS) */}
      <section className={styles.crewSection}>
        <div className={styles.crewContainer}>
          <div className={styles.sectionHeaderWrap}>
            <span className={styles.sectionLabel}>CREW</span>
            <span className={styles.sectionAccentLine} />
          </div>

          <div className={styles.crewGrid}>
            {show.crew.map((member, idx) => (
              <div key={idx} className={styles.crewCard}>
                <img src={member.image} alt={member.name} className={styles.crewPhoto} />
                
                <div className={styles.crewUserBadge}>
                  <FiUser size={13} />
                </div>

                <div className={styles.crewOverlay}>
                  <span className={styles.crewRoleBadge}>{member.role}</span>
                  <h3 className={styles.crewName}>{member.name}</h3>
                  
                  <div className={styles.crewSocials}>
                    <a href="#" className={styles.miniSocialBtn} aria-label="Instagram"><FaInstagram /></a>
                    <a href="#" className={styles.miniSocialBtn} aria-label="Twitter"><FaTwitter /></a>
                    <a href="#" className={styles.miniSocialBtn} aria-label="YouTube"><FaYoutube /></a>
                    <a href="#" className={styles.miniSocialBtn} aria-label="Spotify"><FaSpotify /></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. RELATED SHOW EVENTS */}
      {show.events && show.events.length > 0 && (
        <section className={styles.eventsSection}>
          <div className={styles.eventsContainer}>
            <div className={styles.sectionHeaderWrap}>
              <span className={styles.sectionLabel}>{show.title.toUpperCase()} EVENTS</span>
              <span className={styles.sectionAccentLine} />
            </div>

            {show.events.map((evt, idx) => (
              <div key={idx} className={styles.eventPromoBanner}>
                <div className={styles.eventDateBadge}>
                  <span className={styles.eventDateNum}>{evt.day}</span>
                  <span className={styles.eventDateMonth}>{evt.monthYear}</span>
                </div>

                <div className={styles.eventMetaInfo}>
                  <span className={styles.eventStationTag}>93.5 AREA FM LIVE SPECIAL</span>
                  <h3 className={styles.eventPromoTitle}>{evt.title}</h3>
                  <p className={styles.eventLineupText}>{evt.artists}</p>
                </div>

                <button className={styles.moreInfoBtn} onClick={() => navigate('/contact')}>
                  MORE INFO
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. SOCIAL SHARE & STAR RATING BAR */}
      <section className={styles.shareRatingSection}>
        <div className={styles.shareRatingContainer}>
          <div className={styles.shareButtonsGroup}>
            <button className={`${styles.shareBtn} ${styles.pinBtn}`} aria-label="Pinterest"><FaPinterest /></button>
            <button className={`${styles.shareBtn} ${styles.fbBtn}`} aria-label="Facebook"><FaFacebookF /></button>
            <button className={`${styles.shareBtn} ${styles.twBtn}`} aria-label="Twitter"><FaTwitter /></button>
            <button className={`${styles.shareBtn} ${styles.inBtn}`} aria-label="LinkedIn"><FaLinkedinIn /></button>
            <button className={`${styles.shareBtn} ${styles.waBtn}`} aria-label="WhatsApp"><FaWhatsapp /></button>
            <button className={`${styles.shareBtn} ${styles.tgBtn}`} aria-label="Telegram"><FaTelegramPlane /></button>
          </div>

          <div className={styles.starRatingWidget}>
            <span className={styles.ratingPrompt}>Rate this show:</span>
            <div className={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={16}
                  className={`${styles.starIcon} ${(hoverRating || rating) >= star ? styles.starActive : ''}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Floating Share Button */}
      <button className={styles.floatingShareBtn} aria-label="Share Show">
        <FaShareAlt size={16} />
      </button>

      <Footer />
      <LivePlayer />
    </main>
  );
};
