import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';
import { Clock, Car, Star, CheckCircle2, XCircle, MapPin, Compass, ArrowRight, ShieldCheck, Camera, Coffee, Utensils, Hotel, DollarSign, Sparkles, Layers } from 'lucide-react';

const arakuVehicleTariffs = [
  { name: 'Sedan Car (Dzire / Glanza)', seats: '4 Seats', price: 5500, bhatta: 'Included', category: 'Cars', image: '/fleet/swift_dzire.png' },
  { name: 'Mid-Size SUV (Creta / Brezza)', seats: '5 Seats', price: 6000, bhatta: 'Included', category: 'Cars', image: '/fleet/mid_suv.png' },
  { name: 'Maruti Ertiga', seats: '6-7 Seats', price: 6500, bhatta: 'Included', category: 'SUVs & MUVs', image: '/fleet/ertiga.png' },
  { name: 'Kia Carens', seats: '6-7 Seats', price: 7000, bhatta: 'Included', category: 'SUVs & MUVs', image: '/fleet/kia_carens.png' },
  { name: 'Innova Crysta', seats: '7 Seats', price: 8000, bhatta: 'Included', category: 'SUVs & MUVs', image: '/fleet/innova_crysta.png' },
  { name: 'Innova Hycross Hybrid', seats: '7 Seats', price: 8500, bhatta: 'Included', category: 'SUVs & MUVs', image: '/fleet/innova_hycross.png' },
  { name: 'Toyota Fortuner 4x4', seats: '7 Seats', price: 15000, bhatta: 'Included', category: 'Luxury', image: '/fleet/fortuner.png' },
  { name: '9-Seater Tempo Traveller', seats: '9 Seats', price: 10000, bhatta: 'Included', category: 'Tempo Travellers', image: '/fleet/tempo_traveller.png' },
  { name: '12-Seater Tempo Traveller', seats: '12 Seats', price: 11000, bhatta: 'Included', category: 'Tempo Travellers', image: '/fleet/tempo_traveller.png' },
  { name: '16-Seater Force Urbania', seats: '16 Seats', price: 14000, bhatta: 'Included', category: 'Tempo Travellers', image: '/fleet/urbania.png' },
  { name: '17-Seater Tempo Traveller', seats: '17 Seats', price: 13000, bhatta: 'Included', category: 'Tempo Travellers', image: '/fleet/tempo_traveller.png' },
  { name: '20-Seater Tempo Traveller AC', seats: '20 Seats', price: 14000, bhatta: 'Included', category: 'Tempo Travellers', image: '/fleet/tempo_traveller.png' },
  { name: '24-Seater AC Mini Bus', seats: '24 Seats', price: 15000, bhatta: 'Included', category: 'Buses', image: '/fleet/sleeper_bus.png' },
  { name: '28-Seater AC Mini Bus', seats: '28 Seats', price: 16000, bhatta: 'Included', category: 'Buses', image: '/fleet/sleeper_bus.png' },
  { name: '36-Seater AC Bus', seats: '36 Seats', price: 20000, bhatta: 'Included', category: 'Buses', image: '/fleet/sleeper_bus.png' },
  { name: '40-Seater AC Deluxe Coach', seats: '40 Seats', price: 25000, bhatta: 'Included', category: 'Buses', image: '/fleet/sleeper_bus.png' },
];

const araku1N2DVehicleTariffs = [
  { name: 'Sedan Car (Dzire / Glanza)', seats: '4 Seats', price: 8000, bhatta: 'Included', category: 'Cars', image: '/fleet/swift_dzire.png' },
  { name: 'Mid-Size SUV (Creta / Brezza)', seats: '5 Seats', price: 9000, bhatta: 'Included', category: 'Cars', image: '/fleet/mid_suv.png' },
  { name: 'Maruti Ertiga', seats: '6-7 Seats', price: 11000, bhatta: 'Included', category: 'SUVs & MUVs', image: '/fleet/ertiga.png' },
  { name: 'Kia Carens', seats: '6-7 Seats', price: 12000, bhatta: 'Included', category: 'SUVs & MUVs', image: '/fleet/kia_carens.png' },
  { name: 'Innova Crysta', seats: '7 Seats', price: 13000, bhatta: 'Included', category: 'SUVs & MUVs', image: '/fleet/innova_crysta.png' },
  { name: 'Innova Hycross Hybrid', seats: '7 Seats', price: 14000, bhatta: 'Included', category: 'SUVs & MUVs', image: '/fleet/innova_hycross.png' },
  { name: 'Toyota Fortuner 4x4', seats: '7 Seats', price: 30000, bhatta: 'Included', category: 'Luxury', image: '/fleet/fortuner.png' },
  { name: '9-Seater Tempo Traveller', seats: '9 Seats', price: 14000, bhatta: 'Included', category: 'Tempo Travellers', image: '/fleet/tempo_traveller.png' },
  { name: '12-Seater Tempo Traveller', seats: '12 Seats', price: 16000, bhatta: 'Included', category: 'Tempo Travellers', image: '/fleet/tempo_traveller.png' },
  { name: '16-Seater Force Urbania', seats: '16 Seats', price: 22000, bhatta: 'Included', category: 'Tempo Travellers', image: '/fleet/urbania.png' },
  { name: '17-Seater Tempo Traveller', seats: '17 Seats', price: 18000, bhatta: 'Included', category: 'Tempo Travellers', image: '/fleet/tempo_traveller.png' },
  { name: '20-Seater Tempo Traveller AC', seats: '20 Seats', price: 22000, bhatta: 'Included', category: 'Tempo Travellers', image: '/fleet/tempo_traveller.png' },
  { name: '24-Seater AC Mini Bus', seats: '24 Seats', price: 23000, bhatta: 'Included', category: 'Buses', image: '/fleet/sleeper_bus.png' },
  { name: '28-Seater AC Mini Bus', seats: '28 Seats', price: 25000, bhatta: 'Included', category: 'Buses', image: '/fleet/sleeper_bus.png' },
  { name: '36-Seater AC Bus', seats: '36 Seats', price: 30000, bhatta: 'Included', category: 'Buses', image: '/fleet/sleeper_bus.png' },
  { name: '40-Seater AC Deluxe Coach', seats: '40 Seats', price: 35000, bhatta: 'Included', category: 'Buses', image: '/fleet/sleeper_bus.png' },
];

const allOfficialTourPackages = [
  {
    id: 'araku_1day',
    name: 'Araku 1 Day Tour',
    duration: '1 Day (14 Hours)',
    tagline: 'Borra Caves, Katiki Waterfalls, Coffee Gardens & 9 Attractions',
    category: 'Hill Stations',
    popular: true,
    dayType: 1,
    inclusions: [
      'Private AC Vehicle with Mountain Chauffeur',
      'Driver Bhatta Allowance included',
      'Breakfast, Lunch & Evening Tea/Snacks included',
      'Doorstep Pickup & Drop from Vizag Hotel / Station'
    ],
    exclusions: [
      'Toll Gates & Highway Toll Receipts (Customer Pay)',
      'Monument, Cave & Sightseeing Entrance Tickets (Customer Pay)',
      'Personal Shopping & Extra Personal Expenses'
    ],
    visitingSpots: [
      { name: '1. Borra Caves', desc: '1 Million-year-old limestone stalactite cave formations', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
      { name: '2. Katiki Waterfalls', desc: 'Cascading natural waterfall pool at parking point', img: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=400&q=80' },
      { name: '3. Galikonda Viewpoint', desc: 'Highest altitude 360-degree Eastern Ghats valley panorama', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80' },
      { name: '4. Wooden Bridge', desc: 'Picturesque mountain stream wooden crossing', img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80' },
      { name: '5. Coffee Plantation', desc: 'Lush organic coffee gardens & tasting session', img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80' },
      { name: '6. Tyda Adventure Park', desc: 'Jungle bells eco-tourism adventure park', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80' },
      { name: '7. Tribal Museum', desc: 'Rich tribal heritage & Dhimsa dance exhibits', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80' },
      { name: '8. Coffee Museum', desc: 'Araku world-famous organic coffee history & shop', img: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=400&q=80' },
      { name: '9. Padmavathi Gardens', desc: 'Botanical rose gardens & toy train ride', img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80' }
    ],
    tariffs: arakuVehicleTariffs
  },
  {
    id: 'araku_1n2d',
    name: 'Araku 1N2D Tour Package',
    duration: '2 Days / 1 Night',
    tagline: 'Borra Caves, Katiki Waterfalls, Araku Night Stay, Coffee Plantation & Chaparai',
    category: 'Hill Stations',
    popular: true,
    dayType: 2,
    inclusions: [
      'Private AC Vehicle for 2 Full Days with Mountain Chauffeur',
      'Driver Bhatta Allowance for 2 Days included',
      '1 Night AC Hotel Accommodation Stay in Araku included',
      'All Meals Included: Breakfast, Lunch & Dinner included',
      'Doorstep Pickup & Drop from Vizag Hotel / Station'
    ],
    exclusions: [
      'Toll Gates & Highway Toll Receipts (Customer Pay)',
      'Monument, Cave & Sightseeing Entrance Tickets (Customer Pay)',
      'Personal Shopping & Extra Personal Expenses'
    ],
    visitingSpots: [
      { name: '1. Borra Caves', desc: '1 Million-year-old limestone stalactite cave formations', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
      { name: '2. Katiki Waterfalls', desc: 'Cascading natural waterfall pool at parking point', img: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=400&q=80' },
      { name: '3. Galikonda Viewpoint', desc: 'Highest altitude 360-degree Eastern Ghats valley panorama', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80' },
      { name: '4. Wooden Bridge', desc: 'Picturesque mountain stream wooden crossing', img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80' },
      { name: '5. Chaparai Cascade', desc: 'Natural water streams & smooth rock sliding area', img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80' },
      { name: '6. Coffee Plantation', desc: 'Lush organic coffee gardens & tasting session', img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80' },
      { name: '7. Tyda Adventure Park', desc: 'Jungle bells eco-tourism adventure park', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80' },
      { name: '8. Tribal Museum', desc: 'Rich tribal heritage & Dhimsa dance exhibits', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80' },
      { name: '9. Coffee Museum', desc: 'Araku world-famous organic coffee history & shop', img: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=400&q=80' },
      { name: '10. Padmavathi Gardens', desc: 'Botanical rose gardens & toy train ride', img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80' }
    ],
    tariffs: araku1N2DVehicleTariffs
  },
  {
    id: 'vizag_1day',
    name: 'Vizag 1 Day Tour',
    duration: '1 Day (10 Hours)',
    tagline: 'Rushikonda TTD, Bheemili Beach, Submarine, Aircraft Museum & 13 Locations',
    category: 'Coastal & Beach',
    popular: true,
    dayType: 1,
    inclusions: [
      'Private AC Vehicle with Driver',
      'Driver Bhatta Allowance included',
      'Breakfast, Lunch & Evening Tea/Snacks included',
      'Hotel / Station Pickup & Drop',
      'Fuel & Parking Included'
    ],
    exclusions: ['Museum & Submarine Entry Tickets', 'Personal Shopping'],
    visitingSpots: [
      { name: '1. Rushikonda TTD Temple', desc: 'Hilltop Lord Venkateswara Swamy shrine overlooking sea', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80' },
      { name: '2. Thotlakonda Buddha Monuments', desc: '2000-year-old ancient Buddhist monastery hill site', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80' },
      { name: '3. Ramanaidu Studios', desc: 'Hilltop film shooting studio with panoramic ocean view', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
      { name: '4. Bheemili Beach', desc: 'Colonial Dutch settlement & serene beach cove', img: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=400&q=80' },
      { name: '5. Thotlakonda Natural Arch', desc: 'Unique natural sea rock arch erosion structure', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
      { name: '6. Rushikonda Beach', desc: 'Blue Flag certified clean beach with water sports', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
      { name: '7. Indira Gandhi Zoo Park', desc: 'Spacious coastal sanctuary zoo with lush greenery', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80' },
      { name: '8. Kailasagiri Hilltop', desc: 'Panoramic hilltop park with ropeway & Shiva Parvathi statue', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80' },
      { name: '9. Tenneti Park', desc: 'Cliffside sea viewpoint park overlooking sunken cargo ship', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
      { name: '10. Submarine Museum', desc: 'INS Kursura decommissioned Russian-built Navy Submarine', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
      { name: '11. Visakha Museum', desc: 'Maritime history & regional heritage artifacts museum', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80' },
      { name: '12. TU 142 Aircraft Museum', desc: 'Decommissioned naval maritime reconnaissance aircraft', img: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=400&q=80' },
      { name: '13. RK Beach', desc: 'Iconic Ramakrishna Beach boulevard & evening stroll', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' }
    ],
    tariffs: arakuVehicleTariffs.map(v => ({ ...v, price: Math.round(v.price * 0.65) }))
  },
  {
    id: 'vizag_2days',
    name: 'Vizag 2 Days Tour',
    duration: '2 Days / 1 Night',
    tagline: 'Complete Vizag: 13 Coastal Sights + Simhachalam, Yarada Beach & Dolphin Nose (21 Spots)',
    category: 'Coastal & Beach',
    popular: true,
    dayType: 2,
    inclusions: [
      'Private AC Vehicle for 2 Full Days',
      'Driver Bhatta for 2 Days included',
      'AC Hotel Accommodation Stay included',
      'Breakfast, Lunch & Dinner included',
      'Toll & Parking Included'
    ],
    exclusions: ['Entry Tickets', 'Personal Shopping'],
    visitingSpots: [
      { name: 'Day 1: 1. Rushikonda TTD Temple', desc: 'Hilltop Lord Venkateswara Swamy shrine overlooking sea', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 2. Thotlakonda Buddha Monuments', desc: '2000-year-old ancient Buddhist monastery hill site', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 3. Ramanaidu Studios', desc: 'Hilltop film shooting studio with panoramic ocean view', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 4. Bheemili Beach', desc: 'Colonial Dutch settlement & serene beach cove', img: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 5. Thotlakonda Natural Arch', desc: 'Unique natural sea rock arch erosion structure', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 6. Rushikonda Beach', desc: 'Blue Flag certified clean beach with water sports', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 7. Indira Gandhi Zoo Park', desc: 'Spacious coastal sanctuary zoo with lush greenery', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 8. Kailasagiri Hilltop', desc: 'Panoramic hilltop park with ropeway & Shiva Parvathi statue', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 9. Tenneti Park', desc: 'Cliffside sea viewpoint park overlooking sunken cargo ship', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 10. Submarine Museum', desc: 'INS Kursura decommissioned Russian-built Navy Submarine', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 11. Visakha Museum', desc: 'Maritime history & regional heritage artifacts museum', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 12. TU 142 Aircraft Museum', desc: 'Decommissioned naval maritime reconnaissance aircraft', img: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 13. RK Beach', desc: 'Iconic Ramakrishna Beach boulevard & evening stroll', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 2: 1. Simhachalam', desc: 'Lord Narasimha Swamy Varaha shrine darshan', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 2: 2. Yarada Beach', desc: 'Pristine golden sand beach surrounded by green hills', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 2: 3. Lighthouse', desc: 'Dolphin Nose hilltop marine beacon lighthouse', img: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 2: 4. Dolphin Nose', desc: '358-meter high promontory rock cliff viewpoint', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 2: 5. Fishing Harbour', desc: 'Bustling sea port with hundreds of colorful trawler boats', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 2: 6. Kanaka Mahalaxmi Temple', desc: 'Powerful open-air Goddess shrine in Burujupeta', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 2: 7. Central Park', desc: 'VMRDA urban park with musical dancing fountain', img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 2: 8. Inorbit Mall / Shopping', desc: 'City shopping bazaar & souvenirs purchase', img: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=400&q=80' }
    ],
    tariffs: arakuVehicleTariffs.map(v => ({ ...v, price: Math.round(v.price * 1.6) }))
  },
  {
    id: 'vizag_araku_3days',
    name: 'Vizag 2D & Araku 1D Combo Tour',
    duration: '3 Days / 2 Nights',
    tagline: '3 Days Complete Combo: 13 Coastal Spots + 8 Heritage Spots + 9 Araku Valley Spots (30 Locations)',
    category: 'Combined Tours',
    popular: true,
    dayType: 3,
    inclusions: [
      'Private AC Vehicle for 3 Full Days',
      'Driver Bhatta for 3 Days included',
      '2 Nights AC Hotel Stay included',
      'All Meals (Breakfast, Lunch & Dinner) included',
      'Ghat Road Tolls & Parking Included'
    ],
    exclusions: ['Entry Tickets', 'Personal Shopping'],
    visitingSpots: [
      { name: 'Day 1: 1. Rushikonda TTD Temple', desc: 'Hilltop Lord Venkateswara Swamy shrine overlooking sea', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 2. Thotlakonda Buddha Monuments', desc: '2000-year-old ancient Buddhist monastery hill site', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 3. Ramanaidu Studios', desc: 'Hilltop film shooting studio with panoramic ocean view', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 4. Bheemili Beach', desc: 'Colonial Dutch settlement & serene beach cove', img: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 5. Thotlakonda Natural Arch', desc: 'Unique natural sea rock arch erosion structure', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 6. Rushikonda Beach', desc: 'Blue Flag certified clean beach with water sports', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 7. Indira Gandhi Zoo Park', desc: 'Spacious coastal sanctuary zoo with lush greenery', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 8. Kailasagiri Hilltop', desc: 'Panoramic hilltop park with ropeway & Shiva Parvathi statue', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 9. Tenneti Park', desc: 'Cliffside sea viewpoint park overlooking sunken cargo ship', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 10. Submarine Museum', desc: 'INS Kursura decommissioned Russian-built Navy Submarine', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 11. Visakha Museum', desc: 'Maritime history & regional heritage artifacts museum', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 12. TU 142 Aircraft Museum', desc: 'Decommissioned naval maritime reconnaissance aircraft', img: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 13. RK Beach', desc: 'Iconic Ramakrishna Beach boulevard & evening stroll', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 2: 1. Simhachalam', desc: 'Lord Narasimha Swamy Varaha shrine darshan', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 2: 2. Yarada Beach', desc: 'Pristine golden sand beach surrounded by green hills', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 2: 3. Lighthouse', desc: 'Dolphin Nose hilltop marine beacon lighthouse', img: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 2: 4. Dolphin Nose', desc: '358-meter high promontory rock cliff viewpoint', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 2: 5. Fishing Harbour', desc: 'Bustling sea port with hundreds of colorful trawler boats', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 2: 6. Kanaka Mahalaxmi Temple', desc: 'Powerful open-air Goddess shrine in Burujupeta', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 2: 7. Central Park', desc: 'VMRDA urban park with musical dancing fountain', img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 2: 8. Inorbit Mall / Shopping', desc: 'City shopping bazaar & souvenirs purchase', img: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 3: 1. Borra Caves', desc: '1 Million-year-old limestone stalactite cave formations', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 3: 2. Katiki Waterfalls', desc: 'Cascading natural waterfall pool at parking point', img: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 3: 3. Galikonda Viewpoint', desc: 'Highest altitude 360-degree Eastern Ghats valley panorama', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 3: 4. Wooden Bridge', desc: 'Picturesque mountain stream wooden crossing', img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 3: 5. Coffee Plantation', desc: 'Lush organic coffee gardens & tasting session', img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 3: 6. Tyda Adventure Park', desc: 'Jungle bells eco-tourism adventure park', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 3: 7. Tribal Museum', desc: 'Rich tribal heritage & Dhimsa dance exhibits', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 3: 8. Coffee Museum', desc: 'Araku world-famous organic coffee history & shop', img: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 3: 9. Padmavathi Gardens', desc: 'Botanical rose gardens & toy train ride', img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80' }
    ],
    tariffs: arakuVehicleTariffs.map(v => ({ ...v, price: Math.round(v.price * 2.3) }))
  },
  {
    id: 'vizag_araku_lambasingi_4days',
    name: 'Vizag, Araku & Lambasingi Package',
    duration: '4 Days / 3 Nights',
    tagline: 'Ultimate Andhra Explorer: Beaches, Borra Caves & Lambasingi Kashmir of AP',
    category: 'Combined Tours',
    popular: true,
    dayType: 4,
    inclusions: [
      'Private AC Vehicle for 4 Full Days',
      'Driver Bhatta for 4 Days included',
      '3 Nights AC Hotel Accommodation Stay included',
      'Breakfast, Lunch & Dinner included',
      'All Highway Tolls & Parking Included'
    ],
    exclusions: ['Entry Tickets', 'Personal Shopping'],
    visitingSpots: [
      { name: 'Day 1: 1. Rushikonda TTD Temple', desc: 'Hilltop Lord Venkateswara Swamy shrine overlooking sea', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 2. Thotlakonda Buddha Monuments', desc: '2000-year-old ancient Buddhist monastery hill site', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 3. Ramanaidu Studios', desc: 'Hilltop film shooting studio with panoramic ocean view', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 4. Bheemili Beach', desc: 'Colonial Dutch settlement & serene beach cove', img: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 5. Thotlakonda Natural Arch', desc: 'Unique natural sea rock arch erosion structure', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 6. Rushikonda Beach', desc: 'Blue Flag certified clean beach with water sports', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 7. Indira Gandhi Zoo Park', desc: 'Spacious coastal sanctuary zoo with lush greenery', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 8. Kailasagiri Hilltop', desc: 'Panoramic hilltop park with ropeway & Shiva Parvathi statue', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 9. Tenneti Park', desc: 'Cliffside sea viewpoint park overlooking sunken cargo ship', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 10. Submarine Museum', desc: 'INS Kursura decommissioned Russian-built Navy Submarine', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 11. Visakha Museum', desc: 'Maritime history & regional heritage artifacts museum', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 12. TU 142 Aircraft Museum', desc: 'Decommissioned naval maritime reconnaissance aircraft', img: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 1: 13. RK Beach', desc: 'Iconic Ramakrishna Beach boulevard & evening stroll', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 2: 1. Simhachalam', desc: 'Lord Narasimha Swamy Varaha shrine darshan', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 2: 2. Yarada Beach', desc: 'Pristine golden sand beach surrounded by green hills', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 2: 3. Lighthouse', desc: 'Dolphin Nose hilltop marine beacon lighthouse', img: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 2: 4. Dolphin Nose', desc: '358-meter high promontory rock cliff viewpoint', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 2: 5. Fishing Harbour', desc: 'Bustling sea port with hundreds of colorful trawler boats', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 2: 6. Kanaka Mahalaxmi Temple', desc: 'Powerful open-air Goddess shrine in Burujupeta', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 2: 7. Central Park', desc: 'VMRDA urban park with musical dancing fountain', img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 2: 8. Inorbit Mall / Shopping', desc: 'City shopping bazaar & souvenirs purchase', img: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 3: 1. Borra Caves', desc: '1 Million-year-old limestone stalactite cave formations', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 3: 2. Katiki Waterfalls', desc: 'Cascading natural waterfall pool at parking point', img: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 3: 3. Galikonda Viewpoint', desc: 'Highest altitude 360-degree Eastern Ghats valley panorama', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 3: 4. Wooden Bridge', desc: 'Picturesque mountain stream wooden crossing', img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 3: 5. Coffee Plantation', desc: 'Lush organic coffee gardens & tasting session', img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 3: 6. Tyda Adventure Park', desc: 'Jungle bells eco-tourism adventure park', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 3: 7. Tribal Museum', desc: 'Rich tribal heritage & Dhimsa dance exhibits', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 3: 8. Coffee Museum', desc: 'Araku world-famous organic coffee history & shop', img: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 3: 9. Padmavathi Gardens', desc: 'Botanical rose gardens & toy train ride', img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 4: 1. Lambasingi Sunrise Point', desc: 'Famous Kashmir of Andhra misty cloud bed sunrise', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 4: 2. Organic Strawberry Farms', desc: 'Fresh strawberry picking & garden stroll', img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 4: 3. Kothapalli Waterfalls', desc: 'Cascading forest waterfall stream', img: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=400&q=80' },
      { name: 'Day 4: 4. Tajangi Reservoir', desc: 'Scenic mountain lake reservoir & zipline adventure', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80' }
    ],
    tariffs: arakuVehicleTariffs.map(v => ({ ...v, price: Math.round(v.price * 3.1) }))
  },
  {
    id: 'annavaram_1day',
    name: 'Vizag to Annavaram Temple Tour',
    duration: '1 Day (10 Hours)',
    tagline: 'Ratnagiri Hilltop Temple, Lord Satyanarayana Swamy Shrine & Pampa River',
    category: 'Spiritual Pilgrimage',
    popular: true,
    dayType: 1,
    inclusions: [
      'Private AC Vehicle with Driver',
      'Driver Bhatta Allowance included',
      'Breakfast & Lunch included',
      'Doorstep Hotel / Station Pickup & Drop',
      'Fuel & Parking Included'
    ],
    exclusions: [
      'Temple Special Darshan / Vratam Tickets (Customer Pay)',
      'Personal Shopping & Offerings'
    ],
    visitingSpots: [
      { name: 'Ratnagiri Hilltop Temple', desc: 'Sacred Hilltop Shrine of Sri Veera Venkata Satyanarayana Swamy', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80' },
      { name: 'Lord Satyanarayana Swamy Shrine', desc: 'Main sanctum sanctorum darshan & blessings', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80' },
      { name: 'Pampa River Barrage', desc: 'Scenic Pampa river reservoir & boat ride point', img: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=400&q=80' },
      { name: 'Satyanarayana Vratam Hall', desc: 'Holy Vratam performing hall on Ratnagiri hill', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' }
    ],
    tariffs: arakuVehicleTariffs.map(v => ({ ...v, price: Math.round(v.price * 0.75) }))
  }
];

const TourPackagesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedPkgId, setSelectedPkgId] = useState('araku_1day');
  const [viewMode, setViewMode] = useState('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.state?.packageId) {
      setSelectedPkgId(location.state.packageId);
    }
  }, [location.state]);

  const activePkg = allOfficialTourPackages.find(p => p.id === selectedPkgId) || allOfficialTourPackages[0];

  const handleBookVehicle = (tariff) => {
    const data = {
      type: 'Tour Package',
      vehicle: tariff.name,
      package: activePkg.name,
      estimatedFare: tariff.price,
      driverBhatta: 0, // Bhatta is already included!
      pickup: 'Visakhapatnam Railway Station / Hotel',
      destination: activePkg.name,
    };
    setModalData(data);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      <Navbar onOpenBookingModal={(type, data) => { setModalData(data); setIsModalOpen(true); }} />

      <main className="pt-24 pb-20">
        
        {/* Header Hero Banner */}
        <section className="bg-slate-900 text-white py-12 md:py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent pointer-events-none" />
          
          <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-black border border-amber-500/30 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OFFICIAL VIZAG & ARAKU TOUR PACKAGES & VEHICLE FLEET</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-white">
              All Popular <span className="text-amber-400">Tour Packages</span> & Vehicle Photos
            </h1>
            
            <p className="text-slate-300 text-xs md:text-sm mt-2 max-w-2xl mx-auto">
              Select your favorite vehicle model with transparent per-vehicle tariffs including Private AC Cab, Mountain Chauffeur, Meals & Hotel Stay options.
            </p>

            {/* Switch to Outstation Cabs link */}
            <div className="mt-4">
              <button
                type="button"
                onClick={() => navigate('/outstation-cabs')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold text-xs border border-emerald-400/40 transition-all cursor-pointer shadow-sm"
              >
                <Car className="w-4 h-4 text-emerald-400" />
                <span>Looking for Direct One-Way Drop or Round Trip? Open Outstation Cabs & Route Map →</span>
              </button>
            </div>

            {/* Quick Tour Package Switcher Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {allOfficialTourPackages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPkgId(pkg.id)}
                  className={`px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedPkgId === pkg.id
                      ? 'bg-amber-500 text-slate-950 shadow-lg scale-105 border border-amber-400'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  <Compass className={`w-3.5 h-3.5 ${selectedPkgId === pkg.id ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span>{pkg.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Selected Package Detailed View */}
        <section className="container mx-auto px-4 md:px-8 mt-8 max-w-6xl">
          
          {/* Main Info Banner */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-md space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <span className="text-xs font-black text-amber-700 uppercase tracking-widest block">{activePkg.category}</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading mt-1">{activePkg.name}</h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">{activePkg.tagline}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-slate-900">
                  <div className="text-[10px] text-amber-800 uppercase font-black">DURATION</div>
                  <div className="text-sm font-black font-mono">{activePkg.duration}</div>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-slate-900">
                  <div className="text-[10px] text-emerald-800 uppercase font-black">DRIVER BHATTA</div>
                  <div className="text-sm font-black text-emerald-700 font-mono">
                    {activePkg.dayType ? `${activePkg.dayType} DAYS INCLUDED` : '1 DAY INCLUDED'}
                  </div>
                </div>
              </div>
            </div>

            {/* Visiting Spots Photo Gallery Grid */}
            <div>
              <h3 className="text-sm sm:text-base font-black text-slate-900 font-heading mb-3 flex items-center gap-2">
                <Camera className="w-4 h-4 text-amber-600" />
                <span>Visiting Spots Photo Gallery ({(activePkg.visitingSpots || []).length} Locations)</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {(activePkg.visitingSpots || []).map((spot, idx) => (
                  <div key={idx} className="group rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-2xs hover:shadow-md transition-all">
                    <div className="h-28 sm:h-32 overflow-hidden relative">
                      <img src={spot.img} alt={spot.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                      <span className="absolute bottom-2 left-2 text-[11px] font-black text-white line-clamp-1">{spot.name}</span>
                    </div>
                    <div className="p-2.5 text-[10px] text-slate-600 line-clamp-2 font-medium">
                      {spot.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              
              {/* Inclusions */}
              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
                <h4 className="text-xs font-black text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>WHAT IS INCLUDED IN THIS TOUR PACKAGE:</span>
                </h4>

                <div className="space-y-2 text-xs text-slate-800 font-semibold">
                  {(activePkg.inclusions || []).map((inc, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exclusions */}
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
                <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-amber-600" />
                  <span>WHAT IS EXCLUDED:</span>
                </h4>

                <div className="space-y-2 text-xs text-slate-800 font-semibold">
                  {(activePkg.exclusions || []).map((exc, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <XCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{exc}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Per-Vehicle Visual Photo Cards Section */}
            <div className="pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 font-heading flex items-center gap-2">
                    <Car className="w-6 h-6 text-amber-600" />
                    <span>Select Vehicle Model & View Photos (Driver Bhatta Included)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click "Book Now" on your preferred vehicle to instantly open the booking desk.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1 cursor-pointer ${
                      viewMode === 'grid'
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Photo Cards</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewMode('table')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1 cursor-pointer ${
                      viewMode === 'table'
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Table View</span>
                  </button>
                </div>
              </div>

              {/* View 1: Visual Photo Cards Grid */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {(activePkg.tariffs || []).map((tariff, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-3xl border border-slate-200 hover:border-amber-400 p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                    >
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                          {tariff.category}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Driver Bhatta ({activePkg.dayType || 1} Days) Included</span>
                        </span>
                      </div>

                      {/* Vehicle Image */}
                      <div className="h-40 my-2 flex items-center justify-center relative overflow-hidden rounded-2xl bg-slate-50/80 border border-slate-100 p-2">
                        <img
                          src={tariff.image || '/fleet/swift_dzire.png'}
                          alt={tariff.name}
                          className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-500 drop-shadow-md"
                        />
                      </div>

                      {/* Details & Pricing */}
                      <div className="space-y-3 pt-2">
                        <div>
                          <h4 className="text-base font-black text-slate-900 group-hover:text-amber-600 transition-colors font-heading leading-tight">
                            {tariff.name}
                          </h4>
                          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 mt-1">
                            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-bold border border-slate-200">
                              <Car className="w-3.5 h-3.5 text-amber-600" />
                              <span>{tariff.seats}</span>
                            </span>
                            <span className="text-[11px] text-slate-500 font-medium">Private AC Vehicle</span>
                          </div>
                        </div>

                        {/* Price & Book Button */}
                        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                          <div>
                            <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block">ALL-INCLUSIVE FARE</span>
                            <span className="text-xl font-black font-mono text-amber-600">₹{tariff.price.toLocaleString()}</span>
                          </div>

                          <button
                            onClick={() => handleBookVehicle(tariff)}
                            className="btn-gold py-2.5 px-4 text-xs font-black text-white flex items-center gap-1.5 cursor-pointer shadow-md group-hover:scale-105 transition-all"
                          >
                            <span>Book Now</span>
                            <ArrowRight className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* View 2: Table View */
                <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 text-white uppercase text-[10px] font-black tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4">Vehicle Model</th>
                        <th className="py-3.5 px-4">Seating</th>
                        <th className="py-3.5 px-4">Driver Bhatta</th>
                        <th className="py-3.5 px-4">Total Package Fare</th>
                        <th className="py-3.5 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white font-medium">
                      {(activePkg.tariffs || []).map((tariff, idx) => (
                        <tr key={idx} className="hover:bg-amber-50/50 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                            <img src={tariff.image} alt="" className="w-8 h-6 object-contain" />
                            <span>{tariff.name}</span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 font-semibold">
                            {tariff.seats}
                          </td>
                          <td className="py-3.5 px-4 text-emerald-700 font-bold">
                            <span className="bg-emerald-100 px-2 py-0.5 rounded text-[10px] uppercase">Included</span>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-black text-sm text-amber-600">
                            ₹{tariff.price.toLocaleString()}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => handleBookVehicle(tariff)}
                              className="btn-gold py-2 px-3.5 text-xs font-black text-white inline-flex items-center gap-1 cursor-pointer shadow-xs"
                            >
                              <span>Book Now</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        </section>

      </main>

      <Footer />

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalData={modalData}
      />
    </div>
  );
};

export default TourPackagesPage;
