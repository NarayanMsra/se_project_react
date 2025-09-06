import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import "./App.css";
import { coordinates, apiKey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getItems, addItem, deleteItem } from "../../utils/api";
import DeleteModal from "../DeleteModal/DeleteModal";

//contexts
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const App = () => {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const onAddItem = (inputValues) => {
    const newCardData = {
      name: inputValues.name,
      link: inputValues.link,
      weather: inputValues.weather,
    };

    addItem(newCardData)
      .then((createdItem) => {
        setClothingItems((prev) => [createdItem, ...prev]);
        closeModal();
      })
      .catch((err) => {
        console.error("Failed to add item:", err);
      });
  };

  const handleDeleteCard = (card) => {
    deleteItem(card._id)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== card._id)
        );
        closeModal();
      })
      .catch((err) => {
        console.error("Failed to delete item:", err);
      });
  };

  const handleAddClick = () => setActiveModal("add-garment");
  const openModal = (modal) => setActiveModal(modal);
  const closeModal = () => {
    setActiveModal("");
    setSelectedCard({});
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch((error) => console.error("Failed to fetch weather data:", error));
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => setClothingItems(data))
      .catch((error) =>
        console.error("Failed to fetch clothing items:", error)
      );
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{
          currentTemperatureUnit,
          toggleUnit: handleToggleSwitchChange,
        }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              ToggleSwitch={ToggleSwitch}
              handleAddClick={handleAddClick}
              weatherData={weatherData}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                  />
                }
              />
            </Routes>

            <Footer />
          </div>

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            closeActiveModal={closeModal}
            onAddItem={onAddItem}
            currentWeatherType={weatherData.type}
          />

          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            closeActiveModal={closeModal}
            handleDelete={() => openModal("delete-modal")}
          />

          <DeleteModal
            activeModal={activeModal}
            closeActiveModal={closeModal}
            card={selectedCard}
            handleDeleteCard={handleDeleteCard}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;
