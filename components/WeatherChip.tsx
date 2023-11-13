export default function WeatherChip({
  heading,
  value,
  unit,
  className,
}: {
  heading: string;
  value: number;
  unit: string;
  className: string;
}) {
  return (
    <div className={className}>
      <h2>{heading}</h2>
      <h1>
        {value}
        <span className="description">{unit}</span>
      </h1>
    </div>
  );
}
