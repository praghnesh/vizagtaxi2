import React from 'react';
import { ShieldCheck, UserCheck, Navigation, PhoneCall, DollarSign, Ban, Clock, Sparkles, Building2, Zap, CheckCircle2, Award } from 'lucide-react';

const reasons = [
  {
    icon: ShieldCheck,
    title: '100% Safety Shield',
    description: 'Panic SOS button enabled cabs with live security monitoring.',
    color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
  },
  {
    icon: UserCheck,
    title: 'Verified Local Chauffeurs',
    description: 'Police-verified, polite local drivers with 5+ years experience.',
    color: 'text-amber-700 bg-amber-50 border-amber-200'
  },
  {
    icon: Navigation,
    title: 'Live GPS Location',
    description: 'Live trip location link shared directly with family members.',
    color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
  },
  {
    icon: PhoneCall,
    title: '24/7 Helpline Desk',
    description: 'Round-the-clock human call center in Vizag.',
    color: 'text-amber-700 bg-amber-50 border-amber-200'
  },
  {
    icon: DollarSign,
    title: 'Fixed Transparent Fare',
    description: 'All-inclusive fares covering driver allowance, tolls, and fuel.',
    color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
  },
  {
    icon: Ban,
    title: 'Zero Surge Fees',
    description: 'No peak-hour surge multipliers or night surprise charges.',
    color: 'text-amber-700 bg-amber-50 border-amber-200'
  },
  {
    icon: Clock,
    title: '15-Min Prior Pickup',
    description: 'Chauffeur arrives 15 minutes ahead of scheduled time.',
    color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
  },
  {
    icon: Sparkles,
    title: 'Sanitized Luxury Fleet',
    description: 'Deep sanitized interiors with fresh seat covers & tissue box.',
    color: 'text-amber-700 bg-amber-50 border-amber-200'
  },
  {
    icon: Building2,
    title: 'Corporate GST Billing',
    description: 'Instant GST invoice generation for business travelers.',
    color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
  },
  {
    icon: Zap,
    title: 'Instant Confirmation',
    description: 'Reserve cab in under 60s with WhatsApp confirmation.',
    color: 'text-amber-700 bg-amber-50 border-amber-200'
  }
];

const stats = [
  { label: 'Years Experience', count: '10+' },
  { label: 'Happy Passengers', count: '15,000+' },
  { label: 'Daily Trips Run', count: '250+' },
  { label: 'Safety Rating Index', count: '99.8%' }
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-16 md:py-24 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200">
      
      {/* Background Glow */}
      <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-emerald-100/50 rounded-full blur-[160px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        
        {/* Stat Counter Cards Bar */}
        <div className="mb-14 glass-panel-light p-8 rounded-3xl border border-slate-200 shadow-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {stats.map((st, idx) => (
              <div key={st.label} className={`pt-4 md:pt-0 ${idx !== 0 ? 'md:pl-6' : ''}`}>
                <div className="text-3xl md:text-5xl font-black text-amber-600 font-mono tracking-tight">
                  {st.count}
                </div>
                <div className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mt-2 font-heading">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold mb-3 shadow-2xs">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>THE VIZAG TAXI GOLD STANDARD</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-heading text-slate-900 tracking-tight">
            10 Reasons We Are <span className="gradient-text-gold">#1 in Vizag</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-2">
            Built for reliability, tourist comfort, and absolute peace of mind on coastal highways & Araku ghat roads.
          </p>
        </div>

        {/* 10 Reasons Mobile Bento Grid (2-col on mobile, 5-col on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-4">
          {reasons.map((r, idx) => {
            const Icon = r.icon;
            // Make cards 0, 4, 9 featured full-width (col-span-2 on mobile)
            const isFeatured = idx === 0 || idx === 4 || idx === 9;
            return (
              <div
                key={idx}
                className={`glass-card-light transition-all flex flex-col justify-between ${
                  isFeatured
                    ? 'col-span-2 sm:col-span-1 p-4 sm:p-5 rounded-2xl bg-slate-50/90 border-amber-300 shadow-xs'
                    : 'col-span-1 p-3 sm:p-5 rounded-xl sm:rounded-2xl border-slate-200 hover:border-amber-400'
                }`}
              >
                <div>
                  <div className={`rounded-lg sm:rounded-xl ${r.color} flex items-center justify-center border ${
                    isFeatured ? 'w-9 h-9 sm:w-10 sm:h-10 mb-2.5 sm:mb-3.5' : 'w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-3.5'
                  }`}>
                    <Icon className={isFeatured ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-4 h-4 sm:w-5 sm:h-5'} />
                  </div>
                  <h3 className={`font-extrabold text-slate-900 font-heading leading-snug ${
                    isFeatured ? 'text-xs sm:text-sm' : 'text-[11px] sm:text-sm'
                  }`}>
                    {r.title}
                  </h3>
                  <p className={`mt-0.5 sm:mt-1 leading-snug sm:leading-relaxed ${
                    isFeatured ? 'text-[11px] sm:text-xs text-slate-700' : 'text-[10px] sm:text-xs text-slate-500 line-clamp-2 sm:line-clamp-none'
                  }`}>
                    {r.description}
                  </p>
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
