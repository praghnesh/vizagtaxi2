import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TourPackages from './components/TourPackages';
import Fleet from './components/Fleet';
import WhyChooseUs from './components/WhyChooseUs';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import InstagramGallery from './components/InstagramGallery';
import SocialLinks from './components/SocialLinks';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import FloatingActions from './components/FloatingActions';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleOpenBookingModal = (type, data = null) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-500 selection:text-white">
      {/* Sticky Glass Navbar */}
      <Navbar onOpenBookingModal={handleOpenBookingModal} />

      {/* Hero Section with Floating 3-in-1 Booking Card */}
      <Hero onOpenBookingModal={handleOpenBookingModal} />

      {/* Section 2: Popular Tour Packages */}
      <TourPackages onOpenBookingModal={handleOpenBookingModal} />

      {/* Section 3: Luxury Fleet Showcase */}
      <Fleet onOpenBookingModal={handleOpenBookingModal} />

      {/* Section 4: Why Choose Vizag Taxi & Counter Stats */}
      <WhyChooseUs />

      {/* Section 5: Services */}
      <Services onOpenBookingModal={handleOpenBookingModal} />

      {/* Section 6: Client Testimonials */}
      <Testimonials />

      {/* Section 7: Instagram Gallery */}
      <InstagramGallery />

      {/* Section 8: Social Links */}
      <SocialLinks />

      {/* Footer */}
      <Footer onOpenBookingModal={handleOpenBookingModal} />

      {/* Quick Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseBookingModal}
        modalData={modalData}
      />

      {/* Floating Action Buttons (WhatsApp & Call) */}
      <FloatingActions onOpenBookingModal={handleOpenBookingModal} />
    </div>
  );
}

export default App;
