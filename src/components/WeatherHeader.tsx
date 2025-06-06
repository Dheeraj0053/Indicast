import React from 'react';
import { MapPin, Star, StarOff, CloudRain } from 'lucide-react';
import { City } from '../types';

interface WeatherHeaderProps {
  city: City | null;
  isFavorite: boolean;
  onToggleFavorite: (city: City) => void;
  onGetCurrentLocation: () => void;
}

const WeatherHeader: React.FC<WeatherHeaderProps> = ({
  city,
  isFavorite,
  onToggleFavorite,
  onGetCurrentLocation
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center py-6">
      <div className="flex items-center mb-4 md:mb-0">
        <CloudRain className="h-10 w-10 text-white mr-3" />
        <h1 className="dashboard-title">IndiCast: Predict the Mausam with ease!</h1>
      </div>
      
      <div className="flex items-center space-x-6">
        <button
          onClick={onGetCurrentLocation}
          className="nav-link flex items-center hover:scale-105 transition-transform"
        >
          <MapPin className="h-5 w-5 mr-2" />
          <span>Use My Location</span>
        </button>
        
        {city && (
          <button
            onClick={() => onToggleFavorite(city)}
            className="nav-link flex items-center hover:scale-105 transition-transform"
          >
            {isFavorite ? (
              <>
                <Star className="h-5 w-5 mr-2 text-warning-400 fill-warning-400" />
                <span>Favorited</span>
              </>
            ) : (
              <>
                <StarOff className="h-5 w-5 mr-2" />
                <span>Add to Favorites</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default WeatherHeader;