import React from 'react';
import { Instagram, ExternalLink, Heart, MessageCircle } from 'lucide-react';

const instaPhotos = [
  {
    id: 1,
    image: '/hero-bg.png',
    title: 'Morning Coastal Drive in Vizag',
    likes: '1.4k',
    comments: '128'
  },
  {
    id: 2,
    image: '/araku.png',
    title: 'Misty Mornings at Araku Valley',
    likes: '2.1k',
    comments: '210'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    title: 'RK Beach Sunrise View',
    likes: '980',
    comments: '86'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80',
    title: 'Luxury Innova Crysta Fleet',
    likes: '1.8k',
    comments: '154'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80',
    title: 'Yarada Beach Horizon',
    likes: '1.2k',
    comments: '94'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
    title: 'Kailasagiri Hill Panorama',
    likes: '3.4k',
    comments: '340'
  }
];

const InstagramGallery = () => {
  return (
    <section className="section-padding bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="section-title-wrap">
          <div className="badge badge-orange mb-3">
            <Instagram className="w-4 h-4" />
            <span>@VizagTaxiOfficial</span>
          </div>
          <h2 className="section-title">
            Follow Our Journeys on <span className="gradient-text-orange">Instagram</span>
          </h2>
          <p className="section-subtitle">
            Get daily travel inspiration, scenic road clips, and real customer moments across Vizag.
          </p>
        </div>

        {/* 6-Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instaPhotos.map((item) => (
            <a
              key={item.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative h-60 rounded-2xl overflow-hidden shadow-md bg-slate-900 border border-slate-200"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                <Instagram className="w-6 h-6 text-orange-400 self-end" />
                <div>
                  <p className="text-xs font-bold line-clamp-2">{item.title}</p>
                  <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-300 font-semibold">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      {item.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5 text-amber-400" />
                      {item.comments}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Follow Button */}
        <div className="text-center mt-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-orange inline-flex items-center gap-2 px-8 py-3.5 shadow-lg hover:shadow-orange-500/40"
          >
            <Instagram className="w-5 h-5" />
            <span>Follow Us on Instagram</span>
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramGallery;
