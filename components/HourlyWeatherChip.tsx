import { HourlyWeather } from "@/public/types/Weather";
import React from "react";
import styles from "@/styles/weather.module.css";
export default function HourlyWeatherChip({
  value,
  unit,
  time,
}: {
  value: number;
  unit: string;
  time: string;
}) {
  return (
    <div className={`${styles.weatherChip} flex  flex-center `}>
      <span>
        <h4>{time}</h4>
        <h2>
          {value}
          <span className="description">{unit}</span>
        </h2>
      </span>
    </div>
  );
}
