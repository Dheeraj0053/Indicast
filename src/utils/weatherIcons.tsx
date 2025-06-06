import React from 'react';
import { 
  Sun, Cloud, CloudRain, CloudLightning, CloudFog, CloudSnow, 
  CloudDrizzle, Moon, CloudMoon
} from 'lucide-react';

const weatherIcons = {
  // Clear sky
  '01d': {
    Icon: Sun,
    color: 'text-warning-500',
    bgColor: 'bg-warning-50',
    label: 'Clear sky'
  },
  '01n': {
    Icon: Moon,
    color: 'text-gray-700',
    bgColor: 'bg-gray-100',
    label: 'Clear sky'
  },
  // Few clouds
  '02d': {
    Icon: Cloud,
    color: 'text-gray-500',
    bgColor: 'bg-gray-50',
    label: 'Few clouds'
  },
  '02n': {
    Icon: CloudMoon,
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    label: 'Few clouds'
  },
  // Scattered clouds
  '03d': {
    Icon: Cloud,
    color: 'text-gray-500',
    bgColor: 'bg-gray-100',
    label: 'Scattered clouds'
  },
  '03n': {
    Icon: Cloud,
    color: 'text-gray-500',
    bgColor: 'bg-gray-100',
    label: 'Scattered clouds'
  },
  // Broken clouds
  '04d': {
    Icon: Cloud,
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    label: 'Broken clouds'
  },
  '04n': {
    Icon: Cloud,
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    label: 'Broken clouds'
  },
  // Shower rain
  '09d': {
    Icon: CloudDrizzle,
    color: 'text-primary-500',
    bgColor: 'bg-primary-50',
    label: 'Shower rain'
  },
  '09n': {
    Icon: CloudDrizzle,
    color: 'text-primary-500',
    bgColor: 'bg-primary-50',
    label: 'Shower rain'
  },
  // Rain
  '10d': {
    Icon: CloudRain,
    color: 'text-primary-600',
    bgColor: 'bg-primary-50',
    label: 'Rain'
  },
  '10n': {
    Icon: CloudRain,
    color: 'text-primary-600',
    bgColor: 'bg-primary-50',
    label: 'Rain'
  },
  // Thunderstorm
  '11d': {
    Icon: CloudLightning,
    color: 'text-error-500',
    bgColor: 'bg-error-50',
    label: 'Thunderstorm'
  },
  '11n': {
    Icon: CloudLightning,
    color: 'text-error-500',
    bgColor: 'bg-error-50',
    label: 'Thunderstorm'
  },
  // Snow
  '13d': {
    Icon: CloudSnow,
    color: 'text-gray-400',
    bgColor: 'bg-gray-50',
    label: 'Snow'
  },
  '13n': {
    Icon: CloudSnow,
    color: 'text-gray-400',
    bgColor: 'bg-gray-50',
    label: 'Snow'
  },
  // Mist
  '50d': {
    Icon: CloudFog,
    color: 'text-gray-500',
    bgColor: 'bg-gray-100',
    label: 'Mist'
  },
  '50n': {
    Icon: CloudFog,
    color: 'text-gray-500',
    bgColor: 'bg-gray-100',
    label: 'Mist'
  }
};

export const getWeatherIcon = (iconCode: string) => {
  return weatherIcons[iconCode as keyof typeof weatherIcons] || {
    Icon: Cloud,
    color: 'text-gray-500',
    bgColor: 'bg-gray-100',
    label: 'Unknown'
  };
};