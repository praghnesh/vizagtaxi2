import React from 'react';
import { Facebook, Instagram, Youtube, MessageCircle, Twitter, Linkedin, Share2 } from 'lucide-react';

const socials = [
  {
    name: 'Facebook',
    icon: Facebook,
    url: 'https://facebook.com',
    color: 'hover:bg-blue-600 hover:text-white hover:border-blue-600',
    badge: '12k Followers'
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://instagram.com',
    color: 'hover:bg-gradient-to-tr hover:from-amber-500 hover:to-rose-500 hover:text-white hover:border-rose-500',
    badge: '25k Followers'
  },
  {
    name: 'YouTube',
    icon: Youtube,
    url: 'https://youtube.com',
    color: 'hover:bg-red-600 hover:text-white hover:border-red-600',
    badge: '10k Subscribers'
  },
  {
    name: 'WhatsApp',
    icon: MessageCircle,
    url: 'https://wa.me/919876543210',
    color: 'hover:bg-emerald-600 hover:text-white hover:border-emerald-600',
    badge: 'Instant Support'
  },
  {
    name: 'Twitter (X)',
    icon: Twitter,
    url: 'https://twitter.com',
    color: 'hover:bg-sky-500 hover:text-white hover:border-sky-500',
    badge: 'Latest Updates'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com',
    color: 'hover:bg-blue-700 hover:text-white hover:border-blue-700',
    badge: 'Corporate'
  }
];

const SocialLinks = () => {
  return (
    <section className="py-10 bg-white border-b border-slate-200 text-slate-900 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left space-y-0.5">
            <div className="inline-flex items-center gap-1.5 text-orange-600 font-bold text-xs uppercase tracking-wider">
              <Share2 className="w-3.5 h-3.5" />
              <span>Connect With Vizag Taxi</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">Join Our Travel Community</h3>
            <p className="text-xs text-slate-500">Road condition alerts, travel tips, and seasonal discounts.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {socials.map((s) => {
              const IconComp = s.icon;
              return (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 transition-all duration-300 transform hover:-translate-y-0.5 ${s.color} shadow-2xs group`}
                >
                  <IconComp className="w-4 h-4 text-orange-500 group-hover:text-white group-hover:scale-110 transition-all" />
                  <div className="text-left">
                    <div className="text-xs font-bold leading-none">{s.name}</div>
                    <div className="text-[10px] text-slate-500 group-hover:text-white/90 mt-0.5">{s.badge}</div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialLinks;
