import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, ChevronRight } from 'lucide-react';

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

      const sections = ['home', 'simulator', 'radar', 'packages', 'fleet', 'why-us', 'comparison', 'faq', 'contact'];
      const scrollPos = window.scrollY + 220;

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
    { name: 'Route Simulator', href: '#simulator', id: 'simulator' },
    { name: 'Live Cabs', href: '#radar', id: 'radar' },
    { name: 'Tour Packages', href: '#packages', id: 'packages' },
    { name: 'Fleet', href: '#fleet', id: 'fleet' },
    { name: 'Why Us', href: '#why-us', id: 'why-us' },
    { name: 'Compare', href: '#comparison', id: 'comparison' },
    { name: 'FAQ', href: '#faq', id: 'faq' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-md py-3'
            : 'bg-white/80 backdrop-blur-md border-b border-slate-200/60 py-4'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative p-1 rounded-xl bg-white border border-slate-200 shadow-sm group-hover:border-amber-500 transition-all">
              <div className="flex items-center gap-2 px-2.5 py-1 bg-slate-900 rounded-lg">
                <span className="text-lg md:text-xl font-black tracking-tight text-white font-heading">
                  VIZAG<span className="text-amber-400">TAXI</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-black uppercase rounded bg-amber-500 text-slate-950">
                  24/7 VIP
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-full border border-slate-200 shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-white text-amber-700 shadow-sm font-extrabold border border-amber-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-amber-600 transition-colors"
            >
              <div className="p-2 rounded-full bg-amber-50 border border-amber-200">
                <Phone className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">24/7 Helpline</div>
                <div className="font-extrabold text-slate-900 tracking-wide text-xs">+91 98765 43210</div>
              </div>
            </a>

            <button
              onClick={() => onOpenBookingModal('general')}
              className="btn-gold text-xs px-5 py-2.5 flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>Book Taxi</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2.5 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors border border-slate-200"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-amber-600" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 xl:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        <div
          className={`absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white border-l border-slate-200 shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <span className="text-xl font-black text-slate-900 font-heading">
              VIZAG<span className="text-amber-600">TAXI</span>
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3.5 text-slate-700 hover:text-amber-600 font-bold text-sm rounded-xl hover:bg-amber-50 border border-transparent transition-all"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}
          </div>

          <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-3">
            <a
              href="tel:+919876543210"
              className="flex items-center justify-center gap-2.5 w-full py-3 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>Call Helpline: +91 98765 43210</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookingModal('general');
              }}
              className="btn-gold w-full text-center py-3 text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Instant Taxi Booking</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
