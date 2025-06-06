import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationPermissionProps {
  onRequestLocation: () => void;
}

const LocationPermission: React.FC<LocationPermissionProps> = ({ onRequestLocation }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-primary-50 rounded-xl shadow-md animate-slide-up">
      <MapPin className="h-16 w-16 text-primary-500 mb-4" />
      <h2 className="text-xl font-bold text-gray-800 mb-2">Enable Location Services</h2>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        Allow us to access your location to show you the most accurate weather information for your area.
      </p>
      <button
        onClick={onRequestLocation}
        className="px-6 py-2 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
      >
        Allow Location Access
      </button>
    </div>
  );
};

export default LocationPermission;