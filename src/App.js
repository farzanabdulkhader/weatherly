import React, { useState } from "react";
import { useWeather } from "./useWeather";
import VideoBg from "./components/VideoBg";
import Logo from "./components/Logo";
import Input from "./components/Input";

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", { weekday: "short" }).format(
    new Date(dateStr)
  );
}

export default function App() {
  const [location, setLocation] = useState(localStorage.getItem("location"));

  const { weather, dispLocation, flag, isLoading } = useWeather(location);

  localStorage.setItem("location", location);

  return (
    <>
      <div className="container">
        <div className="app">
          <VideoBg />
          <header>
            <Logo />
            <h1>Weatherly</h1>
          </header>

          <Input location={location} setLocation={setLocation} />
          {isLoading && <p className="loader">Loading...</p>}
          {!isLoading && weather && (
            <Weather
              dispLocation={dispLocation}
              flag={flag}
              weather={weather}
            />
          )}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

function Weather({ dispLocation, flag, weather }) {
  const {
    temperature_2m_max: maxTemp,
    temperature_2m_min: minTemp,
    time: dates,
    weathercode: codes,
  } = weather;

  return (
    <div>
      {dates && (
        <h2>
          Weather forecast for {dispLocation}{" "}
          <img src={flag} alt={`${dispLocation}-flag`} />
        </h2>
      )}
      <ul className="weather">
        {dates?.map((date, i) => (
          <Day
            day={date}
            minTemp={Math.floor(minTemp.at(i))}
            maxTemp={Math.ceil(maxTemp.at(i))}
            code={codes.at(i)}
            isToday={i === 0}
            key={date}
          />
        ))}
      </ul>
    </div>
  );
}

function Day({ day, minTemp, maxTemp, code, isToday }) {
  return (
    <li className="day">
      <span>{getWeatherIcon(code)}</span>
      <p>{isToday ? "Today" : formatDay(day)}</p>
      <p>
        {minTemp}&deg; &mdash; <strong>{maxTemp}&deg;</strong>
      </p>
    </li>
  );
}

function Footer() {
  return (
    <div className="footer">
      &copy;farzanabdulkhader <span>{new Date().getFullYear()}</span>
    </div>
  );
}
