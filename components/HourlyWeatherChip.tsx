import React from "react";
import styles from "@/styles/weather.module.css";
import { WeatherForecastData } from "@/public/types/Weather";
export default function HourlyWeatherChip({
  data,
}: {
  data: WeatherForecastData;
}) {
  console.log(data);
  return data.time.map((el: string, index: number) => {
    return (
      <div
        key={index}
        className={`${styles.hourlyWeatherChip} flex flex-center flex-column flex-gap-small`}
      >
        <h4 className={`${styles.dayTime}`}>{el}</h4>
        {Object.keys(data).map((key: string) => {
          console.log(key, data[key as keyof WeatherForecastData][index]);
          if (key === "time" || key === "day") {
            return null;
          } else {
            return (
              <span key={key}>
                {data[key as keyof WeatherForecastData][index]}
              </span>
            );
          }
        })}
      </div>
    );
  });
}
