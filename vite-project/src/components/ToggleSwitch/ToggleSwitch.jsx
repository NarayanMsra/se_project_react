import { useContext } from "react";
import "./ToggleSwitch.css";
import currentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, toggleUnit } = useContext(
    currentTemperatureUnitContext
  );

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch__checkbox"
        onChange={toggleUnit}
        checked={currentTemperatureUnit === "C"}
      />

      <span
        className={
          currentTemperatureUnit === "F"
            ? "toggle-switch__slider toggle-switch__slider_F"
            : "toggle-switch__slider toggle-switch__slider_C"
        }
      ></span>

      <span className="toggle-switch__circle"></span>

      <span className="toggle-switch__text toggle-switch__text_F">F</span>
      <span className="toggle-switch__text toggle-switch__text_C">C</span>
    </label>
  );
};

export default ToggleSwitch;
