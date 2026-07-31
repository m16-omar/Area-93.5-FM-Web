import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AudioPlayerProvider } from './context/AudioPlayerContext';
import { PageLoader } from './components/PageLoader/PageLoader';
import { Home } from './pages/Home';
import { ShowsSchedulePage } from './pages/ShowsSchedulePage';

function App() {
  return (
    <AudioPlayerProvider>
      <Router>
        <PageLoader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shows" element={<ShowsSchedulePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AudioPlayerProvider>
  );
}

export default App;
