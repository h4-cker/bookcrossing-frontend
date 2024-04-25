import React from 'react';
import Header from "../components/header.jsx";
import "../styles/loginpage.css"
import Loginform from "../components/loginform.jsx";

const Loginpage = () => {
    return (
        <div>
            <div className="navbar-container">
                <Header/>
            </div>
            <div className="login-body">
                <div className="right-side">
                    <Loginform/>
                </div>
                <div className="lef-side">
                    <img src="public/books.png" alt=""/>
                </div>
            </div>
        </div>
    );
};

export default Loginpage;