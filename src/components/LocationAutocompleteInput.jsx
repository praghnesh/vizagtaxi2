import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Loader2, Search, Check } from 'lucide-react';

// Curated Fast Instant Dataset for instant 0ms autocomplete
const POPULAR_LOCATIONS = [
  // Official Tour Packages
  { title: 'Araku 1 Day Tour Package', details: 'Borra Caves, Katiki Waterfalls, Coffee Plantation & 9 Spots', pincode: 'Tour' },
  { title: 'Vizag 1 Day Sightseeing Tour', details: 'Rushikonda, Bheemili, Submarine & Aircraft Museums (13 Spots)', pincode: 'Tour' },
  { title: 'Vizag 2 Days Tour Package', details: 'Complete Vizag Coastal, Simhachalam & Yarada Beach (21 Spots)', pincode: 'Tour' },
  { title: 'Vizag 2D & Araku 1D Combo (3 Days)', details: '3 Days Vizag Coastal + Simhachalam + Araku Valley Hills', pincode: 'Tour' },
  { title: 'Vizag, Araku & Lambasingi (4D/3N)', details: 'Ultimate 4 Days Tour: Coastal Beaches, Caves & Kashmir of AP', pincode: 'Tour' },
  { title: 'Vizag to Annavaram Temple Tour', details: 'Ratnagiri Satyanarayana Swamy Shrine & Pampa River', pincode: 'Tour' },

  // Vizag Core Areas & Pincodes
  { title: 'Visakhapatnam Railway Station (VSKP)', details: 'Dwaraka Nagar, Vizag, AP - 530004', pincode: '530004' },
  { title: 'Visakhapatnam Intl Airport (VTZ)', details: 'Nadapuru, Vizag, AP - 530009', pincode: '530009' },
  { title: 'RK Beach Road', details: 'Pandurangapuram, Vizag, AP - 530002', pincode: '530002' },
  { title: 'Rushikonda Beach Resort', details: 'Rushikonda, Vizag, AP - 530045', pincode: '530045' },
  { title: 'Siripuram Junction', details: 'Siripuram, Vizag, AP - 530003', pincode: '530003' },
  { title: 'Dwaraka Nagar RTC Complex', details: 'Dwaraka Nagar, Vizag, AP - 530016', pincode: '530016' },
  { title: 'MVP Colony', details: 'Sector 1-12, Vizag, AP - 530017', pincode: '530017' },
  { title: 'Gajuwaka Industrial Hub', details: 'Gajuwaka, Vizag, AP - 530026', pincode: '530026' },
  { title: 'Madhurawada IT SEZ', details: 'Madhurawada, Vizag, AP - 530041', pincode: '530041' },
  { title: 'Simhachalam Devasthanam', details: 'Simhachalam, Vizag, AP - 530028', pincode: '530028' },
  { title: 'Jagadamba Junction', details: 'Jagadamba Centre, Vizag, AP - 530020', pincode: '530020' },
  { title: 'Steel Plant Township (Ukkunagaram)', details: 'Gajuwaka, Vizag, AP - 530031', pincode: '530031' },
  { title: 'Pendurthi Junction', details: 'Pendurthi, Vizag, AP - 530051', pincode: '530051' },
  { title: 'Bheemili Beach Road', details: 'Bheemunipatnam, Vizag, AP - 531163', pincode: '531163' },
  { title: 'Anandapuram Junction', details: 'Anandapuram, Vizag, AP - 530052', pincode: '530052' },
  
  // Popular Outstation Destinations
  { title: 'Araku Valley Hill Station', details: 'Alluri Sitharama Raju Dist, AP - 531149', pincode: '531149' },
  { title: 'Lambasingi Hills (South Kashmir)', details: 'Chintapalle, AP - 531111', pincode: '531111' },
  { title: 'Annavaram Satyanarayana Swamy Temple', details: 'Kakinada Dist, AP - 533440', pincode: '533440' },
  { title: 'Rajahmundry Godavari City', details: 'East Godavari, AP - 533101', pincode: '533101' },
  { title: 'Kakinada Smart City', details: 'Kakinada Dist, AP - 533001', pincode: '533001' },
  { title: 'Vijayawada Kanaka Durga Temple', details: 'NTR District, AP - 520001', pincode: '520001' },
  { title: 'Srikakulam Town', details: 'Srikakulam Dist, AP - 532001', pincode: '532001' },
  { title: 'Vizianagaram Fort City', details: 'Vizianagaram Dist, AP - 535002', pincode: '535002' },
  { title: 'Tirupati Temple City', details: 'Tirupati Dist, AP - 517501', pincode: '517501' },
  { title: 'Hyderabad HITEC City', details: 'Telangana - 500081', pincode: '500081' },
  { title: 'Hyderabad Secunderabad Junction', details: 'Telangana - 500003', pincode: '500003' },
  { title: 'Chennai Central (MAS)', details: 'Tamil Nadu - 600003', pincode: '600003' },
  { title: 'Bengaluru Majestic (SBC)', details: 'Karnataka - 560009', pincode: '560009' }
];

const LocationAutocompleteInput = ({
  value,
  onChange,
  placeholder = "Type area, city, or 6-digit Pincode...",
  required = false,
  className = "",
  focusColor = "focus:border-emerald-500"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);

  // Filter local & fetch remote India suggestions
  useEffect(() => {
    if (!value || value.trim().length < 1) {
      setSuggestions(POPULAR_LOCATIONS.slice(0, 6));
      setLoading(false);
      return;
    }

    const query = value.trim().toLowerCase();

    // Instant local filter matching title, details, or pincode
    const localMatches = POPULAR_LOCATIONS.filter(loc =>
      loc.title.toLowerCase().includes(query) ||
      loc.details.toLowerCase().includes(query) ||
      loc.pincode.includes(query)
    );

    setSuggestions(localMatches);

    // If query is 2+ chars or 6-digit pincode, trigger API search
    if (query.length >= 3 || /^\d{3,6}$/.test(query)) {
      setLoading(true);
      const timer = setTimeout(async () => {
        try {
          // If 6-digit pincode, query Postal Pincode API
          if (/^\d{6}$/.test(query)) {
            const pincodeRes = await fetch(`https://api.postalpincode.in/pincode/${query}`);
            const pincodeData = await pincodeRes.json();
            if (pincodeData && pincodeData[0] && pincodeData[0].Status === 'Success') {
              const apiPincodeMatches = pincodeData[0].PostOffice.map(po => ({
                title: `${po.Name}, ${po.District}`,
                details: `${po.Circle}, ${po.State} - ${po.Pincode}`,
                pincode: po.Pincode
              }));
              setSuggestions(prev => {
                const combined = [...apiPincodeMatches, ...prev];
                // Remove duplicates by title
                return Array.from(new Set(combined.map(a => a.title)))
                  .map(title => combined.find(a => a.title === title)).slice(0, 8);
              });
              setLoading(false);
              return;
            }
          }

          // OpenStreetMap Nominatim Free India Search
          const osmRes = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&countrycodes=in&format=json&addressdetails=1&limit=6`
          );
          const osmData = await osmRes.json();
          if (osmData && osmData.length > 0) {
            const osmMatches = osmData.map(item => {
              const addr = item.address || {};
              const areaName = addr.suburb || addr.neighbourhood || addr.residential || addr.village || addr.town || addr.city || item.display_name.split(',')[0];
              const cityState = [addr.city || addr.county || addr.state_district, addr.state, addr.postcode ? `- ${addr.postcode}` : ''].filter(Boolean).join(', ');
              return {
                title: areaName,
                details: cityState || item.display_name,
                pincode: addr.postcode || ''
              };
            });

            setSuggestions(prev => {
              const combined = [...localMatches, ...osmMatches];
              return Array.from(new Set(combined.map(a => a.title)))
                .map(title => combined.find(a => a.title === title)).slice(0, 8);
            });
          }
        } catch (err) {
          // Fallback gracefully on network error
        } finally {
          setLoading(false);
        }
      }, 350);

      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [value]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (loc) => {
    const fullText = loc.pincode ? `${loc.title} (${loc.pincode})` : loc.title;
    onChange(fullText);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          required={required}
          value={value}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          placeholder={placeholder}
          className={`w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none ${focusColor} font-medium pr-8 transition-all ${className}`}
        />
        {loading ? (
          <Loader2 className="w-3.5 h-3.5 text-amber-600 animate-spin absolute right-3 pointer-events-none" />
        ) : (
          <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 pointer-events-none" />
        )}
      </div>

      {/* Floating Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto divide-y divide-slate-100">
          <div className="px-3 py-1.5 bg-slate-50 text-[10px] font-black uppercase text-amber-800 tracking-wider flex items-center justify-between">
            <span>Instant Suggestions (India & Vizag Pincodes)</span>
            {loading && <span className="text-emerald-700 animate-pulse">Searching India DB...</span>}
          </div>
          {suggestions.map((loc, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(loc)}
              className="w-full text-left px-3.5 py-2.5 hover:bg-emerald-50/70 transition-colors flex items-start gap-2.5 group cursor-pointer"
            >
              <div className="p-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0 mt-0.5">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                  {loc.title}
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">
                  {loc.details}
                </div>
              </div>
              {loc.pincode && (
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                  {loc.pincode}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationAutocompleteInput;
