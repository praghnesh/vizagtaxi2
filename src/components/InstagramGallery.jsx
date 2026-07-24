import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Instagram, ExternalLink, Heart, MessageCircle } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const instaPhotos = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    title: 'Morning Coastal Drive in Vizag',
    likes: '1.4k',
    comments: '128'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
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
    <section className="py-16 md:py-24 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200">
      
      {/* Glow */}
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-amber-100/40 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold mb-3 shadow-2xs">
            <Instagram className="w-4 h-4 text-amber-600" />
            <span>@VIZAGTAXIOFFICIAL</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-heading text-slate-900 tracking-tight">
            Coastal Moments <span className="gradient-text-gold">On Instagram</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-2">
            Daily travel clips, scenic hill road reels, and happy passenger photos across Visakhapatnam.
          </p>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={16}
          slidesPerView={2}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          className="pb-12"
        >
          {instaPhotos.map((item) => (
            <SwiperSlide key={item.id}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative h-60 rounded-3xl overflow-hidden glass-card-light border border-slate-200 block shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-extrabold line-clamp-1 group-hover:text-amber-300 transition-colors font-heading">
                    {item.title}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-300 mt-1 font-mono">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                      {item.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3 text-sky-400" />
                      {item.comments}
                    </span>
                  </div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default InstagramGallery;
