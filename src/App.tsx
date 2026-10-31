import styles from './App.module.css'
import Form from "./components/Form/Form.tsx";
import useWeather from "./hooks/useWeather.ts";
import WeatherDetail from "./components/WeatherDetail/WeatherDetail.tsx";
import Spinner from "./components/Spinner/Spinner.tsx";
import Alert from "./components/Alert/Alert.tsx";

function App() {

  const { weather, loading, notFound, fetchWeather, hasWeatherData } = useWeather();

  return (
    <>
      <h1 className={styles.title}>Buscador de Clima</h1>

      <div className={styles.container}>
        <Form
          fetchWeather={fetchWeather}
        />
        {loading && <Spinner />}
        {hasWeatherData && (
          <WeatherDetail
            weather={weather}
          />
        )}
        {notFound && <Alert>Ciudad no encontrada</Alert>}
      </div>
    </>
  )
}

export default App
