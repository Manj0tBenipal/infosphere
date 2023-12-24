"use client";
import styles from "@/styles/weather.module.css";
import { useEffect, useState } from "react";
import {
  Location,
  Weather,
  WeatherData,
  WeatherForecast,
  WeatherForecastData,
} from "@/public/types/Weather";
import WeatherChip from "@/components/WeatherChip";
import Image from "next/image";

import HourlyWeatherChip from "@/components/HourlyWeatherChip";
export default function Page() {
  const [location, setLocation] = useState<Location>({
    latitude: "",
    longitude: "",
    isAvailable: false,
  });
  const [weather, setWeather] = useState<Weather>({
    isFetched: false,
  } as Weather);
  const [forecastedWeather, setForecastedWeather] = useState<WeatherForecast>(
    {} as WeatherForecast
  );
  const [selectedDay, setSelectedDay] = useState<number>(0);

  function getWeatherChips(weather: Weather) {
    const weatherChips: React.ReactElement[] = Object.keys(weather.data).map(
      (key) => {
        return (
          <WeatherChip
            key={key}
            img={weather.data[key as keyof WeatherData].img}
            value={weather.data[key as keyof WeatherData].value}
            heading={key.toUpperCase()}
            unit={weather.data[key as keyof WeatherData].units}
          />
        );
      }
    );
    return weatherChips;
  }

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
    function getWindDirection(degrees: number) {
      const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
      const index = Math.round(degrees / 45);
      return directions[index] || "--";
    }
    async function getForecastWeather() {
      const hours: string[] = [];
      for (let i = 0; i < 24; i++) {
        hours.push(`${i.toString().length === 1 ? "0" + i : i}:00`);
      }

      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,visibility,wind_speed_10m,wind_direction_10m,uv_index`
      );
      const data: any = await res.json();

      /**
       * Dates are extracted from the data returned by API to avoid any Conflicts
       * Using the Date() caused conflicts in dates
       */

      const days: string[] = [];
      data.hourly.time.map(
        (dateTime: string, index: number, array: string[]) => {
          const date: string = dateTime.split("T")[0];
          if (index > 0) {
            if (array[index - 1].split("T")[0] !== date) {
              days.push(date);
            }
          } else {
            days.push(date);
          }
        }
      );

      const forecastWeather: WeatherForecastData[] = days.map((day) => {
        let hrs: string[] = [];
        let temperature: number[] = [];
        let humidity: number[] = [];
        let feelsLike: number[] = [];
        let precipitationProbability: number[] = [];
        let precipitation: number[] = [];
        let visibility: number[] = [];
        let windSpeed: number[] = [];
        let windDirection: string[] = [];
        let uvIndex: number[] = [];
        hours.map((el) => {
          const index = data.hourly.time.findIndex(
            (timeAndDay: string) => timeAndDay === `${day}T${el}`
          );

          temperature.push(data.hourly.temperature_2m[index]);
          humidity.push(data.hourly.relative_humidity_2m[index]);

          feelsLike.push(data.hourly.apparent_temperature[index]);
          precipitationProbability.push(
            data.hourly.precipitation_probability[index]
          );
          precipitation.push(data.hourly.precipitation[index]);
          visibility.push(data.hourly.visibility[index]);
          windSpeed.push(data.hourly.wind_speed_10m[index]);
          windDirection.push(
            getWindDirection(data.hourly.wind_direction_10m[index])
          );
          uvIndex.push(data.hourly.uv_index[index]);
          hrs.push(el);
        });
        const dailyWeather: WeatherForecastData = {
          time: hrs,
          temperature: temperature,
          humidity: humidity,
          feelsLike: feelsLike,
          precipitationProbability: precipitationProbability,
          precipitation: precipitation,
          visibility: visibility,
          windSpeed: windSpeed,
          windDirection: windDirection,
          uvIndex: uvIndex,
          day: day,
        };
        return dailyWeather;
      });
      setForecastedWeather(() => ({
        data: forecastWeather,
        isFetched: true,
      }));
    }
  }, [location]);
  console.log(forecastedWeather.isFetched && forecastedWeather.data[0]);

  return (
    <div style={{ height: "100vh" }}>
      <Image
        fill
        priority
        src="/svg/weather/weatherBg.svg"
        alt="weather"
        style={{ zIndex: -1 }}
      />
      <div
        className={`${styles.weatherContentWrapper} flex flex-column flex-center`}
      >
        {weather.isFetched && (
          <div
            className={`${styles.currWeatherTile} flex flex-center flex-gap-1`}
          >
            {getWeatherChips(weather)}
          </div>
        )}
      </div>
      {forecastedWeather.isFetched && (
        <div className={`${styles.forecastWeatherContainer} flex flex-gap-1 `}>
          <div
            className={`${styles.forecastWeatherHeadings} flex flex-column flex-gap-small `}
          >
            <select
              className={`${styles.dayTime}`}
              value={selectedDay}
              onChange={(e) => setSelectedDay(parseInt(e.target.value))}
            >
              {forecastedWeather.data.map(
                (el: WeatherForecastData, index: number) => {
                  return (
                    <option key={el.day} value={index}>
                      {el.day}
                    </option>
                  );
                }
              )}
            </select>
            <div>
              {Object.keys(forecastedWeather.data[0]).map((key: string) => {
                if (!(key === "time" || key === "day")) {
                  return <h4 key={key}>{key.toUpperCase()}</h4>;
                }
              })}
            </div>
          </div>
          <div
            className={`${styles.hourlyWeatherChipsWrapper} flex  flex-gap-1 flex-scroll-x`}
          >
            <HourlyWeatherChip data={forecastedWeather.data[selectedDay]} />
          </div>
        </div>
      )}
    </div>
  );
}
