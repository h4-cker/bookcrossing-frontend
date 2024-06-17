import React, { useState } from 'react';
import '../styles/AuthPage.css';

const AuthPage = () => {
    const [isRegistering, setIsRegistering] = useState(false);

    const toggleForm = () => {
        setIsRegistering(!isRegistering);
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>{isRegistering ? 'Register' : 'Login'}</h2>
                <form className="auth-form">
                    {isRegistering && (
                        <>
                            <input type="text" placeholder="Full Name" required />
                            <input type="text" placeholder="Phone Number" required />
                        </>
                    )}
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
                </form>
                <p className="toggle-form">
                    {isRegistering ? 'Already have an account?' : "Don't have an account?"}
                    <span onClick={toggleForm}>
                        {isRegistering ? ' Login' : ' Register'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;