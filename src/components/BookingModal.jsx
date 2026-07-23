import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Phone, MessageCircle, Calendar, MapPin, Car, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

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
        pickup: modalData.pickup || modalData.route?.split(' to ')[0] || prev.pickup || 'Visakhapatnam',
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
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 z-10 animate-in fade-in zoom-in duration-300">
        {/* Header Bar */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3">
            <img src="/vizag-taxi-logo.png" alt="Vizag Taxi Logo" className="h-10 bg-white rounded p-1" />
            <div>
              <h3 className="text-xl font-bold text-white">Instant Cab Reservation</h3>
              <p className="text-xs text-orange-400 font-semibold mt-0.5">24/7 Verified Chauffeur Dispatch</p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle className="w-10 h-10" />
              </div>

              <h4 className="text-2xl font-bold text-slate-900">Booking Request Received!</h4>
              <p className="text-sm text-slate-600 max-w-xs mx-auto">
                Thank you <strong className="text-slate-900">{formData.name}</strong>. Our driver dispatch desk is confirming your taxi for <strong className="text-slate-900">{formData.date}</strong>.
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-left space-y-1.5 text-slate-700 font-semibold">
                <div>• Vehicle: <span className="text-slate-900 font-bold">{formData.vehicle}</span></div>
                <div>• Route: <span className="text-slate-900 font-bold">{formData.pickup} → {formData.destination}</span></div>
                <div>• Schedule: <span className="text-slate-900 font-bold">{formData.date} at {formData.time}</span></div>
              </div>

              <div className="pt-4 space-y-2">
                <a
                  href={constructWhatsAppMsg()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-orange w-full py-3.5 flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Send Confirmation on WhatsApp</span>
                </a>

                <a
                  href="tel:+919876543210"
                  className="btn btn-green w-full py-3.5 flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Dispatcher (+91 98765 43210)</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pickup Address / City *</label>
                  <input
                    type="text"
                    required
                    value={formData.pickup}
                    onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Drop Location / Tour *</label>
                  <input
                    type="text"
                    required
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Travel Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pickup Time *</label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Vehicle Preference</label>
                <select
                  value={formData.vehicle}
                  onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                >
                  <option value="Swift Dzire (4+1)">Swift Dzire / Etios (Executive Sedan)</option>
                  <option value="Maruti Ertiga (6+1)">Maruti Ertiga (6 Seater Family SUV)</option>
                  <option value="Toyota Innova Crysta">Toyota Innova Crysta (7 Seater Luxury)</option>
                  <option value="Tempo Traveller (12+1)">Tempo Traveller (12/17 Seater)</option>
                  <option value="Luxury Coach Bus">Luxury Coach Bus</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Special Notes / Flight No</label>
                <textarea
                  rows="2"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Need child seat, extra luggage roof rack..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="btn btn-orange flex-1 py-3 text-xs font-bold shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Submit Reservation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-500 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero advance fee required to reserve cab online</span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
