import { useNavigate } from "react-router-dom";
import "../styles/LoginRegisterPages.css";
import {instance} from "../utils/axios/index.js";
import {useState} from "react";
import ENDPOINTS from "../utils/endpoints/index.js";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const navigateRegister = () => {
        navigate(ENDPOINTS.AUTH.REGISTER, { replace: true });
    }

    const navigateMain = () => {
        navigate('/', { replace: true })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = {
            email: email,
            password: password
        }
        const user = await instance.post(ENDPOINTS.AUTH.LOGIN, userData)
            .then(response => {
                const accessToken = response.data.accessToken;
                const accessTokenExpiration = response.data.accessTokenExpiration;
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("accessTokenExpiration", accessTokenExpiration);
                console.log(response.data.message);
            })
            .catch((error) => {
                console.log(error.response.data.message);
                if (error.response.data.errors) {
                    console.log(error.response.data.errors[0].msg);
                }
            });
    }

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>Login</h2>
                <form className="auth-form"
                      onSubmit={ handleSubmit }>
                    <input type="email"
                           placeholder="Email"value={ email }
                           onChange={ event => { setEmail(event.target.value) } } required />
                    <input type="password"
                           placeholder="Password"
                           value={ password }
                           onChange={ event => { setPassword(event.target.value) } } required />
                    <button type="submit">Login</button>
                </form>
                <p className="toggle-form">
                    Don`t have an account?&nbsp;
                    <span onClick={ navigateRegister }>Register</span>
                </p>
            </div>
        </div>
    );
};

export default Login;