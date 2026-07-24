import React from 'react';
import { MessageCircle, Phone, Calendar } from 'lucide-react';

const FloatingActions = ({ onOpenBookingModal }) => {
  const whatsappUrl = "https://wa.me/919876543210?text=Hello%20Vizag%20Taxi!%20I%20want%20to%20book%20a%20cab.";

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Quick Booking Floating Action Button */}
      <button
        onClick={() => onOpenBookingModal('general')}
        className="px-4 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs shadow-2xl hover:scale-108 transition-all border border-amber-400 flex items-center gap-2 group cursor-pointer"
      >
        <Calendar className="w-4 h-4 text-slate-950" />
        <span className="hidden sm:inline">Book Cab</span>
      </button>

      {/* Phone Call Floating Button */}
      <a
        href="tel:+919876543210"
        className="w-13 h-13 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 border-2 border-white/20 group"
        aria-label="Call Vizag Taxi Hotline"
      >
        <Phone className="w-6 h-6 animate-pulse" />
        <span className="absolute right-16 bg-slate-950 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Call Helpline: +91 98765 43210
        </span>
      </a>

      {/* WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 border-2 border-white/20 group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-slate-950" />
        <span className="absolute right-16 bg-slate-950 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Instant WhatsApp Booking
        </span>
      </a>
    </div>
  );
};

export default FloatingActions;
