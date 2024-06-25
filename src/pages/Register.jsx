import { useNavigate } from "react-router-dom";
import "../styles/LoginRegisterPages.css";
import {instance} from "../utils/axios/index.js";

const Register = () => {
    const navigate = useNavigate();

    const validationErrors = {
        NAME: "Имя должно быть задано",
        EMAIL: "Неверный формат почты",
        PASSWORD: "Минимальная длина пароля 6 символов"};

    const navigateLogin = () => {
        navigate('/auth/login', { replace: true });
    }

    const navigateMain = () => {
        navigate('/', { replace: true });
    }

    const removeError = (input) => {
        // берем <input> с родителем <div className="error">
        // удаляем все элементы с классом "error-label"
        // удаляем класс "error" из родителя
        const parent = input.parentNode;
         if (parent.classList.contains("error")) {
             parent.querySelector(".error-label").remove();
             parent.classList.remove("error");
         }
    }

    const createError = (input, errorType) => {
        // берем родителя <input> - <div>, добавляем ему класс "error"
        // создаем label с классом "error-label" и в нем пишем ошибку
        const parent = input.parentNode;
        parent.classList.add("error");

        const errorLabel = document.createElement("label");
        errorLabel.classList.add("error-label");
        errorLabel.textContent = errorType;

        parent.append(errorLabel);
    }

    const validationCheck = (errorType) => {
        // берем все <input>, убираем их ошибки (removeError),
        // в случае создаем ошибку после повторной отправки формы
        document.getElementById("regForm").addEventListener("submit", (e) => {
            e.preventDefault();
            const allInputs = this.querySelectorAll("input");
            for (const input of allInputs) {
                removeError(input);
            }
            switch (errorType) {
                case validationErrors.NAME:
                    createError(allInputs[0], errorType)
                case validationErrors.EMAIL:
                    createError(allInputs[1], errorType)
                case validationErrors.PASSWORD:
                    createError(allInputs[2], errorType)
            }
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = {
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value
        }

        let errorType = null;

        const user = await instance.post("/auth/register", userData)
            .then(() => {

            })
            .catch((error) => {
                switch (error.response.data.errors[0].msg) {
                    case validationErrors.NAME:
                        errorType = validationErrors.NAME;
                        break;
                    case validationErrors.EMAIL:
                        errorType = validationErrors.EMAIL;
                        break;
                    case validationErrors.PASSWORD:
                        errorType = validationErrors.PASSWORD;
                        break;
                }
            });
        validationCheck(errorType);
    }

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>Register</h2>
                <form className="auth-form"
                      id="regForm"
                      onSubmit={ handleSubmit }>
                    <div>
                        <input type="text"
                               name="name"
                               placeholder="Full Name" required />
                    </div>
                    <div>
                        <input type="email"
                               name="email"
                               placeholder="Email" required />
                    </div>
                    <div>
                        <input type="password"
                               name="password"
                               placeholder="Password" required />
                    </div>
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