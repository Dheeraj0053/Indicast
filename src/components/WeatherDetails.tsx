import React from 'react';
import { 
  Droplets, Wind, Gauge, Cloudy, Thermometer, 
  Sunrise, Sunset, Eye, Waves
} from 'lucide-react';
import { CurrentWeather, AirQuality } from '../types';
import { formatTime } from '../utils/dateUtils';
import { getAirQualityLabel } from '../utils/airQualityUtils';

interface WeatherDetailsProps {
  weather: CurrentWeather | null;
  airQuality: AirQuality | null;
  isLoading: boolean;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ 
  weather, 
  airQuality, 
  isLoading 
}) => {
  if (isLoading) {
    return (
      <div className="rounded-xl shadow-lg p-4 bg-white/5 animate-pulse border border-white/10">
        <div className="h-6 bg-white/10 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-2 gap-3">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="h-16 bg-white/10 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!weather) return null;

  const aqi = airQuality?.list[0]?.main.aqi;
  const aqiLabel = getAirQualityLabel(aqi);
  const aqiColor = aqiLabel.color;

  return (
    <div className="rounded-xl shadow-lg p-4 bg-white/5 backdrop-blur-sm border border-white/10 
                    transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/20 
                    hover:border-primary-500/30">
      <h3 className="text-xl font-semibold text-white mb-4">Weather Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-white/10 p-3 rounded-lg flex items-center transform transition-all 
                      duration-300 hover:scale-105 hover:bg-white/15 border border-white/5 
                      hover:border-white/20">
          <Thermometer className="h-5 w-5 text-red-400 mr-3 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-400">Feels Like</p>
            <p className="font-medium text-gray-200">{Math.round(weather.main.feels_like)}°C</p>
          </div>
        </div>
        
        <div className="bg-white/10 p-3 rounded-lg flex items-center transform transition-all 
                      duration-300 hover:scale-105 hover:bg-white/15 border border-white/5 
                      hover:border-white/20">
          <Droplets className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-400">Humidity</p>
            <p className="font-medium text-gray-200">{weather.main.humidity}%</p>
          </div>
        </div>
        
        <div className="bg-white/10 p-3 rounded-lg flex items-center transform transition-all 
                      duration-300 hover:scale-105 hover:bg-white/15 border border-white/5 
                      hover:border-white/20">
          <Wind className="h-5 w-5 text-teal-400 mr-3 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-400">Wind</p>
            <p className="font-medium text-gray-200">{weather.wind.speed} m/s</p>
          </div>
        </div>
        
        <div className="bg-white/10 p-3 rounded-lg flex items-center transform transition-all 
                      duration-300 hover:scale-105 hover:bg-white/15 border border-white/5 
                      hover:border-white/20">
          <Gauge className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-400">Pressure</p>
            <p className="font-medium text-gray-200">{weather.main.pressure} hPa</p>
          </div>
        </div>
        
        <div className="bg-white/10 p-3 rounded-lg flex items-center transform transition-all 
                      duration-300 hover:scale-105 hover:bg-white/15 border border-white/5 
                      hover:border-white/20">
          <Cloudy className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-400">Cloudiness</p>
            <p className="font-medium text-gray-200">{weather.clouds.all}%</p>
          </div>
        </div>
        
        <div className="bg-white/10 p-3 rounded-lg flex items-center transform transition-all 
                      duration-300 hover:scale-105 hover:bg-white/15 border border-white/5 
                      hover:border-white/20">
          <Eye className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-400">Visibility</p>
            <p className="font-medium text-gray-200">{(weather.visibility / 1000).toFixed(1)} km</p>
          </div>
        </div>
        
        <div className="bg-white/10 p-3 rounded-lg flex items-center transform transition-all 
                      duration-300 hover:scale-105 hover:bg-white/15 border border-white/5 
                      hover:border-white/20">
          <Sunrise className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-400">Sunrise</p>
            <p className="font-medium text-gray-200">{formatTime(weather.sys.sunrise * 1000)}</p>
          </div>
        </div>
        
        <div className="bg-white/10 p-3 rounded-lg flex items-center transform transition-all 
                      duration-300 hover:scale-105 hover:bg-white/15 border border-white/5 
                      hover:border-white/20">
          <Sunset className="h-5 w-5 text-orange-400 mr-3 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-400">Sunset</p>
            <p className="font-medium text-gray-200">{formatTime(weather.sys.sunset * 1000)}</p>
          </div>
        </div>
        
        {aqi && (
          <div className={`col-span-2 bg-white/10 p-3 rounded-lg flex items-center transform 
                        transition-all duration-300 hover:scale-105 hover:bg-white/15 
                        border border-white/5 hover:border-white/20`}>
            <Waves className={`h-5 w-5 ${aqiColor} mr-3 flex-shrink-0`} />
            <div>
              <p className="text-xs text-gray-400">Air Quality</p>
              <p className={`font-medium ${aqiColor}`}>
                {aqiLabel.label} (AQI: {aqi})
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDetails;