import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaInstagram, FaTwitter, FaYoutube, FaSpotify, FaFacebookF, 
  FaPinterest, FaLinkedinIn, FaWhatsapp, FaTelegramPlane, FaStar, FaShareAlt
} from 'react-icons/fa';
import { FiArrowRight, FiUser, FiCalendar, FiClock, FiVolume2, FiPlay, FiPause } from 'react-icons/fi';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import { useAudioPlayer, LIVE_STREAM_URL } from '../context/AudioPlayerContext';
import teamData from '../data/teamData.json';
import scheduleData from '../data/scheduleData.json';
import styles from './ShowDetailPage.module.css';

// Show details catalog mapping
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
    category: "TRENDS",
    host: "Simi Ogunleye",
    hostSlug: "simi-ogunleye",
    hostRole: "Senior Sports & Lifestyle Broadcaster",
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
  "hitmakers-live": {
    slug: "hitmakers-live",
    title: "Hitmakers Live",
    category: "INTERVIEWS",
    host: "Olamide Okafor",
    hostSlug: "olamide-okafor",
    hostRole: "Music Producer & Radio Host",
    hostPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    bannerPhoto: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
    description: "Hitmakers Live brings you behind the scenes with Nigeria's hottest producers, songwriters, and chart-topping artists. Exclusive studio sessions, breakdown of hit records, acoustic live sets, and industry insights broadcast straight across the nation.",
    timetable: [
      { day: "MONDAY", start: "11:00 AM", end: "01:00 PM" },
      { day: "WEDNESDAY", start: "04:00 PM", end: "07:00 PM" },
      { day: "FRIDAY", start: "02:00 PM", end: "06:00 PM" }
    ],
    crew: [
      {
        name: "Olamide Okafor",
        slug: "olamide-okafor",
        role: "HOST",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "DJ Tobi",
        slug: "tobi-adebayo",
        role: "CO-HOST / DJ",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Babalola Alabi",
        slug: "babalola-alabi",
        role: "MUSIC CURATOR",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"
      }
    ],
    events: [
      {
        day: "28",
        monthYear: "OCT 2026",
        title: "Hitmakers Live Unplugged Session",
        artists: "ASAKE, FIREBOY DML, AYRA STARR",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  "after-hours-mix": {
    slug: "after-hours-mix",
    title: "After Hours Mix",
    category: "CLUB MIX",
    host: "Simi Ogunleye",
    hostSlug: "simi-ogunleye",
    hostRole: "Late Night Tastemaker",
    hostPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    bannerPhoto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    description: "The After Hours Mix is your late-night sonic sanctuary. Packed with deep Afro-house grooves, chill Amapiano melodies, and smooth neo-soul mixes curated by our resident tastemakers for night owls, creatives, and late-night drivers.",
    timetable: [
      { day: "MONDAY", start: "01:00 PM", end: "04:00 PM" },
      { day: "WEDNESDAY", start: "01:00 PM", end: "04:00 PM" },
      { day: "SATURDAY", start: "10:00 PM", end: "02:00 AM" }
    ],
    crew: [
      {
        name: "Simi Ogunleye",
        slug: "simi-ogunleye",
        role: "HOST",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Kemi Adetiba",
        slug: "kemi-adetiba",
        role: "CO-HOST",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "DJ Tobi",
        slug: "tobi-adebayo",
        role: "MIX DJ",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80"
      }
    ],
    events: [
      {
        day: "12",
        monthYear: "DEC 2026",
        title: "After Hours Rooftop Session",
        artists: "SPECIAL GUEST AFRO-HOUSE DJS",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  "throwback-jam": {
    slug: "throwback-jam",
    title: "Throwback Jam",
    category: "RETRO HITS",
    host: "Tobi Adebayo",
    hostSlug: "tobi-adebayo",
    hostRole: "Vintage Music Specialist",
    hostPhoto: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    bannerPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
    description: "Relive golden eras with classic highlife, 90s/2000s Afrobeats pioneers, old-school R&B, and hip-hop anthems. Nostalgic storytelling, vinyl appreciation, and listener requests guaranteed to bring back memories.",
    timetable: [
      { day: "MONDAY", start: "04:30 PM", end: "07:30 PM" },
      { day: "WEDNESDAY", start: "10:00 AM", end: "01:00 PM" },
      { day: "FRIDAY", start: "06:00 PM", end: "09:00 PM" }
    ],
    crew: [
      {
        name: "Tobi Adebayo",
        slug: "tobi-adebayo",
        role: "HOST",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Funke Akindele",
        slug: "funke-akindele",
        role: "CO-HOST",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80"
      }
    ],
    events: [
      {
        day: "05",
        monthYear: "NOV 2026",
        title: "90s Retro Afrobeats Night",
        artists: "PLANTASHUN BOIZ, REMEDIES, 2BABA TRIBUTES",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  "vibe-check": {
    slug: "vibe-check",
    title: "Vibe Check",
    category: "AFROBEATS",
    host: "Kemi Adetiba",
    hostSlug: "kemi-adetiba",
    hostRole: "Drive Time Host",
    hostPhoto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    bannerPhoto: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
    description: "Vibe Check takes the pulse of contemporary African music. From Lagos street anthems to continental chart-toppers, Kemi Adetiba brings you fresh releases, artist spotlight interviews, and infectious positive energy during evening prime time.",
    timetable: [
      { day: "MONDAY", start: "07:30 PM", end: "11:30 PM" },
      { day: "THURSDAY", start: "08:00 PM", end: "11:00 PM" },
      { day: "SATURDAY", start: "06:00 PM", end: "09:00 PM" }
    ],
    crew: [
      {
        name: "Kemi Adetiba",
        slug: "kemi-adetiba",
        role: "HOST",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Olamide Okafor",
        slug: "olamide-okafor",
        role: "CO-HOST",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
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
        day: "18",
        monthYear: "DEC 2026",
        title: "Vibe Check Festival Lagos",
        artists: "RUGER, AYRA STARR, BNXN, ODUMODUBLVCK",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80"
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
        role: "CO-HOST",
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
  },
  "pop-pulse": {
    slug: "pop-pulse",
    title: "Pop Pulse",
    category: "MUSIC",
    host: "Funke Akindele",
    hostSlug: "funke-akindele",
    hostRole: "Music Host",
    hostPhoto: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    bannerPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    description: "Pop Pulse counts down the biggest records locally and globally. Listener voting, artist gossip, debut records, and live interviews with rising pop talents.",
    timetable: [
      { day: "TUESDAY", start: "02:00 PM", end: "05:00 PM" },
      { day: "WEDNESDAY", start: "03:00 PM", end: "06:00 PM" },
      { day: "SATURDAY", start: "02:00 PM", end: "05:00 PM" }
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
      }
    ],
    events: [
      {
        day: "20",
        monthYear: "NOV 2026",
        title: "Pop Pulse Top 40 Live Countdown",
        artists: "TOP 10 NIGERIAN HITMAKERS LIVE",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80"
      }
    ]
  }
};

// Helper to construct fallback show dynamically
const buildFallbackShow = (slug) => {
  const cleanTitle = slug
    ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : "The Fan Zone";

  return {
    slug: slug || "the-fan-zone",
    title: cleanTitle,
    category: "TALK & MUSIC",
    host: "Simi Ogunleye",
    hostSlug: "simi-ogunleye",
    hostRole: "Resident Broadcaster",
    hostPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    bannerPhoto: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
    description: `${cleanTitle} delivers prime-time radio entertainment across 93.5 Area FM. Packed with urban music, local news updates, viral stories, listener phone-ins, and high energy.`,
    timetable: [
      { day: "MONDAY", start: "11:00 AM", end: "02:30 PM" },
      { day: "WEDNESDAY", start: "11:00 AM", end: "02:30 PM" },
      { day: "FRIDAY", start: "11:00 AM", end: "02:30 PM" },
      { day: "SATURDAY", start: "02:00 PM", end: "06:00 PM" }
    ],
    crew: [
      {
        name: "Simi Ogunleye",
        slug: "simi-ogunleye",
        role: "HOST",
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
        day: "15",
        monthYear: "NOV 2026",
        title: `${cleanTitle} Live Concert`,
        artists: "LIVE MUSIC & SPECIAL GUESTS",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80"
      }
    ]
  };
};

export const ShowDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  // Match show from catalog or build dynamically
  const show = showsCatalog[slug] || buildFallbackShow(slug);

  const isCurrentLive = (currentTrack?.title === show.title || currentTrack?.showName === show.title) && isPlaying;

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
              <div 
                key={idx} 
                className={styles.crewCard}
                onClick={() => navigate(`/hosts/${member.slug}`)}
                style={{ cursor: 'pointer' }}
              >
                <img src={member.image} alt={member.name} className={styles.crewPhoto} />
                
                <div className={styles.crewUserBadge}>
                  <FiUser size={13} />
                </div>

                <div className={styles.crewOverlay}>
                  <span className={styles.crewRoleBadge}>{member.role}</span>
                  <h3 className={styles.crewName}>{member.name}</h3>
                  
                  <div className={styles.crewSocials}>
                    <span className={styles.miniSocialBtn} aria-label="Instagram"><FaInstagram /></span>
                    <span className={styles.miniSocialBtn} aria-label="Twitter"><FaTwitter /></span>
                    <span className={styles.miniSocialBtn} aria-label="YouTube"><FaYoutube /></span>
                    <span className={styles.miniSocialBtn} aria-label="Spotify"><FaSpotify /></span>
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
