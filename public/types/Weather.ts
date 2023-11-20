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



export interface WeatherForecast {
  data: WeatherForecastData[];
  isFetched: boolean;
}

export interface WeatherForecastData {
  time: string[];
  temperature: number[];
  humidity: number[];
  feelsLike: number[];
  precipitationProbability: number[];
  precipitation: number[];
  visibility: number[];
  windSpeed: number[];
  windDirection: string[];
  uvIndex: number[];
  day: string;
}
