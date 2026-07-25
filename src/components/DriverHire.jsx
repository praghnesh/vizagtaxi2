import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { UserCheck, Award, Star, Clock, Car, ChevronRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const drivers = [
  {
    id: 1,
    name: 'Srinivas Rao',
    exp: '12 Yrs Exp',
    rating: 4.9,
    trips: '2,400+ Trips',
    languages: 'Telugu, English, Hindi',
    specialty: 'Araku & Ghat Expert',
    badge: 'Top Rated',
  },
  {
    id: 2,
    name: 'K. Venkat',
    exp: '9 Yrs Exp',
    rating: 4.95,
    trips: '1,850+ Trips',
    languages: 'Telugu, English',
    specialty: 'Executive Corporate',
    badge: 'Verified Captain',
  },
  {
    id: 3,
    name: 'Rambabu M.',
    exp: '15 Yrs Exp',
    rating: 5.0,
    trips: '3,200+ Trips',
    languages: 'Telugu, Hindi',
    specialty: 'Highway Specialist',
    badge: 'Master Chauffeur',
  },
];

const DriverHire = ({ onOpenBookingModal }) => {
  return (
    <section id="driver" className="py-12 md:py-18 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold mb-2 shadow-2xs">
            <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>CHAUFFEUR ON DEMAND • VISAKHAPATNAM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading text-slate-900 tracking-tight">
            Hire Verified Chauffeurs <span className="gradient-text-emerald">For Your Own Car</span>
          </h2>
          <p className="text-slate-600 text-xs md:text-sm mt-1 max-w-xl mx-auto">
            Need a professional driver for Araku ghat drives or outstation trips? Book by hour or day.
          </p>
        </div>

        {/* Swiper Slider for Drivers */}
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
          {drivers.map((drv) => (
            <SwiperSlide key={drv.id} className="h-auto">
              <div className="glass-card-light rounded-xl md:rounded-3xl p-3.5 sm:p-5 border border-slate-200 hover:border-emerald-400 transition-all flex flex-col justify-between shadow-2xs h-full">
                <div>
                  <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                    <span className="text-[8px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {drv.badge}
                    </span>
                    <div className="flex items-center gap-1 text-amber-700 text-[10px] sm:text-[11px] font-bold bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
                      <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400 text-amber-400" />
                      <span>{drv.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 font-black text-xs sm:text-base font-heading shadow-2xs shrink-0">
                      {drv.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-black text-slate-900 font-heading leading-tight">
                        {drv.name}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 font-semibold">
                        <Award className="w-3 h-3 text-amber-600" />
                        <span>{drv.exp}</span>
                        <span>•</span>
                        <span className="text-emerald-700">{drv.trips}</span>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1 text-[10px] sm:text-[11px] bg-slate-50 p-2 sm:p-2.5 rounded-lg sm:rounded-xl border border-slate-200 mb-2.5 sm:mb-3">
                    <div className="flex justify-between text-slate-600">
                      <span className="text-slate-500">Specialty</span>
                      <span className="font-bold text-slate-900 truncate ml-1">{drv.specialty}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="text-slate-500">Languages</span>
                      <span className="font-bold text-slate-900 truncate ml-1">{drv.languages}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onOpenBookingModal('driver', drv)}
                  className="w-full py-2 sm:py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[11px] sm:text-xs rounded-full shadow-sm flex items-center justify-center gap-1.5 cursor-pointer hover:scale-101 transition-all"
                >
                  <span>Hire {drv.name.split(' ')[0]} (₹499/Day)</span>
                  <ChevronRight className="w-3.5 h-3.5 text-white" />
                </button>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default DriverHire;
