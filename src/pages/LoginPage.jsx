import React from 'react';
import Header from "../components/Header.jsx";
import "../styles/loginpage.css"
import LoginForm from "../components/LoginForm.jsx";

const LoginPage = () => {
    return (
        <div>
            <div className="navbar-container">
                <Header/>
            </div>
            <div className="login-body">
                <div className="right-side">
                    <LoginForm/>
                </div>
                <div className="lef-side">
                    <img src="public/books.png" alt=""/>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;