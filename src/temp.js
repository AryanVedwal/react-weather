import React, { useState, useEffect } from "react";
import Weathercard from "./weathercard";
import "./style.css";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("");
  const [tempInfo, setTempInfo] = useState({});
  const [unit, setUnit] = useState("metric"); // Default to Celsius

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
    // Update unit state before calling getWeatherInfo
    handleSearch();
  };

  const getWeatherInfo = async (city) => {
    try {
      const apiKey = process.env.REACT_APP_API_KEY;

      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

      let res = await fetch(url);
      let data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    if (searchValue.trim() !== "") {
      await getWeatherInfo(searchValue);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    handleSearch();
  }, [unit]); // Fetch weather data when unit changes

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="Enter city name"
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
            autoComplete="off"
          />

          <button className="searchButton" type="button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      {Object.keys(tempInfo).length !== 0 ? (
        <Weathercard {...tempInfo} unit={unit} toggleUnit={toggleUnit} />
      ) : (
        <div className="no-result">No results found</div>
      )}
    </>
  );
};

export default Temp;
