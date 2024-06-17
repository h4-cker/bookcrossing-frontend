import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header1.css';

const Header1 = ({ onAddBookClick, isAuthenticated }) => {
    return (
        <header className="header">
            <Link to="/" className="header-logo">
                BookHaven
            </Link>
            <nav>
                <button className="nav-button" onClick={onAddBookClick}>
                    Add Book
                </button>
                {isAuthenticated && (
                    <>
                        <Link to="/profile" className="nav-button">
                            Profile
                        </Link>
                        <button className="nav-button">
                            Chat
                        </button>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header1;