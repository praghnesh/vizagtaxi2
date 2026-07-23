import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Car, Plane, ShieldCheck, Star, ChevronRight, CheckCircle2, Sparkles } from 'lucide-react';

const Hero = ({ onOpenBookingModal }) => {
  const [activeTab, setActiveTab] = useState('hourly'); // 'hourly' | 'outstation' | 'airport'

  // Form states
  const [hourlyForm, setHourlyForm] = useState({
    pickup: 'Visakhapatnam Railway Station',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    vehicle: 'Toyota Innova Crysta',
    package: '8 Hours (80 KM)'
  });

  const [outstationForm, setOutstationForm] = useState({
    pickup: 'Vizag City',
    destination: 'Araku Valley',
    tripType: 'Round Trip',
    date: new Date().toISOString().split('T')[0],
    vehicle: 'Maruti Ertiga (6 Seater)'
  });

  const [airportForm, setAirportForm] = useState({
    type: 'drop', // 'pickup' | 'drop'
    airport: 'Visakhapatnam Intl Airport (VTZ)',
    location: 'Rushikonda Beach Resort',
    flightNo: '6E-452',
    date: new Date().toISOString().split('T')[0],
    time: '14:30'
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    let bookingData = {};
    if (activeTab === 'hourly') {
      bookingData = { type: 'Hourly Rental', ...hourlyForm };
    } else if (activeTab === 'outstation') {
      bookingData = { type: 'Outstation Cab', ...outstationForm };
    } else {
      bookingData = { type: 'Airport Transfer', ...airportForm };
    }
    onOpenBookingModal('form', bookingData);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-16 lg:py-36 overflow-hidden bg-slate-950">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.png"
          alt="Vizag Coastal Highway Sunrise"
          className="w-full h-full object-cover object-center scale-105 transform animate-pulse duration-[10000ms]"
        />
        {/* Gradients overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/50" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Brand Statement */}
          <div className="lg:col-span-7 space-y-6 text-white text-center lg:text-left">
            
            {/* Top Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-orange-400 font-semibold text-xs md:text-sm shadow-xl">
              <Sparkles className="w-4 h-4 text-orange-400 animate-spin" />
              <span>Visakhapatnam's #1 Rated Luxury Cab Service</span>
              <div className="flex items-center gap-0.5 ml-2 border-l border-white/20 pl-2 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="text-white text-xs font-bold">4.9 / 5</span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-none">
              <span className="block text-white">VIZAG TAXI</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-400 mt-2">
                Premium Taxi Services Across Vizag
              </span>
            </h1>

            {/* Subheading Badges */}
            <p className="text-slate-300 text-lg md:text-xl font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Experience seamless coastal highway rides, airport pickups, Araku hill tours, and outstation trips in top-maintained AC vehicles with professional verified chauffeurs.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-2">
              {['Airport Transfers', 'Local Trips', 'Outstation Cabs', 'Corporate Travel', 'Hourly Rentals'].map((item) => (
                <div
                  key={item}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1.5 backdrop-blur-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => onOpenBookingModal('general')}
                className="btn btn-orange text-base px-8 py-4 w-full sm:w-auto shadow-2xl hover:scale-105"
              >
                <span>Book Taxi Now</span>
                <ChevronRight className="w-5 h-5" />
              </button>

              <a
                href="#packages"
                className="btn btn-outline-white text-base px-8 py-4 w-full sm:w-auto"
              >
                <span>Explore Tour Packages</span>
              </a>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-slate-300 text-xs font-semibold">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Verified Chauffeurs</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400" />
                <span>24/7 On-Time Pickup Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-amber-400" />
                <span>Sanitized & Clean Fleet</span>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Interactive Floating Booking Card */}
          <div className="lg:col-span-5">
            <div className="glass-card-dark p-6 md:p-8 shadow-2xl relative border border-white/20 overflow-hidden transform lg:hover:-translate-y-1 transition-transform duration-500">
              
              {/* Card Accent Lights */}
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>Quick Cab Reservation</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Instant booking confirmation in 60 seconds</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-orange-500/20 text-orange-400 text-xs font-bold border border-orange-500/30">
                  Best Rates
                </span>
              </div>

              {/* 3 Form Tabs */}
              <div className="grid grid-cols-3 gap-1 bg-slate-900/80 p-1 rounded-2xl border border-white/10 mb-6">
                <button
                  type="button"
                  onClick={() => setActiveTab('hourly')}
                  className={`py-2.5 px-2 text-xs font-bold rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                    activeTab === 'hourly'
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Hourly</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('outstation')}
                  className={`py-2.5 px-2 text-xs font-bold rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                    activeTab === 'outstation'
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>Outstation</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('airport')}
                  className={`py-2.5 px-2 text-xs font-bold rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                    activeTab === 'airport'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Plane className="w-3.5 h-3.5" />
                  <span>Airport</span>
                </button>
              </div>

              {/* TAB 1: HOURLY RENTALS FORM */}
              {activeTab === 'hourly' && (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-orange-400" />
                      <span>Pickup Location in Vizag</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={hourlyForm.pickup}
                      onChange={(e) => setHourlyForm({ ...hourlyForm, pickup: e.target.value })}
                      placeholder="e.g. RK Beach, Siripuram, Gajuwaka..."
                      className="w-full bg-slate-900/90 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Pickup Date</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={hourlyForm.date}
                        onChange={(e) => setHourlyForm({ ...hourlyForm, date: e.target.value })}
                        className="w-full bg-slate-900/90 border border-white/15 rounded-xl px-3 py-2 text-xs md:text-sm text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>Pickup Time</span>
                      </label>
                      <input
                        type="time"
                        required
                        value={hourlyForm.time}
                        onChange={(e) => setHourlyForm({ ...hourlyForm, time: e.target.value })}
                        className="w-full bg-slate-900/90 border border-white/15 rounded-xl px-3 py-2 text-xs md:text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Car className="w-3.5 h-3.5 text-orange-400" />
                      <span>Vehicle Type</span>
                    </label>
                    <select
                      value={hourlyForm.vehicle}
                      onChange={(e) => setHourlyForm({ ...hourlyForm, vehicle: e.target.value })}
                      className="w-full bg-slate-900/90 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500"
                    >
                      <option value="Swift Dzire (4+1)">Swift Dzire / Etios (Sedan)</option>
                      <option value="Maruti Ertiga (6+1)">Maruti Ertiga (SUV 6 Seater)</option>
                      <option value="Toyota Innova Crysta">Toyota Innova Crysta (Luxury 7 Seater)</option>
                      <option value="Tempo Traveller (12+1)">Tempo Traveller (12 Seater Mini Bus)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Rental Package Duration
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {['4 Hours', '6 Hours', '8 Hours', '10 Hours'].map((pkg) => (
                        <button
                          key={pkg}
                          type="button"
                          onClick={() => setHourlyForm({ ...hourlyForm, package: pkg })}
                          className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                            hourlyForm.package.includes(pkg)
                              ? 'bg-orange-500 text-white border-orange-400'
                              : 'bg-slate-900/60 text-slate-300 border-white/10 hover:border-white/30'
                          }`}
                        >
                          {pkg}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-orange w-full py-3.5 text-sm font-bold shadow-lg hover:shadow-orange-500/40 mt-2"
                  >
                    <span>Book Hourly Rental Now</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* TAB 2: OUTSTATION FORM */}
              {activeTab === 'outstation' && (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Pickup Location</label>
                      <input
                        type="text"
                        required
                        value={outstationForm.pickup}
                        onChange={(e) => setOutstationForm({ ...outstationForm, pickup: e.target.value })}
                        placeholder="Vizag"
                        className="w-full bg-slate-900/90 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Destination</label>
                      <input
                        type="text"
                        required
                        value={outstationForm.destination}
                        onChange={(e) => setOutstationForm({ ...outstationForm, destination: e.target.value })}
                        placeholder="Araku / Vijayawada..."
                        className="w-full bg-slate-900/90 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Trip Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['One Way', 'Round Trip'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setOutstationForm({ ...outstationForm, tripType: t })}
                          className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                            outstationForm.tripType === t
                              ? 'bg-emerald-600 text-white border-emerald-400'
                              : 'bg-slate-900/60 text-slate-300 border-white/10 hover:border-white/30'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Journey Date</label>
                      <input
                        type="date"
                        required
                        value={outstationForm.date}
                        onChange={(e) => setOutstationForm({ ...outstationForm, date: e.target.value })}
                        className="w-full bg-slate-900/90 border border-white/15 rounded-xl px-3 py-2 text-xs md:text-sm text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Vehicle</label>
                      <select
                        value={outstationForm.vehicle}
                        onChange={(e) => setOutstationForm({ ...outstationForm, vehicle: e.target.value })}
                        className="w-full bg-slate-900/90 border border-white/15 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Swift Dzire">Swift Dzire (Sedan)</option>
                        <option value="Maruti Ertiga">Maruti Ertiga (6 Seater)</option>
                        <option value="Toyota Innova Crysta">Innova Crysta (Luxury)</option>
                        <option value="Tempo Traveller">Tempo Traveller</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-green w-full py-3.5 text-sm font-bold shadow-lg hover:shadow-emerald-500/40 mt-2"
                  >
                    <span>Book Outstation Cab</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* TAB 3: AIRPORT TRANSFER FORM */}
              {activeTab === 'airport' && (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <button
                      type="button"
                      onClick={() => setAirportForm({ ...airportForm, type: 'pickup' })}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                        airportForm.type === 'pickup'
                          ? 'bg-amber-500 text-white border-amber-400'
                          : 'bg-slate-900/60 text-slate-300 border-white/10'
                      }`}
                    >
                      Airport Pickup
                    </button>
                    <button
                      type="button"
                      onClick={() => setAirportForm({ ...airportForm, type: 'drop' })}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                        airportForm.type === 'drop'
                          ? 'bg-amber-500 text-white border-amber-400'
                          : 'bg-slate-900/60 text-slate-300 border-white/10'
                      }`}
                    >
                      Airport Drop
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Airport</label>
                    <input
                      type="text"
                      readOnly
                      value={airportForm.airport}
                      className="w-full bg-slate-900/90 border border-white/15 rounded-xl px-3 py-2 text-xs text-amber-300 font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        {airportForm.type === 'pickup' ? 'Drop Location' : 'Pickup Location'}
                      </label>
                      <input
                        type="text"
                        required
                        value={airportForm.location}
                        onChange={(e) => setAirportForm({ ...airportForm, location: e.target.value })}
                        placeholder="Vizag Address"
                        className="w-full bg-slate-900/90 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Flight No (Optional)</label>
                      <input
                        type="text"
                        value={airportForm.flightNo}
                        onChange={(e) => setAirportForm({ ...airportForm, flightNo: e.target.value })}
                        placeholder="6E-123"
                        className="w-full bg-slate-900/90 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Date</label>
                      <input
                        type="date"
                        required
                        value={airportForm.date}
                        onChange={(e) => setAirportForm({ ...airportForm, date: e.target.value })}
                        className="w-full bg-slate-900/90 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Flight Time</label>
                      <input
                        type="time"
                        required
                        value={airportForm.time}
                        onChange={(e) => setAirportForm({ ...airportForm, time: e.target.value })}
                        className="w-full bg-slate-900/90 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-orange w-full py-3.5 text-sm font-bold shadow-lg hover:shadow-orange-500/40 mt-2"
                  >
                    <span>Book Airport Taxi</span>
                    <ChevronRight className="w-4 h-4" />
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
