import React, { useState, useEffect } from "react";
import "../styles/Header.css";
import { BASE_URL } from "../config";
import { useHttp } from "../hooks/http.hook";

const Header = ({ onAddBookClick, location, handleLocationChange, toggleSidebar }) => {
    const [locations, setLocations] = useState([]);
    const { request } = useHttp();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        getLocations();
    }, []);

    const getLocations = async () => {
        try {
            const data = await request(`${BASE_URL}/categories/locations`);
            setLocations(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            <div className="header-content">
                <button className="menu-button" onClick={toggleMenu}>
                    <i className="fa fa-bars"></i>
                </button>
                <div className="logo">
                    <a href="/">BookHaven</a>
                </div>
                <div className={`menu-content ${isMenuOpen ? "open" : ""}`}>
                    <div className="location">
                        <select value={location} onChange={handleLocationChange}>
                            {locations.map((location) => (
                                <option key={location.id} value={location}>
                                    {location}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="profile">
                        <a href="/profile">Профиль</a>
                    </div>
                </div>
                <button className="add-book-button desktop" onClick={onAddBookClick}>
                    Добавить книгу
                </button>
                <button className="filter-button" onClick={toggleSidebar}>
                    Фильтры
                </button>
            </div>
        </header>
    );
};

export default Header;
