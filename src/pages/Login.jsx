import { useNavigate } from "react-router-dom";
import "../styles/LoginRegisterPages.css";

const Login = () => {
    const navigate = useNavigate();

    const navigateRegister = () => {
        navigate('/auth/register', { replace: true });
    }

    const navigateMain = () => {
        navigate('/', { replace: true })
    }

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>Login</h2>
                <form className="auth-form"
                      onSubmit={ navigateMain }>
                    <input type="email"
                           name="email"
                           placeholder="Email" required />
                    <input type="password"
                           name="password"
                           placeholder="Password" required />
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