import React from 'react';
import { Plane, Train, Building, Compass, Navigation, Heart, Church, Map, Users, UserCheck, ArrowUpRight } from 'lucide-react';

const servicesList = [
  {
    id: 'airport',
    title: 'Airport Transfers',
    desc: '24/7 VTZ Airport pickups & drops.',
    icon: Plane,
    badge: 'Popular',
  },
  {
    id: 'railway',
    title: 'Railway Pickup',
    desc: 'Instant pickup from VSKP & Duvvada.',
    icon: Train,
    badge: 'On-Time',
  },
  {
    id: 'corporate',
    title: 'Corporate Cabs',
    desc: 'Executive chauffeur cabs & monthly billing.',
    icon: Building,
    badge: 'GST Invoice',
  },
  {
    id: 'outstation',
    title: 'Outstation Taxi',
    desc: 'One-way & round trips to Vijayawada/Hyd.',
    icon: Compass,
    badge: 'Fixed Rates',
  },
  {
    id: 'local',
    title: 'Local City Ride',
    desc: 'Flexible 4/6/8/10 hours rental.',
    icon: Navigation,
    badge: 'Best Value',
  },
  {
    id: 'wedding',
    title: 'Wedding Car Rental',
    desc: 'Decorated Innova Crysta & guest buses.',
    icon: Heart,
    badge: 'Luxury',
  },
  {
    id: 'temple',
    title: 'Temple Tours',
    desc: 'Simhachalam & Annavaram circuits.',
    icon: Church,
    badge: 'Spiritual',
  },
  {
    id: 'tourist',
    title: 'Tourist Packages',
    desc: 'Araku, Lambasingi & Borra hill tours.',
    icon: Map,
    badge: 'Top Choice',
  },
  {
    id: 'employee',
    title: 'Employee Transport',
    desc: 'Daily IT park staff commute solutions.',
    icon: Users,
    badge: 'Contract',
  },
  {
    id: 'driver',
    title: 'Driver On Demand',
    desc: 'Hire verified drivers for your luxury car.',
    icon: UserCheck,
    badge: 'Verified',
  },
];

const Services = ({ onOpenBookingModal }) => {
  return (
    <section id="services" className="py-8 md:py-12 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Title Header without Pill Badge or Arrow Controls */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Our Premium <span className="gradient-text-green">Cab Services</span>
          </h2>
          <p className="text-slate-600 text-xs md:text-sm mt-1">
            Swipe horizontally to browse our tailored transportation services.
          </p>
        </div>

        {/* Compact Horizontal Scrollable Cards */}
        <div className="flex gap-3.5 overflow-x-auto scrollbar-none pb-4 pt-1 -mx-4 px-4 md:mx-0 md:px-0">
          {servicesList.map((srv) => {
            const IconComp = srv.icon;
            return (
              <div
                key={srv.id}
                onClick={() => onOpenBookingModal('service', srv)}
                className="w-[200px] min-w-[200px] max-w-[200px] bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-500/40 transition-all duration-300 cursor-pointer flex flex-col justify-between group shrink-0"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {srv.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-tight">
                    {srv.desc}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-emerald-700">
                  <span>Book Service</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Services;
