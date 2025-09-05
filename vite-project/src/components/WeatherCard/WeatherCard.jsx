import "./WeatherCard.css";
// import WeatherCard from "./WeatherCard";
import { weatherOptions, defaultWeatherOption } from "../../utils/constants";
import { useContext } from "react";
import currentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";
// import { use } from "react";

const WeatherCard = ({ weatherData = {weatherData} }) => {
  const { currentTemperatureUnit } = useContext(currentTemperatureUnitContext);

  const filterOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filterOptions.length === 0) {
    weatherOption = defaultWeatherOption[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filterOptions[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {currentTemperatureUnit === "F"
          ? weatherData.temp.F
          : weatherData.temp.C}
        &deg;{currentTemperatureUnit}
      </p>

      <img
        src={weatherOption?.url}
        alt={`Card showing ${weatherOption?.day ? "day" : "night"}time ${
          weatherOption?.condition
        } weather`}
        className="weather-card__image"
      />
    </section>
  );
}
export default WeatherCard;
