import React from 'react';
import { Phone, Mail, MapPin, Clock, ExternalLink, ShieldCheck, Heart, ArrowUp } from 'lucide-react';

const Footer = ({ onOpenBookingModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-white/10 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-xl h-14 w-auto inline-block shadow-md">
                <img src="/vizag-taxi-logo.png" alt="Vizag Taxi Official Logo" className="h-full w-auto object-contain" />
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Visakhapatnam's premier luxury cab service provider. Delivering 5-star airport transfers, outstation tour packages, and chauffeur-driven rides across Andhra Pradesh.
            </p>

            <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Govt Recognized & AP Transport Approved</span>
              </div>
              <p className="text-[11px] text-slate-400">GST Registration: 37AAAAA0000A1Z5</p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 border-l-4 border-orange-500 pl-3">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-400">
              {['Home', 'Our Tour Packages', 'Our Services', 'Outstation Cabs', 'Hourly Rentals', 'Our Fleet', 'Hire Driver', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(/ /g, '')}`} className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                    <span className="text-orange-500">›</span> {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Popular Routes */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 border-l-4 border-emerald-500 pl-3">
              Popular Routes
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-400">
              {[
                'Vizag to Araku Valley',
                'Vizag to Lambasingi',
                'Vizag to Vijayawada',
                'Vizag to Srikakulam',
                'Vizag to Vizianagaram',
                'Vizag Airport to City',
                'Vizag to Hyderabad',
                'Vizag to Rajahmundry'
              ].map((route) => (
                <li key={route}>
                  <button onClick={() => onOpenBookingModal('route', route)} className="hover:text-emerald-400 transition-colors text-left flex items-center gap-1.5">
                    <span className="text-emerald-500">›</span> {route}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 border-l-4 border-amber-500 pl-3">
              Contact Details
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  Door No. 10-2-4, Near RTC Complex, Dwaraka Nagar, Visakhapatnam, AP 530016
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+919876543210" className="text-slate-200 hover:text-white font-bold">
                  +91 98765 43210 / +91 89123 45678
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:info@vizagtaxi.com" className="text-slate-200 hover:text-white">
                  info@vizagtaxi.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-emerald-300 font-bold">Working Hours: 24/7 (365 Days)</span>
              </div>

              <div className="pt-2">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-white text-xs py-2 px-4 w-full flex items-center justify-center gap-2"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 <strong className="text-white">Vizag Taxi</strong>. All Rights Reserved. Journeys that connect, memories that last.
          </div>

          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-white">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-white">Terms & Conditions</a>
            <span>•</span>
            <span className="text-slate-300 font-medium flex items-center gap-1">
              Designed by <strong className="text-orange-400">Vizag Taxi Team</strong>
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-orange-500 text-white transition-colors border border-white/10"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
