import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Users, Briefcase, Wind, Fuel, ChevronRight, Car, Star, CheckCircle2, Zap } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const fleetData = [
  {
    id: 'dzire',
    category: 'Sedans',
    name: 'Swift Dzire / Etios',
    subtitle: 'Executive City & Airport Sedan',
    passengers: '4 Guests',
    luggage: '2 Bags',
    ac: 'Dual AC',
    fuel: 'Diesel / Petrol',
    rate: '₹12/KM',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
    popular: true,
    features: ['Push Back Seats', 'Chilled Water', 'Bluetooth Audio'],
  },
  {
    id: 'ertiga',
    category: 'Family SUVs',
    name: 'Maruti Ertiga (6+1)',
    subtitle: 'Comfortable 6-Seater Family Cruiser',
    passengers: '6 Guests',
    luggage: '4 Bags',
    ac: 'Rear AC Vents',
    fuel: 'Diesel / CNG',
    rate: '₹16/KM',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
    popular: true,
    features: ['Extra Legroom', 'Rear AC Vents', 'First Aid Kit'],
  },
  {
    id: 'crysta',
    category: 'Luxury Cars',
    name: 'Toyota Innova Crysta',
    subtitle: 'Ultra Luxury Captain Bucket Seats',
    passengers: '7 Guests',
    luggage: '5 Bags',
    ac: 'Auto Climate Control',
    fuel: 'Diesel',
    rate: '₹22/KM',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80',
    popular: true,
    features: ['Leather Captain Seats', 'Ambient Lighting', 'Smooth Ghat Suspension'],
  },
  {
    id: 'tempo',
    category: 'Tempo & Buses',
    name: 'Tempo Traveller (12+1)',
    subtitle: '12 to 17 Seater Tourist Group Van',
    passengers: '12-17 Guests',
    luggage: '10+ Bags',
    ac: 'Ducted Roof AC',
    fuel: 'Diesel',
    rate: '₹28/KM',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80',
    popular: true,
    features: ['Reclining Seats', 'LED TV Screen', 'Surround Sound Audio'],
  },
];

const Fleet = ({ onOpenBookingModal }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Sedans', 'Family SUVs', 'Luxury Cars', 'Tempo & Buses'];

  const filteredFleet = activeCategory === 'All'
    ? fleetData
    : fleetData.filter(item => item.category === activeCategory);

  return (
    <section id="fleet" className="py-12 md:py-18 bg-slate-50 text-slate-900 relative overflow-hidden border-b border-slate-200">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-sky-200/40 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold mb-2 shadow-2xs">
            <Car className="w-3.5 h-3.5 text-emerald-600" />
            <span>EXECUTIVE VEHICLE FLEET</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading text-slate-900 tracking-tight">
            Our Luxury <span className="gradient-text-cyan">Vehicle Showroom</span>
          </h2>
          <p className="text-slate-600 text-xs md:text-sm mt-1 max-w-xl mx-auto">
            Swipe to explore sanitized, GPS-enabled vehicles with trained chauffeurs.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-emerald-600 text-white font-black shadow-sm scale-102'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Render Single Centered Card if only 1 vehicle, otherwise Swiper Slider */}
        {filteredFleet.length === 1 ? (
          <div className="max-w-sm sm:max-w-md md:max-w-lg mx-auto w-full pb-8">
            {(() => {
              const vehicle = filteredFleet[0];
              return (
                <div className="glass-card-light rounded-xl md:rounded-3xl overflow-hidden flex flex-col justify-between h-full border border-slate-200 hover:border-emerald-400 group shadow-md">
                  {/* Image */}
                  <div className="relative h-40 sm:h-48 overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />

                    <div className="absolute top-3 right-3 bg-emerald-600 text-white font-black px-3 py-1 rounded-full text-xs shadow-sm">
                      {vehicle.rate}
                    </div>

                    {vehicle.popular && (
                      <div className="absolute top-3 left-3 bg-amber-500 text-white font-black px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider shadow-2xs">
                        POPULAR CHOICE
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest block">{vehicle.category}</span>
                      <h3 className="text-base sm:text-xl font-black text-slate-900 font-heading mt-0.5 group-hover:text-emerald-600 transition-colors leading-tight">
                        {vehicle.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {vehicle.subtitle}
                      </p>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <div className="flex items-center gap-1.5 text-slate-700 font-semibold truncate">
                        <Users className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{vehicle.passengers}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-700 font-semibold truncate">
                        <Briefcase className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="truncate">{vehicle.luggage}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-700 font-semibold truncate">
                        <Wind className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{vehicle.ac}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-700 font-semibold truncate">
                        <Fuel className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{vehicle.fuel}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-1">
                      {vehicle.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => onOpenBookingModal('vehicle', vehicle)}
                      className="btn-cyan w-full py-3 text-xs font-black shadow-sm flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                    >
                      <span>Reserve {vehicle.name.split(' ')[0]}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={12}
            slidesPerView={1.12}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            breakpoints={{
              480: { slidesPerView: 1.25, spaceBetween: 14 },
              640: { slidesPerView: 2, spaceBetween: 18 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="pb-12"
          >
            {filteredFleet.map((vehicle) => (
              <SwiperSlide key={vehicle.id} className="h-auto">
                <div className="glass-card-light rounded-xl md:rounded-3xl overflow-hidden flex flex-col justify-between h-full border border-slate-200 hover:border-emerald-400 group shadow-2xs">
                  
                  {/* Image */}
                  <div className="relative h-32 sm:h-40 md:h-44 overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />

                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-emerald-600 text-white font-black px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] shadow-sm">
                      {vehicle.rate}
                    </div>

                    {vehicle.popular && (
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-amber-500 text-white font-black px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] uppercase tracking-wider shadow-2xs">
                        POPULAR CHOICE
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-3.5 sm:p-4 md:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
                    <div>
                      <span className="text-[9px] sm:text-[10px] font-black text-amber-700 uppercase tracking-widest block">{vehicle.category}</span>
                      <h3 className="text-sm sm:text-base md:text-lg font-black text-slate-900 font-heading mt-0.5 group-hover:text-emerald-600 transition-colors leading-tight">
                        {vehicle.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {vehicle.subtitle}
                      </p>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-1 text-[10px] sm:text-[11px] bg-slate-50 p-2 rounded-lg sm:rounded-xl border border-slate-200">
                      <div className="flex items-center gap-1.5 text-slate-700 font-semibold truncate">
                        <Users className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="truncate">{vehicle.passengers}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-700 font-semibold truncate">
                        <Briefcase className="w-3 h-3 text-amber-600 shrink-0" />
                        <span className="truncate">{vehicle.luggage}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-700 font-semibold truncate">
                        <Wind className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="truncate">{vehicle.ac}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-700 font-semibold truncate">
                        <Fuel className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="truncate">{vehicle.fuel}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-0.5 sm:space-y-1">
                      {vehicle.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-700">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => onOpenBookingModal('vehicle', vehicle)}
                      className="btn-cyan w-full py-2 sm:py-2.5 text-[11px] sm:text-xs font-black shadow-sm flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                    >
                      <span>Reserve {vehicle.name.split(' ')[0]}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-white" />
                    </button>

                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

      </div>
    </section>
  );
};

export default Fleet;
