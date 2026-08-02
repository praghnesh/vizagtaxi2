import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { MapPin, Navigation, Compass, Search, CheckCircle } from 'lucide-react';

// Default Visakhapatnam coordinates
const DEFAULT_CENTER = { lat: 17.6868, lng: 83.2185, name: 'Visakhapatnam Railway Station' };

const vizagLocations = [
  { name: 'Visakhapatnam Railway Station', lat: 17.7214, lng: 83.2986 },
  { name: 'Visakhapatnam Airport (VTZ)', lat: 17.7215, lng: 83.2245 },
  { name: 'RK Beach (Rama Krishna Beach)', lat: 17.7126, lng: 83.3188 },
  { name: 'Rushikonda Beach & IT Park', lat: 17.7818, lng: 83.3854 },
  { name: 'Simhachalam Temple Gate', lat: 17.7665, lng: 83.2506 },
  { name: 'Madhurawada Cricket Stadium', lat: 17.7989, lng: 83.3512 },
  { name: 'Gajuwaka Junction', lat: 17.6922, lng: 83.2081 },
  { name: 'MVP Colony Sector 1', lat: 17.7441, lng: 83.3315 },
  { name: 'Duvvada Railway Station', lat: 17.7058, lng: 83.1517 },
  { name: 'Anakapalle Bus Station', lat: 17.6908, lng: 83.0039 },
];

const LivePickupMap = ({ onSelectLocation, initialAddress = '' }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  const [currentPos, setCurrentPos] = useState({
    lat: DEFAULT_CENTER.lat,
    lng: DEFAULT_CENTER.lng,
    address: initialAddress || DEFAULT_CENTER.name,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      try {
        if (L.Icon && L.Icon.Default && L.Icon.Default.prototype) {
          delete L.Icon.Default.prototype._getIconUrl;
          L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
          });
        }
      } catch (err) {
        console.warn('Leaflet icon config notice:', err);
      }

      const taxiPinIcon = L.divIcon({
        className: 'custom-taxi-pin',
        html: `<div style="background-color:#d97706; color:white; width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:3px solid white; box-shadow:0 10px 20px rgba(0,0,0,0.3); transform:translate(-50%,-50%); cursor:pointer;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
        </div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });

      const map = L.map(mapContainerRef.current, {
        center: [currentPos.lat, currentPos.lng],
        zoom: 13,
        zoomControl: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 19,
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      const marker = L.marker([currentPos.lat, currentPos.lng], {
        draggable: true,
        icon: taxiPinIcon,
      }).addTo(map);

      marker.bindPopup(`<b>Pickup Location</b><br/>${currentPos.address}`).openPopup();

      marker.on('dragend', (e) => {
        const { lat, lng } = e.target.getLatLng();
        updateLocation(lat, lng, `Selected Spot (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
      });

      map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        updateLocation(lat, lng, `Pin Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
      });

      mapInstanceRef.current = map;
      markerRef.current = marker;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const updateLocation = (lat, lng, addressName) => {
    setCurrentPos({ lat, lng, address: addressName });
    if (markerRef.current) {
      markerRef.current.setLatLng([lat, lng]);
      markerRef.current.getPopup().setContent(`<b>Pickup Location</b><br/>${addressName}`).openPopup();
    }
    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo([lat, lng]);
    }
    if (onSelectLocation) {
      onSelectLocation({ lat, lng, address: addressName });
    }
  };

  const handleSelectPreset = (loc) => {
    updateLocation(loc.lat, loc.lng, loc.name);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const match = vizagLocations.find(l => l.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (match) {
      updateLocation(match.lat, match.lng, match.name);
    } else {
      updateLocation(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng, searchQuery);
    }
  };

  const handleUseCurrentLocation = () => {
    if ('geolocation' in navigator) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsLocating(false);
          updateLocation(
            pos.coords.latitude,
            pos.coords.longitude,
            `GPS Live Location (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)})`
          );
        },
        () => {
          setIsLocating(false);
          alert('Could not fetch GPS location. Please choose your pickup point on the map.');
        }
      );
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col h-full">
      {/* Header Controls */}
      <div className="p-3.5 bg-slate-900 text-white space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500 text-slate-950 font-black">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white font-heading">Interactive Pickup Location Map</h4>
              <p className="text-[10px] text-amber-400 font-semibold">Click or drag the pin anywhere in Vizag</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={isLocating}
            className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center gap-1 shadow-sm cursor-pointer transition-all"
          >
            <Compass className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{isLocating ? 'Locating...' : 'Use My GPS'}</span>
          </button>
        </div>

        {/* Quick Search */}
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search area (e.g., RK Beach, Airport, Gajuwaka)..."
            className="w-full bg-slate-800 text-white placeholder-slate-400 text-xs rounded-xl pl-8 pr-3 py-2 border border-slate-700 focus:outline-none focus:border-amber-400"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
        </form>

        {/* Presets */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[10px]">
          <span className="text-slate-400 shrink-0 font-bold">Quick Presets:</span>
          {vizagLocations.slice(0, 5).map((loc) => (
            <button
              key={loc.name}
              type="button"
              onClick={() => handleSelectPreset(loc)}
              className={`px-2 py-1 rounded-lg shrink-0 border transition-all cursor-pointer ${
                currentPos.address === loc.name
                  ? 'bg-amber-500 text-slate-950 font-black border-amber-400'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {loc.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Map Element */}
      <div className="relative flex-1 min-h-[260px] sm:min-h-[300px] w-full bg-slate-100">
        <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" />
      </div>

      {/* Selected Location Banner */}
      <div className="p-3 bg-emerald-50 border-t border-emerald-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 truncate">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-bold text-slate-800 truncate">
            Selected Pickup: <strong className="text-emerald-700">{currentPos.address}</strong>
          </span>
        </div>
        <span className="text-[10px] bg-emerald-200/60 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold shrink-0">
          {currentPos.lat.toFixed(3)}, {currentPos.lng.toFixed(3)}
        </span>
      </div>
    </div>
  );
};

export default LivePickupMap;
