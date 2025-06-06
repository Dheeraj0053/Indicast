import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search } from 'lucide-react';
import { INDIAN_CITIES } from '../api/weatherApi';
import { City } from '../types';

interface CitySearchProps {
  onSelectCity: (city: City) => void;
  currentCityId: number | null;
}

const CitySearch: React.FC<CitySearchProps> = ({ onSelectCity, currentCityId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = INDIAN_CITIES.filter(city => 
        city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (city.state && city.state.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredCities(filtered);
      setShowDropdown(true);
    } else {
      setFilteredCities([]);
      setShowDropdown(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCitySelect = (city: City) => {
    onSelectCity(city);
    setSearchTerm('');
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto" ref={dropdownRef}>
      <div className="relative flex items-center">
        <Search className="absolute left-5 text-gray-400 h-5 w-5 pointer-events-none" />
        <input
          type="text"
          placeholder="Search for a city in India..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowDropdown(searchTerm.length > 0)}
          className="w-full h-14 py-3 px-5 pl-12 rounded-2xl search-input
                   focus:outline-none focus:border-primary-300
                   text-gray-800 placeholder-gray-400 text-lg
                   bg-white/90 backdrop-blur-md
                   transition-all duration-500 ease-in-out"
        />
      </div>
      
      {showDropdown && filteredCities.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 max-h-64 overflow-y-auto 
                      bg-white/90 backdrop-blur-md rounded-xl border border-gray-200 
                      z-10 animate-fade-in">
          {filteredCities.map(city => (
            <div 
              key={city.id}
              onClick={() => handleCitySelect(city)}
              className={`flex items-center px-6 py-4 cursor-pointer transition-all duration-300
                        hover:bg-gray-100 border-l-4 animate-slide-in ${
                city.id === currentCityId 
                  ? 'border-primary-500 bg-gray-100' 
                  : 'border-transparent hover:border-primary-300'
              }`}
            >
              <MapPin className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-800">{city.name}</p>
                {city.state && <p className="text-sm text-gray-500 mt-0.5">{city.state}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CitySearch;