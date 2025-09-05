import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";

import "./App.css";
import { coordinates, apiKey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import WeatherCard from "../WeatherCard/WeatherCard";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemCard from "../ItemCard/ItemCard";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

import AddItemModal from "../AddItemModal/AddItemModal";
import { getItems, deleteItem } from "../../utils/api";
import DeleteModal from "../DeleteModal/DeleteModal";

//contexts
import currentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";
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

  //API
  const onAddItem = (inputValues) => {
    const newCardData = {
      name: inputValues.name,
      link: inputValues.imageUrl,
      weather: inputValues.weatherType,
      _id: Math.max(...clothingItems.map((item) => item._id)) + 1,
    };
    //dont use newCardData
    setClothingItems([...clothingItems, inputValues]);
    closeModal();
    //.catch()
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const openModal = (modal) => setActiveModal(modal);
  const closeModal = () => {
    setActiveModal("");
    setSelectedCard({});
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddItemModalSubmit = ({ name, link, weather }) => {
    const newId = Math.max(...clothingItems.map((item) => item._id)) + 1;
    //upload the new item to the clothing items list
    setClothingItems([{ name, link, weather, _id: newId }, ...clothingItems]);
    //close the modal after adding an item
    closeModal();
  };

  const handleDeleteCard = (card) => {
    deleteItem().then(() => {
      setClothingItems((prevItems) =>
        prevItems.filter((item) => item._id !== card._id)
      );
      closeModal();
    });
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error("Failed to fetch weather data:", error);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log("Initial items loaded:", data);
        setClothingItems(data);
      })
      .catch((error) => {
        console.error("Failed to fetch clothing items:", error);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <currentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, toggleUnit: handleToggleSwitchChange }}
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
                element={<Profile onCardClick={handleCardClick} />}
              />
            </Routes>

            <Footer />
          </div>

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            closeActiveModal={closeModal}
            handleSubmit={handleAddItemModalSubmit}
            onAddItem={onAddItem}
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
      </currentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;
