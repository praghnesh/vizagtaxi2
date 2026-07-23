import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Varma',
    location: 'Hyderabad',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    trip: 'Araku Valley 2-Day Package',
    review: 'Booked Innova Crysta for our family trip to Araku. Driver Ramesh was exceptionally polite and knew all the best scenic spots. Vehicle was spotlessly clean with great AC. Highest recommendation!',
  },
  {
    id: 2,
    name: 'Priyanka Sharma',
    location: 'Bangalore',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    trip: 'Vizag Airport Transfer',
    review: 'Landed at Vizag airport at 11 PM. The driver was already waiting with my name placard. Smooth, comfortable ride to Rushikonda Beach Resort. Super safe for female solo travelers!',
  },
  {
    id: 3,
    name: 'Srikanth K.',
    location: 'Visakhapatnam',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    trip: 'Corporate Monthly Rental',
    review: 'We use Vizag Taxi for all our corporate VIP delegates visiting Rushikonda IT SEZ. On-time pickups, GST invoices provided immediately, and top-class luxury fleet.',
  },
  {
    id: 4,
    name: 'Ananya Roy',
    location: 'Kolkata',
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    trip: 'Lambasingi Hill Tour',
    review: 'The morning fog in Lambasingi was magical, and our Ertiga driver navigated the mountain hairpin bends with absolute expertise. Transparent billing with zero hidden costs!',
  },
  {
    id: 5,
    name: 'Vikram & Swati',
    location: 'Chennai',
    photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    trip: 'Wedding Convoy Hire',
    review: 'Hired 3 Innova Crystas and a Tempo Traveller for our wedding guests. The team managed timings perfectly. Guests were extremely happy with the luxury seating.',
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const active = testimonials[currentIndex];

  return (
    <section className="py-8 md:py-12 bg-slate-900 text-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Title Header without Pill Badge */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            What Our <span className="gradient-text-orange">Delighted Guests Say</span>
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-1 max-w-xl mx-auto">
            15,000+ satisfied travelers trust Vizag Taxi across Andhra Pradesh.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-3xl mx-auto relative">
          <div className="bg-slate-800/90 rounded-2xl p-6 md:p-8 border border-white/10 shadow-xl backdrop-blur-md relative overflow-hidden">
            <Quote className="absolute -top-3 -right-3 w-28 h-28 text-white/5 pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
              <div className="shrink-0 text-center">
                <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-orange-500 shadow-md">
                  <img
                    src={active.photo}
                    alt={active.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-2 flex items-center justify-center gap-1 text-emerald-400 text-[10px] font-bold bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified</span>
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left space-y-2">
                <div className="flex items-center justify-center sm:justify-start gap-1">
                  {[...Array(active.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-200 text-xs sm:text-sm italic font-medium leading-relaxed">
                  "{active.review}"
                </p>

                <div>
                  <h4 className="text-base font-bold text-white">{active.name}</h4>
                  <div className="text-[11px] text-orange-400 font-semibold">
                    {active.location} • <span className="text-slate-400">{active.trip}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
              <div className="flex gap-1.5">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentIndex ? 'w-6 bg-orange-500' : 'w-2 bg-white/20'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-full bg-slate-700 hover:bg-orange-500 text-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-full bg-slate-700 hover:bg-orange-500 text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
