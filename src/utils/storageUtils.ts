import { City } from '../types';

const FAVORITES_KEY = 'weather_favorites';
const LAST_CITY_KEY = 'weather_last_city';

export const getFavoriteCities = (): City[] => {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
};

export const saveFavoriteCity = (city: City): void => {
  const favorites = getFavoriteCities();
  const existingIndex = favorites.findIndex(c => c.id === city.id);
  
  if (existingIndex === -1) {
    favorites.push(city);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
};

export const removeFavoriteCity = (cityId: number): void => {
  const favorites = getFavoriteCities();
  const updatedFavorites = favorites.filter(city => city.id !== cityId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
};

export const isCityFavorited = (cityId: number | null): boolean => {
  if (!cityId) return false;
  const favorites = getFavoriteCities();
  return favorites.some(city => city.id === cityId);
};

export const saveLastViewedCity = (city: City): void => {
  localStorage.setItem(LAST_CITY_KEY, JSON.stringify(city));
};

export const getLastViewedCity = (): City | null => {
  const lastCity = localStorage.getItem(LAST_CITY_KEY);
  return lastCity ? JSON.parse(lastCity) : null;
};