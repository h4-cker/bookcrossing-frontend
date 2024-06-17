import '../styles/Header.css';
import React, {useRef} from "react";

const Header = ({onAddBookClick}) => {

    const navRef = useRef();

    const showNavbar = () =>{
        navRef.current.classList.toggle(
            "responsive_nav"
        );
    }

    return (
        <div className='navbar'>
            <img src="public/logo.png" alt="" className='logo'/>

            <ul>
                <li href="/#">Catalog</li>
                <li>Chat</li>
                <li className="login-li">Login</li>
            </ul>

            <div className='search-box'>
                <input type="text" placeholder='Search'/>
                <img src="public/search.png"/>
            </div>

            <nav ref={navRef} className='navpoint'>
                <a href="/#">Catalog</a>
                <a href="/#">Chat</a>
                <a href="/#">Login</a>
                <div className="center-section">
                    <button className="nav-button" onClick={onAddBookClick}>Add New Book</button>
                </div>
                <button
                    className="nav-close-btn"
                    onClick={showNavbar}>
                    <img src="public/close.png"/>
                </button>
            </nav>
            <button
                className="options-container"
                onClick={showNavbar}>
                <img src='public/options.png' className='options'/>
            </button>
        </div>
    );
};

export default Header;