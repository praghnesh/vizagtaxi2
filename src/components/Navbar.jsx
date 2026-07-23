import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';

const Navbar = ({ onOpenBookingModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Simple active link tracker
      const sections = ['home', 'packages', 'services', 'outstation', 'rentals', 'fleet', 'driver', 'about', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Our Tour Packages', href: '#packages', id: 'packages' },
    { name: 'Our Services', href: '#services', id: 'services' },
    { name: 'Outstation Cabs', href: '#outstation', id: 'outstation' },
    { name: 'Hourly Rentals', href: '#rentals', id: 'rentals' },
    { name: 'Our Fleet', href: '#fleet', id: 'fleet' },
    { name: 'Hire Driver', href: '#driver', id: 'driver' },
    { name: 'About Us', href: '#about', id: 'about' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-slate-100 py-3'
            : 'bg-gradient-to-b from-black/70 via-black/40 to-transparent text-white py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="h-12 md:h-14 overflow-hidden rounded-lg bg-white/90 p-1 shadow-md transition-transform group-hover:scale-105">
              <img
                src="/vizag-taxi-logo.png"
                alt="Vizag Taxi Official Logo"
                className="h-full w-auto object-contain"
              />
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-full transition-all ${
                    isScrolled
                      ? isActive
                        ? 'bg-emerald-50 text-emerald-700 font-bold'
                        : 'text-slate-700 hover:text-orange-600 hover:bg-slate-50'
                      : isActive
                      ? 'bg-white/20 text-white font-bold backdrop-blur-sm'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+919876543210"
              className={`flex items-center gap-2 text-xs xl:text-sm font-bold transition-colors ${
                isScrolled ? 'text-slate-800 hover:text-orange-600' : 'text-white hover:text-amber-400'
              }`}
            >
              <Phone className="w-4 h-4 text-orange-500 animate-pulse" />
              <span>+91 98765 43210</span>
            </a>

            <button
              onClick={() => onOpenBookingModal('general')}
              className="btn btn-orange flex items-center gap-2 shadow-lg hover:shadow-orange-500/30"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Now</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl transition-colors ${
              isScrolled ? 'text-slate-800 hover:bg-slate-100' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer Content */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
            <div className="flex items-center gap-3">
              <img src="/vizag-taxi-logo.png" alt="Vizag Taxi Logo" className="h-10 bg-white rounded p-1" />
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3.5 text-slate-700 hover:text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-colors"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}
          </div>

          {/* Bottom Action Area */}
          <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-3">
            <a
              href="tel:+919876543210"
              className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-800 text-white font-bold rounded-xl shadow-md"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call Us: +91 98765 43210</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookingModal('general');
              }}
              className="btn btn-orange w-full text-center py-3 flex items-center justify-center gap-2"
            >
              <span>Instant Taxi Booking</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
