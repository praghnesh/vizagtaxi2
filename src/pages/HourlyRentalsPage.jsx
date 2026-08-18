import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Car, MapPin, CheckCircle, ShieldCheck, ArrowRight, Info, MessageCircle, Phone, Compass, Fuel, CheckCircle2, Zap } from 'lucide-react';
import LivePickupMap from '../components/LivePickupMap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';

const hourlyPackagesData = [
  { id: '4h', label: '4 Hrs / 40 KM', hours: 4, km: 40 },
  { id: '6h', label: '6 Hrs / 60 KM', hours: 6, km: 60 },
  { id: '8h', label: '8 Hrs / 80 KM', hours: 8, km: 80 },
  { id: '10h', label: '10 Hrs / 100 KM', hours: 10, km: 100 },
  { id: '12h', label: '12 Hrs / 120 KM', hours: 12, km: 120 },
];

const hourlyFleetTariffs = [
  {
    id: 'sedan',
    name: 'Sedan Car (Dzire / Glanza)',
    category: 'Sedans & SUVs',
    seats: '4 Seats',
    image: '/fleet/swift_dzire.png',
    rates: { '4h': 1500, '6h': 2000, '8h': 2500, '10h': 3000, '12h': 3500 },
    extraHr: 200,
    extraKm: 14,
    driverBhatta: 250,
    minPackageHours: 4,
  },
  {
    id: 'mid_suv',
    name: 'Mid-Size SUV (Creta / Brezza)',
    category: 'Sedans & SUVs',
    seats: '5 Seats',
    image: '/fleet/mid_suv.png',
    rates: { '4h': 1800, '6h': 2400, '8h': 2800, '10h': 3300, '12h': 3800 },
    extraHr: 230,
    extraKm: 15,
    driverBhatta: 250,
    minPackageHours: 4,
  },
  {
    id: 'ertiga',
    name: 'Maruti Ertiga',
    category: 'Sedans & SUVs',
    seats: '6-7 Seats',
    image: '/fleet/ertiga.png',
    rates: { '4h': 2000, '6h': 2500, '8h': 3000, '10h': 3500, '12h': 4200 },
    extraHr: 280,
    extraKm: 16,
    driverBhatta: 250,
    minPackageHours: 4,
  },
  {
    id: 'carens',
    name: 'Kia Carens',
    category: 'Sedans & SUVs',
    seats: '6-7 Seats',
    image: '/fleet/kia_carens.png',
    rates: { '4h': 2300, '6h': 2800, '8h': 3200, '10h': 3800, '12h': 4500 },
    extraHr: 300,
    extraKm: 18,
    driverBhatta: 300,
    minPackageHours: 4,
  },
  {
    id: 'crysta',
    name: 'Innova Crysta',
    category: 'Luxury Cars',
    seats: '7 Seats',
    image: '/fleet/innova_crysta.png',
    rates: { '4h': 3000, '6h': 3400, '8h': 3800, '10h': 4500, '12h': 5200 },
    extraHr: 300,
    extraKm: 20,
    driverBhatta: 300,
    minPackageHours: 4,
  },
  {
    id: 'hycross',
    name: 'Innova Hycross Hybrid',
    category: 'Luxury Cars',
    seats: '7 Seats',
    image: '/fleet/innova_hycross.png',
    rates: { '4h': 3200, '6h': 3600, '8h': 4000, '10h': 5000, '12h': 6000 },
    extraHr: 350,
    extraKm: 22,
    driverBhatta: 300,
    minPackageHours: 4,
  },
  {
    id: 'fortuner',
    name: 'Toyota Fortuner 4x4',
    category: 'Luxury Cars',
    seats: '7 Seats',
    image: '/fleet/fortuner.png',
    rates: { '10h': 12000, '12h': 14000 },
    extraHr: 1000,
    extraKm: 45,
    driverBhatta: 500,
    minPackageHours: 10,
  },
  {
    id: 'bmw_audi',
    name: 'BMW & Audi Luxury',
    category: 'Luxury Cars',
    seats: '4 Seats',
    image: '/fleet/bmw_audi.png',
    rates: { '10h': 15000, '12h': 17600 },
    extraHr: 1300,
    extraKm: 50,
    driverBhatta: 500,
    minPackageHours: 10,
  },
  {
    id: 'tempo_9',
    name: '9-Seater Tempo Traveller',
    category: 'Tempo Travellers',
    seats: '9 Seats',
    image: '/fleet/tempo_traveller.png',
    rates: { '10h': 6000, '12h': 7000 },
    extraHr: 500,
    extraKm: 25,
    driverBhatta: 500,
    minPackageHours: 10,
  },
  {
    id: 'tempo_12',
    name: '12-Seater Tempo Traveller',
    category: 'Tempo Travellers',
    seats: '12 Seats',
    image: '/fleet/tempo_traveller.png',
    rates: { '10h': 6500, '12h': 7500 },
    extraHr: 500,
    extraKm: 30,
    driverBhatta: 500,
    minPackageHours: 10,
  },
  {
    id: 'tempo_16',
    name: '16-Seater Force Urbania',
    category: 'Tempo Travellers',
    seats: '16 Seats',
    image: '/fleet/urbania.png',
    rates: { '10h': 8000, '12h': 9400 },
    extraHr: 700,
    extraKm: 35,
    driverBhatta: 500,
    minPackageHours: 10,
  },
  {
    id: 'tempo_17',
    name: '17-Seater Tempo Traveller',
    category: 'Tempo Travellers',
    seats: '17 Seats',
    image: '/fleet/tempo_traveller.png',
    rates: { '10h': 7000, '12h': 8200 },
    extraHr: 600,
    extraKm: 32,
    driverBhatta: 500,
    minPackageHours: 10,
  },
  {
    id: 'tempo_20',
    name: '20-Seater Tempo Traveller',
    category: 'Tempo Travellers',
    seats: '20 Seats',
    image: '/fleet/tempo_traveller.png',
    rates: { '10h': 8000, '12h': 9400 },
    extraHr: 700,
    extraKm: 35,
    driverBhatta: 500,
    minPackageHours: 10,
  },
  {
    id: 'bus_24',
    name: '24-Seater AC Mini Bus',
    category: 'Buses & Sleepers',
    seats: '24 Seats',
    image: '/fleet/luxury_mini_bus.png',
    rates: { '10h': 9000, '12h': 10600 },
    extraHr: 800,
    extraKm: 40,
    driverBhatta: 700,
    minPackageHours: 10,
  },
  {
    id: 'bus_28',
    name: '28-Seater AC Mini Bus',
    category: 'Buses & Sleepers',
    seats: '28 Seats',
    image: '/fleet/luxury_mini_bus.png',
    rates: { '10h': 9500, '12h': 11100 },
    extraHr: 800,
    extraKm: 45,
    driverBhatta: 700,
    minPackageHours: 10,
  },
  {
    id: 'bus_36',
    name: '36-Seater AC Luxury Bus',
    category: 'Buses & Sleepers',
    seats: '36 Seats',
    image: '/fleet/luxury_bus.png',
    rates: { '10h': 11000, '12h': 12800 },
    extraHr: 900,
    extraKm: 50,
    driverBhatta: 700,
    minPackageHours: 10,
  },
  {
    id: 'bus_40',
    name: '40-Seater AC Deluxe Coach',
    category: 'Buses & Sleepers',
    seats: '40 Seats',
    image: '/fleet/luxury_bus.png',
    rates: { '10h': 12000, '12h': 14000 },
    extraHr: 1000,
    extraKm: 60,
    driverBhatta: 700,
    minPackageHours: 10,
  },
  {
    id: 'bus_20_20_sleeper',
    name: '20 Seater + 20 Sleeper AC Bus',
    category: 'Buses & Sleepers',
    seats: '20 Seats + 20 Sleepers',
    image: '/fleet/sleeper_bus.png',
    rates: { '10h': 13000, '12h': 15200 },
    extraHr: 1100,
    extraKm: 65,
    driverBhatta: 800,
    minPackageHours: 10,
  },
  {
    id: 'bus_36_sleeper',
    name: '36 AC Sleeper Bus',
    category: 'Buses & Sleepers',
    seats: '36 Sleepers',
    image: '/fleet/sleeper_bus.png',
    rates: { '10h': 12500, '12h': 14500 },
    extraHr: 1000,
    extraKm: 60,
    driverBhatta: 800,
    minPackageHours: 10,
  },
];

const HourlyRentalsPage = ({ onOpenBookingModal }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const stateData = location?.state || {};

  const getPackageIdFromState = (pkgStr) => {
    if (!pkgStr) return '4h';
    const match = String(pkgStr).match(/(\d+)/);
    if (match) {
      const hrs = parseInt(match[1], 10);
      const found = hourlyPackagesData.find((p) => p.hours === hrs);
      if (found) return found.id;
    }
    return '4h';
  };

  const initialPkgId = getPackageIdFromState(stateData.package);

  const [selectedPkgId, setSelectedPkgId] = useState(initialPkgId);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [pickupLocation, setPickupLocation] = useState({
    address: stateData.pickup || 'Visakhapatnam Railway Station',
    lat: 17.7214,
    lng: 83.2986,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (stateData.package) {
      const newPkgId = getPackageIdFromState(stateData.package);
      setSelectedPkgId(newPkgId);
    }
    if (stateData.pickup) {
      setPickupLocation((prev) => ({ ...prev, address: stateData.pickup }));
    }
  }, [location.state]);

  const currentPkg = hourlyPackagesData.find((p) => p.id === selectedPkgId) || hourlyPackagesData[2];

  const categories = ['All', 'Sedans & SUVs', 'Luxury Cars', 'Tempo Travellers', 'Buses & Sleepers'];

  const filteredFleet = selectedCategory === 'All'
    ? hourlyFleetTariffs
    : hourlyFleetTariffs.filter((v) => v.category === selectedCategory);

  const handleBooking = (typeOrVehicle, dataOrFare, mode = 'twenty') => {
    if (typeof typeOrVehicle === 'string') {
      setModalData(dataOrFare || {});
      setIsModalOpen(true);
      return;
    }
    const vehicle = typeOrVehicle || {};
    const fare = dataOrFare;
    const data = {
      type: 'Hourly Rental',
      vehicle: vehicle.name || 'Sedan Car',
      package: currentPkg?.label || '8 Hrs / 80 KM',
      estimatedFare: fare || 2500,
      driverBhatta: vehicle.driverBhatta || 250,
      extraHr: vehicle.extraHr || 200,
      extraKm: vehicle.extraKm || 14,
      pickup: pickupLocation?.address || 'Visakhapatnam Railway Station',
      paymentMode: mode
    };
    if (onOpenBookingModal) {
      onOpenBookingModal('hourly', data);
    } else {
      setModalData(data);
      setIsModalOpen(true);
    }
  };

  const constructWhatsAppMsg = (vehicle, fare) => {
    const text = `Hello Vizag Taxi! I want to book an Hourly Rental Cab.%0A%0A*Package:* ${encodeURIComponent(currentPkg?.label || '8 Hrs / 80 KM')}%0A*Vehicle:* ${encodeURIComponent(vehicle?.name || 'Cab')}%0A*Estimated Fare:* ₹${fare}%0A*Pickup Point:* ${encodeURIComponent(pickupLocation?.address || 'Visakhapatnam')}%0A*Extra Hr Rate:* ₹${vehicle?.extraHr || 200}/hr%0A*Extra KM Rate:* ₹${vehicle?.extraKm || 14}/km%0A*Driver Bhatta:* ₹${vehicle?.driverBhatta || 250}/day`;
    return `https://wa.me/919876543210?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-amber-500 selection:text-white font-sans antialiased">
      {/* Top Navbar */}
      <Navbar onOpenBookingModal={handleBooking} />

      {/* Main Dedicated Page Header */}
      <section className="pt-28 pb-12 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold transition-all mb-4 border border-slate-700 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Vizag Taxi Home</span>
          </Link>

          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>OFFICIAL HOURLY CAB RENTAL BOOKING ROUTE</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight">
              Hourly Cab Rentals <span className="gradient-text-cyan">& Live Pickup Map</span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl">
              Book local city cabs for 4 Hrs, 6 Hrs, 8 Hrs, 10 Hrs, or 12 Hrs with zero surge pricing. Select your vehicle, set your exact pickup spot on the live interactive map, and confirm instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Page Body Container */}
      <main className="container mx-auto px-4 md:px-8 py-10 space-y-8">
        
        {/* Controls Section: Package Selector & Category Tabs */}
        <div className="bg-white p-5 md:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-2">
              <Clock className="w-4.5 h-4.5 text-amber-600" />
              <span>Step 1: Choose Your Hourly Package Duration:</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {hourlyPackagesData.map((pkg) => {
                const isSelected = selectedPkgId === pkg.id;
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setSelectedPkgId(pkg.id)}
                    className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-md scale-102 ring-2 ring-amber-400/40'
                        : 'bg-slate-50 hover:bg-amber-50 text-slate-700 border-slate-200 font-bold'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-black">{pkg.label}</div>
                    <div className="text-[10px] sm:text-xs opacity-80 mt-0.5 font-semibold">({pkg.km} KM Included)</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-500 mr-2">Filter Vehicle Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white font-black shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Section: Left (Vehicle Tariffs) & Right (Live Location Map & Rules) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Fleet Cards (7 Cols) - Shown below map on mobile, left on desktop */}
          <div className="lg:col-span-7 space-y-4 order-2 lg:order-1">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-slate-900 font-heading uppercase tracking-wider flex items-center gap-2">
                <Car className="w-5 h-5 text-emerald-600" />
                <span>Available Vehicles for {currentPkg.label}</span>
              </h2>
              <span className="text-xs font-bold text-slate-500">
                {filteredFleet.length} Options Available
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredFleet.map((vehicle) => {
                const fare = vehicle.rates[selectedPkgId];
                const isMinPkgRestricted = vehicle.minPackageHours > currentPkg.hours;

                return (
                  <div
                    key={vehicle.id}
                    className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                      isMinPkgRestricted
                        ? 'border-slate-200 opacity-80 bg-slate-50/70'
                        : 'border-slate-200 hover:border-amber-400 hover:shadow-md'
                    }`}
                  >
                    {/* Image */}
                    <div className="relative h-40 overflow-hidden bg-slate-100 shrink-0">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                      <span className="absolute top-3 right-3 bg-slate-900/90 text-amber-400 text-xs font-black px-2.5 py-1 rounded-full border border-amber-400/30">
                        {vehicle.seats}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest block">
                          {vehicle.category}
                        </span>
                        <h3 className="text-base font-black text-slate-900 font-heading leading-tight mt-0.5">
                          {vehicle.name}
                        </h3>
                      </div>

                      {/* Pricing & Min Pkg Check */}
                      {isMinPkgRestricted ? (
                        <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl text-xs text-amber-900 space-y-1">
                          <div className="font-extrabold text-amber-800 flex items-center gap-1.5">
                            <Info className="w-4 h-4 text-amber-600 shrink-0" />
                            <span>Min 10 Hrs Package Required</span>
                          </div>
                          <p className="text-[11px] text-amber-700">
                            This vehicle is available for 10 Hrs (₹{vehicle.rates['10h']?.toLocaleString()}) & 12 Hrs packages.
                          </p>
                          <button
                            type="button"
                            onClick={() => setSelectedPkgId('10h')}
                            className="mt-1 text-xs font-black text-amber-800 underline cursor-pointer"
                          >
                            Switch to 10 Hrs Package →
                          </button>
                        </div>
                      ) : (
                        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500 font-bold">Base Package Rate:</span>
                            <span className="text-2xl font-black text-amber-600 font-mono">
                              ₹{fare?.toLocaleString()}
                            </span>
                          </div>

                          {/* Extra Charges */}
                          <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-700 pt-2 border-t border-slate-200">
                            <div>• Extra Hr: <strong className="text-slate-900">₹{vehicle.extraHr}/hr</strong></div>
                            <div>• Extra KM: <strong className="text-slate-900">₹{vehicle.extraKm}/km</strong></div>
                            <div>• Driver Bhatta: <strong className="text-slate-900">₹{vehicle.driverBhatta}/day</strong></div>
                            <div>• Toll & Parking: <strong className="text-emerald-700">Actuals</strong></div>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      {!isMinPkgRestricted ? (
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <a
                            href={constructWhatsAppMsg(vehicle, fare)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-xs"
                          >
                            <MessageCircle className="w-4 h-4 text-white" />
                            <span>WhatsApp</span>
                          </a>

                          <button
                            type="button"
                            onClick={() => handleBooking(vehicle, fare, 'twenty')}
                            className="btn-gold py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <Zap className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                            <span>20% Advance (₹{Math.round((fare || 1500) * 0.20)})</span>
                          </button>
                        </div>
                      ) : null}

                    </div>

                  </div>
                );
              })}
            </div>

          </div>

          {/* Column 2: Interactive Live Pickup Map & Terms (5 Cols) - Shown on top on mobile, right on desktop */}
          <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
            
            {/* Live Location Map */}
            <div className="h-[400px]">
              <LivePickupMap
                initialAddress={pickupLocation.address}
                onSelectLocation={(loc) => setPickupLocation(loc)}
              />
            </div>

            {/* Transparent Rate Card Rules */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 space-y-4 shadow-md">
              <div className="flex items-center gap-2 text-amber-400 font-black text-sm font-heading">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span>TRANSPARENT HOURLY TARIFF RULES</span>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-medium">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Driver Bhatta:</strong> Calculated per day as specified per vehicle type (₹250 - ₹800).</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Tolls & Parking:</strong> Charged at actual highway booth receipts. Zero hidden commissions.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Fortuner, Luxury & Buses:</strong> Available for minimum 10 Hrs (100 KM) & 12 Hrs (120 KM) packages.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Extra Usage:</strong> Beyond package limits, exact per-hour & per-km charges apply.</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Need custom bus packages?</span>
                <a
                  href="tel:+919876543210"
                  className="text-amber-400 hover:text-amber-300 text-xs font-bold flex items-center gap-1.5"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Dispatch Desk</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Booking Modal Fallback */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalData={modalData}
      />

      {/* Footer */}
      <Footer onOpenBookingModal={handleBooking} />
    </div>
  );
};

export default HourlyRentalsPage;
