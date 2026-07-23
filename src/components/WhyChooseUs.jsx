import React from 'react';
import { ShieldCheck, UserCheck, Navigation, PhoneCall, DollarSign, Ban, Clock, Sparkles, Building2, Zap, CheckCircle } from 'lucide-react';

const reasons = [
  {
    icon: ShieldCheck,
    title: '100% Safety',
    description: 'Panic button enabled vehicles with strict safety monitoring for solo and family travelers.',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200'
  },
  {
    icon: UserCheck,
    title: 'Verified Drivers',
    description: 'Police-verified chauffeurs with 5+ years mountain & highway experience.',
    color: 'text-orange-600 bg-orange-50 border-orange-200'
  },
  {
    icon: Navigation,
    title: 'GPS Tracking',
    description: 'Live GPS trip tracking link shared directly with family members.',
    color: 'text-amber-600 bg-amber-50 border-amber-200'
  },
  {
    icon: PhoneCall,
    title: '24/7 Support',
    description: 'Round-the-clock dedicated helpline desk for instant assistance.',
    color: 'text-sky-600 bg-sky-50 border-sky-200'
  },
  {
    icon: DollarSign,
    title: 'Transparent Pricing',
    description: 'All-inclusive fixed fares including driver allowance, tolls, and fuel.',
    color: 'text-emerald-700 bg-emerald-50 border-emerald-300'
  },
  {
    icon: Ban,
    title: 'No Hidden Charges',
    description: 'Zero peak-hour surge pricing or surprise night charges.',
    color: 'text-rose-600 bg-rose-50 border-rose-200'
  },
  {
    icon: Clock,
    title: 'On Time Pickup',
    description: 'Driver arrives 15 minutes before scheduled departure.',
    color: 'text-purple-600 bg-purple-50 border-purple-200'
  },
  {
    icon: Sparkles,
    title: 'Clean Vehicles',
    description: 'Deep sanitized interiors with fresh seat covers & bottled water.',
    color: 'text-orange-600 bg-orange-50 border-orange-200'
  },
  {
    icon: Building2,
    title: 'Corporate Billing',
    description: 'Instant GST invoice generation for business travelers.',
    color: 'text-indigo-600 bg-indigo-50 border-indigo-200'
  },
  {
    icon: Zap,
    title: 'Instant Booking',
    description: 'Reserve your ride in under 60 seconds with WhatsApp confirmation.',
    color: 'text-amber-600 bg-amber-50 border-amber-200'
  }
];

const stats = [
  { label: 'Years Experience', count: 10, suffix: '+' },
  { label: 'Happy Customers', count: 15000, suffix: '+' },
  { label: 'Daily Trips Executed', count: 250, suffix: '+' },
  { label: 'Safe Travel Index', count: 100, suffix: '%' }
];

const WhyChooseUs = () => {
  return (
    <section id="about" className="py-8 md:py-12 bg-slate-900 text-white relative overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 md:px-8">
        
        {/* Animated Counter Bar */}
        <div className="mb-10 bg-gradient-to-r from-emerald-900/80 via-slate-800 to-orange-950/80 p-6 rounded-2xl border border-white/10 shadow-xl backdrop-blur-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            {stats.map((st, idx) => (
              <div key={st.label} className={`pt-2 md:pt-0 ${idx !== 0 ? 'md:pl-4' : ''}`}>
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                  {st.count.toLocaleString()}{st.suffix}
                </div>
                <div className="text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider mt-1">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Header without Pill Badge */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Why Choose <span className="gradient-text-orange">Vizag Taxi?</span>
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-1 max-w-xl mx-auto">
            10 guaranteed reasons to travel with Visakhapatnam's #1 rated taxi service.
          </p>
        </div>

        {/* 10 Compact Feature Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
          {reasons.map((r) => {
            const IconComponent = r.icon;
            return (
              <div
                key={r.title}
                className="bg-slate-800/80 p-3.5 rounded-xl border border-white/10 hover:border-orange-500/50 hover:bg-slate-800 transition-all duration-300 flex flex-col justify-between group shadow"
              >
                <div>
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 border ${r.color} shadow-sm`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1 leading-tight line-clamp-2">
                    {r.description}
                  </p>
                </div>

                <div className="mt-2 pt-2 border-t border-white/5 flex items-center gap-1 text-[9px] text-emerald-400 font-bold">
                  <CheckCircle className="w-3 h-3" />
                  <span>Guaranteed</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
