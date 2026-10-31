import type { Weather } from "../../hooks/useWeather.ts";
import { formatTemperature } from "../../utils/index.ts";

type WeatherDetailProps = {
  weather: Weather
}

export default function WeatherDetail({ weather } : WeatherDetailProps) {
  return (
    <div>
      <h2>Clima de: {weather.name}</h2>
      <p>{formatTemperature(weather.main.temp)}&deg;C</p>
      <div>
        <p>Min: {formatTemperature(weather.main.temp_min)}&deg;C</p>
        <p>Max: {formatTemperature(weather.main.temp_max)}&deg;C</p>
      </div>
    </div>
  );
}