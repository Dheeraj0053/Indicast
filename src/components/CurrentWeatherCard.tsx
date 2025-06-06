import React from 'react';
import { CloudRain, Droplets, Wind, Thermometer } from 'lucide-react';
import { CurrentWeather } from '../types';
import { getWeatherIcon } from '../utils/weatherIcons';
import { formatTime, formatDate } from '../utils/dateUtils';

interface CurrentWeatherCardProps {
  weather: CurrentWeather | null;
  isLoading: boolean;
}

const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({ weather, isLoading }) => {
  if (isLoading) {
    return (
      <div className="p-6 rounded-xl shadow-lg bg-white/5 backdrop-blur-sm animate-pulse border border-white/10">
        <div className="h-8 bg-white/10 rounded-lg w-1/2 mb-4"></div>
        <div className="h-16 bg-white/10 rounded-lg w-1/3 mb-4"></div>
        <div className="h-4 bg-white/10 rounded-lg w-4/5 mb-2"></div>
        <div className="h-4 bg-white/10 rounded-lg w-3/5 mb-6"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-16 bg-white/10 rounded-lg"></div>
          <div className="h-16 bg-white/10 rounded-lg"></div>
          <div className="h-16 bg-white/10 rounded-lg"></div>
          <div className="h-16 bg-white/10 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="p-6 rounded-xl shadow-lg bg-white/5 backdrop-blur-sm border border-white/10">
        <p className="text-gray-400 text-center">No weather data available</p>
      </div>
    );
  }

  const weatherData = weather.weather[0];
  const { Icon, bgColor, color } = getWeatherIcon(weatherData.icon);
  const sunriseTime = formatTime(weather.sys.sunrise * 1000);
  const sunsetTime = formatTime(weather.sys.sunset * 1000);
  const currentDate = formatDate(new Date());

  const getWeatherGradient = () => {
    if (weatherData.icon.includes('01') || weatherData.icon.includes('02')) {
      return 'from-yellow-500/20 to-orange-500/20';
    } else if (weatherData.icon.includes('03') || weatherData.icon.includes('04')) {
      return 'from-gray-500/20 to-gray-600/20';
    } else if (weatherData.icon.includes('09') || weatherData.icon.includes('10')) {
      return 'from-blue-500/20 to-blue-600/20';
    } else {
      return 'from-gray-600/20 to-gray-700/20';
    }
  };

  return (
    <div className={`p-6 rounded-xl shadow-lg bg-gradient-to-br ${getWeatherGradient()} 
                    backdrop-blur-sm border border-white/10 transition-all duration-500 
                    hover:shadow-xl hover:shadow-primary-500/20 hover:border-primary-500/30`}>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-white">{weather.name}</h2>
          <p className="text-sm text-gray-300 mt-1">{currentDate}</p>
        </div>
        <div className={`p-3 rounded-full ${bgColor} transition-transform duration-300 hover:scale-110`}>
          <Icon className={`h-8 w-8 ${color}`} />
        </div>
      </div>
      
      <div className="mt-6 flex items-center">
        <p className="text-6xl font-bold text-white tracking-tight">{Math.round(weather.main.temp)}°C</p>
        <div className="ml-4">
          <p className="font-medium capitalize text-gray-200">{weatherData.description}</p>
          <p className="text-sm text-gray-300">
            Feels like {Math.round(weather.main.feels_like)}°C
          </p>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center 
                      transform transition-all duration-300 hover:scale-105 hover:bg-white/15 
                      border border-white/5 hover:border-white/20">
          <Thermometer className="h-5 w-5 text-red-400 mr-3" />
          <div>
            <p className="text-xs text-gray-400">Min/Max</p>
            <p className="font-medium text-gray-200">
              {Math.round(weather.main.temp_min)}° / {Math.round(weather.main.temp_max)}°
            </p>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center 
                      transform transition-all duration-300 hover:scale-105 hover:bg-white/15 
                      border border-white/5 hover:border-white/20">
          <Droplets className="h-5 w-5 text-blue-400 mr-3" />
          <div>
            <p className="text-xs text-gray-400">Humidity</p>
            <p className="font-medium text-gray-200">{weather.main.humidity}%</p>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center 
                      transform transition-all duration-300 hover:scale-105 hover:bg-white/15 
                      border border-white/5 hover:border-white/20">
          <Wind className="h-5 w-5 text-teal-400 mr-3" />
          <div>
            <p className="text-xs text-gray-400">Wind Speed</p>
            <p className="font-medium text-gray-200">{weather.wind.speed} m/s</p>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center 
                      transform transition-all duration-300 hover:scale-105 hover:bg-white/15 
                      border border-white/5 hover:border-white/20">
          <CloudRain className="h-5 w-5 text-orange-400 mr-3" />
          <div>
            <p className="text-xs text-gray-400">Sunrise/Sunset</p>
            <p className="font-medium text-sm text-gray-200">{sunriseTime}/{sunsetTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;