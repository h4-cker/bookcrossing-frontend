import { useNavigate } from "react-router-dom";
import "../styles/LoginRegisterPages.css";
import { instance } from "../utils/axios/index.js";
import { useContext, useState } from "react";
import ENDPOINTS from "../utils/endpoints/index.js";
import { AuthContext } from "../context/AuthContext.js";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  // const validationErrors = {
  //     NAME: "Имя должно быть задано",
  //     EMAIL: "Неверный формат почты",
  //     PASSWORD: "Минимальная длина пароля 6 символов"};

  const navigateLogin = () => {
    navigate(ENDPOINTS.AUTH.LOGIN, { replace: true });
  };

  const navigateMain = () => {
    navigate("/", { replace: true });
  };

  // const removeError = (input) => {
  //     // берем <input> с родителем <div className="error">
  //     // удаляем все элементы с классом "error-label"
  //     // удаляем класс "error" из родителя
  //     const parent = input.parentNode;
  //      if (parent.classList.contains("error")) {
  //          parent.querySelector(".error-label").remove();
  //          parent.classList.remove("error");
  //      }
  // }
  //
  // const createError = (input, errorType) => {
  //     // берем родителя <input> - <div>, добавляем ему класс "error"
  //     // создаем label с классом "error-label" и в нем пишем ошибку
  //     const parent = input.parentNode;
  //     parent.classList.add("error");
  //
  //     const errorLabel = document.createElement("label");
  //     errorLabel.classList.add("error-label");
  //     errorLabel.textContent = errorType;
  //
  //     parent.append(errorLabel);
  // }
  //
  // const validationCheck = (errorType) => {
  //     // берем все <input>, убираем их ошибки (removeError),
  //     // в случае создаем ошибку после повторной отправки формы
  //     document.getElementById("regForm").addEventListener("submit", (e) => {
  //         e.preventDefault();
  //         const allInputs = this.querySelectorAll("input");
  //         for (const input of allInputs) {
  //             removeError(input);
  //         }
  //         switch (errorType) {
  //             case validationErrors.NAME:
  //                 createError(allInputs[0], errorType)
  //             case validationErrors.EMAIL:
  //                 createError(allInputs[1], errorType)
  //             case validationErrors.PASSWORD:
  //                 createError(allInputs[2], errorType)
  //         }
  //     })
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      name: name,
      email: email,
      password: password,
    };

    // let errorType = null;

    const response = await instance
      .post(ENDPOINTS.AUTH.REGISTER, userData)
      .then((response) => {
        const accessToken = response.data.accessToken;
        const accessTokenExpiration = response.data.accessTokenExpiration;
        const userId = response.data.userId;

        console.log(response.data.message);

        auth.login(accessToken, Date.now() + accessTokenExpiration, userId);

        toast.success("Регистрация прошла успешно");
      })
      .catch((error) => {
        if (error.response.data.errors) {
          for (error of error.response.data.errors) {
            toast.error(error.msg);
          }
        } else {
          toast.error(error.response.data.message);
        }
        // switch (error.response.data.errors[0].msg) {
        //     case validationErrors.NAME:
        //         errorType = validationErrors.NAME;
        //         break;
        //     case validationErrors.EMAIL:
        //         errorType = validationErrors.EMAIL;
        //         break;
        //     case validationErrors.PASSWORD:
        //         errorType = validationErrors.PASSWORD;
        //         break;
        // }
      });
    // validationCheck(errorType);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Регистрация</h2>
        <form className="auth-form" id="regForm" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Ваше имя"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              required
            />
          </div>
          <button type="submit">Зарегистрироваться</button>
        </form>
        <p className="toggle-form">
          Уже есть аккаунт?&nbsp;
          <span onClick={navigateLogin}>Войти</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
