import React from "react";

const currentTemperatureUnitContext = React.createContext({
  currentTemperatureUnit: "C",
  handleToggleSwitchChange: () => {},
});

export default currentTemperatureUnitContext;
