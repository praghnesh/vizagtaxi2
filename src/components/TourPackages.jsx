import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Clock, Car, Star, ArrowRight, Compass, X, CheckCircle2, MapPin, Zap } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const packagesData = [
  {
    id: 'araku',
    category: 'Hill Stations',
    name: 'Araku Valley Scenic Hill Tour',
    tagline: 'Mist-covered valleys, coffee gardens & waterfalls',
    price: '₹3,499',
    duration: '1 Day (14 Hrs)',
    vehicle: 'Swift Dzire / Innova',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviews: 420,
    highlights: ['Galikonda Viewpoint', 'Coffee Museum', 'Borra Caves Expedition'],
    itinerary: [
      { time: '06:30 AM', title: 'Pickup from Vizag Hotel / Station', desc: 'Scenic morning drive through Eastern Ghats winding roads.' },
      { time: '09:00 AM', title: 'Borra Caves Exploration', desc: 'Discover 1 million year old limestone cave structures.' },
      { time: '11:30 AM', title: 'Galikonda View Point', desc: 'Highest altitude viewpoint offering 360-degree valley panorama.' },
      { time: '01:30 PM', title: 'Lunch & Araku Coffee Plantation', desc: 'Traditional Bamboo Chicken lunch and organic coffee tasting.' },
      { time: '08:30 PM', title: 'Safe Return Drop to Vizag', desc: 'Comfortable night highway drive back to Visakhapatnam.' }
    ]
  },
  {
    id: 'lambasingi',
    category: 'Hill Stations',
    name: 'Lambasingi - Kashmir of AP',
    tagline: 'Freezing mist & pine forest trails',
    price: '₹3,999',
    duration: '2 Days / 1 Night',
    vehicle: 'Maruti Ertiga / Innova',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviews: 310,
    highlights: ['Strawberry Orchards', 'Cloud Bed Viewpoint', 'Kothapalli Waterfalls'],
    itinerary: [
      { time: 'Day 1 - 06:00 AM', title: 'Vizag to Lambasingi Scenic Highway', desc: 'Early morning departure through dense forest pass.' },
      { time: 'Day 1 - 10:30 AM', title: 'Kothapalli Waterfalls Trail', desc: 'Trek down to natural waterfall pool.' },
      { time: 'Day 2 - 05:30 AM', title: 'Cloud Bed Sunrise View', desc: 'Witness mist blanket rolling over pine hills.' }
    ]
  },
  {
    id: 'rkbeach',
    category: 'Coastal & Beach',
    name: 'RK Beach & Coastal Drive',
    tagline: 'Marine drive, submarine & aircraft museums',
    price: '₹1,999',
    duration: 'Half Day (6 Hrs)',
    vehicle: 'Swift Dzire / Etios',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviews: 520,
    highlights: ['INS Kursura Submarine', 'TU 142 Aircraft Museum', 'Tenneti Beach Park'],
    itinerary: [
      { time: '02:00 PM', title: 'Vizag Hotel Pickup', desc: 'Coastal drive along Beach Road.' },
      { time: '03:00 PM', title: 'Submarine & Aircraft Museums', desc: 'Explore decommissioned Navy submarine.' },
      { time: '05:30 PM', title: 'RK Beach Sunset Point', desc: 'Relax at sunset beach with sea breeze.' }
    ]
  },
  {
    id: 'yarada',
    category: 'Coastal & Beach',
    name: 'Yarada Beach & Dolphin Nose',
    tagline: 'Golden sands & ocean cliff panoramas',
    price: '₹2,499',
    duration: '1 Day (8 Hrs)',
    vehicle: 'Sedan / SUV',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviews: 190,
    highlights: ['Dolphin Nose Cliff', 'Yarada Golden Sands', 'Lighthouse Panoramic View'],
    itinerary: [
      { time: '09:00 AM', title: 'Pickup & Drive up Gangavaram Hill', desc: 'Cliffside driving overlooking Vizag port.' },
      { time: '10:30 AM', title: 'Dolphin Nose Lighthouse', desc: 'Bird-eye view of Bay of Bengal.' }
    ]
  },
  {
    id: 'simhachalam',
    category: 'Spiritual Pilgrimage',
    name: 'Simhachalam Temple & Heritage',
    tagline: '11th-century Narasimha Swamy shrine',
    price: '₹1,799',
    duration: 'Half Day (5 Hrs)',
    vehicle: 'All Vehicles Available',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    reviews: 620,
    highlights: ['Main Shrine Entry', 'Chandanotsavam Heritage', 'Hilltop Temple View'],
    itinerary: [
      { time: '07:30 AM', title: 'Pickup from Station / Hotel', desc: 'Morning drive to Simhachalam hill range.' },
      { time: '08:30 AM', title: 'Darshan at Main Shrine', desc: 'Priority entry assistance for peaceful darshan.' }
    ]
  },
];

const TourPackages = ({ onOpenBookingModal }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItineraryPkg, setSelectedItineraryPkg] = useState(null);

  const categories = ['All', 'Hill Stations', 'Coastal & Beach', 'Spiritual Pilgrimage'];

  const filteredPackages = activeCategory === 'All'
    ? packagesData
    : packagesData.filter(p => p.category === activeCategory);

  return (
    <section id="packages" className="py-12 md:py-18 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200">
      
      {/* Background Soft Glow */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-amber-100/40 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-bold mb-2 shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>VISAKHAPATNAM & ARAKU TOUR EXPLORER</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading text-slate-900 tracking-tight">
            Curated Vizag <span className="gradient-text-gold">Tour Packages</span>
          </h2>
          <p className="text-slate-600 text-xs md:text-sm mt-1 max-w-xl mx-auto">
            Swipe to explore private AC cab tours with experienced mountain chauffeurs.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-amber-500 text-white font-black shadow-sm scale-102'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Render Single Centered Card if only 1 package, otherwise Swiper Slider */}
        {filteredPackages.length === 1 ? (
          <div className="max-w-sm sm:max-w-md md:max-w-lg mx-auto w-full pb-8">
            {(() => {
              const pkg = filteredPackages[0];
              return (
                <div className="glass-card-light rounded-xl md:rounded-3xl overflow-hidden flex flex-col justify-between h-full border border-slate-200 hover:border-amber-400 group shadow-md">
                  {/* Image Banner */}
                  <div className="relative h-40 sm:h-48 overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                    <div className="absolute top-3 right-3 bg-amber-500 text-white font-black px-3 py-1 rounded-full text-xs shadow-sm">
                      Starts {pkg.price}
                    </div>

                    <div className="absolute bottom-2.5 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-xs text-slate-900 font-bold border border-slate-200 shadow-2xs">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{pkg.rating} ({pkg.reviews})</span>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest block">{pkg.category}</span>
                      <h3 className="text-base sm:text-xl font-black text-slate-900 group-hover:text-amber-600 transition-colors mt-0.5 font-heading leading-tight">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {pkg.tagline}
                      </p>
                    </div>

                    {/* Compact Specs Grid */}
                    <div className="grid grid-cols-2 gap-1.5 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <div className="flex items-center gap-1.5 text-slate-700 font-semibold truncate">
                        <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="truncate">{pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-700 font-semibold truncate">
                        <Car className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{pkg.vehicle.split('/')[0]}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-1">
                      {pkg.highlights.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => setSelectedItineraryPkg(pkg)}
                        className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 border border-slate-200 transition-all text-center cursor-pointer"
                      >
                        Itinerary
                      </button>

                      <button
                        onClick={() => onOpenBookingModal('tour', pkg)}
                        className="btn-gold py-2.5 px-3 text-xs font-black text-white flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                      >
                        <span>Book Tour</span>
                        <ArrowRight className="w-3.5 h-3.5 text-white" />
                      </button>
                    </div>
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
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              480: { slidesPerView: 1.25, spaceBetween: 14 },
              640: { slidesPerView: 2, spaceBetween: 18 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="pb-12"
          >
            {filteredPackages.map((pkg) => (
              <SwiperSlide key={pkg.id} className="h-auto">
                <div className="glass-card-light rounded-xl md:rounded-3xl overflow-hidden flex flex-col justify-between h-full border border-slate-200 hover:border-amber-400 group shadow-2xs">
                  
                  {/* Image Banner (Compact height h-32 on mobile, h-44 on desktop) */}
                  <div className="relative h-32 sm:h-40 md:h-44 overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-amber-500 text-white font-black px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] shadow-sm">
                      Starts {pkg.price}
                    </div>

                    <div className="absolute bottom-2 left-2 sm:bottom-2.5 sm:left-3 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] text-slate-900 font-bold border border-slate-200 shadow-2xs">
                      <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400 text-amber-400" />
                      <span>{pkg.rating} ({pkg.reviews})</span>
                    </div>
                  </div>

                  {/* Body Details (Compact Padding p-3.5) */}
                  <div className="p-3.5 sm:p-4 md:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
                    <div>
                      <span className="text-[9px] sm:text-[10px] font-black text-amber-700 uppercase tracking-widest block">{pkg.category}</span>
                      <h3 className="text-sm sm:text-base md:text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors mt-0.5 font-heading leading-tight">
                        {pkg.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {pkg.tagline}
                      </p>
                    </div>

                    {/* Compact Specs Grid */}
                    <div className="grid grid-cols-2 gap-1 text-[10px] sm:text-[11px] bg-slate-50 p-2 rounded-lg sm:rounded-xl border border-slate-200">
                      <div className="flex items-center gap-1 text-slate-700 font-semibold truncate">
                        <Clock className="w-3 h-3 text-amber-600 shrink-0" />
                        <span className="truncate">{pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-700 font-semibold truncate">
                        <Car className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="truncate">{pkg.vehicle.split('/')[0]}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-0.5 sm:space-y-1">
                      {pkg.highlights.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-700">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="grid grid-cols-2 gap-1.5 pt-1">
                      <button
                        onClick={() => setSelectedItineraryPkg(pkg)}
                        className="py-1.5 sm:py-2 px-2 rounded-lg sm:rounded-xl bg-slate-100 hover:bg-slate-200 text-[10px] sm:text-[11px] font-bold text-slate-800 border border-slate-200 transition-all text-center cursor-pointer"
                      >
                        Itinerary
                      </button>

                      <button
                        onClick={() => onOpenBookingModal('tour', pkg)}
                        className="btn-gold py-1.5 sm:py-2 px-2 text-[10px] sm:text-[11px] font-black text-white flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                      >
                        <span>Book Tour</span>
                        <ArrowRight className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

      </div>

      {/* Itinerary Modal */}
      {selectedItineraryPkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md">
          <div className="bg-white max-w-lg w-full max-h-[85vh] overflow-y-auto p-5 md:p-7 rounded-3xl border border-amber-300 shadow-2xl text-slate-900 relative">
            <button
              onClick={() => setSelectedItineraryPkg(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">{selectedItineraryPkg.category}</span>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 font-heading mt-0.5">{selectedItineraryPkg.name}</h3>
            <p className="text-xs text-slate-600 mt-0.5">{selectedItineraryPkg.duration} • Fixed Price: <span className="text-amber-700 font-bold">{selectedItineraryPkg.price}</span></p>

            <div className="mt-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700">Day Timeline & Key Stops:</h4>
              <div className="space-y-2.5">
                {selectedItineraryPkg.itinerary.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex gap-2.5">
                    <span className="px-2 py-0.5 rounded-lg bg-amber-100 text-amber-800 font-mono text-[10px] font-bold shrink-0 self-start">
                      {item.time}
                    </span>
                    <div>
                      <div className="font-extrabold text-xs text-slate-900">{item.title}</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200">
              <button
                onClick={() => {
                  const pkg = selectedItineraryPkg;
                  setSelectedItineraryPkg(null);
                  onOpenBookingModal('tour', pkg);
                }}
                className="btn-gold w-full py-3 text-xs font-black cursor-pointer shadow-md"
              >
                Book This Tour Package ({selectedItineraryPkg.price})
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default TourPackages;
