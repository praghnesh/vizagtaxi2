import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Clock, Car, Star, ArrowRight, Compass, X, CheckCircle2, MapPin, Zap, Layers, Camera } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const packagesData = [
  {
    id: 'araku_1day',
    category: 'Hill Stations',
    name: 'Araku 1 Day Tour',
    tagline: 'Borra Caves, Katiki Waterfalls, Coffee Plantation & 9 Scenic Spots',
    price: '₹3,499',
    duration: '1 Day (14 Hrs)',
    vehicle: 'Swift Dzire / Ertiga / Innova',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviews: 450,
    highlights: ['Borra Caves', 'Katiki Waterfalls', 'Galikonda Viewpoint', 'Coffee Plantation', 'Tyda Park', 'Tribal & Coffee Museum', 'Padmavathi Gardens'],
    locations: [
      '1. Borra Caves',
      '2. Katiki Waterfalls (Parking Point)',
      '3. Galikonda View Point',
      '4. Wooden Bridge',
      '5. Coffee Plantation',
      '6. Tyda Adventure Park',
      '7. Tribal Museum',
      '8. Coffee Museum',
      '9. Padmavathi Gardens'
    ],
    itinerary: [
      { time: '06:30 AM', title: 'Pickup from Vizag Hotel / Station', desc: 'Scenic morning drive towards Araku Valley winding ghat roads.' },
      { time: '09:00 AM', title: 'Borra Caves & Katiki Waterfalls', desc: 'Explore 1 million-year-old stalactite limestone caves & natural waterfall pool.' },
      { time: '11:30 AM', title: 'Galikonda Viewpoint & Wooden Bridge', desc: 'Enjoy 360-degree highest altitude valley panorama.' },
      { time: '01:30 PM', title: 'Coffee Plantation & Museums', desc: 'Taste fresh organic Araku coffee, visit Tribal Museum & Coffee Museum.' },
      { time: '04:30 PM', title: 'Padmavathi Gardens & Tyda Park', desc: 'Stroll through lush gardens and eco-tourism adventure park.' },
      { time: '08:30 PM', title: 'Return Drop to Vizag', desc: 'Safe night highway drop to Visakhapatnam Hotel / Railway Station.' }
    ]
  },
  {
    id: 'araku_1n2d',
    category: 'Hill Stations',
    name: 'Araku 1N2D Tour Package',
    tagline: 'Borra Caves, Katiki Waterfalls, Araku Night Stay, Coffee Gardens & Chaparai',
    price: '₹8,000',
    duration: '2 Days / 1 Night',
    vehicle: 'Sedan / Ertiga / Innova / TT',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviews: 380,
    highlights: ['Borra Caves & Katiki Waterfalls', 'Galikonda Viewpoint', 'Araku AC Hotel Stay', 'Chaparai Water Cascade', 'Coffee Plantation & Museums'],
    locations: [
      '1. Borra Caves',
      '2. Katiki Waterfalls (Parking Point)',
      '3. Galikonda View Point',
      '4. Wooden Bridge',
      '5. Chaparai Water Cascade',
      '6. Coffee Plantation',
      '7. Tyda Adventure Park',
      '8. Tribal Museum & Dhimsa Dance',
      '9. Coffee Museum',
      '10. Padmavathi Gardens'
    ]
  },
  {
    id: 'vizag_1day',
    category: 'Coastal & Beach',
    name: 'Vizag 1 Day Tour',
    tagline: 'Rushikonda, Bheemili Beach, Submarine, Aircraft Museum & 13 Attractions',
    price: '₹1,999',
    duration: '1 Day (10 Hrs)',
    vehicle: 'Swift Dzire / Etios / SUV',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviews: 580,
    highlights: ['Submarine & Aircraft Museums', 'Rushikonda & Bheemili Beach', 'Kailasagiri & Natural Arch', 'Tenneti & RK Beach'],
    locations: [
      '1. Rushikonda TTD Temple',
      '2. Thotlakonda Buddha Monuments',
      '3. Ramanaidu Studios',
      '4. Bheemili Beach',
      '5. Thotlakonda Natural Arch',
      '6. Rushikonda Beach',
      '7. Zoo Park',
      '8. Kailasagiri Hilltop',
      '9. Tenneti Park',
      '10. INS Kursura Submarine Museum',
      '11. Visakha Museum',
      '12. TU 142 Aircraft Museum',
      '13. RK Beach Sunset Point'
    ],
    itinerary: [
      { time: '08:30 AM', title: 'Morning Pickup & Coastal Drive', desc: 'Visit Rushikonda TTD Temple, Thotlakonda Buddha Site & Ramanaidu Studios.' },
      { time: '11:00 AM', title: 'Bheemili Beach & Natural Arch', desc: 'Scenic beach drive, Natural Arch & Rushikonda Beach water sports.' },
      { time: '01:30 PM', title: 'Lunch & Zoo Park / Kailasagiri', desc: 'Ropeway ride at Kailasagiri & panoramic view of Vizag city.' },
      { time: '04:00 PM', title: 'Submarine, Aircraft & Visakha Museum', desc: 'Tour famous decommissioned Navy Submarine & TU-142 Aircraft Museum.' },
      { time: '06:30 PM', title: 'Tenneti Park & RK Beach', desc: 'Sunset ocean breeze at RK Beach and return drop.' }
    ]
  },
  {
    id: 'vizag_2days',
    category: 'Coastal & Beach',
    name: 'Vizag 2 Days Tour',
    tagline: 'Complete 2-Day Vizag: Coastal Drive, Museums, Yarada Beach & Simhachalam',
    price: '₹3,499',
    duration: '2 Days',
    vehicle: 'Swift Dzire / Ertiga / Innova',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviews: 320,
    highlights: ['Day 1: 13 Coastal & Museum Spots', 'Day 2: Simhachalam Shrine, Yarada Beach, Dolphin Nose & Shopping'],
    locations: [
      'DAY 1 SIGHTSEEING (13 Locations):',
      '1. Rushikonda TTD Temple',
      '2. Thotlakonda Buddha Monuments',
      '3. Ramanaidu Studios',
      '4. Bheemili Beach',
      '5. Thotlakonda Natural Arch',
      '6. Rushikonda Beach',
      '7. Zoo Park',
      '8. Kailasagiri',
      '9. Tenneti Park',
      '10. Submarine Museum',
      '11. Visakha Museum',
      '12. Aircraft Museum',
      '13. RK Beach',
      'DAY 2 SIGHTSEEING (8 Locations):',
      '1. Simhachalam Temple',
      '2. Yarada Beach',
      '3. Lighthouse',
      '4. Dolphin Nose',
      '5. Fishing Harbour',
      '6. Kanaka Mahalaxmi Temple',
      '7. Central Park',
      '8. Inorbit Mall or City Shopping'
    ],
    itinerary: [
      { time: 'Day 1', title: 'Complete Coastal & Museum Tour (13 Locations)', desc: 'Rushikonda TTD, Thotlakonda, Ramanaidu Studios, Bheemili, Kailasagiri, Submarine & Aircraft Museums.' },
      { time: 'Day 2', title: 'Simhachalam Temple, Yarada Beach & Shopping (8 Locations)', desc: 'Simhachalam Darshan, Yarada Golden Sands, Dolphin Nose Lighthouse, Fishing Harbour & Inorbit Mall.' }
    ]
  },
  {
    id: 'vizag_araku_3days',
    category: 'Combined Tours',
    name: 'Vizag 2 Days & Araku 1 Day Tour',
    tagline: '3 Days Complete Combo: 13 Coastal Spots, Simhachalam, Yarada & Araku Valley',
    price: '₹6,999',
    duration: '3 Days',
    vehicle: 'Sedan / Ertiga / Innova / Tempo',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    reviews: 410,
    highlights: ['Day 1: 13 Vizag Coastal Attractions', 'Day 2: Simhachalam & Yarada Beach', 'Day 3: Borra Caves & Araku Valley'],
    locations: [
      'DAY 1: 13 Vizag Coastal & Museum Locations',
      'DAY 2: Simhachalam Temple, Yarada Beach, Dolphin Nose & Shopping',
      'DAY 3: Borra Caves, Katiki Waterfalls, Galikonda, Coffee Plantation, Tyda & Gardens'
    ],
    itinerary: [
      { time: 'Day 1', title: 'Vizag City & Coastal Explorer (13 Spots)', desc: 'Full-day coastal highway tour, Museums & Kailasagiri.' },
      { time: 'Day 2', title: 'Simhachalam, Yarada Beach & City (8 Spots)', desc: 'Pilgrimage darshan, cliffside ocean view & city shopping.' },
      { time: 'Day 3', title: 'Araku Valley Hill Station & Borra Caves (9 Spots)', desc: '1 Million-year-old caves, waterfalls, coffee gardens & gardens.' }
    ]
  },
  {
    id: 'vizag_araku_lambasingi_4days',
    category: 'Combined Tours',
    name: 'Vizag, Araku & Lambasingi Package',
    tagline: '3N/4D Ultimate Tour: Coastal Beaches, Borra Caves & Kashmir of AP',
    price: '₹9,999',
    duration: '4 Days / 3 Nights',
    vehicle: 'Maruti Ertiga / Innova Crysta / Tempo',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviews: 290,
    highlights: ['Vizag Beaches & Museums', 'Simhachalam & Yarada', 'Araku Valley & Borra Caves', 'Lambasingi Cloud Bed & Waterfalls'],
    locations: [
      'Day 1: Vizag Coastal & Museums (Rushikonda, Kailasagiri, Submarine, Aircraft)',
      'Day 2: Simhachalam Shrine, Yarada Beach, Dolphin Nose & Shopping',
      'Day 3: Araku Valley, Borra Caves, Katiki Waterfalls & Coffee Gardens',
      'Day 4: Lambasingi Cloud Bed Sunrise, Strawberry Orchards & Kothapalli Waterfalls'
    ],
    itinerary: [
      { time: 'Day 1', title: 'Vizag Coastal & Heritage Tour', desc: 'Explore coastal sights, Navy submarine & aircraft museum.' },
      { time: 'Day 2', title: 'Simhachalam, Yarada Beach & Dolphin Nose', desc: 'Temple darshan, golden beach & lighthouse panoramic view.' },
      { time: 'Day 3', title: 'Araku Valley & Borra Caves Tour', desc: 'Winding ghats, stalactite caves & tribal culture.' },
      { time: 'Day 4', title: 'Lambasingi Freezing Mist & Waterfall', desc: 'Early morning cloud bed sunrise, strawberry fields & return drop.' }
    ]
  },
  {
    id: 'vizag_annavaram',
    category: 'Spiritual Pilgrimage',
    name: 'Vizag to Annavaram Temple Tour',
    tagline: 'Holy Ratnagiri Satyanarayana Swamy Shrine & Pampa River',
    price: '₹2,999',
    duration: '1 Day',
    vehicle: 'Swift Dzire / SUV',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviews: 380,
    highlights: ['Annavaram Satyanarayana Swamy Darshan', 'Ratnagiri Hill Drive', 'Pampa River Barrage'],
    locations: [
      '1. Ratnagiri Hilltop Temple',
      '2. Lord Veera Venkata Satyanarayana Swamy Shrine',
      '3. Pampa River & Barrage View',
      '4. Annavaram Vratam Hall & Ghat Road Drive'
    ],
    itinerary: [
      { time: '06:00 AM', title: 'Pickup from Vizag Hotel / Station', desc: 'Comfortable NH-16 highway drive to Annavaram.' },
      { time: '09:00 AM', title: 'Ratnagiri Hill Arrival & Vratam Puja', desc: 'Priority assistance for Satyanarayana Swamy Vratam & Darshan.' },
      { time: '01:30 PM', title: 'Prasadam Lunch & Pampa River View', desc: 'Holy prasadam lunch and scenic river barrage visit.' },
      { time: '06:00 PM', title: 'Return Drop to Vizag', desc: 'Comfortable evening return drop to Visakhapatnam.' }
    ]
  }
];

const outstationCities = [
  'Amadalavalasa', 'Annavaram', 'Araku Valley', 'Arasavalli', 'Bangalore', 'Bhadrachalam',
  'Bhubaneswar', 'Bobbili', 'Chennai', 'Eluru', 'Guntur', 'Hyderabad',
  'Ichchapuram', 'Jagdalpur', 'Kakinada', 'Khammam', 'Kolkata', 'Kurnool',
  'Lambasingi', 'Narasannapeta', 'Nellore', 'Palakollu', 'Palakonda', 'Palasa',
  'Parvathipuram', 'Raipur', 'Rajahmundry', 'Ravulapalem', 'Razam', 'Sompeta',
  'Srikakulam', 'Srimukhalingam', 'Tirupati', 'Tuni', 'Vijayawada', 'Vizianagaram'
];

const TourPackages = ({ onOpenBookingModal }) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItineraryPkg, setSelectedItineraryPkg] = useState(null);

  const categories = ['All', 'Popular Tour Packages', 'Hill Stations', 'Coastal & Beach', 'Combined Tours', 'Spiritual Pilgrimage', 'Outstation Cities (36)'];

  const filteredPackages = activeCategory === 'All'
    ? packagesData
    : activeCategory === 'Popular Tour Packages'
    ? packagesData.filter(p => ['araku_1day', 'vizag_1day', 'vizag_2days', 'vizag_araku_3days'].includes(p.id))
    : activeCategory === 'Outstation Cities (36)'
    ? []
    : packagesData.filter(p => p.category === activeCategory);

  return (
    <section id="packages" className="py-12 md:py-18 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200">
      
      {/* Background Soft Glow */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-amber-100/40 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-bold mb-2 shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>VISAKHAPATNAM & OUTSTATION TOUR EXPLORER</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading text-slate-900 tracking-tight">
            Official Vizag & Araku <span className="gradient-text-gold">Tour Packages</span>
          </h2>
          <p className="text-slate-600 text-xs md:text-sm mt-1 max-w-xl mx-auto">
            Verified private AC cab tour itineraries with experienced mountain chauffeurs & door-step pickup.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-amber-500 text-white font-black shadow-sm scale-102'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Outstation 36 Cities Pills Section */}
        {activeCategory === 'Outstation Cities (36)' && (
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 max-w-5xl mx-auto mb-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-black text-slate-900 font-heading">Explore All 36 Outstation Destinations</h3>
              </div>
              <span className="text-xs font-extrabold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                Direct Cab Service
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {outstationCities.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => onOpenBookingModal('tour', { name: `${city} Outstation Tour`, destination: city })}
                  className="px-3.5 py-2 rounded-2xl bg-white hover:bg-amber-500 hover:text-white text-slate-800 font-bold text-xs border border-slate-200 transition-all cursor-pointer shadow-2xs hover:shadow-md hover:scale-105 flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-500 group-hover:text-white" />
                  <span>{city}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="glass-card-light rounded-2xl md:rounded-3xl overflow-hidden flex flex-col justify-between h-full border border-slate-200 hover:border-amber-400 group shadow-md transition-all hover:shadow-xl cursor-pointer"
              onClick={() => navigate('/tour-packages', { state: { packageId: pkg.id } })}
            >
              {/* Image Banner */}
              <div className="relative h-44 sm:h-52 overflow-hidden bg-slate-100 shrink-0">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />

                <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 font-black px-3 py-1 rounded-full text-xs shadow-md">
                  Starts {pkg.price}
                </div>

                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs text-slate-900 font-bold border border-slate-200 shadow-2xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{pkg.rating} ({pkg.reviews} reviews)</span>
                </div>
              </div>

              {/* Body Details */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest block">{pkg.category}</span>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors mt-0.5 font-heading leading-tight">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {pkg.tagline}
                  </p>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-1.5 text-slate-700 font-semibold truncate">
                    <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700 font-semibold truncate">
                    <Car className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{pkg.vehicle.split('/')[0]}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">Key Visiting Spots:</div>
                  {pkg.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/tour-packages', { state: { packageId: pkg.id } });
                    }}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 border border-slate-200 transition-all text-center cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Camera className="w-3.5 h-3.5 text-amber-600" />
                    <span>View Photos & Spots</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/tour-packages', { state: { packageId: pkg.id } });
                    }}
                    className="btn-gold py-2.5 px-3 text-xs font-black text-white flex items-center justify-center gap-1 cursor-pointer shadow-md"
                  >
                    <span>View Cars & Rates</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Itinerary & Visiting Locations Modal */}
      {selectedItineraryPkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white max-w-lg w-full max-h-[88vh] overflow-y-auto p-6 md:p-8 rounded-3xl border border-amber-300 shadow-2xl text-slate-900 relative">
            <button
              onClick={() => setSelectedItineraryPkg(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">{selectedItineraryPkg.category}</span>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 font-heading mt-0.5">{selectedItineraryPkg.name}</h3>
            <p className="text-xs text-slate-600 mt-0.5 font-medium">
              Duration: <strong className="text-slate-900">{selectedItineraryPkg.duration}</strong> • Package Rate: <span className="text-amber-700 font-extrabold text-sm">{selectedItineraryPkg.price}</span>
            </p>

            {/* Complete Locations Checklist */}
            <div className="mt-5 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>All Included Visiting Locations ({selectedItineraryPkg.locations.length} Spots):</span>
              </h4>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs font-bold text-slate-800">
                {selectedItineraryPkg.locations.map((loc, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{loc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Day Timeline */}
            <div className="mt-5 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-emerald-700">Tour Schedule & Itinerary Timeline:</h4>
              <div className="space-y-2">
                {selectedItineraryPkg.itinerary.map((item, idx) => (
                  <div key={idx} className="bg-amber-50/50 p-3 rounded-2xl border border-amber-200/80 flex gap-2.5">
                    <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 font-mono text-[10px] font-black shrink-0 self-start">
                      {item.time}
                    </span>
                    <div>
                      <div className="font-extrabold text-xs text-slate-900">{item.title}</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-200">
              <button
                onClick={() => {
                  const pkg = selectedItineraryPkg;
                  setSelectedItineraryPkg(null);
                  onOpenBookingModal('tour', pkg);
                }}
                className="btn-gold w-full py-3.5 text-xs font-black cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <span>Book This Tour Package ({selectedItineraryPkg.price})</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default TourPackages;
