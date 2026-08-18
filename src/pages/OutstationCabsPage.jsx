import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';
import RouteMiniMap, { computeDistanceKm } from '../components/RouteMiniMap';
import LocationAutocompleteInput from '../components/LocationAutocompleteInput';
import {
  Car,
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  Repeat,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
  Zap,
  Info,
  DollarSign,
  Sparkles,
  Compass,
  Sliders,
  ChevronRight,
  FileText
} from 'lucide-react';

const vehicleFleet = [
  {
    id: 'sedan',
    name: 'Sedan Car (Dzire / Glanza)',
    seats: '4 Passengers',
    luggage: '2 Medium Bags',
    ratePerKm: 12,
    bhattaPerDay: 300,
    tag: 'Economical & AC Comfort',
    image: '/fleet/swift_dzire.png'
  },
  {
    id: 'mid_suv',
    name: 'Mid-Size SUV (Creta / Brezza)',
    seats: '5 Passengers',
    luggage: '3 Bags',
    ratePerKm: 14,
    bhattaPerDay: 300,
    tag: 'Spacious & High Ground Clearance',
    image: '/fleet/mid_suv.png'
  },
  {
    id: 'ertiga',
    name: 'Maruti Ertiga (6-7 Seats)',
    seats: '6 Passengers',
    luggage: '3-4 Bags',
    ratePerKm: 16,
    bhattaPerDay: 300,
    tag: 'Family Favorite MUV',
    popular: true,
    image: '/fleet/ertiga.png'
  },
  {
    id: 'carens',
    name: 'Kia Carens (6-7 Seats)',
    seats: '6 Passengers',
    luggage: '4 Bags',
    ratePerKm: 17,
    bhattaPerDay: 300,
    tag: 'Smart Luxury Executive MPV',
    image: '/fleet/kia_carens.png'
  },
  {
    id: 'crysta',
    name: 'Innova Crysta (7 Seats)',
    seats: '7 Passengers',
    luggage: '5 Large Bags',
    ratePerKm: 22,
    bhattaPerDay: 500,
    tag: 'Captain Seats & Hill Station Master',
    popular: true,
    image: '/fleet/innova_crysta.png'
  },
  {
    id: 'hycross',
    name: 'Innova Hycross Hybrid (7 Seats)',
    seats: '7 Passengers',
    luggage: '5 Large Bags',
    ratePerKm: 25,
    bhattaPerDay: 500,
    tag: 'VIP Luxury Hybrid Ride',
    image: '/fleet/innova_hycross.png'
  },
  {
    id: 'fortuner',
    name: 'Toyota Fortuner 4x4 (7 Seats)',
    seats: '7 Passengers',
    luggage: '5 Bags',
    ratePerKm: 38,
    bhattaPerDay: 500,
    tag: 'Ultra VIP 4x4 Power',
    image: '/fleet/fortuner.png'
  },
  {
    id: 'tempo_9',
    name: '9-Seater AC Tempo Traveller',
    seats: '9 Passengers',
    luggage: '9 Bags',
    ratePerKm: 24,
    bhattaPerDay: 500,
    tag: 'Recliner Pushback Group Luxury',
    image: '/fleet/tempo_traveller.png'
  },
  {
    id: 'tempo_12',
    name: '12-Seater AC Tempo Traveller',
    seats: '12 Passengers',
    luggage: '12 Bags',
    ratePerKm: 26,
    bhattaPerDay: 500,
    tag: 'Executive Family & Tourist Van',
    image: '/fleet/tempo_traveller.png'
  },
  {
    id: 'tempo_16',
    name: '16-Seater Force Urbania',
    seats: '16 Passengers',
    luggage: '15 Bags',
    ratePerKm: 30,
    bhattaPerDay: 500,
    tag: 'Ultra-Modern Force Urbania Luxury',
    image: '/fleet/urbania.png'
  },
  {
    id: 'tempo_17',
    name: '17-Seater AC Tempo Traveller',
    seats: '17 Passengers',
    luggage: '16 Bags',
    ratePerKm: 32,
    bhattaPerDay: 500,
    tag: 'Large Group Pilgrimage & Tour Van',
    image: '/fleet/tempo_traveller.png'
  },
  {
    id: 'tempo_20',
    name: '20-Seater AC Tempo Traveller',
    seats: '20 Passengers',
    luggage: '20 Bags',
    ratePerKm: 35,
    bhattaPerDay: 500,
    tag: 'Spacious 20-Seater AC Van',
    image: '/fleet/tempo_traveller.png'
  },
  {
    id: 'bus_24',
    name: '24-Seater AC Mini Bus',
    seats: '24 Passengers',
    luggage: '25 Bags',
    ratePerKm: 42,
    bhattaPerDay: 700,
    tag: 'Corporate & Wedding AC Coach',
    image: '/fleet/sleeper_bus.png'
  },
  {
    id: 'bus_36',
    name: '36-Seater AC Luxury Bus',
    seats: '36 Passengers',
    luggage: '35 Bags',
    ratePerKm: 55,
    bhattaPerDay: 800,
    tag: 'Grand Tourist Coach',
    image: '/fleet/sleeper_bus.png'
  }
];

const popularOutstationPresets = [
  { name: 'Araku Valley', dist: 115, time: '3.5 Hrs', desc: 'Hill station, Borra Caves & Coffee Plantations' },
  { name: 'Lambasingi', dist: 135, time: '4.5 Hrs', desc: 'South India Kashmir, Apple Orchards & Mist' },
  { name: 'Annavaram', dist: 125, time: '3 Hrs', desc: 'Sri Satyanarayana Swamy Shrine & Pampa River' },
  { name: 'Srikakulam', dist: 110, time: '2.5 Hrs', desc: 'Arasavalli Sun Temple & Srimukhalingam' },
  { name: 'Kakinada', dist: 155, time: '3.5 Hrs', desc: 'Smart Port City, Coringa Wildlife Sanctuary & Kakinada Kaja' },
  { name: 'Rajahmundry', dist: 195, time: '4.5 Hrs', desc: 'Historic Godavari River, Havlock Bridge & Temples' },
  { name: 'Vijayawada', dist: 350, time: '7.5 Hrs', desc: 'Kanaka Durga Temple & Prakasam Barrage' },
  { name: 'Hyderabad', dist: 620, time: '12 Hrs', desc: 'Telangana Capital, Charminar & HITEC City' },
  { name: 'Jagdalpur', dist: 295, time: '7 Hrs', desc: 'Chitrakote Niagara of India & Bastar Waterfalls' },
  { name: 'Bhubaneswar', dist: 440, time: '9 Hrs', desc: 'Odisha Temple City & Lingaraj Shrine' },
  { name: 'Tirupati', dist: 750, time: '14 Hrs', desc: 'Lord Venkateswara Balaji Seven Hills Temple' }
];

const OutstationCabsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Initial State from navigation or defaults
  const passedState = location.state || {};
  
  const [tripType, setTripType] = useState(passedState.tripType || 'One Way'); // 'One Way' or 'Round Trip'
  const [pickup, setPickup] = useState(passedState.pickup || 'Vizag City');
  const [destination, setDestination] = useState(passedState.destination || 'Araku Valley');
  const [travelDate, setTravelDate] = useState(passedState.date || new Date().toISOString().split('T')[0]);
  const [travelTime, setTravelTime] = useState('07:00');
  const [daysCount, setDaysCount] = useState(1);
  const getInitialVehicleId = () => {
    if (!passedState.vehicle) return 'ertiga';
    const vName = passedState.vehicle.toLowerCase();
    const found = vehicleFleet.find(v => vName.includes(v.id) || vName.includes(v.name.toLowerCase().split(' ')[0]));
    return found ? found.id : 'ertiga';
  };

  const [selectedVehicleId, setSelectedVehicleId] = useState(getInitialVehicleId());
  const [customDistance, setCustomDistance] = useState(computeDistanceKm(passedState.pickup || 'Vizag City', passedState.destination || 'Araku Valley'));
  const [includeGst, setIncludeGst] = useState(true);

  // Booking Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  // Update distance when pickup or destination changes
  useEffect(() => {
    const km = computeDistanceKm(pickup, destination);
    setCustomDistance(km);
  }, [pickup, destination]);

  // Find selected vehicle object
  const vehicle = vehicleFleet.find((v) => v.id === selectedVehicleId) || vehicleFleet[0];

  // -------------------------------------------------------------
  // EXACT PRICING CALCULATION ACCORDING TO USER SPECIFICATIONS
  // -------------------------------------------------------------
  // One Way:
  // - Up to 50 km: Base = ₹5,000 + 5% GST + Driver Bhatta
  // - Above 50 km: Base = ₹5,000 + (Distance - 50) * PerKmRate + 5% GST + Driver Bhatta
  // Round Trip:
  // - Standard market pricing: (Billable KM * Rate) + (Days * Bhatta) + 5% GST (Min 250 km/day benchmark)
  // -------------------------------------------------------------
  const oneWayDistance = Number(customDistance) || 50;
  const isOneWay = tripType === 'One Way';

  let baseFare = 0;
  let extraKmCharge = 0;
  let extraKmCount = 0;
  let totalBhatta = 0;
  let gstAmount = 0;
  let finalFare = 0;
  let billableKm = 0;

  if (isOneWay) {
    baseFare = 5000;
    if (oneWayDistance > 50) {
      extraKmCount = oneWayDistance - 50;
      extraKmCharge = extraKmCount * vehicle.ratePerKm;
    } else {
      extraKmCount = 0;
      extraKmCharge = 0;
    }
    totalBhatta = vehicle.bhattaPerDay; // 1 day bhatta
    const subtotal = baseFare + extraKmCharge;
    gstAmount = includeGst ? Math.round(subtotal * 0.05) : 0;
    finalFare = subtotal + totalBhatta + gstAmount;
    billableKm = oneWayDistance;
  } else {
    // Round Trip
    const roundKm = oneWayDistance * 2;
    const minDailyKm = daysCount * 250;
    billableKm = Math.max(roundKm, minDailyKm);
    baseFare = billableKm * vehicle.ratePerKm;
    extraKmCharge = 0;
    extraKmCount = 0;
    totalBhatta = vehicle.bhattaPerDay * daysCount;
    gstAmount = includeGst ? Math.round(baseFare * 0.05) : 0;
    finalFare = baseFare + totalBhatta + gstAmount;
  }

  const handleOpenBooking = (mode = 'twenty') => {
    const bookingPayload = {
      type: `${tripType} Outstation Cab`,
      pickup,
      destination,
      vehicle: vehicle.name,
      date: travelDate,
      time: travelTime,
      distance: billableKm,
      daysCount: isOneWay ? 1 : daysCount,
      estimatedFare: isOneWay ? (baseFare + extraKmCharge) : baseFare,
      driverBhatta: totalBhatta,
      gstAmount,
      totalAmount: finalFare,
      paymentMode: mode,
      isOneWay
    };
    setModalData(bookingPayload);
    setModalOpen(true);
  };

  const handlePay20Percent = () => {
    handleOpenBooking('twenty');
  };

  const handleSelectPreset = (preset) => {
    setDestination(preset.name);
    setCustomDistance(preset.dist);
  };

  const handleWhatsAppInstantBook = () => {
    const text = `Hello Vizag Taxi! I would like to reserve an Outstation Cab:%0A%0A*Trip Type:* ${encodeURIComponent(tripType)}%0A*Pickup:* ${encodeURIComponent(pickup)}%0A*Destination:* ${encodeURIComponent(destination)}%0A*Travel Date:* ${encodeURIComponent(travelDate)} at ${encodeURIComponent(travelTime)}%0A*Selected Vehicle:* ${encodeURIComponent(vehicle.name)}%0A*Total Distance:* ${billableKm} KM ${!isOneWay ? `(${daysCount} Days Round Trip)` : '(One Way Drop)'}%0A%0A*PRICE BREAKDOWN:*%0A• ${isOneWay ? (oneWayDistance <= 50 ? 'Base Fare (Up to 50 KM): ₹5,000' : `Base Fare (First 50 KM): ₹5,000%0A• Extra KM Fare (${extraKmCount} KM @ ₹${vehicle.ratePerKm}/km): ₹${extraKmCharge}`) : `Base Distance Fare (${billableKm} KM @ ₹${vehicle.ratePerKm}/km): ₹${baseFare}`}%0A• Driver Bhatta Allowance: ₹${totalBhatta} (${isOneWay ? '1 Day' : `${daysCount} Days`} @ ₹${vehicle.bhattaPerDay}/day)%0A• GST (5% Tax): ₹${gstAmount}%0A• *FINAL ESTIMATED FARE:* ₹${finalFare.toLocaleString()}%0A%0APlease confirm my cab driver and vehicle allocation.`;
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Top Navigation */}
      <Navbar onOpenBookingModal={(type, data) => {
        setModalData(data || {});
        setModalOpen(true);
      }} />

      {/* Main Container */}
      <main className="flex-1 pt-24 pb-20">
        
        {/* Hero Banner with Title & Navigation Switcher */}
        <section className="relative bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 text-white py-12 md:py-16 px-4 md:px-8 overflow-hidden border-b border-slate-800">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto max-w-6xl relative z-10">
            
            {/* Breadcrumb & Badges */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 text-xs font-bold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>VIZAG OUTSTATION TAXI & INTERCITY DROPS</span>
              </div>

              {/* Quick Mode Buttons: Outstation vs Tour Packages vs Hourly */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigate('/tour-packages')}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs border border-amber-400/40 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>Looking for Sightseeing? View Tour Packages →</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/hourly-rentals')}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition-all hidden sm:flex items-center gap-1.5 cursor-pointer"
                >
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Hourly City Rentals</span>
                </button>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight leading-tight">
              Vizag Outstation <span className="gradient-text-gold">One-Way Drops & Round Trips</span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-2.5 max-w-3xl leading-relaxed">
              Transparent, fixed distance-based tariffs with certified highway chauffeurs. Choose between direct One-Way drops or multi-day Round Trips across Andhra Pradesh, Telangana, Odisha & Pan-India.
            </p>

            {/* Quick Guarantees Bar */}
            <div className="mt-6 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-semibold">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero Driver Cancellation Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Driver Bhatta Allowance Included / Itemized</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-emerald-400" />
                <span>100% Sanitized AC Vehicles</span>
              </div>
            </div>

          </div>
        </section>

        {/* Interactive Booking & Route Map Section */}
        <section className="container mx-auto max-w-6xl px-4 md:px-8 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Input Form & Controls (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
              
              {/* Trip Type Segmented Tabs */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                  SELECT TRIP TYPE
                </label>
                <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setTripType('One Way')}
                    className={`py-3 px-4 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isOneWay
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                    }`}
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>One Way Drop (Direct)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTripType('Round Trip')}
                    className={`py-3 px-4 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      !isOneWay
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                    }`}
                  >
                    <Repeat className="w-4 h-4" />
                    <span>Round Trip (Return)</span>
                  </button>
                </div>
              </div>

              {/* Pickup & Destination Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Pickup Location in Vizag</span>
                  </label>
                  <LocationAutocompleteInput
                    required
                    value={pickup}
                    onChange={(val) => setPickup(val)}
                    placeholder="Type area or Pincode..."
                    focusColor="focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>Destination City / Spot</span>
                  </label>
                  <LocationAutocompleteInput
                    required
                    value={destination}
                    onChange={(val) => setDestination(val)}
                    placeholder="Type city or town..."
                    focusColor="focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Popular Destination Presets */}
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-amber-500" />
                  <span>Popular Outstation Routes (Click to Auto-Select):</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {popularOutstationPresets.map((preset) => {
                    const isSelected = destination.toLowerCase().includes(preset.name.toLowerCase());
                    return (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => handleSelectPreset(preset)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-amber-300 hover:bg-amber-50/50'
                        }`}
                      >
                        <span>{preset.name}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-white text-slate-700 border border-slate-200">
                          {preset.dist} KM
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Travel Date, Time & Days (if Round Trip) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Travel Date</label>
                  <input
                    type="date"
                    required
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Pickup Time</label>
                  <input
                    type="time"
                    required
                    value={travelTime}
                    onChange={(e) => setTravelTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>

                {!isOneWay && (
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Trip Duration</label>
                    <select
                      value={daysCount}
                      onChange={(e) => setDaysCount(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-bold"
                    >
                      <option value={1}>1 Day (Same Day Return)</option>
                      <option value={2}>2 Days / 1 Night</option>
                      <option value={3}>3 Days / 2 Nights</option>
                      <option value={4}>4 Days / 3 Nights</option>
                      <option value={5}>5 Days / 4 Nights</option>
                      <option value={6}>6 Days / 5 Nights</option>
                      <option value={7}>7 Days / 6 Nights</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Distance Slider / Adjuster */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-emerald-600" />
                    <span>One-Way Highway Distance:</span>
                  </span>
                  <span className="text-emerald-700 text-sm font-black font-mono">
                    {customDistance} KM {isOneWay ? '' : `(${customDistance * 2} KM Round Trip)`}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="800"
                  step="5"
                  value={customDistance}
                  onChange={(e) => setCustomDistance(Number(e.target.value))}
                  className="w-full cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                  <span>10 KM (Nearby)</span>
                  <span>50 KM (Base Benchmark)</span>
                  <span>150 KM (Araku/Kakinada)</span>
                  <span>800 KM (Long Distance)</span>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Interactive Mini Route Map (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <RouteMiniMap
                pickup={pickup}
                destination={destination}
                tripType={tripType}
                onDistanceCalculated={(km) => setCustomDistance(km)}
              />

              {/* Fare Rule Summary Notification Box */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-2">
                <div className="flex items-center gap-2 font-black text-amber-800">
                  <Info className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>TRANSPARENT PRICING GUARANTEE</span>
                </div>
                {isOneWay ? (
                  <p className="text-[11px] leading-relaxed text-amber-900 font-medium">
                    • <strong>Up to 50 KM</strong>: Flat default base fare <strong>₹5,000 + 5% GST + Driver Bhatta</strong>.<br/>
                    • <strong>Above 50 KM</strong>: <strong>₹5,000</strong> (for first 50 KM) + <strong>KM Rate for extra distance</strong> + <strong>5% GST + Driver Bhatta</strong>.
                  </p>
                ) : (
                  <p className="text-[11px] leading-relaxed text-amber-900 font-medium">
                    • <strong>Round Trip</strong>: Standard market distance tariff ({vehicle.name.split(' ')[0]} @ ₹{vehicle.ratePerKm}/km) + Driver Bhatta (₹{vehicle.bhattaPerDay}/day) + 5% GST. Minimum benchmark 250 km/day.
                  </p>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* VEHICLE SELECTION & LIVE TARIFF MATRIX */}
        <section className="container mx-auto max-w-6xl px-4 md:px-8 mt-12">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs uppercase font-bold text-amber-600 tracking-wider">CHOOSE YOUR FLEET</span>
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-slate-900">
                Vehicle Fleet & Itemized Tariffs
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-semibold">
              Showing pricing for: <strong className="text-slate-900">{billableKm} KM {tripType}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicleFleet.map((veh) => {
              const isSelected = selectedVehicleId === veh.id;
              
              // Calculate for this card
              let cardBase = 0;
              let cardExtra = 0;
              let cardBhatta = 0;
              let cardGst = 0;
              let cardTotal = 0;

              if (isOneWay) {
                cardBase = 5000;
                if (oneWayDistance > 50) {
                  cardExtra = (oneWayDistance - 50) * veh.ratePerKm;
                }
                cardBhatta = veh.bhattaPerDay;
                const sub = cardBase + cardExtra;
                cardGst = includeGst ? Math.round(sub * 0.05) : 0;
                cardTotal = sub + cardBhatta + cardGst;
              } else {
                const roundKm = oneWayDistance * 2;
                const minDaily = daysCount * 250;
                const bKm = Math.max(roundKm, minDaily);
                cardBase = bKm * veh.ratePerKm;
                cardBhatta = veh.bhattaPerDay * daysCount;
                cardGst = includeGst ? Math.round(cardBase * 0.05) : 0;
                cardTotal = cardBase + cardBhatta + cardGst;
              }

              return (
                <div
                  key={veh.id}
                  onClick={() => setSelectedVehicleId(veh.id)}
                  className={`bg-white rounded-3xl p-5 border transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                    isSelected
                      ? 'border-emerald-500 shadow-xl ring-2 ring-emerald-500/30'
                      : 'border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  {veh.popular && (
                    <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black tracking-wide">
                      MOST POPULAR
                    </span>
                  )}

                  <div>
                    {/* Vehicle Image & Info */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-20 h-14 bg-slate-100 rounded-2xl flex items-center justify-center p-1 border border-slate-200 overflow-hidden shrink-0">
                        <img
                          src={veh.image}
                          alt={veh.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-sm text-slate-900 leading-snug">{veh.name}</h3>
                        <p className="text-[11px] text-slate-500">{veh.seats} • {veh.luggage}</p>
                        <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded mt-1 border border-emerald-200">
                          ₹{veh.ratePerKm}/KM
                        </span>
                      </div>
                    </div>

                    {/* Price Breakdown in Card */}
                    <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-200 mb-4">
                      <div className="flex justify-between">
                        <span>{isOneWay ? (oneWayDistance <= 50 ? 'Base Fare (≤50 KM):' : 'Base Fare (First 50 KM):') : 'Distance Base Fare:'}</span>
                        <span className="font-bold text-slate-900 font-mono">₹{cardBase.toLocaleString()}</span>
                      </div>

                      {isOneWay && oneWayDistance > 50 && (
                        <div className="flex justify-between text-sky-700">
                          <span>Extra {oneWayDistance - 50} KM (@₹{veh.ratePerKm}):</span>
                          <span className="font-bold font-mono">₹{cardExtra.toLocaleString()}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-amber-700">
                        <span>Driver Bhatta ({isOneWay ? '1 Day' : `${daysCount} Days`}):</span>
                        <span className="font-bold font-mono">₹{cardBhatta.toLocaleString()}</span>
                      </div>

                      <div className="flex justify-between text-slate-500">
                        <span>GST (5% Tax):</span>
                        <span className="font-bold font-mono">₹{cardGst.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div>
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">FINAL ESTIMATED FARE</span>
                        <span className="text-2xl font-black text-slate-900 font-mono">
                          ₹{cardTotal.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
                        All-Inclusive
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVehicleId(veh.id);
                        handleOpenBooking('twenty');
                      }}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>Book {veh.name.split(' ')[0]}</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </section>

        {/* SELECTED VEHICLE INVOICE CHECKOUT DESK */}
        <section className="container mx-auto max-w-6xl px-4 md:px-8 mt-12">
          <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800 relative overflow-hidden">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Detailed Tariff Receipt */}
              <div className="lg:col-span-7 space-y-4">
                
                <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">OUTSTATION BOOKING SUMMARY</span>
                    <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
                      {vehicle.name}
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-500/30">
                    {tripType}
                  </span>
                </div>

                {/* Itinerary Specs */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
                    <span className="text-[10px] text-slate-400 block font-semibold">FROM</span>
                    <span className="font-bold text-white truncate block">{pickup}</span>
                  </div>
                  <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
                    <span className="text-[10px] text-slate-400 block font-semibold">TO</span>
                    <span className="font-bold text-amber-300 truncate block">{destination}</span>
                  </div>
                  <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-slate-400 block font-semibold">BILLABLE DISTANCE</span>
                    <span className="font-bold text-emerald-400 font-mono">{billableKm} KM</span>
                  </div>
                </div>

                {/* Itemized Line Items */}
                <div className="space-y-2 text-xs text-slate-300 bg-slate-800/40 p-4 rounded-2xl border border-slate-700/80">
                  <div className="flex justify-between">
                    <span>{isOneWay ? (oneWayDistance <= 50 ? 'Base Minimum Fare (Up to 50 KM):' : 'Base Minimum Fare (First 50 KM):') : `Base Distance Fare (${billableKm} KM @ ₹${vehicle.ratePerKm}/km):`}</span>
                    <span className="font-mono text-white font-bold">₹{baseFare.toLocaleString()}</span>
                  </div>

                  {isOneWay && oneWayDistance > 50 && (
                    <div className="flex justify-between text-sky-300">
                      <span>Extra Distance ({extraKmCount} KM @ ₹${vehicle.ratePerKm}/km):</span>
                      <span className="font-mono font-bold">₹{extraKmCharge.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-amber-300">
                    <span>Driver Bhatta ({isOneWay ? '1 Day' : `${daysCount} Days`} @ ₹{vehicle.bhattaPerDay}/day):</span>
                    <span className="font-mono font-bold">₹{totalBhatta.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-slate-400">
                    <span>GST (5% Tax):</span>
                    <span className="font-mono font-bold">₹{gstAmount.toLocaleString()}</span>
                  </div>

                  <div className="border-t border-slate-700 pt-2.5 flex justify-between items-baseline text-sm">
                    <span className="font-bold text-white uppercase tracking-wider">Total Net Estimated Fare:</span>
                    <span className="text-2xl font-black text-amber-400 font-mono">
                      ₹{finalFare.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Inclusions & Exclusions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] pt-1">
                  <div className="text-emerald-300 space-y-1">
                    <div className="font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>INCLUDED:</span>
                    </div>
                    <p className="text-slate-300">Private AC Cab, Fuel, Driver Bhatta, Doorstep Pickup</p>
                  </div>
                  <div className="text-amber-300 space-y-1">
                    <div className="font-bold flex items-center gap-1">
                      <Info className="w-3.5 h-3.5 text-amber-400" />
                      <span>HIGHWAY TOLLS:</span>
                    </div>
                    <p className="text-slate-300">Toll receipts & interstate permit (if any) paid direct as actuals</p>
                  </div>
                </div>

              </div>

              {/* Right Column: Instant CTAs */}
              <div className="lg:col-span-5 bg-slate-800/95 rounded-3xl p-6 border border-slate-700 space-y-4 text-center">
                
                <div>
                  <span className="text-xs uppercase tracking-widest text-slate-400 font-bold block">CONFIRM YOUR RESERVATION</span>
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono mt-1">
                    ₹{finalFare.toLocaleString()}
                  </div>
                  
                  {/* 20% Advance Breakdown Pill */}
                  <div className="mt-2.5 p-2.5 rounded-2xl bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold flex items-center justify-between">
                    <span>Pay 20% Now: <strong className="text-white font-mono">₹{Math.round(finalFare * 0.20).toLocaleString()}</strong></span>
                    <span className="text-slate-400">•</span>
                    <span>Balance to Driver: <strong className="text-emerald-400 font-mono">₹{(finalFare - Math.round(finalFare * 0.20)).toLocaleString()}</strong></span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {/* PRIMARY 20% ADVANCE PAYMENT GATEWAY BUTTON */}
                  <button
                    type="button"
                    onClick={handlePay20Percent}
                    className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:scale-[1.02]"
                  >
                    <Zap className="w-4 h-4 text-slate-950 fill-slate-950" />
                    <span>Pay 20% Advance (₹{Math.round(finalFare * 0.20).toLocaleString()}) • Online Gateway</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenBooking('posttrip')}
                    className="w-full py-3 bg-slate-700/80 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-600 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    <span>Other Payment Modes (Pay Post-Trip / Full Pay) →</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppInstantBook}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-white" />
                    <span>Instant Booking via WhatsApp</span>
                  </button>

                  <a
                    href="tel:9876543210"
                    className="w-full py-2.5 text-slate-400 hover:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all block"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>24/7 Helpline: +91 98765 43210</span>
                  </a>
                </div>

                {/* Payment Gateway Trust Icons */}
                <div className="pt-2 border-t border-slate-700/80 flex items-center justify-center gap-3 text-[10px] text-slate-400 font-semibold">
                  <span>Supported:</span>
                  <span className="bg-slate-900 px-2 py-0.5 rounded text-amber-400 font-bold border border-slate-700">UPI / GPay / PhonePe</span>
                  <span className="bg-slate-900 px-2 py-0.5 rounded text-sky-400 font-bold border border-slate-700">Cards</span>
                  <span className="bg-slate-900 px-2 py-0.5 rounded text-emerald-400 font-bold border border-slate-700">NetBanking</span>
                </div>

              </div>

            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />

      {/* Booking Checkout Modal */}
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

export default OutstationCabsPage;
