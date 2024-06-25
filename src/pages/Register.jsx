import { useNavigate } from "react-router-dom";
import "../styles/LoginRegisterPages.css";
import {instance} from "../utils/axios/index.js";

const Register = () => {
    const navigate = useNavigate();

    const navigateLogin = () => {
        navigate('/auth/login', { replace: true });
    }

    const navigateMain = () => {
        navigate('/', { replace: true });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = {
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value
        }
        const user = await instance.post("/auth/register", userData)
            .then(function (response) {
                console.log(response.data.message);
            });
    }

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>Register</h2>
                <form className="auth-form"
                      id="regForm"
                      onSubmit={ handleSubmit }>
                    <input type="text"
                           name="name"
                           placeholder="Full Name" required />
                    <input type="email"
                           name="email"
                           placeholder="Email" required />
                    <input type="password"
                           name="password"
                           placeholder="Password" required />
                    <button type="submit">Register</button>
                </form>
                <p className="toggle-form">
                    Already have an account?&nbsp;
                    <span onClick={ navigateLogin }>Login</span>
                </p>
            </div>
        </div>
    );
};

export default Register;