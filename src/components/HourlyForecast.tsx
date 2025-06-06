import React from 'react';
import { Forecast } from '../types';
import { getWeatherIcon } from '../utils/weatherIcons';
import { formatTime } from '../utils/dateUtils';

interface HourlyForecastProps {
  forecast: Forecast | null;
  isLoading: boolean;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ forecast, isLoading }) => {
  if (isLoading) {
    return (
      <div className="rounded-xl shadow-lg p-4 bg-white animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="flex overflow-x-auto pb-2 gap-3">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="flex-shrink-0 w-24 p-3 rounded-lg bg-gray-100">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3 mx-auto"></div>
              <div className="h-8 w-8 bg-gray-200 rounded-full mb-3 mx-auto"></div>
              <div className="h-5 bg-gray-200 rounded w-1/2 mb-2 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!forecast) return null;

  // Get forecasts for the next 24 hours (8 data points, every 3 hours)
  const hourlyForecasts = forecast.list.slice(0, 8);

  return (
    <div className="rounded-xl shadow-lg p-4 bg-white weather-card animate-fade-in">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Hourly Forecast</h3>
      
      <div className="flex overflow-x-auto pb-2 gap-3">
        {hourlyForecasts.map((hour, index) => {
          const date = new Date(hour.dt * 1000);
          const time = formatTime(hour.dt * 1000);
          const weatherData = hour.weather[0];
          const { Icon, color, bgColor } = getWeatherIcon(weatherData.icon);
          
          return (
            <div 
              key={index} 
              className={`flex-shrink-0 w-24 p-3 rounded-lg ${bgColor} transition-colors duration-300 text-center`}
            >
              <p className="font-medium text-gray-700 mb-2">{time}</p>
              <div className="flex justify-center mb-2">
                <Icon className={`h-6 w-6 ${color}`} />
              </div>
              <p className="text-lg font-bold text-gray-800">
                {Math.round(hour.main.temp)}°C
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;