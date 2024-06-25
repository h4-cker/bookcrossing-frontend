import React from 'react';
import '../styles/Header.css';

const Header = ({ onAddBookClick }) => {
    const handleCityChange = (event) => {
        console.log('Selected city:', event.target.value);
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
                <select onChange={handleCityChange}>
                    <option value="Moscow">Moscow</option>
                    <option value="Saint Petersburg">Saint Petersburg</option>
                    <option value="Novosibirsk">Novosibirsk</option>
                </select>
            </div>
            <div className="profile">
                <a href="/profile">Profile</a>
            </div>
            <button className="add-book-button" onClick={onAddBookClick}>Add Book</button>
        </header>
    );
};

export default Header;
