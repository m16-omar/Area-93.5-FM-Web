import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause } from 'react-icons/fa';
import { FiCalendar } from 'react-icons/fi';
import heroPresenterImg from '../../assets/Here Presenters.png';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import styles from './PodcastHero.module.css';

const hotEpisodesData = [
  [
    {
      id: "hot-1",
      title: "Vibe Check #1",
      category: "VLOGS",
      date: "January 8, 2026",
      presenter: "Jordan Carter",
      artwork: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
      id: "hot-2",
      title: "Vibe Check #2",
      category: "VLOGS",
      date: "March 4, 2026",
      presenter: "Elena Vance",
      artwork: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    }
  ],
  [
    {
      id: "hot-3",
      title: "Afrobeats Spotlight #3",
      category: "MUSIC",
      date: "April 12, 2026",
      presenter: "Jordan Carter",
      artwork: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=400&q=80",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
      id: "hot-4",
      title: "Urban Culture & Tech #4",
      category: "TALK",
      date: "May 18, 2026",
      presenter: "Chloe Grace",
      artwork: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    }
  ]
];

const seriesList = [
  {
    id: "ser-1",
    title: "Vibe Check",
    episodesCount: "12 Episodes",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ser-2",
    title: "Afrobeats Breakdown",
    episodesCount: "18 Episodes",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ser-3",
    title: "Urban Economics",
    episodesCount: "15 Episodes",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ser-4",
    title: "Sports Talk 93.5",
    episodesCount: "24 Episodes",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80"
  }
];

export const PodcastHero = () => {
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();
  const [pageIndex, setPageIndex] = useState(0);

  const currentHotStack = hotEpisodesData[pageIndex] || hotEpisodesData[0];

  const handleNext = () => {
    setPageIndex((prev) => (prev + 1) % hotEpisodesData.length);
  };

  const handlePrev = () => {
    setPageIndex((prev) => (prev === 0 ? hotEpisodesData.length - 1 : prev - 1));
  };

  return (
    <>
      {/* 1. Pro Radio Podcast-01 Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContentGrid}>
          {/* Left Presenter Column */}
          <div className={styles.leftPresenterCol}>
            <div className={styles.neonCircleBg} />
            <img 
              src={heroPresenterImg} 
              alt="Area 93.5 FM Presenter" 
              className={styles.presenterImg} 
            />
          </div>

          {/* Right Hot Podcast Column */}
          <div className={styles.rightHotCol}>
            <h1 className={styles.hotTitle}>HOT PODCAST</h1>

            <div className={styles.badgeRow}>
              <span className={styles.neonTagBadge}>ALL EPISODES</span>
              <div className={styles.badgeLine} />
            </div>

            {/* Stack of 2 Episode Cards */}
            <div className={styles.episodesStack}>
              {currentHotStack.map((ep) => {
                const isSelected = currentTrack?.id === ep.id && isPlaying;
                return (
                  <motion.div
                    key={ep.id}
                    className={styles.epCard}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className={styles.avatarWrapper}>
                      <img src={ep.artwork} alt={ep.title} className={styles.avatarImg} />
                      <button 
                        className={styles.playOverlay}
                        onClick={() => playTrack({
                          id: ep.id,
                          title: ep.title,
                          artist: ep.presenter,
                          showName: ep.title,
                          presenterName: ep.presenter,
                          audioUrl: ep.audioUrl
                        })}
                        aria-label={`Play ${ep.title}`}
                      >
                        {isSelected ? <FaPause size={14} /> : <FaPlay size={12} style={{ marginLeft: '2px' }} />}
                      </button>
                    </div>

                    <div className={styles.epCardContent}>
                      <span className={styles.catTag}>{ep.category}</span>
                      <h3 className={styles.epTitle}>{ep.title}</h3>
                      <span className={styles.epDate}>
                        <FiCalendar size={12} /> {ep.date}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            <div className={styles.paginationRow}>
              <button className={styles.prevBtn} onClick={handlePrev}>
                PREV
              </button>
              <button className={styles.nextBtn} onClick={handleNext}>
                NEXT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DISCOVER OUR SERIES Section */}
      <section className={styles.seriesSection}>
        <div className={styles.badgeRow}>
          <span className={styles.neonTagBadge}>SERIES</span>
          <div className={styles.badgeLine} />
        </div>
        <h2 className={styles.sectionHeadline}>DISCOVER OUR SERIES</h2>

        <div className={styles.seriesGrid}>
          {seriesList.map((ser) => (
            <motion.div 
              key={ser.id}
              className={styles.seriesCard}
              whileHover={{ y: -6 }}
            >
              <img src={ser.image} alt={ser.title} className={styles.seriesImg} />
              <div className={styles.seriesOverlay}>
                <h3 className={styles.seriesTitle}>{ser.title}</h3>
                <span className={styles.seriesMeta}>{ser.episodesCount}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};
