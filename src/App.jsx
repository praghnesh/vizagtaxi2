import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HourlyRentalsPage from './pages/HourlyRentalsPage';
import TourPackagesPage from './pages/TourPackagesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hourly-rentals" element={<HourlyRentalsPage />} />
        <Route path="/tour-packages" element={<TourPackagesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
