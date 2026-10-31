import axios from 'axios';
import { z } from 'zod';
// import { object, string, number, type InferOutput , parse } from 'valibot';
import type { SearchType } from "../types";
import { useState, useMemo } from "react";

  // TYPE GUARD O ASSERTION
  /*function isWeatherResult(weather: unknown) : weather is Weather {
    return (
      Boolean(weather) &&
      typeof weather === 'object' &&
      typeof (weather as Weather).name === 'string' &&
      typeof (weather as Weather).main.temp === 'number' &&
      typeof (weather as Weather).main.temp_max === 'number' &&
      typeof (weather as Weather).main.temp_min === 'number'
    )
  }*/

  // Zod
  const Weather = z.object({ // weather schema
    name: z.string(),
    main: z.object({
      temp: z.number(),
      temp_max: z.number(),
      temp_min: z.number()
    })
  })
  export type Weather = z.infer<typeof Weather>;

  // Valibot
  /*const WeatherShema = object({
    name: string(),
    main: object({
      temp: number(),
      temp_max: number(),
      temp_min: number()
    })
  })
  type Weather = InferOutput<typeof WeatherShema>*/

export default function useWeather() {

  const [weather, setWeather] = useState<Weather>({
    name: '',
    main: {
      temp: 0,
      temp_max: 0,
      temp_min: 0
    }
  })

  const fetchWeather = async (search : SearchType) => {
    try {
      const appId = import.meta.env.VITE_API_KEY
      const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

      const { data } = await axios(geoURL)
      console.log(data)

      const lat = data[0].lat
      const lon = data[0].lon

      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

    // Castear el type
      /*const { data: weatherResult} = await axios<Weather>(weatherURL)
      console.log(weatherResult.name)
      console.log(weatherResult.main.temp)*/

    // Type Guards
      /*const { data: weatherResult} = await axios(weatherURL)
      const result = isWeatherResult(weatherResult)
      if(result) {
        console.log(weatherResult.name)
        console.log(weatherResult.main.temp)
      } else {
        console.log('Respuesta mal formada')
      }*/

    // Zod
      const { data: weatherResult } = await axios(weatherURL);
      const result = Weather.safeParse(weatherResult);
      if(result.success) {
        setWeather(result.data)
      }

    // Valibot
      /*const { data: weatherResult } = await axios(weatherURL);
      const result = parse(WeatherShema, weatherResult)
      if(result) {
        console.log(result.name)
        console.log(result.main.temp)
      }*/

    } catch (error) {
      console.log(error);
    }
  }

  const hasWeatherData = useMemo(() => weather.name ,[weather])

  return {
    weather,
    fetchWeather,
    hasWeatherData
  }
}