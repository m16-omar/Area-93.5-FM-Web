import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AudioPlayerProvider } from './context/AudioPlayerContext';
import { PageLoader } from './components/PageLoader/PageLoader';
import { Home } from './pages/Home';
import { BlogSidebar } from './pages/BlogSidebar';
import { Podcasts } from './pages/Podcasts';
import { ChartsPage } from './pages/ChartsPage';
import { ShowsSchedulePage } from './pages/ShowsSchedulePage';
import { EventsPage } from './pages/EventsPage';
import { TeamPage } from './pages/TeamPage';
import { VideosPage } from './pages/VideosPage';
import { PromotePage } from './pages/PromotePage';
import { ContactPage } from './pages/ContactPage';

function App() {
  return (
    <AudioPlayerProvider>
      <Router>
        <PageLoader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog-sidebar" element={<BlogSidebar />} />
          <Route path="/blog" element={<BlogSidebar />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/charts" element={<ChartsPage />} />
          <Route path="/shows" element={<ShowsSchedulePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/promote" element={<PromotePage />} />
          <Route path="/contacts" element={<ContactPage />} />
        </Routes>
      </Router>
    </AudioPlayerProvider>
  );
}

export default App;
