import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Plane, Train, Building, Compass, Navigation as NavIcon, Heart, Church, Map, Users, UserCheck, ArrowUpRight, Sparkles } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const servicesList = [
  {
    id: 'airport',
    title: 'Airport Transfers',
    desc: '24/7 VTZ Airport pickups & drops with flight tracking.',
    icon: Plane,
    badge: 'Popular',
    pricing: 'Starts ₹599'
  },
  {
    id: 'railway',
    title: 'Railway Pickup',
    desc: 'Instant station platform pickup from VSKP & Duvvada.',
    icon: Train,
    badge: 'On-Time',
    pricing: 'Starts ₹399'
  },
  {
    id: 'corporate',
    title: 'Corporate Cabs',
    desc: 'Executive chauffeur cabs with automated GST invoices.',
    icon: Building,
    badge: 'GST Invoice',
    pricing: 'Corporate Rate'
  },
  {
    id: 'outstation',
    title: 'Outstation Taxi',
    desc: 'One-way & round trips to Vijayawada, Vizianagaram, Hyd.',
    icon: Compass,
    badge: 'Fixed Fares',
    pricing: '₹12 / KM'
  },
  {
    id: 'local',
    title: 'Local City Hourly',
    desc: 'Flexible 4/8/12 hours local rental with unlimited stops.',
    icon: NavIcon,
    badge: 'Best Value',
    pricing: 'Starts ₹1,499'
  },
  {
    id: 'wedding',
    title: 'Wedding Rental',
    desc: 'Decorated Innova Crysta & guest mini buses.',
    icon: Heart,
    badge: 'Luxury',
    pricing: 'Custom Quote'
  },
  {
    id: 'temple',
    title: 'Temple Pilgrimage',
    desc: 'Simhachalam, Annavaram & Arasavalli temple circuits.',
    icon: Church,
    badge: 'Spiritual',
    pricing: 'Starts ₹1,799'
  },
  {
    id: 'tourist',
    title: 'Araku Hill Tours',
    desc: 'Araku, Lambasingi & Borra Caves hill packages.',
    icon: Map,
    badge: 'Top Choice',
    pricing: 'Starts ₹1,999'
  },
  {
    id: 'employee',
    title: 'Employee Shuttles',
    desc: 'Daily IT SEZ & Navy personnel staff drop solutions.',
    icon: Users,
    badge: 'Contract',
    pricing: 'Monthly Contract'
  },
  {
    id: 'driver',
    title: 'Driver On Demand',
    desc: 'Hire police-verified drivers for your personal car.',
    icon: UserCheck,
    badge: 'Verified',
    pricing: 'Starts ₹499'
  },
];

const Services = ({ onOpenBookingModal }) => {
  return (
    <section id="services" className="py-12 md:py-18 bg-slate-50 text-slate-900 relative overflow-hidden border-b border-slate-200">
      
      {/* Background Glow */}
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-sky-100/50 rounded-full blur-[160px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-[11px] font-bold mb-2 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>FULL SPECTRUM CAB SERVICES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading text-slate-900 tracking-tight">
            Our Complete <span className="gradient-text-cyan">Taxi Solutions</span>
          </h2>
          <p className="text-slate-600 text-xs md:text-sm mt-1 max-w-xl mx-auto">
            Swipe to view all tailored travel solutions across Visakhapatnam.
          </p>
        </div>

        {/* Swiper Slider for Services */}
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={14}
          slidesPerView={1.2}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 16 },
            768: { slidesPerView: 3, spaceBetween: 18 },
            1024: { slidesPerView: 5, spaceBetween: 18 },
          }}
          className="pb-12"
        >
          {servicesList.map((srv) => {
            const Icon = srv.icon;
            return (
              <SwiperSlide key={srv.id} className="h-auto">
                <div
                  onClick={() => onOpenBookingModal('service', srv)}
                  className="glass-card-light p-4 rounded-2xl border border-slate-200 hover:border-sky-400 transition-all flex flex-col justify-between cursor-pointer group shadow-2xs h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                        {srv.badge}
                      </span>
                    </div>

                    <h3 className="text-xs md:text-sm font-black text-slate-900 font-heading group-hover:text-sky-600 transition-colors leading-tight">
                      {srv.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-2.5 text-[11px]">
                    <span className="font-extrabold text-amber-700 font-mono">{srv.pricing}</span>
                    <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-sky-600 group-hover:border-sky-400">
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

      </div>
    </section>
  );
};

export default Services;
