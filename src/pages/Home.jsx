import React from 'react';
import { Navbar } from '../components/Navbar/Navbar';
import { Hero } from '../components/Hero/Hero';
import { WeeklySchedule } from '../components/Schedule/WeeklySchedule';
import { FeaturedPodcast } from '../components/Podcast/FeaturedPodcast';
import { TopTracks } from '../components/SongVoting/TopTracks';
import { LatestNews } from '../components/News/LatestNews';
import { CategoriesGrid } from '../components/Categories/CategoriesGrid';
import { OnAirBanner } from '../components/OnAir/OnAirBanner';
import { SubscribeForm } from '../components/Subscribe/SubscribeForm';
import { Footer } from '../components/Footer/Footer';
import { LivePlayer } from '../components/LivePlayer/LivePlayer';
import { SEO } from '../components/SEO/SEO';
import { getRadioStationSchema, getWebSiteSchema } from '../utils/seoSchemas';
import { DEFAULT_SITE_TITLE, DEFAULT_SITE_DESC, SEO_KEYWORDS } from '../utils/seoKeywords';

export const Home = () => {
  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      getRadioStationSchema(),
      getWebSiteSchema()
    ]
  };

  return (
    <main style={{ position: 'relative', width: '100%', overflowX: 'clip' }}>
      <SEO 
        title={DEFAULT_SITE_TITLE}
        description={DEFAULT_SITE_DESC}
        keywords={[
          ...SEO_KEYWORDS.primary,
          ...SEO_KEYWORDS.local,
          ...SEO_KEYWORDS.action,
          ...SEO_KEYWORDS.longTailNews,
          ...SEO_KEYWORDS.programs
        ]}
        schemaJson={homeSchema}
      />
      <Navbar />
      <Hero />
      <WeeklySchedule />
      <FeaturedPodcast />
      <TopTracks />
      <LatestNews />
      <CategoriesGrid />
      <OnAirBanner />
      <SubscribeForm />
      <Footer />
      <LivePlayer />
    </main>
  );
};
