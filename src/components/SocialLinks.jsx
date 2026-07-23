import React from 'react';
import { Facebook, Instagram, Youtube, MessageCircle, Twitter, Linkedin, Share2 } from 'lucide-react';

const socials = [
  {
    name: 'Facebook',
    icon: Facebook,
    url: 'https://facebook.com',
    color: 'hover:bg-blue-600 hover:shadow-blue-500/30',
    badge: '12k Followers'
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://instagram.com',
    color: 'hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 hover:shadow-rose-500/30',
    badge: '25k Followers'
  },
  {
    name: 'YouTube',
    icon: Youtube,
    url: 'https://youtube.com',
    color: 'hover:bg-red-600 hover:shadow-red-500/30',
    badge: '10k Subscribers'
  },
  {
    name: 'WhatsApp',
    icon: MessageCircle,
    url: 'https://wa.me/919876543210',
    color: 'hover:bg-emerald-600 hover:shadow-emerald-500/30',
    badge: 'Instant Support'
  },
  {
    name: 'Twitter (X)',
    icon: Twitter,
    url: 'https://twitter.com',
    color: 'hover:bg-sky-500 hover:shadow-sky-500/30',
    badge: 'Latest Updates'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com',
    color: 'hover:bg-blue-700 hover:shadow-blue-700/30',
    badge: 'Corporate Network'
  }
];

const SocialLinks = () => {
  return (
    <section className="py-12 bg-slate-900 border-t border-b border-white/10 text-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left space-y-1">
            <div className="inline-flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-wider">
              <Share2 className="w-4 h-4" />
              <span>Connect With Vizag Taxi</span>
            </div>
            <h3 className="text-2xl font-bold text-white">Join Our Travel Community</h3>
            <p className="text-xs text-slate-400">Stay updated with road condition alerts, travel tips, and seasonal discounts.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {socials.map((s) => {
              const IconComp = s.icon;
              return (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-800 border border-white/10 text-slate-200 transition-all duration-300 transform hover:-translate-y-1 hover:text-white ${s.color} shadow-lg group`}
                >
                  <IconComp className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="text-xs font-bold leading-none">{s.name}</div>
                    <div className="text-[10px] text-slate-400 group-hover:text-white/80 mt-0.5">{s.badge}</div>
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
