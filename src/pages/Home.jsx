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

export const Home = () => {
  return (
    <main style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
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
