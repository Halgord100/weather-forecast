import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
  sys: {
    country: string;
  };
}

function App() {
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isRaining, setIsRaining] = useState<boolean>(false);

  // Temporarily hardcoded API key for deployment
  const API_KEY = 'fd8e3158ac8f444dfc6dee363bc4afa3';
  
  const fetchWeather = async (cityName: string) => {
    if (!cityName.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError('');
      
      // Check if it's raining based on weather condition
      const weatherMain = response.data.weather[0].main.toLowerCase();
      setIsRaining(weatherMain.includes('rain') || weatherMain.includes('drizzle') || weatherMain.includes('thunderstorm'));
    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Load default city on initial render
  useEffect(() => {
    fetchWeather('London');
  }, []);

  const handleSearch = () => {
    fetchWeather(city);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Generate raindrops
  const renderRaindrops = () => {
    const raindrops = [];
    for (let i = 0; i < 50; i++) {
      const left = Math.random() * 100;
      const delay = Math.random() * 2;
      const duration = 0.5 + Math.random() * 0.5;
      raindrops.push(
        <div 
          key={i} 
          className="rain" 
          style={{ 
            left: `${left}%`, 
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`
          }} 
        />
      );
    }
    return raindrops;
  };

  return (
    <div className="app">
      {/* Weather Effects */}
      <div className="weather-effects">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
      </div>
      
      {isRaining && (
        <div className="rain-container">
          {renderRaindrops()}
        </div>
      )}
      
      <header className="app-header">
        <h1>Haval Awni's Weather Dashboard</h1>
      </header>

      <main className="app-main">
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            className="search-input"
          />
          <button 
            onClick={handleSearch} 
            className="search-button"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {weather && !loading && (
          <div className="weather-card">
            <h2 className="city-name">
              {weather.name}, {weather.sys.country}
            </h2>
            
            <div className="weather-info">
              <div className="weather-main">
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                  className="weather-icon"
                />
                <div className="temperature">
                  {Math.round(weather.main.temp)}°C
                </div>
                <div className="weather-description">
                  {weather.weather[0].main} - {weather.weather[0].description}
                </div>
              </div>
              
              <div className="weather-details">
                <div className="detail-item">
                  <span className="detail-label">Feels like:</span>
                  <span className="detail-value">{Math.round(weather.main.feels_like)}°C</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Humidity:</span>
                  <span className="detail-value">{weather.main.humidity}%</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Wind Speed:</span>
                  <span className="detail-value">{weather.wind.speed} m/s</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Pressure:</span>
                  <span className="detail-value">{weather.main.pressure} hPa</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <footer className="app-footer">
        <p>Created by Haval Awni | Powered by OpenWeatherMap</p>
      </footer>
    </div>
  );
}

export default App;
