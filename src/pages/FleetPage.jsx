import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';
import {
  Car,
  Users,
  Briefcase,
  Wind,
  Fuel,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Plane,
  Zap,
  ArrowRight,
  Sparkles,
  Phone,
  MessageCircle,
  Award,
  ChevronRight
} from 'lucide-react';

const fullFleetData = [
  {
    id: 'sedan-car',
    category: 'Sedans',
    name: 'Sedan Car (Dzire / Glanza / Etios)',
    subtitle: 'Executive 4-Seater AC Sedan for City & Outstation',
    passengers: '4 Seats',
    seats: '4 Seats',
    luggage: '2 Large Bags',
    ac: 'Chilled Dual AC',
    fuel: 'Petrol / Diesel',
    image: '/fleet/swift_dzire.png',
    popular: true,
    hourlyRate: '₹1,500 (4h) / ₹2,500 (8h)',
    outstationRate: '₹14 / km',
    airportRate: '₹699 fixed',
    driverBhatta: '₹300 / day',
    features: ['Push Back Comfortable Seats', 'Bluetooth Audio & AUX', 'Chilled Water Bottles', 'Clean & Sanitized Daily', 'USB Mobile Fast Charging'],
  },
  {
    id: 'mid-size-suv',
    category: 'Family SUVs',
    name: 'Mid-Size SUV (Creta / Brezza / S-Cross)',
    subtitle: 'Comfortable 5-Seater High Ground Clearance SUV',
    passengers: '5 Seats',
    seats: '5 Seats',
    luggage: '3 Bags',
    ac: 'Auto Climate AC',
    fuel: 'Petrol / Diesel',
    image: '/fleet/mid_suv.png',
    popular: false,
    hourlyRate: '₹1,800 (4h) / ₹2,800 (8h)',
    outstationRate: '₹15 / km',
    airportRate: '₹799 fixed',
    driverBhatta: '₹300 / day',
    features: ['High Ground Clearance', 'Comfortable Suspension for Ghat Roads', 'Spacious Boot Space', 'Rear AC Vents'],
  },
  {
    id: 'ertiga',
    category: 'Family SUVs',
    name: 'Maruti Ertiga (6-7 Seater)',
    subtitle: 'Spacious 6-7 Seater Family Cruiser MPV',
    passengers: '6-7 Seats',
    seats: '6-7 Seats',
    luggage: '4 Bags',
    ac: 'Rear Independent AC',
    fuel: 'Diesel / Petrol',
    image: '/fleet/ertiga.png',
    popular: true,
    hourlyRate: '₹2,000 (4h) / ₹3,000 (8h)',
    outstationRate: '₹16 / km',
    airportRate: '₹899 fixed',
    driverBhatta: '₹300 / day',
    features: ['Extra Legroom in All Rows', 'Roof Mounted Rear AC Vents', 'First Aid Kit & Sanitizer', 'Foldable 3rd Row for Extra Luggage'],
  },
  {
    id: 'kia-carens',
    category: 'Family SUVs',
    name: 'Kia Carens Premium MPV',
    subtitle: 'Premium 6-7 Seater Smart Family MPV with 3-Zone Cooling',
    passengers: '6-7 Seats',
    seats: '6-7 Seats',
    luggage: '4 Bags',
    ac: '3-Zone Cooling AC',
    fuel: 'Diesel / Petrol',
    image: '/fleet/kia_carens.png',
    popular: true,
    hourlyRate: '₹2,300 (4h) / ₹3,200 (8h)',
    outstationRate: '₹18 / km',
    airportRate: '₹999 fixed',
    driverBhatta: '₹300 / day',
    features: ['Ambient Interior Lighting', 'Ventilated Seating', 'Rear AC Digital Controls', 'Ultra Smooth Highway Ride'],
  },
  {
    id: 'innova-crysta',
    category: 'Luxury Cars',
    name: 'Toyota Innova Crysta (7-Seater)',
    subtitle: 'Ultra Luxury 7-Seater with Captain Bucket Seats',
    passengers: '7 Seats',
    seats: '7 Seats',
    luggage: '5 Bags',
    ac: 'Auto Climate Dual AC',
    fuel: 'Diesel',
    image: '/fleet/innova_crysta.png',
    popular: true,
    hourlyRate: '₹3,000 (4h) / ₹3,800 (8h)',
    outstationRate: '₹20 / km',
    airportRate: '₹1,299 fixed',
    driverBhatta: '₹500 / day',
    features: ['Leather Captain Bucket Seats', 'Ambient Cabin Mood Lighting', 'Ghat Road Tuned Suspension', 'High-Speed Mobile Chargers on All Rows'],
  },
  {
    id: 'innova-hycross',
    category: 'Luxury Cars',
    name: 'Toyota Innova Hycross Hybrid',
    subtitle: 'Next-Gen VIP Hybrid 7-Seater Luxury MPV',
    passengers: '7 Seats',
    seats: '7 Seats',
    luggage: '5 Bags',
    ac: 'Multi-Zone Climate AC',
    fuel: 'Hybrid / Petrol',
    image: '/fleet/innova_hycross.png',
    popular: true,
    hourlyRate: '₹3,200 (4h) / ₹4,000 (8h)',
    outstationRate: '₹22 / km',
    airportRate: '₹1,499 fixed',
    driverBhatta: '₹500 / day',
    features: ['Panoramic Sunroof Glass', 'Ottoman Reclining Calf Rest Seats', 'Whisper Quiet Hybrid Engine', 'Ultra Plush Air Quality Filter'],
  },
  {
    id: 'fortuner',
    category: 'Luxury Cars',
    name: 'Toyota Fortuner 4x4 Premium',
    subtitle: 'Commanding 7-Seater 4x4 VIP Luxury SUV',
    passengers: '7 Seats',
    seats: '7 Seats',
    luggage: '5 Bags',
    ac: 'Dual Zone Auto AC',
    fuel: 'Diesel 4x4',
    image: '/fleet/fortuner.png',
    popular: true,
    hourlyRate: '₹12,000 (10h) / ₹14,000 (12h)',
    outstationRate: '₹45 / km',
    airportRate: '₹2,499 fixed',
    driverBhatta: '₹500 / day',
    features: ['VIP Escort & Wedding Luxury', 'High Ground Clearance 4x4 Capability', 'Full Leather Upholstery', 'JBL Premium Surround Audio'],
  },
  {
    id: 'bmw-audi',
    category: 'Luxury Cars',
    name: 'BMW & Audi Executive VIP Fleet',
    subtitle: 'Ultra Executive German VIP Sedan & SUV',
    passengers: '4 Seats',
    seats: '4 Seats',
    luggage: '3 Bags',
    ac: 'Quad Zone Climate AC',
    fuel: 'Petrol / Diesel',
    image: '/fleet/bmw_audi.png',
    popular: false,
    hourlyRate: '₹15,000 (10h) / ₹17,600 (12h)',
    outstationRate: '₹50 / km',
    airportRate: '₹3,499 fixed',
    driverBhatta: '₹500 / day',
    features: ['VIP Delegations & High-End Corporate', 'Premium Leather Interiors', 'Suit-Clad Chauffeur Service', 'Red Carpet Welcome Protocol'],
  },
  {
    id: 'tempo-9-seater',
    category: 'Tempo Travellers',
    name: '9-Seater Luxury AC Tempo Traveller',
    subtitle: '9-Seater Luxury AC Van with 1x1 Maharaja Pushback Seats',
    passengers: '9 Seats',
    seats: '9 Seats',
    luggage: '8 Bags',
    ac: 'Roof Mounted AC',
    fuel: 'Diesel',
    image: '/fleet/tempo_traveller.png',
    popular: false,
    hourlyRate: '₹6,000 (10h) / ₹7,000 (12h)',
    outstationRate: '₹25 / km',
    airportRate: '₹1,999 fixed',
    driverBhatta: '₹500 / day',
    features: ['1x1 Maharaja Reclining Seats', 'LED TV & Karaoke Music System', 'Ample Legroom & High Roof Walk-In', 'Individual Mobile Charging Points'],
  },
  {
    id: 'tempo-12-seater',
    category: 'Tempo Travellers',
    name: '12-Seater Executive Tempo Traveller',
    subtitle: '12-Seater Executive Group Tourist Van',
    passengers: '12 Seats',
    seats: '12 Seats',
    luggage: '10 Bags',
    ac: 'Ducted AC Vents',
    fuel: 'Diesel',
    image: '/fleet/tempo_traveller.png',
    popular: true,
    hourlyRate: '₹6,500 (10h) / ₹7,500 (12h)',
    outstationRate: '₹30 / km',
    airportRate: '₹2,299 fixed',
    driverBhatta: '₹500 / day',
    features: ['Reclining Push Back Seats', 'High Bass Surround Sound System', 'Spacious Central Aisle', 'Roof Luggage Carrier & Boot Space'],
  },
  {
    id: 'tempo-16-urbania',
    category: 'Tempo Travellers',
    name: '16-Seater Force Urbania VIP Luxury',
    subtitle: 'Next-Gen Ultra Luxury Monocoque Tourist Van',
    passengers: '16 Seats',
    seats: '16 Seats',
    luggage: '15 Bags',
    ac: 'Individual Overhead AC',
    fuel: 'Diesel',
    image: '/fleet/urbania.png',
    popular: true,
    hourlyRate: '₹8,000 (10h) / ₹9,400 (12h)',
    outstationRate: '₹35 / km',
    airportRate: '₹2,799 fixed',
    driverBhatta: '₹500 / day',
    features: ['Mercedes-Derived Monocoque Body', 'Zero Noise Cabin & Aircraft-Grade Seats', 'Panoramic View Windows', 'USB-C Charging & Reading Lights'],
  },
  {
    id: 'bus-24-seater',
    category: 'Buses & Sleepers',
    name: '24-Seater AC Mini Coach Bus',
    subtitle: '24-Seater Air Conditioned Tour & Corporate Bus',
    passengers: '24 Seats',
    seats: '24 Seats',
    luggage: '20 Bags',
    ac: 'Heavy Duty Roof AC',
    fuel: 'Diesel',
    image: '/fleet/luxury_mini_bus.png',
    popular: false,
    hourlyRate: '₹9,000 (10h) / ₹10,600 (12h)',
    outstationRate: '₹40 / km',
    airportRate: '₹3,499 fixed',
    driverBhatta: '₹700 / day',
    features: ['2x2 High Back Pushback Seats', 'Air Suspension for Smooth Ride', 'Microphone & Tour Guide PA System', 'Huge Underbody Luggage Hold'],
  },
  {
    id: 'bus-36-seater',
    category: 'Buses & Sleepers',
    name: '36-Seater AC Luxury Coach Bus',
    subtitle: '36-Seater Luxury Long Distance Group Tourist Coach',
    passengers: '36 Seats',
    seats: '36 Seats',
    luggage: '30 Bags',
    ac: 'Central Climate AC',
    fuel: 'Diesel',
    image: '/fleet/sleeper_bus.png',
    popular: false,
    hourlyRate: '₹11,000 (10h) / ₹13,000 (12h)',
    outstationRate: '₹55 / km',
    airportRate: '₹4,499 fixed',
    driverBhatta: '₹800 / day',
    features: ['Full Recliner Ergonomic Seats', 'Dual LED Entertainment Screens', 'Air Suspension on All Axles', 'Emergency First Aid & Fire Retardant'],
  }
];

const FleetPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const categories = ['All', 'Sedans', 'Family SUVs', 'Luxury Cars', 'Tempo Travellers', 'Buses & Sleepers'];

  const filteredFleet = activeCategory === 'All'
    ? fullFleetData
    : fullFleetData.filter((item) => item.category === activeCategory);

  const handleBookVehicle = (veh) => {
    navigate('/outstation-cabs', { state: { vehicle: veh.name } });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar onOpenBookingModal={(type, data) => {
        setModalData(data || {});
        setModalOpen(true);
      }} />

      <main className="flex-1 pt-24 pb-20">
        
        {/* Header Hero */}
        <section className="bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 text-white py-14 px-4 md:px-8 border-b border-slate-800 relative overflow-hidden">
          <div className="container mx-auto max-w-6xl relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-amber-400 text-xs font-bold mb-3 shadow-sm">
              <Car className="w-4 h-4 text-emerald-400" />
              <span>OFFICIAL VERIFIED FLEET SHOWROOM</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight leading-tight">
              Our Luxury <span className="gradient-text-gold">Vehicle Fleet</span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-2.5 max-w-2xl mx-auto leading-relaxed">
              Explore our sanitized, GPS-equipped, commercial permit vehicles ranging from executive sedans to luxury 36-seater coaches.
            </p>

            {/* Guarantees Bar */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-semibold">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Commercial Taxi Permits</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Verified Uniformed Chauffeurs</span>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-sky-400" />
                <span>Sanitized Dual AC Guaranteed</span>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="container mx-auto max-w-6xl px-4 md:px-8 mt-8">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md scale-105 border border-amber-400'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-2xs'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Vehicle Fleet Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFleet.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-amber-400 group shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Header */}
                <div className="relative h-52 overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />

                  {/* Seat Badge */}
                  <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md text-amber-400 font-black px-3 py-1 rounded-full text-xs border border-amber-400/40 shadow-sm flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>{vehicle.seats}</span>
                  </div>

                  {vehicle.popular && (
                    <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-black px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider shadow-xs">
                      POPULAR CHOICE
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">{vehicle.category}</span>
                    <h3 className="text-base sm:text-lg font-black text-white font-heading leading-tight truncate">
                      {vehicle.name}
                    </h3>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  
                  {/* Specs Matrix */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-200">
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

                  {/* Tariff Snapshot */}
                  <div className="space-y-1.5 text-xs text-slate-600 bg-amber-50/50 p-3 rounded-2xl border border-amber-200/60">
                    <div className="flex justify-between">
                      <span className="font-bold text-slate-700">Outstation Rate:</span>
                      <span className="font-black text-amber-800 font-mono">{vehicle.outstationRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-slate-700">Hourly Rental:</span>
                      <span className="font-black text-slate-900 font-mono">{vehicle.hourlyRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-slate-700">Airport Transfer:</span>
                      <span className="font-black text-emerald-800 font-mono">{vehicle.airportRate}</span>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-1">
                    {vehicle.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* 3 Quick Service Selection Buttons */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                      Choose Service Booking:
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        type="button"
                        onClick={() => navigate('/hourly-rentals', { state: { vehicle: vehicle.name } })}
                        className="py-2 px-1 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-black flex items-center justify-center gap-1 cursor-pointer transition-all shadow-2xs"
                      >
                        <Clock className="w-3 h-3 text-amber-600 shrink-0" />
                        <span>Hourly</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => navigate('/outstation-cabs', { state: { vehicle: vehicle.name } })}
                        className="py-2 px-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-[11px] font-black flex items-center justify-center gap-1 cursor-pointer transition-all shadow-2xs"
                      >
                        <Car className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>Outstation</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => navigate('/airport-cabs', { state: { vehicle: vehicle.name } })}
                        className="py-2 px-1 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-300 text-[11px] font-black flex items-center justify-center gap-1 cursor-pointer transition-all shadow-2xs"
                      >
                        <Plane className="w-3 h-3 text-sky-600 shrink-0" />
                        <span>Airport</span>
                      </button>
                    </div>
                  </div>

                  {/* Primary Large Book Button */}
                  <button
                    type="button"
                    onClick={() => handleBookVehicle(vehicle)}
                    className="btn-gold w-full py-3.5 text-xs font-black shadow-md flex items-center justify-center gap-1.5 cursor-pointer mt-1 hover:scale-[1.01] transition-all"
                  >
                    <Zap className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
                    <span>Book {vehicle.name.split(' ')[0]} (Go to Booking Desk)</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                  </button>

                </div>
              </div>
            ))}
          </div>

        </section>

      </main>

      <Footer />

      {modalOpen && (
        <BookingModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          modalData={modalData}
        />
      )}
    </div>
  );
};

export default FleetPage;
