import React, { useState } from 'react';
import { Navigation, Car, ShieldCheck, Zap, Radio, MapPin, PhoneCall, CheckCircle2, Clock } from 'lucide-react';

const zonesData = [
  { id: 'vtz', name: 'VTZ Airport Terminal', cabs: 14, eta: '3 Mins', type: 'Innova Crysta & Sedans', status: 'High Demand', driver: 'Srinivas R. (Rating 4.9★)' },
  { id: 'station', name: 'VSKP Railway Station', cabs: 18, eta: '2 Mins', type: 'All Fleet Available', status: 'Immediate Dispatch', driver: 'Kiran Kumar (Rating 5.0★)' },
  { id: 'siripuram', name: 'Siripuram Junction', cabs: 12, eta: '4 Mins', type: 'Sedans & Hatchbacks', status: 'Ready', driver: 'Rambabu K. (Rating 4.8★)' },
  { id: 'beach', name: 'RK Beach Road', cabs: 16, eta: '3 Mins', type: 'Luxury SUVs & Sedans', status: 'High Demand', driver: 'Venkatesh P. (Rating 4.9★)' },
  { id: 'gajuwaka', name: 'Gajuwaka SEZ Hub', cabs: 10, eta: '5 Mins', type: 'Ertiga 6-Seaters', status: 'Ready', driver: 'Appala Naidu (Rating 4.9★)' },
  { id: 'madhurawada', name: 'Madhurawada IT Park', cabs: 15, eta: '4 Mins', type: 'Corporate Executive Cabs', status: 'Ready', driver: 'Suresh V. (Rating 4.9★)' },
];

const CabRadar = ({ onOpenBookingModal }) => {
  const [selectedZone, setSelectedZone] = useState(zonesData[0]);

  return (
    <section id="radar" className="py-16 md:py-24 bg-slate-50 text-slate-900 relative overflow-hidden border-b border-slate-200">
      
      {/* Background Radar Pulsing Animation Circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-15">
        <div className="absolute inset-0 rounded-full border border-sky-500 radar-ring" />
        <div className="absolute inset-16 rounded-full border border-amber-500 radar-ring" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-32 rounded-full border border-emerald-500 radar-ring" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold mb-3 shadow-2xs">
              <Radio className="w-4 h-4 animate-pulse text-emerald-600" />
              <span>LIVE GPS RADAR DISPATCH • VISAKHAPATNAM</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black font-heading text-slate-900 tracking-tight">
              Real-Time Available <span className="gradient-text-emerald">Cabs Near You</span>
            </h2>
            <p className="text-slate-600 text-sm md:text-base mt-2">
              Chauffeurs active right now across Visakhapatnam coastal belt & key transport hubs.
            </p>
          </div>

          <button
            onClick={() => onOpenBookingModal('general', { pickup: selectedZone.name })}
            className="btn-gold text-xs px-6 py-3.5 shrink-0 shadow-md cursor-pointer flex items-center gap-2"
          >
            <Zap className="w-4 h-4 text-white fill-white" />
            <span>Dispatch Nearest Cab (~{selectedZone.eta})</span>
          </button>
        </div>

        {/* Interactive Radar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Zone Buttons */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {zonesData.map((zone) => {
              const isSelected = selectedZone.id === zone.id;
              return (
                <div
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-amber-50/80 border-amber-500 shadow-md ring-2 ring-amber-400/20'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600" />
                    </span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${isSelected ? 'bg-amber-500 text-white border-amber-500' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                      {zone.cabs} Ready
                    </span>
                  </div>

                  <h4 className="text-sm font-extrabold text-slate-900 leading-tight font-heading">
                    {zone.name}
                  </h4>
                  <p className="text-[11px] text-amber-700 font-bold mt-1.5 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-600" />
                    <span>ETA ~{zone.eta}</span>
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Dispatch Highlight Card */}
          <div className="lg:col-span-5">
            <div className="glass-panel-glow-light p-6 md:p-8 relative overflow-hidden">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-2xs">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 font-heading">{selectedZone.name}</h3>
                    <p className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{selectedZone.status}</span>
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-black px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                  LIVE GPS
                </span>
              </div>

              <div className="space-y-3.5 text-xs text-slate-700 border-b border-slate-100 pb-5 mb-5">
                <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-slate-500 font-semibold">Available Vehicles:</span>
                  <span className="font-extrabold text-slate-900">{selectedZone.type}</span>
                </div>
                <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-slate-500 font-semibold">Average Pickup Time:</span>
                  <span className="font-extrabold text-amber-700 font-mono">~{selectedZone.eta}</span>
                </div>
                <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-slate-500 font-semibold">On-Duty Captain:</span>
                  <span className="font-extrabold text-emerald-700">{selectedZone.driver}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => onOpenBookingModal('general', { pickup: selectedZone.name })}
                  className="btn-gold w-full py-3.5 text-xs font-black shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 text-white fill-white" />
                  <span>Book Cab from {selectedZone.name.split(' ')[0]}</span>
                </button>
                <a
                  href="tel:+919876543210"
                  className="w-full py-3 bg-white text-slate-800 border border-slate-300 font-bold text-xs rounded-full flex items-center justify-center gap-2 hover:border-amber-500 hover:text-amber-600 transition-colors shadow-2xs"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
                  <span>Call Dispatch Desk Now</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CabRadar;
