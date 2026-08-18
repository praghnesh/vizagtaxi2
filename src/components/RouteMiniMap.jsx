import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { MapPin, Navigation, Compass, ArrowRight, CheckCircle2, RotateCw } from 'lucide-react';

// Location Coordinates Database for Andhra Pradesh & Outstation Routes
export const KNOWN_COORDINATES = {
  'Vizag City': { lat: 17.6868, lng: 83.2185, name: 'Visakhapatnam City Center' },
  'Visakhapatnam Railway Station': { lat: 17.7214, lng: 83.2986, name: 'Visakhapatnam Railway Station' },
  'Visakhapatnam Airport (VTZ)': { lat: 17.7215, lng: 83.2245, name: 'Visakhapatnam Intl Airport (VTZ)' },
  'RK Beach': { lat: 17.7126, lng: 83.3188, name: 'RK Beach, Vizag' },
  'Rushikonda Beach': { lat: 17.7818, lng: 83.3854, name: 'Rushikonda Beach' },
  'Gajuwaka': { lat: 17.6922, lng: 83.2081, name: 'Gajuwaka Industrial Hub' },
  'Madhurawada': { lat: 17.7989, lng: 83.3512, name: 'Madhurawada IT SEZ' },
  'Simhachalam': { lat: 17.7665, lng: 83.2506, name: 'Simhachalam Temple' },
  'Bheemili Beach': { lat: 17.8912, lng: 83.4542, name: 'Bheemili Beach' },
  'Anakapalle': { lat: 17.6908, lng: 83.0039, name: 'Anakapalle' },
  'Araku Valley': { lat: 18.3273, lng: 82.8775, name: 'Araku Valley Hill Station', defaultDist: 115 },
  'Lambasingi': { lat: 17.9542, lng: 82.4939, name: 'Lambasingi (South Kashmir)', defaultDist: 135 },
  'Annavaram': { lat: 17.2798, lng: 82.4042, name: 'Annavaram Satyanarayana Temple', defaultDist: 125 },
  'Rajahmundry': { lat: 17.0005, lng: 81.8040, name: 'Rajahmundry Godavari City', defaultDist: 195 },
  'Kakinada': { lat: 16.9891, lng: 82.2475, name: 'Kakinada Smart City', defaultDist: 155 },
  'Srikakulam': { lat: 18.2949, lng: 83.8938, name: 'Srikakulam Town', defaultDist: 110 },
  'Vizianagaram': { lat: 18.1067, lng: 83.3956, name: 'Vizianagaram Fort City', defaultDist: 60 },
  'Vijayawada': { lat: 16.5062, lng: 80.6480, name: 'Vijayawada City', defaultDist: 350 },
  'Hyderabad': { lat: 17.3850, lng: 78.4867, name: 'Hyderabad Capital City', defaultDist: 620 },
  'Jagdalpur': { lat: 19.0740, lng: 82.0080, name: 'Jagdalpur (Bastar/Chitrakote)', defaultDist: 295 },
  'Bhubaneswar': { lat: 20.2961, lng: 85.8245, name: 'Bhubaneswar Capital', defaultDist: 440 },
  'Tirupati': { lat: 13.6288, lng: 79.4192, name: 'Tirupati Balaji Shrine', defaultDist: 750 },
  'Bhadrachalam': { lat: 17.6689, lng: 80.8936, name: 'Bhadrachalam Rama Temple', defaultDist: 380 }
};

// Calculate Haversine distance with road winding factor (~1.3x for highway/ghat road)
export const computeDistanceKm = (locA, locB) => {
  if (!locA || !locB) return 50;
  
  // Check known presets for precise highway mileage
  const destMatch = Object.entries(KNOWN_COORDINATES).find(([k, v]) => 
    locB.toLowerCase().includes(k.toLowerCase()) || (v.name && locB.toLowerCase().includes(v.name.toLowerCase()))
  );
  if (destMatch && destMatch[1].defaultDist) {
    return destMatch[1].defaultDist;
  }

  const coordA = resolveCoords(locA, { lat: 17.7214, lng: 83.2986 });
  const coordB = resolveCoords(locB, { lat: 18.3273, lng: 82.8775 });

  const R = 6371; // Earth radius in km
  const dLat = ((coordB.lat - coordA.lat) * Math.PI) / 180;
  const dLng = ((coordB.lng - coordA.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((coordA.lat * Math.PI) / 180) *
      Math.cos((coordB.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straightLine = R * c;
  
  // Real road multiplier (ghat roads and highways are ~1.28x to 1.35x straight line)
  const roadKm = Math.round(straightLine * 1.3);
  return Math.max(15, roadKm);
};

export const resolveCoords = (placeName, fallback = { lat: 17.6868, lng: 83.2185 }) => {
  if (!placeName) return fallback;
  const lower = placeName.toLowerCase();
  for (const [key, val] of Object.entries(KNOWN_COORDINATES)) {
    if (lower.includes(key.toLowerCase()) || (val.name && lower.includes(val.name.toLowerCase()))) {
      return { lat: val.lat, lng: val.lng };
    }
  }
  return fallback;
};

const RouteMiniMap = ({
  pickup = 'Vizag City',
  destination = 'Araku Valley',
  tripType = 'One Way',
  onDistanceCalculated,
  className = ''
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const pickupMarkerRef = useRef(null);
  const dropMarkerRef = useRef(null);
  const routeLineRef = useRef(null);

  const [pickupCoords, setPickupCoords] = useState(resolveCoords(pickup, { lat: 17.7214, lng: 83.2986 }));
  const [dropCoords, setDropCoords] = useState(resolveCoords(destination, { lat: 18.3273, lng: 82.8775 }));
  const [calculatedKm, setCalculatedKm] = useState(computeDistanceKm(pickup, destination));

  // Initialize Map
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
      } catch (e) {
        console.warn(e);
      }

      if (mapContainerRef.current._leaflet_id) {
        delete mapContainerRef.current._leaflet_id;
      }

      const map = L.map(mapContainerRef.current, {
        center: [17.95, 83.1],
        zoom: 8,
        zoomControl: false,
        attributionControl: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers & Route Polyline whenever locations change
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    const pCoords = resolveCoords(pickup, { lat: 17.7214, lng: 83.2986 });
    const dCoords = resolveCoords(destination, { lat: 18.3273, lng: 82.8775 });
    setPickupCoords(pCoords);
    setDropCoords(dCoords);

    const km = computeDistanceKm(pickup, destination);
    setCalculatedKm(km);
    if (onDistanceCalculated) {
      onDistanceCalculated(km);
    }

    // Custom Icons
    const pickupIcon = L.divIcon({
      className: 'custom-pickup-pin',
      html: `<div style="background:#059669; color:white; width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:3px solid white; box-shadow:0 8px 16px rgba(0,0,0,0.35); transform:translate(-50%,-50%);">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
      </div>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    const dropIcon = L.divIcon({
      className: 'custom-drop-pin',
      html: `<div style="background:#d97706; color:white; width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:3px solid white; box-shadow:0 8px 16px rgba(0,0,0,0.35); transform:translate(-50%,-50%);">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
      </div>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    // Remove old markers & route
    if (pickupMarkerRef.current) map.removeLayer(pickupMarkerRef.current);
    if (dropMarkerRef.current) map.removeLayer(dropMarkerRef.current);
    if (routeLineRef.current) map.removeLayer(routeLineRef.current);

    // Create intermediate curve points for aesthetic route curvature
    const midLat = (pCoords.lat + dCoords.lat) / 2 + 0.04;
    const midLng = (pCoords.lng + dCoords.lng) / 2 - 0.05;
    const routePoints = [
      [pCoords.lat, pCoords.lng],
      [midLat, midLng],
      [dCoords.lat, dCoords.lng]
    ];

    // Add polyline
    const polyline = L.polyline(routePoints, {
      color: '#059669',
      weight: 4,
      opacity: 0.85,
      dashArray: tripType === 'Round Trip' ? '8, 8' : undefined,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);
    routeLineRef.current = polyline;

    // Add Pickup Marker
    const pMarker = L.marker([pCoords.lat, pCoords.lng], { icon: pickupIcon }).addTo(map);
    pMarker.bindPopup(`<b>Pickup Location:</b><br/>${pickup}`);
    pickupMarkerRef.current = pMarker;

    // Add Drop Marker
    const dMarker = L.marker([dCoords.lat, dCoords.lng], { icon: dropIcon }).addTo(map);
    dMarker.bindPopup(`<b>Destination Drop:</b><br/>${destination}`);
    dropMarkerRef.current = dMarker;

    // Fit map bounds with padding
    const group = L.featureGroup([pMarker, dMarker, polyline]);
    map.fitBounds(group.getBounds(), { padding: [50, 50], maxZoom: 12 });

    // Ensure map tiles render crisply
    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 200);

  }, [pickup, destination, tripType]);

  const isRoundTrip = tripType === 'Round Trip';
  const cleanPickup = pickup ? pickup.split(',')[0].replace(/\s*\(\d+\)/g, '').trim() : 'Vizag';
  const cleanDest = destination ? destination.split(',')[0].replace(/\s*\(\d+\)/g, '').trim() : 'Araku';
  
  // Double distance if Round Trip
  const displayKm = isRoundTrip ? (calculatedKm * 2) : calculatedKm;
  const estDurationHours = isRoundTrip ? ((calculatedKm * 2) / 45).toFixed(1) : (calculatedKm / 45).toFixed(1);

  return (
    <div className={`bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg flex flex-col ${className}`}>
      
      {/* Map Top Bar */}
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500 text-slate-950 font-black shadow-sm">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-black text-white font-heading">Route & Distance Live Visualizer</h4>
            <p className="text-[10px] text-amber-400 font-semibold">Real-time GPS Distance Tracking</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-500/30">
            {isRoundTrip ? '🔄 Round Trip (2-Way)' : '➡️ One Way Drop'}
          </span>
        </div>
      </div>

      {/* Map View Canvas */}
      <div className="relative w-full h-[280px] sm:h-[320px] bg-slate-100">
        <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" />
      </div>

      {/* Bottom Route Summary Indicator Card */}
      <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white border-t border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        <div className="flex items-center gap-2.5 max-w-[60%] truncate">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
          <div className="truncate">
            <span className="text-slate-400 text-[10px] block font-bold uppercase tracking-wider">
              {isRoundTrip ? 'ROUND TRIP TRAJECTORY' : 'ROUTE TRAJECTORY'}
            </span>
            <span className="font-extrabold text-white truncate flex items-center gap-1.5 text-xs sm:text-sm">
              <span className="truncate">{cleanPickup}</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="text-amber-300 truncate">{cleanDest}</span>
              {isRoundTrip && (
                <>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-emerald-300 truncate">{cleanPickup}</span>
                </>
              )}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-bold uppercase">
              {isRoundTrip ? 'ROUND TRIP DIST' : 'ONE WAY DIST'}
            </span>
            <span className="text-sm sm:text-base font-black font-mono text-emerald-400">
              {displayKm} KM {isRoundTrip ? '(2x Return)' : ''}
            </span>
          </div>
          
          <div className="border-l border-slate-700 pl-3 text-right">
            <span className="text-[10px] text-slate-400 block font-bold uppercase">
              {isRoundTrip ? 'TOTAL DRIVE TIME' : 'EST. TIME'}
            </span>
            <span className="text-xs sm:text-sm font-black font-mono text-amber-400">~{estDurationHours} Hrs</span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default RouteMiniMap;
