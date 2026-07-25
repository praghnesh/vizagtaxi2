import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Phone, MessageCircle, ShieldCheck, ArrowRight, Calendar, MapPin, Car } from 'lucide-react';
import LocationAutocompleteInput from './LocationAutocompleteInput';

const BookingModal = ({ isOpen, onClose, modalData }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickup: '',
    destination: '',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    vehicle: 'Toyota Innova Crysta',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (modalData) {
      setSubmitted(false);
      setFormData((prev) => ({
        ...prev,
        pickup: modalData.pickup || modalData.route?.split(' to ')[0] || prev.pickup || 'Visakhapatnam Railway Station',
        destination: modalData.destination || modalData.route?.split(' to ')[1] || modalData.name || prev.destination || 'Araku Valley',
        vehicle: modalData.vehicle || modalData.name || prev.vehicle,
      }));
    }
  }, [modalData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const constructWhatsAppMsg = () => {
    const text = `Hello Vizag Taxi! I would like to book a cab.%0A%0A*Name:* ${encodeURIComponent(formData.name)}%0A*Phone:* ${encodeURIComponent(formData.phone)}%0A*Pickup:* ${encodeURIComponent(formData.pickup)}%0A*Destination/Package:* ${encodeURIComponent(formData.destination)}%0A*Date & Time:* ${encodeURIComponent(formData.date)} at ${encodeURIComponent(formData.time)}%0A*Vehicle:* ${encodeURIComponent(formData.vehicle)}%0A*Notes:* ${encodeURIComponent(formData.notes || 'None')}`;
    return `https://wa.me/919876543210?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 z-10 text-slate-900">
        
        {/* Header Bar */}
        <div className="bg-slate-900 p-5 relative text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/10 border border-white/20 text-white font-black text-lg font-heading">
              VIZAG<span className="text-amber-400">TAXI</span>
            </div>
            <div>
              <h3 className="text-base font-black text-white font-heading">Instant Cab Reservation</h3>
              <p className="text-xs text-amber-400 font-semibold">24/7 VIP Chauffeur Dispatch Desk</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 border border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-9 h-9" />
              </div>

              <h4 className="text-2xl font-black text-slate-900 font-heading">Booking Request Received!</h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                Thank you <strong className="text-amber-700">{formData.name}</strong>. Our dispatch desk is assigning your chauffeur for <strong className="text-slate-900">{formData.date}</strong>.
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-left space-y-1.5 text-slate-700 font-medium">
                <div>• Vehicle: <span className="text-amber-700 font-bold">{formData.vehicle}</span></div>
                <div>• Route: <span className="text-slate-900 font-bold">{formData.pickup} → {formData.destination}</span></div>
                <div>• Schedule: <span className="text-slate-900 font-bold">{formData.date} at {formData.time}</span></div>
              </div>

              <div className="pt-3 space-y-2.5">
                <a
                  href={constructWhatsAppMsg()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold w-full py-3.5 flex items-center justify-center gap-2 text-xs font-black shadow-md"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>Confirm on WhatsApp Immediately</span>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Pickup Address in Vizag *</label>
                <LocationAutocompleteInput
                  required
                  value={formData.pickup}
                  onChange={(val) => setFormData({ ...formData, pickup: val })}
                  placeholder="Type area, city, or 6-digit Pincode..."
                  focusColor="focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Destination / Package *</label>
                <LocationAutocompleteInput
                  required
                  value={formData.destination}
                  onChange={(val) => setFormData({ ...formData, destination: val })}
                  placeholder="Type destination, city, or Pincode..."
                  focusColor="focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Time</label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Vehicle Preference</label>
                <select
                  value={formData.vehicle}
                  onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                >
                  <option value="Swift Dzire (4+1)">Swift Dzire / Etios (Sedan)</option>
                  <option value="Maruti Ertiga (6+1)">Maruti Ertiga (6 Seater)</option>
                  <option value="Toyota Innova Crysta">Toyota Innova Crysta (Luxury 7 Seater)</option>
                  <option value="Tempo Traveller (12+1)">Tempo Traveller (12 Seater Mini Bus)</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn-gold w-full py-4 text-xs font-black shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Confirm & Request Taxi</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero advance deposit needed • Pay after trip completion</span>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default BookingModal;
