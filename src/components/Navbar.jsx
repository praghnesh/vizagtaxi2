import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Calendar, ChevronRight, ChevronDown, MapPin, Compass, Star } from 'lucide-react';

const popularPackagesList = [
  { id: 'araku_1day', name: 'Araku 1 Day Tour', duration: '1 Day (9 Spots)', price: '₹3,499', badge: 'Best Seller' },
  { id: 'araku_1n2d', name: 'Araku 1N2D Tour Package', duration: '2D / 1N (Hotel & Meals)', price: '₹8,000', badge: 'Popular Stay' },
  { id: 'vizag_1day', name: 'Vizag 1 Day Tour', duration: '1 Day (13 Spots)', price: '₹1,999', badge: 'Most Booked' },
  { id: 'vizag_2days', name: 'Vizag 2 Days Tour', duration: '2 Days (21 Spots)', price: '₹3,499', badge: 'Top Rated' },
  { id: 'vizag_araku_3days', name: 'Vizag 2D & Araku 1D Combo', duration: '3 Days Tour', price: '₹6,999', badge: 'Combo' },
  { id: 'vizag_araku_lambasingi_4days', name: 'Vizag, Araku & Lambasingi', duration: '4 Days / 3 Nights', price: '₹9,999', badge: 'Ultimate' },
  { id: 'annavaram_1day', name: 'Vizag to Annavaram Temple', duration: '1 Day Shrine Tour', price: '₹2,999', badge: 'Spiritual' },
];

const outstationCities = [
  'Amadalavalasa',
  'Annavaram',
  'Araku Valley',
  'Arasavalli',
  'Bangalore',
  'Bhadrachalam',
  'Bhubaneswar',
  'Bobbili',
  'Chennai',
  'Eluru',
  'Guntur',
  'Hyderabad',
  'Ichchapuram',
  'Jagdalpur',
  'Kakinada',
  'Khammam',
  'Kolkata',
  'Kurnool',
  'Lambasingi',
  'Narasannapeta',
  'Nellore',
  'Palakollu',
  'Palakonda',
  'Palasa',
  'Parvathipuram',
  'Raipur',
  'Rajahmundry',
  'Ravulapalem',
  'Razam',
  'Sompeta',
  'Srikakulam',
  'Srimukhalingam',
  'Tirupati',
  'Tuni',
  'Vijayawada',
  'Vizianagaram'
];

const Navbar = ({ onOpenBookingModal }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isHoveringPackages, setIsHoveringPackages] = useState(false);
  const [mobileOutstationOpen, setMobileOutstationOpen] = useState(false);
  const hoverTimeoutRef = useRef(null);

  useEffect(() => {
    if (location.pathname === '/tour-packages') {
      setActiveSection('packages');
      return;
    }
    if (location.pathname === '/outstation-cabs') {
      setActiveSection('outstation');
      return;
    }
    if (location.pathname === '/hourly-rentals') {
      setActiveSection('hourly');
      return;
    }
    if (location.pathname === '/airport-cabs') {
      setActiveSection('airport');
      return;
    }
    if (location.pathname === '/fleet') {
      setActiveSection('fleet');
      return;
    }
    if (location.pathname === '/why-us') {
      setActiveSection('why-us');
      return;
    }
    if (location.pathname === '/faq') {
      setActiveSection('faq');
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ['home', 'packages', 'fleet', 'why-us', 'comparison', 'faq', 'contact'];
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

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleMouseEnterPackages = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsHoveringPackages(true);
  };

  const handleMouseLeavePackages = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHoveringPackages(false);
    }, 200);
  };

  const handleSelectCity = (city) => {
    setIsHoveringPackages(false);
    setMobileMenuOpen(false);
    navigate('/outstation-cabs', { state: { destination: city, tripType: 'Round Trip' } });
  };

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (link.id === 'home') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('home');
      } else {
        navigate('/');
      }
      return;
    }

    if (link.id === 'packages') {
      if (location.pathname === '/tour-packages') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/tour-packages');
      }
      return;
    }

    if (link.id === 'outstation') {
      if (location.pathname === '/outstation-cabs') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/outstation-cabs');
      }
      return;
    }

    if (link.id === 'fleet') {
      if (location.pathname === '/fleet') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/fleet');
      }
      return;
    }

    if (link.id === 'why-us') {
      if (location.pathname === '/why-us') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/why-us');
      }
      return;
    }

    if (link.id === 'faq') {
      if (location.pathname === '/faq') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/faq');
      }
      return;
    }

    if (location.pathname === '/') {
      const el = document.getElementById(link.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(link.id);
      }
    } else {
      navigate('/', { state: { scrollTo: link.id } });
    }
  };

  const navLinks = [
    { name: 'Home', href: '/', id: 'home' },
    { name: 'Outstation Cabs', href: '/outstation-cabs', id: 'outstation' },
    { name: 'Tour Packages', href: '/tour-packages', id: 'packages', hasDropdown: true },
    { name: 'Fleet', href: '/fleet', id: 'fleet' },
    { name: 'Why Us', href: '/why-us', id: 'why-us' },
    { name: 'FAQ', href: '/faq', id: 'faq' },
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
          
          <Link
            to="/"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-3 group cursor-pointer"
          >
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
          </Link>

          <nav className="hidden xl:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-full border border-slate-200 shadow-inner relative">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative group"
                    onMouseEnter={handleMouseEnterPackages}
                    onMouseLeave={handleMouseLeavePackages}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all duration-300 flex items-center gap-1 cursor-pointer ${
                        isActive || isHoveringPackages
                          ? 'bg-white text-amber-700 shadow-sm font-extrabold border border-amber-200'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isHoveringPackages ? 'rotate-180 text-amber-600' : ''}`} />
                    </a>

                    {isHoveringPackages && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[720px] bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-200">
                        <div className="mb-4">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                              <span className="text-xs font-black text-slate-900 uppercase tracking-wide">Popular Tour Packages</span>
                            </div>
                            <span className="text-[10px] font-extrabold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">Most Booked</span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                            {popularPackagesList.map((pkg) => (
                              <button
                                key={pkg.name}
                                type="button"
                                onClick={() => {
                                  setIsHoveringPackages(false);
                                  navigate('/tour-packages', { state: { packageId: pkg.id } });
                                }}
                                className="p-3 rounded-2xl bg-amber-50/60 hover:bg-amber-500 text-left border border-amber-200/90 hover:border-amber-500 transition-all cursor-pointer group shadow-2xs hover:shadow-md flex flex-col justify-between"
                              >
                                <div className="flex items-center justify-between gap-1 mb-1.5">
                                  <span className="text-[9px] font-black uppercase bg-amber-100 group-hover:bg-slate-950 text-amber-900 group-hover:text-amber-300 px-2 py-0.5 rounded-md border border-amber-300 group-hover:border-slate-800 transition-colors">
                                    {pkg.badge}
                                  </span>
                                  <span className="text-xs font-black font-mono text-amber-700 group-hover:text-slate-950 transition-colors">
                                    {pkg.price}
                                  </span>
                                </div>
                                <div className="text-[12px] font-extrabold text-slate-900 group-hover:text-slate-950 leading-snug line-clamp-1 transition-colors">
                                  {pkg.name}
                                </div>
                                <div className="text-[10px] text-slate-600 group-hover:text-slate-900 font-semibold mt-1 transition-colors">
                                  {pkg.duration}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2.5">
                            <div className="flex items-center gap-2">
                              <Compass className="w-4 h-4 text-amber-600" />
                              <span className="text-xs font-black text-slate-900 uppercase tracking-wide">Outstation Tour Destinations</span>
                            </div>
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">36 Major Cities</span>
                          </div>
                          <div className="max-h-40 overflow-y-auto pr-1 flex flex-wrap gap-1.5 scrollbar-thin">
                            {outstationCities.map((city) => (
                              <button key={city} type="button" onClick={() => handleSelectCity(city)} className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-amber-500 hover:text-white text-slate-700 font-bold text-[11px] border border-slate-200 hover:border-amber-500 transition-all cursor-pointer shadow-2xs flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-amber-500 group-hover:text-white" />
                                <span>{city}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                          <span>Click any package or city for instant taxi booking</span>
                          <button
                            type="button"
                            onClick={() => {
                              setIsHoveringPackages(false);
                              if (location.pathname === '/tour-packages') {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              } else {
                                navigate('/tour-packages');
                              }
                            }}
                            className="text-amber-600 font-bold hover:underline cursor-pointer"
                          >
                            View All Packages →
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all duration-300 cursor-pointer ${
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

            <Link
              to="/hourly-rentals"
              className="px-3.5 py-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-extrabold text-xs border border-emerald-300 flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs"
            >
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              <span>Hourly Rates & Map</span>
            </Link>

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
          className={`absolute top-0 right-0 bottom-0 w-[88%] max-w-sm bg-white border-l border-slate-200 shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <Link
              to="/"
              onClick={(e) => {
                setMobileMenuOpen(false);
                if (location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="text-xl font-black text-slate-900 font-heading cursor-pointer"
            >
              VIZAG<span className="text-amber-600">TAXI</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div key={link.name} className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setMobileOutstationOpen(!mobileOutstationOpen)}
                      className="flex items-center justify-between w-full p-3.5 text-slate-800 font-black text-sm rounded-xl bg-amber-50/70 border border-amber-200 text-left transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <Compass className="w-4 h-4 text-amber-600" />
                        <span>Tour Packages (Outstation)</span>
                      </span>
                      <ChevronDown className={`w-4 h-4 text-amber-600 transition-transform ${mobileOutstationOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Mobile Overflow Popover with Popular Packages & Outstation City Pills */}
                    {mobileOutstationOpen && (
                      <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 max-h-80 overflow-y-auto space-y-3 shadow-inner">
                        {/* Section 1: POPULAR TOUR PACKAGES */}
                        <div>
                          <div className="text-[11px] font-black text-amber-800 uppercase tracking-wider px-1 mb-2 flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                            <span>Popular Tour Packages:</span>
                          </div>
                          <div className="grid grid-cols-1 gap-1.5">
                            {popularPackagesList.map((pkg) => (
                              <button
                                key={pkg.name}
                                type="button"
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  navigate('/tour-packages', { state: { packageId: pkg.id } });
                                }}
                                className="p-2.5 rounded-xl bg-white hover:bg-amber-500 hover:text-slate-950 text-left border border-amber-200 transition-all cursor-pointer flex items-center justify-between shadow-2xs group"
                              >
                                <div>
                                  <div className="text-xs font-black text-slate-900 group-hover:text-slate-950 leading-tight">
                                    {pkg.name}
                                  </div>
                                  <div className="text-[10px] text-slate-500 group-hover:text-slate-900 font-semibold">
                                    {pkg.duration}
                                  </div>
                                </div>
                                <span className="text-xs font-mono font-black text-amber-600 group-hover:text-slate-950 bg-amber-50 group-hover:bg-amber-400 px-2 py-0.5 rounded-md border border-amber-200">
                                  {pkg.price}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Section 2: OUTSTATION DESTINATIONS */}
                        <div>
                          <div className="text-[11px] font-black text-slate-600 uppercase tracking-wider px-1 mb-2">
                            Select Outstation Destination (36 Cities):
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {outstationCities.map((city) => (
                              <button
                                key={city}
                                type="button"
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  handleSelectCity(city);
                                }}
                                className="px-3 py-1.5 rounded-xl bg-white hover:bg-amber-500 hover:text-white text-slate-800 font-bold text-xs border border-slate-200 transition-all cursor-pointer shadow-2xs"
                              >
                                {city}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className="flex items-center justify-between p-3.5 text-slate-700 hover:text-amber-600 font-bold text-sm rounded-xl hover:bg-amber-50 border border-transparent transition-all cursor-pointer"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              );
            })}
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
