import { useState } from "react";
import { getWeatherByCity } from "../services/weatherServices";

export const useWeather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    const trimmedCity = city.trim();

    // Empty input check
    if (!trimmedCity) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    // Letters and spaces only
    const isValidCity = /^[A-Za-z\s]+$/.test(trimmedCity);
    if (!isValidCity) {
      setError("Please enter a valid city name (letters only).");
      setWeather(null);
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Fetch from API
      const data = await getWeatherByCity(trimmedCity);

      // Validate actual API result
      if (!data || !data.city || !data.temperature) {
        setError("City not found. Please try another name.");
        setWeather(null);
        return;
      }

      setWeather(data);
    } catch {
      setError("City not found or API error.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return { city, setCity, weather, loading, error, fetchWeather };
};
