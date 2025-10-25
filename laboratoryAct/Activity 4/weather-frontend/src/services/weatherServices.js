export const getWeatherByCity = async (city) => {
  const apiKey = c1a258741766547deef08f004d695606
  const baseUrl = https://api.openweathermap.org/data/2.5/weather

  // Trim spaces and validate the input
  if (!city || !/^[a-zA-Z\s-]+$/.test(city.trim())) {
    throw new Error("Please enter a valid city name");
  }

  const url = `${baseUrl}?q=${encodeURIComponent(city.trim())}&appid=${apiKey}&units=metric`;

  try {
    console.log("Fetching from:", url);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    // Validate if city data exists
    if (!data.name || !data.weather || !data.main) {
      throw new Error("City not found");
    }

    return {
      temperature: data.main.temp,
      condition: data.weather[0].description, // more descriptive (e.g. "light rain")
      icon: data.weather[0].icon,
      city: data.name,
    };
  } catch (error) {
    console.error("❌ Weather fetch error:", error);
    throw new Error("City not found or invalid input");
  }
};
