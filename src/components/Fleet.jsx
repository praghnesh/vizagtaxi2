import React from 'react';
import { Users, Briefcase, Wind, Fuel, ChevronRight } from 'lucide-react';

const fleetData = [
  {
    id: 'dzire',
    name: 'Swift Dzire / Etios',
    category: 'Sedan',
    passengers: '4 Passengers',
    luggage: '2 Bags',
    ac: 'Dual AC',
    fuel: 'Diesel',
    rate: '₹12/KM',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
    popular: true,
  },
  {
    id: 'ertiga',
    name: 'Maruti Ertiga',
    category: '6 Seater SUV',
    passengers: '6 Passengers',
    luggage: '4 Bags',
    ac: 'Rear AC',
    fuel: 'Diesel/CNG',
    rate: '₹15/KM',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
    popular: true,
  },
  {
    id: 'innova',
    name: 'Toyota Innova',
    category: '7 Seater MUV',
    passengers: '7 Passengers',
    luggage: '4 Bags',
    ac: 'Triple AC',
    fuel: 'Diesel',
    rate: '₹18/KM',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80',
    popular: false,
  },
  {
    id: 'crysta',
    name: 'Innova Crysta',
    category: 'Luxury SUV',
    passengers: '7 Passengers',
    luggage: '5 Bags',
    ac: 'Auto Climate',
    fuel: 'Diesel',
    rate: '₹20/KM',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80',
    popular: true,
  },
  {
    id: 'xylo',
    name: 'Mahindra Xylo',
    category: 'Rugged SUV',
    passengers: '7 Passengers',
    luggage: '4 Bags',
    ac: 'Dual AC',
    fuel: 'Diesel',
    rate: '₹17/KM',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
    popular: false,
  },
  {
    id: 'tempo',
    name: 'Tempo Traveller',
    category: 'Group Van',
    passengers: '12-17 Guests',
    luggage: '10+ Bags',
    ac: 'Ducted AC',
    fuel: 'Diesel',
    rate: '₹26/KM',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80',
    popular: true,
  },
  {
    id: 'minibus',
    name: 'Mini Bus',
    category: 'Tourist Bus',
    passengers: '21-26 Guests',
    luggage: 'Boot Space',
    ac: 'High AC',
    fuel: 'Diesel',
    rate: '₹38/KM',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
    popular: false,
  },
  {
    id: 'luxurybus',
    name: 'Luxury Volvo Bus',
    category: '45 Seater Coach',
    passengers: '45 Guests',
    luggage: 'Cargo Hold',
    ac: 'Volvo AC',
    fuel: 'Diesel',
    rate: 'Quote',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80',
    popular: false,
  }
];

const Fleet = ({ onOpenBookingModal }) => {
  return (
    <section id="fleet" className="py-8 md:py-12 bg-slate-900 text-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Title without Pill Badge or Arrow Controls */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Our Luxury <span className="gradient-text-orange">Vehicle Fleet</span>
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-1">
            Swipe horizontally to view all sanitized cabs and buses.
          </p>
        </div>

        {/* Compact Horizontal Scrollable Cards */}
        <div className="flex gap-4 overflow-x-auto scrollbar-none pb-4 pt-1 -mx-4 px-4 md:mx-0 md:px-0">
          {fleetData.map((v) => (
            <div
              key={v.id}
              className="w-[240px] min-w-[240px] max-w-[240px] bg-slate-800/90 rounded-2xl overflow-hidden border border-white/10 shadow-lg hover:border-orange-500/50 transition-all duration-300 flex flex-col group shrink-0"
            >
              {/* Compact Image */}
              <div className="relative h-36 overflow-hidden bg-slate-950">
                <img
                  src={v.image}
                  alt={v.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                {v.popular && (
                  <span className="absolute top-2.5 left-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-[9px] uppercase px-2 py-0.5 rounded-full shadow">
                    Popular
                  </span>
                )}

                <div className="absolute bottom-2 right-2.5 bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-300 font-extrabold px-2 py-0.5 rounded text-[11px]">
                  {v.rate}
                </div>
              </div>

              {/* Compact Card Body */}
              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[11px] font-semibold text-orange-400 block">{v.category}</span>
                  <h3 className="text-sm font-bold text-white mt-0.5 group-hover:text-amber-400 transition-colors">
                    {v.name}
                  </h3>
                </div>

                {/* Compact Spec Grid */}
                <div className="grid grid-cols-2 gap-1.5 text-[11px] bg-slate-900/60 p-2 rounded-xl border border-white/5">
                  <div className="flex items-center gap-1 text-slate-300">
                    <Users className="w-3 h-3 text-orange-400 shrink-0" />
                    <span className="truncate">{v.passengers}</span>
                  </div>

                  <div className="flex items-center gap-1 text-slate-300">
                    <Wind className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="truncate">{v.ac}</span>
                  </div>

                  <div className="flex items-center gap-1 text-slate-300">
                    <Briefcase className="w-3 h-3 text-amber-400 shrink-0" />
                    <span className="truncate">{v.luggage}</span>
                  </div>

                  <div className="flex items-center gap-1 text-slate-300">
                    <Fuel className="w-3 h-3 text-sky-400 shrink-0" />
                    <span className="truncate">{v.fuel}</span>
                  </div>
                </div>

                {/* Action */}
                <button
                  onClick={() => onOpenBookingModal('fleet', v)}
                  className="btn btn-orange w-full py-2 text-xs font-bold flex items-center justify-center gap-1 shadow mt-1"
                >
                  <span>Book Cab</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Fleet;
