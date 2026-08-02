import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Car, Plane, ShieldCheck, Star, ChevronRight, CheckCircle2, Sparkles, Navigation, Zap, ArrowRight, Repeat } from 'lucide-react';
import LocationAutocompleteInput from './LocationAutocompleteInput';

const Hero = ({ onOpenBookingModal, onOpenHourlyModal }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hourly');

  const [hourlyForm, setHourlyForm] = useState({
    pickup: 'Visakhapatnam Railway Station',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    vehicle: 'Toyota Innova Crysta',
    package: '4 Hours'
  });

  const [outstationForm, setOutstationForm] = useState({
    pickup: 'Vizag City',
    destination: 'Araku Valley',
    tripType: 'Round Trip',
    date: new Date().toISOString().split('T')[0],
    vehicle: 'Maruti Ertiga (6 Seater)'
  });

  const [airportForm, setAirportForm] = useState({
    type: 'drop',
    airport: 'Visakhapatnam Intl Airport (VTZ)',
    location: 'Rushikonda Beach Resort',
    flightNo: '6E-452',
    date: new Date().toISOString().split('T')[0],
    time: '14:30'
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'hourly') {
      navigate('/hourly-rentals', { state: hourlyForm });
    } else {
      let bookingData = {};
      if (activeTab === 'outstation') {
        bookingData = { type: 'Outstation Cab', ...outstationForm };
      } else {
        bookingData = { type: 'Airport Transfer', ...airportForm };
      }
      onOpenBookingModal('form', bookingData);
    }
  };

  const setPresetPickup = (loc) => {
    if (activeTab === 'hourly') setHourlyForm({ ...hourlyForm, pickup: loc });
    if (activeTab === 'outstation') setOutstationForm({ ...outstationForm, pickup: loc });
    if (activeTab === 'airport') setAirportForm({ ...airportForm, location: loc });
  };

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center pt-28 pb-16 lg:py-32 overflow-hidden bg-slate-50 border-b border-slate-200">
      
      {/* Background Soft Coastal Glows */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-amber-200/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-emerald-200/40 rounded-full blur-[160px] pointer-events-none" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e120_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e120_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Brand Statement */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-amber-200 text-amber-700 font-bold text-xs shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="tracking-wide">Visakhapatnam's Premier #1 Taxi & Chauffeur Fleet</span>
              <div className="flex items-center gap-1 ml-2 border-l border-slate-200 pl-2.5 text-amber-600 font-extrabold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-slate-800 text-xs">4.9 / 5 (3,200+ Reviews)</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] font-heading text-slate-900">
              VIZAG <span className="gradient-text-gold">TAXI</span>
              <span className="block text-2xl sm:text-3xl md:text-4xl font-extrabold mt-3 text-slate-700">
                Coastal Highway & Araku Sightseeing Cabs
              </span>
            </h1>

            <p className="text-slate-600 text-base md:text-lg font-normal max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Experience hassle-free city rides, airport drops, and Araku valley hill station tours with <span className="text-amber-700 font-bold">verified local chauffeurs</span> and transparent fixed fares. No surge fees, guaranteed on-time pickup.
            </p>

            {/* Quick Location Pills */}
            <div className="space-y-2 pt-1">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-center lg:justify-start gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                <span>Popular Pickup Spots:</span>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {['RK Beach', 'Rushikonda', 'VTZ Airport', 'Vizag Station', 'Madhurawada', 'Araku Valley'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setPresetPickup(item)}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-700 text-xs font-bold border border-slate-200 hover:border-amber-300 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{item}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <button
                onClick={() => onOpenBookingModal('general')}
                className="btn-gold text-sm px-8 py-4 w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Zap className="w-4 h-4 text-white fill-white" />
                <span>Book Instant Cab Now</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                href="#fleet"
                className="px-8 py-4 text-sm font-bold text-slate-800 rounded-full bg-white border border-slate-300 hover:border-emerald-500 hover:text-emerald-600 transition-all text-center shadow-xs"
              >
                <span>Explore Luxury Fleet</span>
              </a>
            </div>

            {/* Guarantees */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-slate-600 text-xs font-semibold border-t border-slate-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Driver Cancellation</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>24/7 Live GPS Track</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-emerald-600" />
                <span>100% Sanitized AC Fleet</span>
              </div>
            </div>

          </div>

          {/* Right Column: Light Glass Reservation Card */}
          <div className="lg:col-span-5">
            <div className="glass-panel-glow-light p-6 md:p-8 relative overflow-hidden">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">Quick Cab Reservation</h3>
                  <p className="text-xs text-slate-500">Instant SMS & WhatsApp confirmation</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-black border border-amber-200">
                  FIXED FARES
                </span>
              </div>

              {/* 3 Form Tabs */}
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 mb-6">
                <button
                  type="button"
                  onClick={() => setActiveTab('hourly')}
                  className={`py-2 px-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'hourly'
                      ? 'bg-white text-amber-700 font-black shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Hourly</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('outstation')}
                  className={`py-2 px-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'outstation'
                      ? 'bg-white text-emerald-700 font-black shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>Outstation</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('airport')}
                  className={`py-2 px-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'airport'
                      ? 'bg-white text-emerald-700 font-black shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Plane className="w-3.5 h-3.5" />
                  <span>Airport</span>
                </button>
              </div>

              {/* TAB 1: HOURLY RENTALS */}
              {activeTab === 'hourly' && (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span>Pickup Location in Vizag</span>
                    </label>
                    <LocationAutocompleteInput
                      required
                      value={hourlyForm.pickup}
                      onChange={(val) => setHourlyForm({ ...hourlyForm, pickup: val })}
                      placeholder="Type area, city, or 6-digit Pincode..."
                      focusColor="focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Pickup Date</label>
                      <input
                        type="date"
                        required
                        value={hourlyForm.date}
                        onChange={(e) => setHourlyForm({ ...hourlyForm, date: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Pickup Time</label>
                      <input
                        type="time"
                        required
                        value={hourlyForm.time}
                        onChange={(e) => setHourlyForm({ ...hourlyForm, time: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Rental Package Hours Buttons (Volume / Segmented Controls) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>Select Rental Package</span>
                      </span>
                      <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300">
                        {hourlyForm.package}
                      </span>
                    </label>
                    <div className="grid grid-cols-5 gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                      {[
                        { hrs: '4', label: '4 Hrs', full: '4 Hours' },
                        { hrs: '6', label: '6 Hrs', full: '6 Hours' },
                        { hrs: '8', label: '8 Hrs', full: '8 Hours' },
                        { hrs: '10', label: '10 Hrs', full: '10 Hours' },
                        { hrs: '12', label: '12 Hrs', full: '12 Hours' },
                      ].map((pkg) => {
                        const isSelected = hourlyForm.package.startsWith(`${pkg.hrs} `) || hourlyForm.package === `${pkg.hrs} Hours`;
                        return (
                          <button
                            key={pkg.hrs}
                            type="button"
                            onClick={() => setHourlyForm({ ...hourlyForm, package: pkg.full })}
                            className={`py-2.5 px-1 rounded-lg text-center transition-all cursor-pointer flex items-center justify-center ${
                              isSelected
                                ? 'bg-amber-500 text-slate-950 font-black shadow-md border border-amber-400 scale-102'
                                : 'bg-white hover:bg-amber-50 text-slate-700 font-bold border border-slate-200 hover:border-amber-300'
                            }`}
                          >
                            <span className="text-xs font-black">{pkg.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Vehicle Choice</label>
                    <select
                      value={hourlyForm.vehicle}
                      onChange={(e) => setHourlyForm({ ...hourlyForm, vehicle: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                    >
                      <option value="Sedan Car (Dzire / Glanza)">Sedan Car - Dzire / Glanza (4 Seats)</option>
                      <option value="Mid-Size SUV">Mid-Size SUV - Creta / Brezza (5 Seats)</option>
                      <option value="Maruti Ertiga">Maruti Ertiga (6-7 Seats)</option>
                      <option value="Kia Carens">Kia Carens (6-7 Seats)</option>
                      <option value="Innova Crysta">Innova Crysta (7 Seats)</option>
                      <option value="Innova Hycross">Innova Hycross Hybrid (7 Seats)</option>
                      <option value="Toyota Fortuner">Toyota Fortuner 4x4 (7 Seats)</option>
                      <option value="BMW & Audi Luxury">BMW & Audi Luxury (4 Seats)</option>
                      <option value="9-Seater Tempo Traveller">9-Seater AC Tempo Traveller</option>
                      <option value="12-Seater Tempo Traveller">12-Seater AC Tempo Traveller</option>
                      <option value="16-Seater Tempo Traveller">16-Seater Force Urbania / Traveller</option>
                      <option value="17-Seater Tempo Traveller">17-Seater AC Tempo Traveller</option>
                      <option value="20-Seater Tempo Traveller">20-Seater AC Tempo Traveller</option>
                      <option value="24-Seater AC Mini Bus">24-Seater AC Mini Bus</option>
                      <option value="28-Seater AC Mini Bus">28-Seater AC Mini Bus</option>
                      <option value="36-Seater AC Luxury Bus">36-Seater AC Luxury Bus</option>
                      <option value="40-Seater AC Deluxe Coach">40-Seater AC Deluxe Coach</option>
                      <option value="20 Seater + 20 Sleeper AC Bus">20 Seater + 20 Sleeper AC Bus</option>
                      <option value="36 AC Sleeper Bus">36 AC Sleeper Bus</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn-gold w-full py-3.5 text-xs font-black shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Reserve Hourly Cab</span>
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate('/hourly-rentals', { state: hourlyForm })}
                    className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-extrabold text-xs rounded-xl border border-emerald-300 flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-2xs mt-2"
                  >
                    <span>View Complete Hourly Rate Card & Live Map →</span>
                  </button>
                </form>
              )}

              {/* TAB 2: OUTSTATION */}
              {activeTab === 'outstation' && (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  {/* Trip Type Segmented Buttons */}
                  <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setOutstationForm({ ...outstationForm, tripType: 'One Way' })}
                      className={`py-2 px-3 text-xs font-black rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        outstationForm.tripType === 'One Way'
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                      }`}
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                      <span>One Way Drop</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOutstationForm({ ...outstationForm, tripType: 'Round Trip' })}
                      className={`py-2 px-3 text-xs font-black rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        outstationForm.tripType === 'Round Trip'
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                      }`}
                    >
                      <Repeat className="w-3.5 h-3.5" />
                      <span>Round Trip</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Pickup</label>
                      <LocationAutocompleteInput
                        required
                        value={outstationForm.pickup}
                        onChange={(val) => setOutstationForm({ ...outstationForm, pickup: val })}
                        placeholder="Type area or Pincode..."
                        focusColor="focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Destination</label>
                      <LocationAutocompleteInput
                        required
                        value={outstationForm.destination}
                        onChange={(val) => setOutstationForm({ ...outstationForm, destination: val })}
                        placeholder="Type city, area, or Pincode..."
                        focusColor="focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Travel Date</label>
                      <input
                        type="date"
                        required
                        value={outstationForm.date}
                        onChange={(e) => setOutstationForm({ ...outstationForm, date: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Vehicle</label>
                      <select
                        value={outstationForm.vehicle}
                        onChange={(e) => setOutstationForm({ ...outstationForm, vehicle: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-medium"
                      >
                        <option value="Sedan Car (Dzire / Glanza)">Sedan Car - Dzire / Glanza (4 Seats)</option>
                        <option value="Mid-Size SUV">Mid-Size SUV - Creta / Brezza (5 Seats)</option>
                        <option value="Maruti Ertiga">Maruti Ertiga (6-7 Seats)</option>
                        <option value="Kia Carens">Kia Carens (6-7 Seats)</option>
                        <option value="Innova Crysta">Innova Crysta (7 Seats)</option>
                        <option value="Innova Hycross">Innova Hycross Hybrid (7 Seats)</option>
                        <option value="Toyota Fortuner">Toyota Fortuner 4x4 (7 Seats)</option>
                        <option value="BMW & Audi Luxury">BMW & Audi Luxury (4 Seats)</option>
                        <option value="9-Seater Tempo Traveller">9-Seater AC Tempo Traveller</option>
                        <option value="12-Seater Tempo Traveller">12-Seater AC Tempo Traveller</option>
                        <option value="16-Seater Tempo Traveller">16-Seater Force Urbania / Traveller</option>
                        <option value="17-Seater Tempo Traveller">17-Seater AC Tempo Traveller</option>
                        <option value="20-Seater Tempo Traveller">20-Seater AC Tempo Traveller</option>
                        <option value="24-Seater AC Mini Bus">24-Seater AC Mini Bus</option>
                        <option value="28-Seater AC Mini Bus">28-Seater AC Mini Bus</option>
                        <option value="36-Seater AC Luxury Bus">36-Seater AC Luxury Bus</option>
                        <option value="40-Seater AC Deluxe Coach">40-Seater AC Deluxe Coach</option>
                        <option value="20 Seater + 20 Sleeper AC Bus">20 Seater + 20 Sleeper AC Bus</option>
                        <option value="36 AC Sleeper Bus">36 AC Sleeper Bus</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-cyan w-full py-3.5 text-xs font-black shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Reserve Outstation Ride</span>
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                </form>
              )}

              {/* TAB 3: AIRPORT */}
              {activeTab === 'airport' && (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAirportForm({ ...airportForm, type: 'pickup' })}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        airportForm.type === 'pickup'
                          ? 'bg-emerald-600 text-white border-emerald-600 font-extrabold shadow-sm'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      Airport Pickup
                    </button>
                    <button
                      type="button"
                      onClick={() => setAirportForm({ ...airportForm, type: 'drop' })}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        airportForm.type === 'drop'
                          ? 'bg-emerald-600 text-white border-emerald-600 font-extrabold shadow-sm'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      Airport Drop
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {airportForm.type === 'pickup' ? 'Drop Address in Vizag' : 'Pickup Address in Vizag'}
                    </label>
                    <LocationAutocompleteInput
                      required
                      value={airportForm.location}
                      onChange={(val) => setAirportForm({ ...airportForm, location: val })}
                      placeholder="Type area, city, or 6-digit Pincode..."
                      focusColor="focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Date</label>
                      <input
                        type="date"
                        required
                        value={airportForm.date}
                        onChange={(e) => setAirportForm({ ...airportForm, date: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Flight Time</label>
                      <input
                        type="time"
                        required
                        value={airportForm.time}
                        onChange={(e) => setAirportForm({ ...airportForm, time: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-full shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer hover:scale-102 transition-all"
                  >
                    <span>Reserve Airport Taxi</span>
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
