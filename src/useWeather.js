import { useEffect, useState } from "react";

export function useWeather(location) {
  const [weather, setWeather] = useState({});
  const [dispLocation, setDispLocation] = useState("");
  const [flag, setFlag] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    function () {
      async function fetchWeather() {
        try {
          if (location.length < 3) return setWeather({});
          setIsLoading(true);
          const geoRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
          );
          const geoData = await geoRes.json();
          if (!geoData.results) throw new Error("Location not found");
          // console.log(geoData.results.at(0));

          const { name, longitude, latitude, country_code, timezone } =
            geoData.results.at(0);
          setDispLocation(name);

          function flagemojiToPNG(country_code) {
            const countryFlag = country_code.toLowerCase();
            return `https://flagcdn.com/24x18/${countryFlag}.png`;
          }

          setFlag(flagemojiToPNG(country_code));

          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
          );
          const weatherData = await weatherRes.json();
          // console.log(weatherData.daily);
          setWeather(weatherData.daily);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
      fetchWeather();
    },
    [location]
  );
  return { weather, dispLocation, flag, isLoading };
}
