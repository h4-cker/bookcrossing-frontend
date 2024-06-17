import React, {useState} from 'react';
import { useSpring, animated } from 'react-spring';
import "../styles/loginform.css"


const LoginForm = () => {
    const[registrationForm, setRegistrationForm] = useState(false)

    const registrationProps = useSpring({
        opacity: registrationForm ? 1 : 0,
        transform: registrationForm ? 'translateX(0)' : 'translateX(-100%)',
        display: registrationForm ? 'block' : 'none'
    });

    const loginProps = useSpring({
        opacity: registrationForm ? 0 : 1,
        transform: registrationForm ? 'translateX(100%)' : 'translateX(0)',
        display: registrationForm ? 'none' : 'block'
    });

    function Login(){
        return(
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
                            <button onClick={() => setRegistrationForm(!registrationForm)} className="register-button">
                                {registrationForm ? 'Login' : 'Sign-up'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function RegistrationForm(){
        return(
            <div>
                <div className="login-container">
                    <h1>Register</h1>
                    <div className="input-box">
                        <div className="login-box">
                            <input placeholder="Enter login"/>
                        </div>
                        <div className="email-box">
                            <input placeholder="Enter email"/>
                        </div>
                        <div className="password-box">
                            <input placeholder="Enter password"/>
                        </div>
                    </div>
                    <div className="buttons">
                        <div className="login-button-box">
                            <button className="login-button">Sign-up</button>
                        </div>
                        <div className="register-button-box">
                            <button onClick={() => setRegistrationForm(!registrationForm)} className="register-button">
                                {registrationForm ? 'Login' : 'Sign-up'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <animated.div style={loginProps}>
                <Login />
            </animated.div>
            <animated.div style={registrationProps}>
                <RegistrationForm />
            </animated.div>
        </div>
    );

}


export default LoginForm;