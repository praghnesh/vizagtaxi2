import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TourPackages from '../components/TourPackages';
import Fleet from '../components/Fleet';
import WhyChooseUs from '../components/WhyChooseUs';
import ComparisonMatrix from '../components/ComparisonMatrix';
import Services from '../components/Services';
import FaqSection from '../components/FaqSection';
import Testimonials from '../components/Testimonials';
import InstagramGallery from '../components/InstagramGallery';
import SocialLinks from '../components/SocialLinks';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';
import FloatingActions from '../components/FloatingActions';

const HomePage = () => {
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
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-amber-500 selection:text-white font-sans antialiased">
      {/* Sticky Coastal Glass Navbar */}
      <Navbar onOpenBookingModal={handleOpenBookingModal} />

      {/* Hero Section */}
      <Hero onOpenBookingModal={handleOpenBookingModal} />

      {/* Tour Packages Sightseeing Explorer */}
      <TourPackages onOpenBookingModal={handleOpenBookingModal} />

      {/* Luxury Vehicle Fleet Showroom */}
      <Fleet onOpenBookingModal={handleOpenBookingModal} />

      {/* Why Choose Us & Guarantees */}
      <WhyChooseUs />

      {/* Head-to-Head Comparison Matrix vs Ola/Uber */}
      <ComparisonMatrix />

      {/* Tailored Transportation Services */}
      <Services onOpenBookingModal={handleOpenBookingModal} />

      {/* Frequently Asked Questions Accordion */}
      <FaqSection />

      {/* Client Testimonials Slider */}
      <Testimonials />

      {/* Instagram Gallery Grid */}
      <InstagramGallery />

      {/* Social Links */}
      <SocialLinks />

      {/* Footer */}
      <Footer onOpenBookingModal={handleOpenBookingModal} />

      {/* Quick Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseBookingModal}
        modalData={modalData}
      />

      {/* Floating Action Buttons */}
      <FloatingActions onOpenBookingModal={handleOpenBookingModal} />
    </div>
  );
};

export default HomePage;
