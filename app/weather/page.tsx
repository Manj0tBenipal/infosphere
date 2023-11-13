"use client";
export const dynamic = "no-store";
import styles from "@/styles/weather.module.css";
import { useEffect, useState } from "react";
import {
  DailyWeather,
  DailyWeatherData,
  HourlyWeatherData,
  Location,
  Weather,
  WeatherData,
} from "@/public/types/Weather";
import WeatherChip from "@/components/WeatherChip";
import Image from "next/image";
export default function page() {
  const [location, setLocation] = useState<Location>({
    latitude: "",
    longitude: "",
    isAvailable: false,
  });
  const [weather, setWeather] = useState<Weather>({
    isFetched: false,
  } as Weather);
  const [dailyWeather, setDailyWeather] = useState<DailyWeather>({
    isFetched: false,
  } as DailyWeather);

  useEffect(() => {
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
      if (weather.isFetched === false) {
        getCurrentWeather();
      }
      if (dailyWeather.isFetched === false) {
        getForecastWeather();
      }
      getForecastWeather();
    }
    async function getCurrentWeather() {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,showers,wind_speed_10m,wind_direction_10m`
      );
      const data = await res.json();

      const weather: Weather = {
        data: {
          temperature: {
            value: data.current.temperature_2m,
            units: data.current_units.temperature_2m,
            img: "/svg/weather/thermometer.svg",
          },
          humidity: {
            value: data.current.relative_humidity_2m,
            units: data.current_units.relative_humidity_2m,
            img: "/svg/weather/humidity.svg",
          },
          feelsLike: {
            value: data.current.apparent_temperature,
            units: data.current_units.apparent_temperature,
            img: "/svg/weather/thermometer.svg",
          },
          precipitation: {
            value: data.current.precipitation,
            units: data.current_units.precipitation,
            img: "/svg/weather/precipitation.svg",
          },
          rain: {
            value: data.current.rain,
            units: data.current_units.rain,
            img: "/svg/weather/light-rain.svg",
          },
          showers: {
            value: data.current.showers,
            units: data.current_units.showers,
            img: "/svg/weather/rainy+sun.svg",
          },
          windSpeed: {
            value: data.current.wind_speed_10m,
            units: data.current_units.wind_speed_10m,
            img: "/svg/weather/wind.svg",
          },
        },

        isFetched: true,
      };

      setWeather(weather);
    }
    async function getForecastWeather() {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,visibility,wind_speed_10m,wind_direction_10m,uv_index`
      );
      const data = await res.json();

      //Mapping over the provided dates and filtering the duplicate values
      const dates: string[] = data.hourly.time
        .filter((el: string, i: number, array: string[]) => {
          const date = el.split("T")[0];
          if (i > 0 && array[i - 1].split("T")[0] === date) {
            return false;
          } else {
            return true;
          }
        })
        .map((el: string) => el.split("T")[0]);
      const hours: string[] = [];

      //Generating hours to match the data for hourly temperature
      for (let i: number = 0; i < 24; i++) {
        if (i.toString().length < 2) {
          hours.push(`0${i}:00`);
        } else {
          hours.push(`${i}:00`);
        }
      }
      const dailyForecast: DailyWeatherData[] = dates.map((date: string) => {
        const day: string = date;

        const hourlyWeather: HourlyWeatherData[] = hours.map((hour: string) => {
          const index = data.hourly.time.findIndex(
            (el: string) => el === `${date}T${hour}`
          );
          const weather: HourlyWeatherData = {
            uvIndex: data.hourly.uv_index[index],
            temperature: data.hourly.temperature_2m[index],
            humidity: data.hourly.relative_humidity_2m[index],
            feelsLike: data.hourly.apparent_temperature[index],
            precipitationProbability:
              data.hourly.precipitation_probability[index],
            precipitation: data.hourly.precipitation[index],
            visibility: data.hourly.visibility[index],
            windSpeed: data.hourly.wind_speed_10m[index],
            windDirection: data.hourly.wind_direction_10m[index],
            hour: hour,
          };
          return weather;
        });

        return { day: day, hourlyData: hourlyWeather };
      });
      const dailyWeather: DailyWeather = {
        data: dailyForecast,
        isFetched: true,
      };
      setDailyWeather(() => dailyWeather);
    }
  }, [location]);
  if (weather.isFetched === false) {
    return <div className="flex flex-column flex-center">Loading...</div>;
  } else {
    return (
      <div className="flex flex-column flex-center">
        <Image
          fill
          priority
          src="/svg/weather/weatherBg.svg"
          alt="weather"
          style={{ zIndex: -1 }}
        />
        <div
          className={`${styles.currWeatherTile} flex flex-center flex-gap-1`}
        >
          {Object.keys(weather.data).map((key) => {
            return (
              <WeatherChip
                key={key}
                img={weather.data[key as keyof WeatherData].img}
                value={weather.data[key as keyof WeatherData].value}
                heading={key.toUpperCase()}
                unit={weather.data[key as keyof WeatherData].units}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
