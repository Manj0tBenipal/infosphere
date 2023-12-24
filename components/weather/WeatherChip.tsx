import styles from "@/styles/weather.module.css";
import Image from "next/image";

export default function WeatherChip({
  heading,
  value,
  unit,
  img,
}: {
  heading: string;
  value: number;
  unit: string;
  img: string;
}) {
  return (
    <div className={`${styles.weatherChip} flex  flex-center`}>
      <span>
        <h4>{heading}</h4>
        <h2>
          {value}
          <span className="description">{unit}</span>
        </h2>
      </span>
      <Image src={img} height={50} width={50} alt="temp" />
    </div>
  );
}
