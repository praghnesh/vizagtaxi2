import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Users, Briefcase, Wind, Fuel, ChevronRight, Car, CheckCircle2, Clock, Plane, Zap, Compass, ArrowRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const fleetData = [
  {
    id: 'sedan-car',
    category: 'Sedans',
    name: 'Sedan Car (Dzire / Glanza)',
    subtitle: 'Executive 4-Seater AC Sedan for City & Outstation',
    passengers: '4 Seats',
    seats: '4 Seats',
    luggage: '2 Bags',
    ac: 'Chilled Dual AC',
    fuel: 'Petrol / Diesel',
    image: '/fleet/swift_dzire.png',
    popular: true,
    features: ['Push Back Seats', 'Bluetooth Audio', 'Chilled Water Bottles', 'Clean & Sanitized'],
  },
  {
    id: 'mid-size-suv',
    category: 'Family SUVs',
    name: 'Mid-Size SUV',
    subtitle: 'Comfortable 5-Seater High Ground Clearance SUV',
    passengers: '5 Seats',
    seats: '5 Seats',
    luggage: '3 Bags',
    ac: 'Auto Climate AC',
    fuel: 'Petrol / Diesel',
    image: '/fleet/mid_suv.png',
    popular: false,
    features: ['High Ground Clearance', 'Comfortable Suspension', 'Ghat Road Ready', 'Spacious Boot'],
  },
  {
    id: 'ertiga',
    category: 'Family SUVs',
    name: 'Ertiga',
    subtitle: 'Spacious 6-7 Seater Family Cruiser',
    passengers: '6-7 Seats',
    seats: '6-7 Seats',
    luggage: '4 Bags',
    ac: 'Rear AC Vents',
    fuel: 'Diesel / Petrol',
    image: '/fleet/ertiga.png',
    popular: true,
    features: ['Extra Legroom', 'Rear AC Vents', 'First Aid Kit', 'Spacious Boot'],
  },
  {
    id: 'kia-carens',
    category: 'Family SUVs',
    name: 'Kia Carens',
    subtitle: 'Premium 6-7 Seater Smart Family MPV',
    passengers: '6-7 Seats',
    seats: '6-7 Seats',
    luggage: '4 Bags',
    ac: '3-Zone Cooling AC',
    fuel: 'Diesel / Petrol',
    image: '/fleet/kia_carens.png',
    popular: true,
    features: ['Ambient Lighting', 'Ventilated Seating', 'Rear AC Controls', 'Smooth Highway Ride'],
  },
  {
    id: 'innova-crysta',
    category: 'Luxury Cars',
    name: 'Innova Crysta',
    subtitle: 'Ultra Luxury 7-Seater Captain Bucket Seats',
    passengers: '7 Seats',
    seats: '7 Seats',
    luggage: '5 Bags',
    ac: 'Auto Climate Control',
    fuel: 'Diesel',
    image: '/fleet/innova_crysta.png',
    popular: true,
    features: ['Leather Captain Seats', 'Ambient Lighting', 'Ghat Road Suspension', 'Mobile Chargers'],
  },
  {
    id: 'innova-hycross',
    category: 'Luxury Cars',
    name: 'Innova Hycross',
    subtitle: 'Next-Gen VIP Hybrid 7-Seater Luxury MPV',
    passengers: '7 Seats',
    seats: '7 Seats',
    luggage: '5 Bags',
    ac: 'Multi-Zone Climate AC',
    fuel: 'Hybrid / Petrol',
    image: '/fleet/innova_hycross.png',
    popular: true,
    features: ['Panoramic Sunroof', 'Ottoman Recliner Seats', 'Whisper Quiet Hybrid Engine', 'Ultra Smooth'],
  },
  {
    id: 'fortuner',
    category: 'Luxury Cars',
    name: 'Toyota Fortuner',
    subtitle: 'Commanding 7-Seater 4x4 Premium Luxury SUV',
    passengers: '7 Seats',
    seats: '7 Seats',
    luggage: '5 Bags',
    ac: 'Dual Zone Auto AC',
    fuel: 'Diesel 4x4',
    image: '/fleet/fortuner.png',
    popular: true,
    features: ['VIP Escort & Wedding Luxury', 'High Ground Clearance', 'Leather Upholstery', 'Premium Sound'],
  },
  {
    id: 'bmw-audi',
    category: 'Luxury Cars',
    name: 'BMW & Audi Luxury',
    subtitle: 'Ultra Executive VIP Sedan & SUV Fleet',
    passengers: '4 Seats',
    seats: '4 Seats',
    luggage: '3 Bags',
    ac: 'Quad Zone Climate AC',
    fuel: 'Petrol / Diesel',
    image: '/fleet/bmw_audi.png',
    popular: false,
    features: ['VIP Delegations & Weddings', 'Premium Leather Interiors', 'Personal Chauffeur', 'Red Carpet Service'],
  },
  {
    id: 'tempo-9-seater',
    category: 'Tempo Travellers',
    name: '9-Seater Tempo Traveller',
    subtitle: '9-Seater Luxury AC Van with Pushback Seats',
    passengers: '9 Seats',
    seats: '9 Seats',
    luggage: '6+ Bags',
    ac: 'Roof Mounted AC',
    fuel: 'Diesel',
    image: '/fleet/tempo_traveller.png',
    popular: false,
    features: ['1x1 Reclining Seats', 'LED TV & Music System', 'Ample Legroom', 'Individual Charging'],
  },
  {
    id: 'tempo-12-seater',
    category: 'Tempo Travellers',
    name: '12-Seater Tempo Traveller',
    subtitle: '12-Seater Executive Group Tourist Van',
    passengers: '12 Seats',
    seats: '12 Seats',
    luggage: '8+ Bags',
    ac: 'Ducted AC Vents',
    fuel: 'Diesel',
    image: '/fleet/tempo_traveller.png',
    popular: false,
    features: ['Reclining Push Back Seats', 'High Bass Surround Sound', 'Spacious Central Aisle', 'Luggage Carrier'],
  },
  {
    id: 'tempo-16-seater',
    category: 'Tempo Travellers',
    name: '16-Seater Tempo Traveller',
    subtitle: '16-Seater Force Urbania / Traveller Luxury Van',
    passengers: '16 Seats',
    seats: '16 Seats',
    luggage: '10+ Bags',
    ac: 'Individual AC Vents',
    fuel: 'Diesel',
    image: '/fleet/urbania.png',
    popular: true,
    features: ['Panoramic Windows', 'Air Suspension Comfort', 'Individual Charging Ports', 'Plush Pushback Seats'],
  },
  {
    id: 'tempo-17-seater',
    category: 'Tempo Travellers',
    name: '17-Seater Tempo Traveller',
    subtitle: '17-Seater Group Tourist Luxury Van',
    passengers: '17 Seats',
    seats: '17 Seats',
    luggage: '10+ Bags',
    ac: 'Powerful Roof AC',
    fuel: 'Diesel',
    image: '/fleet/tempo_traveller.png',
    popular: true,
    features: ['Reclining Push-Back Seats', 'LED TV & Audio', 'Ghat Road Master Driver', 'Group Tour Luxury'],
  },
  {
    id: 'tempo-20-seater',
    category: 'Tempo Travellers',
    name: '20-Seater Tempo Traveller',
    subtitle: '20-Seater Extra Spacious Large Tourist Van',
    passengers: '20 Seats',
    seats: '20 Seats',
    luggage: '12+ Bags',
    ac: 'Dual AC Compressors',
    fuel: 'Diesel',
    image: '/fleet/tempo_traveller.png',
    popular: false,
    features: ['2x1 Seating Layout', 'Huge Rear Storage Space', 'PA System & Mic', 'Long Distance Comfort'],
  },
  {
    id: 'bus-24-seater',
    category: 'Buses & Sleepers',
    name: '24-Seater AC Mini Bus',
    subtitle: '24-Seater Deluxe AC Coach for Events & Tours',
    passengers: '24 Seats',
    seats: '24 Seats',
    luggage: 'Large Luggage Boot',
    ac: 'Centralized Chilled AC',
    fuel: 'Diesel',
    image: '/fleet/luxury_mini_bus.png',
    popular: false,
    features: ['Pushback Reclining Seats', 'Surround Sound Audio', 'Separate Luggage Boot', 'Wedding Transport'],
  },
  {
    id: 'bus-28-seater',
    category: 'Buses & Sleepers',
    name: '28-Seater AC Mini Bus',
    subtitle: '28-Seater Premium Group Tour AC Coach',
    passengers: '28 Seats',
    seats: '28 Seats',
    luggage: 'Ample Luggage Hold',
    ac: 'Ducted AC System',
    fuel: 'Diesel',
    image: '/fleet/luxury_mini_bus.png',
    popular: false,
    features: ['28 Reclining Seats', 'Air Brakes & Smooth Suspension', 'Night Lighting', 'Experienced Crew'],
  },
  {
    id: 'bus-36-seater',
    category: 'Buses & Sleepers',
    name: '36-Seater AC Luxury Bus',
    subtitle: '36-Seater High-Deck AC Deluxe Tourist Bus',
    passengers: '36 Seats',
    seats: '36 Seats',
    luggage: 'Massive Underfloor Storage',
    ac: 'High Power Roof AC',
    fuel: 'Diesel',
    image: '/fleet/luxury_bus.png',
    popular: true,
    features: ['36 Push-Back Reclining Seats', 'HD TV Screen & Mic', 'Massive Storage Space', 'Marriage & Corporate Events'],
  },
  {
    id: 'bus-40-seater',
    category: 'Buses & Sleepers',
    name: '40-Seater AC Deluxe Coach',
    subtitle: 'Grand 40-Seater Luxury Tourist Coach',
    passengers: '40 Seats',
    seats: '40 Seats',
    luggage: 'Massive Underfloor Hold',
    ac: 'Dual Unit Chilled AC',
    fuel: 'Diesel',
    image: '/fleet/luxury_bus.png',
    popular: true,
    features: ['40 Deluxe Reclining Seats', 'Audio-Visual System', 'Full Length Luggage Bay', 'Pilgrimage & Tour Package'],
  },
  {
    id: 'bus-20-20-sleeper',
    category: 'Buses & Sleepers',
    name: '20 Seater + 20 Sleeper AC Bus',
    subtitle: 'Combo 20 Seating + 20 AC Berth Sleeper Coach',
    passengers: '40 Passengers',
    seats: '20 Seats + 20 Sleepers',
    luggage: 'Large Luggage Hold',
    ac: 'Individual Berth AC Vents',
    fuel: 'Diesel',
    image: '/fleet/sleeper_bus.png',
    popular: true,
    features: ['20 Lower Seats + 20 Upper Sleeper Berths', 'Bedding & Pillows', 'Privacy Curtains', 'Night Journey Comfort'],
  },
  {
    id: 'bus-36-sleeper',
    category: 'Buses & Sleepers',
    name: '36 AC Sleeper Bus',
    subtitle: 'Full 36 Luxury AC Sleeper Berths Coach',
    passengers: '36 Berths',
    seats: '36 Sleepers',
    luggage: 'Massive Storage Bay',
    ac: 'Individual Cabin AC Vents',
    fuel: 'Diesel',
    image: '/fleet/sleeper_bus.png',
    popular: true,
    features: ['36 Executive AC Sleeper Berths', 'Reading Lights & Mobile Charging', 'Clean Blankets & Sheets', 'Long Distance Intercity'],
  },
];

const Fleet = ({ onOpenBookingModal }) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Sedans', 'Family SUVs', 'Luxury Cars', 'Tempo Travellers', 'Buses & Sleepers'];

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
            <span>OUR VERIFIED VEHICLE FLEET</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading text-slate-900 tracking-tight">
            Our Luxury <span className="gradient-text-cyan">Fleet Showroom</span>
          </h2>
          <p className="text-slate-600 text-xs md:text-sm mt-1 max-w-xl mx-auto">
            Choose from our fully sanitized, GPS-enabled vehicles with verified professional chauffeurs.
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

        {/* Swiper Slider with vehicles */}
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={16}
          slidesPerView={1.12}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          breakpoints={{
            480: { slidesPerView: 1.25, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          className="pb-12"
        >
          {filteredFleet.map((vehicle) => (
            <SwiperSlide key={vehicle.id} className="h-auto">
              <div className="glass-card-light rounded-xl md:rounded-3xl overflow-hidden flex flex-col justify-between h-full border border-slate-200 hover:border-emerald-400 group shadow-sm transition-all duration-300">
                
                {/* Image */}
                <div className="relative h-44 sm:h-48 md:h-52 overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />

                  {/* Seat Count Badge (Top Right) */}
                  <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md text-amber-400 font-black px-3 py-1 rounded-full text-xs border border-amber-400/40 shadow-sm flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>{vehicle.seats}</span>
                  </div>

                  {vehicle.popular && (
                    <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-black px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider shadow-2xs">
                      POPULAR CHOICE
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest block">{vehicle.category}</span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 font-heading mt-0.5 group-hover:text-emerald-600 transition-colors leading-tight">
                      {vehicle.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      {vehicle.subtitle}
                    </p>
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-1.5 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200">
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

                  {/* Quick Service Direct Selection Buttons (Hourly, Outstation, Airport) */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                      Choose Service Booking:
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        type="button"
                        onClick={() => navigate('/hourly-rentals', { state: { vehicle: vehicle.name } })}
                        className="py-1.5 px-1 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-black flex items-center justify-center gap-1 cursor-pointer transition-all shadow-2xs"
                        title="Book Hourly Rental"
                      >
                        <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Hourly</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => navigate('/outstation-cabs', { state: { vehicle: vehicle.name } })}
                        className="py-1.5 px-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-[11px] font-black flex items-center justify-center gap-1 cursor-pointer transition-all shadow-2xs"
                        title="Book Outstation Cab"
                      >
                        <Car className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Outstation</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => navigate('/airport-cabs', { state: { vehicle: vehicle.name } })}
                        className="py-1.5 px-1 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-300 text-[11px] font-black flex items-center justify-center gap-1 cursor-pointer transition-all shadow-2xs"
                        title="Book Airport Transfer"
                      >
                        <Plane className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>Airport</span>
                      </button>
                    </div>
                  </div>

                  {/* Primary Service Page Button */}
                  <button
                    type="button"
                    onClick={() => navigate('/outstation-cabs', { state: { vehicle: vehicle.name } })}
                    className="btn-gold w-full py-3.5 text-xs font-black shadow-md flex items-center justify-center gap-1.5 cursor-pointer mt-1 hover:scale-[1.02] transition-all"
                  >
                    <Zap className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
                    <span>Book {vehicle.name.split(' ')[0]} (Open Booking Desk)</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                  </button>

                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default Fleet;
