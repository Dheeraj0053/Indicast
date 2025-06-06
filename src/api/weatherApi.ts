import axios from 'axios';
import { CurrentWeather, Forecast, AirQuality } from '../types';

// Usually this would be in a .env file, but for demo purposes it's here
// In a real application, NEVER expose API keys in client-side code
const API_KEY = '5f472b7acba333cd8a035ea85a0d4d4c';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Comprehensive list of major Indian cities with metadata
export const INDIAN_CITIES = [
  // Andhra Pradesh
  {
    id: 1253102,
    name: 'Visakhapatnam',
    localName: 'విశాఖపట్నం',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    population: 2035922,
    tier: 2,
    isSmartCity: true,
    coord: { lat: 17.6868, lon: 83.2185 }
  },
  {
    id: 1253184,
    name: 'Vijayawada',
    localName: 'విజయవాడ',
    state: 'Andhra Pradesh',
    district: 'Krishna',
    population: 1048240,
    tier: 2,
    isSmartCity: true,
    coord: { lat: 16.5193, lon: 80.6305 }
  },
  {
    id: 1254091,
    name: 'Guntur',
    localName: 'గుంటూరు',
    state: 'Andhra Pradesh',
    district: 'Guntur',
    population: 743354,
    tier: 2,
    coord: { lat: 16.3067, lon: 80.4365 }
  },

  // Assam
  {
    id: 1271476,
    name: 'Guwahati',
    localName: 'গুৱাহাটী',
    state: 'Assam',
    district: 'Kamrup Metropolitan',
    population: 957352,
    tier: 2,
    isSmartCity: true,
    coord: { lat: 26.1445, lon: 91.7362 }
  },
  {
    id: 1269374,
    name: 'Silchar',
    localName: 'শিলচর',
    state: 'Assam',
    district: 'Cachar',
    population: 172830,
    tier: 3,
    coord: { lat: 24.8333, lon: 92.7789 }
  },

  // Bihar
  {
    id: 1260086,
    name: 'Patna',
    localName: 'पटना',
    state: 'Bihar',
    district: 'Patna',
    population: 2046652,
    tier: 2,
    isCapital: true,
    isSmartCity: true,
    coord: { lat: 25.5941, lon: 85.1376 }
  },
  {
    id: 1271439,
    name: 'Gaya',
    localName: 'गया',
    state: 'Bihar',
    district: 'Gaya',
    population: 463454,
    tier: 3,
    isHistorical: true,
    coord: { lat: 24.7914, lon: 85.0002 }
  },

  // Gujarat
  {
    id: 1256237,
    name: 'Ahmedabad',
    localName: 'અમદાવાદ',
    state: 'Gujarat',
    district: 'Ahmedabad',
    population: 5570585,
    tier: 1,
    isSmartCity: true,
    coord: { lat: 23.0225, lon: 72.5714 }
  },
  {
    id: 1255364,
    name: 'Surat',
    localName: 'સુરત',
    state: 'Gujarat',
    district: 'Surat',
    population: 4462002,
    tier: 2,
    isSmartCity: true,
    coord: { lat: 21.1702, lon: 72.8311 }
  },
  {
    id: 1253573,
    name: 'Vadodara',
    localName: 'વડોદરા',
    state: 'Gujarat',
    district: 'Vadodara',
    population: 1822221,
    tier: 2,
    isSmartCity: true,
    coord: { lat: 22.3072, lon: 73.1812 }
  },

  // Karnataka
  {
    id: 1277333,
    name: 'Bengaluru',
    localName: 'ಬೆಂಗಳೂರು',
    state: 'Karnataka',
    district: 'Bangalore Urban',
    population: 8443675,
    tier: 1,
    isCapital: true,
    isSmartCity: true,
    coord: { lat: 12.9716, lon: 77.5946 }
  },
  {
    id: 1275004,
    name: 'Mysuru',
    localName: 'ಮೈಸೂರು',
    state: 'Karnataka',
    district: 'Mysore',
    population: 920550,
    tier: 2,
    isHistorical: true,
    coord: { lat: 12.2958, lon: 76.6394 }
  },
  {
    id: 1269843,
    name: 'Hubballi',
    localName: 'ಹುಬ್ಬಳ್ಳಿ',
    state: 'Karnataka',
    district: 'Dharwad',
    population: 943857,
    tier: 2,
    coord: { lat: 15.3647, lon: 75.1240 }
  },

  // Kerala
  {
    id: 1254163,
    name: 'Thiruvananthapuram',
    localName: 'തിരുവനന്തപുരം',
    state: 'Kerala',
    district: 'Thiruvananthapuram',
    population: 957730,
    tier: 2,
    isCapital: true,
    isSmartCity: true,
    coord: { lat: 8.5241, lon: 76.9366 }
  },
  {
    id: 1268561,
    name: 'Kochi',
    localName: 'കൊച്ചി',
    state: 'Kerala',
    district: 'Ernakulam',
    population: 677381,
    tier: 2,
    isSmartCity: true,
    coord: { lat: 9.9312, lon: 76.2673 }
  },

  // Maharashtra
  {
    id: 1275339,
    name: 'Mumbai',
    localName: 'मुंबई',
    state: 'Maharashtra',
    district: 'Mumbai City',
    population: 12478447,
    tier: 1,
    isCapital: true,
    isSmartCity: true,
    coord: { lat: 19.0760, lon: 72.8777 }
  },
  {
    id: 1258847,
    name: 'Pune',
    localName: 'पुणे',
    state: 'Maharashtra',
    district: 'Pune',
    population: 3124458,
    tier: 2,
    isSmartCity: true,
    coord: { lat: 18.5204, lon: 73.8567 }
  },
  {
    id: 1260086,
    name: 'Nagpur',
    localName: 'नागपूर',
    state: 'Maharashtra',
    district: 'Nagpur',
    population: 2405665,
    tier: 2,
    isSmartCity: true,
    coord: { lat: 21.1458, lon: 79.0882 }
  },

  // Tamil Nadu
  {
    id: 1264527,
    name: 'Chennai',
    localName: 'சென்னை',
    state: 'Tamil Nadu',
    district: 'Chennai',
    population: 7088000,
    tier: 1,
    isCapital: true,
    isSmartCity: true,
    coord: { lat: 13.0827, lon: 80.2707 }
  },
  {
    id: 1273865,
    name: 'Coimbatore',
    localName: 'கோயம்புத்தூர்',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    population: 1601438,
    tier: 2,
    isSmartCity: true,
    coord: { lat: 11.0168, lon: 76.9558 }
  },
  {
    id: 1267995,
    name: 'Madurai',
    localName: 'மதுரை',
    state: 'Tamil Nadu',
    district: 'Madurai',
    population: 1470755,
    tier: 2,
    isHistorical: true,
    coord: { lat: 9.9252, lon: 78.1198 }
  },

  // Telangana
  {
    id: 1269843,
    name: 'Hyderabad',
    localName: 'హైదరాబాద్',
    state: 'Telangana',
    district: 'Hyderabad',
    population: 6809970,
    tier: 1,
    isCapital: true,
    isSmartCity: true,
    coord: { lat: 17.3850, lon: 78.4867 }
  },
  {
    id: 1253184,
    name: 'Warangal',
    localName: 'వరంగల్',
    state: 'Telangana',
    district: 'Warangal Urban',
    population: 811844,
    tier: 2,
    isHistorical: true,
    coord: { lat: 18.0000, lon: 79.5833 }
  },

  // Uttar Pradesh
  {
    id: 1272013,
    name: 'Lucknow',
    localName: 'लखनऊ',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    population: 2817105,
    tier: 2,
    isCapital: true,
    isSmartCity: true,
    coord: { lat: 26.8467, lon: 80.9462 }
  },
  {
    id: 1267995,
    name: 'Kanpur',
    localName: 'कानपुर',
    state: 'Uttar Pradesh',
    district: 'Kanpur Nagar',
    population: 2767031,
    tier: 2,
    isSmartCity: true,
    coord: { lat: 26.4499, lon: 80.3319 }
  },
  {
    id: 1253405,
    name: 'Varanasi',
    localName: 'वाराणसी',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    population: 1198491,
    tier: 2,
    isHistorical: true,
    isSmartCity: true,
    coord: { lat: 25.3176, lon: 82.9739 }
  },

  // West Bengal
  {
    id: 1259229,
    name: 'Kolkata',
    localName: 'কলকাতা',
    state: 'West Bengal',
    district: 'Kolkata',
    population: 4496694,
    tier: 1,
    isCapital: true,
    isSmartCity: true,
    coord: { lat: 22.5726, lon: 88.3639 }
  },
  {
    id: 1274780,
    name: 'Darjeeling',
    localName: 'দার্জিলিং',
    state: 'West Bengal',
    district: 'Darjeeling',
    population: 118805,
    tier: 3,
    isHistorical: true,
    coord: { lat: 27.0410, lon: 88.2663 }
  },

  // Union Territories
  {
    id: 1261481,
    name: 'New Delhi',
    localName: 'नई दिल्ली',
    state: 'Delhi',
    district: 'Central Delhi',
    population: 16787941,
    tier: 1,
    isCapital: true,
    isSmartCity: true,
    coord: { lat: 28.6100, lon: 77.2300 }
  },
  {
    id: 1264733,
    name: 'Chandigarh',
    localName: 'चंडीगढ़',
    state: 'Chandigarh',
    district: 'Chandigarh',
    population: 1055450,
    tier: 2,
    isCapital: true,
    isSmartCity: true,
    coord: { lat: 30.7333, lon: 76.7794 }
  },
  {
    id: 1255634,
    name: 'Srinagar',
    localName: 'श्रीनगर',
    state: 'Jammu and Kashmir',
    district: 'Srinagar',
    population: 1180570,
    tier: 2,
    isCapital: true,
    isHistorical: true,
    coord: { lat: 34.0837, lon: 74.7973 }
  },

  // Jharkhand
  {
    id: 1258526,
    name: 'Ranchi',
    localName: 'राँची',
    state: 'Jharkhand',
    district: 'Ranchi',
    population: 1073440,
    tier: 2,
    isCapital: true,
    isSmartCity: true,
    coord: { lat: 23.3441, lon: 85.3096 }
  },
  {
    id: 1269300,
    name: 'Jamshedpur',
    localName: 'जमशेदपुर',
    state: 'Jharkhand',
    district: 'East Singhbhum',
    population: 1337131,
    tier: 2,
    isSmartCity: true,
    coord: { lat: 22.8046, lon: 86.2029 }
  },
  {
    id: 1272979,
    name: 'Dhanbad',
    localName: 'धनबाद',
    state: 'Jharkhand',
    district: 'Dhanbad',
    population: 1195298,
    tier: 2,
    coord: { lat: 23.7957, lon: 86.4304 }
  },
  {
    id: 1275362,
    name: 'Bokaro',
    localName: 'बोकारो',
    state: 'Jharkhand',
    district: 'Bokaro',
    population: 563417,
    tier: 2,
    coord: { lat: 23.6693, lon: 86.1511 }
  },

  // Manipur
  {
    id: 1269771,
    name: 'Imphal',
    localName: 'ইম্ফাল',
    state: 'Manipur',
    district: 'Imphal West',
    population: 264986,
    tier: 2,
    isCapital: true,
    isSmartCity: true,
    coord: { lat: 24.8170, lon: 93.9368 }
  },
  {
    id: 1255634,
    name: 'Thoubal',
    localName: 'থৌবাল',
    state: 'Manipur',
    district: 'Thoubal',
    population: 45947,
    tier: 3,
    coord: { lat: 24.6333, lon: 94.0167 }
  },
  {
    id: 1275321,
    name: 'Bishnupur',
    localName: 'বিষ্ণুপুর',
    state: 'Manipur',
    district: 'Bishnupur',
    population: 12766,
    tier: 3,
    coord: { lat: 24.6333, lon: 93.7667 }
  },

  // Odisha
  {
    id: 1275817,
    name: 'Bhubaneswar',
    localName: 'ଭୁବନେଶ୍ୱର',
    state: 'Odisha',
    district: 'Khordha',
    population: 837737,
    tier: 2,
    isCapital: true,
    isSmartCity: true,
    coord: { lat: 20.2961, lon: 85.8245 }
  },
  {
    id: 1273780,
    name: 'Cuttack',
    localName: 'କଟକ',
    state: 'Odisha',
    district: 'Cuttack',
    population: 606007,
    tier: 2,
    isHistorical: true,
    coord: { lat: 20.4625, lon: 85.8830 }
  },
  {
    id: 1258182,
    name: 'Rourkela',
    localName: 'ରାଉରକେଲା',
    state: 'Odisha',
    district: 'Sundargarh',
    population: 552970,
    tier: 2,
    isSmartCity: true,
    coord: { lat: 22.2492, lon: 84.8828 }
  },
  {
    id: 1259184,
    name: 'Puri',
    localName: 'ପୁରୀ',
    state: 'Odisha',
    district: 'Puri',
    population: 201026,
    tier: 3,
    isHistorical: true,
    coord: { lat: 19.8106, lon: 85.8314 }
  }
];

export const getCurrentWeather = async (cityId: number): Promise<CurrentWeather> => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        id: cityId,
        appid: API_KEY,
        units: 'metric' // Use metric units (Celsius)
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

export const getForecast = async (cityId: number): Promise<Forecast> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        id: cityId,
        appid: API_KEY,
        units: 'metric', // Use metric units (Celsius)
        cnt: 40 // 5 days forecast, 8 data points per day (every 3 hours)
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

export const getAirQuality = async (lat: number, lon: number): Promise<AirQuality> => {
  try {
    const response = await axios.get(`${BASE_URL}/air_pollution`, {
      params: {
        lat,
        lon,
        appid: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching air quality:', error);
    throw error;
  }
};

export const getWeatherByCoordinates = async (lat: number, lon: number): Promise<CurrentWeather> => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric' // Use metric units (Celsius)
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error);
    throw error;
  }
};

export const getForecastByCoordinates = async (lat: number, lon: number): Promise<Forecast> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric', // Use metric units (Celsius)
        cnt: 40 // 5 days forecast, 8 data points per day (every 3 hours)
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast by coordinates:', error);
    throw error;
  }
};