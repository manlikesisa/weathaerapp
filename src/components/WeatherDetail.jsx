import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { WiDaySunny, WiRain, WiCloudy, WiDayCloudy, WiThunderstorm, WiSnow } from 'react-icons/wi';


const WeatherDetail = () => {
  const { cityName } = useParams();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cityCoords, setCityCoords] = useState(null);

  useEffect(() => {
    const fetchCityCoords = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/cities?name=${cityName}`);
        setCityCoords(response.data[0]);
      } catch (error) {
        console.error('Error fetching city coordinates:', error);
      }
    };

    fetchCityCoords();
  }, [cityName]);

  useEffect(() => {
    if (!cityCoords) return;

    const fetchWeather = async () => {
      try {
        const apiKey = '5752ec97e98d21d5c73d999aa62a02e7';
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityCoords.lat}&lon=${cityCoords.lon}&appid=${apiKey}&units=metric`
        );
        setWeather(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, [cityCoords]);

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return <WiDaySunny size={60} />;
      case 'Rain':
        return <WiRain size={60} />;
      case 'Clouds':
        return <WiCloudy size={60} />;
      case 'Thunderstorm':
        return <WiThunderstorm size={60} />;
      case 'Snow':
        return <WiSnow size={60} />;
      default:
        return <WiDayCloudy size={60} />;
    }
  };

  if (loading) return <div className="loading">Loading weather data...</div>;
  if (!weather) return <div className="error">Weather data not available</div>;

  return (
    <div className="weather-detail">
      <h2>{cityName} Weather</h2>
      <div className="weather-card">
        <div className="weather-icon">
          {getWeatherIcon(weather.weather[0].main)}
          <p>{weather.weather[0].description}</p>
        </div>
        <div className="weather-info">
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Feels like: {weather.main.feels_like}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
          <p>Pressure: {weather.main.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetail;