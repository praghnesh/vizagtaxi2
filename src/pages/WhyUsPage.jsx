import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';
import WhyChooseUs from '../components/WhyChooseUs';
import ComparisonMatrix from '../components/ComparisonMatrix';
import Testimonials from '../components/Testimonials';
import {
  ShieldCheck,
  Award,
  Clock,
  HeartHandshake,
  Car,
  Phone,
  MessageCircle,
  Zap,
  CheckCircle2,
  Users,
  Star,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const stats = [
  { value: '50,000+', label: 'Successful Trips Completed', desc: 'Across Vizag, Araku & South India' },
  { value: '10+ Years', label: 'Continuous Operation Excellence', desc: 'Since 2014 in Visakhapatnam' },
  { value: '4.9 / 5', label: 'Google Verified Rating', desc: 'Over 3,800+ 5-star customer reviews' },
  { value: '100%', label: 'Confirmed Dispatch Guarantee', desc: 'Zero last-minute cab cancellations' },
];

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Zero Cancellation Guarantee',
    desc: 'Once your 20% advance is confirmed, your car and professional driver are 100% locked. We never cancel on you.'
  },
  {
    icon: Award,
    title: 'Verified & Background-Checked Drivers',
    desc: 'Every chauffeur is background-verified with police clearance, minimum 5+ years of highway driving, and polite etiquette.'
  },
  {
    icon: HeartHandshake,
    title: '100% Transparent Itemized Billing',
    desc: 'Zero hidden driver commissions or surprise night fees. You get exact breakdown of base fare, driver bhatta, and 5% GST.'
  },
  {
    icon: Clock,
    title: 'Punctual Doorstep Pickup & Airport Tracking',
    desc: 'Our driver arrives 10 minutes prior to pickup time. For VTZ airport arrivals, we track your flight live with 60 mins free waiting.'
  },
  {
    icon: Car,
    title: 'Immaculately Sanitized AC Fleet',
    desc: 'Daily car wash, chilled dual AC, comfortable push-back seats, ample boot luggage space, and mobile fast chargers.'
  },
  {
    icon: Phone,
    title: '24/7 Human Dispatch Helpdesk',
    desc: 'No automated robots. Connect with our Vizag dispatch coordinators anytime via WhatsApp (+91 98765 43210) or Call.'
  }
];

const WhyUsPage = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar onOpenBookingModal={(type, data) => {
        setModalData(data || {});
        setModalOpen(true);
      }} />

      <main className="flex-1 pt-24 pb-20">
        
        {/* Header Hero */}
        <section className="bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 text-white py-16 px-4 md:px-8 border-b border-slate-800 relative overflow-hidden text-center">
          <div className="container mx-auto max-w-5xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-amber-400 text-xs font-bold mb-3 shadow-sm">
              <Award className="w-4 h-4 text-amber-400" />
              <span>THE MOST TRUSTED TAXI SERVICE IN VISAKHAPATNAM</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight leading-tight">
              Why 50,000+ Travelers Choose <span className="gradient-text-gold">Vizag Taxi</span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
              We started with a simple promise: Transparent prices, spotless air-conditioned cars, and polite chauffeurs who treat you like family.
            </p>

            {/* Quick CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/outstation-cabs')}
                className="btn-gold px-6 py-3.5 text-xs sm:text-sm font-black flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <Zap className="w-4 h-4 text-slate-950 fill-slate-950" />
                <span>Book Outstation Cab</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/tour-packages')}
                className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>View Tour Packages</span>
              </button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto max-w-6xl px-4 md:px-8 -mt-8 relative z-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((st, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-black text-amber-600 font-mono">
                  {st.value}
                </div>
                <div className="font-extrabold text-xs sm:text-sm text-slate-900 mt-1">
                  {st.label}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Six Core Pillars */}
        <section className="container mx-auto max-w-6xl px-4 md:px-8 mt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-bold text-amber-600 tracking-wider">OUR CORE STANDARDS</span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-slate-900 mt-1">
              Built on Trust, Safety & Premium Quality
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pil, idx) => {
              const IconComp = pil.icon;
              return (
                <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-amber-400 shadow-sm hover:shadow-md transition-all space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">{pil.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{pil.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Comparison Table Section */}
        <section className="container mx-auto max-w-6xl px-4 md:px-8 mt-16">
          <ComparisonMatrix />
        </section>

        {/* Testimonials & Reviews */}
        <section className="container mx-auto max-w-6xl px-4 md:px-8 mt-16">
          <Testimonials />
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

export default WhyUsPage;
