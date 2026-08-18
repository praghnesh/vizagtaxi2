import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';
import LivePickupMap from '../components/LivePickupMap';
import LocationAutocompleteInput from '../components/LocationAutocompleteInput';
import {
  Plane,
  MapPin,
  Calendar,
  Clock,
  Car,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
  Zap,
  ArrowRight,
  Sparkles,
  Info,
  Compass,
  AlertCircle
} from 'lucide-react';

const popularAirportAreas = [
  { name: 'RK Beach / Pandurangapuram', dist: 18, baseFare: 699, time: '35 Mins' },
  { name: 'Rushikonda Beach & IT Park', dist: 28, baseFare: 899, time: '45 Mins' },
  { name: 'Madhurawada IT SEZ', dist: 25, baseFare: 849, time: '40 Mins' },
  { name: 'Gajuwaka Industrial Hub', dist: 12, baseFare: 599, time: '20 Mins' },
  { name: 'Visakhapatnam Railway Station', dist: 14, baseFare: 549, time: '25 Mins' },
  { name: 'Siripuram & VIP Road', dist: 15, baseFare: 599, time: '25 Mins' },
  { name: 'Simhachalam Temple', dist: 18, baseFare: 649, time: '30 Mins' },
  { name: 'Steel Plant (Ukkunagaram)', dist: 18, baseFare: 699, time: '30 Mins' },
  { name: 'Bheemili Beach Road', dist: 42, baseFare: 1299, time: '65 Mins' },
  { name: 'Anakapalle Town', dist: 28, baseFare: 899, time: '40 Mins' },
  { name: 'Araku Valley Hill Station', dist: 115, baseFare: 3499, time: '3.5 Hrs' }
];

const airportVehicles = [
  { id: 'sedan', name: 'Sedan Car (Dzire / Glanza)', seats: '4 Seats', luggage: '2 Large Bags', multiplier: 1.0, tag: 'Most Economical', image: '/fleet/swift_dzire.png' },
  { id: 'mid_suv', name: 'Mid-Size SUV (Creta / Brezza)', seats: '5 Seats', luggage: '3 Bags', multiplier: 1.2, tag: 'High Clearance', image: '/fleet/mid_suv.png' },
  { id: 'ertiga', name: 'Maruti Ertiga (6-7 Seats)', seats: '6 Seats', luggage: '4 Bags', multiplier: 1.35, popular: true, tag: 'Family Favorite', image: '/fleet/ertiga.png' },
  { id: 'carens', name: 'Kia Carens (6-7 Seats)', seats: '6 Seats', luggage: '4 Bags', multiplier: 1.45, tag: 'Smart Executive', image: '/fleet/kia_carens.png' },
  { id: 'crysta', name: 'Innova Crysta (7 Seats)', seats: '7 Seats', luggage: '5 Bags', multiplier: 1.8, popular: true, tag: 'VIP Bucket Seats', image: '/fleet/innova_crysta.png' },
  { id: 'hycross', name: 'Innova Hycross Hybrid', seats: '7 Seats', luggage: '5 Bags', multiplier: 2.1, tag: 'VIP Hybrid', image: '/fleet/innova_hycross.png' },
  { id: 'fortuner', name: 'Toyota Fortuner 4x4', seats: '7 Seats', luggage: '5 Bags', multiplier: 3.5, tag: 'Ultra VIP SUV', image: '/fleet/fortuner.png' },
  { id: 'tempo_9', name: '9-Seater Tempo Traveller', seats: '9 Seats', luggage: '8 Bags', multiplier: 2.3, tag: 'Group Luxury', image: '/fleet/tempo_traveller.png' },
  { id: 'tempo_12', name: '12-Seater Tempo Traveller', seats: '12 Seats', luggage: '12 Bags', multiplier: 2.6, tag: 'Executive Van', image: '/fleet/tempo_traveller.png' },
  { id: 'tempo_16', name: '16-Seater Force Urbania', seats: '16 Seats', luggage: '15 Bags', multiplier: 3.2, tag: 'Luxury Urbania', image: '/fleet/urbania.png' },
  { id: 'bus_24', name: '24-Seater AC Mini Bus', seats: '24 Seats', luggage: '20 Bags', multiplier: 4.5, tag: 'Group Bus', image: '/fleet/sleeper_bus.png' },
];

const AirportCabsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const passedState = location.state || {};

  const [transferType, setTransferType] = useState(passedState.type || 'drop'); // 'pickup' (from airport) or 'drop' (to airport)
  const [cityLocation, setCityLocation] = useState(passedState.location || 'Rushikonda Beach Resort');
  const [flightNo, setFlightNo] = useState(passedState.flightNo || '6E-452');
  const [travelDate, setTravelDate] = useState(passedState.date || new Date().toISOString().split('T')[0]);
  const [flightTime, setFlightTime] = useState(passedState.time || '14:30');
  const getInitialAirportVehicle = () => {
    if (!passedState.vehicle) return 'sedan';
    const vName = passedState.vehicle.toLowerCase();
    const found = airportVehicles.find(v => vName.includes(v.id) || vName.includes(v.name.toLowerCase().split(' ')[0]));
    return found ? found.id : 'sedan';
  };

  const [selectedVehicleId, setSelectedVehicleId] = useState(getInitialAirportVehicle());
  const [includeGst, setIncludeGst] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  // Selected vehicle & area base calculations
  const vehicle = airportVehicles.find(v => v.id === selectedVehicleId) || airportVehicles[0];
  const matchedArea = popularAirportAreas.find(a => cityLocation.toLowerCase().includes(a.name.toLowerCase().split(' ')[0])) || popularAirportAreas[0];
  
  const baseAreaFare = Math.round(matchedArea.baseFare * vehicle.multiplier);
  const tollAndParking = transferType === 'pickup' ? 100 : 50; // Airport parking slip
  const subtotal = baseAreaFare + tollAndParking;
  const gstAmount = includeGst ? Math.round(subtotal * 0.05) : 0;
  const finalFare = subtotal + gstAmount;

  const twentyPercentAmount = Math.round(finalFare * 0.20);
  const balanceToDriver = finalFare - twentyPercentAmount;

  const handleOpenBooking = (mode = 'twenty') => {
    const bookingPayload = {
      type: transferType === 'pickup' ? 'Airport Pickup Transfer' : 'Airport Drop Transfer',
      pickup: transferType === 'pickup' ? 'Visakhapatnam Intl Airport (VTZ)' : cityLocation,
      destination: transferType === 'pickup' ? cityLocation : 'Visakhapatnam Intl Airport (VTZ)',
      vehicle: vehicle.name,
      flightNo,
      date: travelDate,
      time: flightTime,
      distance: matchedArea.dist,
      estimatedFare: baseAreaFare,
      driverBhatta: 0,
      gstAmount,
      totalAmount: finalFare,
      paymentMode: mode
    };
    setModalData(bookingPayload);
    setModalOpen(true);
  };

  const handleWhatsAppBooking = () => {
    const text = `Hello Vizag Taxi! I would like to book an Airport Cab Transfer:%0A%0A*Service:* ${transferType === 'pickup' ? 'Airport Pickup (Flight Arrival)' : 'Airport Drop (Flight Departure)'}%0A*Flight No:* ${encodeURIComponent(flightNo)}%0A*Date & Flight Time:* ${encodeURIComponent(travelDate)} at ${encodeURIComponent(flightTime)}%0A*Address in Vizag:* ${encodeURIComponent(cityLocation)}%0A*Vehicle:* ${encodeURIComponent(vehicle.name)}%0A%0A*PRICE BREAKDOWN:*%0A• Fixed Transfer Base Fare: ₹${baseAreaFare}%0A• Airport Toll & Entry Permit: ₹${tollAndParking}%0A• GST (5% Tax): ₹${gstAmount}%0A• *FINAL TOTAL FARE:* ₹${finalFare.toLocaleString()}%0A• *20% Advance Token:* ₹${twentyPercentAmount.toLocaleString()} (Balance ₹${balanceToDriver.toLocaleString()} to Driver)%0A%0APlease confirm my airport chauffeur.`;
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar onOpenBookingModal={(type, data) => {
        setModalData(data || {});
        setModalOpen(true);
      }} />

      <main className="flex-1 pt-24 pb-20">
        
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 text-white py-12 md:py-16 px-4 md:px-8 relative overflow-hidden border-b border-slate-800">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 text-xs font-bold shadow-sm">
                <Plane className="w-3.5 h-3.5 text-amber-400" />
                <span>VISAKHAPATNAM INTL AIRPORT (VTZ) 24/7 TAXI DESK</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigate('/outstation-cabs')}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Car className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Outstation Cabs →</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/hourly-rentals')}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Hourly Rentals →</span>
                </button>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight leading-tight">
              Vizag Airport <span className="gradient-text-gold">Pickup & Drop Transfers</span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-2.5 max-w-3xl leading-relaxed">
              Guaranteed zero flight cancellation, free waiting time for delayed flights, professional uniformed chauffeurs, and 20% advance instant gateway confirmation.
            </p>

            <div className="mt-6 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-semibold">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero Cancellation Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>60 Mins Free Flight Delay Waiting</span>
              </div>
              <div className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-emerald-400" />
                <span>Terminal Meet & Greet Included</span>
              </div>
            </div>
          </div>
        </section>

        {/* Airport Booking Form & Map Section */}
        <section className="container mx-auto max-w-6xl px-4 md:px-8 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Column (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
              
              {/* Pickup vs Drop Switcher */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                  SELECT AIRPORT SERVICE TYPE
                </label>
                <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setTransferType('pickup')}
                    className={`py-3 px-4 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      transferType === 'pickup'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                    }`}
                  >
                    <Plane className="w-4 h-4 rotate-45" />
                    <span>Airport Pickup (From VTZ)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTransferType('drop')}
                    className={`py-3 px-4 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      transferType === 'drop'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                    }`}
                  >
                    <Plane className="w-4 h-4 -rotate-45" />
                    <span>Airport Drop (To VTZ)</span>
                  </button>
                </div>
              </div>

              {/* City Address Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{transferType === 'pickup' ? 'Drop Location / Hotel in Vizag' : 'Pickup Location / Hotel in Vizag'}</span>
                </label>
                <LocationAutocompleteInput
                  required
                  value={cityLocation}
                  onChange={(val) => setCityLocation(val)}
                  placeholder="Type hotel name, beach, area or Pincode..."
                  focusColor="focus:border-emerald-500"
                />
              </div>

              {/* Popular Area Quick Chips */}
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-amber-500" />
                  <span>Popular Airport Routes (Click to Auto-Fill):</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {popularAirportAreas.slice(0, 8).map((area) => (
                    <button
                      key={area.name}
                      type="button"
                      onClick={() => setCityLocation(area.name)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                        cityLocation.toLowerCase().includes(area.name.toLowerCase().split(' ')[0])
                          ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-amber-300 hover:bg-amber-50/50'
                      }`}
                    >
                      <span>{area.name.split('/')[0]}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-white text-slate-700 border border-slate-200">
                        {area.dist} KM • ₹{area.baseFare}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Flight Details & Schedule */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Flight Number</label>
                  <input
                    type="text"
                    value={flightNo}
                    onChange={(e) => setFlightNo(e.target.value)}
                    placeholder="e.g. 6E-452 / AI-542"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-bold uppercase"
                  />
                </div>

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
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {transferType === 'pickup' ? 'Landing Time' : 'Pickup Time'}
                  </label>
                  <input
                    type="time"
                    required
                    value={flightTime}
                    onChange={(e) => setFlightTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>
              </div>

            </div>

            {/* Right Map Column (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <LivePickupMap
                initialAddress={cityLocation}
                onSelectLocation={(loc) => setCityLocation(loc.address)}
              />

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-2">
                <div className="flex items-center gap-2 font-black text-amber-800">
                  <Info className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>AIRPORT TRANSFER GUARANTEE</span>
                </div>
                <p className="text-[11px] leading-relaxed text-amber-900 font-medium">
                  • <strong>Meet & Greet Chauffeur</strong>: Driver will wait at VTZ Arrival Gate with your name sign.<br/>
                  • <strong>Flight Delay Guard</strong>: We track your flight live. No extra waiting charges for flight delays up to 60 mins.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Vehicle Selection & Fixed Tariffs */}
        <section className="container mx-auto max-w-6xl px-4 md:px-8 mt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs uppercase font-bold text-amber-600 tracking-wider">AIRPORT FLEET & TARIFFS</span>
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-slate-900">
                Select Your Airport Taxi Model
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-semibold">
              Fixed rate for: <strong className="text-slate-900">{cityLocation} ({matchedArea.dist} KM)</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {airportVehicles.map((veh) => {
              const isSelected = selectedVehicleId === veh.id;
              const cardBase = Math.round(matchedArea.baseFare * veh.multiplier);
              const cardSub = cardBase + tollAndParking;
              const cardGst = includeGst ? Math.round(cardSub * 0.05) : 0;
              const cardTotal = cardSub + cardGst;
              const card20Percent = Math.round(cardTotal * 0.20);

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
                      POPULAR CHOICE
                    </span>
                  )}

                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-20 h-14 bg-slate-100 rounded-2xl flex items-center justify-center p-1 border border-slate-200 overflow-hidden shrink-0">
                        <img
                          src={veh.image}
                          alt={veh.name}
                          className="w-full h-full object-contain"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-sm text-slate-900 leading-snug">{veh.name}</h3>
                        <p className="text-[11px] text-slate-500">{veh.seats} • {veh.luggage}</p>
                        <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded mt-1 border border-emerald-200">
                          {veh.tag}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-200 mb-4">
                      <div className="flex justify-between">
                        <span>Fixed Transfer Fare:</span>
                        <span className="font-bold text-slate-900 font-mono">₹{cardBase.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-amber-700">
                        <span>Airport Parking & Entry:</span>
                        <span className="font-bold font-mono">₹{tollAndParking}</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>GST (5% Tax):</span>
                        <span className="font-bold font-mono">₹{cardGst}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">TOTAL FARE</span>
                        <span className="text-2xl font-black text-slate-900 font-mono">
                          ₹{cardTotal.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
                        Pay 20%: ₹{card20Percent}
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

        {/* Invoice Summary & 20% Payment Gateway Desk */}
        <section className="container mx-auto max-w-6xl px-4 md:px-8 mt-12">
          <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800 relative overflow-hidden">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">AIRPORT TRANSFER SUMMARY</span>
                    <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
                      {vehicle.name}
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-500/30">
                    {transferType === 'pickup' ? 'Airport Pickup' : 'Airport Drop'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
                    <span className="text-[10px] text-slate-400 block font-semibold">FROM</span>
                    <span className="font-bold text-white truncate block">
                      {transferType === 'pickup' ? 'Visakhapatnam Airport (VTZ)' : cityLocation}
                    </span>
                  </div>
                  <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
                    <span className="text-[10px] text-slate-400 block font-semibold">TO</span>
                    <span className="font-bold text-amber-300 truncate block">
                      {transferType === 'pickup' ? cityLocation : 'Visakhapatnam Airport (VTZ)'}
                    </span>
                  </div>
                  <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-slate-400 block font-semibold">FLIGHT / SCHEDULE</span>
                    <span className="font-bold text-emerald-400 font-mono">{flightNo} • {flightTime}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-300 bg-slate-800/40 p-4 rounded-2xl border border-slate-700/80">
                  <div className="flex justify-between">
                    <span>Base Transfer Tariff ({matchedArea.dist} KM):</span>
                    <span className="font-mono text-white font-bold">₹{baseAreaFare.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-amber-300">
                    <span>Airport Parking & Entry Toll:</span>
                    <span className="font-mono font-bold">₹{tollAndParking}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>GST (5% Tax):</span>
                    <span className="font-mono font-bold">₹{gstAmount}</span>
                  </div>
                  <div className="border-t border-slate-700 pt-2.5 flex justify-between items-baseline text-sm">
                    <span className="font-bold text-white uppercase tracking-wider">Total Net Fare:</span>
                    <span className="text-2xl font-black text-amber-400 font-mono">
                      ₹{finalFare.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: 20% Payment Gateway Desk */}
              <div className="lg:col-span-5 bg-slate-800/95 rounded-3xl p-6 border border-slate-700 space-y-4 text-center">
                <div>
                  <span className="text-xs uppercase tracking-widest text-slate-400 font-bold block">CONFIRM AIRPORT RESERVATION</span>
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono mt-1">
                    ₹{finalFare.toLocaleString()}
                  </div>
                  
                  <div className="mt-2.5 p-2.5 rounded-2xl bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold flex items-center justify-between">
                    <span>Pay 20% Now: <strong className="text-white font-mono">₹{twentyPercentAmount.toLocaleString()}</strong></span>
                    <span className="text-slate-400">•</span>
                    <span>Balance to Driver: <strong className="text-emerald-400 font-mono">₹{balanceToDriver.toLocaleString()}</strong></span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={() => handleOpenBooking('twenty')}
                    className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:scale-[1.02]"
                  >
                    <Zap className="w-4 h-4 text-slate-950 fill-slate-950" />
                    <span>Pay 20% Advance (₹{twentyPercentAmount.toLocaleString()}) • Online Gateway</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenBooking('posttrip')}
                    className="w-full py-3 bg-slate-700/80 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-600 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    <span>Pay Post-Trip to Driver (₹0 Advance) →</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppBooking}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-white" />
                    <span>Instant Booking via WhatsApp</span>
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-700/80 flex items-center justify-center gap-3 text-[10px] text-slate-400 font-semibold">
                  <span>Supported:</span>
                  <span className="bg-slate-900 px-2 py-0.5 rounded text-amber-400 font-bold border border-slate-700">UPI / GPay / PhonePe</span>
                  <span className="bg-slate-900 px-2 py-0.5 rounded text-sky-400 font-bold border border-slate-700">Cards</span>
                </div>
              </div>

            </div>

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

export default AirportCabsPage;
