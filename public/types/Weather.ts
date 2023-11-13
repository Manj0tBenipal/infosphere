export interface Location {
  latitude: string;
  longitude: string;
  isAvailable: boolean;
}
export interface Weather {
  data: WeatherData;
  isFetched: boolean;
}
interface WeatherProperty {
  value: number;
  units: string;
  img: string;
}
export interface WeatherData {
  temperature: WeatherProperty;
  humidity: WeatherProperty;
  feelsLike: WeatherProperty;
  precipitation: WeatherProperty;
  rain: WeatherProperty;
  showers: WeatherProperty;
  windSpeed: WeatherProperty;
}

export interface HourlyWeather {
  data: HourlyWeatherData;
  isFetched: boolean;
}
export interface HourlyWeatherData {
  uvIndex: WeatherProperty;
  visibility: WeatherProperty;
  windSpeed: WeatherProperty;
  windDirection: string;
  hour: string;
  temperature: WeatherProperty;
  humidity: WeatherProperty;
  feelsLike: WeatherProperty;
  precipitation: WeatherProperty;
  precipitationProbability: WeatherProperty;
}
export interface DailyWeather {
  data: DailyWeatherData[];
  isFetched: boolean;
}
export interface DailyWeatherData {
  day: string;
  hourlyData: HourlyWeatherData[];
}

function setWindDirection(degrees: number) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(degrees / 45);
  return directions[index];
}
