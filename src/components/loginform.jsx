import React from 'react';
import "../styles/loginform.css"

const Loginform = () => {
    return (
        <div>
            <div className="login-container">
                <h1>Login</h1>
                <div className="input-box">
                    <div className="login-box">
                        <input placeholder="Enter login"/>
                    </div>
                    <div className="password-box">
                        <input placeholder="Enter password"/>
                    </div>
                </div>
                <div className="buttons">
                    <div className="login-button-box">
                        <button className="login-button">Login</button>
                    </div>
                    <div className="register-button-box">
                        <button className="register-button">Sign-Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loginform;