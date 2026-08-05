import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/Navbar/Navbar';
import { ShowsHero } from '../components/ShowsHero/ShowsHero';
import { FeaturedShow } from '../components/FeaturedShow/FeaturedShow';
import { DayTabs } from '../components/WeeklySchedule/DayTabs';
import { CategoryFilters } from '../components/WeeklySchedule/CategoryFilters';
import { ShowCard } from '../components/WeeklySchedule/ShowCard';
import { UpcomingShows } from '../components/UpcomingShows/UpcomingShows';
import { PresenterGrid } from '../components/PresenterGrid/PresenterGrid';
import { ListenCTA } from '../components/ListenCTA/ListenCTA';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import showsFullData from '../data/showsFullData.json';
import styles from './ShowsSchedulePage.module.css';

export const ShowsSchedulePage = () => {
  const [activeDay, setActiveDay] = useState('Monday');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const scheduleRef = useRef(null);

  const daySchedule = showsFullData.schedule[activeDay] || [];

  const filteredSchedule = activeCategory === 'ALL'
    ? daySchedule
    : daySchedule.filter(show => show.category === activeCategory);

  const scrollToSchedule = () => {
    if (scheduleRef.current) {
      scheduleRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className={styles.showsPageContainer}>
      <Navbar />

      {/* Hero Banner */}
      <ShowsHero />

      {/* Featured Show Banner */}
      <FeaturedShow 
        showData={showsFullData.featured} 
        onScrollToSchedule={scrollToSchedule} 
      />

      {/* Main Weekly Schedule & Sidebar Section */}
      <div ref={scheduleRef} className={styles.mainScheduleLayout}>
        {/* Left Column: Weekly Schedule */}
        <div>
          <div className={styles.scheduleHeader}>
            <div className={styles.headingWrapper}>
              <span className={styles.tagBadge}>TIMETABLE</span>
              <div className={styles.greenLine} />
            </div>
            <h2 className={styles.sectionHeadline}>WEEKLY PROGRAMME SCHEDULE</h2>
          </div>

          {/* Horizontal Day Selector Tabs */}
          <DayTabs 
            days={showsFullData.days} 
            activeDay={activeDay} 
            onSelectDay={setActiveDay} 
          />

          {/* Category Filter Chips */}
          <CategoryFilters 
            categories={showsFullData.categories} 
            activeCategory={activeCategory} 
            onSelectCategory={setActiveCategory} 
          />

          {/* Programme Cards List */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeDay}-${activeCategory}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className={styles.scheduleList}
            >
              {filteredSchedule.length > 0 ? (
                filteredSchedule.map((show) => (
                  <ShowCard key={show.id} show={show} />
                ))
              ) : (
                <div className={styles.emptyState}>
                  No programmes found in this category for {activeDay}. Try selecting another filter.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Sidebar: Upcoming Shows */}
        <UpcomingShows shows={showsFullData.upcoming} />
      </div>

      {/* Presenter Spotlight Grid */}
      <PresenterGrid presenters={showsFullData.presenters} />

      {/* Listen CTA Callout */}
      <ListenCTA />

      <Footer />
      <LivePlayer />
    </main>
  );
};
