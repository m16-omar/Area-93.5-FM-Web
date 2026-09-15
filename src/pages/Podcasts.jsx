import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/Navbar/Navbar';
import { PodcastHero } from '../components/PodcastHero/PodcastHero';
import { FeaturedPodcastSection } from '../components/FeaturedPodcast/FeaturedPodcastSection';
import { TrendingPodcasts } from '../components/TrendingPodcasts/TrendingPodcasts';
import { PodcastCategories } from '../components/PodcastCategories/PodcastCategories';
import { PodcastGrid } from '../components/PodcastGrid/PodcastGrid';
import { PopularHosts } from '../components/PopularHosts/PopularHosts';
import { PodcastStats } from '../components/PodcastStats/PodcastStats';
import { NewsletterCTA } from '../components/NewsletterCTA/NewsletterCTA';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import podcastsFullData from '../data/podcastsFullData.json';
import { SEO } from '../components/SEO/SEO';
import { getBreadcrumbSchema } from '../utils/seoSchemas';
import { SEO_KEYWORDS } from '../utils/seoKeywords';

export const Podcasts = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredEpisodes = activeCategory === 'All'
    ? podcastsFullData.episodes
    : podcastsFullData.episodes.filter(ep => ep.category === activeCategory);

  const podcastBreadcrumbs = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Podcasts & Audio Shows", url: "/podcasts" }
  ]);

  return (
    <main style={{ position: 'relative', width: '100%', maxWidth: '100vw', overflowX: 'clip', background: 'var(--color-light-bg)' }}>
      <SEO 
        title="Podcasts & On-Demand Radio Shows | Area 93.5 FM Lagos"
        description="Listen to top Lagos podcasts on Area 93.5 FM. Stream Afrobeats conversations, street culture deep dives, comedy, relationship gist, and music reviews."
        keywords={[
          ...SEO_KEYWORDS.programs,
          "Lagos podcasts online",
          "Afrobeats podcast Lagos",
          "Nigerian radio podcasts",
          "Pidgin English podcast Lagos"
        ]}
        schemaJson={podcastBreadcrumbs}
      />
      <Navbar />

      {/* Hero Banner */}
      <PodcastHero />

      {/* Featured Episode Showcase */}
      {/* <FeaturedPodcastSection episode={podcastsFullData.featured} /> */}

      {/* Trending Episodes Carousel */}
      <TrendingPodcasts episodes={podcastsFullData.trending} />

      {/* Main Catalog Grid with Category Filter Chips */}
      <section style={{ maxWidth: '1150px', margin: '60px auto 0', padding: '0 48px', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <span style={{ background: 'var(--primary-orange)', color: '#ffffff', fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '0.78rem', padding: '4px 10px', borderRadius: '2px', textTransform: 'uppercase', letterSpacing: '0.05em', boxShadow: '0 4px 12px rgba(239, 75, 0, 0.3)' }}>
            LATEST EPISODES
          </span>
          <div style={{ flex: 1, height: '2px', background: 'rgba(239, 75, 0, 0.3)' }} />
        </div>

        {/* Category Filters */}
        <PodcastCategories 
          categories={podcastsFullData.categories} 
          activeCategory={activeCategory} 
          onSelectCategory={setActiveCategory} 
        />

        {/* Podcast Episodes Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <PodcastGrid episodes={filteredEpisodes} />
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Popular Hosts / Presenters Spotlight */}
      <PopularHosts hosts={podcastsFullData.hosts} />

      {/* Podcast Statistics Counters */}
      <PodcastStats stats={podcastsFullData.stats} />

      {/* Newsletter CTA Callout */}
      <NewsletterCTA />

      <Footer />
      <LivePlayer />
    </main>
  );
};
