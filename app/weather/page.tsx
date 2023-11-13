"use client";
export const dynamic = "no-store";
import styles from "@/styles/weather.module.css";
import { useEffect, useState } from "react";
import { Location, Weather } from "@/public/types/Weather";
export default function page() {
  const [location, setLocation] = useState<Location>({
    latitude: "",
    longitude: "",
    isAvailable: false,
  });
  const [weather, setWeather] = useState<Weather>({} as Weather);
  const currentWeatherParams = {
    latitude: "",
    longitude: "",
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "precipitation",
      "rain",
      "showers",
      "wind_speed_10m",
      "wind_direction_10m",
    ],
  };
  useEffect(() => {
    console.log("hi");
    if ("geolocation" in navigator) {
      // Prompt user for permission to access their location
      navigator.geolocation.getCurrentPosition(
        // Success callback function
        (position) => {
          // Get the user's latitude and longitude coordinates
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // Do something with the location data, e.g. display on a map
          setLocation(() => ({
            latitude: lat.toString(),
            longitude: lng.toString(),
            isAvailable: true,
          }));
        },
        // Error callback function
        (error) => {
          // Handle errors, e.g. user denied location sharing permissions
          console.error("Error getting user location:", error);
        }
      );
    } else {
      // Geolocation is not supported by the browser
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  useEffect(() => {
    if (location.isAvailable) {
      getCurrentWeather();
    }
    async function getCurrentWeather() {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,showers,wind_speed_10m,wind_direction_10m`
      );
      const data = await res.json();
      const weather: Weather = {
        temperature: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        feelsLike: data.current.apparent_temperature,
        precipitation: data.current.precipitation,
        rain: data.current.rain,
        showers: data.current.showers,
        windSpeed: data.current.wind_speed_10m,
      };
    }
  }, [location]);
  return (
    <div className="flex flex-center">
      <h1>Current Weather</h1>
      <div className={`${styles.currWeatherTile}`}></div>
    </div>
  );
}
