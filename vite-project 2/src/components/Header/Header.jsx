import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/Avatar.png";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
    // year: "numeric",
  });
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="App Logo" />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        +Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__userName">Terrence Tegegn</p>
        <img
          src={avatar}
          className="header__userAvatar"
          alt="Terrence Tegegn"
        />
      </div>
    </header>
  );
}
export default Header;
