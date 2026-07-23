import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';

const FloatingActions = ({ onOpenBookingModal }) => {
  const whatsappUrl = "https://wa.me/919876543210?text=Hello%20Vizag%20Taxi!%20I%20want%20to%20book%20a%20cab.";

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Phone Call Floating Button */}
      <a
        href="tel:+919876543210"
        className="w-13 h-13 md:w-14 md:h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 border-2 border-white group"
        aria-label="Call Vizag Taxi Hotline"
      >
        <Phone className="w-6 h-6 animate-pulse" />
        <span className="absolute right-16 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Call Hotline: +91 98765 43210
        </span>
      </a>

      {/* WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 border-2 border-white group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-16 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Instant WhatsApp Booking
        </span>
      </a>
    </div>
  );
};

export default FloatingActions;
