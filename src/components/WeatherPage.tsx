import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CurrentWeather from "./CurrentWeather/CurrentWeather";
import Forecast from "./forecast/forecast";

interface WeatherData {
  temp: number;
  description: string;
  humidity: number;
  wind_speed: number;
  pressure: number;
  feels_like: number;
  icon: string;
}

const WeatherPage: React.FC = () => {
  const { cityName } = useParams();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [units, setUnits] = useState<"metric" | "imperial">("metric");
  const [unitLabel, setUnitLabel] = useState("°C");
  const [forecast, setForecast] = useState<any>(null);
  const navigate = useNavigate();

  const fetchWeatherByCity = async (city: string) => {
    const apiKey = `${import.meta.env.VITE_OPENWEATHER_API_KEY}`;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`
    );
    const foreCastResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`
    );
    const data = response.data;
    setWeatherData({
      temp: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
      pressure: data.main.pressure,
      feels_like: data.main.feels_like,
      icon: data.weather[0].icon,
    });
    console.log(foreCastResponse);
    setForecast([...foreCastResponse.data.list]);
  };

  // Function to fetch weather by geolocation
  const fetchWeatherByLocation = async (lat: number, lon: number) => {
    const apiKey = `${import.meta.env.VITE_OPENWEATHER_API_KEY}`;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`
    );
    const data = response.data;
    console.log(data);
    setWeatherData({
      temp: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
      pressure: data.main.pressure,
      feels_like: data.main.feels_like,
      icon: data.weather[0].icon,
    });
  };

  useEffect(() => {
    if (!cityName) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByLocation(latitude, longitude);
          console.log(position.coords);
        },
        (error) => {
          console.error(error);
          alert(
            "Could not fetch your location's weather. Please enter a city."
          );
          navigate("/");
        }
      );
    } else {
      fetchWeatherByCity(cityName);
    }
  }, [cityName, units]);

  const toggleUnits = () => {
    if (units === "metric") {
      setUnits("imperial");
      setUnitLabel("°F");
    } else {
      setUnits("metric");
      setUnitLabel("°C");
    }
  };

  if (!weatherData) return <h2>Loading...</h2>;

  return (
    <div className="container">
      <h1>Weather in {cityName}</h1>
      <CurrentWeather data={weatherData} degrees={unitLabel} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <button
          onClick={toggleUnits}
          style={{
            backgroundColor: "#7777ee",
            padding: "8px",
            color: "#000000",
          }}
        >
          Switch to {units === "metric" ? "Fahrenheit" : "Celsius"}
        </button>
        <button
          style={{
            backgroundColor: "#77ee77",
            padding: "8px",
            color: "#000000",
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          Go to Home
        </button>
      </div>
      <Forecast data={forecast} degrees={unitLabel} />
    </div>
  );
};

export default WeatherPage;
