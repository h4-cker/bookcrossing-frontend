import { useNavigate } from "react-router-dom";
import '../styles/LoginRegisterPages.css';

const Register = () => {
    const navigate = useNavigate();

    const navigateRegister = () => {
        navigate('/auth/login', { replace: true });
    }

    function navigateMain() {
        navigate('/', { replace: true })
    }

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>Register</h2>
                <form className="auth-form">
                    <input type="text" placeholder="Full Name" required />
                    <input type="text" placeholder="Phone Number" required />
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit" onClick={ navigateMain }>Register</button>
                </form>
                <p className="toggle-form">
                    Already have an account?&nbsp;
                    <span onClick={ navigateRegister }>Login</span>
                </p>
            </div>
        </div>
    );
};

export default Register;