import React from 'react';
import '../styles/Header1.css';

const Header1 = () => {
    return (
        <header className="header">
            <h1 className="logo">BookHaven</h1>
            <div className="nav-buttons">
                <button className="nav-button">Profile</button>
                <button className="nav-button">Chat</button>
            </div>
        </header>
    );
};

export default Header1;