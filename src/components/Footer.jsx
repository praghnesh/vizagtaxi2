import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ShieldCheck, ArrowUp, Zap } from 'lucide-react';

const Footer = ({ onOpenBookingModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#070B15] text-slate-300 pt-16 pb-10 border-t border-white/10 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black text-white font-heading tracking-tight">
                VIZAG<span className="text-amber-400">TAXI</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-400 text-slate-950">
                VIP FLEET
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Visakhapatnam's premier luxury cab service provider. Delivering 5-star VTZ airport transfers, Araku hill station tour packages, and chauffeur-driven rides across Andhra Pradesh.
            </p>

            <div className="p-4 rounded-2xl glass-panel border border-amber-500/30 space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-extrabold">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>AP Transport Approved & Govt Recognized</span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">GST Registration: 37AAAAA0000A1Z5</p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-black text-white mb-4 border-l-4 border-amber-400 pl-3 font-heading uppercase tracking-wider">
              Services & Pages
            </h4>
            <ul className="space-y-2.5 text-xs font-bold text-slate-400">
              {[
                { name: 'Outstation Cabs', href: '/outstation-cabs' },
                { name: 'Tour Packages', href: '/tour-packages' },
                { name: 'Hourly Rentals', href: '/hourly-rentals' },
                { name: 'Airport Transfers', href: '/airport-cabs' },
                { name: 'Fleet Showroom', href: '/fleet' },
                { name: 'Why Choose Us', href: '/why-us' },
                { name: 'FAQ & Support', href: '/faq' },
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                    <span className="text-amber-400">›</span> {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Popular Routes */}
          <div>
            <h4 className="text-sm font-black text-white mb-4 border-l-4 border-amber-500 pl-3 font-heading uppercase tracking-wider">
              Popular Routes
            </h4>
            <ul className="space-y-2.5 text-xs font-bold text-slate-400">
              {[
                'Vizag to Araku Valley',
                'Vizag to Lambasingi Hills',
                'Vizag to Vijayawada',
                'Vizag to Srikakulam',
                'VTZ Airport to RK Beach',
                'Vizag to Hyderabad'
              ].map((route) => (
                <li key={route}>
                  <button onClick={() => onOpenBookingModal('route', { destination: route })} className="hover:text-emerald-400 transition-colors text-left flex items-center gap-1.5 cursor-pointer">
                    <span className="text-emerald-400">›</span> {route}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 className="text-sm font-black text-white mb-4 border-l-4 border-emerald-400 pl-3 font-heading uppercase tracking-wider">
              24/7 Helpline Desk
            </h4>
            <div className="space-y-3 text-xs font-medium">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-relaxed">
                  Dwaraka Nagar, Near RTC Complex, Visakhapatnam, AP 530016
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+919876543210" className="text-white hover:text-amber-400 font-extrabold text-sm">
                  +91 98765 43210
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:info@vizagtaxi.com" className="text-slate-300 hover:text-white">
                  info@vizagtaxi.com
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenBookingModal('general')}
                  className="btn-gold w-full py-2.5 text-xs font-black flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <Zap className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
                  <span>Reserve Cab Now</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Vizag Taxi Services. All Rights Reserved. Built with Midnight Cyber Precision.</p>
          
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-slate-900 text-amber-400 border border-white/10 hover:border-amber-400 transition-colors flex items-center gap-2 font-bold cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
