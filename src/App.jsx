import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AudioPlayerProvider } from './context/AudioPlayerContext';
import { PageLoader } from './components/PageLoader/PageLoader';
import { Home } from './pages/Home';
import { ShowsSchedulePage } from './pages/ShowsSchedulePage';
import { Podcasts } from './pages/Podcasts';
import { NewsPage } from './pages/NewsPage';
import { ChartsPage } from './pages/ChartsPage';
import { HostsPage } from './pages/HostsPage';
import { VideosPage } from './pages/VideosPage';

function App() {
  return (
    <AudioPlayerProvider>
      <Router>
        <PageLoader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shows" element={<ShowsSchedulePage />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/charts" element={<ChartsPage />} />
          <Route path="/hosts" element={<HostsPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AudioPlayerProvider>
  );
}

export default App;
