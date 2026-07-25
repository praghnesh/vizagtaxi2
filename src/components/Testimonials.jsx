import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Star, Quote, CheckCircle2, Award } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const reviewsData = [
  {
    id: 1,
    name: 'Praveen Sharma',
    role: 'Hyderabad (Family Tour)',
    trip: 'Araku & Borra Caves',
    rating: 5,
    date: '2 Days ago',
    comment: 'Booked Innova Crysta for our Araku family trip. Chauffeur Srinivas was exceptionally polite, arrived 15 mins early, and navigated mountain roads smoothly. Best taxi service in Vizag!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    category: 'Family Tour'
  },
  {
    id: 2,
    name: 'Ananya Roy',
    role: 'Bangalore (Solo Traveler)',
    trip: 'Airport Pickup to RK Beach',
    rating: 5,
    date: '1 Week ago',
    comment: 'As a solo female traveler arriving late night at VTZ airport, safety was my priority. Live GPS tracking link sent to my parents gave complete peace of mind. Very professional!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    category: 'Airport Drop'
  },
  {
    id: 3,
    name: 'Vikramaditya K.',
    role: 'Corporate Executive',
    trip: 'Vizag to Vijayawada',
    rating: 5,
    date: '3 Days ago',
    comment: 'Punctual pickup, spotless vehicle with bottled water and high-speed WiFi. Instant GST invoice issued right after payment. Will definitely book for all business trips in AP.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    category: 'Corporate'
  },
  {
    id: 4,
    name: 'Dr. Rajesh Varma',
    role: 'Vizag Resident',
    trip: 'Simhachalam Temple',
    rating: 5,
    date: '5 Days ago',
    comment: 'Took my elderly parents to Simhachalam temple. Driver helped with wheelchair and guided us through priority entry lines. Exceptional care and hospitality.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    category: 'Local Ride'
  }
];

const Testimonials = () => {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Family Tour', 'Airport Drop', 'Corporate', 'Local Ride'];

  const filteredReviews = activeTab === 'All'
    ? reviewsData
    : reviewsData.filter(r => r.category === activeTab);

  return (
    <section className="py-16 md:py-24 bg-slate-50 text-slate-900 relative overflow-hidden border-b border-slate-200">
      
      {/* Background Glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-amber-100/50 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold mb-3 shadow-2xs">
            <div className="flex text-amber-500 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span>4.9 / 5.0 RATED BY 1,450+ PASSENGERS</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-heading text-slate-900 tracking-tight">
            What Our Travelers <span className="gradient-text-gold">Say About Us</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-2">
            Real experiences shared by tourists, corporate executives, and local Visakhapatnam riders.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-amber-500 text-white font-black shadow-md scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-14"
        >
          {filteredReviews.map((rev) => (
            <SwiperSlide key={rev.id} className="h-auto">
              <div className="glass-card-light p-6 rounded-3xl border border-slate-200 hover:border-amber-400 transition-all flex flex-col justify-between h-full relative group shadow-sm">
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-amber-500 gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {rev.trip}
                    </span>
                  </div>

                  <p className="text-xs md:text-sm text-slate-600 italic leading-relaxed mb-6 font-normal">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-11 h-11 rounded-2xl object-cover border border-amber-300 shadow-2xs"
                  />
                  <div>
                    <h4 className="text-sm font-black text-slate-900 font-heading flex items-center gap-1.5">
                      <span>{rev.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">{rev.role}</p>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default Testimonials;
