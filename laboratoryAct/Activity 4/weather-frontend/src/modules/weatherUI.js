import React from "react";
import { useWeather } from "../hooks/weatherFunction";

// Import your background images
import defaultBg from "../assets/weather-bg.png";
import sunnyBg from "../assets/sunny-bg.png";
import cloudyBg from "../assets/cloudy-bg.png";
import rainyBg from "../assets/rainy-bg.png";
import stormyBg from "../assets/storm-bg.png";
import snowyBg from "../assets/snow-bg.png";

function WeatherUI() {
  const { city, setCity, weather, error, fetchWeather } = useWeather();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  // 🧠 Function to choose background image dynamically
  const getBackgroundImage = () => {
    if (!weather) return defaultBg;

    const condition = weather.condition.toLowerCase();
    const temp = weather.temperature;

    // Priority logic
    if (condition.includes("snow") || temp <= 0) return snowyBg;
    if (condition.includes("thunder") || condition.includes("storm")) return stormyBg;
    if (condition.includes("rain") || condition.includes("drizzle")) return rainyBg;
    if (condition.includes("cloud")) return cloudyBg;
    if (condition.includes("clear") || condition.includes("sun")) return sunnyBg;

    return defaultBg; // fallback
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat transition-all duration-700"
      style={{ backgroundImage: `url(${getBackgroundImage()})` }}
    >
      {/* Title */}
      <h1 className="text-4xl text-white font-bold mb-10 tracking-wide drop-shadow-lg">
        Global Weather Forecast
      </h1>

      {/* Search Bar */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-white/20 backdrop-blur-md rounded-2xl px-5 py-3 w-[30rem] mb-10 shadow-lg"
      >
        <input
          type="text"
          placeholder="Search City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 bg-transparent outline-none text-white opacity-90 placeholder-gray-200 text-lg"
        />
        <button
          type="submit"
          className="text-white text-2xl hover:scale-110 transition-transform"
          title="Search"
        >
          🔍
        </button>
      </form>

      {/* Error Message */}
      {error && ( <p className="text-red-400 text-base mt-3 font-medium drop-shadow-sm">{error}</p>)}

      {/* Weather Card */}
      <div className="bg-white/20 backdrop-blur-md p-12 rounded-3xl shadow-xl flex flex-col items-center justify-center text-white w-[30rem] text-center min-h-[300px] transition-all duration-500">
        {weather ? (
          <>
            <h2 className="text-lg font-medium mb-2">{weather.city}</h2>
            <h1 className="text-5xl font-bold mb-2">{Math.round(weather.temperature)}°C</h1>
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.condition}
              className="w-20 h-20"
            />
            <p className="text-md mt-2 capitalize">{weather.condition}</p>
          </>
        ) : (
          <p className="text-white text-lg opacity-90">
            Search for a city to see the weather forecast.
          </p>
        )}
      </div>
    </div>
  );
}

export default WeatherUI;
