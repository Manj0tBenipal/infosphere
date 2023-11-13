export interface Location {
  latitude: string;
  longitude: string;
  isAvailable: boolean;
}
export interface Weather {
  temperature: number;
  humidity: number;
  feelsLike: number;
  precipitation: number;
  rain: number;
  showers: number;
  windSpeed: number;
}
