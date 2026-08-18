import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle,
  Phone,
  MessageCircle,
  ShieldCheck,
  ArrowRight,
  Calendar,
  MapPin,
  Car,
  CreditCard,
  QrCode,
  Wallet,
  CheckCircle2,
  XCircle,
  Info,
  Lock,
  Zap,
  Copy,
  ChevronLeft,
  Loader2,
  Smartphone,
  Building
} from 'lucide-react';
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
    gstin: '',
    notes: '',
  });

  const [paymentMode, setPaymentMode] = useState('twenty'); // 'twenty', 'advance', 'posttrip', 'full'
  const [includeGst, setIncludeGst] = useState(true);
  
  // Checkout Steps: 'details' -> 'gateway' -> 'verifying' -> 'success'
  const [step, setStep] = useState('details');
  const [gatewayTab, setGatewayTab] = useState('upi'); // 'upi', 'cards', 'netbanking'
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [txnId, setTxnId] = useState('');

  // Card form state
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  useEffect(() => {
    if (modalData) {
      setStep('details');
      setTxnId(`TXN-VTZ${Math.floor(100000 + Math.random() * 900000)}`);
      if (modalData.paymentMode) {
        setPaymentMode(modalData.paymentMode);
      } else {
        setPaymentMode('twenty'); // Default to 20% advance!
      }
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

  // Pricing calculations
  const isTourPackage = modalData?.type === 'Tour Package';
  const baseFare = modalData?.estimatedFare || modalData?.rates?.[modalData?.package] || 1500;
  
  const destName = (formData.destination || modalData?.package || '').toLowerCase();
  const daysCount = modalData?.daysCount || modalData?.dayType || (
    destName.includes('4d') || destName.includes('4 day') || destName.includes('lambasingi') ? 4 : (
      destName.includes('3d') || destName.includes('3 day') || destName.includes('combo') ? 3 : (
        destName.includes('2d') || destName.includes('2 day') || destName.includes('1n2d') || destName.includes('2 days') ? 2 : 1
      )
    )
  );

  const vehLower = (formData.vehicle || '').toLowerCase();
  const isHeavyVehicle = vehLower.includes('fortuner') || 
                         vehLower.includes('crysta') || 
                         vehLower.includes('hycross') || 
                         vehLower.includes('tempo') || 
                         vehLower.includes('urbania') || 
                         vehLower.includes('bus');

  const bhattaRatePerDay = isHeavyVehicle ? 500 : 300;
  const totalBhattaAmount = bhattaRatePerDay * daysCount;

  const gstRate = 0.05;
  const computedBhatta = modalData?.driverBhatta !== undefined ? modalData.driverBhatta : totalBhattaAmount;
  const driverBhatta = isTourPackage ? 0 : computedBhatta;

  const extraHr = modalData?.extraHr || 200;
  const extraKm = modalData?.extraKm || 14;

  const gstAmount = modalData?.gstAmount !== undefined ? modalData.gstAmount : Math.round(baseFare * gstRate);
  const totalAmount = modalData?.totalAmount !== undefined
    ? (includeGst ? modalData.totalAmount : (modalData.totalAmount - (modalData.gstAmount || 0)))
    : (isTourPackage 
        ? (includeGst ? (baseFare + gstAmount) : baseFare) 
        : (includeGst ? (baseFare + driverBhatta + Math.round((baseFare + driverBhatta) * gstRate)) : (baseFare + driverBhatta))
      );
  
  const twentyPercentAmount = Math.round(totalAmount * 0.20);
  const advanceAmount = paymentMode === 'twenty' ? twentyPercentAmount : (paymentMode === 'advance' ? 500 : totalAmount);
  const payableNow = paymentMode === 'posttrip' ? 0 : advanceAmount;
  const balanceToDriver = totalAmount - payableNow;

  const upiPayLink = `upi://pay?pa=vizagtaxi@upi&pn=Vizag%20Taxi&am=${payableNow}&cu=INR&tn=${encodeURIComponent(`Booking ${formData.vehicle}`)}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiPayLink)}`;

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    if (paymentMode === 'posttrip') {
      setStep('success');
    } else {
      setStep('gateway');
    }
  };

  const handleSimulatePayment = () => {
    setStep('verifying');
    setTimeout(() => {
      setStep('success');
    }, 1600);
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('vizagtaxi@upi');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const constructWhatsAppMsg = () => {
    const gstLine = formData.gstin ? `%0A• GSTIN / Company: ${encodeURIComponent(formData.gstin)}` : '';
    const gstText = includeGst ? ` (Incl. 5% GST ₹${gstAmount})` : ' (Excl. GST)';
    
    const text = `Hello Vizag Taxi! I have completed my reservation:%0A%0A*Ref Txn ID:* ${encodeURIComponent(txnId)}%0A*Name:* ${encodeURIComponent(formData.name)}%0A*Phone:* ${encodeURIComponent(formData.phone)}${gstLine}%0A*Vehicle:* ${encodeURIComponent(formData.vehicle)}%0A*Service/Route:* ${encodeURIComponent(formData.destination)}%0A*Pickup Location:* ${encodeURIComponent(formData.pickup)}%0A*Date & Time:* ${encodeURIComponent(formData.date)} at ${encodeURIComponent(formData.time)}%0A%0A*PRICE & PAYMENT RECEIPT:*%0A• Total Amount: ₹${totalAmount}${gstText}%0A• *Payment Mode:* ${paymentMode === 'twenty' ? `20% Advance Online Gateway (₹${payableNow} PAID)` : (paymentMode === 'advance' ? `Token Advance (₹${payableNow} PAID)` : (paymentMode === 'full' ? `Full Amount (₹${payableNow} PAID)` : 'Pay Post-Trip to Driver'))}%0A• *Amount Paid Now:* ₹${payableNow}%0A• *Balance Payable to Driver:* ₹${balanceToDriver}%0A%0APlease dispatch driver assignment details.`;
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
                {step === 'gateway' ? '⚡ 20% Advance Online Payment Gateway' : (step === 'success' ? '✅ Reservation & Payment Verified' : 'Reservation & Tariff Summary')}
              </h3>
              <p className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                <Lock className="w-3 h-3 text-amber-400" />
                <span>256-Bit SSL Encrypted Secure Checkout</span>
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
          
          {/* STEP 1: FORM & INVOICE BREAKDOWN */}
          {step === 'details' && (
            <>
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
                    <span>{isTourPackage ? `Base Package Fare (${daysCount} Days Tour):` : 'Base Fare / Package Rental:'}</span>
                    <span className="font-mono text-white font-bold">₹{baseFare.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Driver Bhatta ({daysCount} Days @ ₹{bhattaRatePerDay}/day):</span>
                    {isTourPackage ? (
                      <span className="font-bold text-emerald-400">
                        ₹{totalBhattaAmount.toLocaleString()} (INCLUDED)
                      </span>
                    ) : (
                      <span className="font-mono text-amber-400 font-bold">₹{totalBhattaAmount.toLocaleString()}</span>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-1.5 border-t border-slate-800">
                    <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 text-xs select-none">
                      <input 
                        type="checkbox" 
                        checked={includeGst} 
                        onChange={(e) => setIncludeGst(e.target.checked)}
                        className="rounded text-amber-500 focus:ring-amber-500 bg-slate-800 border-slate-700 w-3.5 h-3.5"
                      />
                      <span>Government GST (+5% Tax Invoice):</span>
                    </label>
                    <span className="font-mono text-amber-400 font-bold">
                      {includeGst ? `+₹${gstAmount.toLocaleString()} (5%)` : '₹0 (Excluded)'}
                    </span>
                  </div>
                </div>

                {/* Total Estimated Payable */}
                <div className="pt-2.5 border-t border-slate-700 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">TOTAL FARE</span>
                    <span className="text-xs text-emerald-400 font-semibold">{includeGst ? '(Inclusive of 5% GST)' : '(Base Fare)'}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tracking-tight">
                      ₹{totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Form Details */}
              <form onSubmit={handleDetailsSubmit} className="space-y-4">
                
                {/* Payment Gateway Mode Selector */}
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-amber-600" />
                    <span>Select Payment Option:</span>
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    
                    {/* Mode 1: 20% Advance (RECOMMENDED) */}
                    <button
                      type="button"
                      onClick={() => setPaymentMode('twenty')}
                      className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                        paymentMode === 'twenty'
                          ? 'bg-amber-50 border-amber-400 text-slate-900 shadow-sm ring-2 ring-amber-400/40'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <span className="absolute top-1.5 right-1.5 px-1.5 py-0.2 rounded bg-amber-500 text-slate-950 text-[8px] font-black uppercase">
                        POPULAR
                      </span>
                      <div className="flex items-center gap-1 text-[11px] font-black text-amber-900">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>20% Advance</span>
                      </div>
                      <p className="text-[9px] text-slate-600 mt-0.5 font-bold leading-tight">
                        Pay ₹{twentyPercentAmount} Now
                      </p>
                    </button>

                    {/* Mode 2: Token Advance ₹500 */}
                    <button
                      type="button"
                      onClick={() => setPaymentMode('advance')}
                      className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        paymentMode === 'advance'
                          ? 'bg-emerald-50 border-emerald-400 text-slate-900 shadow-sm ring-2 ring-emerald-400/30'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-1 text-[11px] font-black text-emerald-800">
                        <QrCode className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>₹500 Token</span>
                      </div>
                      <p className="text-[9px] text-slate-500 mt-0.5 font-medium leading-tight">
                        Flat ₹500 advance
                      </p>
                    </button>

                    {/* Mode 3: Post-Trip */}
                    <button
                      type="button"
                      onClick={() => setPaymentMode('posttrip')}
                      className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        paymentMode === 'posttrip'
                          ? 'bg-sky-50 border-sky-400 text-slate-900 shadow-sm ring-2 ring-sky-400/30'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-1 text-[11px] font-black text-slate-900">
                        <Wallet className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>Post-Trip</span>
                      </div>
                      <p className="text-[9px] text-slate-500 mt-0.5 font-medium leading-tight">
                        Pay after trip to driver
                      </p>
                    </button>

                    {/* Mode 4: Full Payment */}
                    <button
                      type="button"
                      onClick={() => setPaymentMode('full')}
                      className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        paymentMode === 'full'
                          ? 'bg-emerald-50 border-emerald-400 text-slate-900 shadow-sm ring-2 ring-emerald-400/30'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-1 text-[11px] font-black text-emerald-800">
                        <CreditCard className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Full Pay</span>
                      </div>
                      <p className="text-[9px] text-slate-500 mt-0.5 font-medium leading-tight">
                        Pay ₹{totalAmount} full
                      </p>
                    </button>

                  </div>
                </div>

                {/* Customer Inputs */}
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

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  className="btn-gold w-full py-4 text-xs sm:text-sm font-black shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2 transform hover:scale-[1.01] transition-all"
                >
                  <Zap className="w-4 h-4 text-slate-950 fill-slate-950" />
                  <span>
                    {paymentMode === 'posttrip' 
                      ? 'Confirm Reservation (Pay Post-Trip to Driver)' 
                      : `Proceed to 20% Online Payment Gateway (₹${payableNow.toLocaleString()})`}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Zero hidden charges • 100% Refundable Advance Guarantee</span>
                </div>
              </form>
            </>
          )}

          {/* STEP 2: LIVE PAYMENT GATEWAY SCREEN */}
          {step === 'gateway' && (
            <div className="space-y-4">
              
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to details</span>
                </button>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-bold">AMOUNT TO PAY NOW</span>
                  <span className="text-xl font-black text-amber-600 font-mono">₹{payableNow.toLocaleString()}</span>
                </div>
              </div>

              {/* Gateway Tabs */}
              <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setGatewayTab('upi')}
                  className={`py-2 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    gatewayTab === 'upi' ? 'bg-white text-slate-950 shadow-sm font-black' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5 text-amber-600" />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setGatewayTab('cards')}
                  className={`py-2 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    gatewayTab === 'cards' ? 'bg-white text-slate-950 shadow-sm font-black' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5 text-sky-600" />
                  <span>Cards</span>
                </button>

                <button
                  type="button"
                  onClick={() => setGatewayTab('netbanking')}
                  className={`py-2 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    gatewayTab === 'netbanking' ? 'bg-white text-slate-950 shadow-sm font-black' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Building className="w-3.5 h-3.5 text-emerald-600" />
                  <span>NetBanking</span>
                </button>
              </div>

              {/* Tab 1: UPI QR & Apps */}
              {gatewayTab === 'upi' && (
                <div className="space-y-4 bg-slate-900 text-white p-5 rounded-3xl border border-slate-800 text-center">
                  
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-400 tracking-widest block">SCAN ANY UPI APP TO PAY</span>
                    <h4 className="text-base font-black text-white mt-0.5">Google Pay / PhonePe / Paytm / BHIM</h4>
                  </div>

                  {/* QR Code */}
                  <div className="bg-white p-3 rounded-2xl inline-block shadow-xl border-4 border-amber-400 mx-auto">
                    <img
                      src={qrCodeUrl}
                      alt="UPI QR Code"
                      className="w-44 h-44 object-contain mx-auto"
                    />
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xs text-slate-300 font-mono">UPI ID: <strong className="text-amber-400 font-bold">vizagtaxi@upi</strong></span>
                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-bold rounded-lg border border-slate-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3 h-3 text-amber-400" />
                      <span>{copiedUpi ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* Direct UPI App Launch Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <a
                      href={upiPayLink}
                      className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Open GPay / PhonePe</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleSimulatePayment}
                      className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>I Have Paid ₹{payableNow}</span>
                    </button>
                  </div>

                </div>
              )}

              {/* Tab 2: Cards */}
              {gatewayTab === 'cards' && (
                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="4532 •••• •••• 8921"
                      value={cardData.number}
                      onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-bold focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Valid Thru</label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">CVV</label>
                      <input
                        type="password"
                        placeholder="•••"
                        maxLength={4}
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Name on Card</label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={cardData.name}
                      onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSimulatePayment}
                    className="btn-gold w-full py-3 text-xs font-black shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <Lock className="w-3.5 h-3.5 text-slate-950" />
                    <span>Pay ₹{payableNow} Securely via Card</span>
                  </button>
                </div>
              )}

              {/* Tab 3: NetBanking */}
              {gatewayTab === 'netbanking' && (
                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                  <span className="font-bold text-slate-700 block">Select Your Bank:</span>
                  <div className="grid grid-cols-2 gap-2">
                    {['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map((bank) => (
                      <button
                        key={bank}
                        type="button"
                        onClick={handleSimulatePayment}
                        className="p-2.5 rounded-xl bg-white hover:bg-amber-50 hover:border-amber-400 border border-slate-200 text-left font-bold text-slate-800 text-xs cursor-pointer transition-all flex items-center justify-between"
                      >
                        <span>{bank}</span>
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* STEP 2.5: VERIFYING ANIMATION */}
          {step === 'verifying' && (
            <div className="py-12 text-center space-y-4">
              <Loader2 className="w-12 h-12 text-amber-500 animate-spin mx-auto" />
              <h4 className="text-lg font-black text-slate-900 font-heading">
                Verifying 20% Advance Payment...
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Securely connecting to UPI / Banking network. Please do not close or refresh this window.
              </p>
            </div>
          )}

          {/* STEP 3: SUCCESSFUL CONFIRMATION */}
          {step === 'success' && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 border-2 border-emerald-300 rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  RESERVATION & ADVANCE CONFIRMED
                </span>
                <h4 className="text-2xl font-black text-slate-900 font-heading mt-2">
                  Cab Booked Successfully!
                </h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto mt-1">
                  Thank you <strong className="text-amber-700">{formData.name}</strong>. Your chauffeur is allocated for <strong className="text-slate-900">{formData.date} at {formData.time}</strong>.
                </p>
              </div>

              {/* Receipt Summary Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-left space-y-2 text-slate-700 font-medium shadow-xs">
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Booking Ref ID:</span>
                  <span className="text-slate-900 font-mono font-bold">{txnId}</span>
                </div>
                <div>• Passenger: <strong className="text-slate-900">{formData.name} ({formData.phone})</strong></div>
                <div>• Vehicle: <strong className="text-amber-700">{formData.vehicle}</strong></div>
                <div>• Pickup: <strong className="text-slate-900">{formData.pickup}</strong></div>
                <div>• Route/Package: <strong className="text-slate-900">{formData.destination}</strong></div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs">
                  <span>Advance Token Paid:</span>
                  <span className="font-mono text-emerald-700 font-black text-sm">₹{payableNow.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>Balance to Driver Post-Trip:</span>
                  <span className="font-mono text-slate-900 font-bold">₹{balanceToDriver.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-2 space-y-2.5">
                <a
                  href={constructWhatsAppMsg()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold w-full py-4 flex items-center justify-center gap-2 text-xs font-black shadow-lg cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-slate-950" />
                  <span>Send Confirmation to WhatsApp Dispatch Desk</span>
                </a>

                <a
                  href="tel:+919876543210"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all block"
                >
                  <Phone className="w-4 h-4 text-white" />
                  <span>Call 24/7 Helpline: +91 98765 43210</span>
                </a>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default BookingModal;
