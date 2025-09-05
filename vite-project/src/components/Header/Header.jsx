// import { useState } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/Avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData, ToggleSwitch }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
    // year: "numeric",
  });
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="App Logo" />
        </Link>

        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__controls-user">
        <ToggleSwitch />

        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
        <Link to="/profile" className="heder__link">
          <div className="header__user-container">
            <p className="header__userName">Narayan Mishra</p>

            <img
              src={avatar}
              className="header__userAvatar"
              alt="Terrence Tegegn"
            />
          </div>
        </Link>
      </div>
    </header>
  );
}
export default Header;
