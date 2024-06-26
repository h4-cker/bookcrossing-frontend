import React from "react";
import "../styles/Header.css";
import { BASE_URL } from "../config";
import { useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";

const Header = ({ onAddBookClick }) => {
  const [location, setLocation] = useState(
    JSON.parse(localStorage.getItem("currentLocation")) || "Москва"
  );
  const [locations, setLocations] = useState([]);
  const { request } = useHttp();

  useEffect(() => {
    getLocations();
  }, []);

  const getLocations = async () => {
    try {
      const data = await request(`${BASE_URL}/categories/locations`);
      console.log(data);

      setLocations(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    localStorage.setItem("currentLocation", JSON.stringify(event.target.value));
  };

  return (
    <header className="header">
      <div className="logo">
        <a href="/">BookHaven</a>
      </div>
      <div className="search-bar">
        <select>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="isbn">ISBN</option>
        </select>
        <input type="text" placeholder="Search" />
      </div>
      <div className="location">
        <select value={location} onChange={handleLocationChange}>
          {locations.map((location) => {
            return (
              <option key={location.id} value={location}>
                {location}
              </option>
            );
          })}
        </select>
      </div>
      <div className="profile">
        <a href="/profile">Profile</a>
      </div>
      <button className="add-book-button" onClick={onAddBookClick}>
        Add Book
      </button>
    </header>
  );
};

export default Header;
