import React from 'react';
import { Check, X, ShieldCheck, Zap, Award, Star } from 'lucide-react';

const comparisonData = [
  {
    feature: 'Driver Cancellation Rate',
    vizagTaxi: '0% Guaranteed (No Drivers Cancel)',
    competitors: 'High Cancellation Rate',
  },
  {
    feature: 'Surge Pricing during Peak & Rain',
    vizagTaxi: 'Zero Surge (100% Fixed Rates)',
    competitors: '2x to 3x Surge Charges',
  },
  {
    feature: 'Araku Hill Station & Ghat Drivers',
    vizagTaxi: 'Verified Mountain Experienced Chauffeurs',
    competitors: 'Random / Unexperienced Drivers',
  },
  {
    feature: 'Luggage & Waiting Time Charges',
    vizagTaxi: 'Free Waiting & Luggage Assist',
    competitors: 'Heavy Per-Minute Wait Penalties',
  },
  {
    feature: 'Vehicle Hygiene & AC Comfort',
    vizagTaxi: '100% Sanitized AC Fleet Guaranteed',
    competitors: 'Inconsistent Vehicle Condition',
  },
  {
    feature: '24/7 Live Phone & WhatsApp Support',
    vizagTaxi: 'Instant Human Helpline Dispatch',
    competitors: 'Bot Chatbot Only',
  },
];

const ComparisonMatrix = () => {
  return (
    <section id="comparison" className="py-16 md:py-24 bg-slate-50 text-slate-900 relative overflow-hidden border-b border-slate-200">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-amber-100/50 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold mb-3 shadow-2xs">
            <Award className="w-4 h-4 text-amber-600" />
            <span>WHY WE ARE VISAKHAPATNAM'S #1 CAB SERVICE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-heading text-slate-900 tracking-tight">
            How We Compare <span className="gradient-text-gold">Head-to-Head</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-2">
            See why thousands of tourists & Vizag locals trust us over generic ride-hailing apps.
          </p>
        </div>

        {/* Comparison Table Box */}
        <div className="max-w-4xl mx-auto glass-panel-light p-6 md:p-8 rounded-3xl overflow-x-auto shadow-md border border-slate-200">
          
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="pb-4 text-xs font-extrabold uppercase tracking-wider text-slate-500 w-2/5">
                  Service Feature
                </th>
                <th className="pb-4 text-xs font-black uppercase tracking-wider text-amber-800 w-2/5 bg-amber-50 px-4 pt-3 rounded-t-2xl border-t border-x border-amber-200">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span>VIZAG TAXI (VIP)</span>
                  </div>
                </th>
                <th className="pb-4 text-xs font-bold uppercase tracking-wider text-slate-500 w-1/5 pl-4">
                  Aggregator Apps / Local
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs md:text-sm font-medium">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 font-bold text-slate-800 pr-4">
                    {row.feature}
                  </td>
                  <td className="py-4 font-black text-amber-700 bg-amber-50/70 px-4 border-x border-amber-200">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{row.vizagTaxi}</span>
                    </div>
                  </td>
                  <td className="py-4 text-slate-600 pl-4">
                    <div className="flex items-center gap-2 text-slate-500">
                      <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                        <X className="w-3.5 h-3.5" />
                      </div>
                      <span>{row.competitors}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

      </div>
    </section>
  );
};

export default ComparisonMatrix;
