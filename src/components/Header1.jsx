import React from 'react';
import '../styles/Header1.css';

const Header1 = ({onAddBookClick}) => {
    return (
        <header className="header">
            <div className="left-section">
                <h1 className="logo">BookHaven</h1>
            </div>
            <div className="center-section">
                <button className="nav-button" onClick={onAddBookClick}>Add New Book</button>
            </div>
            <div className="right-section">
                <button className="nav-button">Profile</button>
                <button className="nav-button">Chat</button>
            </div>
        </header>
    );
};

export default Header1;