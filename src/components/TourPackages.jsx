import React from 'react';
import { Clock, Car, Star, ArrowRight } from 'lucide-react';

const packagesData = [
  {
    id: 'araku',
    name: 'Araku Valley Scenic Hill Tour',
    tagline: 'Mist-covered valleys & waterfalls',
    price: '₹3,499',
    duration: '1 Day (14 Hrs)',
    vehicle: 'Swift Dzire / Innova',
    image: '/araku.png',
    rating: 4.9,
    reviews: 420,
    highlights: ['Galikonda View', 'Coffee Museum', 'Borra Caves'],
  },
  {
    id: 'lambasingi',
    name: 'Lambasingi Kashmir of AP',
    tagline: 'Freezing temperatures & misty pine forests',
    price: '₹3,999',
    duration: '2 Days / 1 Night',
    vehicle: 'Ertiga / Innova',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviews: 310,
    highlights: ['Strawberry Farms', 'Cloud Bed View'],
  },
  {
    id: 'borra',
    name: 'Borra Caves Expedition',
    tagline: 'Million-year-old speleothem caves',
    price: '₹2,999',
    duration: '1 Day (10 Hrs)',
    vehicle: 'Sedan / SUV',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviews: 285,
    highlights: ['Light Show', 'Tyda Jungle Bells'],
  },
  {
    id: 'rkbeach',
    name: 'RK Beach & City Circuit',
    tagline: 'Beach road & submarine museum',
    price: '₹1,999',
    duration: 'Half Day (6 Hrs)',
    vehicle: 'Swift Dzire',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    reviews: 520,
    highlights: ['INS Kursura', 'TU 142 Museum'],
  },
  {
    id: 'yarada',
    name: 'Yarada Beach & Dolphin Nose',
    tagline: 'Golden sands & ocean cliff views',
    price: '₹2,499',
    duration: '1 Day (8 Hrs)',
    vehicle: 'Sedan / SUV',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviews: 190,
    highlights: ['Yarada Beach', 'Lighthouse View'],
  },
  {
    id: 'kailasagiri',
    name: 'Kailasagiri Hill Sightseeing',
    tagline: 'City panorama & ropeway ride',
    price: '₹1,899',
    duration: 'Half Day (6 Hrs)',
    vehicle: 'Dzire / Ertiga',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviews: 340,
    highlights: ['Ropeway Ride', 'Shiva Statue'],
  },
  {
    id: 'rushikonda',
    name: 'Rushikonda Beach Sports',
    tagline: 'Surfing, jet-skiing & clean sea beach',
    price: '₹2,199',
    duration: '1 Day (8 Hrs)',
    vehicle: 'Dzire / Ertiga',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviews: 410,
    highlights: ['Jet Skiing', 'Coastal Drive'],
  },
  {
    id: 'simhachalam',
    name: 'Simhachalam Temple Tour',
    tagline: '11th-century Narasimha Swamy shrine',
    price: '₹1,799',
    duration: 'Half Day (5 Hrs)',
    vehicle: 'All Vehicles',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    reviews: 620,
    highlights: ['Temple Shrine', 'Hill View'],
  },
];

const TourPackages = ({ onOpenBookingModal }) => {
  return (
    <section id="packages" className="py-8 md:py-12 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Title Header without Pill Badge or Arrow Buttons */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Explore Vizag <span className="gradient-text-orange">Tour Packages</span>
          </h2>
          <p className="text-slate-600 text-xs md:text-sm mt-1">
            Swipe horizontally to view all guided cab sightseeing packages.
          </p>
        </div>

        {/* Compact Horizontal Scrollable Cards Container */}
        <div className="flex gap-4 overflow-x-auto scrollbar-none pb-4 pt-1 -mx-4 px-4 md:mx-0 md:px-0">
          {packagesData.map((pkg) => (
            <div
              key={pkg.id}
              className="w-[250px] min-w-[250px] max-w-[250px] bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group shrink-0"
            >
              {/* Compact Image */}
              <div className="relative h-36 overflow-hidden bg-slate-900">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                {/* Price Tag */}
                <div className="absolute top-2.5 right-2.5 bg-orange-600 text-white font-extrabold px-2.5 py-1 rounded-full text-[11px]">
                  Starts {pkg.price}
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-2 left-2.5 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] text-white font-semibold">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{pkg.rating} ({pkg.reviews})</span>
                </div>
              </div>

              {/* Compact Body Content */}
              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                    {pkg.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    {pkg.tagline}
                  </p>
                </div>

                {/* Compact Info Badges */}
                <div className="space-y-1 pt-1.5 border-t border-slate-100 text-[11px]">
                  <div className="flex items-center justify-between text-slate-600 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-orange-500" />
                      <span>Duration</span>
                    </span>
                    <span className="text-slate-900 font-bold">{pkg.duration}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600 font-medium">
                    <span className="flex items-center gap-1">
                      <Car className="w-3 h-3 text-emerald-600" />
                      <span>Cab</span>
                    </span>
                    <span className="text-slate-900 font-bold line-clamp-1">{pkg.vehicle}</span>
                  </div>
                </div>

                {/* Compact Highlights */}
                <div className="flex flex-wrap gap-1">
                  {pkg.highlights.map((h) => (
                    <span key={h} className="text-[10px] bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-slate-700 font-medium">
                      {h}
                    </span>
                  ))}
                </div>

                {/* Compact Action Button */}
                <button
                  onClick={() => onOpenBookingModal('package', pkg)}
                  className="w-full btn btn-orange py-2 text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm mt-1"
                >
                  <span>Book Package</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TourPackages;
