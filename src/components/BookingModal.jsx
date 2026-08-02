import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Phone, MessageCircle, ShieldCheck, ArrowRight, Calendar, MapPin, Car, CreditCard, QrCode, Wallet, CheckCircle2, XCircle, Info, Lock } from 'lucide-react';
import LocationAutocompleteInput from './LocationAutocompleteInput';

const BookingModal = ({ isOpen, onClose, modalData }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickup: 'Visakhapatnam Railway Station',
    destination: 'Hourly City Package (4 Hrs / 40 KM)',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    vehicle: 'Sedan Car (Dzire / Glanza)',
    notes: '',
  });

  const [paymentMode, setPaymentMode] = useState('posttrip'); // 'posttrip', 'advance', 'twenty', 'full'
  const [includeGst, setIncludeGst] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  useEffect(() => {
    if (modalData) {
      setSubmitted(false);
      setShowQrModal(false);
      setFormData((prev) => ({
        ...prev,
        pickup: modalData.pickup || modalData.route?.split(' to ')[0] || prev.pickup,
        destination: modalData.package || modalData.destination || modalData.name || prev.destination,
        vehicle: modalData.vehicle || modalData.name || prev.vehicle,
        gstin: prev.gstin || '',
      }));
    }
  }, [modalData]);

  if (!isOpen) return null;

  // Extract or compute fares
  const isTourPackage = modalData?.type === 'Tour Package';
  const baseFare = modalData?.estimatedFare || modalData?.rates?.[modalData?.package] || 1500;
  
  // Resolution order: modalData.dayType first, then 4D -> 3D -> 2D -> 1D
  const destName = (formData.destination || modalData?.package || '').toLowerCase();
  const daysCount = modalData?.dayType || (
    destName.includes('4d') || destName.includes('4 day') || destName.includes('lambasingi') ? 4 : (
      destName.includes('3d') || destName.includes('3 day') || destName.includes('combo') ? 3 : (
        destName.includes('2d') || destName.includes('2 day') || destName.includes('1n2d') || destName.includes('2 days') ? 2 : 1
      )
    )
  );

  // Compute Bhatta per day based on vehicle category
  const vehLower = (formData.vehicle || '').toLowerCase();
  const isHeavyVehicle = vehLower.includes('fortuner') || 
                         vehLower.includes('crysta') || 
                         vehLower.includes('hycross') || 
                         vehLower.includes('tempo') || 
                         vehLower.includes('urbania') || 
                         vehLower.includes('bus');
  const bhattaRatePerDay = isHeavyVehicle ? 500 : 300;
  const totalBhattaAmount = bhattaRatePerDay * daysCount;
  const driverBhatta = isTourPackage ? 0 : totalBhattaAmount;

  const extraHr = modalData?.extraHr || 200;
  const extraKm = modalData?.extraKm || 14;

  // 6% GST Tax Calculation
  const gstAmount = Math.round(baseFare * 0.06);
  const totalAmount = isTourPackage ? (includeGst ? (baseFare + gstAmount) : baseFare) : (includeGst ? (baseFare + driverBhatta + Math.round((baseFare + driverBhatta) * 0.06)) : (baseFare + driverBhatta));
  
  const twentyPercentAmount = Math.round(totalAmount * 0.20);
  const advanceAmount = paymentMode === 'twenty' ? twentyPercentAmount : 500;
  const payableNow = paymentMode === 'full' ? totalAmount : (paymentMode === 'posttrip' ? 0 : advanceAmount);
  const balanceToDriver = totalAmount - payableNow;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const upiPayLink = `upi://pay?pa=vizagtaxi@upi&pn=Vizag%20Taxi&am=${payableNow}&cu=INR&tn=${encodeURIComponent(`Cab Booking - ${formData.vehicle}`)}`;

  const constructWhatsAppMsg = () => {
    const gstLine = formData.gstin ? `%0A• GSTIN / Company: ${encodeURIComponent(formData.gstin)}` : '';
    const gstText = includeGst ? ` (Incl. 6% GST ₹${gstAmount})` : ' (Excl. GST)';
    
    const inclusionsText = isTourPackage
      ? `%0A%0A*WHAT IS INCLUDED IN PRICE (%E2%9C%85):*%0A• Private AC Vehicle (${encodeURIComponent(formData.vehicle)}) %2B Fuel%0A• Driver Bhatta Allowance (${daysCount} Days @ ₹${bhattaRatePerDay}/day = ₹${totalBhattaAmount} INCLUDED)%0A${daysCount > 1 ? `• ${daysCount - 1} Night AC Hotel Accommodation Stay%0A• All Meals (Breakfast, Lunch & Dinner)%0A` : '• Breakfast, Lunch & Evening Snacks%0A'}• Doorstep Pickup & Drop`
      : `%0A%0A*WHAT IS INCLUDED IN PRICE (%E2%9C%85):*%0A• AC Vehicle Rental %2B Fuel%0A• Driver Bhatta Allowance (₹${bhattaRatePerDay}/day × ${daysCount} Days)%0A• Doorstep Pickup & Drop`;

    const exclusionsText = `%0A%0A*WHAT IS EXCLUDED (%E2%9D%8C):*%0A• Highway Toll Receipts (Customer Pays Direct)%0A• Cave, Museum & Sightseeing Entrance Tickets%0A• Personal Shopping & Extra Expenses`;

    const text = `Hello Vizag Taxi! I would like to confirm my cab reservation.%0A%0A*Name:* ${encodeURIComponent(formData.name)}%0A*Phone:* ${encodeURIComponent(formData.phone)}${gstLine}%0A*Vehicle:* ${encodeURIComponent(formData.vehicle)}%0A*Package/Route:* ${encodeURIComponent(formData.destination)} (${daysCount} Days Tour)%0A*Pickup Point:* ${encodeURIComponent(formData.pickup)}%0A*Travel Schedule:* ${encodeURIComponent(formData.date)} at ${encodeURIComponent(formData.time)}%0A%0A*BILL & TARIFF BREAKDOWN:*%0A• Base Package Fare: ₹${baseFare}%0A• Driver Bhatta Allowance: ₹${totalBhattaAmount} (₹${bhattaRatePerDay}/day × ${daysCount} Days INCLUDED)%0A• GST (6% Tax): ₹${includeGst ? gstAmount : 0}%0A• *FINAL TOTAL AMOUNT:* ₹${totalAmount}${gstText}${inclusionsText}${exclusionsText}%0A%0A*PAYMENT MODE:* ${paymentMode === 'twenty' ? `20% Advance ₹${twentyPercentAmount} Paid via UPI` : (paymentMode === 'advance' ? 'Token Advance ₹500 Paid via UPI' : (paymentMode === 'full' ? 'Full Paid Online' : 'Pay Post-Trip to Driver (Cash/UPI)'))}%0A• *Payable Now:* ₹${payableNow}%0A• *Balance to Driver:* ₹${balanceToDriver}`;
    return `https://wa.me/919876543210?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-slate-900/60 backdrop-blur-md">
      <div
        className="fixed inset-0 bg-slate-900/40 transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 z-10 text-slate-900 flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="bg-slate-900 p-4 sm:p-5 relative text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500 text-slate-950 font-black text-lg font-heading">
              VIZAG<span className="text-white">TAXI</span>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white font-heading">
                Payment & Reservation Checkout Desk
              </h3>
              <p className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                <Lock className="w-3 h-3 text-amber-400" />
                <span>100% Secure Transparent Pricing</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 border border-slate-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          
          {/* Itemized Tariff Breakdown Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4.5 rounded-2xl border border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-700/80 pb-2.5">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 block">SELECTED VEHICLE</span>
                <span className="text-sm sm:text-base font-black text-white font-heading">{formData.vehicle}</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-black border border-emerald-500/30">
                {formData.destination}
              </span>
            </div>

            {/* Price Line Items */}
            <div className="space-y-2 text-xs text-slate-300 font-medium">
              <div className="flex justify-between">
                <span>{isTourPackage ? `Base Package Fare (${daysCount} Days Tour):` : 'Base Package Rental:'}</span>
                <span className="font-mono text-white font-bold">₹{baseFare.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Driver Bhatta ({daysCount} Days @ ₹{bhattaRatePerDay}/day):</span>
                {isTourPackage ? (
                  <span className="font-bold text-emerald-400">
                    ₹{totalBhattaAmount.toLocaleString()} (INCLUDED in Package)
                  </span>
                ) : (
                  <span className="font-mono text-amber-400 font-bold">₹{totalBhattaAmount.toLocaleString()}</span>
                )}
              </div>

              {isTourPackage && (
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Package Inclusions:</span>
                  <span className="text-emerald-400 font-semibold">
                    {daysCount > 1 ? `${daysCount - 1} Night AC Hotel + All Meals Included` : 'Breakfast + Lunch + Evening Snacks Included'}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center pt-1.5 border-t border-slate-800">
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 text-xs select-none">
                  <input 
                    type="checkbox" 
                    checked={includeGst} 
                    onChange={(e) => setIncludeGst(e.target.checked)}
                    className="rounded text-amber-500 focus:ring-amber-500 bg-slate-800 border-slate-700 w-3.5 h-3.5"
                  />
                  <span>Government GST (+6% Tax Invoice):</span>
                </label>
                <span className="font-mono text-amber-400 font-bold">
                  {includeGst ? `+₹${gstAmount.toLocaleString()} (6%)` : '₹0 (Excluded)'}
                </span>
              </div>

              <div className="flex justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                <span>Extra Hr Rate: ₹{extraHr}/hr • Extra KM: ₹{extraKm}/km</span>
                <span className="text-emerald-400 font-bold">Tolls/Parking: Customer Pay Receipts</span>
              </div>
            </div>

            {/* Total Estimated Payable */}
            <div className="pt-2.5 border-t border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">TOTAL ESTIMATED AMOUNT</span>
                <span className="text-xs text-emerald-400 font-semibold">{includeGst ? '(Package + 6% GST Tax)' : '(Base Package Fare)'}</span>
              </div>
              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tracking-tight">
                  ₹{totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Inclusions & Exclusions Summary Box on Bill */}
            <div className="pt-2.5 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 space-y-1">
                <span className="font-black text-emerald-400 flex items-center gap-1 uppercase tracking-wider text-[10px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> INCLUDED IN BILL:
                </span>
                <ul className="text-slate-300 space-y-0.5 text-[10px] font-medium">
                  <li>• AC Cab ({formData.vehicle}) + Fuel</li>
                  <li>• Driver Bhatta ({daysCount} Days @ ₹{bhattaRatePerDay}/day)</li>
                  {isTourPackage && daysCount > 1 && <li>• {daysCount - 1} Night AC Hotel Stay</li>}
                  {isTourPackage && <li>• {daysCount > 1 ? 'Breakfast, Lunch & Dinner' : 'Breakfast, Lunch & Snacks'}</li>}
                  <li>• Doorstep Pickup & Drop</li>
                </ul>
              </div>

              <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-800/40 space-y-1">
                <span className="font-black text-rose-400 flex items-center gap-1 uppercase tracking-wider text-[10px]">
                  <XCircle className="w-3.5 h-3.5 text-rose-400" /> EXCLUDED (CUSTOMER PAYS):
                </span>
                <ul className="text-slate-300 space-y-0.5 text-[10px] font-medium">
                  <li>• Highway Toll Receipts</li>
                  <li>• Cave & Museum Entry Tickets</li>
                  <li>• Personal Shopping Expenses</li>
                </ul>
              </div>
            </div>
          </div>

          {submitted ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-9 h-9" />
              </div>

              <h4 className="text-2xl font-black text-slate-900 font-heading">Cab Reservation Confirmed!</h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                Thank you <strong className="text-amber-700">{formData.name}</strong>. Your chauffeur is assigned for <strong className="text-slate-900">{formData.date} at {formData.time}</strong>.
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-left space-y-2 text-slate-700 font-medium">
                <div>• Passenger Name: <span className="text-slate-900 font-bold">{formData.name} ({formData.phone})</span></div>
                <div>• Vehicle: <span className="text-amber-700 font-bold">{formData.vehicle}</span></div>
                <div>• Pickup Location: <span className="text-slate-900 font-bold">{formData.pickup}</span></div>
                <div>• Total Estimated Fare: <span className="text-emerald-700 font-extrabold text-sm">₹{totalAmount}</span> (Driver Bhatta ₹{driverBhatta} Included)</div>
                <div>• Payment Mode: <span className="text-sky-700 font-bold uppercase">{paymentMode === 'advance' ? 'Token Advance ₹500 Paid' : (paymentMode === 'full' ? 'Full Paid Online' : 'Pay Post-Trip to Driver')}</span></div>
              </div>

              <div className="pt-2 space-y-2.5">
                <a
                  href={constructWhatsAppMsg()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold w-full py-3.5 flex items-center justify-center gap-2 text-xs font-black shadow-md"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>Send Confirmation to WhatsApp Desk</span>
                </a>

                <a
                  href="tel:+919876543210"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-full flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Phone className="w-4 h-4 text-white" />
                  <span>Call Dispatcher (+91 98765 43210)</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Payment Gateway Mode Selector */}
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-amber-600" />
                  <span>Select Payment Gateway Mode:</span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  
                  {/* Mode 1: Post-Trip */}
                  <button
                    type="button"
                    onClick={() => setPaymentMode('posttrip')}
                    className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      paymentMode === 'posttrip'
                        ? 'bg-amber-50 border-amber-400 text-slate-900 shadow-xs ring-2 ring-amber-400/30'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-1 text-[11px] font-black text-slate-900">
                      <Wallet className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Post-Trip</span>
                    </div>
                    <p className="text-[9px] text-slate-500 mt-0.5 font-medium leading-tight">
                      Zero advance. Pay after trip!
                    </p>
                  </button>

                  {/* Mode 2: Token Advance ₹500 */}
                  <button
                    type="button"
                    onClick={() => setPaymentMode('advance')}
                    className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      paymentMode === 'advance'
                        ? 'bg-emerald-50 border-emerald-400 text-slate-900 shadow-xs ring-2 ring-emerald-400/30'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-1 text-[11px] font-black text-emerald-800">
                      <QrCode className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>₹500 Token</span>
                    </div>
                    <p className="text-[9px] text-slate-500 mt-0.5 font-medium leading-tight">
                      Pay ₹500 advance via UPI
                    </p>
                  </button>

                  {/* Mode 3: 20% Advance */}
                  <button
                    type="button"
                    onClick={() => setPaymentMode('twenty')}
                    className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      paymentMode === 'twenty'
                        ? 'bg-purple-50 border-purple-400 text-slate-900 shadow-xs ring-2 ring-purple-400/30'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-1 text-[11px] font-black text-purple-800">
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>20% Advance</span>
                    </div>
                    <p className="text-[9px] text-slate-500 mt-0.5 font-medium leading-tight">
                      Pay 20% (₹{twentyPercentAmount}) via UPI
                    </p>
                  </button>

                  {/* Mode 4: Full Payment */}
                  <button
                    type="button"
                    onClick={() => setPaymentMode('full')}
                    className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      paymentMode === 'full'
                        ? 'bg-sky-50 border-sky-400 text-slate-900 shadow-xs ring-2 ring-sky-400/30'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-1 text-[11px] font-black text-sky-800">
                      <CreditCard className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span>Full Pay</span>
                    </div>
                    <p className="text-[9px] text-slate-500 mt-0.5 font-medium leading-tight">
                      Pay ₹{totalAmount} full online
                    </p>
                  </button>

                </div>
              </div>

              {/* UPI Instant Banner if Advance, 20% or Full */}
              {(paymentMode !== 'posttrip') && (
                <div className="bg-slate-900 text-white p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-amber-400 shrink-0" />
                    <div>
                      <div className="font-bold text-white">Instant UPI GPay / PhonePe Payment</div>
                      <div className="text-[10px] text-slate-400">
                        Payable Now: <strong className="text-amber-400 font-mono text-xs">₹{payableNow}</strong> • Balance to Driver: <strong className="text-emerald-400 font-mono">₹{balanceToDriver}</strong>
                      </div>
                    </div>
                  </div>

                  <a
                    href={upiPayLink}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-[11px] flex items-center gap-1 shadow-xs transition-all shrink-0"
                  >
                    <span>Launch UPI App</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              )}

              {/* Customer Form Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>
              </div>

              {/* Optional GSTIN Number Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                  <span>GSTIN Number / Company Name</span>
                  <span className="text-[10px] text-amber-600 font-extrabold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Optional for Tax Invoice</span>
                </label>
                <input
                  type="text"
                  value={formData.gstin || ''}
                  onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                  placeholder="e.g. 37AAAAA0000A1Z5 or Business Name (Optional)"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pickup Address in Vizag *</label>
                <LocationAutocompleteInput
                  required
                  value={formData.pickup}
                  onChange={(val) => setFormData({ ...formData, pickup: val })}
                  placeholder="Type area, city, or Pincode..."
                  focusColor="focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Travel Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pickup Time</label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-gold w-full py-3.5 text-xs font-black shadow-md flex items-center justify-center gap-2 cursor-pointer mt-1"
              >
                <span>Confirm Reservation ({paymentMode === 'posttrip' ? 'Pay Post-Trip' : `Pay ₹${payableNow}`})</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero hidden charges • Instant SMS & WhatsApp Dispatch Receipt</span>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default BookingModal;
