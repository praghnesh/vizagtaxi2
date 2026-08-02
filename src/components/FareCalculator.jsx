import React, { useState } from 'react';
import { Calculator, MapPin, Car, ArrowRight, ShieldCheck, Sliders, CheckCircle2, Zap } from 'lucide-react';

const popularRoutes = [
  { id: 'vtz-araku', name: 'Vizag City to Araku Valley', dist: 115, estHrs: 4, basePrice: 2999 },
  { id: 'vtz-airport-beach', name: 'Airport (VTZ) to RK Beach', dist: 18, estHrs: 1, basePrice: 699 },
  { id: 'vtz-simhachalam', name: 'Railway Station to Simhachalam', dist: 22, estHrs: 1, basePrice: 599 },
  { id: 'vtz-lambasingi', name: 'Vizag to Lambasingi Hills', dist: 135, estHrs: 5, basePrice: 3499 },
  { id: 'vtz-annavaram', name: 'Vizag to Annavaram Temple', dist: 125, estHrs: 4, basePrice: 3199 },
  { id: 'vtz-bheemili', name: 'RK Beach to Bheemili Coastal Drive', dist: 35, estHrs: 2, basePrice: 1199 },
];

const vehicleRates = {
  sedan: { name: 'Sedan Car (4 Seats)', rate: 12, tag: 'Dzire / Glanza' },
  mid_suv: { name: 'Mid-Size SUV (5 Seats)', rate: 14, tag: 'Creta / Brezza' },
  ertiga: { name: 'Maruti Ertiga (6-7 Seats)', rate: 16, tag: 'Family SUV' },
  carens: { name: 'Kia Carens (6-7 Seats)', rate: 17, tag: 'Smart MPV' },
  crysta: { name: 'Innova Crysta (7 Seats)', rate: 22, tag: 'Captain Luxury' },
  hycross: { name: 'Innova Hycross (7 Seats)', rate: 25, tag: 'VIP Hybrid' },
  fortuner: { name: 'Toyota Fortuner (7 Seats)', rate: 38, tag: '4x4 Luxury SUV' },
  bmw_audi: { name: 'BMW & Audi (4 Seats)', rate: 55, tag: 'Ultra VIP Sedan' },
  tempo_9: { name: '9-Seater Tempo Traveller', rate: 24, tag: 'Luxury Van' },
  tempo_12: { name: '12-Seater Tempo Traveller', rate: 26, tag: 'Executive Van' },
  tempo_16: { name: '16-Seater Tempo Traveller', rate: 30, tag: 'Force Urbania' },
  tempo_17: { name: '17-Seater Tempo Traveller', rate: 32, tag: 'Tourist Van' },
  tempo_20: { name: '20-Seater Tempo Traveller', rate: 35, tag: 'Large Group Van' },
  bus_24: { name: '24-Seater AC Mini Bus', rate: 42, tag: 'Mini Bus' },
  bus_28: { name: '28-Seater AC Mini Bus', rate: 46, tag: 'Tour Coach' },
  bus_36: { name: '36-Seater AC Luxury Bus', rate: 55, tag: 'Grand Coach' },
  bus_40: { name: '40-Seater AC Deluxe Coach', rate: 60, tag: 'Deluxe Bus' },
  bus_combo: { name: '20 Seater + 20 Sleeper AC', rate: 65, tag: 'Combo Coach' },
  bus_sleeper: { name: '36 AC Sleeper Bus', rate: 70, tag: 'Full Sleeper Bus' },
};

const FareCalculator = ({ onOpenBookingModal }) => {
  const [distanceKm, setDistanceKm] = useState(115);
  const [tripDurationHrs, setTripDurationHrs] = useState(4);
  const [selectedVehicle, setSelectedVehicle] = useState('crysta');
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  const vInfo = vehicleRates[selectedVehicle];
  const totalKm = isRoundTrip ? distanceKm * 2 : distanceKm;
  const baseRateKm = totalKm * vInfo.rate;
  const driverAllowance = totalKm > 80 ? 400 : 250;
  const estimatedTotal = Math.round(baseRateKm + driverAllowance);

  const handleSelectPreset = (route) => {
    setDistanceKm(route.dist);
    setTripDurationHrs(route.estHrs);
  };

  return (
    <section id="simulator" className="py-16 md:py-24 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200">
      
      {/* Background Soft Glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-sky-200/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-200/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold mb-3 shadow-2xs">
            <Sliders className="w-4 h-4 text-sky-600" />
            <span>INTERACTIVE ROUTE SIMULATOR & FARE SLIDER</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-heading text-slate-900 tracking-tight">
            Live Trip <span className="gradient-text-cyan">Fare Estimator</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-2 max-w-2xl mx-auto">
            Adjust distance, hours, and vehicle type to calculate exact transparent trip costs with zero hidden charges.
          </p>
        </div>

        {/* Preset Route Buttons */}
        <div className="mb-10">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center mb-3">
            Quick Route Presets (Click to Auto-Fill):
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {popularRoutes.map((route) => {
              const isSelected = distanceKm === route.dist;
              return (
                <button
                  key={route.id}
                  type="button"
                  onClick={() => handleSelectPreset(route)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-amber-500 text-white border-amber-500 font-black shadow-md'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-amber-300 hover:bg-amber-50/50'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-sky-600" />
                  <span>{route.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white text-slate-800 border border-slate-200">
                    {route.dist} KM
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Simulator Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 glass-panel-light p-6 md:p-8 space-y-6 flex flex-col justify-between shadow-md">
            
            {/* Trip Type Toggle */}
            <div className="flex items-center justify-between bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => setIsRoundTrip(false)}
                className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  !isRoundTrip
                    ? 'bg-white text-sky-700 font-black shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                One Way Trip
              </button>
              <button
                type="button"
                onClick={() => setIsRoundTrip(true)}
                className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  isRoundTrip
                    ? 'bg-white text-amber-700 font-black shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Round Trip (2x KM)
              </button>
            </div>

            {/* Slider 1: Distance */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-sky-600" />
                  <span>Estimated One-Way Distance:</span>
                </span>
                <span className="text-sky-600 text-base font-black font-mono">{distanceKm} KM</span>
              </div>
              <input
                type="range"
                min="10"
                max="400"
                step="5"
                value={distanceKm}
                onChange={(e) => setDistanceKm(Number(e.target.value))}
                className="cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                <span>10 KM (Local City)</span>
                <span>200 KM (Araku/Annavaram)</span>
                <span>400 KM (Outstation)</span>
              </div>
            </div>

            {/* Slider 2: Duration */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-700 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-amber-600" />
                  <span>Estimated Rental Duration:</span>
                </span>
                <span className="text-amber-700 text-base font-black font-mono">{tripDurationHrs} Hours</span>
              </div>
              <input
                type="range"
                min="1"
                max="24"
                step="1"
                value={tripDurationHrs}
                onChange={(e) => setTripDurationHrs(Number(e.target.value))}
                className="cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                <span>1 Hr (Airport Drop)</span>
                <span>8 Hrs (Vizag Tour)</span>
                <span>24 Hrs (Full Day Outstation)</span>
              </div>
            </div>

            {/* Vehicle Category Selector Cards */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                <Car className="w-4 h-4 text-emerald-600" />
                <span>Select Vehicle Type:</span>
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {Object.entries(vehicleRates).map(([key, item]) => {
                  const isSelected = selectedVehicle === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedVehicle(key)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-50 border-amber-400 text-slate-900 shadow-sm ring-1 ring-amber-400/40'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs text-slate-900">{item.name}</span>
                        <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${isSelected ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-700'}`}>
                          ₹{item.rate}/KM
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1 font-medium">{item.tag}</div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Fare Summary Column */}
          <div className="lg:col-span-5 glass-panel-glow-light p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
            
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <div>
                  <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Live Trip Cost Breakdown</div>
                  <div className="text-lg font-black text-slate-900 font-heading">{vInfo.name}</div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black border border-emerald-200">
                  ALL-INCLUSIVE
                </span>
              </div>

              {/* Price Calculation Details */}
              <div className="space-y-3 text-xs font-medium border-b border-slate-100 pb-5">
                <div className="flex justify-between text-slate-600">
                  <span>Total Billable Distance:</span>
                  <span className="font-mono font-bold text-slate-900">{totalKm} KM {isRoundTrip ? '(Round Trip)' : ''}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Per KM Rate ({vInfo.name.split(' ')[0]}):</span>
                  <span className="font-mono font-bold text-slate-900">₹{vInfo.rate} / KM</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Base Distance Fare:</span>
                  <span className="font-mono font-bold text-sky-700">₹{baseRateKm}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Driver Allowance & Highway Perks:</span>
                  <span className="font-mono font-bold text-amber-700">₹{driverAllowance}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>GST & Toll Taxes:</span>
                  <span className="font-mono text-emerald-700 font-bold">Included</span>
                </div>
              </div>

              {/* Total Display */}
              <div className="py-5 text-center">
                <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Estimated Final Fare</div>
                <div className="text-4xl md:text-5xl font-black text-amber-600 font-mono tracking-tight">
                  ₹{estimatedTotal.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 font-semibold">
                  (Estimated for ~{tripDurationHrs} Hours • No Surge Price Guarantee)
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => onOpenBookingModal('calculator', {
                  distance: totalKm,
                  duration: tripDurationHrs,
                  vehicle: vInfo.name,
                  estimatedFare: estimatedTotal,
                  isRoundTrip
                })}
                className="btn-gold w-full py-4 text-xs font-black tracking-wide flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <Zap className="w-4 h-4 text-white fill-white" />
                <span>Confirm & Reserve Cab Now</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Instant confirmation via WhatsApp & Call</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default FareCalculator;
