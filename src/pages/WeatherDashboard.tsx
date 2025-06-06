import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { City, CurrentWeather, Forecast, AirQuality } from '../types';
import { 
  getCurrentWeather, getForecast, getAirQuality, 
  INDIAN_CITIES, getWeatherByCoordinates, getForecastByCoordinates
} from '../api/weatherApi';
import { 
  getFavoriteCities, saveFavoriteCity, removeFavoriteCity, 
  isCityFavorited, saveLastViewedCity, getLastViewedCity 
} from '../utils/storageUtils';

import CitySearch from '../components/CitySearch';
import CurrentWeatherCard from '../components/CurrentWeatherCard';
import WeatherForecast from '../components/WeatherForecast';
import HourlyForecast from '../components/HourlyForecast';
import WeatherDetails from '../components/WeatherDetails';
import FavoriteCities from '../components/FavoriteCities';
import WeatherHeader from '../components/WeatherHeader';
import LocationPermission from '../components/LocationPermission';

const WeatherDashboard: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [favorites, setFavorites] = useState<City[]>([]);
  const [showLocationPermission, setShowLocationPermission] = useState<boolean>(false);

  useEffect(() => {
    const savedFavorites = getFavoriteCities();
    setFavorites(savedFavorites);
    
    const lastCity = getLastViewedCity();
    if (lastCity) {
      setSelectedCity(lastCity);
    } else if (INDIAN_CITIES.length > 0) {
      setSelectedCity(INDIAN_CITIES[0]);
    }
  }, []);

  const { 
    data: currentWeather, 
    isLoading: isLoadingWeather,
    refetch: refetchWeather
  } = useQuery<CurrentWeather>(
    ['currentWeather', selectedCity?.id],
    () => getCurrentWeather(selectedCity!.id),
    { enabled: !!selectedCity }
  );

  const { 
    data: forecast, 
    isLoading: isLoadingForecast,
    refetch: refetchForecast
  } = useQuery<Forecast>(
    ['forecast', selectedCity?.id],
    () => getForecast(selectedCity!.id),
    { enabled: !!selectedCity }
  );

  const { 
    data: airQuality, 
    isLoading: isLoadingAirQuality,
    refetch: refetchAirQuality
  } = useQuery<AirQuality>(
    ['airQuality', selectedCity?.coord.lat, selectedCity?.coord.lon],
    () => getAirQuality(selectedCity!.coord.lat, selectedCity!.coord.lon),
    { enabled: !!selectedCity }
  );

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    saveLastViewedCity(city);
  };

  const handleToggleFavorite = (city: City) => {
    const isFavorite = isCityFavorited(city.id);
    
    if (isFavorite) {
      removeFavoriteCity(city.id);
      setFavorites(prevFavorites => prevFavorites.filter(fav => fav.id !== city.id));
    } else {
      saveFavoriteCity(city);
      setFavorites(prevFavorites => [...prevFavorites, city]);
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      setShowLocationPermission(true);
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  const requestLocationPermission = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          setShowLocationPermission(false);
          
          const { latitude, longitude } = position.coords;
          const weather = await getWeatherByCoordinates(latitude, longitude);
          
          if (weather.sys.country === 'IN') {
            const nearestCity = INDIAN_CITIES.find(city => city.name === weather.name) || 
              INDIAN_CITIES.reduce((nearest, city) => {
                const distance = Math.sqrt(
                  Math.pow(city.coord.lat - latitude, 2) + 
                  Math.pow(city.coord.lon - longitude, 2)
                );
                const currentDistance = Math.sqrt(
                  Math.pow(nearest.coord.lat - latitude, 2) + 
                  Math.pow(nearest.coord.lon - longitude, 2)
                );
                return distance < currentDistance ? city : nearest;
              }, INDIAN_CITIES[0]);
            
            setSelectedCity(nearestCity);
            saveLastViewedCity(nearestCity);
          } else {
            alert('Location is not in India. Showing weather for New Delhi instead.');
            setSelectedCity(INDIAN_CITIES[0]);
          }
        } catch (error) {
          console.error('Error getting location weather:', error);
          alert('Error getting weather for your location. Showing default city instead.');
          setSelectedCity(INDIAN_CITIES[0]);
        }
      },
      (error) => {
        setShowLocationPermission(false);
        console.error('Geolocation error:', error);
        alert('Unable to access your location. Please check your browser settings.');
      }
    );
  };

  const refreshAllData = () => {
    if (selectedCity) {
      refetchWeather();
      refetchForecast();
      refetchAirQuality();
    }
  };

  const renderDashboardContent = () => {
    return (
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <WeatherHeader 
            city={selectedCity}
            isFavorite={isCityFavorited(selectedCity?.id)}
            onToggleFavorite={handleToggleFavorite}
            onGetCurrentLocation={handleGetCurrentLocation}
          />
          
          <div className="my-8">
            <CitySearch 
              onSelectCity={handleCitySelect} 
              currentCityId={selectedCity?.id || null} 
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="transform hover:scale-[1.02] transition-transform duration-300">
                <CurrentWeatherCard 
                  weather={currentWeather as CurrentWeather} 
                  isLoading={isLoadingWeather} 
                />
              </div>
              
              <div className="transform hover:scale-[1.02] transition-transform duration-300">
                <HourlyForecast 
                  forecast={forecast} 
                  isLoading={isLoadingForecast} 
                />
              </div>
              
              <div className="transform hover:scale-[1.02] transition-transform duration-300">
                <WeatherForecast 
                  forecast={forecast} 
                  isLoading={isLoadingForecast} 
                />
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="transform hover:scale-[1.02] transition-transform duration-300">
                <FavoriteCities 
                  favorites={favorites}
                  currentCityId={selectedCity?.id || null}
                  onSelectCity={handleCitySelect}
                  onToggleFavorite={handleToggleFavorite}
                />
              </div>
              
              <div className="transform hover:scale-[1.02] transition-transform duration-300">
                <WeatherDetails 
                  weather={currentWeather} 
                  airQuality={airQuality}
                  isLoading={isLoadingWeather || isLoadingAirQuality} 
                />
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-200 text-sm">Weather data provided by OpenWeatherMap</p>
            <button 
              onClick={refreshAllData}
              className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 text-white 
                       rounded-lg transition-all duration-300 font-medium flex items-center mx-auto
                       hover:shadow-lg hover:shadow-white/10"
            >
              Refresh Data
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {showLocationPermission ? (
        <div className="flex items-center justify-center min-h-screen">
          <LocationPermission onRequestLocation={requestLocationPermission} />
        </div>
      ) : (
        renderDashboardContent()
      )}
    </div>
  );
};

export default WeatherDashboard;