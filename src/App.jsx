import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HourlyRentalsPage from './pages/HourlyRentalsPage';
import TourPackagesPage from './pages/TourPackagesPage';
import OutstationCabsPage from './pages/OutstationCabsPage';
import AirportCabsPage from './pages/AirportCabsPage';
import FleetPage from './pages/FleetPage';
import WhyUsPage from './pages/WhyUsPage';
import FaqPage from './pages/FaqPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hourly-rentals" element={<HourlyRentalsPage />} />
        <Route path="/tour-packages" element={<TourPackagesPage />} />
        <Route path="/outstation-cabs" element={<OutstationCabsPage />} />
        <Route path="/airport-cabs" element={<AirportCabsPage />} />
        <Route path="/fleet" element={<FleetPage />} />
        <Route path="/why-us" element={<WhyUsPage />} />
        <Route path="/faq" element={<FaqPage />} />
      </Routes>
    </Router>
  );
}

export default App;

