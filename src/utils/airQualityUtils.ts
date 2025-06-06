export const getAirQualityLabel = (aqi: number | undefined) => {
  if (aqi === undefined) {
    return { label: 'Unknown', color: 'text-gray-500' };
  }
  
  switch (aqi) {
    case 1:
      return { label: 'Good', color: 'text-success-500' };
    case 2:
      return { label: 'Fair', color: 'text-success-600' };
    case 3:
      return { label: 'Moderate', color: 'text-warning-500' };
    case 4:
      return { label: 'Poor', color: 'text-error-500' };
    case 5:
      return { label: 'Very Poor', color: 'text-error-700' };
    default:
      return { label: 'Unknown', color: 'text-gray-500' };
  }
};