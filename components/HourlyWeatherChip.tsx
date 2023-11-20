import React from "react";
import styles from "@/styles/weather.module.css";
import { WeatherForecastData } from "@/public/types/Weather";
export default function HourlyWeatherChip({
  data,
}: {
  data: WeatherForecastData;
}) {
  return data.time.map((el: string, index: number) => {
    return (
      <div className={` flex flex-center flex-column flex-gap-small`}>
        <h4>{el}</h4>
        {Object.keys(data).map((key: string) => {
          return key === "day" || "time" ? null : (
            <span>{data[key as keyof WeatherForecastData][index]}</span>
          );
        })}
      </div>
    );
  });
}
