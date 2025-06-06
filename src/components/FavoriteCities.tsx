import React from 'react';
import { Star, StarOff, MapPin } from 'lucide-react';
import { City } from '../types';

interface FavoriteCitiesProps {
  favorites: City[];
  currentCityId: number | null;
  onSelectCity: (city: City) => void;
  onToggleFavorite: (city: City) => void;
}

const FavoriteCities: React.FC<FavoriteCitiesProps> = ({
  favorites,
  currentCityId,
  onSelectCity,
  onToggleFavorite
}) => {
  if (favorites.length === 0) {
    return (
      <div className="rounded-xl shadow-lg p-4 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Favorite Cities</h3>
        </div>
        <div className="text-center py-6">
          <StarOff className="h-12 w-12 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500">No favorite cities yet</p>
          <p className="text-sm text-gray-400">Add cities to your favorites for quick access</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl shadow-lg p-4 bg-white weather-card">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Favorite Cities</h3>
      
      <div className="space-y-2">
        {favorites.map(city => (
          <div 
            key={city.id}
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer city-card border-l-4 ${
              city.id === currentCityId 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-transparent'
            }`}
            onClick={() => onSelectCity(city)}
          >
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-primary-500 mr-2" />
              <div>
                <p className="font-medium text-gray-800">{city.name}</p>
                {city.state && <p className="text-xs text-gray-500">{city.state}</p>}
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(city);
              }}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Star className="h-4 w-4 text-warning-500 fill-warning-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteCities;