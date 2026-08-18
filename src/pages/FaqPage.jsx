import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Search,
  CreditCard,
  Car,
  Plane,
  Clock,
  ShieldCheck,
  Phone,
  MessageCircle,
  Zap,
  ArrowRight,
  Info
} from 'lucide-react';

const faqCategories = [
  { id: 'all', name: 'All Questions' },
  { id: 'payment', name: '20% Advance & Payment' },
  { id: 'outstation', name: 'Outstation & Pricing' },
  { id: 'airport', name: 'Airport Pickup & Drop' },
  { id: 'hourly', name: 'Hourly Rentals' },
  { id: 'tours', name: 'Araku & Tour Packages' },
  { id: 'cancellation', name: 'Cancellations & Refunds' },
];

const faqsList = [
  {
    category: 'payment',
    q: 'How does the 20% Advance Online Payment work?',
    a: 'When reserving your cab, you pay only a 20% token amount online via UPI (Google Pay, PhonePe, Paytm), QR Code, Cards, or NetBanking to lock your vehicle and chauffeur. The remaining 80% balance is payable directly to your driver after your trip completion.'
  },
  {
    category: 'payment',
    q: 'Are there any hidden charges or extra commissions?',
    a: 'Absolutely none. All our fares are 100% transparent. Your quote includes AC vehicle rental, fuel, driver bhatta allowance, and 5% GST. Highway toll booth receipts and parking entry slips are paid at actuals.'
  },
  {
    category: 'payment',
    q: 'Do I get a proper GST tax invoice for corporate claims?',
    a: 'Yes! During checkout you can provide your company name and GSTIN. We automatically issue a compliant 5% GST tax invoice for your business expense reimbursement.'
  },
  {
    category: 'outstation',
    q: 'How is the Outstation One-Way and Round-Trip fare calculated?',
    a: 'For One-Way drops up to 50 KM, we charge a base minimum fare of ₹5,000 + 5% GST + Driver Bhatta. For distances above 50 KM, it is ₹5,000 base + (Distance - 50) × Vehicle Per-KM Rate + Bhatta + GST. For Round Trips, billing is based on total 2-way kilometers (minimum 250 km/day benchmark).'
  },
  {
    category: 'outstation',
    q: 'What is Driver Bhatta and how is it charged?',
    a: 'Driver Bhatta covers the chauffeur daily food and stay allowance. It is ₹300/day for Sedans, Mid-SUVs, Ertiga, and Carens, and ₹500/day for Innova Crysta, Hycross, Fortuner, and Tempo Travellers.'
  },
  {
    category: 'airport',
    q: 'What happens if my flight to Vizag Airport (VTZ) is delayed?',
    a: 'We track your flight number in real-time. We provide 60 minutes of free waiting time from actual flight touchdown. Your chauffeur will be waiting at the Arrival Gate with a welcome name board.'
  },
  {
    category: 'airport',
    q: 'Does Airport Transfer fare include parking and toll charges?',
    a: 'Yes, our transparent airport fare automatically itemizes the nominal VTZ airport terminal parking and entry slip so you do not have to worry about cash at the toll booth.'
  },
  {
    category: 'hourly',
    q: 'Can I extend my hourly rental if my meeting or shopping takes longer?',
    a: 'Yes, absolutely! You can extend your ride anytime. Extra hours and extra kilometers beyond your package limit are charged at transparent fixed per-hour and per-km rates (e.g. ₹200/hr and ₹14/km for Sedans).'
  },
  {
    category: 'tours',
    q: 'What is included in the Araku 1N2D and Multi-Day Tour Packages?',
    a: 'Our all-inclusive tour packages include private AC vehicle with fuel, driver bhatta, AC hotel accommodation for overnight stays, all meals (breakfast, lunch, dinner), and doorstep pickup and drop across Vizag.'
  },
  {
    category: 'cancellation',
    q: 'What is your cancellation and refund policy?',
    a: 'We offer a 100% Refundable Advance Guarantee. If you cancel at least 6 hours before scheduled pickup time, your entire 20% advance token is refunded immediately with zero cancellation penalty.'
  },
  {
    category: 'cancellation',
    q: 'Can I reschedule my travel date or change the vehicle model?',
    a: 'Yes, free date changes and vehicle upgrades are available up to 4 hours prior to travel. Simply contact our 24/7 dispatch desk on WhatsApp (+91 98765 43210).'
  }
];

const FaqPage = () => {
  const navigate = useNavigate();
  const [selectedCat, setSelectedCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(0); // first item open by default
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const filteredFaqs = faqsList.filter((item) => {
    const matchCat = selectedCat === 'all' || item.category === selectedCat;
    const matchSearch = item.q.toLowerCase().includes(searchQuery.toLowerCase()) || item.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar onOpenBookingModal={(type, data) => {
        setModalData(data || {});
        setModalOpen(true);
      }} />

      <main className="flex-1 pt-24 pb-20">
        
        {/* Header Hero */}
        <section className="bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 text-white py-16 px-4 md:px-8 border-b border-slate-800 relative overflow-hidden text-center">
          <div className="container mx-auto max-w-4xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-amber-400 text-xs font-bold mb-3 shadow-sm">
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span>24/7 KNOWLEDGE BASE & CUSTOMER SUPPORT</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight leading-tight">
              Frequently Asked <span className="gradient-text-gold">Questions</span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
              Find instant answers about 20% advance online payments, outstation fares, driver bhatta, flight delays, and tour packages.
            </p>

            {/* Live Search Bar */}
            <div className="mt-8 max-w-xl mx-auto relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g. 20% advance, Araku, refund, driver bhatta)..."
                className="w-full bg-white text-slate-900 placeholder-slate-400 rounded-2xl pl-12 pr-4 py-4 text-sm font-semibold shadow-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </section>

        {/* Categories & Questions List */}
        <section className="container mx-auto max-w-4xl px-4 md:px-8 mt-10">
          
          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCat(cat.id)}
                className={`px-3.5 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                  selectedCat === cat.id
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md scale-105 border border-amber-400'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-2xs'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Accordion FAQ Items */}
          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                    isOpen ? 'border-amber-400 shadow-md ring-1 ring-amber-400/20' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">
                      {faq.q}
                    </span>
                    <div className={`p-1.5 rounded-full shrink-0 transition-transform ${isOpen ? 'bg-amber-500 text-slate-950 rotate-180' : 'bg-slate-100 text-slate-600'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 font-medium">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 space-y-2">
                <Info className="w-8 h-8 text-amber-500 mx-auto" />
                <h4 className="font-bold text-slate-800">No questions found matching your search</h4>
                <p className="text-xs text-slate-500">Contact our 24/7 helpdesk below for instant answers.</p>
              </div>
            )}
          </div>

          {/* Still Have Questions Box */}
          <div className="mt-12 bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
              Still Have Questions? We're Here 24/7
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              Our Visakhapatnam dispatch supervisors are available around the clock to help you with instant quotes, custom itineraries, and reservations.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href="https://wa.me/919876543210?text=Hello%20Vizag%20Taxi!%20I%20have%20a%20question%20about%20booking."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href="tel:+919876543210"
                className="btn-gold px-5 py-3 text-xs font-black flex items-center gap-2 shadow-md"
              >
                <Phone className="w-4 h-4 text-slate-950" />
                <span>Call 24/7 Dispatch (+91 98765 43210)</span>
              </a>
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

export default FaqPage;
