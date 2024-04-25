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
                <div className="buttoms">
                    <button>Login</button>
                    <button>Sign-Up</button>
                </div>
            </div>
        </div>
    );
};

export default Loginform;