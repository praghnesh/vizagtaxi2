import React, { useState } from 'react';
import { HelpCircle, ChevronDown, PhoneCall } from 'lucide-react';

const faqs = [
  {
    q: 'How do I book a cab with Vizag Taxi?',
    a: 'You can book online through our instant reservation card, use the interactive Route Simulator slider, send a WhatsApp message to +91 98765 43210, or call our 24/7 helpline. Zero advance deposit required!'
  },
  {
    q: 'Are highway tolls and driver allowances included in tour packages?',
    a: 'Yes! All sightseeing packages (Araku, Lambasingi, Borra Caves) and outstation flat rates are 100% all-inclusive with driver allowance, fuel, and highway tolls.'
  },
  {
    q: 'Are drivers police-verified and experienced in Araku ghat roads?',
    a: 'Yes. Every chauffeur undergoes background verification and possesses minimum 5+ years mountain ghat road driving experience for maximum family safety.'
  },
  {
    q: 'What is your cancellation and refund policy?',
    a: 'We offer 100% free cancellation up to 2 hours prior to scheduled pickup. Zero cancellation penalties or surprise charges.'
  },
  {
    q: 'Do you offer pickup from Visakhapatnam Airport (VTZ)?',
    a: 'Yes, drivers monitor real-time flight status and wait at arrival gates with a personalized name card.'
  },
  {
    q: 'Can I hire a driver for my personal luxury car?',
    a: 'Yes! We provide certified "Chauffeur on Demand" services for city travel or outstation drives in your personal vehicle at affordable daily rates.'
  }
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200">
      
      {/* Glow */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-amber-100/50 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold mb-3 shadow-2xs">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>TRANSPARENT REASSURANCE & FAQ</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-heading text-slate-900 tracking-tight">
            Frequently Asked <span className="gradient-text-gold">Questions</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-2">
            Clear answers to common questions about cab bookings, hill tour permits, and payment options.
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-amber-50/40 border-amber-300 shadow-md'
                    : 'glass-panel-light border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm md:text-base text-slate-900 focus:outline-none cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 text-xs flex items-center justify-center font-black shrink-0 border border-amber-200">
                      ?
                    </span>
                    <span className="font-heading">{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-amber-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs md:text-sm text-slate-600 border-t border-slate-100 leading-relaxed font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Bar */}
        <div className="mt-10 max-w-xl mx-auto text-center p-6 glass-panel-light rounded-3xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="text-left">
            <h4 className="text-sm font-extrabold text-slate-900 font-heading">Have a custom query or large group requirement?</h4>
            <p className="text-xs text-slate-500">Our 24/7 human desk is standing by.</p>
          </div>
          <a
            href="tel:+919876543210"
            className="btn-gold text-xs px-5 py-2.5 shrink-0 flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5 text-white" />
            <span>Call +91 98765 43210</span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default FaqSection;
