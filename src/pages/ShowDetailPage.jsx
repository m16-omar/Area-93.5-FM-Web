import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaInstagram, FaYoutube, FaSpotify, FaFacebookF, 
  FaPinterest, FaLinkedinIn, FaWhatsapp, FaTelegramPlane, FaStar, FaShareAlt
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiArrowRight, FiUser, FiCalendar, FiClock, FiVolume2, FiPlay, FiPause } from 'react-icons/fi';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import { useAudioPlayer, LIVE_STREAM_URL } from '../context/AudioPlayerContext';
import { SEO } from '../components/SEO/SEO';
import { getShowSchema, getBreadcrumbSchema } from '../utils/seoSchemas';
import { SEO_KEYWORDS } from '../utils/seoKeywords';
import teamData from '../data/teamData.json';
import scheduleData from '../data/scheduleData.json';
import styles from './ShowDetailPage.module.css';

// Show details catalog mapping
const showsCatalog = {
  "the-early-momo-show-part-1": {
    slug: "the-early-momo-show-part-1",
    title: "The Early Momo Show (Part 1)",
    category: "NEWS & TALK",
    host: "Olamide Okafor",
    hostSlug: "olamide-okafor",
    hostRole: "Senior Morning Anchor",
    hostPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    bannerPhoto: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
    description: "The Early Momo Show (Part 1) sets the pace for your weekday mornings from 5:00 AM to 7:00 AM. Featuring Rise and Shine morning mantras, High Voltage Gbedu playlist mixes, and First Alert breaking news bulletins to prepare you for the hustle of Lagos.",
    timetable: [
      { day: "MONDAY", start: "05:00 AM", end: "07:00 AM" },
      { day: "TUESDAY", start: "05:00 AM", end: "07:00 AM" },
      { day: "WEDNESDAY", start: "05:00 AM", end: "07:00 AM" },
      { day: "THURSDAY", start: "05:00 AM", end: "07:00 AM" },
      { day: "FRIDAY", start: "05:00 AM", end: "07:00 AM" },
      { day: "SATURDAY", start: "05:00 AM", end: "07:00 AM" },
      { day: "SUNDAY", start: "05:00 AM", end: "07:00 AM" }
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
        role: "RESIDENT DJ",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80"
      }
    ],
    events: [
      {
        day: "10",
        monthYear: "NOV 2026",
        title: "Early Momo Sunrise Townhall",
        artists: "COMMUNITY LEADERS & MORNING CITIZENS",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  "the-early-momo-show-part-2": {
    slug: "the-early-momo-show-part-2",
    title: "The Early Momo Show (Part 2)",
    category: "TALK & METRO",
    host: "Funke Akindele",
    hostSlug: "funke-akindele",
    hostRole: "Lead Morning Broadcaster",
    hostPhoto: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    bannerPhoto: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    description: "The Early Momo Show (Part 2) from 7:00 AM to 9:00 AM delivers Lagos prime-time radio. Featuring As E Dey Hot!, Citizens' Parliament, Chakam! viral gossip, Who Talk True fact checks, Everyday Hero spotlight, and live street-by-street traffic coverage.",
    timetable: [
      { day: "MONDAY", start: "07:00 AM", end: "09:00 AM" },
      { day: "TUESDAY", start: "07:00 AM", end: "09:00 AM" },
      { day: "WEDNESDAY", start: "07:00 AM", end: "09:00 AM" },
      { day: "THURSDAY", start: "07:00 AM", end: "09:00 AM" },
      { day: "FRIDAY", start: "07:00 AM", end: "09:00 AM" },
      { day: "SATURDAY", start: "07:00 AM", end: "09:00 AM" },
      { day: "SUNDAY", start: "07:00 AM", end: "09:00 AM" }
    ],
    crew: [
      {
        name: "Funke Akindele",
        slug: "funke-akindele",
        role: "HOST",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Olamide Okafor",
        slug: "olamide-okafor",
        role: "CO-HOST",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
      }
    ],
    events: [
      {
        day: "24",
        monthYear: "NOV 2026",
        title: "Citizens Parliament Live Debate",
        artists: "LAGOS POLICY EXPERTS & ADVOCATES",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  "midday-vibes": {
    slug: "midday-vibes",
    title: "Midday Vibes",
    category: "SOUNDS OF LAGOS",
    host: "Simi Ogunleye",
    hostSlug: "simi-ogunleye",
    hostRole: "Music Director & Broadcaster",
    hostPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    bannerPhoto: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
    description: "Midday Vibes (10:00 AM - 02:00 PM) is your daytime power hub. Packed with Sounds of Lagos: Heavy Music Rotations, Hilarious Audio Bytes, Comedy Skits, Street Vox-Pops, and listener shoutouts across all areas.",
    timetable: [
      { day: "MONDAY", start: "10:00 AM", end: "02:00 PM" },
      { day: "TUESDAY", start: "10:00 AM", end: "02:00 PM" },
      { day: "WEDNESDAY", start: "10:00 AM", end: "02:00 PM" },
      { day: "THURSDAY", start: "10:00 AM", end: "02:00 PM" },
      { day: "FRIDAY", start: "10:00 AM", end: "02:00 PM" },
      { day: "SATURDAY", start: "10:00 AM", end: "02:00 PM" },
      { day: "SUNDAY", start: "10:00 AM", end: "02:00 PM" }
    ],
    crew: [
      {
        name: "Simi Ogunleye",
        slug: "simi-ogunleye",
        role: "HOST",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "DJ Tobi",
        slug: "tobi-adebayo",
        role: "DJ & PRODUCER",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80"
      }
    ],
    events: [
      {
        day: "18",
        monthYear: "DEC 2026",
        title: "Midday Vibes Live Comedy Showcase",
        artists: "TOP LAGOS COMEDIANS & AFROBEATS ICONS",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  "area-workchop": {
    slug: "area-workchop",
    title: "Area Workchop",
    category: "MIDDAY TO DRIVETIME",
    host: "DJ Tobi",
    hostSlug: "tobi-adebayo",
    hostRole: "Station DJ & On-Air Host",
    hostPhoto: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    bannerPhoto: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=80",
    description: "Area Workchop bridges midday to drivetime from 2:00 PM to 6:00 PM. High-energy street connection with Kedu Lagos! caller sessions, High Voltage Gbedu & live Freestyles, and unfiltered reactions in The Comment Section.",
    timetable: [
      { day: "MONDAY", start: "02:00 PM", end: "06:00 PM" },
      { day: "TUESDAY", start: "02:00 PM", end: "06:00 PM" },
      { day: "WEDNESDAY", start: "02:00 PM", end: "06:00 PM" },
      { day: "THURSDAY", start: "02:00 PM", end: "06:00 PM" },
      { day: "FRIDAY", start: "02:00 PM", end: "06:00 PM" },
      { day: "SATURDAY", start: "02:00 PM", end: "06:00 PM" },
      { day: "SUNDAY", start: "02:00 PM", end: "06:00 PM" }
    ],
    crew: [
      {
        name: "DJ Tobi",
        slug: "tobi-adebayo",
        role: "HOST & DJ",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Simi Ogunleye",
        slug: "simi-ogunleye",
        role: "CO-HOST",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
      }
    ],
    events: [
      {
        day: "05",
        monthYear: "DEC 2026",
        title: "Area Workchop Freestyle Battle",
        artists: "UNDERGROUND EMCEES & PRODUCERS",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  "area-drivetime-cruise-part-1": {
    slug: "area-drivetime-cruise-part-1",
    title: "Area Drivetime-Cruise (Part 1)",
    category: "COMMUTE & TALK",
    host: "Funke Akindele",
    hostSlug: "funke-akindele",
    hostRole: "Drivetime Anchor",
    hostPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    bannerPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    description: "Area Drivetime-Cruise (Part 1) from 6:00 PM to 8:00 PM is Lagos' official traffic survival show. Packed with Traffic Jam Traffic alerts, listener Confessions, Korope Konnect bus-stop stories, and grassroots Reporter Network dispatches.",
    timetable: [
      { day: "MONDAY", start: "06:00 PM", end: "08:00 PM" },
      { day: "TUESDAY", start: "06:00 PM", end: "08:00 PM" },
      { day: "WEDNESDAY", start: "06:00 PM", end: "08:00 PM" },
      { day: "THURSDAY", start: "06:00 PM", end: "08:00 PM" },
      { day: "FRIDAY", start: "06:00 PM", end: "08:00 PM" },
      { day: "SATURDAY", start: "06:00 PM", end: "08:00 PM" },
      { day: "SUNDAY", start: "06:00 PM", end: "08:00 PM" }
    ],
    crew: [
      {
        name: "Funke Akindele",
        slug: "funke-akindele",
        role: "HOST",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Babalola Alabi",
        slug: "babalola-alabi",
        role: "CO-HOST",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"
      }
    ],
    events: [
      {
        day: "22",
        monthYear: "NOV 2026",
        title: "Korope Drivers Gala & Awards",
        artists: "COMMUNITY COMMUTER ALLIANCE",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  "area-drivetime-cruise-part-2": {
    slug: "area-drivetime-cruise-part-2",
    title: "Area Drivetime-Cruise (Part 2)",
    category: "SPORTS & BANTER",
    host: "Babalola Alabi & DJ Tobi",
    hostSlug: "babalola-alabi",
    hostRole: "Sports Director & Host",
    hostPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    bannerPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
    description: "Area Drivetime-Cruise (Part 2) from 8:00 PM to 10:00 PM brings the fiery sports arena to your radio. Area Sports banter, Sure Odds betting breakdown, heated Fan Wars, grassroots Local Champions highlights, and daily recap: Wetin Sup Today?",
    timetable: [
      { day: "MONDAY", start: "08:00 PM", end: "10:00 PM" },
      { day: "TUESDAY", start: "08:00 PM", end: "10:00 PM" },
      { day: "WEDNESDAY", start: "08:00 PM", end: "10:00 PM" },
      { day: "THURSDAY", start: "08:00 PM", end: "10:00 PM" },
      { day: "FRIDAY", start: "08:00 PM", end: "10:00 PM" },
      { day: "SATURDAY", start: "08:00 PM", end: "10:00 PM" },
      { day: "SUNDAY", start: "08:00 PM", end: "10:00 PM" }
    ],
    crew: [
      {
        name: "Babalola Alabi",
        slug: "babalola-alabi",
        role: "LEAD SPORTS ANCHOR",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "DJ Tobi",
        slug: "tobi-adebayo",
        role: "CO-HOST & DJ",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80"
      }
    ],
    events: [
      {
        day: "14",
        monthYear: "NOV 2026",
        title: "Area Sports Fan Wars Derby",
        artists: "PREMIER LEAGUE & NPFL SUPER FANS",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  "late-night-overnight-cruise": {
    slug: "late-night-overnight-cruise",
    title: "Late Night & Overnight Cruise",
    category: "NIGHT GBEDU",
    host: "Kemi Adetiba",
    hostSlug: "kemi-adetiba",
    hostRole: "Late Night Tastemaker",
    hostPhoto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    bannerPhoto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    description: "Late Night & Overnight Cruise (10:00 PM - 05:00 AM) is your nighttime soundtrack until dawn. Nonstop High Voltage Gbedu, soulful rhythms, and the signature Area Night Cruise 6-Day Mood Matrix for nocturnal Lagos.",
    timetable: [
      { day: "MONDAY", start: "10:00 PM", end: "05:00 AM" },
      { day: "TUESDAY", start: "10:00 PM", end: "05:00 AM" },
      { day: "WEDNESDAY", start: "10:00 PM", end: "05:00 AM" },
      { day: "THURSDAY", start: "10:00 PM", end: "05:00 AM" },
      { day: "FRIDAY", start: "10:00 PM", end: "05:00 AM" },
      { day: "SATURDAY", start: "10:00 PM", end: "05:00 AM" },
      { day: "SUNDAY", start: "10:00 PM", end: "05:00 AM" }
    ],
    crew: [
      {
        name: "Kemi Adetiba",
        slug: "kemi-adetiba",
        role: "HOST & DJ",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
      }
    ],
    events: [
      {
        day: "31",
        monthYear: "DEC 2026",
        title: "Overnight Cruise All-Night Countdown",
        artists: "DJ KEMI & GUEST AFRO-HOUSE PRODUCERS",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  "late-night-and-overnight-cruise": {
    slug: "late-night-and-overnight-cruise",
    title: "Late Night & Overnight Cruise",
    category: "NIGHT GBEDU",
    host: "Kemi Adetiba",
    hostSlug: "kemi-adetiba",
    hostRole: "Late Night Tastemaker",
    hostPhoto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    bannerPhoto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    description: "Late Night & Overnight Cruise (10:00 PM - 05:00 AM) is your nighttime soundtrack until dawn. Nonstop High Voltage Gbedu, soulful rhythms, and the signature Area Night Cruise 6-Day Mood Matrix for nocturnal Lagos.",
    timetable: [
      { day: "MONDAY", start: "10:00 PM", end: "05:00 AM" },
      { day: "TUESDAY", start: "10:00 PM", end: "05:00 AM" },
      { day: "WEDNESDAY", start: "10:00 PM", end: "05:00 AM" },
      { day: "THURSDAY", start: "10:00 PM", end: "05:00 AM" },
      { day: "FRIDAY", start: "10:00 PM", end: "05:00 AM" },
      { day: "SATURDAY", start: "10:00 PM", end: "05:00 AM" },
      { day: "SUNDAY", start: "10:00 PM", end: "05:00 AM" }
    ],
    crew: [
      {
        name: "Kemi Adetiba",
        slug: "kemi-adetiba",
        role: "HOST & DJ",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
      }
    ],
    events: [
      {
        day: "31",
        monthYear: "DEC 2026",
        title: "Overnight Cruise All-Night Countdown",
        artists: "DJ KEMI & GUEST AFRO-HOUSE PRODUCERS",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80"
      }
    ]
  }
};

// Helper to construct fallback show dynamically from schedule data
const buildFallbackShow = (slug) => {
  let foundShow = null;
  let foundDay = 'MONDAY';

  if (slug) {
    for (const [day, shows] of Object.entries(scheduleData.shows || {})) {
      const match = shows.find(s => {
        const sSlug = s.title ? s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '';
        return sSlug === slug || sSlug.includes(slug) || slug.includes(sSlug);
      });
      if (match) {
        foundShow = match;
        foundDay = day;
        break;
      }
    }
  }

  const cleanTitle = foundShow?.title || (slug
    ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : "Midday Vibes");

  const hostName = foundShow?.dj || "Simi Ogunleye";
  const hostSlug = hostName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const image = foundShow?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80";
  const time = foundShow?.time || "10:00 am - 02:00 pm";
  const category = foundShow?.category || "TALK & MUSIC";

  const timeParts = time.split('-');
  const startTime = timeParts[0] ? timeParts[0].trim().toUpperCase() : "10:00 AM";
  const endTime = timeParts[1] ? timeParts[1].trim().toUpperCase() : "02:00 PM";

  return {
    slug: slug || "midday-vibes",
    title: cleanTitle,
    category: category,
    host: hostName,
    hostSlug: hostSlug,
    hostRole: "On-Air Host & Broadcaster",
    hostPhoto: image,
    bannerPhoto: image,
    description: `${cleanTitle} is broadcast on 93.5 Area FM on ${foundDay} from ${time}. ${foundShow?.segments ? `Featuring: ${foundShow.segments}.` : 'Packed with authentic Lagos urban music, real-time traffic updates, listener phone-ins, and high-energy radio entertainment.'}`,
    timetable: [
      { day: foundDay, start: startTime, end: endTime }
    ],
    crew: [
      {
        name: hostName,
        slug: hostSlug,
        role: "HOST",
        image: image
      }
    ],
    events: [
      {
        day: "20",
        monthYear: "NOV 2026",
        title: `${cleanTitle} Special Live Broadcast`,
        artists: `${hostName.toUpperCase()} & SPECIAL GUESTS`,
        image: image
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

  const showUrl = `https://area935fm.ng/shows/${show.slug}`;
  const showSchema = {
    "@context": "https://schema.org",
    "@graph": [
      getShowSchema(show, showUrl),
      getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Shows", url: "/shows" },
        { name: show.title, url: `/shows/${show.slug}` }
      ])
    ]
  };

  return (
    <main className={styles.showPageWrapper}>
      <SEO 
        title={`${show.title} with ${show.host} | Area 93.5 FM Lagos`}
        description={show.description}
        image={show.bannerPhoto || show.hostPhoto}
        canonicalUrl={showUrl}
        keywords={[
          show.title,
          `${show.title} Lagos radio`,
          show.host,
          `${show.host} radio presenter`,
          ...SEO_KEYWORDS.programs,
          ...SEO_KEYWORDS.primary
        ]}
        schemaJson={showSchema}
      />
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
              <a href="#" className={styles.socialCircle} aria-label="X"><FaXTwitter /></a>
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
                    <span className={styles.miniSocialBtn} aria-label="X"><FaXTwitter /></span>
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
            <button className={`${styles.shareBtn} ${styles.twBtn}`} aria-label="X"><FaXTwitter /></button>
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
