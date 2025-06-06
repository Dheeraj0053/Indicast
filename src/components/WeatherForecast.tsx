import React from 'react';
import { Forecast } from '../types';
import { getWeatherIcon } from '../utils/weatherIcons';
import { getDayOfWeek, formatTime } from '../utils/dateUtils';

interface WeatherForecastProps {
  forecast: Forecast | null;
  isLoading: boolean;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast, isLoading }) => {
  if (isLoading) {
    return (
      <div className="rounded-xl shadow-lg p-4 bg-white animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-5 gap-2">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="p-3 rounded-lg bg-gray-100">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3 mx-auto"></div>
              <div className="h-8 w-8 bg-gray-200 rounded-full mb-3 mx-auto"></div>
              <div className="h-5 bg-gray-200 rounded w-1/2 mb-2 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!forecast) return null;

  // Get one forecast per day (noon time)
  const dailyForecasts = forecast.list.filter((item, index, self) => {
    const date = new Date(item.dt * 1000);
    const hour = date.getHours();
    // Get the forecast closest to noon for each day
    return hour >= 11 && hour <= 13;
  }).slice(0, 5); // Limit to 5 days

  return (
    <div className="rounded-xl shadow-lg p-4 bg-white weather-card animate-fade-in">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">5-Day Forecast</h3>
      
      <div className="grid grid-cols-5 gap-2">
        {dailyForecasts.map((day, index) => {
          const date = new Date(day.dt * 1000);
          const dayName = getDayOfWeek(date);
          const weatherData = day.weather[0];
          const { Icon, color, bgColor } = getWeatherIcon(weatherData.icon);
          
          return (
            <div key={index} className={`p-3 rounded-lg ${bgColor} transition-colors duration-300 text-center`}>
              <p className="font-medium text-gray-700 mb-2">{dayName}</p>
              <div className="flex justify-center mb-2">
                <Icon className={`h-8 w-8 ${color}`} />
              </div>
              <p className="text-lg font-bold text-gray-800 mb-1">
                {Math.round(day.main.temp)}°C
              </p>
              <p className="text-xs text-gray-600 capitalize">{weatherData.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherForecast;